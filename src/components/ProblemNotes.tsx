import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { StickyNote, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface ProblemNotesProps {
  problemId: string;
}

const NOTE_FIELDS = [
  { key: "understanding", label: "Problem Understanding", placeholder: "What is this problem asking? What are the inputs/outputs?" },
  { key: "approach_brute", label: "Brute Force Idea", placeholder: "Describe a simple but possibly slow approach..." },
  { key: "approach_optimized", label: "Optimized Approach", placeholder: "How can you improve the brute force?" },
  { key: "edge_cases", label: "Edge Cases", placeholder: "List edge cases to consider (empty input, single element, etc.)" },
  { key: "time_complexity", label: "Time Complexity", placeholder: "O(n), O(n log n), O(n²), etc." },
  { key: "space_complexity", label: "Space Complexity", placeholder: "O(1), O(n), etc." },
  { key: "revision_notes", label: "Revision Notes", placeholder: "Key takeaways, patterns learned, mistakes to avoid..." },
] as const;

type NoteData = Record<string, string>;

export default function ProblemNotes({ problemId }: ProblemNotesProps) {
  const { user } = useAuth();
  const [notes, setNotes] = useState<NoteData>({});
  const [saving, setSaving] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("problem_notes")
      .select("*")
      .eq("user_id", user.id)
      .eq("problem_id", problemId)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          const d: NoteData = {};
          NOTE_FIELDS.forEach(f => { d[f.key] = (data as any)[f.key] || ""; });
          setNotes(d);
        }
      });
  }, [user, problemId]);

  if (!user) return null;

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("problem_notes")
        .upsert({
          user_id: user.id,
          problem_id: problemId,
          ...notes,
          updated_at: new Date().toISOString(),
        }, { onConflict: "user_id,problem_id" });
      if (error) throw error;
      toast.success("Notes saved!");
    } catch {
      toast.error("Failed to save notes");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mt-6">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
      >
        <StickyNote className="h-4 w-4" />
        {expanded ? "Hide My Notes" : "My Notes"}
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 space-y-3 overflow-hidden"
          >
            {NOTE_FIELDS.map(f => (
              <div key={f.key}>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">{f.label}</label>
                <Textarea
                  value={notes[f.key] || ""}
                  onChange={e => setNotes(prev => ({ ...prev, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  className="bg-surface-2 text-sm min-h-[60px] resize-none"
                />
              </div>
            ))}
            <Button size="sm" onClick={handleSave} disabled={saving} className="bg-gradient-gold font-semibold">
              {saving ? <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" /> : <Save className="mr-1 h-3.5 w-3.5" />}
              Save Notes
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
