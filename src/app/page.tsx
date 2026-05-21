'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FeaturedProducts } from '@/components/product/FeaturedProducts';
import { Testimonials } from '@/components/shared/Testimonials';

export default function HomePage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-dark text-white overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0 opacity-20 pointer-events-none"
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '36px 36px' }}
        />
        <div className="absolute top-[-10%] right-[-10%] w-1/2 h-1/2 rounded-full opacity-20 blur-3xl bg-accent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-16 grid md:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold text-orange-300">
              <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
              Limited Time Offer
            </div >
            <h1 className="font-display text-5xl md:text-7xl font-black leading-tight">
              Upgrade Your<br />
              <span className="text-accent">Home & Office</span><br />
              Experience
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
              Premium gadgets, kitchen essentials & office tools curated for modern living.
              Experience luxury in every detail.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop">
                <Button size="lg" className="gap-2 group">
                  Shop Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="text-white border-white/20 hover:bg-white/10">
                  Our Story
                </Button>
              </Link>
            </div >

            <div className="flex gap-8 pt-8 border-t border-white/10">
              <div className="text-start">
                <div className="text-3xl font-black">5,000+</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">Happy Customers</div>
              </div >
              <div className="text-start">
                <div className="text-3xl font-black">200+</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">Premium Products</div>
              </div >
              <div className="text-start">
                <div className="text-3xl font-black">4.9★</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">Avg Rating</div>
              </div >
            </div >
          </motion.div>

          <div className="hidden md:grid grid-cols-2 gap-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="space-y-4"
            >
              <div className="h-64 rounded-3xl overflow-hidden shadow-2xl group cursor-pointer relative">
                <img src="https://images.unsplash.com/photo-1625937286074-9ca519d5d9df?auto=format&fit=crop&w=500&q=80" alt="Kitchen" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-4 left-4 text-white text-xs font-bold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">Kitchen</span>
              </div >
              <div className="h-48 rounded-3xl overflow-hidden shadow-2xl group cursor-pointer relative">
                <img src="https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=500&q=80" alt="Office" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-4 left-4 text-white text-xs font-bold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">Office</span>
              </div >
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="space-y-4 pt-8"
            >
              <div className="h-48 rounded-3xl overflow-hidden shadow-2xl group cursor-pointer relative">
                <img src="https://images.unsplash.com/photo-1541140532154-b024d705b90a?auto=format&fit=crop&w=500&q=80" alt="Tech" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-4 left-4 text-white text-xs font-bold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">Tech</span>
              </div >
              <div className="h-64 rounded-3xl overflow-hidden shadow-2xl group cursor-pointer relative">
                <img src="https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=500&q=80" alt="Gaming" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-4 left-4 text-white text-xs font-bold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">Gaming</span>
              </div >
            </motion.div>
          </div >
        </div >
      </section>

      {/* Trust Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4">
          <TrustItem icon={<Truck className="w-5 h-5 text-accent" />} title="Free Delivery" desc="Orders over ₦10,000" />
          <TrustItem icon={<ShieldCheck className="w-5 h-5 text-accent" />} title="Quality Guaranteed" desc="100% authentic" />
          <TrustItem icon={<RotateCcw className="w-5 h-5 text-accent" />} title="Easy Returns" desc="14-day policy" />
          <TrustItem icon={<Headphones className="w-5 h-5 text-accent" />} title="24/7 Support" desc="Always here for you" />
        </div >
      </div >

      {/* Categories Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
        <div className="flex items-end justify-between mb-12">
          <div >
            <p className="text-[11px] font-bold uppercase tracking-widest text-accent mb-3">Curated Collections</p>
            <h2 className="font-display text-4xl font-black">Shop by Category</h2>
          </div >
          <Link href="/shop">
            <Button variant="outline" className="hidden sm:flex gap-2">
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div >
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
             {[...Array(6)].map((_, i) => (
               <div key={i} className="h-48 bg-gray-100 rounded-3xl animate-pulse" />
             ))}
          </div >
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <CategoryCard
                key={cat._id}
                name={cat.name}
                emoji={cat.emoji || '📦'}
                href={`/shop?cat=${cat.slug}`}
                img={cat.image}
              />
            ))}
          </div >
        )}
      </section>

      <FeaturedProducts limit={8} />
      <Testimonials />
    </div>
  );
}

function TrustItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-center gap-4 py-6 px-4">
      <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0">
        {icon}
      </div >
      <div className="text-start">
        <div className="font-bold text-sm">{title}</div>
        <div className="text-gray-400 text-xs">{desc}</div>
      </div >
    </div >
  );
}

function CategoryCard({ name, emoji, href, img }: { name: string, emoji: string, href: string, img: string }) {
  return (
    <Link href={href} className="group relative h-48 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all">
      <img src={img} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 text-white">
        <span className="text-xl">{emoji}</span>
        <span className="font-bold text-sm">{name}</span>
      </div >
    </Link>
  );
}
