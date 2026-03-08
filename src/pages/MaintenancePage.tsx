import { motion } from "framer-motion";
import { ServerOff, Code2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function MaintenancePage() {
  const { data: message } = useQuery({
    queryKey: ["maintenance-message"],
    queryFn: async () => {
      const { data } = await supabase
        .from("admin_settings")
        .select("value")
        .eq("key", "maintenance_message")
        .single();
      return data?.value || "We are currently performing scheduled maintenance. Please check back shortly.";
    },
  });

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full text-center"
      >
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-destructive/30 bg-destructive/10">
          <ServerOff className="h-10 w-10 text-destructive" />
        </div>

        <h1 className="mb-3 text-3xl font-bold">Under Maintenance</h1>

        <div className="mb-8 rounded-xl border border-border bg-card p-6">
          <p className="text-muted-foreground leading-relaxed">{message}</p>
        </div>

        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Code2 className="h-5 w-5 text-primary" />
          <span className="font-semibold text-foreground">SyntaxMasters</span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">We'll be back soon. Thank you for your patience.</p>
      </motion.div>
    </div>
  );
}
