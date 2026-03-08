import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useCallback, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BookOpen, Plus, Save, Trash2, Loader2, Search, Upload, FileText, File, X } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CATEGORIES = ["Algorithm Patterns", "Important Tricks", "Revision Notes", "Templates", "General"];

type Attachment = { name: string; url: string; type: string; size: number };

export default function NotebookPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editCategory, setEditCategory] = useState("General");
  const [editAttachments, setEditAttachments] = useState<Attachment[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) navigate("/login");
  }, [isAuthenticated, loading, navigate]);

  const { data: entries = [], refetch } = useQuery({
    queryKey: ["notebook", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase
        .from("notebook_entries")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });
      return data || [];
    },
    enabled: !!user,
  });

  const filtered = entries.filter((e: any) => {
    if (activeCategory !== "All" && e.category !== activeCategory) return false;
    if (search && !e.title.toLowerCase().includes(search.toLowerCase()) && !e.content.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const uploadFiles = useCallback(async (files: FileList | File[]) => {
    if (!user) return;
    setUploading(true);
    const newAttachments: Attachment[] = [];

    for (const file of Array.from(files)) {
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        toast.error(`${file.name} is too large (max 10MB)`);
        continue;
      }
      const ext = file.name.split(".").pop() || "";
      const path = `${user.id}/${Date.now()}-${file.name}`;

      const { error } = await supabase.storage.from("notebook-files").upload(path, file);
      if (error) {
        toast.error(`Failed to upload ${file.name}`);
        continue;
      }

      const { data: urlData } = supabase.storage.from("notebook-files").getPublicUrl(path);
      newAttachments.push({
        name: file.name,
        url: urlData.publicUrl,
        type: ext.toLowerCase(),
        size: file.size,
      });
    }

    if (newAttachments.length > 0) {
      setEditAttachments(prev => [...prev, ...newAttachments]);
      toast.success(`${newAttachments.length} file(s) uploaded`);
    }
    setUploading(false);
  }, [user]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      uploadFiles(e.dataTransfer.files);
    }
  }, [uploadFiles]);

  const removeAttachment = (idx: number) => {
    setEditAttachments(prev => prev.filter((_, i) => i !== idx));
  };

  const handleNew = () => {
    setEditingId("new");
    setEditTitle("");
    setEditContent("");
    setEditCategory("General");
    setEditAttachments([]);
  };

  const handleEdit = (entry: any) => {
    setEditingId(entry.id);
    setEditTitle(entry.title);
    setEditContent(entry.content);
    setEditCategory(entry.category);
    setEditAttachments(entry.attachments || []);
  };

  const handleSave = async () => {
    if (!user || !editTitle.trim()) {
      toast.error("Title is required");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        title: editTitle.trim(),
        content: editContent,
        category: editCategory,
        attachments: editAttachments as any,
        updated_at: new Date().toISOString(),
      };
      if (editingId === "new") {
        await supabase.from("notebook_entries").insert({ ...payload, user_id: user.id });
      } else {
        await supabase.from("notebook_entries").update(payload).eq("id", editingId);
      }
      toast.success("Saved!");
      setEditingId(null);
      refetch();
    } catch {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this note?")) return;
    await supabase.from("notebook_entries").delete().eq("id", id);
    if (editingId === id) setEditingId(null);
    refetch();
    toast.success("Deleted");
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  };

  const getFileIcon = (type: string) => {
    if (["pdf"].includes(type)) return <FileText className="h-4 w-4 text-red-400" />;
    if (["doc", "docx"].includes(type)) return <FileText className="h-4 w-4 text-blue-400" />;
    return <File className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" /> My Notebook
              </h1>
              <p className="text-sm text-muted-foreground mt-1">Save patterns, tricks, and revision notes</p>
            </div>
            <Button onClick={handleNew} className="bg-gradient-gold font-semibold">
              <Plus className="mr-1 h-4 w-4" /> New Note
            </Button>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-64 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search notes..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-muted/50 border-border pl-10"
              />
            </div>
            <div className="space-y-1">
              {["All", ...CATEGORIES].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left rounded-lg px-3 py-2 text-sm transition-colors ${
                    activeCategory === cat
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {cat} {cat !== "All" && `(${entries.filter((e: any) => e.category === cat).length})`}
                </button>
              ))}
            </div>
          </div>

          {/* Main area */}
          <div className="flex-1">
            {editingId && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 rounded-xl border border-primary/30 bg-card p-5">
                <div className="flex gap-3 mb-3">
                  <Input
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    placeholder="Note title..."
                    className="bg-muted/50 font-medium"
                  />
                  <select
                    value={editCategory}
                    onChange={e => setEditCategory(e.target.value)}
                    className="rounded bg-muted/50 border border-border px-3 py-1.5 text-sm text-foreground"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <Textarea
                  value={editContent}
                  onChange={e => setEditContent(e.target.value)}
                  placeholder="Write your notes here... Use this for algorithm patterns, templates, tricks, etc."
                  className="bg-muted/50 min-h-[200px] font-mono text-sm"
                />

                {/* File upload area */}
                <div
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  className={`mt-3 rounded-lg border-2 border-dashed p-4 text-center transition-colors ${
                    dragOver ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/50"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.txt,.md,.png,.jpg,.jpeg,.csv,.xls,.xlsx,.pptx"
                    className="hidden"
                    onChange={e => { if (e.target.files) uploadFiles(e.target.files); e.target.value = ""; }}
                  />
                  <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {uploading ? (
                      <span className="flex items-center justify-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Uploading...</span>
                    ) : (
                      <>Drag & drop files here, or <button onClick={() => fileInputRef.current?.click()} className="text-primary font-medium hover:underline">browse</button></>
                    )}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-1">PDF, Word, TXT, Images, CSV, Excel — max 10MB each</p>
                </div>

                {/* Attached files list */}
                {editAttachments.length > 0 && (
                  <div className="mt-3 space-y-1.5">
                    <p className="text-xs font-medium text-muted-foreground">Attachments ({editAttachments.length})</p>
                    {editAttachments.map((att, i) => (
                      <div key={i} className="flex items-center gap-2 rounded-lg bg-muted/30 border border-border/50 px-3 py-2 text-sm">
                        {getFileIcon(att.type)}
                        <a href={att.url} target="_blank" rel="noopener noreferrer" className="flex-1 truncate hover:text-primary transition-colors">
                          {att.name}
                        </a>
                        <span className="text-[10px] text-muted-foreground shrink-0">{formatSize(att.size)}</span>
                        <button onClick={() => removeAttachment(i)} className="text-muted-foreground hover:text-destructive shrink-0">
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-3 flex gap-2">
                  <Button size="sm" onClick={handleSave} disabled={saving} className="bg-gradient-gold font-semibold">
                    {saving ? <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" /> : <Save className="mr-1 h-3.5 w-3.5" />}
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
                </div>
              </motion.div>
            )}

            {filtered.length === 0 && !editingId ? (
              <div className="text-center py-16 text-muted-foreground">
                <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>No notes yet. Create your first note!</p>
              </div>
            ) : (
              <div className="grid gap-3 md:grid-cols-2">
                {filtered.map((entry: any) => {
                  const attachments: Attachment[] = entry.attachments || [];
                  return (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="rounded-xl border border-border bg-card p-4 hover:border-primary/30 transition-colors cursor-pointer group"
                      onClick={() => handleEdit(entry)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                            {entry.category}
                          </span>
                          <h3 className="mt-1 font-semibold truncate">{entry.title}</h3>
                          <p className="mt-1 text-xs text-muted-foreground line-clamp-3 font-mono">{entry.content}</p>
                          {attachments.length > 0 && (
                            <div className="mt-1.5 flex items-center gap-1 text-[10px] text-muted-foreground">
                              <File className="h-3 w-3" />
                              {attachments.length} file{attachments.length > 1 ? "s" : ""} attached
                            </div>
                          )}
                          <p className="mt-2 text-[10px] text-muted-foreground">
                            {new Date(entry.updated_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </p>
                        </div>
                        <button
                          onClick={e => { e.stopPropagation(); handleDelete(entry.id); }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-destructive"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
