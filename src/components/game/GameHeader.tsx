'use client';

import { useGameStore } from '@/store/gameStore';
import { Sword, Backpack, Code, BookOpen, Play, Pause } from '@phosphor-icons/react';

type TabType = 'combat' | 'inventory' | 'scripts' | 'concepts';

interface GameHeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function GameHeader({ activeTab, onTabChange }: GameHeaderProps) {
  const hero = useGameStore(s => s.hero);
  const killCount = useGameStore(s => s.killCount);
  const isAutoBattling = useGameStore(s => s.isAutoBattling);
  const isPaused = useGameStore(s => s.isPaused);
  const combatSpeed = useGameStore(s => s.combatSpeed);
  const startAutoBattle = useGameStore(s => s.startAutoBattle);
  const togglePause = useGameStore(s => s.togglePause);
  const setCombatSpeed = useGameStore(s => s.setCombatSpeed);

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'combat', label: 'Combat', icon: <Sword size={20} /> },
    { id: 'inventory', label: 'Inventory', icon: <Backpack size={20} /> },
    { id: 'scripts', label: 'Scripts', icon: <Code size={20} /> },
    { id: 'concepts', label: 'Learn', icon: <BookOpen size={20} /> }
  ];

  return (
    <header className="bg-[#22223B] border-b border-[#4A4E69] sticky top-0 z-50">
      <div className="container-page">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold text-white">CodeQuest</h1>
            <div className="hidden sm:flex items-center gap-4 text-sm">
              <span className="text-[#C9ADA7]">
                Lv.{hero.level} <span className="text-white font-medium">{hero.name}</span>
              </span>
              <span className="text-[#FFD700]">{hero.gold.toLocaleString()} gold</span>
              <span className="text-[#9A8C98]">{killCount.toLocaleString()} kills</span>
            </div>
          </div>

          <nav className="flex items-center gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  ${activeTab === tab.id ? 'bg-[#4A4E69] text-white' : 'text-[#9A8C98] hover:text-white hover:bg-[#4A4E69]/50'}`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-[#4A4E69] rounded-lg p-1">
              {[1, 2, 5].map(speed => (
                <button
                  key={speed}
                  onClick={() => setCombatSpeed(speed)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors
                    ${combatSpeed === speed ? 'bg-[#22223B] text-white' : 'text-[#9A8C98] hover:text-white'}`}
                >
                  {speed}x
                </button>
              ))}
            </div>
            <button
              onClick={() => isAutoBattling ? togglePause() : startAutoBattle()}
              className={`p-2 rounded-lg transition-colors
                ${isAutoBattling && !isPaused ? 'bg-green-600 hover:bg-green-700' : 'bg-[#4A4E69] hover:bg-[#5A5E79]'}`}
            >
              {isAutoBattling && !isPaused ? <Pause size={20} weight="fill" /> : <Play size={20} weight="fill" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
