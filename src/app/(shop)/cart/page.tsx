'use client';

import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCartStore();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h1 className="font-display text-4xl font-black mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8">Looks like you haven't added any premium essentials yet.</p>
        <Link href="/shop">
          <Button size="lg" className="gap-2">
            Start Shopping <ShoppingBag className="w-4 h-4" />
          </Button>
        </Link>
      </div >
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-display text-4xl font-black mb-12">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-6 p-4 bg-white rounded-3xl border border-gray-100 shadow-sm group"
            >
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-50 shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div >
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{item.name}</h3>
                <p className="text-accent font-black text-lg">${item.price}</p>
              </div >
              <div className="flex items-center gap-3 p-1 bg-gray-100 rounded-xl">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1 hover:bg-white rounded-lg transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-6 text-center font-bold text-sm">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 hover:bg-white rounded-lg transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div >
              <button
                onClick={() => removeItem(item.id)}
                className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </motion.div>
          ))}

          <div className="flex justify-between items-center pt-4">
            <button
              onClick={clearCart}
              className="text-sm font-bold text-gray-400 hover:text-red-500 transition-colors"
            >
              Clear All Items
            </button>
            <span className="text-sm text-gray-500">
              {items.length} item{items.length !== 1 ? 's' : ''} in cart
            </span>
          </div >
        </div >

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl sticky top-24">
            <h3 className="font-display text-2xl font-black mb-6">Order Summary</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span className="font-bold text-dark">${total.toFixed(2)}</span>
              </div >
              <div className="flex justify-between text-sm text-gray-500">
                <span>Shipping</span>
                <span className="text-green-500 font-bold">FREE</span>
              </div >
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-lg font-bold">Total</span>
                <span className="text-3xl font-black text-dark">${total.toFixed(2)}</span>
              </div >
            </div >

            <Link href="/checkout" className="block w-full">
              <Button size="lg" className="w-full gap-2 py-6 h-auto">
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <p className="text-center text-[10px] text-gray-400 mt-4 uppercase tracking-widest font-bold">
              Secure Checkout Guaranteed
            </p>
          </div >
        </div >
      </div >
    </div>
  );
}

function Minus({ className }: { className: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
}
function Plus({ className }: { className: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
}
