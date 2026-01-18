'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  GameState,
  Character,
  Skill,
  Item,
  ReviewItem,
  ChallengeResult,
  calculateXpForLevel,
  Quest,
  CharacterClass
} from '@/types/game';
import { INITIAL_SKILLS } from '@/data/skills';
import { rollForItem } from '@/data/items';

interface GameStore extends GameState {
  // Character actions
  initializeCharacter: (name: string, characterClass: CharacterClass) => void;
  addXp: (amount: number) => void;
  addGold: (amount: number) => void;
  addItem: (item: Item) => void;
  equipItem: (itemId: string) => void;
  unequipItem: (itemId: string) => void;

  // Skill actions
  addSkillXp: (skillId: string, amount: number) => void;
  unlockSkill: (skillId: string) => void;

  // Challenge actions
  completeChallenge: (challengeId: string, correct: boolean, skillId: string) => ChallengeResult;
  getAvailableChallenges: () => string[];

  // Review system (spaced repetition)
  addToReviewQueue: (challengeId: string) => void;
  updateReviewItem: (challengeId: string, correct: boolean) => void;
  getDueReviews: () => ReviewItem[];

  // Quest actions
  setActiveQuest: (quest: Quest | undefined) => void;
  updateQuestProgress: () => void;

  // Streak and session
  updateStreak: () => void;
  addPlayTime: (minutes: number) => void;
  completeTutorial: () => void;

  // Utils
  resetGame: () => void;
  getEquippedEffects: () => { xpBoost: number; goldBoost: number; hints: number; retries: number };
}

const createInitialCharacter = (name: string, characterClass: CharacterClass): Character => ({
  name,
  class: characterClass,
  level: 1,
  xp: 0,
  xpToNextLevel: calculateXpForLevel(2),
  gold: 50,
  stats: {
    wisdom: characterClass === 'frontend-wizard' ? 12 : 10,
    focus: characterClass === 'react-ranger' ? 12 : 10,
    creativity: characterClass === 'ui-bard' ? 12 : 10,
    persistence: characterClass === 'fullstack-warrior' ? 12 : 10
  },
  inventory: [],
  equippedItems: [],
  achievements: []
});

