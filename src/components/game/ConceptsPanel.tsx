'use client';

import { useGameStore } from '@/store/gameStore';
import { CheckCircle, Lock, Coins, Code, TrendUp, Sparkle, Lightning, CaretRight } from '@phosphor-icons/react';

export function ConceptsPanel() {
  const concepts = useGameStore(s => s.concepts);
  const gold = useGameStore(s => s.hero.gold);
  const buyConcept = useGameStore(s => s.buyConcept);
  const canBuyConcept = useGameStore(s => s.canBuyConcept);

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

  // Get next available concepts to buy
  const availableConcepts = concepts.filter(c => canBuyConcept(c.id));

  return (
    <div className="space-y-4">
      {/* Overview Header */}
      <div className="bg-[#1e1e2e] rounded-xl p-5 border border-[#313244]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#cba6f7]/20 flex items-center justify-center">
              <Code size={24} className="text-[#cba6f7]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#cdd6f4]">Skill Tree</h2>
              <p className="text-sm text-[#6c7086]">Buy skills with gold to unlock powers</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-[#f9e2af]/10 rounded-lg border border-[#f9e2af]/30">
            <Coins size={18} weight="fill" className="text-[#f9e2af]" />
            <span className="font-bold text-[#f9e2af]">{gold}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#6c7086]">Skills Learned</span>
            <span className="text-sm font-medium text-[#cdd6f4]">{learnedCount}/{concepts.length}</span>
          </div>
          <div className="h-2 bg-[#313244] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#cba6f7] to-[#89b4fa] transition-all"
              style={{ width: `${(learnedCount / concepts.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Stat Bonuses */}
        {Object.keys(totalStatBonus).length > 0 && (
          <div className="bg-[#181825] rounded-lg p-3 border border-[#313244]">
            <div className="flex items-center gap-2 mb-2">
              <TrendUp size={14} className="text-[#a6e3a1]" />
              <span className="text-xs text-[#a6e3a1] font-medium">TOTAL BONUSES FROM SKILLS</span>
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

      {/* Available Skills to Buy */}
      {availableConcepts.length > 0 && (
        <div className="bg-[#1e1e2e] rounded-xl p-5 border border-[#f9e2af]/30">
          <div className="flex items-center gap-2 mb-4">
            <Sparkle size={16} weight="fill" className="text-[#f9e2af]" />
            <span className="text-sm font-semibold text-[#f9e2af]">AVAILABLE TO LEARN</span>
          </div>

          <div className="space-y-3">
            {availableConcepts.map(concept => {
              const category = categories.find(cat => cat.id === concept.category);
              const canAfford = gold >= concept.goldCost;

              return (
                <div
                  key={concept.id}
                  className={`rounded-xl p-4 border transition-all ${
                    canAfford
                      ? 'bg-[#cba6f7]/10 border-[#cba6f7]/30 hover:border-[#cba6f7]'
                      : 'bg-[#181825] border-[#313244]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${category?.color}20` }}
                    >
                      <Code size={20} style={{ color: category?.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-[#cdd6f4]">{concept.name}</h3>
                        <div className="flex items-center gap-1">
                          <Coins size={14} weight="fill" className={canAfford ? 'text-[#f9e2af]' : 'text-[#6c7086]'} />
                          <span className={`font-bold ${canAfford ? 'text-[#f9e2af]' : 'text-[#6c7086]'}`}>
                            {concept.goldCost}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-[#6c7086] mt-1">{concept.description}</p>

                      {/* Code Example */}
                      <div className="mt-2 p-2 bg-[#11111b] rounded-lg font-mono text-xs border border-[#313244] overflow-x-auto">
                        <pre className="text-[#89b4fa] whitespace-pre-wrap">{concept.codeExample}</pre>
                      </div>

                      {/* What it unlocks */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {concept.unlocksAbilities.length > 0 && (
                          <span className="text-xs px-2 py-1 bg-[#f38ba8]/10 text-[#f38ba8] rounded flex items-center gap-1">
                            <Lightning size={10} weight="fill" />
                            +{concept.unlocksAbilities.length} abilities
                          </span>
                        )}
                        {concept.unlocksFeatures.length > 0 && (
                          <span className="text-xs px-2 py-1 bg-[#89b4fa]/10 text-[#89b4fa] rounded flex items-center gap-1">
                            <Code size={10} />
                            +{concept.unlocksFeatures.length} script features
                          </span>
                        )}
                        {Object.entries(concept.statBonus).map(([stat, value]) => (
                          <span key={stat} className="text-xs px-2 py-1 bg-[#a6e3a1]/10 text-[#a6e3a1] rounded">
                            +{typeof value === 'number' && value < 1 ? `${(value * 100).toFixed(0)}%` : value} {stat}
                          </span>
                        ))}
                      </div>

                      {/* Buy Button */}
                      <button
                        onClick={() => buyConcept(concept.id)}
                        disabled={!canAfford}
                        className={`mt-3 w-full py-2 px-4 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                          canAfford
                            ? 'bg-[#cba6f7] text-[#1e1e2e] hover:bg-[#cba6f7]/90'
                            : 'bg-[#313244] text-[#6c7086] cursor-not-allowed'
                        }`}
                      >
                        {canAfford ? (
                          <>
                            <Sparkle size={16} weight="fill" />
                            Learn {concept.name}
                          </>
                        ) : (
                          <>
                            <Coins size={16} />
                            Need {concept.goldCost - gold} more gold
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Skill Tree by Category */}
      <div className="space-y-3">
        {categories.map(category => {
          const categoryConcepts = concepts.filter(c => c.category === category.id);
          if (categoryConcepts.length === 0) return null;

          const learnedInCategory = categoryConcepts.filter(c => c.learned).length;
          const allLearned = learnedInCategory === categoryConcepts.length;

          return (
            <div
              key={category.id}
              className={`bg-[#1e1e2e] rounded-xl p-4 border transition-all ${
                allLearned ? 'border-[#a6e3a1]/30' : 'border-[#313244]'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <Code size={16} style={{ color: category.color }} />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#cdd6f4]">{category.name}</h3>
                    <span className="text-xs text-[#6c7086]">{learnedInCategory}/{categoryConcepts.length}</span>
                  </div>
                </div>
                {allLearned && (
                  <span className="text-xs px-2 py-1 bg-[#a6e3a1]/10 text-[#a6e3a1] rounded font-medium">
                    COMPLETE
                  </span>
                )}
              </div>

              {/* Skills in category */}
              <div className="flex flex-wrap gap-2">
                {categoryConcepts.map((concept, idx) => {
                  const prereqsMet = concept.prerequisites.every(
                    prereqId => concepts.find(c => c.id === prereqId)?.learned
                  );
                  const canBuy = !concept.learned && prereqsMet;
                  const canAfford = gold >= concept.goldCost;

                  return (
                    <div key={concept.id} className="flex items-center">
                      {idx > 0 && (
                        <CaretRight size={12} className="text-[#313244] mr-1" />
                      )}
                      <div
                        className={`
                          px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 transition-all border
                          ${concept.learned
                            ? 'bg-[#a6e3a1]/10 border-[#a6e3a1]/30 text-[#a6e3a1]'
                            : canBuy
                              ? canAfford
                                ? 'bg-[#cba6f7]/10 border-[#cba6f7]/30 text-[#cdd6f4] cursor-pointer hover:border-[#cba6f7]'
                                : 'bg-[#f9e2af]/10 border-[#f9e2af]/30 text-[#6c7086]'
                              : 'bg-[#181825] border-[#313244] text-[#6c7086] opacity-50'
                          }
                        `}
                        onClick={() => canBuy && canAfford && buyConcept(concept.id)}
                        title={
                          concept.learned
                            ? 'Learned!'
                            : canBuy
                              ? canAfford
                                ? `Click to learn (${concept.goldCost}g)`
                                : `Need ${concept.goldCost}g`
                              : `Requires: ${concept.prerequisites.join(', ')}`
                        }
                      >
                        {concept.learned ? (
                          <CheckCircle size={14} weight="fill" />
                        ) : canBuy ? (
                          <div className="flex items-center gap-1">
                            <Coins size={12} weight="fill" className={canAfford ? 'text-[#f9e2af]' : 'text-[#6c7086]'} />
                            <span className="text-xs">{concept.goldCost}</span>
                          </div>
                        ) : (
                          <Lock size={12} />
                        )}
                        <span>{concept.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* How It Works */}
      <div className="bg-[#1e1e2e] rounded-xl p-4 border border-[#313244]">
        <h3 className="font-medium text-[#cdd6f4] mb-3">How the Skill Tree Works</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-[#181825] rounded-lg border border-[#313244]">
            <Coins size={24} className="mx-auto text-[#f9e2af] mb-2" />
            <p className="text-xs text-[#6c7086]">Kill mobs to earn gold</p>
          </div>
          <div className="text-center p-3 bg-[#181825] rounded-lg border border-[#313244]">
            <Sparkle size={24} className="mx-auto text-[#cba6f7] mb-2" />
            <p className="text-xs text-[#6c7086]">Buy skills to unlock powers</p>
          </div>
          <div className="text-center p-3 bg-[#181825] rounded-lg border border-[#313244]">
            <Lightning size={24} className="mx-auto text-[#f38ba8] mb-2" />
            <p className="text-xs text-[#6c7086]">Better automation = more gold</p>
          </div>
        </div>
      </div>
    </div>
  );
}
