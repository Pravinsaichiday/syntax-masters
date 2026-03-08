import { useParams, useNavigate } from "react-router-dom";
import { ALL_PROBLEMS } from "@/data/problemsDatabase";
import Navbar from "@/components/Navbar";
import Discussion from "@/components/Discussion";
import { useState, useCallback, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Play, Send, Lightbulb, ArrowRight, Trophy, Code2, Loader2, TestTube } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import confetti from "canvas-confetti";
import { Dialog, DialogContent } from "@/components/ui/dialog";

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
  const navigate = useNavigate();
  const { user, updateProfile, profile } = useAuth();
  const problem = ALL_PROBLEMS.find((p) => p.id === id);
  const currentIndex = ALL_PROBLEMS.findIndex((p) => p.id === id);
  const nextProblem = currentIndex >= 0 && currentIndex < ALL_PROBLEMS.length - 1 ? ALL_PROBLEMS[currentIndex + 1] : null;

  const [language, setLanguage] = useState("C++");
  const [code, setCode] = useState(LANG_MAP["C++"].template);
  const [output, setOutput] = useState("");
  const [verdict, setVerdict] = useState<Verdict>(null);
  const [running, setRunning] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [alreadySolved, setAlreadySolved] = useState(false);
  const [solutionCode, setSolutionCode] = useState<string | null>(null);
  const [loadingSolution, setLoadingSolution] = useState(false);
  const [activeTab, setActiveTab] = useState<"output" | "custom">("output");
  const [customInput, setCustomInput] = useState("");
  const [customOutput, setCustomOutput] = useState("");

  useEffect(() => {
    if (!user || !problem) return;
    supabase
      .from("submissions")
      .select("id, code, language")
      .eq("user_id", user.id)
      .eq("problem_id", problem.id)
      .eq("verdict", "Accepted")
      .order("created_at", { ascending: false })
      .limit(1)
      .then(({ data }) => {
        if (data && data.length > 0) {
          setAlreadySolved(true);
          setCode(data[0].code);
          setLanguage(data[0].language);
        }
      });
  }, [user, problem?.id]);

  useEffect(() => {
    if (id) {
      setVerdict(null);
      setOutput("");
      setShowSuccess(false);
      setAlreadySolved(false);
      setSolutionCode(null);
      setCustomOutput("");
      setCode(LANG_MAP[language]?.template || "");
    }
  }, [id]);

  const fireConfetti = useCallback(() => {
    const duration = 3000;
    const end = Date.now() + duration;
    const colors = ["#FFD700", "#FFA500", "#FF6347", "#00CED1", "#7B68EE", "#32CD32"];
    const frame = () => {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  const handleGetSolution = async () => {
    if (!user || !profile || !problem) {
      toast.error("Please log in to unlock solutions");
      return;
    }
    if (profile.xp < 20) {
      toast.error("Not enough XP! You need at least 20 XP to unlock a solution.");
      return;
    }
    setLoadingSolution(true);
    try {
      const { data, error } = await supabase.functions.invoke("execute-code", {
        body: { code: "", language, problemDescription: problem.description, sampleCases: problem.sampleCases, mode: "solution", constraints: problem.constraints },
      });
      if (error) throw error;
      setSolutionCode(data.solution || "No solution generated");
      await updateProfile({ xp: Math.max(0, profile.xp - 20) });
      toast.success("Solution unlocked! -20 XP deducted.");
    } catch (err: any) {
      console.error("Solution error:", err);
      toast.error("Failed to generate solution");
    } finally {
      setLoadingSolution(false);
    }
  };

  const handleRunCustom = async () => {
    if (!customInput.trim()) {
      toast.error("Enter custom input first");
      return;
    }
    setRunning(true);
    setCustomOutput("Processing...");
    try {
      const { data, error } = await supabase.functions.invoke("execute-code", {
        body: { code, language, problemDescription: problem?.description, sampleCases: [{ input: customInput, output: "" }], mode: "run" },
      });
      if (error) throw error;
      const err = data.compilationError || data.error;
      setCustomOutput(err ? `Error:\n${err}` : `Output:\n${data.output || "(no output)"}\n\nExecution time: ${data.executionTimeMs || 0}ms`);
    } catch (err: any) {
      setCustomOutput(`Error: ${err.message}`);
    } finally {
      setRunning(false);
    }
  };

  if (!problem) {
    return <div className="min-h-screen bg-background"><Navbar /><div className="flex items-center justify-center py-20 text-muted-foreground">Problem not found.</div></div>;
  }

  const DIFF_COLORS: Record<string, string> = {
    "Very Easy": "bg-emerald-500/10 text-emerald-400",
    Easy: "bg-success/10 text-success",
    Basic: "bg-sky-500/10 text-sky-400",
    Intermediate: "bg-primary/10 text-primary",
    Advanced: "bg-destructive/10 text-destructive",
  };

  const callExecuteCode = async (mode: "run" | "submit") => {
    setRunning(true);
    setVerdict(null);
    setOutput("Processing...");
    setActiveTab("output");
    try {
      const { data, error } = await supabase.functions.invoke("execute-code", {
        body: { code, language, problemDescription: problem.description, sampleCases: problem.sampleCases, mode },
      });
      if (error) throw error;
      if (mode === "run") {
        const err = data.compilationError || data.error;
        setOutput(err ? `Error:\n${err}` : `Output:\n${data.output || "(no output)"}\n\nExecution time: ${data.executionTimeMs || 0}ms\nMemory: ${data.memoryMb || 0}MB`);
        if (!err) toast.success("Code executed successfully"); else toast.error("Execution error");
      } else {
        const v = data.verdict as Verdict;
        setVerdict(v);
        setOutput(`Verdict: ${v}\n\nTest Cases: ${data.testCasesPassed || 0}/${data.testCasesTotal || 0} passed\nExecution time: ${data.executionTimeMs || 0}ms\nMemory: ${data.memoryMb || 0}MB${data.details ? `\n\nDetails: ${data.details}` : ""}`);
        if (v === "Accepted") {
          fireConfetti();
          setShowSuccess(true);
          if (user) {
            await supabase.from("submissions").insert({ user_id: user.id, problem_id: problem.id, language, code, verdict: v, execution_time_ms: data.executionTimeMs, memory_mb: data.memoryMb, output: data.output, test_cases_passed: data.testCasesPassed, test_cases_total: data.testCasesTotal });
            if (!alreadySolved && profile) {
              await updateProfile({ xp: profile.xp + problem.xpReward, solved_count: profile.solved_count + 1 });
              toast.success(`Accepted! +${problem.xpReward} XP`);
              setAlreadySolved(true);
            } else {
              toast.success("Accepted! (Already solved — no extra XP)");
            }
          }
        } else {
          toast.error(v || "Error");
          if (user) {
            await supabase.from("submissions").insert({ user_id: user.id, problem_id: problem.id, language, code, verdict: v || "Unknown", execution_time_ms: data.executionTimeMs, memory_mb: data.memoryMb, output: data.output, test_cases_passed: data.testCasesPassed, test_cases_total: data.testCasesTotal });
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
            <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${DIFF_COLORS[problem.difficulty] || ""}`}>{problem.difficulty}</span>
            <span className="text-xs text-muted-foreground">{problem.source}</span>
            <span className="text-xs text-primary">+{problem.xpReward} XP</span>
            {alreadySolved && <span className="rounded-md bg-success/10 px-2 py-0.5 text-xs font-bold text-success">✓ Solved</span>}
          </div>
          <h1 className="mb-4 text-xl font-bold">{problem.title}</h1>
          <div className="mb-4 flex gap-2">{problem.topics.map((t) => <span key={t} className="rounded bg-surface-3 px-2 py-0.5 text-xs text-muted-foreground">{t}</span>)}</div>

          <div className="prose prose-sm prose-invert max-w-none">
            <p className="text-sm leading-relaxed text-foreground/90">{problem.description}</p>
            <h3 className="mt-6 text-sm font-semibold text-foreground">Input Format</h3>
            <p className="text-sm text-muted-foreground">{problem.inputFormat}</p>
            <h3 className="mt-4 text-sm font-semibold text-foreground">Output Format</h3>
            <p className="text-sm text-muted-foreground">{problem.outputFormat}</p>
            <h3 className="mt-4 text-sm font-semibold text-foreground">Constraints</h3>
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

          {/* Hints */}
          <div className="mt-6">
            <button onClick={() => setShowHints(!showHints)} className="flex items-center gap-2 text-sm text-primary hover:underline">
              <Lightbulb className="h-4 w-4" />{showHints ? "Hide Hints" : "Show Hints"}
            </button>
            {showHints && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 space-y-2">
                {problem.hints.map((h, i) => <div key={i} className="rounded-lg bg-primary/5 border border-primary/20 p-3 text-sm text-foreground/80">{h}</div>)}
              </motion.div>
            )}
          </div>

          {/* AI Solution */}
          <div className="mt-6 rounded-lg border border-border bg-surface-2 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2"><Code2 className="h-4 w-4 text-primary" /> Get AI Solution</h3>
                <p className="text-xs text-muted-foreground mt-1">Costs <span className="font-bold text-destructive">20 XP</span> • Use wisely!</p>
              </div>
              {!solutionCode && (
                <Button size="sm" variant="outline" onClick={handleGetSolution} disabled={loadingSolution} className="border-primary/30 text-primary hover:bg-primary/10">
                  {loadingSolution ? <><Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" />Generating...</> : <>Unlock Solution (-20 XP)</>}
                </Button>
              )}
            </div>
            {solutionCode && (
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                <pre className="rounded-lg bg-background p-4 text-xs font-mono text-foreground overflow-x-auto max-h-64 overflow-y-auto">{solutionCode}</pre>
              </motion.div>
            )}
          </div>

          {/* Discussion Section */}
          <Discussion problemId={problem.id} />
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

          {/* Output / Custom Test Cases tabs */}
          <div className="border-t border-border">
            <div className="flex items-center gap-4 px-4 py-2 border-b border-border">
              <button
                onClick={() => setActiveTab("output")}
                className={`text-sm font-medium transition-colors ${activeTab === "output" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                Output
              </button>
              <button
                onClick={() => setActiveTab("custom")}
                className={`text-sm font-medium flex items-center gap-1 transition-colors ${activeTab === "custom" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                <TestTube className="h-3.5 w-3.5" /> Custom Test
              </button>
              {verdict && activeTab === "output" && (
                <span className={`rounded-md px-2 py-0.5 text-xs font-bold ${verdict === "Accepted" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>{verdict}</span>
              )}
            </div>

            {activeTab === "output" ? (
              <pre className="h-32 overflow-y-auto p-4 font-mono text-xs text-muted-foreground">
                {running ? "Processing..." : output || "Run or submit your code to see output here."}
              </pre>
            ) : (
              <div className="h-32 flex gap-2 p-3">
                <div className="flex-1 flex flex-col">
                  <label className="text-[10px] font-medium text-muted-foreground mb-1">Custom Input</label>
                  <Textarea
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="Enter your test input..."
                    className="flex-1 bg-surface-2 text-xs font-mono min-h-0 resize-none"
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <Button size="sm" variant="outline" onClick={handleRunCustom} disabled={running} className="text-xs">
                    <Play className="h-3 w-3 mr-1" />Run
                  </Button>
                </div>
                <div className="flex-1 flex flex-col">
                  <label className="text-[10px] font-medium text-muted-foreground mb-1">Output</label>
                  <pre className="flex-1 overflow-y-auto rounded bg-surface-2 p-2 text-xs font-mono text-muted-foreground">
                    {customOutput || "Output will appear here..."}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Next Problem */}
          <AnimatePresence>
            {verdict === "Accepted" && nextProblem && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="border-t border-border px-4 py-3">
                <Button onClick={() => navigate(`/problem/${nextProblem.id}`)} className="w-full bg-gradient-gold font-semibold">
                  Next Problem: {nextProblem.title} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", duration: 0.5 }}>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
              <Trophy className="h-8 w-8 text-success" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Problem Solved! 🎉</h2>
            <p className="text-muted-foreground mb-1">
              {alreadySolved ? "You've already solved this one!" : <>You earned <span className="font-bold text-primary">+{problem?.xpReward} XP</span></>}
            </p>
            <p className="text-sm text-muted-foreground mb-6">All test cases passed successfully!</p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => setShowSuccess(false)}>Stay Here</Button>
              {nextProblem && (
                <Button onClick={() => { setShowSuccess(false); navigate(`/problem/${nextProblem.id}`); }} className="bg-gradient-gold font-semibold">
                  Next Problem <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              )}
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
