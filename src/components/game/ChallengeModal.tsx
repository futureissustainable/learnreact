'use client';

import { useState, useEffect } from 'react';
import { Challenge, ChallengeResult, Rarity } from '@/types/game';
import { useGameStore } from '@/store/gameStore';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  Lightning,
  CheckCircle,
  XCircle,
  Lightbulb,
  Star,
  Coin,
  Gift,
  ArrowRight,
  Code
} from '@phosphor-icons/react';

interface ChallengeModalProps {
  challenge: Challenge | null;
  skillId: string;
  onClose: () => void;
  onComplete: () => void;
}

export function ChallengeModal({
  challenge,
  skillId,
  onClose,
  onComplete
}: ChallengeModalProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [codeInputs, setCodeInputs] = useState<Record<string, string>>({});
  const [parsonsOrder, setParsonsOrder] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [result, setResult] = useState<ChallengeResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const completeChallenge = useGameStore((state) => state.completeChallenge);

  useEffect(() => {
    // Reset state when challenge changes
    setSelectedAnswer(null);
    setCodeInputs({});
    setParsonsOrder([]);
    setShowHint(false);
    setResult(null);
    setIsSubmitting(false);

    // Initialize parsons order
    if (challenge?.type === 'parsons' && challenge.content.shuffledLines) {
      setParsonsOrder(challenge.content.shuffledLines.map((_, i) => i));
    }
  }, [challenge]);

  if (!challenge) return null;

  const handleSubmit = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    let isCorrect = false;

    switch (challenge.type) {
      case 'multiple-choice':
        isCorrect = selectedAnswer === challenge.content.correctIndex;
        break;

      case 'code-completion':
        if (challenge.content.blanks) {
          isCorrect = challenge.content.blanks.every(
            (blank) =>
              codeInputs[blank.placeholder]?.trim().toLowerCase() ===
              blank.answer.toLowerCase()
          );
        }
        break;

      case 'parsons':
        if (challenge.content.correctOrder) {
          isCorrect = parsonsOrder.every(
            (val, idx) => val === challenge.content.correctOrder![idx]
          );
        }
        break;

      case 'debug':
        // For debug, we check if they identified the fix
        if (challenge.content.correctCode) {
          const userCode = codeInputs['debug']?.trim();
          isCorrect = userCode === challenge.content.correctCode.trim();
        }
        break;
    }

    const challengeResult = completeChallenge(challenge.id, isCorrect, skillId);
    setResult(challengeResult);
  };

  const handleNext = () => {
    onComplete();
    onClose();
  };

  const renderChallengeContent = () => {
    if (result) {
      return (
        <ResultView
          result={result}
          challenge={challenge}
          onNext={handleNext}
        />
      );
    }

    switch (challenge.type) {
      case 'multiple-choice':
        return (
          <MultipleChoiceChallenge
            challenge={challenge}
            selectedAnswer={selectedAnswer}
            onSelect={setSelectedAnswer}
          />
        );

      case 'code-completion':
        return (
          <CodeCompletionChallenge
            challenge={challenge}
            inputs={codeInputs}
            onInputChange={(key, value) =>
              setCodeInputs((prev) => ({ ...prev, [key]: value }))
            }
          />
        );

      case 'parsons':
        return (
          <ParsonsChallenge
            challenge={challenge}
            order={parsonsOrder}
            onReorder={setParsonsOrder}
          />
        );

      case 'debug':
        return (
          <DebugChallenge
            challenge={challenge}
            code={codeInputs['debug'] || ''}
            onCodeChange={(code) =>
              setCodeInputs((prev) => ({ ...prev, debug: code }))
            }
          />
        );

      default:
        return <div>Unknown challenge type</div>;
    }
  };

  const canSubmit = () => {
    switch (challenge.type) {
      case 'multiple-choice':
        return selectedAnswer !== null;
      case 'code-completion':
        return (
          challenge.content.blanks?.every(
            (blank) => codeInputs[blank.placeholder]?.trim()
          ) ?? false
        );
      case 'parsons':
        return parsonsOrder.length > 0;
      case 'debug':
        return codeInputs['debug']?.trim();
      default:
        return false;
    }
  };

  return (
    <Modal isOpen={!!challenge} onClose={onClose} size="lg">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <DifficultyStars difficulty={challenge.difficulty} />
            <span className="text-xs text-[#4A4E69] uppercase tracking-wide">
              {challenge.type.replace('-', ' ')}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-[#22223B]">{challenge.title}</h2>
          <p className="text-[#4A4E69] mt-1">{challenge.description}</p>
        </div>

        {/* Challenge Content */}
        <div className="min-h-[200px]">{renderChallengeContent()}</div>

        {/* Hint Button */}
        {challenge.hint && !showHint && !result && (
          <button
            onClick={() => setShowHint(true)}
            className="flex items-center gap-2 text-sm text-[#4A4E69] hover:text-[#22223B] transition-colors"
          >
            <Lightbulb size={18} />
            Need a hint?
          </button>
        )}

        {showHint && !result && (
          <div className="p-4 bg-[#F2E9E4] rounded-lg border-l-4 border-[#FFD700]">
            <div className="flex items-start gap-2">
              <Lightbulb size={20} className="text-[#FFD700] mt-0.5" />
              <p className="text-sm text-[#4A4E69]">{challenge.hint}</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        {!result && (
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit() || isSubmitting}
            className="w-full"
            size="lg"
          >
            <Lightning size={20} className="inline mr-2" />
            Submit Answer
          </Button>
        )}
      </div>
    </Modal>
  );
}

// Multiple Choice Component
function MultipleChoiceChallenge({
  challenge,
  selectedAnswer,
  onSelect
}: {
  challenge: Challenge;
  selectedAnswer: number | null;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="space-y-3">
      {challenge.content.question && (
        <div className="p-4 bg-[#22223B] text-[#F2E9E4] rounded-lg font-mono text-sm whitespace-pre-wrap">
          {challenge.content.question}
        </div>
      )}

      <div className="space-y-2">
        {challenge.content.options?.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(idx)}
            className={`
              w-full text-left p-4 rounded-lg border-2 transition-all
              ${
                selectedAnswer === idx
                  ? 'border-[#22223B] bg-[#F2E9E4]'
                  : 'border-[#C9ADA7] hover:border-[#9A8C98]'
              }
            `}
          >
            <span className="font-mono text-[#22223B]">{option}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Code Completion Component
function CodeCompletionChallenge({
  challenge,
  inputs,
  onInputChange
}: {
  challenge: Challenge;
  inputs: Record<string, string>;
  onInputChange: (key: string, value: string) => void;
}) {
  const template = challenge.content.codeTemplate || '';
  const blanks = challenge.content.blanks || [];

  // Render code with input fields
  const parts = template.split(/(\{\{[A-Z_0-9]+\}\})/g);

  return (
    <div className="code-editor rounded-lg p-4 font-mono text-sm">
      {parts.map((part, idx) => {
        const match = part.match(/\{\{([A-Z_0-9]+)\}\}/);
        if (match) {
          const placeholder = match[1];
          return (
            <input
              key={idx}
              type="text"
              value={inputs[placeholder] || ''}
              onChange={(e) => onInputChange(placeholder, e.target.value)}
              placeholder="???"
              className="bg-[#4A4E69] text-[#FFD700] px-2 py-0.5 rounded border-b-2 border-[#FFD700] outline-none min-w-[60px] max-w-[120px] font-mono"
              spellCheck={false}
            />
          );
        }
        return (
          <span key={idx} className="whitespace-pre-wrap">
            {part}
          </span>
        );
      })}
    </div>
  );
}

// Parsons Problem Component
function ParsonsChallenge({
  challenge,
  order,
  onReorder
}: {
  challenge: Challenge;
  order: number[];
  onReorder: (order: number[]) => void;
}) {
  const lines = challenge.content.shuffledLines || [];

  const moveUp = (idx: number) => {
    if (idx === 0) return;
    const newOrder = [...order];
    [newOrder[idx - 1], newOrder[idx]] = [newOrder[idx], newOrder[idx - 1]];
    onReorder(newOrder);
  };

  const moveDown = (idx: number) => {
    if (idx === order.length - 1) return;
    const newOrder = [...order];
    [newOrder[idx], newOrder[idx + 1]] = [newOrder[idx + 1], newOrder[idx]];
    onReorder(newOrder);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-[#4A4E69]">
        Drag or use arrows to arrange the code in the correct order:
      </p>
      <div className="space-y-2">
        {order.map((lineIdx, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 p-3 bg-[#22223B] text-[#F2E9E4] rounded-lg font-mono text-sm"
          >
            <div className="flex flex-col gap-1">
              <button
                onClick={() => moveUp(idx)}
                disabled={idx === 0}
                className="text-[#9A8C98] hover:text-white disabled:opacity-30"
              >
                ▲
              </button>
              <button
                onClick={() => moveDown(idx)}
                disabled={idx === order.length - 1}
                className="text-[#9A8C98] hover:text-white disabled:opacity-30"
              >
                ▼
              </button>
            </div>
            <code className="flex-1">{lines[lineIdx]}</code>
          </div>
        ))}
      </div>
    </div>
  );
}

// Debug Challenge Component
function DebugChallenge({
  challenge,
  code,
  onCodeChange
}: {
  challenge: Challenge;
  code: string;
  onCodeChange: (code: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-[#4A4E69] mb-2">Find and fix the bug:</p>
        <div className="code-editor rounded-lg p-4 font-mono text-sm">
          <pre>{challenge.content.buggyCode}</pre>
        </div>
      </div>

      <div>
        <p className="text-sm text-[#4A4E69] mb-2">
          Expected: <span className="font-medium">{challenge.content.expectedOutput}</span>
        </p>
      </div>

      <div>
        <p className="text-sm text-[#4A4E69] mb-2">Your fix:</p>
        <textarea
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          placeholder="Write the corrected code here..."
          className="w-full h-32 code-editor rounded-lg resize-none"
          spellCheck={false}
        />
      </div>
    </div>
  );
}

// Result View Component
function ResultView({
  result,
  challenge,
  onNext
}: {
  result: ChallengeResult;
  challenge: Challenge;
  onNext: () => void;
}) {
  return (
    <div className="space-y-6 animate-pop-in">
      {/* Result Header */}
      <div className="text-center">
        {result.correct ? (
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
            <CheckCircle size={48} weight="fill" className="text-green-500" />
          </div>
        ) : (
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-4">
            <XCircle size={48} weight="fill" className="text-red-500" />
          </div>
        )}
        <h3 className="text-2xl font-bold text-[#22223B]">{result.message}</h3>
      </div>

      {/* Rewards */}
      <div className="flex justify-center gap-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-[#F2E9E4] rounded-lg">
          <Star size={20} weight="fill" className="text-[#FFD700]" />
          <span className="font-bold text-[#22223B]">+{result.xpEarned} XP</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-[#F2E9E4] rounded-lg">
          <Coin size={20} weight="fill" className="text-[#FFD700]" />
          <span className="font-bold text-[#22223B]">+{result.goldEarned} Gold</span>
        </div>
      </div>

      {/* Item Drop */}
      {result.itemDropped && (
        <Card rarity={result.itemDropped.rarity} className="text-center animate-float">
          <div className="flex items-center justify-center gap-3">
            <Gift size={24} className="text-[#A855F7]" />
            <div>
              <p className="text-sm text-[#4A4E69]">Loot Dropped!</p>
              <p className="font-bold text-[#22223B]">{result.itemDropped.name}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Streak Bonus */}
      {result.streakBonus && result.streakBonus > 0 && (
        <p className="text-center text-sm text-[#4A4E69]">
          🔥 Streak bonus: +{Math.round(result.streakBonus * 100)}% rewards!
        </p>
      )}

      {/* Explanation */}
      <div className="p-4 bg-[#F2E9E4] rounded-lg">
        <div className="flex items-start gap-2">
          <Code size={20} className="text-[#22223B] mt-0.5" />
          <div>
            <p className="font-semibold text-[#22223B] mb-1">Explanation</p>
            <p className="text-sm text-[#4A4E69]">{challenge.explanation}</p>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <Button onClick={onNext} className="w-full" size="lg">
        Continue
        <ArrowRight size={20} className="inline ml-2" />
      </Button>
    </div>
  );
}

function DifficultyStars({ difficulty }: { difficulty: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          weight={i < difficulty ? 'fill' : 'regular'}
          className={i < difficulty ? 'text-[#FFD700]' : 'text-[#C9ADA7]'}
        />
      ))}
    </div>
  );
}
