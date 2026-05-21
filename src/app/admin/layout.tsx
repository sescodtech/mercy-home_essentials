'use client';

import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut, Store } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { name: 'Products', icon: Package, href: '/admin/products' },
    { name: 'Orders', icon: ShoppingCart, href: '/admin/orders' },
    { name: 'Customers', icon: Users, href: '/admin/customers' },
    { name: 'Settings', icon: Settings, href: '/admin/settings' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-dark text-white flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center font-black">M</div>
          <span className="font-display font-bold tracking-tight">Admin Panel</span>
        </div >

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                pathname === item.href ? "bg-accent text-white shadow-lg" : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-all">
            <Store className="w-4 h-4" /> View Store
          </Link>
          <Button
            onClick={() => signOut({ callbackUrl: '/' })}
            variant="secondary"
            className="w-full justify-start gap-3 text-red-400 hover:bg-red-500/10 hover:text-red-500"
          >
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div >
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div >
  );
}
