// ============================================================
// CodeQuest: Automation RPG - Type Definitions
// ============================================================

export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

// ============ COMBAT STATS ============

export interface CombatStats {
  hp: number;
  maxHp: number;
  mana: number;
  maxMana: number;
  attack: number;
  defense: number;
  critChance: number;      // 0-1
  critDamage: number;      // multiplier, e.g., 1.5
  attackSpeed: number;     // attacks per second
  lifeSteal: number;       // 0-1
}

// ============ HERO ============

export interface Hero {
  name: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  gold: number;

  // Combat stats
  stats: CombatStats;
  baseStats: CombatStats;  // Before equipment

  // Equipment slots
  equipment: {
    weapon: Equipment | null;
    armor: Equipment | null;
    accessory: Equipment | null;
  };

  // Unlocked abilities
  abilities: Ability[];

  // Active automation scripts
  scripts: AutoScript[];

  // Buffs
  activeBuffs: ActiveBuff[];
}

export interface ActiveBuff {
  id: string;
  stat: keyof CombatStats;
  value: number;
  remainingDuration: number;
  maxDuration: number;
}

// ============ MOBS ============

export interface Mob {
  id: string;
  instanceId: string;      // Unique per spawn
  name: string;
  level: number;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  attackSpeed: number;

  // Rewards
  xpReward: number;
  goldReward: number;
  lootTable: LootDrop[];

  // Visual
  emoji: string;
  color: string;
  isBoss?: boolean;

  // Combat state
  attackCooldown: number;
}

export interface LootDrop {
  itemId: string;
  chance: number;
}

// ============ EQUIPMENT ============

export type ScriptFeature =
  | 'condition_hp_below'
  | 'condition_hp_above'
  | 'condition_enemy_hp_below'
  | 'condition_mana_above'
  | 'condition_ability_ready'
  | 'action_power_strike'
  | 'action_heal'
  | 'loop_counter'
  | 'variables';

export interface Equipment {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'accessory';
  rarity: Rarity;
  level: number;
  stats: Partial<CombatStats>;
  description: string;
  emoji: string;
  // What script features this item unlocks
  unlocks?: ScriptFeature;
  unlocksDescription?: string;
}

// ============ ABILITIES ============

export interface Ability {
  id: string;
  name: string;
  description: string;
  manaCost: number;
  cooldown: number;
  currentCooldown: number;
  effect: AbilityEffect;
  unlocked: boolean;
  requiredConcept?: string;
  emoji: string;
}

export type AbilityEffect =
  | { type: 'damage'; value: number; scaling: number }
  | { type: 'heal'; value: number; scaling: number }
  | { type: 'buff'; stat: keyof CombatStats; value: number; duration: number }
  | { type: 'dot'; damage: number; ticks: number; interval: number }
  | { type: 'aoe'; damage: number; hitAll: boolean }
  | { type: 'execute'; threshold: number; bonusDamage: number }
  | { type: 'lifesteal_burst'; damage: number; healPercent: number };

// ============ AUTOMATION SCRIPTS ============

export interface AutoScript {
  id: string;
  name: string;
  code: string;            // Display code
  enabled: boolean;
  priority: number;
  condition: ScriptCondition;
  action: ScriptAction;
  cooldown: number;
  lastTriggered: number;
  triggerCount: number;

  // What concepts this teaches/requires
  conceptsUsed: string[];
}

export type ScriptCondition =
  | { type: 'hp_below'; percent: number }
  | { type: 'hp_above'; percent: number }
  | { type: 'mana_above'; percent: number }
  | { type: 'mana_below'; percent: number }
  | { type: 'enemy_hp_below'; percent: number }
  | { type: 'enemy_hp_above'; percent: number }
  | { type: 'ability_ready'; abilityId: string }
  | { type: 'on_kill' }
  | { type: 'on_crit' }
  | { type: 'on_hit' }
  | { type: 'always' }
  | { type: 'never' };

export type ScriptAction =
  | { type: 'use_ability'; abilityId: string }
  | { type: 'change_zone'; zoneId: string }
  | { type: 'toggle_auto_battle'; enable: boolean };

// ============ ZONES ============

export interface Zone {
  id: string;
  name: string;
  description: string;
  level: number;
  mobPool: MobTemplate[];
  bossId?: string;
  unlocked: boolean;
  background: string;
  emoji: string;

  // Unlock requirements
  requiredLevel?: number;
  requiredConcepts?: string[];
  requiredBossKill?: string;
}

