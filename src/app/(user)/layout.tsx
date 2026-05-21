'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  User,
  ShoppingBag,
  Heart,
  LogOut,
  ChevronRight,
  Bell,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { signOut } from 'next-auth/react';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'My Profile', href: '/profile', icon: User },
  { label: 'My Orders', href: '/orders', icon: ShoppingBag },
  { label: 'Wishlist', href: '/wishlist', icon: Heart },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 bg-dark text-white flex-col sticky top-0 h-screen border-r border-white/5">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center font-black text-white">M</div>
            <span className="font-display font-bold text-xl tracking-tight group-hover:text-accent transition-colors">
              Mercy Home
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 group",
                  isActive
                    ? "bg-accent text-white shadow-lg shadow-accent/20"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-gray-500 group-hover:text-white transition-colors")} />
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
                {isActive && <motion.div layoutId="nav-active" className="w-1.5 h-1.5 rounded-full bg-white" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/5">
          <Button
            onClick={() => signOut({ callbackUrl: '/' })}
            variant="ghost"
            className="w-full justify-start gap-3 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Sign Out</span>
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="lg:hidden flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-xl"
            >
              <LayoutDashboard className="w-5 h-5" />
            </Button>
            <span className="font-display font-bold text-lg">Mercy Home</span>
          </div>

          <div className="hidden lg:flex items-center gap-8 ml-auto">
            <div className="relative p-2 rounded-xl bg-gray-50 text-gray-500 hover:text-dark transition-colors cursor-pointer">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-white" />
            </div>

            <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
              <div className="text-right">
                <p className="text-sm font-bold text-dark">Premium Member</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Since 2024</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-black text-sm border-2 border-accent/20">
                JD
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8 lg:p-12">
          {children}
        </main>
      </div>
    </div>
  );
}
