import { Zone, MobTemplate, Equipment, Ability, JsConcept, AutoScript, Rarity } from '@/types/game';

// ============ MOB TEMPLATES ============

export const MOB_TEMPLATES: Record<string, MobTemplate> = {
  // Zone 1: Syntax Woods
  'bug': {
    id: 'bug',
    name: 'Syntax Bug',
    emoji: '🐛',
    color: '#84CC16',
    baseHp: 30,
    baseAttack: 5,
    baseDefense: 2,
    attackSpeed: 0.8,
    xpMultiplier: 1,
    goldMultiplier: 1,
    lootTable: [{ itemId: 'wooden-sword', chance: 0.05 }],
    spawnWeight: 60
  },
  'error': {
    id: 'error',
    name: 'Runtime Error',
    emoji: '❌',
    color: '#EF4444',
    baseHp: 45,
    baseAttack: 8,
    baseDefense: 3,
    attackSpeed: 0.6,
    xpMultiplier: 1.3,
    goldMultiplier: 1.2,
    lootTable: [{ itemId: 'leather-armor', chance: 0.04 }],
    spawnWeight: 30
  },
  'null-ptr': {
    id: 'null-ptr',
    name: 'Null Pointer',
    emoji: '👻',
    color: '#8B5CF6',
    baseHp: 60,
    baseAttack: 12,
    baseDefense: 5,
    attackSpeed: 0.5,
    xpMultiplier: 1.8,
    goldMultiplier: 1.5,
    lootTable: [{ itemId: 'iron-sword', chance: 0.08 }],
    spawnWeight: 10
  },
  'boss-undefined': {
    id: 'boss-undefined',
    name: 'The Undefined',
    emoji: '💀',
    color: '#DC2626',
    baseHp: 500,
    baseAttack: 25,
    baseDefense: 15,
    attackSpeed: 0.4,
    xpMultiplier: 10,
    goldMultiplier: 20,
    lootTable: [{ itemId: 'variable-blade', chance: 0.5 }],
    spawnWeight: 0,
    isBoss: true
  },

  // Zone 2: Loop Caverns
  'infinite-loop': {
    id: 'infinite-loop',
    name: 'Infinite Loop',
    emoji: '🔄',
    color: '#06B6D4',
    baseHp: 80,
    baseAttack: 15,
    baseDefense: 8,
    attackSpeed: 1.2,
    xpMultiplier: 1.5,
    goldMultiplier: 1.3,
    lootTable: [{ itemId: 'steel-sword', chance: 0.05 }],
    spawnWeight: 50
  },
  'stack-overflow': {
    id: 'stack-overflow',
    name: 'Stack Overflow',
    emoji: '📚',
    color: '#F59E0B',
    baseHp: 120,
    baseAttack: 20,
    baseDefense: 12,
    attackSpeed: 0.7,
    xpMultiplier: 2,
    goldMultiplier: 1.8,
    lootTable: [{ itemId: 'chainmail', chance: 0.06 }],
    spawnWeight: 35
  },
  'recursion': {
    id: 'recursion',
    name: 'Recursion Beast',
    emoji: '🐍',
    color: '#10B981',
    baseHp: 150,
    baseAttack: 25,
    baseDefense: 10,
    attackSpeed: 0.9,
    xpMultiplier: 2.5,
    goldMultiplier: 2,
    lootTable: [{ itemId: 'loop-ring', chance: 0.08 }],
    spawnWeight: 15
  },
  'boss-foreach': {
    id: 'boss-foreach',
    name: 'forEach Dragon',
    emoji: '🐉',
    color: '#7C3AED',
    baseHp: 1200,
    baseAttack: 45,
    baseDefense: 25,
    attackSpeed: 0.5,
    xpMultiplier: 15,
    goldMultiplier: 30,
    lootTable: [{ itemId: 'iterator-blade', chance: 0.6 }],
    spawnWeight: 0,
    isBoss: true
  },

  // Zone 3: Array Mountains
  'off-by-one': {
    id: 'off-by-one',
    name: 'Off-by-One',
    emoji: '1️⃣',
    color: '#F472B6',
    baseHp: 100,
    baseAttack: 22,
    baseDefense: 15,
    attackSpeed: 1.0,
    xpMultiplier: 2,
    goldMultiplier: 1.5,
    lootTable: [{ itemId: 'array-gauntlets', chance: 0.05 }],
    spawnWeight: 50
  },
  'mutation': {
    id: 'mutation',
    name: 'Mutation Slime',
    emoji: '🦠',
    color: '#84CC16',
    baseHp: 180,
    baseAttack: 30,
    baseDefense: 20,
    attackSpeed: 0.6,
    xpMultiplier: 2.5,
    goldMultiplier: 2,
    lootTable: [{ itemId: 'filter-amulet', chance: 0.06 }],
    spawnWeight: 35
  },
  'boss-reduce': {
    id: 'boss-reduce',
    name: 'The Reducer',
    emoji: '⚡',
    color: '#FBBF24',
    baseHp: 2500,
    baseAttack: 60,
    baseDefense: 40,
    attackSpeed: 0.6,
    xpMultiplier: 25,
    goldMultiplier: 50,
    lootTable: [{ itemId: 'reduce-scepter', chance: 0.7 }],
    spawnWeight: 0,
    isBoss: true
  },

  // Zone 4: Async Void
  'callback-hell': {
    id: 'callback-hell',
    name: 'Callback Demon',
    emoji: '😈',
    color: '#DC2626',
    baseHp: 200,
    baseAttack: 35,
    baseDefense: 25,
    attackSpeed: 0.8,
    xpMultiplier: 3,
    goldMultiplier: 2.5,
    lootTable: [{ itemId: 'async-boots', chance: 0.05 }],
    spawnWeight: 45
  },
  'race-condition': {
    id: 'race-condition',
    name: 'Race Condition',
    emoji: '🏎️',
    color: '#3B82F6',
    baseHp: 150,
    baseAttack: 50,
    baseDefense: 15,
    attackSpeed: 1.5,
    xpMultiplier: 3.5,
    goldMultiplier: 3,
    lootTable: [{ itemId: 'promise-ring', chance: 0.07 }],
    spawnWeight: 35
  },
  'boss-promise': {
    id: 'boss-promise',
    name: 'Promise Titan',
    emoji: '🌌',
    color: '#6366F1',
    baseHp: 5000,
    baseAttack: 80,
    baseDefense: 50,
    attackSpeed: 0.5,
    xpMultiplier: 40,
    goldMultiplier: 80,
    lootTable: [{ itemId: 'await-blade', chance: 0.8 }],
    spawnWeight: 0,
    isBoss: true
  },

  // Zone 5: React Realm
  'prop-drill': {
    id: 'prop-drill',
    name: 'Prop Driller',
    emoji: '🔧',
    color: '#61DAFB',
    baseHp: 300,
    baseAttack: 45,
    baseDefense: 35,
    attackSpeed: 0.9,
    xpMultiplier: 4,
    goldMultiplier: 3.5,
    lootTable: [{ itemId: 'component-helm', chance: 0.05 }],
    spawnWeight: 45
  },
  'stale-closure': {
    id: 'stale-closure',
    name: 'Stale Closure',
    emoji: '🧟',
    color: '#9CA3AF',
    baseHp: 350,
    baseAttack: 55,
    baseDefense: 30,
    attackSpeed: 0.7,
    xpMultiplier: 4.5,
    goldMultiplier: 4,
    lootTable: [{ itemId: 'hook-blade', chance: 0.06 }],
    spawnWeight: 35
  },
  'boss-hydration': {
    id: 'boss-hydration',
    name: 'Hydration Hydra',
    emoji: '🐲',
    color: '#22D3EE',
    baseHp: 10000,
    baseAttack: 120,
    baseDefense: 70,
    attackSpeed: 0.6,
    xpMultiplier: 60,
    goldMultiplier: 120,
    lootTable: [{ itemId: 'react-crown', chance: 0.9 }],
    spawnWeight: 0,
    isBoss: true
  }
};

