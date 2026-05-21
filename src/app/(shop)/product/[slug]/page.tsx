'use client';

import { useState } from 'react';
import { MOCK_PRODUCTS } from '@/services/products';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/useCartStore';
import { ShoppingBag, Star, ShieldCheck, Truck, RotateCcw, Minus, Plus, Heart, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';
import { notFound } from 'next/navigation';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = MOCK_PRODUCTS.find((p) => p.slug === params.slug);
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  if (!product) return notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-4"
        >
          <div className="aspect-square rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 group">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div >
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden border border-gray-100 cursor-pointer hover:border-accent transition-colors">
                <img src={product.image} alt={`View ${i}`} className="w-full h-full object-cover" />
              </div >
            ))}
          </div >
        </motion.div>

        {/* Product Info */}
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-orange-50 text-accent text-[10px] font-black uppercase tracking-widest rounded-md">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-3 h-3 fill-current" />
                <span className="text-xs font-bold">{product.rating} ({product.reviewsCount} Reviews)</span>
              </div >
            </div >
            <h1 className="font-display text-4xl font-black text-dark">{product.name}</h1>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-black text-dark">${product.salePrice || product.price}</span>
              {product.salePrice && (
                <span className="text-lg text-gray-400 line-through">${product.price}</span>
              )}
            </div >
          </div >

          <p className="text-gray-600 leading-relaxed text-lg">
            {product.description}
          </p>

          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-xl border border-gray-200">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-white rounded-lg transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-white rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div >
              <Button
                className="flex-1 gap-2 py-6 h-auto"
                onClick={() => addItem({
                  id: product.id,
                  name: product.name,
                  price: product.salePrice || product.price,
                  quantity,
                  image: product.image,
                  slug: product.slug
                })}
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </Button>
              <Button variant="outline" size="icon" className="rounded-xl">
                <Heart className="w-4 h-4" />
              </Button>
            </div >
          </div >

          <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-100">
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-gray-50">
              <Truck className="w-5 h-5 text-accent" />
              <div className="text-xs">
                <span className="font-bold block">Fast Delivery</span>
                <span className="text-gray-500">Free over ₦10,000</span>
              </div >
            </div >
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-gray-50">
              <ShieldCheck className="w-5 h-5 text-accent" />
              <div className="text-xs">
                <span className="font-bold block">Secure Payment</span>
                <span className="text-gray-500">Encrypted checkout</span>
              </div >
            </div >
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-gray-50">
              <RotateCcw className="w-5 h-5 text-accent" />
              <div className="text-xs">
                <span className="font-bold block">Easy Returns</span>
                <span className="text-gray-500">14-day return window</span>
              </div >
            </div >
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-gray-50">
              <Headphones className="w-5 h-5 text-accent" />
              <div className="text-xs">
                <span className="font-bold block">24/7 Support</span>
                <span className="text-gray-500">Always here to help</span>
              </div >
            </div >
          </div >
        </div >
      </div >
    </div>
  );
}
