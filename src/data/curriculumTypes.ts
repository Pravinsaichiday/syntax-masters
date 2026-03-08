export type CurriculumQuestion = {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  starterCode: Record<string, string>;
  expectedOutput: string;
  hints: string[];
  xpReward: number;
};

export type QuizQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type CurriculumTopic = {
  id: string;
  title: string;
  description: string;
  order: number;
  realWorldAnalogy: string;
  lesson: string;
  codeExamples: Record<string, string>;
  visualization?: string;
  questions: CurriculumQuestion[];
  quiz: QuizQuestion[];
  referenceLinks: { title: string; url: string }[];
};

export type CurriculumTrack = {
  id: string;
  title: string;
  description: string;
  icon: string;
  language?: string;
  topics: CurriculumTopic[];
};
