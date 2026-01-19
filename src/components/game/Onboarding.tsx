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
    description: 'Your hero fights automatically. Watch them slay bugs and code monsters!',
    color: '#f38ba8',
  },
  {
    icon: Robot,
    title: 'Write Automation Scripts',
    description: 'Create JavaScript scripts that control your hero. "If HP < 50%, heal()"',
    color: '#89b4fa',
  },
  {
    icon: Lightning,
    title: 'Unlock Abilities',
    description: 'Learn JS concepts to unlock powers: console.log(), if/else, .map()!',
    color: '#f9e2af',
  },
  {
    icon: Trophy,
    title: 'Defeat Bosses',
    description: 'Each zone has a boss. Beat them to unlock new areas!',
    color: '#cba6f7',
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
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#11111b]">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[#1e1e2e] border border-[#313244] mb-4">
              <Code size={32} weight="bold" className="text-[#89b4fa]" />
            </div>
            <h1 className="text-3xl font-bold text-[#cdd6f4] mb-2">CodeQuest</h1>
            <p className="text-[#6c7086]">Your JavaScript Adventure</p>
          </div>

          {/* Name Input */}
          <div className="bg-[#1e1e2e] rounded-xl p-6 border border-[#313244]">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap size={20} className="text-[#f9e2af]" />
              <h2 className="text-lg font-semibold text-[#cdd6f4]">Name Your Hero</h2>
            </div>

            <input
              type="text"
              value={heroName}
              onChange={(e) => setHeroName(e.target.value)}
              placeholder="Enter hero name..."
              maxLength={20}
              autoFocus
              className="w-full px-4 py-3 rounded-lg bg-[#181825] border border-[#313244] focus:border-[#89b4fa] outline-none text-[#cdd6f4] placeholder:text-[#6c7086] transition-colors"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleStart();
              }}
            />

            <button
              onClick={handleStart}
              disabled={!heroName.trim()}
              className="w-full mt-4 py-3 bg-[#89b4fa] text-[#1e1e2e] rounded-lg font-semibold hover:bg-[#89b4fa]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Sparkle size={18} weight="fill" />
              Begin Adventure
            </button>
          </div>

          {/* Tip */}
          <div className="mt-4 text-center text-sm text-[#6c7086]">
            <Lightning size={14} className="inline mr-1" />
            Tip: Scripts are your greatest power!
          </div>
        </div>
      </div>
    );
  }

  const currentStep = STEPS[step];
  const Icon = currentStep.icon;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#11111b]">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="flex justify-center gap-2 mb-8">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === step ? 'w-8 bg-[#89b4fa]' : i < step ? 'w-2 bg-[#89b4fa]/50' : 'w-2 bg-[#313244]'
              }`}
            />
          ))}
        </div>

        {/* Card */}
        <div className="bg-[#1e1e2e] rounded-xl p-8 border border-[#313244]">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div
              className="w-20 h-20 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${currentStep.color}20` }}
            >
              <Icon size={40} weight="fill" style={{ color: currentStep.color }} />
            </div>
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-[#cdd6f4] mb-3">{currentStep.title}</h2>
            <p className="text-[#a6adc8]">{currentStep.description}</p>
          </div>

          {/* Button */}
          <button
            onClick={handleNext}
            className="w-full py-3 bg-[#313244] text-[#cdd6f4] rounded-lg font-semibold hover:bg-[#45475a] transition-colors flex items-center justify-center gap-2"
          >
            {step === STEPS.length - 1 ? 'Create Hero' : 'Next'}
            <ArrowRight size={18} weight="bold" />
          </button>
        </div>

        {/* Skip */}
        <button
          onClick={() => setIsNaming(true)}
          className="w-full mt-4 py-2 text-[#6c7086] hover:text-[#cdd6f4] transition-colors text-sm"
        >
          Skip Tutorial
        </button>
      </div>
    </div>
  );
}
