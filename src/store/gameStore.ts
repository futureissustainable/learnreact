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
    activeBuffs: []
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
  killCount: 0,
  sessionKills: 0,
  totalDamageDealt: 0,
  highestHit: 0,
  totalGoldEarned: 0,
  totalXpEarned: 0,
  bossesDefeated: [],
  zones: ZONES.map(z => ({ ...z })),
  concepts: JS_CONCEPTS.map(c => ({ ...c, learnByDoing: c.learnByDoing.map(t => ({ ...t })) })),
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

  // Concepts
  addConceptXp: (conceptId: string, amount: number) => void;
  learnConcept: (conceptId: string) => void;
  updateLearnTasks: (taskType: string, value?: number) => void;

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
          concepts: JS_CONCEPTS.map(c => ({ ...c, learnByDoing: c.learnByDoing.map(t => ({ ...t })) })),
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
        if (!state.isAutoBattling || state.isPaused) return;

        const adjustedDelta = deltaTime * state.combatSpeed;

        // Update ability cooldowns and buffs first
        set(s => ({
          hero: {
            ...s.hero,
            abilities: s.hero.abilities.map(ability => ({
              ...ability,
              currentCooldown: Math.max(0, ability.currentCooldown - adjustedDelta)
            })),
            activeBuffs: s.hero.activeBuffs
              .map(buff => ({
                ...buff,
                remainingDuration: buff.remainingDuration - adjustedDelta
              }))
              .filter(buff => buff.remainingDuration > 0),
            stats: {
              ...s.hero.stats,
              mana: Math.min(s.hero.stats.maxMana, s.hero.stats.mana + adjustedDelta * 2)
            }
          },
          lastTick: Date.now(),
          totalPlayTime: s.totalPlayTime + deltaTime
        }));

        // Recalculate stats with buffs
        get().recalculateStats();

        // NO passive auto-attack! Player must use abilities or scripts
        // Damage only comes from:
        // 1. Manually clicking abilities
        // 2. Scripts the player has written/enabled

        // Update mob cooldowns and process attacks
        const currentMobs = get().currentMobs;
        currentMobs.forEach(mob => {
          const newCooldown = mob.attackCooldown - adjustedDelta;
          if (newCooldown <= 0) {
            // Update cooldown first, then attack
            set(s => ({
              currentMobs: s.currentMobs.map(m =>
                m.instanceId === mob.instanceId
                  ? { ...m, attackCooldown: 1 / m.attackSpeed }
                  : m
              )
            }));
            get().mobAttack(mob);
          } else {
            set(s => ({
              currentMobs: s.currentMobs.map(m =>
                m.instanceId === mob.instanceId
                  ? { ...m, attackCooldown: newCooldown }
                  : m
              )
            }));
          }
        });

        // Evaluate automation scripts (only ones player has enabled)
        get().evaluateScripts();
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
          attackCooldown: 1 / template.attackSpeed
        };

        set({ currentMobs: [...state.currentMobs, newMob] });
      },

      playerAttack: () => {
        const state = get();
        if (state.currentMobs.length === 0) return;

        const target = state.currentMobs[0];
        const { damage, isCrit } = calculateDamage(
          state.hero.stats.attack,
          target.defense,
          state.hero.stats.critChance,
          state.hero.stats.critDamage
        );

        // Apply damage
        const newHp = target.hp - damage;

        // Lifesteal
        if (state.hero.stats.lifeSteal > 0) {
          const healAmount = Math.floor(damage * state.hero.stats.lifeSteal);
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

        // Log - only crits and kills to reduce spam
        if (isCrit) {
          get().addLogEntry({
            type: 'player_crit',
            message: `💥 CRIT! ${damage} damage to ${target.name}!`,
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
        if (ability.currentCooldown > 0) return;
        if (state.hero.stats.mana < ability.manaCost) return;

        // Deduct mana and start cooldown
        const updatedAbilities = [...state.hero.abilities];
        updatedAbilities[abilityIndex] = {
          ...ability,
          currentCooldown: ability.cooldown
        };

        set(s => ({
          hero: {
            ...s.hero,
            stats: {
              ...s.hero.stats,
              mana: s.hero.stats.mana - ability.manaCost
            },
            abilities: updatedAbilities
          }
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

        if (effect.type === 'damage') {
          const baseDamage = effect.value + state.hero.stats.attack * effect.scaling;
          if (state.currentMobs.length > 0) {
            const target = state.currentMobs[0];
            const newHp = target.hp - baseDamage;

            get().addLogEntry({
              type: 'ability',
              message: `${ability.emoji} ${ability.name} dealt ${Math.floor(baseDamage)} damage!`,
              value: baseDamage,
              color: '#A855F7'
            });

            if (newHp <= 0) {
              get().killMob(target.instanceId);
            } else {
              set(s => ({
                currentMobs: s.currentMobs.map(m =>
                  m.instanceId === target.instanceId ? { ...m, hp: newHp } : m
                )
              }));
            }
          }
        } else if (effect.type === 'heal') {
          const healAmount = effect.value + state.hero.stats.maxHp * effect.scaling;
          set(s => ({
            hero: {
              ...s.hero,
              stats: {
                ...s.hero.stats,
                hp: Math.min(s.hero.stats.maxHp, s.hero.stats.hp + healAmount)
              }
            }
          }));

          get().addLogEntry({
            type: 'heal',
            message: `${ability.emoji} ${ability.name} healed ${Math.floor(healAmount)} HP!`,
            value: healAmount,
            color: '#22C55E'
          });
        } else if (effect.type === 'buff') {
          set(s => ({
            hero: {
              ...s.hero,
              activeBuffs: [
                ...s.hero.activeBuffs,
                {
                  id: `${abilityId}-${Date.now()}`,
                  stat: effect.stat,
                  value: effect.value,
                  remainingDuration: effect.duration,
                  maxDuration: effect.duration
                }
              ]
            }
          }));

          get().addLogEntry({
            type: 'buff',
            message: `${ability.emoji} ${ability.name} activated!`,
            color: '#6366F1'
          });
        } else if (effect.type === 'aoe' && effect.hitAll) {
          const mobs = state.currentMobs;
          const updatedMobs: Mob[] = [];
          const killedMobs: string[] = [];

          mobs.forEach(mob => {
            const newHp = mob.hp - effect.damage;
            if (newHp <= 0) {
              killedMobs.push(mob.instanceId);
            } else {
              updatedMobs.push({ ...mob, hp: newHp });
            }
          });

          set({ currentMobs: updatedMobs });

          get().addLogEntry({
            type: 'ability',
            message: `${ability.emoji} ${ability.name} hit ${mobs.length} enemies for ${effect.damage} each!`,
            color: '#F97316'
          });

          killedMobs.forEach(id => get().killMob(id));
        } else if (effect.type === 'execute') {
          if (state.currentMobs.length > 0) {
            const target = state.currentMobs[0];
            const hpPercent = target.hp / target.maxHp;
            const damage = hpPercent < effect.threshold
              ? state.hero.stats.attack * effect.bonusDamage
              : state.hero.stats.attack;

            const newHp = target.hp - damage;

            get().addLogEntry({
              type: 'ability',
              message: hpPercent < effect.threshold
                ? `${ability.emoji} EXECUTE! ${Math.floor(damage)} damage!`
                : `${ability.emoji} ${ability.name} dealt ${Math.floor(damage)} damage`,
              value: damage,
              color: '#DC2626'
            });

            if (newHp <= 0) {
              get().killMob(target.instanceId);
            } else {
              set(s => ({
                currentMobs: s.currentMobs.map(m =>
                  m.instanceId === target.instanceId ? { ...m, hp: newHp } : m
                )
              }));
            }
          }
        }

        // Update learn tasks
        get().updateLearnTasks('use_ability');
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

        // Update learn tasks
        get().updateLearnTasks('kill_count');

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

          get().updateLearnTasks('defeat_boss');

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
              conditionMet = ability ? ability.currentCooldown <= 0 && hero.stats.mana >= ability.manaCost : false;
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

            get().updateLearnTasks('trigger_script');

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

        // Add XP to concepts that are being learned
        const concepts = get().concepts;
        const activeConcept = concepts.find(c => !c.learned && c.prerequisites.every(
          prereqId => concepts.find(p => p.id === prereqId)?.learned
        ));

        if (activeConcept) {
          get().addConceptXp(activeConcept.id, Math.floor(amount * 0.5));
        }
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

        get().updateLearnTasks('reach_zone');
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
          attackCooldown: 1 / bossTemplate.attackSpeed
        };

        set({ currentMobs: [boss] });

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

      // ============ CONCEPTS ============

      addConceptXp: (conceptId, amount) => {
        set(s => ({
          concepts: s.concepts.map(c => {
            if (c.id !== conceptId) return c;

            const newXp = c.currentXp + amount;
            if (newXp >= c.xpToLearn && !c.learned) {
              get().learnConcept(conceptId);
            }

            return { ...c, currentXp: newXp };
          })
        }));
      },

      learnConcept: (conceptId) => {
        set(s => {
          const concept = s.concepts.find(c => c.id === conceptId);
          if (!concept) return s;

          // Unlock abilities
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

        const concept = get().concepts.find(c => c.id === conceptId);
        if (concept) {
          get().addLogEntry({
            type: 'level_up',
            message: `CONCEPT LEARNED: ${concept.name}!`,
            color: '#A855F7'
          });
        }
      },

      updateLearnTasks: (taskType, value = 1) => {
        set(s => ({
          concepts: s.concepts.map(concept => ({
            ...concept,
            learnByDoing: concept.learnByDoing.map(task => {
              if (task.type !== taskType || task.completed) return task;

              const newCurrent = task.current + value;
              return {
                ...task,
                current: newCurrent,
                completed: newCurrent >= task.target
              };
            })
          }))
        }));
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
      version: 9,
      migrate: (persistedState: unknown, version: number) => {
        // Force fresh - new progression: manual start, buy Automation Core first
        if (version < 9) {
          return getInitialState();
        }
        return persistedState as GameState;
      }
    }
  )
);
