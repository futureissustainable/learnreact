// ============================================================
// CodeQuest: Automation RPG - Type Definitions
// ============================================================

export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

// ============ COMBAT CONSTANTS ============

export const TICKS_PER_SECOND = 20;

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
  attackSpeed: number;     // attacks per second (converted to ticks internally)
  lifeSteal: number;       // 0-1
}

// ============ NEXT ATTACK MODIFIERS (for ability synergies) ============

export interface NextAttackModifier {
  id: string;
  source: string;          // Ability that created this modifier
  damageMultiplier?: number;   // Multiply next attack damage
  flatDamage?: number;         // Add flat damage
  guaranteedCrit?: boolean;    // Force crit
  lifestealBonus?: number;     // Extra lifesteal for this attack
  manaRefund?: number;         // Refund mana after attack
  consumeAllMana?: boolean;    // Use all mana for damage
  manaMultiplier?: number;     // Multiply mana damage (for mana bomb combo)
  expireAfterTicks?: number;   // Expire if not used
  ticksRemaining?: number;     // Countdown
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

  // Next attack modifiers (for ability synergies)
  nextAttackModifiers: NextAttackModifier[];
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
  attackSpeedTicks: number;  // Ticks between attacks (lower = faster)

  // Rewards
  xpReward: number;
  goldReward: number;
  lootTable: LootDrop[];

  // Visual
  emoji: string;
  color: string;
  isBoss?: boolean;

  // Combat state
  attackCooldownTicks: number;  // Current ticks until next attack

  // Debuffs
  debuffs?: MobDebuff[];
}

export interface MobDebuff {
  id: string;
  type: 'armor_shred' | 'slow' | 'dot' | 'marked';
  value: number;
  remainingTicks: number;
}

export interface LootDrop {
  itemId: string;
  chance: number;
}

// ============ EQUIPMENT ============

export type ScriptFeature =
  // === TIER 0: THE FIRST UNLOCK - Automation Itself! ===
  | 'loop_while_true'           // while(true) { } + attack() - First automation!

  // === TIER 1: Basic Conditions (if statements) ===
  | 'condition_hp_below'        // if (hp < X%)
  | 'condition_hp_above'        // if (hp > X%)
  | 'condition_enemy_hp_below'  // if (enemy.hp < X%)
  | 'condition_mana_above'      // if (mana > X%)
  | 'condition_ability_ready'   // if (ability.ready)

  // === TIER 2: Actions (function calls) ===
  | 'action_heal'               // heal()
  | 'action_power_strike'       // powerStrike()
  | 'action_defend'             // defend() - reduce damage taken
  | 'action_meditate'           // meditate() - restore mana

  // === TIER 3: Logical Operators ===
  | 'operator_and'              // && - combine conditions
  | 'operator_or'               // || - alternative conditions
  | 'operator_not'              // ! - negate conditions

  // === TIER 4: Comparison Operators ===
  | 'comparison_equals'         // === strict equality
  | 'comparison_not_equals'     // !== strict inequality
  | 'comparison_greater_equal'  // >= greater or equal
  | 'comparison_less_equal'     // <= less or equal

  // === TIER 5: Variables & Math ===
  | 'variables_let'             // let - mutable variables
  | 'variables_const'           // const - immutable variables
  | 'math_operations'           // +, -, *, /, % in conditions
  | 'math_random'               // Math.random() for chance-based

  // === TIER 6: Loops ===
  | 'loop_for'                  // for (let i = 0; i < n; i++)
  | 'loop_counter'              // Access to loop counter variable
  | 'loop_break'                // break - exit loop early
  | 'loop_continue'             // continue - skip iteration

  // === TIER 7: Arrays ===
  | 'array_length'              // .length property
  | 'array_foreach'             // .forEach() method
  | 'array_map'                 // .map() method
  | 'array_filter'              // .filter() method
  | 'array_find'                // .find() method
  | 'array_includes'            // .includes() method

  // === TIER 8: Functions ===
  | 'function_define'           // Define custom functions
  | 'function_params'           // Function parameters
  | 'function_return'           // Return values
  | 'function_arrow'            // Arrow function syntax () => {}

  // === TIER 9: Objects ===
  | 'object_access'             // object.property or object['key']
  | 'object_destructure'        // const { hp, mana } = player
  | 'object_spread'             // ...spread operator

  // === TIER 10: Advanced ===
  | 'ternary_operator'          // condition ? a : b
  | 'switch_statement'          // switch/case
  | 'try_catch'                 // try/catch error handling
  | 'template_literals'         // `Hello ${name}`

  // === TIER 11: Async (Endgame) ===
  | 'promise_then'              // .then() chaining
  | 'async_await'               // async/await syntax
  | 'setTimeout_setInterval'    // Timers

  // === TIER 12: React (Final) ===
  | 'react_useState'            // useState hook
  | 'react_useEffect'           // useEffect hook
  | 'react_props'               // Component props
  | 'react_events';             // Event handlers onClick, etc.

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
  cooldownTicks: number;       // Cooldown in ticks (20 ticks = 1 second)
  currentCooldownTicks: number; // Current cooldown remaining in ticks
  effect: AbilityEffect;
  unlocked: boolean;
  requiredConcept?: string;
  emoji: string;
  tier?: number;               // For power scaling
}

