import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useState, useCallback } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Play, ArrowLeft, Lightbulb, BookOpen, Trophy, ArrowRight, ExternalLink, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import confetti from "canvas-confetti";
import type { CurriculumTrack, CurriculumTopic, CurriculumQuestion, QuizQuestion } from "@/data/curriculumTypes";

import { C_CURRICULUM } from "@/data/cCurriculum";
import { CPP_CURRICULUM } from "@/data/cppCurriculum";
import { JAVA_CURRICULUM } from "@/data/javaCurriculum";
import { ALGORITHM_CURRICULUM, COMPETITIVE_CURRICULUM, INTERVIEW_CURRICULUM } from "@/data/algorithmCurriculum";

const TRACKS: Record<string, CurriculumTrack> = {
  "learn-c": C_CURRICULUM,
  "learn-cpp": CPP_CURRICULUM,
  "learn-java": JAVA_CURRICULUM,
  "algorithm-mastery": ALGORITHM_CURRICULUM,
  "competitive-prep": COMPETITIVE_CURRICULUM,
  "interview-prep": INTERVIEW_CURRICULUM,
};

const LANG_MONACO: Record<string, string> = {
  "C++": "cpp", Python: "python", Java: "java", C: "c",
};

export default function TrackTopicPage() {
  const { trackId, topicId } = useParams();
  const { user, profile, updateProfile } = useAuth();
  const track = trackId ? TRACKS[trackId] : null;
  const topic = track?.topics.find(t => t.id === topicId);

  const [activeTab, setActiveTab] = useState<"lesson" | "practice" | "quiz">("lesson");
  const [selectedQuestion, setSelectedQuestion] = useState<CurriculumQuestion | null>(null);
  const [selectedLang, setSelectedLang] = useState<string>(track?.language || "C++");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  const fireConfetti = useCallback(() => {
    const end = Date.now() + 1500;
    const colors = ["#FFD700", "#FFA500", "#FF6347", "#00CED1", "#7B68EE"];
    (function frame() {
      confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, []);

  if (!track || !topic) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-20 text-muted-foreground">Topic not found.</div>
      </div>
    );
  }

  const handleSelectQuestion = (q: CurriculumQuestion) => {
    setSelectedQuestion(q);
    const lang = Object.keys(q.starterCode)[0] || selectedLang;
    setSelectedLang(lang);
    setCode(q.starterCode[lang] || "");
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
          language: selectedLang,
          problemDescription: selectedQuestion.description,
          sampleCases: [{ input: "", output: selectedQuestion.expectedOutput }],
          mode: "submit",
        },
      });

      if (error) throw error;
      const verdict = data.verdict;
      setOutput(`Verdict: ${verdict}\n\n${data.details || ""}\n\nExecution time: ${data.executionTimeMs || 0}ms`);

      if (verdict === "Accepted") {
        fireConfetti();
        setShowSuccess(true);
        if (profile) {
          await updateProfile({
            xp: profile.xp + selectedQuestion.xpReward,
            solved_count: profile.solved_count + 1,
          });
          toast.success(`Correct! +${selectedQuestion.xpReward} XP`);
        }
      } else {
        toast.error(verdict || "Try again!");
      }
    } catch (err: any) {
      setOutput(`Error: ${err.message}`);
      toast.error("Execution failed");
    } finally {
      setRunning(false);
    }
  };

  const handleQuizAnswer = (idx: number) => {
    if (quizAnswer !== null) return;
    setQuizAnswer(idx);
    if (idx === topic.quiz[quizIndex].correctIndex) {
      setQuizScore(s => s + 1);
    }
  };

  const nextQuizQ = () => {
    if (quizIndex < topic.quiz.length - 1) {
      setQuizIndex(i => i + 1);
      setQuizAnswer(null);
    } else {
      setQuizDone(true);
    }
  };

  const currentQuiz = topic.quiz[quizIndex];

  // Render lesson content with proper markdown-like parsing
  const renderLesson = (content: string) => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("# ")) return <h2 key={i} className="text-xl font-bold text-foreground mt-0 mb-2">{line.slice(2)}</h2>;
      if (line.startsWith("## ")) return <h3 key={i} className="text-lg font-semibold text-foreground mt-5 mb-2">{line.slice(3)}</h3>;
      if (line.startsWith("### ")) return <h4 key={i} className="text-base font-semibold text-foreground mt-4 mb-1">{line.slice(4)}</h4>;
      if (line.startsWith("```")) return null;
      if (line.startsWith("| ")) return <p key={i} className="font-mono text-xs text-muted-foreground">{line}</p>;
      if (line.startsWith("- ")) return <li key={i} className="text-sm text-foreground/80 ml-4 mb-1">{line.slice(2)}</li>;
      if (line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. ") || line.startsWith("4. ") || line.startsWith("5. "))
        return <li key={i} className="text-sm text-foreground/80 ml-4 mb-1 list-decimal">{line.slice(3)}</li>;
      if (line.trim() === "") return <br key={i} />;
      return <p key={i} className="text-sm text-foreground/80 leading-relaxed">{line}</p>;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="mb-4 flex items-center gap-3">
          <Link to={`/learn/${trackId}`} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold">{topic.title}</h1>
            <p className="text-sm text-muted-foreground">{topic.description}</p>
          </div>
        </div>

        {/* Tab bar */}
        <div className="mb-6 flex gap-2">
          {(["lesson", "practice", "quiz"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab ? "bg-primary text-primary-foreground" : "bg-surface-2 text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "lesson" && <BookOpen className="h-4 w-4" />}
              {tab === "practice" && <Play className="h-4 w-4" />}
              {tab === "quiz" && <CheckCircle2 className="h-4 w-4" />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === "quiz" && <span className="ml-1 text-xs">({topic.quiz.length})</span>}
            </button>
          ))}
        </div>

        {activeTab === "lesson" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="space-y-6">
              {/* Lesson content */}
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="prose prose-sm prose-invert max-w-none">
                  {renderLesson(topic.lesson)}
                </div>
              </div>

              {/* Real-world Analogy */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                <h3 className="text-sm font-semibold text-primary mb-2">🌍 Real-World Analogy</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">{topic.realWorldAnalogy}</p>
              </div>

              {/* Visualization */}
              {topic.visualization && (
                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-3">📊 Visualization</h3>
                  <pre className="font-mono text-xs text-muted-foreground whitespace-pre overflow-x-auto bg-surface-2 p-4 rounded-lg">
                    {topic.visualization}
                  </pre>
                </div>
              )}

              {/* Code Examples in Multiple Languages */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-3">💻 Code Examples</h3>
                <div className="flex gap-2 mb-3 flex-wrap">
                  {Object.keys(topic.codeExamples).map(lang => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLang(lang)}
                      className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                        selectedLang === lang ? "bg-primary text-primary-foreground" : "bg-surface-2 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
                <pre className="rounded-lg bg-surface-2 p-4 font-mono text-xs text-foreground overflow-x-auto max-h-64 overflow-y-auto">
                  {topic.codeExamples[selectedLang] || Object.values(topic.codeExamples)[0]}
                </pre>
              </div>

              {/* Reference Links */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-3">📚 Reference Links</h3>
                <div className="space-y-2">
                  {topic.referenceLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      {link.title}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Questions sidebar */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Practice Problems</h3>
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
                  </div>
                  <div className="text-sm font-medium">{q.title}</div>
                  <div className="text-xs text-primary mt-1">+{q.xpReward} XP</div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "practice" && (
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
                  </div>
                  <h2 className="text-lg font-bold mb-3">{selectedQuestion.title}</h2>
                  <p className="text-sm text-foreground/80 mb-4 leading-relaxed whitespace-pre-wrap">{selectedQuestion.description}</p>
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
                    <div className="flex gap-2">
                      {Object.keys(selectedQuestion.starterCode).map(lang => (
                        <button
                          key={lang}
                          onClick={() => {
                            setSelectedLang(lang);
                            setCode(selectedQuestion.starterCode[lang] || "");
                          }}
                          className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                            selectedLang === lang ? "bg-primary text-primary-foreground" : "bg-surface-2 text-muted-foreground"
                          }`}
                        >
                          {lang}
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
                      language={LANG_MONACO[selectedLang] || "plaintext"}
                      value={code}
                      onChange={v => setCode(v || "")}
                      theme="vs-dark"
                      options={{ fontSize: 14, fontFamily: '"JetBrains Mono", monospace', minimap: { enabled: false }, padding: { top: 16 }, scrollBeyondLastLine: false, tabSize: 4, automaticLayout: true }}
                    />
                  </div>
                  <div className="border-t border-border">
                    <div className="px-4 py-2 border-b border-border">
                      <span className="text-sm font-medium">Output</span>
                    </div>
                    <pre className="h-28 overflow-y-auto p-4 font-mono text-xs text-muted-foreground">
                      {running ? "Processing..." : output || "Run your code to see output here."}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "quiz" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto">
            {topic.quiz.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No quiz questions available for this topic yet.</div>
            ) : quizDone ? (
              <div className="rounded-xl border border-border bg-card p-8 text-center">
                <Trophy className="mx-auto h-12 w-12 text-primary mb-4" />
                <h2 className="text-xl font-bold mb-2">Quiz Complete!</h2>
                <p className="text-muted-foreground mb-4">
                  You scored <span className="font-bold text-primary">{quizScore}/{topic.quiz.length}</span>
                </p>
                <Button onClick={() => { setQuizIndex(0); setQuizAnswer(null); setQuizScore(0); setQuizDone(false); }} variant="outline">
                  Retry Quiz
                </Button>
              </div>
            ) : (
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">Question {quizIndex + 1} of {topic.quiz.length}</span>
                  <span className="text-sm font-medium text-primary">Score: {quizScore}</span>
                </div>
                <h3 className="text-lg font-semibold mb-4">{currentQuiz.question}</h3>
                <div className="space-y-2 mb-4">
                  {currentQuiz.options.map((opt, i) => {
                    const isCorrect = i === currentQuiz.correctIndex;
                    const isSelected = quizAnswer === i;
                    let classes = "w-full text-left rounded-lg border p-3 text-sm transition-all ";
                    if (quizAnswer === null) {
                      classes += "border-border hover:border-primary/30 cursor-pointer";
                    } else if (isCorrect) {
                      classes += "border-success bg-success/10 text-success";
                    } else if (isSelected && !isCorrect) {
                      classes += "border-destructive bg-destructive/10 text-destructive";
                    } else {
                      classes += "border-border opacity-50";
                    }
                    return (
                      <button key={i} onClick={() => handleQuizAnswer(i)} className={classes} disabled={quizAnswer !== null}>
                        <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {quizAnswer !== null && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="rounded-lg bg-surface-2 p-3 text-sm text-foreground/80 mb-4">
                      <span className="font-semibold">Explanation: </span>{currentQuiz.explanation}
                    </div>
                    <Button onClick={nextQuizQ} className="bg-gradient-gold font-semibold">
                      {quizIndex < topic.quiz.length - 1 ? "Next Question" : "See Results"} <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="text-center sm:max-w-md border-border bg-card">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-4 py-4">
            <div className="rounded-full bg-primary/10 p-4">
              <Trophy className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-xl font-bold">Problem Solved! 🎉</h2>
            <p className="text-muted-foreground">Great work!</p>
            <Button variant="outline" onClick={() => setShowSuccess(false)}>Continue</Button>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
