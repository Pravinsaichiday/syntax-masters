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
  description: string;
  subtopics: DSASubtopic[];
}

const py = (code: string) => code;
const cpp = (body: string) =>
  `#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\n#include <stack>\n#include <queue>\n#include <unordered_map>\n#include <unordered_set>\nusing namespace std;\n\n${body}`;
const java = (body: string) =>
  `import java.util.*;\n\npublic class Solution {\n${body}\n}`;

export const DSA_ROADMAP: DSATopic[] = [
  // ============================================================
  // 1. ARRAYS
  // ============================================================
  {
    id: "arrays",
    title: "Arrays",
    description: "Master array traversal, manipulation, searching, and classic array problems.",
    subtopics: [
      {
        id: "array-basics",
        title: "Array Fundamentals",
        description: "Core array operations — traversal, insertion, deletion, and searching.",
        problems: [
          {
            id: "two-sum",
            title: "Two Sum",
            difficulty: "Easy",
            description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume each input has exactly one solution.",
            examples: [
              { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "nums[0] + nums[1] = 9" },
              { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
            ],
            constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9"],
            starterCode: {
              python: py("def two_sum(nums, target):\n    # Your code here\n    pass\n\nprint(two_sum([2,7,11,15], 9))"),
              cpp: cpp("vector<int> twoSum(vector<int>& nums, int target) {\n    // Your code here\n    return {};\n}\n\nint main() {\n    vector<int> nums = {2, 7, 11, 15};\n    auto res = twoSum(nums, 9);\n    cout << \"[\" << res[0] << \",\" << res[1] << \"]\";\n    return 0;\n}"),
              java: java("    public static int[] twoSum(int[] nums, int target) {\n        // Your code here\n        return new int[]{};\n    }\n\n    public static void main(String[] args) {\n        int[] res = twoSum(new int[]{2, 7, 11, 15}, 9);\n        System.out.println(\"[\" + res[0] + \",\" + res[1] + \"]\");\n    }"),
            },
            xpReward: 10,
          },
          {
            id: "best-time-buy-sell",
            title: "Best Time to Buy and Sell Stock",
            difficulty: "Easy",
            description: "You are given an array `prices` where `prices[i]` is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy and a single day to sell. Return the maximum profit.",
            examples: [
              { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy on day 2 (price=1), sell on day 5 (price=6)" },
              { input: "prices = [7,6,4,3,1]", output: "0" },
            ],
            constraints: ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^4"],
            starterCode: {
              python: py("def max_profit(prices):\n    # Your code here\n    pass\n\nprint(max_profit([7,1,5,3,6,4]))  # 5"),
              cpp: cpp("int maxProfit(vector<int>& prices) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    vector<int> p = {7, 1, 5, 3, 6, 4};\n    cout << maxProfit(p);\n    return 0;\n}"),
              java: java("    public static int maxProfit(int[] prices) {\n        // Your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(maxProfit(new int[]{7, 1, 5, 3, 6, 4}));\n    }"),
            },
            xpReward: 10,
          },
          {
            id: "contains-duplicate",
            title: "Contains Duplicate",
            difficulty: "Easy",
            description: "Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.",
            examples: [
              { input: "nums = [1,2,3,1]", output: "true" },
              { input: "nums = [1,2,3,4]", output: "false" },
            ],
            constraints: ["1 <= nums.length <= 10^5"],
            starterCode: {
              python: py("def contains_duplicate(nums):\n    # Your code here\n    pass\n\nprint(contains_duplicate([1,2,3,1]))  # True"),
              cpp: cpp("bool containsDuplicate(vector<int>& nums) {\n    // Your code here\n    return false;\n}\n\nint main() {\n    vector<int> n = {1, 2, 3, 1};\n    cout << (containsDuplicate(n) ? \"true\" : \"false\");\n    return 0;\n}"),
              java: java("    public static boolean containsDuplicate(int[] nums) {\n        // Your code here\n        return false;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(containsDuplicate(new int[]{1, 2, 3, 1}));\n    }"),
            },
            xpReward: 10,
          },
          {
            id: "max-subarray",
            title: "Maximum Subarray (Kadane's)",
            difficulty: "Medium",
            description: "Given an integer array `nums`, find the subarray with the largest sum, and return its sum.",
            examples: [
              { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "Subarray [4,-1,2,1] has the largest sum 6" },
            ],
            constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
            starterCode: {
              python: py("def max_subarray(nums):\n    # Your code here\n    pass\n\nprint(max_subarray([-2,1,-3,4,-1,2,1,-5,4]))  # 6"),
              cpp: cpp("int maxSubArray(vector<int>& nums) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    vector<int> n = {-2, 1, -3, 4, -1, 2, 1, -5, 4};\n    cout << maxSubArray(n);\n    return 0;\n}"),
              java: java("    public static int maxSubArray(int[] nums) {\n        // Your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(maxSubArray(new int[]{-2, 1, -3, 4, -1, 2, 1, -5, 4}));\n    }"),
            },
            xpReward: 15,
          },
        ],
      },
      {
        id: "array-advanced",
        title: "Array Advanced",
        description: "In-place operations, merging, and rotation problems.",
        problems: [
          {
            id: "merge-sorted-arrays",
            title: "Merge Sorted Arrays",
            difficulty: "Easy",
            description: "You are given two integer arrays `nums1` and `nums2`, sorted in non-decreasing order. Merge `nums2` into `nums1` as one sorted array.",
            examples: [
              { input: "nums1 = [1,2,3,0,0,0], m=3, nums2 = [2,5,6], n=3", output: "[1,2,2,3,5,6]" },
            ],
            constraints: ["nums1.length == m + n", "nums2.length == n"],
            starterCode: {
              python: py("def merge(nums1, m, nums2, n):\n    # Your code here\n    pass\n\na = [1,2,3,0,0,0]\nmerge(a, 3, [2,5,6], 3)\nprint(a)"),
              cpp: cpp("void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {\n    // Your code here\n}\n\nint main() {\n    vector<int> a = {1, 2, 3, 0, 0, 0};\n    vector<int> b = {2, 5, 6};\n    merge(a, 3, b, 3);\n    for (auto x : a) cout << x << \" \";\n    return 0;\n}"),
              java: java("    public static void merge(int[] nums1, int m, int[] nums2, int n) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        int[] a = {1, 2, 3, 0, 0, 0};\n        merge(a, 3, new int[]{2, 5, 6}, 3);\n        System.out.println(Arrays.toString(a));\n    }"),
            },
            xpReward: 10,
          },
          {
            id: "move-zeroes",
            title: "Move Zeroes",
            difficulty: "Easy",
            description: "Given an integer array `nums`, move all 0's to the end of it while maintaining the relative order of the non-zero elements. Do this in-place.",
            examples: [
              { input: "nums = [0,1,0,3,12]", output: "[1,3,12,0,0]" },
            ],
            constraints: ["1 <= nums.length <= 10^4"],
            starterCode: {
              python: py("def move_zeroes(nums):\n    # Your code here\n    pass\n\na = [0,1,0,3,12]\nmove_zeroes(a)\nprint(a)  # [1,3,12,0,0]"),
              cpp: cpp("void moveZeroes(vector<int>& nums) {\n    // Your code here\n}\n\nint main() {\n    vector<int> n = {0, 1, 0, 3, 12};\n    moveZeroes(n);\n    for (auto x : n) cout << x << \" \";\n    return 0;\n}"),
              java: java("    public static void moveZeroes(int[] nums) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        int[] a = {0, 1, 0, 3, 12};\n        moveZeroes(a);\n        System.out.println(Arrays.toString(a));\n    }"),
            },
            xpReward: 10,
          },
          {
            id: "rotate-array",
            title: "Rotate Array",
            difficulty: "Medium",
            description: "Given an integer array `nums`, rotate the array to the right by `k` steps.",
            examples: [
              { input: "nums = [1,2,3,4,5,6,7], k = 3", output: "[5,6,7,1,2,3,4]" },
            ],
            constraints: ["1 <= nums.length <= 10^5", "0 <= k <= 10^5"],
            starterCode: {
              python: py("def rotate(nums, k):\n    # Your code here\n    pass\n\na = [1,2,3,4,5,6,7]\nrotate(a, 3)\nprint(a)  # [5,6,7,1,2,3,4]"),
              cpp: cpp("void rotate(vector<int>& nums, int k) {\n    // Your code here\n}\n\nint main() {\n    vector<int> n = {1, 2, 3, 4, 5, 6, 7};\n    rotate(n, 3);\n    for (auto x : n) cout << x << \" \";\n    return 0;\n}"),
              java: java("    public static void rotate(int[] nums, int k) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        int[] a = {1, 2, 3, 4, 5, 6, 7};\n        rotate(a, 3);\n        System.out.println(Arrays.toString(a));\n    }"),
            },
            xpReward: 15,
          },
          {
            id: "product-except-self",
            title: "Product of Array Except Self",
            difficulty: "Medium",
            description: "Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`. You must solve it without using division.",
            examples: [
              { input: "nums = [1,2,3,4]", output: "[24,12,8,6]" },
            ],
            constraints: ["2 <= nums.length <= 10^5"],
            starterCode: {
              python: py("def product_except_self(nums):\n    # Your code here\n    pass\n\nprint(product_except_self([1,2,3,4]))  # [24,12,8,6]"),
              cpp: cpp("vector<int> productExceptSelf(vector<int>& nums) {\n    // Your code here\n    return {};\n}\n\nint main() {\n    vector<int> n = {1, 2, 3, 4};\n    auto r = productExceptSelf(n);\n    for (auto x : r) cout << x << \" \";\n    return 0;\n}"),
              java: java("    public static int[] productExceptSelf(int[] nums) {\n        // Your code here\n        return new int[]{};\n    }\n\n    public static void main(String[] args) {\n        System.out.println(Arrays.toString(productExceptSelf(new int[]{1, 2, 3, 4})));\n    }"),
            },
            xpReward: 15,
          },
        ],
      },
    ],
  },

  // ============================================================
  // 2. HASHING
  // ============================================================
  {
    id: "hashing",
    title: "Hashing",
    description: "Hash maps, hash sets, frequency counting, and constant-time lookups.",
    subtopics: [
      {
        id: "hashmap-problems",
        title: "HashMap & HashSet",
        description: "Use hash-based data structures for efficient lookups and counting.",
        problems: [
          {
            id: "valid-anagram",
            title: "Valid Anagram",
            difficulty: "Easy",
            description: "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.",
            examples: [
              { input: 's = "anagram", t = "nagaram"', output: "true" },
              { input: 's = "rat", t = "car"', output: "false" },
            ],
            constraints: ["1 <= s.length, t.length <= 5 * 10^4"],
            starterCode: {
              python: py("def is_anagram(s, t):\n    # Your code here\n    pass\n\nprint(is_anagram('anagram', 'nagaram'))  # True"),
              cpp: cpp("bool isAnagram(string s, string t) {\n    // Your code here\n    return false;\n}\n\nint main() {\n    cout << (isAnagram(\"anagram\", \"nagaram\") ? \"true\" : \"false\");\n    return 0;\n}"),
              java: java("    public static boolean isAnagram(String s, String t) {\n        // Your code here\n        return false;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(isAnagram(\"anagram\", \"nagaram\"));\n    }"),
            },
            xpReward: 10,
          },
          {
            id: "group-anagrams",
            title: "Group Anagrams",
            difficulty: "Medium",
            description: "Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.",
            examples: [
              { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
            ],
            constraints: ["1 <= strs.length <= 10^4"],
            starterCode: {
              python: py("def group_anagrams(strs):\n    # Your code here\n    pass\n\nprint(group_anagrams(['eat','tea','tan','ate','nat','bat']))"),
              cpp: cpp("vector<vector<string>> groupAnagrams(vector<string>& strs) {\n    // Your code here\n    return {};\n}\n\nint main() {\n    vector<string> s = {\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"};\n    auto r = groupAnagrams(s);\n    for (auto& g : r) {\n        for (auto& w : g) cout << w << \" \";\n        cout << endl;\n    }\n    return 0;\n}"),
              java: java("    public static List<List<String>> groupAnagrams(String[] strs) {\n        // Your code here\n        return new ArrayList<>();\n    }\n\n    public static void main(String[] args) {\n        System.out.println(groupAnagrams(new String[]{\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"}));\n    }"),
            },
            xpReward: 15,
          },
          {
            id: "top-k-frequent",
            title: "Top K Frequent Elements",
            difficulty: "Medium",
            description: "Given an integer array `nums` and an integer `k`, return the `k` most frequent elements.",
            examples: [
              { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]" },
            ],
            constraints: ["1 <= nums.length <= 10^5", "1 <= k <= number of unique elements"],
            starterCode: {
              python: py("def top_k_frequent(nums, k):\n    # Your code here\n    pass\n\nprint(top_k_frequent([1,1,1,2,2,3], 2))  # [1,2]"),
              cpp: cpp("vector<int> topKFrequent(vector<int>& nums, int k) {\n    // Your code here\n    return {};\n}\n\nint main() {\n    vector<int> n = {1, 1, 1, 2, 2, 3};\n    auto r = topKFrequent(n, 2);\n    for (auto x : r) cout << x << \" \";\n    return 0;\n}"),
              java: java("    public static int[] topKFrequent(int[] nums, int k) {\n        // Your code here\n        return new int[]{};\n    }\n\n    public static void main(String[] args) {\n        System.out.println(Arrays.toString(topKFrequent(new int[]{1, 1, 1, 2, 2, 3}, 2)));\n    }"),
            },
            xpReward: 15,
          },
          {
            id: "longest-consecutive",
            title: "Longest Consecutive Sequence",
            difficulty: "Medium",
            description: "Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence. Must run in O(n) time.",
            examples: [
              { input: "nums = [100,4,200,1,3,2]", output: "4", explanation: "Sequence: [1,2,3,4]" },
            ],
            constraints: ["0 <= nums.length <= 10^5"],
            starterCode: {
              python: py("def longest_consecutive(nums):\n    # Your code here\n    pass\n\nprint(longest_consecutive([100,4,200,1,3,2]))  # 4"),
              cpp: cpp("int longestConsecutive(vector<int>& nums) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    vector<int> n = {100, 4, 200, 1, 3, 2};\n    cout << longestConsecutive(n);\n    return 0;\n}"),
              java: java("    public static int longestConsecutive(int[] nums) {\n        // Your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(longestConsecutive(new int[]{100, 4, 200, 1, 3, 2}));\n    }"),
            },
            xpReward: 15,
          },
        ],
      },
    ],
  },

  // ============================================================
  // 3. LINKED LISTS
  // ============================================================
  {
    id: "linked-lists",
    title: "Linked Lists",
    description: "Singly & doubly linked lists — traversal, reversal, cycle detection, and merge operations.",
    subtopics: [
      {
        id: "singly-linked",
        title: "Singly Linked List",
        description: "Basic linked list operations and classic problems.",
        problems: [
          {
            id: "reverse-linked-list",
            title: "Reverse Linked List",
            difficulty: "Easy",
            description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
            examples: [
              { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
            ],
            constraints: ["0 <= Number of nodes <= 5000"],
            starterCode: {
              python: py("class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef reverse_list(head):\n    # Your code here\n    pass\n\n# Test\ndef to_list(head):\n    r = []\n    while head:\n        r.append(head.val)\n        head = head.next\n    return r\n\nh = ListNode(1, ListNode(2, ListNode(3, ListNode(4, ListNode(5)))))\nprint(to_list(reverse_list(h)))"),
              cpp: cpp("struct ListNode {\n    int val;\n    ListNode* next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nListNode* reverseList(ListNode* head) {\n    // Your code here\n    return nullptr;\n}\n\nint main() {\n    cout << \"Implement reverseList\" << endl;\n    return 0;\n}"),
              java: java("    static class ListNode {\n        int val;\n        ListNode next;\n        ListNode(int x) {\n            val = x;\n        }\n    }\n\n    public static ListNode reverseList(ListNode head) {\n        // Your code here\n        return null;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Implement reverseList\");\n    }"),
            },
            xpReward: 10,
          },
          {
            id: "linked-list-cycle",
            title: "Linked List Cycle",
            difficulty: "Easy",
            description: "Given `head`, the head of a linked list, determine if the linked list has a cycle in it. Use Floyd's cycle detection algorithm.",
            examples: [
              { input: "head = [3,2,0,-4], pos = 1", output: "true", explanation: "Tail connects to node index 1" },
            ],
            constraints: ["0 <= Number of nodes <= 10^4"],
            starterCode: {
              python: py("class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef has_cycle(head):\n    # Floyd's algorithm\n    pass\n\nprint(has_cycle(None))  # False"),
              cpp: cpp("struct ListNode {\n    int val;\n    ListNode* next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nbool hasCycle(ListNode* head) {\n    // Your code here\n    return false;\n}\n\nint main() {\n    cout << (hasCycle(nullptr) ? \"true\" : \"false\");\n    return 0;\n}"),
              java: java("    static class ListNode {\n        int val;\n        ListNode next;\n        ListNode(int x) {\n            val = x;\n        }\n    }\n\n    public static boolean hasCycle(ListNode head) {\n        // Your code here\n        return false;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(hasCycle(null));\n    }"),
            },
            xpReward: 10,
          },
          {
            id: "merge-two-sorted-lists",
            title: "Merge Two Sorted Lists",
            difficulty: "Easy",
            description: "Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the first two lists.",
            examples: [
              { input: "l1 = [1,2,4], l2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
            ],
            constraints: ["0 <= Number of nodes <= 50"],
            starterCode: {
              python: py("class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef merge_two_lists(l1, l2):\n    # Your code here\n    pass\n\nprint('Implement mergeTwoLists')"),
              cpp: cpp("struct ListNode {\n    int val;\n    ListNode* next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {\n    // Your code here\n    return nullptr;\n}\n\nint main() {\n    cout << \"Implement mergeTwoLists\" << endl;\n    return 0;\n}"),
              java: java("    static class ListNode {\n        int val;\n        ListNode next;\n        ListNode(int x) {\n            val = x;\n        }\n    }\n\n    public static ListNode mergeTwoLists(ListNode l1, ListNode l2) {\n        // Your code here\n        return null;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Implement mergeTwoLists\");\n    }"),
            },
            xpReward: 10,
          },
          {
            id: "remove-nth-from-end",
            title: "Remove Nth Node From End",
            difficulty: "Medium",
            description: "Given the head of a linked list, remove the nth node from the end of the list and return its head.",
            examples: [
              { input: "head = [1,2,3,4,5], n = 2", output: "[1,2,3,5]" },
            ],
            constraints: ["1 <= sz <= 30", "1 <= n <= sz"],
            starterCode: {
              python: py("class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef remove_nth_from_end(head, n):\n    # Your code here\n    pass\n\nprint('Implement removeNthFromEnd')"),
              cpp: cpp("struct ListNode {\n    int val;\n    ListNode* next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nListNode* removeNthFromEnd(ListNode* head, int n) {\n    // Your code here\n    return nullptr;\n}\n\nint main() {\n    cout << \"Implement removeNthFromEnd\" << endl;\n    return 0;\n}"),
              java: java("    static class ListNode {\n        int val;\n        ListNode next;\n        ListNode(int x) {\n            val = x;\n        }\n    }\n\n    public static ListNode removeNthFromEnd(ListNode head, int n) {\n        // Your code here\n        return null;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Implement removeNthFromEnd\");\n    }"),
            },
            xpReward: 15,
          },
        ],
      },
    ],
  },

  // ============================================================
  // 4. STACKS & QUEUES
  // ============================================================
  {
    id: "stacks",
    title: "Stacks & Queues",
    description: "LIFO & FIFO operations — parentheses matching, monotonic stacks, and queue implementations.",
    subtopics: [
      {
        id: "stack-problems",
        title: "Stack Problems",
        description: "Classic stack-based problems.",
        problems: [
          {
            id: "valid-parentheses",
            title: "Valid Parentheses",
            difficulty: "Easy",
            description: "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
            examples: [
              { input: 's = "()"', output: "true" },
              { input: 's = "([)]"', output: "false" },
            ],
            constraints: ["1 <= s.length <= 10^4"],
            starterCode: {
              python: py("def is_valid(s):\n    # Your code here\n    pass\n\nprint(is_valid('()'))     # True\nprint(is_valid('([)]'))   # False"),
              cpp: cpp("bool isValid(string s) {\n    // Your code here\n    return false;\n}\n\nint main() {\n    cout << (isValid(\"()\") ? \"true\" : \"false\");\n    return 0;\n}"),
              java: java("    public static boolean isValid(String s) {\n        // Your code here\n        return false;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(isValid(\"()\"));\n    }"),
            },
            xpReward: 10,
          },
          {
            id: "min-stack",
            title: "Min Stack",
            difficulty: "Medium",
            description: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",
            examples: [
              { input: "push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()", output: "-3, 0, -2" },
            ],
            constraints: ["Methods: push, pop, top, getMin", "All operations O(1)"],
            starterCode: {
              python: py("class MinStack:\n    def __init__(self):\n        # Your code here\n        pass\n\n    def push(self, val):\n        pass\n\n    def pop(self):\n        pass\n\n    def top(self):\n        pass\n\n    def getMin(self):\n        pass\n\ns = MinStack()\ns.push(-2); s.push(0); s.push(-3)\nprint(s.getMin())  # -3\ns.pop()\nprint(s.top())     # 0\nprint(s.getMin())  # -2"),
              cpp: cpp("class MinStack {\npublic:\n    MinStack() {\n    }\n\n    void push(int val) {\n    }\n\n    void pop() {\n    }\n\n    int top() {\n        return 0;\n    }\n\n    int getMin() {\n        return 0;\n    }\n};\n\nint main() {\n    MinStack s;\n    s.push(-2);\n    s.push(0);\n    s.push(-3);\n    cout << s.getMin() << endl;\n    return 0;\n}"),
              java: java("    private Stack<Integer> stack = new Stack<>();\n    private Stack<Integer> minStack = new Stack<>();\n\n    public void push(int val) {\n        // Your code here\n    }\n\n    public void pop() {\n        // Your code here\n    }\n\n    public int top() {\n        // Your code here\n        return 0;\n    }\n\n    public int getMin() {\n        // Your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Implement MinStack\");\n    }"),
            },
            xpReward: 15,
          },
          {
            id: "daily-temperatures",
            title: "Daily Temperatures",
            difficulty: "Medium",
            description: "Given an array of integers `temperatures`, return an array `answer` such that `answer[i]` is the number of days you have to wait after the ith day to get a warmer temperature.",
            examples: [
              { input: "temperatures = [73,74,75,71,69,72,76,73]", output: "[1,1,4,2,1,1,0,0]" },
            ],
            constraints: ["1 <= temperatures.length <= 10^5"],
            starterCode: {
              python: py("def daily_temperatures(temps):\n    # Use monotonic stack\n    pass\n\nprint(daily_temperatures([73,74,75,71,69,72,76,73]))"),
              cpp: cpp("vector<int> dailyTemperatures(vector<int>& temps) {\n    // Your code here\n    return {};\n}\n\nint main() {\n    vector<int> t = {73, 74, 75, 71, 69, 72, 76, 73};\n    auto r = dailyTemperatures(t);\n    for (auto x : r) cout << x << \" \";\n    return 0;\n}"),
              java: java("    public static int[] dailyTemperatures(int[] temps) {\n        // Your code here\n        return new int[]{};\n    }\n\n    public static void main(String[] args) {\n        System.out.println(Arrays.toString(dailyTemperatures(new int[]{73, 74, 75, 71, 69, 72, 76, 73})));\n    }"),
            },
            xpReward: 15,
          },
        ],
      },
    ],
  },

  // ============================================================
  // 5. TREES
  // ============================================================
  {
    id: "trees",
    title: "Trees",
    description: "Binary trees, BSTs — traversals, depth, validation, and path problems.",
    subtopics: [
      {
        id: "binary-tree",
        title: "Binary Tree Traversals",
        description: "DFS, BFS, inorder, preorder, postorder traversals.",
        problems: [
          {
            id: "max-depth-tree",
            title: "Maximum Depth of Binary Tree",
            difficulty: "Easy",
            description: "Given the root of a binary tree, return its maximum depth. Maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
            examples: [
              { input: "root = [3,9,20,null,null,15,7]", output: "3" },
            ],
            constraints: ["0 <= Number of nodes <= 10^4"],
            starterCode: {
              python: py("class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef max_depth(root):\n    # Your code here\n    pass\n\nroot = TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))\nprint(max_depth(root))  # 3"),
              cpp: cpp("struct TreeNode {\n    int val;\n    TreeNode* left;\n    TreeNode* right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nint maxDepth(TreeNode* root) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    auto root = new TreeNode(3);\n    root->left = new TreeNode(9);\n    root->right = new TreeNode(20);\n    cout << maxDepth(root);\n    return 0;\n}"),
              java: java("    static class TreeNode {\n        int val;\n        TreeNode left;\n        TreeNode right;\n        TreeNode(int x) {\n            val = x;\n        }\n    }\n\n    public static int maxDepth(TreeNode root) {\n        // Your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        TreeNode root = new TreeNode(3);\n        root.left = new TreeNode(9);\n        root.right = new TreeNode(20);\n        System.out.println(maxDepth(root));\n    }"),
            },
            xpReward: 10,
          },
          {
            id: "invert-binary-tree",
            title: "Invert Binary Tree",
            difficulty: "Easy",
            description: "Given the root of a binary tree, invert the tree, and return its root.",
            examples: [
              { input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" },
            ],
            constraints: ["0 <= Number of nodes <= 100"],
            starterCode: {
              python: py("class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef invert_tree(root):\n    # Your code here\n    pass\n\nprint('Implement invertTree')"),
              cpp: cpp("struct TreeNode {\n    int val;\n    TreeNode* left;\n    TreeNode* right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nTreeNode* invertTree(TreeNode* root) {\n    // Your code here\n    return nullptr;\n}\n\nint main() {\n    cout << \"Implement invertTree\" << endl;\n    return 0;\n}"),
              java: java("    static class TreeNode {\n        int val;\n        TreeNode left;\n        TreeNode right;\n        TreeNode(int x) {\n            val = x;\n        }\n    }\n\n    public static TreeNode invertTree(TreeNode root) {\n        // Your code here\n        return null;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Implement invertTree\");\n    }"),
            },
            xpReward: 10,
          },
          {
            id: "level-order-traversal",
            title: "Binary Tree Level Order Traversal",
            difficulty: "Medium",
            description: "Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).",
            examples: [
              { input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" },
            ],
            constraints: ["0 <= Number of nodes <= 2000"],
            starterCode: {
              python: py("from collections import deque\n\nclass TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef level_order(root):\n    # BFS\n    pass\n\nroot = TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))\nprint(level_order(root))"),
              cpp: cpp("struct TreeNode {\n    int val;\n    TreeNode* left;\n    TreeNode* right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nvector<vector<int>> levelOrder(TreeNode* root) {\n    // Your code here\n    return {};\n}\n\nint main() {\n    cout << \"Implement levelOrder\" << endl;\n    return 0;\n}"),
              java: java("    static class TreeNode {\n        int val;\n        TreeNode left;\n        TreeNode right;\n        TreeNode(int x) {\n            val = x;\n        }\n    }\n\n    public static List<List<Integer>> levelOrder(TreeNode root) {\n        // Your code here\n        return new ArrayList<>();\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Implement levelOrder\");\n    }"),
            },
            xpReward: 15,
          },
          {
            id: "validate-bst",
            title: "Validate Binary Search Tree",
            difficulty: "Medium",
            description: "Given the root of a binary tree, determine if it is a valid binary search tree (BST).",
            examples: [
              { input: "root = [2,1,3]", output: "true" },
              { input: "root = [5,1,4,null,null,3,6]", output: "false" },
            ],
            constraints: ["1 <= Number of nodes <= 10^4"],
            starterCode: {
              python: py("class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef is_valid_bst(root):\n    # Your code here\n    pass\n\nroot = TreeNode(2, TreeNode(1), TreeNode(3))\nprint(is_valid_bst(root))  # True"),
              cpp: cpp("struct TreeNode {\n    int val;\n    TreeNode* left;\n    TreeNode* right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nbool isValidBST(TreeNode* root) {\n    // Your code here\n    return false;\n}\n\nint main() {\n    cout << \"Implement isValidBST\" << endl;\n    return 0;\n}"),
              java: java("    static class TreeNode {\n        int val;\n        TreeNode left;\n        TreeNode right;\n        TreeNode(int x) {\n            val = x;\n        }\n    }\n\n    public static boolean isValidBST(TreeNode root) {\n        // Your code here\n        return false;\n    }\n\n    public static void main(String[] args) {\n        TreeNode root = new TreeNode(2);\n        root.left = new TreeNode(1);\n        root.right = new TreeNode(3);\n        System.out.println(isValidBST(root));\n    }"),
            },
            xpReward: 15,
          },
        ],
      },
    ],
  },

  // ============================================================
  // 6. GRAPHS
  // ============================================================
  {
    id: "graphs",
    title: "Graphs",
    description: "BFS, DFS, topological sort, shortest paths, and connected components.",
    subtopics: [
      {
        id: "graph-traversal",
        title: "Graph Traversal",
        description: "BFS, DFS, and path-finding in graphs.",
        problems: [
          {
            id: "number-of-islands",
            title: "Number of Islands",
            difficulty: "Medium",
            description: "Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
            examples: [
              { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', output: "3" },
            ],
            constraints: ["m == grid.length", "n == grid[i].length", "1 <= m, n <= 300"],
            starterCode: {
              python: py("def num_islands(grid):\n    # DFS/BFS\n    pass\n\ngrid = [['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']]\nprint(num_islands(grid))  # 3"),
              cpp: cpp("int numIslands(vector<vector<char>>& grid) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    cout << \"Implement numIslands\" << endl;\n    return 0;\n}"),
              java: java("    public static int numIslands(char[][] grid) {\n        // Your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Implement numIslands\");\n    }"),
            },
            xpReward: 15,
          },
          {
            id: "clone-graph",
            title: "Clone Graph",
            difficulty: "Medium",
            description: "Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.",
            examples: [
              { input: "adjList = [[2,4],[1,3],[2,4],[1,3]]", output: "[[2,4],[1,3],[2,4],[1,3]]" },
            ],
            constraints: ["1 <= Number of nodes <= 100"],
            starterCode: {
              python: py("class Node:\n    def __init__(self, val=0, neighbors=None):\n        self.val = val\n        self.neighbors = neighbors if neighbors else []\n\ndef clone_graph(node):\n    # BFS or DFS clone\n    pass\n\nprint('Implement cloneGraph')"),
              cpp: cpp("// Clone Graph implementation\nint main() {\n    cout << \"Implement cloneGraph\" << endl;\n    return 0;\n}"),
              java: java("    public static void main(String[] args) {\n        System.out.println(\"Implement cloneGraph\");\n    }"),
            },
            xpReward: 15,
          },
          {
            id: "course-schedule",
            title: "Course Schedule",
            difficulty: "Medium",
            description: "There are a total of `numCourses` courses. You are given an array `prerequisites`. Return true if you can finish all courses (no cycle in directed graph).",
            examples: [
              { input: "numCourses = 2, prerequisites = [[1,0]]", output: "true" },
              { input: "numCourses = 2, prerequisites = [[1,0],[0,1]]", output: "false" },
            ],
            constraints: ["1 <= numCourses <= 2000"],
            starterCode: {
              python: py("def can_finish(numCourses, prerequisites):\n    # Topological sort / cycle detection\n    pass\n\nprint(can_finish(2, [[1,0]]))  # True"),
              cpp: cpp("bool canFinish(int numCourses, vector<vector<int>>& prereqs) {\n    // Your code here\n    return false;\n}\n\nint main() {\n    cout << \"Implement canFinish\" << endl;\n    return 0;\n}"),
              java: java("    public static boolean canFinish(int numCourses, int[][] prereqs) {\n        // Your code here\n        return false;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(canFinish(2, new int[][]{{1, 0}}));\n    }"),
            },
            xpReward: 15,
          },
          {
            id: "rotting-oranges",
            title: "Rotting Oranges",
            difficulty: "Medium",
            description: "In a grid, each cell can be empty (0), fresh orange (1), or rotten orange (2). Every minute, fresh oranges adjacent to rotten ones become rotten. Return the minimum minutes until no fresh orange remains, or -1 if impossible.",
            examples: [
              { input: "grid = [[2,1,1],[1,1,0],[0,1,1]]", output: "4" },
            ],
            constraints: ["m == grid.length", "n == grid[i].length"],
            starterCode: {
              python: py("from collections import deque\n\ndef oranges_rotting(grid):\n    # Multi-source BFS\n    pass\n\nprint(oranges_rotting([[2,1,1],[1,1,0],[0,1,1]]))  # 4"),
              cpp: cpp("int orangesRotting(vector<vector<int>>& grid) {\n    // Your code here\n    return -1;\n}\n\nint main() {\n    cout << \"Implement orangesRotting\" << endl;\n    return 0;\n}"),
              java: java("    public static int orangesRotting(int[][] grid) {\n        // Your code here\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(orangesRotting(new int[][]{{2, 1, 1}, {1, 1, 0}, {0, 1, 1}}));\n    }"),
            },
            xpReward: 15,
          },
        ],
      },
    ],
  },

  // ============================================================
  // 7. DYNAMIC PROGRAMMING
  // ============================================================
  {
    id: "dynamic-programming",
    title: "Dynamic Programming",
    description: "Memoization, tabulation — climbing stairs, knapsack, LCS, coin change, and more.",
    subtopics: [
      {
        id: "dp-1d",
        title: "1D Dynamic Programming",
        description: "Classic 1D DP problems.",
        problems: [
          {
            id: "climbing-stairs",
            title: "Climbing Stairs",
            difficulty: "Easy",
            description: "You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
            examples: [
              { input: "n = 3", output: "3", explanation: "1+1+1, 1+2, 2+1" },
              { input: "n = 5", output: "8" },
            ],
            constraints: ["1 <= n <= 45"],
            starterCode: {
              python: py("def climb_stairs(n):\n    # Your code here\n    pass\n\nprint(climb_stairs(3))  # 3\nprint(climb_stairs(5))  # 8"),
              cpp: cpp("int climbStairs(int n) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    cout << climbStairs(3) << endl;\n    cout << climbStairs(5) << endl;\n    return 0;\n}"),
              java: java("    public static int climbStairs(int n) {\n        // Your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(climbStairs(3));\n        System.out.println(climbStairs(5));\n    }"),
            },
            xpReward: 10,
          },
          {
            id: "coin-change",
            title: "Coin Change",
            difficulty: "Medium",
            description: "Given an array `coins` and an integer `amount`, return the fewest number of coins needed to make up that amount. If not possible, return -1.",
            examples: [
              { input: "coins = [1,5,11], amount = 11", output: "1" },
              { input: "coins = [2], amount = 3", output: "-1" },
            ],
            constraints: ["1 <= coins.length <= 12", "0 <= amount <= 10^4"],
            starterCode: {
              python: py("def coin_change(coins, amount):\n    # Your code here\n    pass\n\nprint(coin_change([1,5,11], 11))  # 1"),
              cpp: cpp("int coinChange(vector<int>& coins, int amount) {\n    // Your code here\n    return -1;\n}\n\nint main() {\n    vector<int> c = {1, 5, 11};\n    cout << coinChange(c, 11);\n    return 0;\n}"),
              java: java("    public static int coinChange(int[] coins, int amount) {\n        // Your code here\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(coinChange(new int[]{1, 5, 11}, 11));\n    }"),
            },
            xpReward: 15,
          },
          {
            id: "house-robber",
            title: "House Robber",
            difficulty: "Medium",
            description: "You are a robber planning to rob houses along a street. Each house has a certain amount of money. Adjacent houses have security systems connected — you cannot rob two adjacent houses. Return the maximum amount you can rob.",
            examples: [
              { input: "nums = [1,2,3,1]", output: "4", explanation: "Rob house 1 (1) + house 3 (3) = 4" },
              { input: "nums = [2,7,9,3,1]", output: "12" },
            ],
            constraints: ["1 <= nums.length <= 100"],
            starterCode: {
              python: py("def rob(nums):\n    # Your code here\n    pass\n\nprint(rob([1,2,3,1]))    # 4\nprint(rob([2,7,9,3,1]))  # 12"),
              cpp: cpp("int rob(vector<int>& nums) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    vector<int> n = {2, 7, 9, 3, 1};\n    cout << rob(n);\n    return 0;\n}"),
              java: java("    public static int rob(int[] nums) {\n        // Your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(rob(new int[]{2, 7, 9, 3, 1}));\n    }"),
            },
            xpReward: 15,
          },
        ],
      },
      {
        id: "dp-2d",
        title: "2D Dynamic Programming",
        description: "Grid-based and string DP problems.",
        problems: [
          {
            id: "longest-common-subsequence",
            title: "Longest Common Subsequence",
            difficulty: "Medium",
            description: "Given two strings `text1` and `text2`, return the length of their longest common subsequence.",
            examples: [
              { input: 'text1 = "abcde", text2 = "ace"', output: "3", explanation: "LCS is 'ace'" },
            ],
            constraints: ["1 <= text1.length, text2.length <= 1000"],
            starterCode: {
              python: py("def lcs(text1, text2):\n    # Your code here\n    pass\n\nprint(lcs('abcde', 'ace'))  # 3"),
              cpp: cpp("int longestCommonSubsequence(string t1, string t2) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    cout << longestCommonSubsequence(\"abcde\", \"ace\");\n    return 0;\n}"),
              java: java("    public static int longestCommonSubsequence(String t1, String t2) {\n        // Your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(longestCommonSubsequence(\"abcde\", \"ace\"));\n    }"),
            },
            xpReward: 15,
          },
          {
            id: "unique-paths",
            title: "Unique Paths",
            difficulty: "Medium",
            description: "A robot is located at the top-left corner of an m x n grid. It can only move right or down. How many unique paths are there to reach the bottom-right corner?",
            examples: [
              { input: "m = 3, n = 7", output: "28" },
              { input: "m = 3, n = 2", output: "3" },
            ],
            constraints: ["1 <= m, n <= 100"],
            starterCode: {
              python: py("def unique_paths(m, n):\n    # Your code here\n    pass\n\nprint(unique_paths(3, 7))  # 28"),
              cpp: cpp("int uniquePaths(int m, int n) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    cout << uniquePaths(3, 7);\n    return 0;\n}"),
              java: java("    public static int uniquePaths(int m, int n) {\n        // Your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(uniquePaths(3, 7));\n    }"),
            },
            xpReward: 15,
          },
        ],
      },
    ],
  },

  // ============================================================
  // 8. SORTING & SEARCHING
  // ============================================================
  {
    id: "sorting",
    title: "Sorting & Searching",
    description: "Sorting algorithms, binary search variations, and search-based problems.",
    subtopics: [
      {
        id: "sorting-algos",
        title: "Sorting Algorithms",
        description: "Implement and apply classic sorting algorithms.",
        problems: [
          {
            id: "sort-an-array",
            title: "Sort an Array (Merge Sort)",
            difficulty: "Medium",
            description: "Given an array of integers `nums`, sort the array in ascending order using merge sort and return it.",
            examples: [
              { input: "nums = [5,2,3,1]", output: "[1,2,3,5]" },
            ],
            constraints: ["1 <= nums.length <= 5 * 10^4"],
            starterCode: {
              python: py("def sort_array(nums):\n    # Implement merge sort\n    pass\n\nprint(sort_array([5,2,3,1]))  # [1,2,3,5]"),
              cpp: cpp("vector<int> sortArray(vector<int>& nums) {\n    // Merge sort\n    return nums;\n}\n\nint main() {\n    vector<int> n = {5, 2, 3, 1};\n    auto r = sortArray(n);\n    for (auto x : r) cout << x << \" \";\n    return 0;\n}"),
              java: java("    public static int[] sortArray(int[] nums) {\n        // Merge sort\n        return nums;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(Arrays.toString(sortArray(new int[]{5, 2, 3, 1})));\n    }"),
            },
            xpReward: 15,
          },
          {
            id: "binary-search",
            title: "Binary Search",
            difficulty: "Easy",
            description: "Given a sorted array of integers `nums` and a target value, return the index if found, else return -1. Must be O(log n).",
            examples: [
              { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" },
              { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1" },
            ],
            constraints: ["1 <= nums.length <= 10^4", "All integers are unique"],
            starterCode: {
              python: py("def binary_search(nums, target):\n    # Your code here\n    pass\n\nprint(binary_search([-1,0,3,5,9,12], 9))  # 4"),
              cpp: cpp("int search(vector<int>& nums, int target) {\n    // Your code here\n    return -1;\n}\n\nint main() {\n    vector<int> n = {-1, 0, 3, 5, 9, 12};\n    cout << search(n, 9);\n    return 0;\n}"),
              java: java("    public static int search(int[] nums, int target) {\n        // Your code here\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(search(new int[]{-1, 0, 3, 5, 9, 12}, 9));\n    }"),
            },
            xpReward: 10,
          },
          {
            id: "search-rotated-sorted",
            title: "Search in Rotated Sorted Array",
            difficulty: "Medium",
            description: "Given a rotated sorted array `nums` and a `target`, return its index or -1 if not found. Must be O(log n).",
            examples: [
              { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" },
            ],
            constraints: ["1 <= nums.length <= 5000"],
            starterCode: {
              python: py("def search(nums, target):\n    # Modified binary search\n    pass\n\nprint(search([4,5,6,7,0,1,2], 0))  # 4"),
              cpp: cpp("int search(vector<int>& nums, int target) {\n    // Your code here\n    return -1;\n}\n\nint main() {\n    vector<int> n = {4, 5, 6, 7, 0, 1, 2};\n    cout << search(n, 0);\n    return 0;\n}"),
              java: java("    public static int search(int[] nums, int target) {\n        // Your code here\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(search(new int[]{4, 5, 6, 7, 0, 1, 2}, 0));\n    }"),
            },
            xpReward: 15,
          },
        ],
      },
    ],
  },

  // ============================================================
  // 9. HEAPS / PRIORITY QUEUES
  // ============================================================
  {
    id: "heaps",
    title: "Heaps",
    description: "Min-heaps, max-heaps, priority queues — kth element, median, and scheduling problems.",
    subtopics: [
      {
        id: "heap-problems",
        title: "Heap Problems",
        description: "Classic heap and priority queue problems.",
        problems: [
          {
            id: "kth-largest",
            title: "Kth Largest Element in an Array",
            difficulty: "Medium",
            description: "Given an integer array `nums` and an integer `k`, return the kth largest element. Note that it is the kth largest element in sorted order, not the kth distinct element.",
            examples: [
              { input: "nums = [3,2,1,5,6,4], k = 2", output: "5" },
              { input: "nums = [3,2,3,1,2,4,5,5,6], k = 4", output: "4" },
            ],
            constraints: ["1 <= k <= nums.length <= 10^5"],
            starterCode: {
              python: py("import heapq\n\ndef find_kth_largest(nums, k):\n    # Your code here\n    pass\n\nprint(find_kth_largest([3,2,1,5,6,4], 2))  # 5"),
              cpp: cpp("int findKthLargest(vector<int>& nums, int k) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    vector<int> n = {3, 2, 1, 5, 6, 4};\n    cout << findKthLargest(n, 2);\n    return 0;\n}"),
              java: java("    public static int findKthLargest(int[] nums, int k) {\n        // Your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(findKthLargest(new int[]{3, 2, 1, 5, 6, 4}, 2));\n    }"),
            },
            xpReward: 15,
          },
          {
            id: "merge-k-sorted",
            title: "Merge K Sorted Lists",
            difficulty: "Hard",
            description: "You are given an array of `k` linked-lists, each sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
            examples: [
              { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" },
            ],
            constraints: ["k == lists.length", "0 <= k <= 10^4"],
            starterCode: {
              python: py("import heapq\n\nclass ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef merge_k_lists(lists):\n    # Use min-heap\n    pass\n\nprint('Implement mergeKLists')"),
              cpp: cpp("struct ListNode {\n    int val;\n    ListNode* next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nListNode* mergeKLists(vector<ListNode*>& lists) {\n    // Your code here\n    return nullptr;\n}\n\nint main() {\n    cout << \"Implement mergeKLists\" << endl;\n    return 0;\n}"),
              java: java("    static class ListNode {\n        int val;\n        ListNode next;\n        ListNode(int x) {\n            val = x;\n        }\n    }\n\n    public static ListNode mergeKLists(ListNode[] lists) {\n        // Your code here\n        return null;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Implement mergeKLists\");\n    }"),
            },
            xpReward: 20,
          },
          {
            id: "find-median-stream",
            title: "Find Median from Data Stream",
            difficulty: "Hard",
            description: "Design a data structure that supports adding integers and finding the median of all elements added so far.",
            examples: [
              { input: "addNum(1), addNum(2), findMedian(), addNum(3), findMedian()", output: "1.5, 2.0" },
            ],
            constraints: ["-10^5 <= num <= 10^5", "At most 5*10^4 calls"],
            starterCode: {
              python: py("import heapq\n\nclass MedianFinder:\n    def __init__(self):\n        # Two heaps\n        pass\n\n    def addNum(self, num):\n        pass\n\n    def findMedian(self):\n        pass\n\nmf = MedianFinder()\nmf.addNum(1); mf.addNum(2)\nprint(mf.findMedian())  # 1.5\nmf.addNum(3)\nprint(mf.findMedian())  # 2.0"),
              cpp: cpp("class MedianFinder {\npublic:\n    void addNum(int num) {\n        // Your code here\n    }\n\n    double findMedian() {\n        // Your code here\n        return 0.0;\n    }\n};\n\nint main() {\n    MedianFinder mf;\n    mf.addNum(1);\n    mf.addNum(2);\n    cout << mf.findMedian() << endl;\n    return 0;\n}"),
              java: java("    private PriorityQueue<Integer> small = new PriorityQueue<>(Collections.reverseOrder());\n    private PriorityQueue<Integer> large = new PriorityQueue<>();\n\n    public void addNum(int num) {\n        // Your code here\n    }\n\n    public double findMedian() {\n        // Your code here\n        return 0.0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Implement MedianFinder\");\n    }"),
            },
            xpReward: 20,
          },
        ],
      },
    ],
  },

  // ============================================================
  // 10. BACKTRACKING
  // ============================================================
  {
    id: "backtracking",
    title: "Backtracking",
    description: "Explore all possibilities with pruning — permutations, combinations, N-Queens, and Sudoku.",
    subtopics: [
      {
        id: "backtracking-problems",
        title: "Backtracking Problems",
        description: "Classic backtracking problems using recursion and pruning.",
        problems: [
          {
            id: "subsets",
            title: "Subsets",
            difficulty: "Medium",
            description: "Given an integer array `nums` of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets.",
            examples: [
              { input: "nums = [1,2,3]", output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]" },
            ],
            constraints: ["1 <= nums.length <= 10"],
            starterCode: {
              python: py("def subsets(nums):\n    # Backtracking\n    pass\n\nprint(subsets([1,2,3]))"),
              cpp: cpp("vector<vector<int>> subsets(vector<int>& nums) {\n    // Your code here\n    return {};\n}\n\nint main() {\n    vector<int> n = {1, 2, 3};\n    auto r = subsets(n);\n    for (auto& s : r) {\n        for (auto x : s) cout << x << \" \";\n        cout << endl;\n    }\n    return 0;\n}"),
              java: java("    public static List<List<Integer>> subsets(int[] nums) {\n        // Your code here\n        return new ArrayList<>();\n    }\n\n    public static void main(String[] args) {\n        System.out.println(subsets(new int[]{1, 2, 3}));\n    }"),
            },
            xpReward: 15,
          },
          {
            id: "permutations",
            title: "Permutations",
            difficulty: "Medium",
            description: "Given an array `nums` of distinct integers, return all the possible permutations.",
            examples: [
              { input: "nums = [1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" },
            ],
            constraints: ["1 <= nums.length <= 6"],
            starterCode: {
              python: py("def permute(nums):\n    # Backtracking\n    pass\n\nprint(permute([1,2,3]))"),
              cpp: cpp("vector<vector<int>> permute(vector<int>& nums) {\n    // Your code here\n    return {};\n}\n\nint main() {\n    vector<int> n = {1, 2, 3};\n    auto r = permute(n);\n    for (auto& p : r) {\n        for (auto x : p) cout << x << \" \";\n        cout << endl;\n    }\n    return 0;\n}"),
              java: java("    public static List<List<Integer>> permute(int[] nums) {\n        // Your code here\n        return new ArrayList<>();\n    }\n\n    public static void main(String[] args) {\n        System.out.println(permute(new int[]{1, 2, 3}));\n    }"),
            },
            xpReward: 15,
          },
          {
            id: "combination-sum",
            title: "Combination Sum",
            difficulty: "Medium",
            description: "Given an array of distinct integers `candidates` and a target integer `target`, return a list of all unique combinations of candidates where the chosen numbers sum to target. The same number may be chosen unlimited times.",
            examples: [
              { input: "candidates = [2,3,6,7], target = 7", output: "[[2,2,3],[7]]" },
            ],
            constraints: ["1 <= candidates.length <= 30", "2 <= candidates[i] <= 40"],
            starterCode: {
              python: py("def combination_sum(candidates, target):\n    # Backtracking\n    pass\n\nprint(combination_sum([2,3,6,7], 7))"),
              cpp: cpp("vector<vector<int>> combinationSum(vector<int>& candidates, int target) {\n    // Your code here\n    return {};\n}\n\nint main() {\n    vector<int> c = {2, 3, 6, 7};\n    auto r = combinationSum(c, 7);\n    for (auto& v : r) {\n        for (auto x : v) cout << x << \" \";\n        cout << endl;\n    }\n    return 0;\n}"),
              java: java("    public static List<List<Integer>> combinationSum(int[] candidates, int target) {\n        // Your code here\n        return new ArrayList<>();\n    }\n\n    public static void main(String[] args) {\n        System.out.println(combinationSum(new int[]{2, 3, 6, 7}, 7));\n    }"),
            },
            xpReward: 15,
          },
          {
            id: "word-search",
            title: "Word Search",
            difficulty: "Medium",
            description: "Given an m x n grid of characters `board` and a string `word`, return `true` if `word` exists in the grid. The word can be constructed from letters of sequentially adjacent cells (horizontally or vertically).",
            examples: [
              { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: "true" },
            ],
            constraints: ["m == board.length", "n == board[i].length", "1 <= word.length <= 15"],
            starterCode: {
              python: py("def exist(board, word):\n    # Backtracking on grid\n    pass\n\nboard = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']]\nprint(exist(board, 'ABCCED'))  # True"),
              cpp: cpp("bool exist(vector<vector<char>>& board, string word) {\n    // Your code here\n    return false;\n}\n\nint main() {\n    cout << \"Implement word search\" << endl;\n    return 0;\n}"),
              java: java("    public static boolean exist(char[][] board, String word) {\n        // Your code here\n        return false;\n    }\n\n    public static void main(String[] args) {\n        char[][] board = {{'A','B','C','E'}, {'S','F','C','S'}, {'A','D','E','E'}};\n        System.out.println(exist(board, \"ABCCED\"));\n    }"),
            },
            xpReward: 15,
          },
        ],
      },
    ],
  },

  // ============================================================
  // 11. GREEDY ALGORITHMS
  // ============================================================
  {
    id: "greedy",
    title: "Greedy Algorithms",
    description: "Make locally optimal choices — interval scheduling, jump game, and activity selection.",
    subtopics: [
      {
        id: "greedy-problems",
        title: "Greedy Problems",
        description: "Classic greedy algorithm problems.",
        problems: [
          {
            id: "jump-game",
            title: "Jump Game",
            difficulty: "Medium",
            description: "Given an integer array `nums` where each element represents your maximum jump length at that position, return `true` if you can reach the last index.",
            examples: [
              { input: "nums = [2,3,1,1,4]", output: "true" },
              { input: "nums = [3,2,1,0,4]", output: "false" },
            ],
            constraints: ["1 <= nums.length <= 10^4"],
            starterCode: {
              python: py("def can_jump(nums):\n    # Greedy approach\n    pass\n\nprint(can_jump([2,3,1,1,4]))  # True\nprint(can_jump([3,2,1,0,4]))  # False"),
              cpp: cpp("bool canJump(vector<int>& nums) {\n    // Your code here\n    return false;\n}\n\nint main() {\n    vector<int> n = {2, 3, 1, 1, 4};\n    cout << (canJump(n) ? \"true\" : \"false\");\n    return 0;\n}"),
              java: java("    public static boolean canJump(int[] nums) {\n        // Your code here\n        return false;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(canJump(new int[]{2, 3, 1, 1, 4}));\n    }"),
            },
            xpReward: 15,
          },
          {
            id: "merge-intervals",
            title: "Merge Intervals",
            difficulty: "Medium",
            description: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.",
            examples: [
              { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]" },
            ],
            constraints: ["1 <= intervals.length <= 10^4"],
            starterCode: {
              python: py("def merge(intervals):\n    # Sort and merge\n    pass\n\nprint(merge([[1,3],[2,6],[8,10],[15,18]]))"),
              cpp: cpp("vector<vector<int>> merge(vector<vector<int>>& intervals) {\n    // Your code here\n    return {};\n}\n\nint main() {\n    vector<vector<int>> i = {{1,3}, {2,6}, {8,10}, {15,18}};\n    auto r = merge(i);\n    for (auto& v : r) cout << \"[\" << v[0] << \",\" << v[1] << \"] \";\n    return 0;\n}"),
              java: java("    public static int[][] merge(int[][] intervals) {\n        // Your code here\n        return new int[][]{};\n    }\n\n    public static void main(String[] args) {\n        System.out.println(Arrays.deepToString(merge(new int[][]{{1,3}, {2,6}, {8,10}, {15,18}})));\n    }"),
            },
            xpReward: 15,
          },
          {
            id: "non-overlapping-intervals",
            title: "Non-overlapping Intervals",
            difficulty: "Medium",
            description: "Given an array of intervals, return the minimum number of intervals you need to remove to make the rest non-overlapping.",
            examples: [
              { input: "intervals = [[1,2],[2,3],[3,4],[1,3]]", output: "1" },
            ],
            constraints: ["1 <= intervals.length <= 10^5"],
            starterCode: {
              python: py("def erase_overlap_intervals(intervals):\n    # Greedy - sort by end time\n    pass\n\nprint(erase_overlap_intervals([[1,2],[2,3],[3,4],[1,3]]))  # 1"),
              cpp: cpp("int eraseOverlapIntervals(vector<vector<int>>& intervals) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    vector<vector<int>> i = {{1,2}, {2,3}, {3,4}, {1,3}};\n    cout << eraseOverlapIntervals(i);\n    return 0;\n}"),
              java: java("    public static int eraseOverlapIntervals(int[][] intervals) {\n        // Your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(eraseOverlapIntervals(new int[][]{{1,2}, {2,3}, {3,4}, {1,3}}));\n    }"),
            },
            xpReward: 15,
          },
        ],
      },
    ],
  },

  // ============================================================
  // 12. BIT MANIPULATION (BONUS)
  // ============================================================
  {
    id: "bit-manipulation",
    title: "Bit Manipulation",
    description: "XOR tricks, bit shifts, counting bits, and power of two checks.",
    subtopics: [
      {
        id: "bit-problems",
        title: "Bit Manipulation Problems",
        description: "Classic bitwise operation problems.",
        problems: [
          {
            id: "single-number",
            title: "Single Number",
            difficulty: "Easy",
            description: "Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one. Must use O(1) extra space.",
            examples: [
              { input: "nums = [2,2,1]", output: "1" },
              { input: "nums = [4,1,2,1,2]", output: "4" },
            ],
            constraints: ["1 <= nums.length <= 3 * 10^4"],
            starterCode: {
              python: py("def single_number(nums):\n    # XOR all elements\n    pass\n\nprint(single_number([2,2,1]))    # 1\nprint(single_number([4,1,2,1,2]))  # 4"),
              cpp: cpp("int singleNumber(vector<int>& nums) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    vector<int> n = {4, 1, 2, 1, 2};\n    cout << singleNumber(n);\n    return 0;\n}"),
              java: java("    public static int singleNumber(int[] nums) {\n        // Your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(singleNumber(new int[]{4, 1, 2, 1, 2}));\n    }"),
            },
            xpReward: 10,
          },
          {
            id: "counting-bits",
            title: "Counting Bits",
            difficulty: "Easy",
            description: "Given an integer `n`, return an array `ans` of length `n + 1` such that for each `i` (0 <= i <= n), `ans[i]` is the number of 1's in the binary representation of `i`.",
            examples: [
              { input: "n = 5", output: "[0,1,1,2,1,2]" },
            ],
            constraints: ["0 <= n <= 10^5"],
            starterCode: {
              python: py("def count_bits(n):\n    # DP with bit manipulation\n    pass\n\nprint(count_bits(5))  # [0,1,1,2,1,2]"),
              cpp: cpp("vector<int> countBits(int n) {\n    // Your code here\n    return {};\n}\n\nint main() {\n    auto r = countBits(5);\n    for (auto x : r) cout << x << \" \";\n    return 0;\n}"),
              java: java("    public static int[] countBits(int n) {\n        // Your code here\n        return new int[]{};\n    }\n\n    public static void main(String[] args) {\n        System.out.println(Arrays.toString(countBits(5)));\n    }"),
            },
            xpReward: 10,
          },
          {
            id: "reverse-bits",
            title: "Reverse Bits",
            difficulty: "Easy",
            description: "Reverse bits of a given 32-bit unsigned integer.",
            examples: [
              { input: "n = 00000010100101000001111010011100", output: "964176192", explanation: "00111001011110000010100101000000" },
            ],
            constraints: ["Input is a 32-bit unsigned integer"],
            starterCode: {
              python: py("def reverse_bits(n):\n    # Reverse 32 bits\n    pass\n\nprint(reverse_bits(43261596))  # 964176192"),
              cpp: cpp("uint32_t reverseBits(uint32_t n) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    cout << reverseBits(43261596);\n    return 0;\n}"),
              java: java("    public static int reverseBits(int n) {\n        // Your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(reverseBits(43261596));\n    }"),
            },
            xpReward: 10,
          },
          {
            id: "missing-number-bit",
            title: "Missing Number",
            difficulty: "Easy",
            description: "Given an array `nums` containing `n` distinct numbers in the range [0, n], return the only number in the range that is missing. Solve using XOR.",
            examples: [
              { input: "nums = [3,0,1]", output: "2" },
              { input: "nums = [9,6,4,2,3,5,7,0,1]", output: "8" },
            ],
            constraints: ["n == nums.length", "0 <= nums[i] <= n"],
            starterCode: {
              python: py("def missing_number(nums):\n    # XOR approach\n    pass\n\nprint(missing_number([3,0,1]))  # 2"),
              cpp: cpp("int missingNumber(vector<int>& nums) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    vector<int> n = {3, 0, 1};\n    cout << missingNumber(n);\n    return 0;\n}"),
              java: java("    public static int missingNumber(int[] nums) {\n        // Your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(missingNumber(new int[]{3, 0, 1}));\n    }"),
            },
            xpReward: 10,
          },
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

// Mapping from DSA topic IDs to problem database topic tags
export const DSA_TOPIC_TO_DB_TOPICS: Record<string, string[]> = {
  arrays: ["Arrays", "Two Pointers", "Sliding Window", "Matrix"],
  hashing: ["Hash Table", "Hash Maps"],
  "linked-lists": ["Linked List", "Linked Lists"],
  "stacks-queues": ["Stack", "Queue", "Stacks", "Queues"],
  trees: ["Trees", "Binary Search Tree"],
  graphs: ["Graphs"],
  dp: ["Dynamic Programming"],
  "sorting-searching": ["Sorting", "Searching", "Binary Search"],
  heaps: ["Heap", "Heaps"],
  backtracking: ["Backtracking", "Recursion"],
  greedy: ["Greedy"],
  "bit-manipulation": ["Bit Manipulation"],
};
