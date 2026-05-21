'use client';

import { Heart } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/useToast';

interface WishlistButtonProps {
  productId: string;
  productName: string;
  size?: 'sm' | 'md' | 'lg';
}

export const WishlistButton = ({
  productId,
  productName,
  size = 'md',
}: WishlistButtonProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { success, error } = useToast();

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const handleToggleWishlist = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 300));

      setIsWishlisted(!isWishlisted);
      success(
        isWishlisted
          ? `Removed ${productName} from wishlist`
          : `Added ${productName} to wishlist`
      );
    } catch (err) {
      error('Failed to update wishlist');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleWishlist}
      disabled={isLoading}
      className={cn(
        'rounded-lg transition-all hover:scale-110 active:scale-95',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        sizes[size],
        isWishlisted
          ? 'bg-red-50 text-red-500 hover:bg-red-100'
          : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
      )}
      title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Heart
        className={cn(iconSizes[size], isWishlisted && 'fill-current')}
      />
    </button>
  );
};
