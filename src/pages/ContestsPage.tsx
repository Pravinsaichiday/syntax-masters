import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Trophy, Clock, Users, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const contests = [
  {
    id: "weekly-42",
    title: "Weekly Contest #42",
    status: "live" as const,
    participants: 1247,
    duration: "2 hours",
    startsAt: "Now",
    problems: 4,
  },
  {
    id: "biweekly-18",
    title: "Biweekly Contest #18",
    status: "upcoming" as const,
    participants: 0,
    duration: "1.5 hours",
    startsAt: "Mar 10, 2026 — 8:00 PM UTC",
    problems: 4,
  },
  {
    id: "monthly-championship",
    title: "March Championship",
    status: "upcoming" as const,
    participants: 0,
    duration: "3 hours",
    startsAt: "Mar 15, 2026 — 2:00 PM UTC",
    problems: 6,
  },
  {
    id: "weekly-41",
    title: "Weekly Contest #41",
    status: "ended" as const,
    participants: 2341,
    duration: "2 hours",
    startsAt: "Mar 1, 2026",
    problems: 4,
  },
  {
    id: "weekly-40",
    title: "Weekly Contest #40",
    status: "ended" as const,
    participants: 1890,
    duration: "2 hours",
    startsAt: "Feb 22, 2026",
    problems: 4,
  },
];

export default function ContestsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold flex items-center gap-2">
          <Trophy className="h-6 w-6 text-primary" />
          Contests
        </h1>

        {/* Live Contest Banner */}
        {contests.filter((c) => c.status === "live").map((c) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 rounded-xl border border-primary/30 bg-primary/5 p-6 glow-gold"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-success animate-pulse" />
              <span className="text-sm font-medium text-success">Live Now</span>
            </div>
            <h2 className="text-xl font-bold mb-2">{c.title}</h2>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{c.duration}</span>
              <span className="flex items-center gap-1"><Users className="h-4 w-4" />{c.participants.toLocaleString()} participants</span>
              <span>{c.problems} problems</span>
            </div>
            <Button className="bg-gradient-gold font-semibold">
              Join Contest <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </motion.div>
        ))}

        {/* Upcoming */}
        <h2 className="mb-4 text-lg font-semibold">Upcoming</h2>
        <div className="mb-8 space-y-3">
          {contests.filter((c) => c.status === "upcoming").map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-5"
            >
              <div>
                <h3 className="font-semibold">{c.title}</h3>
                <div className="mt-1 flex gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{c.duration}</span>
                  <span>{c.problems} problems</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{c.startsAt}</p>
              </div>
              <Button variant="outline" size="sm">Register</Button>
            </motion.div>
          ))}
        </div>

        {/* Past */}
        <h2 className="mb-4 text-lg font-semibold">Past Contests</h2>
        <div className="space-y-3">
          {contests.filter((c) => c.status === "ended").map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-5 opacity-70"
            >
              <div>
                <h3 className="font-semibold">{c.title}</h3>
                <div className="mt-1 flex gap-3 text-sm text-muted-foreground">
                  <span>{c.participants.toLocaleString()} participants</span>
                  <span>{c.startsAt}</span>
                </div>
              </div>
              <Button variant="ghost" size="sm">View Results</Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
