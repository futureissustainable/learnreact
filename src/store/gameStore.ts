'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  GameState,
  Hero,
  Mob,
  CombatStats,
  Equipment,
  Ability,
  AutoScript,
  Zone,
  JsConcept,
  CombatLogEntry,
  NextAttackModifier,
  TICKS_PER_SECOND,
  calculateXpForLevel,
  calculateDamage,
  calculateMobStats,
  generateInstanceId
} from '@/types/game';
import { ZONES, ABILITIES, DEFAULT_SCRIPTS, JS_CONCEPTS, getEquipmentById, generateEquipmentDrop } from '@/data/gameData';

// ============ INITIAL STATE ============

const createInitialHero = (name: string): Hero => {
  const baseStats: CombatStats = {
    hp: 100,
    maxHp: 100,
    mana: 50,
    maxMana: 50,
    attack: 10,
    defense: 5,
    critChance: 0.05,
    critDamage: 1.5,
    attackSpeed: 1.0,
    lifeSteal: 0
  };

  return {
    name,
    level: 1,
    xp: 0,
    xpToNextLevel: calculateXpForLevel(2),
    gold: 0,
    stats: { ...baseStats },
    baseStats: { ...baseStats },
    equipment: {
      weapon: null,
      armor: null,
      accessory: null
    },
    abilities: ABILITIES.filter(a => a.unlocked).map(a => ({ ...a })),
    scripts: DEFAULT_SCRIPTS.map(s => ({ ...s })),
    activeBuffs: [],
    nextAttackModifiers: []  // For ability synergies
  };
};

const getInitialState = (): GameState => ({
  hero: createInitialHero('Hero'),
  initialized: false,
  currentZone: ZONES[0],
  currentMobs: [],
  combatLog: [],
  isAutoBattling: false,
  isPaused: false,
  // Tick system
  currentTick: 0,
  tickAccumulator: 0,
  abilitiesUsedThisCombat: 0,
  lastHitTick: 0,
  // Ability state tracking (for concept-based abilities)
  iterateStacks: 0,
  lastIterateUseTick: 0,
  damageArray: [],
  storedReturnDamage: 0,
  invulnTicksRemaining: 0,
  // Stats
  killCount: 0,
  sessionKills: 0,
  totalDamageDealt: 0,
  highestHit: 0,
  totalGoldEarned: 0,
  totalXpEarned: 0,
  bossesDefeated: [],
  zones: ZONES.map(z => ({ ...z })),
  concepts: JS_CONCEPTS.map(c => ({ ...c })),
  inventory: [],
  maxInventorySize: 50,
  combatSpeed: 1,
  autoLoot: true,
  showDamageNumbers: true,
  lastTick: Date.now(),
  totalPlayTime: 0
});

// ============ STORE INTERFACE ============

interface GameStore extends GameState {
  // Initialization
  initializeGame: (heroName: string) => void;

  // Combat
  startAutoBattle: () => void;
  stopAutoBattle: () => void;
  togglePause: () => void;
  gameTick: (deltaTime: number) => void;
  spawnMob: () => void;
  playerAttack: () => void;
  mobAttack: (mob: Mob) => void;
  useAbility: (abilityId: string) => void;
  killMob: (mobInstanceId: string) => void;

  // Scripts
  toggleScript: (scriptId: string) => void;
  addScript: (script: Omit<AutoScript, 'id' | 'lastTriggered' | 'triggerCount'>) => void;
  deleteScript: (scriptId: string) => void;
  evaluateScripts: () => void;

  // Progression
  addXp: (amount: number) => void;
  addGold: (amount: number) => void;
  checkLevelUp: () => void;

  // Zones
  changeZone: (zoneId: string) => void;
  unlockZone: (zoneId: string) => void;
  summonBoss: () => void;

  // Equipment & Shop
  equipItem: (itemId: string) => void;
  unequipSlot: (slot: 'weapon' | 'armor' | 'accessory') => void;
  addToInventory: (equipment: Equipment) => void;
  sellItem: (itemId: string) => void;
  buyItem: (item: Equipment, price: number) => boolean;
  recalculateStats: () => void;

  // Concepts (Skill Tree)
  buyConcept: (conceptId: string) => boolean;
  canBuyConcept: (conceptId: string) => boolean;

  // Combat Log
  addLogEntry: (entry: Omit<CombatLogEntry, 'id' | 'timestamp'>) => void;
  clearLog: () => void;

  // Utility
  resetGame: () => void;
  setCombatSpeed: (speed: number) => void;
}

