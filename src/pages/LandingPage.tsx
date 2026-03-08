import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Trophy, Brain, Code2, BarChart3, Users } from "lucide-react";
import { useState } from "react";

const features = [
  { icon: Code2, title: "Built-in Code Editor", desc: "Write, compile, and run code in 10+ languages with real-time feedback." },
  { icon: Brain, title: "AI-Powered Mentoring", desc: "Get intelligent hints, code reviews, and optimization suggestions." },
  { icon: Trophy, title: "Live Contests", desc: "Compete in real-time contests with live leaderboards and rankings." },
  { icon: Zap, title: "Adaptive Learning", desc: "Personalized problem recommendations that evolve with your skill." },
  { icon: BarChart3, title: "Deep Analytics", desc: "Track your progress with heatmaps, charts, and mastery metrics." },
  { icon: Users, title: "Global Community", desc: "Compete with thousands of developers worldwide." },
];

const stats = [
  { value: "5,000+", label: "Problems" },
  { value: "50K+", label: "Active Users" },
  { value: "200+", label: "Contests" },
  { value: "10+", label: "Languages" },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [footerClicks, setFooterClicks] = useState(0);

  const handleFooterClick = () => {
    const newCount = footerClicks + 1;
    setFooterClicks(newCount);
    if (newCount >= 5) {
      setFooterClicks(0);
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(38_92%_55%/0.08),transparent_60%)]" />
        <div className="container relative mx-auto px-4 pb-20 pt-24 md:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-4 py-1.5 text-sm text-muted-foreground">
              <Zap className="h-3.5 w-3.5 text-primary" />
              AI-powered competitive programming
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
              Master Algorithms.
              <br />
              <span className="text-gradient-gold">Forge Your Code.</span>
            </h1>
            <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">
              The most advanced competitive programming platform with AI mentoring, real-time contests, and personalized learning paths.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate("/signup")}
                className="bg-gradient-gold px-8 text-base font-semibold"
              >
                Start Coding Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/problems")}
                className="border-border px-8 text-base"
              >
                Browse Problems
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-6 md:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold text-gradient-gold">{s.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-surface-1 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold">Built for Serious Developers</h2>
            <p className="text-muted-foreground">Everything you need to become an elite competitive programmer.</p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:glow-gold-sm"
              >
                <f.icon className="mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Level Up?</h2>
          <p className="mb-8 text-muted-foreground">Join thousands of developers improving their skills every day.</p>
          <Button size="lg" onClick={() => navigate("/signup")} className="bg-gradient-gold px-10 text-base font-semibold">
            Create Free Account
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer with hidden admin trigger */}
      <footer className="border-t border-border bg-surface-1 py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" />
            <span className="font-semibold">CodeForge</span>
          </div>
          <p
            className="text-sm text-muted-foreground cursor-default select-none"
            onClick={handleFooterClick}
          >
            &copy; 2026 CodeForge. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
