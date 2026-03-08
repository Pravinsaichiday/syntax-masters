import { useParams, Link, useNavigate } from "react-router-dom";
import { PYTHON_TOPICS } from "@/data/pythonTopics";
import Navbar from "@/components/Navbar";
import { useState, useCallback } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Play, CheckCircle2, Circle, ArrowLeft, Lightbulb, BookOpen, Trophy, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import confetti from "canvas-confetti";
import type { PythonQuestion } from "@/data/pythonTopics";

export default function PythonTopicPage() {
  const { topicId } = useParams();
  const { user, profile, updateProfile } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const topic = PYTHON_TOPICS.find(t => t.id === topicId);
  
  const [activeTab, setActiveTab] = useState<"lesson" | "practice">("lesson");
  const [selectedQuestion, setSelectedQuestion] = useState<PythonQuestion | null>(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);

  const fireConfetti = useCallback(() => {
    const end = Date.now() + 1500;
    const colors = ["#FFD700", "#FFA500", "#FF6347", "#00CED1", "#7B68EE"];
    (function frame() {
      confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, []);

  const getNextQuestion = useCallback(() => {
    if (!topic || !selectedQuestion) return null;
    const idx = topic.questions.findIndex(q => q.id === selectedQuestion.id);
    return idx < topic.questions.length - 1 ? topic.questions[idx + 1] : null;
  }, [topic, selectedQuestion]);

  const handleGoToNext = () => {
    const next = getNextQuestion();
    if (next) {
      handleSelectQuestion(next);
      setShowSuccess(false);
    } else {
      const topicIdx = PYTHON_TOPICS.findIndex(t => t.id === topicId);
      if (topicIdx < PYTHON_TOPICS.length - 1) {
        navigate(`/learn-python/${PYTHON_TOPICS[topicIdx + 1].id}`);
      } else {
        navigate("/learn-python");
      }
      setShowSuccess(false);
    }
  };

  const { data: progress = [] } = useQuery({
    queryKey: ["python-progress", user?.id, topicId],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase
        .from("python_progress")
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

  const isCompleted = (questionId: string) =>
    progress.some((p: any) => p.question_id === questionId && p.completed);

  const handleSelectQuestion = (q: PythonQuestion) => {
    setSelectedQuestion(q);
    setCode(q.starterCode);
    setOutput("");
    setShowHints(false);
    setActiveTab("practice");
  };

  const handleRunCode = async () => {
    if (!selectedQuestion || !user) return;
    setRunning(true);
    setOutput("Processing...");

    try {
      const { data, error } = await supabase.functions.invoke("execute-code", {
        body: {
          code,
          language: "Python",
          problemDescription: selectedQuestion.description,
          sampleCases: [{ input: "", output: selectedQuestion.expectedOutput }],
          mode: "submit",
        },
      });

      if (error) throw error;

      const verdict = data.verdict;
      setOutput(
        `Verdict: ${verdict}\n\n${data.details || ""}\n\nExecution time: ${data.executionTimeMs || 0}ms`
      );

      if (verdict === "Accepted") {
        const alreadySolved = isCompleted(selectedQuestion.id);
        
        // Save progress
        await supabase.from("python_progress").upsert({
          user_id: user.id,
          topic_id: topic.id,
          question_id: selectedQuestion.id,
          difficulty: selectedQuestion.difficulty,
          completed: true,
          code,
        }, { onConflict: "user_id,topic_id,question_id" });

        if (!alreadySolved && profile) {
          await updateProfile({
            xp: profile.xp + selectedQuestion.xpReward,
            solved_count: profile.solved_count + 1,
          });
          setEarnedXp(selectedQuestion.xpReward);
        } else {
          setEarnedXp(0);
        }

        queryClient.invalidateQueries({ queryKey: ["python-progress"] });
        
        // Fire celebration
        fireConfetti();
        setShowSuccess(true);
        toast.success(alreadySolved ? "Correct!" : `Correct! +${selectedQuestion.xpReward} XP`);
      } else {
        toast.error(verdict || "Try again!");
      }
    } catch (err: any) {
      console.error(err);
      setOutput(`Error: ${err.message || "Failed to execute code"}`);
      toast.error("Execution failed. Please try again.");
    } finally {
      setRunning(false);
    }
  };

  const completedCount = progress.filter((p: any) => p.completed).length;
  const totalQuestions = topic.questions.length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="mb-4 flex items-center gap-3">
          <Link to="/learn-python" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold">{topic.title}</h1>
            <p className="text-sm text-muted-foreground">{completedCount}/{totalQuestions} completed</p>
          </div>
        </div>

        {/* Tab bar */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setActiveTab("lesson")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "lesson" ? "bg-primary text-primary-foreground" : "bg-surface-2 text-muted-foreground"
            }`}
          >
            <BookOpen className="h-4 w-4" /> Lesson
          </button>
          <button
            onClick={() => setActiveTab("practice")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "practice" ? "bg-primary text-primary-foreground" : "bg-surface-2 text-muted-foreground"
            }`}
          >
            <Play className="h-4 w-4" /> Practice
          </button>
        </div>

        {activeTab === "lesson" ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-6 lg:grid-cols-[1fr_320px]">
            {/* Lesson content */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="prose prose-sm prose-invert max-w-none">
                {topic.lesson.split("\n").map((line, i) => {
                  if (line.startsWith("# ")) return <h2 key={i} className="text-xl font-bold text-foreground mt-0">{line.slice(2)}</h2>;
                  if (line.startsWith("## ")) return <h3 key={i} className="text-lg font-semibold text-foreground mt-4">{line.slice(3)}</h3>;
                  if (line.startsWith("```python")) return <pre key={i} className="mt-2 rounded-lg bg-surface-2 p-4 font-mono text-sm text-foreground overflow-x-auto">{""}</pre>;
                  if (line.startsWith("```")) return null;
                  if (line.startsWith("- ")) return <li key={i} className="text-sm text-foreground/80 ml-4">{line.slice(2)}</li>;
                  if (line.trim() === "") return <br key={i} />;
                  return <p key={i} className="text-sm text-foreground/80 leading-relaxed">{line}</p>;
                })}
              </div>
            </div>

            {/* Questions sidebar */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Practice Questions</h3>
              {topic.questions.map(q => (
                <button
                  key={q.id}
                  onClick={() => handleSelectQuestion(q)}
                  className="w-full rounded-lg border border-border bg-card p-4 text-left transition-all hover:border-primary/30"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                      q.difficulty === "Easy" ? "bg-success/10 text-success" :
                      q.difficulty === "Medium" ? "bg-primary/10 text-primary" :
                      "bg-destructive/10 text-destructive"
                    }`}>{q.difficulty}</span>
                    {isCompleted(q.id) ? (
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    ) : (
                      <Circle className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="text-sm font-medium">{q.title}</div>
                  <div className="text-xs text-primary mt-1">+{q.xpReward} XP</div>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {!selectedQuestion ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Select a question to start practicing</p>
                <div className="grid gap-3 max-w-md mx-auto">
                  {topic.questions.map(q => (
                    <button
                      key={q.id}
                      onClick={() => handleSelectQuestion(q)}
                      className="rounded-lg border border-border bg-card p-4 text-left transition-all hover:border-primary/30 flex items-center justify-between"
                    >
                      <div>
                        <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                          q.difficulty === "Easy" ? "bg-success/10 text-success" :
                          q.difficulty === "Medium" ? "bg-primary/10 text-primary" :
                          "bg-destructive/10 text-destructive"
                        }`}>{q.difficulty}</span>
                        <span className="ml-2 text-sm font-medium">{q.title}</span>
                      </div>
                      {isCompleted(q.id) ? <CheckCircle2 className="h-4 w-4 text-success" /> : <Circle className="h-4 w-4 text-muted-foreground" />}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-4" style={{ height: "calc(100vh - 220px)" }}>
                {/* Problem description */}
                <div className="w-full lg:w-[35%] overflow-y-auto rounded-xl border border-border bg-card p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                      selectedQuestion.difficulty === "Easy" ? "bg-success/10 text-success" :
                      selectedQuestion.difficulty === "Medium" ? "bg-primary/10 text-primary" :
                      "bg-destructive/10 text-destructive"
                    }`}>{selectedQuestion.difficulty}</span>
                    <span className="text-xs text-primary">+{selectedQuestion.xpReward} XP</span>
                    {isCompleted(selectedQuestion.id) && <CheckCircle2 className="h-4 w-4 text-success" />}
                  </div>
                  <h2 className="text-lg font-bold mb-3">{selectedQuestion.title}</h2>
                  <p className="text-sm text-foreground/80 mb-4 leading-relaxed">{selectedQuestion.description}</p>
                  <div className="rounded-lg bg-surface-2 p-3 text-xs font-mono text-muted-foreground mb-4">
                    {selectedQuestion.expectedOutput}
                  </div>
                  <button onClick={() => setShowHints(!showHints)} className="flex items-center gap-2 text-sm text-primary hover:underline">
                    <Lightbulb className="h-4 w-4" />{showHints ? "Hide Hints" : "Show Hints"}
                  </button>
                  {showHints && (
                    <div className="mt-2 space-y-2">
                      {selectedQuestion.hints.map((h, i) => (
                        <div key={i} className="rounded-lg bg-primary/5 border border-primary/20 p-3 text-sm text-foreground/80">{h}</div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Editor */}
                <div className="flex-1 flex flex-col rounded-xl border border-border overflow-hidden">
                  <div className="flex items-center justify-between border-b border-border px-4 py-2">
                    <span className="text-sm font-medium text-muted-foreground">Python</span>
                    <Button size="sm" onClick={handleRunCode} disabled={running} className="bg-gradient-gold font-semibold">
                      <Play className="mr-1 h-3.5 w-3.5" />{running ? "Running..." : "Run & Submit"}
                    </Button>
                  </div>
                  <div className="flex-1 min-h-[250px]">
                    <Editor
                      height="100%"
                      language="python"
                      value={code}
                      onChange={v => setCode(v || "")}
                      theme="vs-dark"
                      options={{ fontSize: 14, fontFamily: '"JetBrains Mono", monospace', minimap: { enabled: false }, padding: { top: 16 }, scrollBeyondLastLine: false, tabSize: 4, automaticLayout: true }}
                    />
                  </div>
                  <div className="border-t border-border">
                    <div className="px-4 py-2 border-b border-border text-sm font-medium">Output</div>
                    <pre className="h-28 overflow-y-auto p-4 font-mono text-xs text-muted-foreground">
                      {running ? "Processing..." : output || "Run your code to see output here."}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
