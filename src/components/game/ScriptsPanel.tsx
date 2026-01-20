'use client';

import { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { ToggleLeft, ToggleRight, Code, Lightning, Plus, Trash, X, Lock, ShoppingCart } from '@phosphor-icons/react';
import { ScriptCondition, ScriptAction, ScriptFeature } from '@/types/game';

interface ScriptsPanelProps {
  fullWidth?: boolean;
}

// Conditions with their unlock requirements
// CRITICAL: while(true) requires loop_while_true - the first unlock!
const CONDITIONS: {
  id: ScriptCondition['type'];
  label: string;
  description: string;
  requires?: ScriptFeature;
  needsPercent?: boolean;
}[] = [
  // The first unlock - requires buying Automation Core!
  { id: 'always', label: 'while (true)', description: 'Runs continuously - your first loop!', requires: 'loop_while_true' },

  // Tier 1: Basic conditions
  { id: 'hp_below', label: 'if (hp < X%)', description: 'When your health is low', requires: 'condition_hp_below', needsPercent: true },
  { id: 'hp_above', label: 'if (hp > X%)', description: 'When your health is high', requires: 'condition_hp_below', needsPercent: true },
  { id: 'mana_above', label: 'if (mana > X%)', description: 'When you have enough mana', requires: 'condition_mana_above', needsPercent: true },
  { id: 'mana_below', label: 'if (mana < X%)', description: 'When mana is running low', requires: 'condition_mana_above', needsPercent: true },
  { id: 'enemy_hp_below', label: 'if (enemy.hp < X%)', description: 'Execute when enemy is weak!', requires: 'condition_enemy_hp_below', needsPercent: true },
  { id: 'enemy_hp_above', label: 'if (enemy.hp > X%)', description: 'When enemy is still strong', requires: 'condition_enemy_hp_below', needsPercent: true },
  { id: 'ability_ready', label: 'if (ability.ready)', description: 'When ability is off cooldown', requires: 'condition_ability_ready' },
];

// Actions with their unlock requirements
// CRITICAL: attack() requires loop_while_true - bundled with first unlock!
const ACTIONS: {
  id: string;
  label: string;
  description: string;
  requires?: ScriptFeature;
  manaCost?: number;
}[] = [
  // First unlock - comes with Automation Core
  { id: 'attack', label: 'attack()', description: 'Basic attack (0 mana)', requires: 'loop_while_true', manaCost: 0 },

  // Tier 1-2: Additional actions
  { id: 'heal', label: 'heal()', description: 'Restore 30% HP (20 mana)', requires: 'action_heal', manaCost: 20 },
  { id: 'power-strike', label: 'powerStrike()', description: 'Heavy attack (10 mana)', requires: 'action_power_strike', manaCost: 10 },
  { id: 'defend', label: 'defend()', description: 'Block 50% damage (5 mana)', requires: 'action_defend', manaCost: 5 },
  { id: 'meditate', label: 'meditate()', description: 'Restore 20% mana (0 mana)', requires: 'action_meditate', manaCost: 0 },
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
    case 'mana_below':
      conditionStr = `player.mana < player.maxMana * ${(condition as { percent: number }).percent / 100}`;
      break;
    case 'ability_ready':
      conditionStr = `abilities['${(condition as { abilityId: string }).abilityId}'].ready`;
      break;
    default:
      conditionStr = 'true';
  }

  const abilityId = action.type === 'use_ability' ? action.abilityId : 'attack';
  const actionName = abilityId === 'attack' ? 'attack' :
                     abilityId === 'heal' ? 'heal' :
                     abilityId === 'power-strike' ? 'powerStrike' :
                     abilityId === 'defend' ? 'defend' :
                     abilityId === 'meditate' ? 'meditate' : abilityId;

  return `while (${conditionStr}) {\n  ${actionName}();\n}`;
}

