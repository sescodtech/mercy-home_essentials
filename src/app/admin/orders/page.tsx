'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Package, CheckCircle, Clock, XCircle } from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
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

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deliveryStatus: status }),
      });
      setOrders(orders.map(o => o._id === id ? { ...o, deliveryStatus: status } : o));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  if (loading) return <div className="p-8">Loading orders...</div>;

  return (
    <div className="p-8 w-full">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-black">Order Fulfillment</h1>
        <p className="text-gray-500">Manage and track customer shipments</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr className="text-xs font-bold uppercase tracking-widest text-gray-400">
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Delivery</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium text-sm">#{order._id.slice(-6)}</td>
                <td className="p-4 text-sm">{order.userId?.name || 'Guest'}</td>
                <td className="p-4 font-bold text-sm">₦{order.totalAmount.toLocaleString()}</td>
                <td className="p-4">
                  <div className="flex items-center gap-1 text-xs font-medium px-2 py-1 bg-green-50 text-green-600 rounded-full w-fit">
                    <CheckCircle className="w-3 h-3" /> {order.paymentStatus}
                  </div>
                </td>
                <td className="p-4">
                  <select
                    value={order.deliveryStatus}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="text-xs font-bold p-1 rounded border border-gray-200 outline-none focus:ring-2 focus:ring-accent/20"
                  >
                    <option value="PROCESSING">Processing</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </td>
                <td className="p-4 text-right">
                  <Button variant="outline" size="sm">Details</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <div className="p-12 text-center text-gray-400">No orders found.</div>
        )}
      </div>
    </div>
  );
}
