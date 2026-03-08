export type LearningTrack = {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  totalProblems: number;
  topics: string[];
  route: string;
  difficulty: string;
};

export const LEARNING_TRACKS: LearningTrack[] = [
  {
    id: "learn-python",
    title: "Learn Python From Scratch",
    description: "20 topics · 60 hands-on problems · Beginner to Advanced",
    icon: "🐍",
    color: "from-yellow-500/10 to-yellow-600/5",
    totalProblems: 60,
    topics: ["Variables", "Loops", "Functions", "OOP", "File I/O"],
    route: "/learn-python",
    difficulty: "Beginner → Advanced",
  },
  {
    id: "dsa-roadmap",
    title: "Data Structures Mastery",
    description: "12 topics · Arrays to Graphs · Complete DSA journey",
    icon: "🗺️",
    color: "from-blue-500/10 to-blue-600/5",
    totalProblems: 48,
    topics: ["Arrays", "Linked Lists", "Trees", "Graphs", "DP"],
    route: "/dsa",
    difficulty: "Basic → Advanced",
  },
  {
    id: "algorithm-mastery",
    title: "Algorithm Mastery",
    description: "Sorting · Searching · Greedy · Divide & Conquer",
    icon: "⚡",
    color: "from-purple-500/10 to-purple-600/5",
    totalProblems: 80,
    topics: ["Sorting", "Searching", "Greedy", "Backtracking", "DP"],
    route: "/learn/algorithm-mastery",
    difficulty: "Basic → Advanced",
  },
  {
    id: "competitive-prep",
    title: "Competitive Programming",
    description: "Advanced topics · Segment Trees · Graph algorithms",
    icon: "🏆",
    color: "from-red-500/10 to-red-600/5",
    totalProblems: 120,
    topics: ["Segment Tree", "Trie", "Graphs", "Bit Manipulation", "Math"],
    route: "/learn/competitive-prep",
    difficulty: "Intermediate → Advanced",
  },
  {
    id: "interview-prep",
    title: "Coding Interview Preparation",
    description: "Top 100 most asked · Pattern-based approach",
    icon: "💼",
    color: "from-green-500/10 to-green-600/5",
    totalProblems: 100,
    topics: ["Arrays", "Strings", "Trees", "DP", "Graphs"],
    route: "/learn/interview-prep",
    difficulty: "Easy → Intermediate",
  },
  {
    id: "learn-c",
    title: "Learn C Programming",
    description: "Fundamentals · Pointers · Memory · System programming",
    icon: "⚙️",
    color: "from-gray-500/10 to-gray-600/5",
    totalProblems: 40,
    topics: ["Variables", "Pointers", "Arrays", "Structs", "Memory"],
    route: "/problems?difficulty=Very+Easy",
    difficulty: "Beginner → Intermediate",
  },
  {
    id: "learn-java",
    title: "Learn Java Programming",
    description: "OOP · Collections · Multithreading · Design Patterns",
    icon: "☕",
    color: "from-orange-500/10 to-orange-600/5",
    totalProblems: 50,
    topics: ["OOP", "Collections", "Generics", "Streams", "Concurrency"],
    route: "/problems?difficulty=Easy",
    difficulty: "Beginner → Intermediate",
  },
];
