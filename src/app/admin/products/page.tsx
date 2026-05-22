'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, Search, Filter, MoreVertical, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to remove this exquisite piece from the collection?')) return;
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || p.category?.name === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...new Set(products.map(p => p.category?.name).filter(Boolean))];

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
          <p className="text-gray-400 font-medium text-sm tracking-widest uppercase">Indexing Inventory...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="font-display text-4xl font-black text-dark tracking-tight">Inventory Control</h1>
          <p className="text-gray-500 font-light">Curate and manage the exquisite pieces of Mercy Home Essentials.</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="rounded-2xl h-12 px-6 bg-dark text-white font-bold gap-2 group transition-all">
            <Plus className="w-4 h-4" /> Add New Piece <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-accent transition-colors" />
          <input
            type="text"
            placeholder="Search by name or SKU..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <div className="relative flex items-center gap-2 px-4 py-3 rounded-2xl border border-gray-200 bg-white text-gray-500 text-sm font-medium">
            <Filter className="w-4 h-4" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="outline-none bg-transparent cursor-pointer"
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-8 py-5 font-black text-[10px] uppercase tracking-[0.2em] text-gray-400">Product Asset</th>
              <th className="px-8 py-5 font-black text-[10px] uppercase tracking-[0.2em] text-gray-400">Category</th>
              <th className="px-8 py-5 font-black text-[10px] uppercase tracking-[0.2em] text-gray-400">Valuation</th>
              <th className="px-8 py-5 font-black text-[10px] uppercase tracking-[0.2em] text-gray-400">Stock Level</th>
              <th className="px-8 py-5 font-black text-[10px] uppercase tracking-[0.2em] text-gray-400 text-right">Operations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.tr
                  key={product._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="group hover:bg-gray-50/80 transition-all"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                        <img src={product.images?.[0]?.url || product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-bold text-sm text-dark group-hover:text-accent transition-colors">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm text-gray-500 font-medium">
                    {product.category?.name || 'Uncategorized'}
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="font-black text-sm text-dark">₦{product.price.toLocaleString()}</span>
                      {product.salePrice && (
                        <span className="text-[10px] text-accent font-bold">Save ₦{(product.price - product.salePrice).toLocaleString()}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-700",
                            product.stock < 10 ? "bg-red-500" : "bg-green-500"
                          )}
                          style={{ width: `${Math.min((product.stock / 100) * 100, 100)}%` }}
                        />
                      </div>
                      <span className={cn(
                        "text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-full border",
                        product.stock < 10 ? "bg-red-50 text-red-600 border-red-100" : "bg-green-50 text-green-600 border-green-100"
                      )}>
                        {product.stock} units
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <Link href={`/admin/products/${product._id}`}>
                        <Button variant="outline" size="icon" className="w-9 h-9 rounded-xl hover:bg-dark hover:text-white transition-all">
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-9 h-9 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-600 transition-all"
                        onClick={() => deleteProduct(product._id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table >
        {filteredProducts.length === 0 && (
          <div className="p-20 text-center space-y-4">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
              <Search className="w-8 h-8" />
            </div>
            <p className="text-gray-500 font-light">No assets matching your criteria were found in the vault.</p>
          </div>
        )}
      </div>
    </div>
  );
}
