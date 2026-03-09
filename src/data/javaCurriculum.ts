import type { CurriculumTrack } from "./curriculumTypes";

export const JAVA_CURRICULUM: CurriculumTrack = {
  id: "learn-java",
  title: "Learn Java Programming",
  description: "Master Java — OOP, Collections, Multithreading, and Design Patterns.",
  icon: "coffee",
  language: "Java",
  topics: [
    {
      id: "java-intro",
      title: "Introduction to Java",
      description: "JVM, JDK, your first Java program, and basic I/O.",
      order: 1,
      realWorldAnalogy: "Java is like a universal translator — you write code once, and the JVM translates it to run on any device. It's like writing a letter that can be read in any language because the translator (JVM) exists everywhere.",
      lesson: `# Introduction to Java

Java was created by James Gosling at Sun Microsystems in 1995. Its motto is **"Write Once, Run Anywhere"** (WORA).

## How Java Works
1. You write **.java** source files
2. The **javac** compiler converts them to **.class** bytecode
3. The **JVM** (Java Virtual Machine) runs the bytecode on any platform

## Your First Program
\`\`\`java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

## Taking Input
\`\`\`java
import java.util.Scanner;

Scanner sc = new Scanner(System.in);
String name = sc.nextLine();
int age = sc.nextInt();
double gpa = sc.nextDouble();
\`\`\`

## Key Concepts
- Everything is inside a **class**
- Execution starts from **main()** method
- Java is **strongly typed** — you must declare variable types
- Java is **object-oriented** by design`,
      codeExamples: {
        C: `#include <stdio.h>\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`,
        "C++": `#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`,
        Java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
        Python: `print("Hello, World!")`,
      },
      visualization: `Java Compilation Process:
┌──────────┐    javac    ┌──────────┐    JVM     ┌──────────┐
│ Main.java│ ──────────► │Main.class│ ─────────► │  Output  │
│ (source) │  compiler   │(bytecode)│  runtime   │          │
└──────────┘             └──────────┘            └──────────┘
                    ↕ Runs on any OS with JVM installed`,
      questions: [
        {
          id: "java-intro-1",
          title: "Hello World",
          difficulty: "Easy",
          description: "Write a Java program that prints 'Hello, Java!'",
          starterCode: { Java: 'import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Print Hello, Java!\n    }\n}' },
          expectedOutput: "Hello, Java!",
          hints: ["Use System.out.println()"],
          xpReward: 10,
        },
        {
          id: "java-intro-2",
          title: "Sum of Two Numbers",
          difficulty: "Easy",
          description: "Read two integers and print their sum.",
          starterCode: { Java: 'import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Read two integers and print sum\n    }\n}' },
          expectedOutput: "Given input '3 5', output: '8'",
          hints: ["Use sc.nextInt() twice"],
          xpReward: 10,
        },
        {
          id: "java-intro-3",
          title: "Rectangle Area",
          difficulty: "Medium",
          description: "Read length and width (doubles) and print the area with 2 decimal places.",
          starterCode: { Java: 'import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Read length and width, print area\n    }\n}' },
          expectedOutput: "Given input '4.5 3.2', output: '14.40'",
          hints: ["Use System.out.printf(\"%.2f\", area)"],
          xpReward: 20,
        },
      ],
      quiz: [
        {
          question: "What does JVM stand for?",
          options: ["Java Virtual Machine", "Java Variable Manager", "Java Version Manager", "Java Visual Monitor"],
          correctIndex: 0,
          explanation: "JVM = Java Virtual Machine. It's the engine that runs Java bytecode on any platform.",
        },
        {
          question: "What is the entry point of a Java program?",
          options: ["start()", "init()", "main()", "run()"],
          correctIndex: 2,
          explanation: "The main() method with signature 'public static void main(String[] args)' is the entry point.",
        },
      ],
      referenceLinks: [
        { title: "Java Tutorial - W3Schools", url: "https://www.w3schools.com/java/" },
        { title: "Java Documentation", url: "https://docs.oracle.com/en/java/" },
      ],
    },
    {
      id: "java-oop",
      title: "Object-Oriented Programming",
      description: "Classes, objects, inheritance, polymorphism, abstraction, and encapsulation.",
      order: 2,
      realWorldAnalogy: "OOP is like a car factory. The blueprint (class) defines how to build a car. Each car built from it (object) is an instance. Different models (inheritance) share common features but add their own. Encapsulation is like the engine compartment — you drive without knowing the internals.",
      lesson: `# Object-Oriented Programming in Java

## Classes and Objects
\`\`\`java
class Dog {
    String name;
    int age;
    
    Dog(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    void bark() {
        System.out.println(name + " says Woof!");
    }
}

Dog myDog = new Dog("Buddy", 3);
myDog.bark();
\`\`\`

## Four Pillars of OOP

### 1. Encapsulation
\`\`\`java
class BankAccount {
    private double balance;
    
    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }
    
    public double getBalance() { return balance; }
}
\`\`\`

### 2. Inheritance
\`\`\`java
class Animal { void eat() { System.out.println("eating"); } }
class Dog extends Animal { void bark() { System.out.println("woof"); } }
\`\`\`

### 3. Polymorphism
\`\`\`java
Animal a = new Dog(); // Upcasting
a.eat(); // Works — Dog IS an Animal
\`\`\`

### 4. Abstraction
\`\`\`java
abstract class Shape {
    abstract double area();
}
class Circle extends Shape {
    double radius;
    double area() { return Math.PI * radius * radius; }
}
\`\`\``,
      codeExamples: {
        Java: `class Animal {\n    String name;\n    Animal(String name) { this.name = name; }\n    void speak() { System.out.println(name + " makes a sound"); }\n}\n\nclass Dog extends Animal {\n    Dog(String name) { super(name); }\n    void speak() { System.out.println(name + " barks"); }\n}\n\nclass Cat extends Animal {\n    Cat(String name) { super(name); }\n    void speak() { System.out.println(name + " meows"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Animal[] animals = { new Dog("Buddy"), new Cat("Whiskers") };\n        for (Animal a : animals) a.speak();\n    }\n}`,
        Python: `class Animal:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        print(f"{self.name} makes a sound")\n\nclass Dog(Animal):\n    def speak(self):\n        print(f"{self.name} barks")\n\nclass Cat(Animal):\n    def speak(self):\n        print(f"{self.name} meows")\n\nfor a in [Dog("Buddy"), Cat("Whiskers")]:\n    a.speak()`,
        "C++": `#include <iostream>\nusing namespace std;\n\nclass Animal {\npublic:\n    string name;\n    Animal(string n) : name(n) {}\n    virtual void speak() { cout << name << " makes a sound" << endl; }\n};\n\nclass Dog : public Animal {\npublic:\n    Dog(string n) : Animal(n) {}\n    void speak() override { cout << name << " barks" << endl; }\n};\n\nint main() {\n    Dog d("Buddy");\n    d.speak();\n}`,
        C: `// C doesn't have native OOP\n// You can simulate with structs and function pointers\n#include <stdio.h>\n\ntypedef struct {\n    char name[50];\n    void (*speak)(const char*);\n} Animal;\n\nvoid dog_speak(const char *name) {\n    printf("%s barks\\n", name);\n}\n\nint main() {\n    Animal dog = {"Buddy", dog_speak};\n    dog.speak(dog.name);\n    return 0;\n}`,
      },
      questions: [
        {
          id: "java-oop-1",
          title: "Shape Area Calculator",
          difficulty: "Medium",
          description: "Create a class hierarchy: Shape (abstract) with Circle and Rectangle subclasses. Read shape type ('circle' or 'rectangle'), dimensions, and print the area.",
          starterCode: { Java: 'import java.util.*;\n\npublic class Main {\n    // Define abstract Shape class and subclasses\n    \n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String type = sc.next();\n        // Create appropriate shape and print area\n    }\n}' },
          expectedOutput: "Given input 'circle 5', output area of circle",
          hints: ["Use abstract class with abstract area() method"],
          xpReward: 25,
        },
      ],
      quiz: [
        {
          question: "Which keyword is used for inheritance in Java?",
          options: ["inherits", "extends", "implements", "derives"],
          correctIndex: 1,
          explanation: "'extends' is used for class inheritance. 'implements' is used for interfaces.",
        },
      ],
      referenceLinks: [
        { title: "Java OOP - GeeksforGeeks", url: "https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/" },
      ],
    },
    {
      id: "java-collections",
      title: "Collections Framework",
      description: "ArrayList, HashMap, HashSet, LinkedList, and more.",
      order: 3,
      realWorldAnalogy: "Collections are like different types of containers: ArrayList is a resizable filing cabinet, HashMap is a dictionary (look up by word), HashSet is a bag of unique marbles, and Queue is a line at a store.",
      lesson: `# Java Collections Framework

## ArrayList
\`\`\`java
ArrayList<String> list = new ArrayList<>();
list.add("Apple");
list.add("Banana");
list.get(0);          // "Apple"
list.size();          // 2
list.remove("Apple");
\`\`\`

## HashMap
\`\`\`java
HashMap<String, Integer> map = new HashMap<>();
map.put("Alice", 90);
map.put("Bob", 85);
map.get("Alice");        // 90
map.containsKey("Bob");  // true
\`\`\`

## HashSet
\`\`\`java
HashSet<Integer> set = new HashSet<>();
set.add(1); set.add(2); set.add(1);
set.size(); // 2 (no duplicates)
\`\`\``,
      codeExamples: {
        Java: `import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        // ArrayList\n        ArrayList<Integer> nums = new ArrayList<>(Arrays.asList(3, 1, 4, 1, 5));\n        Collections.sort(nums);\n        System.out.println(nums); // [1, 1, 3, 4, 5]\n        \n        // HashMap\n        HashMap<String, Integer> freq = new HashMap<>();\n        for (String w : "the cat sat on the mat".split(" ")) {\n            freq.put(w, freq.getOrDefault(w, 0) + 1);\n        }\n        System.out.println(freq);\n    }\n}`,
        Python: `nums = [3, 1, 4, 1, 5]\nnums.sort()\nprint(nums)  # [1, 1, 3, 4, 5]\n\nfrom collections import Counter\nfreq = Counter("the cat sat on the mat".split())\nprint(dict(freq))`,
        "C++": `#include <iostream>\n#include <vector>\n#include <map>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {3, 1, 4, 1, 5};\n    sort(nums.begin(), nums.end());\n    for (int n : nums) cout << n << " ";\n    cout << endl;\n    \n    map<string, int> freq;\n    // Count word frequencies...\n}`,
        C: `// C doesn't have built-in collections\n// You'd implement your own or use arrays\n#include <stdio.h>\n#include <stdlib.h>\n\nint compare(const void *a, const void *b) {\n    return (*(int*)a - *(int*)b);\n}\n\nint main() {\n    int nums[] = {3, 1, 4, 1, 5};\n    int n = 5;\n    qsort(nums, n, sizeof(int), compare);\n    for (int i = 0; i < n; i++) printf("%d ", nums[i]);\n    return 0;\n}`,
      },
      questions: [
        {
          id: "java-coll-1",
          title: "Word Frequency Counter",
          difficulty: "Medium",
          description: "Read a line of text and print each word with its frequency, sorted alphabetically.",
          starterCode: { Java: 'import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String line = sc.nextLine();\n        // Count and print word frequencies\n    }\n}' },
          expectedOutput: "Given input 'the cat sat on the mat', print word frequencies sorted",
          hints: ["Use TreeMap for sorted keys, or HashMap + sort"],
          xpReward: 20,
        },
      ],
      quiz: [
        {
          question: "Which collection allows duplicate elements?",
          options: ["HashSet", "TreeSet", "ArrayList", "HashMap"],
          correctIndex: 2,
          explanation: "ArrayList allows duplicates. Sets (HashSet, TreeSet) do not allow duplicate elements.",
        },
      ],
      referenceLinks: [
        { title: "Java Collections - Baeldung", url: "https://www.baeldung.com/java-collections" },
      ],
    },
    {
      id: "java-exceptions",
      title: "Exception Handling",
      description: "try-catch-finally, custom exceptions, and best practices.",
      order: 4,
      realWorldAnalogy: "Exception handling is like having a safety net for trapeze artists. The 'try' block is the performance, 'catch' is the safety net that catches falls, and 'finally' is the cleanup crew that always runs regardless.",
      lesson: `# Exception Handling

## try-catch-finally
\`\`\`java
try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Cannot divide by zero!");
} catch (Exception e) {
    System.out.println("Something went wrong: " + e.getMessage());
} finally {
    System.out.println("This always runs");
}
\`\`\`

## Custom Exceptions
\`\`\`java
class InsufficientFundsException extends Exception {
    InsufficientFundsException(String msg) { super(msg); }
}
\`\`\``,
      codeExamples: {
        Java: `import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        try {\n            Scanner sc = new Scanner(System.in);\n            int a = sc.nextInt();\n            int b = sc.nextInt();\n            System.out.println(a / b);\n        } catch (ArithmeticException e) {\n            System.out.println("Division by zero!");\n        } catch (Exception e) {\n            System.out.println("Error: " + e.getMessage());\n        }\n    }\n}`,
        Python: `try:\n    a, b = map(int, input().split())\n    print(a // b)\nexcept ZeroDivisionError:\n    print("Division by zero!")\nexcept Exception as e:\n    print(f"Error: {e}")`,
        "C++": `#include <iostream>\nusing namespace std;\nint main() {\n    try {\n        int a, b;\n        cin >> a >> b;\n        if (b == 0) throw runtime_error("Division by zero!");\n        cout << a / b << endl;\n    } catch (exception& e) {\n        cout << e.what() << endl;\n    }\n}`,
        C: `// C doesn't have exceptions\n// Use error codes and if-checks\n#include <stdio.h>\nint main() {\n    int a, b;\n    scanf("%d %d", &a, &b);\n    if (b == 0) {\n        printf("Division by zero!\\n");\n        return 1;\n    }\n    printf("%d\\n", a / b);\n    return 0;\n}`,
      },
      questions: [
        {
          id: "java-exc-1",
          title: "Safe Division",
          difficulty: "Easy",
          description: "Read two integers. If divisor is 0, print 'Cannot divide by zero'. Otherwise print the result.",
          starterCode: { Java: 'import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Safe division with try-catch\n    }\n}' },
          expectedOutput: "Given input '10 0', output: 'Cannot divide by zero'",
          hints: ["Use try-catch with ArithmeticException"],
          xpReward: 10,
        },
      ],
      quiz: [
        {
          question: "Which block always executes, whether an exception occurs or not?",
          options: ["try", "catch", "finally", "throw"],
          correctIndex: 2,
          explanation: "The 'finally' block always executes after try-catch, regardless of whether an exception was thrown.",
        },
      ],
      referenceLinks: [
        { title: "Java Exceptions - Oracle", url: "https://docs.oracle.com/javase/tutorial/essential/exceptions/" },
      ],
    },
    {
      id: "java-strings",
      title: "Strings in Java",
      description: "String methods, StringBuilder, and string manipulation.",
      order: 5,
      realWorldAnalogy: "Java Strings are like a printed page — once printed, you can't change the text (immutable). If you need to edit, you use StringBuilder, which is like a whiteboard you can erase and rewrite.",
      lesson: `# Strings in Java

Strings are **immutable** in Java — once created, they cannot be changed.

## String Methods
\`\`\`java
String s = "Hello World";
s.length();            // 11
s.charAt(0);           // 'H'
s.substring(0, 5);     // "Hello"
s.toLowerCase();       // "hello world"
s.toUpperCase();       // "HELLO WORLD"
s.trim();              // Remove whitespace
s.replace("World", "Java");
s.split(" ");          // ["Hello", "World"]
s.contains("Hello");   // true
s.equals("Hello World"); // true (use this, not ==)
\`\`\`

## StringBuilder (Mutable)
\`\`\`java
StringBuilder sb = new StringBuilder("Hello");
sb.append(" World");
sb.insert(5, ",");
sb.reverse();
String result = sb.toString();
\`\`\``,
      codeExamples: {
        Java: `public class Main {\n    public static void main(String[] args) {\n        String s = "Hello World";\n        System.out.println("Length: " + s.length());\n        System.out.println("Reversed: " + new StringBuilder(s).reverse());\n        System.out.println("Upper: " + s.toUpperCase());\n    }\n}`,
        Python: `s = "Hello World"\nprint(f"Length: {len(s)}")\nprint(f"Reversed: {s[::-1]}")\nprint(f"Upper: {s.upper()}")`,
        "C++": `#include <iostream>\n#include <algorithm>\nusing namespace std;\nint main() {\n    string s = "Hello World";\n    cout << "Length: " << s.length() << endl;\n    reverse(s.begin(), s.end());\n    cout << "Reversed: " << s << endl;\n}`,
        C: `#include <stdio.h>\n#include <string.h>\nint main() {\n    char s[] = "Hello World";\n    printf("Length: %lu\\n", strlen(s));\n    // Manual reverse\n    int n = strlen(s);\n    for (int i = 0; i < n/2; i++) {\n        char t = s[i]; s[i] = s[n-1-i]; s[n-1-i] = t;\n    }\n    printf("Reversed: %s\\n", s);\n}`,
      },
      questions: [
        {
          id: "java-str-1",
          title: "Palindrome Check",
          difficulty: "Easy",
          description: "Read a string and check if it's a palindrome (case-insensitive). Print 'true' or 'false'.",
          starterCode: { Java: 'import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.nextLine().toLowerCase();\n        // Check palindrome\n    }\n}' },
          expectedOutput: "Given input 'Racecar', output: 'true'",
          hints: ["Compare s with new StringBuilder(s).reverse().toString()"],
          xpReward: 10,
        },
      ],
      quiz: [
        {
          question: "Why should you use .equals() instead of == for String comparison?",
          options: ["Performance", "== compares references, .equals() compares content", "No difference", "== doesn't work with Strings"],
          correctIndex: 1,
          explanation: "== checks if two variables point to the same object in memory. .equals() checks if the actual string content is the same.",
        },
      ],
      referenceLinks: [
        { title: "Java String - GeeksforGeeks", url: "https://www.geeksforgeeks.org/strings-in-java/" },
      ],
    },
  ],
};
