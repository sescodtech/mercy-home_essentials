'use client';

import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Star, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
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
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-3xl p-3 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Image Wrapper */}
      <div className="relative h-64 rounded-2xl overflow-hidden bg-gray-50 mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.onSale && (
            <span className="bg-accent text-white text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider shadow-sm">
              Sale
            </span>
          )}
        </div >

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <Link href={`/product/${product.slug}`}>
            <Button size="icon" variant="secondary" className="rounded-full bg-white text-dark hover:bg-white">
              <Eye className="w-4 h-4" />
            </Button>
          </Link>
        </div >
      </div >

      {/* Content */}
      <div className="px-2 pb-2 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-gray-900 text-sm line-clamp-2 group-hover:text-accent transition-colors leading-tight">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-xs font-bold">{product.rating}</span>
          </div >
        </div >

        <div className="flex items-center gap-3">
          <span className="text-lg font-black text-dark">
            ${product.salePrice || product.price}
          </span>
          {product.salePrice && (
            <span className="text-xs text-gray-400 line-through">
              ${product.price}
            </span>
          )}
        </div >

        <Button
          className="w-full gap-2 py-2.5 h-auto"
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
      </div >
    </motion.div>
  );
};
