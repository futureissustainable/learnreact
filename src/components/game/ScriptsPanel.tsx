'use client';

import { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { ToggleLeft, ToggleRight, Code, Lightning, Plus, Trash, X } from '@phosphor-icons/react';
import { ScriptCondition, ScriptAction } from '@/types/game';

interface ScriptsPanelProps {
  fullWidth?: boolean;
}

// Available conditions - more unlock as you learn concepts
const CONDITIONS: { id: ScriptCondition['type']; label: string; description: string; requiredConcept?: string }[] = [
  { id: 'always', label: 'Always', description: 'Run every tick (like while(true))' },
  { id: 'hp_below', label: 'HP Below %', description: 'When health drops below threshold', requiredConcept: 'conditionals' },
  { id: 'hp_above', label: 'HP Above %', description: 'When health is above threshold', requiredConcept: 'conditionals' },
  { id: 'enemy_hp_below', label: 'Enemy HP Below %', description: 'When enemy health is low', requiredConcept: 'conditionals' },
  { id: 'mana_above', label: 'Mana Above %', description: 'When mana is high enough', requiredConcept: 'conditionals' },
  { id: 'ability_ready', label: 'Ability Ready', description: 'When specific ability is off cooldown', requiredConcept: 'functions' },
];

// Available actions
const ACTIONS: { id: string; label: string; description: string }[] = [
  { id: 'attack', label: 'Use Attack', description: 'Basic attack ability' },
  { id: 'power-strike', label: 'Use Power Strike', description: 'Strong attack (costs mana)' },
  { id: 'heal', label: 'Use Heal', description: 'Restore HP (costs mana)' },
];

function generateCode(condition: ScriptCondition, action: ScriptAction): string {
  let conditionStr = '';
  switch (condition.type) {
    case 'always':
      conditionStr = 'true';
      break;
    case 'hp_below':
      conditionStr = `player.hp < player.maxHp * ${(condition as { percent: number }).percent / 100}`;
      break;
    case 'hp_above':
      conditionStr = `player.hp > player.maxHp * ${(condition as { percent: number }).percent / 100}`;
      break;
    case 'enemy_hp_below':
      conditionStr = `enemy.hp < enemy.maxHp * ${(condition as { percent: number }).percent / 100}`;
      break;
    case 'mana_above':
      conditionStr = `player.mana > player.maxMana * ${(condition as { percent: number }).percent / 100}`;
      break;
    case 'ability_ready':
      conditionStr = `abilities['${(condition as { abilityId: string }).abilityId}'].ready`;
      break;
    default:
      conditionStr = 'true';
  }

  const actionStr = action.type === 'use_ability'
    ? `useAbility('${action.abilityId}')`
    : 'attack()';

  return `while (${conditionStr}) {\n  ${actionStr};\n}`;
}

export function ScriptsPanel({ fullWidth }: ScriptsPanelProps) {
  const hero = useGameStore(s => s.hero);
  const concepts = useGameStore(s => s.concepts);
  const toggleScript = useGameStore(s => s.toggleScript);
  const addScript = useGameStore(s => s.addScript);
  const deleteScript = useGameStore(s => s.deleteScript);

  const [showCreate, setShowCreate] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState<ScriptCondition['type']>('always');
  const [selectedAction, setSelectedAction] = useState<string>('attack');
  const [conditionPercent, setConditionPercent] = useState(50);
  const [scriptName, setScriptName] = useState('');

  // Check which conditions are unlocked
  const isConditionUnlocked = (requiredConcept?: string) => {
    if (!requiredConcept) return true;
    return concepts.find(c => c.id === requiredConcept)?.learned ?? false;
  };

  const handleCreateScript = () => {
    if (!scriptName.trim()) return;

    let condition: ScriptCondition;
    switch (selectedCondition) {
      case 'hp_below':
        condition = { type: 'hp_below', percent: conditionPercent };
        break;
      case 'hp_above':
        condition = { type: 'hp_above', percent: conditionPercent };
        break;
      case 'enemy_hp_below':
        condition = { type: 'enemy_hp_below', percent: conditionPercent };
        break;
      case 'mana_above':
        condition = { type: 'mana_above', percent: conditionPercent };
        break;
      case 'ability_ready':
        condition = { type: 'ability_ready', abilityId: selectedAction };
        break;
      default:
        condition = { type: 'always' };
    }

    const action: ScriptAction = { type: 'use_ability', abilityId: selectedAction };
    const code = generateCode(condition, action);

    addScript({
      name: scriptName,
      code,
      enabled: true,
      priority: 5,
      condition,
      action,
      cooldown: selectedCondition === 'always' ? 1 : 0.5,
      conceptsUsed: selectedCondition !== 'always' ? ['conditionals'] : []
    });

    setShowCreate(false);
    setScriptName('');
    setSelectedCondition('always');
    setSelectedAction('attack');
  };

  return (
    <div className={`bg-[#1e1e2e] rounded-xl p-4 border border-[#313244] ${fullWidth ? 'max-w-2xl mx-auto' : ''}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Code size={16} className="text-[#cba6f7]" />
          <h3 className="font-semibold text-[#cdd6f4]">Scripts</h3>
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="flex items-center gap-1 px-3 py-1.5 bg-[#cba6f7]/20 text-[#cba6f7] rounded-lg text-sm hover:bg-[#cba6f7]/30 transition-colors"
        >
          <Plus size={14} />
          New
        </button>
      </div>

      {/* Create Script Form */}
      {showCreate && (
        <div className="mb-4 p-4 bg-[#181825] rounded-lg border border-[#cba6f7]/30">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-[#cdd6f4]">Create Script</h4>
            <button onClick={() => setShowCreate(false)} className="text-[#6c7086] hover:text-[#cdd6f4]">
              <X size={16} />
            </button>
          </div>

          {/* Script Name */}
          <div className="mb-3">
            <label className="text-xs text-[#6c7086] mb-1 block">Name</label>
            <input
              type="text"
              value={scriptName}
              onChange={(e) => setScriptName(e.target.value)}
              placeholder="My Auto Attack"
              className="w-full px-3 py-2 bg-[#11111b] border border-[#313244] rounded-lg text-sm text-[#cdd6f4] placeholder-[#6c7086] focus:border-[#cba6f7] focus:outline-none"
            />
          </div>

          {/* Condition */}
          <div className="mb-3">
            <label className="text-xs text-[#6c7086] mb-1 block">When (Condition)</label>
            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value as ScriptCondition['type'])}
              className="w-full px-3 py-2 bg-[#11111b] border border-[#313244] rounded-lg text-sm text-[#cdd6f4] focus:border-[#cba6f7] focus:outline-none"
            >
              {CONDITIONS.map(cond => (
                <option
                  key={cond.id}
                  value={cond.id}
                  disabled={!isConditionUnlocked(cond.requiredConcept)}
                >
                  {cond.label} {!isConditionUnlocked(cond.requiredConcept) ? '(Locked)' : ''}
                </option>
              ))}
            </select>
            <p className="text-xs text-[#6c7086] mt-1">
              {CONDITIONS.find(c => c.id === selectedCondition)?.description}
            </p>
          </div>

          {/* Percent slider for conditions that need it */}
          {['hp_below', 'hp_above', 'enemy_hp_below', 'mana_above'].includes(selectedCondition) && (
            <div className="mb-3">
              <label className="text-xs text-[#6c7086] mb-1 block">Threshold: {conditionPercent}%</label>
              <input
                type="range"
                min="10"
                max="90"
                value={conditionPercent}
                onChange={(e) => setConditionPercent(Number(e.target.value))}
                className="w-full"
              />
            </div>
          )}

          {/* Action */}
          <div className="mb-3">
            <label className="text-xs text-[#6c7086] mb-1 block">Do (Action)</label>
            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              className="w-full px-3 py-2 bg-[#11111b] border border-[#313244] rounded-lg text-sm text-[#cdd6f4] focus:border-[#cba6f7] focus:outline-none"
            >
              {ACTIONS.map(action => (
                <option key={action.id} value={action.id}>
                  {action.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-[#6c7086] mt-1">
              {ACTIONS.find(a => a.id === selectedAction)?.description}
            </p>
          </div>

          {/* Code Preview */}
          <div className="mb-3">
            <label className="text-xs text-[#6c7086] mb-1 block">Generated Code</label>
            <pre className="text-xs bg-[#11111b] rounded p-3 overflow-x-auto font-mono text-[#a6e3a1] border border-[#313244]">
              {generateCode(
                selectedCondition === 'always' ? { type: 'always' } :
                selectedCondition === 'ability_ready' ? { type: 'ability_ready', abilityId: selectedAction } :
                { type: selectedCondition, percent: conditionPercent } as ScriptCondition,
                { type: 'use_ability', abilityId: selectedAction }
              )}
            </pre>
          </div>

          <button
            onClick={handleCreateScript}
            disabled={!scriptName.trim()}
            className="w-full py-2 bg-[#cba6f7] text-[#1e1e2e] rounded-lg font-medium text-sm hover:bg-[#cba6f7]/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Create Script
          </button>
        </div>
      )}

      {/* Existing Scripts */}
      <div className="space-y-3">
        {hero.scripts.map(script => (
          <div
            key={script.id}
            className={`rounded-lg p-3 transition-colors border ${
              script.enabled
                ? 'bg-[#181825] border-[#a6e3a1]/30'
                : 'bg-[#181825] border-[#313244]'
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1">
                <h4 className="font-medium text-[#cdd6f4] text-sm">{script.name}</h4>
                <span className="text-xs text-[#6c7086]">
                  Triggered {script.triggerCount}x
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => deleteScript(script.id)}
                  className="p-1 text-[#6c7086] hover:text-[#f38ba8] transition-colors"
                >
                  <Trash size={14} />
                </button>
                <button onClick={() => toggleScript(script.id)}>
                  {script.enabled ? (
                    <ToggleRight size={28} weight="fill" className="text-[#a6e3a1]" />
                  ) : (
                    <ToggleLeft size={28} className="text-[#6c7086]" />
                  )}
                </button>
              </div>
            </div>

            <pre className="text-xs bg-[#11111b] rounded p-2 overflow-x-auto font-mono text-[#a6e3a1] border border-[#313244]">
              {script.code}
            </pre>
          </div>
        ))}

        {hero.scripts.length === 0 && !showCreate && (
          <div className="text-center py-6">
            <p className="text-[#6c7086] text-sm mb-2">No scripts yet</p>
            <p className="text-xs text-[#6c7086]">
              Click <span className="text-[#cba6f7]">+ New</span> to write your first script!
            </p>
          </div>
        )}
      </div>

      {/* Tip */}
      <div className="mt-4 p-3 bg-[#181825] rounded-lg border border-[#313244]">
        <p className="text-xs text-[#6c7086]">
          <Lightning size={12} className="inline text-[#cba6f7] mr-1" />
          Write a <code className="text-[#a6e3a1]">while(true)</code> script to auto-attack.
          Learn JS concepts to unlock more conditions!
        </p>
      </div>
    </div>
  );
}
