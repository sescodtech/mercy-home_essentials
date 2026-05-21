'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Globe, ShoppingCart, Bell, Lock } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    storeName: 'Mercy Home Essentials',
    currency: 'NGN',
    contactEmail: 'support@mercyhome.com',
    taxRate: '7.5',
    shippingFee: '2000',
  });

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="p-8 w-full max-w-4xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-black">Store Settings</h1>
        <p className="text-gray-500">Configure your platform's global parameters</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Globe className="w-5 h-5 text-accent" /> General Settings
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Store Name</label>
                <input
                  type="text"
                  value={settings.storeName}
                  onChange={(e) => setSettings({...settings, storeName: e.target.value})}
                  className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-accent/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Contact Email</label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
                  className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-accent/20"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-accent" /> Checkout & Shipping
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tax Rate (%)</label>
                <input
                  type="text"
                  value={settings.taxRate}
                  onChange={(e) => setSettings({...settings, taxRate: e.target.value})}
                  className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-accent/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Base Shipping (₦)</label>
                <input
                  type="text"
                  value={settings.shippingFee}
                  onChange={(e) => setSettings({...settings, shippingFee: e.target.value})}
                  className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-accent/20"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-dark text-white p-8 rounded-3xl shadow-xl space-y-6">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Lock className="w-5 h-5 text-accent" /> Security
            </h2>
            <p className="text-gray-400 text-xs leading-relaxed">
              Manage your administrator credentials and API keys for payment gateways.
            </p>
            <Button className="w-full bg-accent hover:bg-accent/90 text-white py-6 font-bold">
              Update Admin Password
            </Button>
          </div>

          <Button className="w-full py-8 text-lg font-black shadow-lg" onClick={handleSave}>
            Save All Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