export function ScriptsPanel({ fullWidth }: ScriptsPanelProps) {
  const hero = useGameStore(s => s.hero);
  const inventory = useGameStore(s => s.inventory);
  const concepts = useGameStore(s => s.concepts);
  const toggleScript = useGameStore(s => s.toggleScript);
  const addScript = useGameStore(s => s.addScript);
  const deleteScript = useGameStore(s => s.deleteScript);

  const [showCreate, setShowCreate] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState<ScriptCondition['type']>('always');
  const [selectedAction, setSelectedAction] = useState<string>('attack');
  const [conditionPercent, setConditionPercent] = useState(50);
  const [scriptName, setScriptName] = useState('');

  // Get all unlocked features from LEARNED CONCEPTS + inventory/equipment
  const getUnlockedFeatures = (): Set<ScriptFeature> => {
    const features = new Set<ScriptFeature>();

    // PRIMARY SOURCE: Learned concepts unlock features!
    concepts.forEach(concept => {
      if (concept.learned && concept.unlocksFeatures) {
        concept.unlocksFeatures.forEach(feature => features.add(feature));
      }
    });

    // SECONDARY: Equipment can also unlock features (legacy support)
    inventory.forEach(item => {
      if (item.unlocks) features.add(item.unlocks);
    });
    if (hero.equipment.weapon?.unlocks) features.add(hero.equipment.weapon.unlocks);
    if (hero.equipment.armor?.unlocks) features.add(hero.equipment.armor.unlocks);
    if (hero.equipment.accessory?.unlocks) features.add(hero.equipment.accessory.unlocks);

    return features;
  };

  const unlockedFeatures = getUnlockedFeatures();
  const hasAutomation = unlockedFeatures.has('loop_while_true');

  const isFeatureUnlocked = (feature?: ScriptFeature) => {
    if (!feature) return true;
    return unlockedFeatures.has(feature);
  };

  const handleCreateScript = () => {
    const name = scriptName.trim() || 'My Script';

    let condition: ScriptCondition;
    const condDef = CONDITIONS.find(c => c.id === selectedCondition);

    if (condDef?.needsPercent) {
      condition = { type: selectedCondition, percent: conditionPercent } as ScriptCondition;
    } else if (selectedCondition === 'ability_ready') {
      condition = { type: 'ability_ready', abilityId: selectedAction };
    } else {
      condition = { type: selectedCondition } as ScriptCondition;
    }

    const action: ScriptAction = { type: 'use_ability', abilityId: selectedAction };
    const code = generateCode(condition, action);

    addScript({
      name,
      code,
      enabled: true,
      priority: 5,
      condition,
      action,
      cooldown: selectedCondition === 'always' ? 1 : 0.5,
      conceptsUsed: []
    });

    setShowCreate(false);
    setScriptName('');
  };

  const availableConditions = CONDITIONS.filter(c => isFeatureUnlocked(c.requires));
  const lockedConditions = CONDITIONS.filter(c => !isFeatureUnlocked(c.requires));
  const availableActions = ACTIONS.filter(a => isFeatureUnlocked(a.requires));
  const lockedActions = ACTIONS.filter(a => !isFeatureUnlocked(a.requires));

  // ========================================================
  // NO AUTOMATION YET - Show "Buy Automation Core" message
  // ========================================================
  if (!hasAutomation) {
    return (
      <div className={`bg-[#1e1e2e] rounded-xl p-4 border border-[#313244] ${fullWidth ? 'max-w-2xl mx-auto' : ''}`}>
        <div className="flex items-center gap-2 mb-4">
          <Code size={16} className="text-[#6c7086]" />
          <h3 className="font-semibold text-[#6c7086]">Scripts</h3>
          <Lock size={14} className="text-[#f9e2af]" />
        </div>

        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#181825] flex items-center justify-center border-2 border-dashed border-[#6c7086]">
            <span className="text-3xl">⚙️</span>
          </div>

          <h4 className="text-[#f9e2af] font-medium mb-2">Learn to Automate!</h4>
          <p className="text-sm text-[#6c7086] mb-4">
            Click <span className="text-[#a6e3a1]">Attack</span> and <span className="text-[#a6e3a1]">Heal</span> manually for now.
          </p>

          <div className="bg-[#181825] rounded-lg p-4 border border-[#cba6f7]/30 mb-4">
            <p className="text-xs text-[#cba6f7] mb-2">To unlock automation:</p>
            <p className="text-sm text-[#cdd6f4]">
              Learn <span className="text-[#f9e2af] font-medium">Variables</span> by defeating 10 enemies
            </p>
            <div className="mt-3 p-2 bg-[#1e1e2e] rounded font-mono text-xs text-[#89b4fa]">
              <span className="text-[#cba6f7]">while</span> (<span className="text-[#f9e2af]">true</span>) {'{'}
              <br />
              {'  '}<span className="text-[#a6e3a1]">attack</span>();
              <br />
              {'}'}
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-[#6c7086]">
            <Code size={14} />
            <span>Check Concepts tab for progress</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-[#313244]">
          <p className="text-xs text-[#6c7086] text-center">
            💡 Learning = Power! Each concept unlocks new abilities AND automation features!
          </p>
        </div>
      </div>
    );
  }

  // ========================================================
  // HAS AUTOMATION - Show full Scripts panel
  // ========================================================
  return (
    <div className={`bg-[#1e1e2e] rounded-xl p-4 border border-[#313244] ${fullWidth ? 'max-w-2xl mx-auto' : ''}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Code size={16} className="text-[#cba6f7]" />
          <h3 className="font-semibold text-[#cdd6f4]">Scripts</h3>
          <span className="text-xs px-2 py-0.5 bg-[#a6e3a1]/20 text-[#a6e3a1] rounded">
            {availableConditions.length} conditions • {availableActions.length} actions
          </span>
        </div>
        {!showCreate && (
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-1 px-3 py-1.5 bg-[#cba6f7]/20 text-[#cba6f7] rounded-lg text-sm hover:bg-[#cba6f7]/30 transition-colors"
          >
            <Plus size={14} />
            New
          </button>
        )}
      </div>

      {/* Create Script Form */}
      {showCreate && (
        <div className="mb-4 p-4 bg-[#181825] rounded-lg border border-[#cba6f7]/30">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-[#cdd6f4]">
              {hero.scripts.length === 0 ? '✨ Write Your First Script!' : 'Create Script'}
            </h4>
            <button onClick={() => setShowCreate(false)} className="text-[#6c7086] hover:text-[#cdd6f4]">
              <X size={16} />
            </button>
          </div>

          {hero.scripts.length === 0 && (
            <p className="text-xs text-[#a6e3a1] mb-3 p-2 bg-[#a6e3a1]/10 rounded">
              🎉 You unlocked automation! Start with <code className="text-[#f9e2af]">while(true)</code> + <code className="text-[#f9e2af]">attack()</code>
            </p>
          )}

          {/* Script Name */}
          <div className="mb-3">
            <label className="text-xs text-[#6c7086] mb-1 block">Name (optional)</label>
            <input
              type="text"
              value={scriptName}
              onChange={(e) => setScriptName(e.target.value)}
              placeholder="Auto Attack"
              className="w-full px-3 py-2 bg-[#11111b] border border-[#313244] rounded-lg text-sm text-[#cdd6f4] placeholder-[#6c7086] focus:border-[#cba6f7] focus:outline-none"
            />
          </div>

          {/* Condition */}
          <div className="mb-3">
            <label className="text-xs text-[#6c7086] mb-1 block">Condition (when to run)</label>
            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value as ScriptCondition['type'])}
              className="w-full px-3 py-2 bg-[#11111b] border border-[#313244] rounded-lg text-sm text-[#cdd6f4] focus:border-[#cba6f7] focus:outline-none"
            >
              {availableConditions.map(cond => (
                <option key={cond.id} value={cond.id}>
                  {cond.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-[#6c7086] mt-1">
              {CONDITIONS.find(c => c.id === selectedCondition)?.description}
            </p>
          </div>

          {/* Percent slider for conditions that need it */}
          {CONDITIONS.find(c => c.id === selectedCondition)?.needsPercent && (
            <div className="mb-3">
              <label className="text-xs text-[#6c7086] mb-1 block">Threshold: {conditionPercent}%</label>
              <input
                type="range"
                min="10"
                max="90"
                step="10"
                value={conditionPercent}
                onChange={(e) => setConditionPercent(Number(e.target.value))}
                className="w-full accent-[#cba6f7]"
              />
            </div>
          )}

          {/* Action */}
          <div className="mb-3">
            <label className="text-xs text-[#6c7086] mb-1 block">Action (what to do)</label>
            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              className="w-full px-3 py-2 bg-[#11111b] border border-[#313244] rounded-lg text-sm text-[#cdd6f4] focus:border-[#cba6f7] focus:outline-none"
            >
              {availableActions.map(action => (
                <option key={action.id} value={action.id}>
                  {action.label} {action.manaCost ? `(${action.manaCost} mana)` : ''}
                </option>
              ))}
            </select>
            <p className="text-xs text-[#6c7086] mt-1">
              {ACTIONS.find(a => a.id === selectedAction)?.description}
            </p>
          </div>

          {/* Code Preview */}
          <div className="mb-3">
            <label className="text-xs text-[#6c7086] mb-1 block">Your Code</label>
            <pre className="text-xs bg-[#11111b] rounded p-3 overflow-x-auto font-mono text-[#a6e3a1] border border-[#313244]">
              {generateCode(
                CONDITIONS.find(c => c.id === selectedCondition)?.needsPercent
                  ? { type: selectedCondition, percent: conditionPercent } as ScriptCondition
                  : selectedCondition === 'ability_ready'
                    ? { type: 'ability_ready', abilityId: selectedAction }
                    : { type: selectedCondition } as ScriptCondition,
                { type: 'use_ability', abilityId: selectedAction }
              )}
            </pre>
          </div>

          <button
            onClick={handleCreateScript}
            className="w-full py-2 bg-[#cba6f7] text-[#1e1e2e] rounded-lg font-medium text-sm hover:bg-[#cba6f7]/80 transition-colors"
          >
            {hero.scripts.length === 0 ? '🚀 Create & Start!' : 'Create Script'}
          </button>

          {/* Locked features hint */}
          {(lockedConditions.length > 0 || lockedActions.length > 0) && (
            <div className="mt-3 pt-3 border-t border-[#313244]">
              <p className="text-xs text-[#6c7086] flex items-center gap-1 mb-2">
                <Lock size={12} /> Buy items in Shop to unlock:
              </p>
              <div className="flex flex-wrap gap-1">
                {lockedConditions.slice(0, 4).map(c => (
                  <span key={c.id} className="text-[10px] px-2 py-0.5 bg-[#313244] text-[#6c7086] rounded">
                    {c.label}
                  </span>
                ))}
                {lockedActions.slice(0, 3).map(a => (
                  <span key={a.id} className="text-[10px] px-2 py-0.5 bg-[#313244] text-[#6c7086] rounded">
                    {a.label}
                  </span>
                ))}
                {(lockedConditions.length + lockedActions.length) > 7 && (
                  <span className="text-[10px] px-2 py-0.5 text-[#6c7086]">
                    +{lockedConditions.length + lockedActions.length - 7} more
                  </span>
                )}
              </div>
            </div>
          )}
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
                  Runs: {script.triggerCount}x
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
      </div>

      {/* Prompt to create first script */}
      {hero.scripts.length === 0 && !showCreate && (
        <div className="text-center py-6">
          <p className="text-[#f9e2af] text-sm mb-2">You have automation unlocked!</p>
          <button
            onClick={() => setShowCreate(true)}
            className="text-sm text-[#cba6f7] hover:underline"
          >
            Click here to create your first script
          </button>
        </div>
      )}

      {/* Tip when they have scripts */}
      {hero.scripts.length > 0 && (
        <div className="mt-4 p-3 bg-[#181825] rounded-lg border border-[#313244]">
          <p className="text-xs text-[#6c7086]">
            <Lightning size={12} className="inline text-[#f9e2af] mr-1" />
            Buy more items in <span className="text-[#cba6f7]">Shop</span> to unlock {lockedConditions.length + lockedActions.length} more conditions & actions!
          </p>
        </div>
      )}
    </div>
  );
}
