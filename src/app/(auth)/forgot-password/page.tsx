'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, call API to send reset link
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
      >
        <Link href="/login" className="flex items-center gap-2 text-sm text-gray-400 hover:text-dark mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Login
        </Link>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black mb-2">Forgot Password?</h1>
          <p className="text-gray-500 text-sm">Enter your email and we'll send you a link to reset your password.</p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                placeholder="name@example.com"
                required
              />
            </div>
            <Button className="w-full py-6 text-base font-bold">Send Reset Link</Button>
          </form>
        ) : (
          <div className="text-center p-6 bg-green-50 rounded-2xl border border-green-100">
            <p className="text-green-600 font-medium">Check your email! We've sent a recovery link to {email}.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
