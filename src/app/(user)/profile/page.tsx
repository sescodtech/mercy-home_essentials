'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, MapPin, Lock } from 'lucide-react';

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+234 801 234 5678',
    address: '123 Luxury Lane, Lagos',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // Implement update logic
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 w-full">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="font-display text-3xl font-black">My Profile</h1>
          <p className="text-gray-500">Manage your account settings and preferences</p>
        </div>
        <Button variant={isEditing ? 'primary' : 'outline'} onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
      >
        <div className="p-8 space-y-6">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center text-accent text-3xl font-black">
              {user.name.charAt(0)}
            </div >
            <div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-gray-400 text-sm">Member since 2024</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileField label="Full Name" icon={<User className="w-4 h-4" />} value={user.name}
              onChange={(val: string) => setUser({...user, name: val})} disabled={!isEditing} />
            <ProfileField label="Email Address" icon={<Mail className="w-4 h-4" />} value={user.email}
              onChange={(val: string) => setUser({...user, email: val})} disabled={!isEditing} />
            <ProfileField label="Phone Number" icon={<Phone className="w-4 h-4" />} value={user.phone}
              onChange={(val: string) => setUser({...user, phone: val})} disabled={!isEditing} />
            <ProfileField label="Shipping Address" icon={<MapPin className="w-4 h-4" />} value={user.address}
              onChange={(val: string) => setUser({...user, address: val})} disabled={!isEditing} />
          </div>
        </div>

        <div className="bg-gray-50 p-6 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Lock className="w-4 h-4" /> Account Security
            </div>
            <Button variant="outline" className="text-xs font-bold uppercase tracking-widest">Change Password</Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ProfileField({ label, icon, value, onChange, disabled }: any) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
        {icon} {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-accent/20 outline-none transition-all disabled:opacity-70"
      />
    </div>
  );
}
