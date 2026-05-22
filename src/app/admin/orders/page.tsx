'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Package, CheckCircle, Clock, XCircle, Search, Filter, Eye, Truck, Archive } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deliveryStatus: status }),
      });
      setOrders(orders.map(o => o._id === id ? { ...o, deliveryStatus: status } : o));
    } catch (err) {
      alert('Failed to update logistics status');
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order._id.includes(searchQuery) || (order.userId?.name || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.deliveryStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusMap: Record<string, { icon: any, color: string, border: string }> = {
    'PROCESSING': { icon: Clock, color: 'bg-yellow-500/10 text-yellow-600', border: 'border-yellow-200' },
    'SHIPPED': { icon: Truck, color: 'bg-blue-500/10 text-blue-600', border: 'border-blue-200' },
    'DELIVERED': { icon: CheckCircle, color: 'bg-green-500/10 text-green-600', border: 'border-green-200' },
    'CANCELLED': { icon: XCircle, color: 'bg-red-500/10 text-red-600', border: 'border-red-200' },
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
          <p className="text-gray-400 font-medium text-sm tracking-widest uppercase">Syncing Logistics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="font-display text-4xl font-black text-dark tracking-tight">Order Fulfillment</h1>
          <p className="text-gray-500 font-light">Precise orchestration of luxury logistics and delivery.</p>
        </div>
        <Button variant="outline" className="rounded-2xl h-12 px-6 font-bold text-xs uppercase tracking-widest gap-2">
          <Archive className="w-4 h-4" /> Export Shipping Manifest
        </Button>
      </div>

      {/* Command Center */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-accent transition-colors" />
          <input
            type="text"
            placeholder="Search Order ID or Client..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <div className="relative flex items-center gap-2 px-4 py-3 rounded-2xl border border-gray-200 bg-white text-gray-500 text-sm font-medium">
            <Filter className="w-4 h-4" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="outline-none bg-transparent cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="PROCESSING">Processing</option>
              <option value="SHIPPED">Shipped</option>
              <option value="DELIVERED">Delivered</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr className="text-gray-400">
              <th className="px-8 py-5 font-black text-[10px] uppercase tracking-[0.2em]">Order Archive</th>
              <th className="px-8 py-5 font-black text-[10px] uppercase tracking-[0.2em]">Client Profile</th>
              <th className="px-8 py-5 font-black text-[10px] uppercase tracking-[0.2em]">Valuation</th>
              <th className="px-8 py-5 font-black text-[10px] uppercase tracking-[0.2em]">Logistics Status</th>
              <th className="px-8 py-5 font-black text-[10px] uppercase tracking-[0.2em] text-right">Control</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            <AnimatePresence>
              {filteredOrders.map((order) => {
                const status = statusMap[order.deliveryStatus] || statusMap['PROCESSING'];
                return (
                  <motion.tr
                    key={order._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group hover:bg-gray-50/80 transition-all"
                  >
                    <td className="px-8 py-6 font-bold text-sm text-dark">
                      #MHE-{order._id.slice(-6).toUpperCase()}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500 border border-gray-200">
                          {order.userId?.name?.charAt(0) || 'G'}
                        </div>
                        <span className="text-sm font-medium text-gray-600">{order.userId?.name || 'Guest Client'}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 font-black text-sm text-dark">
                      ₦{order.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter flex items-center gap-1.5 border", status.color, status.border)}>
                          {status.icon && <status.icon className="w-3 h-3" />}
                          {order.deliveryStatus}
                        </div>
                        <select
                          value={order.deliveryStatus}
                          onChange={(e) => updateStatus(order._id, e.target.value)}
                          className="text-[10px] font-bold p-1 rounded-lg border border-gray-100 outline-none hover:bg-gray-50 transition-all cursor-pointer"
                        >
                          <option value="PROCESSING">Processing</option>
                          <option value="SHIPPED">Shipped</option>
                          <option value="DELIVERED">Delivered</option>
                          <option value="CANCELLED">Cancelled</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <Button variant="outline" size="sm" className="rounded-xl h-9 px-4 text-xs font-bold uppercase tracking-widest group-hover:bg-dark group-hover:text-white transition-all">
                        <Eye className="w-3 h-3 mr-2" /> Details
                      </Button>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table >
        {filteredOrders.length === 0 && (
          <div className="p-20 text-center space-y-4">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
              <Package className="w-8 h-8" />
            </div>
            <p className="text-gray-500 font-light">No shipping records match your current criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
