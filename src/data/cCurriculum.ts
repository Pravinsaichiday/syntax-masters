import type { CurriculumTrack } from "./curriculumTypes";

export const C_CURRICULUM: CurriculumTrack = {
  id: "learn-c",
  title: "Learn C Programming",
  description: "Master C from scratch — pointers, memory, structs, and system programming.",
  icon: "settings",
  language: "C",
  topics: [
    {
      id: "c-intro",
      title: "Introduction to C",
      description: "Your first C program, compilation, and basic I/O.",
      order: 1,
      realWorldAnalogy: "Think of C like building a house from raw materials — you control every brick. Higher-level languages give you pre-built rooms, but C gives you the foundation and tools to build anything from scratch.",
      lesson: `# Introduction to C

C is one of the most influential programming languages ever created. It was developed in 1972 by Dennis Ritchie at Bell Labs and is the foundation of many modern languages like C++, Java, and Python.

## Why Learn C?
- **Speed**: C programs run extremely fast — close to machine code
- **Control**: Direct access to memory and hardware
- **Foundation**: Understanding C makes you a better programmer in any language
- **Systems Programming**: Operating systems, embedded systems, and databases are built in C

## Your First C Program
\`\`\`c
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}
\`\`\`

## How Compilation Works
1. **Preprocessor**: Processes #include and #define directives
2. **Compiler**: Converts C code to assembly language
3. **Assembler**: Converts assembly to machine code (object file)
4. **Linker**: Links object files and libraries into an executable

## Basic I/O
\`\`\`c
#include <stdio.h>

int main() {
    int age;
    char name[50];
    
    printf("Enter your name: ");
    scanf("%s", name);
    
    printf("Enter your age: ");
    scanf("%d", &age);
    
    printf("Hello %s! You are %d years old.\\n", name, age);
    return 0;
}
\`\`\`

## Format Specifiers
| Specifier | Type |
|-----------|------|
| %d | int |
| %f | float |
| %c | char |
| %s | string |
| %lf | double |
| %ld | long |`,
      codeExamples: {
        C: `#include <stdio.h>\n\nint main() {\n    int num;\n    printf("Enter a number: ");\n    scanf("%d", &num);\n    printf("You entered: %d\\n", num);\n    return 0;\n}`,
        "C++": `#include <iostream>\nusing namespace std;\n\nint main() {\n    int num;\n    cout << "Enter a number: ";\n    cin >> num;\n    cout << "You entered: " << num << endl;\n    return 0;\n}`,
        Java: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.print("Enter a number: ");\n        int num = sc.nextInt();\n        System.out.println("You entered: " + num);\n    }\n}`,
        Python: `num = int(input("Enter a number: "))\nprint(f"You entered: {num}")`,
      },
      visualization: `┌──────────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  Source Code  │ ──► │ Compiler │ ──► │ Object   │ ──► │Executable│
│  (.c file)   │     │          │     │ (.o file)│     │ (a.out)  │
└──────────────┘     └──────────┘     └──────────┘     └──────────┘`,
      questions: [
        {
          id: "c-intro-1",
          title: "Hello World",
          difficulty: "Easy",
          description: "Write a C program that prints 'Hello, World!' to the console.",
          starterCode: {
            C: '#include <stdio.h>\n\nint main() {\n    // Print Hello, World!\n    return 0;\n}',
          },
          expectedOutput: "Hello, World!",
          hints: ["Use printf() function"],
          xpReward: 10,
        },
        {
          id: "c-intro-2",
          title: "Sum of Two Numbers",
          difficulty: "Easy",
          description: "Read two integers from input and print their sum.",
          starterCode: {
            C: '#include <stdio.h>\n\nint main() {\n    int a, b;\n    scanf("%d %d", &a, &b);\n    // Print sum\n    return 0;\n}',
          },
          expectedOutput: "Given input '3 5', output: '8'",
          hints: ["Use printf(\"%d\", a + b)"],
          xpReward: 10,
        },
        {
          id: "c-intro-3",
          title: "Area of Circle",
          difficulty: "Medium",
          description: "Read a radius (float) and print the area of the circle with 2 decimal places. Use PI = 3.14159.",
          starterCode: {
            C: '#include <stdio.h>\n\nint main() {\n    float r;\n    scanf("%f", &r);\n    // Calculate and print area\n    return 0;\n}',
          },
          expectedOutput: "Given input '5.0', output: '78.54'",
          hints: ["Area = PI * r * r", "Use printf(\"%.2f\", area)"],
          xpReward: 20,
        },
      ],
      quiz: [
        {
          question: "What does #include <stdio.h> do?",
          options: ["Imports standard input/output functions", "Creates a new file", "Defines a variable", "Starts the main function"],
          correctIndex: 0,
          explanation: "#include <stdio.h> is a preprocessor directive that includes the Standard Input Output header file, giving access to printf(), scanf(), etc.",
        },
        {
          question: "What does the 'return 0' at the end of main() signify?",
          options: ["The program has an error", "The program executed successfully", "The program needs to restart", "Nothing"],
          correctIndex: 1,
          explanation: "Returning 0 from main() indicates successful program execution to the operating system.",
        },
      ],
      referenceLinks: [
        { title: "C Programming - GeeksforGeeks", url: "https://www.geeksforgeeks.org/c-programming-language/" },
        { title: "Learn C - W3Schools", url: "https://www.w3schools.com/c/" },
        { title: "C Reference Manual", url: "https://en.cppreference.com/w/c" },
      ],
    },
    {
      id: "c-variables",
      title: "Variables & Data Types",
      description: "Understanding C data types, variables, constants, and type casting.",
      order: 2,
      realWorldAnalogy: "Variables are like labeled boxes in a warehouse. Each box (variable) has a specific size (data type) — a small box for a letter (char), a medium box for a number (int), and a large box for a decimal number (double). You can only put the right kind of item in each box.",
      lesson: `# Variables & Data Types in C

## Primitive Data Types
\`\`\`c
char c = 'A';           // 1 byte  — characters
int n = 42;             // 4 bytes — integers
float f = 3.14f;        // 4 bytes — decimals (less precision)
double d = 3.14159265;  // 8 bytes — decimals (more precision)
short s = 100;          // 2 bytes — small integers
long l = 1000000L;      // 8 bytes — large integers
\`\`\`

## Size of Data Types
\`\`\`c
printf("char: %lu bytes\\n", sizeof(char));     // 1
printf("int: %lu bytes\\n", sizeof(int));       // 4
printf("float: %lu bytes\\n", sizeof(float));   // 4
printf("double: %lu bytes\\n", sizeof(double)); // 8
\`\`\`

## Constants
\`\`\`c
#define PI 3.14159       // Preprocessor constant
const int MAX = 100;     // const keyword
\`\`\`

## Type Casting
\`\`\`c
int a = 5, b = 2;
float result = (float)a / b;  // 2.5, not 2
\`\`\``,
      codeExamples: {
        C: `#include <stdio.h>\n\nint main() {\n    int a = 10;\n    float b = 3.14;\n    char c = 'X';\n    printf("int: %d, float: %.2f, char: %c\\n", a, b, c);\n    printf("Sizes: int=%lu, float=%lu, char=%lu\\n", sizeof(a), sizeof(b), sizeof(c));\n    return 0;\n}`,
        "C++": `#include <iostream>\nusing namespace std;\n\nint main() {\n    int a = 10;\n    float b = 3.14;\n    char c = 'X';\n    cout << "int: " << a << ", float: " << b << ", char: " << c << endl;\n    cout << "Sizes: int=" << sizeof(a) << ", float=" << sizeof(b) << endl;\n    return 0;\n}`,
        Java: `public class Main {\n    public static void main(String[] args) {\n        int a = 10;\n        float b = 3.14f;\n        char c = 'X';\n        System.out.printf("int: %d, float: %.2f, char: %c%n", a, b, c);\n    }\n}`,
        Python: `a = 10\nb = 3.14\nc = 'X'\nprint(f"int: {a}, float: {b}, char: {c}")\nprint(f"Types: {type(a)}, {type(b)}, {type(c)}")`,
      },
      visualization: `Memory Layout:
┌────────┐  ┌────────────────┐  ┌────────────────┐
│ char c │  │    int n       │  │   double d     │
│ 1 byte │  │   4 bytes      │  │   8 bytes      │
│  'A'   │  │     42         │  │  3.14159265    │
└────────┘  └────────────────┘  └────────────────┘
 0x100       0x101-0x104        0x105-0x10C`,
      questions: [
        {
          id: "c-var-1",
          title: "Sizeof Explorer",
          difficulty: "Easy",
          description: "Print the size (in bytes) of int, float, double, and char data types, each on a new line.",
          starterCode: { C: '#include <stdio.h>\n\nint main() {\n    // Print sizeof each type\n    return 0;\n}' },
          expectedOutput: "4\n4\n8\n1",
          hints: ["Use sizeof() operator with printf"],
          xpReward: 10,
        },
        {
          id: "c-var-2",
          title: "Temperature Converter",
          difficulty: "Medium",
          description: "Read a temperature in Celsius (float) and convert it to Fahrenheit. Print with 2 decimal places. Formula: F = C * 9/5 + 32",
          starterCode: { C: '#include <stdio.h>\n\nint main() {\n    float celsius;\n    scanf("%f", &celsius);\n    // Convert and print\n    return 0;\n}' },
          expectedOutput: "Given input '100', output: '212.00'",
          hints: ["Be careful with integer division — use 9.0/5.0"],
          xpReward: 20,
        },
        {
          id: "c-var-3",
          title: "Digit Extractor",
          difficulty: "Hard",
          description: "Read a 3-digit integer and print each digit on a separate line (hundreds, tens, ones).",
          starterCode: { C: '#include <stdio.h>\n\nint main() {\n    int n;\n    scanf("%d", &n);\n    // Extract and print each digit\n    return 0;\n}' },
          expectedOutput: "Given input '456', output: '4\\n5\\n6'",
          hints: ["Use / and % operators: hundreds = n/100, tens = (n/10)%10, ones = n%10"],
          xpReward: 30,
        },
      ],
      quiz: [
        {
          question: "What is the size of 'int' on most modern systems?",
          options: ["1 byte", "2 bytes", "4 bytes", "8 bytes"],
          correctIndex: 2,
          explanation: "On most modern 32-bit and 64-bit systems, an int is 4 bytes (32 bits).",
        },
        {
          question: "What is the result of: int x = 7/2;",
          options: ["3.5", "3", "4", "Error"],
          correctIndex: 1,
          explanation: "Integer division truncates the decimal part. 7/2 = 3 (not 3.5).",
        },
      ],
      referenceLinks: [
        { title: "C Data Types - Programiz", url: "https://www.programiz.com/c-programming/c-data-types" },
        { title: "Type Casting in C", url: "https://www.geeksforgeeks.org/type-casting-in-c/" },
      ],
    },
    {
      id: "c-control-flow",
      title: "Control Flow",
      description: "If-else, switch-case, and conditional operators.",
      order: 3,
      realWorldAnalogy: "Control flow is like a road with intersections. At each intersection (condition), you choose which path to take. An if-else is a fork in the road, and a switch-case is a roundabout with multiple exits.",
      lesson: `# Control Flow in C

## if-else
\`\`\`c
int age = 20;
if (age >= 18) {
    printf("Adult\\n");
} else if (age >= 13) {
    printf("Teenager\\n");
} else {
    printf("Child\\n");
}
\`\`\`

## switch-case
\`\`\`c
int day = 3;
switch (day) {
    case 1: printf("Monday"); break;
    case 2: printf("Tuesday"); break;
    case 3: printf("Wednesday"); break;
    default: printf("Other day");
}
\`\`\`

## Ternary Operator
\`\`\`c
int max = (a > b) ? a : b;
\`\`\``,
      codeExamples: {
        C: `#include <stdio.h>\nint main() {\n    int n;\n    scanf("%d", &n);\n    if (n > 0) printf("Positive");\n    else if (n < 0) printf("Negative");\n    else printf("Zero");\n    return 0;\n}`,
        "C++": `#include <iostream>\nusing namespace std;\nint main() {\n    int n;\n    cin >> n;\n    if (n > 0) cout << "Positive";\n    else if (n < 0) cout << "Negative";\n    else cout << "Zero";\n    return 0;\n}`,
        Java: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        if (n > 0) System.out.println("Positive");\n        else if (n < 0) System.out.println("Negative");\n        else System.out.println("Zero");\n    }\n}`,
        Python: `n = int(input())\nif n > 0: print("Positive")\nelif n < 0: print("Negative")\nelse: print("Zero")`,
      },
      questions: [
        {
          id: "c-cf-1",
          title: "Even or Odd",
          difficulty: "Easy",
          description: "Read an integer and print 'Even' or 'Odd'.",
          starterCode: { C: '#include <stdio.h>\nint main() {\n    int n;\n    scanf("%d", &n);\n    // Check even or odd\n    return 0;\n}' },
          expectedOutput: "Given input '4', output: 'Even'",
          hints: ["Use n % 2 == 0"],
          xpReward: 10,
        },
        {
          id: "c-cf-2",
          title: "Grade Calculator",
          difficulty: "Medium",
          description: "Read a score (0-100) and print the grade: A (>=90), B (>=80), C (>=70), D (>=60), F (<60).",
          starterCode: { C: '#include <stdio.h>\nint main() {\n    int score;\n    scanf("%d", &score);\n    // Print grade\n    return 0;\n}' },
          expectedOutput: "Given input '85', output: 'B'",
          hints: ["Use if-else if chain"],
          xpReward: 20,
        },
      ],
      quiz: [
        {
          question: "What happens if you forget 'break' in a switch case?",
          options: ["Compilation error", "Fall-through to next case", "Program crashes", "Nothing"],
          correctIndex: 1,
          explanation: "Without break, execution 'falls through' to the next case, executing all subsequent cases until a break or end of switch.",
        },
      ],
      referenceLinks: [
        { title: "C if-else - GeeksforGeeks", url: "https://www.geeksforgeeks.org/c-if-else-statement/" },
      ],
    },
    {
      id: "c-loops",
      title: "Loops",
      description: "for, while, do-while loops and loop control statements.",
      order: 4,
      realWorldAnalogy: "A loop is like a washing machine cycle — it repeats the same set of actions (wash, rinse, spin) until a condition is met (clothes are clean). A 'for' loop is like setting a timer, a 'while' loop keeps going until you say stop.",
      lesson: `# Loops in C

## for loop
\`\`\`c
for (int i = 0; i < 5; i++) {
    printf("%d ", i);  // 0 1 2 3 4
}
\`\`\`

## while loop
\`\`\`c
int i = 0;
while (i < 5) {
    printf("%d ", i);
    i++;
}
\`\`\`

## do-while loop
\`\`\`c
int i = 0;
do {
    printf("%d ", i);
    i++;
} while (i < 5);
\`\`\`

## Loop Control
- \`break\` — exit the loop immediately
- \`continue\` — skip to next iteration`,
      codeExamples: {
        C: `#include <stdio.h>\nint main() {\n    // Print 1 to 10\n    for (int i = 1; i <= 10; i++) {\n        printf("%d ", i);\n    }\n    return 0;\n}`,
        "C++": `#include <iostream>\nusing namespace std;\nint main() {\n    for (int i = 1; i <= 10; i++) {\n        cout << i << " ";\n    }\n    return 0;\n}`,
        Java: `public class Main {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 10; i++) {\n            System.out.print(i + " ");\n        }\n    }\n}`,
        Python: `for i in range(1, 11):\n    print(i, end=" ")`,
      },
      questions: [
        {
          id: "c-loop-1",
          title: "Factorial",
          difficulty: "Easy",
          description: "Read an integer N and print its factorial.",
          starterCode: { C: '#include <stdio.h>\nint main() {\n    int n;\n    scanf("%d", &n);\n    // Calculate and print factorial\n    return 0;\n}' },
          expectedOutput: "Given input '5', output: '120'",
          hints: ["Use a for loop multiplying from 1 to n"],
          xpReward: 10,
        },
        {
          id: "c-loop-2",
          title: "Prime Checker",
          difficulty: "Medium",
          description: "Read an integer and print 'Prime' or 'Not Prime'.",
          starterCode: { C: '#include <stdio.h>\nint main() {\n    int n;\n    scanf("%d", &n);\n    // Check prime\n    return 0;\n}' },
          expectedOutput: "Given input '7', output: 'Prime'",
          hints: ["Check divisibility from 2 to sqrt(n)"],
          xpReward: 20,
        },
        {
          id: "c-loop-3",
          title: "Pattern Printing",
          difficulty: "Hard",
          description: "Read N and print a right-angled triangle pattern of stars.\nFor N=4:\n*\n**\n***\n****",
          starterCode: { C: '#include <stdio.h>\nint main() {\n    int n;\n    scanf("%d", &n);\n    // Print pattern\n    return 0;\n}' },
          expectedOutput: "Given input '4', output star triangle",
          hints: ["Use nested loops — outer for rows, inner for columns"],
          xpReward: 30,
        },
      ],
      quiz: [
        {
          question: "How many times does this loop execute? for(int i=0; i<5; i++)",
          options: ["4 times", "5 times", "6 times", "Infinite"],
          correctIndex: 1,
          explanation: "i starts at 0 and goes up to 4 (i<5), so it runs 5 times: i=0,1,2,3,4",
        },
      ],
      referenceLinks: [
        { title: "Loops in C - Programiz", url: "https://www.programiz.com/c-programming/c-for-loop" },
      ],
    },
    {
      id: "c-arrays",
      title: "Arrays",
      description: "1D and 2D arrays, array operations, and common patterns.",
      order: 5,
      realWorldAnalogy: "An array is like a row of lockers in school — each locker has a number (index) starting from 0, and each holds one item. You can quickly access any locker if you know its number.",
      lesson: `# Arrays in C

## Declaring Arrays
\`\`\`c
int nums[5] = {10, 20, 30, 40, 50};
int zeros[100] = {0};  // All elements = 0
char str[] = "Hello";  // Character array
\`\`\`

## Accessing Elements
\`\`\`c
nums[0] = 15;  // Modify first element
printf("%d", nums[2]);  // Access third element (30)
\`\`\`

## 2D Arrays
\`\`\`c
int matrix[3][3] = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};
printf("%d", matrix[1][2]); // 6
\`\`\`

## Common Operations
\`\`\`c
// Find maximum
int max = nums[0];
for (int i = 1; i < n; i++) {
    if (nums[i] > max) max = nums[i];
}
\`\`\``,
      codeExamples: {
        C: `#include <stdio.h>\nint main() {\n    int arr[5] = {3, 1, 4, 1, 5};\n    int n = 5, max = arr[0];\n    for (int i = 1; i < n; i++)\n        if (arr[i] > max) max = arr[i];\n    printf("Max: %d\\n", max);\n    return 0;\n}`,
        "C++": `#include <iostream>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int arr[] = {3, 1, 4, 1, 5};\n    int n = 5;\n    cout << "Max: " << *max_element(arr, arr+n) << endl;\n    return 0;\n}`,
        Java: `import java.util.Arrays;\npublic class Main {\n    public static void main(String[] args) {\n        int[] arr = {3, 1, 4, 1, 5};\n        int max = Arrays.stream(arr).max().getAsInt();\n        System.out.println("Max: " + max);\n    }\n}`,
        Python: `arr = [3, 1, 4, 1, 5]\nprint(f"Max: {max(arr)}")`,
      },
      visualization: `Array in Memory:
Index:  [0]   [1]   [2]   [3]   [4]
Value:  | 10  | 20  | 30  | 40  | 50  |
Address: 100   104   108   112   116  (each int = 4 bytes)`,
      questions: [
        {
          id: "c-arr-1",
          title: "Max Element in Array",
          difficulty: "Easy",
          description: "Read N (size of array) and N integers. Print the maximum element.\n\nInput Format:\nFirst line: N (size of array)\nSecond line: N space-separated integers\n\nConstraints:\n1 <= N <= 10^3\n-10^9 <= ar[i] <= 10^9",
          starterCode: { C: '#include <stdio.h>\nint main() {\n    int n;\n    scanf("%d", &n);\n    int arr[n];\n    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);\n    // Find and print max\n    return 0;\n}' },
          expectedOutput: "Given input '5\\n-2 -19 8 15 4', output: '15'",
          hints: ["Initialize max with arr[0], then loop through comparing"],
          xpReward: 10,
        },
        {
          id: "c-arr-2",
          title: "Reverse Array",
          difficulty: "Medium",
          description: "Read N integers and print them in reverse order.",
          starterCode: { C: '#include <stdio.h>\nint main() {\n    int n;\n    scanf("%d", &n);\n    int arr[n];\n    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);\n    // Print reversed\n    return 0;\n}' },
          expectedOutput: "Given input '5\\n1 2 3 4 5', output: '5 4 3 2 1'",
          hints: ["Loop from n-1 to 0"],
          xpReward: 20,
        },
      ],
      quiz: [
        {
          question: "What is the index of the first element in a C array?",
          options: ["1", "0", "-1", "Depends on the array"],
          correctIndex: 1,
          explanation: "C arrays are 0-indexed. The first element is at index 0.",
        },
      ],
      referenceLinks: [
        { title: "C Arrays - Programiz", url: "https://www.programiz.com/c-programming/c-arrays" },
      ],
    },
    {
      id: "c-functions",
      title: "Functions",
      description: "Function declaration, definition, parameters, and return values.",
      order: 6,
      realWorldAnalogy: "A function is like a vending machine — you put in inputs (coins and selection), it processes internally, and gives you an output (snack). You don't need to know how it works inside; you just use it.",
      lesson: `# Functions in C

## Defining Functions
\`\`\`c
// Declaration (prototype)
int add(int a, int b);

// Definition
int add(int a, int b) {
    return a + b;
}

// Usage
int result = add(3, 5); // 8
\`\`\`

## Void Functions
\`\`\`c
void greet(char name[]) {
    printf("Hello, %s!\\n", name);
}
\`\`\`

## Pass by Value vs Pass by Reference
\`\`\`c
// Pass by value (copy)
void increment(int x) { x++; } // Original unchanged

// Pass by reference (pointer)
void increment(int *x) { (*x)++; } // Original changed
\`\`\``,
      codeExamples: {
        C: `#include <stdio.h>\n\nint factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\n\nint main() {\n    printf("5! = %d\\n", factorial(5));\n    return 0;\n}`,
        "C++": `#include <iostream>\nusing namespace std;\n\nint factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\n\nint main() {\n    cout << "5! = " << factorial(5) << endl;\n    return 0;\n}`,
        Java: `public class Main {\n    static int factorial(int n) {\n        if (n <= 1) return 1;\n        return n * factorial(n - 1);\n    }\n    public static void main(String[] args) {\n        System.out.println("5! = " + factorial(5));\n    }\n}`,
        Python: `def factorial(n):\n    if n <= 1: return 1\n    return n * factorial(n - 1)\n\nprint(f"5! = {factorial(5)}")`,
      },
      questions: [
        {
          id: "c-func-1",
          title: "GCD Function",
          difficulty: "Medium",
          description: "Write a function to find the GCD of two numbers using the Euclidean algorithm. Read two integers and print their GCD.",
          starterCode: { C: '#include <stdio.h>\n\nint gcd(int a, int b) {\n    // Implement GCD\n}\n\nint main() {\n    int a, b;\n    scanf("%d %d", &a, &b);\n    printf("%d\\n", gcd(a, b));\n    return 0;\n}' },
          expectedOutput: "Given input '12 8', output: '4'",
          hints: ["GCD(a,b) = GCD(b, a%b), base case: b==0 return a"],
          xpReward: 20,
        },
      ],
      quiz: [
        {
          question: "What is a function prototype in C?",
          options: ["The function body", "A forward declaration of the function", "A function call", "A recursive function"],
          correctIndex: 1,
          explanation: "A function prototype declares the function's name, return type, and parameters before its full definition, allowing it to be called before it's defined.",
        },
      ],
      referenceLinks: [
        { title: "C Functions - Programiz", url: "https://www.programiz.com/c-programming/c-functions" },
      ],
    },
    {
      id: "c-pointers",
      title: "Pointers",
      description: "Understanding memory addresses, pointer arithmetic, and dynamic memory.",
      order: 7,
      realWorldAnalogy: "A pointer is like a house address written on a piece of paper. The paper (pointer) itself is small, but it tells you exactly where to find the house (data in memory). You can share the address without moving the house.",
      lesson: `# Pointers in C

## What is a Pointer?
A pointer is a variable that stores the memory address of another variable.

\`\`\`c
int x = 42;
int *ptr = &x;   // ptr stores address of x

printf("%d\\n", x);     // 42 (value)
printf("%p\\n", &x);    // 0x7fff... (address)
printf("%p\\n", ptr);   // Same address
printf("%d\\n", *ptr);  // 42 (dereference)
\`\`\`

## Pointer Arithmetic
\`\`\`c
int arr[] = {10, 20, 30, 40};
int *p = arr;

printf("%d\\n", *p);       // 10
printf("%d\\n", *(p + 1)); // 20
printf("%d\\n", *(p + 2)); // 30
\`\`\`

## Dynamic Memory
\`\`\`c
int *arr = (int *)malloc(n * sizeof(int));
// Use the array...
free(arr); // Don't forget!
\`\`\``,
      codeExamples: {
        C: `#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}\n\nint main() {\n    int x = 5, y = 10;\n    swap(&x, &y);\n    printf("x=%d, y=%d\\n", x, y); // x=10, y=5\n    return 0;\n}`,
        "C++": `#include <iostream>\nusing namespace std;\n\nvoid swap(int &a, int &b) {\n    int temp = a;\n    a = b;\n    b = temp;\n}\n\nint main() {\n    int x = 5, y = 10;\n    swap(x, y);\n    cout << "x=" << x << ", y=" << y << endl;\n    return 0;\n}`,
        Java: `// Java doesn't have pointers!\n// Use wrapper or array to simulate\npublic class Main {\n    static void swap(int[] arr, int i, int j) {\n        int temp = arr[i];\n        arr[i] = arr[j];\n        arr[j] = temp;\n    }\n    public static void main(String[] args) {\n        int[] arr = {5, 10};\n        swap(arr, 0, 1);\n        System.out.println("x=" + arr[0] + ", y=" + arr[1]);\n    }\n}`,
        Python: `# Python doesn't have pointers\n# Swap is simple:\nx, y = 5, 10\nx, y = y, x\nprint(f"x={x}, y={y}")`,
      },
      visualization: `Pointer Visualization:
┌──────────┐          ┌──────────┐
│ ptr      │ ──────►  │ x = 42   │
│ 0x200    │          │ @0x100   │
│ (stores  │          │          │
│  0x100)  │          │          │
└──────────┘          └──────────┘`,
      questions: [
        {
          id: "c-ptr-1",
          title: "Swap Using Pointers",
          difficulty: "Medium",
          description: "Write a function that swaps two integers using pointers. Read two integers, swap them, and print.",
          starterCode: { C: '#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    // Swap using pointers\n}\n\nint main() {\n    int a, b;\n    scanf("%d %d", &a, &b);\n    swap(&a, &b);\n    printf("%d %d\\n", a, b);\n    return 0;\n}' },
          expectedOutput: "Given input '5 10', output: '10 5'",
          hints: ["Use a temp variable: temp = *a; *a = *b; *b = temp;"],
          xpReward: 20,
        },
      ],
      quiz: [
        {
          question: "What does the * operator do when used with a pointer?",
          options: ["Multiplies", "Dereferences (gets value at address)", "Gets the address", "Declares a pointer"],
          correctIndex: 1,
          explanation: "The * operator dereferences a pointer, meaning it accesses the value stored at the memory address the pointer holds.",
        },
      ],
      referenceLinks: [
        { title: "C Pointers - Programiz", url: "https://www.programiz.com/c-programming/c-pointers" },
      ],
    },
    {
      id: "c-strings",
      title: "Strings in C",
      description: "Character arrays, string functions, and string manipulation.",
      order: 8,
      realWorldAnalogy: "A C string is like a train of letter cars with a caboose (null terminator \\0) at the end. The caboose tells the engine where the train ends. Without it, the train keeps going into random memory!",
      lesson: `# Strings in C

Strings in C are arrays of characters terminated by a null character '\\0'.

\`\`\`c
char str1[] = "Hello";         // Auto null-terminated
char str2[10] = "Hi";          // Remaining filled with \\0
char str3[] = {'H','i','\\0'}; // Manual null termination
\`\`\`

## String Functions (string.h)
\`\`\`c
#include <string.h>

strlen(str);              // Length
strcpy(dest, src);        // Copy
strcat(dest, src);        // Concatenate
strcmp(str1, str2);        // Compare (0 if equal)
strchr(str, 'c');         // Find character
strstr(str, "sub");       // Find substring
\`\`\``,
      codeExamples: {
        C: `#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str[100];\n    scanf("%s", str);\n    printf("Length: %lu\\n", strlen(str));\n    \n    // Reverse\n    int n = strlen(str);\n    for (int i = 0; i < n/2; i++) {\n        char t = str[i];\n        str[i] = str[n-1-i];\n        str[n-1-i] = t;\n    }\n    printf("Reversed: %s\\n", str);\n    return 0;\n}`,
        "C++": `#include <iostream>\n#include <algorithm>\nusing namespace std;\nint main() {\n    string str;\n    cin >> str;\n    cout << "Length: " << str.length() << endl;\n    reverse(str.begin(), str.end());\n    cout << "Reversed: " << str << endl;\n    return 0;\n}`,
        Java: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String str = sc.next();\n        System.out.println("Length: " + str.length());\n        System.out.println("Reversed: " + new StringBuilder(str).reverse());\n    }\n}`,
        Python: `s = input()\nprint(f"Length: {len(s)}")\nprint(f"Reversed: {s[::-1]}")`,
      },
      questions: [
        {
          id: "c-str-1",
          title: "String Length Without strlen",
          difficulty: "Easy",
          description: "Read a string and print its length without using strlen().",
          starterCode: { C: '#include <stdio.h>\nint main() {\n    char str[1000];\n    scanf("%s", str);\n    // Count length manually\n    return 0;\n}' },
          expectedOutput: "Given input 'hello', output: '5'",
          hints: ["Loop until str[i] == '\\0'"],
          xpReward: 10,
        },
      ],
      quiz: [
        {
          question: "What terminates a string in C?",
          options: ["Newline character", "Null character (\\0)", "Space", "Semicolon"],
          correctIndex: 1,
          explanation: "C strings are null-terminated — they end with the special character '\\0' (ASCII value 0).",
        },
      ],
      referenceLinks: [
        { title: "C Strings - W3Schools", url: "https://www.w3schools.com/c/c_strings.php" },
      ],
    },
    {
      id: "c-structs",
      title: "Structures",
      description: "User-defined data types, structs, and typedef.",
      order: 9,
      realWorldAnalogy: "A struct is like a form/template — a 'Student' form has fields for name, age, and GPA. Each student fills out their own form (instance), but they all follow the same template (struct definition).",
      lesson: `# Structures in C

