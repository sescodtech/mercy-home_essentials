'use client';

import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut, Store, Bell, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import { motion } from 'framer-motion';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { name: 'Inventory', icon: Package, href: '/admin/products' },
    { name: 'Order Fulfillment', icon: ShoppingCart, href: '/admin/orders' },
    { name: 'Customer Base', icon: Users, href: '/admin/customers' },
    { name: 'Store Settings', icon: Settings, href: '/admin/settings' },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      {/* Enterprise Sidebar */}
      <aside className="w-72 bg-dark text-white flex flex-col sticky top-0 h-screen border-r border-white/5 z-50">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center font-black text-white shadow-lg shadow-accent/20">M</div>
          <span className="font-display font-bold tracking-tight text-xl">Control Center</span>
        </div>

        <div className="px-6 mb-8">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-accent transition-colors" />
            <input
              type="text"
              placeholder="Quick search..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-gray-300 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all placeholder:text-gray-600"
            />
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <div className="px-4 mb-4">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Main Menu</span>
          </div>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all group",
                pathname === item.href
                  ? "bg-accent text-white shadow-xl shadow-accent/20"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-colors",
                pathname === item.href ? "text-white" : "text-gray-500 group-hover:text-white"
              )} />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5 space-y-2">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-all">
            <Store className="w-5 h-5" /> View Storefront
          </Link>
          <Button
            onClick={() => signOut({ callbackUrl: '/' })}
            variant="ghost"
            className="w-full justify-start gap-3 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Operating Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Command Bar */}
        <header className="h-20 bg-white border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
              {navItems.find(item => item.href === pathname)?.name || 'Administrative'}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative p-2 rounded-xl bg-gray-50 text-gray-500 hover:text-dark transition-colors cursor-pointer">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-white" />
            </div>

            <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
              <div className="text-right">
                <p className="text-sm font-bold text-dark">Admin Account</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Superuser</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-dark flex items-center justify-center text-white font-black text-sm border-2 border-white shadow-sm">
                AD
              </div>
            </div>
          </div>
        </header>

        <main className="p-8 lg:p-12 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
