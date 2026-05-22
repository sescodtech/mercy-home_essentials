'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Order } from '@/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Package, Clock, CheckCircle, XCircle, ChevronRight, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

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

  const getStatusDetails = (status: string) => {
    switch (status) {
      case 'DELIVERED': return { icon: <CheckCircle className="w-4 h-4" />, color: 'bg-green-500/10 text-green-600', border: 'border-green-200' };
      case 'CANCELLED': return { icon: <XCircle className="w-4 h-4" />, color: 'bg-red-500/10 text-red-600', border: 'border-red-200' };
      case 'PROCESSING': return { icon: <Clock className="w-4 h-4" />, color: 'bg-yellow-500/10 text-yellow-600', border: 'border-yellow-200' };
      default: return { icon: <Package className="w-4 h-4" />, color: 'bg-gray-100 text-gray-600', border: 'border-gray-200' };
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
          <p className="text-gray-400 font-medium text-sm tracking-widest uppercase">Retrieving Archives...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto w-full space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="font-display text-4xl font-black text-dark tracking-tight">Order History</h1>
          <p className="text-gray-500 font-light">A comprehensive record of your luxury acquisitions.</p>
        </div>
        <Link href="/shop">
          <Button className="rounded-2xl h-12 px-6 bg-dark text-white font-bold gap-2 group">
            <ShoppingBag className="w-4 h-4" /> New Acquisition <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>

      {orders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-24 bg-white rounded-[3rem] border border-gray-100 shadow-sm"
        >
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-dark mb-2">No Acquisitions Found</h3>
          <p className="text-gray-500 font-light mb-10 max-w-xs mx-auto px-6">
            Your curation is currently empty. Begin your journey with our latest arrivals.
          </p>
          <Link href="/shop">
            <Button variant="outline" className="rounded-full px-8 h-12 font-bold">
              Explore Collections
            </Button>
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-6">
          <AnimatePresence>
            {orders.map((order, idx) => {
              const status = getStatusDetails(order.deliveryStatus);
              return (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="flex-1 space-y-6">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                          Order #{order._id.slice(-6)}
                        </span>
                        <div className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter flex items-center gap-1.5 border", status.color, status.border)}>
                          {status.icon} {order.deliveryStatus}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-6">
                        {order.items.map((item: any) => (
                          <div key={item.productId} className="flex items-center gap-3 bg-gray-50 p-2 rounded-2xl border border-gray-100 group-hover:border-accent/20 transition-colors">
                            <img src={item.product?.image} alt={item.product?.name} className="w-12 h-12 rounded-xl object-cover shadow-sm" />
                            <div>
                              <p className="text-sm font-bold text-dark line-clamp-1">{item.product?.name}</p>
                              <p className="text-[10px] text-gray-400 font-medium">Qty: {item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 text-xs text-gray-400 font-light">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3" /> {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full" />
                        <span>Payment: Secured</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center lg:items-end justify-center gap-4 min-w-[160px] border-t lg:border-t-0 border-gray-50 pt-6 lg:pt-0">
                      <div className="text-2xl font-black text-dark">
                        ₦{order.totalAmount.toLocaleString()}
                      </div>
                      <Link href={`/user/orders/${order._id}`}>
                        <Button variant="outline" className="rounded-xl h-10 px-4 text-xs font-bold uppercase tracking-widest group">
                          Details <ChevronRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
