import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: 'LOVABLE_API_KEY not configured' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { code, language, problemDescription, sampleCases, mode, constraints } = await req.json();

    if (!code || !language) {
      return new Response(JSON.stringify({ error: 'Code and language are required' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let prompt = '';

    if (mode === 'run') {
      prompt = `You are a code execution engine. Execute the following ${language} code mentally and provide the exact output.

CODE:
\`\`\`${language}
${code}
\`\`\`

${sampleCases ? `Use this sample input:\n${sampleCases[0]?.input || ''}` : ''}

Respond in this exact JSON format only, no other text:
{
  "output": "<the exact stdout output of the program>",
  "executionTimeMs": <estimated execution time in ms as integer>,
  "memoryMb": <estimated memory usage in MB as number with 1 decimal>,
  "error": null,
  "compilationError": null
}

If there is a compilation error, set "compilationError" to the error message and output to "".
If there is a runtime error, set "error" to the error message and output to "".`;
    } else if (mode === 'submit') {
      prompt = `You are a competitive programming judge. Evaluate the following ${language} code against the problem and test cases.

PROBLEM:
${problemDescription}

SAMPLE TEST CASES:
${JSON.stringify(sampleCases, null, 2)}

CODE:
\`\`\`${language}
${code}
\`\`\`

Run the code against each sample test case and also consider edge cases. Determine the verdict.

Respond in this exact JSON format only, no other text:
{
  "verdict": "<one of: Accepted, Wrong Answer, Time Limit Exceeded, Memory Limit Exceeded, Compilation Error, Runtime Error>",
  "output": "<output for the first test case>",
  "executionTimeMs": <estimated execution time in ms as integer>,
  "memoryMb": <estimated memory usage in MB as number with 1 decimal>,
  "testCasesPassed": <number of test cases passed>,
  "testCasesTotal": <total number of test cases evaluated>,
  "error": null,
  "details": "<brief explanation of the result>"
}

Be strict but fair. If the code logic is correct for all test cases, give Accepted. If it has bugs, give Wrong Answer. If it would exceed typical time limits (2 seconds), give TLE. If it has syntax errors, give Compilation Error.`;
    } else if (mode === 'solution') {
      // constraints already destructured from req.json() above
      prompt = `You are an expert competitive programmer. Provide a clean, optimal, well-commented solution in ${language} for the following problem.

PROBLEM:
${problemDescription}

CONSTRAINTS:
${JSON.stringify(constraints || [], null, 2)}

SAMPLE TEST CASES:
${JSON.stringify(sampleCases, null, 2)}

Provide ONLY the complete solution code, no explanation outside the code. Add comments within the code explaining the approach and key steps. The code must handle all edge cases and be efficient.`;
    } else {
      return new Response(JSON.stringify({ error: 'Invalid mode. Use "run", "submit", or "solution".' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.1,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      return new Response(JSON.stringify({ error: `AI Gateway error: ${response.status}` }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const textContent = data.choices?.[0]?.message?.content || '';

    // For solution mode, return the raw text as solution code
    if (mode === 'solution') {
      // Strip markdown code fences if present
      let solution = textContent.replace(/^```[\w]*\n?/, '').replace(/\n?```$/, '').trim();
      
      // Track usage
      try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
        const sb = createClient(supabaseUrl, serviceRoleKey);
        const { data: countRow } = await sb.from('admin_settings').select('value').eq('key', 'gemini_usage_count').single();
        const current = parseInt(countRow?.value || '0');
        await sb.from('admin_settings').update({ value: String(current + 1) }).eq('key', 'gemini_usage_count');
      } catch (e) { console.error('Usage tracking error:', e); }

      return new Response(JSON.stringify({ solution }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Extract JSON from the response for run/submit modes
    let result;
    try {
      const jsonMatch = textContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseErr) {
      console.error('Failed to parse response:', textContent);
      result = {
        verdict: 'Runtime Error',
        output: textContent,
        executionTimeMs: 0,
        memoryMb: 0,
        error: 'Failed to parse execution result',
        testCasesPassed: 0,
        testCasesTotal: sampleCases?.length || 0,
      };
    }

    // Track usage
    try {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const sb = createClient(supabaseUrl, serviceRoleKey);
      const { data: countRow } = await sb.from('admin_settings').select('value').eq('key', 'gemini_usage_count').single();
      const current = parseInt(countRow?.value || '0');
      await sb.from('admin_settings').update({ value: String(current + 1) }).eq('key', 'gemini_usage_count');
    } catch (e) { console.error('Usage tracking error:', e); }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Execute code error:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