// ============ ZONES ============

export const ZONES: Zone[] = [
  {
    id: 'syntax-woods',
    name: 'Syntax Woods',
    description: 'A forest plagued by syntax errors and bugs. Perfect for beginners.',
    level: 1,
    emoji: '🌲',
    background: 'from-green-900 to-green-700',
    mobPool: [
      MOB_TEMPLATES['bug'],
      MOB_TEMPLATES['error'],
      MOB_TEMPLATES['null-ptr']
    ],
    bossId: 'boss-undefined',
    unlocked: true
  },
  {
    id: 'loop-caverns',
    name: 'Loop Caverns',
    description: 'Deep caves where loops run endlessly. Master iteration to survive.',
    level: 5,
    emoji: '🕳️',
    background: 'from-slate-800 to-cyan-900',
    mobPool: [
      MOB_TEMPLATES['infinite-loop'],
      MOB_TEMPLATES['stack-overflow'],
      MOB_TEMPLATES['recursion']
    ],
    bossId: 'boss-foreach',
    unlocked: false,
    requiredLevel: 5,
    requiredBossKill: 'boss-undefined'
  },
  {
    id: 'array-mountains',
    name: 'Array Mountains',
    description: 'Treacherous peaks filled with data structure monsters.',
    level: 10,
    emoji: '⛰️',
    background: 'from-stone-700 to-amber-900',
    mobPool: [
      MOB_TEMPLATES['off-by-one'],
      MOB_TEMPLATES['mutation']
    ],
    bossId: 'boss-reduce',
    unlocked: false,
    requiredLevel: 10,
    requiredBossKill: 'boss-foreach',
    requiredConcepts: ['arrays-basics']
  },
  {
    id: 'async-void',
    name: 'Async Void',
    description: 'The space between promises where timing is everything.',
    level: 15,
    emoji: '🌌',
    background: 'from-purple-900 to-indigo-950',
    mobPool: [
      MOB_TEMPLATES['callback-hell'],
      MOB_TEMPLATES['race-condition']
    ],
    bossId: 'boss-promise',
    unlocked: false,
    requiredLevel: 15,
    requiredBossKill: 'boss-reduce',
    requiredConcepts: ['async-basics']
  },
  {
    id: 'react-realm',
    name: 'React Realm',
    description: 'The component kingdom where state flows and props drill deep.',
    level: 20,
    emoji: '⚛️',
    background: 'from-cyan-900 to-blue-950',
    mobPool: [
      MOB_TEMPLATES['prop-drill'],
      MOB_TEMPLATES['stale-closure']
    ],
    bossId: 'boss-hydration',
    unlocked: false,
    requiredLevel: 20,
    requiredBossKill: 'boss-promise',
    requiredConcepts: ['react-basics']
  }
];

