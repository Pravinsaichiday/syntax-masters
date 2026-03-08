export type Badge = {
  key: string;
  title: string;
  description: string;
  icon: string;
  condition: (stats: { solved: number; streak: number; xp: number }) => boolean;
};

export const BADGE_DEFINITIONS: Badge[] = [
  { key: "first-solve", title: "First Blood", description: "Solve your first problem", icon: "🎯", condition: (s) => s.solved >= 1 },
  { key: "ten-solves", title: "Getting Started", description: "Solve 10 problems", icon: "🔥", condition: (s) => s.solved >= 10 },
  { key: "fifty-solves", title: "Problem Crusher", description: "Solve 50 problems", icon: "💪", condition: (s) => s.solved >= 50 },
  { key: "hundred-solves", title: "Centurion", description: "Solve 100 problems", icon: "🏅", condition: (s) => s.solved >= 100 },
  { key: "two-fifty-solves", title: "Grandmaster", description: "Solve 250 problems", icon: "👑", condition: (s) => s.solved >= 250 },
  { key: "five-hundred-solves", title: "Legend", description: "Solve 500 problems", icon: "🏆", condition: (s) => s.solved >= 500 },
  { key: "streak-3", title: "On Fire", description: "Maintain a 3-day streak", icon: "🔥", condition: (s) => s.streak >= 3 },
  { key: "streak-7", title: "Week Warrior", description: "Maintain a 7-day streak", icon: "⚡", condition: (s) => s.streak >= 7 },
  { key: "streak-30", title: "Monthly Master", description: "Maintain a 30-day streak", icon: "🌟", condition: (s) => s.streak >= 30 },
  { key: "streak-100", title: "Unstoppable", description: "Maintain a 100-day streak", icon: "💎", condition: (s) => s.streak >= 100 },
  { key: "xp-500", title: "XP Hunter", description: "Earn 500 XP", icon: "✨", condition: (s) => s.xp >= 500 },
  { key: "xp-2000", title: "XP Master", description: "Earn 2000 XP", icon: "💫", condition: (s) => s.xp >= 2000 },
  { key: "xp-5000", title: "XP Legend", description: "Earn 5000 XP", icon: "🌠", condition: (s) => s.xp >= 5000 },
  { key: "xp-10000", title: "XP God", description: "Earn 10000 XP", icon: "🏛️", condition: (s) => s.xp >= 10000 },
];
