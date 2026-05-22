'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Package, Image as ImageIcon, Tag, DollarSign, Save, ArrowLeft, UploadCloud } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function NewProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    salePrice: '',
    category: '',
    stock: '',
    images: '',
    onSale: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          salePrice: form.salePrice ? Number(form.salePrice) : null,
          stock: Number(form.stock),
          images: form.images.split(',').map(url => ({ url: url.trim() })),
        }),
      });

      if (!res.ok) throw new Error('Failed to create product');

      router.push('/admin/products');
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto w-full space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.back()}
            className="rounded-xl h-10 w-10"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="font-display text-3xl font-black text-dark tracking-tight">New Acquisition</h1>
            <p className="text-gray-500 font-light">Add a new premium piece to your curated collection.</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="rounded-xl h-11 font-bold text-xs uppercase tracking-widest"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="rounded-xl h-11 bg-dark text-white font-bold text-xs uppercase tracking-widest gap-2 shadow-lg shadow-dark/20"
          >
            {isLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
            Publish Product
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
        {/* Core Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                <Package className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-dark">Product Specifications</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Product Name</label>
                <Input
                  placeholder="e.g. Minimalist Leather Desk Mat"
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  required
                  className="h-12 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Detailed Description</label>
                <textarea
                  placeholder="Describe the craftsmanship, materials and utility..."
                  value={form.description}
                  onChange={(e) => setForm({...form, description: e.target.value})}
                  className="w-full h-40 p-4 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Category</label>
                  <Input
                    placeholder="e.g. Office Luxe"
                    value={form.category}
                    onChange={(e) => setForm({...form, category: e.target.value})}
                    required
                    className="h-12 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Stock Quantity</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={form.stock}
                    onChange={(e) => setForm({...form, stock: e.target.value})}
                    required
                    className="h-12 rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                <ImageIcon className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-dark">Visual Assets</h3>
            </div>

            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-accent/5 rounded-2xl border-2 border-dashed border-accent/20 flex flex-col items-center justify-center p-8 transition-all group-hover:bg-accent/10 group-hover:border-accent/40">
                  <UploadCloud className="w-8 h-8 text-accent mb-2" />
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Upload High-Res Imagery</p>
                  <p className="text-[10px] text-gray-400 mt-1">Recommended: 4:5 Aspect Ratio</p>
                </div>
                <div className="relative z-10">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Image URLs (Comma separated)</label>
                  <Input
                    placeholder="https://image1.jpg, https://image2.jpg"
                    value={form.images}
                    onChange={(e) => setForm({...form, images: e.target.value})}
                    className="h-12 rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing & Strategy */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                <DollarSign className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-dark">Pricing Strategy</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Base Price (₦)</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={form.price}
                  onChange={(e) => setForm({...form, price: e.target.value})}
                  required
                  className="h-12 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Sale Price (₦)</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={form.salePrice}
                  onChange={(e) => setForm({...form, salePrice: e.target.value})}
                  className="h-12 rounded-xl"
                />
              </div>

              <div className="pt-4 flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-3">
                  <Tag className="w-4 h-4 text-accent" />
                  <span className="text-sm font-bold text-dark">On Sale</span>
                </div>
                <button
                  type="button"
                  onClick={() => setForm({...form, onSale: !form.onSale})}
                  className={cn(
                    "w-12 h-6 rounded-full transition-all relative",
                    form.onSale ? "bg-accent" : "bg-gray-300"
                  )}
                >
                  <div className={cn(
                    "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                    form.onSale ? "left-7" : "left-1"
                  )} />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-dark text-white p-8 rounded-[2.5rem] shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
                <Plus className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm">Pro Tip</h3>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed italic">
              High-quality, lifestyle images increase conversion rates by up to 35%. Ensure your products are shot in neutral environments.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
