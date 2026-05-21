'use client';

import { useEffect, useState } from 'react';
import { ProductCard } from './ProductCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeaturedProductsProps {
  limit?: number;
}

export const FeaturedProducts = ({ limit = 4 }: FeaturedProductsProps) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data.slice(0, limit));
      } catch (err) {
        console.error('Error fetching featured products:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [limit]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[...Array(limit)].map((_, i) => (
          <div key={i} className="h-80 bg-gray-100 rounded-3xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-accent mb-3">Bestsellers</p>
          <h2 className="font-display text-4xl font-black">Featured Products</h2>
        </div>
        <Link href="/shop">
          <Button variant="outline" className="hidden sm:flex gap-2">
            View All <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={{
              id: product._id,
              name: product.name,
              slug: product.slug,
              price: product.price,
              salePrice: product.salePrice,
              onSale: product.onSale,
              image: product.images[0]?.url,
              rating: product.rating,
              reviewsCount: product.reviewsCount,
            }}
          />
        ))}
      </div>
    </section>
  );
};
