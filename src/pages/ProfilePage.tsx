import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Target, Zap, Flame, TrendingUp, Calendar, Award, Pencil, Check, X } from "lucide-react";
import { useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function generateHeatmap() {
  const days = [];
  for (let i = 364; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push({ date: date.toISOString().split("T")[0], count: Math.random() > 0.4 ? Math.floor(Math.random() * 8) : 0 });
  }
  return days;
}

export default function ProfilePage() {
  const { username } = useParams();
  const { profile: currentProfile, updateProfile } = useAuth();
  const heatmap = useMemo(() => generateHeatmap(), []);
  const [editingUsername, setEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState("");

  const { data: dbProfile } = useQuery({
    queryKey: ["profile", username],
    queryFn: async () => {
      let { data } = await supabase.from("profiles").select("*").eq("username", username!).single();
      if (!data) {
        const res = await supabase.from("profiles").select("*").eq("user_id", username!).single();
        data = res.data;
      }
      return data;
    },
    enabled: !!username,
  });

  const isOwnProfile = currentProfile && (username === currentProfile.username || username === currentProfile.user_id);

  const profileData = isOwnProfile && currentProfile
    ? {
        name: currentProfile.name,
        username: currentProfile.username || currentProfile.user_id,
        xp: currentProfile.xp,
        rank: currentProfile.rank,
        streak: currentProfile.streak,
        solved: currentProfile.solved_count,
        language: currentProfile.language || "Not set",
        level: currentProfile.level || "Not set",
        joinedAt: currentProfile.created_at || new Date().toISOString(),
        hasUsername: !!currentProfile.username,
      }
    : dbProfile
    ? {
        name: dbProfile.name,
        username: dbProfile.username || dbProfile.user_id,
        xp: dbProfile.xp,
        rank: dbProfile.rank,
        streak: dbProfile.streak,
        solved: dbProfile.solved_count,
        language: dbProfile.language || "Not set",
        level: dbProfile.level || "Not set",
        joinedAt: dbProfile.created_at,
        hasUsername: !!dbProfile.username,
      }
    : null;

  if (!profileData) {
    return (
      <div className="min-h-screen bg-background"><Navbar /><div className="flex items-center justify-center py-20 text-muted-foreground">User not found.</div></div>
    );
  }

  const canEditUsername = isOwnProfile && !currentProfile?.username;

  const handleSaveUsername = async () => {
    const trimmed = newUsername.trim();
    if (!trimmed || trimmed.length < 3) {
      toast.error("Username must be at least 3 characters");
      return;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
      toast.error("Username can only contain letters, numbers, and underscores");
      return;
    }
    // Check uniqueness
    const { data: existing } = await supabase.from("profiles").select("id").eq("username", trimmed).single();
    if (existing) {
      toast.error("Username already taken");
      return;
    }
    await updateProfile({ username: trimmed });
    setEditingUsername(false);
    toast.success("Username set! This cannot be changed again.");
  };

  const stats = [
    { icon: Target, label: "Problems Solved", value: profileData.solved },
    { icon: Zap, label: "XP Earned", value: profileData.xp.toLocaleString() },
    { icon: Flame, label: "Day Streak", value: profileData.streak },
    { icon: TrendingUp, label: "Global Rank", value: `#${profileData.rank || "—"}` },
  ];

  const distribution = { Easy: 45, Medium: 35, Hard: 20 };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex items-center gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary bg-surface-2 text-3xl font-bold text-primary">{profileData.name.charAt(0)}</div>
          <div>
            <h1 className="text-2xl font-bold">{profileData.name}</h1>
            <div className="flex items-center gap-2">
              {editingUsername ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="Choose username"
                    className="h-8 w-48 bg-surface-2 text-sm"
                    maxLength={20}
                  />
                  <Button size="icon" variant="ghost" className="h-7 w-7" onClick={handleSaveUsername}>
                    <Check className="h-4 w-4 text-success" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setEditingUsername(false)}>
                    <X className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ) : (
                <>
                  <p className="text-muted-foreground">@{profileData.username}</p>
                  {canEditUsername && (
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => { setNewUsername(""); setEditingUsername(true); }}>
                      <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                    </Button>
                  )}
                </>
              )}
            </div>
            <div className="mt-1 flex gap-3 text-sm text-muted-foreground">
              <span>{profileData.language}</span><span>·</span><span>{profileData.level}</span><span>·</span>
              <span>Joined {new Date(profileData.joinedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
            </div>
          </div>
        </motion.div>

        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-xl border border-border bg-card p-5">
              <s.icon className="mb-2 h-5 w-5 text-primary" /><div className="text-2xl font-bold">{s.value}</div><div className="text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="mb-8 rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold flex items-center gap-2"><Calendar className="h-5 w-5 text-primary" />Activity</h2>
          <div className="overflow-x-auto">
            <div className="flex gap-[3px]" style={{ minWidth: "750px" }}>
              {Array.from({ length: 52 }, (_, week) => (
                <div key={week} className="flex flex-col gap-[3px]">
                  {Array.from({ length: 7 }, (_, day) => {
                    const idx = week * 7 + day;
                    const d = heatmap[idx];
                    if (!d) return <div key={day} className="h-3 w-3" />;
                    const intensity = d.count === 0 ? "bg-surface-3" : d.count <= 2 ? "bg-primary/20" : d.count <= 4 ? "bg-primary/40" : d.count <= 6 ? "bg-primary/60" : "bg-primary";
                    return <div key={day} className={`h-3 w-3 rounded-sm ${intensity}`} title={`${d.date}: ${d.count} submissions`} />;
                  })}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <span>Less</span><div className="h-3 w-3 rounded-sm bg-surface-3" /><div className="h-3 w-3 rounded-sm bg-primary/20" /><div className="h-3 w-3 rounded-sm bg-primary/40" /><div className="h-3 w-3 rounded-sm bg-primary/60" /><div className="h-3 w-3 rounded-sm bg-primary" /><span>More</span>
          </div>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold flex items-center gap-2"><Award className="h-5 w-5 text-primary" />Difficulty Distribution</h2>
            <div className="space-y-3">
              {Object.entries(distribution).map(([diff, pct]) => (
                <div key={diff}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className={diff === "Easy" ? "text-success" : diff === "Medium" ? "text-primary" : "text-destructive"}>{diff}</span>
                    <span className="text-muted-foreground">{pct}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-surface-3">
                    <div className={`h-2 rounded-full ${diff === "Easy" ? "bg-success" : diff === "Medium" ? "bg-primary" : "bg-destructive"}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" />Topic Mastery</h2>
            <div className="space-y-2">
              {["Arrays", "Dynamic Programming", "Graphs", "Trees", "Strings"].map((topic) => {
                const mastery = Math.floor(Math.random() * 60 + 30);
                return (
                  <div key={topic}>
                    <div className="mb-1 flex justify-between text-sm"><span className="text-foreground">{topic}</span><span className="text-muted-foreground">{mastery}%</span></div>
                    <div className="h-1.5 w-full rounded-full bg-surface-3"><div className="h-1.5 rounded-full bg-primary/60" style={{ width: `${mastery}%` }} /></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
