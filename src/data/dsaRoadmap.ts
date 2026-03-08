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

export const DSA_ROADMAP: DSATopic[] = [
  {
    id: "arrays",
    title: "Arrays & Strings",
    icon: "📊",
    description: "Foundation of DSA — master array manipulation, two pointers, sliding window, and string operations.",
    subtopics: [
      {
        id: "array-basics",
        title: "Array Basics",
        description: "Fundamental array operations and traversal patterns.",
        problems: [
          {
            id: "two-sum",
            title: "Two Sum",
            difficulty: "Easy",
            description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
            examples: [
              { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
              { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
            ],
            constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "Only one valid answer exists."],
            starterCode: {
              python: "def two_sum(nums, target):\n    # Your code here\n    pass\n\n# Test\nprint(two_sum([2,7,11,15], 9))",
              cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    // Your code here\n    return {};\n}\n\nint main() {\n    vector<int> nums = {2,7,11,15};\n    auto res = twoSum(nums, 9);\n    cout << \"[\" << res[0] << \",\" << res[1] << \"]\";\n    return 0;\n}",
              java: "import java.util.*;\n\npublic class Solution {\n    public static int[] twoSum(int[] nums, int target) {\n        // Your code here\n        return new int[]{};\n    }\n    public static void main(String[] args) {\n        int[] res = twoSum(new int[]{2,7,11,15}, 9);\n        System.out.println(\"[\" + res[0] + \",\" + res[1] + \"]\");\n    }\n}",
            },
            xpReward: 10,
          },
          {
            id: "best-time-buy-sell",
            title: "Best Time to Buy and Sell Stock",
            difficulty: "Easy",
            description: "You are given an array `prices` where `prices[i]` is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy and a single day to sell. Return the maximum profit. If no profit possible, return 0.",
            examples: [
              { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy on day 2 (price=1) sell on day 5 (price=6), profit = 5." },
              { input: "prices = [7,6,4,3,1]", output: "0" },
            ],
            constraints: ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^4"],
            starterCode: {
              python: "def max_profit(prices):\n    # Your code here\n    pass\n\nprint(max_profit([7,1,5,3,6,4]))",
              cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint maxProfit(vector<int>& prices) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    vector<int> p = {7,1,5,3,6,4};\n    cout << maxProfit(p);\n}",
              java: "public class Solution {\n    public static int maxProfit(int[] prices) {\n        // Your code here\n        return 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(maxProfit(new int[]{7,1,5,3,6,4}));\n    }\n}",
            },
            xpReward: 10,
          },
          {
            id: "contains-duplicate",
            title: "Contains Duplicate",
            difficulty: "Easy",
            description: "Given an integer array `nums`, return true if any value appears at least twice in the array, and return false if every element is distinct.",
            examples: [
              { input: "nums = [1,2,3,1]", output: "true" },
              { input: "nums = [1,2,3,4]", output: "false" },
            ],
            constraints: ["1 <= nums.length <= 10^5", "-10^9 <= nums[i] <= 10^9"],
            starterCode: {
              python: "def contains_duplicate(nums):\n    # Your code here\n    pass\n\nprint(contains_duplicate([1,2,3,1]))",
              cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nbool containsDuplicate(vector<int>& nums) {\n    // Your code here\n    return false;\n}\n\nint main() {\n    vector<int> n = {1,2,3,1};\n    cout << (containsDuplicate(n) ? \"true\" : \"false\");\n}",
              java: "import java.util.*;\npublic class Solution {\n    public static boolean containsDuplicate(int[] nums) {\n        // Your code here\n        return false;\n    }\n    public static void main(String[] args) {\n        System.out.println(containsDuplicate(new int[]{1,2,3,1}));\n    }\n}",
            },
            xpReward: 10,
          },
          {
            id: "max-subarray",
            title: "Maximum Subarray (Kadane's)",
            difficulty: "Medium",
            description: "Given an integer array `nums`, find the subarray with the largest sum and return its sum.",
            examples: [
              { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
            ],
            constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
            starterCode: {
              python: "def max_subarray(nums):\n    # Your code here\n    pass\n\nprint(max_subarray([-2,1,-3,4,-1,2,1,-5,4]))",
              cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint maxSubArray(vector<int>& nums) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    vector<int> n = {-2,1,-3,4,-1,2,1,-5,4};\n    cout << maxSubArray(n);\n}",
              java: "public class Solution {\n    public static int maxSubArray(int[] nums) {\n        // Your code here\n        return 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(maxSubArray(new int[]{-2,1,-3,4,-1,2,1,-5,4}));\n    }\n}",
            },
            xpReward: 20,
          },
          {
            id: "product-except-self",
            title: "Product of Array Except Self",
            difficulty: "Medium",
            description: "Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`. You must solve it without using division and in O(n) time.",
            examples: [
              { input: "nums = [1,2,3,4]", output: "[24,12,8,6]" },
              { input: "nums = [-1,1,0,-3,3]", output: "[0,0,9,0,0]" },
            ],
            constraints: ["2 <= nums.length <= 10^5", "-30 <= nums[i] <= 30", "Product of any prefix/suffix fits in 32-bit integer"],
            starterCode: {
              python: "def product_except_self(nums):\n    # Your code here\n    pass\n\nprint(product_except_self([1,2,3,4]))",
              cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nvector<int> productExceptSelf(vector<int>& nums) {\n    // Your code here\n    return {};\n}\n\nint main() {\n    vector<int> n = {1,2,3,4};\n    auto r = productExceptSelf(n);\n    for(auto x:r) cout<<x<<\" \";\n}",
              java: "import java.util.*;\npublic class Solution {\n    public static int[] productExceptSelf(int[] nums) {\n        // Your code here\n        return new int[]{};\n    }\n    public static void main(String[] args) {\n        System.out.println(Arrays.toString(productExceptSelf(new int[]{1,2,3,4})));\n    }\n}",
            },
            xpReward: 20,
          },
        ],
      },
      {
        id: "two-pointers",
        title: "Two Pointers",
        description: "Efficient techniques using two pointer approach for sorted arrays and strings.",
        problems: [
          {
            id: "valid-palindrome",
            title: "Valid Palindrome",
            difficulty: "Easy",
            description: "Given a string `s`, return true if it is a palindrome considering only alphanumeric characters and ignoring cases.",
            examples: [
              { input: 's = "A man, a plan, a canal: Panama"', output: "true" },
              { input: 's = "race a car"', output: "false" },
            ],
            constraints: ["1 <= s.length <= 2 * 10^5", "s consists only of printable ASCII characters"],
            starterCode: {
              python: "def is_palindrome(s):\n    # Your code here\n    pass\n\nprint(is_palindrome('A man, a plan, a canal: Panama'))",
              cpp: "#include <iostream>\n#include <string>\nusing namespace std;\n\nbool isPalindrome(string s) {\n    // Your code here\n    return false;\n}\n\nint main() {\n    cout << (isPalindrome(\"A man, a plan, a canal: Panama\") ? \"true\" : \"false\");\n}",
              java: "public class Solution {\n    public static boolean isPalindrome(String s) {\n        // Your code here\n        return false;\n    }\n    public static void main(String[] args) {\n        System.out.println(isPalindrome(\"A man, a plan, a canal: Panama\"));\n    }\n}",
            },
            xpReward: 10,
          },
          {
            id: "three-sum",
            title: "3Sum",
            difficulty: "Medium",
            description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, j != k, and nums[i] + nums[j] + nums[k] == 0. The solution set must not contain duplicate triplets.",
            examples: [
              { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
            ],
            constraints: ["3 <= nums.length <= 3000", "-10^5 <= nums[i] <= 10^5"],
            starterCode: {
              python: "def three_sum(nums):\n    # Your code here\n    pass\n\nprint(three_sum([-1,0,1,2,-1,-4]))",
              cpp: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvector<vector<int>> threeSum(vector<int>& nums) {\n    // Your code here\n    return {};\n}\n\nint main() {\n    vector<int> n = {-1,0,1,2,-1,-4};\n    auto res = threeSum(n);\n    for(auto& t:res){cout<<\"[\";for(auto x:t)cout<<x<<\" \";cout<<\"]\\n\";}\n}",
              java: "import java.util.*;\npublic class Solution {\n    public static List<List<Integer>> threeSum(int[] nums) {\n        // Your code here\n        return new ArrayList<>();\n    }\n    public static void main(String[] args) {\n        System.out.println(threeSum(new int[]{-1,0,1,2,-1,-4}));\n    }\n}",
            },
            xpReward: 25,
          },
          {
            id: "container-with-most-water",
            title: "Container With Most Water",
            difficulty: "Medium",
            description: "Given n non-negative integers a1, a2, ..., an where each represents a point at coordinate (i, ai). Find two lines which together with the x-axis forms a container that holds the most water.",
            examples: [
              { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" },
            ],
            constraints: ["n == height.length", "2 <= n <= 10^5", "0 <= height[i] <= 10^4"],
            starterCode: {
              python: "def max_area(height):\n    # Your code here\n    pass\n\nprint(max_area([1,8,6,2,5,4,8,3,7]))",
              cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint maxArea(vector<int>& h) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    vector<int> h = {1,8,6,2,5,4,8,3,7};\n    cout << maxArea(h);\n}",
              java: "public class Solution {\n    public static int maxArea(int[] height) {\n        // Your code here\n        return 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(maxArea(new int[]{1,8,6,2,5,4,8,3,7}));\n    }\n}",
            },
            xpReward: 20,
          },
          {
            id: "trapping-rain-water",
            title: "Trapping Rain Water",
            difficulty: "Hard",
            description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
            examples: [
              { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" },
            ],
            constraints: ["n == height.length", "1 <= n <= 2 * 10^4", "0 <= height[i] <= 10^5"],
            starterCode: {
              python: "def trap(height):\n    # Your code here\n    pass\n\nprint(trap([0,1,0,2,1,0,1,3,2,1,2,1]))",
              cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint trap(vector<int>& h) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    vector<int> h = {0,1,0,2,1,0,1,3,2,1,2,1};\n    cout << trap(h);\n}",
              java: "public class Solution {\n    public static int trap(int[] height) {\n        // Your code here\n        return 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(trap(new int[]{0,1,0,2,1,0,1,3,2,1,2,1}));\n    }\n}",
            },
            xpReward: 35,
          },
        ],
      },
      {
        id: "sliding-window",
        title: "Sliding Window",
        description: "Optimize brute force with sliding window technique.",
        problems: [
          {
            id: "longest-substring-no-repeat",
            title: "Longest Substring Without Repeating Characters",
            difficulty: "Medium",
            description: "Given a string `s`, find the length of the longest substring without repeating characters.",
            examples: [
              { input: 's = "abcabcbb"', output: "3", explanation: "The answer is 'abc', with the length of 3." },
              { input: 's = "bbbbb"', output: "1" },
            ],
            constraints: ["0 <= s.length <= 5 * 10^4", "s consists of English letters, digits, symbols and spaces"],
            starterCode: {
              python: "def length_of_longest_substring(s):\n    # Your code here\n    pass\n\nprint(length_of_longest_substring('abcabcbb'))",
              cpp: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint lengthOfLongestSubstring(string s) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    cout << lengthOfLongestSubstring(\"abcabcbb\");\n}",
              java: "public class Solution {\n    public static int lengthOfLongestSubstring(String s) {\n        // Your code here\n        return 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(lengthOfLongestSubstring(\"abcabcbb\"));\n    }\n}",
            },
            xpReward: 20,
          },
          {
            id: "min-window-substring",
            title: "Minimum Window Substring",
            difficulty: "Hard",
            description: "Given two strings `s` and `t`, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window. If no such substring exists, return \"\".",
            examples: [
              { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"' },
            ],
            constraints: ["1 <= s.length, t.length <= 10^5", "s and t consist of uppercase and lowercase English letters"],
            starterCode: {
              python: "def min_window(s, t):\n    # Your code here\n    pass\n\nprint(min_window('ADOBECODEBANC', 'ABC'))",
              cpp: "#include <iostream>\n#include <string>\nusing namespace std;\n\nstring minWindow(string s, string t) {\n    // Your code here\n    return \"\";\n}\n\nint main() {\n    cout << minWindow(\"ADOBECODEBANC\", \"ABC\");\n}",
              java: "public class Solution {\n    public static String minWindow(String s, String t) {\n        // Your code here\n        return \"\";\n    }\n    public static void main(String[] args) {\n        System.out.println(minWindow(\"ADOBECODEBANC\", \"ABC\"));\n    }\n}",
            },
            xpReward: 35,
          },
        ],
      },
    ],
  },
  {
    id: "hashing",
    title: "Hashing & Hash Maps",
    icon: "🔑",
    description: "Master hash-based data structures for O(1) lookups — frequency counting, grouping, and caching.",
    subtopics: [
      {
        id: "hashmap-basics",
        title: "Hash Map Fundamentals",
        description: "Core hash map operations and patterns.",
        problems: [
          {
            id: "valid-anagram",
            title: "Valid Anagram",
            difficulty: "Easy",
            description: "Given two strings `s` and `t`, return true if `t` is an anagram of `s`, and false otherwise.",
            examples: [
              { input: 's = "anagram", t = "nagaram"', output: "true" },
              { input: 's = "rat", t = "car"', output: "false" },
            ],
            constraints: ["1 <= s.length, t.length <= 5 * 10^4"],
            starterCode: {
              python: "def is_anagram(s, t):\n    # Your code here\n    pass\n\nprint(is_anagram('anagram', 'nagaram'))",
              cpp: "#include <iostream>\n#include <string>\nusing namespace std;\n\nbool isAnagram(string s, string t) {\n    // Your code here\n    return false;\n}\n\nint main() {\n    cout << (isAnagram(\"anagram\", \"nagaram\") ? \"true\" : \"false\");\n}",
              java: "public class Solution {\n    public static boolean isAnagram(String s, String t) {\n        // Your code here\n        return false;\n    }\n    public static void main(String[] args) {\n        System.out.println(isAnagram(\"anagram\", \"nagaram\"));\n    }\n}",
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
            constraints: ["1 <= strs.length <= 10^4", "0 <= strs[i].length <= 100"],
            starterCode: {
              python: "def group_anagrams(strs):\n    # Your code here\n    pass\n\nprint(group_anagrams(['eat','tea','tan','ate','nat','bat']))",
              cpp: "#include <iostream>\n#include <vector>\n#include <string>\n#include <unordered_map>\n#include <algorithm>\nusing namespace std;\n\nvector<vector<string>> groupAnagrams(vector<string>& strs) {\n    // Your code here\n    return {};\n}\n\nint main() {\n    vector<string> s = {\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"};\n    auto res = groupAnagrams(s);\n    for(auto& g:res){for(auto& x:g)cout<<x<<\" \";cout<<endl;}\n}",
              java: "import java.util.*;\npublic class Solution {\n    public static List<List<String>> groupAnagrams(String[] strs) {\n        // Your code here\n        return new ArrayList<>();\n    }\n    public static void main(String[] args) {\n        System.out.println(groupAnagrams(new String[]{\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"}));\n    }\n}",
            },
            xpReward: 20,
          },
          {
            id: "top-k-frequent",
            title: "Top K Frequent Elements",
            difficulty: "Medium",
            description: "Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.",
            examples: [
              { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]" },
            ],
            constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4", "k is in range [1, number of unique elements]"],
            starterCode: {
              python: "def top_k_frequent(nums, k):\n    # Your code here\n    pass\n\nprint(top_k_frequent([1,1,1,2,2,3], 2))",
              cpp: "#include <iostream>\n#include <vector>\n#include <unordered_map>\n#include <algorithm>\nusing namespace std;\n\nvector<int> topKFrequent(vector<int>& nums, int k) {\n    // Your code here\n    return {};\n}\n\nint main() {\n    vector<int> n = {1,1,1,2,2,3};\n    auto r = topKFrequent(n, 2);\n    for(auto x:r) cout<<x<<\" \";\n}",
              java: "import java.util.*;\npublic class Solution {\n    public static int[] topKFrequent(int[] nums, int k) {\n        // Your code here\n        return new int[]{};\n    }\n    public static void main(String[] args) {\n        System.out.println(Arrays.toString(topKFrequent(new int[]{1,1,1,2,2,3}, 2)));\n    }\n}",
            },
            xpReward: 20,
          },
        ],
      },
    ],
  },
  {
    id: "linked-lists",
    title: "Linked Lists",
    icon: "🔗",
    description: "Pointer manipulation, reversal patterns, cycle detection, and merge operations.",
    subtopics: [
      {
        id: "ll-basics",
        title: "Linked List Basics",
        description: "Core linked list operations and traversal.",
        problems: [
          {
            id: "reverse-linked-list",
            title: "Reverse Linked List",
            difficulty: "Easy",
            description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
            examples: [
              { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
            ],
            constraints: ["0 <= Number of nodes <= 5000", "-5000 <= Node.val <= 5000"],
            starterCode: {
              python: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef reverse_list(head):\n    # Your code here\n    pass\n\n# Test\ndef build(arr):\n    if not arr: return None\n    h = ListNode(arr[0])\n    c = h\n    for v in arr[1:]:\n        c.next = ListNode(v)\n        c = c.next\n    return h\n\ndef to_list(h):\n    r = []\n    while h:\n        r.append(h.val)\n        h = h.next\n    return r\n\nprint(to_list(reverse_list(build([1,2,3,4,5]))))",
              cpp: "#include <iostream>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode* next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nListNode* reverseList(ListNode* head) {\n    // Your code here\n    return nullptr;\n}\n\nint main() {\n    // Build: 1->2->3->4->5\n    ListNode* h = new ListNode(1);\n    h->next = new ListNode(2);\n    h->next->next = new ListNode(3);\n    h->next->next->next = new ListNode(4);\n    h->next->next->next->next = new ListNode(5);\n    auto r = reverseList(h);\n    while(r){cout<<r->val<<\" \";r=r->next;}\n}",
              java: "public class Solution {\n    static class ListNode {\n        int val;\n        ListNode next;\n        ListNode(int v) { val = v; }\n    }\n    public static ListNode reverseList(ListNode head) {\n        // Your code here\n        return null;\n    }\n    public static void main(String[] args) {\n        ListNode h = new ListNode(1);\n        h.next = new ListNode(2);\n        h.next.next = new ListNode(3);\n        var r = reverseList(h);\n        while(r!=null){System.out.print(r.val+\" \");r=r.next;}\n    }\n}",
            },
            xpReward: 10,
          },
          {
            id: "merge-two-sorted",
            title: "Merge Two Sorted Lists",
            difficulty: "Easy",
            description: "Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the first two lists.",
            examples: [
              { input: "l1 = [1,2,4], l2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
            ],
            constraints: ["0 <= Number of nodes in each list <= 50", "-100 <= Node.val <= 100"],
            starterCode: {
              python: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef merge_two_lists(l1, l2):\n    # Your code here\n    pass\n\ndef build(arr):\n    if not arr: return None\n    h = ListNode(arr[0])\n    c = h\n    for v in arr[1:]:\n        c.next = ListNode(v)\n        c = c.next\n    return h\n\ndef to_list(h):\n    r = []\n    while h:\n        r.append(h.val)\n        h = h.next\n    return r\n\nprint(to_list(merge_two_lists(build([1,2,4]), build([1,3,4]))))",
              cpp: "#include <iostream>\nusing namespace std;\nstruct ListNode {\n    int val; ListNode* next;\n    ListNode(int x):val(x),next(nullptr){}\n};\nListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {\n    // Your code here\n    return nullptr;\n}\nint main() {\n    cout << \"Implement and test\";\n}",
              java: "public class Solution {\n    // Implement here\n    public static void main(String[] args) { System.out.println(\"Test\"); }\n}",
            },
            xpReward: 10,
          },
          {
            id: "linked-list-cycle",
            title: "Linked List Cycle",
            difficulty: "Easy",
            description: "Given head, determine if the linked list has a cycle in it. There is a cycle if some node can be reached again by continuously following the next pointer.",
            examples: [
              { input: "head = [3,2,0,-4], pos = 1", output: "true", explanation: "Tail connects to index 1." },
            ],
            constraints: ["0 <= Number of nodes <= 10^4"],
            starterCode: {
              python: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef has_cycle(head):\n    # Your code here (Floyd's algorithm)\n    pass\n\n# Test with no cycle\nh = ListNode(1)\nh.next = ListNode(2)\nh.next.next = ListNode(3)\nprint(has_cycle(h))  # False\n\n# Test with cycle\nh.next.next.next = h.next\nprint(has_cycle(h))  # True",
              cpp: "#include <iostream>\nusing namespace std;\nstruct ListNode { int val; ListNode* next; ListNode(int x):val(x),next(nullptr){} };\nbool hasCycle(ListNode* head) {\n    // Your code here\n    return false;\n}\nint main() { cout << \"Implement\"; }",
              java: "public class Solution {\n    public static boolean hasCycle(Object head) {\n        // Your code here\n        return false;\n    }\n    public static void main(String[] args) { System.out.println(\"Test\"); }\n}",
            },
            xpReward: 10,
          },
        ],
      },
    ],
  },
  {
    id: "stacks-queues",
    title: "Stacks & Queues",
    icon: "📚",
    description: "LIFO and FIFO patterns — monotonic stacks, expression evaluation, BFS with queues.",
    subtopics: [
      {
        id: "stack-basics",
        title: "Stack Problems",
        description: "Classic stack-based problems.",
        problems: [
          {
            id: "valid-parentheses",
            title: "Valid Parentheses",
            difficulty: "Easy",
            description: "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: open brackets are closed by the same type, and in correct order.",
            examples: [
              { input: 's = "()"', output: "true" },
              { input: 's = "([)]"', output: "false" },
              { input: 's = "{[]}"', output: "true" },
            ],
            constraints: ["1 <= s.length <= 10^4"],
            starterCode: {
              python: "def is_valid(s):\n    # Your code here\n    pass\n\nprint(is_valid('()'))\nprint(is_valid('{[]}'))\nprint(is_valid('([)]'))",
              cpp: "#include <iostream>\n#include <string>\n#include <stack>\nusing namespace std;\nbool isValid(string s) {\n    // Your code here\n    return false;\n}\nint main() {\n    cout << (isValid(\"()\") ? \"true\" : \"false\") << endl;\n    cout << (isValid(\"{[]}\") ? \"true\" : \"false\") << endl;\n}",
              java: "import java.util.*;\npublic class Solution {\n    public static boolean isValid(String s) {\n        // Your code here\n        return false;\n    }\n    public static void main(String[] args) {\n        System.out.println(isValid(\"()\"));\n        System.out.println(isValid(\"{[]}\"));\n    }\n}",
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
            constraints: ["Methods pop, top, getMin will always be called on non-empty stacks", "-2^31 <= val <= 2^31 - 1"],
            starterCode: {
              python: "class MinStack:\n    def __init__(self):\n        # Your code here\n        pass\n    \n    def push(self, val):\n        pass\n    \n    def pop(self):\n        pass\n    \n    def top(self):\n        pass\n    \n    def getMin(self):\n        pass\n\ns = MinStack()\ns.push(-2)\ns.push(0)\ns.push(-3)\nprint(s.getMin())  # -3\ns.pop()\nprint(s.top())     # 0\nprint(s.getMin())  # -2",
              cpp: "#include <iostream>\n#include <stack>\nusing namespace std;\nclass MinStack {\npublic:\n    // Your code here\n    void push(int val) {}\n    void pop() {}\n    int top() { return 0; }\n    int getMin() { return 0; }\n};\nint main() {\n    MinStack s;\n    s.push(-2); s.push(0); s.push(-3);\n    cout << s.getMin() << endl;\n    s.pop();\n    cout << s.top() << endl;\n    cout << s.getMin() << endl;\n}",
              java: "import java.util.*;\npublic class Solution {\n    // Implement MinStack\n    public static void main(String[] args) { System.out.println(\"Test\"); }\n}",
            },
            xpReward: 20,
          },
          {
            id: "daily-temperatures",
            title: "Daily Temperatures",
            difficulty: "Medium",
            description: "Given an array of integers `temperatures`, return an array such that `answer[i]` is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep `answer[i] == 0`.",
            examples: [
              { input: "temperatures = [73,74,75,71,69,72,76,73]", output: "[1,1,4,2,1,1,0,0]" },
            ],
            constraints: ["1 <= temperatures.length <= 10^5", "30 <= temperatures[i] <= 100"],
            starterCode: {
              python: "def daily_temperatures(temps):\n    # Your code here (monotonic stack)\n    pass\n\nprint(daily_temperatures([73,74,75,71,69,72,76,73]))",
              cpp: "#include <iostream>\n#include <vector>\n#include <stack>\nusing namespace std;\nvector<int> dailyTemperatures(vector<int>& t) {\n    // Your code here\n    return {};\n}\nint main() {\n    vector<int> t = {73,74,75,71,69,72,76,73};\n    auto r = dailyTemperatures(t);\n    for(auto x:r) cout<<x<<\" \";\n}",
              java: "import java.util.*;\npublic class Solution {\n    public static int[] dailyTemperatures(int[] t) {\n        // Your code here\n        return new int[]{};\n    }\n    public static void main(String[] args) {\n        System.out.println(Arrays.toString(dailyTemperatures(new int[]{73,74,75,71,69,72,76,73})));\n    }\n}",
            },
            xpReward: 20,
          },
        ],
      },
    ],
  },
  {
    id: "trees",
    title: "Trees & BST",
    icon: "🌳",
    description: "Binary trees, BST operations, tree traversals (DFS, BFS), and advanced tree algorithms.",
    subtopics: [
      {
        id: "tree-traversal",
        title: "Tree Traversal",
        description: "Inorder, preorder, postorder, and level-order traversals.",
        problems: [
          {
            id: "max-depth-binary-tree",
            title: "Maximum Depth of Binary Tree",
            difficulty: "Easy",
            description: "Given the root of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
            examples: [
              { input: "root = [3,9,20,null,null,15,7]", output: "3" },
            ],
            constraints: ["Number of nodes in the tree is [0, 10^4]"],
            starterCode: {
              python: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef max_depth(root):\n    # Your code here\n    pass\n\n# Test\nroot = TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))\nprint(max_depth(root))  # 3",
              cpp: "#include <iostream>\nusing namespace std;\nstruct TreeNode {\n    int val; TreeNode *left, *right;\n    TreeNode(int x):val(x),left(nullptr),right(nullptr){}\n};\nint maxDepth(TreeNode* root) {\n    // Your code here\n    return 0;\n}\nint main() {\n    auto root = new TreeNode(3);\n    root->left = new TreeNode(9);\n    root->right = new TreeNode(20);\n    cout << maxDepth(root);\n}",
              java: "public class Solution {\n    static class TreeNode { int val; TreeNode left,right; TreeNode(int v){val=v;} }\n    public static int maxDepth(TreeNode root) {\n        // Your code here\n        return 0;\n    }\n    public static void main(String[] args) {\n        TreeNode root = new TreeNode(3);\n        root.left = new TreeNode(9);\n        root.right = new TreeNode(20);\n        System.out.println(maxDepth(root));\n    }\n}",
            },
            xpReward: 10,
          },
          {
            id: "invert-binary-tree",
            title: "Invert Binary Tree",
            difficulty: "Easy",
            description: "Given the root of a binary tree, invert the tree (mirror it), and return its root.",
            examples: [
              { input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" },
            ],
            constraints: ["Number of nodes [0, 100]"],
            starterCode: {
              python: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef invert_tree(root):\n    # Your code here\n    pass\n\nroot = TreeNode(4, TreeNode(2, TreeNode(1), TreeNode(3)), TreeNode(7, TreeNode(6), TreeNode(9)))\nresult = invert_tree(root)\nprint(result.val if result else None)",
              cpp: "#include <iostream>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int x):val(x),left(nullptr),right(nullptr){} };\nTreeNode* invertTree(TreeNode* root) {\n    // Your code here\n    return nullptr;\n}\nint main() { cout << \"Implement\"; }",
              java: "public class Solution {\n    public static Object invertTree(Object root) { return null; }\n    public static void main(String[] args) { System.out.println(\"Test\"); }\n}",
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
            constraints: ["Number of nodes [0, 2000]"],
            starterCode: {
              python: "from collections import deque\n\nclass TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef level_order(root):\n    # Your code here\n    pass\n\nroot = TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))\nprint(level_order(root))",
              cpp: "#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int x):val(x),left(nullptr),right(nullptr){} };\nvector<vector<int>> levelOrder(TreeNode* root) {\n    // Your code here\n    return {};\n}\nint main() { cout << \"Implement\"; }",
              java: "import java.util.*;\npublic class Solution {\n    public static void main(String[] args) { System.out.println(\"Test\"); }\n}",
            },
            xpReward: 20,
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
            constraints: ["Number of nodes [1, 10^4]"],
            starterCode: {
              python: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef is_valid_bst(root):\n    # Your code here\n    pass\n\nroot = TreeNode(2, TreeNode(1), TreeNode(3))\nprint(is_valid_bst(root))  # True",
              cpp: "#include <iostream>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int x):val(x),left(nullptr),right(nullptr){} };\nbool isValidBST(TreeNode* root) { return false; }\nint main() { cout << \"Implement\"; }",
              java: "public class Solution {\n    public static void main(String[] args) { System.out.println(\"Test\"); }\n}",
            },
            xpReward: 20,
          },
        ],
      },
    ],
  },
  {
    id: "graphs",
    title: "Graphs",
    icon: "🕸️",
    description: "Graph representations, BFS, DFS, topological sort, shortest path algorithms.",
    subtopics: [
      {
        id: "graph-traversal",
        title: "Graph Traversal",
        description: "DFS and BFS on graphs, connected components.",
        problems: [
          {
            id: "number-of-islands",
            title: "Number of Islands",
            difficulty: "Medium",
            description: "Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
            examples: [
              { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', output: "3" },
            ],
            constraints: ["m == grid.length", "n == grid[i].length", "1 <= m, n <= 300"],
            starterCode: {
              python: "def num_islands(grid):\n    # Your code here\n    pass\n\ngrid = [\n    ['1','1','0','0','0'],\n    ['1','1','0','0','0'],\n    ['0','0','1','0','0'],\n    ['0','0','0','1','1']\n]\nprint(num_islands(grid))  # 3",
              cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\nint numIslands(vector<vector<char>>& grid) {\n    // Your code here\n    return 0;\n}\nint main() { cout << \"Implement\"; }",
              java: "public class Solution {\n    public static int numIslands(char[][] grid) { return 0; }\n    public static void main(String[] args) { System.out.println(\"Test\"); }\n}",
            },
            xpReward: 20,
          },
          {
            id: "clone-graph",
            title: "Clone Graph",
            difficulty: "Medium",
            description: "Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.",
            examples: [
              { input: "adjList = [[2,4],[1,3],[2,4],[1,3]]", output: "[[2,4],[1,3],[2,4],[1,3]]" },
            ],
            constraints: ["1 <= Number of nodes <= 100", "1 <= Node.val <= 100"],
            starterCode: {
              python: "class Node:\n    def __init__(self, val=0, neighbors=None):\n        self.val = val\n        self.neighbors = neighbors if neighbors else []\n\ndef clone_graph(node):\n    # Your code here\n    pass\n\nprint('Implement and test')",
              cpp: "#include <iostream>\nusing namespace std;\nint main() { cout << \"Implement\"; }",
              java: "public class Solution {\n    public static void main(String[] args) { System.out.println(\"Test\"); }\n}",
            },
            xpReward: 20,
          },
          {
            id: "course-schedule",
            title: "Course Schedule (Topological Sort)",
            difficulty: "Medium",
            description: "There are `numCourses` courses labeled from 0 to numCourses-1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi before course ai. Return true if you can finish all courses.",
            examples: [
              { input: "numCourses = 2, prerequisites = [[1,0]]", output: "true" },
              { input: "numCourses = 2, prerequisites = [[1,0],[0,1]]", output: "false" },
            ],
            constraints: ["1 <= numCourses <= 2000", "0 <= prerequisites.length <= 5000"],
            starterCode: {
              python: "def can_finish(numCourses, prerequisites):\n    # Your code here\n    pass\n\nprint(can_finish(2, [[1,0]]))  # True\nprint(can_finish(2, [[1,0],[0,1]]))  # False",
              cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\nbool canFinish(int n, vector<vector<int>>& pre) { return false; }\nint main() { cout << \"Implement\"; }",
              java: "public class Solution {\n    public static void main(String[] args) { System.out.println(\"Test\"); }\n}",
            },
            xpReward: 25,
          },
        ],
      },
    ],
  },
  {
    id: "dynamic-programming",
    title: "Dynamic Programming",
    icon: "🧩",
    description: "Master DP patterns — 1D, 2D, knapsack, LCS, LIS, and optimization problems.",
    subtopics: [
      {
        id: "dp-1d",
        title: "1D Dynamic Programming",
        description: "Single-dimension DP problems — climbing stairs, house robber, fibonacci patterns.",
        problems: [
          {
            id: "climbing-stairs",
            title: "Climbing Stairs",
            difficulty: "Easy",
            description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
            examples: [
              { input: "n = 2", output: "2", explanation: "1+1 or 2" },
              { input: "n = 3", output: "3", explanation: "1+1+1, 1+2, 2+1" },
            ],
            constraints: ["1 <= n <= 45"],
            starterCode: {
              python: "def climb_stairs(n):\n    # Your code here\n    pass\n\nprint(climb_stairs(2))  # 2\nprint(climb_stairs(3))  # 3\nprint(climb_stairs(5))  # 8",
              cpp: "#include <iostream>\nusing namespace std;\nint climbStairs(int n) { return 0; }\nint main() { cout << climbStairs(5); }",
              java: "public class Solution {\n    public static int climbStairs(int n) { return 0; }\n    public static void main(String[] args) { System.out.println(climbStairs(5)); }\n}",
            },
            xpReward: 10,
          },
          {
            id: "house-robber",
            title: "House Robber",
            difficulty: "Medium",
            description: "You are a professional robber. Each house has a certain amount of money. Adjacent houses have security systems connected — if two adjacent houses are broken into the same night, police will be contacted. Given an array representing the amount at each house, determine the maximum amount you can rob without alerting police.",
            examples: [
              { input: "nums = [1,2,3,1]", output: "4", explanation: "Rob house 1 (1) and house 3 (3) = 4" },
              { input: "nums = [2,7,9,3,1]", output: "12" },
            ],
            constraints: ["1 <= nums.length <= 100", "0 <= nums[i] <= 400"],
            starterCode: {
              python: "def rob(nums):\n    # Your code here\n    pass\n\nprint(rob([1,2,3,1]))    # 4\nprint(rob([2,7,9,3,1]))  # 12",
              cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\nint rob(vector<int>& nums) { return 0; }\nint main() { vector<int> n={2,7,9,3,1}; cout<<rob(n); }",
              java: "public class Solution {\n    public static int rob(int[] nums) { return 0; }\n    public static void main(String[] args) { System.out.println(rob(new int[]{2,7,9,3,1})); }\n}",
            },
            xpReward: 20,
          },
          {
            id: "coin-change",
            title: "Coin Change",
            difficulty: "Medium",
            description: "You are given coins of different denominations and a total amount. Return the fewest number of coins needed to make up that amount. If that amount cannot be made up, return -1.",
            examples: [
              { input: "coins = [1,5,11], amount = 11", output: "1" },
              { input: "coins = [2], amount = 3", output: "-1" },
            ],
            constraints: ["1 <= coins.length <= 12", "1 <= coins[i] <= 2^31 - 1", "0 <= amount <= 10^4"],
            starterCode: {
              python: "def coin_change(coins, amount):\n    # Your code here\n    pass\n\nprint(coin_change([1,5,11], 11))  # 1\nprint(coin_change([2], 3))         # -1",
              cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\nint coinChange(vector<int>& c, int a) { return -1; }\nint main() { vector<int> c={1,5,11}; cout<<coinChange(c,11); }",
              java: "public class Solution {\n    public static int coinChange(int[] coins, int amount) { return -1; }\n    public static void main(String[] args) { System.out.println(coinChange(new int[]{1,5,11}, 11)); }\n}",
            },
            xpReward: 20,
          },
          {
            id: "longest-increasing-subseq",
            title: "Longest Increasing Subsequence",
            difficulty: "Medium",
            description: "Given an integer array `nums`, return the length of the longest strictly increasing subsequence.",
            examples: [
              { input: "nums = [10,9,2,5,3,7,101,18]", output: "4", explanation: "[2,3,7,101]" },
            ],
            constraints: ["1 <= nums.length <= 2500"],
            starterCode: {
              python: "def length_of_lis(nums):\n    # Your code here\n    pass\n\nprint(length_of_lis([10,9,2,5,3,7,101,18]))  # 4",
              cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\nint lengthOfLIS(vector<int>& nums) { return 0; }\nint main() { vector<int> n={10,9,2,5,3,7,101,18}; cout<<lengthOfLIS(n); }",
              java: "public class Solution {\n    public static int lengthOfLIS(int[] nums) { return 0; }\n    public static void main(String[] args) { System.out.println(lengthOfLIS(new int[]{10,9,2,5,3,7,101,18})); }\n}",
            },
            xpReward: 25,
          },
        ],
      },
      {
        id: "dp-2d",
        title: "2D Dynamic Programming",
        description: "Grid-based DP and classic 2D DP problems.",
        problems: [
          {
            id: "unique-paths",
            title: "Unique Paths",
            difficulty: "Medium",
            description: "A robot is located at the top-left corner of a m x n grid. The robot can only move either down or right at any point in time. How many possible unique paths are there to reach the bottom-right corner?",
            examples: [
              { input: "m = 3, n = 7", output: "28" },
              { input: "m = 3, n = 2", output: "3" },
            ],
            constraints: ["1 <= m, n <= 100"],
            starterCode: {
              python: "def unique_paths(m, n):\n    # Your code here\n    pass\n\nprint(unique_paths(3, 7))  # 28",
              cpp: "#include <iostream>\nusing namespace std;\nint uniquePaths(int m, int n) { return 0; }\nint main() { cout << uniquePaths(3,7); }",
              java: "public class Solution {\n    public static int uniquePaths(int m, int n) { return 0; }\n    public static void main(String[] args) { System.out.println(uniquePaths(3,7)); }\n}",
            },
            xpReward: 20,
          },
          {
            id: "longest-common-subseq",
            title: "Longest Common Subsequence",
            difficulty: "Medium",
            description: "Given two strings `text1` and `text2`, return the length of their longest common subsequence. If there is no common subsequence, return 0.",
            examples: [
              { input: 'text1 = "abcde", text2 = "ace"', output: "3", explanation: "The longest common subsequence is 'ace'." },
            ],
            constraints: ["1 <= text1.length, text2.length <= 1000"],
            starterCode: {
              python: "def longest_common_subsequence(text1, text2):\n    # Your code here\n    pass\n\nprint(longest_common_subsequence('abcde', 'ace'))  # 3",
              cpp: "#include <iostream>\n#include <string>\nusing namespace std;\nint longestCommonSubsequence(string t1, string t2) { return 0; }\nint main() { cout << longestCommonSubsequence(\"abcde\",\"ace\"); }",
              java: "public class Solution {\n    public static int longestCommonSubsequence(String t1, String t2) { return 0; }\n    public static void main(String[] args) { System.out.println(longestCommonSubsequence(\"abcde\",\"ace\")); }\n}",
            },
            xpReward: 25,
          },
        ],
      },
    ],
  },
  {
    id: "sorting-searching",
    title: "Sorting & Searching",
    icon: "🔍",
    description: "Binary search patterns, sorting algorithms, and divide-and-conquer strategies.",
    subtopics: [
      {
        id: "binary-search",
        title: "Binary Search",
        description: "Classic binary search and its variations.",
        problems: [
          {
            id: "binary-search-basic",
            title: "Binary Search",
            difficulty: "Easy",
            description: "Given a sorted array of integers `nums` and a target value, return the index if found, else return -1. You must write an algorithm with O(log n) runtime.",
            examples: [
              { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" },
              { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1" },
            ],
            constraints: ["1 <= nums.length <= 10^4", "All integers in nums are unique", "nums is sorted in ascending order"],
            starterCode: {
              python: "def binary_search(nums, target):\n    # Your code here\n    pass\n\nprint(binary_search([-1,0,3,5,9,12], 9))  # 4",
              cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\nint search(vector<int>& nums, int target) { return -1; }\nint main() { vector<int> n={-1,0,3,5,9,12}; cout<<search(n,9); }",
              java: "public class Solution {\n    public static int search(int[] nums, int target) { return -1; }\n    public static void main(String[] args) { System.out.println(search(new int[]{-1,0,3,5,9,12}, 9)); }\n}",
            },
            xpReward: 10,
          },
          {
            id: "search-rotated-sorted",
            title: "Search in Rotated Sorted Array",
            difficulty: "Medium",
            description: "Given a rotated sorted array and a target, return the index of target or -1. You must write an algorithm with O(log n) runtime.",
            examples: [
              { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" },
            ],
            constraints: ["1 <= nums.length <= 5000", "All values are unique"],
            starterCode: {
              python: "def search(nums, target):\n    # Your code here\n    pass\n\nprint(search([4,5,6,7,0,1,2], 0))  # 4",
              cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\nint search(vector<int>& nums, int target) { return -1; }\nint main() { vector<int> n={4,5,6,7,0,1,2}; cout<<search(n,0); }",
              java: "public class Solution {\n    public static int search(int[] nums, int target) { return -1; }\n    public static void main(String[] args) { System.out.println(search(new int[]{4,5,6,7,0,1,2}, 0)); }\n}",
            },
            xpReward: 25,
          },
          {
            id: "find-min-rotated",
            title: "Find Minimum in Rotated Sorted Array",
            difficulty: "Medium",
            description: "Given a sorted rotated array of unique elements, find the minimum element. You must write an algorithm that runs in O(log n) time.",
            examples: [
              { input: "nums = [3,4,5,1,2]", output: "1" },
            ],
            constraints: ["n == nums.length", "1 <= n <= 5000", "All integers are unique"],
            starterCode: {
              python: "def find_min(nums):\n    # Your code here\n    pass\n\nprint(find_min([3,4,5,1,2]))  # 1",
              cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\nint findMin(vector<int>& nums) { return 0; }\nint main() { vector<int> n={3,4,5,1,2}; cout<<findMin(n); }",
              java: "public class Solution {\n    public static int findMin(int[] nums) { return 0; }\n    public static void main(String[] args) { System.out.println(findMin(new int[]{3,4,5,1,2})); }\n}",
            },
            xpReward: 20,
          },
        ],
      },
    ],
  },
  {
    id: "heaps",
    title: "Heaps & Priority Queues",
    icon: "⛰️",
    description: "Min/max heaps, k-th element problems, and stream processing.",
    subtopics: [
      {
        id: "heap-problems",
        title: "Heap Problems",
        description: "Classic heap-based problems.",
        problems: [
          {
            id: "kth-largest",
            title: "Kth Largest Element in an Array",
            difficulty: "Medium",
            description: "Given an integer array `nums` and an integer `k`, return the kth largest element in the array. Note that it is the kth largest element in sorted order, not the kth distinct element.",
            examples: [
              { input: "nums = [3,2,1,5,6,4], k = 2", output: "5" },
            ],
            constraints: ["1 <= k <= nums.length <= 10^5"],
            starterCode: {
              python: "import heapq\n\ndef find_kth_largest(nums, k):\n    # Your code here\n    pass\n\nprint(find_kth_largest([3,2,1,5,6,4], 2))  # 5",
              cpp: "#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\nint findKthLargest(vector<int>& nums, int k) { return 0; }\nint main() { vector<int> n={3,2,1,5,6,4}; cout<<findKthLargest(n,2); }",
              java: "import java.util.*;\npublic class Solution {\n    public static int findKthLargest(int[] nums, int k) { return 0; }\n    public static void main(String[] args) { System.out.println(findKthLargest(new int[]{3,2,1,5,6,4}, 2)); }\n}",
            },
            xpReward: 20,
          },
          {
            id: "merge-k-sorted",
            title: "Merge K Sorted Lists",
            difficulty: "Hard",
            description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
            examples: [
              { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" },
            ],
            constraints: ["k == lists.length", "0 <= k <= 10^4", "0 <= lists[i].length <= 500"],
            starterCode: {
              python: "import heapq\n\nclass ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef merge_k_lists(lists):\n    # Your code here using min-heap\n    pass\n\nprint('Implement and test')",
              cpp: "#include <iostream>\nusing namespace std;\nint main() { cout << \"Implement\"; }",
              java: "public class Solution {\n    public static void main(String[] args) { System.out.println(\"Test\"); }\n}",
            },
            xpReward: 35,
          },
        ],
      },
    ],
  },
  {
    id: "backtracking",
    title: "Backtracking & Recursion",
    icon: "🔄",
    description: "Generate permutations, combinations, subsets, and solve constraint satisfaction problems.",
    subtopics: [
      {
        id: "backtracking-problems",
        title: "Backtracking Problems",
        description: "Classic backtracking and recursion problems.",
        problems: [
          {
            id: "subsets",
            title: "Subsets",
            difficulty: "Medium",
            description: "Given an integer array `nums` of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets.",
            examples: [
              { input: "nums = [1,2,3]", output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]" },
            ],
            constraints: ["1 <= nums.length <= 10", "-10 <= nums[i] <= 10", "All elements are unique"],
            starterCode: {
              python: "def subsets(nums):\n    # Your code here\n    pass\n\nprint(subsets([1,2,3]))",
              cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\nvector<vector<int>> subsets(vector<int>& nums) { return {}; }\nint main() { vector<int> n={1,2,3}; auto r=subsets(n); for(auto& s:r){for(auto x:s)cout<<x;cout<<endl;} }",
              java: "import java.util.*;\npublic class Solution {\n    public static List<List<Integer>> subsets(int[] nums) { return new ArrayList<>(); }\n    public static void main(String[] args) { System.out.println(subsets(new int[]{1,2,3})); }\n}",
            },
            xpReward: 20,
          },
          {
            id: "permutations",
            title: "Permutations",
            difficulty: "Medium",
            description: "Given an array `nums` of distinct integers, return all possible permutations in any order.",
            examples: [
              { input: "nums = [1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" },
            ],
            constraints: ["1 <= nums.length <= 6", "-10 <= nums[i] <= 10", "All integers are unique"],
            starterCode: {
              python: "def permute(nums):\n    # Your code here\n    pass\n\nprint(permute([1,2,3]))",
              cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\nvector<vector<int>> permute(vector<int>& nums) { return {}; }\nint main() { vector<int> n={1,2,3}; auto r=permute(n); for(auto& p:r){for(auto x:p)cout<<x;cout<<endl;} }",
              java: "import java.util.*;\npublic class Solution {\n    public static List<List<Integer>> permute(int[] nums) { return new ArrayList<>(); }\n    public static void main(String[] args) { System.out.println(permute(new int[]{1,2,3})); }\n}",
            },
            xpReward: 20,
          },
          {
            id: "n-queens",
            title: "N-Queens",
            difficulty: "Hard",
            description: "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Given an integer n, return all distinct solutions.",
            examples: [
              { input: "n = 4", output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]' },
            ],
            constraints: ["1 <= n <= 9"],
            starterCode: {
              python: "def solve_n_queens(n):\n    # Your code here\n    pass\n\nresult = solve_n_queens(4)\nfor sol in (result or []):\n    for row in sol:\n        print(row)\n    print()",
              cpp: "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\nvector<vector<string>> solveNQueens(int n) { return {}; }\nint main() { auto r=solveNQueens(4); cout<<r.size()<<\" solutions\"; }",
              java: "import java.util.*;\npublic class Solution {\n    public static List<List<String>> solveNQueens(int n) { return new ArrayList<>(); }\n    public static void main(String[] args) { System.out.println(solveNQueens(4).size() + \" solutions\"); }\n}",
            },
            xpReward: 35,
          },
        ],
      },
    ],
  },
  {
    id: "greedy",
    title: "Greedy Algorithms",
    icon: "💰",
    description: "Make locally optimal choices for globally optimal solutions — interval scheduling, activity selection.",
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
            description: "You are given an integer array `nums`. You are initially positioned at the first index. Each element represents your maximum jump length at that position. Return true if you can reach the last index.",
            examples: [
              { input: "nums = [2,3,1,1,4]", output: "true" },
              { input: "nums = [3,2,1,0,4]", output: "false" },
            ],
            constraints: ["1 <= nums.length <= 10^4", "0 <= nums[i] <= 10^5"],
            starterCode: {
              python: "def can_jump(nums):\n    # Your code here\n    pass\n\nprint(can_jump([2,3,1,1,4]))  # True\nprint(can_jump([3,2,1,0,4]))  # False",
              cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\nbool canJump(vector<int>& nums) { return false; }\nint main() { vector<int> n={2,3,1,1,4}; cout<<(canJump(n)?\"true\":\"false\"); }",
              java: "public class Solution {\n    public static boolean canJump(int[] nums) { return false; }\n    public static void main(String[] args) { System.out.println(canJump(new int[]{2,3,1,1,4})); }\n}",
            },
            xpReward: 20,
          },
          {
            id: "merge-intervals",
            title: "Merge Intervals",
            difficulty: "Medium",
            description: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals and return an array of the non-overlapping intervals.",
            examples: [
              { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]" },
            ],
            constraints: ["1 <= intervals.length <= 10^4", "intervals[i].length == 2"],
            starterCode: {
              python: "def merge(intervals):\n    # Your code here\n    pass\n\nprint(merge([[1,3],[2,6],[8,10],[15,18]]))",
              cpp: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nvector<vector<int>> merge(vector<vector<int>>& iv) { return {}; }\nint main() { cout << \"Implement\"; }",
              java: "import java.util.*;\npublic class Solution {\n    public static int[][] merge(int[][] intervals) { return new int[][]{}; }\n    public static void main(String[] args) { System.out.println(Arrays.deepToString(merge(new int[][]{{1,3},{2,6},{8,10},{15,18}}))); }\n}",
            },
            xpReward: 20,
          },
        ],
      },
    ],
  },
  {
    id: "bit-manipulation",
    title: "Bit Manipulation",
    icon: "⚡",
    description: "XOR tricks, bit counting, masks, and power of two checks.",
    subtopics: [
      {
        id: "bit-problems",
        title: "Bit Manipulation Problems",
        description: "Essential bit manipulation techniques.",
        problems: [
          {
            id: "single-number",
            title: "Single Number",
            difficulty: "Easy",
            description: "Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one. You must implement a solution with O(1) extra space.",
            examples: [
              { input: "nums = [2,2,1]", output: "1" },
              { input: "nums = [4,1,2,1,2]", output: "4" },
            ],
            constraints: ["1 <= nums.length <= 3 * 10^4", "Each element appears twice except one"],
            starterCode: {
              python: "def single_number(nums):\n    # Your code here (XOR)\n    pass\n\nprint(single_number([4,1,2,1,2]))  # 4",
              cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\nint singleNumber(vector<int>& nums) { return 0; }\nint main() { vector<int> n={4,1,2,1,2}; cout<<singleNumber(n); }",
              java: "public class Solution {\n    public static int singleNumber(int[] nums) { return 0; }\n    public static void main(String[] args) { System.out.println(singleNumber(new int[]{4,1,2,1,2})); }\n}",
            },
            xpReward: 10,
          },
          {
            id: "counting-bits",
            title: "Counting Bits",
            difficulty: "Easy",
            description: "Given an integer `n`, return an array `ans` of length `n + 1` where `ans[i]` is the number of 1's in the binary representation of i.",
            examples: [
              { input: "n = 5", output: "[0,1,1,2,1,2]" },
            ],
            constraints: ["0 <= n <= 10^5"],
            starterCode: {
              python: "def count_bits(n):\n    # Your code here\n    pass\n\nprint(count_bits(5))  # [0,1,1,2,1,2]",
              cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\nvector<int> countBits(int n) { return {}; }\nint main() { auto r=countBits(5); for(auto x:r)cout<<x<<\" \"; }",
              java: "import java.util.*;\npublic class Solution {\n    public static int[] countBits(int n) { return new int[]{}; }\n    public static void main(String[] args) { System.out.println(Arrays.toString(countBits(5))); }\n}",
            },
            xpReward: 10,
          },
        ],
      },
    ],
  },
];

// Helper: get all problems across the entire roadmap
export function getAllDSAProblems(): (DSAProblem & { topicId: string; subtopicId: string })[] {
  const all: (DSAProblem & { topicId: string; subtopicId: string })[] = [];
  for (const topic of DSA_ROADMAP) {
    for (const sub of topic.subtopics) {
      for (const p of sub.problems) {
        all.push({ ...p, topicId: topic.id, subtopicId: sub.id });
      }
    }
  }
  return all;
}

export function getTotalProblems(): number {
  return getAllDSAProblems().length;
}
