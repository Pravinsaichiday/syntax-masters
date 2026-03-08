import { useParams } from "react-router-dom";
import { PROBLEMS } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Play, Send, Lightbulb } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const LANG_MAP: Record<string, { template: string }> = {
  "C++": { template: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // Your code here\n    return 0;\n}' },
  Python: { template: "# Your code here\n" },
  Java: { template: 'import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Your code here\n    }\n}' },
  JavaScript: { template: "// Your code here\n" },
  C: { template: '#include <stdio.h>\n\nint main() {\n    // Your code here\n    return 0;\n}' },
  Go: { template: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello")\n}' },
  Rust: { template: "fn main() {\n    // Your code here\n}\n" },
};

const LANG_MONACO: Record<string, string> = {
  "C++": "cpp", Python: "python", Java: "java", JavaScript: "javascript", C: "c", Go: "go", Rust: "rust",
};

type Verdict = "Accepted" | "Wrong Answer" | "Time Limit Exceeded" | "Compilation Error" | "Runtime Error" | "Memory Limit Exceeded" | null;

export default function ProblemPage() {
  const { id } = useParams();
  const { user, updateProfile, profile } = useAuth();
  const problem = PROBLEMS.find((p) => p.id === id);

  const [language, setLanguage] = useState("C++");
  const [code, setCode] = useState(LANG_MAP["C++"].template);
  const [output, setOutput] = useState("");
  const [verdict, setVerdict] = useState<Verdict>(null);
  const [running, setRunning] = useState(false);
  const [showHints, setShowHints] = useState(false);

  if (!problem) {
    return <div className="min-h-screen bg-background"><Navbar /><div className="flex items-center justify-center py-20 text-muted-foreground">Problem not found.</div></div>;
  }

  const callExecuteCode = async (mode: "run" | "submit") => {
    setRunning(true);
    setVerdict(null);
    setOutput("Processing...");

    try {
      const { data, error } = await supabase.functions.invoke("execute-code", {
        body: {
          code,
          language,
          problemDescription: problem.description,
          sampleCases: problem.sampleCases,
          mode,
        },
      });

      if (error) throw error;

      if (mode === "run") {
        const err = data.compilationError || data.error;
        setOutput(
          err
            ? `Error:\n${err}`
            : `Output:\n${data.output || "(no output)"}\n\nExecution time: ${data.executionTimeMs || 0}ms\nMemory: ${data.memoryMb || 0}MB`
        );
        if (!err) toast.success("Code executed successfully");
        else toast.error("Execution error");
      } else {
        const v = data.verdict as Verdict;
        setVerdict(v);
        setOutput(
          `Verdict: ${v}\n\nTest Cases: ${data.testCasesPassed || 0}/${data.testCasesTotal || 0} passed\nExecution time: ${data.executionTimeMs || 0}ms\nMemory: ${data.memoryMb || 0}MB${data.details ? `\n\nDetails: ${data.details}` : ""}`
        );

        if (v === "Accepted") {
          toast.success(`Accepted! +${problem.xpReward} XP`);
          // Save submission & update profile
          if (user) {
            await supabase.from("submissions").insert({
              user_id: user.id,
              problem_id: problem.id,
              language,
              code,
              verdict: v,
              execution_time_ms: data.executionTimeMs,
              memory_mb: data.memoryMb,
              output: data.output,
              test_cases_passed: data.testCasesPassed,
              test_cases_total: data.testCasesTotal,
            });
            if (profile) {
              await updateProfile({
                xp: profile.xp + problem.xpReward,
                solved_count: profile.solved_count + 1,
              });
            }
          }
        } else {
          toast.error(v || "Error");
          if (user) {
            await supabase.from("submissions").insert({
              user_id: user.id,
              problem_id: problem.id,
              language,
              code,
              verdict: v || "Unknown",
              execution_time_ms: data.executionTimeMs,
              memory_mb: data.memoryMb,
              output: data.output,
              test_cases_passed: data.testCasesPassed,
              test_cases_total: data.testCasesTotal,
            });
          }
        }
      }
    } catch (err: any) {
      console.error("Execution error:", err);
      setOutput(`Error: ${err.message || "Failed to execute code"}`);
      toast.error("Failed to execute code");
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex h-[calc(100vh-64px)] flex-col lg:flex-row">
        {/* Left: Problem Description */}
        <div className="w-full overflow-y-auto border-r border-border p-6 lg:w-[45%]">
          <div className="mb-4 flex items-center gap-3">
            <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${problem.difficulty === "Easy" ? "bg-success/10 text-success" : problem.difficulty === "Medium" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>{problem.difficulty}</span>
            <span className="text-xs text-muted-foreground">{problem.source}</span>
            <span className="text-xs text-primary">+{problem.xpReward} XP</span>
          </div>
          <h1 className="mb-4 text-xl font-bold">{problem.title}</h1>
          <div className="mb-4 flex gap-2">{problem.topics.map((t) => <span key={t} className="rounded bg-surface-3 px-2 py-0.5 text-xs text-muted-foreground">{t}</span>)}</div>

          <div className="prose prose-sm prose-invert max-w-none">
            <p className="text-sm leading-relaxed text-foreground/90">{problem.description}</p>
            <h3 className="mt-6 text-sm font-semibold text-foreground">Constraints</h3>
            <ul className="mt-1 space-y-1">{problem.constraints.map((c, i) => <li key={i} className="text-sm font-mono text-muted-foreground">{c}</li>)}</ul>
            <h3 className="mt-6 text-sm font-semibold text-foreground">Sample Cases</h3>
            {problem.sampleCases.map((sc, i) => (
              <div key={i} className="mt-3 rounded-lg bg-surface-2 p-4">
                <div className="mb-2"><span className="text-xs font-medium text-muted-foreground">Input:</span><pre className="mt-1 font-mono text-sm text-foreground">{sc.input}</pre></div>
                <div><span className="text-xs font-medium text-muted-foreground">Output:</span><pre className="mt-1 font-mono text-sm text-foreground">{sc.output}</pre></div>
                {sc.explanation && <p className="mt-2 text-xs text-muted-foreground">Explanation: {sc.explanation}</p>}
              </div>
            ))}
          </div>

          <div className="mt-6">
            <button onClick={() => setShowHints(!showHints)} className="flex items-center gap-2 text-sm text-primary hover:underline">
              <Lightbulb className="h-4 w-4" />{showHints ? "Hide Hints" : "Show Hints"}
            </button>
            {showHints && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3">
                {problem.hints.map((h, i) => <div key={i} className="rounded-lg bg-primary/5 border border-primary/20 p-3 text-sm text-foreground/80">{h}</div>)}
              </motion.div>
            )}
          </div>
        </div>

        {/* Right: Code Editor */}
        <div className="flex w-full flex-col lg:w-[55%]">
          <div className="flex items-center justify-between border-b border-border px-4 py-2">
            <select
              value={language}
              onChange={(e) => { setLanguage(e.target.value); setCode(LANG_MAP[e.target.value]?.template || ""); }}
              className="rounded bg-surface-2 border border-border px-3 py-1.5 text-sm text-foreground"
            >
              {Object.keys(LANG_MAP).map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => callExecuteCode("run")} disabled={running}>
                <Play className="mr-1 h-3.5 w-3.5" />Run
              </Button>
              <Button size="sm" onClick={() => callExecuteCode("submit")} disabled={running} className="bg-gradient-gold font-semibold">
                <Send className="mr-1 h-3.5 w-3.5" />Submit
              </Button>
            </div>
          </div>

          <div className="flex-1 min-h-[300px]">
            <Editor
              height="100%"
              language={LANG_MONACO[language] || "plaintext"}
              value={code}
              onChange={(v) => setCode(v || "")}
              theme="vs-dark"
              options={{ fontSize: 14, fontFamily: '"JetBrains Mono", monospace', minimap: { enabled: false }, padding: { top: 16 }, scrollBeyondLastLine: false, lineNumbers: "on", tabSize: 4, automaticLayout: true }}
            />
          </div>

          <div className="border-t border-border">
            <div className="flex items-center gap-4 px-4 py-2 border-b border-border">
              <span className="text-sm font-medium">Output</span>
              {verdict && (
                <span className={`rounded-md px-2 py-0.5 text-xs font-bold ${verdict === "Accepted" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>{verdict}</span>
              )}
            </div>
            <pre className="h-32 overflow-y-auto p-4 font-mono text-xs text-muted-foreground">
              {running ? "Processing with Gemini AI..." : output || "Run or submit your code to see output here."}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
