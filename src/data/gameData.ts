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
// These abilities teach coding concepts through their mechanics!
// Players must THINK about when to use each one optimally.

export const ABILITIES: Ability[] = [
  // ============================================================
  // TIER 0: BASICS - Always available
  // ============================================================
  {
    id: 'attack',
    name: 'Attack',
    description: 'Basic attack. Your bread and butter.',
    manaCost: 0,
    cooldown: 1,
    currentCooldown: 0,
    effect: { type: 'damage', value: 0, scaling: 1.0 },
    unlocked: true,
    emoji: '⚔️'
  },
  {
    id: 'heal',
    name: 'Heal',
    description: 'Restore 30% of max HP.',
    manaCost: 20,
    cooldown: 10,
    currentCooldown: 0,
    effect: { type: 'heal', value: 0, scaling: 0.3 },
    unlocked: true,
    emoji: '💚'
  },

  // ============================================================
  // TIER 1: VARIABLES - Learn let damage = attack;
  // ============================================================
  {
    id: 'power-strike',
    name: 'Power Strike',
    description: 'let damage = attack * 1.5; // Store enhanced damage',
    manaCost: 10,
    cooldown: 4,
    currentCooldown: 0,
    effect: { type: 'damage', value: 0, scaling: 1.5 },
    unlocked: false,
    requiredConcept: 'variables',
    emoji: '💥'
  },
  {
    id: 'defend',
    name: 'Defend',
    description: 'let shield = 50; // Assign defense value',
    manaCost: 5,
    cooldown: 3,
    currentCooldown: 0,
    effect: { type: 'buff', stat: 'defense', value: 50, duration: 3 },
    unlocked: false,
    requiredConcept: 'variables',
    emoji: '🛡️'
  },
  {
    id: 'meditate',
    name: 'Meditate',
    description: 'const restore = maxMana * 0.2; // Calculate mana restore',
    manaCost: 0,
    cooldown: 8,
    currentCooldown: 0,
    effect: { type: 'buff', stat: 'mana', value: 0, duration: 0 },
    unlocked: false,
    requiredConcept: 'variables',
    emoji: '🧘'
  },

  // ============================================================
  // TIER 2: CONDITIONALS - Learn if (condition) { }
  // ============================================================
  {
    id: 'execute',
    name: 'Execute',
    description: 'if (enemy.hp < 30%) { damage *= 3; } // Conditional bonus!',
    manaCost: 15,
    cooldown: 6,
    currentCooldown: 0,
    effect: { type: 'execute', threshold: 0.3, bonusDamage: 3.0 },
    unlocked: false,
    requiredConcept: 'conditionals',
    emoji: '💀'
  },
  {
    id: 'desperate-strike',
    name: 'Desperate Strike',
    description: 'damage = 50% + missingHpPercent; // Lower HP = more power!',
    manaCost: 12,
    cooldown: 5,
    currentCooldown: 0,
    effect: { type: 'desperation', baseScaling: 0.5 },
    unlocked: false,
    requiredConcept: 'conditionals',
    emoji: '🔥'
  },
  {
    id: 'overcharge',
    name: 'Overcharge',
    description: 'if (mana > 70%) { damage = 200%; } else { damage = 80%; }',
    manaCost: 25,
    cooldown: 7,
    currentCooldown: 0,
    effect: { type: 'conditional_damage', condition: 'mana_above', threshold: 0.7, lowScaling: 0.8, highScaling: 2.0 },
    unlocked: false,
    requiredConcept: 'conditionals',
    emoji: '⚡'
  },

  // ============================================================
  // TIER 3: OPERATORS - Learn && || ! for complex conditions
  // ============================================================
  {
    id: 'boolean-strike',
    name: 'Boolean Strike',
    description: 'if (crit || enemy.hp < 30%) { damage = 250% } // OR operator!',
    manaCost: 16,
    cooldown: 6,
    currentCooldown: 0,
    effect: { type: 'boolean_or', condition1: 'is_crit', condition2: 'enemy_hp_below', threshold: 0.3, bonusScaling: 2.5, normalScaling: 1.0 },
    unlocked: false,
    requiredConcept: 'operators',
    emoji: '⚡'
  },
  {
    id: 'combo-condition',
    name: 'Combo Condition',
    description: 'if (hp > 50 && mana > 30) { damage = 200%; heal(10%) } // AND operator!',
    manaCost: 20,
    cooldown: 8,
    currentCooldown: 0,
    effect: { type: 'boolean_and', condition1: 'hp_above', threshold1: 0.5, condition2: 'mana_above', threshold2: 0.3, bonusScaling: 2.0, healPercent: 0.1 },
    unlocked: false,
    requiredConcept: 'operators',
    emoji: '🔗'
  },
  {
    id: 'negation-blast',
    name: 'Negation Blast',
    description: 'if (!fullHp) { damage += missingHp% } // NOT operator!',
    manaCost: 12,
    cooldown: 5,
    currentCooldown: 0,
    effect: { type: 'boolean_not', condition: 'hp_full', bonusPerMissingPercent: 0.02 },
    unlocked: false,
    requiredConcept: 'operators',
    emoji: '❗'
  },

  // ============================================================
  // TIER 4: LOOPS - Learn for (let i = 0; i < n; i++)
  // ============================================================
  {
    id: 'double-tap',
    name: 'Double Tap',
    description: 'for (let i = 0; i < 2; i++) { hit(60%); } // Loop twice!',
    manaCost: 14,
    cooldown: 5,
    currentCooldown: 0,
    effect: { type: 'multi_hit', hits: 2, scaling: 0.6 },
    unlocked: false,
    requiredConcept: 'loops',
    emoji: '👆👆'
  },
  {
    id: 'triple-strike',
    name: 'Triple Strike',
    description: 'for (let i = 0; i < 3; i++) { hit(50%); } // Loop 3x!',
    manaCost: 20,
    cooldown: 8,
    currentCooldown: 0,
    effect: { type: 'multi_hit', hits: 3, scaling: 0.5 },
    unlocked: false,
    requiredConcept: 'loops',
    emoji: '🔱'
  },
  {
    id: 'ramping-fury',
    name: 'Ramping Fury',
    description: 'let stack = 0; while(true) { damage += stack++ * 20%; }',
    manaCost: 10,
    cooldown: 3,
    currentCooldown: 0,
    effect: { type: 'ramping', baseScaling: 0.8, rampPerUse: 0.2 },
    unlocked: false,
    requiredConcept: 'loops',
    emoji: '📈'
  },

  // ============================================================
  // TIER 4: FUNCTIONS - Learn function calc(x) { return x; }
  // ============================================================
  {
    id: 'percent-slash',
    name: '% Slash',
    description: 'function damage(enemy) { return enemy.maxHp * 0.08; }',
    manaCost: 18,
    cooldown: 8,
    currentCooldown: 0,
    effect: { type: 'percent_max_hp', percent: 0.08 },
    unlocked: false,
    requiredConcept: 'functions',
    emoji: '📊'
  },
  {
    id: 'finishing-blow',
    name: 'Finishing Blow',
    description: 'function finish(e) { return (e.maxHp - e.hp) * 0.15; }',
    manaCost: 12,
    cooldown: 5,
    currentCooldown: 0,
    effect: { type: 'percent_missing_hp', percent: 0.15 },
    unlocked: false,
    requiredConcept: 'functions',
    emoji: '🎯'
  },
  {
    id: 'life-drain',
    name: 'Life Drain',
    description: 'function drain(dmg) { heal(dmg * 0.5); return dmg; }',
    manaCost: 22,
    cooldown: 9,
    currentCooldown: 0,
    effect: { type: 'lifesteal_burst', scaling: 1.2, healPercent: 0.5 },
    unlocked: false,
    requiredConcept: 'functions',
    emoji: '🧛'
  },

  // ============================================================
  // TIER 5: ARRAYS - Learn const arr = []; arr.push();
  // ============================================================
  {
    id: 'efficient-strike',
    name: 'Efficient Strike',
    description: 'costs.filter(c => hp > 80%).reduce((a,b) => a-5, cost);',
    manaCost: 15,
    cooldown: 4,
    currentCooldown: 0,
    effect: { type: 'conditional_cost', scaling: 1.3, condition: 'hp_above', threshold: 0.8, discount: 5 },
    unlocked: false,
    requiredConcept: 'arrays-basics',
    emoji: '💡'
  },
  {
    id: 'mana-bomb',
    name: 'Mana Bomb',
    description: '[...allMana].forEach(m => damage += m * 3); mana = 0;',
    manaCost: 1,
    cooldown: 15,
    currentCooldown: 0,
    effect: { type: 'mana_consume', damagePerMana: 3 },
    unlocked: false,
    requiredConcept: 'arrays-basics',
    emoji: '💣'
  },
  {
    id: 'conservation',
    name: 'Conservation',
    description: 'if (kills.includes(target)) { mana.push(refund); }',
    manaCost: 16,
    cooldown: 5,
    currentCooldown: 0,
    effect: { type: 'refund_on_kill', scaling: 1.0, refundPercent: 0.5 },
    unlocked: false,
    requiredConcept: 'arrays-basics',
    emoji: '♻️'
  },

  // ============================================================
  // TIER 6: OBJECTS - Learn const obj = { key: value };
  // ============================================================
  {
    id: 'focus',
    name: 'Focus',
    description: 'player.buffs = { ...player.buffs, attack: +100 };',
    manaCost: 8,
    cooldown: 6,
    currentCooldown: 0,
    effect: { type: 'buff', stat: 'attack', value: 100, duration: 5 },
    unlocked: false,
    requiredConcept: 'objects',
    emoji: '🎯'
  },
  {
    id: 'berserk',
    name: 'Berserk',
    description: 'Object.assign(stats, { atkSpd: +50%, def: -30% });',
    manaCost: 20,
    cooldown: 20,
    currentCooldown: 0,
    effect: { type: 'berserk', attackSpeedBonus: 0.5, defenseReduction: 0.3, duration: 8 },
    unlocked: false,
    requiredConcept: 'objects',
    emoji: '😤'
  },
  {
    id: 'calculated-strike',
    name: 'Calculated Strike',
    description: 'const dmg = enemy.attack * 2; // Read enemy object',
    manaCost: 18,
    cooldown: 8,
    currentCooldown: 0,
    effect: { type: 'reflect_stat', stat: 'attack', multiplier: 2 },
    unlocked: false,
    requiredConcept: 'objects',
    emoji: '🧠'
  },

  // ============================================================
  // UNLOCKED THROUGH CONCEPTS - Advanced abilities
  // ============================================================
  {
    id: 'console-log',
    name: 'console.log()',
    description: 'Debug attack. Always crits! Damage = attack * 1.5.',
    manaCost: 15,
    cooldown: 5,
    currentCooldown: 0,
    effect: { type: 'guaranteed_crit', scaling: 1.5 },
    unlocked: false,
    requiredConcept: 'variables',
    emoji: '📝'
  },
  {
    id: 'ternary-strike',
    name: 'Ternary Strike',
    description: 'hp > 50% ? deal 80% damage : deal 180% damage',
    manaCost: 14,
    cooldown: 5,
    currentCooldown: 0,
    effect: { type: 'ternary', condition: 'hp_above', threshold: 0.5, trueScaling: 0.8, falseScaling: 1.8 },
    unlocked: false,
    requiredConcept: 'conditionals',
    emoji: '❓'
  },
  {
    id: 'for-loop',
    name: 'for Loop',
    description: 'for(i=0; i<4; i++) { attack() } - Hit 4x for 40% each.',
    manaCost: 30,
    cooldown: 12,
    currentCooldown: 0,
    effect: { type: 'multi_hit', hits: 4, scaling: 0.4 },
    unlocked: false,
    requiredConcept: 'loops',
    emoji: '🔄'
  },
  {
    id: 'map-attack',
    name: '.map() Attack',
    description: 'enemies.map(e => damage(e)) - Hit ALL enemies for 80%!',
    manaCost: 40,
    cooldown: 15,
    currentCooldown: 0,
    effect: { type: 'aoe', damage: 0, scaling: 0.8, hitAll: true },
    unlocked: false,
    requiredConcept: 'arrays-methods',
    emoji: '🗺️'
  },
  {
    id: 'reduce-attack',
    name: '.reduce() Finisher',
    description: 'Deal damage = sum of all damage dealt this fight * 0.1',
    manaCost: 50,
    cooldown: 30,
    currentCooldown: 0,
    effect: { type: 'reduce_damage', multiplier: 0.1 },
    unlocked: false,
    requiredConcept: 'arrays-methods',
    emoji: '➕'
  },
  {
    id: 'async-heal',
    name: 'Async Heal',
    description: 'await heal() - Restore 10% HP every second for 5s.',
    manaCost: 35,
    cooldown: 20,
    currentCooldown: 0,
    effect: { type: 'hot', healPercent: 0.1, ticks: 5, interval: 1.0 },
    unlocked: false,
    requiredConcept: 'async-basics',
    emoji: '✨'
  },
  {
    id: 'promise-chain',
    name: 'Promise Chain',
    description: 'attack().then(heal).then(attack) - Attack, heal 10%, attack.',
    manaCost: 30,
    cooldown: 10,
    currentCooldown: 0,
    effect: { type: 'promise_chain', actions: ['attack', 'heal_10', 'attack'] },
    unlocked: false,
    requiredConcept: 'async-basics',
    emoji: '⛓️'
  },

  // ============================================================
  // TIER 10: REACT BASICS - Components & Props
  // ============================================================
  {
    id: 'component-render',
    name: 'Component Render',
    description: '<DamageComponent damage={attack * 1.5} /> // Render for 150% damage!',
    manaCost: 25,
    cooldown: 7,
    currentCooldown: 0,
    effect: { type: 'damage', value: 0, scaling: 1.5 },
    unlocked: false,
    requiredConcept: 'react-basics',
    emoji: '🧩'
  },
  {
    id: 'props-drill',
    name: 'Props Drill',
    description: '<Parent><Child damage={dmg}/></Parent> // Drill 3 hits, 60% each!',
    manaCost: 30,
    cooldown: 10,
    currentCooldown: 0,
    effect: { type: 'multi_hit', hits: 3, scaling: 0.6 },
    unlocked: false,
    requiredConcept: 'react-basics',
    emoji: '⬇️'
  },
  {
    id: 'event-handler',
    name: 'Event Handler',
    description: 'onClick={() => { attack(); heal(15%) }} // Attack + heal on trigger!',
    manaCost: 22,
    cooldown: 8,
    currentCooldown: 0,
    effect: { type: 'lifesteal_burst', scaling: 1.2, healPercent: 0.15 },
    unlocked: false,
    requiredConcept: 'react-basics',
    emoji: '👆'
  },

  // ============================================================
  // TIER 11: REACT HOOKS - useState & useEffect
  // ============================================================
  {
    id: 'use-effect',
    name: 'useEffect()',
    description: 'useEffect(() => buff, []) - +50% attack speed for 10s.',
    manaCost: 45,
    cooldown: 30,
    currentCooldown: 0,
    effect: { type: 'buff', stat: 'attackSpeed', value: 0.5, duration: 10 },
    unlocked: false,
    requiredConcept: 'react-hooks',
    emoji: '⚛️'
  },
  {
    id: 'use-state',
    name: 'useState()',
    description: 'const [dmg, setDmg] = useState(50) - Store 50 damage, release anytime.',
    manaCost: 25,
    cooldown: 12,
    currentCooldown: 0,
    effect: { type: 'stored_damage', baseDamage: 50, canStack: true },
    unlocked: false,
    requiredConcept: 'react-hooks',
    emoji: '📦'
  }
];

