'use client';

import { useState, useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import { Challenge } from '@/types/game';
import { getChallengesBySkill, getRandomChallenge, getChallengeById } from '@/data/challenges';

// Components
import { CharacterCreation } from '@/components/game/CharacterCreation';
import { GameHeader } from '@/components/game/GameHeader';
import { AdventureMode } from '@/components/game/AdventureMode';
import { SkillTree } from '@/components/game/SkillTree';
import { Inventory } from '@/components/game/Inventory';
import { ReviewMode } from '@/components/game/ReviewMode';
import { ChallengeModal } from '@/components/game/ChallengeModal';

type TabType = 'adventure' | 'skills' | 'inventory' | 'review';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('adventure');
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [currentSkillId, setCurrentSkillId] = useState<string>('');
  const [showCharacterCreation, setShowCharacterCreation] = useState(false);

  const tutorialComplete = useGameStore((state) => state.tutorialComplete);
  const updateStreak = useGameStore((state) => state.updateStreak);
  const updateReviewItem = useGameStore((state) => state.updateReviewItem);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update streak on mount
  useEffect(() => {
    if (mounted && tutorialComplete) {
      updateStreak();
    }
  }, [mounted, tutorialComplete, updateStreak]);

  // Show character creation for new players
  useEffect(() => {
    if (mounted && !tutorialComplete) {
      setShowCharacterCreation(true);
    }
  }, [mounted, tutorialComplete]);

  const handleStartChallenge = (skillId: string) => {
    const challenges = getChallengesBySkill(skillId);
    if (challenges.length === 0) {
      // Fallback to random challenge
      setCurrentChallenge(getRandomChallenge());
    } else {
      // Get a random challenge from available ones for this skill
      const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
      setCurrentChallenge(randomChallenge);
    }
    setCurrentSkillId(skillId);
  };

  const handleStartReview = (challengeId: string) => {
    const challenge = getChallengeById(challengeId);
    if (challenge) {
      setCurrentChallenge(challenge);
      // Find the skill for this challenge
      const skills = useGameStore.getState().skills;
      const skill = skills.find(s => s.category === challenge.skillCategory);
      setCurrentSkillId(skill?.id || '');
    }
  };

  const handleChallengeComplete = () => {
    if (currentChallenge) {
      // Update review item if this was a review
      const reviewQueue = useGameStore.getState().reviewQueue;
      const isReview = reviewQueue.some(r => r.challengeId === currentChallenge.id);
      if (isReview) {
        updateReviewItem(currentChallenge.id, true);
      }
    }
    setCurrentChallenge(null);
    setCurrentSkillId('');
  };

  // Loading state for hydration
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F2E9E4]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#22223B] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#4A4E69]">Loading CodeQuest...</p>
        </div>
      </div>
    );
  }

  // Character creation for new players
  if (showCharacterCreation) {
    return (
      <CharacterCreation
        onComplete={() => {
          setShowCharacterCreation(false);
          useGameStore.getState().completeTutorial();
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F2E9E4]">
      <GameHeader activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="container-page py-6">
        {activeTab === 'adventure' && (
          <AdventureMode onStartChallenge={handleStartChallenge} />
        )}

        {activeTab === 'skills' && (
          <SkillTree onStartChallenge={handleStartChallenge} />
        )}

        {activeTab === 'inventory' && <Inventory />}

        {activeTab === 'review' && (
          <ReviewMode onStartReview={handleStartReview} />
        )}
      </main>

      {/* Challenge Modal */}
      <ChallengeModal
        challenge={currentChallenge}
        skillId={currentSkillId}
        onClose={() => {
          setCurrentChallenge(null);
          setCurrentSkillId('');
        }}
        onComplete={handleChallengeComplete}
      />
    </div>
  );
}
