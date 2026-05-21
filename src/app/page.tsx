'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Truck, ShieldCheck, RotateCcw, Headphones, ShoppingBag, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FeaturedProducts } from '@/components/product/FeaturedProducts';
import { Testimonials } from '@/components/shared/Testimonials';

export default function HomePage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col bg-white">
      {/* Cinematic Hero Section */}
      <section className="relative h-screen w-full overflow-hidden bg-dark">
        {/* Background Image with a soft zoom effect */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-160058459176C-89234567890?auto=format&fit=crop&w=1920&q=80"
            className="w-full h-full object-cover opacity-60"
            alt="Luxury Home Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-dark/20 to-dark" />
        </motion.div>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl space-y-8"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em]">
              <span className="w-1 h-1 bg-accent rounded-full animate-pulse" />
              Est. 2024 • Premium Curations
            </div >

            <h1 className="font-display text-6xl md:text-8xl font-black text-white leading-[1.1] tracking-tight">
              Refining the Art of <br />
              <span className="text-accent italic font-serif">Modern Living.</span>
            </h1>

            <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-xl font-light">
              A meticulously curated collection of premium home and office essentials designed for those who appreciate the intersection of luxury and functionality.
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
              <Link href="/shop">
                <Button size="lg" className="h-16 px-10 rounded-full bg-accent hover:bg-accent/90 text-white font-bold gap-3 group overflow-hidden relative">
                  <span className="relative z-10">Explore Collection</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="h-16 px-10 rounded-full text-white border-white/30 hover:bg-white/10 backdrop-blur-sm font-bold">
                  The Story
                </Button>
              </Link>
            </div >
          </motion.div>
        </div >

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Minimalist Trust Strip */}
      <div className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <TrustItem icon={<Truck className="w-5 h-5" />} title="Global Shipping" desc="Complimentary on premium orders" />
          <TrustItem icon={<ShieldCheck className="w-5 h-5" />} title="Certified Quality" desc="100% authentic luxury goods" />
          <TrustItem icon={<RotateCcw className="w-5 h-5" />} title="Bespoke Returns" desc="White-glove 14-day policy" />
          <TrustItem icon={<Headphones className="w-5 h-5" />} title="Private Concierge" desc="Dedicated 24/7 assistance" />
        </div >
      </div >

      {/* Editorial Categories Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="space-y-4">
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-accent">The Collections</p>
              <h2 className="font-display text-5xl font-black tracking-tight">Curated by <br />Expert Designers</h2>
            </div >
            <Link href="/shop">
              <Button variant="outline" className="rounded-full px-8 py-6 font-bold group">
                View All Collections <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div >

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto">
            {/* Feature Category 1 (Large) */}
            <div className="md:col-span-2 relative h-[600px] rounded-3xl overflow-hidden group cursor-pointer">
              <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Kitchen" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-12 left-12 space-y-4">
                <h3 className="text-white text-4xl font-black">Culinary Arts</h3>
                <p className="text-gray-300 max-w-xs font-light">Elevate your kitchen with professional-grade essentials.</p>
                <Link href="/shop?cat=kitchen" className="inline-flex items-center gap-2 text-white font-bold text-sm group">
                  Shop Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div >
            </div >

            {/* Feature Category 2 (Small) */}
            <div className="grid grid-cols-1 gap-6 h-full">
              <div className="relative h-1/2 rounded-3xl overflow-hidden group cursor-pointer">
                <img src="https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Office" />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold">Executive Office</h3>
                  <Link href="/shop?cat=office" className="text-xs font-bold uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity">Discover $\rightarrow$</Link>
                </div >
              </div >
              <div className="relative h-1/2 rounded-3xl overflow-hidden group cursor-pointer">
                <img src="https://images.unsplash.com/photo-1541140532154-b024d705b90a?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Tech" />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold">Digital Innovation</h3>
                  <Link href="/shop?cat=tech" className="text-xs font-bold uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity">Discover $\rightarrow$</Link>
                </div >
              </div >
            </div >
          </div >
        </div >
      </section>

      <FeaturedProducts limit={8} />

      {/* Brand Philosophy Section */}
      <section className="py-24 bg-dark text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <img src="https://images.unsplash.com/photo-1513518343862-379775C5700c?auto=format&fit=crop&w=800&q=80" alt="Philosophy" className="w-full h-auto" />
            </motion.div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-accent rounded-full blur-3xl opacity-20" />
          </div >
          <div className="space-y-8">
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-accent">Our Philosophy</p>
            <h2 className="font-display text-5xl font-black leading-tight">Beyond utility, <br /> we curate <span className="italic font-serif text-gray-400">experience.</span></h2>
            <p className="text-gray-400 text-lg leading-relaxed font-light">
              At Mercy Home Essentials, we believe that the objects you surround yourself with define the energy of your space. We don't just sell products; we source pieces that inspire productivity, comfort, and a sense of effortless luxury.
            </p>
            <Link href="/about">
              <Button variant="outline" className="rounded-full px-8 py-6 text-white border-white/20 hover:bg-white/10 font-bold">
                Learn More About Us
              </Button>
            </Link>
          </div >
        </div >
      </section>

      <Testimonials />

      {/* Newsletter Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="font-display text-4xl font-black tracking-tight">Join the Inner Circle</h2>
          <p className="text-gray-500 text-lg font-light">Receive early access to limited drops and private invitations to our seasonal curation events.</p>
          <div className="flex max-w-md mx-auto gap-3">
            <input
              type="email"
              placeholder="email@luxury.com"
              className="flex-1 p-4 rounded-full border border-gray-200 outline-none focus:ring-2 focus:ring-accent/20 transition-all"
            />
            <Button className="rounded-full px-8 py-4 font-bold">Join</Button>
          </div >
        </div >
      </section>
    </div>
  );
}

function TrustItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-center gap-4 py-4">
      <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0 text-accent">
        {icon}
      </div >
      <div className="text-start">
        <div className="font-bold text-sm text-dark">{title}</div>
        <div className="text-gray-400 text-[10px] uppercase tracking-widest font-medium">{desc}</div>
      </div >
    </div>
  );
}
