import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Shield, Lock, Unlock, Server, ServerOff, LogOut } from "lucide-react";
import { motion } from "framer-motion";

const ADMIN_EMAIL = "sensei777@gmail.com";
const ADMIN_PASS = "911911";

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [pythonLocked, setPythonLocked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("admin_auth");
    if (stored === "true") {
      setAuthenticated(true);
      fetchSettings();
    }
  }, []);

  const fetchSettings = async () => {
    const { data } = await supabase.from("admin_settings").select("*");
    if (data) {
      data.forEach((s: any) => {
        if (s.key === "maintenance_mode") setMaintenanceMode(s.value === "true");
        if (s.key === "python_locked") setPythonLocked(s.value === "true");
      });
    }
  };

  const handleLogin = () => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      setAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      fetchSettings();
      toast.success("Admin authenticated");
    } else {
      toast.error("Invalid credentials");
    }
  };

  const updateSetting = async (key: string, value: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke("admin-settings", {
        body: { email: ADMIN_EMAIL, password: ADMIN_PASS, key, value },
      });
      if (error) throw error;
      if (key === "maintenance_mode") setMaintenanceMode(value === "true");
      if (key === "python_locked") setPythonLocked(value === "true");
      toast.success(`${key.replace("_", " ")} updated`);
    } catch (err: any) {
      toast.error(err.message || "Failed to update setting");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setAuthenticated(false);
    navigate("/");
  };

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
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">Admin Dashboard</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 max-w-2xl mx-auto">
          {/* Maintenance Mode */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {maintenanceMode ? <ServerOff className="h-6 w-6 text-destructive" /> : <Server className="h-6 w-6 text-success" />}
                <div>
                  <h3 className="font-semibold">Server Status</h3>
                  <p className="text-sm text-muted-foreground">
                    {maintenanceMode ? "Maintenance mode is ON" : "Server is running normally"}
                  </p>
                </div>
              </div>
              <button
                disabled={loading}
                onClick={() => updateSetting("maintenance_mode", maintenanceMode ? "false" : "true")}
                className={`relative h-7 w-14 rounded-full transition-colors ${maintenanceMode ? "bg-destructive" : "bg-success"}`}
              >
                <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-white transition-transform ${maintenanceMode ? "left-7" : "left-0.5"}`} />
              </button>
            </div>
          </motion.div>

          {/* Python Lock */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {pythonLocked ? <Lock className="h-6 w-6 text-destructive" /> : <Unlock className="h-6 w-6 text-success" />}
                <div>
                  <h3 className="font-semibold">Learn Python Section</h3>
                  <p className="text-sm text-muted-foreground">
                    {pythonLocked ? "Section is LOCKED — users cannot access" : "Section is UNLOCKED — users can access"}
                  </p>
                </div>
              </div>
              <button
                disabled={loading}
                onClick={() => updateSetting("python_locked", pythonLocked ? "false" : "true")}
                className={`relative h-7 w-14 rounded-full transition-colors ${pythonLocked ? "bg-destructive" : "bg-success"}`}
              >
                <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-white transition-transform ${pythonLocked ? "left-7" : "left-0.5"}`} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