// ============ EQUIPMENT ============

export const EQUIPMENT: Record<string, Equipment> = {
  // Starter
  'wooden-sword': {
    id: 'wooden-sword',
    name: 'Wooden Sword',
    type: 'weapon',
    rarity: 'common',
    level: 1,
    stats: { attack: 3 },
    description: 'A basic wooden training sword.',
    emoji: '🗡️'
  },
  'leather-armor': {
    id: 'leather-armor',
    name: 'Leather Armor',
    type: 'armor',
    rarity: 'common',
    level: 1,
    stats: { defense: 3, maxHp: 20 },
    description: 'Simple leather protection.',
    emoji: '🥋'
  },

  // Zone 1 drops
  'iron-sword': {
    id: 'iron-sword',
    name: 'Iron Sword',
    type: 'weapon',
    rarity: 'uncommon',
    level: 3,
    stats: { attack: 8, critChance: 0.05 },
    description: 'A sturdy iron blade.',
    emoji: '⚔️'
  },
  'variable-blade': {
    id: 'variable-blade',
    name: 'Variable Blade',
    type: 'weapon',
    rarity: 'rare',
    level: 5,
    stats: { attack: 15, critDamage: 0.2 },
    description: 'A blade that adapts to its wielder. Learn: let, const, var.',
    emoji: '🔮'
  },

  // Zone 2 drops
  'steel-sword': {
    id: 'steel-sword',
    name: 'Steel Longsword',
    type: 'weapon',
    rarity: 'uncommon',
    level: 6,
    stats: { attack: 12, attackSpeed: 0.1 },
    description: 'Well-crafted steel.',
    emoji: '⚔️'
  },
  'chainmail': {
    id: 'chainmail',
    name: 'Chainmail Armor',
    type: 'armor',
    rarity: 'uncommon',
    level: 6,
    stats: { defense: 8, maxHp: 50 },
    description: 'Interlocking rings of protection.',
    emoji: '🛡️'
  },
  'loop-ring': {
    id: 'loop-ring',
    name: 'Ring of Iteration',
    type: 'accessory',
    rarity: 'rare',
    level: 8,
    stats: { attackSpeed: 0.2, mana: 20 },
    description: 'Pulses with the power of loops.',
    emoji: '💍'
  },
  'iterator-blade': {
    id: 'iterator-blade',
    name: 'Iterator Blade',
    type: 'weapon',
    rarity: 'epic',
    level: 10,
    stats: { attack: 25, attackSpeed: 0.15, critChance: 0.1 },
    description: 'Strikes multiple times per swing. Teaches: for, while, forEach.',
    emoji: '🌀'
  },

  // Zone 3 drops
  'array-gauntlets': {
    id: 'array-gauntlets',
    name: 'Array Gauntlets',
    type: 'accessory',
    rarity: 'rare',
    level: 12,
    stats: { attack: 10, critDamage: 0.3 },
    description: 'Indexed for maximum impact.',
    emoji: '🧤'
  },
  'filter-amulet': {
    id: 'filter-amulet',
    name: 'Filter Amulet',
    type: 'accessory',
    rarity: 'rare',
    level: 14,
    stats: { defense: 15, lifeSteal: 0.05 },
    description: 'Only lets through what matters.',
    emoji: '📿'
  },
  'reduce-scepter': {
    id: 'reduce-scepter',
    name: 'Scepter of Reduce',
    type: 'weapon',
    rarity: 'legendary',
    level: 15,
    stats: { attack: 40, critChance: 0.15, critDamage: 0.5 },
    description: 'Combines all power into devastating strikes. Master: .reduce().',
    emoji: '👑'
  },

  // Zone 4 drops
  'async-boots': {
    id: 'async-boots',
    name: 'Async Boots',
    type: 'accessory',
    rarity: 'epic',
    level: 16,
    stats: { attackSpeed: 0.3, defense: 10 },
    description: 'Move faster than synchronous code.',
    emoji: '👢'
  },
  'promise-ring': {
    id: 'promise-ring',
    name: 'Promise Ring',
    type: 'accessory',
    rarity: 'epic',
    level: 18,
    stats: { maxHp: 100, lifeSteal: 0.1 },
    description: 'Always keeps its word... eventually.',
    emoji: '💎'
  },
  'await-blade': {
    id: 'await-blade',
    name: 'Blade of Await',
    type: 'weapon',
    rarity: 'legendary',
    level: 20,
    stats: { attack: 60, attackSpeed: 0.2, critChance: 0.2 },
    description: 'Waits for the perfect moment to strike.',
    emoji: '⚡'
  },

  // Zone 5 drops
  'component-helm': {
    id: 'component-helm',
    name: 'Component Helm',
    type: 'armor',
    rarity: 'epic',
    level: 22,
    stats: { defense: 30, maxHp: 150, maxMana: 50 },
    description: 'Reusable and composable protection.',
    emoji: '⛑️'
  },
  'hook-blade': {
    id: 'hook-blade',
    name: 'Hook Blade',
    type: 'weapon',
    rarity: 'epic',
    level: 24,
    stats: { attack: 50, lifeSteal: 0.15 },
    description: 'useState to become stronger.',
    emoji: '🪝'
  },
  'react-crown': {
    id: 'react-crown',
    name: 'Crown of React',
    type: 'accessory',
    rarity: 'legendary',
    level: 25,
    stats: { attack: 30, defense: 30, critChance: 0.2, critDamage: 0.5, lifeSteal: 0.1 },
    description: 'The ultimate symbol of frontend mastery.',
    emoji: '👑'
  }
};

