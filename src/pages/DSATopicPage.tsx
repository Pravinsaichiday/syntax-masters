import { useParams, Link, useNavigate } from "react-router-dom";
import { DSA_ROADMAP, DSA_TOPIC_TO_DB_TOPICS, type DSAProblem } from "@/data/dsaRoadmap";
import { ALL_PROBLEMS } from "@/data/problemsDatabase";
import Navbar from "@/components/Navbar";
import { useState, useCallback } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Play, CheckCircle2, Circle, ArrowLeft, ArrowRight, Eye, Trophy, AlertTriangle, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import confetti from "canvas-confetti";

const LANG_MAP: Record<string, string> = { python: "python", cpp: "cpp", java: "java" };
const LANG_LABELS: Record<string, string> = { python: "Python", cpp: "C++", java: "Java" };

export default function DSATopicPage() {
  const { topicId } = useParams();
  const { user, profile, updateProfile } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const topic = DSA_ROADMAP.find(t => t.id === topicId);

  const [selectedProblem, setSelectedProblem] = useState<DSAProblem | null>(null);
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);
  const [showSolutionConfirm, setShowSolutionConfirm] = useState(false);
  const [loadingSolution, setLoadingSolution] = useState(false);

  const fireConfetti = useCallback(() => {
    const end = Date.now() + 1500;
    const colors = ["#FFD700", "#FFA500", "#FF6347", "#00CED1", "#7B68EE"];
    (function frame() {
      confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, []);

  const { data: progress = [] } = useQuery({
    queryKey: ["dsa-progress", user?.id, topicId],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase
        .from("dsa_progress")
        .select("*")
        .eq("user_id", user.id)
        .eq("topic_id", topicId!);
      return data || [];
    },
    enabled: !!user && !!topicId,
  });

  if (!topic) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-20 text-muted-foreground">Topic not found.</div>
      </div>
    );
  }

  const allProblems = topic.subtopics.flatMap(s => s.problems);
  const isCompleted = (pid: string) => progress.some((p: any) => p.problem_id === pid && p.completed);
  const completedCount = allProblems.filter(p => isCompleted(p.id)).length;
  const progressPercent = allProblems.length > 0 ? Math.round((completedCount / allProblems.length) * 100) : 0;

  const handleSelectProblem = (p: DSAProblem) => {
    setSelectedProblem(p);
    const saved = progress.find((pr: any) => pr.problem_id === p.id && pr.completed && pr.code);
    const savedLang = saved ? (saved as any).language || "python" : "python";
    setLanguage(savedLang);
    setCode(saved ? (saved as any).code : (p.starterCode[savedLang] || p.starterCode.python));
    setOutput("");
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    if (selectedProblem) {
      const saved = progress.find((pr: any) => pr.problem_id === selectedProblem.id && pr.completed && pr.code && (pr as any).language === lang);
      setCode(saved ? (saved as any).code : (selectedProblem.starterCode[lang] || selectedProblem.starterCode.python));
    }
  };

  const getNextProblem = () => {
    if (!selectedProblem) return null;
    const idx = allProblems.findIndex(p => p.id === selectedProblem.id);
    return idx < allProblems.length - 1 ? allProblems[idx + 1] : null;
  };

  const handleGoToNext = () => {
    const next = getNextProblem();
    if (next) {
      handleSelectProblem(next);
      setShowSuccess(false);
    } else {
      const topicIdx = DSA_ROADMAP.findIndex(t => t.id === topicId);
      if (topicIdx < DSA_ROADMAP.length - 1) {
        navigate(`/dsa/${DSA_ROADMAP[topicIdx + 1].id}`);
      } else {
        navigate("/dsa");
      }
      setShowSuccess(false);
    }
  };

  const handleRunCode = async () => {
    if (!selectedProblem || !user) return;
    setRunning(true);
    setOutput("Processing...");

    try {
      const { data, error } = await supabase.functions.invoke("execute-code", {
        body: {
          code,
          language: LANG_LABELS[language],
          problemDescription: `${selectedProblem.title}\n\n${selectedProblem.description}`,
          sampleCases: selectedProblem.examples.map(e => ({ input: e.input, output: e.output })),
          mode: "submit",
          constraints: selectedProblem.constraints,
        },
      });

      if (error) throw error;

      const verdict = data.verdict;
      setOutput(`Verdict: ${verdict}\n\n${data.details || ""}\n\nExecution time: ${data.executionTimeMs || 0}ms\nMemory: ${data.memoryMb || 0}MB\nTest cases: ${data.testCasesPassed || 0}/${data.testCasesTotal || 0}`);

      if (verdict === "Accepted") {
        const alreadySolved = isCompleted(selectedProblem.id);

        await supabase.from("dsa_progress").upsert({
          user_id: user.id,
          topic_id: topic.id,
          problem_id: selectedProblem.id,
          completed: true,
          code,
          language,
        }, { onConflict: "user_id,topic_id,problem_id" });

        if (!alreadySolved && profile) {
          await updateProfile({
            xp: profile.xp + selectedProblem.xpReward,
            solved_count: profile.solved_count + 1,
          });
          setEarnedXp(selectedProblem.xpReward);
        } else {
          setEarnedXp(0);
        }

        queryClient.invalidateQueries({ queryKey: ["dsa-progress"] });
        fireConfetti();
        setShowSuccess(true);
        toast.success(alreadySolved ? "Correct!" : `Correct! +${selectedProblem.xpReward} XP`);
      } else {
        toast.error(verdict || "Try again!");
      }
    } catch (err: any) {
      console.error(err);
      setOutput(`Error: ${err.message || "Failed to execute code"}`);
      toast.error("Execution failed.");
    } finally {
      setRunning(false);
    }
  };

  const handleShowSolution = async () => {
    if (!selectedProblem || !user || !profile) return;
    setShowSolutionConfirm(false);
    setLoadingSolution(true);

    try {
      // Deduct 20 XP
      const newXp = Math.max(0, profile.xp - 20);
      await updateProfile({ xp: newXp });
      toast.warning("-20 XP for viewing solution");

      // Mark as used solution
      await supabase.from("dsa_progress").upsert({
        user_id: user.id,
        topic_id: topic.id,
        problem_id: selectedProblem.id,
        completed: false,
        used_solution: true,
        language,
      }, { onConflict: "user_id,topic_id,problem_id" });

      const { data, error } = await supabase.functions.invoke("execute-code", {
        body: {
          code: "",
          language: LANG_LABELS[language],
          problemDescription: `${selectedProblem.title}\n\n${selectedProblem.description}`,
          sampleCases: selectedProblem.examples.map(e => ({ input: e.input, output: e.output })),
          constraints: selectedProblem.constraints,
          mode: "solution",
        },
      });

      if (error) throw error;
      if (data?.solution) {
        setCode(data.solution);
        setOutput("💡 AI Solution loaded. Study it, then try to solve it yourself!");
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to get solution");
    } finally {
      setLoadingSolution(false);
    }
  };

  // Problem list view
  if (!selectedProblem) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-6">
          <div className="mb-4 flex items-center gap-3">
            <Link to="/dsa" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex-1">
              <h1 className="text-xl font-bold">{topic.title}</h1>
              <p className="text-sm text-muted-foreground">{topic.description}</p>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-6 rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{completedCount}/{allProblems.length} solved</span>
              <span className="text-sm font-bold text-primary">{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} className="h-2.5" />
          </div>

          {/* Subtopics with problems */}
          {topic.subtopics.map(sub => (
            <div key={sub.id} className="mb-6">
              <h2 className="text-lg font-semibold mb-1">{sub.title}</h2>
              <p className="text-sm text-muted-foreground mb-3">{sub.description}</p>
              <div className="space-y-2">
                {sub.problems.map((p, i) => (
                  <motion.button
                    key={p.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleSelectProblem(p)}
                    className="w-full rounded-lg border border-border bg-card p-4 text-left transition-all hover:border-primary/30 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      {isCompleted(p.id) ? (
                        <CheckCircle2 className="h-5 w-5 text-[hsl(var(--success))] shrink-0" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
                      )}
                      <div>
                        <span className="font-medium text-sm">{p.title}</span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                            p.difficulty === "Easy" ? "bg-[hsl(var(--success)/0.1)] text-[hsl(var(--success))]" :
                            p.difficulty === "Medium" ? "bg-primary/10 text-primary" :
                            "bg-destructive/10 text-destructive"
                          }`}>{p.difficulty}</span>
                          <span className="text-xs text-primary">+{p.xpReward} XP</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Problem solving view
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-4">
        <div className="mb-3 flex items-center gap-2">
          <button onClick={() => setSelectedProblem(null)} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <span className="text-sm text-muted-foreground">{topic.title}</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm font-medium">{selectedProblem.title}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-4" style={{ height: "calc(100vh - 140px)" }}>
          {/* Problem description */}
          <div className="w-full lg:w-[35%] overflow-y-auto rounded-xl border border-border bg-card p-5">
            <div className="mb-3 flex items-center gap-2">
              <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                selectedProblem.difficulty === "Easy" ? "bg-[hsl(var(--success)/0.1)] text-[hsl(var(--success))]" :
                selectedProblem.difficulty === "Medium" ? "bg-primary/10 text-primary" :
                "bg-destructive/10 text-destructive"
              }`}>{selectedProblem.difficulty}</span>
              <span className="text-xs text-primary">+{selectedProblem.xpReward} XP</span>
              {isCompleted(selectedProblem.id) && <CheckCircle2 className="h-4 w-4 text-[hsl(var(--success))]" />}
            </div>

            <h2 className="text-lg font-bold mb-3">{selectedProblem.title}</h2>
            <p className="text-sm text-foreground/80 mb-4 leading-relaxed whitespace-pre-wrap">{selectedProblem.description}</p>

            {/* Examples */}
            {selectedProblem.examples.map((ex, i) => (
              <div key={i} className="mb-3 rounded-lg bg-secondary p-3">
                <p className="text-xs font-semibold text-muted-foreground mb-1">Example {i + 1}:</p>
                <pre className="text-xs font-mono text-foreground/80">Input: {ex.input}{"\n"}Output: {ex.output}</pre>
                {ex.explanation && <p className="text-xs text-muted-foreground mt-1">{ex.explanation}</p>}
              </div>
            ))}

            {/* Constraints */}
            <div className="mt-3">
              <p className="text-xs font-semibold text-muted-foreground mb-1">Constraints:</p>
              <ul className="list-disc list-inside text-xs text-foreground/70 space-y-0.5">
                {selectedProblem.constraints.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>

            {/* AI Solution button */}
            <div className="mt-5 border-t border-border pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSolutionConfirm(true)}
                disabled={loadingSolution}
                className="text-destructive border-destructive/30 hover:bg-destructive/10"
              >
                <Eye className="mr-1 h-3.5 w-3.5" />
                {loadingSolution ? "Loading..." : "View AI Solution (-20 XP)"}
              </Button>
            </div>
          </div>

          {/* Editor */}
          <div className="flex-1 flex flex-col rounded-xl border border-border overflow-hidden">
            <div className="flex items-center justify-between border-b border-border px-4 py-2">
              <div className="flex items-center gap-2">
                {Object.keys(LANG_LABELS).map(l => (
                  <button
                    key={l}
                    onClick={() => handleLanguageChange(l)}
                    className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                      language === l ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {LANG_LABELS[l]}
                  </button>
                ))}
              </div>
              <Button size="sm" onClick={handleRunCode} disabled={running} className="bg-gradient-gold font-semibold">
                <Play className="mr-1 h-3.5 w-3.5" />{running ? "Running..." : "Run & Submit"}
              </Button>
            </div>
            <div className="flex-1 min-h-[250px]">
              <Editor
                height="100%"
                language={LANG_MAP[language] || "python"}
                value={code}
                onChange={v => setCode(v || "")}
                theme="vs-dark"
                options={{ fontSize: 14, fontFamily: '"JetBrains Mono", monospace', minimap: { enabled: false }, padding: { top: 16 }, scrollBeyondLastLine: false, tabSize: 4, automaticLayout: true }}
              />
            </div>
            <div className="border-t border-border">
              <div className="flex items-center justify-between px-4 py-2 border-b border-border">
                <span className="text-sm font-medium">Output</span>
                {isCompleted(selectedProblem.id) && (
                  <Button size="sm" onClick={handleGoToNext} className="bg-gradient-gold font-semibold">
                    {getNextProblem() ? "Next Problem" : "Next Topic"} <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
              <pre className="h-28 overflow-y-auto p-4 font-mono text-xs text-muted-foreground">
                {running ? "Processing..." : output || "Run your code to see output here."}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="text-center sm:max-w-md border-border bg-card">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-4 py-4">
            <div className="rounded-full bg-primary/10 p-4">
              <Trophy className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-xl font-bold">Problem Solved! 🎉</h2>
            {earnedXp > 0 && <p className="text-muted-foreground">You earned <span className="font-bold text-primary">+{earnedXp} XP</span></p>}
            {earnedXp === 0 && <p className="text-muted-foreground">Already completed — no extra XP</p>}
            <div className="flex gap-3 mt-2">
              <Button variant="outline" onClick={() => setShowSuccess(false)}>Stay Here</Button>
              <Button onClick={handleGoToNext} className="bg-gradient-gold font-semibold">
                {getNextProblem() ? "Next Problem" : "Next Topic"} <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Solution Confirm Dialog */}
      <Dialog open={showSolutionConfirm} onOpenChange={setShowSolutionConfirm}>
        <DialogContent className="text-center sm:max-w-md border-border bg-card">
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="rounded-full bg-destructive/10 p-4">
              <AlertTriangle className="h-10 w-10 text-destructive" />
            </div>
            <h2 className="text-lg font-bold">View AI Solution?</h2>
            <p className="text-sm text-muted-foreground">This will cost you <span className="font-bold text-destructive">-20 XP</span>. Try to solve it yourself first!</p>
            <div className="flex gap-3 mt-2">
              <Button variant="outline" onClick={() => setShowSolutionConfirm(false)}>Keep Trying</Button>
              <Button variant="destructive" onClick={handleShowSolution}>Show Solution (-20 XP)</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
