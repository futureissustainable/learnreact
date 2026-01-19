'use client';

import { useGameStore } from '@/store/gameStore';
import { CheckCircle, Lock, Lightning, BookOpen, Code, TrendUp, Sparkle } from '@phosphor-icons/react';

export function ConceptsPanel() {
  const concepts = useGameStore(s => s.concepts);
  const hero = useGameStore(s => s.hero);

  const categories = [
    { id: 'variables', name: 'Variables', color: 'from-blue-600 to-blue-400', icon: '📦' },
    { id: 'conditionals', name: 'Conditionals', color: 'from-green-600 to-green-400', icon: '🔀' },
    { id: 'loops', name: 'Loops', color: 'from-yellow-600 to-yellow-400', icon: '🔄' },
    { id: 'functions', name: 'Functions', color: 'from-purple-600 to-purple-400', icon: '⚡' },
    { id: 'arrays', name: 'Arrays', color: 'from-pink-600 to-pink-400', icon: '📚' },
    { id: 'objects', name: 'Objects', color: 'from-orange-600 to-orange-400', icon: '🎯' },
    { id: 'async', name: 'Async', color: 'from-cyan-600 to-cyan-400', icon: '⏳' },
    { id: 'react', name: 'React', color: 'from-sky-600 to-sky-400', icon: '⚛️' }
  ];

  const learnedCount = concepts.filter(c => c.learned).length;
  const totalStatBonus = concepts
    .filter(c => c.learned)
    .reduce((acc, c) => {
      Object.entries(c.statBonus).forEach(([key, val]) => {
        acc[key] = (acc[key] || 0) + (val as number);
      });
      return acc;
    }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Overview Header */}
      <div className="bg-gradient-to-br from-[#22223B] to-[#4A4E69]/50 rounded-xl p-6 border border-purple-500/20">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Code size={28} weight="bold" className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">JavaScript Journey</h2>
            <p className="text-[#9A8C98]">Master concepts to unlock powers and become stronger</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[#9A8C98]">Overall Progress</span>
            <span className="text-lg font-bold text-white">{learnedCount}/{concepts.length} Concepts</span>
          </div>
          <div className="h-4 bg-black/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 transition-all duration-500 relative"
              style={{ width: `${(learnedCount / concepts.length) * 100}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
              {learnedCount > 0 && (
                <div className="absolute right-1 top-1/2 -translate-y-1/2">
                  <Sparkle size={12} weight="fill" className="text-white animate-pulse" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stat Bonuses from Learning */}
        {Object.keys(totalStatBonus).length > 0 && (
          <div className="bg-black/20 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <TrendUp size={16} className="text-green-400" />
              <span className="text-xs text-green-400 font-medium">BONUSES FROM LEARNING</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(totalStatBonus).map(([stat, value]) => (
                <span key={stat} className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">
                  +{typeof value === 'number' && value < 1 ? `${(value * 100).toFixed(0)}%` : value} {stat}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Active Learning */}
      {(() => {
        const activeConcept = concepts.find(c => {
          if (c.learned) return false;
          return c.prerequisites.every(p => concepts.find(cc => cc.id === p)?.learned);
        });

        if (!activeConcept) return null;

        const progress = (activeConcept.currentXp / activeConcept.xpToLearn) * 100;
        const category = categories.find(cat => cat.id === activeConcept.category);

        return (
          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-5 border border-purple-500/30">
            <div className="flex items-center gap-2 mb-3">
              <Lightning size={20} weight="fill" className="text-purple-400" />
              <span className="text-sm font-bold text-purple-400">NOW LEARNING</span>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-4xl">{category?.icon}</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">{activeConcept.name}</h3>
                <p className="text-sm text-[#C9ADA7] mt-1">{activeConcept.description}</p>

                {/* Progress */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#9A8C98]">XP Progress</span>
                    <span className="text-white font-medium">{activeConcept.currentXp} / {activeConcept.xpToLearn}</span>
                  </div>
                  <div className="h-3 bg-black/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Tasks */}
                <div className="mt-4 space-y-2">
                  {activeConcept.learnByDoing.map(task => (
                    <div
                      key={task.id}
                      className={`flex items-center gap-2 text-sm ${task.completed ? 'text-green-400' : 'text-[#9A8C98]'}`}
                    >
                      {task.completed ? (
                        <CheckCircle size={16} weight="fill" className="text-green-400" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-current" />
                      )}
                      <span className="flex-1">{task.description}</span>
                      <span className="font-mono text-xs">{task.current}/{task.target}</span>
                    </div>
                  ))}
                </div>

                {/* Rewards Preview */}
                {activeConcept.unlocksAbilities.length > 0 && (
                  <div className="mt-4 p-3 bg-amber-500/10 rounded-lg border border-amber-500/30">
                    <span className="text-xs text-amber-400 font-medium">🎁 REWARD: </span>
                    <span className="text-amber-400">
                      Unlock <span className="font-bold">{activeConcept.unlocksAbilities.join(', ')}</span> ability!
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* All Concepts by Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map(category => {
          const categoryConcepts = concepts.filter(c => c.category === category.id);
          if (categoryConcepts.length === 0) return null;

          const learnedInCategory = categoryConcepts.filter(c => c.learned).length;

          return (
            <div key={category.id} className="bg-[#22223B] rounded-xl p-4 border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{category.icon}</span>
                  <h3 className={`font-bold text-transparent bg-clip-text bg-gradient-to-r ${category.color}`}>
                    {category.name}
                  </h3>
                </div>
                <span className="text-xs text-[#9A8C98]">{learnedInCategory}/{categoryConcepts.length}</span>
              </div>

              <div className="space-y-2">
                {categoryConcepts.map(concept => {
                  const prereqsMet = concept.prerequisites.every(
                    prereqId => concepts.find(c => c.id === prereqId)?.learned
                  );
                  const canLearn = !concept.learned && prereqsMet;
                  const progress = (concept.currentXp / concept.xpToLearn) * 100;

                  return (
                    <div
                      key={concept.id}
                      className={`rounded-lg p-3 transition-all ${
                        concept.learned
                          ? 'bg-green-900/20 border border-green-500/30'
                          : canLearn
                            ? 'bg-purple-900/20 border border-purple-500/30'
                            : 'bg-[#4A4E69]/20 border border-[#4A4E69]/30 opacity-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`
                          w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                          ${concept.learned
                            ? 'bg-green-600'
                            : canLearn
                              ? 'bg-purple-600'
                              : 'bg-[#4A4E69]'
                          }
                        `}>
                          {concept.learned ? (
                            <CheckCircle size={18} weight="fill" className="text-white" />
                          ) : canLearn ? (
                            <Lightning size={18} className="text-white" />
                          ) : (
                            <Lock size={18} className="text-white/50" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className={`font-medium truncate ${concept.learned ? 'text-green-400' : 'text-white'}`}>
                            {concept.name}
                          </h4>

                          {/* Mini progress for active learning */}
                          {canLearn && progress > 0 && (
                            <div className="mt-1 h-1 bg-black/30 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-purple-500"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          )}
                        </div>

                        {/* Status badge */}
                        {concept.learned && (
                          <span className="text-[10px] px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full">
                            MASTERED
                          </span>
                        )}
                        {canLearn && (
                          <span className="text-[10px] px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded-full">
                            LEARNING
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* How Learning Works */}
      <div className="bg-[#22223B] rounded-xl p-5 border border-white/5">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen size={20} className="text-cyan-400" />
          <h3 className="font-bold text-white">How Learning Works</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-[#4A4E69]/20 rounded-lg">
            <div className="text-3xl mb-2">⚔️</div>
            <h4 className="font-medium text-white mb-1">Battle</h4>
            <p className="text-xs text-[#9A8C98]">Kill monsters to earn concept XP</p>
          </div>
          <div className="text-center p-4 bg-[#4A4E69]/20 rounded-lg">
            <div className="text-3xl mb-2">📝</div>
            <h4 className="font-medium text-white mb-1">Complete Tasks</h4>
            <p className="text-xs text-[#9A8C98]">Each concept has learning objectives</p>
          </div>
          <div className="text-center p-4 bg-[#4A4E69]/20 rounded-lg">
            <div className="text-3xl mb-2">⚡</div>
            <h4 className="font-medium text-white mb-1">Unlock Powers</h4>
            <p className="text-xs text-[#9A8C98]">Mastered concepts grant abilities</p>
          </div>
        </div>

        <div className="mt-4 bg-[#1a1a2e] rounded-lg p-4 font-mono text-sm">
          <p className="text-[#9A8C98]">// Your automation scripts teach real JS patterns!</p>
          <p className="text-green-400 mt-2">if (hero.hp &lt; hero.maxHp * 0.5) {'{'}</p>
          <p className="text-cyan-400 pl-4">useAbility(&apos;heal&apos;);</p>
          <p className="text-green-400">{'}'}</p>
          <p className="text-[#9A8C98] mt-2">// ↑ This teaches conditionals!</p>
        </div>
      </div>
    </div>
  );
}
