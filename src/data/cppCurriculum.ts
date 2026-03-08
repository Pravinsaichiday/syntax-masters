import type { CurriculumTrack } from "./curriculumTypes";

export const CPP_CURRICULUM: CurriculumTrack = {
  id: "learn-cpp",
  title: "Learn C++ Programming",
  description: "Master C++ — STL, OOP, Templates, and Modern C++ features.",
  icon: "🔷",
  language: "C++",
  topics: [
    {
      id: "cpp-intro",
      title: "Introduction to C++",
      description: "C++ basics, I/O streams, and differences from C.",
      order: 1,
      realWorldAnalogy: "C++ is like C with superpowers — if C is a manual car, C++ gives you automatic transmission (classes), GPS (STL), and a turbo engine (templates). You still have full control, but with more tools at your disposal.",
      lesson: `# Introduction to C++

C++ was developed by Bjarne Stroustrup in 1979 as an extension of C. It adds object-oriented features, the Standard Template Library (STL), and many modern features.

## C++ vs C
- C++ has **classes and objects** (OOP)
- C++ has **STL** (vectors, maps, sets, algorithms)
- C++ has **references** (safer than pointers)
- C++ has **templates** (generic programming)
- C++ uses **cin/cout** instead of scanf/printf

## Your First C++ Program
\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, C++!" << endl;
    return 0;
}
\`\`\`

## Input/Output
\`\`\`cpp
int n;
string name;
cin >> n >> name;
cout << "Hello " << name << ", you entered " << n << endl;

// For full line input
getline(cin, name);
\`\`\`

## Data Types
\`\`\`cpp
int n = 42;
double d = 3.14;
char c = 'A';
string s = "Hello";  // C++ string class
bool b = true;
auto x = 42;  // Type inference (C++11)
\`\`\``,
      codeExamples: {
        "C++": `#include <iostream>\nusing namespace std;\n\nint main() {\n    string name;\n    int age;\n    cout << "Enter name and age: ";\n    cin >> name >> age;\n    cout << "Hello " << name << "! You are " << age << " years old." << endl;\n    return 0;\n}`,
        C: `#include <stdio.h>\nint main() {\n    char name[50];\n    int age;\n    printf("Enter name and age: ");\n    scanf("%s %d", name, &age);\n    printf("Hello %s! You are %d years old.\\n", name, age);\n    return 0;\n}`,
        Java: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.print("Enter name and age: ");\n        String name = sc.next();\n        int age = sc.nextInt();\n        System.out.println("Hello " + name + "! You are " + age + " years old.");\n    }\n}`,
        Python: `name = input("Enter name: ")\nage = int(input("Enter age: "))\nprint(f"Hello {name}! You are {age} years old.")`,
      },
      questions: [
        {
          id: "cpp-intro-1",
          title: "Hello C++",
          difficulty: "Easy",
          description: "Write a C++ program that prints 'Hello, C++!'",
          starterCode: { "C++": '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Print Hello, C++!\n    return 0;\n}' },
          expectedOutput: "Hello, C++!",
          hints: ["Use cout << \"Hello, C++!\" << endl;"],
          xpReward: 10,
        },
        {
          id: "cpp-intro-2",
          title: "Sum Calculator",
          difficulty: "Easy",
          description: "Read two integers and print their sum.",
          starterCode: { "C++": '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    // Print sum\n    return 0;\n}' },
          expectedOutput: "Given input '3 5', output: '8'",
          hints: ["cout << a + b << endl;"],
          xpReward: 10,
        },
      ],
      quiz: [
        {
          question: "What is the C++ equivalent of printf?",
          options: ["print()", "cout", "write()", "output()"],
          correctIndex: 1,
          explanation: "cout (character output) is C++'s output stream, used with << operator.",
        },
      ],
      referenceLinks: [
        { title: "C++ Tutorial - W3Schools", url: "https://www.w3schools.com/cpp/" },
        { title: "C++ Reference", url: "https://en.cppreference.com/" },
      ],
    },
    {
      id: "cpp-stl",
      title: "Standard Template Library (STL)",
      description: "Vectors, maps, sets, stacks, queues, and STL algorithms.",
      order: 2,
      realWorldAnalogy: "The STL is like a well-equipped kitchen — instead of building your own oven, mixer, and knife set, everything is provided and optimized. Vectors are adjustable shelves, maps are labeled spice racks, and sets are cookie cutters that ensure unique shapes.",
      lesson: `# STL — Standard Template Library

## Vectors (Dynamic Arrays)
\`\`\`cpp
vector<int> v = {1, 2, 3, 4, 5};
v.push_back(6);         // Add to end
v.pop_back();            // Remove last
v.size();                // Length
v[0];                    // Access element
sort(v.begin(), v.end()); // Sort
\`\`\`

## Maps (Key-Value)
\`\`\`cpp
map<string, int> m;
m["Alice"] = 90;
m["Bob"] = 85;
m.count("Alice");  // 1 (exists)
for (auto& [key, val] : m) cout << key << ": " << val << endl;
\`\`\`

## Sets (Unique Elements)
\`\`\`cpp
set<int> s = {3, 1, 4, 1, 5};
// s = {1, 3, 4, 5} — sorted, unique
s.insert(2);
s.count(3); // 1
\`\`\`

## STL Algorithms
\`\`\`cpp
#include <algorithm>
sort(v.begin(), v.end());
reverse(v.begin(), v.end());
auto it = find(v.begin(), v.end(), 42);
int cnt = count(v.begin(), v.end(), 3);
int mx = *max_element(v.begin(), v.end());
\`\`\``,
      codeExamples: {
        "C++": `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    vector<int> v = {5, 2, 8, 1, 9};\n    sort(v.begin(), v.end());\n    for (int x : v) cout << x << " "; // 1 2 5 8 9\n    cout << endl;\n    \n    map<string, int> freq;\n    vector<string> words = {"hello", "world", "hello"};\n    for (auto& w : words) freq[w]++;\n    for (auto& [k, v] : freq) cout << k << ": " << v << endl;\n}`,
        Java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<Integer> v = new ArrayList<>(Arrays.asList(5, 2, 8, 1, 9));\n        Collections.sort(v);\n        System.out.println(v);\n        \n        HashMap<String, Integer> freq = new HashMap<>();\n        for (String w : new String[]{"hello", "world", "hello"})\n            freq.merge(w, 1, Integer::sum);\n        freq.forEach((k, val) -> System.out.println(k + ": " + val));\n    }\n}`,
        Python: `v = [5, 2, 8, 1, 9]\nv.sort()\nprint(v)  # [1, 2, 5, 8, 9]\n\nfrom collections import Counter\nfreq = Counter(["hello", "world", "hello"])\nfor k, v in freq.items():\n    print(f"{k}: {v}")`,
        C: `// C has no STL — use manual implementations\n#include <stdio.h>\n#include <stdlib.h>\n\nint cmp(const void *a, const void *b) { return *(int*)a - *(int*)b; }\n\nint main() {\n    int arr[] = {5, 2, 8, 1, 9};\n    qsort(arr, 5, sizeof(int), cmp);\n    for (int i = 0; i < 5; i++) printf("%d ", arr[i]);\n    return 0;\n}`,
      },
      questions: [
        {
          id: "cpp-stl-1",
          title: "Unique Elements Count",
          difficulty: "Easy",
          description: "Read N integers and print the count of unique elements.",
          starterCode: { "C++": '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // Read elements and count unique\n    return 0;\n}' },
          expectedOutput: "Given input '7\\n1 2 2 3 3 3 4', output: '4'",
          hints: ["Use a set — set.size() gives unique count"],
          xpReward: 10,
        },
        {
          id: "cpp-stl-2",
          title: "Frequency Sort",
          difficulty: "Medium",
          description: "Read N integers and print them sorted by frequency (most frequent first). If tied, smaller number first.",
          starterCode: { "C++": '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<int> arr(n);\n    for (int &x : arr) cin >> x;\n    // Sort by frequency\n    return 0;\n}' },
          expectedOutput: "Sorted by frequency",
          hints: ["Use map for frequency, then custom sort comparator"],
          xpReward: 25,
        },
      ],
      quiz: [
        {
          question: "What is the time complexity of inserting into a std::map?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
          correctIndex: 1,
          explanation: "std::map is implemented as a balanced BST (red-black tree), so insert/find operations are O(log n). Use unordered_map for O(1) average.",
        },
      ],
      referenceLinks: [
        { title: "C++ STL - GeeksforGeeks", url: "https://www.geeksforgeeks.org/the-c-standard-template-library-stl/" },
        { title: "C++ Reference - STL", url: "https://en.cppreference.com/w/cpp/container" },
      ],
    },
    {
      id: "cpp-oop",
      title: "OOP in C++",
      description: "Classes, inheritance, polymorphism, virtual functions, and operator overloading.",
      order: 3,
      realWorldAnalogy: "C++ OOP is like a family business. The parent class is the original business with its methods. Child classes inherit the business but can specialize — one becomes a bakery, another a cafe. Virtual functions let each branch operate independently while sharing the family name.",
      lesson: `# OOP in C++

## Classes
\`\`\`cpp
class Rectangle {
private:
    double width, height;
public:
    Rectangle(double w, double h) : width(w), height(h) {}
    double area() const { return width * height; }
    double perimeter() const { return 2 * (width + height); }
};
\`\`\`

## Inheritance & Virtual Functions
\`\`\`cpp
class Shape {
public:
    virtual double area() = 0;  // Pure virtual (abstract)
    virtual ~Shape() {}
};

class Circle : public Shape {
    double r;
public:
    Circle(double r) : r(r) {}
    double area() override { return 3.14159 * r * r; }
};
\`\`\`

## Operator Overloading
\`\`\`cpp
class Point {
public:
    int x, y;
    Point operator+(const Point& other) {
        return {x + other.x, y + other.y};
    }
};
\`\`\``,
      codeExamples: {
        "C++": `#include <iostream>\n#include <cmath>\nusing namespace std;\n\nclass Shape {\npublic:\n    virtual double area() = 0;\n    virtual string name() = 0;\n    virtual ~Shape() {}\n};\n\nclass Circle : public Shape {\n    double r;\npublic:\n    Circle(double r) : r(r) {}\n    double area() override { return M_PI * r * r; }\n    string name() override { return "Circle"; }\n};\n\nclass Rectangle : public Shape {\n    double w, h;\npublic:\n    Rectangle(double w, double h) : w(w), h(h) {}\n    double area() override { return w * h; }\n    string name() override { return "Rectangle"; }\n};\n\nint main() {\n    Shape* shapes[] = { new Circle(5), new Rectangle(3, 4) };\n    for (auto s : shapes) {\n        cout << s->name() << " area: " << s->area() << endl;\n        delete s;\n    }\n}`,
        Java: `abstract class Shape {\n    abstract double area();\n    abstract String name();\n}\n\nclass Circle extends Shape {\n    double r;\n    Circle(double r) { this.r = r; }\n    double area() { return Math.PI * r * r; }\n    String name() { return "Circle"; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Shape[] shapes = { new Circle(5) };\n        for (Shape s : shapes)\n            System.out.println(s.name() + " area: " + s.area());\n    }\n}`,
        Python: `from abc import ABC, abstractmethod\nimport math\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self): pass\n\nclass Circle(Shape):\n    def __init__(self, r): self.r = r\n    def area(self): return math.pi * self.r ** 2\n\nfor s in [Circle(5)]:\n    print(f"Area: {s.area():.2f}")`,
        C: `// OOP simulation with structs\n#include <stdio.h>\n#include <math.h>\n\ntypedef struct {\n    double r;\n    double (*area)(double);\n} Circle;\n\ndouble circle_area(double r) { return M_PI * r * r; }\n\nint main() {\n    Circle c = {5, circle_area};\n    printf("Area: %.2f\\n", c.area(c.r));\n    return 0;\n}`,
      },
      questions: [
        {
          id: "cpp-oop-1",
          title: "Class Design",
          difficulty: "Medium",
          description: "Create a Student class with name, age, and GPA. Implement a constructor, a display method, and a method to check if the student has honors (GPA >= 3.5). Read data and display.",
          starterCode: { "C++": '#include <iostream>\nusing namespace std;\n\nclass Student {\n    // Define Student class\n};\n\nint main() {\n    string name;\n    int age;\n    double gpa;\n    cin >> name >> age >> gpa;\n    // Create Student and display info\n    return 0;\n}' },
          expectedOutput: "Student info with honors check",
          hints: ["Use constructor initializer list"],
          xpReward: 20,
        },
      ],
      quiz: [
        {
          question: "What is a pure virtual function in C++?",
          options: ["A function with no return value", "A function declared with = 0 that must be overridden", "A private function", "A template function"],
          correctIndex: 1,
          explanation: "A pure virtual function (declared with = 0) makes a class abstract and must be overridden by derived classes.",
        },
      ],
      referenceLinks: [
        { title: "C++ OOP - W3Schools", url: "https://www.w3schools.com/cpp/cpp_oop.asp" },
      ],
    },
  ],
};
