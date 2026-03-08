import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

type DiscussionComment = {
  id: string;
  problem_id: string;
  user_id: string;
  username: string | null;
  content: string;
  created_at: string;
};

export default function Discussion({ problemId }: { problemId: string }) {
  const { user, profile } = useAuth();
  const [comments, setComments] = useState<DiscussionComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    const { data } = await supabase
      .from("discussions")
      .select("*")
      .eq("problem_id", problemId)
      .order("created_at", { ascending: true });
    if (data) setComments(data as DiscussionComment[]);
  };

  useEffect(() => {
    fetchComments();
    const channel = supabase
      .channel(`discussions-${problemId}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "discussions", filter: `problem_id=eq.${problemId}` }, () => {
        fetchComments();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [problemId]);

  const handleSubmit = async () => {
    if (!user || !newComment.trim()) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("discussions").insert({
        problem_id: problemId,
        user_id: user.id,
        username: profile?.username || profile?.name || "Anonymous",
        content: newComment.trim(),
      });
      if (error) throw error;
      setNewComment("");
      toast.success("Comment posted!");
    } catch (err: any) {
      toast.error("Failed to post comment");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("discussions").delete().eq("id", id);
    if (!error) {
      setComments((prev) => prev.filter((c) => c.id !== id));
      toast.success("Comment deleted");
    }
  };

  return (
    <div className="mt-6 border-t border-border pt-6">
      <h3 className="mb-4 text-sm font-semibold flex items-center gap-2">
        <MessageSquare className="h-4 w-4 text-primary" /> Discussion ({comments.length})
      </h3>

      {user ? (
        <div className="mb-4 flex gap-2">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your approach or ask a question..."
            className="bg-surface-2 text-sm min-h-[60px]"
          />
          <Button size="sm" onClick={handleSubmit} disabled={loading || !newComment.trim()} className="self-end">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <p className="mb-4 text-xs text-muted-foreground">Log in to participate in discussions.</p>
      )}

      <AnimatePresence>
        {comments.length === 0 ? (
          <p className="text-xs text-muted-foreground">No comments yet. Be the first to discuss!</p>
        ) : (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {comments.map((c) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-lg bg-surface-2 p-3"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-foreground">{c.username || "Anonymous"}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(c.created_at).toLocaleDateString()}
                    </span>
                    {user?.id === c.user_id && (
                      <button onClick={() => handleDelete(c.id)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-sm text-foreground/80 whitespace-pre-wrap">{c.content}</p>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
