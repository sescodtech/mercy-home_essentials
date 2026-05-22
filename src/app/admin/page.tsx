'use client';

import { motion } from 'framer-motion';
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, Settings, ArrowRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatsCard } from '@/components/admin/StatsCard';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function AdminDashboard() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="font-display text-4xl font-black text-dark tracking-tight">Executive Overview</h1>
          <p className="text-gray-500 text-sm font-light">Real-time operating metrics for Mercy Home Essentials.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl h-11 font-bold text-xs uppercase tracking-widest">
            Export Analytics
          </Button>
          <Link href="/admin/products/new">
            <Button className="rounded-xl h-11 font-bold text-xs uppercase tracking-widest gap-2">
              <Plus className="w-4 h-4" /> New Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Gross Revenue"
          value="₦12,450,000"
          change={{ value: 12, isPositive: true }}
          icon={<DollarSign className="w-6 h-6" />}
          color="green"
        />
        <StatsCard
          title="Total Fulfillment"
          value="1,242"
          change={{ value: 8, isPositive: true }}
          icon={<ShoppingCart className="w-6 h-6" />}
          color="blue"
        />
        <StatsCard
          title="Active SKU Count"
          value="128"
          change={{ value: 3, isPositive: false }}
          icon={<Package className="w-6 h-6" />}
          color="orange"
        />
        <StatsCard
          title="Client Portfolio"
          value="5,204"
          change={{ value: 15, isPositive: true }}
          icon={<Users className="w-6 h-6" />}
          color="blue"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Operational Activity */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-display text-2xl font-bold text-dark">Recent Logistics</h3>
            <Link href="/admin/orders" className="text-accent text-xs font-bold uppercase tracking-widest hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-400 border-b border-gray-50">
                  <th className="pb-4 font-medium text-[10px] uppercase tracking-widest">Order ID</th>
                  <th className="pb-4 font-medium text-[10px] uppercase tracking-widest">Client</th>
                  <th className="pb-4 font-medium text-[10px] uppercase tracking-widest">Gross Value</th>
                  <th className="pb-4 font-medium text-[10px] uppercase tracking-widest">Status</th>
                  <th className="pb-4 font-medium text-[10px] uppercase tracking-widest">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="group hover:bg-gray-50 transition-colors">
                    <td className="py-4 font-bold text-dark">#MHE-100{i}</td>
                    <td className="py-4 text-gray-600">Premium Client {i}</td>
                    <td className="py-4 font-bold text-dark">₦{(Math.random() * 50000 + 10000).toLocaleString(undefined, {maximumFractionDigits: 0})}</td>
                    <td className="py-4">
                      <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase rounded-full border border-green-100">
                        Paid
                      </span>
                    </td>
                    <td className="py-4 text-gray-400 text-xs">May 20, 2026</td>
                  </tr>
                ))}
              </tbody>
            </table >
          </div>
        </div>

        {/* Executive Quick Actions */}
        <div className="bg-dark text-white p-8 rounded-[2.5rem] shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
          <h3 className="font-display text-2xl font-bold relative z-10">Quick Operations</h3>
          <div className="space-y-3 relative z-10">
            <Link href="/admin/products" className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
                  <Package className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Update Inventory</span>
              </div>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
            </Link>
            <Link href="/admin/orders" className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
                  <ShoppingCart className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Order Fulfillment</span>
              </div>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
            </Link>
            <Link href="/admin/settings" className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
                  <Settings className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Store Configuration</span>
              </div>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
            </Link>
          </div>

          <div className="pt-6 border-t border-white/10 relative z-10">
            <div className="p-5 bg-accent/10 rounded-2xl border border-accent/20 space-y-2">
              <p className="text-[10px] text-accent font-black uppercase tracking-widest">Operational Insight</p>
              <p className="text-xs text-gray-400 leading-relaxed italic">
                "Converting image assets to WebP format across the catalog could reduce page load time by 1.2s, potentially increasing AOV by 4%."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
