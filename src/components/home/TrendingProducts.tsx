'use client';

import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { ProductCard } from '../product/ProductCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice: number | null;
  onSale: boolean;
  image: string;
  rating: number;
  reviewsCount: number;
}

interface TrendingProductsProps {
  products?: Product[];
  title?: string;
}

export const TrendingProducts = ({
  products = [],
  title = 'Trending Now',
}: TrendingProductsProps) => {
  if (products.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              <p className="text-xs font-black uppercase tracking-widest text-accent">
                Customer Favorites
              </p>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              {title}
            </h2>
          </div>

          <Link href="/shop">
            <Button
              variant="outline"
              className="rounded-full gap-2 hover:border-accent"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
