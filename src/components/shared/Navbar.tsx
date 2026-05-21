'use client';

import Link from 'next/link';
import { ShoppingBag, User, Menu, X, Search } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { items } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className={cn(
      "fixed top-0 z-50 w-full transition-all duration-500 px-4 sm:px-6 py-4",
      scrolled ? "bg-white/90 backdrop-blur-xl shadow-sm py-3" : "bg-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group relative z-20">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-lg shadow-lg bg-accent transition-transform group-hover:rotate-12 duration-300">
            M
          </div>
          <div className="flex flex-col leading-tight">
            <span className={cn(
              "font-display font-black text-xl tracking-tighter transition-colors duration-300",
              scrolled ? "text-dark" : "text-white"
            )}>
              MERCY HOME
            </span>
            <span className={cn(
              "text-[9px] tracking-[0.3em] font-black uppercase",
              scrolled ? "text-accent" : "text-white/70"
            )}>
              ESSENTIALS
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/shop" className={cn("text-sm font-bold uppercase tracking-widest transition-colors hover:text-accent", scrolled ? "text-gray-600" : "text-white/80")}>
            Collections
          </Link>
          <Link href="/about" className={cn("text-sm font-bold uppercase tracking-widest transition-colors hover:text-accent", scrolled ? "text-gray-600" : "text-white/80")}>
            Philosophy
          </Link>
          <Link href="/contact" className={cn("text-sm font-bold uppercase tracking-widest transition-colors hover:text-accent", scrolled ? "text-gray-600" : "text-white/80")}>
            Contact
          </Link>
        </div >

        {/* Right Actions */}
        <div className="flex items-center gap-4 relative z-20">
          <div className="hidden sm:flex items-center gap-2">
            <Link href="/account" className={cn(
              "p-2 rounded-full transition-all hover:bg-white/10",
              scrolled ? "text-gray-600 hover:bg-gray-100" : "text-white hover:bg-white/10"
            )}>
              <User className="w-5 h-5" />
            </Link>
            <Link href="/cart" className="relative group p-2 rounded-full bg-accent text-white shadow-lg transition-transform hover:scale-110">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-dark text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            </Link>
          </div >

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "md:hidden p-2 rounded-full transition-all",
              scrolled ? "text-dark bg-gray-100" : "text-white bg-white/10"
            )}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div >
      </div >

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full h-screen bg-white z-[-1] p-8 flex flex-col justify-center items-center gap-12 text-center"
          >
            <Link href="/shop" onClick={() => setIsOpen(false)} className="text-3xl font-black text-dark hover:text-accent transition-colors">Collections</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="text-3xl font-black text-dark hover:text-accent transition-colors">Philosophy</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="text-3xl font-black text-dark hover:text-accent transition-colors">Contact</Link>
            <Link href="/cart" onClick={() => setIsOpen(false)} className="text-xl font-bold text-accent uppercase tracking-widest">My Cart ({cartCount})</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
