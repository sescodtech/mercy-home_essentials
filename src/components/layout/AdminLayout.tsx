'use client';

import Link from 'next/link';
import { LayoutDashboard, Package, ShoppingCart, Settings, Menu, X } from 'lucide-react';
import { useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Package, label: 'Products', href: '/admin/products' },
    { icon: ShoppingCart, label: 'Orders', href: '/admin/orders' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 256 : 80 }}
        className="bg-dark text-white border-r border-gray-800 fixed h-screen overflow-y-auto z-40"
      >
        <div className="p-6 flex items-center justify-between">
          {sidebarOpen && <h1 className="font-black text-xl">ADMIN</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="space-y-2 px-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-gray-800",
                "text-sm font-medium"
              )}
            >
              <item.icon className="w-5 h-5" />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </motion.aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 transition-all",
        sidebarOpen ? "ml-64" : "ml-20"
      )}>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};
