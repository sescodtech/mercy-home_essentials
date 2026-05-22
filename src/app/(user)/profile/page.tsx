'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, MapPin, Lock, Camera, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+234 801 234 5678',
    address: '123 Luxury Lane, Lagos, Nigeria',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = async () => {
    setIsEditing(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto w-full space-y-12">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="font-display text-4xl font-black text-dark tracking-tight">Account Profile</h1>
          <p className="text-gray-500 font-light">Update your personal information and shipping preferences.</p>
        </div>

        <Button
          variant={isEditing ? 'primary' : 'outline'}
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={cn(
            "rounded-2xl h-12 px-6 font-bold transition-all duration-300",
            isEditing ? "bg-dark text-white hover:bg-gray-800" : "border-gray-200 text-dark hover:bg-gray-50"
          )}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Left Column: Avatar and Basic Info */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm text-center"
          >
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="w-full h-full rounded-full bg-accent/10 flex items-center justify-center text-accent text-4xl font-black border-4 border-white shadow-xl overflow-hidden relative">
                {user.name.charAt(0)}
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-dark text-white rounded-full flex items-center justify-center border-4 border-white shadow-lg hover:bg-accent transition-colors group">
                <Camera className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>
            </div>
            <h2 className="text-xl font-bold text-dark">{user.name}</h2>
            <p className="text-gray-400 text-xs font-medium uppercase tracking-widest mt-1">Premium Member</p>
            <div className="mt-6 pt-6 border-t border-gray-50 flex justify-center gap-3">
              <div className="px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-black uppercase tracking-tighter">Gold Tier</div>
              <div className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-tighter">Verified</div>
            </div>
          </motion.div>

          <div className="bg-dark text-white p-8 rounded-[2.5rem] shadow-xl space-y-6">
            <h3 className="font-display text-lg font-bold">Security Status</h3>
            <div className="space-y-4">
              <SecurityItem label="Two-Factor Auth" status="Enabled" active />
              <SecurityItem label="Email Verified" status="Verified" active />
              <SecurityItem label="Password Rotation" status="Due in 12 days" />
            </div>
            <Button variant="outline" className="w-full h-12 rounded-xl text-xs font-bold uppercase tracking-widest border-white/20 text-white hover:bg-white/10">
              Update Credentials
            </Button>
          </div>
        </div>

        {/* Right Column: Details Form */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden"
          >
            <div className="p-8 md:p-12 space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <ProfileField
                  label="Full Name"
                  icon={<User className="w-4 h-4" />}
                  value={user.name}
                  onChange={(val) => setUser({ ...user, name: val })}
                  disabled={!isEditing}
                />
                <ProfileField
                  label="Email Address"
                  icon={<Mail className="w-4 h-4" />}
                  value={user.email}
                  onChange={(val) => setUser({ ...user, email: val })}
                  disabled={!isEditing}
                />
                <ProfileField
                  label="Phone Number"
                  icon={<Phone className="w-4 h-4" />}
                  value={user.phone}
                  onChange={(val) => setUser({ ...user, phone: val })}
                  disabled={!isEditing}
                />
                <ProfileField
                  label="Shipping Address"
                  icon={<MapPin className="w-4 h-4" />}
                  value={user.address}
                  onChange={(val) => setUser({ ...user, address: val })}
                  disabled={!isEditing}
                />
              </div>

              <AnimatePresence>
                {isSaved && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-green-50 border border-green-100 text-green-600 text-sm rounded-2xl flex items-center gap-3"
                  >
                    <Check className="w-4 h-4" />
                    Profile updates have been securely saved.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ProfileField({ label, icon, value, onChange, disabled }: any) {
  return (
    <div className="space-y-2 group">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-accent transition-colors">
        {icon} {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={cn(
          "w-full p-4 rounded-2xl border transition-all outline-none",
          disabled
            ? "bg-gray-50 border-gray-100 text-gray-500 cursor-not-allowed"
            : "bg-white border-gray-200 text-dark focus:ring-2 focus:ring-accent/20 focus:border-accent"
        )}
      />
    </div>
  );
}

function SecurityItem({ label, status, active = false }: { label: string, status: string, active?: boolean }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 group hover:bg-white/10 transition-all cursor-pointer">
      <span className="text-xs font-medium text-gray-400 group-hover:text-gray-200 transition-colors">{label}</span>
      <span className={cn(
        "text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-md",
        active ? "bg-green-500/20 text-green-400" : "bg-white/10 text-gray-400"
      )}>
        {status}
      </span>
    </div>
  );
}
