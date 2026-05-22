'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heart, ShoppingBag, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const res = await fetch('/api/user/wishlist');
        const data = await res.json();
        setWishlist(data);
      } catch (err) {
        console.error('Error fetching wishlist:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchWishlist();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
          <p className="text-gray-400 font-medium text-sm tracking-widest uppercase">Curating Your Favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto w-full space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center text-accent">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Personal Curation</span>
          </div>
          <h1 className="font-display text-4xl font-black text-dark tracking-tight">My Wishlist</h1>
          <p className="text-gray-500 font-light">A curated collection of pieces that define your future space.</p>
        </div>
        <Link href="/shop">
          <Button className="rounded-2xl h-12 px-6 bg-dark text-white font-bold gap-2 group transition-all">
            <ShoppingBag className="w-4 h-4" /> Continue Shopping <Sparkles className="w-4 h-4 ml-1 text-accent" />
          </Button>
        </Link>
      </div>

      {wishlist.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-24 bg-white rounded-[3rem] border border-gray-100 shadow-sm"
        >
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 relative">
            <Heart className="w-10 h-10 text-gray-300" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 rounded-full bg-accent/5"
            />
          </div>
          <h3 className="text-xl font-bold text-dark mb-2">Your Gallery is Empty</h3>
          <p className="text-gray-500 font-light mb-10 max-w-xs mx-auto px-6">
            The most exquisite pieces are waiting to be discovered. Begin curating your home.
          </p>
          <Link href="/shop">
            <Button variant="outline" className="rounded-full px-8 h-12 font-bold hover:bg-dark hover:text-white transition-all">
              Explore The Boutique
            </Button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          <AnimatePresence>
            {wishlist.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                whileHover={{ y: -5 }}
              >
                <ProductCard
                  product={{
                    id: product._id,
                    name: product.name,
                    slug: product.slug,
                    price: product.price,
                    salePrice: product.salePrice,
                    onSale: product.onSale,
                    image: product.images?.[0]?.url || product.image,
                    rating: product.rating,
                    reviewsCount: product.reviewsCount,
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
