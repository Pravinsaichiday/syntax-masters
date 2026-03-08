import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function WelcomePage() {
  const { profile, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
      return;
    }
    if (loading) return;

    // Fire confetti
    const duration = 2000;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#D4A843", "#F5D78E", "#FFE4A0"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#D4A843", "#F5D78E", "#FFE4A0"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();

    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(() => {
        if (profile?.onboarded) {
          navigate("/dashboard");
        } else {
          navigate("/onboarding");
        }
      }, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, loading, navigate, profile]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl font-bold md:text-6xl"
            >
              Welcome, <span className="text-gradient-gold">{profile?.name || "Coder"}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-4 text-lg text-muted-foreground"
            >
              Let's forge something extraordinary.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
