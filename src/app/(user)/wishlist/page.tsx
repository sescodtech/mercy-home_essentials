'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';

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

  if (loading) return <div className="p-8 text-center">Loading wishlist...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 w-full">
      <div className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="font-display text-4xl font-black">My Wishlist</h1>
          <p className="text-gray-500">Save your favorite premium pieces for later</p>
        </div>
        <Link href="/shop">
          <Button className="gap-2">
            <ShoppingBag className="w-4 h-4" /> Continue Shopping
          </Button>
        </Link>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
          <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-6">Your wishlist is empty.</p>
          <Link href="/shop">
            <Button>Explore Products</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {wishlist.map((product) => (
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
      )}
    </div>
  );
}
