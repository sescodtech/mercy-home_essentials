'use client';

import { useState, useEffect } from 'react';
import { MOCK_PRODUCTS } from '@/services/products';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { ProductFilters, FilterState } from '@/components/product/ProductFilters';
import { SearchBar } from '@/components/product/SearchBar';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function ShopPage() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    priceMin: 0,
    priceMax: 100000,
    categories: [],
    rating: 0,
    sortBy: 'featured',
  });

  useEffect(() => {
    let filtered = MOCK_PRODUCTS;

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter((p) =>
        filters.categories.includes(p.category)
      );
    }

    // Apply price filter
    filtered = filtered.filter(
      (p) => p.price >= filters.priceMin && p.price <= filters.priceMax
    );

    // Apply rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter((p) => p.rating >= filters.rating);
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-low':
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered = filtered.reverse();
        break;
    }

    setProducts(filtered);
  }, [filters]);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      const searchResults = MOCK_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      );
      setProducts(searchResults);
    }
  };

  const handleClearFilters = () => {
    setFilters({
      priceMin: 0,
      priceMax: 100000,
      categories: [],
      rating: 0,
      sortBy: 'featured',
    });
  };

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
    <div className="min-h-screen bg-white pt-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Shop', href: '/shop' },
          ]}
        />

        <div className="space-y-4">
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-accent">
            Curated Inventory
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-black tracking-tighter text-dark leading-tight">
            The Full Collection
          </h1>
          <p className="text-gray-400 text-lg font-light max-w-xl">
            A symphony of design and utility. Explore our most exclusive pieces crafted for the modern home.
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search products..."
        />
      </div>

      {/* Category Bar */}
      <div className="border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-3 overflow-x-auto py-4 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className="px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all hover:bg-dark hover:text-white text-gray-600"
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex gap-12">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-72 shrink-0 sticky top-32 max-h-[calc(100vh-200px)] overflow-y-auto">
            <ProductFilters
              filters={filters}
              onFilterChange={setFilters}
              onClearFilters={handleClearFilters}
            />
          </aside>

          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-6">
            <Button
              variant="outline"
              className="w-full rounded-lg gap-2 justify-center"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="w-4 h-4" /> Filters
            </Button>
          </div>

          {/* Mobile Filters - Overlay */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={() => setIsFilterOpen(false)}
              >
                <motion.div
                  initial={{ x: -400 }}
                  animate={{ x: 0 }}
                  exit={{ x: -400 }}
                  className="fixed left-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-lg font-bold mb-6">Filters</h3>
                  <ProductFilters
                    filters={filters}
                    onFilterChange={setFilters}
                    onClearFilters={handleClearFilters}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product Grid */}
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
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="font-display text-3xl font-black mb-4">
                  No products found
                </h3>
                <p className="text-gray-500 text-lg font-light mb-10 max-w-md mx-auto">
                  Our archives currently hold no pieces matching your specific criteria.
                </p>
                <Button
                  variant="outline"
                  className="rounded-full px-8 py-6 font-bold hover:bg-dark hover:text-white transition-all"
                  onClick={handleClearFilters}
                >
                  Reset All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