// ============ STORE IMPLEMENTATION ============

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...getInitialState(),

      // ============ INITIALIZATION ============

      initializeGame: (heroName) => {
        const hero = createInitialHero(heroName);
        set({
          hero,
          initialized: true,
          currentZone: ZONES[0],
          zones: ZONES.map(z => ({ ...z })),
          concepts: JS_CONCEPTS.map(c => ({ ...c })),
          combatLog: [],
          killCount: 0,
          sessionKills: 0
        });

        get().addLogEntry({
          type: 'zone',
          message: `Entered ${ZONES[0].name}`,
          color: '#22C55E'
        });

        get().spawnMob();
      },

      // ============ COMBAT ============

      startAutoBattle: () => {
        set({ isAutoBattling: true, lastTick: Date.now() });
        get().addLogEntry({
          type: 'zone',
          message: 'Auto-battle started',
          color: '#3B82F6'
        });
      },

      stopAutoBattle: () => {
        set({ isAutoBattling: false });
      },

      togglePause: () => {
        set(state => ({ isPaused: !state.isPaused }));
      },

      gameTick: (deltaTime) => {
        const state = get();
        if (state.isPaused) return;

        // Convert real time to game ticks (20 ticks per second)
        // deltaTime is in seconds, so: ticks = deltaTime * 20 * combatSpeed
        const ticksToProcess = deltaTime * TICKS_PER_SECOND * state.combatSpeed;
        const newAccumulator = state.tickAccumulator + ticksToProcess;
        const wholeTicks = Math.floor(newAccumulator);
        const remainingAccumulator = newAccumulator - wholeTicks;

        if (wholeTicks === 0) {
          set({ tickAccumulator: remainingAccumulator });
          return;
        }

        const inCombat = state.currentZone && state.currentMobs.length > 0;

        // Process each tick
        for (let i = 0; i < wholeTicks; i++) {
          const currentState = get();

          // ============================================
          // TICK: Ability cooldowns (tick-based)
          // ============================================
          set(s => {
            // Decay iterate stacks if they've expired
            const ticksSinceIterate = s.currentTick - s.lastIterateUseTick;
            const iterateDecayed = ticksSinceIterate > 60 ? 0 : s.iterateStacks; // 3 second decay

            return {
              hero: {
                ...s.hero,
                abilities: s.hero.abilities.map(ability => ({
                  ...ability,
                  currentCooldownTicks: Math.max(0, (ability.currentCooldownTicks || 0) - 1)
                })),
                // Decay next attack modifiers
                nextAttackModifiers: (s.hero.nextAttackModifiers || [])
                  .map(mod => ({
                    ...mod,
                    ticksRemaining: (mod.ticksRemaining || mod.expireAfterTicks || 0) - 1
                  }))
                  .filter(mod => (mod.ticksRemaining ?? 0) > 0)
              },
              currentTick: s.currentTick + 1,
              iterateStacks: iterateDecayed,
              invulnTicksRemaining: Math.max(0, s.invulnTicksRemaining - 1)
            };
          });

          // ============================================
          // TICK: Mana regen (1 mana per 10 ticks = 2/sec)
          // ============================================
          if (currentState.currentTick % 10 === 0) {
            set(s => ({
              hero: {
                ...s.hero,
                stats: {
                  ...s.hero.stats,
                  mana: Math.min(s.hero.stats.maxMana, s.hero.stats.mana + 1)
                }
              }
            }));
          }

          // ============================================
          // TICK: Buff duration (convert to ticks for display, keep seconds internally for now)
          // ============================================
          if (currentState.currentTick % TICKS_PER_SECOND === 0) {
            set(s => ({
              hero: {
                ...s.hero,
                activeBuffs: s.hero.activeBuffs
                  .map(buff => ({
                    ...buff,
                    remainingDuration: buff.remainingDuration - 1
                  }))
                  .filter(buff => buff.remainingDuration > 0)
              }
            }));
            // Recalculate stats with buffs each second
            get().recalculateStats();
          }

          // ============================================
          // IN COMBAT: Mob attacks (tick-based)
          // ============================================
          if (inCombat) {
            const currentMobs = get().currentMobs;
            currentMobs.forEach(mob => {
              const newCooldown = (mob.attackCooldownTicks || mob.attackSpeedTicks) - 1;
              if (newCooldown <= 0) {
                // Mob attacks!
                set(s => ({
                  currentMobs: s.currentMobs.map(m =>
                    m.instanceId === mob.instanceId
                      ? { ...m, attackCooldownTicks: m.attackSpeedTicks }
                      : m
                  )
                }));
                get().mobAttack(mob);
              } else {
                set(s => ({
                  currentMobs: s.currentMobs.map(m =>
                    m.instanceId === mob.instanceId
                      ? { ...m, attackCooldownTicks: newCooldown }
                      : m
                  )
                }));
              }
            });

            // Process mob debuffs (armor shred, etc.)
            set(s => ({
              currentMobs: s.currentMobs.map(mob => ({
                ...mob,
                debuffs: (mob.debuffs || [])
                  .map(d => ({ ...d, remainingTicks: d.remainingTicks - 1 }))
                  .filter(d => d.remainingTicks > 0)
              }))
            }));
          }

          // ============================================
          // AUTO-BATTLE: Evaluate scripts every tick
          // ============================================
          if (get().isAutoBattling) {
            get().evaluateScripts();
          }
        }

        // Update time tracking
        set(s => ({
          tickAccumulator: remainingAccumulator,
          lastTick: Date.now(),
          totalPlayTime: s.totalPlayTime + deltaTime
        }));
      },

      spawnMob: () => {
        const state = get();
        if (!state.currentZone) return;

        // Pick random mob from zone pool
        const pool = state.currentZone.mobPool;
        const totalWeight = pool.reduce((sum, m) => sum + m.spawnWeight, 0);
        let roll = Math.random() * totalWeight;

        let template = pool[0];
        for (const mob of pool) {
          roll -= mob.spawnWeight;
          if (roll <= 0) {
            template = mob;
            break;
          }
        }

        const mobStats = calculateMobStats(template, state.currentZone.level);
        const newMob: Mob = {
          ...mobStats,
          instanceId: generateInstanceId(),
          attackCooldownTicks: mobStats.attackSpeedTicks  // Start with full cooldown
        };

        // Reset abilities used counter for new combat
        set({
          currentMobs: [...state.currentMobs, newMob],
          abilitiesUsedThisCombat: 0
        });
      },

      playerAttack: () => {
        const state = get();
        if (state.currentMobs.length === 0) return;

        const target = state.currentMobs[0];
        const modifiers = state.hero.nextAttackModifiers || [];

        // Calculate base damage
        let { damage, isCrit } = calculateDamage(
          state.hero.stats.attack,
          target.defense,
          state.hero.stats.critChance,
          state.hero.stats.critDamage
        );

        // Apply next attack modifiers from synergy abilities
        let bonusLifesteal = 0;
        let manaMultiplier = 1;
        let consumeAllMana = false;

        for (const mod of modifiers) {
          if (mod.guaranteedCrit && !isCrit) {
            isCrit = true;
            damage = damage * state.hero.stats.critDamage;
          }
          if (mod.damageMultiplier) {
            damage = Math.floor(damage * mod.damageMultiplier);
          }
          if (mod.flatDamage) {
            damage += mod.flatDamage;
          }
          if (mod.lifestealBonus) {
            bonusLifesteal += mod.lifestealBonus;
          }
          if (mod.manaMultiplier) {
            manaMultiplier = mod.manaMultiplier;
          }
          if (mod.consumeAllMana) {
            consumeAllMana = true;
          }
        }

        // Apply mana consumption if modifier set it
        if (consumeAllMana) {
          const manaDamage = Math.floor(state.hero.stats.mana * 5 * manaMultiplier);
          damage += manaDamage;
          set(s => ({
            hero: {
              ...s.hero,
              stats: { ...s.hero.stats, mana: 0 }
            }
          }));
        }

        // Clear modifiers after use
        set(s => ({
          hero: {
            ...s.hero,
            nextAttackModifiers: []
          },
          lastHitTick: s.currentTick
        }));

        // Apply damage with debuffs considered
        const armorShred = (target.debuffs || []).find(d => d.type === 'armor_shred');
        const effectiveDefense = armorShred
          ? target.defense * (1 - armorShred.value)
          : target.defense;

        // Recalculate with effective defense if armor shred active
        if (armorShred) {
          const reduction = effectiveDefense / (effectiveDefense + 50);
          damage = Math.floor(Math.max(1, state.hero.stats.attack * (1 - reduction)));
          if (isCrit) damage = Math.floor(damage * state.hero.stats.critDamage);
        }

        const newHp = target.hp - damage;

        // Lifesteal (base + bonus from modifiers)
        const totalLifesteal = state.hero.stats.lifeSteal + bonusLifesteal;
        if (totalLifesteal > 0) {
          const healAmount = Math.floor(damage * totalLifesteal);
          set(s => ({
            hero: {
              ...s.hero,
              stats: {
                ...s.hero.stats,
                hp: Math.min(s.hero.stats.maxHp, s.hero.stats.hp + healAmount)
              }
            }
          }));
        }

        // Log - only crits and significant hits
        if (isCrit || damage > state.hero.stats.attack * 2) {
          get().addLogEntry({
            type: 'player_crit',
            message: isCrit
              ? `💥 CRIT! ${damage} damage to ${target.name}!`
              : `💥 ${damage} damage to ${target.name}!`,
            value: damage,
            color: '#F59E0B'
          });
        }

        // Update stats
        set(s => ({
          totalDamageDealt: s.totalDamageDealt + damage,
          highestHit: Math.max(s.highestHit, damage)
        }));

        if (newHp <= 0) {
          get().killMob(target.instanceId);
        } else {
          set(s => ({
            currentMobs: s.currentMobs.map(m =>
              m.instanceId === target.instanceId ? { ...m, hp: newHp } : m
            )
          }));
        }
      },

      mobAttack: (mob) => {
        const state = get();

        // Check invulnerability (from Mana Reap)
        if (state.invulnTicksRemaining > 0) {
          return; // Immune to damage
        }

        const { damage } = calculateDamage(
          mob.attack,
          state.hero.stats.defense,
          0.05,
          1.5
        );

        const newHp = state.hero.stats.hp - damage;

        // Only log significant damage (>15% of max HP) or if health is low
        const damagePercent = damage / state.hero.stats.maxHp;
        const healthLow = newHp / state.hero.stats.maxHp < 0.3;
        if (damagePercent > 0.15 || healthLow) {
          get().addLogEntry({
            type: 'enemy_attack',
            message: healthLow
              ? `⚠️ ${mob.name} hit you for ${damage}! HP LOW!`
              : `${mob.name} hit you for ${damage}`,
            value: damage,
            color: healthLow ? '#DC2626' : '#EF4444'
          });
        }

        if (newHp <= 0) {
          // Player died
          get().addLogEntry({
            type: 'death',
            message: 'You were defeated! Respawning...',
            color: '#DC2626'
          });

          // Respawn with full HP
          set(s => ({
            hero: {
              ...s.hero,
              stats: {
                ...s.hero.stats,
                hp: s.hero.stats.maxHp,
                mana: s.hero.stats.maxMana
              }
            },
            currentMobs: []
          }));

          setTimeout(() => get().spawnMob(), 1000);
        } else {
          set(s => ({
            hero: {
              ...s.hero,
              stats: {
                ...s.hero.stats,
                hp: newHp
              }
            }
          }));
        }
      },

      useAbility: (abilityId) => {
        const state = get();
        const abilityIndex = state.hero.abilities.findIndex(a => a.id === abilityId);
        if (abilityIndex === -1) return;

        const ability = state.hero.abilities[abilityIndex];
        // Use tick-based cooldowns
        if ((ability.currentCooldownTicks || 0) > 0) return;
        if (state.hero.stats.mana < ability.manaCost) return;

        // Deduct mana and start cooldown (tick-based)
        const updatedAbilities = [...state.hero.abilities];
        updatedAbilities[abilityIndex] = {
          ...ability,
          currentCooldownTicks: ability.cooldownTicks || 20  // Default 1 second if not specified
        };

        set(s => ({
          hero: {
            ...s.hero,
            stats: {
              ...s.hero.stats,
              mana: Math.max(0, s.hero.stats.mana - ability.manaCost)
            },
            abilities: updatedAbilities
          },
          abilitiesUsedThisCombat: s.abilitiesUsedThisCombat + 1
        }));

        // Apply effect
        const effect = ability.effect;

        // Special handling for meditate (restore mana)
        if (abilityId === 'meditate') {
          const manaRestore = Math.floor(state.hero.stats.maxMana * 0.2);
          set(s => ({
            hero: {
              ...s.hero,
              stats: {
                ...s.hero.stats,
                mana: Math.min(s.hero.stats.maxMana, s.hero.stats.mana + manaRestore)
              }
            }
          }));

          get().addLogEntry({
            type: 'heal',
            message: `${ability.emoji} ${ability.name} restored ${manaRestore} mana!`,
            value: manaRestore,
            color: '#3B82F6'
          });
          return;
        }

        // Helper to apply damage to target
        const applyDamage = (damage: number, target: Mob, message: string, color: string) => {
          const newHp = target.hp - damage;
          get().addLogEntry({ type: 'ability', message, value: damage, color });
          set(s => ({ totalDamageDealt: s.totalDamageDealt + damage, highestHit: Math.max(s.highestHit, damage) }));

          if (newHp <= 0) {
            get().killMob(target.instanceId);
          } else {
            set(s => ({
              currentMobs: s.currentMobs.map(m =>
                m.instanceId === target.instanceId ? { ...m, hp: newHp } : m
              )
            }));
          }
        };

        const target = state.currentMobs[0];
        const hero = state.hero;

        // === BASIC DAMAGE ===
        if (effect.type === 'damage') {
          const damage = effect.value + hero.stats.attack * effect.scaling;
          if (target) {
            applyDamage(damage, target, `${ability.emoji} ${ability.name} dealt ${Math.floor(damage)} damage!`, '#A855F7');
          }
        }

        // === HEAL ===
        else if (effect.type === 'heal') {
          const healAmount = effect.value + hero.stats.maxHp * effect.scaling;
          set(s => ({
            hero: { ...s.hero, stats: { ...s.hero.stats, hp: Math.min(s.hero.stats.maxHp, s.hero.stats.hp + healAmount) } }
          }));
          get().addLogEntry({ type: 'heal', message: `${ability.emoji} Healed ${Math.floor(healAmount)} HP!`, value: healAmount, color: '#22C55E' });
        }

        // === BUFF ===
        else if (effect.type === 'buff') {
          set(s => ({
            hero: {
              ...s.hero,
              activeBuffs: [...s.hero.activeBuffs, {
                id: `${abilityId}-${Date.now()}`,
                stat: effect.stat,
                value: effect.value,
                remainingDuration: effect.duration,
                maxDuration: effect.duration
              }]
            }
          }));
          get().addLogEntry({ type: 'buff', message: `${ability.emoji} ${ability.name} activated!`, color: '#6366F1' });
        }

        // === EXECUTE (bonus damage when enemy HP low) ===
        else if (effect.type === 'execute') {
          if (target) {
            const hpPercent = target.hp / target.maxHp;
            const damage = hpPercent < effect.threshold ? hero.stats.attack * effect.bonusDamage : hero.stats.attack;
            const msg = hpPercent < effect.threshold ? `${ability.emoji} EXECUTE! ${Math.floor(damage)} damage!` : `${ability.emoji} ${Math.floor(damage)} damage`;
            applyDamage(damage, target, msg, '#DC2626');
          }
        }

        // === DESPERATION (more damage when YOUR HP is low) ===
        else if (effect.type === 'desperation') {
          if (target) {
            const missingHpPercent = 1 - (hero.stats.hp / hero.stats.maxHp);
            const scaling = effect.baseScaling + missingHpPercent;
            const damage = hero.stats.attack * scaling;
            applyDamage(damage, target, `${ability.emoji} Desperate Strike! ${Math.floor(damage)} (${Math.floor(scaling * 100)}%)`, '#F97316');
          }
        }

        // === CONDITIONAL DAMAGE (bonus if condition met) ===
        else if (effect.type === 'conditional_damage') {
          if (target) {
            let conditionMet = false;
            if (effect.condition === 'mana_above') {
              conditionMet = (hero.stats.mana / hero.stats.maxMana) > effect.threshold;
            } else if (effect.condition === 'hp_above') {
              conditionMet = (hero.stats.hp / hero.stats.maxHp) > effect.threshold;
            }
            const scaling = conditionMet ? effect.highScaling : effect.lowScaling;
            const damage = hero.stats.attack * scaling;
            applyDamage(damage, target, `${ability.emoji} ${conditionMet ? 'OVERCHARGED!' : ''} ${Math.floor(damage)} damage!`, conditionMet ? '#FBBF24' : '#A855F7');
          }
        }

        // === PERCENT MAX HP (% of enemy max HP) ===
        else if (effect.type === 'percent_max_hp') {
          if (target) {
            const damage = target.maxHp * effect.percent;
            applyDamage(damage, target, `${ability.emoji} ${Math.floor(damage)} (${Math.floor(effect.percent * 100)}% max HP)!`, '#3B82F6');
          }
        }

        // === PERCENT MISSING HP (% of enemy missing HP) ===
        else if (effect.type === 'percent_missing_hp') {
          if (target) {
            const missingHp = target.maxHp - target.hp;
            const damage = missingHp * effect.percent;
            applyDamage(damage, target, `${ability.emoji} ${Math.floor(damage)} (${Math.floor(effect.percent * 100)}% missing HP)!`, '#8B5CF6');
          }
        }

        // === LIFESTEAL BURST (damage + heal) ===
        else if (effect.type === 'lifesteal_burst') {
          if (target) {
            const damage = hero.stats.attack * effect.scaling;
            const healAmount = damage * effect.healPercent;
            applyDamage(damage, target, `${ability.emoji} ${Math.floor(damage)} damage, healed ${Math.floor(healAmount)}!`, '#22C55E');
            set(s => ({
              hero: { ...s.hero, stats: { ...s.hero.stats, hp: Math.min(s.hero.stats.maxHp, s.hero.stats.hp + healAmount) } }
            }));
          }
        }

        // === MULTI HIT ===
        else if (effect.type === 'multi_hit') {
          if (target) {
            const damagePerHit = hero.stats.attack * effect.scaling;
            const totalDamage = damagePerHit * effect.hits;
            applyDamage(totalDamage, target, `${ability.emoji} ${effect.hits}x hits for ${Math.floor(totalDamage)} total!`, '#F472B6');
          }
        }

        // === AOE (hit all enemies) ===
        else if (effect.type === 'aoe' && effect.hitAll) {
          const mobs = state.currentMobs;
          const damage = effect.damage || hero.stats.attack * (effect.scaling || 1);
          const updatedMobs: Mob[] = [];
          const killedMobs: string[] = [];

          mobs.forEach(mob => {
            const newHp = mob.hp - damage;
            if (newHp <= 0) killedMobs.push(mob.instanceId);
            else updatedMobs.push({ ...mob, hp: newHp });
          });

          set({ currentMobs: updatedMobs });
          get().addLogEntry({ type: 'ability', message: `${ability.emoji} Hit ${mobs.length} enemies for ${Math.floor(damage)} each!`, color: '#F97316' });
          killedMobs.forEach(id => get().killMob(id));
        }

        // === MANA CONSUME (use all mana for damage) ===
        else if (effect.type === 'mana_consume') {
          if (target) {
            const manaSpent = hero.stats.mana;
            const damage = manaSpent * effect.damagePerMana;
            set(s => ({ hero: { ...s.hero, stats: { ...s.hero.stats, mana: 0 } } }));
            applyDamage(damage, target, `${ability.emoji} MANA BOMB! ${Math.floor(damage)} damage (${manaSpent} mana)!`, '#EF4444');
          }
        }

        // === REFLECT STAT (damage based on enemy stat) ===
        else if (effect.type === 'reflect_stat') {
          if (target) {
            const enemyStat = effect.stat === 'attack' ? target.attack : target.defense;
            const damage = enemyStat * effect.multiplier;
            applyDamage(damage, target, `${ability.emoji} Calculated! ${Math.floor(damage)} (enemy ${effect.stat} x${effect.multiplier})`, '#10B981');
          }
        }

        // === GUARANTEED CRIT ===
        else if (effect.type === 'guaranteed_crit') {
          if (target) {
            const damage = hero.stats.attack * effect.scaling * hero.stats.critDamage;
            applyDamage(damage, target, `${ability.emoji} CRIT! ${Math.floor(damage)} damage!`, '#FBBF24');
          }
        }

        // === TERNARY (different damage based on condition) ===
        else if (effect.type === 'ternary') {
          if (target) {
            let conditionTrue = false;
            if (effect.condition === 'hp_above') {
              conditionTrue = (hero.stats.hp / hero.stats.maxHp) > effect.threshold;
            }
            const scaling = conditionTrue ? effect.trueScaling : effect.falseScaling;
            const damage = hero.stats.attack * scaling;
            applyDamage(damage, target, `${ability.emoji} ${conditionTrue ? 'Safe' : 'RISKY'} ${Math.floor(damage)} damage!`, conditionTrue ? '#6B7280' : '#EF4444');
          }
        }

        // === BOOLEAN OR (bonus if either condition true) ===
        else if (effect.type === 'boolean_or') {
          if (target) {
            const isCrit = Math.random() < hero.stats.critChance;
            const enemyLow = (target.hp / target.maxHp) < effect.threshold;
            const conditionMet = isCrit || enemyLow;
            const scaling = conditionMet ? effect.bonusScaling : effect.normalScaling;
            const damage = hero.stats.attack * scaling * (isCrit ? hero.stats.critDamage : 1);
            const msg = conditionMet
              ? `${ability.emoji} OR TRUE! ${isCrit ? 'CRIT' : 'EXECUTE'} ${Math.floor(damage)}!`
              : `${ability.emoji} ${Math.floor(damage)} damage`;
            applyDamage(damage, target, msg, conditionMet ? '#F59E0B' : '#A855F7');
          }
        }

        // === BOOLEAN AND (bonus if both conditions true) ===
        else if (effect.type === 'boolean_and') {
          if (target) {
            const cond1 = (hero.stats.hp / hero.stats.maxHp) > effect.threshold1;
            const cond2 = (hero.stats.mana / hero.stats.maxMana) > effect.threshold2;
            const conditionMet = cond1 && cond2;
            const scaling = conditionMet ? effect.bonusScaling : 1.0;
            const damage = hero.stats.attack * scaling;
            applyDamage(damage, target, `${ability.emoji} ${conditionMet ? 'AND TRUE! ' : ''}${Math.floor(damage)} damage!`, conditionMet ? '#22C55E' : '#A855F7');
            if (conditionMet && effect.healPercent) {
              const healAmount = hero.stats.maxHp * effect.healPercent;
              set(s => ({
                hero: { ...s.hero, stats: { ...s.hero.stats, hp: Math.min(s.hero.stats.maxHp, s.hero.stats.hp + healAmount) } }
              }));
              get().addLogEntry({ type: 'heal', message: `💚 Combo heal: +${Math.floor(healAmount)}!`, color: '#22C55E' });
            }
          }
        }

        // === BOOLEAN NOT (bonus based on NOT full HP) ===
        else if (effect.type === 'boolean_not') {
          if (target) {
            const hpPercent = hero.stats.hp / hero.stats.maxHp;
            const notFull = hpPercent < 1;
            const missingPercent = 1 - hpPercent;
            const bonusDamage = notFull ? hero.stats.attack * missingPercent * (effect.bonusPerMissingPercent * 100) : 0;
            const totalDamage = hero.stats.attack + bonusDamage;
            applyDamage(totalDamage, target, `${ability.emoji} ${notFull ? '!fullHP ' : ''}${Math.floor(totalDamage)} damage!`, notFull ? '#F38BA8' : '#A855F7');
          }
        }

        // === HOT (Heal over time) ===
        else if (effect.type === 'hot') {
          const healPerTick = hero.stats.maxHp * effect.healPercent;
          // Apply first tick immediately
          set(s => ({
            hero: { ...s.hero, stats: { ...s.hero.stats, hp: Math.min(s.hero.stats.maxHp, s.hero.stats.hp + healPerTick) } }
          }));
          get().addLogEntry({ type: 'heal', message: `${ability.emoji} HoT started! +${Math.floor(healPerTick)}/tick for ${effect.ticks}s`, color: '#22C55E' });
          // Note: remaining ticks would need a buff system - simplified here
        }

        // === REFUND ON KILL ===
        else if (effect.type === 'refund_on_kill') {
          if (target) {
            const damage = hero.stats.attack * effect.scaling;
            const willKill = target.hp - damage <= 0;
            applyDamage(damage, target, `${ability.emoji} ${Math.floor(damage)} damage!`, '#A855F7');
            if (willKill) {
              const refund = Math.floor(ability.manaCost * effect.refundPercent);
              set(s => ({
                hero: { ...s.hero, stats: { ...s.hero.stats, mana: Math.min(s.hero.stats.maxMana, s.hero.stats.mana + refund) } }
              }));
              get().addLogEntry({ type: 'heal', message: `♻️ Kill refund: +${refund} mana!`, color: '#3B82F6' });
            }
          }
        }

        // ============================================================
        // SYNERGY ABILITIES - Setup effects for next attack
        // ============================================================

        // === SELF DAMAGE EMPOWER (Seppuku) ===
        else if (effect.type === 'self_damage_empower') {
          const selfDamage = Math.floor(hero.stats.maxHp * effect.selfDamagePercent);
          const newHp = Math.max(1, hero.stats.hp - selfDamage);
          set(s => ({
            hero: {
              ...s.hero,
              stats: { ...s.hero.stats, hp: newHp },
              nextAttackModifiers: [
                ...(s.hero.nextAttackModifiers || []),
                {
                  id: `seppuku-${Date.now()}`,
                  source: 'seppuku',
                  damageMultiplier: 1 + effect.nextAttackBonus,
                  expireAfterTicks: 60,
                  ticksRemaining: 60
                }
              ]
            }
          }));
          get().addLogEntry({
            type: 'ability',
            message: `${ability.emoji} Seppuku! -${selfDamage} HP, next attack +${Math.floor(effect.nextAttackBonus * 100)}%!`,
            color: '#DC2626'
          });
        }

        // === MANA OVERLOAD (double mana for next attack) ===
        else if (effect.type === 'mana_overload') {
          set(s => ({
            hero: {
              ...s.hero,
              nextAttackModifiers: [
                ...(s.hero.nextAttackModifiers || []),
                {
                  id: `mana-overload-${Date.now()}`,
                  source: 'mana-overload',
                  manaMultiplier: effect.manaMultiplier,
                  consumeAllMana: true,
                  expireAfterTicks: effect.expireTicks,
                  ticksRemaining: effect.expireTicks
                }
              ]
            }
          }));
          get().addLogEntry({
            type: 'ability',
            message: `${ability.emoji} Mana Overload! Next mana attack deals ${effect.manaMultiplier}x damage!`,
            color: '#A855F7'
          });
        }

        // === FOCUS STRIKE (guaranteed crit + bonus damage) ===
        else if (effect.type === 'focus_strike') {
          set(s => ({
            hero: {
              ...s.hero,
              nextAttackModifiers: [
                ...(s.hero.nextAttackModifiers || []),
                {
                  id: `focus-${Date.now()}`,
                  source: 'focus',
                  guaranteedCrit: effect.critBonus > 0,
                  damageMultiplier: 1 + effect.damageBonus,
                  expireAfterTicks: effect.expireTicks,
                  ticksRemaining: effect.expireTicks
                }
              ]
            }
          }));
          const critMsg = effect.critBonus > 0 ? 'CRIT + ' : '';
          get().addLogEntry({
            type: 'ability',
            message: `${ability.emoji} Focus! Next attack: ${critMsg}+${Math.floor(effect.damageBonus * 100)}% damage!`,
            color: '#6366F1'
          });
        }

        // === ARMOR SHRED (debuff enemy) ===
        else if (effect.type === 'armor_shred') {
          if (target) {
            set(s => ({
              currentMobs: s.currentMobs.map(m =>
                m.instanceId === target.instanceId
                  ? {
                      ...m,
                      debuffs: [
                        ...(m.debuffs || []),
                        {
                          id: `armor-shred-${Date.now()}`,
                          type: 'armor_shred' as const,
                          value: effect.defenseReduction,
                          remainingTicks: effect.durationTicks
                        }
                      ]
                    }
                  : m
              )
            }));
            get().addLogEntry({
              type: 'ability',
              message: `${ability.emoji} Crippling Blow! ${target.name} armor -${Math.floor(effect.defenseReduction * 100)}%!`,
              color: '#F59E0B'
            });
          }
        }

        // === VAMPIRIC TOUCH (lifesteal on next attack) ===
        else if (effect.type === 'vampiric_touch') {
          set(s => ({
            hero: {
              ...s.hero,
              nextAttackModifiers: [
                ...(s.hero.nextAttackModifiers || []),
                {
                  id: `vamp-${Date.now()}`,
                  source: 'vampiric-touch',
                  lifestealBonus: effect.lifestealBonus,
                  expireAfterTicks: effect.expireTicks,
                  ticksRemaining: effect.expireTicks
                }
              ]
            }
          }));
          get().addLogEntry({
            type: 'ability',
            message: `${ability.emoji} Vampiric Touch! Next attack heals ${Math.floor(effect.lifestealBonus * 100)}% of damage!`,
            color: '#A855F7'
          });
        }

        // === BLOOD PACT (big self-damage for huge next attack) ===
        else if (effect.type === 'blood_pact') {
          const selfDamage = Math.floor(hero.stats.hp * effect.hpCostPercent);
          const newHp = Math.max(1, hero.stats.hp - selfDamage);
          set(s => ({
            hero: {
              ...s.hero,
              stats: { ...s.hero.stats, hp: newHp },
              nextAttackModifiers: [
                ...(s.hero.nextAttackModifiers || []),
                {
                  id: `blood-pact-${Date.now()}`,
                  source: 'blood-pact',
                  damageMultiplier: effect.damageMultiplier,
                  expireAfterTicks: effect.expireTicks,
                  ticksRemaining: effect.expireTicks
                }
              ]
            }
          }));
          get().addLogEntry({
            type: 'ability',
            message: `${ability.emoji} BLOOD PACT! -${selfDamage} HP, next attack x${effect.damageMultiplier}!`,
            color: '#DC2626'
          });
        }

        // === RAMPING (stacking damage) ===
        else if (effect.type === 'ramping') {
          if (target) {
            // Track ramp stacks in a simple way - use ability usage count as proxy
            const stacks = state.abilitiesUsedThisCombat;
            const scaling = effect.baseScaling + (stacks * effect.rampPerUse);
            const damage = hero.stats.attack * scaling;
            applyDamage(damage, target, `${ability.emoji} Stack ${stacks}! ${Math.floor(damage)} damage (${Math.floor(scaling * 100)}%)!`, '#F472B6');
          }
        }

        // === BERSERK (attack speed + defense reduction) ===
        else if (effect.type === 'berserk') {
          set(s => ({
            hero: {
              ...s.hero,
              activeBuffs: [
                ...s.hero.activeBuffs,
                {
                  id: `berserk-atk-${Date.now()}`,
                  stat: 'attackSpeed' as keyof CombatStats,
                  value: effect.attackSpeedBonus,
                  remainingDuration: effect.duration,
                  maxDuration: effect.duration
                }
              ]
            }
          }));
          // Defense reduction is handled in recalculateStats
          get().addLogEntry({
            type: 'buff',
            message: `${ability.emoji} BERSERK! +${Math.floor(effect.attackSpeedBonus * 100)}% ATK SPD, -${Math.floor(effect.defenseReduction * 100)}% DEF!`,
            color: '#EF4444'
          });
        }

        // ============================================================
        // NEW CONCEPT-BASED ABILITIES
        // ============================================================

        // === CONDITIONAL CUBE (500% if HP=50% AND mana=100%) ===
        else if (effect.type === 'conditional_cube') {
          if (target) {
            const hpPercent = hero.stats.hp / hero.stats.maxHp;
            const manaPercent = hero.stats.mana / hero.stats.maxMana;
            const hpMatch = Math.abs(hpPercent - effect.hpTarget) <= effect.tolerance;
            const manaMatch = Math.abs(manaPercent - effect.manaTarget) <= effect.tolerance;
            const conditionMet = hpMatch && manaMatch;

            const scaling = conditionMet ? effect.bonusScaling : 1.0;
            const damage = hero.stats.attack * scaling;

            if (conditionMet) {
              applyDamage(damage, target, `${ability.emoji} CONDITIONAL CUBE! HP=${Math.floor(hpPercent * 100)}% ∧ Mana=${Math.floor(manaPercent * 100)}%! ${Math.floor(damage)} damage!`, '#F59E0B');
            } else {
              applyDamage(damage, target, `${ability.emoji} Conditions not met (HP: ${Math.floor(hpPercent * 100)}%, Mana: ${Math.floor(manaPercent * 100)}%). ${Math.floor(damage)} damage`, '#6B7280');
            }
          }
        }

        // === MANA REAP (Convert 99% HP to mana, gain invulnerability) ===
        else if (effect.type === 'mana_reap') {
          const currentHp = hero.stats.hp;
          const hpToConvert = Math.floor(currentHp * effect.hpToManaPercent);
          const manaGained = hpToConvert; // 1:1 HP to mana

          set(s => ({
            hero: {
              ...s.hero,
              stats: {
                ...s.hero.stats,
                hp: Math.max(1, s.hero.stats.hp - hpToConvert),
                mana: Math.min(s.hero.stats.maxMana, s.hero.stats.mana + manaGained)
              }
            },
            invulnTicksRemaining: effect.invulnTicks
          }));

          get().addLogEntry({
            type: 'ability',
            message: `${ability.emoji} MANA REAP! -${hpToConvert} HP → +${manaGained} Mana! Invulnerable for 1s!`,
            color: '#A855F7'
          });
        }

        // === ITERATE (Stacking damage on repeated use) ===
        else if (effect.type === 'iterate') {
          if (target) {
            // Check if stacks should reset (too long since last use)
            const ticksSinceLastUse = state.currentTick - state.lastIterateUseTick;
            const currentStacks = ticksSinceLastUse > effect.decayTicks ? 0 : state.iterateStacks;
            const newStacks = Math.min(currentStacks + 1, effect.maxStacks);

            const scaling = effect.baseScaling + (currentStacks * effect.stackBonus);
            const damage = hero.stats.attack * scaling;

            set({ iterateStacks: newStacks, lastIterateUseTick: state.currentTick });
            applyDamage(damage, target, `${ability.emoji} Iterate[${currentStacks}]! ${Math.floor(damage)} damage (${Math.floor(scaling * 100)}%)`, '#3B82F6');
          }
        }

        // === WHILE FURY (Fast damage that drains mana) ===
        else if (effect.type === 'while_active') {
          if (target) {
            const damage = hero.stats.attack * effect.damageScaling;
            applyDamage(damage, target, `${ability.emoji} while(mana) { hit! } ${Math.floor(damage)} damage`, '#06B6D4');
          }
        }

        // === BREAK POINT (Normal damage until threshold, then finisher) ===
        else if (effect.type === 'break_finisher') {
          if (target) {
            const enemyHpPercent = target.hp / target.maxHp;
            const isFinisher = enemyHpPercent <= effect.threshold;
            const scaling = isFinisher ? effect.finisherScaling : effect.normalScaling;
            const damage = hero.stats.attack * scaling;

            if (isFinisher) {
              applyDamage(damage, target, `${ability.emoji} BREAK! Enemy HP ≤ ${Math.floor(effect.threshold * 100)}%! ${Math.floor(damage)} finisher!`, '#DC2626');
            } else {
              applyDamage(damage, target, `${ability.emoji} while(hp > ${Math.floor(effect.threshold * 100)}%) { ${Math.floor(damage)} }`, '#6B7280');
            }
          }
        }

        // === RETURN VALUE (Store damage, return it next use) ===
        else if (effect.type === 'return_value') {
          if (target) {
            const baseDamage = hero.stats.attack * effect.baseScaling;
            const storedBonus = state.storedReturnDamage * effect.storedMultiplier;
            const totalDamage = baseDamage + storedBonus;

            // Store current attack for next use
            set({ storedReturnDamage: hero.stats.attack });

            applyDamage(totalDamage, target, `${ability.emoji} return ${Math.floor(baseDamage)}${storedBonus > 0 ? ` + stored(${Math.floor(storedBonus)})` : ''}!`, '#8B5CF6');
          }
        }

        // === CALL STACK (Damage scales with abilities used this combat) ===
        else if (effect.type === 'call_stack') {
          if (target) {
            const callDepth = state.abilitiesUsedThisCombat;
            const scaling = effect.baseScaling + (callDepth * effect.depthBonus);
            const damage = hero.stats.attack * scaling;

            applyDamage(damage, target, `${ability.emoji} CallStack[${callDepth}]! ${Math.floor(damage)} damage (${Math.floor(scaling * 100)}%)`, '#10B981');
          }
        }

        // === ARRAY PUSH (Store damage for later) ===
        else if (effect.type === 'array_push') {
          const damageToStore = Math.floor(hero.stats.attack * effect.damageStored);
          const currentArray = state.damageArray || [];

          if (currentArray.length < effect.maxStacks) {
            set({ damageArray: [...currentArray, damageToStore] });
            get().addLogEntry({
              type: 'ability',
              message: `${ability.emoji} arr.push(${damageToStore})! Array length: ${currentArray.length + 1}`,
              color: '#3B82F6'
            });
          } else {
            get().addLogEntry({
              type: 'ability',
              message: `${ability.emoji} Array full! Max ${effect.maxStacks} items.`,
              color: '#EF4444'
            });
          }
        }

        // === ARRAY POP (Release all stored damage) ===
        else if (effect.type === 'array_pop') {
          if (target) {
            const currentArray = state.damageArray || [];
            const totalStored = currentArray.reduce((sum, d) => sum + d, 0);
            const totalDamage = Math.floor(totalStored * effect.bonusMultiplier);

            if (totalDamage > 0) {
              set({ damageArray: [] });
              applyDamage(totalDamage, target, `${ability.emoji} while(arr.length) { pop()! } ${currentArray.length} items = ${totalDamage} damage!`, '#F97316');
            } else {
              get().addLogEntry({
                type: 'ability',
                message: `${ability.emoji} Array empty! Push damage first.`,
                color: '#6B7280'
              });
            }
          }
        }

        // === ARRAY LENGTH (Damage based on abilities on cooldown) ===
        else if (effect.type === 'array_length') {
          if (target) {
            const abilitiesOnCooldown = hero.abilities.filter(a => (a.currentCooldownTicks || 0) > 0).length;
            const scaling = effect.baseScaling + (abilitiesOnCooldown * effect.perCooldownBonus);
            const damage = hero.stats.attack * scaling;

            applyDamage(damage, target, `${ability.emoji} abilities.filter(onCD).length = ${abilitiesOnCooldown}! ${Math.floor(damage)} damage`, '#F472B6');
          }
        }

        // === SPREAD BUFFS (Damage scales with active buffs) ===
        else if (effect.type === 'spread_buffs') {
          if (target) {
            const buffCount = hero.activeBuffs.length;
            const scaling = effect.baseScaling + (buffCount * effect.perBuffBonus);
            const damage = hero.stats.attack * scaling;

            applyDamage(damage, target, `${ability.emoji} {...buffs}! ${buffCount} buffs = ${Math.floor(damage)} damage (${Math.floor(scaling * 100)}%)`, '#A855F7');
          }
        }

        // === DESTRUCTURE SELF (Damage from own stats) ===
        else if (effect.type === 'destructure_self') {
          if (target) {
            // const { atk, def, crit } = this; dmg = (atk + def) * crit
            const atk = hero.stats.attack;
            const def = hero.stats.defense;
            const crit = hero.stats.critDamage;
            const damage = Math.floor((atk + def) * crit * effect.statMultiplier);

            applyDamage(damage, target, `${ability.emoji} { atk: ${atk}, def: ${def} } * crit(${crit.toFixed(1)}) = ${damage}!`, '#22C55E');
          }
        }

      },

      killMob: (mobInstanceId) => {
        const state = get();
        const mob = state.currentMobs.find(m => m.instanceId === mobInstanceId);
        if (!mob) return;

        // Remove mob
        set(s => ({
          currentMobs: s.currentMobs.filter(m => m.instanceId !== mobInstanceId)
        }));

        // Rewards
        get().addXp(mob.xpReward);
        get().addGold(mob.goldReward);

        get().addLogEntry({
          type: 'xp',
          message: `${mob.emoji} ${mob.name} defeated! +${mob.xpReward} XP`,
          value: mob.xpReward,
          color: '#FBBF24'
        });

        // Update kill count
        set(s => ({
          killCount: s.killCount + 1,
          sessionKills: s.sessionKills + 1
        }));

        // Boss defeated
        if (mob.isBoss) {
          set(s => ({
            bossesDefeated: [...s.bossesDefeated, mob.id]
          }));

          get().addLogEntry({
            type: 'level_up',
            message: `BOSS DEFEATED: ${mob.name}!`,
            color: '#F97316'
          });

          // Check zone unlocks
          const zones = get().zones;
          zones.forEach(zone => {
            if (!zone.unlocked && zone.requiredBossKill === mob.id) {
              const hero = get().hero;
              const meetsLevel = !zone.requiredLevel || hero.level >= zone.requiredLevel;
              if (meetsLevel) {
                get().unlockZone(zone.id);
              }
            }
          });
        }

        // Loot drop
        if (state.autoLoot && state.currentZone) {
          const drop = generateEquipmentDrop(state.currentZone.level);
          if (drop && Math.random() < 0.15) {
            get().addToInventory(drop);
            get().addLogEntry({
              type: 'loot',
              message: `${drop.emoji} ${drop.name} dropped!`,
              color: drop.rarity === 'legendary' ? '#F97316' :
                     drop.rarity === 'epic' ? '#A855F7' :
                     drop.rarity === 'rare' ? '#3B82F6' : '#22C55E'
            });
          }
        }

        // Spawn next mob
        if (state.currentMobs.length <= 1) {
          setTimeout(() => get().spawnMob(), 500);
        }
      },

      // ============ SCRIPTS ============

      toggleScript: (scriptId) => {
        set(s => ({
          hero: {
            ...s.hero,
            scripts: s.hero.scripts.map(script =>
              script.id === scriptId ? { ...script, enabled: !script.enabled } : script
            )
          }
        }));
      },

      addScript: (scriptData) => {
        const newScript: AutoScript = {
          ...scriptData,
          id: `script-${Date.now()}`,
          lastTriggered: 0,
          triggerCount: 0
        };

        set(s => ({
          hero: {
            ...s.hero,
            scripts: [...s.hero.scripts, newScript]
          }
        }));

        get().addLogEntry({
          type: 'script',
          message: `Created script: ${newScript.name}`,
          color: '#cba6f7'
        });
      },

      deleteScript: (scriptId) => {
        set(s => ({
          hero: {
            ...s.hero,
            scripts: s.hero.scripts.filter(script => script.id !== scriptId)
          }
        }));
      },

      evaluateScripts: () => {
        const state = get();
        const now = Date.now();

        // Sort by priority
        const sortedScripts = [...state.hero.scripts]
          .filter(s => s.enabled)
          .sort((a, b) => b.priority - a.priority);

        for (const script of sortedScripts) {
          // Check cooldown
          if (now - script.lastTriggered < script.cooldown * 1000) continue;

          // Evaluate condition
          let conditionMet = false;
          const hero = state.hero;
          const mob = state.currentMobs[0];

          switch (script.condition.type) {
            case 'hp_below':
              conditionMet = (hero.stats.hp / hero.stats.maxHp) < (script.condition.percent / 100);
              break;
            case 'hp_above':
              conditionMet = (hero.stats.hp / hero.stats.maxHp) > (script.condition.percent / 100);
              break;
            case 'mana_above':
              conditionMet = (hero.stats.mana / hero.stats.maxMana) > (script.condition.percent / 100);
              break;
            case 'mana_below':
              conditionMet = (hero.stats.mana / hero.stats.maxMana) < (script.condition.percent / 100);
              break;
            case 'enemy_hp_below':
              conditionMet = mob ? (mob.hp / mob.maxHp) < (script.condition.percent / 100) : false;
              break;
            case 'enemy_hp_above':
              conditionMet = mob ? (mob.hp / mob.maxHp) > (script.condition.percent / 100) : false;
              break;
            case 'ability_ready':
              const abilityCondition = script.condition as { type: 'ability_ready'; abilityId: string };
              const ability = hero.abilities.find(a => a.id === abilityCondition.abilityId);
              conditionMet = ability ? (ability.currentCooldownTicks || 0) <= 0 && hero.stats.mana >= ability.manaCost : false;
              break;
            case 'on_kill':
            case 'on_crit':
            case 'on_hit':
              // These are event-based triggers - handled separately in combat
              break;
            case 'never':
              conditionMet = false;
              break;
            case 'always':
              conditionMet = true;
              break;
          }

          if (!conditionMet) continue;

          // Execute action
          if (script.action.type === 'use_ability') {
            get().useAbility(script.action.abilityId);

            // Update script trigger count
            set(s => ({
              hero: {
                ...s.hero,
                scripts: s.hero.scripts.map(sc =>
                  sc.id === script.id
                    ? { ...sc, lastTriggered: now, triggerCount: sc.triggerCount + 1 }
                    : sc
                )
              }
            }));

            // Only log script triggers occasionally (every 5th trigger)
            const newTriggerCount = script.triggerCount + 1;
            if (newTriggerCount <= 3 || newTriggerCount % 10 === 0) {
              get().addLogEntry({
                type: 'script',
                message: `⚡ Script: ${script.name}`,
                color: '#6366F1'
              });
            }

            break; // Only one script per tick
          }
        }
      },

      // ============ PROGRESSION ============

      addXp: (amount) => {
        set(s => ({
          hero: {
            ...s.hero,
            xp: s.hero.xp + amount
          },
          totalXpEarned: s.totalXpEarned + amount
        }));
        get().checkLevelUp();
      },

      addGold: (amount) => {
        set(s => ({
          hero: {
            ...s.hero,
            gold: s.hero.gold + amount
          },
          totalGoldEarned: s.totalGoldEarned + amount
        }));
      },

      checkLevelUp: () => {
        const state = get();
        let hero = { ...state.hero };
        let leveledUp = false;

        while (hero.xp >= hero.xpToNextLevel) {
          hero.xp -= hero.xpToNextLevel;
          hero.level++;
          hero.xpToNextLevel = calculateXpForLevel(hero.level + 1);
          leveledUp = true;

          // Stat increases on level up
          hero.baseStats.maxHp += 10;
          hero.baseStats.attack += 2;
          hero.baseStats.defense += 1;
          hero.baseStats.maxMana += 5;
        }

        if (leveledUp) {
          // Restore HP/mana on level up
          hero.stats.hp = hero.baseStats.maxHp;
          hero.stats.mana = hero.baseStats.maxMana;

          set({ hero });
          get().recalculateStats();

          get().addLogEntry({
            type: 'level_up',
            message: `LEVEL UP! You are now level ${hero.level}!`,
            color: '#FBBF24'
          });

          // Check zone unlocks
          const zones = get().zones;
          zones.forEach(zone => {
            if (!zone.unlocked && zone.requiredLevel && hero.level >= zone.requiredLevel) {
              const bossReq = zone.requiredBossKill;
              const bossDefeated = !bossReq || get().bossesDefeated.includes(bossReq);
              if (bossDefeated) {
                get().unlockZone(zone.id);
              }
            }
          });
        }
      },

      // ============ ZONES ============

      changeZone: (zoneId) => {
        const zone = get().zones.find(z => z.id === zoneId);
        if (!zone || !zone.unlocked) return;

        set({
          currentZone: zone,
          currentMobs: []
        });

        get().addLogEntry({
          type: 'zone',
          message: `Entered ${zone.name}`,
          color: '#22C55E'
        });

        get().spawnMob();
      },

      unlockZone: (zoneId) => {
        set(s => ({
          zones: s.zones.map(z =>
            z.id === zoneId ? { ...z, unlocked: true } : z
          )
        }));

        const zone = get().zones.find(z => z.id === zoneId);
        if (zone) {
          get().addLogEntry({
            type: 'zone',
            message: `NEW ZONE UNLOCKED: ${zone.name}!`,
            color: '#F59E0B'
          });
        }
      },

      summonBoss: () => {
        const state = get();
        if (!state.currentZone?.bossId) return;

        const bossTemplate = state.currentZone.mobPool.find(m => m.isBoss);
        if (!bossTemplate) return;

        const bossStats = calculateMobStats(bossTemplate, state.currentZone.level);
        const boss: Mob = {
          ...bossStats,
          instanceId: generateInstanceId(),
          attackCooldownTicks: bossStats.attackSpeedTicks  // Tick-based cooldown
        };

        set({ currentMobs: [boss], abilitiesUsedThisCombat: 0 });

        get().addLogEntry({
          type: 'zone',
          message: `BOSS APPEARED: ${boss.name}!`,
          color: '#DC2626'
        });
      },

      // ============ EQUIPMENT ============

      equipItem: (itemId) => {
        const state = get();
        const item = state.inventory.find(i => i.id === itemId);
        if (!item) return;

        // Unequip current item in slot
        const currentEquipped = state.hero.equipment[item.type];
        if (currentEquipped) {
          get().unequipSlot(item.type);
        }

        // Remove from inventory and equip
        set(s => ({
          inventory: s.inventory.filter(i => i.id !== itemId),
          hero: {
            ...s.hero,
            equipment: {
              ...s.hero.equipment,
              [item.type]: item
            }
          }
        }));

        get().recalculateStats();

        get().addLogEntry({
          type: 'loot',
          message: `Equipped ${item.emoji} ${item.name}`,
          color: '#3B82F6'
        });
      },

      unequipSlot: (slot) => {
        const state = get();
        const item = state.hero.equipment[slot];
        if (!item) return;

        set(s => ({
          inventory: [...s.inventory, item],
          hero: {
            ...s.hero,
            equipment: {
              ...s.hero.equipment,
              [slot]: null
            }
          }
        }));

        get().recalculateStats();
      },

      addToInventory: (equipment) => {
        const state = get();
        if (state.inventory.length >= state.maxInventorySize) {
          get().addLogEntry({
            type: 'loot',
            message: 'Inventory full! Item lost.',
            color: '#EF4444'
          });
          return;
        }

        set(s => ({
          inventory: [...s.inventory, equipment]
        }));
      },

      sellItem: (itemId) => {
        const state = get();
        const item = state.inventory.find(i => i.id === itemId);
        if (!item) return;

        const value = item.level * 10 * (
          item.rarity === 'legendary' ? 10 :
          item.rarity === 'epic' ? 5 :
          item.rarity === 'rare' ? 3 :
          item.rarity === 'uncommon' ? 2 : 1
        );

        set(s => ({
          inventory: s.inventory.filter(i => i.id !== itemId)
        }));

        get().addGold(value);

        get().addLogEntry({
          type: 'gold',
          message: `Sold ${item.name} for ${value} gold`,
          color: '#FBBF24'
        });
      },

      buyItem: (item, price) => {
        const state = get();
        if (state.hero.gold < price) {
          get().addLogEntry({
            type: 'gold',
            message: `Not enough gold! Need ${price}`,
            color: '#EF4444'
          });
          return false;
        }

        if (state.inventory.length >= state.maxInventorySize) {
          get().addLogEntry({
            type: 'loot',
            message: 'Inventory full!',
            color: '#EF4444'
          });
          return false;
        }

        // Deduct gold and add item with unique ID
        const newItem = { ...item, id: `${item.id}-${Date.now()}` };
        set(s => ({
          hero: {
            ...s.hero,
            gold: s.hero.gold - price
          },
          inventory: [...s.inventory, newItem]
        }));

        get().addLogEntry({
          type: 'loot',
          message: `Bought ${item.name} for ${price} gold`,
          color: '#22C55E'
        });

        return true;
      },

      recalculateStats: () => {
        set(s => {
          const hero = { ...s.hero };
          const base = hero.baseStats;

          // Start with base stats
          const stats: CombatStats = { ...base };

          // Add equipment stats
          Object.values(hero.equipment).forEach(item => {
            if (item?.stats) {
              Object.entries(item.stats).forEach(([key, value]) => {
                const statKey = key as keyof CombatStats;
                stats[statKey] = (stats[statKey] || 0) + (value || 0);
              });
            }
          });

          // Add concept bonuses
          s.concepts.filter(c => c.learned).forEach(concept => {
            Object.entries(concept.statBonus).forEach(([key, value]) => {
              const statKey = key as keyof CombatStats;
              stats[statKey] = (stats[statKey] || 0) + (value || 0);
            });
          });

          // Add buff bonuses
          hero.activeBuffs.forEach(buff => {
            stats[buff.stat] = (stats[buff.stat] || 0) + buff.value;
          });

          // Keep current HP/mana ratios
          const hpRatio = hero.stats.hp / hero.stats.maxHp;
          const manaRatio = hero.stats.mana / hero.stats.maxMana;

          stats.hp = Math.floor(stats.maxHp * hpRatio);
          stats.mana = Math.floor(stats.maxMana * manaRatio);

          return {
            hero: {
              ...hero,
              stats
            }
          };
        });
      },

      // ============ CONCEPTS (SKILL TREE) ============

      canBuyConcept: (conceptId) => {
        const state = get();
        const concept = state.concepts.find(c => c.id === conceptId);
        if (!concept || concept.learned) return false;

        // Check gold
        if (state.hero.gold < concept.goldCost) return false;

        // Check prerequisites
        const allPrereqsLearned = concept.prerequisites.every(prereqId =>
          state.concepts.find(c => c.id === prereqId)?.learned
        );
        return allPrereqsLearned;
      },

      buyConcept: (conceptId) => {
        const state = get();
        if (!get().canBuyConcept(conceptId)) return false;

        const concept = state.concepts.find(c => c.id === conceptId);
        if (!concept) return false;

        // Deduct gold
        set(s => ({
          hero: {
            ...s.hero,
            gold: s.hero.gold - concept.goldCost
          }
        }));

        // Mark as learned and unlock abilities
        set(s => {
          const newAbilities = [...s.hero.abilities];
          ABILITIES.filter(a => a.requiredConcept === conceptId).forEach(ability => {
            if (!newAbilities.find(a => a.id === ability.id)) {
              newAbilities.push({ ...ability, unlocked: true });
            }
          });

          return {
            concepts: s.concepts.map(c =>
              c.id === conceptId ? { ...c, learned: true } : c
            ),
            hero: {
              ...s.hero,
              abilities: newAbilities
            }
          };
        });

        get().recalculateStats();

        get().addLogEntry({
          type: 'level_up',
          message: `SKILL LEARNED: ${concept.name}!`,
          color: '#A855F7'
        });

        // Log unlocked abilities
        const unlockedAbilities = ABILITIES.filter(a => a.requiredConcept === conceptId);
        if (unlockedAbilities.length > 0) {
          get().addLogEntry({
            type: 'level_up',
            message: `Unlocked: ${unlockedAbilities.map(a => a.emoji + ' ' + a.name).join(', ')}`,
            color: '#cba6f7'
          });
        }

        return true;
      },

      // ============ COMBAT LOG ============

      addLogEntry: (entry) => {
        const newEntry: CombatLogEntry = {
          ...entry,
          id: generateInstanceId(),
          timestamp: Date.now()
        };

        set(s => ({
          combatLog: [newEntry, ...s.combatLog].slice(0, 100) // Keep last 100 entries
        }));
      },

      clearLog: () => {
        set({ combatLog: [] });
      },

      // ============ UTILITY ============

      resetGame: () => {
        set(getInitialState());
      },

      setCombatSpeed: (speed) => {
        set({ combatSpeed: speed });
      }
    }),
    {
      name: 'codequest-rpg-storage',
      version: 16,
      migrate: (persistedState: unknown, version: number) => {
        // Version 16: Concept-based abilities that REQUIRE understanding
        // Redesigned Loops, Functions, Arrays, Objects abilities
        // Force fresh start to experience the new system
        if (version < 16) {
          return getInitialState();
        }
        return persistedState as GameState;
      }
    }
  )
);