// ============ DEFAULT SCRIPTS ============
// Player starts with NO scripts - they must learn concepts to unlock script conditions/actions
// and then BUILD their own automation. This is the core learning loop!

export const DEFAULT_SCRIPTS: AutoScript[] = [];

// ============ SHOP ITEMS ============
// PROGRESSION DESIGN - Each item EXPANDS CAPABILITY, not just stats!
//
// The player starts with NOTHING automated. They must:
// 1. Manually click Attack to kill first ~10 enemies
// 2. Buy "Automation Core" - unlocks while(true) + attack() - FIRST automation!
// 3. Buy conditions/actions that let them handle NEW CHALLENGES
//
// Each zone introduces enemies that REQUIRE new capabilities:
// - Zone 1: Basic mobs → need while(true) { attack() }
// - Zone 1 late: Mobs hit harder → need if(hp < 50%) heal()
// - Zone 2: Tanky mobs → need if(enemy.hp < 30%) powerStrike()
// - Zone 2 late: Fast attackers → need multiple conditions with &&
// - Zone 3+: Increasingly complex requiring more advanced scripts
//
// Gold scales with zone, items unlock WHEN YOU NEED THEM

// ============================================================
// SHOP ITEMS - Pure stat upgrades!
// Gold = Power (stats), Learning = Efficiency (abilities + automation)
// ============================================================
export const SHOP_ITEMS: Equipment[] = [
  // ============================================================
  // TIER 1: STARTER GEAR (~30-80g)
  // Basic stat boosts while you learn Variables
  // ============================================================
  {
    id: 'training-sword',
    name: 'Training Sword',
    type: 'weapon',
    rarity: 'common',
    level: 1,
    stats: { attack: 3 },
    description: 'A basic blade for beginners.',
    emoji: '🗡️'
  },
  {
    id: 'cloth-armor',
    name: 'Cloth Armor',
    type: 'armor',
    rarity: 'common',
    level: 1,
    stats: { defense: 2, maxHp: 15 },
    description: 'Simple protection.',
    emoji: '👕'
  },
  {
    id: 'health-charm',
    name: 'Health Charm',
    type: 'accessory',
    rarity: 'common',
    level: 1,
    stats: { maxHp: 20 },
    description: 'Grants extra vitality.',
    emoji: '💚'
  },

  // ============================================================
  // TIER 2: IMPROVED GEAR (~100-200g)
  // Better stats as you learn Conditionals
  // ============================================================
  {
    id: 'iron-blade',
    name: 'Iron Blade',
    type: 'weapon',
    rarity: 'common',
    level: 2,
    stats: { attack: 6, critChance: 0.03 },
    description: 'A solid iron weapon.',
    emoji: '⚔️'
  },
  {
    id: 'leather-vest',
    name: 'Leather Vest',
    type: 'armor',
    rarity: 'common',
    level: 2,
    stats: { defense: 5, maxHp: 25 },
    description: 'Flexible and protective.',
    emoji: '🥋'
  },
  {
    id: 'mana-pendant',
    name: 'Mana Pendant',
    type: 'accessory',
    rarity: 'uncommon',
    level: 2,
    stats: { maxMana: 20 },
    description: 'Increases magical reserves.',
    emoji: '💎'
  },

  // ============================================================
  // TIER 3: COMBAT GEAR (~250-400g)
  // Stronger stats for Loops & Operators
  // ============================================================
  {
    id: 'steel-sword',
    name: 'Steel Sword',
    type: 'weapon',
    rarity: 'uncommon',
    level: 3,
    stats: { attack: 10, critChance: 0.05 },
    description: 'Well-forged steel.',
    emoji: '⚔️'
  },
  {
    id: 'chain-armor',
    name: 'Chain Armor',
    type: 'armor',
    rarity: 'uncommon',
    level: 3,
    stats: { defense: 10, maxHp: 40 },
    description: 'Interlocked rings of protection.',
    emoji: '🛡️'
  },
  {
    id: 'warriors-ring',
    name: "Warrior's Ring",
    type: 'accessory',
    rarity: 'uncommon',
    level: 3,
    stats: { attack: 5, critDamage: 0.15 },
    description: 'Enhances combat prowess.',
    emoji: '💍'
  },

  // ============================================================
  // TIER 4: VETERAN GEAR (~500-800g)
  // Strong stats for Functions & Zone 2
  // ============================================================
  {
    id: 'knights-blade',
    name: "Knight's Blade",
    type: 'weapon',
    rarity: 'rare',
    level: 4,
    stats: { attack: 16, critChance: 0.08, attackSpeed: 0.05 },
    description: 'A noble warrior\'s weapon.',
    emoji: '🗡️'
  },
  {
    id: 'plate-armor',
    name: 'Plate Armor',
    type: 'armor',
    rarity: 'rare',
    level: 4,
    stats: { defense: 18, maxHp: 60 },
    description: 'Heavy but effective.',
    emoji: '🛡️'
  },
  {
    id: 'arcane-focus',
    name: 'Arcane Focus',
    type: 'accessory',
    rarity: 'rare',
    level: 4,
    stats: { maxMana: 35, attack: 8 },
    description: 'Channels magical energy.',
    emoji: '🔮'
  },

  // ============================================================
  // TIER 5: ELITE GEAR (~1000-1500g)
  // High stats for Arrays & Zone 3
  // ============================================================
  {
    id: 'berserker-axe',
    name: 'Berserker Axe',
    type: 'weapon',
    rarity: 'rare',
    level: 5,
    stats: { attack: 24, critChance: 0.1, critDamage: 0.25 },
    description: 'Forged in fury.',
    emoji: '🪓'
  },
  {
    id: 'guardian-plate',
    name: 'Guardian Plate',
    type: 'armor',
    rarity: 'rare',
    level: 5,
    stats: { defense: 25, maxHp: 80, lifeSteal: 0.03 },
    description: 'Blessed with protective magic.',
    emoji: '🛡️'
  },
  {
    id: 'speed-talisman',
    name: 'Speed Talisman',
    type: 'accessory',
    rarity: 'rare',
    level: 5,
    stats: { attackSpeed: 0.15, critChance: 0.08 },
    description: 'Hastens all actions.',
    emoji: '⚡'
  },

  // ============================================================
  // TIER 6: CHAMPION GEAR (~2000-3000g)
  // Epic stats for Objects & Zone 3 Boss
  // ============================================================
  {
    id: 'champions-blade',
    name: "Champion's Blade",
    type: 'weapon',
    rarity: 'epic',
    level: 6,
    stats: { attack: 35, critChance: 0.12, critDamage: 0.35 },
    description: 'Wielded by legendary heroes.',
    emoji: '⚔️'
  },
  {
    id: 'champions-armor',
    name: "Champion's Armor",
    type: 'armor',
    rarity: 'epic',
    level: 6,
    stats: { defense: 35, maxHp: 100, lifeSteal: 0.05 },
    description: 'Worn by the greatest warriors.',
    emoji: '🛡️'
  },
  {
    id: 'power-core',
    name: 'Power Core',
    type: 'accessory',
    rarity: 'epic',
    level: 6,
    stats: { attack: 15, maxMana: 40, attackSpeed: 0.1 },
    description: 'Pure concentrated power.',
    emoji: '💠'
  },

  // ============================================================
  // TIER 7: MASTER GEAR (~4000-6000g)
  // Powerful stats for Array Methods & Zone 4
  // ============================================================
  {
    id: 'void-blade',
    name: 'Void Blade',
    type: 'weapon',
    rarity: 'epic',
    level: 7,
    stats: { attack: 50, critChance: 0.15, critDamage: 0.45 },
    description: 'Cuts through reality itself.',
    emoji: '🌀'
  },
  {
    id: 'void-armor',
    name: 'Void Armor',
    type: 'armor',
    rarity: 'epic',
    level: 7,
    stats: { defense: 45, maxHp: 120, lifeSteal: 0.08 },
    description: 'Woven from darkness.',
    emoji: '🖤'
  },
  {
    id: 'infinity-band',
    name: 'Infinity Band',
    type: 'accessory',
    rarity: 'epic',
    level: 7,
    stats: { attack: 20, attackSpeed: 0.2, critChance: 0.1 },
    description: 'Limitless potential.',
    emoji: '♾️'
  },

  // ============================================================
  // TIER 8: LEGEND GEAR (~6000-10000g)
  // Async concepts & Zone 4
  // ============================================================
  {
    id: 'temporal-blade',
    name: 'Temporal Blade',
    type: 'weapon',
    rarity: 'legendary',
    level: 8,
    stats: { attack: 65, critChance: 0.18, attackSpeed: 0.2 },
    description: 'Strikes across time itself.',
    emoji: '⏰'
  },
  {
    id: 'temporal-armor',
    name: 'Temporal Armor',
    type: 'armor',
    rarity: 'legendary',
    level: 8,
    stats: { defense: 55, maxHp: 140, lifeSteal: 0.1 },
    description: 'Shifts between moments.',
    emoji: '⌛'
  },
  {
    id: 'eternity-ring',
    name: 'Eternity Ring',
    type: 'accessory',
    rarity: 'legendary',
    level: 8,
    stats: { attack: 25, maxMana: 60, critDamage: 0.5 },
    description: 'Power without end.',
    emoji: '💫'
  },

  // ============================================================
  // TIER 9: ULTIMATE GEAR (~12000-20000g)
  // React concepts & Zone 5
  // ============================================================
  {
    id: 'react-blade',
    name: 'Blade of React',
    type: 'weapon',
    rarity: 'legendary',
    level: 9,
    stats: { attack: 80, critChance: 0.22, critDamage: 0.6 },
    description: 'Reactive to every situation.',
    emoji: '⚛️'
  },
  {
    id: 'component-armor',
    name: 'Component Armor',
    type: 'armor',
    rarity: 'legendary',
    level: 9,
    stats: { defense: 65, maxHp: 160, lifeSteal: 0.12 },
    description: 'Reusable and composable.',
    emoji: '🧩'
  },
  {
    id: 'state-gem',
    name: 'State Gem',
    type: 'accessory',
    rarity: 'legendary',
    level: 9,
    stats: { attack: 30, defense: 30, maxMana: 80 },
    description: 'Remembers everything.',
    emoji: '💎'
  },

  // ============================================================
  // TIER 10: ENDGAME GEAR (~25000-40000g)
  // Final boss & mastery
  // ============================================================
  {
    id: 'developers-keyboard',
    name: "Developer's Keyboard",
    type: 'weapon',
    rarity: 'legendary',
    level: 10,
    stats: { attack: 100, critChance: 0.25, critDamage: 0.75, attackSpeed: 0.15 },
    description: 'The ultimate tool of creation.',
    emoji: '⌨️'
  },
  {
    id: 'developers-hoodie',
    name: "Developer's Hoodie",
    type: 'armor',
    rarity: 'legendary',
    level: 10,
    stats: { defense: 75, maxHp: 200, maxMana: 100, lifeSteal: 0.15 },
    description: 'The armor of choice for coders everywhere.',
    emoji: '🧥'
  },
  {
    id: 'coffee-mug',
    name: 'Infinite Coffee Mug',
    type: 'accessory',
    rarity: 'legendary',
    level: 10,
    stats: { attack: 40, attackSpeed: 0.3, maxMana: 100, critChance: 0.2 },
    description: 'Never runs empty. Ever.',
    emoji: '☕'
  }
];

