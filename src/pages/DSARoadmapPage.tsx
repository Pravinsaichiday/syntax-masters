import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { DSA_ROADMAP, getAllDSAProblems } from "@/data/dsaRoadmap";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, ChevronRight, Lock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function DSARoadmapPage() {
  const { user } = useAuth();

  const { data: progress = [] } = useQuery({
    queryKey: ["dsa-progress-all", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase
        .from("dsa_progress")
        .select("*")
        .eq("user_id", user.id)
        .eq("completed", true);
      return data || [];
    },
    enabled: !!user,
  });

  const totalProblems = getAllDSAProblems().length;
  const solvedIds = new Set(progress.map((p: any) => p.problem_id));
  const overallPercent = totalProblems > 0 ? Math.round((solvedIds.size / totalProblems) * 100) : 0;

  const getTopicProgress = (topicId: string) => {
    const topic = DSA_ROADMAP.find(t => t.id === topicId);
    if (!topic) return { solved: 0, total: 0, percent: 0 };
    let total = 0;
    let solved = 0;
    for (const sub of topic.subtopics) {
      for (const p of sub.problems) {
        total++;
        if (solvedIds.has(p.id)) solved++;
      }
    }
    return { solved, total, percent: total > 0 ? Math.round((solved / total) * 100) : 0 };
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            DSA <span className="text-gradient-gold">Roadmap</span>
          </h1>
          <p className="text-muted-foreground mb-4">Master Data Structures & Algorithms from scratch — solve every problem topic by topic.</p>

          {/* Overall progress */}
          <div className="rounded-xl border border-border bg-card p-5 glow-gold-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm font-bold text-primary">{overallPercent}%</span>
            </div>
            <Progress value={overallPercent} className="h-3" />
            <p className="text-xs text-muted-foreground mt-2">{solvedIds.size} / {totalProblems} problems solved</p>
          </div>
        </motion.div>

        {/* Roadmap timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

          <div className="space-y-6">
            {DSA_ROADMAP.map((topic, i) => {
              const tp = getTopicProgress(topic.id);
              const isComplete = tp.percent === 100;

              return (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={`/dsa/${topic.id}`}
                    className="group block rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:glow-gold-sm md:ml-14"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-4 hidden md:flex items-center justify-center">
                      <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                        isComplete ? "border-[hsl(var(--success))] bg-[hsl(var(--success))]" : tp.solved > 0 ? "border-primary bg-primary/20" : "border-border bg-background"
                      }`}>
                        {isComplete && <CheckCircle2 className="h-3 w-3 text-background" />}
                      </div>
                    </div>

                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-2xl">{topic.icon}</span>
                          <div>
                            <h2 className="text-lg font-bold group-hover:text-primary transition-colors">{topic.title}</h2>
                            <p className="text-sm text-muted-foreground">{topic.description}</p>
                          </div>
                        </div>

                        {/* Subtopics preview */}
                        <div className="mt-3 flex flex-wrap gap-2">
                          {topic.subtopics.map(sub => (
                            <span key={sub.id} className="rounded-md bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">
                              {sub.title}
                            </span>
                          ))}
                        </div>

                        {/* Progress bar */}
                        <div className="mt-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted-foreground">{tp.solved}/{tp.total} problems</span>
                            <span className="text-xs font-medium text-primary">{tp.percent}%</span>
                          </div>
                          <Progress value={tp.percent} className="h-2" />
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors mt-1 ml-4 shrink-0" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
