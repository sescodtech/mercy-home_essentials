'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserPlus } from 'lucide-react';

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Signup failed');
      }

      router.push('/login');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-dark p-8 text-center text-white">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <UserPlus className="w-8 h-8" />
          </div>
          <h1 className="font-display text-3xl font-bold">Join the Elite</h1>
          <p className="text-gray-400 text-sm mt-2">Create an account for a premium experience</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Full Name</label>
            <Input
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Email Address</label>
            <Input
              type="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Confirm</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full py-6 bg-dark text-white hover:bg-gray-800 rounded-xl font-bold transition-all"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Get Started'}
          </Button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/login" className="text-accent font-bold hover:underline">Sign In</a>
          </p>
        </form>
      </div>
    </div>
  );
}
