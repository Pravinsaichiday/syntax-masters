export interface DSAProblem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  starterCode: Record<string, string>;
  xpReward: number;
}

export interface DSASubtopic {
  id: string;
  title: string;
  description: string;
  problems: DSAProblem[];
}

export interface DSATopic {
  id: string;
  title: string;
  icon: string;
  description: string;
  subtopics: DSASubtopic[];
}

// Helper to create simple starter code
const py = (fn: string, args: string, body: string, test: string) =>
  `${body}\n\n# Test\n${test}`;
const cpp = (body: string) =>
  `#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\n#include <stack>\n#include <queue>\n#include <unordered_map>\n#include <unordered_set>\nusing namespace std;\n\n${body}`;
const java = (body: string) =>
  `import java.util.*;\n\npublic class Solution {\n${body}\n}`;

export const DSA_ROADMAP: DSATopic[] = [
  // ============================================================
  // 1. WHY TO LEARN DSA? / PROGRAMMING BASICS
  // ============================================================
  {
    id: "programming-basics",
    title: "Programming Basics",
    icon: "🚀",
    description: "Why to learn DSA? Understand time & space complexity, and build a strong programming foundation.",
    subtopics: [
      {
        id: "time-space-complexity",
        title: "Time & Space Complexity",
        description: "Understand Big-O notation, analyze time and space complexity of algorithms.",
        problems: [
          {
            id: "basics-time-complexity",
            title: "Analyze Time Complexity",
            difficulty: "Easy",
            description: "Given a function, determine its time complexity. Write a function that takes n and returns the sum of 1 to n using a loop. What is the time complexity?",
            examples: [
              { input: "n = 5", output: "15", explanation: "1+2+3+4+5 = 15, Time: O(n)" },
              { input: "n = 10", output: "55" },
            ],
            constraints: ["1 <= n <= 10^6"],
            starterCode: {
              python: "def sum_1_to_n(n):\n    # Calculate sum of 1 to n using a loop\n    # What is the time complexity?\n    pass\n\nprint(sum_1_to_n(5))   # 15\nprint(sum_1_to_n(10))  # 55",
              cpp: cpp("int sum1ToN(int n) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    cout << sum1ToN(5) << endl;  // 15\n    cout << sum1ToN(10) << endl; // 55\n    return 0;\n}"),
              java: java("    public static int sum1ToN(int n) {\n        // Your code here\n        return 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(sum1ToN(5));  // 15\n        System.out.println(sum1ToN(10)); // 55\n    }"),
            },
            xpReward: 5,
          },
        ],
      },
    ],
  },

  // ============================================================
  // 2. FUNCTIONS & IF-ELSE
  // ============================================================
  {
    id: "functions-if-else",
    title: "Functions & If-Else",
    icon: "🔀",
    description: "Master functions, conditional statements, and basic decision-making logic.",
    subtopics: [
      {
        id: "functions-conditionals",
        title: "Functions & Conditionals",
        description: "Practice writing functions and using if-else statements.",
        problems: [
          {
            id: "two-sum-basic",
            title: "Two Sum",
            difficulty: "Easy",
            description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume each input has exactly one solution.",
            examples: [
              { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "nums[0] + nums[1] = 9" },
              { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
            ],
            constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9"],
            starterCode: {
              python: "def two_sum(nums, target):\n    # Your code here\n    pass\n\nprint(two_sum([2,7,11,15], 9))  # [0,1]",
              cpp: cpp("vector<int> twoSum(vector<int>& nums, int target) {\n    // Your code here\n    return {};\n}\n\nint main() {\n    vector<int> nums = {2,7,11,15};\n    auto res = twoSum(nums, 9);\n    cout << \"[\" << res[0] << \",\" << res[1] << \"]\";\n}"),
              java: java("    public static int[] twoSum(int[] nums, int target) {\n        // Your code here\n        return new int[]{};\n    }\n    public static void main(String[] args) {\n        int[] res = twoSum(new int[]{2,7,11,15}, 9);\n        System.out.println(\"[\" + res[0] + \",\" + res[1] + \"]\");\n    }"),
            },
            xpReward: 10,
          },
          {
            id: "check-voting-eligibility",
            title: "Check Voting Eligibility",
            difficulty: "Easy",
            description: "Write a function that takes a person's age and returns whether they are eligible to vote (age >= 18). Return 'Eligible' or 'Not Eligible'.",
            examples: [
              { input: "age = 20", output: "Eligible" },
              { input: "age = 15", output: "Not Eligible" },
            ],
            constraints: ["0 <= age <= 150"],
            starterCode: {
              python: "def check_voting(age):\n    # Your code here\n    pass\n\nprint(check_voting(20))  # Eligible\nprint(check_voting(15))  # Not Eligible",
              cpp: cpp("string checkVoting(int age) {\n    // Your code here\n    return \"\";\n}\n\nint main() {\n    cout << checkVoting(20) << endl;\n    cout << checkVoting(15) << endl;\n}"),
              java: java("    public static String checkVoting(int age) {\n        // Your code here\n        return \"\";\n    }\n    public static void main(String[] args) {\n        System.out.println(checkVoting(20));\n        System.out.println(checkVoting(15));\n    }"),
            },
            xpReward: 5,
          },
          {
            id: "square-number",
            title: "Square Number",
            difficulty: "Easy",
            description: "Write a function that takes an integer and returns its square.",
            examples: [
              { input: "n = 5", output: "25" },
              { input: "n = -3", output: "9" },
            ],
            constraints: ["-10^4 <= n <= 10^4"],
            starterCode: {
              python: "def square(n):\n    # Your code here\n    pass\n\nprint(square(5))   # 25\nprint(square(-3))  # 9",
              cpp: cpp("int square(int n) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    cout << square(5) << endl;\n    cout << square(-3) << endl;\n}"),
              java: java("    public static int square(int n) {\n        // Your code here\n        return 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(square(5));\n        System.out.println(square(-3));\n    }"),
            },
            xpReward: 5,
          },
          {
            id: "even-or-odd",
            title: "Even or Odd",
            difficulty: "Easy",
            description: "Write a function that takes an integer and returns 'Even' if it's even, 'Odd' if it's odd.",
            examples: [
              { input: "n = 4", output: "Even" },
              { input: "n = 7", output: "Odd" },
            ],
            constraints: ["-10^6 <= n <= 10^6"],
            starterCode: {
              python: "def even_or_odd(n):\n    # Your code here\n    pass\n\nprint(even_or_odd(4))  # Even\nprint(even_or_odd(7))  # Odd",
              cpp: cpp("string evenOrOdd(int n) {\n    // Your code here\n    return \"\";\n}\n\nint main() {\n    cout << evenOrOdd(4) << endl;\n    cout << evenOrOdd(7) << endl;\n}"),
              java: java("    public static String evenOrOdd(int n) {\n        // Your code here\n        return \"\";\n    }\n    public static void main(String[] args) {\n        System.out.println(evenOrOdd(4));\n        System.out.println(evenOrOdd(7));\n    }"),
            },
            xpReward: 5,
          },
          {
            id: "second-largest",
            title: "Second Largest",
            difficulty: "Easy",
            description: "Given an array of integers, find the second largest element. If no second largest exists, return -1.",
            examples: [
              { input: "arr = [12, 35, 1, 10, 34, 1]", output: "34" },
              { input: "arr = [10, 10]", output: "-1" },
            ],
            constraints: ["2 <= arr.length <= 10^5"],
            starterCode: {
              python: "def second_largest(arr):\n    # Your code here\n    pass\n\nprint(second_largest([12, 35, 1, 10, 34, 1]))  # 34\nprint(second_largest([10, 10]))  # -1",
              cpp: cpp("int secondLargest(vector<int>& arr) {\n    // Your code here\n    return -1;\n}\n\nint main() {\n    vector<int> a = {12,35,1,10,34,1};\n    cout << secondLargest(a) << endl;  // 34\n}"),
              java: java("    public static int secondLargest(int[] arr) {\n        // Your code here\n        return -1;\n    }\n    public static void main(String[] args) {\n        System.out.println(secondLargest(new int[]{12,35,1,10,34,1}));\n    }"),
            },
            xpReward: 10,
          },
          {
            id: "count-digit",
            title: "Count Digits",
            difficulty: "Easy",
            description: "Given an integer n, count the number of digits in n.",
            examples: [
              { input: "n = 12345", output: "5" },
              { input: "n = 0", output: "1" },
            ],
            constraints: ["0 <= n <= 10^9"],
            starterCode: {
              python: "def count_digits(n):\n    # Your code here\n    pass\n\nprint(count_digits(12345))  # 5\nprint(count_digits(0))      # 1",
              cpp: cpp("int countDigits(int n) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    cout << countDigits(12345) << endl;  // 5\n    cout << countDigits(0) << endl;      // 1\n}"),
              java: java("    public static int countDigits(int n) {\n        // Your code here\n        return 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(countDigits(12345));\n        System.out.println(countDigits(0));\n    }"),
            },
            xpReward: 5,
          },
        ],
      },
    ],
  },

  // ============================================================
  // 3. LOOPS
  // ============================================================
  {
    id: "loops",
    title: "Loops",
    icon: "🔄",
    description: "Master for, while loops, and iteration patterns through arrays and numbers.",
    subtopics: [
      {
        id: "loop-problems",
        title: "Loop Problems",
        description: "Practice loops with arrays and number-based problems.",
        problems: [
          {
            id: "count-negative-numbers",
            title: "Count Negative Numbers in an Array",
            difficulty: "Easy",
            description: "Given an array of integers, count the number of negative numbers in it.",
            examples: [
              { input: "arr = [1, -2, 3, -4, 5, -6]", output: "3" },
              { input: "arr = [1, 2, 3]", output: "0" },
            ],
            constraints: ["1 <= arr.length <= 10^4"],
            starterCode: {
              python: "def count_negatives(arr):\n    # Your code here\n    pass\n\nprint(count_negatives([1, -2, 3, -4, 5, -6]))  # 3\nprint(count_negatives([1, 2, 3]))  # 0",
              cpp: cpp("int countNegatives(vector<int>& arr) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    vector<int> a = {1,-2,3,-4,5,-6};\n    cout << countNegatives(a);\n}"),
              java: java("    public static int countNegatives(int[] arr) {\n        // Your code here\n        return 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(countNegatives(new int[]{1,-2,3,-4,5,-6}));\n    }"),
            },
            xpReward: 5,
          },
          {
            id: "find-smallest",
            title: "Find Smallest Number in an Array",
            difficulty: "Easy",
            description: "Given an array of integers, find and return the smallest element.",
            examples: [
              { input: "arr = [5, 3, 8, 1, 9]", output: "1" },
              { input: "arr = [10, 20, 30]", output: "10" },
            ],
            constraints: ["1 <= arr.length <= 10^4"],
            starterCode: {
              python: "def find_smallest(arr):\n    # Your code here\n    pass\n\nprint(find_smallest([5, 3, 8, 1, 9]))  # 1",
              cpp: cpp("int findSmallest(vector<int>& arr) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    vector<int> a = {5,3,8,1,9};\n    cout << findSmallest(a);\n}"),
              java: java("    public static int findSmallest(int[] arr) {\n        // Your code here\n        return 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(findSmallest(new int[]{5,3,8,1,9}));\n    }"),
            },
            xpReward: 5,
          },
          {
            id: "find-largest",
            title: "Find Largest Number in an Array",
            difficulty: "Easy",
            description: "Given an array of integers, find and return the largest element.",
            examples: [
              { input: "arr = [5, 3, 8, 1, 9]", output: "9" },
            ],
            constraints: ["1 <= arr.length <= 10^4"],
            starterCode: {
              python: "def find_largest(arr):\n    # Your code here\n    pass\n\nprint(find_largest([5, 3, 8, 1, 9]))  # 9",
              cpp: cpp("int findLargest(vector<int>& arr) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    vector<int> a = {5,3,8,1,9};\n    cout << findLargest(a);\n}"),
              java: java("    public static int findLargest(int[] arr) {\n        // Your code here\n        return 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(findLargest(new int[]{5,3,8,1,9}));\n    }"),
            },
            xpReward: 5,
          },
          {
            id: "print-even-numbers",
            title: "Print All Even Numbers in an Array",
            difficulty: "Easy",
            description: "Given an array of integers, return a new array containing only the even numbers.",
            examples: [
              { input: "arr = [1, 2, 3, 4, 5, 6]", output: "[2, 4, 6]" },
              { input: "arr = [1, 3, 5]", output: "[]" },
            ],
            constraints: ["1 <= arr.length <= 10^4"],
            starterCode: {
              python: "def get_evens(arr):\n    # Your code here\n    pass\n\nprint(get_evens([1, 2, 3, 4, 5, 6]))  # [2, 4, 6]",
              cpp: cpp("vector<int> getEvens(vector<int>& arr) {\n    // Your code here\n    return {};\n}\n\nint main() {\n    vector<int> a = {1,2,3,4,5,6};\n    auto r = getEvens(a);\n    for(auto x : r) cout << x << \" \";\n}"),
              java: java("    public static List<Integer> getEvens(int[] arr) {\n        // Your code here\n        return new ArrayList<>();\n    }\n    public static void main(String[] args) {\n        System.out.println(getEvens(new int[]{1,2,3,4,5,6}));\n    }"),
            },
            xpReward: 5,
          },
          {
            id: "star-patterns",
            title: "Star Patterns",
            difficulty: "Easy",
            description: "Print a right-angled triangle star pattern with n rows. Each row i should have i stars.",
            examples: [
              { input: "n = 4", output: "*\n**\n***\n****" },
              { input: "n = 3", output: "*\n**\n***" },
            ],
            constraints: ["1 <= n <= 50"],
            starterCode: {
              python: "def star_pattern(n):\n    # Print star pattern\n    pass\n\nstar_pattern(4)",
              cpp: cpp("void starPattern(int n) {\n    // Your code here\n}\n\nint main() {\n    starPattern(4);\n}"),
              java: java("    public static void starPattern(int n) {\n        // Your code here\n    }\n    public static void main(String[] args) {\n        starPattern(4);\n    }"),
            },
            xpReward: 5,
          },
          {
            id: "loops-a2z",
            title: "Loops A2Z",
            difficulty: "Easy",
            description: "Print all lowercase letters from 'a' to 'z' separated by spaces using a loop.",
            examples: [
              { input: "(no input)", output: "a b c d e ... z" },
            ],
            constraints: ["Print all 26 lowercase letters"],
            starterCode: {
              python: "def print_a2z():\n    # Print a to z\n    pass\n\nprint_a2z()",
              cpp: cpp("void printA2Z() {\n    // Your code here\n}\n\nint main() {\n    printA2Z();\n}"),
              java: java("    public static void printA2Z() {\n        // Your code here\n    }\n    public static void main(String[] args) {\n        printA2Z();\n    }"),
            },
            xpReward: 5,
          },
        ],
      },
    ],
  },

  // ============================================================
  // 4. ARRAYS
  // ============================================================
  {
    id: "arrays",
    title: "Arrays",
    icon: "📊",
    description: "Master array manipulation — traversal, in-place operations, and classic array problems.",
    subtopics: [
      {
        id: "array-problems",
        title: "Array Problems",
        description: "Core array manipulation problems.",
        problems: [
          {
            id: "remove-duplicates",
            title: "Remove Duplicates",
            difficulty: "Easy",
            description: "Given a sorted array `nums`, remove the duplicates in-place such that each element appears only once and return the new length.",
            examples: [
              { input: "nums = [1,1,2]", output: "2", explanation: "Array becomes [1,2]" },
              { input: "nums = [0,0,1,1,1,2,2,3,3,4]", output: "5" },
            ],
            constraints: ["1 <= nums.length <= 3 * 10^4", "-100 <= nums[i] <= 100", "nums is sorted in non-decreasing order"],
            starterCode: {
              python: "def remove_duplicates(nums):\n    # Your code here\n    pass\n\nnums = [1,1,2]\nprint(remove_duplicates(nums))  # 2",
              cpp: cpp("int removeDuplicates(vector<int>& nums) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    vector<int> nums = {1,1,2};\n    cout << removeDuplicates(nums);\n}"),
              java: java("    public static int removeDuplicates(int[] nums) {\n        // Your code here\n        return 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(removeDuplicates(new int[]{1,1,2}));\n    }"),
            },
            xpReward: 10,
          },
          {
            id: "remove-element",
            title: "Remove Element",
            difficulty: "Easy",
            description: "Given an integer array `nums` and an integer `val`, remove all occurrences of `val` in-place and return the new length.",
            examples: [
              { input: "nums = [3,2,2,3], val = 3", output: "2", explanation: "Array becomes [2,2]" },
            ],
            constraints: ["0 <= nums.length <= 100", "0 <= val <= 100"],
            starterCode: {
              python: "def remove_element(nums, val):\n    # Your code here\n    pass\n\nprint(remove_element([3,2,2,3], 3))  # 2",
              cpp: cpp("int removeElement(vector<int>& nums, int val) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    vector<int> nums = {3,2,2,3};\n    cout << removeElement(nums, 3);\n}"),
              java: java("    public static int removeElement(int[] nums, int val) {\n        // Your code here\n        return 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(removeElement(new int[]{3,2,2,3}, 3));\n    }"),
            },
            xpReward: 10,
          },
          {
            id: "reverse-string",
            title: "Reverse String",
            difficulty: "Easy",
            description: "Write a function that reverses a string. The input string is given as an array of characters. Do it in-place with O(1) extra memory.",
            examples: [
              { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
            ],
            constraints: ["1 <= s.length <= 10^5"],
            starterCode: {
              python: "def reverse_string(s):\n    # Reverse in-place\n    pass\n\ns = list('hello')\nreverse_string(s)\nprint(s)  # ['o','l','l','e','h']",
              cpp: cpp("void reverseString(vector<char>& s) {\n    // Your code here\n}\n\nint main() {\n    vector<char> s = {'h','e','l','l','o'};\n    reverseString(s);\n    for(auto c : s) cout << c;\n}"),
              java: java("    public static void reverseString(char[] s) {\n        // Your code here\n    }\n    public static void main(String[] args) {\n        char[] s = {'h','e','l','l','o'};\n        reverseString(s);\n        System.out.println(Arrays.toString(s));\n    }"),
            },
            xpReward: 10,
          },
          {
            id: "best-time-buy-sell",
            title: "Best Time to Buy and Sell Stocks",
            difficulty: "Easy",
            description: "Given an array `prices` where `prices[i]` is the price of a stock on the ith day, return the maximum profit. If no profit possible, return 0.",
            examples: [
              { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy at 1, sell at 6" },
              { input: "prices = [7,6,4,3,1]", output: "0" },
            ],
            constraints: ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^4"],
            starterCode: {
              python: "def max_profit(prices):\n    # Your code here\n    pass\n\nprint(max_profit([7,1,5,3,6,4]))  # 5",
              cpp: cpp("int maxProfit(vector<int>& prices) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    vector<int> p = {7,1,5,3,6,4};\n    cout << maxProfit(p);\n}"),
              java: java("    public static int maxProfit(int[] prices) {\n        // Your code here\n        return 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(maxProfit(new int[]{7,1,5,3,6,4}));\n    }"),
            },
            xpReward: 10,
          },
          {
            id: "merge-sorted-arrays",
            title: "Merge Sorted Arrays",
            difficulty: "Easy",
            description: "Given two sorted arrays nums1 and nums2, merge nums2 into nums1 as one sorted array. nums1 has enough space to hold additional elements from nums2.",
            examples: [
              { input: "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3", output: "[1,2,2,3,5,6]" },
            ],
            constraints: ["nums1.length == m + n", "0 <= m, n <= 200"],
            starterCode: {
              python: "def merge(nums1, m, nums2, n):\n    # Merge in-place\n    pass\n\nnums1 = [1,2,3,0,0,0]\nmerge(nums1, 3, [2,5,6], 3)\nprint(nums1)  # [1,2,2,3,5,6]",
              cpp: cpp("void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {\n    // Your code here\n}\n\nint main() {\n    vector<int> n1 = {1,2,3,0,0,0}, n2 = {2,5,6};\n    merge(n1, 3, n2, 3);\n    for(auto x : n1) cout << x << \" \";\n}"),
              java: java("    public static void merge(int[] nums1, int m, int[] nums2, int n) {\n        // Your code here\n    }\n    public static void main(String[] args) {\n        int[] n1 = {1,2,3,0,0,0};\n        merge(n1, 3, new int[]{2,5,6}, 3);\n        System.out.println(Arrays.toString(n1));\n    }"),
            },
            xpReward: 10,
          },
          {
            id: "move-zeros",
            title: "Move Zeros",
            difficulty: "Easy",
            description: "Given an integer array `nums`, move all 0's to the end while maintaining the relative order of non-zero elements. Do it in-place.",
            examples: [
              { input: "nums = [0,1,0,3,12]", output: "[1,3,12,0,0]" },
            ],
            constraints: ["1 <= nums.length <= 10^4"],
            starterCode: {
              python: "def move_zeroes(nums):\n    # Your code here\n    pass\n\nnums = [0,1,0,3,12]\nmove_zeroes(nums)\nprint(nums)  # [1,3,12,0,0]",
              cpp: cpp("void moveZeroes(vector<int>& nums) {\n    // Your code here\n}\n\nint main() {\n    vector<int> nums = {0,1,0,3,12};\n    moveZeroes(nums);\n    for(auto x : nums) cout << x << \" \";\n}"),
              java: java("    public static void moveZeroes(int[] nums) {\n        // Your code here\n    }\n    public static void main(String[] args) {\n        int[] nums = {0,1,0,3,12};\n        moveZeroes(nums);\n        System.out.println(Arrays.toString(nums));\n    }"),
            },
            xpReward: 10,
          },
          {
            id: "max-consecutive-ones",
            title: "Max Consecutive Ones",
            difficulty: "Easy",
            description: "Given a binary array `nums`, return the maximum number of consecutive 1's in the array.",
            examples: [
              { input: "nums = [1,1,0,1,1,1]", output: "3" },
            ],
            constraints: ["1 <= nums.length <= 10^5", "nums[i] is either 0 or 1"],
            starterCode: {
              python: "def max_consecutive_ones(nums):\n    # Your code here\n    pass\n\nprint(max_consecutive_ones([1,1,0,1,1,1]))  # 3",
              cpp: cpp("int maxConsecutiveOnes(vector<int>& nums) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    vector<int> nums = {1,1,0,1,1,1};\n    cout << maxConsecutiveOnes(nums);\n}"),
              java: java("    public static int maxConsecutiveOnes(int[] nums) {\n        // Your code here\n        return 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(maxConsecutiveOnes(new int[]{1,1,0,1,1,1}));\n    }"),
            },
            xpReward: 10,
          },
          {
            id: "missing-number",
            title: "Missing Number",
            difficulty: "Easy",
            description: "Given an array `nums` containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.",
            examples: [
              { input: "nums = [3,0,1]", output: "2" },
              { input: "nums = [0,1]", output: "2" },
            ],
            constraints: ["n == nums.length", "1 <= n <= 10^4", "All numbers are unique"],
            starterCode: {
              python: "def missing_number(nums):\n    # Your code here\n    pass\n\nprint(missing_number([3,0,1]))  # 2",
              cpp: cpp("int missingNumber(vector<int>& nums) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    vector<int> nums = {3,0,1};\n    cout << missingNumber(nums);\n}"),
              java: java("    public static int missingNumber(int[] nums) {\n        // Your code here\n        return 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(missingNumber(new int[]{3,0,1}));\n    }"),
            },
            xpReward: 10,
          },
          {
            id: "single-number",
            title: "Single Number",
            difficulty: "Easy",
            description: "Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one. You must implement a solution with O(1) extra space.",
            examples: [
              { input: "nums = [2,2,1]", output: "1" },
              { input: "nums = [4,1,2,1,2]", output: "4" },
            ],
            constraints: ["1 <= nums.length <= 3 * 10^4", "Each element appears twice except for one"],
            starterCode: {
              python: "def single_number(nums):\n    # Your code here (hint: XOR)\n    pass\n\nprint(single_number([2,2,1]))      # 1\nprint(single_number([4,1,2,1,2]))  # 4",
              cpp: cpp("int singleNumber(vector<int>& nums) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    vector<int> nums = {4,1,2,1,2};\n    cout << singleNumber(nums);\n}"),
              java: java("    public static int singleNumber(int[] nums) {\n        // Your code here\n        return 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(singleNumber(new int[]{4,1,2,1,2}));\n    }"),
            },
            xpReward: 10,
          },
        ],
      },
    ],
  },

  // ============================================================
  // 5. RECURSION
  // ============================================================
  {
    id: "recursion",
    title: "Recursion",
    icon: "🔁",
    description: "Understand recursion, base cases, recursive calls, and classic recursive problems.",
    subtopics: [
      {
        id: "recursion-problems",
        title: "Recursion Problems",
        description: "Practice recursion with classic problems.",
        problems: [
          {
            id: "fibonacci-number",
            title: "Fibonacci Number",
            difficulty: "Easy",
            description: "Calculate the nth Fibonacci number using recursion. F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2).",
            examples: [
              { input: "n = 5", output: "5", explanation: "0,1,1,2,3,5" },
              { input: "n = 10", output: "55" },
            ],
            constraints: ["0 <= n <= 30"],
            starterCode: {
              python: "def fibonacci(n):\n    # Your code here\n    pass\n\nprint(fibonacci(5))   # 5\nprint(fibonacci(10))  # 55",
              cpp: cpp("int fibonacci(int n) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    cout << fibonacci(5) << endl;\n    cout << fibonacci(10) << endl;\n}"),
              java: java("    public static int fibonacci(int n) {\n        // Your code here\n        return 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(fibonacci(5));\n        System.out.println(fibonacci(10));\n    }"),
            },
            xpReward: 10,
          },
          {
            id: "sum-first-n",
            title: "Sum of First N Numbers",
            difficulty: "Easy",
            description: "Write a recursive function to calculate the sum of first n natural numbers.",
            examples: [
              { input: "n = 5", output: "15" },
              { input: "n = 10", output: "55" },
            ],
            constraints: ["1 <= n <= 10^4"],
            starterCode: {
              python: "def sum_n(n):\n    # Your code here (recursive)\n    pass\n\nprint(sum_n(5))   # 15\nprint(sum_n(10))  # 55",
              cpp: cpp("int sumN(int n) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    cout << sumN(5) << endl;\n    cout << sumN(10) << endl;\n}"),
              java: java("    public static int sumN(int n) {\n        // Your code here\n        return 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(sumN(5));\n        System.out.println(sumN(10));\n    }"),
            },
            xpReward: 5,
          },
          {
            id: "sum-array-recursive",
            title: "Sum of All Numbers in Array",
            difficulty: "Easy",
            description: "Write a recursive function to find the sum of all elements in an array.",
            examples: [
              { input: "arr = [1, 2, 3, 4, 5]", output: "15" },
            ],
            constraints: ["1 <= arr.length <= 10^4"],
            starterCode: {
              python: "def sum_array(arr, n=None):\n    # Your code here (recursive)\n    if n is None:\n        n = len(arr)\n    pass\n\nprint(sum_array([1, 2, 3, 4, 5]))  # 15",
              cpp: cpp("int sumArray(vector<int>& arr, int n) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    vector<int> a = {1,2,3,4,5};\n    cout << sumArray(a, a.size());\n}"),
              java: java("    public static int sumArray(int[] arr, int n) {\n        // Your code here\n        return 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(sumArray(new int[]{1,2,3,4,5}, 5));\n    }"),
            },
            xpReward: 10,
          },
          {
            id: "sum-odd-recursive",
            title: "Sum of Odd Numbers in Array",
            difficulty: "Easy",
            description: "Write a recursive function to find the sum of all odd numbers in an array.",
            examples: [
              { input: "arr = [1, 2, 3, 4, 5]", output: "9", explanation: "1+3+5 = 9" },
            ],
            constraints: ["1 <= arr.length <= 10^4"],
            starterCode: {
              python: "def sum_odd(arr, i=0):\n    # Your code here (recursive)\n    pass\n\nprint(sum_odd([1, 2, 3, 4, 5]))  # 9",
              cpp: cpp("int sumOdd(vector<int>& arr, int i = 0) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    vector<int> a = {1,2,3,4,5};\n    cout << sumOdd(a);\n}"),
              java: java("    public static int sumOdd(int[] arr, int i) {\n        // Your code here\n        return 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(sumOdd(new int[]{1,2,3,4,5}, 0));\n    }"),
            },
            xpReward: 10,
          },
          {
            id: "factorial-n",
            title: "Factorial of N",
            difficulty: "Easy",
            description: "Write a recursive function to calculate the factorial of n. n! = n × (n-1) × ... × 1, with 0! = 1.",
            examples: [
              { input: "n = 5", output: "120" },
              { input: "n = 0", output: "1" },
            ],
            constraints: ["0 <= n <= 20"],
            starterCode: {
              python: "def factorial(n):\n    # Your code here\n    pass\n\nprint(factorial(5))  # 120\nprint(factorial(0))  # 1",
              cpp: cpp("long long factorial(int n) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    cout << factorial(5) << endl;\n    cout << factorial(0) << endl;\n}"),
              java: java("    public static long factorial(int n) {\n        // Your code here\n        return 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(factorial(5));\n        System.out.println(factorial(0));\n    }"),
            },
            xpReward: 5,
          },
          {
            id: "power-of-two",
            title: "Power of Two",
            difficulty: "Easy",
            description: "Given an integer n, return true if it is a power of two. Use recursion.",
            examples: [
              { input: "n = 16", output: "true" },
              { input: "n = 6", output: "false" },
            ],
            constraints: ["-2^31 <= n <= 2^31 - 1"],
            starterCode: {
              python: "def is_power_of_two(n):\n    # Your code here (recursive)\n    pass\n\nprint(is_power_of_two(16))  # True\nprint(is_power_of_two(6))   # False",
              cpp: cpp("bool isPowerOfTwo(int n) {\n    // Your code here\n    return false;\n}\n\nint main() {\n    cout << (isPowerOfTwo(16) ? \"true\" : \"false\") << endl;\n    cout << (isPowerOfTwo(6) ? \"true\" : \"false\") << endl;\n}"),
              java: java("    public static boolean isPowerOfTwo(int n) {\n        // Your code here\n        return false;\n    }\n    public static void main(String[] args) {\n        System.out.println(isPowerOfTwo(16));\n        System.out.println(isPowerOfTwo(6));\n    }"),
            },
            xpReward: 10,
          },
          {
            id: "recursion-a2z",
            title: "Recursion A2Z",
            difficulty: "Easy",
            description: "Write a recursive function that prints all characters from 'a' to 'z'.",
            examples: [
              { input: "(no input)", output: "a b c d ... z" },
            ],
            constraints: ["Must use recursion, no loops"],
            starterCode: {
              python: "def print_a2z(ch='a'):\n    # Your code here (recursive)\n    pass\n\nprint_a2z()",
              cpp: cpp("void printA2Z(char ch = 'a') {\n    // Your code here\n}\n\nint main() {\n    printA2Z();\n}"),
              java: java("    public static void printA2Z(char ch) {\n        // Your code here\n    }\n    public static void main(String[] args) {\n        printA2Z('a');\n    }"),
            },
            xpReward: 5,
          },
        ],
      },
    ],
  },

  // ============================================================
  // 6. SEARCHING & SORTING
  // ============================================================
  {
    id: "searching-sorting",
    title: "Searching & Sorting",
    icon: "🔍",
    description: "Learn linear search, binary search, and fundamental sorting algorithms.",
    subtopics: [
      {
        id: "search-sort-basics",
        title: "Searching & Sorting Algorithms",
        description: "Implement core searching and sorting algorithms from scratch.",
        problems: [
          {
            id: "linear-search",
            title: "Linear Search",
            difficulty: "Easy",
            description: "Implement linear search to find the index of a target element in an array. Return -1 if not found.",
            examples: [
              { input: "arr = [10, 20, 30, 40], target = 30", output: "2" },
              { input: "arr = [1, 2, 3], target = 5", output: "-1" },
            ],
            constraints: ["1 <= arr.length <= 10^4"],
            starterCode: {
              python: "def linear_search(arr, target):\n    # Your code here\n    pass\n\nprint(linear_search([10,20,30,40], 30))  # 2",
              cpp: cpp("int linearSearch(vector<int>& arr, int target) {\n    // Your code here\n    return -1;\n}\n\nint main() {\n    vector<int> a = {10,20,30,40};\n    cout << linearSearch(a, 30);\n}"),
              java: java("    public static int linearSearch(int[] arr, int target) {\n        // Your code here\n        return -1;\n    }\n    public static void main(String[] args) {\n        System.out.println(linearSearch(new int[]{10,20,30,40}, 30));\n    }"),
            },
            xpReward: 5,
          },
          {
            id: "binary-search",
            title: "Binary Search",
            difficulty: "Easy",
            description: "Implement binary search on a sorted array. Return the index of target, or -1 if not found.",
            examples: [
              { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" },
              { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1" },
            ],
            constraints: ["1 <= nums.length <= 10^4", "nums is sorted"],
            starterCode: {
              python: "def binary_search(nums, target):\n    # Your code here\n    pass\n\nprint(binary_search([-1,0,3,5,9,12], 9))  # 4",
              cpp: cpp("int binarySearch(vector<int>& nums, int target) {\n    // Your code here\n    return -1;\n}\n\nint main() {\n    vector<int> n = {-1,0,3,5,9,12};\n    cout << binarySearch(n, 9);\n}"),
              java: java("    public static int binarySearch(int[] nums, int target) {\n        // Your code here\n        return -1;\n    }\n    public static void main(String[] args) {\n        System.out.println(binarySearch(new int[]{-1,0,3,5,9,12}, 9));\n    }"),
            },
            xpReward: 10,
          },
          {
            id: "bubble-sort",
            title: "Bubble Sort",
            difficulty: "Easy",
            description: "Implement bubble sort to sort an array of integers in ascending order.",
            examples: [
              { input: "arr = [64, 34, 25, 12, 22, 11, 90]", output: "[11, 12, 22, 25, 34, 64, 90]" },
            ],
            constraints: ["1 <= arr.length <= 10^4"],
            starterCode: {
              python: "def bubble_sort(arr):\n    # Your code here\n    pass\n\narr = [64, 34, 25, 12, 22, 11, 90]\nbubble_sort(arr)\nprint(arr)",
              cpp: cpp("void bubbleSort(vector<int>& arr) {\n    // Your code here\n}\n\nint main() {\n    vector<int> a = {64,34,25,12,22,11,90};\n    bubbleSort(a);\n    for(auto x : a) cout << x << \" \";\n}"),
              java: java("    public static void bubbleSort(int[] arr) {\n        // Your code here\n    }\n    public static void main(String[] args) {\n        int[] arr = {64,34,25,12,22,11,90};\n        bubbleSort(arr);\n        System.out.println(Arrays.toString(arr));\n    }"),
            },
            xpReward: 10,
          },
          {
            id: "selection-sort",
            title: "Selection Sort",
            difficulty: "Easy",
            description: "Implement selection sort to sort an array in ascending order.",
            examples: [
              { input: "arr = [29, 10, 14, 37, 13]", output: "[10, 13, 14, 29, 37]" },
            ],
            constraints: ["1 <= arr.length <= 10^4"],
            starterCode: {
              python: "def selection_sort(arr):\n    # Your code here\n    pass\n\narr = [29, 10, 14, 37, 13]\nselection_sort(arr)\nprint(arr)",
              cpp: cpp("void selectionSort(vector<int>& arr) {\n    // Your code here\n}\n\nint main() {\n    vector<int> a = {29,10,14,37,13};\n    selectionSort(a);\n    for(auto x : a) cout << x << \" \";\n}"),
              java: java("    public static void selectionSort(int[] arr) {\n        // Your code here\n    }\n    public static void main(String[] args) {\n        int[] arr = {29,10,14,37,13};\n        selectionSort(arr);\n        System.out.println(Arrays.toString(arr));\n    }"),
            },
            xpReward: 10,
          },
          {
            id: "insertion-sort",
            title: "Insertion Sort",
            difficulty: "Easy",
            description: "Implement insertion sort to sort an array in ascending order.",
            examples: [
              { input: "arr = [12, 11, 13, 5, 6]", output: "[5, 6, 11, 12, 13]" },
            ],
            constraints: ["1 <= arr.length <= 10^4"],
            starterCode: {
              python: "def insertion_sort(arr):\n    # Your code here\n    pass\n\narr = [12, 11, 13, 5, 6]\ninsertion_sort(arr)\nprint(arr)",
              cpp: cpp("void insertionSort(vector<int>& arr) {\n    // Your code here\n}\n\nint main() {\n    vector<int> a = {12,11,13,5,6};\n    insertionSort(a);\n    for(auto x : a) cout << x << \" \";\n}"),
              java: java("    public static void insertionSort(int[] arr) {\n        // Your code here\n    }\n    public static void main(String[] args) {\n        int[] arr = {12,11,13,5,6};\n        insertionSort(arr);\n        System.out.println(Arrays.toString(arr));\n    }"),
            },
            xpReward: 10,
          },
          {
            id: "merge-sort",
            title: "Merge Sort",
            difficulty: "Medium",
            description: "Implement merge sort to sort an array using divide and conquer.",
            examples: [
              { input: "arr = [38, 27, 43, 3, 9, 82, 10]", output: "[3, 9, 10, 27, 38, 43, 82]" },
            ],
            constraints: ["1 <= arr.length <= 10^5"],
            starterCode: {
              python: "def merge_sort(arr):\n    # Your code here\n    pass\n\narr = [38, 27, 43, 3, 9, 82, 10]\nmerge_sort(arr)\nprint(arr)",
              cpp: cpp("void mergeSort(vector<int>& arr, int l, int r) {\n    // Your code here\n}\n\nint main() {\n    vector<int> a = {38,27,43,3,9,82,10};\n    mergeSort(a, 0, a.size()-1);\n    for(auto x : a) cout << x << \" \";\n}"),
              java: java("    public static void mergeSort(int[] arr, int l, int r) {\n        // Your code here\n    }\n    public static void main(String[] args) {\n        int[] arr = {38,27,43,3,9,82,10};\n        mergeSort(arr, 0, arr.length-1);\n        System.out.println(Arrays.toString(arr));\n    }"),
            },
            xpReward: 20,
          },
        ],
      },
    ],
  },

  // ============================================================
  // 7. LINKED LIST
  // ============================================================
  {
    id: "linked-list",
    title: "Linked List",
    icon: "🔗",
    description: "Master pointer manipulation — create, traverse, reverse, detect cycles, and advanced linked list operations.",
    subtopics: [
      {
        id: "ll-basics",
        title: "Linked List Basics",
        description: "Introduction, design, adding and deleting nodes.",
        problems: [
          {
            id: "intro-linked-list",
            title: "Introduction to Linked List",
            difficulty: "Easy",
            description: "Create a singly linked list from an array and print all elements.",
            examples: [{ input: "arr = [1,2,3,4,5]", output: "1 -> 2 -> 3 -> 4 -> 5" }],
            constraints: ["1 <= arr.length <= 100"],
            starterCode: {
              python: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef create_linked_list(arr):\n    # Your code here\n    pass\n\ndef print_list(head):\n    # Print: val -> val -> ...\n    pass\n\nprint_list(create_linked_list([1,2,3,4,5]))",
              cpp: cpp("struct ListNode {\n    int val; ListNode* next;\n    ListNode(int x):val(x),next(nullptr){}\n};\n\nListNode* createList(vector<int>& arr) {\n    // Your code here\n    return nullptr;\n}\n\nvoid printList(ListNode* head) {\n    // Your code here\n}\n\nint main() {\n    vector<int> a = {1,2,3,4,5};\n    printList(createList(a));\n}"),
              java: java("    static class ListNode {\n        int val; ListNode next;\n        ListNode(int v) { val = v; }\n    }\n    public static void main(String[] args) {\n        // Create and print linked list\n        System.out.println(\"Implement\");\n    }"),
            },
            xpReward: 5,
          },
          {
            id: "design-linked-list",
            title: "Design Linked List",
            difficulty: "Medium",
            description: "Design a linked list that supports: get(index), addAtHead(val), addAtTail(val), addAtIndex(index, val), deleteAtIndex(index).",
            examples: [{ input: "addAtHead(1), addAtTail(3), addAtIndex(1,2), get(1), deleteAtIndex(1), get(1)", output: "2, 3" }],
            constraints: ["0 <= index, val <= 1000", "At most 2000 calls"],
            starterCode: {
              python: "class MyLinkedList:\n    def __init__(self):\n        pass\n    def get(self, index):\n        pass\n    def addAtHead(self, val):\n        pass\n    def addAtTail(self, val):\n        pass\n    def addAtIndex(self, index, val):\n        pass\n    def deleteAtIndex(self, index):\n        pass\n\nll = MyLinkedList()\nll.addAtHead(1)\nll.addAtTail(3)\nll.addAtIndex(1, 2)\nprint(ll.get(1))  # 2\nll.deleteAtIndex(1)\nprint(ll.get(1))  # 3",
              cpp: cpp("class MyLinkedList {\npublic:\n    MyLinkedList() {}\n    int get(int index) { return -1; }\n    void addAtHead(int val) {}\n    void addAtTail(int val) {}\n    void addAtIndex(int index, int val) {}\n    void deleteAtIndex(int index) {}\n};\n\nint main() {\n    MyLinkedList ll;\n    ll.addAtHead(1);\n    ll.addAtTail(3);\n    ll.addAtIndex(1, 2);\n    cout << ll.get(1) << endl;\n}"),
              java: java("    // Design your linked list class here\n    public static void main(String[] args) {\n        System.out.println(\"Implement\");\n    }"),
            },
            xpReward: 20,
          },
          {
            id: "adding-nodes-ll",
            title: "Adding Nodes to Linked List",
            difficulty: "Easy",
            description: "Given a linked list, add a new node at the beginning, end, and at a specific position.",
            examples: [{ input: "list = [1,2,3], addAtHead(0), addAtTail(4)", output: "0 -> 1 -> 2 -> 3 -> 4" }],
            constraints: ["0 <= val <= 1000"],
            starterCode: {
              python: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef add_at_head(head, val):\n    # Your code here\n    pass\n\ndef add_at_tail(head, val):\n    # Your code here\n    pass\n\n# Test\nprint('Implement and test')",
              cpp: cpp("struct ListNode {\n    int val; ListNode* next;\n    ListNode(int x):val(x),next(nullptr){}\n};\n\nListNode* addAtHead(ListNode* head, int val) {\n    return nullptr;\n}\n\nint main() { cout << \"Implement\"; }"),
              java: java("    public static void main(String[] args) {\n        System.out.println(\"Implement\");\n    }"),
            },
            xpReward: 10,
          },
          {
            id: "deleting-nodes-ll",
            title: "Deleting Nodes in Linked List",
            difficulty: "Easy",
            description: "Given a linked list, delete a node at a given position (0-indexed).",
            examples: [{ input: "list = [1,2,3,4,5], pos = 2", output: "1 -> 2 -> 4 -> 5" }],
            constraints: ["List is non-empty", "Position is valid"],
            starterCode: {
              python: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef delete_at_position(head, pos):\n    # Your code here\n    pass\n\nprint('Implement and test')",
              cpp: cpp("struct ListNode {\n    int val; ListNode* next;\n    ListNode(int x):val(x),next(nullptr){}\n};\n\nListNode* deleteAtPosition(ListNode* head, int pos) {\n    return nullptr;\n}\n\nint main() { cout << \"Implement\"; }"),
              java: java("    public static void main(String[] args) {\n        System.out.println(\"Implement\");\n    }"),
            },
            xpReward: 10,
          },
        ],
      },
      {
        id: "ll-classic",
        title: "Classic Linked List Problems",
        description: "Essential linked list problems for interviews.",
        problems: [
          {
            id: "middle-linked-list",
            title: "Middle of Linked List",
            difficulty: "Easy",
            description: "Given the head of a singly linked list, return the middle node. If there are two middle nodes, return the second middle node.",
            examples: [{ input: "head = [1,2,3,4,5]", output: "[3,4,5]" }, { input: "head = [1,2,3,4,5,6]", output: "[4,5,6]" }],
            constraints: ["1 <= Number of nodes <= 100"],
            starterCode: {
              python: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef middle_node(head):\n    # Use slow & fast pointers\n    pass\n\n# Build and test\ndef build(arr):\n    if not arr: return None\n    h = ListNode(arr[0])\n    c = h\n    for v in arr[1:]:\n        c.next = ListNode(v)\n        c = c.next\n    return h\n\nprint(middle_node(build([1,2,3,4,5])).val)  # 3",
              cpp: cpp("struct ListNode { int val; ListNode* next; ListNode(int x):val(x),next(nullptr){} };\n\nListNode* middleNode(ListNode* head) {\n    // Your code here\n    return nullptr;\n}\n\nint main() { cout << \"Implement\"; }"),
              java: java("    public static void main(String[] args) { System.out.println(\"Test\"); }"),
            },
            xpReward: 10,
          },
          {
            id: "reverse-linked-list",
            title: "Reverse Linked List",
            difficulty: "Easy",
            description: "Given the head of a singly linked list, reverse the list and return the reversed list.",
            examples: [{ input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" }],
            constraints: ["0 <= Number of nodes <= 5000"],
            starterCode: {
              python: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef reverse_list(head):\n    # Your code here\n    pass\n\ndef build(arr):\n    if not arr: return None\n    h = ListNode(arr[0])\n    c = h\n    for v in arr[1:]: c.next = ListNode(v); c = c.next\n    return h\n\ndef to_list(h):\n    r = []\n    while h: r.append(h.val); h = h.next\n    return r\n\nprint(to_list(reverse_list(build([1,2,3,4,5]))))",
              cpp: cpp("struct ListNode { int val; ListNode* next; ListNode(int x):val(x),next(nullptr){} };\n\nListNode* reverseList(ListNode* head) {\n    return nullptr;\n}\n\nint main() { cout << \"Implement\"; }"),
              java: java("    public static void main(String[] args) { System.out.println(\"Test\"); }"),
            },
            xpReward: 10,
          },
          {
            id: "ll-cycle-hash",
            title: "Linked List Cycle - Hash Table",
            difficulty: "Easy",
            description: "Given head, determine if the linked list has a cycle using a Hash Table (Set) approach.",
            examples: [{ input: "head = [3,2,0,-4], pos = 1", output: "true" }],
            constraints: ["0 <= Number of nodes <= 10^4"],
            starterCode: {
              python: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef has_cycle_hash(head):\n    # Use a set/hash table\n    pass\n\nh = ListNode(3)\nh.next = ListNode(2)\nh.next.next = ListNode(0)\nh.next.next.next = ListNode(-4)\nh.next.next.next.next = h.next  # cycle\nprint(has_cycle_hash(h))  # True",
              cpp: cpp("struct ListNode { int val; ListNode* next; ListNode(int x):val(x),next(nullptr){} };\nbool hasCycleHash(ListNode* head) { return false; }\nint main() { cout << \"Implement\"; }"),
              java: java("    public static void main(String[] args) { System.out.println(\"Test\"); }"),
            },
            xpReward: 10,
          },
          {
            id: "ll-cycle-floyd",
            title: "Linked List Cycle - Floyd's Algorithm",
            difficulty: "Easy",
            description: "Detect if a linked list has a cycle using Floyd's Tortoise and Hare algorithm (O(1) space).",
            examples: [{ input: "head = [3,2,0,-4], pos = 1", output: "true" }],
            constraints: ["0 <= Number of nodes <= 10^4"],
            starterCode: {
              python: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef has_cycle_floyd(head):\n    # Floyd's slow & fast pointer\n    pass\n\nprint('Implement and test')",
              cpp: cpp("struct ListNode { int val; ListNode* next; ListNode(int x):val(x),next(nullptr){} };\nbool hasCycleFloyd(ListNode* head) { return false; }\nint main() { cout << \"Implement\"; }"),
              java: java("    public static void main(String[] args) { System.out.println(\"Test\"); }"),
            },
            xpReward: 10,
          },
          {
            id: "palindrome-ll",
            title: "Palindrome Linked List",
            difficulty: "Easy",
            description: "Given a singly linked list, determine if it is a palindrome.",
            examples: [{ input: "head = [1,2,2,1]", output: "true" }, { input: "head = [1,2]", output: "false" }],
            constraints: ["1 <= Number of nodes <= 10^5"],
            starterCode: {
              python: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef is_palindrome(head):\n    pass\n\nprint('Implement and test')",
              cpp: cpp("struct ListNode { int val; ListNode* next; ListNode(int x):val(x),next(nullptr){} };\nbool isPalindrome(ListNode* head) { return false; }\nint main() { cout << \"Implement\"; }"),
              java: java("    public static void main(String[] args) { System.out.println(\"Test\"); }"),
            },
            xpReward: 10,
          },
          {
            id: "intersection-two-ll",
            title: "Intersection of Two Linked Lists",
            difficulty: "Easy",
            description: "Given the heads of two singly linked-lists, return the node at which the two lists intersect. If they don't intersect, return null.",
            examples: [{ input: "listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3", output: "8" }],
            constraints: ["Lists may not intersect"],
            starterCode: {
              python: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef get_intersection_node(headA, headB):\n    pass\n\nprint('Implement and test')",
              cpp: cpp("struct ListNode { int val; ListNode* next; ListNode(int x):val(x),next(nullptr){} };\nListNode* getIntersectionNode(ListNode* headA, ListNode* headB) { return nullptr; }\nint main() { cout << \"Implement\"; }"),
              java: java("    public static void main(String[] args) { System.out.println(\"Test\"); }"),
            },
            xpReward: 10,
          },
          {
            id: "remove-ll-elements",
            title: "Remove Linked List Elements",
            difficulty: "Easy",
            description: "Remove all elements from a linked list that have a specific value.",
            examples: [{ input: "head = [1,2,6,3,4,5,6], val = 6", output: "[1,2,3,4,5]" }],
            constraints: ["0 <= Number of nodes <= 10^4"],
            starterCode: {
              python: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef remove_elements(head, val):\n    pass\n\nprint('Implement and test')",
              cpp: cpp("struct ListNode { int val; ListNode* next; ListNode(int x):val(x),next(nullptr){} };\nListNode* removeElements(ListNode* head, int val) { return nullptr; }\nint main() { cout << \"Implement\"; }"),
              java: java("    public static void main(String[] args) { System.out.println(\"Test\"); }"),
            },
            xpReward: 10,
          },
          {
            id: "remove-nth-two-pass",
            title: "Remove Nth Node from End - Two Pass",
            difficulty: "Medium",
            description: "Remove the nth node from the end of the list using two-pass approach.",
            examples: [{ input: "head = [1,2,3,4,5], n = 2", output: "[1,2,3,5]" }],
            constraints: ["1 <= sz <= 30", "1 <= n <= sz"],
            starterCode: {
              python: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef remove_nth_from_end(head, n):\n    # Two pass approach\n    pass\n\nprint('Implement and test')",
              cpp: cpp("struct ListNode { int val; ListNode* next; ListNode(int x):val(x),next(nullptr){} };\nListNode* removeNthFromEnd(ListNode* head, int n) { return nullptr; }\nint main() { cout << \"Implement\"; }"),
              java: java("    public static void main(String[] args) { System.out.println(\"Test\"); }"),
            },
            xpReward: 15,
          },
          {
            id: "remove-nth-one-pass",
            title: "Remove Nth Node from End - One Pass",
            difficulty: "Medium",
            description: "Remove the nth node from the end of the list using only one pass (two pointers).",
            examples: [{ input: "head = [1,2,3,4,5], n = 2", output: "[1,2,3,5]" }],
            constraints: ["1 <= sz <= 30", "1 <= n <= sz"],
            starterCode: {
              python: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef remove_nth_from_end_one_pass(head, n):\n    # One pass with two pointers\n    pass\n\nprint('Implement and test')",
              cpp: cpp("struct ListNode { int val; ListNode* next; ListNode(int x):val(x),next(nullptr){} };\nListNode* removeNthFromEndOnePass(ListNode* head, int n) { return nullptr; }\nint main() { cout << \"Implement\"; }"),
              java: java("    public static void main(String[] args) { System.out.println(\"Test\"); }"),
            },
            xpReward: 15,
          },
          {
            id: "remove-dups-sorted-ll",
            title: "Remove Duplicates from Sorted List",
            difficulty: "Easy",
            description: "Given a sorted linked list, delete all duplicates such that each element appears only once.",
            examples: [{ input: "head = [1,1,2,3,3]", output: "[1,2,3]" }],
            constraints: ["0 <= Number of nodes <= 300"],
            starterCode: {
              python: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef delete_duplicates(head):\n    pass\n\nprint('Implement and test')",
              cpp: cpp("struct ListNode { int val; ListNode* next; ListNode(int x):val(x),next(nullptr){} };\nListNode* deleteDuplicates(ListNode* head) { return nullptr; }\nint main() { cout << \"Implement\"; }"),
              java: java("    public static void main(String[] args) { System.out.println(\"Test\"); }"),
            },
            xpReward: 10,
          },
          {
            id: "odd-even-ll",
            title: "Odd Even Linked List",
            difficulty: "Medium",
            description: "Group all odd-indexed nodes together followed by even-indexed nodes. The first node is odd, the second is even, and so on.",
            examples: [{ input: "head = [1,2,3,4,5]", output: "[1,3,5,2,4]" }],
            constraints: ["0 <= Number of nodes <= 10^4"],
            starterCode: {
              python: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef odd_even_list(head):\n    pass\n\nprint('Implement and test')",
              cpp: cpp("struct ListNode { int val; ListNode* next; ListNode(int x):val(x),next(nullptr){} };\nListNode* oddEvenList(ListNode* head) { return nullptr; }\nint main() { cout << \"Implement\"; }"),
              java: java("    public static void main(String[] args) { System.out.println(\"Test\"); }"),
            },
            xpReward: 15,
          },
          {
            id: "add-two-numbers-ll",
            title: "Add Two Numbers",
            difficulty: "Medium",
            description: "Given two non-empty linked lists representing two non-negative integers stored in reverse order. Add the two numbers and return the sum as a linked list.",
            examples: [{ input: "l1 = [2,4,3], l2 = [5,6,4]", output: "[7,0,8]", explanation: "342 + 465 = 807" }],
            constraints: ["Each list 1-100 nodes", "0 <= Node.val <= 9"],
            starterCode: {
              python: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef add_two_numbers(l1, l2):\n    pass\n\nprint('Implement and test')",
              cpp: cpp("struct ListNode { int val; ListNode* next; ListNode(int x):val(x),next(nullptr){} };\nListNode* addTwoNumbers(ListNode* l1, ListNode* l2) { return nullptr; }\nint main() { cout << \"Implement\"; }"),
              java: java("    public static void main(String[] args) { System.out.println(\"Test\"); }"),
            },
            xpReward: 20,
          },
          {
            id: "merge-two-sorted-ll",
            title: "Merge Two Sorted Lists",
            difficulty: "Easy",
            description: "Merge two sorted linked lists into one sorted list by splicing together nodes.",
            examples: [{ input: "l1 = [1,2,4], l2 = [1,3,4]", output: "[1,1,2,3,4,4]" }],
            constraints: ["0 <= Number of nodes <= 50"],
            starterCode: {
              python: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef merge_two_lists(l1, l2):\n    pass\n\nprint('Implement and test')",
              cpp: cpp("struct ListNode { int val; ListNode* next; ListNode(int x):val(x),next(nullptr){} };\nListNode* mergeTwoLists(ListNode* l1, ListNode* l2) { return nullptr; }\nint main() { cout << \"Implement\"; }"),
              java: java("    public static void main(String[] args) { System.out.println(\"Test\"); }"),
            },
            xpReward: 10,
          },
          {
            id: "rotate-list-ll",
            title: "Rotate List",
            difficulty: "Medium",
            description: "Given the head of a linked list, rotate the list to the right by k places.",
            examples: [{ input: "head = [1,2,3,4,5], k = 2", output: "[4,5,1,2,3]" }],
            constraints: ["0 <= Number of nodes <= 500", "0 <= k <= 2 * 10^9"],
            starterCode: {
              python: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef rotate_right(head, k):\n    pass\n\nprint('Implement and test')",
              cpp: cpp("struct ListNode { int val; ListNode* next; ListNode(int x):val(x),next(nullptr){} };\nListNode* rotateRight(ListNode* head, int k) { return nullptr; }\nint main() { cout << \"Implement\"; }"),
              java: java("    public static void main(String[] args) { System.out.println(\"Test\"); }"),
            },
            xpReward: 15,
          },
          {
            id: "swap-nodes-iterative",
            title: "Swap Nodes in Pairs - Iterative",
            difficulty: "Medium",
            description: "Given a linked list, swap every two adjacent nodes and return its head using iterative approach.",
            examples: [{ input: "head = [1,2,3,4]", output: "[2,1,4,3]" }],
            constraints: ["0 <= Number of nodes <= 100"],
            starterCode: {
              python: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef swap_pairs_iterative(head):\n    # Iterative approach\n    pass\n\nprint('Implement and test')",
              cpp: cpp("struct ListNode { int val; ListNode* next; ListNode(int x):val(x),next(nullptr){} };\nListNode* swapPairsIterative(ListNode* head) { return nullptr; }\nint main() { cout << \"Implement\"; }"),
              java: java("    public static void main(String[] args) { System.out.println(\"Test\"); }"),
            },
            xpReward: 15,
          },
          {
            id: "swap-nodes-recursive",
            title: "Swap Nodes in Pairs - Recursive",
            difficulty: "Medium",
            description: "Given a linked list, swap every two adjacent nodes using recursive approach.",
            examples: [{ input: "head = [1,2,3,4]", output: "[2,1,4,3]" }],
            constraints: ["0 <= Number of nodes <= 100"],
            starterCode: {
              python: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef swap_pairs_recursive(head):\n    # Recursive approach\n    pass\n\nprint('Implement and test')",
              cpp: cpp("struct ListNode { int val; ListNode* next; ListNode(int x):val(x),next(nullptr){} };\nListNode* swapPairsRecursive(ListNode* head) { return nullptr; }\nint main() { cout << \"Implement\"; }"),
              java: java("    public static void main(String[] args) { System.out.println(\"Test\"); }"),
            },
            xpReward: 15,
          },
        ],
      },
    ],
  },

  // ============================================================
  // 8. STRINGS
  // ============================================================
  {
    id: "strings",
    title: "Strings",
    icon: "📝",
    description: "String manipulation, pattern matching, palindromes, anagrams, and character-based problems.",
    subtopics: [
      {
        id: "string-problems",
        title: "String Problems",
        description: "Core string manipulation problems.",
        problems: [
          { id: "length-last-word", title: "Length of Last Word", difficulty: "Easy", description: "Given a string s of words and spaces, return the length of the last word.", examples: [{ input: 's = "Hello World"', output: "5" }], constraints: ["1 <= s.length <= 10^4"], starterCode: { python: "def length_of_last_word(s):\n    pass\n\nprint(length_of_last_word('Hello World'))  # 5", cpp: cpp("int lengthOfLastWord(string s) { return 0; }\nint main() { cout << lengthOfLastWord(\"Hello World\"); }"), java: java("    public static int lengthOfLastWord(String s) { return 0; }\n    public static void main(String[] args) { System.out.println(lengthOfLastWord(\"Hello World\")); }") }, xpReward: 5 },
          { id: "find-words-containing", title: "Find Words Containing Character", difficulty: "Easy", description: "Given an array of strings words and a character x, return indices of words that contain x.", examples: [{ input: 'words = ["leet","code"], x = "e"', output: "[0,1]" }], constraints: ["1 <= words.length <= 50"], starterCode: { python: "def find_words_containing(words, x):\n    pass\n\nprint(find_words_containing(['leet','code'], 'e'))", cpp: cpp("vector<int> findWordsContaining(vector<string>& words, char x) { return {}; }\nint main() { cout << \"Implement\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Test\"); }") }, xpReward: 5 },
          { id: "jewels-stones", title: "Jewels and Stones", difficulty: "Easy", description: "You're given strings jewels and stones. Each character in stones is a type of stone you have. Count how many of your stones are also jewels.", examples: [{ input: 'jewels = "aA", stones = "aAAbbbb"', output: "3" }], constraints: ["1 <= jewels.length, stones.length <= 50"], starterCode: { python: "def num_jewels_in_stones(jewels, stones):\n    pass\n\nprint(num_jewels_in_stones('aA', 'aAAbbbb'))  # 3", cpp: cpp("int numJewelsInStones(string j, string s) { return 0; }\nint main() { cout << numJewelsInStones(\"aA\", \"aAAbbbb\"); }"), java: java("    public static int numJewelsInStones(String j, String s) { return 0; }\n    public static void main(String[] args) { System.out.println(numJewelsInStones(\"aA\", \"aAAbbbb\")); }") }, xpReward: 5 },
          { id: "most-frequent-vowel-consonant", title: "Find Most Frequent Vowel and Consonant", difficulty: "Easy", description: "Given a string, find the most frequent vowel and the most frequent consonant. Return them as a pair.", examples: [{ input: 's = "programming"', output: "Most vowel: a, Most consonant: g" }], constraints: ["1 <= s.length <= 10^4", "lowercase English letters only"], starterCode: { python: "def most_frequent_vc(s):\n    pass\n\nprint(most_frequent_vc('programming'))", cpp: cpp("void mostFrequentVC(string s) {}\nint main() { mostFrequentVC(\"programming\"); }"), java: java("    public static void main(String[] args) { System.out.println(\"Implement\"); }") }, xpReward: 10 },
          { id: "split-balanced-strings", title: "Split a String in Balanced Strings", difficulty: "Easy", description: "Balanced strings have equal quantity of 'L' and 'R' characters. Return the maximum number of balanced strings you can split the string into.", examples: [{ input: 's = "RLRRLLRLRL"', output: "4" }], constraints: ["2 <= s.length <= 1000"], starterCode: { python: "def balanced_strings(s):\n    pass\n\nprint(balanced_strings('RLRRLLRLRL'))  # 4", cpp: cpp("int balancedStrings(string s) { return 0; }\nint main() { cout << balancedStrings(\"RLRRLLRLRL\"); }"), java: java("    public static int balancedStrings(String s) { return 0; }\n    public static void main(String[] args) { System.out.println(balancedStrings(\"RLRRLLRLRL\")); }") }, xpReward: 5 },
          { id: "reverse-string-ii", title: "Reverse String II", difficulty: "Easy", description: "Given a string s and an integer k, reverse the first k characters for every 2k characters.", examples: [{ input: 's = "abcdefg", k = 2', output: '"bacdfeg"' }], constraints: ["1 <= s.length <= 10^4", "1 <= k <= 10^4"], starterCode: { python: "def reverse_str(s, k):\n    pass\n\nprint(reverse_str('abcdefg', 2))", cpp: cpp("string reverseStr(string s, int k) { return \"\"; }\nint main() { cout << reverseStr(\"abcdefg\", 2); }"), java: java("    public static String reverseStr(String s, int k) { return \"\"; }\n    public static void main(String[] args) { System.out.println(reverseStr(\"abcdefg\", 2)); }") }, xpReward: 10 },
          { id: "valid-palindrome-str", title: "Valid Palindrome", difficulty: "Easy", description: "Given a string s, return true if it's a palindrome considering only alphanumeric characters and ignoring case.", examples: [{ input: 's = "A man, a plan, a canal: Panama"', output: "true" }], constraints: ["1 <= s.length <= 2 * 10^5"], starterCode: { python: "def is_palindrome(s):\n    pass\n\nprint(is_palindrome('A man, a plan, a canal: Panama'))  # True", cpp: cpp("bool isPalindrome(string s) { return false; }\nint main() { cout << (isPalindrome(\"A man, a plan, a canal: Panama\") ? \"true\" : \"false\"); }"), java: java("    public static boolean isPalindrome(String s) { return false; }\n    public static void main(String[] args) { System.out.println(isPalindrome(\"A man, a plan, a canal: Panama\")); }") }, xpReward: 10 },
          { id: "largest-odd-number", title: "Largest Odd Number in a String", difficulty: "Easy", description: "Given a string num representing a large integer, return the largest-valued odd integer that is a non-empty substring.", examples: [{ input: 'num = "52"', output: '"5"' }], constraints: ["1 <= num.length <= 10^5"], starterCode: { python: "def largest_odd_number(num):\n    pass\n\nprint(largest_odd_number('52'))  # 5", cpp: cpp("string largestOddNumber(string num) { return \"\"; }\nint main() { cout << largestOddNumber(\"52\"); }"), java: java("    public static String largestOddNumber(String num) { return \"\"; }\n    public static void main(String[] args) { System.out.println(largestOddNumber(\"52\")); }") }, xpReward: 5 },
          { id: "longest-common-prefix", title: "Longest Common Prefix", difficulty: "Easy", description: "Find the longest common prefix string amongst an array of strings.", examples: [{ input: 'strs = ["flower","flow","flight"]', output: '"fl"' }], constraints: ["1 <= strs.length <= 200"], starterCode: { python: "def longest_common_prefix(strs):\n    pass\n\nprint(longest_common_prefix(['flower','flow','flight']))  # fl", cpp: cpp("string longestCommonPrefix(vector<string>& strs) { return \"\"; }\nint main() { vector<string> s = {\"flower\",\"flow\",\"flight\"}; cout << longestCommonPrefix(s); }"), java: java("    public static String longestCommonPrefix(String[] strs) { return \"\"; }\n    public static void main(String[] args) { System.out.println(longestCommonPrefix(new String[]{\"flower\",\"flow\",\"flight\"})); }") }, xpReward: 10 },
          { id: "valid-anagram-str", title: "Valid Anagram", difficulty: "Easy", description: "Given two strings s and t, return true if t is an anagram of s.", examples: [{ input: 's = "anagram", t = "nagaram"', output: "true" }], constraints: ["1 <= s.length, t.length <= 5 * 10^4"], starterCode: { python: "def is_anagram(s, t):\n    pass\n\nprint(is_anagram('anagram', 'nagaram'))  # True", cpp: cpp("bool isAnagram(string s, string t) { return false; }\nint main() { cout << (isAnagram(\"anagram\", \"nagaram\") ? \"true\" : \"false\"); }"), java: java("    public static boolean isAnagram(String s, String t) { return false; }\n    public static void main(String[] args) { System.out.println(isAnagram(\"anagram\", \"nagaram\")); }") }, xpReward: 10 },
          { id: "isomorphic-strings", title: "Isomorphic Strings", difficulty: "Easy", description: "Given two strings s and t, determine if they are isomorphic. Two strings are isomorphic if the characters in s can be replaced to get t.", examples: [{ input: 's = "egg", t = "add"', output: "true" }], constraints: ["1 <= s.length <= 5 * 10^4", "s.length == t.length"], starterCode: { python: "def is_isomorphic(s, t):\n    pass\n\nprint(is_isomorphic('egg', 'add'))  # True", cpp: cpp("bool isIsomorphic(string s, string t) { return false; }\nint main() { cout << (isIsomorphic(\"egg\", \"add\") ? \"true\" : \"false\"); }"), java: java("    public static boolean isIsomorphic(String s, String t) { return false; }\n    public static void main(String[] args) { System.out.println(isIsomorphic(\"egg\", \"add\")); }") }, xpReward: 10 },
          { id: "group-anagrams-str", title: "Group Anagrams", difficulty: "Medium", description: "Given an array of strings, group the anagrams together.", examples: [{ input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' }], constraints: ["1 <= strs.length <= 10^4"], starterCode: { python: "def group_anagrams(strs):\n    pass\n\nprint(group_anagrams(['eat','tea','tan','ate','nat','bat']))", cpp: cpp("vector<vector<string>> groupAnagrams(vector<string>& strs) { return {}; }\nint main() { cout << \"Implement\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Test\"); }") }, xpReward: 20 },
        ],
      },
    ],
  },

  // ============================================================
  // 9. STACKS AND QUEUES
  // ============================================================
  {
    id: "stacks-queues",
    title: "Stacks and Queues",
    icon: "📚",
    description: "LIFO and FIFO data structures — implementation, monotonic stacks, expression evaluation, and BFS.",
    subtopics: [
      {
        id: "stack-queue-basics",
        title: "Stacks & Queues Basics",
        description: "Introduction and implementation of stacks and queues.",
        problems: [
          { id: "intro-stacks-queues", title: "Introduction to Stacks & Queues", difficulty: "Easy", description: "Implement a basic Stack and Queue from scratch with push/pop/peek operations.", examples: [{ input: "push(1), push(2), pop()", output: "Stack: 2, Queue: 1" }], constraints: ["At most 1000 operations"], starterCode: { python: "class Stack:\n    def __init__(self):\n        self.items = []\n    def push(self, val): pass\n    def pop(self): pass\n    def peek(self): pass\n    def is_empty(self): pass\n\nclass Queue:\n    def __init__(self):\n        self.items = []\n    def enqueue(self, val): pass\n    def dequeue(self): pass\n    def peek(self): pass\n    def is_empty(self): pass\n\n# Test\ns = Stack()\ns.push(1); s.push(2)\nprint(s.pop())  # 2", cpp: cpp("// Implement Stack and Queue\nint main() { cout << \"Implement\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Implement\"); }") }, xpReward: 10 },
          { id: "playing-stacks-queues", title: "Playing with Stacks & Queues", difficulty: "Easy", description: "Perform a series of operations on a stack and queue: push, pop, peek, and display the state after each operation.", examples: [{ input: "push(5), push(10), pop(), push(15)", output: "Stack: [5, 15]" }], constraints: ["Valid operations only"], starterCode: { python: "# Use the Stack and Queue from previous problem\n# Perform operations and print state\nprint('Implement and test')", cpp: cpp("int main() { cout << \"Implement\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Implement\"); }") }, xpReward: 5 },
        ],
      },
      {
        id: "stack-problems",
        title: "Stack & Queue Problems",
        description: "Classic stack and queue-based problems.",
        problems: [
          { id: "implement-stack", title: "Implement Stack", difficulty: "Easy", description: "Implement a stack using an array/list with push, pop, top, and isEmpty operations.", examples: [{ input: "push(1), push(2), top(), pop(), isEmpty()", output: "2, 2, false" }], constraints: ["At most 100 calls"], starterCode: { python: "class MyStack:\n    def __init__(self):\n        self.data = []\n    def push(self, x): pass\n    def pop(self): pass\n    def top(self): pass\n    def isEmpty(self): pass\n\ns = MyStack()\ns.push(1); s.push(2)\nprint(s.top())  # 2\nprint(s.pop())  # 2", cpp: cpp("class MyStack {\npublic:\n    void push(int x) {}\n    int pop() { return 0; }\n    int top() { return 0; }\n    bool isEmpty() { return true; }\n};\nint main() { cout << \"Implement\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Implement\"); }") }, xpReward: 10 },
          { id: "implement-queue-stacks", title: "Implement Queue using Stacks", difficulty: "Easy", description: "Implement a FIFO queue using only two stacks.", examples: [{ input: "push(1), push(2), peek(), pop(), empty()", output: "1, 1, false" }], constraints: ["1 <= x <= 9", "At most 100 calls"], starterCode: { python: "class MyQueue:\n    def __init__(self):\n        self.s1 = []\n        self.s2 = []\n    def push(self, x): pass\n    def pop(self): pass\n    def peek(self): pass\n    def empty(self): pass\n\nq = MyQueue()\nq.push(1); q.push(2)\nprint(q.peek())  # 1\nprint(q.pop())   # 1", cpp: cpp("class MyQueue {\npublic:\n    void push(int x) {}\n    int pop() { return 0; }\n    int peek() { return 0; }\n    bool empty() { return true; }\n};\nint main() { cout << \"Implement\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Implement\"); }") }, xpReward: 10 },
          { id: "valid-parentheses", title: "Valid Parentheses", difficulty: "Easy", description: "Given a string containing just '(', ')', '{', '}', '[' and ']', determine if the input string is valid.", examples: [{ input: 's = "()"', output: "true" }, { input: 's = "([)]"', output: "false" }], constraints: ["1 <= s.length <= 10^4"], starterCode: { python: "def is_valid(s):\n    pass\n\nprint(is_valid('()'))    # True\nprint(is_valid('{[]}'))  # True\nprint(is_valid('([)]'))  # False", cpp: cpp("bool isValid(string s) { return false; }\nint main() { cout << (isValid(\"()\") ? \"true\" : \"false\"); }"), java: java("    public static boolean isValid(String s) { return false; }\n    public static void main(String[] args) { System.out.println(isValid(\"()\")); }") }, xpReward: 10 },
          { id: "min-stack", title: "Min Stack", difficulty: "Medium", description: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.", examples: [{ input: "push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()", output: "-3, 0, -2" }], constraints: ["Methods called on non-empty stacks"], starterCode: { python: "class MinStack:\n    def __init__(self): pass\n    def push(self, val): pass\n    def pop(self): pass\n    def top(self): pass\n    def getMin(self): pass\n\ns = MinStack()\ns.push(-2); s.push(0); s.push(-3)\nprint(s.getMin())  # -3\ns.pop()\nprint(s.top())     # 0\nprint(s.getMin())  # -2", cpp: cpp("class MinStack {\npublic:\n    void push(int val) {}\n    void pop() {}\n    int top() { return 0; }\n    int getMin() { return 0; }\n};\nint main() { cout << \"Implement\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Implement\"); }") }, xpReward: 20 },
          { id: "remove-outermost-parens", title: "Remove Outermost Parentheses", difficulty: "Easy", description: "Remove the outermost parentheses of every primitive string in the primitive decomposition of s.", examples: [{ input: 's = "(()())(())"', output: '"()()()"' }], constraints: ["1 <= s.length <= 10^5"], starterCode: { python: "def remove_outer_parentheses(s):\n    pass\n\nprint(remove_outer_parentheses('(()())(())'))  # ()()()", cpp: cpp("string removeOuterParentheses(string s) { return \"\"; }\nint main() { cout << removeOuterParentheses(\"(()())(())\"); }"), java: java("    public static String removeOuterParentheses(String s) { return \"\"; }\n    public static void main(String[] args) { System.out.println(removeOuterParentheses(\"(()())(())\")); }") }, xpReward: 10 },
          { id: "eval-reverse-polish", title: "Evaluate Reverse Polish Notation", difficulty: "Medium", description: "Evaluate an arithmetic expression in Reverse Polish Notation. Valid operators are +, -, *, /.", examples: [{ input: 'tokens = ["2","1","+","3","*"]', output: "9", explanation: "((2+1)*3) = 9" }], constraints: ["1 <= tokens.length <= 10^4"], starterCode: { python: "def eval_rpn(tokens):\n    pass\n\nprint(eval_rpn(['2','1','+','3','*']))  # 9", cpp: cpp("int evalRPN(vector<string>& tokens) { return 0; }\nint main() { vector<string> t = {\"2\",\"1\",\"+\",\"3\",\"*\"}; cout << evalRPN(t); }"), java: java("    public static int evalRPN(String[] tokens) { return 0; }\n    public static void main(String[] args) { System.out.println(evalRPN(new String[]{\"2\",\"1\",\"+\",\"3\",\"*\"})); }") }, xpReward: 20 },
          { id: "next-greater-element", title: "Next Greater Element", difficulty: "Easy", description: "Find the next greater element for each element in nums1 using nums2.", examples: [{ input: "nums1 = [4,1,2], nums2 = [1,3,4,2]", output: "[-1,3,-1]" }], constraints: ["All integers are unique"], starterCode: { python: "def next_greater_element(nums1, nums2):\n    pass\n\nprint(next_greater_element([4,1,2], [1,3,4,2]))", cpp: cpp("vector<int> nextGreaterElement(vector<int>& n1, vector<int>& n2) { return {}; }\nint main() { cout << \"Implement\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Implement\"); }") }, xpReward: 10 },
          { id: "daily-temperatures", title: "Daily Temperatures", difficulty: "Medium", description: "Given temperatures array, return how many days you have to wait for a warmer temperature.", examples: [{ input: "temperatures = [73,74,75,71,69,72,76,73]", output: "[1,1,4,2,1,1,0,0]" }], constraints: ["1 <= temperatures.length <= 10^5"], starterCode: { python: "def daily_temperatures(temps):\n    pass\n\nprint(daily_temperatures([73,74,75,71,69,72,76,73]))", cpp: cpp("vector<int> dailyTemperatures(vector<int>& t) { return {}; }\nint main() { vector<int> t={73,74,75,71,69,72,76,73}; auto r=dailyTemperatures(t); for(auto x:r)cout<<x<<\" \"; }"), java: java("    public static int[] dailyTemperatures(int[] t) { return new int[]{}; }\n    public static void main(String[] args) { System.out.println(Arrays.toString(dailyTemperatures(new int[]{73,74,75,71,69,72,76,73}))); }") }, xpReward: 20 },
          { id: "next-greater-element-ii", title: "Next Greater Element - II", difficulty: "Medium", description: "Given a circular integer array nums, return the next greater number for every element. The search wraps around.", examples: [{ input: "nums = [1,2,1]", output: "[2,-1,2]" }], constraints: ["1 <= nums.length <= 10^4"], starterCode: { python: "def next_greater_elements_ii(nums):\n    pass\n\nprint(next_greater_elements_ii([1,2,1]))  # [2,-1,2]", cpp: cpp("vector<int> nextGreaterElements(vector<int>& nums) { return {}; }\nint main() { vector<int> n={1,2,1}; auto r=nextGreaterElements(n); for(auto x:r)cout<<x<<\" \"; }"), java: java("    public static int[] nextGreaterElements(int[] nums) { return new int[]{}; }\n    public static void main(String[] args) { System.out.println(Arrays.toString(nextGreaterElements(new int[]{1,2,1}))); }") }, xpReward: 20 },
          { id: "rotting-oranges", title: "Rotting Oranges", difficulty: "Medium", description: "In a grid, 0=empty, 1=fresh orange, 2=rotten. Every minute, fresh oranges adjacent to rotten ones become rotten. Return minimum minutes until no fresh orange remains, or -1.", examples: [{ input: "grid = [[2,1,1],[1,1,0],[0,1,1]]", output: "4" }], constraints: ["1 <= m, n <= 10"], starterCode: { python: "def oranges_rotting(grid):\n    pass\n\nprint(oranges_rotting([[2,1,1],[1,1,0],[0,1,1]]))  # 4", cpp: cpp("int orangesRotting(vector<vector<int>>& grid) { return -1; }\nint main() { cout << \"Implement\"; }"), java: java("    public static int orangesRotting(int[][] grid) { return -1; }\n    public static void main(String[] args) { System.out.println(orangesRotting(new int[][]{{2,1,1},{1,1,0},{0,1,1}})); }") }, xpReward: 20 },
        ],
      },
    ],
  },

  // ============================================================
  // 10. BINARY SEARCH ALGORITHM
  // ============================================================
  {
    id: "binary-search-algo",
    title: "Binary Search Algorithm",
    icon: "🎯",
    description: "Master binary search patterns — classic, rotated arrays, peak finding, and advanced variations.",
    subtopics: [
      {
        id: "binary-search-problems",
        title: "Binary Search Problems",
        description: "Binary search variations and applications.",
        problems: [
          { id: "sqrt-x", title: "Square Root of X", difficulty: "Easy", description: "Compute floor(sqrt(x)) without using built-in sqrt.", examples: [{ input: "x = 8", output: "2", explanation: "sqrt(8) = 2.82, floor = 2" }], constraints: ["0 <= x <= 2^31 - 1"], starterCode: { python: "def my_sqrt(x):\n    pass\n\nprint(my_sqrt(8))  # 2\nprint(my_sqrt(4))  # 2", cpp: cpp("int mySqrt(int x) { return 0; }\nint main() { cout << mySqrt(8); }"), java: java("    public static int mySqrt(int x) { return 0; }\n    public static void main(String[] args) { System.out.println(mySqrt(8)); }") }, xpReward: 10 },
          { id: "finding-middle", title: "Best Practice - Finding Middle Element", difficulty: "Easy", description: "Implement finding the middle element in binary search correctly to avoid integer overflow: mid = left + (right - left) / 2.", examples: [{ input: "left = 0, right = 10", output: "5" }], constraints: ["0 <= left <= right <= 2^31 - 1"], starterCode: { python: "def find_middle(left, right):\n    # Avoid overflow\n    pass\n\nprint(find_middle(0, 10))  # 5", cpp: cpp("int findMiddle(int left, int right) {\n    return left + (right - left) / 2;\n}\nint main() { cout << findMiddle(0, 10); }"), java: java("    public static int findMiddle(int left, int right) {\n        return left + (right - left) / 2;\n    }\n    public static void main(String[] args) { System.out.println(findMiddle(0, 10)); }") }, xpReward: 5 },
          { id: "guess-higher-lower", title: "Guess Higher or Lower", difficulty: "Easy", description: "We are playing the Guess Game. I pick a number from 1 to n. You call guess(num): -1 = too high, 1 = too low, 0 = correct.", examples: [{ input: "n = 10, pick = 6", output: "6" }], constraints: ["1 <= n <= 2^31 - 1"], starterCode: { python: "# The guess API is defined for you\npick = 6\ndef guess(num):\n    if num > pick: return -1\n    elif num < pick: return 1\n    return 0\n\ndef guess_number(n):\n    pass\n\nprint(guess_number(10))  # 6", cpp: cpp("int pick = 6;\nint guess(int num) { return num > pick ? -1 : num < pick ? 1 : 0; }\nint guessNumber(int n) { return 0; }\nint main() { cout << guessNumber(10); }"), java: java("    static int pick = 6;\n    static int guess(int num) { return num > pick ? -1 : num < pick ? 1 : 0; }\n    public static int guessNumber(int n) { return 0; }\n    public static void main(String[] args) { System.out.println(guessNumber(10)); }") }, xpReward: 10 },
          { id: "search-rotated-sorted", title: "Search in Rotated Sorted Array", difficulty: "Medium", description: "Given a rotated sorted array and a target, return the index or -1. O(log n) time.", examples: [{ input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" }], constraints: ["1 <= nums.length <= 5000", "All values unique"], starterCode: { python: "def search(nums, target):\n    pass\n\nprint(search([4,5,6,7,0,1,2], 0))  # 4", cpp: cpp("int search(vector<int>& nums, int target) { return -1; }\nint main() { vector<int> n={4,5,6,7,0,1,2}; cout << search(n,0); }"), java: java("    public static int search(int[] nums, int target) { return -1; }\n    public static void main(String[] args) { System.out.println(search(new int[]{4,5,6,7,0,1,2}, 0)); }") }, xpReward: 25 },
          { id: "first-bad-version", title: "First Bad Version", difficulty: "Easy", description: "You have n versions [1, 2, ..., n] and want to find the first bad one using isBadVersion API.", examples: [{ input: "n = 5, bad = 4", output: "4" }], constraints: ["1 <= bad <= n <= 2^31 - 1"], starterCode: { python: "bad = 4\ndef isBadVersion(v): return v >= bad\n\ndef first_bad_version(n):\n    pass\n\nprint(first_bad_version(5))  # 4", cpp: cpp("bool isBadVersion(int v) { return v >= 4; }\nint firstBadVersion(int n) { return 0; }\nint main() { cout << firstBadVersion(5); }"), java: java("    static boolean isBadVersion(int v) { return v >= 4; }\n    public static int firstBadVersion(int n) { return 0; }\n    public static void main(String[] args) { System.out.println(firstBadVersion(5)); }") }, xpReward: 10 },
          { id: "find-peak-element", title: "Find Peak Element", difficulty: "Medium", description: "Find a peak element (strictly greater than neighbors). Return its index. O(log n).", examples: [{ input: "nums = [1,2,3,1]", output: "2" }], constraints: ["1 <= nums.length <= 1000"], starterCode: { python: "def find_peak_element(nums):\n    pass\n\nprint(find_peak_element([1,2,3,1]))  # 2", cpp: cpp("int findPeakElement(vector<int>& nums) { return 0; }\nint main() { vector<int> n={1,2,3,1}; cout << findPeakElement(n); }"), java: java("    public static int findPeakElement(int[] nums) { return 0; }\n    public static void main(String[] args) { System.out.println(findPeakElement(new int[]{1,2,3,1})); }") }, xpReward: 20 },
          { id: "find-min-rotated", title: "Find Minimum in Rotated Sorted Array", difficulty: "Medium", description: "Find the minimum element in a sorted rotated array. O(log n).", examples: [{ input: "nums = [3,4,5,1,2]", output: "1" }], constraints: ["1 <= nums.length <= 5000", "All unique"], starterCode: { python: "def find_min(nums):\n    pass\n\nprint(find_min([3,4,5,1,2]))  # 1", cpp: cpp("int findMin(vector<int>& nums) { return 0; }\nint main() { vector<int> n={3,4,5,1,2}; cout << findMin(n); }"), java: java("    public static int findMin(int[] nums) { return 0; }\n    public static void main(String[] args) { System.out.println(findMin(new int[]{3,4,5,1,2})); }") }, xpReward: 20 },
          { id: "first-last-position", title: "Find First & Last Position in Sorted Array", difficulty: "Medium", description: "Find the starting and ending position of a given target in a sorted array. O(log n).", examples: [{ input: "nums = [5,7,7,8,8,10], target = 8", output: "[3,4]" }], constraints: ["0 <= nums.length <= 10^5"], starterCode: { python: "def search_range(nums, target):\n    pass\n\nprint(search_range([5,7,7,8,8,10], 8))  # [3,4]", cpp: cpp("vector<int> searchRange(vector<int>& nums, int target) { return {-1,-1}; }\nint main() { vector<int> n={5,7,7,8,8,10}; auto r=searchRange(n,8); cout<<r[0]<<\",\"<<r[1]; }"), java: java("    public static int[] searchRange(int[] nums, int target) { return new int[]{-1,-1}; }\n    public static void main(String[] args) { System.out.println(Arrays.toString(searchRange(new int[]{5,7,7,8,8,10}, 8))); }") }, xpReward: 20 },
          { id: "peak-mountain-array", title: "Find Peak in a Mountain Array", difficulty: "Medium", description: "Given a mountain array, find the peak index.", examples: [{ input: "arr = [0,2,1,0]", output: "1" }], constraints: ["3 <= arr.length <= 10^5"], starterCode: { python: "def peak_index_mountain(arr):\n    pass\n\nprint(peak_index_mountain([0,2,1,0]))  # 1", cpp: cpp("int peakIndexInMountainArray(vector<int>& arr) { return 0; }\nint main() { vector<int> a={0,2,1,0}; cout << peakIndexInMountainArray(a); }"), java: java("    public static int peakIndexInMountainArray(int[] arr) { return 0; }\n    public static void main(String[] args) { System.out.println(peakIndexInMountainArray(new int[]{0,2,1,0})); }") }, xpReward: 15 },
          { id: "single-element-sorted", title: "Single Element in a Sorted Array", difficulty: "Medium", description: "Given a sorted array where every element appears exactly twice except for one, find that single one. O(log n).", examples: [{ input: "nums = [1,1,2,3,3,4,4,8,8]", output: "2" }], constraints: ["1 <= nums.length <= 10^5"], starterCode: { python: "def single_non_duplicate(nums):\n    pass\n\nprint(single_non_duplicate([1,1,2,3,3,4,4,8,8]))  # 2", cpp: cpp("int singleNonDuplicate(vector<int>& nums) { return 0; }\nint main() { vector<int> n={1,1,2,3,3,4,4,8,8}; cout << singleNonDuplicate(n); }"), java: java("    public static int singleNonDuplicate(int[] nums) { return 0; }\n    public static void main(String[] args) { System.out.println(singleNonDuplicate(new int[]{1,1,2,3,3,4,4,8,8})); }") }, xpReward: 20 },
          { id: "k-closest-elements", title: "Find K Closest Elements", difficulty: "Medium", description: "Given a sorted array, find the k closest elements to target x. Return in ascending order.", examples: [{ input: "arr = [1,2,3,4,5], k = 4, x = 3", output: "[1,2,3,4]" }], constraints: ["1 <= k <= arr.length"], starterCode: { python: "def find_closest_elements(arr, k, x):\n    pass\n\nprint(find_closest_elements([1,2,3,4,5], 4, 3))  # [1,2,3,4]", cpp: cpp("vector<int> findClosestElements(vector<int>& arr, int k, int x) { return {}; }\nint main() { vector<int> a={1,2,3,4,5}; auto r=findClosestElements(a,4,3); for(auto v:r)cout<<v<<\" \"; }"), java: java("    public static List<Integer> findClosestElements(int[] arr, int k, int x) { return new ArrayList<>(); }\n    public static void main(String[] args) { System.out.println(findClosestElements(new int[]{1,2,3,4,5}, 4, 3)); }") }, xpReward: 20 },
        ],
      },
    ],
  },

  // ============================================================
  // 11. TWO POINTERS & SLIDING WINDOW
  // ============================================================
  {
    id: "two-pointers-sliding-window",
    title: "Two Pointers & Sliding Window",
    icon: "👆",
    description: "Efficient techniques using two pointers and sliding window for optimal solutions.",
    subtopics: [
      {
        id: "tp-sw-problems",
        title: "Two Pointers & Sliding Window Problems",
        description: "Classic problems using two pointer and sliding window techniques.",
        problems: [
          { id: "two-sum-tp", title: "Two Sum", difficulty: "Easy", description: "Given an array and target, return indices of two numbers that add up to target.", examples: [{ input: "nums = [2,7,11,15], target = 9", output: "[0,1]" }], constraints: ["2 <= nums.length <= 10^4"], starterCode: { python: "def two_sum(nums, target):\n    pass\n\nprint(two_sum([2,7,11,15], 9))", cpp: cpp("vector<int> twoSum(vector<int>& nums, int target) { return {}; }\nint main() { vector<int> n={2,7,11,15}; auto r=twoSum(n,9); cout<<r[0]<<\",\"<<r[1]; }"), java: java("    public static int[] twoSum(int[] nums, int target) { return new int[]{}; }\n    public static void main(String[] args) { System.out.println(Arrays.toString(twoSum(new int[]{2,7,11,15}, 9))); }") }, xpReward: 10 },
          { id: "two-sum-ii", title: "Two Sum II", difficulty: "Medium", description: "Given a 1-indexed sorted array, find two numbers that add up to target. Return their indices.", examples: [{ input: "numbers = [2,7,11,15], target = 9", output: "[1,2]" }], constraints: ["2 <= numbers.length <= 3 * 10^4", "Array is sorted"], starterCode: { python: "def two_sum_ii(numbers, target):\n    pass\n\nprint(two_sum_ii([2,7,11,15], 9))  # [1,2]", cpp: cpp("vector<int> twoSumII(vector<int>& nums, int target) { return {}; }\nint main() { vector<int> n={2,7,11,15}; auto r=twoSumII(n,9); cout<<r[0]<<\",\"<<r[1]; }"), java: java("    public static int[] twoSumII(int[] nums, int target) { return new int[]{}; }\n    public static void main(String[] args) { System.out.println(Arrays.toString(twoSumII(new int[]{2,7,11,15}, 9))); }") }, xpReward: 15 },
          { id: "is-subsequence", title: "Is Subsequence", difficulty: "Easy", description: "Given strings s and t, return true if s is a subsequence of t.", examples: [{ input: 's = "abc", t = "ahbgdc"', output: "true" }], constraints: ["0 <= s.length <= 100", "0 <= t.length <= 10^4"], starterCode: { python: "def is_subsequence(s, t):\n    pass\n\nprint(is_subsequence('abc', 'ahbgdc'))  # True", cpp: cpp("bool isSubsequence(string s, string t) { return false; }\nint main() { cout << (isSubsequence(\"abc\",\"ahbgdc\") ? \"true\" : \"false\"); }"), java: java("    public static boolean isSubsequence(String s, String t) { return false; }\n    public static void main(String[] args) { System.out.println(isSubsequence(\"abc\",\"ahbgdc\")); }") }, xpReward: 10 },
          { id: "find-first-occurrence", title: "Find Index of First Occurrence in String", difficulty: "Easy", description: "Return the index of the first occurrence of needle in haystack, or -1 if not found.", examples: [{ input: 'haystack = "sadbutsad", needle = "sad"', output: "0" }], constraints: ["1 <= haystack.length, needle.length <= 10^4"], starterCode: { python: "def str_str(haystack, needle):\n    pass\n\nprint(str_str('sadbutsad', 'sad'))  # 0", cpp: cpp("int strStr(string h, string n) { return -1; }\nint main() { cout << strStr(\"sadbutsad\",\"sad\"); }"), java: java("    public static int strStr(String h, String n) { return -1; }\n    public static void main(String[] args) { System.out.println(strStr(\"sadbutsad\",\"sad\")); }") }, xpReward: 10 },
          { id: "kmp-algorithm", title: "KMP (Knuth-Morris-Pratt) Algorithm", difficulty: "Hard", description: "Implement the KMP string matching algorithm for efficient pattern searching.", examples: [{ input: 'text = "AABAACAADAABAABA", pattern = "AABA"', output: "[0, 9, 12]" }], constraints: ["1 <= text.length <= 10^5", "1 <= pattern.length <= 10^4"], starterCode: { python: "def kmp_search(text, pattern):\n    # Build failure function and search\n    pass\n\nprint(kmp_search('AABAACAADAABAABA', 'AABA'))", cpp: cpp("vector<int> kmpSearch(string text, string pattern) { return {}; }\nint main() { auto r=kmpSearch(\"AABAACAADAABAABA\",\"AABA\"); for(auto x:r)cout<<x<<\" \"; }"), java: java("    public static List<Integer> kmpSearch(String text, String pattern) { return new ArrayList<>(); }\n    public static void main(String[] args) { System.out.println(kmpSearch(\"AABAACAADAABAABA\",\"AABA\")); }") }, xpReward: 30 },
          { id: "intersection-two-ll-tp", title: "Intersection of Two Linked Lists", difficulty: "Easy", description: "Find the node where two singly linked lists intersect using two pointer technique.", examples: [{ input: "listA = [4,1,8,4,5], listB = [5,6,1,8,4,5]", output: "8" }], constraints: ["Lists may not intersect"], starterCode: { python: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef get_intersection_node(headA, headB):\n    # Two pointer approach\n    pass\n\nprint('Implement and test')", cpp: cpp("struct ListNode { int val; ListNode* next; ListNode(int x):val(x),next(nullptr){} };\nListNode* getIntersectionNode(ListNode* a, ListNode* b) { return nullptr; }\nint main() { cout << \"Implement\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Test\"); }") }, xpReward: 10 },
          { id: "container-most-water", title: "Container with Most Water", difficulty: "Medium", description: "Find two lines that together with the x-axis form a container holding the most water.", examples: [{ input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" }], constraints: ["2 <= n <= 10^5"], starterCode: { python: "def max_area(height):\n    pass\n\nprint(max_area([1,8,6,2,5,4,8,3,7]))  # 49", cpp: cpp("int maxArea(vector<int>& h) { return 0; }\nint main() { vector<int> h={1,8,6,2,5,4,8,3,7}; cout << maxArea(h); }"), java: java("    public static int maxArea(int[] h) { return 0; }\n    public static void main(String[] args) { System.out.println(maxArea(new int[]{1,8,6,2,5,4,8,3,7})); }") }, xpReward: 20 },
          { id: "three-sum-tp", title: "Three Sum", difficulty: "Medium", description: "Return all unique triplets that sum to zero.", examples: [{ input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" }], constraints: ["3 <= nums.length <= 3000"], starterCode: { python: "def three_sum(nums):\n    pass\n\nprint(three_sum([-1,0,1,2,-1,-4]))", cpp: cpp("vector<vector<int>> threeSum(vector<int>& nums) { return {}; }\nint main() { vector<int> n={-1,0,1,2,-1,-4}; auto r=threeSum(n); for(auto& t:r){for(auto x:t)cout<<x<<\" \";cout<<endl;} }"), java: java("    public static List<List<Integer>> threeSum(int[] nums) { return new ArrayList<>(); }\n    public static void main(String[] args) { System.out.println(threeSum(new int[]{-1,0,1,2,-1,-4})); }") }, xpReward: 25 },
          { id: "trapping-rain-water", title: "Trapping Rain Water", difficulty: "Hard", description: "Compute how much water can be trapped after raining given an elevation map.", examples: [{ input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" }], constraints: ["n >= 1", "0 <= height[i] <= 10^5"], starterCode: { python: "def trap(height):\n    pass\n\nprint(trap([0,1,0,2,1,0,1,3,2,1,2,1]))  # 6", cpp: cpp("int trap(vector<int>& h) { return 0; }\nint main() { vector<int> h={0,1,0,2,1,0,1,3,2,1,2,1}; cout << trap(h); }"), java: java("    public static int trap(int[] h) { return 0; }\n    public static void main(String[] args) { System.out.println(trap(new int[]{0,1,0,2,1,0,1,3,2,1,2,1})); }") }, xpReward: 35 },
          { id: "longest-substr-no-repeat", title: "Longest Substring Without Repeating Characters", difficulty: "Medium", description: "Find the length of the longest substring without repeating characters.", examples: [{ input: 's = "abcabcbb"', output: "3" }], constraints: ["0 <= s.length <= 5 * 10^4"], starterCode: { python: "def length_of_longest_substring(s):\n    pass\n\nprint(length_of_longest_substring('abcabcbb'))  # 3", cpp: cpp("int lengthOfLongestSubstring(string s) { return 0; }\nint main() { cout << lengthOfLongestSubstring(\"abcabcbb\"); }"), java: java("    public static int lengthOfLongestSubstring(String s) { return 0; }\n    public static void main(String[] args) { System.out.println(lengthOfLongestSubstring(\"abcabcbb\")); }") }, xpReward: 20 },
          { id: "longest-repeating-char-replace", title: "Longest Repeating Character Replacement", difficulty: "Medium", description: "Given a string s and integer k, you can change at most k characters. Find the longest substring with same letters.", examples: [{ input: 's = "AABABBA", k = 1', output: "4" }], constraints: ["1 <= s.length <= 10^5"], starterCode: { python: "def character_replacement(s, k):\n    pass\n\nprint(character_replacement('AABABBA', 1))  # 4", cpp: cpp("int characterReplacement(string s, int k) { return 0; }\nint main() { cout << characterReplacement(\"AABABBA\", 1); }"), java: java("    public static int characterReplacement(String s, int k) { return 0; }\n    public static void main(String[] args) { System.out.println(characterReplacement(\"AABABBA\", 1)); }") }, xpReward: 25 },
          { id: "permutation-in-string", title: "Permutation in String", difficulty: "Medium", description: "Given two strings s1 and s2, return true if s2 contains a permutation of s1.", examples: [{ input: 's1 = "ab", s2 = "eidbaooo"', output: "true" }], constraints: ["1 <= s1.length, s2.length <= 10^4"], starterCode: { python: "def check_inclusion(s1, s2):\n    pass\n\nprint(check_inclusion('ab', 'eidbaooo'))  # True", cpp: cpp("bool checkInclusion(string s1, string s2) { return false; }\nint main() { cout << (checkInclusion(\"ab\",\"eidbaooo\") ? \"true\" : \"false\"); }"), java: java("    public static boolean checkInclusion(String s1, String s2) { return false; }\n    public static void main(String[] args) { System.out.println(checkInclusion(\"ab\",\"eidbaooo\")); }") }, xpReward: 25 },
          { id: "sliding-window-max", title: "Sliding Window Maximum", difficulty: "Hard", description: "Given an array nums and a sliding window of size k, return the max in each window.", examples: [{ input: "nums = [1,3,-1,-3,5,3,6,7], k = 3", output: "[3,3,5,5,6,7]" }], constraints: ["1 <= nums.length <= 10^5", "1 <= k <= nums.length"], starterCode: { python: "def max_sliding_window(nums, k):\n    pass\n\nprint(max_sliding_window([1,3,-1,-3,5,3,6,7], 3))", cpp: cpp("vector<int> maxSlidingWindow(vector<int>& nums, int k) { return {}; }\nint main() { vector<int> n={1,3,-1,-3,5,3,6,7}; auto r=maxSlidingWindow(n,3); for(auto x:r)cout<<x<<\" \"; }"), java: java("    public static int[] maxSlidingWindow(int[] nums, int k) { return new int[]{}; }\n    public static void main(String[] args) { System.out.println(Arrays.toString(maxSlidingWindow(new int[]{1,3,-1,-3,5,3,6,7}, 3))); }") }, xpReward: 35 },
        ],
      },
    ],
  },

  // ============================================================
  // 12. BINARY TREE
  // ============================================================
  {
    id: "binary-tree",
    title: "Binary Tree",
    icon: "🌳",
    description: "Master tree traversals (DFS, BFS), tree properties, and classic binary tree problems.",
    subtopics: [
      {
        id: "tree-intro",
        title: "Tree Introduction & Traversals",
        description: "Introduction to trees, traversal methods.",
        problems: [
          { id: "intro-trees", title: "Introduction to Trees", difficulty: "Easy", description: "Create a binary tree from an array representation and print its values.", examples: [{ input: "arr = [1,2,3,4,5]", output: "Tree created" }], constraints: ["1 <= arr.length <= 100"], starterCode: { python: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\n# Create a tree: root=1, left=2, right=3\nroot = TreeNode(1, TreeNode(2, TreeNode(4), TreeNode(5)), TreeNode(3))\nprint(root.val, root.left.val, root.right.val)", cpp: cpp("struct TreeNode {\n    int val; TreeNode *left, *right;\n    TreeNode(int x):val(x),left(nullptr),right(nullptr){}\n};\nint main() {\n    auto root = new TreeNode(1);\n    root->left = new TreeNode(2);\n    root->right = new TreeNode(3);\n    cout << root->val;\n}"), java: java("    static class TreeNode { int val; TreeNode left, right; TreeNode(int v){val=v;} }\n    public static void main(String[] args) {\n        TreeNode root = new TreeNode(1);\n        System.out.println(root.val);\n    }") }, xpReward: 5 },
          { id: "binary-tree-intro", title: "Binary Tree", difficulty: "Easy", description: "Understand the properties of a binary tree: each node has at most two children. Implement a function to count total nodes.", examples: [{ input: "root = [1,2,3,4,5]", output: "5" }], constraints: ["0 <= nodes <= 10^4"], starterCode: { python: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef count_nodes(root):\n    pass\n\nroot = TreeNode(1, TreeNode(2, TreeNode(4), TreeNode(5)), TreeNode(3))\nprint(count_nodes(root))  # 5", cpp: cpp("struct TreeNode { int val; TreeNode *left, *right; TreeNode(int x):val(x),left(nullptr),right(nullptr){} };\nint countNodes(TreeNode* root) { return 0; }\nint main() { cout << \"Implement\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Implement\"); }") }, xpReward: 5 },
          { id: "preorder-traversal", title: "Preorder Traversal", difficulty: "Easy", description: "Return the preorder traversal of a binary tree (root → left → right).", examples: [{ input: "root = [1,null,2,3]", output: "[1,2,3]" }], constraints: ["0 <= nodes <= 100"], starterCode: { python: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val; self.left = left; self.right = right\n\ndef preorder(root):\n    pass\n\nroot = TreeNode(1, None, TreeNode(2, TreeNode(3)))\nprint(preorder(root))  # [1,2,3]", cpp: cpp("struct TreeNode { int val; TreeNode *left, *right; TreeNode(int x):val(x),left(nullptr),right(nullptr){} };\nvector<int> preorder(TreeNode* root) { return {}; }\nint main() { cout << \"Implement\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Implement\"); }") }, xpReward: 10 },
          { id: "inorder-postorder-intro", title: "Inorder & PostOrder", difficulty: "Easy", description: "Understand and implement both inorder (left→root→right) and postorder (left→right→root) traversals.", examples: [{ input: "root = [1,2,3]", output: "Inorder: [2,1,3], Postorder: [2,3,1]" }], constraints: ["0 <= nodes <= 100"], starterCode: { python: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val; self.left = left; self.right = right\n\ndef inorder(root):\n    pass\n\ndef postorder(root):\n    pass\n\nroot = TreeNode(1, TreeNode(2), TreeNode(3))\nprint('Inorder:', inorder(root))\nprint('Postorder:', postorder(root))", cpp: cpp("struct TreeNode { int val; TreeNode *left, *right; TreeNode(int x):val(x),left(nullptr),right(nullptr){} };\nvector<int> inorder(TreeNode* root) { return {}; }\nvector<int> postorder(TreeNode* root) { return {}; }\nint main() { cout << \"Implement\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Implement\"); }") }, xpReward: 10 },
          { id: "inorder-traversal", title: "Inorder Traversal", difficulty: "Easy", description: "Return the inorder traversal of a binary tree's values.", examples: [{ input: "root = [1,null,2,3]", output: "[1,3,2]" }], constraints: ["0 <= nodes <= 100"], starterCode: { python: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val; self.left = left; self.right = right\n\ndef inorder_traversal(root):\n    pass\n\nroot = TreeNode(1, None, TreeNode(2, TreeNode(3)))\nprint(inorder_traversal(root))", cpp: cpp("struct TreeNode { int val; TreeNode *left, *right; TreeNode(int x):val(x),left(nullptr),right(nullptr){} };\nvector<int> inorderTraversal(TreeNode* root) { return {}; }\nint main() { cout << \"Implement\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Implement\"); }") }, xpReward: 10 },
          { id: "postorder-traversal", title: "Postorder", difficulty: "Easy", description: "Return the postorder traversal of a binary tree.", examples: [{ input: "root = [1,null,2,3]", output: "[3,2,1]" }], constraints: ["0 <= nodes <= 100"], starterCode: { python: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val; self.left = left; self.right = right\n\ndef postorder_traversal(root):\n    pass\n\nroot = TreeNode(1, None, TreeNode(2, TreeNode(3)))\nprint(postorder_traversal(root))", cpp: cpp("struct TreeNode { int val; TreeNode *left, *right; TreeNode(int x):val(x),left(nullptr),right(nullptr){} };\nvector<int> postorderTraversal(TreeNode* root) { return {}; }\nint main() { cout << \"Implement\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Implement\"); }") }, xpReward: 10 },
          { id: "dfs-bfs-tree", title: "DFS and BFS in Binary Tree", difficulty: "Easy", description: "Implement both DFS (depth-first) and BFS (breadth-first) traversal on a binary tree.", examples: [{ input: "root = [1,2,3,4,5]", output: "DFS: [1,2,4,5,3], BFS: [1,2,3,4,5]" }], constraints: ["0 <= nodes <= 1000"], starterCode: { python: "from collections import deque\nclass TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val; self.left = left; self.right = right\n\ndef dfs(root):\n    pass\n\ndef bfs(root):\n    pass\n\nroot = TreeNode(1, TreeNode(2, TreeNode(4), TreeNode(5)), TreeNode(3))\nprint('DFS:', dfs(root))\nprint('BFS:', bfs(root))", cpp: cpp("struct TreeNode { int val; TreeNode *left, *right; TreeNode(int x):val(x),left(nullptr),right(nullptr){} };\nint main() { cout << \"Implement DFS & BFS\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Implement\"); }") }, xpReward: 10 },
        ],
      },
      {
        id: "tree-problems",
        title: "Binary Tree Problems",
        description: "Classic binary tree problems.",
        problems: [
          { id: "level-order-traversal", title: "Level Order Traversal", difficulty: "Medium", description: "Return the level order traversal of a binary tree (BFS).", examples: [{ input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" }], constraints: ["0 <= nodes <= 2000"], starterCode: { python: "from collections import deque\nclass TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val; self.left = left; self.right = right\n\ndef level_order(root):\n    pass\n\nroot = TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))\nprint(level_order(root))", cpp: cpp("struct TreeNode { int val; TreeNode *left, *right; TreeNode(int x):val(x),left(nullptr),right(nullptr){} };\nvector<vector<int>> levelOrder(TreeNode* root) { return {}; }\nint main() { cout << \"Implement\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Implement\"); }") }, xpReward: 20 },
          { id: "max-depth-tree", title: "Maximum Depth of Binary Tree", difficulty: "Easy", description: "Return the maximum depth of a binary tree.", examples: [{ input: "root = [3,9,20,null,null,15,7]", output: "3" }], constraints: ["0 <= nodes <= 10^4"], starterCode: { python: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val; self.left = left; self.right = right\n\ndef max_depth(root):\n    pass\n\nroot = TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))\nprint(max_depth(root))  # 3", cpp: cpp("struct TreeNode { int val; TreeNode *left, *right; TreeNode(int x):val(x),left(nullptr),right(nullptr){} };\nint maxDepth(TreeNode* root) { return 0; }\nint main() { cout << \"Implement\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Implement\"); }") }, xpReward: 10 },
          { id: "path-sum-tree", title: "Path Sum", difficulty: "Easy", description: "Given a binary tree and targetSum, return true if there exists a root-to-leaf path where values sum to targetSum.", examples: [{ input: "root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22", output: "true" }], constraints: ["0 <= nodes <= 5000"], starterCode: { python: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val; self.left = left; self.right = right\n\ndef has_path_sum(root, targetSum):\n    pass\n\nprint('Implement and test')", cpp: cpp("struct TreeNode { int val; TreeNode *left, *right; TreeNode(int x):val(x),left(nullptr),right(nullptr){} };\nbool hasPathSum(TreeNode* root, int t) { return false; }\nint main() { cout << \"Implement\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Implement\"); }") }, xpReward: 10 },
          { id: "symmetric-tree", title: "Symmetric Tree", difficulty: "Easy", description: "Check if a binary tree is symmetric (mirror of itself).", examples: [{ input: "root = [1,2,2,3,4,4,3]", output: "true" }], constraints: ["0 <= nodes <= 1000"], starterCode: { python: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val; self.left = left; self.right = right\n\ndef is_symmetric(root):\n    pass\n\nprint('Implement and test')", cpp: cpp("struct TreeNode { int val; TreeNode *left, *right; TreeNode(int x):val(x),left(nullptr),right(nullptr){} };\nbool isSymmetric(TreeNode* root) { return false; }\nint main() { cout << \"Implement\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Implement\"); }") }, xpReward: 10 },
          { id: "invert-tree", title: "Invert a Binary Tree", difficulty: "Easy", description: "Invert (mirror) a binary tree.", examples: [{ input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" }], constraints: ["0 <= nodes <= 100"], starterCode: { python: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val; self.left = left; self.right = right\n\ndef invert_tree(root):\n    pass\n\nprint('Implement and test')", cpp: cpp("struct TreeNode { int val; TreeNode *left, *right; TreeNode(int x):val(x),left(nullptr),right(nullptr){} };\nTreeNode* invertTree(TreeNode* root) { return nullptr; }\nint main() { cout << \"Implement\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Implement\"); }") }, xpReward: 10 },
          { id: "same-tree", title: "Same Tree", difficulty: "Easy", description: "Check if two binary trees are structurally identical with same node values.", examples: [{ input: "p = [1,2,3], q = [1,2,3]", output: "true" }], constraints: ["0 <= nodes <= 100"], starterCode: { python: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val; self.left = left; self.right = right\n\ndef is_same_tree(p, q):\n    pass\n\nprint('Implement and test')", cpp: cpp("struct TreeNode { int val; TreeNode *left, *right; TreeNode(int x):val(x),left(nullptr),right(nullptr){} };\nbool isSameTree(TreeNode* p, TreeNode* q) { return false; }\nint main() { cout << \"Implement\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Implement\"); }") }, xpReward: 10 },
          { id: "balanced-tree", title: "Balanced Binary Tree", difficulty: "Easy", description: "Determine if a binary tree is height-balanced (depths of two subtrees differ by at most 1).", examples: [{ input: "root = [3,9,20,null,null,15,7]", output: "true" }], constraints: ["0 <= nodes <= 5000"], starterCode: { python: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val; self.left = left; self.right = right\n\ndef is_balanced(root):\n    pass\n\nprint('Implement and test')", cpp: cpp("struct TreeNode { int val; TreeNode *left, *right; TreeNode(int x):val(x),left(nullptr),right(nullptr){} };\nbool isBalanced(TreeNode* root) { return false; }\nint main() { cout << \"Implement\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Implement\"); }") }, xpReward: 10 },
          { id: "diameter-tree", title: "Diameter of a Binary Tree", difficulty: "Easy", description: "Find the diameter (longest path between any two nodes) of a binary tree.", examples: [{ input: "root = [1,2,3,4,5]", output: "3" }], constraints: ["1 <= nodes <= 10^4"], starterCode: { python: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val; self.left = left; self.right = right\n\ndef diameter_of_binary_tree(root):\n    pass\n\nprint('Implement and test')", cpp: cpp("struct TreeNode { int val; TreeNode *left, *right; TreeNode(int x):val(x),left(nullptr),right(nullptr){} };\nint diameterOfBinaryTree(TreeNode* root) { return 0; }\nint main() { cout << \"Implement\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Implement\"); }") }, xpReward: 10 },
          { id: "zigzag-level-order", title: "Zigzag Level Order Traversal", difficulty: "Medium", description: "Return the zigzag level order traversal of a binary tree (alternating left-right).", examples: [{ input: "root = [3,9,20,null,null,15,7]", output: "[[3],[20,9],[15,7]]" }], constraints: ["0 <= nodes <= 2000"], starterCode: { python: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val; self.left = left; self.right = right\n\ndef zigzag_level_order(root):\n    pass\n\nprint('Implement and test')", cpp: cpp("struct TreeNode { int val; TreeNode *left, *right; TreeNode(int x):val(x),left(nullptr),right(nullptr){} };\nvector<vector<int>> zigzagLevelOrder(TreeNode* root) { return {}; }\nint main() { cout << \"Implement\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Implement\"); }") }, xpReward: 20 },
          { id: "subtree-of-another", title: "Subtree of Another Tree", difficulty: "Easy", description: "Check if a tree is a subtree of another tree.", examples: [{ input: "root = [3,4,5,1,2], subRoot = [4,1,2]", output: "true" }], constraints: ["1 <= nodes <= 2000"], starterCode: { python: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val; self.left = left; self.right = right\n\ndef is_subtree(root, subRoot):\n    pass\n\nprint('Implement and test')", cpp: cpp("struct TreeNode { int val; TreeNode *left, *right; TreeNode(int x):val(x),left(nullptr),right(nullptr){} };\nbool isSubtree(TreeNode* root, TreeNode* sub) { return false; }\nint main() { cout << \"Implement\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Implement\"); }") }, xpReward: 10 },
          { id: "lca-binary-tree", title: "Lowest Common Ancestor", difficulty: "Medium", description: "Find the lowest common ancestor of two nodes in a binary tree.", examples: [{ input: "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1", output: "3" }], constraints: ["2 <= nodes <= 10^5"], starterCode: { python: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val; self.left = left; self.right = right\n\ndef lowest_common_ancestor(root, p, q):\n    pass\n\nprint('Implement and test')", cpp: cpp("struct TreeNode { int val; TreeNode *left, *right; TreeNode(int x):val(x),left(nullptr),right(nullptr){} };\nTreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) { return nullptr; }\nint main() { cout << \"Implement\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Implement\"); }") }, xpReward: 20 },
          { id: "right-side-view", title: "Binary Tree Right Side View", difficulty: "Medium", description: "Return the values of nodes visible from the right side of the tree.", examples: [{ input: "root = [1,2,3,null,5,null,4]", output: "[1,3,4]" }], constraints: ["0 <= nodes <= 100"], starterCode: { python: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val; self.left = left; self.right = right\n\ndef right_side_view(root):\n    pass\n\nprint('Implement and test')", cpp: cpp("struct TreeNode { int val; TreeNode *left, *right; TreeNode(int x):val(x),left(nullptr),right(nullptr){} };\nvector<int> rightSideView(TreeNode* root) { return {}; }\nint main() { cout << \"Implement\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Implement\"); }") }, xpReward: 20 },
          { id: "count-good-nodes", title: "Count Good Nodes in Binary Tree", difficulty: "Medium", description: "A node X is good if the path from root to X has no node with value greater than X. Count good nodes.", examples: [{ input: "root = [3,1,4,3,null,1,5]", output: "4" }], constraints: ["1 <= nodes <= 10^5"], starterCode: { python: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val; self.left = left; self.right = right\n\ndef good_nodes(root):\n    pass\n\nprint('Implement and test')", cpp: cpp("struct TreeNode { int val; TreeNode *left, *right; TreeNode(int x):val(x),left(nullptr),right(nullptr){} };\nint goodNodes(TreeNode* root) { return 0; }\nint main() { cout << \"Implement\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Implement\"); }") }, xpReward: 20 },
          { id: "next-right-pointers", title: "Populating Next Right Pointers", difficulty: "Medium", description: "Populate each next pointer to point to its next right node in a perfect binary tree.", examples: [{ input: "root = [1,2,3,4,5,6,7]", output: "Each node's next points to its right neighbor" }], constraints: ["0 <= nodes <= 2^12 - 1"], starterCode: { python: "class Node:\n    def __init__(self, val=0, left=None, right=None, next=None):\n        self.val = val; self.left = left; self.right = right; self.next = next\n\ndef connect(root):\n    pass\n\nprint('Implement and test')", cpp: cpp("struct Node { int val; Node *left, *right, *next; Node(int x):val(x),left(nullptr),right(nullptr),next(nullptr){} };\nNode* connect(Node* root) { return nullptr; }\nint main() { cout << \"Implement\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Implement\"); }") }, xpReward: 20 },
          { id: "max-path-sum-tree", title: "Binary Tree Maximum Path Sum", difficulty: "Hard", description: "Find the maximum path sum in a binary tree. A path can start and end at any node.", examples: [{ input: "root = [-10,9,20,null,null,15,7]", output: "42", explanation: "15 + 20 + 7 = 42" }], constraints: ["1 <= nodes <= 3 * 10^4"], starterCode: { python: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val; self.left = left; self.right = right\n\ndef max_path_sum(root):\n    pass\n\nprint('Implement and test')", cpp: cpp("struct TreeNode { int val; TreeNode *left, *right; TreeNode(int x):val(x),left(nullptr),right(nullptr){} };\nint maxPathSum(TreeNode* root) { return 0; }\nint main() { cout << \"Implement\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Implement\"); }") }, xpReward: 35 },
        ],
      },
    ],
  },

  // ============================================================
  // 13. BINARY SEARCH TREE
  // ============================================================
  {
    id: "binary-search-tree",
    title: "Binary Search Tree",
    icon: "🌲",
    description: "BST properties, search, insert, validate, and classic BST problems.",
    subtopics: [
      {
        id: "bst-problems",
        title: "BST Problems",
        description: "Classic Binary Search Tree problems.",
        problems: [
          { id: "bst-intro", title: "Binary Search Tree", difficulty: "Easy", description: "Understand BST properties: left subtree values < root, right subtree values > root. Create a BST from sorted array.", examples: [{ input: "arr = [1,2,3,4,5,6,7]", output: "Balanced BST created" }], constraints: ["1 <= arr.length <= 10^4"], starterCode: { python: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val; self.left = left; self.right = right\n\ndef sorted_array_to_bst(nums):\n    pass\n\nprint('Implement and test')", cpp: cpp("struct TreeNode { int val; TreeNode *left, *right; TreeNode(int x):val(x),left(nullptr),right(nullptr){} };\nTreeNode* sortedArrayToBST(vector<int>& nums) { return nullptr; }\nint main() { cout << \"Implement\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Implement\"); }") }, xpReward: 10 },
          { id: "validate-bst", title: "Valid Binary Search Tree", difficulty: "Medium", description: "Determine if a binary tree is a valid BST.", examples: [{ input: "root = [2,1,3]", output: "true" }, { input: "root = [5,1,4,null,null,3,6]", output: "false" }], constraints: ["1 <= nodes <= 10^4"], starterCode: { python: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val; self.left = left; self.right = right\n\ndef is_valid_bst(root):\n    pass\n\nroot = TreeNode(2, TreeNode(1), TreeNode(3))\nprint(is_valid_bst(root))  # True", cpp: cpp("struct TreeNode { int val; TreeNode *left, *right; TreeNode(int x):val(x),left(nullptr),right(nullptr){} };\nbool isValidBST(TreeNode* root) { return false; }\nint main() { cout << \"Implement\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Implement\"); }") }, xpReward: 20 },
          { id: "search-bst", title: "Search in a BST", difficulty: "Easy", description: "Find a node in a BST with a given value and return the subtree rooted at that node.", examples: [{ input: "root = [4,2,7,1,3], val = 2", output: "[2,1,3]" }], constraints: ["1 <= nodes <= 5000"], starterCode: { python: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val; self.left = left; self.right = right\n\ndef search_bst(root, val):\n    pass\n\nprint('Implement and test')", cpp: cpp("struct TreeNode { int val; TreeNode *left, *right; TreeNode(int x):val(x),left(nullptr),right(nullptr){} };\nTreeNode* searchBST(TreeNode* root, int val) { return nullptr; }\nint main() { cout << \"Implement\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Implement\"); }") }, xpReward: 10 },
          { id: "insert-bst", title: "Insert into a BST", difficulty: "Medium", description: "Insert a value into a BST and return the updated root.", examples: [{ input: "root = [4,2,7,1,3], val = 5", output: "[4,2,7,1,3,5]" }], constraints: ["0 <= nodes <= 10^4"], starterCode: { python: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val; self.left = left; self.right = right\n\ndef insert_into_bst(root, val):\n    pass\n\nprint('Implement and test')", cpp: cpp("struct TreeNode { int val; TreeNode *left, *right; TreeNode(int x):val(x),left(nullptr),right(nullptr){} };\nTreeNode* insertIntoBST(TreeNode* root, int val) { return nullptr; }\nint main() { cout << \"Implement\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Implement\"); }") }, xpReward: 15 },
          { id: "kth-smallest-bst", title: "Kth Smallest Element", difficulty: "Medium", description: "Return the kth smallest element in a BST.", examples: [{ input: "root = [3,1,4,null,2], k = 1", output: "1" }], constraints: ["1 <= k <= nodes <= 10^4"], starterCode: { python: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val; self.left = left; self.right = right\n\ndef kth_smallest(root, k):\n    pass\n\nprint('Implement and test')", cpp: cpp("struct TreeNode { int val; TreeNode *left, *right; TreeNode(int x):val(x),left(nullptr),right(nullptr){} };\nint kthSmallest(TreeNode* root, int k) { return 0; }\nint main() { cout << \"Implement\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Implement\"); }") }, xpReward: 20 },
          { id: "lca-bst", title: "Lowest Common Ancestor of a BST", difficulty: "Medium", description: "Find the lowest common ancestor of two nodes in a BST.", examples: [{ input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8", output: "6" }], constraints: ["2 <= nodes <= 10^5"], starterCode: { python: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val; self.left = left; self.right = right\n\ndef lowest_common_ancestor_bst(root, p, q):\n    pass\n\nprint('Implement and test')", cpp: cpp("struct TreeNode { int val; TreeNode *left, *right; TreeNode(int x):val(x),left(nullptr),right(nullptr){} };\nTreeNode* lowestCommonAncestorBST(TreeNode* root, TreeNode* p, TreeNode* q) { return nullptr; }\nint main() { cout << \"Implement\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Implement\"); }") }, xpReward: 15 },
        ],
      },
    ],
  },

  // ============================================================
  // 14. HEAP
  // ============================================================
  {
    id: "heap",
    title: "Heap",
    icon: "⛰️",
    description: "Understand heaps, heap operations, heapify, and heap sort algorithm.",
    subtopics: [
      {
        id: "heap-problems",
        title: "Heap Concepts & Problems",
        description: "Learn heap data structure from scratch.",
        problems: [
          { id: "intro-heaps", title: "Introduction to Heaps", difficulty: "Easy", description: "Understand min-heap and max-heap properties. A min-heap: parent <= children. Create a simple heap from an array.", examples: [{ input: "arr = [3,1,6,5,2,4]", output: "Min-heap: [1,2,4,5,3,6]" }], constraints: ["1 <= arr.length <= 100"], starterCode: { python: "import heapq\n\ndef create_min_heap(arr):\n    heap = arr[:]\n    heapq.heapify(heap)\n    return heap\n\nprint(create_min_heap([3,1,6,5,2,4]))", cpp: cpp("int main() {\n    // Use priority_queue for heap\n    cout << \"Implement\";\n}"), java: java("    public static void main(String[] args) {\n        // Use PriorityQueue\n        System.out.println(\"Implement\");\n    }") }, xpReward: 5 },
          { id: "creating-heap", title: "Creating a Heap", difficulty: "Easy", description: "Implement a min-heap from scratch with the heapify operation.", examples: [{ input: "arr = [4,10,3,5,1]", output: "Heap: [1,4,3,5,10]" }], constraints: ["1 <= arr.length <= 1000"], starterCode: { python: "class MinHeap:\n    def __init__(self):\n        self.heap = []\n    \n    def heapify_up(self, i):\n        pass\n    \n    def heapify_down(self, i):\n        pass\n    \n    def build_heap(self, arr):\n        pass\n\nh = MinHeap()\nh.build_heap([4,10,3,5,1])\nprint(h.heap)", cpp: cpp("class MinHeap {\npublic:\n    vector<int> heap;\n    void buildHeap(vector<int>& arr) {}\n};\nint main() { cout << \"Implement\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Implement\"); }") }, xpReward: 15 },
          { id: "inserting-heap", title: "Inserting a Node in Heap", difficulty: "Easy", description: "Implement insert operation in a min-heap.", examples: [{ input: "heap = [1,3,5], insert 2", output: "[1,2,5,3]" }], constraints: ["Valid heap operations"], starterCode: { python: "import heapq\n\ndef heap_insert(heap, val):\n    heapq.heappush(heap, val)\n    return heap\n\nh = [1,3,5]\nprint(heap_insert(h, 2))", cpp: cpp("int main() { cout << \"Implement\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Implement\"); }") }, xpReward: 10 },
          { id: "extracting-heap", title: "Extracting Values in Heap & HeapifyDown", difficulty: "Easy", description: "Implement extract-min operation and heapify-down to maintain heap property.", examples: [{ input: "heap = [1,3,5,7]", output: "Extract: 1, Heap: [3,7,5]" }], constraints: ["Heap is non-empty"], starterCode: { python: "import heapq\n\ndef heap_extract(heap):\n    return heapq.heappop(heap)\n\nh = [1,3,5,7]\nprint(heap_extract(h))  # 1\nprint(h)  # [3,7,5]", cpp: cpp("int main() { cout << \"Implement\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Implement\"); }") }, xpReward: 10 },
          { id: "heap-sort", title: "Heap Sort Algorithm", difficulty: "Medium", description: "Implement heap sort to sort an array using a heap.", examples: [{ input: "arr = [12, 11, 13, 5, 6, 7]", output: "[5, 6, 7, 11, 12, 13]" }], constraints: ["1 <= arr.length <= 10^5"], starterCode: { python: "def heap_sort(arr):\n    import heapq\n    heapq.heapify(arr)\n    return [heapq.heappop(arr) for _ in range(len(arr))]\n\nprint(heap_sort([12,11,13,5,6,7]))", cpp: cpp("void heapSort(vector<int>& arr) {\n    // Your code here\n}\nint main() {\n    vector<int> a = {12,11,13,5,6,7};\n    heapSort(a);\n    for(auto x : a) cout << x << \" \";\n}"), java: java("    public static void heapSort(int[] arr) {\n        // Your code here\n    }\n    public static void main(String[] args) {\n        int[] arr = {12,11,13,5,6,7};\n        heapSort(arr);\n        System.out.println(Arrays.toString(arr));\n    }") }, xpReward: 20 },
        ],
      },
    ],
  },

  // ============================================================
  // 15. BACKTRACKING
  // ============================================================
  {
    id: "backtracking",
    title: "Backtracking",
    icon: "🔙",
    description: "Explore all possibilities with pruning — permutations, combinations, N-Queens, and Sudoku.",
    subtopics: [
      {
        id: "backtracking-problems",
        title: "Backtracking Problems",
        description: "Classic backtracking problems.",
        problems: [
          { id: "backtracking-coming-soon", title: "Coming Soon", difficulty: "Medium", description: "Backtracking problems are being added. Stay tuned for permutations, combinations, N-Queens, Sudoku solver, and more!", examples: [{ input: "N/A", output: "Coming Soon" }], constraints: ["Coming Soon"], starterCode: { python: "# Backtracking problems coming soon!\nprint('Coming Soon!')", cpp: cpp("int main() { cout << \"Coming Soon!\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Coming Soon!\"); }") }, xpReward: 0 },
        ],
      },
    ],
  },

  // ============================================================
  // 16. GREEDY ALGORITHM
  // ============================================================
  {
    id: "greedy",
    title: "Greedy Algorithm",
    icon: "💰",
    description: "Make locally optimal choices — interval scheduling, activity selection, and optimization.",
    subtopics: [
      {
        id: "greedy-problems",
        title: "Greedy Problems",
        description: "Classic greedy algorithm problems.",
        problems: [
          { id: "greedy-coming-soon", title: "Coming Soon", difficulty: "Medium", description: "Greedy algorithm problems are being added. Stay tuned for activity selection, job scheduling, fractional knapsack, and more!", examples: [{ input: "N/A", output: "Coming Soon" }], constraints: ["Coming Soon"], starterCode: { python: "# Greedy problems coming soon!\nprint('Coming Soon!')", cpp: cpp("int main() { cout << \"Coming Soon!\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Coming Soon!\"); }") }, xpReward: 0 },
        ],
      },
    ],
  },

  // ============================================================
  // 17. DYNAMIC PROGRAMMING
  // ============================================================
  {
    id: "dynamic-programming",
    title: "Dynamic Programming",
    icon: "🧩",
    description: "Master DP patterns — 1D, 2D, knapsack, LCS, LIS, and optimization problems.",
    subtopics: [
      {
        id: "dp-problems",
        title: "Dynamic Programming Problems",
        description: "Classic DP problems.",
        problems: [
          { id: "dp-coming-soon", title: "Coming Soon", difficulty: "Medium", description: "Dynamic Programming problems are being added. Stay tuned for climbing stairs, coin change, knapsack, LCS, LIS, and more!", examples: [{ input: "N/A", output: "Coming Soon" }], constraints: ["Coming Soon"], starterCode: { python: "# DP problems coming soon!\nprint('Coming Soon!')", cpp: cpp("int main() { cout << \"Coming Soon!\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Coming Soon!\"); }") }, xpReward: 0 },
        ],
      },
    ],
  },

  // ============================================================
  // 18. GRAPHS
  // ============================================================
  {
    id: "graphs",
    title: "Graphs",
    icon: "🕸️",
    description: "Graph representations, BFS, DFS, topological sort, shortest path algorithms.",
    subtopics: [
      {
        id: "graph-problems",
        title: "Graph Problems",
        description: "Classic graph algorithm problems.",
        problems: [
          { id: "graphs-coming-soon", title: "Coming Soon", difficulty: "Medium", description: "Graph problems are being added. Stay tuned for BFS, DFS, Dijkstra, topological sort, MST, and more!", examples: [{ input: "N/A", output: "Coming Soon" }], constraints: ["Coming Soon"], starterCode: { python: "# Graph problems coming soon!\nprint('Coming Soon!')", cpp: cpp("int main() { cout << \"Coming Soon!\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Coming Soon!\"); }") }, xpReward: 0 },
        ],
      },
    ],
  },

  // ============================================================
  // 19. TRIES
  // ============================================================
  {
    id: "tries",
    title: "Tries",
    icon: "🔤",
    description: "Trie data structure — prefix trees for efficient string operations and autocomplete.",
    subtopics: [
      {
        id: "trie-problems",
        title: "Trie Problems",
        description: "Classic trie problems.",
        problems: [
          { id: "tries-coming-soon", title: "Coming Soon", difficulty: "Medium", description: "Trie problems are being added. Stay tuned for implement trie, word search, autocomplete, and more!", examples: [{ input: "N/A", output: "Coming Soon" }], constraints: ["Coming Soon"], starterCode: { python: "# Trie problems coming soon!\nprint('Coming Soon!')", cpp: cpp("int main() { cout << \"Coming Soon!\"; }"), java: java("    public static void main(String[] args) { System.out.println(\"Coming Soon!\"); }") }, xpReward: 0 },
        ],
      },
    ],
  },
];

export function getAllDSAProblems(): DSAProblem[] {
  const problems: DSAProblem[] = [];
  for (const topic of DSA_ROADMAP) {
    for (const sub of topic.subtopics) {
      for (const p of sub.problems) {
        problems.push(p);
      }
    }
  }
  return problems;
}