// ============ ABILITIES ============

export const ABILITIES: Ability[] = [
  // Starter abilities
  {
    id: 'power-strike',
    name: 'Power Strike',
    description: 'A powerful attack dealing 150% damage.',
    manaCost: 10,
    cooldown: 3,
    currentCooldown: 0,
    effect: { type: 'damage', value: 0, scaling: 1.5 },
    unlocked: true,
    emoji: '💥'
  },
  {
    id: 'heal',
    name: 'Heal',
    description: 'Restore 30% of max HP.',
    manaCost: 20,
    cooldown: 8,
    currentCooldown: 0,
    effect: { type: 'heal', value: 0, scaling: 0.3 },
    unlocked: true,
    emoji: '💚'
  },

  // Unlocked through concepts
  {
    id: 'console-log',
    name: 'console.log()',
    description: 'Debug attack. Always crits.',
    manaCost: 15,
    cooldown: 5,
    currentCooldown: 0,
    effect: { type: 'damage', value: 20, scaling: 1.0 },
    unlocked: false,
    requiredConcept: 'variables',
    emoji: '📝'
  },
  {
    id: 'if-else',
    name: 'if/else Strike',
    description: 'Attack that deals bonus damage to low HP enemies.',
    manaCost: 20,
    cooldown: 6,
    currentCooldown: 0,
    effect: { type: 'execute', threshold: 0.3, bonusDamage: 2.0 },
    unlocked: false,
    requiredConcept: 'conditionals',
    emoji: '🔀'
  },
  {
    id: 'for-loop',
    name: 'for Loop',
    description: 'Attack 3 times rapidly.',
    manaCost: 30,
    cooldown: 10,
    currentCooldown: 0,
    effect: { type: 'dot', damage: 15, ticks: 3, interval: 0.3 },
    unlocked: false,
    requiredConcept: 'loops',
    emoji: '🔄'
  },
  {
    id: 'map-attack',
    name: '.map() Attack',
    description: 'Hit ALL enemies on screen.',
    manaCost: 40,
    cooldown: 15,
    currentCooldown: 0,
    effect: { type: 'aoe', damage: 50, hitAll: true },
    unlocked: false,
    requiredConcept: 'arrays-methods',
    emoji: '🗺️'
  },
  {
    id: 'async-heal',
    name: 'Async Heal',
    description: 'Heal over time. 50% HP over 5 seconds.',
    manaCost: 35,
    cooldown: 20,
    currentCooldown: 0,
    effect: { type: 'dot', damage: -10, ticks: 5, interval: 1.0 },
    unlocked: false,
    requiredConcept: 'async-basics',
    emoji: '✨'
  },
  {
    id: 'use-effect',
    name: 'useEffect()',
    description: 'Buff attack speed by 50% for 10 seconds.',
    manaCost: 45,
    cooldown: 30,
    currentCooldown: 0,
    effect: { type: 'buff', stat: 'attackSpeed', value: 0.5, duration: 10 },
    unlocked: false,
    requiredConcept: 'react-hooks',
    emoji: '⚡'
  }
];

