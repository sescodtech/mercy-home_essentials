'use client';

import { motion } from 'framer-motion';
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, Settings, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatsCard } from '@/components/admin/StatsCard';
import { OrderTimeline } from '@/components/admin/OrderTimeline';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-3xl font-black">Dashboard Overview</h1>
          <p className="text-gray-500 text-sm">Welcome back, Admin. Here is what's happening today.</p>
        </div >
        <Button className="gap-2">
          <TrendingUp className="w-4 h-4" /> Export Report
        </Button>
      </div >

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value="₦12,450"
          change={{ value: 12, isPositive: true }}
          icon={<DollarSign className="w-6 h-6" />}
          color="green"
        />
        <StatsCard
          title="Total Orders"
          value="342"
          change={{ value: 8, isPositive: true }}
          icon={<ShoppingCart className="w-6 h-6" />}
          color="blue"
        />
        <StatsCard
          title="Total Products"
          value="128"
          change={{ value: 3, isPositive: false }}
          icon={<Package className="w-6 h-6" />}
          color="orange"
        />
        <StatsCard
          title="Active Customers"
          value="1,204"
          change={{ value: 15, isPositive: true }}
          icon={<Users className="w-6 h-6" />}
          color="blue"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-display text-xl font-bold">Recent Orders</h3>
            <Link href="/admin/orders" className="text-accent text-xs font-bold hover:underline">View All</Link>
          </div >
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-400 border-b border-gray-50">
                  <th className="pb-4 font-medium">Order ID</th>
                  <th className="pb-4 font-medium">Customer</th>
                  <th className="pb-4 font-medium">Amount</th>
                  <th className="pb-4 font-medium">Status</th>
                  <th className="pb-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="group hover:bg-gray-50 transition-colors">
                    <td className="py-4 font-bold text-dark">#MHE-100{i}</td>
                    <td className="py-4 text-gray-600">Customer {i}</td>
                    <td className="py-4 font-bold">${(Math.random() * 100 + 50).toFixed(2)}</td>
                    <td className="py-4">
                      <span className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase rounded-md">Paid</span>
                    </td>
                    <td className="py-4 text-gray-400 text-xs">May 20, 2026</td>
                  </tr>
                ))}
              </tbody>
            </table >
          </div >
        </div >

        {/* Quick Actions */}
        <div className="bg-dark text-white p-8 rounded-3xl shadow-xl space-y-6">
          <h3 className="font-display text-xl font-bold">Quick Actions</h3>
          <div className="space-y-3">
            <Link href="/admin/products" className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group">
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">Add New Product</span>
              </div >
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
            </Link>
            <Link href="/admin/orders" className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">Manage Orders</span>
              </div >
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
            </Link>
            <Link href="/admin/settings" className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group">
              <div className="flex items-center gap-3">
                <Settings className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">Store Settings</span>
              </div >
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
            </Link>
          </div >
          <div className="pt-6 border-t border-white/10">
            <div className="p-4 bg-accent/10 rounded-2xl border border-accent/20">
              <p className="text-xs text-orange-300 font-bold uppercase tracking-widest mb-2">Pro Tip</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                Optimize your images using Cloudinary to increase conversion rates by up to 20%.
              </p>
            </div >
          </div >
        </div >
      </div >
    </div >
  );
}
