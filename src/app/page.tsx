'use client';

import { useEffect, useState, useRef } from 'react';
import { useGameStore } from '@/store/gameStore';
import { CombatArea } from '@/components/game/CombatArea';
import { HeroPanel } from '@/components/game/HeroPanel';
import { CombatLog } from '@/components/game/CombatLog';
import { AbilitiesBar } from '@/components/game/AbilitiesBar';
import { ScriptsPanel } from '@/components/game/ScriptsPanel';
import { ZoneSelector } from '@/components/game/ZoneSelector';
import { InventoryPanel } from '@/components/game/InventoryPanel';
import { ConceptsPanel } from '@/components/game/ConceptsPanel';
import { GameHeader } from '@/components/game/GameHeader';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [heroName, setHeroName] = useState('');
  const [activeTab, setActiveTab] = useState<'combat' | 'inventory' | 'scripts' | 'concepts'>('combat');
  const gameLoopRef = useRef<number | null>(null);

  const initialized = useGameStore(s => s.initialized);
  const isAutoBattling = useGameStore(s => s.isAutoBattling);
  const initializeGame = useGameStore(s => s.initializeGame);
  const gameTick = useGameStore(s => s.gameTick);
  const startAutoBattle = useGameStore(s => s.startAutoBattle);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Game loop
  useEffect(() => {
    if (!mounted || !initialized) return;

    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
      lastTime = currentTime;

      gameTick(deltaTime);

      gameLoopRef.current = requestAnimationFrame(loop);
    };

    if (isAutoBattling) {
      gameLoopRef.current = requestAnimationFrame(loop);
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [mounted, initialized, isAutoBattling, gameTick]);

  // Loading state
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#22223B]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#F2E9E4] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#C9ADA7]">Loading CodeQuest...</p>
        </div>
      </div>
    );
  }

  // Character creation
  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-[#22223B] to-[#4A4E69]">
        <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#22223B] mb-2">CodeQuest</h1>
            <p className="text-[#4A4E69]">Learn JavaScript by automating your hero</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#4A4E69] mb-2">
                Hero Name
              </label>
              <input
                type="text"
                value={heroName}
                onChange={(e) => setHeroName(e.target.value)}
                placeholder="Enter your name..."
                maxLength={20}
                className="w-full px-4 py-3 rounded-lg border-2 border-[#C9ADA7] focus:border-[#22223B] outline-none text-[#22223B] text-lg"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && heroName.trim()) {
                    initializeGame(heroName.trim());
                    startAutoBattle();
                  }
                }}
              />
            </div>

            <button
              onClick={() => {
                if (heroName.trim()) {
                  initializeGame(heroName.trim());
                  startAutoBattle();
                }
              }}
              disabled={!heroName.trim()}
              className="w-full py-4 bg-[#22223B] text-white rounded-lg font-bold text-lg hover:bg-[#4A4E69] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Begin Adventure
            </button>
          </div>

          <div className="mt-8 text-center text-sm text-[#9A8C98]">
            <p>Kill mobs. Level up. Learn JavaScript.</p>
            <p className="mt-1">Your automation scripts are your power.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white">
      <GameHeader activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="container-page py-4">
        {activeTab === 'combat' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left Panel - Hero & Zone */}
            <div className="lg:col-span-3 space-y-4">
              <HeroPanel />
              <ZoneSelector />
            </div>

            {/* Center - Combat */}
            <div className="lg:col-span-6 space-y-4">
              <CombatArea />
              <AbilitiesBar />
              <CombatLog />
            </div>

            {/* Right Panel - Scripts */}
            <div className="lg:col-span-3">
              <ScriptsPanel />
            </div>
          </div>
        )}

        {activeTab === 'inventory' && <InventoryPanel />}
        {activeTab === 'scripts' && <ScriptsPanel fullWidth />}
        {activeTab === 'concepts' && <ConceptsPanel />}
      </main>
    </div>
  );
}
