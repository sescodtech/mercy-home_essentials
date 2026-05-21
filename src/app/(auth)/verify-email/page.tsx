'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export default function VerifyEmailPage() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [verified, setVerified] = useState(false);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`)?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    // Verify code via API
    setVerified(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center"
      >
        <div className="w-16 h-16 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black mb-2">Verify Your Email</h1>
        <p className="text-gray-500 text-sm mb-8">Please enter the 6-digit verification code sent to your email.</p>

        {!verified ? (
          <form onSubmit={handleVerify} className="space-y-8">
            <div className="flex justify-center gap-3">
              {code.map((digit, i) => (
                <input
                  key={i}
                  id={`code-${i}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(i, e.target.value)}
                  className="w-12 h-12 text-center text-xl font-black rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                />
              ))}
            </div>
            <Button className="w-full py-6 text-base font-bold">Verify Account</Button>
            <div className="text-center">
              <p className="text-gray-400 text-xs">Didn't receive the code?</p>
              <Button variant="outline" className="text-xs font-bold text-accent">Resend Code</Button>
            </div>
          </form>
        ) : (
          <div className="text-center p-8 bg-green-50 rounded-3xl border border-green-100 space-y-4">
            <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto">
              <ArrowRight className="w-6 h-6" />
            </div>
            <p className="text-green-600 font-bold">Your email has been verified!</p>
            <Button className="w-full">Go to Dashboard</Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