export interface MobTemplate {
  id: string;
  name: string;
  emoji: string;
  color: string;
  baseHp: number;
  baseAttack: number;
  baseDefense: number;
  attackSpeed: number;
  xpMultiplier: number;
  goldMultiplier: number;
  lootTable: LootDrop[];
  spawnWeight: number;
  isBoss?: boolean;
}

// ============ JS CONCEPTS ============

export interface JsConcept {
  id: string;
  name: string;
  category: 'variables' | 'conditionals' | 'functions' | 'loops' | 'arrays' | 'objects' | 'async' | 'react';
  description: string;
  codeExample: string;

  // What it unlocks
  unlocksAbilities: string[];
  unlocksConditions: ScriptCondition['type'][];
  statBonus: Partial<CombatStats>;

  // Progression
  learned: boolean;
  xpToLearn: number;
  currentXp: number;
  prerequisites: string[];

  // Learning through gameplay
  learnByDoing: LearnTask[];
}

export interface LearnTask {
  id: string;
  description: string;
  type: 'kill_count' | 'use_ability' | 'trigger_script' | 'reach_zone' | 'defeat_boss';
  target: number;
  current: number;
  completed: boolean;
}

// ============ COMBAT LOG ============

export interface CombatLogEntry {
  id: string;
  timestamp: number;
  type: 'player_attack' | 'player_crit' | 'enemy_attack' | 'ability' | 'heal' |
        'loot' | 'gold' | 'xp' | 'level_up' | 'script' | 'death' | 'buff' | 'zone';
  message: string;
  value?: number;
  color?: string;
}

// ============ GAME STATE ============

export interface GameState {
  // Core
  hero: Hero;
  initialized: boolean;

  // Combat
  currentZone: Zone | null;
  currentMobs: Mob[];
  combatLog: CombatLogEntry[];
  isAutoBattling: boolean;
  isPaused: boolean;

  // Stats
  killCount: number;
  sessionKills: number;
  totalDamageDealt: number;
  highestHit: number;
  totalGoldEarned: number;
  totalXpEarned: number;
  bossesDefeated: string[];

  // Progression
  zones: Zone[];
  concepts: JsConcept[];

  // Inventory
  inventory: Equipment[];
  maxInventorySize: number;

  // Settings
  combatSpeed: number;
  autoLoot: boolean;
  showDamageNumbers: boolean;

  // Time tracking
  lastTick: number;
  totalPlayTime: number;
}

// ============ HELPER FUNCTIONS ============

export function calculateDPS(stats: CombatStats): number {
  const baseDamage = stats.attack;
  const critBonus = stats.critChance * (stats.critDamage - 1);
  const effectiveDamage = baseDamage * (1 + critBonus);
  return effectiveDamage * stats.attackSpeed;
}

export function calculateXpForLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}

export function calculateMobStats(template: MobTemplate, zoneLevel: number): Omit<Mob, 'instanceId' | 'attackCooldown'> {
  const levelMod = Math.pow(1.12, zoneLevel - 1);
  return {
    id: template.id,
    name: template.name,
    emoji: template.emoji,
    color: template.color,
    level: zoneLevel,
    hp: Math.floor(template.baseHp * levelMod),
    maxHp: Math.floor(template.baseHp * levelMod),
    attack: Math.floor(template.baseAttack * levelMod),
    defense: Math.floor(template.baseDefense * levelMod),
    attackSpeed: template.attackSpeed,
    xpReward: Math.floor(10 * zoneLevel * template.xpMultiplier),
    goldReward: Math.floor(5 * zoneLevel * template.goldMultiplier),
    lootTable: template.lootTable,
    isBoss: template.isBoss
  };
}

export function calculateDamage(
  attackerAttack: number,
  defenderDefense: number,
  critChance: number,
  critDamage: number
): { damage: number; isCrit: boolean } {
  const isCrit = Math.random() < critChance;
  const reduction = defenderDefense / (defenderDefense + 50);
  const baseDamage = Math.max(1, attackerAttack * (1 - reduction));
  const damage = isCrit ? baseDamage * critDamage : baseDamage;

  // Add some variance
  const variance = 0.9 + Math.random() * 0.2;
  return {
    damage: Math.floor(damage * variance),
    isCrit
  };
}

export function generateInstanceId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export const RARITY_COLORS: Record<Rarity, string> = {
  common: '#9CA3AF',
  uncommon: '#22C55E',
  rare: '#3B82F6',
  epic: '#A855F7',
  legendary: '#F97316'
};

export const RARITY_DROP_CHANCES: Record<Rarity, number> = {
  common: 0.50,
  uncommon: 0.25,
  rare: 0.15,
  epic: 0.08,
  legendary: 0.02
};
