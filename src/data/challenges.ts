import { Challenge } from '@/types/game';

export const CHALLENGES: Challenge[] = [
  // HTML Basics
  {
    id: 'html-1',
    title: 'The Building Blocks',
    description: 'Every HTML document starts with a declaration. What tells the browser this is HTML5?',
    skillCategory: 'html-css',
    difficulty: 1,
    type: 'multiple-choice',
    xpReward: 20,
    goldReward: 5,
    content: {
      question: 'Which declaration tells the browser this is an HTML5 document?',
      options: [
        '<!DOCTYPE html>',
        '<html version="5">',
        '<?xml html5?>',
        '<head type="html5">'
      ],
      correctIndex: 0
    },
    explanation: 'The <!DOCTYPE html> declaration must be the very first thing in your HTML document, before the <html> tag. It tells the browser to render the page in standards mode using HTML5.',
    tags: ['html', 'basics', 'doctype']
  },
  {
    id: 'html-2',
    title: 'Semantic Structure',
    description: 'Choose the correct semantic element for main navigation',
    skillCategory: 'html-css',
    difficulty: 1,
    type: 'multiple-choice',
    xpReward: 25,
    goldReward: 5,
    content: {
      question: 'Which semantic HTML element should wrap your main site navigation?',
      options: ['<nav>', '<menu>', '<navigation>', '<links>'],
      correctIndex: 0
    },
    explanation: 'The <nav> element represents a section of navigation links. It\'s semantic, meaning it describes its purpose to browsers and screen readers.',
    tags: ['html', 'semantic', 'navigation']
  },
  {
    id: 'html-3',
    title: 'Link Assembly',
    description: 'Arrange the code to create a proper link',
    skillCategory: 'html-css',
    difficulty: 2,
    type: 'parsons',
    xpReward: 35,
    goldReward: 8,
    content: {
      shuffledLines: [
        'href="https://example.com"',
        '<a',
        '>Click me</a>',
        'target="_blank"'
      ],
      correctOrder: [1, 0, 3, 2]
    },
    explanation: 'An anchor tag starts with <a, followed by attributes like href and target, then closes with > before the link text and closing </a>.',
    tags: ['html', 'links', 'attributes']
  },

  // CSS Basics
  {
    id: 'css-1',
    title: 'Selector Power',
    description: 'Which selector has the highest specificity?',
    skillCategory: 'html-css',
    difficulty: 2,
    type: 'multiple-choice',
    xpReward: 30,
    goldReward: 8,
    content: {
      question: 'Which CSS selector has the highest specificity?',
      options: [
        '#header',
        '.nav-link',
        'div',
        'body .container div'
      ],
      correctIndex: 0
    },
    explanation: 'ID selectors (#) have higher specificity than class selectors (.), which have higher specificity than element selectors. Specificity: ID(100) > Class(10) > Element(1).',
    tags: ['css', 'specificity', 'selectors']
  },
  {
    id: 'css-2',
    title: 'Box Model Mastery',
    description: 'Complete the CSS to add 20px padding on all sides',
    skillCategory: 'html-css',
    difficulty: 1,
    type: 'code-completion',
    xpReward: 25,
    goldReward: 5,
    content: {
      codeTemplate: '.container {\n  {{BLANK_1}}: 20px;\n}',
      blanks: [{ placeholder: 'BLANK_1', answer: 'padding' }]
    },
    explanation: 'The padding property adds space inside an element, between its content and border. Using just "padding: 20px" applies 20px to all four sides.',
    tags: ['css', 'box-model', 'padding']
  },
  {
    id: 'css-3',
    title: 'Flex Direction',
    description: 'Fix the flexbox to display items in a column',
    skillCategory: 'html-css',
    difficulty: 2,
    type: 'debug',
    xpReward: 40,
    goldReward: 10,
    content: {
      buggyCode: '.container {\n  display: flex;\n  flex-direction: row;\n}',
      expectedOutput: 'Items should stack vertically',
      correctCode: '.container {\n  display: flex;\n  flex-direction: column;\n}'
    },
    hint: 'The flex-direction property controls whether items flow horizontally or vertically',
    explanation: 'flex-direction: column stacks flex items vertically from top to bottom, while row (the default) arranges them horizontally.',
    tags: ['css', 'flexbox', 'layout']
  },

  // JavaScript Variables
  {
    id: 'js-var-1',
    title: 'Variable Declaration',
    description: 'Which keyword creates a block-scoped variable that cannot be reassigned?',
    skillCategory: 'js-fundamentals',
    difficulty: 1,
    type: 'multiple-choice',
    xpReward: 25,
    goldReward: 6,
    content: {
      question: 'Which keyword declares a block-scoped constant that cannot be reassigned?',
      options: ['const', 'let', 'var', 'static'],
      correctIndex: 0
    },
    explanation: 'const declares a block-scoped constant. The value cannot be reassigned, though object properties can still be modified. Use const by default, let when you need reassignment.',
    tags: ['javascript', 'variables', 'const']
  },
  {
    id: 'js-var-2',
    title: 'Type Detective',
    description: 'What will typeof return for this value?',
    skillCategory: 'js-fundamentals',
    difficulty: 2,
    type: 'multiple-choice',
    xpReward: 30,
    goldReward: 8,
    content: {
      question: 'What does typeof [] return in JavaScript?',
      options: ['"object"', '"array"', '"list"', '"undefined"'],
      correctIndex: 0
    },
    hint: 'Arrays in JavaScript have a surprising typeof result',
    explanation: 'In JavaScript, arrays are objects! typeof [] returns "object". To check if something is an array, use Array.isArray().',
    tags: ['javascript', 'types', 'typeof']
  },
  {
    id: 'js-var-3',
    title: 'Template Strings',
    description: 'Complete the template literal syntax',
    skillCategory: 'js-fundamentals',
    difficulty: 1,
    type: 'code-completion',
    xpReward: 25,
    goldReward: 5,
    content: {
      codeTemplate: 'const name = "Ada";\nconst greeting = `Hello, {{BLANK_1}}name}!`;',
      blanks: [{ placeholder: 'BLANK_1', answer: '${' }]
    },
    explanation: 'Template literals use backticks (`) and ${} for interpolation. Inside ${}, you can put any JavaScript expression.',
    tags: ['javascript', 'strings', 'template-literals']
  },

  // JavaScript Functions
  {
    id: 'js-func-1',
    title: 'Arrow Function Syntax',
    description: 'Convert to an arrow function',
    skillCategory: 'js-functions',
    difficulty: 2,
    type: 'code-completion',
    xpReward: 35,
    goldReward: 8,
    content: {
      codeTemplate: 'const double = {{BLANK_1}} => num * 2;',
      blanks: [{ placeholder: 'BLANK_1', answer: 'num' }]
    },
    explanation: 'Arrow functions with a single parameter don\'t need parentheses. When the body is a single expression, you can omit the curly braces and return keyword.',
    tags: ['javascript', 'functions', 'arrow-functions']
  },
  {
    id: 'js-func-2',
    title: 'Closure Challenge',
    description: 'What will this code output?',
    skillCategory: 'js-functions',
    difficulty: 3,
    type: 'multiple-choice',
    xpReward: 50,
    goldReward: 15,
    content: {
      question: 'function outer() {\n  let count = 0;\n  return function() {\n    count++;\n    return count;\n  };\n}\nconst counter = outer();\nconsole.log(counter());\nconsole.log(counter());',
      options: ['1, then 2', '0, then 0', '1, then 1', 'undefined, then undefined'],
      correctIndex: 0
    },
    hint: 'The inner function "closes over" the count variable',
    explanation: 'This is a closure! The inner function maintains access to count even after outer() has finished. Each call to counter() increments and returns the same count variable.',
    tags: ['javascript', 'closures', 'scope']
  },
  {
    id: 'js-func-3',
    title: 'Default Parameters',
    description: 'Add a default value to the parameter',
    skillCategory: 'js-functions',
    difficulty: 2,
    type: 'code-completion',
    xpReward: 30,
    goldReward: 8,
    content: {
      codeTemplate: 'function greet(name {{BLANK_1}} "Guest") {\n  return `Hello, ${name}!`;\n}',
      blanks: [{ placeholder: 'BLANK_1', answer: '=' }]
    },
    explanation: 'Default parameters use = to provide fallback values. If no argument is passed (or undefined), the default value is used.',
    tags: ['javascript', 'functions', 'default-parameters']
  },

  // JavaScript Arrays
  {
    id: 'js-arr-1',
    title: 'Map Magic',
    description: 'Double each number in the array',
    skillCategory: 'js-arrays',
    difficulty: 2,
    type: 'code-completion',
    xpReward: 35,
    goldReward: 10,
    content: {
      codeTemplate: 'const numbers = [1, 2, 3, 4];\nconst doubled = numbers.{{BLANK_1}}(n => n * 2);',
      blanks: [{ placeholder: 'BLANK_1', answer: 'map' }]
    },
    explanation: 'The map() method creates a new array by calling a function on every element. It\'s perfect for transforming data without mutating the original array.',
    tags: ['javascript', 'arrays', 'map']
  },
  {
    id: 'js-arr-2',
    title: 'Filter Mastery',
    description: 'Keep only even numbers',
    skillCategory: 'js-arrays',
    difficulty: 2,
    type: 'code-completion',
    xpReward: 35,
    goldReward: 10,
    content: {
      codeTemplate: 'const numbers = [1, 2, 3, 4, 5, 6];\nconst evens = numbers.filter(n => n {{BLANK_1}} 2 === 0);',
      blanks: [{ placeholder: 'BLANK_1', answer: '%' }]
    },
    explanation: 'filter() creates a new array with elements that pass a test. The modulo operator (%) returns the remainder of division - if n % 2 === 0, the number is even.',
    tags: ['javascript', 'arrays', 'filter']
  },
  {
    id: 'js-arr-3',
    title: 'Reduce Power',
    description: 'Sum all numbers in the array',
    skillCategory: 'js-arrays',
    difficulty: 3,
    type: 'code-completion',
    xpReward: 45,
    goldReward: 12,
    content: {
      codeTemplate: 'const numbers = [1, 2, 3, 4];\nconst sum = numbers.reduce((acc, curr) => acc {{BLANK_1}} curr, 0);',
      blanks: [{ placeholder: 'BLANK_1', answer: '+' }]
    },
    hint: 'The accumulator collects the running total',
    explanation: 'reduce() executes a reducer function on each element, resulting in a single value. The accumulator (acc) holds the running result, and 0 is the initial value.',
    tags: ['javascript', 'arrays', 'reduce']
  },
  {
    id: 'js-arr-4',
    title: 'Destructuring Duel',
    description: 'Extract the first two elements',
    skillCategory: 'js-arrays',
    difficulty: 2,
    type: 'code-completion',
    xpReward: 35,
    goldReward: 10,
    content: {
      codeTemplate: 'const colors = ["red", "green", "blue"];\nconst [first, {{BLANK_1}}] = colors;',
      blanks: [{ placeholder: 'BLANK_1', answer: 'second' }]
    },
    explanation: 'Array destructuring lets you unpack values from arrays into distinct variables. The position in the destructuring pattern matches the index in the array.',
    tags: ['javascript', 'arrays', 'destructuring']
  },

  // Async JavaScript
  {
    id: 'js-async-1',
    title: 'Promise Basics',
    description: 'Handle a resolved promise',
    skillCategory: 'js-async',
    difficulty: 3,
    type: 'code-completion',
    xpReward: 45,
    goldReward: 12,
    content: {
      codeTemplate: 'fetch("/api/data")\n  .{{BLANK_1}}(response => response.json())\n  .then(data => console.log(data));',
      blanks: [{ placeholder: 'BLANK_1', answer: 'then' }]
    },
    explanation: 'Promises use .then() to handle successful resolution. You can chain multiple .then() calls for sequential async operations.',
    tags: ['javascript', 'async', 'promises']
  },
  {
    id: 'js-async-2',
    title: 'Async/Await Transform',
    description: 'Convert to async/await syntax',
    skillCategory: 'js-async',
    difficulty: 3,
    type: 'code-completion',
    xpReward: 50,
    goldReward: 15,
    content: {
      codeTemplate: '{{BLANK_1}} function getData() {\n  const response = await fetch("/api/data");\n  return response.json();\n}',
      blanks: [{ placeholder: 'BLANK_1', answer: 'async' }]
    },
    hint: 'A special keyword marks functions that use await',
    explanation: 'The async keyword marks a function as asynchronous, allowing it to use await. Async functions always return a Promise.',
    tags: ['javascript', 'async', 'async-await']
  },
  {
    id: 'js-async-3',
    title: 'Error Handling',
    description: 'Catch errors in async code',
    skillCategory: 'js-async',
    difficulty: 3,
    type: 'code-completion',
    xpReward: 50,
    goldReward: 15,
    content: {
      codeTemplate: 'async function fetchData() {\n  try {\n    const data = await fetch("/api");\n    return data.json();\n  } {{BLANK_1}} (error) {\n    console.error(error);\n  }\n}',
      blanks: [{ placeholder: 'BLANK_1', answer: 'catch' }]
    },
    explanation: 'Use try/catch blocks to handle errors in async/await code. The catch block receives any error thrown in the try block or from a rejected promise.',
    tags: ['javascript', 'async', 'error-handling']
  },

  // React Basics
  {
    id: 'react-1',
    title: 'Component Creation',
    description: 'Create a basic React component',
    skillCategory: 'react-basics',
    difficulty: 2,
    type: 'code-completion',
    xpReward: 40,
    goldReward: 12,
    content: {
      codeTemplate: 'function Greeting() {\n  {{BLANK_1}} <h1>Hello, World!</h1>;\n}',
      blanks: [{ placeholder: 'BLANK_1', answer: 'return' }]
    },
    explanation: 'React components are functions that return JSX. The return statement specifies what should be rendered to the DOM.',
    tags: ['react', 'components', 'jsx']
  },
  {
    id: 'react-2',
    title: 'Props Passage',
    description: 'Pass and use props correctly',
    skillCategory: 'react-basics',
    difficulty: 2,
    type: 'code-completion',
    xpReward: 40,
    goldReward: 12,
    content: {
      codeTemplate: 'function Welcome({{BLANK_1}}) {\n  return <h1>Hello, {props.name}!</h1>;\n}',
      blanks: [{ placeholder: 'BLANK_1', answer: 'props' }]
    },
    explanation: 'Props are passed to components as a single object argument. You can access individual props using dot notation like props.name.',
    tags: ['react', 'props', 'components']
  },
  {
    id: 'react-3',
    title: 'JSX Expression',
    description: 'Embed JavaScript in JSX',
    skillCategory: 'react-basics',
    difficulty: 2,
    type: 'multiple-choice',
    xpReward: 35,
    goldReward: 10,
    content: {
      question: 'How do you embed a JavaScript expression in JSX?',
      options: [
        'Using curly braces: {expression}',
        'Using double curly braces: {{expression}}',
        'Using parentheses: (expression)',
        'Using backticks: `expression`'
      ],
      correctIndex: 0
    },
    explanation: 'In JSX, you use single curly braces {} to embed JavaScript expressions. This can be variables, function calls, or any valid JS expression.',
    tags: ['react', 'jsx', 'expressions']
  },

  // React Hooks
  {
    id: 'react-state-1',
    title: 'useState Setup',
    description: 'Initialize state correctly',
    skillCategory: 'react-hooks',
    difficulty: 2,
    type: 'code-completion',
    xpReward: 45,
    goldReward: 12,
    content: {
      codeTemplate: 'const [count, setCount] = {{BLANK_1}}(0);',
      blanks: [{ placeholder: 'BLANK_1', answer: 'useState' }]
    },
    explanation: 'useState is a Hook that lets you add state to functional components. It returns an array with the current value and a setter function.',
    tags: ['react', 'hooks', 'useState']
  },
  {
    id: 'react-state-2',
    title: 'State Update',
    description: 'Update state based on previous value',
    skillCategory: 'react-hooks',
    difficulty: 3,
    type: 'code-completion',
    xpReward: 50,
    goldReward: 15,
    content: {
      codeTemplate: 'const increment = () => {\n  setCount({{BLANK_1}} => prev + 1);\n};',
      blanks: [{ placeholder: 'BLANK_1', answer: 'prev' }]
    },
    hint: 'Use a function to access the previous state value',
    explanation: 'When the new state depends on the previous state, pass a function to the setter. This ensures you\'re working with the most current value.',
    tags: ['react', 'hooks', 'state-update']
  },
  {
    id: 'react-effect-1',
    title: 'useEffect Basics',
    description: 'Run code when component mounts',
    skillCategory: 'react-hooks',
    difficulty: 3,
    type: 'code-completion',
    xpReward: 50,
    goldReward: 15,
    content: {
      codeTemplate: 'useEffect(() => {\n  console.log("Mounted!");\n}, {{BLANK_1}});',
      blanks: [{ placeholder: 'BLANK_1', answer: '[]' }]
    },
    explanation: 'useEffect with an empty dependency array [] runs only once when the component mounts. This is similar to componentDidMount in class components.',
    tags: ['react', 'hooks', 'useEffect']
  },
  {
    id: 'react-effect-2',
    title: 'Effect Dependencies',
    description: 'What happens with this useEffect?',
    skillCategory: 'react-hooks',
    difficulty: 3,
    type: 'multiple-choice',
    xpReward: 45,
    goldReward: 12,
    content: {
      question: 'useEffect(() => {\n  document.title = `Count: ${count}`;\n}, [count]);\n\nWhen does this effect run?',
      options: [
        'Every time count changes',
        'Only on mount',
        'On every render',
        'Never'
      ],
      correctIndex: 0
    },
    explanation: 'When you include values in the dependency array, the effect runs whenever any of those values change. Here, changing count triggers the effect.',
    tags: ['react', 'hooks', 'useEffect', 'dependencies']
  },

  // Next.js
  {
    id: 'next-1',
    title: 'File-based Routing',
    description: 'Where does this route live in Next.js App Router?',
    skillCategory: 'nextjs',
    difficulty: 2,
    type: 'multiple-choice',
    xpReward: 40,
    goldReward: 12,
    content: {
      question: 'To create a route at /blog/[slug], where should page.tsx be located?',
      options: [
        'app/blog/[slug]/page.tsx',
        'pages/blog/[slug].tsx',
        'routes/blog/[slug]/page.tsx',
        'app/blog/slug/page.tsx'
      ],
      correctIndex: 0
    },
    explanation: 'In Next.js App Router, routes are defined by folder structure. Dynamic segments use [brackets]. The page.tsx file defines the UI for that route.',
    tags: ['nextjs', 'routing', 'app-router']
  },
  {
    id: 'next-2',
    title: 'Server Component',
    description: 'Identify the server component pattern',
    skillCategory: 'nextjs',
    difficulty: 3,
    type: 'multiple-choice',
    xpReward: 50,
    goldReward: 15,
    content: {
      question: 'Which is TRUE about React Server Components in Next.js?',
      options: [
        'They can directly fetch data using async/await',
        'They can use useState and useEffect',
        'They must include "use server" at the top',
        'They only run in the browser'
      ],
      correctIndex: 0
    },
    hint: 'Server Components run on the server, not in the browser',
    explanation: 'Server Components can be async and fetch data directly. They run only on the server, so they can\'t use browser-only features like hooks or event handlers.',
    tags: ['nextjs', 'server-components', 'data-fetching']
  },
  {
    id: 'next-3',
    title: 'Client Component',
    description: 'Mark a component as a Client Component',
    skillCategory: 'nextjs',
    difficulty: 2,
    type: 'code-completion',
    xpReward: 40,
    goldReward: 12,
    content: {
      codeTemplate: '"{{BLANK_1}}";\n\nimport { useState } from "react";\n\nexport default function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}',
      blanks: [{ placeholder: 'BLANK_1', answer: 'use client' }]
    },
    explanation: 'The "use client" directive at the top of a file marks it and its imports as Client Components. This is needed when using hooks, event handlers, or browser APIs.',
    tags: ['nextjs', 'client-components', 'directive']
  }
];