export type AbilityEffect =
  // Basic effects
  | { type: 'damage'; value: number; scaling: number }
  | { type: 'heal'; value: number; scaling: number }
  | { type: 'buff'; stat: keyof CombatStats; value: number; duration: number }
  | { type: 'dot'; damage: number; ticks: number; interval: number }
  | { type: 'aoe'; damage: number; scaling: number; hitAll: boolean }

  // Conditional damage (coding concepts!)
  | { type: 'execute'; threshold: number; bonusDamage: number }           // if (enemy.hp < threshold)
  | { type: 'desperation'; baseScaling: number }                           // damage scales with YOUR missing HP
  | { type: 'conditional_damage'; condition: 'mana_above' | 'hp_above'; threshold: number; lowScaling: number; highScaling: number }

  // Percent-based damage (math concepts!)
  | { type: 'percent_max_hp'; percent: number }                            // % of enemy MAX HP
  | { type: 'percent_missing_hp'; percent: number }                        // % of enemy MISSING HP

  // Lifesteal variants
  | { type: 'lifesteal_burst'; scaling: number; healPercent: number }

  // Multi-hit (loops!)
  | { type: 'multi_hit'; hits: number; scaling: number }                   // for (let i = 0; i < hits; i++)

  // Ramping damage (teaches state/accumulation)
  | { type: 'ramping'; baseScaling: number; rampPerUse: number }           // Each use adds damage

  // Conditional cost (optimization)
  | { type: 'conditional_cost'; scaling: number; condition: 'hp_above'; threshold: number; discount: number }

  // Mana manipulation
  | { type: 'mana_consume'; damagePerMana: number }                        // Consume ALL mana, damage = mana * X

  // Stat reflection
  | { type: 'reflect_stat'; stat: 'attack'; multiplier: number }           // damage = enemy.attack * X

  // Crit manipulation
  | { type: 'guaranteed_crit'; scaling: number }                           // Always crits

  // Ternary operator!
  | { type: 'ternary'; condition: 'hp_above'; threshold: number; trueScaling: number; falseScaling: number }

  // Boolean operators (AND, OR, NOT)
  | { type: 'boolean_or'; condition1: string; condition2: string; threshold: number; bonusScaling: number; normalScaling: number }
  | { type: 'boolean_and'; condition1: string; threshold1: number; condition2: string; threshold2: number; bonusScaling: number; healPercent?: number }
  | { type: 'boolean_not'; condition: string; bonusPerMissingPercent: number }

  // Heal over time
  | { type: 'hot'; healPercent: number; ticks: number; interval: number }  // HoT (heal over time)

  // Resource management
  | { type: 'refund_on_kill'; scaling: number; refundPercent: number }     // if (kills) refund mana

  // Berserk (buff + debuff)
  | { type: 'berserk'; attackSpeedBonus: number; defenseReduction: number; duration: number }

  // Advanced array methods
  | { type: 'reduce_damage'; multiplier: number }                          // damage = sum of all damage this fight * X

  // Async concepts
  | { type: 'promise_chain'; actions: string[] }                           // Sequential actions

  // React concepts
  | { type: 'stored_damage'; baseDamage: number; canStack: boolean }      // useState pattern

  // ============ SYNERGY / SETUP ABILITIES ============
  // These modify the NEXT attack for powerful combos

  // Seppuku: Hurt yourself, empower next attack
  | { type: 'self_damage_empower'; selfDamagePercent: number; nextAttackBonus: number }

  // Mana Overload: Double mana for next attack only
  | { type: 'mana_overload'; manaMultiplier: number; expireTicks: number }

  // Focus: Next attack guaranteed crit + bonus damage
  | { type: 'focus_strike'; critBonus: number; damageBonus: number; expireTicks: number }

  // Charge: Build up damage over ticks, release on next attack
  | { type: 'charge_attack'; damagePerTick: number; maxTicks: number }

  // Weaken: Reduce enemy defense, next attack does more
  | { type: 'armor_shred'; defenseReduction: number; durationTicks: number }

  // Blood Pact: Sacrifice HP for massive next attack
  | { type: 'blood_pact'; hpCostPercent: number; damageMultiplier: number; expireTicks: number }

  // Combo Finisher: Deals more damage based on abilities used this combat
  | { type: 'combo_finisher'; baseDamage: number; bonusPerAbility: number }

  // Chain Lightning: Damage + bonus if enemy was hit recently
  | { type: 'chain_damage'; baseDamage: number; chainBonus: number; chainWindowTicks: number }

  // Vampiric Setup: Next attack heals for % of damage
  | { type: 'vampiric_touch'; lifestealBonus: number; expireTicks: number }

  // Execute Setup: Lower enemy HP below threshold, then execute
  | { type: 'crippling_blow'; damagePercent: number; applyDebuff: string }

  // ============ NEW CONCEPT-BASED ABILITIES ============

  // Conditional Cube: Precision damage (500% if HP=50% AND mana=100%)
  | { type: 'conditional_cube'; hpTarget: number; manaTarget: number; bonusScaling: number; tolerance: number }

  // Mana Reap: Convert HP to mana, gain invulnerability
  | { type: 'mana_reap'; hpToManaPercent: number; invulnTicks: number }

  // Iterate: Stacking damage on repeated use (loops concept)
  | { type: 'iterate'; baseScaling: number; stackBonus: number; maxStacks: number; decayTicks: number }

  // While Active: Fast attacks that drain mana (while loop concept)
  | { type: 'while_active'; damageScaling: number; manaDrain: number }

  // Break Point: Normal damage until threshold, then finisher (break concept)
  | { type: 'break_finisher'; threshold: number; normalScaling: number; finisherScaling: number }

  // Return Value: Store damage, return it next use (functions concept)
  | { type: 'return_value'; baseScaling: number; storedMultiplier: number }

  // Call Stack: Damage scales with abilities used (function call stack concept)
  | { type: 'call_stack'; baseScaling: number; depthBonus: number }

  // Array Push: Store damage for later (array.push concept)
  | { type: 'array_push'; damageStored: number; maxStacks: number }

  // Array Pop: Release all stored damage (array.pop concept)
  | { type: 'array_pop'; bonusMultiplier: number }

  // Array Length: Damage based on abilities on cooldown (array.length concept)
  | { type: 'array_length'; baseScaling: number; perCooldownBonus: number }

  // Spread Buffs: Damage scales with active buffs (spread operator concept)
  | { type: 'spread_buffs'; baseScaling: number; perBuffBonus: number }

  // Destructure Self: Damage from own stats (destructuring concept)
  | { type: 'destructure_self'; statMultiplier: number }

  // ============ TIER 5: FUNCTIONS - Inscribe/Invoke ============
  // Inscribe: Store last N spells as a "function"
  | { type: 'inscribe_combo'; spellsToStore: number }
  // Invoke: Replay the inscribed spells
  | { type: 'invoke_combo' }
  // Callback: Auto-counter when damaged
  | { type: 'callback_counter'; counterScaling: number; durationTicks: number }

  // ============ TIER 6: ARRAYS - Queue system ============
  // (array_push and array_pop already exist above)
  // Splice: Modify queue, boost next release
  | { type: 'splice_queue'; nextReleaseMultiplier: number }

  // ============ TIER 8: ARRAY METHODS - Transform queue ============
  // Map: Multiply all values in queue
  | { type: 'map_queue'; multiplier: number }
  // Filter: Keep only values above threshold, bonus each
  | { type: 'filter_queue'; threshold: number; bonusScaling: number }
  // Reduce: Sum all into one attack
  | { type: 'reduce_queue'; bonusMultiplier: number }

  // ============ TIER 9: ASYNC - Prime/Detonate ============
  // Prime: Start charging for N ticks
  | { type: 'prime_charge'; chargeTicks: number }
  // Detonate: Big damage if fully charged, small if not
  | { type: 'detonate_charge'; fullScaling: number; partialScaling: number }
  // Delayed Heal: Heal after N ticks
  | { type: 'delayed_heal'; healPercent: number; delayTicks: number }

  // ============ TIER 10: REACT BASICS - Stance system ============
  // Set Stance: Cycle through stances
  | { type: 'set_stance'; stances: string[] }
  // Stance Strike: Bonus if stance matches enemy weakness
  | { type: 'stance_strike'; matchScaling: number; missScaling: number }

  // ============ TIER 11: REACT HOOKS - State & Resonance ============
  // Release Stored: Release all useState power
  | { type: 'release_stored_damage'; bonusMultiplier: number }
  // Resonance: 1000% if perfect (stance changed + matches arena), 0% otherwise
  | { type: 'resonance'; perfectScaling: number; failScaling: number; windowTicks: number };

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
  baseAttackTicks: number;  // Base ticks between attacks (20 = 1 attack/sec)
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

  // What it unlocks - abilities AND script features!
  unlocksAbilities: string[];
  unlocksFeatures: ScriptFeature[];  // Script automation features
  unlocksConditions: ScriptCondition['type'][];
  statBonus: Partial<CombatStats>;

  // Skill tree progression
  learned: boolean;
  goldCost: number;           // Buy with gold!
  prerequisites: string[];    // Must learn these first
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

  // Tick system (20 ticks per second)
  currentTick: number;           // Global tick counter
  tickAccumulator: number;       // For smooth tick processing
  abilitiesUsedThisCombat: number; // For combo finisher

  // Ability state tracking (for concept-based abilities)
  iterateStacks: number;         // For Iterate Strike stacking
  lastIterateUseTick: number;    // When Iterate Strike was last used
  damageArray: number[];         // For push/pop abilities (Array concept)
  storedReturnDamage: number;    // For Return(dmg) ability (Functions concept)
  invulnTicksRemaining: number;  // For Mana Reap invulnerability

  // Tier 5: Functions - Inscribe/Invoke
  inscribedSpells: string[];     // Spell IDs stored by Inscribe()
  recentSpellsCast: string[];    // Last N spells for Inscribe to capture
  callbackCounterActive: boolean; // Is Callback() counter active?
  callbackCounterTicks: number;  // Ticks remaining for callback

  // Tier 6-8: Arrays - Queue transforms
  spliceBoostActive: boolean;    // Is next Release boosted?
  spliceBoostMultiplier: number; // Multiplier for next release

  // Tier 9: Async - Prime/Detonate
  primeChargeTick: number;       // Tick when Prime was cast (0 = not charging)
  primeChargeRequired: number;   // Ticks required for full charge
  delayedHealTick: number;       // When delayed heal triggers (0 = none pending)
  delayedHealAmount: number;     // Amount to heal

  // Tier 10-11: React - Stance & State
  currentStance: string;         // 'fire' | 'ice' | 'lightning'
  lastStanceChangeTick: number;  // When stance was last changed
  storedPower: number;           // useState power accumulator
  arenaElement: string;          // Current arena element (cycles)

  // Stats
  killCount: number;
  sessionKills: number;
  totalDamageDealt: number;
  highestHit: number;
  totalGoldEarned: number;
  totalXpEarned: number;
  bossesDefeated: string[];
  lastHitTick: number;           // For chain damage tracking

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

