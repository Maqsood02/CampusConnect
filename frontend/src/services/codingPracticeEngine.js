// Dynamic Coding Practice Auto-Generator Engine
// Generates challenges based on user requirements: Topic/Skill and Priority (High, Medium, Low)

export const TOPICS = [
  { id: 'arrays', label: 'Arrays & Hashing', icon: '📊' },
  { id: 'strings', label: 'Strings & Two Pointers', icon: '🔤' },
  { id: 'trees', label: 'Trees & Graphs', icon: '🌳' },
  { id: 'dp', label: 'Dynamic Programming', icon: '⚡' },
  { id: 'binary_search', label: 'Binary Search', icon: '🔍' },
  { id: 'sql', label: 'SQL & Database Queries', icon: '🗄️' },
  { id: 'system_design', label: 'System Design', icon: '🏛️' }
];

export const PRIORITIES = [
  { id: 'High', label: 'High Priority (Advanced / Hard)', badgeColor: 'rose', weight: 'Top Tier Product Companies' },
  { id: 'Medium', label: 'Medium Priority (Standard / Core)', badgeColor: 'amber', weight: 'Campus Recruitment Standard' },
  { id: 'Low', label: 'Low Priority (Foundational / Easy)', badgeColor: 'emerald', weight: 'Skill Foundation & Warmup' }
];

