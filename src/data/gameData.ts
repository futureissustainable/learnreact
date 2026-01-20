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
  // Basic attack - main damage source, no mana cost, short cooldown
  {
    id: 'attack',
    name: 'Attack',
    description: 'Basic attack. Click to deal damage!',
    manaCost: 0,
    cooldown: 1,
    currentCooldown: 0,
    effect: { type: 'damage', value: 0, scaling: 1.0 },
    unlocked: true,
    emoji: '⚔️'
  },
  // Starter abilities
  {
    id: 'power-strike',
    name: 'Power Strike',
    description: 'A powerful attack dealing 150% damage.',
    manaCost: 10,
    cooldown: 4,
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
    cooldown: 10,
    currentCooldown: 0,
    effect: { type: 'heal', value: 0, scaling: 0.3 },
    unlocked: true,
    emoji: '💚'
  },
  {
    id: 'defend',
    name: 'Defend',
    description: 'Block 50% of next incoming attack.',
    manaCost: 5,
    cooldown: 3,
    currentCooldown: 0,
    effect: { type: 'buff', stat: 'defense', value: 50, duration: 3 },
    unlocked: true,
    emoji: '🛡️'
  },
  {
    id: 'meditate',
    name: 'Meditate',
    description: 'Restore 20% of max mana.',
    manaCost: 0,
    cooldown: 8,
    currentCooldown: 0,
    effect: { type: 'buff', stat: 'mana', value: 0, duration: 0 }, // Special handling in store
    unlocked: true,
    emoji: '🧘'
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
// Player starts with NO scripts - they must learn concepts to unlock script conditions/actions
// and then BUILD their own automation. This is the core learning loop!

export const DEFAULT_SCRIPTS: AutoScript[] = [];

// ============ SHOP ITEMS ============
// Items unlock script features! Progression: buy item → learn new coding concept
// This is the core learning loop inspired by "The Farmer Was Replaced"
//
// PROGRESSION DESIGN:
// - Tier 1 (50-100g): Basic if conditions + first actions
// - Tier 2 (100-200g): More conditions + actions
// - Tier 3 (200-400g): Logical operators (&& || !)
// - Tier 4 (400-600g): Comparison operators
// - Tier 5 (600-1000g): Variables & Math
// - Tier 6 (1000-1500g): Loops
// - Tier 7 (1500-2500g): Arrays
// - Tier 8 (2500-4000g): Functions
// - Tier 9 (4000-6000g): Objects
// - Tier 10 (6000-10000g): Advanced syntax
// - Tier 11 (10000-20000g): Async/Promises
// - Tier 12 (20000g+): React concepts

export const SHOP_ITEMS: Equipment[] = [
  // ============================================================
  // TIER 1: BASIC CONDITIONS (50-100 gold) - "Your First if"
  // ============================================================
  {
    id: 'conditional-blade',
    name: 'Conditional Blade',
    type: 'weapon',
    rarity: 'common',
    level: 1,
    stats: { attack: 2 },
    description: 'A blade that teaches you to check conditions.',
    emoji: '🗡️',
    unlocks: 'condition_hp_below',
    unlocksDescription: 'Unlocks: if (hp < X%) - Check when health is low'
  },
  {
    id: 'healing-tome',
    name: 'Healing Tome',
    type: 'accessory',
    rarity: 'common',
    level: 1,
    stats: { maxMana: 10 },
    description: 'Ancient knowledge of restoration.',
    emoji: '📖',
    unlocks: 'action_heal',
    unlocksDescription: 'Unlocks: heal() - Restore HP in scripts'
  },
  {
    id: 'vigilant-pendant',
    name: 'Vigilant Pendant',
    type: 'accessory',
    rarity: 'common',
    level: 1,
    stats: { maxHp: 15 },
    description: 'Heightens awareness when healthy.',
    emoji: '📿',
    unlocks: 'condition_hp_above',
    unlocksDescription: 'Unlocks: if (hp > X%) - Check when health is high'
  },

  // ============================================================
  // TIER 2: MORE CONDITIONS & ACTIONS (100-200 gold)
  // ============================================================
  {
    id: 'power-gauntlets',
    name: 'Power Gauntlets',
    type: 'armor',
    rarity: 'uncommon',
    level: 2,
    stats: { attack: 3, defense: 2 },
    description: 'Empowers your strikes with raw force.',
    emoji: '🧤',
    unlocks: 'action_power_strike',
    unlocksDescription: 'Unlocks: powerStrike() - Strong attack action'
  },
  {
    id: 'mana-crystal',
    name: 'Mana Crystal',
    type: 'accessory',
    rarity: 'uncommon',
    level: 2,
    stats: { maxMana: 20 },
    description: 'Lets you sense your magical reserves.',
    emoji: '💎',
    unlocks: 'condition_mana_above',
    unlocksDescription: 'Unlocks: if (mana > X%) - Check mana levels'
  },
  {
    id: 'executioner-blade',
    name: 'Executioner Blade',
    type: 'weapon',
    rarity: 'uncommon',
    level: 2,
    stats: { attack: 5, critChance: 0.05 },
    description: 'Senses when enemies are weak.',
    emoji: '⚔️',
    unlocks: 'condition_enemy_hp_below',
    unlocksDescription: 'Unlocks: if (enemy.hp < X%) - Execute enemies'
  },
  {
    id: 'shield-of-defense',
    name: 'Shield of Defense',
    type: 'armor',
    rarity: 'uncommon',
    level: 2,
    stats: { defense: 5 },
    description: 'Teaches the art of blocking.',
    emoji: '🛡️',
    unlocks: 'action_defend',
    unlocksDescription: 'Unlocks: defend() - Reduce incoming damage'
  },
  {
    id: 'meditation-orb',
    name: 'Meditation Orb',
    type: 'accessory',
    rarity: 'uncommon',
    level: 2,
    stats: { maxMana: 15 },
    description: 'Focus your mind to restore mana.',
    emoji: '🔮',
    unlocks: 'action_mana_regen',
    unlocksDescription: 'Unlocks: meditate() - Restore mana action'
  },
  {
    id: 'cooldown-ring',
    name: 'Cooldown Ring',
    type: 'accessory',
    rarity: 'uncommon',
    level: 2,
    stats: { attackSpeed: 0.05 },
    description: 'Know when your abilities are ready.',
    emoji: '💍',
    unlocks: 'condition_ability_ready',
    unlocksDescription: 'Unlocks: if (ability.ready) - Check cooldowns'
  },

  // ============================================================
  // TIER 3: LOGICAL OPERATORS (200-400 gold) - "Combine Conditions!"
  // ============================================================
  {
    id: 'amulet-of-and',
    name: 'Amulet of AND',
    type: 'accessory',
    rarity: 'rare',
    level: 3,
    stats: { attack: 3, defense: 3 },
    description: 'Combine two truths into one. Both must be true.',
    emoji: '🔗',
    unlocks: 'operator_and',
    unlocksDescription: 'Unlocks: && operator - if (a && b) both must be true'
  },
  {
    id: 'amulet-of-or',
    name: 'Amulet of OR',
    type: 'accessory',
    rarity: 'rare',
    level: 3,
    stats: { attack: 4, defense: 2 },
    description: 'Choose between paths. Either can be true.',
    emoji: '🔀',
    unlocks: 'operator_or',
    unlocksDescription: 'Unlocks: || operator - if (a || b) either can be true'
  },
  {
    id: 'ring-of-negation',
    name: 'Ring of Negation',
    type: 'accessory',
    rarity: 'rare',
    level: 3,
    stats: { critChance: 0.08 },
    description: 'Flip truth to false, false to truth.',
    emoji: '❌',
    unlocks: 'operator_not',
    unlocksDescription: 'Unlocks: ! operator - if (!condition) negate'
  },

  // ============================================================
  // TIER 4: COMPARISON OPERATORS (400-600 gold) - "Precise Checks"
  // ============================================================
  {
    id: 'scales-of-equality',
    name: 'Scales of Equality',
    type: 'accessory',
    rarity: 'rare',
    level: 4,
    stats: { critDamage: 0.15 },
    description: 'Know when things are truly equal.',
    emoji: '⚖️',
    unlocks: 'comparison_equals',
    unlocksDescription: 'Unlocks: === operator - Exact equality check'
  },
  {
    id: 'mask-of-difference',
    name: 'Mask of Difference',
    type: 'armor',
    rarity: 'rare',
    level: 4,
    stats: { defense: 8 },
    description: 'Detect when things are not the same.',
    emoji: '🎭',
    unlocks: 'comparison_not_equals',
    unlocksDescription: 'Unlocks: !== operator - Inequality check'
  },
  {
    id: 'boots-of-at-least',
    name: 'Boots of At-Least',
    type: 'armor',
    rarity: 'rare',
    level: 4,
    stats: { attackSpeed: 0.1 },
    description: 'Check if values meet the threshold.',
    emoji: '👢',
    unlocks: 'comparison_greater_equal',
    unlocksDescription: 'Unlocks: >= operator - Greater than or equal'
  },
  {
    id: 'boots-of-at-most',
    name: 'Boots of At-Most',
    type: 'armor',
    rarity: 'rare',
    level: 4,
    stats: { defense: 6, maxHp: 20 },
    description: 'Check if values stay below limits.',
    emoji: '🥾',
    unlocks: 'comparison_less_equal',
    unlocksDescription: 'Unlocks: <= operator - Less than or equal'
  },

  // ============================================================
  // TIER 5: VARIABLES & MATH (600-1000 gold) - "Store Values!"
  // ============================================================
  {
    id: 'variable-blade',
    name: 'Variable Blade',
    type: 'weapon',
    rarity: 'rare',
    level: 5,
    stats: { attack: 12 },
    description: 'A blade that changes with your needs.',
    emoji: '🔱',
    unlocks: 'variables_let',
    unlocksDescription: 'Unlocks: let x = value - Mutable variables'
  },
  {
    id: 'constant-shield',
    name: 'Constant Shield',
    type: 'armor',
    rarity: 'rare',
    level: 5,
    stats: { defense: 15, maxHp: 30 },
    description: 'An unchanging bastion of protection.',
    emoji: '🛡️',
    unlocks: 'variables_const',
    unlocksDescription: 'Unlocks: const X = value - Immutable constants'
  },
  {
    id: 'calculator-charm',
    name: 'Calculator Charm',
    type: 'accessory',
    rarity: 'rare',
    level: 5,
    stats: { attack: 5, critDamage: 0.2 },
    description: 'Perform calculations in your conditions.',
    emoji: '🧮',
    unlocks: 'math_operations',
    unlocksDescription: 'Unlocks: +, -, *, /, % operators in conditions'
  },
  {
    id: 'dice-of-chance',
    name: 'Dice of Chance',
    type: 'accessory',
    rarity: 'rare',
    level: 5,
    stats: { critChance: 0.12 },
    description: 'Harness the power of randomness.',
    emoji: '🎲',
    unlocks: 'math_random',
    unlocksDescription: 'Unlocks: Math.random() - Chance-based conditions'
  },

  // ============================================================
  // TIER 6: LOOPS (1000-1500 gold) - "Repeat Actions!"
  // ============================================================
  {
    id: 'loop-blade',
    name: 'Loop Blade',
    type: 'weapon',
    rarity: 'epic',
    level: 6,
    stats: { attack: 18, attackSpeed: 0.15 },
    description: 'Strike repeatedly with precise control.',
    emoji: '🔄',
    unlocks: 'loop_for',
    unlocksDescription: 'Unlocks: for (let i = 0; i < n; i++) loops'
  },
  {
    id: 'counter-ring',
    name: 'Counter Ring',
    type: 'accessory',
    rarity: 'epic',
    level: 6,
    stats: { attack: 8, critChance: 0.1 },
    description: 'Track each iteration precisely.',
    emoji: '🔢',
    unlocks: 'loop_counter',
    unlocksDescription: 'Unlocks: Access loop counter (i) in conditions'
  },
  {
    id: 'escape-dagger',
    name: 'Escape Dagger',
    type: 'weapon',
    rarity: 'epic',
    level: 6,
    stats: { attack: 14, critDamage: 0.25 },
    description: 'Break free when needed.',
    emoji: '🗡️',
    unlocks: 'loop_break',
    unlocksDescription: 'Unlocks: break - Exit loops early'
  },
  {
    id: 'skip-stone',
    name: 'Skip Stone',
    type: 'accessory',
    rarity: 'epic',
    level: 6,
    stats: { attackSpeed: 0.2 },
    description: 'Skip iterations that don\'t matter.',
    emoji: '⏭️',
    unlocks: 'loop_continue',
    unlocksDescription: 'Unlocks: continue - Skip to next iteration'
  },

  // ============================================================
  // TIER 7: ARRAYS (1500-2500 gold) - "Collections of Data!"
  // ============================================================
  {
    id: 'counting-cloak',
    name: 'Counting Cloak',
    type: 'armor',
    rarity: 'epic',
    level: 7,
    stats: { defense: 18, maxHp: 60 },
    description: 'Know the size of any collection.',
    emoji: '🧥',
    unlocks: 'array_length',
    unlocksDescription: 'Unlocks: array.length - Get collection size'
  },
  {
    id: 'foreach-flail',
    name: 'forEach Flail',
    type: 'weapon',
    rarity: 'epic',
    level: 7,
    stats: { attack: 22, attackSpeed: 0.1 },
    description: 'Strike every enemy in sequence.',
    emoji: '🔗',
    unlocks: 'array_foreach',
    unlocksDescription: 'Unlocks: .forEach() - Iterate over each item'
  },
  {
    id: 'map-staff',
    name: 'Map Staff',
    type: 'weapon',
    rarity: 'epic',
    level: 7,
    stats: { attack: 20, maxMana: 30 },
    description: 'Transform every element you touch.',
    emoji: '🗺️',
    unlocks: 'array_map',
    unlocksDescription: 'Unlocks: .map() - Transform each item'
  },
  {
    id: 'filter-lens',
    name: 'Filter Lens',
    type: 'accessory',
    rarity: 'epic',
    level: 7,
    stats: { critChance: 0.15, critDamage: 0.3 },
    description: 'See only what matches your criteria.',
    emoji: '🔍',
    unlocks: 'array_filter',
    unlocksDescription: 'Unlocks: .filter() - Keep matching items'
  },
  {
    id: 'seeker-compass',
    name: 'Seeker Compass',
    type: 'accessory',
    rarity: 'epic',
    level: 7,
    stats: { attack: 10, attackSpeed: 0.15 },
    description: 'Find the first match instantly.',
    emoji: '🧭',
    unlocks: 'array_find',
    unlocksDescription: 'Unlocks: .find() - Get first matching item'
  },
  {
    id: 'detector-gem',
    name: 'Detector Gem',
    type: 'accessory',
    rarity: 'epic',
    level: 7,
    stats: { defense: 10, maxHp: 40 },
    description: 'Know if something exists in a collection.',
    emoji: '💠',
    unlocks: 'array_includes',
    unlocksDescription: 'Unlocks: .includes() - Check if item exists'
  },

  // ============================================================
  // TIER 8: FUNCTIONS (2500-4000 gold) - "Reusable Code!"
  // ============================================================
  {
    id: 'function-grimoire',
    name: 'Function Grimoire',
    type: 'accessory',
    rarity: 'epic',
    level: 8,
    stats: { maxMana: 50, attack: 15 },
    description: 'Create your own spells and name them.',
    emoji: '📕',
    unlocks: 'function_define',
    unlocksDescription: 'Unlocks: function name() {} - Define functions'
  },
  {
    id: 'parameter-pouch',
    name: 'Parameter Pouch',
    type: 'accessory',
    rarity: 'epic',
    level: 8,
    stats: { attack: 12, critChance: 0.12 },
    description: 'Pass information into your functions.',
    emoji: '👝',
    unlocks: 'function_params',
    unlocksDescription: 'Unlocks: function(a, b) - Function parameters'
  },
  {
    id: 'return-scepter',
    name: 'Return Scepter',
    type: 'weapon',
    rarity: 'epic',
    level: 8,
    stats: { attack: 28, critDamage: 0.35 },
    description: 'Get results back from your functions.',
    emoji: '👑',
    unlocks: 'function_return',
    unlocksDescription: 'Unlocks: return value - Return from functions'
  },
  {
    id: 'arrow-quiver',
    name: 'Arrow Quiver',
    type: 'accessory',
    rarity: 'epic',
    level: 8,
    stats: { attackSpeed: 0.25, attack: 8 },
    description: 'Write functions in shorthand.',
    emoji: '🏹',
    unlocks: 'function_arrow',
    unlocksDescription: 'Unlocks: () => {} - Arrow function syntax'
  },

  // ============================================================
  // TIER 9: OBJECTS (4000-6000 gold) - "Structured Data!"
  // ============================================================
  {
    id: 'property-pickaxe',
    name: 'Property Pickaxe',
    type: 'weapon',
    rarity: 'legendary',
    level: 9,
    stats: { attack: 35, critChance: 0.18 },
    description: 'Access any property on any object.',
    emoji: '⛏️',
    unlocks: 'object_access',
    unlocksDescription: 'Unlocks: obj.prop or obj["key"] access'
  },
  {
    id: 'destructure-gauntlets',
    name: 'Destructure Gauntlets',
    type: 'armor',
    rarity: 'legendary',
    level: 9,
    stats: { defense: 25, attack: 15, maxHp: 80 },
    description: 'Extract multiple values at once.',
    emoji: '🧤',
    unlocks: 'object_destructure',
    unlocksDescription: 'Unlocks: const { a, b } = obj - Destructuring'
  },
  {
    id: 'spread-wings',
    name: 'Spread Wings',
    type: 'armor',
    rarity: 'legendary',
    level: 9,
    stats: { attackSpeed: 0.3, defense: 20 },
    description: 'Expand objects and arrays effortlessly.',
    emoji: '🦅',
    unlocks: 'object_spread',
    unlocksDescription: 'Unlocks: ...spread - Spread operator'
  },

  // ============================================================
  // TIER 10: ADVANCED SYNTAX (6000-10000 gold) - "Pro Techniques!"
  // ============================================================
  {
    id: 'ternary-talisman',
    name: 'Ternary Talisman',
    type: 'accessory',
    rarity: 'legendary',
    level: 10,
    stats: { critChance: 0.2, critDamage: 0.4 },
    description: 'Choose between two values instantly.',
    emoji: '🔮',
    unlocks: 'ternary_operator',
    unlocksDescription: 'Unlocks: a ? b : c - Inline conditionals'
  },
  {
    id: 'switch-crossbow',
    name: 'Switch Crossbow',
    type: 'weapon',
    rarity: 'legendary',
    level: 10,
    stats: { attack: 42, attackSpeed: 0.2 },
    description: 'Handle many cases with precision.',
    emoji: '🏹',
    unlocks: 'switch_statement',
    unlocksDescription: 'Unlocks: switch/case - Multi-branch logic'
  },
  {
    id: 'safety-net-armor',
    name: 'Safety Net Armor',
    type: 'armor',
    rarity: 'legendary',
    level: 10,
    stats: { defense: 35, maxHp: 100, lifeSteal: 0.05 },
    description: 'Catch errors before they hurt you.',
    emoji: '🕸️',
    unlocks: 'try_catch',
    unlocksDescription: 'Unlocks: try/catch - Error handling'
  },
  {
    id: 'template-tome',
    name: 'Template Tome',
    type: 'accessory',
    rarity: 'legendary',
    level: 10,
    stats: { maxMana: 60, attack: 20 },
    description: 'Embed expressions in strings.',
    emoji: '📜',
    unlocks: 'template_literals',
    unlocksDescription: 'Unlocks: `Hello ${name}` - Template literals'
  },

  // ============================================================
  // TIER 11: ASYNC/PROMISES (10000-20000 gold) - "Handle Time!"
  // ============================================================
  {
    id: 'promise-pendant',
    name: 'Promise Pendant',
    type: 'accessory',
    rarity: 'legendary',
    level: 11,
    stats: { maxMana: 80, attackSpeed: 0.25, critChance: 0.15 },
    description: 'Chain actions that happen later.',
    emoji: '💫',
    unlocks: 'promise_then',
    unlocksDescription: 'Unlocks: .then() - Promise chaining'
  },
  {
    id: 'await-blade',
    name: 'Blade of Await',
    type: 'weapon',
    rarity: 'legendary',
    level: 11,
    stats: { attack: 55, critChance: 0.22, critDamage: 0.5 },
    description: 'Wait for the perfect moment.',
    emoji: '⚡',
    unlocks: 'async_await',
    unlocksDescription: 'Unlocks: async/await - Clean async code'
  },
  {
    id: 'hourglass-of-timing',
    name: 'Hourglass of Timing',
    type: 'accessory',
    rarity: 'legendary',
    level: 11,
    stats: { attackSpeed: 0.35, defense: 15 },
    description: 'Control time with precision.',
    emoji: '⏳',
    unlocks: 'setTimeout_setInterval',
    unlocksDescription: 'Unlocks: setTimeout/setInterval - Timers'
  },

  // ============================================================
  // TIER 12: REACT CONCEPTS (20000+ gold) - "The Final Boss!"
  // ============================================================
  {
    id: 'state-crystal',
    name: 'State Crystal',
    type: 'accessory',
    rarity: 'legendary',
    level: 12,
    stats: { attack: 30, defense: 30, maxHp: 120, maxMana: 100 },
    description: 'Remember and change values across renders.',
    emoji: '💎',
    unlocks: 'react_useState',
    unlocksDescription: 'Unlocks: useState() - React state management'
  },
  {
    id: 'effect-crown',
    name: 'Effect Crown',
    type: 'armor',
    rarity: 'legendary',
    level: 12,
    stats: { defense: 40, critChance: 0.25, lifeSteal: 0.1 },
    description: 'Trigger side effects at the right time.',
    emoji: '👑',
    unlocks: 'react_useEffect',
    unlocksDescription: 'Unlocks: useEffect() - React side effects'
  },
  {
    id: 'prop-blade',
    name: 'Blade of Props',
    type: 'weapon',
    rarity: 'legendary',
    level: 12,
    stats: { attack: 65, critDamage: 0.6, attackSpeed: 0.2 },
    description: 'Pass data between components.',
    emoji: '⚔️',
    unlocks: 'react_props',
    unlocksDescription: 'Unlocks: Props - Component data passing'
  },
  {
    id: 'event-gauntlets',
    name: 'Event Gauntlets',
    type: 'armor',
    rarity: 'legendary',
    level: 12,
    stats: { attack: 25, defense: 35, attackSpeed: 0.3 },
    description: 'Respond to user interactions.',
    emoji: '🧤',
    unlocks: 'react_events',
    unlocksDescription: 'Unlocks: onClick, onChange - Event handlers'
  },

  // ============================================================
  // STAT-ONLY ITEMS (no unlocks, just power boosts)
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
