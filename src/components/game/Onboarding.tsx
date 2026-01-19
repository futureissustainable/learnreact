'use client';

import { useState } from 'react';
import {
  Sword,
  Lightning,
  Code,
  Trophy,
  ArrowRight,
  Sparkle,
  Robot,
  GraduationCap
} from '@phosphor-icons/react';

interface OnboardingProps {
  onComplete: (heroName: string) => void;
}

const STEPS = [
  {
    icon: Sword,
    title: 'Auto-Battle Monsters',
    description: 'Your hero fights automatically. Watch them slay bugs, errors, and code monsters!',
    color: 'from-red-500 to-orange-500',
  },
  {
    icon: Robot,
    title: 'Write Automation Scripts',
    description: 'Create JavaScript-style scripts that control your hero. "If HP < 50%, heal()"',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Lightning,
    title: 'Unlock Abilities',
    description: 'Learn JS concepts to unlock powers: console.log(), if/else, for loops, .map()!',
    color: 'from-yellow-500 to-amber-500',
  },
  {
    icon: Trophy,
    title: 'Defeat Bosses',
    description: 'Each zone has a boss. Beat "The Undefined" to unlock "Loop Caverns"!',
    color: 'from-purple-500 to-pink-500',
  },
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [heroName, setHeroName] = useState('');
  const [isNaming, setIsNaming] = useState(false);

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      setIsNaming(true);
    }
  };

  const handleStart = () => {
    if (heroName.trim()) {
      onComplete(heroName.trim());
    }
  };

  if (isNaming) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-[#22223B] via-[#22223B] to-[#4A4E69]">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FFD700] to-[#FFA500] mb-4 shadow-lg shadow-amber-500/20">
              <Code size={40} weight="bold" className="text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">CodeQuest</h1>
            <p className="text-[#9A8C98]">Your JavaScript Adventure Awaits</p>
          </div>

          {/* Name Input */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap size={24} className="text-[#FFD700]" />
              <h2 className="text-xl font-bold text-white">Name Your Hero</h2>
            </div>

            <input
              type="text"
              value={heroName}
              onChange={(e) => setHeroName(e.target.value)}
              placeholder="Enter your hero's name..."
              maxLength={20}
              autoFocus
              className="w-full px-4 py-4 rounded-xl bg-white/10 border-2 border-white/20 focus:border-[#FFD700] outline-none text-white text-lg placeholder:text-white/40 transition-colors"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleStart();
              }}
            />

            <button
              onClick={handleStart}
              disabled={!heroName.trim()}
              className="w-full mt-6 py-4 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#22223B] rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-amber-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Sparkle size={20} weight="fill" />
              Begin Adventure
            </button>
          </div>

          {/* Quick Tips */}
          <div className="mt-6 text-center text-sm text-[#9A8C98]">
            <p>💡 Tip: Your automation scripts are your greatest power!</p>
          </div>
        </div>
      </div>
    );
  }

  const currentStep = STEPS[step];
  const Icon = currentStep.icon;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-[#22223B] via-[#22223B] to-[#4A4E69]">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="flex justify-center gap-2 mb-8">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === step ? 'w-8 bg-[#FFD700]' : i < step ? 'w-2 bg-[#FFD700]/60' : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${currentStep.color} flex items-center justify-center shadow-lg`}>
              <Icon size={48} weight="fill" className="text-white" />
            </div>
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">{currentStep.title}</h2>
            <p className="text-[#C9ADA7] text-lg leading-relaxed">{currentStep.description}</p>
          </div>

          {/* Button */}
          <button
            onClick={handleNext}
            className="w-full py-4 bg-white text-[#22223B] rounded-xl font-bold text-lg hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
          >
            {step === STEPS.length - 1 ? 'Create Hero' : 'Next'}
            <ArrowRight size={20} weight="bold" />
          </button>
        </div>

        {/* Skip */}
        <button
          onClick={() => setIsNaming(true)}
          className="w-full mt-4 py-2 text-[#9A8C98] hover:text-white transition-colors text-sm"
        >
          Skip Tutorial
        </button>
      </div>
    </div>
  );
}
