import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Flame, Target, TrendingUp, Zap, BookOpen, Trophy, ArrowRight, Map } from "lucide-react";
import { ALL_PROBLEMS } from "@/data/problemsDatabase";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const dailyProblems = ALL_PROBLEMS.filter(p => p.difficulty === "Easy" || p.difficulty === "Basic").slice(0, 3);

export default function DashboardPage() {
  const { profile, user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  // Fetch leaderboard rank
  const { data: leaderboardRank } = useQuery({
    queryKey: ["leaderboard-rank", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data } = await supabase
        .from("profiles")
        .select("user_id, xp")
        .gt("solved_count", 0)
        .order("xp", { ascending: false })
        .limit(500);
      if (!data) return null;
      const idx = data.findIndex(p => p.user_id === user.id);
      return idx >= 0 ? idx + 1 : null;
    },
    enabled: !!user,
  });

  useEffect(() => {
    if (!loading && !isAuthenticated) navigate("/login");
  }, [isAuthenticated, loading, navigate]);

  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-20 text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Calculate display streak: if last_solved_at is older than yesterday, streak is effectively 0
  const displayStreak = (() => {
    const lastSolved = (profile as any).last_solved_at;
    if (!lastSolved) return 0;
    const lastDate = new Date(lastSolved);
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    lastDate.setUTCHours(0, 0, 0, 0);
    const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays <= 1) return profile.streak;
    return 0;
  })();

  const stats = [
    { icon: Target, label: "Problems Solved", value: profile.solved_count, color: "text-primary" },
    { icon: Zap, label: "XP Earned", value: profile.xp.toLocaleString(), color: "text-primary" },
    { icon: Flame, label: "Day Streak", value: displayStreak, color: "text-destructive" },
    { icon: TrendingUp, label: "Leaderboard Rank", value: leaderboardRank ? `#${leaderboardRank}` : "—", color: "text-info" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl font-bold">
            Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 17 ? "afternoon" : "evening"},{" "}
            <span className="text-gradient-gold">{profile.name}</span>
          </h1>
          <p className="mt-1 text-muted-foreground">
            {profile.language && `${profile.language} • `}{profile.level && `${profile.level} • `}{profile.daily_time && `${profile.daily_time}/day`}
          </p>
        </motion.div>

        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-xl border border-border bg-card p-5">
              <s.icon className={`mb-2 h-5 w-5 ${s.color}`} />
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2"><BookOpen className="h-5 w-5 text-primary" />Daily Challenges</h2>
            <Link to="/problems" className="text-sm text-primary hover:underline flex items-center gap-1">View all <ArrowRight className="h-3 w-3" /></Link>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {dailyProblems.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
                <Link to={`/problem/${p.id}`} className="block rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:glow-gold-sm">
                  <div className="mb-2 flex items-center justify-between">
                    <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${p.difficulty === "Easy" || p.difficulty === "Very Easy" ? "bg-success/10 text-success" : p.difficulty === "Basic" || p.difficulty === "Intermediate" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>{p.difficulty}</span>
                    <span className="text-xs text-muted-foreground">+{p.xpReward} XP</span>
                  </div>
                  <h3 className="font-semibold">{p.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {p.topics.slice(0, 2).map((t) => (<span key={t} className="rounded bg-surface-3 px-2 py-0.5 text-xs text-muted-foreground">{t}</span>))}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Link to="/problems" className="flex items-center gap-3 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30">
            <BookOpen className="h-6 w-6 text-primary" /><div><div className="font-semibold">Practice</div><div className="text-sm text-muted-foreground">Solve problems by topic</div></div>
          </Link>
          <Link to="/dsa" className="flex items-center gap-3 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30">
            <Map className="h-6 w-6 text-primary" /><div><div className="font-semibold">DSA Roadmap</div><div className="text-sm text-muted-foreground">Master DSA step by step</div></div>
          </Link>
          <Link to="/leaderboard" className="flex items-center gap-3 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30">
            <TrendingUp className="h-6 w-6 text-primary" /><div><div className="font-semibold">Leaderboard</div><div className="text-sm text-muted-foreground">See global rankings</div></div>
          </Link>
        </div>
      </div>
    </div>
  );
}
