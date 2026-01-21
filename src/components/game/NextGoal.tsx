'use client';

import { useGameStore } from '@/store/gameStore';
import { Target, Skull, Star, Lightning, MapPin, Coins } from '@phosphor-icons/react';

export function NextGoal() {
  const hero = useGameStore(s => s.hero);
  const currentZone = useGameStore(s => s.currentZone);
  const zones = useGameStore(s => s.zones);
  const concepts = useGameStore(s => s.concepts);
  const bossesDefeated = useGameStore(s => s.bossesDefeated);
  const killCount = useGameStore(s => s.killCount);
  const canBuyConcept = useGameStore(s => s.canBuyConcept);

  // Determine the next goal
  const getNextGoal = () => {
    // Check if boss is available and not defeated
    const zoneBossId = currentZone?.bossId;
    if (zoneBossId && !bossesDefeated.includes(zoneBossId)) {
      // Check if player is strong enough (rough heuristic)
      const bossReady = hero.level >= (currentZone?.level || 1) + 2;
      if (bossReady) {
        return {
          icon: Skull,
          title: 'Defeat the Boss',
          description: `Summon and defeat the zone boss to progress`,
          color: 'text-red-400',
          bgColor: 'bg-red-500/20',
          progress: null,
        };
      }
    }

    // Check for available concept to buy
    const nextConcept = concepts.find(c => {
      if (c.learned) return false;
      const prereqsMet = c.prerequisites.every(p =>
        concepts.find(cc => cc.id === p)?.learned
      );
      return prereqsMet;
    });

    if (nextConcept) {
      const canAfford = hero.gold >= nextConcept.goldCost;
      const progress = canAfford ? 100 : (hero.gold / nextConcept.goldCost) * 100;
      return {
        icon: canAfford ? Lightning : Coins,
        title: canAfford ? `Learn: ${nextConcept.name}` : `Save for: ${nextConcept.name}`,
        description: canAfford
          ? `Ready to buy! (${nextConcept.goldCost}g)`
          : `${hero.gold}/${nextConcept.goldCost} gold`,
        color: canAfford ? 'text-purple-400' : 'text-yellow-400',
        bgColor: canAfford ? 'bg-purple-500/20' : 'bg-yellow-500/20',
        progress,
      };
    }

    // Check if level up is close
    const xpProgress = (hero.xp / hero.xpToNextLevel) * 100;
    if (xpProgress > 50) {
      return {
        icon: Star,
        title: `Level Up to ${hero.level + 1}`,
        description: `${hero.xpToNextLevel - hero.xp} XP remaining`,
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/20',
        progress: xpProgress,
      };
    }

    // Check for next zone unlock
    const nextZone = zones.find(z => !z.unlocked);
    if (nextZone) {
      const requirements: string[] = [];
      if (nextZone.requiredLevel && hero.level < nextZone.requiredLevel) {
        requirements.push(`Reach level ${nextZone.requiredLevel}`);
      }
      if (nextZone.requiredBossKill && !bossesDefeated.includes(nextZone.requiredBossKill)) {
        requirements.push(`Defeat current boss`);
      }
      if (nextZone.requiredConcepts) {
        const missingConcepts = nextZone.requiredConcepts.filter(
          cid => !concepts.find(c => c.id === cid)?.learned
        );
        if (missingConcepts.length > 0) {
          requirements.push(`Learn required concepts`);
        }
      }

      return {
        icon: MapPin,
        title: `Unlock: ${nextZone.name}`,
        description: requirements[0] || 'Progress to unlock',
        color: 'text-cyan-400',
        bgColor: 'bg-cyan-500/20',
        progress: null,
      };
    }

    // Default: Just keep grinding
    return {
      icon: Target,
      title: 'Keep Battling',
      description: `${killCount} monsters defeated`,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      progress: null,
    };
  };

  const goal = getNextGoal();
  const Icon = goal.icon;

  return (
    <div className={`${goal.bgColor} rounded-lg p-3 border border-white/10`}>
      <div className="flex items-center gap-3">
        <div className={`${goal.color}`}>
          <Icon size={24} weight="fill" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-white/40">Next Goal</span>
          </div>
          <h4 className={`font-bold ${goal.color} truncate`}>{goal.title}</h4>
          <p className="text-xs text-white/60 truncate">{goal.description}</p>
        </div>
      </div>

      {goal.progress !== null && (
        <div className="mt-2">
          <div className="h-1.5 bg-black/30 rounded-full overflow-hidden">
            <div
              className={`h-full ${goal.color.replace('text-', 'bg-')} transition-all duration-300`}
              style={{ width: `${goal.progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
