import { Skill } from '@/types/game';

export const INITIAL_SKILLS: Skill[] = [
  // HTML/CSS Foundation
  {
    id: 'html-basics',
    name: 'HTML Foundations',
    description: 'Master semantic HTML structure and elements',
    category: 'html-css',
    level: 0,
    maxLevel: 5,
    xpRequired: 100,
    currentXp: 0,
    icon: 'Code',
    unlocked: true,
    prerequisiteIds: []
  },
  {
    id: 'css-basics',
    name: 'CSS Styling',
    description: 'Learn selectors, properties, and the box model',
    category: 'html-css',
    level: 0,
    maxLevel: 5,
    xpRequired: 100,
    currentXp: 0,
    icon: 'PaintBrush',
    unlocked: true,
    prerequisiteIds: []
  },
  {
    id: 'css-layout',
    name: 'Layout Mastery',
    description: 'Conquer Flexbox and Grid layouts',
    category: 'html-css',
    level: 0,
    maxLevel: 5,
    xpRequired: 150,
    currentXp: 0,
    icon: 'GridFour',
    unlocked: false,
    prerequisiteIds: ['css-basics']
  },

  // JavaScript Fundamentals
  {
    id: 'js-variables',
    name: 'Variables & Types',
    description: 'Understand let, const, var and data types',
    category: 'js-fundamentals',
    level: 0,
    maxLevel: 5,
    xpRequired: 120,
    currentXp: 0,
    icon: 'Cube',
    unlocked: false,
    prerequisiteIds: ['html-basics']
  },
  {
    id: 'js-operators',
    name: 'Operators & Logic',
    description: 'Master operators and control flow',
    category: 'js-fundamentals',
    level: 0,
    maxLevel: 5,
    xpRequired: 120,
    currentXp: 0,
    icon: 'MathOperations',
    unlocked: false,
    prerequisiteIds: ['js-variables']
  },

  // Functions
  {
    id: 'js-functions',
    name: 'Function Mastery',
    description: 'Learn function declarations, expressions, and arrows',
    category: 'js-functions',
    level: 0,
    maxLevel: 5,
    xpRequired: 150,
    currentXp: 0,
    icon: 'Function',
    unlocked: false,
    prerequisiteIds: ['js-operators']
  },
  {
    id: 'js-scope',
    name: 'Scope & Closures',
    description: 'Understand scope chains and closures',
    category: 'js-functions',
    level: 0,
    maxLevel: 5,
    xpRequired: 200,
    currentXp: 0,
    icon: 'BracketsCurly',
    unlocked: false,
    prerequisiteIds: ['js-functions']
  },

  // Arrays & Objects
  {
    id: 'js-arrays',
    name: 'Array Methods',
    description: 'Master map, filter, reduce and more',
    category: 'js-arrays',
    level: 0,
    maxLevel: 5,
    xpRequired: 180,
    currentXp: 0,
    icon: 'List',
    unlocked: false,
    prerequisiteIds: ['js-functions']
  },
  {
    id: 'js-objects',
    name: 'Objects & Destructuring',
    description: 'Work with objects and destructuring patterns',
    category: 'js-arrays',
    level: 0,
    maxLevel: 5,
    xpRequired: 180,
    currentXp: 0,
    icon: 'Package',
    unlocked: false,
    prerequisiteIds: ['js-arrays']
  },

  // DOM
  {
    id: 'js-dom',
    name: 'DOM Manipulation',
    description: 'Select and modify DOM elements',
    category: 'js-dom',
    level: 0,
    maxLevel: 5,
    xpRequired: 200,
    currentXp: 0,
    icon: 'Tree',
    unlocked: false,
    prerequisiteIds: ['js-objects']
  },
  {
    id: 'js-events',
    name: 'Event Handling',
    description: 'Handle user interactions and events',
    category: 'js-dom',
    level: 0,
    maxLevel: 5,
    xpRequired: 200,
    currentXp: 0,
    icon: 'Cursor',
    unlocked: false,
    prerequisiteIds: ['js-dom']
  },

  // Async
  {
    id: 'js-promises',
    name: 'Promises',
    description: 'Understand and create Promises',
    category: 'js-async',
    level: 0,
    maxLevel: 5,
    xpRequired: 220,
    currentXp: 0,
    icon: 'Handshake',
    unlocked: false,
    prerequisiteIds: ['js-events']
  },
  {
    id: 'js-async-await',
    name: 'Async/Await',
    description: 'Write clean asynchronous code',
    category: 'js-async',
    level: 0,
    maxLevel: 5,
    xpRequired: 220,
    currentXp: 0,
    icon: 'Clock',
    unlocked: false,
    prerequisiteIds: ['js-promises']
  },
  {
    id: 'js-fetch',
    name: 'Fetch API',
    description: 'Make HTTP requests and handle responses',
    category: 'js-async',
    level: 0,
    maxLevel: 5,
    xpRequired: 200,
    currentXp: 0,
    icon: 'CloudArrowDown',
    unlocked: false,
    prerequisiteIds: ['js-async-await']
  },

  // React Basics
  {
    id: 'react-components',
    name: 'Components',
    description: 'Build reusable React components',
    category: 'react-basics',
    level: 0,
    maxLevel: 5,
    xpRequired: 250,
    currentXp: 0,
    icon: 'Puzzle',
    unlocked: false,
    prerequisiteIds: ['js-fetch', 'css-layout']
  },
  {
    id: 'react-jsx',
    name: 'JSX Mastery',
    description: 'Write dynamic JSX expressions',
    category: 'react-basics',
    level: 0,
    maxLevel: 5,
    xpRequired: 200,
    currentXp: 0,
    icon: 'CodeBlock',
    unlocked: false,
    prerequisiteIds: ['react-components']
  },
  {
    id: 'react-props',
    name: 'Props & Data Flow',
    description: 'Pass data between components',
    category: 'react-basics',
    level: 0,
    maxLevel: 5,
    xpRequired: 220,
    currentXp: 0,
    icon: 'ArrowsDownUp',
    unlocked: false,
    prerequisiteIds: ['react-jsx']
  },

  // React Hooks
  {
    id: 'react-useState',
    name: 'useState',
    description: 'Manage component state with useState',
    category: 'react-hooks',
    level: 0,
    maxLevel: 5,
    xpRequired: 250,
    currentXp: 0,
    icon: 'Database',
    unlocked: false,
    prerequisiteIds: ['react-props']
  },
  {
    id: 'react-useEffect',
    name: 'useEffect',
    description: 'Handle side effects and lifecycle',
    category: 'react-hooks',
    level: 0,
    maxLevel: 5,
    xpRequired: 280,
    currentXp: 0,
    icon: 'Lightning',
    unlocked: false,
    prerequisiteIds: ['react-useState']
  },
  {
    id: 'react-useContext',
    name: 'useContext',
    description: 'Share state across components',
    category: 'react-hooks',
    level: 0,
    maxLevel: 5,
    xpRequired: 250,
    currentXp: 0,
    icon: 'ShareNetwork',
    unlocked: false,
    prerequisiteIds: ['react-useEffect']
  },
  {
    id: 'react-useReducer',
    name: 'useReducer',
    description: 'Complex state with reducers',
    category: 'react-hooks',
    level: 0,
    maxLevel: 5,
    xpRequired: 300,
    currentXp: 0,
    icon: 'FunnelSimple',
    unlocked: false,
    prerequisiteIds: ['react-useContext']
  },

  // React State Management
  {
    id: 'react-lifting-state',
    name: 'Lifting State',
    description: 'Share state between siblings',
    category: 'react-state',
    level: 0,
    maxLevel: 5,
    xpRequired: 250,
    currentXp: 0,
    icon: 'ArrowUp',
    unlocked: false,
    prerequisiteIds: ['react-useState']
  },
  {
    id: 'react-patterns',
    name: 'Component Patterns',
    description: 'Learn composition and common patterns',
    category: 'react-state',
    level: 0,
    maxLevel: 5,
    xpRequired: 300,
    currentXp: 0,
    icon: 'Blueprint',
    unlocked: false,
    prerequisiteIds: ['react-useReducer', 'react-lifting-state']
  },

  // Next.js
  {
    id: 'nextjs-routing',
    name: 'App Router',
    description: 'Master file-based routing',
    category: 'nextjs',
    level: 0,
    maxLevel: 5,
    xpRequired: 300,
    currentXp: 0,
    icon: 'Signpost',
    unlocked: false,
    prerequisiteIds: ['react-patterns']
  },
  {
    id: 'nextjs-server',
    name: 'Server Components',
    description: 'Build with React Server Components',
    category: 'nextjs',
    level: 0,
    maxLevel: 5,
    xpRequired: 350,
    currentXp: 0,
    icon: 'Server',
    unlocked: false,
    prerequisiteIds: ['nextjs-routing']
  },
  {
    id: 'nextjs-data',
    name: 'Data Fetching',
    description: 'Fetch data in Server Components',
    category: 'nextjs',
    level: 0,
    maxLevel: 5,
    xpRequired: 350,
    currentXp: 0,
    icon: 'Database',
    unlocked: false,
    prerequisiteIds: ['nextjs-server']
  }
];

export const CATEGORY_NAMES: Record<string, string> = {
  'html-css': 'HTML & CSS',
  'js-fundamentals': 'JS Fundamentals',
  'js-functions': 'Functions',
  'js-arrays': 'Data Structures',
  'js-dom': 'DOM Manipulation',
  'js-async': 'Async JavaScript',
  'react-basics': 'React Basics',
  'react-hooks': 'React Hooks',
  'react-state': 'State Management',
  'nextjs': 'Next.js'
};
