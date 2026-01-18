'use client';

import { useGameStore } from '@/store/gameStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getChallengeById } from '@/data/challenges';
import { Brain, Clock, Lightning, CheckCircle } from '@phosphor-icons/react';

interface ReviewModeProps {
  onStartReview: (challengeId: string) => void;
}

export function ReviewMode({ onStartReview }: ReviewModeProps) {
  const reviewQueue = useGameStore((state) => state.reviewQueue);
  const dueReviews = useGameStore((state) => state.getDueReviews());

  if (dueReviews.length === 0) {
    return (
      <Card className="p-8 text-center">
        <CheckCircle size={48} className="mx-auto text-[#4ADE80] mb-4" />
        <h3 className="text-xl font-bold text-[#22223B] mb-2">All Caught Up!</h3>
        <p className="text-[#4A4E69]">
          No reviews due right now. Keep learning new concepts!
        </p>
        <div className="mt-6 text-sm text-[#9A8C98]">
          <Clock size={16} className="inline mr-1" />
          {reviewQueue.length} items in your review queue
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Brain size={28} className="text-[#A855F7]" />
        <div>
          <h2 className="text-xl font-bold text-[#22223B]">Spaced Review</h2>
          <p className="text-sm text-[#4A4E69]">
            Reinforce your knowledge with spaced repetition
          </p>
        </div>
      </div>

      <div className="p-4 bg-gradient-to-r from-[#A855F7]/10 to-[#3B82F6]/10 rounded-lg mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-[#22223B]">{dueReviews.length}</p>
            <p className="text-sm text-[#4A4E69]">Reviews due</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-[#4A4E69]">
              +{dueReviews.length * 10} XP potential
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {dueReviews.slice(0, 5).map((review) => {
          const challenge = getChallengeById(review.challengeId);
          if (!challenge) return null;

          return (
            <div
              key={review.challengeId}
              className="flex items-center justify-between p-3 border border-[#C9ADA7] rounded-lg"
            >
              <div>
                <p className="font-medium text-[#22223B]">{challenge.title}</p>
                <p className="text-xs text-[#4A4E69]">
                  Reviewed {review.repetitions} time{review.repetitions !== 1 ? 's' : ''}
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => onStartReview(review.challengeId)}
              >
                <Lightning size={16} className="mr-1" />
                Review
              </Button>
            </div>
          );
        })}
      </div>

      {dueReviews.length > 5 && (
        <p className="text-center text-sm text-[#4A4E69] mt-4">
          +{dueReviews.length - 5} more reviews due
        </p>
      )}
    </Card>
  );
}
