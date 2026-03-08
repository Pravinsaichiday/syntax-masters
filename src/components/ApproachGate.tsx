import { useState, useEffect, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Brain, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ApproachGateProps {
  onUnlock: () => void;
  isUnlocked: boolean;
}

export default function ApproachGate({ onUnlock, isUnlocked }: ApproachGateProps) {
  const [understanding, setUnderstanding] = useState("");
  const [bruteForce, setBruteForce] = useState("");
  const [optimized, setOptimized] = useState("");
  const [timeComplexity, setTimeComplexity] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerStarted, setTimerStarted] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const startTimer = useCallback(() => {
    if (!timerStarted) setTimerStarted(true);
  }, [timerStarted]);

  useEffect(() => {
    if (!timerStarted || isUnlocked) return;
    if (timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(t);
  }, [timerStarted, timeLeft, isUnlocked]);

  const canUnlock = timeLeft <= 0 || (understanding.length > 10 && bruteForce.length > 10);

  if (isUnlocked) {
    return (
      <div className="mb-4 rounded-lg border border-success/30 bg-success/5 p-3">
        <button onClick={() => setCollapsed(!collapsed)} className="flex items-center gap-2 text-sm font-medium text-success w-full">
          <Brain className="h-4 w-4" />
          Approach Written ✓
          {collapsed ? <ChevronDown className="h-3 w-3 ml-auto" /> : <ChevronUp className="h-3 w-3 ml-auto" />}
        </button>
        <AnimatePresence>
          {!collapsed && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="mt-2 space-y-1 text-xs text-foreground/70">
                {understanding && <p><strong>Understanding:</strong> {understanding}</p>}
                {bruteForce && <p><strong>Brute Force:</strong> {bruteForce}</p>}
                {optimized && <p><strong>Optimized:</strong> {optimized}</p>}
                {timeComplexity && <p><strong>Time Complexity:</strong> {timeComplexity}</p>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4 rounded-xl border border-primary/30 bg-primary/5 p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-primary flex items-center gap-2">
          <Brain className="h-4 w-4" /> Think Before You Code
        </h3>
        <div className="flex items-center gap-1.5 text-xs font-mono">
          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
          <span className={timeLeft <= 10 ? "text-destructive font-bold" : "text-muted-foreground"}>
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
          </span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mb-3">
        Write your approach first. The editor unlocks after 1 minute or when you write enough.
      </p>
      <div className="space-y-2">
        <div>
          <label className="text-[10px] font-medium text-muted-foreground mb-0.5 block">Problem Understanding *</label>
          <Textarea
            value={understanding}
            onChange={e => { setUnderstanding(e.target.value); startTimer(); }}
            placeholder="What is the problem asking?"
            className="bg-background text-xs min-h-[40px] resize-none"
          />
        </div>
        <div>
          <label className="text-[10px] font-medium text-muted-foreground mb-0.5 block">Brute Force Idea *</label>
          <Textarea
            value={bruteForce}
            onChange={e => { setBruteForce(e.target.value); startTimer(); }}
            placeholder="What's the simplest solution?"
            className="bg-background text-xs min-h-[40px] resize-none"
          />
        </div>
        <div>
          <label className="text-[10px] font-medium text-muted-foreground mb-0.5 block">Optimized Approach</label>
          <Textarea
            value={optimized}
            onChange={e => { setOptimized(e.target.value); startTimer(); }}
            placeholder="How can we do better?"
            className="bg-background text-xs min-h-[40px] resize-none"
          />
        </div>
        <div>
          <label className="text-[10px] font-medium text-muted-foreground mb-0.5 block">Expected Time Complexity</label>
          <Textarea
            value={timeComplexity}
            onChange={e => { setTimeComplexity(e.target.value); startTimer(); }}
            placeholder="O(n), O(n log n), etc."
            className="bg-background text-xs min-h-[30px] resize-none"
          />
        </div>
      </div>
      <Button
        size="sm"
        onClick={onUnlock}
        disabled={!canUnlock}
        className="mt-3 bg-gradient-gold font-semibold w-full"
      >
        {canUnlock ? "Start Coding →" : `Wait ${timeLeft}s or write your approach`}
      </Button>
    </motion.div>
  );
}
