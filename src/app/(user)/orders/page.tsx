'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Order } from '@/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'DELIVERED': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'CANCELLED': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'PROCESSING': return <Clock className="w-4 h-4 text-yellow-500" />;
      default: return <Package className="w-4 h-4 text-gray-500" />;
    }
  };

  if (loading) return <div className="p-8 text-center">Loading orders...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 w-full">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-black">Your Orders</h1>
        <p className="text-gray-500">Manage and track your premium purchases</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
          <Link href="/shop">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between gap-6"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Order #{order._id.slice(-6)}</span>
                  <div className="flex items-center gap-1 text-xs font-medium px-2 py-1 bg-gray-100 rounded-full">
                    {getStatusIcon(order.deliveryStatus)}
                    <span className="capitalize">{order.deliveryStatus}</span>
                  </div >
                </div>
                <div className="flex flex-wrap gap-4">
                  {order.items.map((item: any) => (
                    <div key={item.productId} className="flex items-center gap-2">
                      <img src={item.product?.image} alt={item.product?.name} className="w-10 h-10 rounded-lg object-cover" />
                      <span className="text-sm font-medium">{item.product?.name} x{item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-gray-400">
                  Ordered on {new Date(order.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <div className="text-xl font-black">₦{order.totalAmount.toLocaleString()}</div>
                <Link href={`/user/orders/${order._id}`}>
                  <Button variant="outline" size="sm">View Details</Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
