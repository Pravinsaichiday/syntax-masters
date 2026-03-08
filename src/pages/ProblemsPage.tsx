import Navbar from "@/components/Navbar";
import { ALL_PROBLEMS, EXPANDED_TOPICS, type Difficulty } from "@/data/problemsDatabase";
import { LEARNING_TRACKS } from "@/data/learningTracks";
import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, BookOpen, Lock, Unlock, ArrowRight, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const DIFFICULTIES: (Difficulty | "All")[] = ["All", "Very Easy", "Easy", "Basic", "Intermediate", "Advanced"];

const DIFF_COLORS: Record<Difficulty, string> = {
  "Very Easy": "bg-emerald-500/10 text-emerald-400",
  "Easy": "bg-success/10 text-success",
  "Basic": "bg-sky-500/10 text-sky-400",
  "Intermediate": "bg-primary/10 text-primary",
  "Advanced": "bg-destructive/10 text-destructive",
};

const DIFF_ORDER: Record<string, number> = { "Very Easy": 0, Easy: 1, Basic: 2, Intermediate: 3, Advanced: 4 };

type SortKey = "none" | "difficulty-asc" | "difficulty-desc" | "acceptance-asc" | "acceptance-desc" | "xp-asc" | "xp-desc";

export default function ProblemsPage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState<string>(searchParams.get("difficulty") || "All");
  const [topic, setTopic] = useState<string>(searchParams.get("topic") || "All");
  const [sortBy, setSortBy] = useState<SortKey>("none");

  const { data: settings } = useQuery({
    queryKey: ["admin-settings"],
    queryFn: async () => {
      const { data } = await supabase.from("admin_settings").select("*");
      return data || [];
    },
  });

  const pythonLocked = settings?.find((s: any) => s.key === "python_locked")?.value === "true";

  const toggleSort = (key: "difficulty" | "acceptance" | "xp") => {
    if (sortBy === `${key}-asc`) setSortBy(`${key}-desc`);
    else if (sortBy === `${key}-desc`) setSortBy("none");
    else setSortBy(`${key}-asc`);
  };

  const filtered = useMemo(() => {
    let result = ALL_PROBLEMS.filter((p) => {
      if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (difficulty !== "All" && p.difficulty !== difficulty) return false;
      if (topic !== "All" && !p.topics.includes(topic)) return false;
      return true;
    });

    if (sortBy.startsWith("difficulty")) {
      const dir = sortBy.endsWith("asc") ? 1 : -1;
      result = [...result].sort((a, b) => dir * ((DIFF_ORDER[a.difficulty] || 0) - (DIFF_ORDER[b.difficulty] || 0)));
    } else if (sortBy.startsWith("acceptance")) {
      const dir = sortBy.endsWith("asc") ? 1 : -1;
      result = [...result].sort((a, b) => dir * ((a.acceptance || 0) - (b.acceptance || 0)));
    } else if (sortBy.startsWith("xp")) {
      const dir = sortBy.endsWith("asc") ? 1 : -1;
      result = [...result].sort((a, b) => dir * (a.xpReward - b.xpReward));
    }

    return result;
  }, [search, difficulty, topic, sortBy]);

  const getSortIcon = (key: string) => {
    if (sortBy === `${key}-asc`) return "↑";
    if (sortBy === `${key}-desc`) return "↓";
    return "";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Problem Set</h1>
          <span className="text-sm text-muted-foreground">{ALL_PROBLEMS.length} problems</span>
        </div>

        {/* Learning Tracks */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h2 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Learning Tracks</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {LEARNING_TRACKS.map((track) => (
              <Link
                key={track.id}
                to={track.route}
                className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:glow-gold-sm"
              >
                <span className="text-2xl">{track.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold truncate">{track.title}</h3>
                    {track.id === "learn-python" && (pythonLocked ? <Lock className="h-3 w-3 text-destructive flex-shrink-0" /> : <Unlock className="h-3 w-3 text-success flex-shrink-0" />)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{track.description}</p>
                  <p className="text-xs text-primary mt-1">{track.difficulty}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary flex-shrink-0 mt-1" />
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search problems..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-surface-2 border-border pl-10" />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {DIFFICULTIES.map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  difficulty === d ? "bg-primary text-primary-foreground" : "bg-surface-2 text-muted-foreground hover:text-foreground"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Topic Tags */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setTopic("All")}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              topic === "All" ? "bg-primary/10 text-primary" : "bg-surface-3 text-muted-foreground hover:text-foreground"
            }`}
          >
            All Topics
          </button>
          {EXPANDED_TOPICS.map((t) => (
            <button
              key={t}
              onClick={() => setTopic(t === topic ? "All" : t)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                topic === t ? "bg-primary/10 text-primary" : "bg-surface-3 text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Problem List */}
        <div className="rounded-xl border border-border bg-card">
          <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 border-b border-border px-5 py-3 text-xs font-medium text-muted-foreground">
            <span>Title</span>
            <button onClick={() => toggleSort("difficulty")} className="text-right flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer">
              Difficulty {getSortIcon("difficulty")} <ArrowUpDown className="h-3 w-3" />
            </button>
            <button onClick={() => toggleSort("acceptance")} className="text-right hidden sm:flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer">
              Acceptance {getSortIcon("acceptance")} <ArrowUpDown className="h-3 w-3" />
            </button>
            <button onClick={() => toggleSort("xp")} className="text-right flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer">
              XP {getSortIcon("xp")} <ArrowUpDown className="h-3 w-3" />
            </button>
          </div>
          {filtered.length === 0 ? (
            <div className="px-5 py-12 text-center text-muted-foreground">No problems found.</div>
          ) : (
            filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: Math.min(i * 0.02, 0.5) }}
              >
                <Link
                  to={`/problem/${p.id}`}
                  className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 border-b border-border px-5 py-4 transition-colors last:border-0 hover:bg-surface-2"
                >
                  <div>
                    <div className="font-medium">{p.title}</div>
                    <div className="mt-1 flex gap-1 flex-wrap">
                      {p.topics.slice(0, 3).map((t) => (
                        <span key={t} className="rounded bg-surface-3 px-1.5 py-0.5 text-[10px] text-muted-foreground">{t}</span>
                      ))}
                    </div>
                  </div>
                  <span className={`rounded-md px-2 py-0.5 text-xs font-medium whitespace-nowrap ${DIFF_COLORS[p.difficulty as Difficulty] || ""}`}>
                    {p.difficulty}
                  </span>
                  <span className="text-sm text-muted-foreground hidden sm:block">{p.acceptance}%</span>
                  <span className="text-sm text-primary font-medium">+{p.xpReward}</span>
                </Link>
              </motion.div>
            ))
          )}
        </div>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          Showing {filtered.length} of {ALL_PROBLEMS.length} problems
        </div>
      </div>
    </div>
  );
}
