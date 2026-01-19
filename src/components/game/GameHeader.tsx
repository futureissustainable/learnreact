'use client';

import { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { Sword, Backpack, Code, BookOpen, Play, Pause, ArrowCounterClockwise, Storefront } from '@phosphor-icons/react';

type TabType = 'combat' | 'inventory' | 'shop' | 'scripts' | 'concepts';

interface GameHeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function GameHeader({ activeTab, onTabChange }: GameHeaderProps) {
  const [showReset, setShowReset] = useState(false);

  const hero = useGameStore(s => s.hero);
  const killCount = useGameStore(s => s.killCount);
  const isAutoBattling = useGameStore(s => s.isAutoBattling);
  const isPaused = useGameStore(s => s.isPaused);
  const combatSpeed = useGameStore(s => s.combatSpeed);
  const startAutoBattle = useGameStore(s => s.startAutoBattle);
  const togglePause = useGameStore(s => s.togglePause);
  const setCombatSpeed = useGameStore(s => s.setCombatSpeed);
  const resetGame = useGameStore(s => s.resetGame);

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'combat', label: 'Combat', icon: <Sword size={18} /> },
    { id: 'inventory', label: 'Inventory', icon: <Backpack size={18} /> },
    { id: 'shop', label: 'Shop', icon: <Storefront size={18} /> },
    { id: 'scripts', label: 'Scripts', icon: <Code size={18} /> },
    { id: 'concepts', label: 'Learn', icon: <BookOpen size={18} /> }
  ];

  const handleReset = () => {
    resetGame();
    setShowReset(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('codequest-game');
    }
    window.location.reload();
  };

  return (
    <header className="bg-[#1e1e2e] border-b border-[#313244] sticky top-0 z-50">
      <div className="container-page">
        <div className="flex items-center justify-between h-12">
          {/* Logo & Stats */}
          <div className="flex items-center gap-6">
            <h1 className="text-lg font-semibold text-[#cdd6f4]">CodeQuest</h1>
            <div className="hidden sm:flex items-center gap-4 text-sm text-[#6c7086]">
              <span>Lv.{hero.level} <span className="text-[#cdd6f4]">{hero.name}</span></span>
              <span className="text-[#f9e2af]">{hero.gold.toLocaleString()}g</span>
              <span className="text-[#a6e3a1]">{killCount} kills</span>
            </div>
          </div>

          {/* Tabs */}
          <nav className="flex items-center gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors
                  ${activeTab === tab.id
                    ? 'bg-[#313244] text-[#cdd6f4]'
                    : 'text-[#6c7086] hover:text-[#cdd6f4] hover:bg-[#313244]/50'
                  }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Speed */}
            <div className="flex items-center gap-0.5 bg-[#181825] rounded-lg p-0.5">
              {[1, 2, 5].map(speed => (
                <button
                  key={speed}
                  onClick={() => setCombatSpeed(speed)}
                  className={`px-2 py-1 rounded text-xs transition-colors
                    ${combatSpeed === speed
                      ? 'bg-[#313244] text-[#cdd6f4]'
                      : 'text-[#6c7086] hover:text-[#cdd6f4]'
                    }`}
                >
                  {speed}x
                </button>
              ))}
            </div>

            {/* Play/Pause */}
            <button
              onClick={() => isAutoBattling ? togglePause() : startAutoBattle()}
              className={`p-2 rounded-lg transition-colors ${
                isAutoBattling && !isPaused
                  ? 'bg-[#a6e3a1] text-[#1e1e2e]'
                  : 'bg-[#313244] text-[#cdd6f4] hover:bg-[#45475a]'
              }`}
            >
              {isAutoBattling && !isPaused ? <Pause size={16} weight="fill" /> : <Play size={16} weight="fill" />}
            </button>

            {/* Reset */}
            <div className="relative">
              <button
                onClick={() => setShowReset(!showReset)}
                className="p-2 rounded-lg bg-[#313244] text-[#6c7086] hover:text-[#cdd6f4] transition-colors"
              >
                <ArrowCounterClockwise size={16} />
              </button>

              {showReset && (
                <div className="absolute right-0 top-full mt-2 w-48 p-3 bg-[#181825] rounded-lg border border-[#313244] shadow-xl z-50">
                  <p className="text-xs text-[#a6adc8] mb-2">Reset all progress?</p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleReset}
                      className="flex-1 py-1.5 bg-[#f38ba8] text-[#1e1e2e] rounded text-xs font-medium"
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => setShowReset(false)}
                      className="flex-1 py-1.5 bg-[#313244] text-[#cdd6f4] rounded text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
