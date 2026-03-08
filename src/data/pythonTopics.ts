export type PythonQuestion = {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  starterCode: string;
  expectedOutput: string;
  hints: string[];
  xpReward: number;
};

export type PythonTopic = {
  id: string;
  title: string;
  description: string;
  order: number;
  lesson: string;
  questions: PythonQuestion[];
};

export const PYTHON_TOPICS: PythonTopic[] = [
  {
    id: "variables-data-types",
    title: "Variables & Data Types",
    description: "Learn about Python variables, integers, floats, strings, and booleans.",
    order: 1,
    lesson: `# Variables & Data Types

In Python, you don't need to declare variable types. Python figures it out automatically.

\`\`\`python
name = "Alice"      # str
age = 25            # int
height = 5.7        # float
is_student = True   # bool
\`\`\`

## Type Checking
Use \`type()\` to check a variable's type:
\`\`\`python
print(type(name))   # <class 'str'>
print(type(age))    # <class 'int'>
\`\`\`

## Type Conversion
Convert between types using \`int()\`, \`float()\`, \`str()\`, \`bool()\`:
\`\`\`python
x = "42"
y = int(x)    # 42 as integer
z = float(x)  # 42.0 as float
\`\`\`

## Multiple Assignment
\`\`\`python
a, b, c = 1, 2, 3
x = y = z = 0
\`\`\``,
    questions: [
      {
        id: "var-easy-1",
        title: "Swap Two Variables",
        difficulty: "Easy",
        description: "Given two variables a and b, swap their values and print them. Input: two integers on separate lines. Output: the swapped values on separate lines.",
        starterCode: "a = int(input())\nb = int(input())\n# Swap a and b\n\nprint(a)\nprint(b)",
        expectedOutput: "Given input '5\\n10', output should be '10\\n5'",
        hints: ["Use a, b = b, a in Python"],
        xpReward: 10,
      },
      {
        id: "var-med-1",
        title: "Type Converter",
        difficulty: "Medium",
        description: "Read a string input and print its integer value, float value, and length, each on a separate line.",
        starterCode: 's = input()\n# Print int value, float value, and length\n',
        expectedOutput: "Given input '42', output: '42\\n42.0\\n2'",
        hints: ["Use int(), float(), and len() functions"],
        xpReward: 20,
      },
      {
        id: "var-hard-1",
        title: "Binary Representation",
        difficulty: "Hard",
        description: "Read an integer and print its binary, octal, and hexadecimal representations (without prefixes like 0b, 0o, 0x).",
        starterCode: "n = int(input())\n# Print binary, octal, hex (no prefixes)\n",
        expectedOutput: "Given input '255', output: '11111111\\n377\\nff'",
        hints: ["Use bin(), oct(), hex() and slice off the prefix with [2:]"],
        xpReward: 30,
      },
    ],
  },
  {
    id: "strings",
    title: "Strings",
    description: "Master string operations, slicing, formatting, and methods.",
    order: 2,
    lesson: `# Strings

Strings are sequences of characters, immutable in Python.

## String Methods
\`\`\`python
s = "Hello World"
s.upper()       # "HELLO WORLD"
s.lower()       # "hello world"
s.strip()       # Remove whitespace
s.replace("World", "Python")
s.split(" ")    # ["Hello", "World"]
s.find("World") # 6
s.count("l")    # 3
\`\`\`

## String Slicing
\`\`\`python
s = "Hello"
s[0]     # 'H'
s[1:4]   # 'ell'
s[::-1]  # 'olleH' (reverse)
s[-1]    # 'o'
\`\`\`

## f-strings (Python 3.6+)
\`\`\`python
name = "Alice"
age = 25
print(f"{name} is {age} years old")
\`\`\``,
    questions: [
      {
        id: "str-easy-1",
        title: "Reverse a String",
        difficulty: "Easy",
        description: "Read a string and print it reversed.",
        starterCode: "s = input()\n# Print the reversed string\n",
        expectedOutput: "Given input 'hello', output: 'olleh'",
        hints: ["Use slicing s[::-1]"],
        xpReward: 10,
      },
      {
        id: "str-med-1",
        title: "Count Vowels and Consonants",
        difficulty: "Medium",
        description: "Read a string (lowercase letters only) and print the count of vowels and consonants on separate lines.",
        starterCode: "s = input()\n# Count vowels and consonants\n",
        expectedOutput: "Given input 'hello', output: '2\\n3'",
        hints: ["Vowels are a, e, i, o, u. Everything else that's a letter is a consonant."],
        xpReward: 20,
      },
      {
        id: "str-hard-1",
        title: "Palindrome Checker",
        difficulty: "Hard",
        description: "Read a string, remove all non-alphanumeric characters, convert to lowercase, and check if it's a palindrome. Print 'True' or 'False'.",
        starterCode: "s = input()\n# Check palindrome (ignore non-alphanumeric, case-insensitive)\n",
        expectedOutput: "Given input 'A man, a plan, a canal: Panama', output: 'True'",
        hints: ["Use isalnum() to filter, then compare with reversed"],
        xpReward: 30,
      },
    ],
  },
  {
    id: "lists",
    title: "Lists",
    description: "Learn about lists, indexing, slicing, and list methods.",
    order: 3,
    lesson: `# Lists

Lists are ordered, mutable collections.

\`\`\`python
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", True, 3.14]
\`\`\`

## Common Operations
\`\`\`python
fruits.append("date")     # Add to end
fruits.insert(1, "berry") # Insert at index
fruits.remove("banana")   # Remove first occurrence
fruits.pop()              # Remove & return last
fruits.sort()             # Sort in place
len(fruits)               # Length
\`\`\`

## List Slicing
\`\`\`python
nums = [0, 1, 2, 3, 4, 5]
nums[1:4]   # [1, 2, 3]
nums[::2]   # [0, 2, 4]
nums[::-1]  # [5, 4, 3, 2, 1, 0]
\`\`\``,
    questions: [
      {
        id: "list-easy-1",
        title: "Sum of List",
        difficulty: "Easy",
        description: "Read n integers (first line: n, second line: n space-separated integers) and print their sum.",
        starterCode: "n = int(input())\nnums = list(map(int, input().split()))\n# Print sum\n",
        expectedOutput: "Given input '5\\n1 2 3 4 5', output: '15'",
        hints: ["Use the built-in sum() function"],
        xpReward: 10,
      },
      {
        id: "list-med-1",
        title: "Remove Duplicates",
        difficulty: "Medium",
        description: "Read a list of integers and print the list with duplicates removed, maintaining original order.",
        starterCode: "nums = list(map(int, input().split()))\n# Remove duplicates, keep order\n",
        expectedOutput: "Given input '1 2 2 3 4 4 5', output: '1 2 3 4 5'",
        hints: ["Use a set to track seen elements, or use dict.fromkeys()"],
        xpReward: 20,
      },
      {
        id: "list-hard-1",
        title: "Flatten Nested List",
        difficulty: "Hard",
        description: "Given a nested list as a string like '[[1,2],[3,[4,5]],6]', flatten it and print all elements space-separated. Read the input, use eval() to parse, then flatten.",
        starterCode: "import ast\ndata = ast.literal_eval(input())\n# Flatten the nested list and print space-separated\n",
        expectedOutput: "Given input '[[1,2],[3,[4,5]],6]', output: '1 2 3 4 5 6'",
        hints: ["Use recursion: if element is a list, recurse; else append to result"],
        xpReward: 30,
      },
    ],
  },
  {
    id: "tuples",
    title: "Tuples",
    description: "Understand immutable sequences and tuple operations.",
    order: 4,
    lesson: `# Tuples

Tuples are immutable ordered sequences.

\`\`\`python
point = (3, 4)
colors = ("red", "green", "blue")
single = (42,)  # Note the comma for single element
\`\`\`

## Tuple Unpacking
\`\`\`python
x, y = point
name, age, city = ("Alice", 25, "NYC")
first, *rest = (1, 2, 3, 4, 5)  # first=1, rest=[2,3,4,5]
\`\`\`

## Named Tuples
\`\`\`python
from collections import namedtuple
Point = namedtuple('Point', ['x', 'y'])
p = Point(3, 4)
print(p.x, p.y)  # 3 4
\`\`\``,
    questions: [
      {
        id: "tuple-easy-1",
        title: "Tuple Basics",
        difficulty: "Easy",
        description: "Read two integers, create a tuple, and print the tuple and its length.",
        starterCode: "a = int(input())\nb = int(input())\n# Create tuple and print it and its length\n",
        expectedOutput: "Given input '3\\n5', output: '(3, 5)\\n2'",
        hints: ["t = (a, b), then print(t) and print(len(t))"],
        xpReward: 10,
      },
      {
        id: "tuple-med-1",
        title: "Sort by Second Element",
        difficulty: "Medium",
        description: "Read n pairs of integers (n on first line, then n lines of two integers each). Print them sorted by the second element.",
        starterCode: "n = int(input())\npairs = []\nfor _ in range(n):\n    a, b = map(int, input().split())\n    pairs.append((a, b))\n# Sort by second element and print each pair\n",
        expectedOutput: "Given input '3\\n1 3\\n2 1\\n3 2', output: '(2, 1)\\n(3, 2)\\n(1, 3)'",
        hints: ["Use sorted() with key=lambda x: x[1]"],
        xpReward: 20,
      },
      {
        id: "tuple-hard-1",
        title: "Matrix Transpose",
        difficulty: "Hard",
        description: "Read an m×n matrix (first line: m n, then m lines of n integers). Print the transpose. Use tuples with zip().",
        starterCode: "m, n = map(int, input().split())\nmatrix = []\nfor _ in range(m):\n    row = tuple(map(int, input().split()))\n    matrix.append(row)\n# Print transpose\n",
        expectedOutput: "Given input '2 3\\n1 2 3\\n4 5 6', output: '1 4\\n2 5\\n3 6'",
        hints: ["Use zip(*matrix) to transpose"],
        xpReward: 30,
      },
    ],
  },
  {
    id: "dictionaries",
    title: "Dictionaries",
    description: "Master key-value pair operations and dictionary methods.",
    order: 5,
    lesson: `# Dictionaries

Dictionaries store key-value pairs, unordered (insertion-ordered in Python 3.7+).

\`\`\`python
student = {"name": "Alice", "age": 25, "grade": "A"}
student["name"]        # "Alice"
student.get("gpa", 0)  # 0 (default if not found)
student["gpa"] = 3.8   # Add/update
del student["grade"]   # Delete key
\`\`\`

## Dictionary Methods
\`\`\`python
d.keys()     # dict_keys
d.values()   # dict_values
d.items()    # dict_items (key-value pairs)
d.update(other_dict)
d.pop("key")
\`\`\`

## Dictionary Comprehension
\`\`\`python
squares = {x: x**2 for x in range(6)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16, 5: 25}
\`\`\``,
    questions: [
      {
        id: "dict-easy-1",
        title: "Word Frequency",
        difficulty: "Easy",
        description: "Read a sentence and print each unique word with its count, one per line as 'word: count', sorted alphabetically.",
        starterCode: "s = input()\n# Count word frequency\n",
        expectedOutput: "Given input 'the cat sat on the mat', output: 'cat: 1\\nmat: 1\\non: 1\\nsat: 1\\nthe: 2'",
        hints: ["Use a dict or collections.Counter"],
        xpReward: 10,
      },
      {
        id: "dict-med-1",
        title: "Group Anagrams",
        difficulty: "Medium",
        description: "Read words separated by spaces. Group anagrams together. Print each group on a separate line, words space-separated, groups sorted by first word.",
        starterCode: "words = input().split()\n# Group anagrams\n",
        expectedOutput: "Given input 'eat tea tan ate nat bat', groups like 'ate eat tea\\nbat\\nnat tan'",
        hints: ["Sort each word's characters to create a key"],
        xpReward: 20,
      },
      {
        id: "dict-hard-1",
        title: "Nested Dictionary Merge",
        difficulty: "Hard",
        description: "Given two JSON-like dictionaries as strings, deep merge them (second overwrites first for conflicting keys). Print the result. Use eval() to parse.",
        starterCode: "import ast\nd1 = ast.literal_eval(input())\nd2 = ast.literal_eval(input())\n# Deep merge d2 into d1\n",
        expectedOutput: "Given input '{\"a\": 1, \"b\": {\"c\": 2}}' and '{\"b\": {\"d\": 3}, \"e\": 4}', output merged dict",
        hints: ["Use recursion: if both values are dicts, merge recursively"],
        xpReward: 30,
      },
    ],
  },
  {
    id: "sets",
    title: "Sets",
    description: "Learn about sets, set operations, and use cases.",
    order: 6,
    lesson: `# Sets

Sets are unordered collections of unique elements.

\`\`\`python
s = {1, 2, 3, 4, 5}
s.add(6)
s.remove(3)    # Raises error if not found
s.discard(10)  # No error if not found
\`\`\`

## Set Operations
\`\`\`python
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

a | b    # Union: {1,2,3,4,5,6}
a & b    # Intersection: {3,4}
a - b    # Difference: {1,2}
a ^ b    # Symmetric difference: {1,2,5,6}
\`\`\``,
    questions: [
      {
        id: "set-easy-1",
        title: "Unique Elements",
        difficulty: "Easy",
        description: "Read space-separated integers and print the count of unique elements.",
        starterCode: "nums = list(map(int, input().split()))\n# Print count of unique elements\n",
        expectedOutput: "Given input '1 2 2 3 3 3 4', output: '4'",
        hints: ["Convert to set and use len()"],
        xpReward: 10,
      },
      {
        id: "set-med-1",
        title: "Common Elements",
        difficulty: "Medium",
        description: "Read two lines of space-separated integers. Print their common elements sorted in ascending order, space-separated.",
        starterCode: "a = set(map(int, input().split()))\nb = set(map(int, input().split()))\n# Print common elements sorted\n",
        expectedOutput: "Given input '1 2 3 4 5\\n3 4 5 6 7', output: '3 4 5'",
        hints: ["Use set intersection: a & b, then sort"],
        xpReward: 20,
      },
      {
        id: "set-hard-1",
        title: "Symmetric Difference Count",
        difficulty: "Hard",
        description: "Read n sets (first line: n, then n lines of space-separated integers). Find elements that appear in exactly one set. Print count and the sorted elements.",
        starterCode: "n = int(input())\nsets = []\nfor _ in range(n):\n    sets.append(set(map(int, input().split())))\n# Find elements in exactly one set\n",
        expectedOutput: "Given input '3\\n1 2 3\\n2 3 4\\n3 4 5', output count and elements unique to exactly one set",
        hints: ["Count occurrences across all sets, keep those with count == 1"],
        xpReward: 30,
      },
    ],
  },
  {
    id: "control-flow",
    title: "Control Flow (if/elif/else)",
    description: "Master conditional statements and logical operators.",
    order: 7,
    lesson: `# Control Flow

## if/elif/else
\`\`\`python
score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"
\`\`\`

## Ternary Operator
\`\`\`python
status = "adult" if age >= 18 else "minor"
\`\`\`

## Logical Operators
\`\`\`python
if x > 0 and x < 100:
    print("In range")
if not done or force:
    print("Continue")
\`\`\``,
    questions: [
      {
        id: "cf-easy-1",
        title: "Grade Calculator",
        difficulty: "Easy",
        description: "Read a score (0-100) and print the grade: A (>=90), B (>=80), C (>=70), D (>=60), F (<60).",
        starterCode: "score = int(input())\n# Print grade\n",
        expectedOutput: "Given input '85', output: 'B'",
        hints: ["Use if/elif/else chain"],
        xpReward: 10,
      },
      {
        id: "cf-med-1",
        title: "Leap Year Checker",
        difficulty: "Medium",
        description: "Read a year and print 'Leap' or 'Not Leap'. A leap year is divisible by 4, except centuries unless also divisible by 400.",
        starterCode: "year = int(input())\n# Check leap year\n",
        expectedOutput: "Given input '2000', output: 'Leap'",
        hints: ["Divisible by 400 → leap. Divisible by 100 → not leap. Divisible by 4 → leap."],
        xpReward: 20,
      },
      {
        id: "cf-hard-1",
        title: "Triangle Classifier",
        difficulty: "Hard",
        description: "Read three side lengths. Determine if they form a valid triangle, and if so, classify as Equilateral, Isosceles, or Scalene. Also check if Right-angled. Print all applicable properties.",
        starterCode: "a, b, c = map(int, input().split())\n# Classify triangle\n",
        expectedOutput: "Given input '3 4 5', output: 'Scalene\\nRight-angled'",
        hints: ["Triangle inequality: sum of any two sides > third. Right angle: a²+b²=c² for sorted sides."],
        xpReward: 30,
      },
    ],
  },
  {
    id: "loops",
    title: "Loops (for/while)",
    description: "Learn iteration with for loops, while loops, and loop control.",
    order: 8,
    lesson: `# Loops

## for loop
\`\`\`python
for i in range(5):       # 0,1,2,3,4
    print(i)

for i in range(2, 10, 3): # 2,5,8
    print(i)

for char in "hello":
    print(char)
\`\`\`

## while loop
\`\`\`python
count = 0
while count < 5:
    print(count)
    count += 1
\`\`\`

## Loop Control
\`\`\`python
for i in range(10):
    if i == 5: break      # Exit loop
    if i % 2 == 0: continue  # Skip iteration
    print(i)              # Prints 1, 3
\`\`\`

## enumerate & zip
\`\`\`python
for i, val in enumerate(["a", "b", "c"]):
    print(i, val)

for x, y in zip([1,2,3], [4,5,6]):
    print(x + y)
\`\`\``,
    questions: [
      {
        id: "loop-easy-1",
        title: "FizzBuzz",
        difficulty: "Easy",
        description: "Print numbers 1 to n. For multiples of 3 print 'Fizz', multiples of 5 print 'Buzz', both print 'FizzBuzz'.",
        starterCode: "n = int(input())\n# FizzBuzz\n",
        expectedOutput: "Given input '15', output: '1\\n2\\nFizz\\n4\\nBuzz\\nFizz\\n7\\n8\\nFizz\\nBuzz\\n11\\nFizz\\n13\\n14\\nFizzBuzz'",
        hints: ["Check divisibility by 15 first, then 3, then 5"],
        xpReward: 10,
      },
      {
        id: "loop-med-1",
        title: "Pattern Printing",
        difficulty: "Medium",
        description: "Read n and print a right triangle pattern of stars. Row i has i stars.",
        starterCode: "n = int(input())\n# Print triangle pattern\n",
        expectedOutput: "Given input '4', output: '*\\n**\\n***\\n****'",
        hints: ["Use nested loops or string multiplication"],
        xpReward: 20,
      },
      {
        id: "loop-hard-1",
        title: "Prime Sieve",
        difficulty: "Hard",
        description: "Read n and print all prime numbers up to n, space-separated. Use the Sieve of Eratosthenes.",
        starterCode: "n = int(input())\n# Sieve of Eratosthenes\n",
        expectedOutput: "Given input '30', output: '2 3 5 7 11 13 17 19 23 29'",
        hints: ["Create boolean array, mark composites starting from 2"],
        xpReward: 30,
      },
    ],
  },
  {
    id: "functions",
    title: "Functions",
    description: "Define and use functions, parameters, return values, and scope.",
    order: 9,
    lesson: `# Functions

\`\`\`python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Alice"))           # Hello, Alice!
print(greet("Bob", "Hi"))       # Hi, Bob!
\`\`\`

## *args and **kwargs
\`\`\`python
def add(*args):
    return sum(args)

def info(**kwargs):
    for k, v in kwargs.items():
        print(f"{k}: {v}")

add(1, 2, 3)     # 6
info(name="Alice", age=25)
\`\`\`

## Lambda Functions
\`\`\`python
square = lambda x: x ** 2
add = lambda a, b: a + b
\`\`\`

## Scope
Variables inside functions are local. Use \`global\` keyword to modify global variables.`,
    questions: [
      {
        id: "func-easy-1",
        title: "Factorial Function",
        difficulty: "Easy",
        description: "Write a function factorial(n) and use it to print the factorial of the input number.",
        starterCode: "def factorial(n):\n    # Your code here\n    pass\n\nn = int(input())\nprint(factorial(n))",
        expectedOutput: "Given input '5', output: '120'",
        hints: ["Use recursion or a loop multiplying from 1 to n"],
        xpReward: 10,
      },
      {
        id: "func-med-1",
        title: "Higher-Order Function",
        difficulty: "Medium",
        description: "Read a list of integers. Use map() with a lambda to square each, filter() to keep only even squares, and print them space-separated.",
        starterCode: "nums = list(map(int, input().split()))\n# Use map and filter\n",
        expectedOutput: "Given input '1 2 3 4 5', output: '4 16'",
        hints: ["map(lambda x: x**2, nums), then filter(lambda x: x%2==0, ...)"],
        xpReward: 20,
      },
      {
        id: "func-hard-1",
        title: "Memoized Fibonacci",
        difficulty: "Hard",
        description: "Implement fibonacci using memoization (decorator or dict). Print the nth fibonacci number. Handle large n efficiently.",
        starterCode: "n = int(input())\n# Implement memoized fibonacci\n",
        expectedOutput: "Given input '50', output: '12586269025'",
        hints: ["Use functools.lru_cache or a dictionary for memoization"],
        xpReward: 30,
      },
    ],
  },
  {
    id: "list-comprehensions",
    title: "List Comprehensions",
    description: "Write concise list transformations with comprehensions.",
    order: 10,
    lesson: `# List Comprehensions

A compact way to create lists.

\`\`\`python
# Basic
squares = [x**2 for x in range(10)]

# With condition
evens = [x for x in range(20) if x % 2 == 0]

# Nested
matrix = [[i*j for j in range(5)] for i in range(5)]

# With transformation
words = ["hello", "world"]
upper = [w.upper() for w in words]
\`\`\`

## Dict & Set Comprehensions
\`\`\`python
# Dict comprehension
squares_dict = {x: x**2 for x in range(6)}

# Set comprehension
unique_lengths = {len(w) for w in words}
\`\`\``,
    questions: [
      {
        id: "lc-easy-1",
        title: "Even Squares",
        difficulty: "Easy",
        description: "Read n, print squares of even numbers from 1 to n, space-separated.",
        starterCode: "n = int(input())\n# Use list comprehension\n",
        expectedOutput: "Given input '10', output: '4 16 36 64 100'",
        hints: ["[x**2 for x in range(1, n+1) if x % 2 == 0]"],
        xpReward: 10,
      },
      {
        id: "lc-med-1",
        title: "Flatten with Comprehension",
        difficulty: "Medium",
        description: "Read a 2D matrix (first line: rows cols, then the matrix). Flatten it using list comprehension and print space-separated.",
        starterCode: "r, c = map(int, input().split())\nmatrix = [list(map(int, input().split())) for _ in range(r)]\n# Flatten using list comprehension\n",
        expectedOutput: "Given input '2 3\\n1 2 3\\n4 5 6', output: '1 2 3 4 5 6'",
        hints: ["[x for row in matrix for x in row]"],
        xpReward: 20,
      },
      {
        id: "lc-hard-1",
        title: "Pythagorean Triplets",
        difficulty: "Hard",
        description: "Read n and find all Pythagorean triplets (a, b, c) where a < b < c <= n. Print each on a new line.",
        starterCode: "n = int(input())\n# Find Pythagorean triplets using comprehension\n",
        expectedOutput: "Given input '20', print all triplets like '3 4 5\\n5 12 13\\n...'",
        hints: ["Triple nested comprehension with condition a**2 + b**2 == c**2"],
        xpReward: 30,
      },
    ],
  },
  {
    id: "file-handling",
    title: "File Handling",
    description: "Read, write, and manage files in Python.",
    order: 11,
    lesson: `# File Handling

## Reading Files
\`\`\`python
with open("file.txt", "r") as f:
    content = f.read()        # Entire file
    lines = f.readlines()     # List of lines
    
    for line in f:            # Line by line
        print(line.strip())
\`\`\`

## Writing Files
\`\`\`python
with open("output.txt", "w") as f:
    f.write("Hello\\n")
    f.writelines(["line1\\n", "line2\\n"])

# Append mode
with open("log.txt", "a") as f:
    f.write("New entry\\n")
\`\`\`

Note: In this platform, file operations are simulated. Focus on string processing instead.`,
    questions: [
      {
        id: "file-easy-1",
        title: "Line Counter",
        difficulty: "Easy",
        description: "Read multiple lines until 'END'. Print the count of non-empty lines.",
        starterCode: "import sys\nlines = []\nwhile True:\n    line = input()\n    if line == 'END':\n        break\n    lines.append(line)\n# Count non-empty lines\n",
        expectedOutput: "Given input 'hello\\n\\nworld\\nEND', output: '2'",
        hints: ["Filter out empty strings and count"],
        xpReward: 10,
      },
      {
        id: "file-med-1",
        title: "CSV Parser",
        difficulty: "Medium",
        description: "Read CSV-like input (first line: headers, rest: data). Print each record as 'header: value' pairs, records separated by blank lines. Input ends with 'END'.",
        starterCode: "headers = input().split(',')\nrecords = []\nwhile True:\n    line = input()\n    if line == 'END':\n        break\n    records.append(line.split(','))\n# Print formatted records\n",
        expectedOutput: "Formatted key-value pairs for each record",
        hints: ["Use zip(headers, record) for each row"],
        xpReward: 20,
      },
      {
        id: "file-hard-1",
        title: "Log Analyzer",
        difficulty: "Hard",
        description: "Read log entries (format: 'LEVEL: message'). Count entries per level (INFO, WARNING, ERROR). Print counts sorted by level name.",
        starterCode: "logs = []\nwhile True:\n    line = input()\n    if line == 'END':\n        break\n    logs.append(line)\n# Analyze logs\n",
        expectedOutput: "Given log entries, output: 'ERROR: 2\\nINFO: 5\\nWARNING: 3'",
        hints: ["Split each line on ': ' to get the level, use a Counter"],
        xpReward: 30,
      },
    ],
  },
  {
    id: "exception-handling",
    title: "Exception Handling",
    description: "Handle errors gracefully with try/except/finally.",
    order: 12,
    lesson: `# Exception Handling

\`\`\`python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")
except (TypeError, ValueError) as e:
    print(f"Error: {e}")
else:
    print("No errors!")
finally:
    print("This always runs")
\`\`\`

## Custom Exceptions
\`\`\`python
class InsufficientFundsError(Exception):
    def __init__(self, balance, amount):
        self.message = f"Cannot withdraw {amount}, balance is {balance}"
        super().__init__(self.message)
\`\`\`

## Common Exceptions
- \`ValueError\`: Invalid value
- \`TypeError\`: Wrong type
- \`IndexError\`: Index out of range
- \`KeyError\`: Key not in dict
- \`FileNotFoundError\`: File doesn't exist`,
    questions: [
      {
        id: "exc-easy-1",
        title: "Safe Division",
        difficulty: "Easy",
        description: "Read two numbers and print their division result. If division by zero, print 'Error: Division by zero'. If invalid input, print 'Error: Invalid input'.",
        starterCode: "try:\n    a = input()\n    b = input()\n    # Safe division\nexcept:\n    pass\n",
        expectedOutput: "Given input '10\\n0', output: 'Error: Division by zero'",
        hints: ["Catch ZeroDivisionError and ValueError separately"],
        xpReward: 10,
      },
      {
        id: "exc-med-1",
        title: "Robust Input Parser",
        difficulty: "Medium",
        description: "Read lines until 'END'. Each line should be an integer. Print valid integers and count of invalid inputs at the end.",
        starterCode: "valid = []\ninvalid_count = 0\nwhile True:\n    line = input()\n    if line == 'END':\n        break\n    # Parse with error handling\n\nprint(' '.join(map(str, valid)))\nprint(invalid_count)",
        expectedOutput: "Given input '5\\nhello\\n3\\nabc\\nEND', output: '5 3\\n2'",
        hints: ["Use try/except ValueError for each conversion"],
        xpReward: 20,
      },
      {
        id: "exc-hard-1",
        title: "Custom Exception Chain",
        difficulty: "Hard",
        description: "Create a BankAccount class with deposit and withdraw methods. Raise custom InsufficientFundsError when withdrawing more than balance. Process transactions from input.",
        starterCode: "class InsufficientFundsError(Exception):\n    pass\n\nclass BankAccount:\n    def __init__(self, balance=0):\n        self.balance = balance\n    # Add deposit and withdraw methods\n\naccount = BankAccount(int(input()))\nn = int(input())\nfor _ in range(n):\n    parts = input().split()\n    # Process transactions\n",
        expectedOutput: "Process deposits and withdrawals, printing balance after each or error messages",
        hints: ["Withdraw should raise InsufficientFundsError if amount > balance"],
        xpReward: 30,
      },
    ],
  },
  {
    id: "oop-classes",
    title: "OOP - Classes & Objects",
    description: "Learn object-oriented programming with classes, methods, and properties.",
    order: 13,
    lesson: `# Classes & Objects

\`\`\`python
class Dog:
    species = "Canine"  # Class variable
    
    def __init__(self, name, age):
        self.name = name      # Instance variable
        self.age = age
    
    def bark(self):
        return f"{self.name} says Woof!"
    
    def __str__(self):
        return f"Dog({self.name}, {self.age})"
    
    def __repr__(self):
        return self.__str__()

dog = Dog("Buddy", 3)
print(dog.bark())
\`\`\`

## Properties
\`\`\`python
class Circle:
    def __init__(self, radius):
        self._radius = radius
    
    @property
    def radius(self):
        return self._radius
    
    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("Radius cannot be negative")
        self._radius = value
    
    @property
    def area(self):
        return 3.14159 * self._radius ** 2
\`\`\``,
    questions: [
      {
        id: "oop-easy-1",
        title: "Rectangle Class",
        difficulty: "Easy",
        description: "Create a Rectangle class with width and height. Add methods area() and perimeter(). Read w and h, create instance, print area and perimeter.",
        starterCode: "class Rectangle:\n    # Your code here\n    pass\n\nw, h = map(int, input().split())\nrect = Rectangle(w, h)\nprint(rect.area())\nprint(rect.perimeter())",
        expectedOutput: "Given input '5 3', output: '15\\n16'",
        hints: ["area = width * height, perimeter = 2 * (width + height)"],
        xpReward: 10,
      },
      {
        id: "oop-med-1",
        title: "Student Grade Book",
        difficulty: "Medium",
        description: "Create a Student class with name and grades list. Add methods: add_grade(), average(), highest(), lowest(). Process commands from input.",
        starterCode: "class Student:\n    # Your code here\n    pass\n\nname = input()\nstudent = Student(name)\nn = int(input())\nfor _ in range(n):\n    grade = int(input())\n    student.add_grade(grade)\nprint(f'{student.name}: avg={student.average():.1f}, high={student.highest()}, low={student.lowest()}')",
        expectedOutput: "Given name and grades, print formatted stats",
        hints: ["Store grades in a list, use sum/len for average, max/min for extremes"],
        xpReward: 20,
      },
      {
        id: "oop-hard-1",
        title: "Linked List Implementation",
        difficulty: "Hard",
        description: "Implement a LinkedList class with append, prepend, delete, and display methods. Process commands: 'append val', 'prepend val', 'delete val', 'display'.",
        starterCode: "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n    # Implement methods\n\nll = LinkedList()\nn = int(input())\nfor _ in range(n):\n    cmd = input().split()\n    # Process commands\n",
        expectedOutput: "Display shows elements like '1 -> 2 -> 3 -> None'",
        hints: ["Traverse with current = self.head, while current is not None"],
        xpReward: 30,
      },
    ],
  },
  {
    id: "oop-inheritance",
    title: "OOP - Inheritance & Polymorphism",
    description: "Extend classes with inheritance, method overriding, and polymorphism.",
    order: 14,
    lesson: `# Inheritance

\`\`\`python
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        raise NotImplementedError

class Dog(Animal):
    def speak(self):
        return f"{self.name} says Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"
\`\`\`

## Multiple Inheritance
\`\`\`python
class Flyable:
    def fly(self):
        return "Flying!"

class Swimmable:
    def swim(self):
        return "Swimming!"

class Duck(Animal, Flyable, Swimmable):
    def speak(self):
        return "Quack!"
\`\`\`

## super()
\`\`\`python
class Employee(Person):
    def __init__(self, name, age, company):
        super().__init__(name, age)
        self.company = company
\`\`\``,
    questions: [
      {
        id: "inh-easy-1",
        title: "Shape Hierarchy",
        difficulty: "Easy",
        description: "Create Shape base class with area() method. Create Circle and Square subclasses. Read shape type and dimensions, print area rounded to 2 decimals.",
        starterCode: "import math\n\nclass Shape:\n    def area(self):\n        raise NotImplementedError\n\n# Create Circle and Square classes\n\nshape_type = input()\nif shape_type == 'circle':\n    r = float(input())\n    s = Circle(r)\nelse:\n    side = float(input())\n    s = Square(side)\nprint(f'{s.area():.2f}')",
        expectedOutput: "Given input 'circle\\n5', output: '78.54'",
        hints: ["Circle area = π*r², Square area = side²"],
        xpReward: 10,
      },
      {
        id: "inh-med-1",
        title: "Vehicle System",
        difficulty: "Medium",
        description: "Create Vehicle base class with make, model, year. Create Car (doors) and Motorcycle (type) subclasses. Each has describe() method. Process input to create and describe vehicles.",
        starterCode: "class Vehicle:\n    # Your code here\n    pass\n\n# Create subclasses\n\nn = int(input())\nfor _ in range(n):\n    parts = input().split(',')\n    # Create and describe vehicle\n",
        expectedOutput: "Formatted vehicle descriptions",
        hints: ["Use super().__init__() in subclass constructors"],
        xpReward: 20,
      },
      {
        id: "inh-hard-1",
        title: "Abstract Expression Evaluator",
        difficulty: "Hard",
        description: "Create an expression tree using inheritance. Base class Expr with evaluate(). Subclasses: Num, Add, Mul. Parse simple expressions like '(+ 3 (* 2 4))' and evaluate.",
        starterCode: "class Expr:\n    def evaluate(self):\n        raise NotImplementedError\n\n# Implement Num, Add, Mul classes\n# Parse and evaluate the expression\n\nexpression = input()\n# Parse and print result\n",
        expectedOutput: "Given input '(+ 3 (* 2 4))', output: '11'",
        hints: ["Recursively parse: if starts with '(+' create Add, '(*' create Mul, else Num"],
        xpReward: 30,
      },
    ],
  },
  {
    id: "modules-packages",
    title: "Modules & Imports",
    description: "Use built-in modules and understand the import system.",
    order: 15,
    lesson: `# Modules & Imports

## Common Built-in Modules
\`\`\`python
import math
math.sqrt(16)    # 4.0
math.pi          # 3.14159...
math.ceil(3.2)   # 4
math.floor(3.8)  # 3

import random
random.randint(1, 10)
random.choice([1, 2, 3])
random.shuffle(my_list)

import datetime
now = datetime.datetime.now()

from collections import Counter, defaultdict, deque
from itertools import permutations, combinations
\`\`\`

## Import Styles
\`\`\`python
import math                    # Full import
from math import sqrt, pi      # Selective
from math import *             # All (avoid!)
import numpy as np             # Alias
\`\`\``,
    questions: [
      {
        id: "mod-easy-1",
        title: "Math Operations",
        difficulty: "Easy",
        description: "Read a float. Print its ceil, floor, and square root (2 decimals), each on a separate line.",
        starterCode: "import math\nx = float(input())\n# Print ceil, floor, sqrt\n",
        expectedOutput: "Given input '7.3', output: '8\\n7\\n2.70'",
        hints: ["math.ceil(), math.floor(), math.sqrt()"],
        xpReward: 10,
      },
      {
        id: "mod-med-1",
        title: "Counter Usage",
        difficulty: "Medium",
        description: "Read a string. Using collections.Counter, find the 3 most common characters and their counts. Print each as 'char: count'.",
        starterCode: "from collections import Counter\ns = input()\n# Find 3 most common\n",
        expectedOutput: "Given input 'aabbbcccc', output top 3 chars with counts",
        hints: ["Use Counter(s).most_common(3)"],
        xpReward: 20,
      },
      {
        id: "mod-hard-1",
        title: "Permutation Counter",
        difficulty: "Hard",
        description: "Read a string. Count unique permutations that are palindromes. Print the count. (Use itertools for small inputs or math for the formula.)",
        starterCode: "from math import factorial\nfrom collections import Counter\ns = input()\n# Count palindrome permutations\n",
        expectedOutput: "Given input 'aabb', output: '2' (abba, baab)",
        hints: ["A palindrome permutation exists if at most one char has odd count. Count using factorial formula."],
        xpReward: 30,
      },
    ],
  },
  {
    id: "decorators",
    title: "Decorators",
    description: "Learn to modify function behavior with decorators.",
    order: 16,
    lesson: `# Decorators

A decorator wraps a function to extend its behavior.

\`\`\`python
def timer(func):
    import time
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"{func.__name__} took {time.time()-start:.4f}s")
        return result
    return wrapper

@timer
def slow_function():
    import time
    time.sleep(1)
\`\`\`

## Decorators with Arguments
\`\`\`python
def repeat(n):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(n):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def say_hello():
    print("Hello!")
\`\`\``,
    questions: [
      {
        id: "dec-easy-1",
        title: "Call Counter Decorator",
        difficulty: "Easy",
        description: "Create a decorator that counts how many times a function is called. After calling the function n times, print the count.",
        starterCode: "def count_calls(func):\n    # Your decorator\n    pass\n\n@count_calls\ndef greet():\n    print('Hello')\n\nn = int(input())\nfor _ in range(n):\n    greet()\nprint(greet.call_count)",
        expectedOutput: "Given input '3', output: 'Hello\\nHello\\nHello\\n3'",
        hints: ["Add a call_count attribute to the wrapper function"],
        xpReward: 10,
      },
      {
        id: "dec-med-1",
        title: "Memoize Decorator",
        difficulty: "Medium",
        description: "Create a memoize decorator that caches results. Apply to fibonacci. Print fib(n).",
        starterCode: "def memoize(func):\n    # Your decorator\n    pass\n\n@memoize\ndef fib(n):\n    if n <= 1:\n        return n\n    return fib(n-1) + fib(n-2)\n\nn = int(input())\nprint(fib(n))",
        expectedOutput: "Given input '40', output: '102334155'",
        hints: ["Use a dict as cache inside the decorator"],
        xpReward: 20,
      },
      {
        id: "dec-hard-1",
        title: "Retry Decorator with Backoff",
        difficulty: "Hard",
        description: "Create a retry(max_attempts, delay) decorator. Simulate a function that fails randomly. Print attempt numbers and final result or 'Failed after N attempts'.",
        starterCode: "import random\nrandom.seed(int(input()))\n\ndef retry(max_attempts=3):\n    # Your decorator\n    pass\n\n@retry(max_attempts=5)\ndef unreliable():\n    if random.random() < 0.7:\n        raise Exception('Random failure')\n    return 'Success'\n\ntry:\n    result = unreliable()\n    print(result)\nexcept Exception as e:\n    print(str(e))",
        expectedOutput: "Shows attempt numbers and either Success or failure message",
        hints: ["Loop up to max_attempts, catch exceptions, re-raise on last attempt"],
        xpReward: 30,
      },
    ],
  },
  {
    id: "generators",
    title: "Generators & Iterators",
    description: "Create memory-efficient sequences with generators.",
    order: 17,
    lesson: `# Generators

Generators yield values one at a time, saving memory.

\`\`\`python
def count_up(n):
    i = 0
    while i < n:
        yield i
        i += 1

for num in count_up(5):
    print(num)   # 0,1,2,3,4
\`\`\`

## Generator Expressions
\`\`\`python
squares = (x**2 for x in range(1000000))  # No memory issue!
print(sum(squares))
\`\`\`

## Iterator Protocol
\`\`\`python
class Countdown:
    def __init__(self, start):
        self.start = start
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.start <= 0:
            raise StopIteration
        self.start -= 1
        return self.start + 1
\`\`\``,
    questions: [
      {
        id: "gen-easy-1",
        title: "Range Generator",
        difficulty: "Easy",
        description: "Create a generator that yields even numbers from 0 to n (inclusive). Print them space-separated.",
        starterCode: "def even_gen(n):\n    # Your generator\n    pass\n\nn = int(input())\nprint(' '.join(map(str, even_gen(n))))",
        expectedOutput: "Given input '10', output: '0 2 4 6 8 10'",
        hints: ["Use yield in a loop, stepping by 2"],
        xpReward: 10,
      },
      {
        id: "gen-med-1",
        title: "Fibonacci Generator",
        difficulty: "Medium",
        description: "Create an infinite fibonacci generator. Print the first n fibonacci numbers space-separated.",
        starterCode: "def fib_gen():\n    # Infinite fibonacci generator\n    pass\n\nn = int(input())\ngen = fib_gen()\nprint(' '.join(str(next(gen)) for _ in range(n)))",
        expectedOutput: "Given input '10', output: '0 1 1 2 3 5 8 13 21 34'",
        hints: ["Use two variables a, b and yield a, then a, b = b, a+b"],
        xpReward: 20,
      },
      {
        id: "gen-hard-1",
        title: "Chunked Iterator",
        difficulty: "Hard",
        description: "Create a generator that takes an iterable and chunk size, yields lists of that size. Last chunk may be smaller. Print each chunk on a line.",
        starterCode: "def chunked(iterable, size):\n    # Your generator\n    pass\n\ndata = list(map(int, input().split()))\nsize = int(input())\nfor chunk in chunked(data, size):\n    print(' '.join(map(str, chunk)))",
        expectedOutput: "Given input '1 2 3 4 5 6 7\\n3', output: '1 2 3\\n4 5 6\\n7'",
        hints: ["Use itertools.islice or manual indexing with range(0, len, size)"],
        xpReward: 30,
      },
    ],
  },
  {
    id: "regex",
    title: "Regular Expressions",
    description: "Pattern matching and text processing with regex.",
    order: 18,
    lesson: `# Regular Expressions

\`\`\`python
import re

# Basic patterns
re.search(r'\\d+', 'abc123')      # Match: '123'
re.findall(r'\\d+', 'a1b2c3')     # ['1', '2', '3']
re.sub(r'\\d', 'X', 'a1b2')       # 'aXbX'
re.match(r'^Hello', 'Hello World') # Match at start

# Special characters
# \\d = digit, \\w = word char, \\s = whitespace
# .  = any char, * = 0+, + = 1+, ? = 0 or 1
# [] = char class, () = group
\`\`\`

## Groups
\`\`\`python
m = re.search(r'(\\w+)@(\\w+)\\.(\\w+)', 'user@example.com')
m.group(1)  # 'user'
m.group(2)  # 'example'
\`\`\``,
    questions: [
      {
        id: "re-easy-1",
        title: "Extract Numbers",
        difficulty: "Easy",
        description: "Read a string and print all numbers found, space-separated.",
        starterCode: "import re\ns = input()\n# Extract all numbers\n",
        expectedOutput: "Given input 'abc123def456', output: '123 456'",
        hints: ["Use re.findall(r'\\d+', s)"],
        xpReward: 10,
      },
      {
        id: "re-med-1",
        title: "Email Validator",
        difficulty: "Medium",
        description: "Read n email addresses. Print 'Valid' or 'Invalid' for each. Valid: letters/digits/._- before @, letters/digits after @, dot then 2-4 letters.",
        starterCode: "import re\nn = int(input())\nfor _ in range(n):\n    email = input()\n    # Validate email\n",
        expectedOutput: "Given emails, print Valid or Invalid for each",
        hints: ["Pattern: r'^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\\.[a-zA-Z]{2,4}$'"],
        xpReward: 20,
      },
      {
        id: "re-hard-1",
        title: "HTML Tag Parser",
        difficulty: "Hard",
        description: "Read HTML-like text. Extract all tag names and their content. Print as 'tag: content' for each match. Handle nested tags by extracting innermost first.",
        starterCode: "import re\nhtml = input()\n# Extract tags and content\n",
        expectedOutput: "Given '<b>bold</b> and <i>italic</i>', output: 'b: bold\\ni: italic'",
        hints: ["Use re.findall(r'<(\\w+)>([^<]*)</\\1>', html) for simple cases"],
        xpReward: 30,
      },
    ],
  },
  {
    id: "advanced-collections",
    title: "Advanced: Collections & Itertools",
    description: "Master advanced data structures and iteration tools.",
    order: 19,
    lesson: `# Advanced Collections & Itertools

## Collections
\`\`\`python
from collections import Counter, defaultdict, deque, OrderedDict

# Counter
c = Counter("abracadabra")  # Counter({'a':5, 'b':2, ...})

# defaultdict
dd = defaultdict(list)
dd['key'].append(1)  # No KeyError!

# deque - double-ended queue
dq = deque([1, 2, 3])
dq.appendleft(0)
dq.pop()
dq.popleft()
dq.rotate(1)
\`\`\`

## Itertools
\`\`\`python
from itertools import chain, product, groupby, accumulate

list(chain([1,2], [3,4]))        # [1,2,3,4]
list(product('AB', '12'))         # [('A','1'),('A','2'),...]
list(accumulate([1,2,3,4]))      # [1,3,6,10]
\`\`\``,
    questions: [
      {
        id: "adv-easy-1",
        title: "Most Common Element",
        difficulty: "Easy",
        description: "Read space-separated elements. Print the most common element and its count.",
        starterCode: "from collections import Counter\nelements = input().split()\n# Find most common\n",
        expectedOutput: "Given input 'a b a c a b', output: 'a 3'",
        hints: ["Counter(elements).most_common(1)"],
        xpReward: 10,
      },
      {
        id: "adv-med-1",
        title: "Group Consecutive",
        difficulty: "Medium",
        description: "Read space-separated integers. Group consecutive equal elements. Print each group as 'value: count'.",
        starterCode: "from itertools import groupby\nnums = list(map(int, input().split()))\n# Group consecutive\n",
        expectedOutput: "Given input '1 1 2 2 2 3 1 1', output: '1: 2\\n2: 3\\n3: 1\\n1: 2'",
        hints: ["Use groupby and count elements in each group with len(list(group))"],
        xpReward: 20,
      },
      {
        id: "adv-hard-1",
        title: "LRU Cache Implementation",
        difficulty: "Hard",
        description: "Implement an LRU Cache using OrderedDict with get and put operations. Capacity from first line. Process operations: 'get key' or 'put key value'.",
        starterCode: "from collections import OrderedDict\n\nclass LRUCache:\n    def __init__(self, capacity):\n        self.capacity = capacity\n        self.cache = OrderedDict()\n    # Implement get and put\n\ncap = int(input())\ncache = LRUCache(cap)\nn = int(input())\nfor _ in range(n):\n    cmd = input().split()\n    # Process commands\n",
        expectedOutput: "Print value for 'get' (-1 if not found), nothing for 'put'",
        hints: ["On access, move to end. On put, if full, pop first item (least recently used)."],
        xpReward: 30,
      },
    ],
  },
  {
    id: "algorithms-sorting",
    title: "Algorithms: Sorting & Searching",
    description: "Implement classic sorting and searching algorithms.",
    order: 20,
    lesson: `# Sorting & Searching

## Binary Search
\`\`\`python
def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1
\`\`\`

## Sorting Algorithms
\`\`\`python
# Quick Sort
def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

# Python's built-in sort uses TimSort (hybrid)
sorted(arr)           # Returns new list
arr.sort()            # In-place
arr.sort(key=len)     # Custom key
\`\`\``,
    questions: [
      {
        id: "algo-easy-1",
        title: "Binary Search",
        difficulty: "Easy",
        description: "Read a sorted list and a target. Print the index of the target, or -1 if not found. Use binary search.",
        starterCode: "nums = list(map(int, input().split()))\ntarget = int(input())\n# Binary search\n",
        expectedOutput: "Given input '1 3 5 7 9\\n5', output: '2'",
        hints: ["Use lo, hi pointers and mid = (lo + hi) // 2"],
        xpReward: 10,
      },
      {
        id: "algo-med-1",
        title: "Merge Sort",
        difficulty: "Medium",
        description: "Implement merge sort. Read a list and print the sorted result space-separated.",
        starterCode: "def merge_sort(arr):\n    # Your implementation\n    pass\n\nnums = list(map(int, input().split()))\nresult = merge_sort(nums)\nprint(' '.join(map(str, result)))",
        expectedOutput: "Given input '38 27 43 3 9 82 10', output: '3 9 10 27 38 43 82'",
        hints: ["Split in half, recursively sort, then merge two sorted halves"],
        xpReward: 20,
      },
      {
        id: "algo-hard-1",
        title: "Kth Largest Element",
        difficulty: "Hard",
        description: "Find the kth largest element using quickselect (average O(n)). Read list and k. Print the result.",
        starterCode: "import random\nnums = list(map(int, input().split()))\nk = int(input())\n# Quickselect algorithm\n",
        expectedOutput: "Given input '3 2 1 5 6 4\\n2', output: '5'",
        hints: ["Partition around pivot, recurse into the correct half based on k"],
        xpReward: 30,
      },
    ],
  },
];
