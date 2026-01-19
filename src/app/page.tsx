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
import { Onboarding } from '@/components/game/Onboarding';
import { NextGoal } from '@/components/game/NextGoal';
import { Notifications } from '@/components/game/Notifications';

export default function Home() {
  const [mounted, setMounted] = useState(false);
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

  // Handle onboarding completion
  const handleOnboardingComplete = (heroName: string) => {
    initializeGame(heroName);
    startAutoBattle();
  };

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

  // Onboarding for new players
  if (!initialized) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white">
      {/* Notifications overlay */}
      <Notifications />

      <GameHeader activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="container-page py-4">
        {activeTab === 'combat' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left Panel - Hero & Zone */}
            <div className="lg:col-span-3 space-y-4">
              <HeroPanel />
              <NextGoal />
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
