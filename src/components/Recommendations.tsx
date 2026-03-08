import { ALL_PROBLEMS, type Problem } from "@/data/problemsDatabase";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

type Props = {
  solvedIds: string[];
  weakTopics?: string[];
};

export default function Recommendations({ solvedIds, weakTopics }: Props) {
  const solvedSet = new Set(solvedIds);
  const unsolved = ALL_PROBLEMS.filter((p) => !solvedSet.has(p.id));

  // Determine weak topics from solved problems
  const topicSolvedCount: Record<string, number> = {};
  const topicTotalCount: Record<string, number> = {};
  ALL_PROBLEMS.forEach((p) => {
    p.topics.forEach((t) => {
      topicTotalCount[t] = (topicTotalCount[t] || 0) + 1;
      if (solvedSet.has(p.id)) topicSolvedCount[t] = (topicSolvedCount[t] || 0) + 1;
    });
  });

  const weakTopicsList =
    weakTopics ||
    Object.entries(topicTotalCount)
      .filter(([t]) => (topicSolvedCount[t] || 0) / topicTotalCount[t] < 0.3)
      .sort((a, b) => (topicSolvedCount[a[0]] || 0) / a[1] - (topicSolvedCount[b[0]] || 0) / b[1])
      .map(([t]) => t)
      .slice(0, 5);

  // Determine next difficulty
  const diffOrder = ["Very Easy", "Easy", "Basic", "Intermediate", "Advanced"];
  const solvedByDiff = diffOrder.map((d) => ALL_PROBLEMS.filter((p) => p.difficulty === d && solvedSet.has(p.id)).length);
  const totalByDiff = diffOrder.map((d) => ALL_PROBLEMS.filter((p) => p.difficulty === d).length);
  let targetDiffIdx = 0;
  for (let i = 0; i < diffOrder.length; i++) {
    if (solvedByDiff[i] / Math.max(totalByDiff[i], 1) < 0.5) {
      targetDiffIdx = i;
      break;
    }
    targetDiffIdx = Math.min(i + 1, diffOrder.length - 1);
  }

  // Score and rank unsolved
  const scored: { problem: Problem; score: number }[] = unsolved.map((p) => {
    let score = 0;
    const di = diffOrder.indexOf(p.difficulty);
    // Prefer target difficulty
    if (di === targetDiffIdx) score += 10;
    if (Math.abs(di - targetDiffIdx) === 1) score += 5;
    // Prefer weak topics
    p.topics.forEach((t) => {
      if (weakTopicsList.includes(t)) score += 8;
    });
    // Small random factor
    score += Math.random() * 2;
    return { problem: p, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const recommended = scored.slice(0, 5);

  if (recommended.length === 0) return null;

  const DIFF_COLORS: Record<string, string> = {
    "Very Easy": "bg-emerald-500/10 text-emerald-400",
    Easy: "bg-success/10 text-success",
    Basic: "bg-sky-500/10 text-sky-400",
    Intermediate: "bg-primary/10 text-primary",
    Advanced: "bg-destructive/10 text-destructive",
  };

  return (
    <div className="mb-8">
      <h2 className="mb-3 text-lg font-semibold flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" /> Recommended For You
      </h2>
      {weakTopicsList.length > 0 && (
        <p className="mb-3 text-xs text-muted-foreground">
          Focus areas: {weakTopicsList.slice(0, 3).join(", ")}
        </p>
      )}
      <div className="grid gap-3 md:grid-cols-5">
        {recommended.map(({ problem: p }) => (
          <Link
            key={p.id}
            to={`/problem/${p.id}`}
            className="rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:glow-gold-sm"
          >
            <span className={`rounded-md px-2 py-0.5 text-[10px] font-medium ${DIFF_COLORS[p.difficulty] || ""}`}>
              {p.difficulty}
            </span>
            <h3 className="mt-2 text-sm font-semibold line-clamp-2">{p.title}</h3>
            <div className="mt-2 flex flex-wrap gap-1">
              {p.topics.slice(0, 2).map((t) => (
                <span key={t} className="rounded bg-surface-3 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
            <p className="mt-2 text-xs text-primary">+{p.xpReward} XP</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
