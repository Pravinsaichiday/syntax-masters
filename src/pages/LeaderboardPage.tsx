import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Trophy, Flame, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export default function LeaderboardPage() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"all" | "weekly" | "daily">("all");

  const { data: users = [] } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .gt("solved_count", 0)
        .order("xp", { ascending: false })
        .limit(100);
      return (data || []).map((u, i) => ({
        rank: i + 1,
        username: u.username || "user_" + u.user_id.slice(0, 6),
        name: u.name,
        xp: u.xp,
        solved: u.solved_count,
        streak: u.streak,
        user_id: u.user_id,
      }));
    },
    refetchInterval: 30000, // real-time every 30s
  });

  const filtered = users.filter(
    (u) =>
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold flex items-center gap-2">
          <Trophy className="h-6 w-6 text-primary" />
          Leaderboard
        </h1>

        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-2">
            {(["all", "weekly", "daily"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-lg px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                  tab === t ? "bg-primary text-primary-foreground" : "bg-surface-2 text-muted-foreground"
                }`}
              >
                {t === "all" ? "All Time" : t}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-surface-2 border-border pl-10" />
          </div>
        </div>

        {/* Top 3 Podium */}
        {filtered.length >= 3 && (
          <div className="mb-8 hidden sm:grid grid-cols-3 gap-4">
            {[1, 0, 2].map((order, i) => {
              const user = filtered[order];
              if (!user) return null;
              const heights = ["h-32", "h-40", "h-28"];
              return (
                <motion.div
                  key={user.user_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="flex flex-col items-center"
                >
                  <div className="mb-2 text-center">
                    <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-surface-2 text-lg font-bold text-primary mx-auto">
                      {user.name.charAt(0)}
                    </div>
                    <Link to={`/profile/${user.username}`} className="text-sm font-semibold hover:text-primary transition-colors truncate block max-w-[120px] mx-auto">{user.username}</Link>
                    <div className="text-xs text-muted-foreground">{user.xp.toLocaleString()} XP</div>
                  </div>
                  <div className={`w-full rounded-t-lg bg-gradient-to-t from-primary/20 to-primary/5 border border-border border-b-0 flex items-end justify-center pb-2 ${heights[i]}`}>
                    <span className="text-2xl font-bold text-primary">#{user.rank}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Table */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 border-b border-border px-5 py-3 text-xs font-medium text-muted-foreground">
            <span>Rank</span>
            <span>User</span>
            <span className="text-right">XP</span>
            <span className="text-right hidden sm:block">Solved</span>
            <span className="text-right hidden sm:block">Streak</span>
          </div>
          {filtered.length === 0 ? (
            <div className="px-5 py-12 text-center text-muted-foreground">No users found. Solve problems to appear here!</div>
          ) : (
            filtered.map((u, i) => (
              <motion.div
                key={u.user_id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
              >
                <Link
                  to={`/profile/${u.username}`}
                  className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-4 border-b border-border px-5 py-3.5 transition-colors last:border-0 hover:bg-surface-2"
                >
                  <span className={`w-8 text-center font-bold ${u.rank <= 3 ? "text-primary" : "text-muted-foreground"}`}>
                    {u.rank}
                  </span>
                  <div>
                    <div className="font-medium">{u.username}</div>
                    <div className="text-xs text-muted-foreground">{u.name}</div>
                  </div>
                  <span className="text-sm font-semibold text-primary">{u.xp.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground hidden sm:block">{u.solved}</span>
                  <span className="text-sm text-muted-foreground hidden sm:flex items-center gap-1">
                    <Flame className="h-3 w-3 text-destructive" />
                    {u.streak}
                  </span>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
