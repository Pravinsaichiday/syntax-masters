export type Problem = {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topics: string[];
  acceptance: number;
  submissions: number;
  xpReward: number;
  source: string;
  description: string;
  constraints: string[];
  inputFormat: string;
  outputFormat: string;
  sampleCases: { input: string; output: string; explanation?: string }[];
  hints: string[];
};

export const PROBLEMS: Problem[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    topics: ["Arrays", "Hash Table"],
    acceptance: 49.2,
    submissions: 12450,
    xpReward: 50,
    source: "LeetCode",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "-10^9 <= target <= 10^9"],
    inputFormat: "First line: n (size of array), Second line: n space-separated integers, Third line: target",
    outputFormat: "Two space-separated indices",
    sampleCases: [
      { input: "4\n2 7 11 15\n9", output: "0 1", explanation: "nums[0] + nums[1] = 2 + 7 = 9" },
      { input: "3\n3 2 4\n6", output: "1 2" },
    ],
    hints: ["Try using a hash map to store visited elements."],
  },
  {
    id: "longest-substring",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    topics: ["Strings", "Sliding Window", "Hash Table"],
    acceptance: 33.8,
    submissions: 8920,
    xpReward: 100,
    source: "LeetCode",
    description:
      "Given a string s, find the length of the longest substring without repeating characters.",
    constraints: ["0 <= s.length <= 5 * 10^4", "s consists of English letters, digits, symbols and spaces"],
    inputFormat: "A single string s",
    outputFormat: "An integer representing the length",
    sampleCases: [
      { input: "abcabcbb", output: "3", explanation: 'The answer is "abc", with length 3.' },
      { input: "bbbbb", output: "1" },
    ],
    hints: ["Use sliding window technique with a set to track characters."],
  },
  {
    id: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "Medium",
    topics: ["Arrays", "Sorting"],
    acceptance: 45.1,
    submissions: 7340,
    xpReward: 100,
    source: "LeetCode",
    description:
      "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.",
    constraints: ["1 <= intervals.length <= 10^4", "intervals[i].length == 2"],
    inputFormat: "Array of intervals",
    outputFormat: "Array of merged intervals",
    sampleCases: [
      { input: "[[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]" },
    ],
    hints: ["Sort by start time, then iterate and merge."],
  },
  {
    id: "binary-tree-level-order",
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    topics: ["Trees", "BFS"],
    acceptance: 62.3,
    submissions: 5680,
    xpReward: 100,
    source: "LeetCode",
    description: "Given the root of a binary tree, return the level order traversal of its nodes' values.",
    constraints: ["The number of nodes is in range [0, 2000]", "-1000 <= Node.val <= 1000"],
    inputFormat: "Root of binary tree",
    outputFormat: "2D array of level order traversal",
    sampleCases: [{ input: "[3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" }],
    hints: ["Use a queue for BFS."],
  },
  {
    id: "trapping-rain-water",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    topics: ["Arrays", "Two Pointers", "Dynamic Programming"],
    acceptance: 58.7,
    submissions: 4210,
    xpReward: 200,
    source: "LeetCode",
    description:
      "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    constraints: ["n == height.length", "1 <= n <= 2 * 10^4", "0 <= height[i] <= 10^5"],
    inputFormat: "Array of heights",
    outputFormat: "Integer total water trapped",
    sampleCases: [{ input: "[0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" }],
    hints: ["Two pointer approach from both ends."],
  },
  {
    id: "n-queens",
    title: "N-Queens",
    difficulty: "Hard",
    topics: ["Backtracking", "Recursion"],
    acceptance: 62.1,
    submissions: 3150,
    xpReward: 200,
    source: "LeetCode",
    description:
      "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Given an integer n, return all distinct solutions.",
    constraints: ["1 <= n <= 9"],
    inputFormat: "Integer n",
    outputFormat: "List of board configurations",
    sampleCases: [{ input: "4", output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]' }],
    hints: ["Use backtracking, checking columns and diagonals."],
  },
  {
    id: "reverse-linked-list",
    title: "Reverse Linked List",
    difficulty: "Easy",
    topics: ["Linked List"],
    acceptance: 72.5,
    submissions: 15300,
    xpReward: 50,
    source: "LeetCode",
    description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    constraints: ["The number of nodes is in range [0, 5000]"],
    inputFormat: "Head of linked list",
    outputFormat: "Head of reversed linked list",
    sampleCases: [{ input: "[1,2,3,4,5]", output: "[5,4,3,2,1]" }],
    hints: ["Use three pointers: prev, current, next."],
  },
  {
    id: "coin-change",
    title: "Coin Change",
    difficulty: "Medium",
    topics: ["Dynamic Programming"],
    acceptance: 41.8,
    submissions: 6740,
    xpReward: 100,
    source: "LeetCode",
    description:
      "Given coins of different denominations and a total amount, find the fewest number of coins needed to make up that amount.",
    constraints: ["1 <= coins.length <= 12", "1 <= coins[i] <= 2^31 - 1", "0 <= amount <= 10^4"],
    inputFormat: "Array of coins and target amount",
    outputFormat: "Minimum number of coins, or -1 if impossible",
    sampleCases: [{ input: "coins = [1,5,11], amount = 11", output: "3" }],
    hints: ["Use bottom-up DP with dp[i] = min coins for amount i."],
  },
  {
    id: "graph-valid-tree",
    title: "Graph Valid Tree",
    difficulty: "Medium",
    topics: ["Graphs", "Union Find", "BFS"],
    acceptance: 45.9,
    submissions: 4890,
    xpReward: 100,
    source: "LeetCode",
    description:
      "Given n nodes and a list of undirected edges, determine if the edges form a valid tree.",
    constraints: ["1 <= n <= 2000", "0 <= edges.length <= 5000"],
    inputFormat: "n and list of edges",
    outputFormat: "Boolean",
    sampleCases: [{ input: "n=5, edges=[[0,1],[0,2],[0,3],[1,4]]", output: "true" }],
    hints: ["A valid tree has exactly n-1 edges and is connected."],
  },
  {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    topics: ["Arrays", "Dynamic Programming", "Divide and Conquer"],
    acceptance: 50.1,
    submissions: 11200,
    xpReward: 100,
    source: "LeetCode",
    description:
      "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    inputFormat: "Array of integers",
    outputFormat: "Integer maximum sum",
    sampleCases: [{ input: "[-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "Subarray [4,-1,2,1] has the largest sum 6." }],
    hints: ["Kadane's algorithm: track current and global max."],
  },
];

export const TOPICS = [
  "Arrays", "Strings", "Hash Table", "Linked List", "Trees", "Graphs",
  "Dynamic Programming", "Sorting", "BFS", "Backtracking", "Recursion",
  "Two Pointers", "Sliding Window", "Greedy", "Bit Manipulation",
  "Union Find", "Divide and Conquer", "Mathematics",
];

export const LEADERBOARD_USERS = [
  { rank: 1, username: "algorithmist", name: "Alex Chen", xp: 28450, solved: 892, streak: 45, country: "US" },
  { rank: 2, username: "code_ninja", name: "Priya Sharma", xp: 26120, solved: 845, streak: 38, country: "IN" },
  { rank: 3, username: "bit_wizard", name: "Marcus Lee", xp: 24890, solved: 812, streak: 52, country: "SG" },
  { rank: 4, username: "dp_master", name: "Yuki Tanaka", xp: 23560, solved: 778, streak: 30, country: "JP" },
  { rank: 5, username: "graph_guru", name: "Elena Volkov", xp: 22340, solved: 756, streak: 28, country: "RU" },
  { rank: 6, username: "recursion_pro", name: "Carlos Mendez", xp: 21100, solved: 723, streak: 33, country: "MX" },
  { rank: 7, username: "heap_hero", name: "Sophie Durand", xp: 19870, solved: 698, streak: 21, country: "FR" },
  { rank: 8, username: "stack_overflow", name: "Omar Hassan", xp: 18640, solved: 671, streak: 19, country: "EG" },
  { rank: 9, username: "tree_traverser", name: "Kim Soo-jin", xp: 17500, solved: 645, streak: 25, country: "KR" },
  { rank: 10, username: "greedy_solver", name: "Liam O'Brien", xp: 16200, solved: 612, streak: 17, country: "IE" },
];
