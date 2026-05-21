'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import Link from 'next/link';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

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
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="p-8">Loading products...</div>;

  return (
    <div className="p-8 w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-display text-3xl font-black">Product Management</h1>
          <p className="text-gray-500">Manage your premium inventory</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" /> Add Product
          </Button>
        </Link>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-accent/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 font-bold text-xs uppercase tracking-widest text-gray-400">Product</th>
              <th className="p-4 font-bold text-xs uppercase tracking-widest text-gray-400">Category</th>
              <th className="p-4 font-bold text-xs uppercase tracking-widest text-gray-400">Price</th>
              <th className="p-4 font-bold text-xs uppercase tracking-widest text-gray-400">Stock</th>
              <th className="p-4 font-bold text-xs uppercase tracking-widest text-gray-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredProducts.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={product.images[0]?.url} className="w-10 h-10 rounded-lg object-cover" alt={product.name} />
                    <span className="font-bold text-sm">{product.name}</span>
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-500">{product.category?.name}</td>
                <td className="p-4 font-bold text-sm">₦{product.price.toLocaleString()}</td>
                <td className="p-4">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${product.stock < 10 ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
                    {product.stock} in stock
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/products/${product._id}`}>
                      <Button variant="outline" size="icon" className="w-8 h-8">
                        <Pencil className="w-3 h-3" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="icon" className="w-8 h-8 text-red-500 hover:bg-red-50" onClick={() => deleteProduct(product._id)}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredProducts.length === 0 && (
          <div className="p-12 text-center text-gray-400">No products found.</div>
        )}
      </div>
    </div>
  );
}
