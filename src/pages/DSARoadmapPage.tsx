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
  const sidebarDotsRef = useRef<Record<string, HTMLElement | null>>({});

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

  // Scrollspy
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY + 220;
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
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTopic = (topicId: string) => {
    const el = topicRefs.current[topicId];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const activeIndex = DSA_ROADMAP.findIndex(t => t.id === activeTopicId);
  const totalTopics = DSA_ROADMAP.length;

  // Calculate line height based on dot positions for accuracy
  const getLineHeight = () => {
    if (totalTopics <= 1) return "0px";
    // Use percentage that maps first dot to last dot
    const percent = ((activeIndex + 1) / totalTopics) * 100;
    return `${percent}%`;
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
          <p className="text-muted-foreground mb-4">Master Data Structures & Algorithms — 12 core topics with 40+ real problems.</p>
          <div className="rounded-xl border border-border bg-card p-5 glow-gold-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm font-bold text-primary">{overallPercent}%</span>
            </div>
            <Progress value={overallPercent} className="h-3" />
            <p className="text-xs text-muted-foreground mt-2">{solvedIds.size} / {totalProblems} problems solved</p>
          </div>
        </motion.div>

        {/* Main layout */}
        <div className="flex gap-8">
          {/* Scrollspy Sidebar */}
          <div className="hidden lg:block w-60 shrink-0">
            <div className="sticky top-20">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 pl-7">Topics</p>
              <nav className="relative">
                {/* Background track */}
                <div className="absolute left-[10px] top-0 bottom-0 w-[3px] rounded-full bg-border" />
                {/* Active progress fill */}
                <div
                  className="absolute left-[10px] top-0 w-[3px] rounded-full bg-primary"
                  style={{
                    height: getLineHeight(),
                    transition: "height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />

                <ul className="relative space-y-0">
                  {DSA_ROADMAP.map((topic, i) => {
                    const tp = getTopicProgress(topic.id);
                    const isActive = activeTopicId === topic.id;
                    const isComplete = tp.percent === 100;
                    const hasProgress = tp.solved > 0;
                    const isPast = i <= activeIndex;

                    return (
                      <li key={topic.id}>
                        <button
                          onClick={() => scrollToTopic(topic.id)}
                          className={`relative flex items-center w-full text-left py-2.5 pl-8 pr-2 rounded-r-lg text-[13px] leading-tight transition-all duration-300 ${
                            isActive
                              ? "text-primary font-bold bg-primary/8"
                              : isPast
                              ? "text-foreground/70 font-medium"
                              : "text-muted-foreground/60 hover:text-muted-foreground"
                          }`}
                        >
                          {/* Dot on the line */}
                          <span
                            ref={(el) => { sidebarDotsRef.current[topic.id] = el; }}
                            className={`absolute left-[4px] h-[14px] w-[14px] rounded-full border-[3px] transition-all duration-300 ${
                              isComplete
                                ? "border-[hsl(var(--success))] bg-[hsl(var(--success))] scale-110"
                                : isActive
                                ? "border-primary bg-primary scale-125 shadow-[0_0_8px_hsl(var(--primary)/0.5)]"
                                : hasProgress
                                ? "border-primary/60 bg-primary/25"
                                : isPast
                                ? "border-primary/40 bg-primary/15"
                                : "border-muted-foreground/20 bg-muted/30"
                            }`}
                          />
                          <span className="truncate">{topic.title}</span>
                          {isComplete && <CheckCircle2 className="h-3.5 w-3.5 text-[hsl(var(--success))] shrink-0 ml-auto" />}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>

          {/* Topic cards */}
          <div className="flex-1 space-y-5">
            {DSA_ROADMAP.map((topic, i) => {
              const tp = getTopicProgress(topic.id);
              const isActive = activeTopicId === topic.id;
              // Distance from active for fade effect
              const distance = Math.abs(i - activeIndex);
              const opacity = isActive ? 1 : distance === 1 ? 0.7 : distance === 2 ? 0.45 : 0.3;
              const scale = isActive ? 1 : 0.98;

              return (
                <div
                  key={topic.id}
                  ref={(el) => { topicRefs.current[topic.id] = el; }}
                  id={`topic-${topic.id}`}
                  className="transition-all duration-500 ease-out"
                  style={{
                    opacity,
                    transform: `scale(${scale})`,
                  }}
                >
                  <Link
                    to={`/dsa/${topic.id}`}
                    className={`group block rounded-xl border bg-card p-5 transition-all duration-300 hover:opacity-100 hover:scale-100 hover:border-primary/40 hover:glow-gold-sm ${
                      isActive ? "border-primary/30 glow-gold-sm" : "border-border"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <div className={`flex items-center justify-center h-9 w-9 rounded-lg text-sm font-bold shrink-0 transition-colors duration-300 ${
                            isActive ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                          }`}>
                            {i + 1}
                          </div>
                          <div>
                            <h2 className={`text-lg font-bold transition-colors duration-300 ${
                              isActive ? "text-primary" : "group-hover:text-primary"
                            }`}>{topic.title}</h2>
                            <p className="text-sm text-muted-foreground">{topic.description}</p>
                          </div>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {topic.subtopics.map(sub => (
                            <span key={sub.id} className="rounded-md bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">
                              {sub.title}
                            </span>
                          ))}
                        </div>

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
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
