'use client';

import { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { Skill, SkillCategory } from '@/types/game';
import { CATEGORY_NAMES } from '@/data/skills';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import {
  Lock,
  CheckCircle,
  Lightning,
  Code,
  PaintBrush,
  GridFour,
  Cube,
  MathOperations,
  BracketsCurly,
  List,
  Package,
  Tree,
  Cursor,
  Handshake,
  Clock,
  CloudArrowDown,
  PuzzlePiece,
  Terminal,
  ArrowsDownUp,
  Database,
  ShareNetwork,
  Funnel,
  ArrowUp,
  Note,
  SignOut,
  HardDrive
} from '@phosphor-icons/react';

const iconMap: Record<string, React.ReactNode> = {
  Code: <Code size={24} />,
  PaintBrush: <PaintBrush size={24} />,
  GridFour: <GridFour size={24} />,
  Cube: <Cube size={24} />,
  MathOperations: <MathOperations size={24} />,
  Function: <Code size={24} />,
  BracketsCurly: <BracketsCurly size={24} />,
  List: <List size={24} />,
  Package: <Package size={24} />,
  Tree: <Tree size={24} />,
  Cursor: <Cursor size={24} />,
  Handshake: <Handshake size={24} />,
  Clock: <Clock size={24} />,
  CloudArrowDown: <CloudArrowDown size={24} />,
  Puzzle: <PuzzlePiece size={24} />,
  CodeBlock: <Terminal size={24} />,
  ArrowsDownUp: <ArrowsDownUp size={24} />,
  Database: <Database size={24} />,
  Lightning: <Lightning size={24} />,
  ShareNetwork: <ShareNetwork size={24} />,
  FunnelSimple: <Funnel size={24} />,
  ArrowUp: <ArrowUp size={24} />,
  Blueprint: <Note size={24} />,
  Signpost: <SignOut size={24} />,
  Server: <HardDrive size={24} />
};

interface SkillTreeProps {
  onStartChallenge: (skillId: string) => void;
}

export function SkillTree({ onStartChallenge }: SkillTreeProps) {
  const skills = useGameStore((state) => state.skills);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  // Group skills by category
  const categories = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<SkillCategory, Skill[]>);

  const categoryOrder: SkillCategory[] = [
    'html-css',
    'js-fundamentals',
    'js-functions',
    'js-arrays',
    'js-dom',
    'js-async',
    'react-basics',
    'react-hooks',
    'react-state',
    'nextjs'
  ];

  return (
    <>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[#22223B]">Skill Tree</h2>
        <p className="text-[#4A4E69]">
          Master skills to unlock new challenges. Complete challenges to level up skills.
        </p>

        <div className="space-y-8">
          {categoryOrder.map((category) => {
            const categorySkills = categories[category];
            if (!categorySkills) return null;

            return (
              <div key={category}>
                <h3 className="text-lg font-bold text-[#22223B] mb-4">
                  {CATEGORY_NAMES[category]}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {categorySkills.map((skill) => (
                    <SkillCard
                      key={skill.id}
                      skill={skill}
                      onClick={() => setSelectedSkill(skill)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Skill Detail Modal */}
      <Modal
        isOpen={!!selectedSkill}
        onClose={() => setSelectedSkill(null)}
        title={selectedSkill?.name}
        size="md"
      >
        {selectedSkill && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div
                className={`w-16 h-16 rounded-xl flex items-center justify-center text-white ${
                  selectedSkill.unlocked
                    ? 'bg-gradient-to-br from-[#22223B] to-[#4A4E69]'
                    : 'bg-[#9A8C98]'
                }`}
              >
                {iconMap[selectedSkill.icon] || <Code size={24} />}
              </div>
              <div>
                <p className="text-[#4A4E69]">{selectedSkill.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm font-semibold text-[#22223B]">
                    Level {selectedSkill.level} / {selectedSkill.maxLevel}
                  </span>
                </div>
              </div>
            </div>

            {selectedSkill.unlocked && selectedSkill.level < selectedSkill.maxLevel && (
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[#4A4E69]">Progress to next level</span>
                  <span className="font-semibold text-[#22223B]">
                    {selectedSkill.currentXp} / {selectedSkill.xpRequired} XP
                  </span>
                </div>
                <ProgressBar
                  value={selectedSkill.currentXp}
                  max={selectedSkill.xpRequired}
                  color="blue"
                  size="lg"
                />
              </div>
            )}

            {!selectedSkill.unlocked && (
              <div className="p-4 bg-[#F2E9E4] rounded-lg">
                <p className="text-sm text-[#4A4E69]">
                  <Lock size={16} className="inline mr-2" />
                  Complete prerequisite skills to unlock
                </p>
              </div>
            )}

            {selectedSkill.unlocked && (
              <Button
                onClick={() => {
                  onStartChallenge(selectedSkill.id);
                  setSelectedSkill(null);
                }}
                className="w-full"
                size="lg"
              >
                <Lightning size={20} className="inline mr-2" />
                Start Challenge
              </Button>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}

function SkillCard({ skill, onClick }: { skill: Skill; onClick: () => void }) {
  const isMaxed = skill.level >= skill.maxLevel;
  const progress = (skill.currentXp / skill.xpRequired) * 100;

  return (
    <Card
      className={`cursor-pointer transition-all ${
        skill.unlocked
          ? 'hover:scale-[1.02]'
          : 'opacity-60 cursor-not-allowed'
      }`}
      onClick={skill.unlocked ? onClick : undefined}
      hoverable={skill.unlocked}
    >
      <div className="flex flex-col items-center text-center">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
            isMaxed
              ? 'bg-gradient-to-br from-[#FFD700] to-[#F97316] text-white'
              : skill.unlocked
                ? 'bg-gradient-to-br from-[#22223B] to-[#4A4E69] text-white'
                : 'bg-[#C9ADA7] text-[#4A4E69]'
          }`}
        >
          {!skill.unlocked ? (
            <Lock size={24} />
          ) : isMaxed ? (
            <CheckCircle size={24} weight="fill" />
          ) : (
            iconMap[skill.icon] || <Code size={24} />
          )}
        </div>

        <h4 className="font-semibold text-sm text-[#22223B] mb-1">{skill.name}</h4>

        <div className="text-xs text-[#4A4E69] mb-2">
          Lv. {skill.level} / {skill.maxLevel}
        </div>

        {skill.unlocked && !isMaxed && (
          <div className="w-full">
            <ProgressBar value={skill.currentXp} max={skill.xpRequired} color="blue" size="sm" />
          </div>
        )}
      </div>
    </Card>
  );
}
