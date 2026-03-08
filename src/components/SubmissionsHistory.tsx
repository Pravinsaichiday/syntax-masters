import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Clock, CheckCircle2, XCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SubmissionsHistoryProps {
  problemId: string;
  onLoadCode?: (code: string, language: string) => void;
}

export default function SubmissionsHistory({ problemId, onLoadCode }: SubmissionsHistoryProps) {
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const [showCode, setShowCode] = useState<string | null>(null);

  const { data: submissions = [] } = useQuery({
    queryKey: ["problem-submissions", user?.id, problemId],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase
        .from("submissions")
        .select("*")
        .eq("user_id", user.id)
        .eq("problem_id", problemId)
        .order("created_at", { ascending: false })
        .limit(20);
      return data || [];
    },
    enabled: !!user,
  });

  if (!user || submissions.length === 0) return null;

  const accepted = submissions.filter((s: any) => s.verdict === "Accepted");
  const total = submissions.length;

  const formatTime = (seconds: number) => {
    if (!seconds) return "—";
    if (seconds < 60) return `${seconds}s`;
    return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  };

  return (
    <div className="mt-6 rounded-xl border border-border bg-card">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold"
      >
        <span className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          Submissions ({accepted.length}/{total} accepted)
        </span>
        {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="border-t border-border max-h-64 overflow-y-auto">
              {submissions.map((s: any, i: number) => (
                <div key={s.id}>
                  <div
                    className="flex items-center gap-3 px-4 py-2.5 text-xs border-b border-border last:border-0 hover:bg-surface-2 cursor-pointer transition-colors"
                    onClick={() => setShowCode(showCode === s.id ? null : s.id)}
                  >
                    {s.verdict === "Accepted" ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-success flex-shrink-0" />
                    ) : (
                      <XCircle className="h-3.5 w-3.5 text-destructive flex-shrink-0" />
                    )}
                    <span className={`font-medium ${s.verdict === "Accepted" ? "text-success" : "text-destructive"}`}>
                      {s.verdict}
                    </span>
                    <span className="text-muted-foreground">{s.language}</span>
                    <span className="text-muted-foreground">{s.execution_time_ms}ms</span>
                    <span className="text-muted-foreground">{formatTime(s.time_taken_seconds)}</span>
                    <span className="text-muted-foreground ml-auto">
                      {new Date(s.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  {showCode === s.id && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} className="overflow-hidden">
                      <div className="px-4 py-2 bg-surface-2 border-b border-border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-medium text-muted-foreground">
                            {s.test_cases_passed}/{s.test_cases_total} test cases passed
                          </span>
                          {onLoadCode && (
                            <button
                              onClick={(e) => { e.stopPropagation(); onLoadCode(s.code, s.language); }}
                              className="text-[10px] text-primary hover:underline"
                            >
                              Load this code
                            </button>
                          )}
                        </div>
                        <pre className="text-[11px] font-mono text-foreground/80 max-h-40 overflow-y-auto whitespace-pre-wrap">{s.code}</pre>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
