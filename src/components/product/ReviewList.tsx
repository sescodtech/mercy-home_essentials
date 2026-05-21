'use client';

import { useEffect, useState } from 'react';
import { Rating } from '@/components/ui/rating';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface Review {
  id: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
  helpful: number;
  unhelpful: number;
  createdAt: Date;
}

interface ReviewListProps {
  productId: string;
  onRefresh?: () => void;
}

export const ReviewList = ({ productId, onRefresh }: ReviewListProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('recent');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchReviews();
  }, [productId, sortBy, currentPage]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/products/${productId}/reviews?sort=${sortBy}&page=${currentPage}`
      );
      const data = await response.json();
      setReviews(data.reviews);
      setAverageRating(data.averageRating);
      setTotalReviews(data.totalReviews);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-3 pb-4 border-b border-gray-200">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-64" />
            <Skeleton className="h-12 w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="flex items-center gap-8 pb-6 border-b border-gray-200">
        <div className="text-center">
          <div className="text-5xl font-black text-dark">{averageRating}</div>
          <Rating rating={averageRating} size="lg" className="justify-center mt-2" />
          <p className="text-xs text-gray-500 mt-2">{totalReviews} reviews</p>
        </div>

        {/* Sort */}
        <div className="ml-auto space-y-2">
          <p className="text-xs font-bold text-gray-600 uppercase">Sort by</p>
          <div className="flex gap-2">
            {['recent', 'helpful'].map((option) => (
              <button
                key={option}
                onClick={() => {
                  setSortBy(option);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                  sortBy === option
                    ? 'bg-accent text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="pb-4 border-b border-gray-200 last:border-0"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-gray-900">{review.userName}</h4>
                    {review.verified && (
                      <Badge variant="success" size="sm">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <Rating rating={review.rating} size="sm" />
                </div>
                <p className="text-xs text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>

              <h5 className="font-bold text-gray-900 mb-2">{review.title}</h5>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                {review.comment}
              </p>

              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-accent transition-colors">
                  <ThumbsUp className="w-3 h-3" />
                  <span>Helpful ({review.helpful})</span>
                </button>
                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500 transition-colors">
                  <ThumbsDown className="w-3 h-3" />
                  <span>Not helpful ({review.unhelpful})</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-8 text-gray-500">
            No reviews yet. Be the first to review!
          </p>
        )}
      </div>
    </div>
  );
};
