'use client';

import { useState, useEffect } from 'react';
import { MOCK_PRODUCTS } from '@/services/products';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SlidersHorizontal, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    { id: 'all', label: 'All', emoji: '🏪' },
    { id: 'kitchen', label: 'Kitchen', emoji: '🍳' },
    { id: 'office', label: 'Office', emoji: '💼' },
    { id: 'tech', label: 'Tech', emoji: '💻' },
    { id: 'security', label: 'Security', emoji: '🔐' },
    { id: 'wellness', label: 'Wellness', emoji: '💆' },
    { id: 'gaming', label: 'Gaming', emoji: '🎮' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 min-h-screen">
      {/* Header & Filters */}
      <div className="flex flex-col gap-6 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl font-black">
              {activeCategory === 'all' ? 'Our Collection' : `The ${activeCategory} Edit`}
            </h1>
            <p className="text-gray-500 text-sm mt-1">Discover the best in premium home and office essentials.</p>
          </div >

          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:flex-none w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div >
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </Button>
          </div >
        </div >

        {/* Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap",
                activeCategory === cat.id
                  ? "bg-accent text-white shadow-md scale-105"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-accent hover:text-accent"
              )}
            >
              <span className="mr-1">{cat.emoji}</span> {cat.label}
            </button>
          ))}
        </div >
      </div >

      <div className="flex gap-8">
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-8">
          <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-accent" /> Filters
            </h3>

            <div className="space-y-6">
              <div>
                <p className="text-[11px] font-black uppercase text-gray-500 mb-3">Price Range</p>
                <div className="flex items-center gap-2">
                  <Input type="number" placeholder="Min" className="h-9" />
                  <span className="text-gray-300">—</span>
                  <Input type="number" placeholder="Max" className="h-9" />
                </div >
              </div >

              <div>
                <p className="text-[11px] font-black uppercase text-gray-500 mb-3">Sorting</p>
                <select className="w-full p-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-accent/20">
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div >
            </div >
          </div >
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div >
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="font-bold text-xl mb-2">No products found</h3>
              <p className="text-gray-500 text-sm mb-6">Try adjusting your search or category filters.</p>
              <Button
                variant="outline"
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              >
                Clear All Filters
              </Button>
            </div >
          )}
        </div >
      </div >
    </div>
  );
}