export function getShopItemPrice(item: Equipment): number {
  // Prices scale to match gold income progression:
  // Zone 1 (~10g/kill): Tier 1 items 30-80g → 3-8 kills
  // Zone 3 (~100g/kill): Tier 5-6 items 800-2000g → 8-20 kills
  // Zone 5 (~500g/kill): Tier 9-10 items 10k-30k → 20-60 kills

  const basePrice = 30;

  // 1.7x per level - matches gold scaling progression
  const levelMultiplier = Math.pow(1.7, item.level - 1);

  // Rarity adds premium
  const rarityMultiplier = {
    common: 1,
    uncommon: 1.4,
    rare: 2.2,
    epic: 3.5,
    legendary: 5
  };

  return Math.floor(basePrice * levelMultiplier * rarityMultiplier[item.rarity]);
}

// ============ JS CONCEPTS - SKILL TREE ============
// Buy with gold! Better automation → kill stronger mobs → more gold → repeat!

export const JS_CONCEPTS: JsConcept[] = [
  // ============================================================
  // TIER 1: VARIABLES (50g) - First automation!
  // ============================================================
  {
    id: 'variables',
    name: 'Variables',
    category: 'variables',
    description: 'Store values and automate your first loop!',
    codeExample: `let damage = 10;\nwhile (true) {\n  attack();\n}`,
    unlocksAbilities: ['power-strike', 'defend', 'meditate'],
    unlocksFeatures: ['loop_while_true', 'variables_let', 'variables_const', 'action_heal'],
    unlocksConditions: [],
    statBonus: { attack: 5 },
    learned: false,
    goldCost: 50,
    prerequisites: []
  },

  // ============================================================
  // TIER 2: CONDITIONALS (150g) - React to danger!
  // ============================================================
  {
    id: 'conditionals',
    name: 'Conditionals',
    category: 'conditionals',
    description: 'Make decisions - heal when hurt, execute when enemy is low!',
    codeExample: `if (hp < 50) {\n  heal();\n} else if (enemy.hp < 30) {\n  execute();\n}`,
    unlocksAbilities: ['execute', 'desperate-strike', 'overcharge', 'ternary-strike'],
    unlocksFeatures: ['condition_hp_below', 'condition_hp_above', 'condition_enemy_hp_below', 'condition_mana_above', 'action_power_strike'],
    unlocksConditions: ['hp_below', 'hp_above', 'enemy_hp_below', 'mana_above'],
    statBonus: { critChance: 0.05 },
    learned: false,
    goldCost: 150,
    prerequisites: ['variables']
  },

  // ============================================================
  // TIER 3: OPERATORS (300g) - Combine conditions!
  // ============================================================
  {
    id: 'operators',
    name: 'Operators',
    category: 'conditionals',
    description: 'Combine conditions with AND, OR, NOT for smarter scripts!',
    codeExample: `if (hp < 50 && mana > 20) {\n  heal();\n} else if (enemy.hp < 30 || hp > 80) {\n  powerStrike();\n}`,
    unlocksAbilities: ['boolean-strike', 'combo-condition', 'negation-blast'],
    unlocksFeatures: ['operator_and', 'operator_or', 'operator_not', 'condition_ability_ready', 'action_defend'],
    unlocksConditions: ['ability_ready'],
    statBonus: { defense: 5, maxMana: 10 },
    learned: false,
    goldCost: 300,
    prerequisites: ['conditionals']
  },

  // ============================================================
  // TIER 4: LOOPS (500g) - Multi-hit combos!
  // ============================================================
  {
    id: 'loops',
    name: 'Loops',
    category: 'loops',
    description: 'Repeat actions efficiently - combo attacks!',
    codeExample: `for (let i = 0; i < 3; i++) {\n  attack();\n  if (enemy.hp <= 0) break;\n}`,
    unlocksAbilities: ['double-tap', 'triple-strike', 'ramping-fury', 'for-loop'],
    unlocksFeatures: ['loop_for', 'loop_counter', 'loop_break', 'loop_continue', 'action_meditate'],
    unlocksConditions: ['on_kill', 'on_crit'],
    statBonus: { attackSpeed: 0.1 },
    learned: false,
    goldCost: 500,
    prerequisites: ['operators']
  },

  // ============================================================
  // TIER 5: FUNCTIONS (800g) - Reusable code!
  // ============================================================
  {
    id: 'functions',
    name: 'Functions',
    category: 'functions',
    description: 'Create reusable code - define your own attack combos!',
    codeExample: `function burst(enemy) {\n  if (enemy.hp < 30) return execute();\n  return powerStrike();\n}`,
    unlocksAbilities: ['percent-slash', 'finishing-blow', 'life-drain', 'console-log'],
    unlocksFeatures: ['function_define', 'function_params', 'function_return', 'function_arrow', 'math_operations'],
    unlocksConditions: [],
    statBonus: { maxMana: 20 },
    learned: false,
    goldCost: 800,
    prerequisites: ['loops']
  },

  // ============================================================
  // TIER 6: ARRAYS (1200g) - Handle groups!
  // ============================================================
  {
    id: 'arrays-basics',
    name: 'Arrays',
    category: 'arrays',
    description: 'Work with collections - target multiple enemies efficiently!',
    codeExample: `const enemies = getEnemies();\nenemies.forEach(e => {\n  if (e.hp < 30) execute(e);\n});`,
    unlocksAbilities: ['efficient-strike', 'mana-bomb', 'conservation'],
    unlocksFeatures: ['array_length', 'array_foreach', 'array_includes', 'array_find'],
    unlocksConditions: [],
    statBonus: { attack: 10 },
    learned: false,
    goldCost: 1200,
    prerequisites: ['functions']
  },

  // ============================================================
  // TIER 7: OBJECTS (1800g) - Data structures!
  // ============================================================
  {
    id: 'objects',
    name: 'Objects',
    category: 'objects',
    description: 'Group related data - read enemy stats, manage buffs!',
    codeExample: `const { hp, attack } = enemy;\nif (attack > 50) {\n  defend();\n}`,
    unlocksAbilities: ['focus', 'berserk', 'calculated-strike'],
    unlocksFeatures: ['object_access', 'object_destructure', 'object_spread'],
    unlocksConditions: [],
    statBonus: { defense: 10 },
    learned: false,
    goldCost: 1800,
    prerequisites: ['arrays-basics']
  },

  // ============================================================
  // TIER 8: ARRAY METHODS (2500g) - Transform data!
  // ============================================================
  {
    id: 'arrays-methods',
    name: 'Array Methods',
    category: 'arrays',
    description: 'Transform data - filter weak enemies, map attacks!',
    codeExample: `const weak = enemies.filter(e => e.hp < 50);\nconst damage = weak.map(e => attack(e))\n  .reduce((a, b) => a + b, 0);`,
    unlocksAbilities: ['map-attack', 'reduce-attack'],
    unlocksFeatures: ['array_filter', 'array_map', 'ternary_operator'],
    unlocksConditions: [],
    statBonus: { critDamage: 0.2 },
    learned: false,
    goldCost: 2500,
    prerequisites: ['objects']
  },

  // ============================================================
  // TIER 9: ASYNC (4000g) - Timing is everything!
  // ============================================================
  {
    id: 'async-basics',
    name: 'Async/Await',
    category: 'async',
    description: 'Handle timing - chain actions, wait for cooldowns!',
    codeExample: `async function combo() {\n  await powerStrike();\n  await heal();\n  await execute();\n}`,
    unlocksAbilities: ['async-heal', 'promise-chain'],
    unlocksFeatures: ['promise_then', 'async_await', 'setTimeout_setInterval'],
    unlocksConditions: [],
    statBonus: { attackSpeed: 0.15 },
    learned: false,
    goldCost: 4000,
    prerequisites: ['arrays-methods']
  },

  // ============================================================
  // TIER 10: REACT BASICS (6000g) - Components!
  // ============================================================
  {
    id: 'react-basics',
    name: 'React Components',
    category: 'react',
    description: 'Build reusable UI - understand props and events!',
    codeExample: `function AttackButton({ onAttack }) {\n  return <button onClick={onAttack}>Attack!</button>;\n}`,
    unlocksAbilities: ['component-render', 'props-drill', 'event-handler'],
    unlocksFeatures: ['react_props', 'react_events'],
    unlocksConditions: [],
    statBonus: { maxHp: 50, attack: 15 },
    learned: false,
    goldCost: 6000,
    prerequisites: ['async-basics']
  },

  // ============================================================
  // TIER 11: REACT HOOKS (10000g) - State mastery!
  // ============================================================
  {
    id: 'react-hooks',
    name: 'React Hooks',
    category: 'react',
    description: 'Master state - useState for tracking, useEffect for reactions!',
    codeExample: `const [combo, setCombo] = useState(0);\nuseEffect(() => {\n  if (combo > 10) setBerserk(true);\n}, [combo]);`,
    unlocksAbilities: ['use-effect', 'use-state'],
    unlocksFeatures: ['react_useState', 'react_useEffect'],
    unlocksConditions: [],
    statBonus: { critChance: 0.1, critDamage: 0.3 },
    learned: false,
    goldCost: 10000,
    prerequisites: ['react-basics']
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
