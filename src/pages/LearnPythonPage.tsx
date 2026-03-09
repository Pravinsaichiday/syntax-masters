import Navbar from "@/components/Navbar";
import { PYTHON_TOPICS } from "@/data/pythonTopics";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Lock, Unlock, BookOpen, CheckCircle2, Circle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export default function LearnPythonPage() {
  const { user, isAuthenticated } = useAuth();
  const [isLocked, setIsLocked] = useState(false);

  // Check if Python section is locked
  const { data: settings } = useQuery({
    queryKey: ["admin-settings"],
    queryFn: async () => {
      const { data } = await supabase.from("admin_settings").select("*");
      return data || [];
    },
  });

  useEffect(() => {
    if (settings) {
      const locked = settings.find((s: any) => s.key === "python_locked" || s.key === "learn_python_locked");
      setIsLocked(locked?.value === "true");
    }
  }, [settings]);

  // Fetch user progress
  const { data: progress = [] } = useQuery({
    queryKey: ["python-progress", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase
        .from("python_progress")
        .select("*")
        .eq("user_id", user.id)
        .eq("completed", true);
      return data || [];
    },
    enabled: !!user,
  });

  if (isLocked) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <Lock className="mx-auto mb-4 h-16 w-16 text-destructive" />
          <h1 className="text-2xl font-bold mb-2">Section Locked</h1>
          <p className="text-muted-foreground">This section is currently locked by the administrator. Please check back later.</p>
        </div>
      </div>
    );
  }

  const getTopicProgress = (topicId: string) => {
    const topicQuestions = PYTHON_TOPICS.find(t => t.id === topicId)?.questions || [];
    const completed = progress.filter((p: any) => p.topic_id === topicId).length;
    return { completed, total: topicQuestions.length };
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-2 flex items-center gap-3">
            <BookOpen className="h-7 w-7 text-primary" />
            <h1 className="text-2xl font-bold">Learn Python from Scratch</h1>
            <Unlock className="h-5 w-5 text-success" />
          </div>
          <p className="mb-8 text-muted-foreground">
            Master Python from beginner to advanced — 20 topics, 60 hands-on problems.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PYTHON_TOPICS.map((topic, i) => {
            const prog = getTopicProgress(topic.id);
            const pct = prog.total > 0 ? Math.round((prog.completed / prog.total) * 100) : 0;
            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  to={isAuthenticated ? `/learn-python/${topic.id}` : "/login"}
                  onClick={() => {
                    if (!isAuthenticated) toast.error("Please login to access lessons");
                  }}
                  className="block rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:glow-gold-sm"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      #{topic.order}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {pct === 100 ? (
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      ) : pct > 0 ? (
                        <span className="text-xs text-primary font-medium">{pct}%</span>
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                  <h3 className="mb-1 font-semibold">{topic.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{topic.description}</p>
                  <div className="mt-3 flex gap-1">
                    {["Easy", "Medium", "Hard"].map(d => (
                      <span key={d} className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                        d === "Easy" ? "bg-success/10 text-success" :
                        d === "Medium" ? "bg-primary/10 text-primary" :
                        "bg-destructive/10 text-destructive"
                      }`}>{d}</span>
                    ))}
                  </div>
                  {prog.completed > 0 && (
                    <div className="mt-3 h-1.5 w-full rounded-full bg-surface-3">
                      <div className="h-1.5 rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
