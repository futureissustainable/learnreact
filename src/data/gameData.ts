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
  // TIER 3: LOOPS - Learn for (let i = 0; i < n; i++)
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

export const SHOP_ITEMS: Equipment[] = [
  // ============================================================
  // TIER 0: THE FIRST UNLOCK (~50g from 10 manual kills)
  // This is THE pivotal moment - automation begins!
  // ============================================================
  {
    id: 'automation-core',
    name: 'Automation Core',
    type: 'accessory',
    rarity: 'common',
    level: 1,
    stats: { attack: 1 },
    description: 'The foundation of all automation. Your first loop!',
    emoji: '⚙️',
    unlocks: 'loop_while_true',
    unlocksDescription: 'Unlocks: while(true) { } + attack() - Basic automation!'
  },

  // ============================================================
  // TIER 1: SURVIVAL BASICS (~80-120g)
  // Zone 1 mobs start hitting back - need healing automation
  // ============================================================
  {
    id: 'healing-tome',
    name: 'Healing Tome',
    type: 'accessory',
    rarity: 'common',
    level: 1,
    stats: { maxHp: 10, maxMana: 10 },
    description: 'Ancient knowledge of restoration.',
    emoji: '📖',
    unlocks: 'action_heal',
    unlocksDescription: 'Unlocks: heal() action in scripts'
  },
  {
    id: 'conditional-blade',
    name: 'Conditional Blade',
    type: 'weapon',
    rarity: 'common',
    level: 1,
    stats: { attack: 3 },
    description: 'A blade that teaches you to check your health.',
    emoji: '🗡️',
    unlocks: 'condition_hp_below',
    unlocksDescription: 'Unlocks: if (hp < X%) - React when hurt!'
  },

  // ============================================================
  // TIER 2: OFFENSIVE OPTIONS (~150-250g)
  // Zone 1 boss / Zone 2 mobs are tanky - need burst damage
  // ============================================================
  {
    id: 'power-gauntlets',
    name: 'Power Gauntlets',
    type: 'armor',
    rarity: 'uncommon',
    level: 2,
    stats: { attack: 5, defense: 2 },
    description: 'Empowers your strikes with raw force.',
    emoji: '🧤',
    unlocks: 'action_power_strike',
    unlocksDescription: 'Unlocks: powerStrike() - Heavy damage ability'
  },
  {
    id: 'executioner-blade',
    name: 'Executioner Blade',
    type: 'weapon',
    rarity: 'uncommon',
    level: 2,
    stats: { attack: 6, critChance: 0.05 },
    description: 'Senses when enemies are weak.',
    emoji: '⚔️',
    unlocks: 'condition_enemy_hp_below',
    unlocksDescription: 'Unlocks: if (enemy.hp < X%) - Finish them!'
  },
  {
    id: 'mana-crystal',
    name: 'Mana Crystal',
    type: 'accessory',
    rarity: 'uncommon',
    level: 2,
    stats: { maxMana: 25 },
    description: 'Sense your magical reserves.',
    emoji: '💎',
    unlocks: 'condition_mana_above',
    unlocksDescription: 'Unlocks: if (mana > X%) - Use abilities wisely'
  },

  // ============================================================
  // TIER 3: COMBINING CONDITIONS (~300-500g)
  // Zone 2 requires smarter scripts - combine conditions!
  // ============================================================
  {
    id: 'amulet-of-and',
    name: 'Amulet of AND',
    type: 'accessory',
    rarity: 'rare',
    level: 3,
    stats: { attack: 4, defense: 4 },
    description: 'Both conditions must be true.',
    emoji: '🔗',
    unlocks: 'operator_and',
    unlocksDescription: 'Unlocks: && - if (hp < 50 && mana > 20)'
  },
  {
    id: 'amulet-of-or',
    name: 'Amulet of OR',
    type: 'accessory',
    rarity: 'rare',
    level: 3,
    stats: { attack: 5, defense: 3 },
    description: 'Either condition can be true.',
    emoji: '🔀',
    unlocks: 'operator_or',
    unlocksDescription: 'Unlocks: || - if (hp < 30 || enemy.hp < 10)'
  },
  {
    id: 'cooldown-ring',
    name: 'Cooldown Ring',
    type: 'accessory',
    rarity: 'rare',
    level: 3,
    stats: { attackSpeed: 0.1 },
    description: 'Know when abilities are ready.',
    emoji: '💍',
    unlocks: 'condition_ability_ready',
    unlocksDescription: 'Unlocks: if (ability.ready) - Optimal timing'
  },

  // ============================================================
  // TIER 4: RESOURCE MANAGEMENT (~600-1000g)
  // Zone 2 boss / Zone 3 - longer fights, need mana management
  // ============================================================
  {
    id: 'meditation-orb',
    name: 'Meditation Orb',
    type: 'accessory',
    rarity: 'rare',
    level: 4,
    stats: { maxMana: 30, defense: 5 },
    description: 'Focus your mind to restore mana.',
    emoji: '🔮',
    unlocks: 'action_meditate',
    unlocksDescription: 'Unlocks: meditate() - Restore mana'
  },
  {
    id: 'ring-of-negation',
    name: 'Ring of Negation',
    type: 'accessory',
    rarity: 'rare',
    level: 4,
    stats: { critChance: 0.1 },
    description: 'Flip conditions - true becomes false.',
    emoji: '❌',
    unlocks: 'operator_not',
    unlocksDescription: 'Unlocks: ! - if (!healing) attack()'
  },
  {
    id: 'defensive-ward',
    name: 'Defensive Ward',
    type: 'armor',
    rarity: 'rare',
    level: 4,
    stats: { defense: 12, maxHp: 30 },
    description: 'Teaches the art of blocking.',
    emoji: '🛡️',
    unlocks: 'action_defend',
    unlocksDescription: 'Unlocks: defend() - Block incoming damage'
  },

  // ============================================================
  // TIER 5: VARIABLES (~1200-1800g)
  // Zone 3 - need to track state between actions
  // ============================================================
  {
    id: 'variable-blade',
    name: 'Variable Blade',
    type: 'weapon',
    rarity: 'epic',
    level: 5,
    stats: { attack: 15 },
    description: 'Store values that change.',
    emoji: '🔱',
    unlocks: 'variables_let',
    unlocksDescription: 'Unlocks: let x = value - Track state!'
  },
  {
    id: 'constant-shield',
    name: 'Constant Shield',
    type: 'armor',
    rarity: 'epic',
    level: 5,
    stats: { defense: 18, maxHp: 40 },
    description: 'Define unchanging values.',
    emoji: '🛡️',
    unlocks: 'variables_const',
    unlocksDescription: 'Unlocks: const THRESHOLD = 30'
  },
  {
    id: 'calculator-charm',
    name: 'Calculator Charm',
    type: 'accessory',
    rarity: 'epic',
    level: 5,
    stats: { attack: 8, critDamage: 0.25 },
    description: 'Do math in your scripts.',
    emoji: '🧮',
    unlocks: 'math_operations',
    unlocksDescription: 'Unlocks: +, -, *, / in conditions'
  },

  // ============================================================
  // TIER 6: FOR LOOPS (~2000-3000g)
  // Zone 3 boss / Zone 4 - multi-hit combos, repeated actions
  // ============================================================
  {
    id: 'loop-blade',
    name: 'Loop Blade',
    type: 'weapon',
    rarity: 'epic',
    level: 6,
    stats: { attack: 20, attackSpeed: 0.15 },
    description: 'Strike a precise number of times.',
    emoji: '🔄',
    unlocks: 'loop_for',
    unlocksDescription: 'Unlocks: for (let i=0; i<3; i++) - Combos!'
  },
  {
    id: 'counter-ring',
    name: 'Counter Ring',
    type: 'accessory',
    rarity: 'epic',
    level: 6,
    stats: { attack: 10, critChance: 0.12 },
    description: 'Track your loop iteration.',
    emoji: '🔢',
    unlocks: 'loop_counter',
    unlocksDescription: 'Unlocks: Use i in conditions'
  },
  {
    id: 'escape-dagger',
    name: 'Escape Dagger',
    type: 'weapon',
    rarity: 'epic',
    level: 6,
    stats: { attack: 16, critDamage: 0.3 },
    description: 'Exit loops when needed.',
    emoji: '🗡️',
    unlocks: 'loop_break',
    unlocksDescription: 'Unlocks: break - Exit loop early'
  },

  // ============================================================
  // TIER 7: ARRAYS (~3500-5000g)
  // Zone 4 - multiple enemies, need to manage groups
  // ============================================================
  {
    id: 'foreach-flail',
    name: 'forEach Flail',
    type: 'weapon',
    rarity: 'epic',
    level: 7,
    stats: { attack: 25, attackSpeed: 0.1 },
    description: 'Hit every enemy in sequence.',
    emoji: '🔗',
    unlocks: 'array_foreach',
    unlocksDescription: 'Unlocks: enemies.forEach(e => attack(e))'
  },
  {
    id: 'filter-lens',
    name: 'Filter Lens',
    type: 'accessory',
    rarity: 'epic',
    level: 7,
    stats: { critChance: 0.15, critDamage: 0.35 },
    description: 'Target only what matches.',
    emoji: '🔍',
    unlocks: 'array_filter',
    unlocksDescription: 'Unlocks: .filter(e => e.hp < 50)'
  },
  {
    id: 'map-staff',
    name: 'Map Staff',
    type: 'weapon',
    rarity: 'epic',
    level: 7,
    stats: { attack: 22, maxMana: 40 },
    description: 'Transform every target.',
    emoji: '🗺️',
    unlocks: 'array_map',
    unlocksDescription: 'Unlocks: .map(e => e.hp * 2)'
  },

  // ============================================================
  // TIER 8: FUNCTIONS (~6000-9000g)
  // Zone 4 boss / Zone 5 - complex strategies need organization
  // ============================================================
  {
    id: 'function-grimoire',
    name: 'Function Grimoire',
    type: 'accessory',
    rarity: 'legendary',
    level: 8,
    stats: { maxMana: 60, attack: 18 },
    description: 'Name and reuse your strategies.',
    emoji: '📕',
    unlocks: 'function_define',
    unlocksDescription: 'Unlocks: function heal_combo() { }'
  },
  {
    id: 'parameter-pouch',
    name: 'Parameter Pouch',
    type: 'accessory',
    rarity: 'legendary',
    level: 8,
    stats: { attack: 15, critChance: 0.15 },
    description: 'Pass values to functions.',
    emoji: '👝',
    unlocks: 'function_params',
    unlocksDescription: 'Unlocks: function attack(target) { }'
  },
  {
    id: 'arrow-quiver',
    name: 'Arrow Quiver',
    type: 'accessory',
    rarity: 'legendary',
    level: 8,
    stats: { attackSpeed: 0.3, attack: 12 },
    description: 'Write functions in shorthand.',
    emoji: '🏹',
    unlocks: 'function_arrow',
    unlocksDescription: 'Unlocks: const hit = () => attack()'
  },

  // ============================================================
  // TIER 9: OBJECTS (~10000-15000g)
  // Zone 5 - need structured data for complex decisions
  // ============================================================
  {
    id: 'property-pickaxe',
    name: 'Property Pickaxe',
    type: 'weapon',
    rarity: 'legendary',
    level: 9,
    stats: { attack: 40, critChance: 0.2 },
    description: 'Access any property.',
    emoji: '⛏️',
    unlocks: 'object_access',
    unlocksDescription: 'Unlocks: enemy.hp, player.mana'
  },
  {
    id: 'destructure-gauntlets',
    name: 'Destructure Gauntlets',
    type: 'armor',
    rarity: 'legendary',
    level: 9,
    stats: { defense: 30, attack: 20, maxHp: 100 },
    description: 'Extract multiple values at once.',
    emoji: '🧤',
    unlocks: 'object_destructure',
    unlocksDescription: 'Unlocks: const { hp, mana } = player'
  },

  // ============================================================
  // TIER 10: ASYNC (~18000-25000g)
  // Zone 5 boss - timing-based mechanics
  // ============================================================
  {
    id: 'promise-pendant',
    name: 'Promise Pendant',
    type: 'accessory',
    rarity: 'legendary',
    level: 10,
    stats: { maxMana: 100, attackSpeed: 0.3, critChance: 0.18 },
    description: 'Chain actions over time.',
    emoji: '💫',
    unlocks: 'promise_then',
    unlocksDescription: 'Unlocks: attack().then(() => heal())'
  },
  {
    id: 'await-blade',
    name: 'Blade of Await',
    type: 'weapon',
    rarity: 'legendary',
    level: 10,
    stats: { attack: 60, critChance: 0.25, critDamage: 0.6 },
    description: 'Wait for the perfect moment.',
    emoji: '⚡',
    unlocks: 'async_await',
    unlocksDescription: 'Unlocks: await heal(); attack();'
  },

  // ============================================================
  // TIER 11: REACT (~30000-50000g)
  // Endgame / New Game+ - React concepts as ultimate power
  // ============================================================
  {
    id: 'state-crystal',
    name: 'State Crystal',
    type: 'accessory',
    rarity: 'legendary',
    level: 11,
    stats: { attack: 35, defense: 35, maxHp: 150, maxMana: 120 },
    description: 'Remember values between renders.',
    emoji: '💎',
    unlocks: 'react_useState',
    unlocksDescription: 'Unlocks: const [hp, setHp] = useState(100)'
  },
  {
    id: 'effect-crown',
    name: 'Effect Crown',
    type: 'armor',
    rarity: 'legendary',
    level: 11,
    stats: { defense: 45, critChance: 0.3, lifeSteal: 0.12 },
    description: 'Trigger effects at the right time.',
    emoji: '👑',
    unlocks: 'react_useEffect',
    unlocksDescription: 'Unlocks: useEffect(() => { }, [hp])'
  },
  {
    id: 'prop-blade',
    name: 'Blade of Props',
    type: 'weapon',
    rarity: 'legendary',
    level: 11,
    stats: { attack: 75, critDamage: 0.7, attackSpeed: 0.25 },
    description: 'Pass data to your components.',
    emoji: '⚔️',
    unlocks: 'react_props',
    unlocksDescription: 'Unlocks: <Attack damage={100} />'
  },

  // ============================================================
  // STAT-ONLY ITEMS (no unlocks, just power when you need it)
  // ============================================================
  {
    id: 'iron-sword',
    name: 'Iron Sword',
    type: 'weapon',
    rarity: 'uncommon',
    level: 2,
    stats: { attack: 6 },
    description: 'A sturdy iron blade. Pure damage.',
    emoji: '🗡️'
  },
  {
    id: 'chainmail',
    name: 'Chainmail Armor',
    type: 'armor',
    rarity: 'uncommon',
    level: 2,
    stats: { defense: 6, maxHp: 30 },
    description: 'Solid protection.',
    emoji: '🛡️'
  },
  {
    id: 'steel-blade',
    name: 'Steel Blade',
    type: 'weapon',
    rarity: 'rare',
    level: 3,
    stats: { attack: 12, critDamage: 0.2 },
    description: 'Finely crafted steel.',
    emoji: '⚔️'
  },
  {
    id: 'plate-armor',
    name: 'Plate Armor',
    type: 'armor',
    rarity: 'rare',
    level: 4,
    stats: { defense: 14, maxHp: 50 },
    description: 'Heavy but very protective.',
    emoji: '🛡️'
  },
  {
    id: 'ruby-ring',
    name: 'Ruby Ring',
    type: 'accessory',
    rarity: 'rare',
    level: 4,
    stats: { critChance: 0.1, critDamage: 0.15 },
    description: 'A gem that loves critical hits.',
    emoji: '💍'
  },
  {
    id: 'vampiric-blade',
    name: 'Vampiric Blade',
    type: 'weapon',
    rarity: 'epic',
    level: 6,
    stats: { attack: 16, lifeSteal: 0.08 },
    description: 'Drain life from your enemies.',
    emoji: '🩸'
  },
  {
    id: 'berserker-helm',
    name: 'Berserker Helm',
    type: 'armor',
    rarity: 'epic',
    level: 7,
    stats: { attack: 15, critChance: 0.15, defense: -5 },
    description: 'Power at the cost of defense.',
    emoji: '⛑️'
  },
  {
    id: 'dragon-scale',
    name: 'Dragon Scale Armor',
    type: 'armor',
    rarity: 'legendary',
    level: 9,
    stats: { defense: 30, maxHp: 100, lifeSteal: 0.05 },
    description: 'Forged from ancient dragon scales.',
    emoji: '🐉'
  },
  {
    id: 'infinity-edge',
    name: 'Infinity Edge',
    type: 'weapon',
    rarity: 'legendary',
    level: 10,
    stats: { attack: 50, critChance: 0.25, critDamage: 0.75 },
    description: 'The edge between victory and defeat.',
    emoji: '♾️'
  },
  {
    id: 'developers-hoodie',
    name: "Developer's Hoodie",
    type: 'armor',
    rarity: 'legendary',
    level: 11,
    stats: { defense: 25, maxMana: 100, maxHp: 80, attackSpeed: 0.1 },
    description: 'The armor of choice for coders everywhere.',
    emoji: '🧥'
  }
];

