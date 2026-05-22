'use client';

import { motion } from 'framer-motion';
import {
  ShoppingBag,
  Heart,
  Clock,
  ChevronRight,
  Package,
  TrendingUp,
  CreditCard,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function UserDashboard() {
  // Mock data for user stats
  const stats = [
    {
      label: 'Total Spent',
      value: '₦124,500',
      icon: CreditCard,
      color: 'text-blue-500',
      bg: 'bg-blue-50'
    },
    {
      label: 'Active Orders',
      value: '3',
      icon: Package,
      color: 'text-accent',
      bg: 'bg-accent/10'
    },
    {
      label: 'Wishlist',
      value: '12 Items',
      icon: Heart,
      color: 'text-pink-500',
      bg: 'bg-pink-50'
    },
  ];

  const recentOrders = [
    { id: 'MHE-9021', date: 'May 12, 2026', total: '₦45,000', status: 'Delivered' },
    { id: 'MHE-8842', date: 'April 28, 2026', total: '₦12,200', status: 'Shipped' },
    { id: 'MHE-7710', date: 'March 15, 2026', total: '₦87,300', status: 'Processing' },
  ];

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-display text-4xl font-black text-dark tracking-tight"
          >
            Welcome Back, <span className="text-accent">John.</span>
          </motion.h1>
          <p className="text-gray-500 mt-2 font-light">
            Manage your premium orders and explore new curated essentials.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex gap-3"
        >
          <Button variant="outline" className="rounded-2xl px-6 h-12 font-bold border-gray-200">
            Account Settings
          </Button>
          <Link href="/shop">
            <Button className="rounded-2xl px-6 h-12 bg-dark text-white font-bold gap-2 group">
              Explore Shop <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-6">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.bg)}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <div className="p-2 rounded-full bg-gray-50 text-gray-400 group-hover:text-accent transition-colors">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-dark">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-dark">Recent Orders</h2>
            <Link href="/orders" className="text-accent text-xs font-bold uppercase tracking-widest hover:underline flex items-center gap-1">
              View All <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 border-b border-gray-100">
                  <tr>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Order ID</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Date</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Amount</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-8 py-5 font-bold text-sm text-dark">{order.id}</td>
                      <td className="px-8 py-5 text-sm text-gray-500 font-light">{order.date}</td>
                      <td className="px-8 py-5 font-bold text-sm text-dark">{order.total}</td>
                      <td className="px-8 py-5">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter",
                          order.status === 'Delivered' ? "bg-green-50 text-green-600" :
                          order.status === 'Shipped' ? "bg-blue-50 text-blue-600" : "bg-orange-50 text-orange-600"
                        )}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Account Quick Links / Recommendations */}
        <div className="space-y-8">
          <div className="bg-dark text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-32 h-32 bg-accent/20 rounded-full blur-3xl group-hover:bg-accent/40 transition-colors duration-700" />
            <div className="relative z-10 space-y-6">
              <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center shadow-lg">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold mb-2">Premium Access</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">
                  As a member of the inner circle, you get early access to limited drops.
                </p>
              </div>
              <Button className="w-full h-12 bg-white text-dark hover:bg-gray-100 rounded-xl font-bold text-sm transition-all">
                View New Arrivals
              </Button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
            <h3 className="font-display text-lg font-bold text-dark">Account Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 group hover:bg-gray-100 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-gray-400 group-hover:text-accent transition-colors" />
                  <span className="text-sm font-medium text-gray-600 group-hover:text-dark">Identity Verification</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-accent transition-colors" />
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 group hover:bg-gray-100 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-4 h-4 text-gray-400 group-hover:text-accent transition-colors" />
                  <span className="text-sm font-medium text-gray-600 group-hover:text-dark">Payment Methods</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-accent transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
