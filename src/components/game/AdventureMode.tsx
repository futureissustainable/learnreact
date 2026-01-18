'use client';

import { useGameStore } from '@/store/gameStore';
import { CHALLENGES, getRandomChallenge } from '@/data/challenges';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { CharacterPanel } from './CharacterPanel';
import {
  Lightning,
  Compass,
  MapTrifold,
  TrendUp,
  Trophy,
  Sparkle
} from '@phosphor-icons/react';

interface AdventureModeProps {
  onStartChallenge: (skillId: string) => void;
}

export function AdventureMode({ onStartChallenge }: AdventureModeProps) {
  const skills = useGameStore((state) => state.skills);
  const completedChallenges = useGameStore((state) => state.completedChallenges);

  // Get unlocked skills
  const unlockedSkills = skills.filter((s) => s.unlocked);

  // Find recommended skill (lowest level among unlocked)
  const recommendedSkill = unlockedSkills.reduce((lowest, skill) => {
    if (!lowest) return skill;
    return skill.level < lowest.level ? skill : lowest;
  }, unlockedSkills[0]);

  // Calculate overall progress
  const totalChallenges = CHALLENGES.length;
  const progressPercent = Math.round((completedChallenges.length / totalChallenges) * 100);

  // Get next milestone
  const milestones = [10, 25, 50, 75, 100];
  const nextMilestone = milestones.find((m) => m > progressPercent) || 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Quick Start */}
        <Card className="p-6 bg-gradient-to-r from-[#22223B] to-[#4A4E69] text-white">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Ready for a Challenge?</h2>
              <p className="text-[#C9ADA7] mb-4">
                Jump into a random challenge to earn XP and loot!
              </p>
              <Button
                onClick={() => recommendedSkill && onStartChallenge(recommendedSkill.id)}
                className="bg-[#FFD700] text-[#22223B] hover:bg-[#FFC700]"
              >
                <Lightning size={20} className="inline mr-2" />
                Quick Challenge
              </Button>
            </div>
            <Compass size={80} className="text-[#9A8C98] opacity-50 hidden sm:block" />
          </div>
        </Card>

        {/* Recommended Skills */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-[#22223B] mb-4 flex items-center gap-2">
            <Sparkle size={24} className="text-[#FFD700]" />
            Recommended Next Steps
          </h3>

          <div className="space-y-3">
            {unlockedSkills.slice(0, 4).map((skill) => (
              <button
                key={skill.id}
                onClick={() => onStartChallenge(skill.id)}
                className="w-full flex items-center justify-between p-4 rounded-lg border border-[#C9ADA7] hover:border-[#22223B] hover:bg-[#F2E9E4] transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#22223B] text-white flex items-center justify-center text-lg">
                    {skill.level}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-[#22223B]">{skill.name}</p>
                    <p className="text-xs text-[#4A4E69]">{skill.description}</p>
                  </div>
                </div>
                <Lightning size={24} className="text-[#4A4E69]" />
              </button>
            ))}
          </div>
        </Card>

        {/* Progress Overview */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-[#22223B] flex items-center gap-2">
              <TrendUp size={24} className="text-[#4ADE80]" />
              Your Progress
            </h3>
            <span className="text-sm text-[#4A4E69]">
              {completedChallenges.length} / {totalChallenges} challenges
            </span>
          </div>

          <ProgressBar
            value={completedChallenges.length}
            max={totalChallenges}
            color="green"
            size="lg"
          />

          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-[#4A4E69]">
              {progressPercent}% complete
            </span>
            <div className="flex items-center gap-2">
              <Trophy size={16} className="text-[#FFD700]" />
              <span className="text-[#4A4E69]">
                Next milestone: {nextMilestone}%
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <CharacterPanel />

        {/* Quick Stats */}
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-[#4A4E69] uppercase tracking-wide mb-3">
            Learning Stats
          </h3>
          <div className="space-y-2">
            <StatRow
              label="Skills Unlocked"
              value={`${unlockedSkills.length} / ${skills.length}`}
            />
            <StatRow
              label="Challenges Done"
              value={completedChallenges.length.toString()}
            />
            <StatRow
              label="Mastered Skills"
              value={skills.filter((s) => s.level >= s.maxLevel).length.toString()}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[#F2E9E4] last:border-0">
      <span className="text-sm text-[#4A4E69]">{label}</span>
      <span className="font-semibold text-[#22223B]">{value}</span>
    </div>
  );
}
