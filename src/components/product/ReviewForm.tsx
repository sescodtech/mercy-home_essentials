'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Rating } from '@/components/ui/rating';
import { useToast } from '@/hooks/useToast';

interface ReviewFormProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  productName: string;
  onSubmitSuccess?: () => void;
}

export const ReviewForm = ({
  isOpen,
  onClose,
  productId,
  productName,
  onSubmitSuccess,
}: ReviewFormProps) => {
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !comment.trim() || !userName.trim()) {
      error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, title, comment, userName }),
      });

      if (!response.ok) throw new Error('Failed to submit review');

      success('Review submitted successfully!');
      setTitle('');
      setComment('');
      setUserName('');
      setRating(5);
      onClose();
      onSubmitSuccess?.();
    } catch (err) {
      error('Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Review ${productName}`}
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose} className="rounded-lg">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-lg"
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </Button>
        </>
      }
    >
      <form className="space-y-6">
        {/* Name */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-900">
            Your Name
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/20"
            disabled={loading}
          />
        </div>

        {/* Rating */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-900">
            Rating
          </label>
          <Rating
            rating={rating}
            interactive
            onRate={setRating}
            size="lg"
          />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-900">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Sum up your experience"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/20"
            disabled={loading}
          />
        </div>

        {/* Comment */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-900">
            Your Review
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your detailed experience..."
            rows={5}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/20 resize-none"
            disabled={loading}
          />
          <p className="text-xs text-gray-500">
            {comment.length}/500 characters
          </p>
        </div>
      </form>
    </Modal>
  );
};
