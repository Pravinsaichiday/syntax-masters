import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ADMIN_EMAIL = "sensei777@gmail.com";
const ADMIN_PASS = "911911";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, password, key, value, action } = await req.json();

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASS) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Get usage stats
    if (action === "get_usage") {
      const { data: settings } = await supabase.from("admin_settings").select("*");
      const usageCount = parseInt(settings?.find((s: any) => s.key === "gemini_usage_count")?.value || "0");
      const lastReset = settings?.find((s: any) => s.key === "gemini_last_reset")?.value || "";
      const customKey = settings?.find((s: any) => s.key === "gemini_api_key")?.value || "";
      
      // Check if the current key works by making a tiny test request
      const activeKey = customKey || Deno.env.get("GEMINI_API_KEY") || "";
      let keyStatus = "unknown";
      
      if (activeKey) {
        try {
          const testResp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${activeKey}`);
          const body = await testResp.text();
          keyStatus = testResp.ok ? "active" : "invalid";
        } catch {
          keyStatus = "error";
        }
      } else {
        keyStatus = "not_set";
      }

      return new Response(JSON.stringify({
        usageCount,
        lastReset,
        keyStatus,
        hasCustomKey: !!customKey,
        keyPreview: activeKey ? `...${activeKey.slice(-6)}` : "none",
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Update a setting (including gemini_api_key)
    const { error } = await supabase
      .from("admin_settings")
      .update({ value, updated_at: new Date().toISOString() })
      .eq("key", key);

    if (error) throw error;

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
