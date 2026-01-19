'use client';

import { useGameStore } from '@/store/gameStore';
import { CheckCircle, Lock, Lightning, BookOpen } from '@phosphor-icons/react';

export function ConceptsPanel() {
  const concepts = useGameStore(s => s.concepts);

  const categories = [
    { id: 'variables', name: 'Variables', color: 'from-blue-600 to-blue-400' },
    { id: 'conditionals', name: 'Conditionals', color: 'from-green-600 to-green-400' },
    { id: 'loops', name: 'Loops', color: 'from-yellow-600 to-yellow-400' },
    { id: 'functions', name: 'Functions', color: 'from-purple-600 to-purple-400' },
    { id: 'arrays', name: 'Arrays', color: 'from-pink-600 to-pink-400' },
    { id: 'objects', name: 'Objects', color: 'from-orange-600 to-orange-400' },
    { id: 'async', name: 'Async', color: 'from-cyan-600 to-cyan-400' },
    { id: 'react', name: 'React', color: 'from-sky-600 to-sky-400' }
  ];

  const learnedCount = concepts.filter(c => c.learned).length;

  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="bg-[#22223B] rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen size={28} className="text-[#A855F7]" />
          <div>
            <h2 className="text-xl font-bold text-white">JavaScript Concepts</h2>
            <p className="text-sm text-[#9A8C98]">Learn concepts to unlock abilities and power up your hero</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1 h-3 bg-[#4A4E69] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#A855F7] to-[#6366F1] transition-all"
              style={{ width: `${(learnedCount / concepts.length) * 100}%` }}
            />
          </div>
          <span className="text-white font-medium">{learnedCount}/{concepts.length}</span>
        </div>
      </div>

      {/* Concepts by Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map(category => {
          const categoryConcepts = concepts.filter(c => c.category === category.id);
          if (categoryConcepts.length === 0) return null;

          return (
            <div key={category.id} className="bg-[#22223B] rounded-xl p-4">
              <h3 className={`font-bold text-transparent bg-clip-text bg-gradient-to-r ${category.color} mb-4`}>
                {category.name}
              </h3>

              <div className="space-y-3">
                {categoryConcepts.map(concept => {
                  const prereqsMet = concept.prerequisites.every(
                    prereqId => concepts.find(c => c.id === prereqId)?.learned
                  );
                  const canLearn = !concept.learned && prereqsMet;
                  const progress = (concept.currentXp / concept.xpToLearn) * 100;

                  return (
                    <div
                      key={concept.id}
                      className={`rounded-lg p-3 ${
                        concept.learned
                          ? 'bg-green-900/20 border border-green-500/30'
                          : canLearn
                            ? 'bg-[#4A4E69]/50 border border-[#A855F7]/30'
                            : 'bg-[#4A4E69]/20 border border-[#4A4E69]/30'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`
                          w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                          ${concept.learned
                            ? 'bg-green-600'
                            : canLearn
                              ? 'bg-[#A855F7]'
                              : 'bg-[#4A4E69]'
                          }
                        `}>
                          {concept.learned ? (
                            <CheckCircle size={18} weight="fill" />
                          ) : canLearn ? (
                            <Lightning size={18} />
                          ) : (
                            <Lock size={18} />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className={`font-medium ${concept.learned ? 'text-green-400' : 'text-white'}`}>
                            {concept.name}
                          </h4>
                          <p className="text-xs text-[#9A8C98] mt-0.5">{concept.description}</p>

                          {/* Unlocks */}
                          {concept.unlocksAbilities.length > 0 && (
                            <div className="flex items-center gap-1 mt-2">
                              <span className="text-[10px] text-[#9A8C98]">Unlocks:</span>
                              {concept.unlocksAbilities.map(id => (
                                <span key={id} className="text-[10px] px-1.5 py-0.5 bg-[#FFD700]/20 text-[#FFD700] rounded">
                                  {id}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Progress Bar */}
                          {canLearn && (
                            <div className="mt-2">
                              <div className="flex justify-between text-[10px] mb-1">
                                <span className="text-[#9A8C98]">Progress</span>
                                <span className="text-white">{concept.currentXp}/{concept.xpToLearn}</span>
                              </div>
                              <div className="h-1.5 bg-[#4A4E69] rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-[#A855F7] transition-all"
                                  style={{ width: `${Math.min(100, progress)}%` }}
                                />
                              </div>
                            </div>
                          )}

                          {/* Learn Tasks */}
                          {canLearn && concept.learnByDoing.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {concept.learnByDoing.map(task => (
                                <div
                                  key={task.id}
                                  className={`text-[10px] flex items-center gap-1 ${
                                    task.completed ? 'text-green-400' : 'text-[#9A8C98]'
                                  }`}
                                >
                                  {task.completed ? (
                                    <CheckCircle size={10} weight="fill" />
                                  ) : (
                                    <span className="w-2.5 h-2.5 rounded-full border border-current" />
                                  )}
                                  <span>{task.description}</span>
                                  <span className="text-white/40">{task.current}/{task.target}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Code Example Panel */}
      <div className="bg-[#22223B] rounded-xl p-4">
        <h3 className="font-bold text-white mb-3">Learning Through Play</h3>
        <p className="text-sm text-[#9A8C98]">
          As you battle monsters and use automation scripts, you naturally learn JavaScript concepts.
          Each concept you master unlocks new abilities and makes your hero stronger.
        </p>

        <div className="mt-4 bg-[#1a1a2e] rounded-lg p-4 font-mono text-sm">
          <p className="text-[#9A8C98]">// Example: Conditionals unlock if/else attacks</p>
          <p className="text-green-400">if (enemy.hp &lt; enemy.maxHp * 0.3) {'{'}</p>
          <p className="text-yellow-400 pl-4">useAbility(&apos;execute&apos;);  <span className="text-[#9A8C98]">// Bonus damage!</span></p>
          <p className="text-green-400">{'}'}</p>
        </div>
      </div>
    </div>
  );
}