export function getShopItemPrice(item: Equipment): number {
  // Prices scale to match gold income progression:
  // Zone 1 (~10g/kill): Tier 1 items 50-100g → 5-10 kills
  // Zone 3 (~100g/kill): Tier 5-6 items 500-1500g → 5-15 kills
  // Zone 5 (~1000g/kill): Tier 10-12 items 5k-15k → 5-15 kills

  const basePrice = item.unlocks ? 40 : 25;

  // 1.6x per level - matches gold scaling of 1.35^level with some buffer
  const levelMultiplier = Math.pow(1.6, item.level - 1);

  // Rarity adds moderate premium, not exponential
  const rarityMultiplier = {
    common: 1,
    uncommon: 1.5,
    rare: 2.5,
    epic: 4,
    legendary: 6
  };

  return Math.floor(basePrice * levelMultiplier * rarityMultiplier[item.rarity]);
}

// ============ JS CONCEPTS ============

export const JS_CONCEPTS: JsConcept[] = [
  {
    id: 'variables',
    name: 'Variables',
    category: 'variables',
    description: 'Store and name values with let, const, and var.',
    codeExample: `let damage = 10;\nconst MAX_HP = 100;\nlet playerName = "Hero";`,
    unlocksAbilities: ['power-strike', 'defend', 'meditate'],
    unlocksConditions: [],
    statBonus: { attack: 5 },
    learned: false,
    xpToLearn: 100,
    currentXp: 0,
    prerequisites: [],
    learnByDoing: [
      { id: 'kill-10', description: 'Defeat 10 enemies with Attack', type: 'kill_count', target: 10, current: 0, completed: false }
    ]
  },
  {
    id: 'conditionals',
    name: 'Conditionals',
    category: 'conditionals',
    description: 'Make decisions with if, else, and ternary operators.',
    codeExample: `if (player.hp < 50) {\n  heal();\n} else {\n  attack();\n}`,
    unlocksAbilities: ['execute', 'desperate-strike', 'overcharge', 'ternary-strike'],
    unlocksConditions: ['hp_below', 'hp_above', 'enemy_hp_below'],
    statBonus: { critChance: 0.05 },
    learned: false,
    xpToLearn: 150,
    currentXp: 0,
    prerequisites: ['variables'],
    learnByDoing: [
      { id: 'use-heal-5', description: 'Use Heal when HP < 50%', type: 'use_ability', target: 5, current: 0, completed: false }
    ]
  },
  {
    id: 'loops',
    name: 'Loops',
    category: 'loops',
    description: 'Repeat actions with for, while, and do-while loops.',
    codeExample: `for (let i = 0; i < 3; i++) {\n  attack();\n}`,
    unlocksAbilities: ['double-tap', 'triple-strike', 'ramping-fury', 'for-loop'],
    unlocksConditions: ['on_kill', 'on_crit'],
    statBonus: { attackSpeed: 0.1 },
    learned: false,
    xpToLearn: 200,
    currentXp: 0,
    prerequisites: ['conditionals'],
    learnByDoing: [
      { id: 'kill-50', description: 'Defeat 50 enemies total', type: 'kill_count', target: 50, current: 0, completed: false }
    ]
  },
  {
    id: 'functions',
    name: 'Functions',
    category: 'functions',
    description: 'Create reusable blocks of code.',
    codeExample: `function calculateDamage(base, crit) {\n  return crit ? base * 2 : base;\n}`,
    unlocksAbilities: ['percent-slash', 'finishing-blow', 'life-drain', 'console-log'],
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
    unlocksAbilities: ['efficient-strike', 'mana-bomb', 'conservation'],
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
    unlocksAbilities: ['map-attack', 'reduce-attack'],
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
    unlocksAbilities: ['focus', 'berserk', 'calculated-strike'],
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
    unlocksAbilities: ['async-heal', 'promise-chain'],
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
    unlocksAbilities: ['use-effect', 'use-state'],
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
