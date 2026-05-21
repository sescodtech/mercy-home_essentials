'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Clock } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface FlashSaleProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice: number;
  onSale: boolean;
  image: string;
  rating: number;
  reviewsCount: number;
  discount: number;
}

interface FlashSaleSectionProps {
  products?: FlashSaleProduct[];
  endTime?: Date;
}

export const FlashSaleSection = ({
  products = [],
  endTime,
}: FlashSaleSectionProps) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (!endTime) return;

    const updateTimer = () => {
      const now = new Date();
      const diff = endTime.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft('EXPIRED');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(
        `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  if (products.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-r from-accent/10 to-orange-50 border-t border-b border-accent/20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-accent text-white">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-accent">
                Limited Time Offer
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                Flash Sale
              </h2>
            </div>
          </div>

          {/* Timer */}
          {timeLeft && timeLeft !== 'EXPIRED' && (
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-accent" />
              <div className="text-right">
                <p className="text-xs text-gray-600 font-medium">Ends In</p>
                <p className="text-2xl font-black text-accent font-mono">
                  {timeLeft}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {products.slice(0, 4).map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/shop">
            <Button className="rounded-full px-10 py-6 bg-accent hover:bg-orange-600 text-white font-bold">
              View All Deals
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
