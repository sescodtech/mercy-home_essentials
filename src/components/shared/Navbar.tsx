'use client';

import Link from 'next/link';
import { ShoppingBag, User, Menu, X, Search } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function Navbar() {
  const { items } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md bg-gradient-to-br from-accent to-orange-600 group-hover:scale-105 transition-transform">
            M
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display font-black text-xl tracking-tight">MERCY HOME</span>
            <span className="text-accent text-[10px] tracking-widest font-black uppercase">ESSENTIALS</span>
          </div>
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <input
            type="text"
            placeholder="Search premium gadgets..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div >

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link href="/account" className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-all">
            <User className="w-4 h-4" />
            <span>Account</span>
          </Link>

          <Link href="/cart" className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-dark text-white text-sm font-bold hover:bg-gray-800 transition-all shadow-md">
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            <span className="min-w-[20px] h-5 bg-accent text-white text-[10px] font-black px-1.5 rounded-full flex items-center justify-center leading-none">
              {cartCount}
            </span>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-all"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div >
      </div >

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 p-4 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl text-sm outline-none"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div >
          <Link href="/shop" className="block px-4 py-2 rounded-xl hover:bg-gray-100 text-sm font-medium">All Products</Link>
          <Link href="/about" className="block px-4 py-2 rounded-xl hover:bg-gray-100 text-sm font-medium">About Us</Link>
          <Link href="/contact" className="block px-4 py-2 rounded-xl hover:bg-gray-100 text-sm font-medium">Contact</Link>
        </div >
      )}
    </nav>
  );
}
