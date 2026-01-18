'use client';

import { useState } from 'react';
import { CharacterClass } from '@/types/game';
import { useGameStore } from '@/store/gameStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Sword, ArrowRight } from '@phosphor-icons/react';

const classes: {
  id: CharacterClass;
  name: string;
  description: string;
  icon: string;
  bonusStat: string;
  color: string;
}[] = [
  {
    id: 'frontend-wizard',
    name: 'Frontend Wizard',
    description: 'Masters of UI magic. Bonus hints reveal deeper understanding.',
    icon: '🧙‍♂️',
    bonusStat: '+2 Wisdom',
    color: 'from-purple-500 to-indigo-600'
  },
  {
    id: 'react-ranger',
    name: 'React Ranger',
    description: 'Swift and focused. Less time pressure on challenges.',
    icon: '🏹',
    bonusStat: '+2 Focus',
    color: 'from-green-500 to-teal-600'
  },
  {
    id: 'fullstack-warrior',
    name: 'Fullstack Warrior',
    description: 'Never gives up. Bonus retries on difficult challenges.',
    icon: '⚔️',
    bonusStat: '+2 Persistence',
    color: 'from-red-500 to-orange-600'
  },
  {
    id: 'ui-bard',
    name: 'UI Bard',
    description: 'Creative problem solver. Bonus XP for elegant solutions.',
    icon: '🎭',
    bonusStat: '+2 Creativity',
    color: 'from-pink-500 to-rose-600'
  }
];

interface CharacterCreationProps {
  onComplete: () => void;
}

export function CharacterCreation({ onComplete }: CharacterCreationProps) {
  const [name, setName] = useState('');
  const [selectedClass, setSelectedClass] = useState<CharacterClass | null>(null);
  const [step, setStep] = useState<'name' | 'class'>('name');

  const initializeCharacter = useGameStore((state) => state.initializeCharacter);

  const handleCreate = () => {
    if (!name.trim() || !selectedClass) return;
    initializeCharacter(name.trim(), selectedClass);
    onComplete();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-[#22223B] to-[#4A4E69]">
      <Card className="w-full max-w-2xl p-8">
        {step === 'name' ? (
          <div className="space-y-6 animate-pop-in">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-[#22223B] mb-2">
                Welcome, Developer
              </h1>
              <p className="text-[#4A4E69]">
                Your journey to master JavaScript and React begins here.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#4A4E69] mb-2">
                  What shall we call you?
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name..."
                  maxLength={20}
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#C9ADA7] focus:border-[#22223B] outline-none text-[#22223B] text-lg"
                />
              </div>

              <Button
                onClick={() => setStep('class')}
                disabled={!name.trim()}
                className="w-full"
                size="lg"
              >
                Continue
                <ArrowRight size={20} className="inline ml-2" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-pop-in">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-[#22223B] mb-2">
                Choose Your Class
              </h1>
              <p className="text-[#4A4E69]">
                Each class has unique bonuses that match different learning styles.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {classes.map((cls) => (
                <button
                  key={cls.id}
                  onClick={() => setSelectedClass(cls.id)}
                  className={`
                    p-4 rounded-xl border-2 text-left transition-all
                    ${
                      selectedClass === cls.id
                        ? 'border-[#22223B] bg-[#F2E9E4] scale-[1.02]'
                        : 'border-[#C9ADA7] hover:border-[#9A8C98]'
                    }
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cls.color} flex items-center justify-center text-2xl`}
                    >
                      {cls.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-[#22223B]">{cls.name}</h3>
                      <p className="text-xs text-[#4A4E69] mt-1">
                        {cls.description}
                      </p>
                      <p className="text-xs font-semibold text-[#A855F7] mt-2">
                        {cls.bonusStat}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setStep('name')}
                variant="secondary"
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleCreate}
                disabled={!selectedClass}
                className="flex-1"
              >
                Begin Adventure
                <Sword size={20} className="inline ml-2" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
