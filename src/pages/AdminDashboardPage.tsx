import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Shield, Lock, Unlock, Server, ServerOff, LogOut, Key, Activity, CheckCircle2, XCircle, AlertCircle, Plus, Save } from "lucide-react";
import { motion } from "framer-motion";
import { ALL_PROBLEMS, EXPANDED_TOPICS, type Difficulty } from "@/data/problemsDatabase";
import { LEARNING_TRACKS } from "@/data/learningTracks";

const ADMIN_EMAIL = "sensei777@gmail.com";
const ADMIN_PASS = "911911";
const FREE_TIER_DAILY_LIMIT = 1500;

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [trackLocks, setTrackLocks] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState("");
  const [usageCount, setUsageCount] = useState(0);
  const [keyStatus, setKeyStatus] = useState<string>("unknown");
  const [keyPreview, setKeyPreview] = useState("none");
  const [hasCustomKey, setHasCustomKey] = useState(false);
  const [newApiKey, setNewApiKey] = useState("");
  const [checkingUsage, setCheckingUsage] = useState(false);
  const [activeSection, setActiveSection] = useState<"settings" | "problems">("settings");

  // Problem management state
  const [newProblem, setNewProblem] = useState({
    title: "", difficulty: "Easy" as Difficulty, topics: [] as string[],
    description: "", inputFormat: "", outputFormat: "",
    constraints: "", hints: "",
    sampleInput: "", sampleOutput: "", sampleExplanation: "",
  });

  useEffect(() => {
    const stored = sessionStorage.getItem("admin_auth");
    if (stored === "true") { setAuthenticated(true); fetchSettings(); fetchGeminiUsage(); }
  }, []);

  const fetchSettings = async () => {
    const { data } = await supabase.from("admin_settings").select("*");
    if (data) {
      const locks: Record<string, boolean> = {};
      data.forEach((s: any) => {
        if (s.key === "maintenance_mode") setMaintenanceMode(s.value === "true");
        if (s.key === "maintenance_message") setMaintenanceMessage(s.value);
        if (s.key.endsWith("_locked")) {
          locks[s.key] = s.value === "true";
        }
      });
      setTrackLocks(locks);
    }
  };

  const fetchGeminiUsage = async () => {
    setCheckingUsage(true);
    try {
      const { data, error } = await supabase.functions.invoke("admin-settings", {
        body: { email: ADMIN_EMAIL, password: ADMIN_PASS, action: "get_usage" },
      });
      if (error) throw error;
      setUsageCount(data.usageCount || 0);
      setKeyStatus(data.keyStatus || "unknown");
      setKeyPreview(data.keyPreview || "none");
      setHasCustomKey(data.hasCustomKey || false);
    } catch (err: any) { console.error("Failed to fetch usage:", err); }
    finally { setCheckingUsage(false); }
  };

  const handleLogin = () => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      setAuthenticated(true); sessionStorage.setItem("admin_auth", "true");
      fetchSettings(); fetchGeminiUsage(); toast.success("Admin authenticated");
    } else { toast.error("Invalid credentials"); }
  };

  const updateSetting = async (key: string, value: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke("admin-settings", { body: { email: ADMIN_EMAIL, password: ADMIN_PASS, key, value } });
      if (error) throw error;
      if (key === "maintenance_mode") setMaintenanceMode(value === "true");
      if (key === "python_locked") setPythonLocked(value === "true");
      toast.success(`${key.replace(/_/g, " ")} updated`);
    } catch (err: any) { toast.error(err.message || "Failed to update setting"); }
    finally { setLoading(false); }
  };

  const handleUpdateApiKey = async () => {
    if (!newApiKey.trim()) { toast.error("Please enter an API key"); return; }
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke("admin-settings", { body: { email: ADMIN_EMAIL, password: ADMIN_PASS, key: "gemini_api_key", value: newApiKey.trim() } });
      if (error) throw error;
      await supabase.functions.invoke("admin-settings", { body: { email: ADMIN_EMAIL, password: ADMIN_PASS, key: "gemini_usage_count", value: "0" } });
      setNewApiKey(""); toast.success("API key updated!"); fetchGeminiUsage();
    } catch (err: any) { toast.error(err.message || "Failed to update API key"); }
    finally { setLoading(false); }
  };

  const handleResetUsage = async () => {
    try {
      await supabase.functions.invoke("admin-settings", { body: { email: ADMIN_EMAIL, password: ADMIN_PASS, key: "gemini_usage_count", value: "0" } });
      await supabase.functions.invoke("admin-settings", { body: { email: ADMIN_EMAIL, password: ADMIN_PASS, key: "gemini_last_reset", value: new Date().toISOString() } });
      setUsageCount(0); toast.success("Usage counter reset");
    } catch (err: any) { toast.error("Failed to reset"); }
  };

  const handleLogout = () => { sessionStorage.removeItem("admin_auth"); setAuthenticated(false); navigate("/"); };

  const handleSaveProblem = () => {
    // Note: In a production system, this would save to DB. Currently problems are in static data.
    const problemData = {
      id: newProblem.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      ...newProblem,
      constraints: newProblem.constraints.split("\n").filter(Boolean),
      hints: newProblem.hints.split("\n").filter(Boolean),
      sampleCases: [{ input: newProblem.sampleInput, output: newProblem.sampleOutput, explanation: newProblem.sampleExplanation || undefined }],
    };
    console.log("Problem data:", problemData);
    toast.success("Problem template saved! (Add to problemsDatabase.ts to deploy)");
    // Copy to clipboard
    const code = `p("${problemData.id}","${newProblem.title}","${newProblem.difficulty}",${JSON.stringify(newProblem.topics)},85.0,"${newProblem.description}",${JSON.stringify(problemData.constraints)},"${newProblem.inputFormat}","${newProblem.outputFormat}",[{input:"${newProblem.sampleInput}",output:"${newProblem.sampleOutput}"}],${JSON.stringify(problemData.hints)}),`;
    navigator.clipboard.writeText(code).then(() => toast.info("Code snippet copied to clipboard!"));
  };

  const toggleTopic = (topic: string) => {
    setNewProblem((prev) => ({
      ...prev,
      topics: prev.topics.includes(topic) ? prev.topics.filter((t) => t !== topic) : [...prev.topics, topic],
    }));
  };

  const usagePercent = Math.min(Math.round((usageCount / FREE_TIER_DAILY_LIMIT) * 100), 100);
  const usageColor = usagePercent < 50 ? "bg-success" : usagePercent < 80 ? "bg-primary" : "bg-destructive";
  const usageTextColor = usagePercent < 50 ? "text-success" : usagePercent < 80 ? "text-primary" : "text-destructive";

  // Stats
  const diffCounts = ["Very Easy", "Easy", "Basic", "Intermediate", "Advanced"].map(
    (d) => ({ label: d, count: ALL_PROBLEMS.filter((p) => p.difficulty === d).length })
  );

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-sm rounded-xl border border-border bg-card p-8">
          <div className="mb-6 text-center">
            <Shield className="mx-auto mb-3 h-10 w-10 text-primary" />
            <h1 className="text-xl font-bold">Admin Access</h1>
            <p className="text-sm text-muted-foreground">Restricted area</p>
          </div>
          <div className="space-y-4">
            <Input placeholder="Admin Email" value={email} onChange={e => setEmail(e.target.value)} className="bg-surface-2" />
            <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="bg-surface-2" onKeyDown={e => e.key === "Enter" && handleLogin()} />
            <Button className="w-full bg-gradient-gold font-semibold" onClick={handleLogin}>Login</Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Admin Dashboard</span>
            </div>
            <div className="flex gap-1">
              <button onClick={() => setActiveSection("settings")} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${activeSection === "settings" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}>Settings</button>
              <button onClick={() => setActiveSection("problems")} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${activeSection === "problems" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}>Problems</button>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}><LogOut className="mr-2 h-4 w-4" /> Logout</Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {activeSection === "settings" ? (
          <div className="grid gap-6 max-w-2xl mx-auto">
            {/* Gemini API Usage */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Activity className="h-6 w-6 text-primary" />
                  <div><h3 className="font-semibold">Gemini API Usage</h3><p className="text-sm text-muted-foreground">Real-time API call tracking</p></div>
                </div>
                <div className="flex items-center gap-2">
                  {keyStatus === "active" && <CheckCircle2 className="h-5 w-5 text-success" />}
                  {keyStatus === "invalid" && <XCircle className="h-5 w-5 text-destructive" />}
                  {(keyStatus === "unknown" || keyStatus === "error") && <AlertCircle className="h-5 w-5 text-primary" />}
                  {keyStatus === "not_set" && <XCircle className="h-5 w-5 text-muted-foreground" />}
                  <span className={`text-xs font-medium capitalize ${keyStatus === "active" ? "text-success" : keyStatus === "invalid" ? "text-destructive" : "text-muted-foreground"}`}>
                    {keyStatus === "active" ? "Key Active" : keyStatus === "invalid" ? "Key Invalid" : keyStatus === "not_set" ? "No Key" : "Checking..."}
                  </span>
                </div>
              </div>
              <div className="mb-2">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-muted-foreground">API Calls</span>
                  <span className={`text-sm font-bold ${usageTextColor}`}>{usageCount.toLocaleString()} / {FREE_TIER_DAILY_LIMIT.toLocaleString()}</span>
                </div>
                <div className="h-3 w-full rounded-full bg-surface-3 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${usagePercent}%` }} transition={{ duration: 1, ease: "easeOut" }} className={`h-3 rounded-full ${usageColor}`} />
                </div>
                <div className="flex items-center justify-between mt-1.5">
                  <span className={`text-xs font-semibold ${usageTextColor}`}>{usagePercent}%</span>
                  <span className="text-xs text-muted-foreground">Free tier daily limit</span>
                </div>
              </div>
              <div className="mt-4 rounded-lg bg-surface-2 p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Key className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Current Key:</span>
                    <code className="text-xs font-mono text-foreground">{keyPreview}</code>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={fetchGeminiUsage} disabled={checkingUsage}>{checkingUsage ? "Checking..." : "Refresh"}</Button>
                    <Button size="sm" variant="ghost" className="h-7 text-xs text-muted-foreground" onClick={handleResetUsage}>Reset Count</Button>
                  </div>
                </div>
                {hasCustomKey && <span className="text-[10px] rounded bg-primary/10 text-primary px-1.5 py-0.5 font-medium">Custom Key</span>}
              </div>
              <div className="mt-4 space-y-3">
                <p className="text-xs text-muted-foreground">Paste a new Gemini API key:</p>
                <div className="flex gap-2">
                  <Input placeholder="AIzaSy..." value={newApiKey} onChange={e => setNewApiKey(e.target.value)} className="bg-surface-2 text-sm font-mono" type="password" />
                  <Button onClick={handleUpdateApiKey} disabled={loading || !newApiKey.trim()} className="bg-gradient-gold font-semibold whitespace-nowrap" size="sm"><Key className="mr-1 h-3.5 w-3.5" />Update Key</Button>
                </div>
              </div>
            </motion.div>

            {/* Maintenance Mode */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {maintenanceMode ? <ServerOff className="h-6 w-6 text-destructive" /> : <Server className="h-6 w-6 text-success" />}
                  <div><h3 className="font-semibold">Server Status</h3><p className="text-sm text-muted-foreground">{maintenanceMode ? "Maintenance mode ON" : "Running normally"}</p></div>
                </div>
                <button disabled={loading} onClick={() => updateSetting("maintenance_mode", maintenanceMode ? "false" : "true")} className={`relative h-7 w-14 rounded-full transition-colors ${maintenanceMode ? "bg-destructive" : "bg-success"}`}>
                  <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-white transition-transform ${maintenanceMode ? "left-7" : "left-0.5"}`} />
                </button>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Maintenance Message</label>
                <textarea value={maintenanceMessage} onChange={e => setMaintenanceMessage(e.target.value)} rows={3} className="w-full rounded-lg border border-border bg-surface-2 p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none" placeholder="Explain why..." />
                <Button size="sm" variant="outline" disabled={loading} onClick={() => updateSetting("maintenance_message", maintenanceMessage)}>Save Message</Button>
              </div>
            </motion.div>

            {/* Python Lock */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {pythonLocked ? <Lock className="h-6 w-6 text-destructive" /> : <Unlock className="h-6 w-6 text-success" />}
                  <div><h3 className="font-semibold">Learn Python Section</h3><p className="text-sm text-muted-foreground">{pythonLocked ? "LOCKED" : "UNLOCKED"}</p></div>
                </div>
                <button disabled={loading} onClick={() => updateSetting("python_locked", pythonLocked ? "false" : "true")} className={`relative h-7 w-14 rounded-full transition-colors ${pythonLocked ? "bg-destructive" : "bg-success"}`}>
                  <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-white transition-transform ${pythonLocked ? "left-7" : "left-0.5"}`} />
                </button>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Problem Stats */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold mb-3">Problem Library Stats — {ALL_PROBLEMS.length} Total</h3>
              <div className="grid grid-cols-5 gap-3">
                {diffCounts.map((d) => (
                  <div key={d.label} className="rounded-lg bg-surface-2 p-3 text-center">
                    <div className="text-lg font-bold">{d.count}</div>
                    <div className="text-xs text-muted-foreground">{d.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Add New Problem */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2"><Plus className="h-5 w-5 text-primary" /> Add New Problem</h3>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Title</label>
                    <Input value={newProblem.title} onChange={(e) => setNewProblem({ ...newProblem, title: e.target.value })} className="bg-surface-2" placeholder="Two Sum" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Difficulty</label>
                    <select value={newProblem.difficulty} onChange={(e) => setNewProblem({ ...newProblem, difficulty: e.target.value as Difficulty })} className="w-full rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-foreground">
                      {["Very Easy", "Easy", "Basic", "Intermediate", "Advanced"].map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Topics</label>
                  <div className="flex flex-wrap gap-1.5">
                    {EXPANDED_TOPICS.map((t) => (
                      <button key={t} onClick={() => toggleTopic(t)} className={`rounded-md px-2 py-0.5 text-xs font-medium transition-colors ${newProblem.topics.includes(t) ? "bg-primary/10 text-primary" : "bg-surface-3 text-muted-foreground hover:text-foreground"}`}>{t}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Description</label>
                  <Textarea value={newProblem.description} onChange={(e) => setNewProblem({ ...newProblem, description: e.target.value })} className="bg-surface-2" rows={3} placeholder="Problem description..." />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Input Format</label>
                    <Input value={newProblem.inputFormat} onChange={(e) => setNewProblem({ ...newProblem, inputFormat: e.target.value })} className="bg-surface-2" placeholder="Array and target" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Output Format</label>
                    <Input value={newProblem.outputFormat} onChange={(e) => setNewProblem({ ...newProblem, outputFormat: e.target.value })} className="bg-surface-2" placeholder="Two indices" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Constraints (one per line)</label>
                  <Textarea value={newProblem.constraints} onChange={(e) => setNewProblem({ ...newProblem, constraints: e.target.value })} className="bg-surface-2" rows={2} placeholder="1 ≤ N ≤ 10^5" />
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Hints (one per line)</label>
                  <Textarea value={newProblem.hints} onChange={(e) => setNewProblem({ ...newProblem, hints: e.target.value })} className="bg-surface-2" rows={2} placeholder="Use a hash map." />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Sample Input</label>
                    <Textarea value={newProblem.sampleInput} onChange={(e) => setNewProblem({ ...newProblem, sampleInput: e.target.value })} className="bg-surface-2 font-mono text-xs" rows={3} />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Sample Output</label>
                    <Textarea value={newProblem.sampleOutput} onChange={(e) => setNewProblem({ ...newProblem, sampleOutput: e.target.value })} className="bg-surface-2 font-mono text-xs" rows={3} />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Explanation (optional)</label>
                    <Textarea value={newProblem.sampleExplanation} onChange={(e) => setNewProblem({ ...newProblem, sampleExplanation: e.target.value })} className="bg-surface-2 text-xs" rows={3} />
                  </div>
                </div>

                <Button onClick={handleSaveProblem} disabled={!newProblem.title.trim()} className="bg-gradient-gold font-semibold w-full">
                  <Save className="mr-2 h-4 w-4" /> Generate Problem Code
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