// ============ DEFAULT SCRIPTS ============

export const DEFAULT_SCRIPTS: AutoScript[] = [
  {
    id: 'auto-heal',
    name: 'Auto Heal',
    code: `if (player.hp < player.maxHp * 0.5) {\n  useAbility('heal');\n}`,
    enabled: false,  // Disabled by default - let player enable
    priority: 10,
    condition: { type: 'hp_below', percent: 50 },
    action: { type: 'use_ability', abilityId: 'heal' },
    cooldown: 10,
    lastTriggered: 0,
    triggerCount: 0,
    conceptsUsed: ['conditionals']
  },
  {
    id: 'power-strike-ready',
    name: 'Power Strike on Cooldown',
    code: `if (abilities.powerStrike.ready) {\n  useAbility('power-strike');\n}`,
    enabled: false,  // Disabled by default - let player enable
    priority: 5,
    condition: { type: 'ability_ready', abilityId: 'power-strike' },
    action: { type: 'use_ability', abilityId: 'power-strike' },
    cooldown: 3,  // 3 second cooldown to prevent spam
    lastTriggered: 0,
    triggerCount: 0,
    conceptsUsed: ['conditionals']
  }
];

// ============ JS CONCEPTS ============

export const JS_CONCEPTS: JsConcept[] = [
  {
    id: 'variables',
    name: 'Variables',
    category: 'variables',
    description: 'Store and name values with let, const, and var.',
    codeExample: `let damage = 10;\nconst MAX_HP = 100;\nlet playerName = "Hero";`,
    unlocksAbilities: ['console-log'],
    unlocksConditions: [],
    statBonus: { attack: 5 },
    learned: false,
    xpToLearn: 100,
    currentXp: 0,
    prerequisites: [],
    learnByDoing: [
      { id: 'kill-10', description: 'Defeat 10 enemies', type: 'kill_count', target: 10, current: 0, completed: false }
    ]
  },
  {
    id: 'conditionals',
    name: 'Conditionals',
    category: 'conditionals',
    description: 'Make decisions with if, else, and ternary operators.',
    codeExample: `if (player.hp < 50) {\n  heal();\n} else {\n  attack();\n}`,
    unlocksAbilities: ['if-else'],
    unlocksConditions: ['hp_below', 'hp_above', 'enemy_hp_below'],
    statBonus: { critChance: 0.05 },
    learned: false,
    xpToLearn: 150,
    currentXp: 0,
    prerequisites: ['variables'],
    learnByDoing: [
      { id: 'use-heal-5', description: 'Use Heal ability 5 times', type: 'use_ability', target: 5, current: 0, completed: false }
    ]
  },
  {
    id: 'loops',
    name: 'Loops',
    category: 'loops',
    description: 'Repeat actions with for, while, and do-while loops.',
    codeExample: `for (let i = 0; i < 3; i++) {\n  attack();\n}`,
    unlocksAbilities: ['for-loop'],
    unlocksConditions: ['on_kill', 'on_crit'],
    statBonus: { attackSpeed: 0.1 },
    learned: false,
    xpToLearn: 200,
    currentXp: 0,
    prerequisites: ['conditionals'],
    learnByDoing: [
      { id: 'kill-50', description: 'Defeat 50 enemies', type: 'kill_count', target: 50, current: 0, completed: false }
    ]
  },
  {
    id: 'functions',
    name: 'Functions',
    category: 'functions',
    description: 'Create reusable blocks of code.',
    codeExample: `function calculateDamage(base, crit) {\n  return crit ? base * 2 : base;\n}`,
    unlocksAbilities: [],
    unlocksConditions: ['ability_ready'],
    statBonus: { maxMana: 20 },
    learned: false,
    xpToLearn: 250,
    currentXp: 0,
    prerequisites: ['loops'],
    learnByDoing: [
      { id: 'trigger-script-20', description: 'Trigger automation scripts 20 times', type: 'trigger_script', target: 20, current: 0, completed: false }
    ]
  },
  {
    id: 'arrays-basics',
    name: 'Arrays',
    category: 'arrays',
    description: 'Store multiple values in ordered lists.',
    codeExample: `const enemies = ['bug', 'error', 'null'];\nconst first = enemies[0];`,
    unlocksAbilities: [],
    unlocksConditions: [],
    statBonus: { attack: 10 },
    learned: false,
    xpToLearn: 300,
    currentXp: 0,
    prerequisites: ['functions'],
    learnByDoing: [
      { id: 'reach-zone-3', description: 'Reach Array Mountains', type: 'reach_zone', target: 1, current: 0, completed: false }
    ]
  },
  {
    id: 'arrays-methods',
    name: 'Array Methods',
    category: 'arrays',
    description: 'Transform arrays with map, filter, and reduce.',
    codeExample: `const doubled = [1, 2, 3].map(x => x * 2);\nconst sum = [1, 2, 3].reduce((a, b) => a + b);`,
    unlocksAbilities: ['map-attack'],
    unlocksConditions: [],
    statBonus: { critDamage: 0.2 },
    learned: false,
    xpToLearn: 400,
    currentXp: 0,
    prerequisites: ['arrays-basics'],
    learnByDoing: [
      { id: 'defeat-reducer', description: 'Defeat The Reducer boss', type: 'defeat_boss', target: 1, current: 0, completed: false }
    ]
  },
  {
    id: 'objects',
    name: 'Objects',
    category: 'objects',
    description: 'Group related data with key-value pairs.',
    codeExample: `const player = {\n  name: "Hero",\n  hp: 100,\n  attack: 15\n};`,
    unlocksAbilities: [],
    unlocksConditions: [],
    statBonus: { defense: 10 },
    learned: false,
    xpToLearn: 350,
    currentXp: 0,
    prerequisites: ['arrays-basics'],
    learnByDoing: [
      { id: 'equip-5', description: 'Equip 5 different items', type: 'kill_count', target: 5, current: 0, completed: false }
    ]
  },
  {
    id: 'async-basics',
    name: 'Async/Await',
    category: 'async',
    description: 'Handle asynchronous operations elegantly.',
    codeExample: `async function fetchData() {\n  const response = await fetch(url);\n  return response.json();\n}`,
    unlocksAbilities: ['async-heal'],
    unlocksConditions: [],
    statBonus: { attackSpeed: 0.15 },
    learned: false,
    xpToLearn: 500,
    currentXp: 0,
    prerequisites: ['functions', 'arrays-methods'],
    learnByDoing: [
      { id: 'defeat-promise', description: 'Defeat Promise Titan', type: 'defeat_boss', target: 1, current: 0, completed: false }
    ]
  },
  {
    id: 'react-basics',
    name: 'React Components',
    category: 'react',
    description: 'Build UIs with reusable components.',
    codeExample: `function Button({ onClick, children }) {\n  return <button onClick={onClick}>{children}</button>;\n}`,
    unlocksAbilities: [],
    unlocksConditions: [],
    statBonus: { maxHp: 50 },
    learned: false,
    xpToLearn: 600,
    currentXp: 0,
    prerequisites: ['async-basics', 'objects'],
    learnByDoing: [
      { id: 'reach-react', description: 'Reach React Realm', type: 'reach_zone', target: 1, current: 0, completed: false }
    ]
  },
  {
    id: 'react-hooks',
    name: 'React Hooks',
    category: 'react',
    description: 'Add state and effects to functional components.',
    codeExample: `const [count, setCount] = useState(0);\nuseEffect(() => {\n  document.title = count;\n}, [count]);`,
    unlocksAbilities: ['use-effect'],
    unlocksConditions: [],
    statBonus: { critChance: 0.1, critDamage: 0.3 },
    learned: false,
    xpToLearn: 800,
    currentXp: 0,
    prerequisites: ['react-basics'],
    learnByDoing: [
      { id: 'defeat-hydra', description: 'Defeat Hydration Hydra', type: 'defeat_boss', target: 1, current: 0, completed: false }
    ]
  }
];

