'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'; // I'll need to create this first
import { Input } from '@/components/ui/input'; // I'll need to create this first
import { cn } from '@/lib/utils';
import { Lock } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError('Invalid credentials. Please try again.');
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-dark p-8 text-center text-white">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="font-display text-3xl font-bold">Welcome Back</h1>
          <p className="text-gray-400 text-sm mt-2">Sign in to manage your premium essentials</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl animate-shake">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Email Address</label>
            <Input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full py-6 bg-dark text-white hover:bg-gray-800 rounded-xl font-bold transition-all"
            disabled={isLoading}
          >
            {isLoading ? 'Authenticating...' : 'Sign In'}
          </Button>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <a href="/signup" className="text-accent font-bold hover:underline">Create one</a>
          </p>
        </form>
      </div>
    </div>
  );
}
