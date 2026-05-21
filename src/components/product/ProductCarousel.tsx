'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CarouselItem {
  id: string;
  image: string;
  alt: string;
}

interface ProductCarouselProps {
  items: CarouselItem[];
  title?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export const ProductCarousel = ({
  items,
  title,
  autoPlay = false,
  autoPlayInterval = 5000,
}: ProductCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((i) => (i + 1) % items.length);
  const prev = () =>
    setCurrentIndex((i) => (i - 1 + items.length) % items.length);

  return (
    <div className="space-y-4">
      {title && (
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      )}

      <div className="relative group rounded-2xl overflow-hidden bg-gray-100">
        {/* Main Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="aspect-video"
          >
            <img
              src={items[currentIndex].image}
              alt={items[currentIndex].alt}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        {items.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all opacity-0 group-hover:opacity-100 z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all opacity-0 group-hover:opacity-100 z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Indicators */}
        {items.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all',
                  idx === currentIndex
                    ? 'bg-white w-6'
                    : 'bg-white/50 hover:bg-white/80'
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
