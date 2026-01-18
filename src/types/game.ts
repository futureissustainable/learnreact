// Game Types for CodeQuest RPG

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

export type SkillCategory =
  | 'html-css'
  | 'js-fundamentals'
  | 'js-functions'
  | 'js-arrays'
  | 'js-async'
  | 'js-dom'
  | 'react-basics'
  | 'react-hooks'
  | 'react-state'
  | 'nextjs';

export type ChallengeType = 'multiple-choice' | 'code-completion' | 'parsons' | 'debug';

export interface Item {
  id: string;
  name: string;
  description: string;
  rarity: Rarity;
  icon: string;
  effect: ItemEffect;
  equipped?: boolean;
}

export interface ItemEffect {
  type: 'xp_boost' | 'hint_reveal' | 'time_extend' | 'second_chance' | 'gold_boost';
  value: number;
  duration?: number; // in challenges
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  category: SkillCategory;
  level: number;
  maxLevel: number;
  xpRequired: number;
  currentXp: number;
  icon: string;
  unlocked: boolean;
  prerequisiteIds: string[];
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  skillCategory: SkillCategory;
  difficulty: 1 | 2 | 3 | 4 | 5;
  type: ChallengeType;
  xpReward: number;
  goldReward: number;
  content: ChallengeContent;
  hint?: string;
  explanation: string;
  tags: string[];
}

export interface ChallengeContent {
  // For multiple choice
  question?: string;
  options?: string[];
  correctIndex?: number;

  // For code completion
  codeTemplate?: string;
  blanks?: { placeholder: string; answer: string }[];

  // For parsons problems
  shuffledLines?: string[];
  correctOrder?: number[];

  // For debug challenges
  buggyCode?: string;
  expectedOutput?: string;
  correctCode?: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  skillCategory: SkillCategory;
  challenges: string[]; // Challenge IDs
  xpReward: number;
  goldReward: number;
  itemReward?: string; // Item ID
  completed: boolean;
  progress: number;
}

export interface Character {
  name: string;
  class: CharacterClass;
  level: number;
  xp: number;
  xpToNextLevel: number;
  gold: number;
  stats: CharacterStats;
  inventory: Item[];
  equippedItems: Item[];
  achievements: string[];
}

export type CharacterClass = 'frontend-wizard' | 'react-ranger' | 'fullstack-warrior' | 'ui-bard';

export interface CharacterStats {
  wisdom: number;     // Increases hint effectiveness
  focus: number;      // Reduces time pressure penalties
  creativity: number; // Bonus XP for creative solutions
  persistence: number; // Retry bonuses
}

export interface ReviewItem {
  challengeId: string;
  lastReviewed: number;
  nextReview: number;
  interval: number; // days
  easeFactor: number;
  repetitions: number;
}

export interface GameState {
  character: Character;
  skills: Skill[];
  completedChallenges: string[];
  currentStreak: number;
  lastPlayedDate: string;
  reviewQueue: ReviewItem[];
  activeQuest?: Quest;
  tutorialComplete: boolean;
  totalPlayTime: number; // minutes
}

export interface ChallengeResult {
  correct: boolean;
  xpEarned: number;
  goldEarned: number;
  itemDropped?: Item;
  skillProgress?: { skillId: string; xpGained: number };
  streakBonus?: number;
  message: string;
}

// Rarity drop rates
export const RARITY_DROP_RATES: Record<Rarity, number> = {
  common: 0.6,
  rare: 0.25,
  epic: 0.12,
  legendary: 0.03
};

// XP curve
export const calculateXpForLevel = (level: number): number => {
  return Math.floor(100 * Math.pow(1.5, level - 1));
};

// Spaced repetition intervals (in days)
export const SR_INTERVALS = [1, 3, 7, 14, 30, 60];