const getInitialState = (): GameState => ({
  character: createInitialCharacter('Hero', 'frontend-wizard'),
  skills: INITIAL_SKILLS,
  completedChallenges: [],
  currentStreak: 0,
  lastPlayedDate: new Date().toISOString().split('T')[0],
  reviewQueue: [],
  activeQuest: undefined,
  tutorialComplete: false,
  totalPlayTime: 0
});

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...getInitialState(),

      initializeCharacter: (name, characterClass) => {
        set({
          character: createInitialCharacter(name, characterClass),
          skills: INITIAL_SKILLS,
          completedChallenges: [],
          tutorialComplete: false
        });
      },

      addXp: (amount) => {
        set((state) => {
          const effects = get().getEquippedEffects();
          const boostedAmount = Math.floor(amount * (1 + effects.xpBoost));
          let newXp = state.character.xp + boostedAmount;
          let newLevel = state.character.level;
          let xpToNext = state.character.xpToNextLevel;

          // Level up logic
          while (newXp >= xpToNext) {
            newXp -= xpToNext;
            newLevel++;
            xpToNext = calculateXpForLevel(newLevel + 1);

            // Stat boost on level up
            const statKeys = ['wisdom', 'focus', 'creativity', 'persistence'] as const;
            const randomStat = statKeys[Math.floor(Math.random() * statKeys.length)];
            state.character.stats[randomStat] += 1;
          }

          return {
            character: {
              ...state.character,
              xp: newXp,
              level: newLevel,
              xpToNextLevel: xpToNext
            }
          };
        });
      },

      addGold: (amount) => {
        set((state) => {
          const effects = get().getEquippedEffects();
          const boostedAmount = Math.floor(amount * (1 + effects.goldBoost));
          return {
            character: {
              ...state.character,
              gold: state.character.gold + boostedAmount
            }
          };
        });
      },

      addItem: (item) => {
        set((state) => ({
          character: {
            ...state.character,
            inventory: [...state.character.inventory, item]
          }
        }));
      },

      equipItem: (itemId) => {
        set((state) => {
          const item = state.character.inventory.find((i) => i.id === itemId);
          if (!item) return state;

          // Check if we already have an item of same effect type equipped
          const sameTypeEquipped = state.character.equippedItems.find(
            (i) => i.effect.type === item.effect.type
          );

          if (sameTypeEquipped) {
            // Unequip the old one first
            return {
              character: {
                ...state.character,
                equippedItems: [
                  ...state.character.equippedItems.filter((i) => i.id !== sameTypeEquipped.id),
                  { ...item, equipped: true }
                ],
                inventory: state.character.inventory.map((i) =>
                  i.id === itemId ? { ...i, equipped: true } : i.id === sameTypeEquipped.id ? { ...i, equipped: false } : i
                )
              }
            };
          }

          return {
            character: {
              ...state.character,
              equippedItems: [...state.character.equippedItems, { ...item, equipped: true }],
              inventory: state.character.inventory.map((i) =>
                i.id === itemId ? { ...i, equipped: true } : i
              )
            }
          };
        });
      },

      unequipItem: (itemId) => {
        set((state) => ({
          character: {
            ...state.character,
            equippedItems: state.character.equippedItems.filter((i) => i.id !== itemId),
            inventory: state.character.inventory.map((i) =>
              i.id === itemId ? { ...i, equipped: false } : i
            )
          }
        }));
      },

      addSkillXp: (skillId, amount) => {
        set((state) => {
          const skills = state.skills.map((skill) => {
            if (skill.id !== skillId) return skill;

            let newXp = skill.currentXp + amount;
            let newLevel = skill.level;

            // Level up skill
            while (newXp >= skill.xpRequired && newLevel < skill.maxLevel) {
              newXp -= skill.xpRequired;
              newLevel++;
            }

            // Check if this unlocks other skills
            if (newLevel > skill.level) {
              // Unlock dependent skills
              state.skills.forEach((s) => {
                if (s.prerequisiteIds.includes(skillId)) {
                  const allPrereqsMet = s.prerequisiteIds.every((prereqId) => {
                    const prereq = state.skills.find((ps) => ps.id === prereqId);
                    return prereq && prereq.level >= 1;
                  });
                  if (allPrereqsMet) {
                    s.unlocked = true;
                  }
                }
              });
            }

            return {
              ...skill,
              currentXp: newXp,
              level: newLevel
            };
          });

          // Re-check unlocks for all skills
          const updatedSkills = skills.map((skill) => {
            if (skill.unlocked) return skill;

            const allPrereqsMet = skill.prerequisiteIds.every((prereqId) => {
              const prereq = skills.find((s) => s.id === prereqId);
              return prereq && prereq.level >= 1;
            });

            return {
              ...skill,
              unlocked: allPrereqsMet || skill.prerequisiteIds.length === 0
            };
          });

          return { skills: updatedSkills };
        });
      },

      unlockSkill: (skillId) => {
        set((state) => ({
          skills: state.skills.map((skill) =>
            skill.id === skillId ? { ...skill, unlocked: true } : skill
          )
        }));
      },

      completeChallenge: (challengeId, correct, skillId) => {
        const state = get();
        const streakBonus = Math.min(state.currentStreak * 0.05, 0.5); // Max 50% bonus

        const baseXp = correct ? 25 : 5;
        const baseGold = correct ? 10 : 2;

        const xpEarned = Math.floor(baseXp * (1 + streakBonus));
        const goldEarned = Math.floor(baseGold * (1 + streakBonus));

        // Roll for item drop
        const itemDropped = correct && Math.random() < 0.3 ? rollForItem() : null;

        // Update state
        if (correct) {
          get().addXp(xpEarned);
          get().addGold(goldEarned);
          get().addSkillXp(skillId, Math.floor(xpEarned * 0.8));

          if (itemDropped) {
            get().addItem(itemDropped);
          }

          // Add to review queue for spaced repetition
          get().addToReviewQueue(challengeId);

          set((state) => ({
            completedChallenges: [...new Set([...state.completedChallenges, challengeId])],
            currentStreak: state.currentStreak + 1
          }));
        } else {
          // Still give minimal XP for trying
          get().addXp(xpEarned);

          set((state) => ({
            currentStreak: 0
          }));
        }

        const messages = correct
          ? [
              'Excellent work!',
              'You\'re on fire!',
              'Perfect execution!',
              'Knowledge gained!',
              'Skill increased!'
            ]
          : [
              'Keep trying!',
              'Learning from mistakes...',
              'Almost there!',
              'Don\'t give up!'
            ];

        return {
          correct,
          xpEarned,
          goldEarned,
          itemDropped: itemDropped || undefined,
          skillProgress: { skillId, xpGained: Math.floor(xpEarned * 0.8) },
          streakBonus: correct ? streakBonus : undefined,
          message: messages[Math.floor(Math.random() * messages.length)]
        };
      },

      getAvailableChallenges: () => {
        const state = get();
        const unlockedSkillCategories = state.skills
          .filter((s) => s.unlocked)
          .map((s) => s.category);

        // Return challenge IDs for unlocked skill categories
        return unlockedSkillCategories;
      },

      addToReviewQueue: (challengeId) => {
        set((state) => {
          const existing = state.reviewQueue.find((r) => r.challengeId === challengeId);
          if (existing) return state;

          const now = Date.now();
          const newReview: ReviewItem = {
            challengeId,
            lastReviewed: now,
            nextReview: now + 24 * 60 * 60 * 1000, // 1 day
            interval: 1,
            easeFactor: 2.5,
            repetitions: 0
          };

          return {
            reviewQueue: [...state.reviewQueue, newReview]
          };
        });
      },

      updateReviewItem: (challengeId, correct) => {
        set((state) => {
          const reviewQueue = state.reviewQueue.map((item) => {
            if (item.challengeId !== challengeId) return item;

            const now = Date.now();

            if (correct) {
              // SM-2 algorithm simplified
              const newInterval = item.repetitions === 0
                ? 1
                : item.repetitions === 1
                  ? 6
                  : Math.round(item.interval * item.easeFactor);

              return {
                ...item,
                lastReviewed: now,
                nextReview: now + newInterval * 24 * 60 * 60 * 1000,
                interval: newInterval,
                easeFactor: Math.max(1.3, item.easeFactor + 0.1),
                repetitions: item.repetitions + 1
              };
            } else {
              // Reset on failure
              return {
                ...item,
                lastReviewed: now,
                nextReview: now + 24 * 60 * 60 * 1000,
                interval: 1,
                easeFactor: Math.max(1.3, item.easeFactor - 0.2),
                repetitions: 0
              };
            }
          });

          return { reviewQueue };
        });
      },

      getDueReviews: () => {
        const state = get();
        const now = Date.now();
        return state.reviewQueue.filter((r) => r.nextReview <= now);
      },

      setActiveQuest: (quest) => {
        set({ activeQuest: quest });
      },

      updateQuestProgress: () => {
        set((state) => {
          if (!state.activeQuest) return state;

          const completedCount = state.activeQuest.challenges.filter((id) =>
            state.completedChallenges.includes(id)
          ).length;

          const progress = completedCount / state.activeQuest.challenges.length;

          if (progress >= 1) {
            // Quest complete!
            get().addXp(state.activeQuest.xpReward);
            get().addGold(state.activeQuest.goldReward);

            return {
              activeQuest: {
                ...state.activeQuest,
                completed: true,
                progress: 1
              }
            };
          }

          return {
            activeQuest: {
              ...state.activeQuest,
              progress
            }
          };
        });
      },

      updateStreak: () => {
        set((state) => {
          const today = new Date().toISOString().split('T')[0];
          const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

          if (state.lastPlayedDate === today) {
            return state; // Already played today
          }

          if (state.lastPlayedDate === yesterday) {
            // Consecutive day!
            return {
              currentStreak: state.currentStreak + 1,
              lastPlayedDate: today
            };
          }

          // Streak broken
          return {
            currentStreak: 1,
            lastPlayedDate: today
          };
        });
      },

      addPlayTime: (minutes) => {
        set((state) => ({
          totalPlayTime: state.totalPlayTime + minutes
        }));
      },

      completeTutorial: () => {
        set({ tutorialComplete: true });
      },

      resetGame: () => {
        set(getInitialState());
      },

      getEquippedEffects: () => {
        const state = get();
        const effects = {
          xpBoost: 0,
          goldBoost: 0,
          hints: 0,
          retries: 0
        };

        state.character.equippedItems.forEach((item) => {
          switch (item.effect.type) {
            case 'xp_boost':
              effects.xpBoost += item.effect.value;
              break;
            case 'gold_boost':
              effects.goldBoost += item.effect.value;
              break;
            case 'hint_reveal':
              effects.hints += item.effect.value;
              break;
            case 'second_chance':
              effects.retries += item.effect.value;
              break;
          }
        });

        return effects;
      }
    }),
    {
      name: 'codequest-game-storage',
      version: 1
    }
  )
);
