'use client';

import { useState } from 'react';
import { MOCK_PRODUCTS } from '@/services/products';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/useCartStore';
import { ShoppingBag, Star, ShieldCheck, Truck, RotateCcw, Minus, Plus, Heart, Headphones, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = MOCK_PRODUCTS.find((p) => p.slug === params.slug);
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(0);

  if (!product) return notFound();

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 w-full">
      <div className="flex items-center gap-3 mb-12">
        <Link href="/shop">
          <Button variant="ghost" className="p-0 h-auto text-gray-400 hover:text-dark transition-colors gap-2 text-xs font-bold uppercase tracking-widest">
            <ArrowLeft className="w-3 h-3" /> Back to Collection
          </Button>
        </Link>
      </div >

      <div className="grid lg:grid-cols-12 gap-16 items-start">
        {/* Editorial Gallery */}
        <div className="lg:col-span-7 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="aspect-[4/5] rounded-[3rem] overflow-hidden bg-gray-50 border border-gray-100 relative group"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute top-6 right-6">
              <Button variant="outline" size="icon" className="rounded-full bg-white/80 backdrop-blur-md border-none shadow-xl hover:bg-white">
                <Heart className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" />
              </Button>
            </div >
          </motion.div>

          <div className="grid grid-cols-4 gap-6">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                onClick={() => setMainImage(i)}
                className={cn(
                  "aspect-square rounded-2xl overflow-hidden cursor-pointer transition-all border-2",
                  mainImage === i ? "border-accent shadow-lg" : "border-transparent opacity-70 hover:opacity-100"
                )}
              >
                <img src={product.image} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div >
        </div >

        {/* Product Narrative */}
        <div className="lg:col-span-5 flex flex-col gap-10 sticky top-32">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-accent/10 text-accent text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-3 h-3 fill-current" />
                <span className="text-xs font-bold">{product.rating} <span className="text-gray-400 font-normal">({product.reviewsCount} Reviews)</span></span>
              </div >
            </div >

            <h1 className="font-display text-5xl font-black text-dark tracking-tighter leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4">
              <span className="text-4xl font-black text-dark">
                ₦{(product.salePrice || product.price).toLocaleString()}
              </span>
              {product.salePrice && (
                <span className="text-xl text-gray-400 line-through font-light">
                  ₦{product.price.toLocaleString()}
                </span>
              )}
            </div >

            <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 space-y-4">
              <p className="text-gray-600 leading-relaxed text-lg font-light">
                {product.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                <ShieldCheck className="w-4 h-4" /> Guaranteed Authentic Premium Quality
              </div >
            </div >
          </div >

          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 p-1 bg-white rounded-2xl border border-gray-200 shadow-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-black text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div >
              <Button
                className="flex-1 gap-3 py-8 h-auto rounded-2xl bg-dark text-white hover:bg-accent transition-all duration-300 font-black text-base group"
                onClick={() => addItem({
                  id: product.id,
                  name: product.name,
                  price: product.salePrice || product.price,
                  quantity,
                  image: product.image,
                  slug: product.slug
                })}
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" /> Add to Cart
              </Button>
            </div >

            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-100">
              <FeatureItem icon={<Truck className="w-5 h-5" />} title="Global Delivery" desc="Free over ₦10,000" />
              <FeatureItem icon={<RotateCcw className="w-5 h-5" />} title="Easy Returns" desc="14-day window" />
              <FeatureItem icon={<ShieldCheck className="w-5 h-5" />} title="Secure Payment" desc="Encrypted" />
              <FeatureItem icon={<Headphones className="w-5 h-5" />} title="Concierge" desc="24/7 Support" />
            </div >
          </div >
        </div >
      </div >
    </div>
  );
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
      <div className="text-accent">{icon}</div>
      <div className="text-xs">
        <span className="font-bold block text-dark">{title}</span>
        <span className="text-gray-400 font-medium">{desc}</span>
      </div >
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