const QUESTION_BANK = {
  arrays: {
    High: [
      {
        title: 'Trapping Rain Water in Elevation Map',
        companies: ['Google', 'Amazon', 'Microsoft'],
        acceptance: '49.8%',
        description: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
        constraints: ['n == height.length', '1 <= n <= 2 * 10^4', '0 <= height[i] <= 10^5'],
        examples: [
          { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6', explanation: 'The 6 units of rain water are trapped between elevation bars.' },
          { input: 'height = [4,2,0,3,2,5]', output: '9', explanation: 'Trapped water volume is calculated across indices.' }
        ],
        templates: {
          python: `class Solution:\n    def trap(self, height: list[int]) -> int:\n        # Write your O(N) two-pointer solution here\n        left, right = 0, len(height) - 1\n        left_max, right_max = 0, 0\n        water = 0\n        while left < right:\n            if height[left] < height[right]:\n                if height[left] >= left_max:\n                    left_max = height[left]\n                else:\n                    water += left_max - height[left]\n                left += 1\n            else:\n                if height[right] >= right_max:\n                    right_max = height[right]\n                else:\n                    water += right_max - height[right]\n                right -= 1\n        return water`,
          javascript: `function trap(height) {\n  let left = 0, right = height.length - 1;\n  let leftMax = 0, rightMax = 0, water = 0;\n  while (left < right) {\n    if (height[left] < height[right]) {\n      if (height[left] >= leftMax) leftMax = height[left];\n      else water += leftMax - height[left];\n      left++;\n    } else {\n      if (height[right] >= rightMax) rightMax = height[right];\n      else water += rightMax - height[right];\n      right--;\n    }\n  }\n  return water;\n}`,
          java: `class Solution {\n    public int trap(int[] height) {\n        int left = 0, right = height.length - 1;\n        int leftMax = 0, rightMax = 0, water = 0;\n        while (left < right) {\n            if (height[left] < height[right]) {\n                if (height[left] >= leftMax) leftMax = height[left];\n                else water += leftMax - height[left];\n                left++;\n            } else {\n                if (height[right] >= rightMax) rightMax = height[right];\n                else water += rightMax - height[right];\n                right--;\n            }\n        }\n        return water;\n    }\n}`,
          cpp: `class Solution {\npublic:\n    int trap(vector<int>& height) {\n        int left = 0, right = height.size() - 1;\n        int leftMax = 0, rightMax = 0, water = 0;\n        while (left < right) {\n            if (height[left] < height[right]) {\n                if (height[left] >= leftMax) leftMax = height[left];\n                else water += leftMax - height[left];\n                left++;\n            } else {\n                if (height[right] >= rightMax) rightMax = height[right];\n                else water += rightMax - height[right];\n                right--;\n            }\n        }\n        return water;\n    }\n};`
        },
        testCases: [
          { input: '[0,1,0,2,1,0,1,3,2,1,2,1]', expected: '6' },
          { input: '[4,2,0,3,2,5]', expected: '9' }
        ]
      },
      {
        title: 'Sliding Window Maximum (Hard)',
        companies: ['Uber', 'Amazon', 'Adobe'],
        acceptance: '46.2%',
        description: 'You are given an array of integers nums, and a sliding window of size k which is moving from the very left to the very right. Return the max in each window.',
        constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4', '1 <= k <= nums.length'],
        examples: [
          { input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', output: '[3,3,5,5,6,7]', explanation: 'Window maximums tracked sequentially.' }
        ],
        templates: {
          python: `from collections import deque\n\nclass Solution:\n    def maxSlidingWindow(self, nums: list[int], k: int) -> list[int]:\n        q = deque()\n        res = []\n        for i, val in enumerate(nums):\n            while q and nums[q[-1]] < val:\n                q.pop()\n            q.append(i)\n            if q[0] <= i - k:\n                q.popleft()\n            if i >= k - 1:\n                res.append(nums[q[0]])\n        return res`,
          javascript: `function maxSlidingWindow(nums, k) {\n  const q = [], res = [];\n  for (let i = 0; i < nums.length; i++) {\n    while (q.length && nums[q[q.length - 1]] < nums[i]) q.pop();\n    q.push(i);\n    if (q[0] <= i - k) q.shift();\n    if (i >= k - 1) res.push(nums[q[0]]);\n  }\n  return res;\n}`,
          java: `import java.util.*;\nclass Solution {\n    public int[] maxSlidingWindow(int[] nums, int k) {\n        // Monotonic deque implementation\n        return new int[0];\n    }\n}`,
          cpp: `class Solution {\npublic:\n    vector<int> maxSlidingWindow(vector<int>& nums, int k) {\n        deque<int> dq;\n        vector<int> ans;\n        return ans;\n    }\n};`
        },
        testCases: [
          { input: '[1,3,-1,-3,5,3,6,7], k=3', expected: '[3,3,5,5,6,7]' }
        ]
      }
    ],
    Medium: [
      {
        title: 'Two Sum Target Subarray Pair',
        companies: ['TCS Digital', 'Infosys', 'Cognizant'],
        acceptance: '58.3%',
        description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume exactly one solution exists.',
        constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', 'Exactly one valid answer exists.'],
        examples: [
          { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
          { input: 'nums = [3,2,4], target = 6', output: '[1,2]', explanation: 'nums[1] + nums[2] == 6.' }
        ],
        templates: {
          python: `class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        seen = {}\n        for i, n in enumerate(nums):\n            comp = target - n\n            if comp in seen:\n                return [seen[comp], i]\n            seen[n] = i\n        return []`,
          javascript: `function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const comp = target - nums[i];\n    if (map.has(comp)) return [map.get(comp), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}`,
          java: `import java.util.HashMap;\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        HashMap<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int comp = target - nums[i];\n            if (map.containsKey(comp)) return new int[]{map.get(comp), i};\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n}`,
          cpp: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> mp;\n        for (int i = 0; i < nums.size(); i++) {\n            int comp = target - nums[i];\n            if (mp.count(comp)) return {mp[comp], i};\n            mp[nums[i]] = i;\n        }\n        return {};\n    }\n};`
        },
        testCases: [
          { input: 'nums = [2,7,11,15], target = 9', expected: '[0,1]' },
          { input: 'nums = [3,2,4], target = 6', expected: '[1,2]' }
        ]
      }
    ],
    Low: [
      {
        title: 'Contains Duplicate Element Detection',
        companies: ['TCS NQT', 'Wipro Elite', 'Accenture'],
        acceptance: '71.5%',
        description: 'Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.',
        constraints: ['1 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
        examples: [
          { input: 'nums = [1,2,3,1]', output: 'true', explanation: '1 occurs at index 0 and index 3.' },
          { input: 'nums = [1,2,3,4]', output: 'false', explanation: 'All elements are distinct.' }
        ],
        templates: {
          python: `class Solution:\n    def containsDuplicate(self, nums: list[int]) -> bool:\n        return len(nums) != len(set(nums))`,
          javascript: `function containsDuplicate(nums) {\n  return new Set(nums).size !== nums.length;\n}`,
          java: `import java.util.HashSet;\nclass Solution {\n    public boolean containsDuplicate(int[] nums) {\n        HashSet<Integer> set = new HashSet<>();\n        for (int n : nums) if (!set.add(n)) return true;\n        return false;\n    }\n}`,
          cpp: `class Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        unordered_set<int> s(nums.begin(), nums.end());\n        return s.size() != nums.size();\n    }\n};`
        },
        testCases: [
          { input: 'nums = [1,2,3,1]', expected: 'true' },
          { input: 'nums = [1,2,3,4]', expected: 'false' }
        ]
      }
    ]
  },

  strings: {
    High: [
      {
        title: 'Minimum Window Substring with All Characters',
        companies: ['Meta', 'Amazon', 'Google'],
        acceptance: '41.8%',
        description: 'Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window.',
        constraints: ['m == s.length', 'n == t.length', '1 <= m, n <= 10^5', 's and t consist of uppercase and lowercase English letters.'],
        examples: [
          { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"', explanation: 'The minimum window substring "BANC" includes A, B, and C.' }
        ],
        templates: {
          python: `from collections import Counter\n\nclass Solution:\n    def minWindow(self, s: str, t: str) -> str:\n        # Two pointers with frequency map\n        pass`,
          javascript: `function minWindow(s, t) {\n  // Implement sliding window\n  return "";\n}`,
          java: `class Solution {\n    public String minWindow(String s, String t) {\n        return "";\n    }\n}`,
          cpp: `class Solution {\npublic:\n    string minWindow(string s, string t) {\n        return "";\n    }\n};`
        },
        testCases: [
          { input: 's = "ADOBECODEBANC", t = "ABC"', expected: '"BANC"' }
        ]
      }
    ],
    Medium: [
      {
        title: 'Longest Substring Without Repeating Characters',
        companies: ['Cognizant', 'Infosys', 'Capgemini'],
        acceptance: '53.9%',
        description: 'Given a string s, find the length of the longest substring without duplicate characters.',
        constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces.'],
        examples: [
          { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with length of 3.' },
          { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b", with length of 1.' }
        ],
        templates: {
          python: `class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        char_map = {}\n        left = 0\n        max_len = 0\n        for right, c in enumerate(s):\n            if c in char_map and char_map[c] >= left:\n                left = char_map[c] + 1\n            char_map[c] = right\n            max_len = max(max_len, right - left + 1)\n        return max_len`,
          javascript: `function lengthOfLongestSubstring(s) {\n  let map = new Map(), left = 0, maxLen = 0;\n  for (let right = 0; right < s.length; right++) {\n    if (map.has(s[right]) && map.get(s[right]) >= left) {\n      left = map.get(s[right]) + 1;\n    }\n    map.set(s[right], right);\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n  return maxLen;\n}`,
          java: `class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Sliding window\n        return 0;\n    }\n}`,
          cpp: `class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        return 0;\n    }\n};`
        },
        testCases: [
          { input: 's = "abcabcbb"', expected: '3' },
          { input: 's = "bbbbb"', expected: '1' }
        ]
      }
    ],
    Low: [
      {
        title: 'Valid Palindrome Verification',
        companies: ['TCS NQT', 'Wipro', 'Tech Mahindra'],
        acceptance: '64.1%',
        description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.',
        constraints: ['1 <= s.length <= 2 * 10^5', 's consists only of printable ASCII characters.'],
        examples: [
          { input: 's = "A man, a plan, a canal: Panama"', output: 'true', explanation: '"amanaplanacanalpanama" is a palindrome.' },
          { input: 's = "race a car"', output: 'false', explanation: '"raceacar" is not a palindrome.' }
        ],
        templates: {
          python: `class Solution:\n    def isPalindrome(self, s: str) -> bool:\n        filtered = [c.lower() for c in s if c.isalnum()]\n        return filtered == filtered[::-1]`,
          javascript: `function isPalindrome(s) {\n  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');\n  return clean === clean.split('').reverse().join('');\n}`,
          java: `class Solution {\n    public boolean isPalindrome(String s) {\n        int l = 0, r = s.length() - 1;\n        while (l < r) {\n            while (l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;\n            while (l < r && !Character.isLetterOrDigit(s.charAt(r))) r--;\n            if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r))) return false;\n            l++; r--;\n        }\n        return true;\n    }\n}`,
          cpp: `class Solution {\npublic:\n    bool isPalindrome(string s) {\n        // Two pointers check\n        return true;\n    }\n};`
        },
        testCases: [
          { input: 's = "A man, a plan, a canal: Panama"', expected: 'true' },
          { input: 's = "race a car"', expected: 'false' }
        ]
      }
    ]
  },

  dp: {
    High: [
      {
        title: 'Longest Increasing Subsequence with Binary Search ($O(N \\log N)$)',
        companies: ['Google', 'Microsoft', 'Goldman Sachs'],
        acceptance: '43.1%',
        description: 'Given an integer array nums, return the length of the longest strictly increasing subsequence. Can you solve it in O(n log n) time complexity?',
        constraints: ['1 <= nums.length <= 2500', '-10^4 <= nums[i] <= 10^4'],
        examples: [
          { input: 'nums = [10,9,2,5,3,7,101,18]', output: '4', explanation: 'The longest increasing subsequence is [2, 3, 7, 101], therefore the length is 4.' }
        ],
        templates: {
          python: `import bisect\n\nclass Solution:\n    def lengthOfLIS(self, nums: list[int]) -> int:\n        tails = []\n        for n in nums:\n            idx = bisect.bisect_left(tails, n)\n            if idx == len(tails):\n                tails.append(n)\n            else:\n                tails[idx] = n\n        return len(tails)`,
          javascript: `function lengthOfLIS(nums) {\n  const tails = [];\n  for (let n of nums) {\n    let l = 0, r = tails.length;\n    while (l < r) {\n      let m = Math.floor((l + r) / 2);\n      if (tails[m] < n) l = m + 1;\n      else r = m;\n    }\n    tails[l] = n;\n  }\n  return tails.length;\n}`,
          java: `class Solution {\n    public int lengthOfLIS(int[] nums) {\n        // Binary search tails array\n        return 0;\n    }\n}`,
          cpp: `class Solution {\npublic:\n    int lengthOfLIS(vector<int>& nums) {\n        return 0;\n    }\n};`
        },
        testCases: [
          { input: 'nums = [10,9,2,5,3,7,101,18]', expected: '4' }
        ]
      }
    ],
    Medium: [
      {
        title: 'Coin Change Minimum Denominations',
        companies: ['Amazon', 'Infosys', 'Walmart'],
        acceptance: '51.4%',
        description: 'You are given an integer array coins representing coins of different denominations and an integer amount. Return the fewest number of coins that you need to make up that amount. If impossible, return -1.',
        constraints: ['1 <= coins.length <= 12', '1 <= coins[i] <= 2^31 - 1', '0 <= amount <= 10^4'],
        examples: [
          { input: 'coins = [1,2,5], amount = 11', output: '3', explanation: '11 = 5 + 5 + 1' },
          { input: 'coins = [2], amount = 3', output: '-1', explanation: 'Cannot form amount with only denomination 2.' }
        ],
        templates: {
          python: `class Solution:\n    def coinChange(self, coins: list[int], amount: int) -> int:\n        dp = [float('inf')] * (amount + 1)\n        dp[0] = 0\n        for c in coins:\n            for a in range(c, amount + 1):\n                dp[a] = min(dp[a], dp[a - c] + 1)\n        return dp[amount] if dp[amount] != float('inf') else -1`,
          javascript: `function coinChange(coins, amount) {\n  const dp = new Array(amount + 1).fill(Infinity);\n  dp[0] = 0;\n  for (const c of coins) {\n    for (let a = c; a <= amount; a++) {\n      dp[a] = Math.min(dp[a], dp[a - c] + 1);\n    }\n  }\n  return dp[amount] === Infinity ? -1 : dp[amount];\n}`,
          java: `class Solution {\n    public int coinChange(int[] coins, int amount) {\n        int[] dp = new int[amount + 1];\n        Arrays.fill(dp, amount + 1);\n        dp[0] = 0;\n        for (int c : coins) {\n            for (int a = c; a <= amount; a++) {\n                dp[a] = Math.min(dp[a], dp[a - c] + 1);\n            }\n        }\n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n}`,
          cpp: `class Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        return 0;\n    }\n};`
        },
        testCases: [
          { input: 'coins = [1,2,5], amount = 11', expected: '3' },
          { input: 'coins = [2], amount = 3', expected: '-1' }
        ]
      }
    ],
    Low: [
      {
        title: 'Climbing Stairs Combinations',
        companies: ['TCS NQT', 'Wipro', 'HCL'],
        acceptance: '68.9%',
        description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
        constraints: ['1 <= n <= 45'],
        examples: [
          { input: 'n = 2', output: '2', explanation: 'There are two ways: 1 step + 1 step, or 2 steps.' },
          { input: 'n = 3', output: '3', explanation: '3 ways: (1+1+1), (1+2), (2+1).' }
        ],
        templates: {
          python: `class Solution:\n    def climbStairs(self, n: int) -> int:\n        a, b = 1, 1\n        for _ in range(n - 1):\n            a, b = b, a + b\n        return b`,
          javascript: `function climbStairs(n) {\n  let a = 1, b = 1;\n  for (let i = 1; i < n; i++) {\n    const temp = b;\n    b = a + b;\n    a = temp;\n  }\n  return b;\n}`,
          java: `class Solution {\n    public int climbStairs(int n) {\n        if (n <= 2) return n;\n        int a = 1, b = 2;\n        for (int i = 3; i <= n; i++) {\n            int sum = a + b;\n            a = b;\n            b = sum;\n        }\n        return b;\n    }\n}`,
          cpp: `class Solution {\npublic:\n    int climbStairs(int n) {\n        return 0;\n    }\n};`
        },
        testCases: [
          { input: 'n = 2', expected: '2' },
          { input: 'n = 3', expected: '3' }
        ]
      }
    ]
  },

  sql: {
    High: [
      {
        title: 'Consecutive Login Streaks with Window Functions',
        companies: ['Uber', 'Stripe', 'Amazon'],
        acceptance: '39.4%',
        description: 'Write an SQL query to find all active users who logged in for at least 5 consecutive days. Output user_id and the streak start date.',
        constraints: ['Table: UserLogins (user_id INT, login_date DATE)', 'Primary key (user_id, login_date)'],
        examples: [
          { input: 'UserLogins with 7 records', output: 'user_id: 104, streak: 5', explanation: 'Calculated using ROW_NUMBER() and DATE_SUB.' }
        ],
        templates: {
          python: `-- SQL Query Solution\nSELECT DISTINCT user_id\nFROM (\n  SELECT user_id, login_date,\n         DATE_SUB(login_date, INTERVAL ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY login_date) DAY) as grp\n  FROM UserLogins\n) t\nGROUP BY user_id, grp\nHAVING COUNT(*) >= 5;`,
          javascript: `-- Write SQL directly in editor\nSELECT user_id FROM UserLogins;`,
          java: `// SQL Query in JDBC\nString query = "SELECT user_id FROM UserLogins...";`,
          cpp: `-- SQL representation`
        },
        testCases: [
          { input: 'Sample DB schema with 10 rows', expected: 'user_id: 104' }
        ]
      }
    ],
    Medium: [
      {
        title: 'Second Highest Placement Package',
        companies: ['TCS Digital', 'Infosys', 'Wipro'],
        acceptance: '54.7%',
        description: 'Write an SQL query to report the second highest package from the Placements table. If there is no second highest, the query should report null.',
        constraints: ['Table: Placements (id INT, package_lpa DECIMAL)'],
        examples: [
          { input: 'Placements: [id: 1, 28], [id: 2, 32], [id: 3, 14]', output: 'SecondHighestPackage: 28', explanation: '32 is highest, 28 is second highest.' }
        ],
        templates: {
          python: `SELECT (\n  SELECT DISTINCT package_lpa\n  FROM Placements\n  ORDER BY package_lpa DESC\n  LIMIT 1 OFFSET 1\n) AS SecondHighestPackage;`,
          javascript: `SELECT MAX(package_lpa) AS SecondHighestPackage FROM Placements WHERE package_lpa < (SELECT MAX(package_lpa) FROM Placements);`,
          java: `// SQL Query`,
          cpp: `// SQL Query`
        },
        testCases: [
          { input: '[32, 28, 14]', expected: '28' }
        ]
      }
    ],
    Low: [
      {
        title: 'Eligible Students by CGPA and Department',
        companies: ['Cognizant', 'Accenture'],
        acceptance: '78.2%',
        description: 'Write an SQL query to find the names and emails of all students whose CGPA is greater than or equal to 8.5 and department is either "CSE" or "IT".',
        constraints: ['Table: Students (id, name, email, department, cgpa)'],
        examples: [
          { input: 'Students table with 5 sample records', output: '2 students returned', explanation: 'Filtered by department and cgpa threshold.' }
        ],
        templates: {
          python: `SELECT name, email\nFROM Students\nWHERE cgpa >= 8.5 AND department IN ('CSE', 'IT')\nORDER BY cgpa DESC;`,
          javascript: `SELECT name, email FROM Students WHERE cgpa >= 8.5 AND department IN ('CSE', 'IT');`,
          java: `// SQL Query`,
          cpp: `// SQL Query`
        },
        testCases: [
          { input: 'Students mock table', expected: 'Matched 2 records' }
        ]
      }
    ]
  },

  system_design: {
    High: [
      {
        title: 'Design Scalable Distributed URL Shortener (TinyURL)',
        companies: ['Google', 'Meta', 'Amazon'],
        acceptance: '44.0%',
        description: 'Design a distributed system capable of shortening 100M URLs daily with sub-10ms redirect latency, base62 encoding or key generation service (KGS), and active-passive multi-region database failover.',
        constraints: ['Write load: 100M URLs/day (~1160 writes/sec)', 'Read load: 1B redirects/day (~11,600 reads/sec)', 'Storage: 5-year retention'],
        examples: [
          { input: 'POST /api/shorten { "url": "https://cpms.edu/campus-placements" }', output: '{ "shortUrl": "https://sho.rt/a8X9k" }', explanation: 'Base62 7-char hash guarantees 3.5 trillion unique permutations.' }
        ],
        templates: {
          python: `class URLShortenerService:\n    def __init__(self):\n        self.base62_chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"\n        self.counter = 10000000\n        self.url_map = {}\n\n    def encode(self, num: int) -> str:\n        res = []\n        while num > 0:\n            res.append(self.base62_chars[num % 62])\n            num //= 62\n        return "".join(reversed(res))\n\n    def shorten(self, long_url: str) -> str:\n        self.counter += 1\n        short_key = self.encode(self.counter)\n        self.url_map[short_key] = long_url\n        return f"https://cc.ly/{short_key}"`,
          javascript: `class URLShortener {\n  constructor() {\n    this.chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";\n    this.id = 10000000;\n    this.db = new Map();\n  }\n  shorten(longUrl) {\n    this.id++;\n    let num = this.id, key = "";\n    while (num > 0) {\n      key = this.chars[num % 62] + key;\n      num = Math.floor(num / 62);\n    }\n    this.db.set(key, longUrl);\n    return "https://cc.ly/" + key;\n  }\n}`,
          java: `public class URLShortenerService {\n    // System architecture model\n}`,
          cpp: `class URLShortener {\n    // Architecture\n};`
        },
        testCases: [
          { input: '"https://cpms.edu/drives"', expected: 'Valid 7-char Base62 alias' }
        ]
      }
    ],
    Medium: [
      {
        title: 'Design In-Memory LRU Cache with O(1) Operations',
        companies: ['Microsoft', 'Salesforce', 'Adobe'],
        acceptance: '52.1%',
        description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement get(key) and put(key, value) in O(1) average time complexity.',
        constraints: ['capacity: 1 <= capacity <= 3000', '0 <= key <= 10^4', '0 <= value <= 10^5'],
        examples: [
          { input: 'LRUCache(2); put(1, 1); put(2, 2); get(1); put(3, 3); get(2);', output: '[null, null, null, 1, null, -1]', explanation: 'key 2 was evicted because key 1 was recently accessed.' }
        ],
        templates: {
          python: `class Node:\n    def __init__(self, key=0, val=0):\n        self.key = key\n        self.val = val\n        self.prev = None\n        self.next = None\n\nclass LRUCache:\n    def __init__(self, capacity: int):\n        self.cap = capacity\n        self.map = {}\n        self.head = Node()\n        self.tail = Node()\n        self.head.next = self.tail\n        self.tail.prev = self.head\n\n    # Implement get and put in O(1)\n`,
          javascript: `class LRUCache {\n  constructor(capacity) {\n    this.cap = capacity;\n    this.map = new Map();\n  }\n  get(key) {\n    if (!this.map.has(key)) return -1;\n    const val = this.map.get(key);\n    this.map.delete(key);\n    this.map.set(key, val);\n    return val;\n  }\n  put(key, value) {\n    if (this.map.has(key)) this.map.delete(key);\n    this.map.set(key, value);\n    if (this.map.size > this.cap) {\n      this.map.delete(this.map.keys().next().value);\n    }\n  }\n}`,
          java: `class LRUCache {\n    // Doubly linked list + HashMap\n}`,
          cpp: `class LRUCache {\n    // C++ list + unordered_map\n};`
        },
        testCases: [
          { input: 'put(1,1), put(2,2), get(1)', expected: '1' }
        ]
      }
    ],
    Low: [
      {
        title: 'Design a Rate Limiter with Token Bucket Algorithm',
        companies: ['TCS Digital', 'Infosys'],
        acceptance: '66.8%',
        description: 'Design an algorithm to enforce an API rate limit of N requests per minute per IP address using the Token Bucket methodology.',
        constraints: ['Max capacity: 60 tokens', 'Refill rate: 1 token / second'],
        examples: [
          { input: '10 requests in 1 second', output: 'Allowed', explanation: 'Bucket had 60 tokens, 10 consumed, 50 remaining.' }
        ],
        templates: {
          python: `import time\n\nclass TokenBucketRateLimiter:\n    def __init__(self, capacity: int, refill_rate_per_sec: float):\n        self.capacity = capacity\n        self.tokens = capacity\n        self.refill_rate = refill_rate_per_sec\n        self.last_refill = time.time()\n\n    def allow_request(self, tokens=1) -> bool:\n        now = time.time()\n        elapsed = now - self.last_refill\n        self.tokens = min(self.capacity, self.tokens + elapsed * self.refill_rate)\n        self.last_refill = now\n        if self.tokens >= tokens:\n            self.tokens -= tokens\n            return True\n        return False`,
          javascript: `class TokenBucket {\n  constructor(capacity, ratePerSec) {\n    this.capacity = capacity;\n    this.tokens = capacity;\n    this.rate = ratePerSec;\n    this.last = Date.now();\n  }\n  allow() {\n    const now = Date.now();\n    this.tokens = Math.min(this.capacity, this.tokens + ((now - this.last)/1000) * this.rate);\n    this.last = now;\n    if (this.tokens >= 1) { this.tokens--; return true; }\n    return false;\n  }\n}`,
          java: `// Token Bucket Rate Limiter\npublic class RateLimiter {\n}`,
          cpp: `// Rate Limiter class`
        },
        testCases: [
          { input: 'Initial check', expected: 'True' }
        ]
      }
    ]
  }
};

export function autoGenerateCodingChallenge(topic = 'arrays', priority = 'Medium') {
  const topicGroup = QUESTION_BANK[topic] || QUESTION_BANK.arrays;
  const pool = topicGroup[priority] || topicGroup.Medium || topicGroup.Low;
  
  // Pick random or cycle
  const randomIdx = Math.floor(Math.random() * pool.length);
  const baseChallenge = pool[randomIdx] || pool[0];

  return {
    ...baseChallenge,
    id: `code_${topic}_${priority.toLowerCase()}_${Date.now()}`,
    topic,
    priority,
    generatedTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
}
