'use client';

import { useState, useEffect } from 'react';
import { MOCK_PRODUCTS } from '@/services/products';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SlidersHorizontal, Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function ShopPage() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    let filtered = MOCK_PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (activeCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === activeCategory);
    }

    setProducts(filtered);
  }, [searchQuery, activeCategory]);

  const categories = [
    { id: 'all', label: 'All Collections', emoji: '' },
    { id: 'kitchen', label: 'Kitchen Luxe', emoji: '' },
    { id: 'office', label: 'Executive Office', emoji: '' },
    { id: 'tech', label: 'Digital Innovation', emoji: '' },
    { id: 'security', label: 'Secure Living', emoji: '' },
    { id: 'wellness', label: 'Home Wellness', emoji: '' },
    { id: 'gaming', label: 'Gaming Suite', emoji: '' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 min-h-screen bg-white">
      {/* Boutique Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
        <div className="space-y-4">
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-accent">Curated Inventory</p>
          <h1 className="font-display text-5xl md:text-6xl font-black tracking-tighter text-dark leading-tight">
            {activeCategory === 'all' ? 'The Full Collection' : `The ${activeCategory} Edit`}
          </h1>
          <p className="text-gray-400 text-lg font-light max-w-xl">
            A symphony of design and utility. Explore our most exclusive pieces crafted for the modern home.
          </p>
        </div >

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus:text-accent" />
            <Input
              placeholder="Search the archives..."
              className="pl-11 pr-4 h-14 rounded-full bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-accent/20 transition-all text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div >
          <Button
            variant="outline"
            className="h-14 px-6 rounded-full gap-2 font-bold border-gray-200 hover:bg-gray-50 transition-all"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="w-4 h-4" /> Filters
          </Button>
        </div >
      </div >

      {/* Minimalist Category Bar */}
      <div className="flex items-center gap-3 overflow-x-auto pb-12 no-scrollbar border-b border-gray-100 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap",
              activeCategory === cat.id
                ? "bg-dark text-white shadow-lg scale-105"
                : "bg-transparent text-gray-400 hover:text-dark hover:bg-gray-100"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div >

      <div className="flex gap-12">
        {/* Sophisticated Sidebar */}
        <aside className="hidden lg:block w-72 shrink-0 space-y-12">
          <div className="space-y-10">
            <div className="space-y-6">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-dark border-b border-gray-100 pb-4">Price Spectrum</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-medium text-gray-500">
                  <span>Min</span>
                  <span>Max</span>
                </div >
                <div className="flex items-center gap-3">
                  <Input type="number" placeholder="0" className="h-10 rounded-xl bg-gray-50 border-none ring-1 ring-gray-200" />
                  <Input type="number" placeholder="10k" className="h-10 rounded-xl bg-gray-50 border-none ring-1 ring-gray-200" />
                </div >
              </div >
            </div >

            <div className="space-y-6">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-dark border-b border-gray-100 pb-4">Sorting Order</h3>
              <div className="grid grid-cols-1 gap-2">
                {['Featured', 'Price: Low to High', 'Price: High to Low', 'Top Rated'].map((option) => (
                  <button key={option} className="text-left px-3 py-2 rounded-lg text-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-dark transition-all">
                    {option}
                  </button>
                ))}
              </div >
            </div >
          </div >
        </aside>

        {/* Product Gallery */}
        <div className="flex-1">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
              {products.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <ProductCard key={product.id} product={product} />
                </motion.div>
              ))}
            </div >
          ) : (
            <div className="text-center py-32 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="font-display text-3xl font-black mb-4">No artifacts found</h3>
              <p className="text-gray-500 text-lg font-light mb-10 max-w-md mx-auto">
                Our archives currently hold no pieces matching your specific criteria.
              </p>
              <Button
                variant="outline"
                className="rounded-full px-8 py-6 font-bold hover:bg-dark hover:text-white transition-all"
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              >
                Reset All Filters
              </Button>
            </div >
          )}
        </div >
      </div >
    </div>
  );
}