export function calculateMobStats(template: MobTemplate, zoneLevel: number): Omit<Mob, 'instanceId' | 'attackCooldownTicks'> {
  const levelMod = Math.pow(1.12, zoneLevel - 1);

  // Gold scales EXPONENTIALLY to match item price progression
  // Zone 1 (lvl 1): ~10g per kill → Tier 1 items (40-60g) in 4-6 kills
  // Zone 2 (lvl 5): ~30g per kill → Tier 2 items (90-150g) in 3-5 kills
  // Zone 3 (lvl 10): ~150g per kill → Tier 5-6 items (400-1000g) in 3-7 kills
  // Zone 4 (lvl 15): ~700g per kill → Tier 8-9 items (2k-5k) in 3-7 kills
  // Zone 5 (lvl 20): ~3500g per kill → Tier 10-12 items (5k-15k) in 2-5 kills
  const goldScaling = Math.pow(1.35, zoneLevel - 1); // ~1.35x per level = matches item prices

  // Attack speed gets FASTER in later zones (fewer ticks between attacks)
  // Zone 1: base attack ticks
  // Zone 5: much faster attacks (minimum 1 tick for fastest mobs)
  const speedScaling = Math.max(1, template.baseAttackTicks - (zoneLevel - 1) * 2);

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
    attackSpeedTicks: speedScaling,  // Ticks between attacks (lower = faster)
    xpReward: Math.floor(10 * zoneLevel * template.xpMultiplier),
    goldReward: Math.floor(8 * goldScaling * template.goldMultiplier),
    lootTable: template.lootTable,
    isBoss: template.isBoss,
    debuffs: []
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
