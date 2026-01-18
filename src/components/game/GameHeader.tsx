'use client';

import { useGameStore } from '@/store/gameStore';
import {
  Star,
  Coin,
  Fire,
  Sword,
  BookOpen,
  Backpack,
  Brain,
  GearSix
} from '@phosphor-icons/react';

type TabType = 'adventure' | 'skills' | 'inventory' | 'review';

interface GameHeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function GameHeader({ activeTab, onTabChange }: GameHeaderProps) {
  const character = useGameStore((state) => state.character);
  const currentStreak = useGameStore((state) => state.currentStreak);
  const dueReviews = useGameStore((state) => state.getDueReviews());

  const tabs: { id: TabType; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'adventure', label: 'Adventure', icon: <Sword size={20} /> },
    { id: 'skills', label: 'Skills', icon: <BookOpen size={20} /> },
    { id: 'inventory', label: 'Inventory', icon: <Backpack size={20} /> },
    {
      id: 'review',
      label: 'Review',
      icon: <Brain size={20} />,
      badge: dueReviews.length || undefined
    }
  ];

  return (
    <header className="bg-white border-b border-[#C9ADA7] sticky top-0 z-40">
      <div className="container-page">
        {/* Top bar */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-[#22223B]">CodeQuest</h1>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F2E9E4]">
              <Star size={16} weight="fill" className="text-[#FFD700]" />
              <span className="font-semibold text-sm text-[#22223B]">
                Lv.{character.level}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F2E9E4]">
              <Coin size={16} weight="fill" className="text-[#FFD700]" />
              <span className="font-semibold text-sm text-[#22223B]">
                {character.gold}
              </span>
            </div>

            {currentStreak > 0 && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-100 to-red-100">
                <Fire size={16} weight="fill" className="text-[#F97316]" />
                <span className="font-semibold text-sm text-[#22223B]">
                  {currentStreak}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation tabs */}
        <nav className="flex gap-1 -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-3 font-medium text-sm
                border-b-2 transition-all relative
                ${
                  activeTab === tab.id
                    ? 'border-[#22223B] text-[#22223B]'
                    : 'border-transparent text-[#4A4E69] hover:text-[#22223B]'
                }
              `}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
              {tab.badge && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-[#A855F7] text-white text-xs font-bold rounded-full">
                  {tab.badge > 9 ? '9+' : tab.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
