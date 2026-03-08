import { BADGE_DEFINITIONS } from "@/data/badges";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

export default function BadgesDisplay() {
  const { user, profile } = useAuth();

  const { data: earnedBadges, refetch } = useQuery({
    queryKey: ["badges", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase.from("badges").select("badge_key").eq("user_id", user.id);
      return (data || []).map((b: any) => b.badge_key);
    },
    enabled: !!user,
  });

  // Auto-award badges
  useEffect(() => {
    if (!user || !profile || !earnedBadges) return;
    const stats = { solved: profile.solved_count, streak: profile.streak, xp: profile.xp };
    const earnedSet = new Set(earnedBadges);

    BADGE_DEFINITIONS.forEach(async (badge) => {
      if (!earnedSet.has(badge.key) && badge.condition(stats)) {
        const { error } = await supabase.from("badges").insert({ user_id: user.id, badge_key: badge.key });
        if (!error) {
          toast.success(`🏆 Badge Unlocked: ${badge.title}!`);
          refetch();
        }
      }
    });
  }, [user, profile, earnedBadges]);

  const earnedSet = new Set(earnedBadges || []);

  return (
    <div className="mb-8">
      <h2 className="mb-3 text-lg font-semibold flex items-center gap-2">
        <Award className="h-5 w-5 text-primary" /> Badges
      </h2>
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-7">
        {BADGE_DEFINITIONS.map((badge, i) => {
          const earned = earnedSet.has(badge.key);
          return (
            <motion.div
              key={badge.key}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`relative flex flex-col items-center rounded-xl border p-3 text-center transition-all ${
                earned
                  ? "border-primary/30 bg-primary/5"
                  : "border-border bg-card opacity-40 grayscale"
              }`}
              title={`${badge.title}: ${badge.description}`}
            >
              <span className="text-2xl mb-1">{badge.icon}</span>
              <span className="text-[10px] font-semibold leading-tight">{badge.title}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
