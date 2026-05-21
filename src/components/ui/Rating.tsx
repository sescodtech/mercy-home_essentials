import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingProps {
  rating: number;
  reviewsCount?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRate?: (rating: number) => void;
  className?: string;
}

export const Rating = ({
  rating,
  reviewsCount,
  size = 'md',
  interactive = false,
  onRate,
  className,
}: RatingProps) => {
  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex gap-0.5">
        {stars.map((star) => (
          <button
            key={star}
            disabled={!interactive}
            onClick={() => interactive && onRate?.(star)}
            className={cn(
              'transition-all',
              interactive && 'cursor-pointer hover:scale-110',
              !interactive && 'cursor-default'
            )}
          >
            <Star
              className={cn(
                sizes[size],
                'transition-colors',
                star <= Math.round(rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              )}
            />
          </button>
        ))}
      </div>
      <span className={cn('text-gray-600 font-medium', textSizes[size])}>
        {rating.toFixed(1)}
      </span>
      {reviewsCount !== undefined && (
        <span className={cn('text-gray-400', textSizes[size])}>
          ({reviewsCount})
        </span>
      )}
    </div>
  );
};
