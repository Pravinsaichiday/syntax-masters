import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { DSA_ROADMAP, getAllDSAProblems } from "@/data/dsaRoadmap";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useRef, useState, useCallback } from "react";

export default function DSARoadmapPage() {
  const { user } = useAuth();
  const [activeTopicId, setActiveTopicId] = useState<string>(DSA_ROADMAP[0]?.id || "");
  const topicRefs = useRef<Record<string, HTMLElement | null>>({});
  const sidebarRef = useRef<HTMLDivElement>(null);

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

  // Scrollspy logic
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY + 200;
    let currentId = DSA_ROADMAP[0]?.id || "";
    
    for (const topic of DSA_ROADMAP) {
      const el = topicRefs.current[topic.id];
      if (el && el.offsetTop <= scrollY) {
        currentId = topic.id;
      }
    }
    setActiveTopicId(currentId);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTopic = (topicId: string) => {
    const el = topicRefs.current[topicId];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Calculate scroll progress for the vertical line
  const activeIndex = DSA_ROADMAP.findIndex(t => t.id === activeTopicId);
  const scrollLinePercent = DSA_ROADMAP.length > 1
    ? (activeIndex / (DSA_ROADMAP.length - 1)) * 100
    : 0;

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

        {/* Main content with scrollspy sidebar */}
        <div className="flex gap-6">
          {/* Scrollspy Sidebar - hidden on mobile */}
          <div className="hidden lg:block w-56 shrink-0">
            <div ref={sidebarRef} className="sticky top-20">
              <div className="relative">
                {/* Background track line */}
                <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-border rounded-full" />
                {/* Active progress line */}
                <div
                  className="absolute left-[7px] top-0 w-[2px] rounded-full bg-primary transition-all duration-300 ease-out"
                  style={{ height: `${scrollLinePercent}%` }}
                />

                <div className="space-y-1 relative">
                  {DSA_ROADMAP.map((topic, i) => {
                    const tp = getTopicProgress(topic.id);
                    const isActive = activeTopicId === topic.id;
                    const isComplete = tp.percent === 100;
                    const hasProgress = tp.solved > 0;

                    return (
                      <button
                        key={topic.id}
                        onClick={() => scrollToTopic(topic.id)}
                        className={`flex items-center gap-2.5 w-full text-left py-1.5 pl-5 pr-2 rounded-r-md text-xs transition-all duration-200 ${
                          isActive
                            ? "text-primary font-semibold bg-primary/5"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {/* Dot on the line */}
                        <div className={`absolute left-[4px] h-[8px] w-[8px] rounded-full border-2 transition-all duration-200 ${
                          isComplete
                            ? "border-[hsl(var(--success))] bg-[hsl(var(--success))]"
                            : isActive
                            ? "border-primary bg-primary"
                            : hasProgress
                            ? "border-primary bg-primary/20"
                            : "border-border bg-background"
                        }`} />
                        <span className="truncate">{i + 1}. {topic.title}</span>
                        {isComplete && <CheckCircle2 className="h-3 w-3 text-[hsl(var(--success))] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Topic cards */}
          <div className="flex-1 space-y-5">
            {DSA_ROADMAP.map((topic, i) => {
              const tp = getTopicProgress(topic.id);
              const isComplete = tp.percent === 100;

              return (
                <motion.div
                  key={topic.id}
                  ref={(el) => { topicRefs.current[topic.id] = el; }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  id={`topic-${topic.id}`}
                >
                  <Link
                    to={`/dsa/${topic.id}`}
                    className={`group block rounded-xl border bg-card p-5 transition-all hover:border-primary/30 hover:glow-gold-sm ${
                      activeTopicId === topic.id ? "border-primary/20" : "border-border"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10 text-primary text-sm font-bold shrink-0">
                            {i + 1}
                          </div>
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
