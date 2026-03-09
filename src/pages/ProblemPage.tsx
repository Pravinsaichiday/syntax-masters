import { useParams, useNavigate } from "react-router-dom";
import { ALL_PROBLEMS } from "@/data/problemsDatabase";
import Navbar from "@/components/Navbar";
import Discussion from "@/components/Discussion";
import ProblemNotes from "@/components/ProblemNotes";

import SubmissionsHistory from "@/components/SubmissionsHistory";
import { useState, useCallback, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Play, Send, Lightbulb, ArrowRight, Trophy, Code2, Loader2, TestTube, BookOpen } from "lucide-react";
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

// Topic explanations for educational context
const TOPIC_EXPLANATIONS: Record<string, string> = {
  Arrays: "Arrays are contiguous blocks of memory storing elements of the same type. They provide O(1) random access but O(n) insertion/deletion. Master traversal, two-pointer, and sliding window techniques.",
  Strings: "Strings are sequences of characters. Key patterns include palindrome checking, anagram detection, pattern matching (KMP, Rabin-Karp), and string manipulation with StringBuilder/StringBuffer.",
  "Linked Lists": "Linked lists store elements with pointers to next nodes. They excel at O(1) insertion/deletion but have O(n) access time. Learn fast/slow pointers, reversal, and cycle detection.",
  "Hash Maps": "Hash maps provide O(1) average-case lookup, insert, and delete using hash functions. Essential for frequency counting, two-sum patterns, and caching.",
  Sorting: "Sorting arranges elements in order. Know O(n²) sorts (bubble, selection, insertion) and O(n log n) sorts (merge, quick, heap). Understand stability and in-place properties.",
  Searching: "Binary search achieves O(log n) on sorted data. Learn to identify monotonic properties and apply binary search on answers, not just arrays.",
  "Two Pointers": "Two pointers technique uses two indices moving towards each other or in the same direction. Useful for sorted arrays, pair finding, and partitioning.",
  "Sliding Window": "Sliding window maintains a subset of elements as a window slides over data. Perfect for subarray/substring problems with contiguous constraints.",
  Recursion: "Recursion solves problems by breaking them into smaller subproblems. Understand base cases, recursive cases, and the call stack.",
  "Dynamic Programming": "DP optimizes recursive solutions by storing results of subproblems. Identify overlapping subproblems and optimal substructure.",
  Trees: "Trees are hierarchical structures. Master traversals (inorder, preorder, postorder, level-order), BST operations, and tree DP.",
  Graphs: "Graphs model relationships between objects. Learn BFS, DFS, shortest paths (Dijkstra, Bellman-Ford), and topological sorting.",
  Stacks: "Stacks follow LIFO (Last In, First Out). Used for expression evaluation, parentheses matching, and monotonic stack problems.",
  Queues: "Queues follow FIFO (First In, First Out). Used for BFS, task scheduling, and sliding window maximum.",
  Math: "Mathematical problems involve number theory, modular arithmetic, GCD/LCM, prime numbers, and combinatorics.",
  "Bit Manipulation": "Bit manipulation uses binary operations (AND, OR, XOR, shift) for efficient computation. Common in optimization and encoding problems.",
  Greedy: "Greedy algorithms make locally optimal choices at each step. Prove the greedy choice property before applying.",
  Backtracking: "Backtracking explores all possibilities by building solutions incrementally and abandoning paths that fail constraints.",
  Heaps: "Heaps (priority queues) maintain max/min element efficiently. O(log n) insert/delete, O(1) peek. Used for K-th element and merge operations.",
  Matrix: "Matrix problems involve 2D array traversal, rotation, spiral order, and search. Often combine BFS/DFS with grid navigation.",
};