export const getChallengesBySkill = (skillId: string): Challenge[] => {
  // Map skill IDs to their categories
  const skillToCategory: Record<string, string> = {
    'html-basics': 'html-css',
    'css-basics': 'html-css',
    'css-layout': 'html-css',
    'js-variables': 'js-fundamentals',
    'js-operators': 'js-fundamentals',
    'js-functions': 'js-functions',
    'js-scope': 'js-functions',
    'js-arrays': 'js-arrays',
    'js-objects': 'js-arrays',
    'js-dom': 'js-dom',
    'js-events': 'js-dom',
    'js-promises': 'js-async',
    'js-async-await': 'js-async',
    'js-fetch': 'js-async',
    'react-components': 'react-basics',
    'react-jsx': 'react-basics',
    'react-props': 'react-basics',
    'react-useState': 'react-hooks',
    'react-useEffect': 'react-hooks',
    'react-useContext': 'react-hooks',
    'react-useReducer': 'react-hooks',
    'react-lifting-state': 'react-state',
    'react-patterns': 'react-state',
    'nextjs-routing': 'nextjs',
    'nextjs-server': 'nextjs',
    'nextjs-data': 'nextjs'
  };

  const category = skillToCategory[skillId];
  return CHALLENGES.filter(c => c.skillCategory === category);
};

export const getRandomChallenge = (skillCategory?: string): Challenge => {
  const filtered = skillCategory
    ? CHALLENGES.filter(c => c.skillCategory === skillCategory)
    : CHALLENGES;
  return filtered[Math.floor(Math.random() * filtered.length)];
};

export const getChallengeById = (id: string): Challenge | undefined => {
  return CHALLENGES.find(c => c.id === id);
};
