'use client';

import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark to-gray-900 px-4">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent mb-4">
            <span className="font-black text-white text-lg">M</span>
          </div>
          <h1 className="text-3xl font-black text-white">MERCY HOME</h1>
          <p className="text-accent text-xs tracking-widest font-black mt-1">ESSENTIALS</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
          {children}
        </div>

        {/* Footer Link */}
        <div className="text-center mt-6 text-sm text-gray-400">
          <p>
            By continuing, you agree to our{' '}
            <a href="#" className="text-accent hover:underline">
              Terms of Service
            </a>
            {' '}and{' '}
            <a href="#" className="text-accent hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
