import Navbar from "@/components/Navbar";
import { PROBLEMS, TOPICS } from "@/data/mockData";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ProblemsPage() {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState<string>("All");
  const [topic, setTopic] = useState<string>("All");

  const filtered = useMemo(() => {
    return PROBLEMS.filter((p) => {
      if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (difficulty !== "All" && p.difficulty !== difficulty) return false;
      if (topic !== "All" && !p.topics.includes(topic)) return false;
      return true;
    });
  }, [search, difficulty, topic]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold">Problem Set</h1>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search problems..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-surface-2 border-border pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {["All", "Easy", "Medium", "Hard"].map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  difficulty === d
                    ? "bg-primary text-primary-foreground"
                    : "bg-surface-2 text-muted-foreground hover:text-foreground"
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
          {TOPICS.slice(0, 12).map((t) => (
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
            <span className="text-right">Difficulty</span>
            <span className="text-right hidden sm:block">Acceptance</span>
            <span className="text-right">XP</span>
          </div>
          {filtered.length === 0 ? (
            <div className="px-5 py-12 text-center text-muted-foreground">No problems found.</div>
          ) : (
            filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
              >
                <Link
                  to={`/problem/${p.id}`}
                  className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 border-b border-border px-5 py-4 transition-colors last:border-0 hover:bg-surface-2"
                >
                  <div>
                    <div className="font-medium">{p.title}</div>
                    <div className="mt-1 flex gap-1">
                      {p.topics.slice(0, 3).map((t) => (
                        <span key={t} className="rounded bg-surface-3 px-1.5 py-0.5 text-[10px] text-muted-foreground">{t}</span>
                      ))}
                    </div>
                  </div>
                  <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                    p.difficulty === "Easy" ? "bg-success/10 text-success" :
                    p.difficulty === "Medium" ? "bg-primary/10 text-primary" :
                    "bg-destructive/10 text-destructive"
                  }`}>
                    {p.difficulty}
                  </span>
                  <span className="text-sm text-muted-foreground hidden sm:block">{p.acceptance}%</span>
                  <span className="text-sm text-primary font-medium">+{p.xpReward}</span>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
