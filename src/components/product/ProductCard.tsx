'use client';

import { ShoppingBag, Star, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/useCartStore';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    salePrice: number | null;
    onSale: boolean;
    image: string;
    rating: number;
    reviewsCount: number;
  };
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCartStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-[2rem] p-4 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-50 mb-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-sm">
          <Link href={`/product/${product.slug}`}>
            <Button size="icon" variant="secondary" className="rounded-full bg-white text-dark hover:bg-white shadow-xl">
              <Eye className="w-4 h-4" />
            </Button>
          </Link>
        </div >

        {product.onSale && (
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent text-white text-[9px] font-black uppercase tracking-widest shadow-lg">
            Limited Edition
          </div>
        )}
      </div >

      {/* Info */}
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="font-display font-bold text-gray-900 text-lg group-hover:text-accent transition-colors line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-xs font-bold">{product.rating}</span>
          </div >
        </div >

        <div className="flex items-center gap-3">
          <span className="text-2xl font-black text-dark">
            ₦{(product.salePrice || product.price).toLocaleString()}
          </span>
          {product.salePrice && (
            <span className="text-sm text-gray-400 line-through">
              ₦{product.price.toLocaleString()}
            </span>
          )}
        </div >

        <Button
          className="w-full py-6 rounded-2xl bg-dark text-white hover:bg-accent transition-all duration-300 font-bold gap-2 group-hover:translate-y-[-2px]"
          onClick={() => addItem({
            id: product.id,
            name: product.name,
            price: product.salePrice || product.price,
            quantity: 1,
            image: product.image,
            slug: product.slug
          })}
        >
          <ShoppingBag className="w-4 h-4" /> Add to Cart
        </Button>
      </div>
    </motion.div>
  );
};