// ============ HELPER FUNCTIONS ============

export function getEquipmentById(id: string): Equipment | undefined {
  return EQUIPMENT[id];
}

export function getMobTemplate(id: string): MobTemplate | undefined {
  return MOB_TEMPLATES[id];
}

export function getZoneById(id: string): Zone | undefined {
  return ZONES.find(z => z.id === id);
}

export function getAbilityById(id: string): Ability | undefined {
  return ABILITIES.find(a => a.id === id);
}

export function getConceptById(id: string): JsConcept | undefined {
  return JS_CONCEPTS.find(c => c.id === id);
}

export function generateEquipmentDrop(zoneLevel: number): Equipment | null {
  // Roll for rarity
  const roll = Math.random();
  let rarity: Rarity;

  if (roll < 0.02) rarity = 'legendary';
  else if (roll < 0.10) rarity = 'epic';
  else if (roll < 0.25) rarity = 'rare';
  else if (roll < 0.50) rarity = 'uncommon';
  else rarity = 'common';

  // Find equipment matching rarity and level range
  const candidates = Object.values(EQUIPMENT).filter(
    e => e.rarity === rarity && e.level <= zoneLevel + 2 && e.level >= zoneLevel - 3
  );

  if (candidates.length === 0) return null;

  return candidates[Math.floor(Math.random() * candidates.length)];
}