export default function ProblemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, updateProfile, profile } = useAuth();
  const problem = ALL_PROBLEMS.find((p) => p.id === id);
  const currentIndex = ALL_PROBLEMS.findIndex((p) => p.id === id);
  const nextProblem = currentIndex >= 0 && currentIndex < ALL_PROBLEMS.length - 1 ? ALL_PROBLEMS[currentIndex + 1] : null;

  const defaultLang = (profile as any)?.default_language || "C++";
  const [language, setLanguage] = useState(defaultLang);
  const [code, setCode] = useState(LANG_MAP[defaultLang]?.template || LANG_MAP["C++"].template);
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
  

  // Timer for time-taken tracking
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    startTimeRef.current = Date.now();
  }, [id]);

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
      
      const lang = (profile as any)?.default_language || "C++";
      setLanguage(lang);
      setCode(LANG_MAP[lang]?.template || LANG_MAP["C++"].template);
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

  const handleSetDefaultLang = async (lang: string) => {
    if (!user) return;
    await supabase.from("profiles").update({ default_language: lang } as any).eq("user_id", user.id);
    toast.success(`${lang} set as default language`);
  };

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

  const handleLoadSubmissionCode = (submittedCode: string, lang: string) => {
    setLanguage(lang);
    setCode(submittedCode);
    toast.success("Code loaded from submission");
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

  const timeTakenSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);

  const callExecuteCode = async (mode: "run" | "submit") => {
    if (!user) {
      toast.error("Please log in to run code");
      return;
    }
    setRunning(true);
    setVerdict(null);
    setOutput("Processing...");
    setActiveTab("output");
    const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000);
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
        setOutput(`Verdict: ${v}\n\nTest Cases: ${data.testCasesPassed || 0}/${data.testCasesTotal || 0} passed\nExecution time: ${data.executionTimeMs || 0}ms\nMemory: ${data.memoryMb || 0}MB\nTime taken: ${Math.floor(elapsed / 60)}m ${elapsed % 60}s${data.details ? `\n\nDetails: ${data.details}` : ""}`);
        if (v === "Accepted") {
          fireConfetti();
          setShowSuccess(true);
          await supabase.from("submissions").insert({ user_id: user.id, problem_id: problem.id, language, code, verdict: v, execution_time_ms: data.executionTimeMs, memory_mb: data.memoryMb, output: data.output, test_cases_passed: data.testCasesPassed, test_cases_total: data.testCasesTotal, time_taken_seconds: elapsed } as any);
          if (!alreadySolved && profile) {
            await updateProfile({ xp: profile.xp + problem.xpReward, solved_count: profile.solved_count + 1 });
            toast.success(`Accepted! +${problem.xpReward} XP`);
            setAlreadySolved(true);
          } else {
            toast.success("Accepted! (Already solved — no extra XP)");
          }
        } else {
          toast.error(v || "Error");
          await supabase.from("submissions").insert({ user_id: user.id, problem_id: problem.id, language, code, verdict: v || "Unknown", execution_time_ms: data.executionTimeMs, memory_mb: data.memoryMb, output: data.output, test_cases_passed: data.testCasesPassed, test_cases_total: data.testCasesTotal, time_taken_seconds: elapsed } as any);
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

  // Topic explanation
  const topicExplanation = problem.topics.map(t => TOPIC_EXPLANATIONS[t]).filter(Boolean).join("\n\n");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex h-[calc(100vh-64px)] flex-col lg:flex-row">
        {/* Left: Problem Description */}
        <div className="w-full overflow-y-auto border-r border-border p-6 lg:w-[45%]">
          <div className="mb-4 flex items-center gap-3 flex-wrap">
            <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${DIFF_COLORS[problem.difficulty] || ""}`}>{problem.difficulty}</span>
            <span className="text-xs text-muted-foreground">{problem.source}</span>
            <span className="text-xs text-primary">+{problem.xpReward} XP</span>
            {alreadySolved && <span className="rounded-md bg-success/10 px-2 py-0.5 text-xs font-bold text-success">✓ Solved</span>}
          </div>
          <h1 className="mb-4 text-2xl font-bold">{problem.title}</h1>
          <div className="mb-4 flex gap-2 flex-wrap">{problem.topics.map((t) => <span key={t} className="rounded bg-surface-3 px-2 py-0.5 text-xs text-muted-foreground">{t}</span>)}</div>

          <div className="prose prose-sm prose-invert max-w-none">
            <p className="text-[15px] leading-relaxed text-foreground/90">{problem.description}</p>

            {/* Input Format */}
            <div className="mt-6 rounded-lg border border-border bg-surface-2 p-4">
              <h3 className="text-sm font-bold text-foreground mb-2">📥 Input Format</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{problem.inputFormat}</p>
            </div>

            {/* Output Format */}
            <div className="mt-3 rounded-lg border border-border bg-surface-2 p-4">
              <h3 className="text-sm font-bold text-foreground mb-2">📤 Output Format</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{problem.outputFormat}</p>
            </div>

            {/* Constraints */}
            <div className="mt-3 rounded-lg border border-border bg-surface-2 p-4">
              <h3 className="text-sm font-bold text-foreground mb-2">⚠️ Constraints</h3>
              <ul className="space-y-1.5">
                {problem.constraints.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span className="text-sm font-mono text-muted-foreground">{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sample Cases */}
            <h3 className="mt-6 text-base font-bold text-foreground">Sample Cases</h3>
            {problem.sampleCases.map((sc, i) => (
              <div key={i} className="mt-3 rounded-lg border border-border bg-surface-2 p-4">
                <div className="mb-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">Input</span>
                  <pre className="mt-1 rounded bg-background p-3 font-mono text-sm text-foreground">{sc.input}</pre>
                </div>
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-success">Output</span>
                  <pre className="mt-1 rounded bg-background p-3 font-mono text-sm text-foreground">{sc.output}</pre>
                </div>
                {sc.explanation && <p className="mt-2 text-xs text-muted-foreground italic">💡 {sc.explanation}</p>}
              </div>
            ))}
          </div>

          {/* Topic Explanation - Educational */}
          {topicExplanation && (
            <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-5">
              <h3 className="text-sm font-semibold text-primary mb-2 flex items-center gap-2">
                <BookOpen className="h-4 w-4" /> Topic Explanation
              </h3>
              {problem.topics.map(t => TOPIC_EXPLANATIONS[t] ? (
                <div key={t} className="mb-3 last:mb-0">
                  <span className="text-xs font-bold text-foreground">{t}:</span>
                  <p className="text-xs text-foreground/70 leading-relaxed mt-0.5">{TOPIC_EXPLANATIONS[t]}</p>
                </div>
              ) : null)}
            </div>
          )}

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

          {/* Notes */}
          <ProblemNotes problemId={problem.id} />

          {/* Submissions History */}
          <SubmissionsHistory problemId={problem.id} onLoadCode={handleLoadSubmissionCode} />

          {/* Discussion Section */}
          <Discussion problemId={problem.id} />
        </div>

        {/* Right: Code Editor */}
        <div className="flex w-full flex-col lg:w-[55%]">

          <div className="flex items-center justify-between border-b border-border px-4 py-2">
            <div className="flex items-center gap-2">
              <select
                value={language}
                onChange={(e) => { setLanguage(e.target.value); setCode(LANG_MAP[e.target.value]?.template || ""); }}
                className="rounded bg-surface-2 border border-border px-3 py-1.5 text-sm text-foreground"
              >
                {Object.keys(LANG_MAP).map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
              <button
                onClick={() => handleSetDefaultLang(language)}
                className="text-[10px] text-muted-foreground hover:text-primary transition-colors"
                title="Set as default language"
              >
                Set Default
              </button>
            </div>
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
                className={`text-sm font-bold transition-colors ${activeTab === "output" ? "text-foreground border-b-2 border-primary pb-1" : "text-muted-foreground hover:text-foreground pb-1"}`}
              >
                Output
              </button>
              <button
                onClick={() => setActiveTab("custom")}
                className={`text-sm font-bold flex items-center gap-1 transition-colors ${activeTab === "custom" ? "text-foreground border-b-2 border-primary pb-1" : "text-muted-foreground hover:text-foreground pb-1"}`}
              >
                <TestTube className="h-3.5 w-3.5" /> Custom Test
              </button>
              {verdict && activeTab === "output" && (
                <span className={`rounded-md px-2.5 py-1 text-sm font-bold ${verdict === "Accepted" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>{verdict}</span>
              )}
            </div>

            {activeTab === "output" ? (
              <pre className="h-36 overflow-y-auto p-4 font-mono text-sm text-muted-foreground leading-relaxed">
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
        <DialogContent className="sm:max-w-sm border-0 bg-gradient-to-br from-surface-1 via-surface-2 to-surface-1 p-0 overflow-hidden shadow-2xl">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ type: "spring", duration: 0.6 }}
            className="relative"
          >
            {/* Top gradient accent */}
            <div className="h-2 w-full bg-gradient-to-r from-success via-primary to-success" />
            
            <div className="p-6 text-center">
              {/* Animated trophy icon */}
              <motion.div 
                initial={{ y: -20, rotate: -10 }}
                animate={{ y: 0, rotate: 0 }}
                transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
                className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-success/20 to-primary/20 border border-success/30 shadow-lg shadow-success/20"
              >
                <Trophy className="h-10 w-10 text-success drop-shadow-lg" />
              </motion.div>
              
              {/* Title */}
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-black mb-3 bg-gradient-to-r from-success via-primary to-success bg-clip-text text-transparent"
              >
                ACCEPTED! 🎉
              </motion.h2>
              
              {/* XP Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/30 px-4 py-2 mb-4"
              >
                {alreadySolved ? (
                  <span className="text-sm font-semibold text-muted-foreground">Already solved ✓</span>
                ) : (
                  <span className="text-lg font-black text-primary">+{problem?.xpReward} XP</span>
                )}
              </motion.div>
              
              {/* Stats row */}
              <div className="flex justify-center gap-4 mb-6">
                <div className="rounded-lg bg-surface-3/50 px-4 py-2 border border-border">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Test Cases</p>
                  <p className="text-sm font-bold text-success">All Passed</p>
                </div>
                <div className="rounded-lg bg-surface-3/50 px-4 py-2 border border-border">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Time</p>
                  <p className="text-sm font-bold text-foreground">{Math.floor(timeTakenSeconds / 60)}m {timeTakenSeconds % 60}s</p>
                </div>
              </div>
              
              {/* Buttons */}
              <div className="flex gap-3 justify-center">
                <Button 
                  variant="outline" 
                  onClick={() => setShowSuccess(false)}
                  className="border-border hover:bg-surface-3"
                >
                  Stay Here
                </Button>
                {nextProblem && (
                  <Button 
                    onClick={() => { setShowSuccess(false); navigate(`/problem/${nextProblem.id}`); }} 
                    className="bg-gradient-to-r from-success to-primary hover:opacity-90 font-bold shadow-lg shadow-primary/20"
                  >
                    Next Problem <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
