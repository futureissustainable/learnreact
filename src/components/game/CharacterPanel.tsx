'use client';

import { useGameStore } from '@/store/gameStore';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Card } from '@/components/ui/Card';
import {
  User,
  Star,
  Coin,
  Lightning,
  Brain,
  Target,
  Sparkle,
  Heart,
  Fire
} from '@phosphor-icons/react';

const classIcons = {
  'frontend-wizard': '🧙‍♂️',
  'react-ranger': '🏹',
  'fullstack-warrior': '⚔️',
  'ui-bard': '🎭'
};

const classNames = {
  'frontend-wizard': 'Frontend Wizard',
  'react-ranger': 'React Ranger',
  'fullstack-warrior': 'Fullstack Warrior',
  'ui-bard': 'UI Bard'
};

export function CharacterPanel() {
  const character = useGameStore((state) => state.character);
  const currentStreak = useGameStore((state) => state.currentStreak);

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#22223B] to-[#4A4E69] flex items-center justify-center text-3xl">
          {classIcons[character.class]}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-[#22223B]">{character.name}</h2>
          <p className="text-sm text-[#4A4E69]">{classNames[character.class]}</p>
          <div className="flex items-center gap-1 mt-1">
            <Star size={16} weight="fill" className="text-[#FFD700]" />
            <span className="text-sm font-semibold text-[#22223B]">Level {character.level}</span>
          </div>
        </div>
      </div>

      {/* XP Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-[#4A4E69] font-medium">Experience</span>
          <span className="text-xs text-[#22223B] font-bold">
            {character.xp} / {character.xpToNextLevel} XP
          </span>
        </div>
        <ProgressBar value={character.xp} max={character.xpToNextLevel} color="gold" size="lg" />
      </div>

      {/* Gold & Streak */}
      <div className="flex gap-4 mb-6">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F2E9E4]">
          <Coin size={20} weight="fill" className="text-[#FFD700]" />
          <span className="font-bold text-[#22223B]">{character.gold}</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F2E9E4]">
          <Fire size={20} weight="fill" className="text-[#F97316]" />
          <span className="font-bold text-[#22223B]">{currentStreak} day streak</span>
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-[#4A4E69] uppercase tracking-wide">Stats</h3>
        <div className="grid grid-cols-2 gap-3">
          <StatItem
            icon={<Brain size={18} className="text-[#A855F7]" />}
            label="Wisdom"
            value={character.stats.wisdom}
          />
          <StatItem
            icon={<Target size={18} className="text-[#3B82F6]" />}
            label="Focus"
            value={character.stats.focus}
          />
          <StatItem
            icon={<Sparkle size={18} className="text-[#F97316]" />}
            label="Creativity"
            value={character.stats.creativity}
          />
          <StatItem
            icon={<Heart size={18} className="text-[#4ADE80]" />}
            label="Persistence"
            value={character.stats.persistence}
          />
        </div>
      </div>
    </Card>
  );
}

function StatItem({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center gap-2 p-2 rounded-lg bg-[#F2E9E4]">
      {icon}
      <div className="flex-1">
        <span className="text-xs text-[#4A4E69]">{label}</span>
        <div className="font-bold text-[#22223B] text-sm">{value}</div>
      </div>
    </div>
  );
}
