import type { CurriculumTrack } from "./curriculumTypes";

export const ALGORITHM_CURRICULUM: CurriculumTrack = {
  id: "algorithm-mastery",
  title: "Algorithm Mastery",
  description: "Master sorting, searching, greedy, divide & conquer, and dynamic programming.",
  icon: "zap",
  topics: [
    {
      id: "sorting",
      title: "Sorting Algorithms",
      description: "Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort.",
      order: 1,
      realWorldAnalogy: "Sorting is like organizing books on a shelf. Bubble Sort is comparing neighbors and swapping — slow but simple. Merge Sort is splitting books into piles, sorting each pile, then merging them back — fast and reliable.",
      lesson: `# Sorting Algorithms

## Bubble Sort — O(n²)
Compare adjacent elements and swap if out of order. Repeat until sorted.

## Selection Sort — O(n²)
Find the minimum element, place it first. Repeat for remaining elements.

## Merge Sort — O(n log n)
Divide array in half, sort each half recursively, then merge.

## Quick Sort — O(n log n) average
Pick a pivot, partition: smaller elements left, larger right. Recurse on each half.

## When to Use What
| Algorithm | Best | Worst | Stable? | In-place? |
|-----------|------|-------|---------|-----------|
| Bubble    | O(n) | O(n²) | Yes | Yes |
| Selection | O(n²)| O(n²) | No  | Yes |
| Merge     | O(n log n)| O(n log n)| Yes | No |
| Quick     | O(n log n)| O(n²)| No | Yes |`,
      codeExamples: {
        Python: `def merge_sort(arr):\n    if len(arr) <= 1: return arr\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    return merge(left, right)\n\ndef merge(l, r):\n    result = []\n    i = j = 0\n    while i < len(l) and j < len(r):\n        if l[i] <= r[j]: result.append(l[i]); i += 1\n        else: result.append(r[j]); j += 1\n    return result + l[i:] + r[j:]`,
        "C++": `#include <bits/stdc++.h>\nusing namespace std;\n\nvoid merge(vector<int>& arr, int l, int m, int r) {\n    vector<int> left(arr.begin()+l, arr.begin()+m+1);\n    vector<int> right(arr.begin()+m+1, arr.begin()+r+1);\n    int i=0, j=0, k=l;\n    while (i<left.size() && j<right.size())\n        arr[k++] = left[i]<=right[j] ? left[i++] : right[j++];\n    while (i<left.size()) arr[k++] = left[i++];\n    while (j<right.size()) arr[k++] = right[j++];\n}\n\nvoid mergeSort(vector<int>& arr, int l, int r) {\n    if (l >= r) return;\n    int m = l + (r-l)/2;\n    mergeSort(arr, l, m);\n    mergeSort(arr, m+1, r);\n    merge(arr, l, m, r);\n}`,
        Java: `public class MergeSort {\n    static void merge(int[] arr, int l, int m, int r) {\n        int[] left = Arrays.copyOfRange(arr, l, m+1);\n        int[] right = Arrays.copyOfRange(arr, m+1, r+1);\n        int i=0, j=0, k=l;\n        while (i<left.length && j<right.length)\n            arr[k++] = left[i]<=right[j] ? left[i++] : right[j++];\n        while (i<left.length) arr[k++] = left[i++];\n        while (j<right.length) arr[k++] = right[j++];\n    }\n    \n    static void sort(int[] arr, int l, int r) {\n        if (l >= r) return;\n        int m = (l+r)/2;\n        sort(arr, l, m); sort(arr, m+1, r);\n        merge(arr, l, m, r);\n    }\n}`,
        C: `void merge(int arr[], int l, int m, int r) {\n    int n1 = m-l+1, n2 = r-m;\n    int L[n1], R[n2];\n    for (int i=0; i<n1; i++) L[i] = arr[l+i];\n    for (int i=0; i<n2; i++) R[i] = arr[m+1+i];\n    int i=0, j=0, k=l;\n    while (i<n1 && j<n2)\n        arr[k++] = L[i]<=R[j] ? L[i++] : R[j++];\n    while (i<n1) arr[k++] = L[i++];\n    while (j<n2) arr[k++] = R[j++];\n}`,
      },
      visualization: `Merge Sort Visualization:
[38, 27, 43, 3, 9, 82, 10]
        /                \\
[38, 27, 43, 3]    [9, 82, 10]
   /       \\          /     \\
[38,27]  [43,3]    [9,82]  [10]
 / \\      / \\       / \\
[38][27][43][3]   [9][82]  [10]
 \\ /      \\ /       \\ /
[27,38]  [3,43]   [9,82]  [10]
   \\       /          \\     /
[3, 27, 38, 43]    [9, 10, 82]
        \\                /
[3, 9, 10, 27, 38, 43, 82]`,
      questions: [
        {
          id: "algo-sort-1",
          title: "Implement Bubble Sort",
          difficulty: "Easy",
          description: "Read N integers and sort them using Bubble Sort. Print the sorted array.",
          starterCode: {
            "C++": '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    int n;\n    cin >> n;\n    vector<int> arr(n);\n    for (int &x : arr) cin >> x;\n    // Bubble sort\n    return 0;\n}',
            Python: 'n = int(input())\narr = list(map(int, input().split()))\n# Bubble sort\n',
            Java: 'import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] arr = new int[n];\n        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();\n        // Bubble sort\n    }\n}',
          },
          expectedOutput: "Sorted array",
          hints: ["Two nested loops, swap adjacent if arr[j] > arr[j+1]"],
          xpReward: 15,
        },
        {
          id: "algo-sort-2",
          title: "Merge Sort",
          difficulty: "Medium",
          description: "Implement merge sort on an array of N integers.",
          starterCode: {
            "C++": '#include <bits/stdc++.h>\nusing namespace std;\n\nvoid mergeSort(vector<int>& arr, int l, int r) {\n    // Implement merge sort\n}\n\nint main() {\n    int n;\n    cin >> n;\n    vector<int> arr(n);\n    for (int &x : arr) cin >> x;\n    mergeSort(arr, 0, n-1);\n    for (int x : arr) cout << x << " ";\n}',
            Python: 'def merge_sort(arr):\n    # Implement merge sort\n    pass\n\nn = int(input())\narr = list(map(int, input().split()))\nprint(*merge_sort(arr))',
          },
          expectedOutput: "Sorted array",
          hints: ["Divide in half, sort recursively, merge two sorted halves"],
          xpReward: 25,
        },
      ],
      quiz: [
        {
          question: "Which sorting algorithm has the best worst-case time complexity?",
          options: ["Bubble Sort", "Quick Sort", "Merge Sort", "Selection Sort"],
          correctIndex: 2,
          explanation: "Merge Sort has O(n log n) in all cases. Quick Sort can degrade to O(n²) in worst case.",
        },
      ],
      referenceLinks: [
        { title: "Sorting Algorithms - VisuAlgo", url: "https://visualgo.net/en/sorting" },
        { title: "Sorting - GeeksforGeeks", url: "https://www.geeksforgeeks.org/sorting-algorithms/" },
      ],
    },
    {
      id: "searching",
      title: "Searching Algorithms",
      description: "Linear Search, Binary Search, and search applications.",
      order: 2,
      realWorldAnalogy: "Linear search is like looking for a book by checking every shelf one by one. Binary search is like looking in a dictionary — you open the middle, check if your word comes before or after, and keep halving until you find it.",
      lesson: `# Searching Algorithms

## Linear Search — O(n)
Check every element one by one.

## Binary Search — O(log n)
Works on **sorted** arrays. Compare with middle, eliminate half each time.

\`\`\`
Array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
Target: 23

Step 1: mid = 16, 23 > 16 → search right half
Step 2: mid = 38, 23 < 38 → search left half  
Step 3: mid = 23 → Found!
\`\`\``,
      codeExamples: {
        "C++": `int binarySearch(vector<int>& arr, int target) {\n    int lo = 0, hi = arr.size() - 1;\n    while (lo <= hi) {\n        int mid = lo + (hi - lo) / 2;\n        if (arr[mid] == target) return mid;\n        else if (arr[mid] < target) lo = mid + 1;\n        else hi = mid - 1;\n    }\n    return -1;\n}`,
        Python: `def binary_search(arr, target):\n    lo, hi = 0, len(arr) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if arr[mid] == target: return mid\n        elif arr[mid] < target: lo = mid + 1\n        else: hi = mid - 1\n    return -1`,
        Java: `static int binarySearch(int[] arr, int target) {\n    int lo = 0, hi = arr.length - 1;\n    while (lo <= hi) {\n        int mid = lo + (hi - lo) / 2;\n        if (arr[mid] == target) return mid;\n        else if (arr[mid] < target) lo = mid + 1;\n        else hi = mid - 1;\n    }\n    return -1;\n}`,
        C: `int binarySearch(int arr[], int n, int target) {\n    int lo = 0, hi = n - 1;\n    while (lo <= hi) {\n        int mid = lo + (hi - lo) / 2;\n        if (arr[mid] == target) return mid;\n        else if (arr[mid] < target) lo = mid + 1;\n        else hi = mid - 1;\n    }\n    return -1;\n}`,
      },
      visualization: `Binary Search for 23:
[2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
                 ↑ mid=16
                      [23, 38, 56, 72, 91]
                             ↑ mid=56
                      [23, 38]
                       ↑ mid=23 ✓ FOUND!`,
      questions: [
        {
          id: "algo-search-1",
          title: "Binary Search Implementation",
          difficulty: "Easy",
          description: "Given a sorted array and a target, find the index using binary search. Print -1 if not found.",
          starterCode: {
            "C++": '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    int n, target;\n    cin >> n;\n    vector<int> arr(n);\n    for (int &x : arr) cin >> x;\n    cin >> target;\n    // Binary search\n    return 0;\n}',
            Python: 'n = int(input())\narr = list(map(int, input().split()))\ntarget = int(input())\n# Binary search\n',
          },
          expectedOutput: "Index of target or -1",
          hints: ["lo = 0, hi = n-1, check mid each iteration"],
          xpReward: 15,
        },
      ],
      quiz: [
        {
          question: "Binary search requires the array to be:",
          options: ["Empty", "Sorted", "Reversed", "Of even length"],
          correctIndex: 1,
          explanation: "Binary search only works on sorted arrays because it relies on the ordering to eliminate half the search space.",
        },
      ],
      referenceLinks: [
        { title: "Binary Search - Khan Academy", url: "https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search" },
      ],
    },
    {
      id: "greedy",
      title: "Greedy Algorithms",
      description: "Activity selection, fractional knapsack, and greedy strategies.",
      order: 3,
      realWorldAnalogy: "A greedy algorithm is like eating at a buffet — at each step, you pick the dish that looks most appealing right now. It doesn't always give the overall best meal, but for many problems it gives the optimal result.",
      lesson: `# Greedy Algorithms

A greedy algorithm makes the locally optimal choice at each step, hoping to find the global optimum.

## When Does Greedy Work?
- The problem has **optimal substructure**
- A **greedy choice** at each step leads to a globally optimal solution

## Classic Examples
1. **Activity Selection**: Pick the activity that ends earliest
2. **Fractional Knapsack**: Pick items with highest value/weight ratio
3. **Huffman Coding**: Build optimal prefix codes
4. **Coin Change** (with standard denominations)`,
      codeExamples: {
        "C++": `// Activity Selection\n#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<pair<int,int>> acts(n); // {end, start}\n    for (auto& [e, s] : acts) cin >> s >> e;\n    sort(acts.begin(), acts.end());\n    \n    int count = 1, lastEnd = acts[0].first;\n    for (int i = 1; i < n; i++) {\n        if (acts[i].second >= lastEnd) {\n            count++;\n            lastEnd = acts[i].first;\n        }\n    }\n    cout << count << endl;\n}`,
        Python: `# Activity Selection\nn = int(input())\nacts = []\nfor _ in range(n):\n    s, e = map(int, input().split())\n    acts.append((e, s))\nacts.sort()\n\ncount = 1\nlast_end = acts[0][0]\nfor e, s in acts[1:]:\n    if s >= last_end:\n        count += 1\n        last_end = e\nprint(count)`,
        Java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[][] acts = new int[n][2];\n        for (int i = 0; i < n; i++) {\n            acts[i][0] = sc.nextInt(); // start\n            acts[i][1] = sc.nextInt(); // end\n        }\n        Arrays.sort(acts, (a, b) -> a[1] - b[1]);\n        int count = 1, lastEnd = acts[0][1];\n        for (int i = 1; i < n; i++) {\n            if (acts[i][0] >= lastEnd) {\n                count++;\n                lastEnd = acts[i][1];\n            }\n        }\n        System.out.println(count);\n    }\n}`,
        C: `#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct { int start, end; } Activity;\nint cmp(const void *a, const void *b) {\n    return ((Activity*)a)->end - ((Activity*)b)->end;\n}\n\nint main() {\n    int n;\n    scanf("%d", &n);\n    Activity acts[n];\n    for (int i = 0; i < n; i++) scanf("%d %d", &acts[i].start, &acts[i].end);\n    qsort(acts, n, sizeof(Activity), cmp);\n    int count = 1, lastEnd = acts[0].end;\n    for (int i = 1; i < n; i++)\n        if (acts[i].start >= lastEnd) { count++; lastEnd = acts[i].end; }\n    printf("%d\\n", count);\n}`,
      },
      questions: [
        {
          id: "algo-greedy-1",
          title: "Activity Selection",
          difficulty: "Medium",
          description: "Given N activities with start and end times, find the maximum number of non-overlapping activities.",
          starterCode: {
            "C++": '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    int n;\n    cin >> n;\n    // Read activities and find max non-overlapping\n    return 0;\n}',
            Python: 'n = int(input())\n# Read activities and find max non-overlapping\n',
          },
          expectedOutput: "Maximum number of activities",
          hints: ["Sort by end time, greedily pick non-overlapping"],
          xpReward: 25,
        },
      ],
      quiz: [
        {
          question: "Greedy algorithms always give the optimal solution.",
          options: ["True", "False — only for certain problem types", "True only for sorting", "Depends on input size"],
          correctIndex: 1,
          explanation: "Greedy works optimally only when the problem has the greedy choice property and optimal substructure.",
        },
      ],
      referenceLinks: [
        { title: "Greedy Algorithms - GeeksforGeeks", url: "https://www.geeksforgeeks.org/greedy-algorithms/" },
      ],
    },
    {
      id: "dynamic-programming",
      title: "Dynamic Programming",
      description: "Memoization, tabulation, and classic DP problems.",
      order: 4,
      realWorldAnalogy: "DP is like taking notes during a complex math exam. Instead of re-calculating the same formula every time it appears, you write down the answer the first time and look it up later. This 'caching' of results makes solving complex problems much faster.",
      lesson: `# Dynamic Programming

## Key Concepts
1. **Overlapping Subproblems** — Same subproblems solved repeatedly
2. **Optimal Substructure** — Solution built from optimal solutions of subproblems

## Two Approaches
- **Top-down (Memoization)** — Recursive with caching
- **Bottom-up (Tabulation)** — Iterative with table

## Classic DP Problems
1. Fibonacci Numbers
2. Longest Common Subsequence
3. 0/1 Knapsack
4. Coin Change
5. Longest Increasing Subsequence`,
      codeExamples: {
        Python: `# Fibonacci — Top-down (Memoization)\nfrom functools import lru_cache\n\n@lru_cache(maxsize=None)\ndef fib(n):\n    if n <= 1: return n\n    return fib(n-1) + fib(n-2)\n\n# Bottom-up (Tabulation)\ndef fib_tab(n):\n    dp = [0, 1]\n    for i in range(2, n+1):\n        dp.append(dp[i-1] + dp[i-2])\n    return dp[n]`,
        "C++": `// Bottom-up Fibonacci\nint fib(int n) {\n    vector<int> dp(n+1);\n    dp[0] = 0; dp[1] = 1;\n    for (int i = 2; i <= n; i++)\n        dp[i] = dp[i-1] + dp[i-2];\n    return dp[n];\n}`,
        Java: `static int fib(int n) {\n    int[] dp = new int[n+1];\n    dp[0] = 0; dp[1] = 1;\n    for (int i = 2; i <= n; i++)\n        dp[i] = dp[i-1] + dp[i-2];\n    return dp[n];\n}`,
        C: `int fib(int n) {\n    int dp[n+1];\n    dp[0] = 0; dp[1] = 1;\n    for (int i = 2; i <= n; i++)\n        dp[i] = dp[i-1] + dp[i-2];\n    return dp[n];\n}`,
      },
      visualization: `Fibonacci DP Table:
n:     0   1   2   3   4   5   6   7   8
dp[n]: 0   1   1   2   3   5   8   13  21
       ↗↗  ↗↗  ↗↗  ↗↗  ↗↗  ↗↗  ↗↗
     dp[i] = dp[i-1] + dp[i-2]`,
      questions: [
        {
          id: "algo-dp-1",
          title: "Climbing Stairs",
          difficulty: "Easy",
          description: "You can climb 1 or 2 stairs at a time. How many distinct ways can you climb N stairs?",
          starterCode: {
            "C++": '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    int n;\n    cin >> n;\n    // Count ways to climb n stairs\n    return 0;\n}',
            Python: 'n = int(input())\n# Count ways to climb n stairs\n',
          },
          expectedOutput: "Given input '5', output: '8'",
          hints: ["This is Fibonacci! dp[i] = dp[i-1] + dp[i-2]"],
          xpReward: 15,
        },
        {
          id: "algo-dp-2",
          title: "Coin Change",
          difficulty: "Hard",
          description: "Given coins of denominations and a target amount, find the minimum number of coins needed. Print -1 if impossible.",
          starterCode: {
            "C++": '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    int n, target;\n    cin >> n;\n    vector<int> coins(n);\n    for (int &x : coins) cin >> x;\n    cin >> target;\n    // Find minimum coins\n    return 0;\n}',
            Python: 'n = int(input())\ncoins = list(map(int, input().split()))\ntarget = int(input())\n# Find minimum coins\n',
          },
          expectedOutput: "Minimum coins or -1",
          hints: ["dp[i] = min(dp[i], dp[i-coin] + 1) for each coin"],
          xpReward: 30,
        },
      ],
      quiz: [
        {
          question: "What is the key difference between memoization and tabulation?",
          options: ["There is no difference", "Memoization is top-down recursive, tabulation is bottom-up iterative", "Tabulation uses more memory", "Memoization is faster"],
          correctIndex: 1,
          explanation: "Memoization uses recursion and caches results (top-down). Tabulation fills a table iteratively (bottom-up).",
        },
      ],
      referenceLinks: [
        { title: "DP - GeeksforGeeks", url: "https://www.geeksforgeeks.org/dynamic-programming/" },
      ],
    },
  ],
};

export const COMPETITIVE_CURRICULUM: CurriculumTrack = {
  id: "competitive-prep",
  title: "Competitive Programming",
  description: "Advanced topics for competitive programming contests.",
  icon: "trophy",
  topics: [
    {
      id: "cp-number-theory",
      title: "Number Theory",
      description: "Primes, GCD, modular arithmetic, and fast exponentiation.",
      order: 1,
      realWorldAnalogy: "Number theory is the toolkit of competitive programming — like a Swiss Army knife with tools for every mathematical challenge you'll encounter in contests.",
      lesson: `# Number Theory for CP

## GCD & LCM
\`\`\`cpp
int gcd(int a, int b) { return b ? gcd(b, a%b) : a; }
int lcm(int a, int b) { return a / gcd(a,b) * b; }
\`\`\`

## Sieve of Eratosthenes
\`\`\`cpp
vector<bool> sieve(int n) {
    vector<bool> is_prime(n+1, true);
    is_prime[0] = is_prime[1] = false;
    for (int i = 2; i * i <= n; i++)
        if (is_prime[i])
            for (int j = i*i; j <= n; j += i)
                is_prime[j] = false;
    return is_prime;
}
\`\`\`

## Fast Power (Modular Exponentiation)
\`\`\`cpp
long long power(long long base, long long exp, long long mod) {
    long long result = 1;
    base %= mod;
    while (exp > 0) {
        if (exp & 1) result = result * base % mod;
        base = base * base % mod;
        exp >>= 1;
    }
    return result;
}
\`\`\``,
      codeExamples: {
        "C++": `#include <bits/stdc++.h>\nusing namespace std;\n\nvector<int> sieve(int n) {\n    vector<bool> is_prime(n+1, true);\n    vector<int> primes;\n    for (int i = 2; i <= n; i++) {\n        if (is_prime[i]) {\n            primes.push_back(i);\n            for (long long j = (long long)i*i; j <= n; j += i)\n                is_prime[j] = false;\n        }\n    }\n    return primes;\n}\n\nint main() {\n    auto primes = sieve(100);\n    for (int p : primes) cout << p << " ";\n}`,
        Python: `def sieve(n):\n    is_prime = [True] * (n + 1)\n    is_prime[0] = is_prime[1] = False\n    for i in range(2, int(n**0.5) + 1):\n        if is_prime[i]:\n            for j in range(i*i, n+1, i):\n                is_prime[j] = False\n    return [i for i in range(2, n+1) if is_prime[i]]\n\nprint(sieve(100))`,
        Java: `import java.util.*;\npublic class Main {\n    static List<Integer> sieve(int n) {\n        boolean[] ip = new boolean[n+1];\n        Arrays.fill(ip, true);\n        List<Integer> primes = new ArrayList<>();\n        for (int i = 2; i <= n; i++) {\n            if (ip[i]) {\n                primes.add(i);\n                for (long j = (long)i*i; j <= n; j += i) ip[(int)j] = false;\n            }\n        }\n        return primes;\n    }\n    public static void main(String[] args) { System.out.println(sieve(100)); }\n}`,
        C: `#include <stdio.h>\n#include <stdbool.h>\n\nint main() {\n    int n = 100;\n    bool is_prime[101];\n    for (int i = 0; i <= n; i++) is_prime[i] = true;\n    is_prime[0] = is_prime[1] = false;\n    for (int i = 2; i * i <= n; i++)\n        if (is_prime[i])\n            for (int j = i*i; j <= n; j += i)\n                is_prime[j] = false;\n    for (int i = 2; i <= n; i++)\n        if (is_prime[i]) printf("%d ", i);\n    return 0;\n}`,
      },
      questions: [
        {
          id: "cp-nt-1",
          title: "Sieve of Eratosthenes",
          difficulty: "Medium",
          description: "Find all prime numbers up to N using the Sieve of Eratosthenes.",
          starterCode: {
            "C++": '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    int n;\n    cin >> n;\n    // Sieve and print all primes up to n\n    return 0;\n}',
            Python: 'n = int(input())\n# Sieve of Eratosthenes\n',
          },
          expectedOutput: "All primes up to N",
          hints: ["Mark multiples of each prime starting from i*i"],
          xpReward: 20,
        },
      ],
      quiz: [
        {
          question: "What is the time complexity of Sieve of Eratosthenes?",
          options: ["O(n)", "O(n log n)", "O(n log log n)", "O(n²)"],
          correctIndex: 2,
          explanation: "The Sieve of Eratosthenes runs in O(n log log n), which is nearly linear.",
        },
      ],
      referenceLinks: [
        { title: "Number Theory for CP - CP Algorithms", url: "https://cp-algorithms.com/algebra/" },
      ],
    },
  ],
};

export const INTERVIEW_CURRICULUM: CurriculumTrack = {
  id: "interview-prep",
  title: "Coding Interview Preparation",
  description: "Top 100 most asked questions with pattern-based approach.",
  icon: "briefcase",
  topics: [
    {
      id: "interview-patterns",
      title: "Common Interview Patterns",
      description: "Two pointers, sliding window, fast & slow pointers.",
      order: 1,
      realWorldAnalogy: "Interview patterns are like recipe templates in cooking. Once you learn the 'stir-fry' pattern, you can make any stir-fry dish. Similarly, once you learn the 'sliding window' pattern, you can solve dozens of similar problems.",
      lesson: `# Common Interview Patterns

## 1. Two Pointers
Use two pointers to traverse data from different positions.

\`\`\`
Example: Is array a palindrome?
[1, 2, 3, 2, 1]
 ↑              ↑
left           right
Compare, move inward
\`\`\`

## 2. Sliding Window
Maintain a window of elements and slide it across the array.

\`\`\`
Max sum of k=3 consecutive elements:
[2, 1, 5, 1, 3, 2]
[2, 1, 5]          sum = 8
   [1, 5, 1]       sum = 7
      [5, 1, 3]    sum = 9 ← max
         [1, 3, 2] sum = 6
\`\`\`

## 3. Fast & Slow Pointers
Detect cycles in linked lists or find middle element.`,
      codeExamples: {
        "C++": `// Two Pointers: Check Palindrome\nbool isPalindrome(vector<int>& arr) {\n    int l = 0, r = arr.size() - 1;\n    while (l < r) {\n        if (arr[l] != arr[r]) return false;\n        l++; r--;\n    }\n    return true;\n}\n\n// Sliding Window: Max sum of k elements\nint maxSumK(vector<int>& arr, int k) {\n    int sum = 0;\n    for (int i = 0; i < k; i++) sum += arr[i];\n    int maxSum = sum;\n    for (int i = k; i < arr.size(); i++) {\n        sum += arr[i] - arr[i-k];\n        maxSum = max(maxSum, sum);\n    }\n    return maxSum;\n}`,
        Python: `# Two Pointers\ndef is_palindrome(arr):\n    l, r = 0, len(arr) - 1\n    while l < r:\n        if arr[l] != arr[r]: return False\n        l += 1; r -= 1\n    return True\n\n# Sliding Window\ndef max_sum_k(arr, k):\n    s = sum(arr[:k])\n    max_s = s\n    for i in range(k, len(arr)):\n        s += arr[i] - arr[i-k]\n        max_s = max(max_s, s)\n    return max_s`,
        Java: `static boolean isPalindrome(int[] arr) {\n    int l = 0, r = arr.length - 1;\n    while (l < r) {\n        if (arr[l] != arr[r]) return false;\n        l++; r--;\n    }\n    return true;\n}`,
        C: `int isPalindrome(int arr[], int n) {\n    int l = 0, r = n - 1;\n    while (l < r) {\n        if (arr[l] != arr[r]) return 0;\n        l++; r--;\n    }\n    return 1;\n}`,
      },
      questions: [
        {
          id: "int-pat-1",
          title: "Two Sum (Sorted Array)",
          difficulty: "Easy",
          description: "Given a sorted array and a target, find two numbers that add up to the target. Print their 1-based indices.",
          starterCode: {
            "C++": '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    int n, target;\n    cin >> n;\n    vector<int> arr(n);\n    for (int &x : arr) cin >> x;\n    cin >> target;\n    // Two pointer approach\n    return 0;\n}',
            Python: 'n = int(input())\narr = list(map(int, input().split()))\ntarget = int(input())\n# Two pointer approach\n',
          },
          expectedOutput: "Two 1-based indices",
          hints: ["Start with l=0, r=n-1. If sum < target, l++. If sum > target, r--."],
          xpReward: 15,
        },
        {
          id: "int-pat-2",
          title: "Maximum Sum Subarray of Size K",
          difficulty: "Medium",
          description: "Find the maximum sum of any contiguous subarray of size K.",
          starterCode: {
            "C++": '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    int n, k;\n    cin >> n >> k;\n    vector<int> arr(n);\n    for (int &x : arr) cin >> x;\n    // Sliding window\n    return 0;\n}',
            Python: 'n, k = map(int, input().split())\narr = list(map(int, input().split()))\n# Sliding window\n',
          },
          expectedOutput: "Maximum sum",
          hints: ["Maintain a window sum, slide by adding new element and removing old"],
          xpReward: 20,
        },
      ],
      quiz: [
        {
          question: "When should you use the two-pointer technique?",
          options: ["On unsorted arrays only", "When working with sorted arrays or pairs", "Only with linked lists", "Only with strings"],
          correctIndex: 1,
          explanation: "Two pointers work best with sorted arrays (find pairs) or when you need to compare elements from both ends.",
        },
      ],
      referenceLinks: [
        { title: "14 Patterns - HackerNoon", url: "https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ed" },
      ],
    },
  ],
};
