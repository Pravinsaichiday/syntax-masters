import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const LANGUAGES = ["C", "C++", "Java", "Python", "JavaScript", "Go", "Rust", "TypeScript", "Kotlin", "Ruby"];
const LEVELS = ["Beginner", "Intermediate", "Advanced"];
const TIMES = ["30 minutes", "1 hour", "2 hours", "3+ hours"];

export default function OnboardingPage() {
  const { isAuthenticated, loading, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [dailyTime, setDailyTime] = useState("");

  useEffect(() => {
    if (!loading && !isAuthenticated) navigate("/login", { replace: true });
  }, [loading, isAuthenticated, navigate]);

  const handleFinish = async () => {
    await updateProfile({ language, level, daily_time: dailyTime, onboarded: true });
    navigate("/dashboard");
  };

  const steps = [
    { title: "What's your favorite language?", subtitle: "We'll personalize your experience", options: LANGUAGES, value: language, onChange: setLanguage },
    { title: "What's your level?", subtitle: "So we can match your difficulty", options: LEVELS, value: level, onChange: setLevel },
    { title: "Daily practice commitment?", subtitle: "Consistency is key to improvement", options: TIMES, value: dailyTime, onChange: setDailyTime },
  ];

  const current = steps[step];

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-lg">
        <div className="mb-8 flex items-center justify-center gap-2">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 w-12 rounded-full transition-colors ${i <= step ? "bg-gradient-gold" : "bg-surface-3"}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="text-center">
            <h2 className="mb-2 text-2xl font-bold">{current.title}</h2>
            <p className="mb-8 text-muted-foreground">{current.subtitle}</p>

            <div className={`mx-auto grid gap-3 ${current.options.length > 4 ? "max-w-md grid-cols-2" : "max-w-xs grid-cols-1"}`}>
              {current.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => current.onChange(opt)}
                  className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all ${
                    current.value === opt ? "border-primary bg-primary/10 text-primary" : "border-border bg-surface-2 text-foreground hover:border-primary/40"
                  }`}
                >
                  {opt}
                  {current.value === opt && <Check className="h-4 w-4 text-primary" />}
                </button>
              ))}
            </div>

            <div className="mt-8 flex justify-center gap-3">
              {step > 0 && <Button variant="outline" onClick={() => setStep(step - 1)}>Back</Button>}
              <Button
                onClick={() => { if (step < steps.length - 1) setStep(step + 1); else handleFinish(); }}
                disabled={!current.value}
                className="bg-gradient-gold font-semibold"
              >
                {step < steps.length - 1 ? <>Next <ArrowRight className="ml-2 h-4 w-4" /></> : "Start Coding"}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