## Defining a Struct
\`\`\`c
struct Student {
    char name[50];
    int age;
    float gpa;
};

// Using typedef
typedef struct {
    int x, y;
} Point;
\`\`\`

## Using Structs
\`\`\`c
struct Student s1 = {"Alice", 20, 3.8};
printf("%s is %d years old\\n", s1.name, s1.age);

// With pointers
struct Student *ptr = &s1;
printf("%s\\n", ptr->name);
\`\`\``,
      codeExamples: {
        C: `#include <stdio.h>\n\ntypedef struct {\n    char name[50];\n    int age;\n    float gpa;\n} Student;\n\nint main() {\n    Student s = {"Alice", 20, 3.8};\n    printf("Name: %s, Age: %d, GPA: %.1f\\n", s.name, s.age, s.gpa);\n    return 0;\n}`,
        "C++": `#include <iostream>\nusing namespace std;\n\nstruct Student {\n    string name;\n    int age;\n    float gpa;\n};\n\nint main() {\n    Student s = {"Alice", 20, 3.8f};\n    cout << "Name: " << s.name << ", Age: " << s.age << endl;\n    return 0;\n}`,
        Java: `class Student {\n    String name;\n    int age;\n    float gpa;\n    Student(String n, int a, float g) { name=n; age=a; gpa=g; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Student s = new Student("Alice", 20, 3.8f);\n        System.out.println("Name: " + s.name + ", Age: " + s.age);\n    }\n}`,
        Python: `class Student:\n    def __init__(self, name, age, gpa):\n        self.name = name\n        self.age = age\n        self.gpa = gpa\n\ns = Student("Alice", 20, 3.8)\nprint(f"Name: {s.name}, Age: {s.age}, GPA: {s.gpa}")`,
      },
      questions: [
        {
          id: "c-struct-1",
          title: "Student Record",
          difficulty: "Medium",
          description: "Define a Student struct with name, age, and marks. Read data for a student and print it formatted.",
          starterCode: { C: '#include <stdio.h>\n\ntypedef struct {\n    char name[50];\n    int age;\n    float marks;\n} Student;\n\nint main() {\n    Student s;\n    scanf("%s %d %f", s.name, &s.age, &s.marks);\n    // Print student info\n    return 0;\n}' },
          expectedOutput: "Given input 'Alice 20 95.5', output: 'Name: Alice, Age: 20, Marks: 95.50'",
          hints: ["Use printf with format specifiers"],
          xpReward: 20,
        },
      ],
      quiz: [
        {
          question: "How do you access a struct member through a pointer?",
          options: ["ptr.member", "ptr->member", "*ptr.member", "ptr::member"],
          correctIndex: 1,
          explanation: "The arrow operator (->) is used to access struct members through a pointer.",
        },
      ],
      referenceLinks: [
        { title: "C Structures - Programiz", url: "https://www.programiz.com/c-programming/c-structures" },
      ],
    },
    {
      id: "c-file-io",
      title: "File I/O",
      description: "Reading and writing files in C.",
      order: 10,
      realWorldAnalogy: "File I/O is like reading a book and taking notes. You open the book (fopen), read pages (fread/fscanf), write notes (fwrite/fprintf), and close the book (fclose) when done.",
      lesson: `# File I/O in C

## Opening and Closing Files
\`\`\`c
FILE *fp = fopen("data.txt", "r");  // Read mode
FILE *fp = fopen("data.txt", "w");  // Write mode
FILE *fp = fopen("data.txt", "a");  // Append mode

if (fp == NULL) {
    printf("Error opening file!\\n");
    return 1;
}

fclose(fp);
\`\`\`

## Reading and Writing
\`\`\`c
// Write to file
fprintf(fp, "Hello %s!\\n", name);
fputs("Line of text\\n", fp);

// Read from file
fscanf(fp, "%d", &num);
fgets(line, sizeof(line), fp);
\`\`\``,
      codeExamples: {
        C: `#include <stdio.h>\nint main() {\n    FILE *fp = fopen("output.txt", "w");\n    if (fp) {\n        fprintf(fp, "Hello, File!\\n");\n        fclose(fp);\n        printf("File written successfully\\n");\n    }\n    return 0;\n}`,
        "C++": `#include <fstream>\n#include <iostream>\nusing namespace std;\nint main() {\n    ofstream file("output.txt");\n    file << "Hello, File!" << endl;\n    file.close();\n    cout << "File written successfully" << endl;\n    return 0;\n}`,
        Java: `import java.io.*;\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        FileWriter fw = new FileWriter("output.txt");\n        fw.write("Hello, File!\\n");\n        fw.close();\n        System.out.println("File written successfully");\n    }\n}`,
        Python: `with open("output.txt", "w") as f:\n    f.write("Hello, File!\\n")\nprint("File written successfully")`,
      },
      questions: [
        {
          id: "c-file-1",
          title: "Count Lines",
          difficulty: "Medium",
          description: "Read text from stdin until EOF and count the number of lines. Print the count.",
          starterCode: { C: '#include <stdio.h>\nint main() {\n    char line[1000];\n    int count = 0;\n    // Count lines from stdin\n    while (fgets(line, sizeof(line), stdin)) {\n        count++;\n    }\n    printf("%d\\n", count);\n    return 0;\n}' },
          expectedOutput: "Given input 'hello\\nworld\\n', output: '2'",
          hints: ["fgets returns NULL at EOF"],
          xpReward: 20,
        },
      ],
      quiz: [
        {
          question: "What mode opens a file for writing and creates it if it doesn't exist?",
          options: ["r", "w", "a", "r+"],
          correctIndex: 1,
          explanation: "Mode 'w' opens for writing, creates the file if it doesn't exist, and truncates it if it does.",
        },
      ],
      referenceLinks: [
        { title: "C File Handling - Programiz", url: "https://www.programiz.com/c-programming/c-file-input-output" },
      ],
    },
  ],
};
