'use client';

import { useGameStore } from '@/store/gameStore';
import { CheckCircle, Lock, Lightning, BookOpen, Code, TrendUp, Sword, Target, Sparkle } from '@phosphor-icons/react';

export function ConceptsPanel() {
  const concepts = useGameStore(s => s.concepts);

  const categories = [
    { id: 'variables', name: 'Variables', color: '#89b4fa' },
    { id: 'conditionals', name: 'Conditionals', color: '#a6e3a1' },
    { id: 'loops', name: 'Loops', color: '#f9e2af' },
    { id: 'functions', name: 'Functions', color: '#cba6f7' },
    { id: 'arrays', name: 'Arrays', color: '#f38ba8' },
    { id: 'objects', name: 'Objects', color: '#fab387' },
    { id: 'async', name: 'Async', color: '#94e2d5' },
    { id: 'react', name: 'React', color: '#89dceb' }
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
    <div className="space-y-4">
      {/* Overview Header */}
      <div className="bg-[#1e1e2e] rounded-xl p-5 border border-[#313244]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#cba6f7]/20 flex items-center justify-center">
            <Code size={24} className="text-[#cba6f7]" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#cdd6f4]">JavaScript Journey</h2>
            <p className="text-sm text-[#6c7086]">Learn concepts to unlock powers</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#6c7086]">Progress</span>
            <span className="text-sm font-medium text-[#cdd6f4]">{learnedCount}/{concepts.length}</span>
          </div>
          <div className="h-2 bg-[#313244] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#cba6f7] transition-all"
              style={{ width: `${(learnedCount / concepts.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Stat Bonuses */}
        {Object.keys(totalStatBonus).length > 0 && (
          <div className="bg-[#181825] rounded-lg p-3 border border-[#313244]">
            <div className="flex items-center gap-2 mb-2">
              <TrendUp size={14} className="text-[#a6e3a1]" />
              <span className="text-xs text-[#a6e3a1] font-medium">BONUSES</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(totalStatBonus).map(([stat, value]) => (
                <span key={stat} className="text-xs px-2 py-1 bg-[#a6e3a1]/10 text-[#a6e3a1] rounded">
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
          <div className="bg-[#1e1e2e] rounded-xl p-5 border border-[#cba6f7]/30">
            <div className="flex items-center gap-2 mb-3">
              <Lightning size={16} weight="fill" className="text-[#cba6f7]" />
              <span className="text-xs font-semibold text-[#cba6f7]">NOW LEARNING</span>
            </div>

            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${category?.color}20` }}
              >
                <Code size={20} style={{ color: category?.color }} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#cdd6f4]">{activeConcept.name}</h3>
                <p className="text-sm text-[#6c7086] mt-1">{activeConcept.description}</p>

                {/* Progress */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#6c7086]">XP</span>
                    <span className="text-[#cdd6f4]">{activeConcept.currentXp}/{activeConcept.xpToLearn}</span>
                  </div>
                  <div className="h-1.5 bg-[#313244] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#cba6f7] transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Tasks */}
                <div className="mt-3 space-y-1">
                  {activeConcept.learnByDoing.map(task => (
                    <div
                      key={task.id}
                      className={`flex items-center gap-2 text-xs ${task.completed ? 'text-[#a6e3a1]' : 'text-[#6c7086]'}`}
                    >
                      {task.completed ? (
                        <CheckCircle size={14} weight="fill" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border border-current" />
                      )}
                      <span className="flex-1">{task.description}</span>
                      <span className="font-mono">{task.current}/{task.target}</span>
                    </div>
                  ))}
                </div>

                {/* Rewards */}
                {activeConcept.unlocksAbilities.length > 0 && (
                  <div className="mt-3 p-2 bg-[#f9e2af]/10 rounded-lg border border-[#f9e2af]/20">
                    <span className="text-xs text-[#f9e2af]">
                      <Sparkle size={12} className="inline mr-1" weight="fill" />
                      Unlock: <span className="font-medium">{activeConcept.unlocksAbilities.join(', ')}</span>
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
            <div key={category.id} className="bg-[#1e1e2e] rounded-xl p-4 border border-[#313244]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded flex items-center justify-center"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <Code size={14} style={{ color: category.color }} />
                  </div>
                  <h3 className="font-medium text-[#cdd6f4]">{category.name}</h3>
                </div>
                <span className="text-xs text-[#6c7086]">{learnedInCategory}/{categoryConcepts.length}</span>
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
                      className={`rounded-lg p-2.5 transition-all border ${
                        concept.learned
                          ? 'bg-[#a6e3a1]/10 border-[#a6e3a1]/30'
                          : canLearn
                            ? 'bg-[#cba6f7]/10 border-[#cba6f7]/30'
                            : 'bg-[#181825] border-[#313244] opacity-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`
                          w-6 h-6 rounded flex items-center justify-center flex-shrink-0
                          ${concept.learned
                            ? 'bg-[#a6e3a1]/20'
                            : canLearn
                              ? 'bg-[#cba6f7]/20'
                              : 'bg-[#313244]'
                          }
                        `}>
                          {concept.learned ? (
                            <CheckCircle size={14} weight="fill" className="text-[#a6e3a1]" />
                          ) : canLearn ? (
                            <Lightning size={14} className="text-[#cba6f7]" />
                          ) : (
                            <Lock size={14} className="text-[#6c7086]" />
                          )}
                        </div>

                        <span className={`text-sm flex-1 ${concept.learned ? 'text-[#a6e3a1]' : 'text-[#cdd6f4]'}`}>
                          {concept.name}
                        </span>

                        {concept.learned && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-[#a6e3a1]/20 text-[#a6e3a1] rounded">
                            Done
                          </span>
                        )}
                      </div>

                      {canLearn && progress > 0 && (
                        <div className="mt-2 h-1 bg-[#313244] rounded-full overflow-hidden">
                          <div className="h-full bg-[#cba6f7]" style={{ width: `${progress}%` }} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* How Learning Works */}
      <div className="bg-[#1e1e2e] rounded-xl p-4 border border-[#313244]">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen size={16} className="text-[#89b4fa]" />
          <h3 className="font-medium text-[#cdd6f4]">How It Works</h3>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center p-3 bg-[#181825] rounded-lg border border-[#313244]">
            <Sword size={20} className="mx-auto text-[#f38ba8] mb-2" />
            <p className="text-xs text-[#6c7086]">Battle to earn XP</p>
          </div>
          <div className="text-center p-3 bg-[#181825] rounded-lg border border-[#313244]">
            <Target size={20} className="mx-auto text-[#f9e2af] mb-2" />
            <p className="text-xs text-[#6c7086]">Complete tasks</p>
          </div>
          <div className="text-center p-3 bg-[#181825] rounded-lg border border-[#313244]">
            <Lightning size={20} className="mx-auto text-[#cba6f7] mb-2" />
            <p className="text-xs text-[#6c7086]">Unlock abilities</p>
          </div>
        </div>

        <div className="bg-[#11111b] rounded-lg p-3 font-mono text-xs border border-[#313244]">
          <p className="text-[#6c7086]">// Scripts teach real JS</p>
          <p className="text-[#a6e3a1] mt-1">if (hero.hp &lt; 50) {'{'}</p>
          <p className="text-[#89b4fa] pl-3">useAbility('heal');</p>
          <p className="text-[#a6e3a1]">{'}'}</p>
        </div>
      </div>
    </div>
  );
}
