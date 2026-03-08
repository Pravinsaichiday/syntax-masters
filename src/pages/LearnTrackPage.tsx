import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import { BookOpen, CheckCircle2, Circle, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import type { CurriculumTrack, CurriculumTopic } from "@/data/curriculumTypes";

import { C_CURRICULUM } from "@/data/cCurriculum";
import { CPP_CURRICULUM } from "@/data/cppCurriculum";
import { JAVA_CURRICULUM } from "@/data/javaCurriculum";
import { ALGORITHM_CURRICULUM, COMPETITIVE_CURRICULUM, INTERVIEW_CURRICULUM } from "@/data/algorithmCurriculum";

const TRACKS: Record<string, CurriculumTrack> = {
  "learn-c": C_CURRICULUM,
  "learn-cpp": CPP_CURRICULUM,
  "learn-java": JAVA_CURRICULUM,
  "algorithm-mastery": ALGORITHM_CURRICULUM,
  "competitive-prep": COMPETITIVE_CURRICULUM,
  "interview-prep": INTERVIEW_CURRICULUM,
};

export default function LearnTrackPage() {
  const { trackId } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const track = trackId ? TRACKS[trackId] : null;

  if (!track) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-20 text-muted-foreground">Track not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-2 flex items-center gap-3">
            <Link to="/problems" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <span className="text-3xl">{track.icon}</span>
            <div>
              <h1 className="text-2xl font-bold">{track.title}</h1>
              <p className="text-muted-foreground text-sm">{track.description}</p>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {track.topics.map((topic, i) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                to={isAuthenticated ? `/learn/${trackId}/${topic.id}` : "/login"}
                onClick={() => {
                  if (!isAuthenticated) toast.error("Please login to access lessons");
                }}
                className="block rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:glow-gold-sm"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    #{topic.order}
                  </span>
                  <Circle className="h-4 w-4 text-muted-foreground" />
                </div>
                <h3 className="mb-1 font-semibold">{topic.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{topic.description}</p>
                <div className="mt-3 flex gap-1 flex-wrap">
                  <span className="rounded bg-success/10 px-1.5 py-0.5 text-[10px] font-medium text-success">
                    {topic.questions.length} problems
                  </span>
                  <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                    {topic.quiz.length} quiz
                  </span>
                  <span className="rounded bg-accent/10 px-1.5 py-0.5 text-[10px] font-medium text-accent">
                    {Object.keys(topic.codeExamples).length} languages
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
