'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Truck, ShieldCheck, RotateCcw, Headphones, Github, Linkedin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/hooks/useToast';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast();

  const handleNewsletterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      success('Successfully subscribed to newsletter!');
      setEmail('');
    } catch (err) {
      error('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-dark text-white">
      {/* Trust Strip */}
      <div className="border-b border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Truck className="w-5 h-5 text-accent" />
            </div>
            <div className="text-sm">
              <div className="font-bold text-white">Global Shipping</div>
              <div className="text-gray-400 text-xs">Free on premium orders</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-accent" />
            </div>
            <div className="text-sm">
              <div className="font-bold text-white">Certified Quality</div>
              <div className="text-gray-400 text-xs">100% authentic goods</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <RotateCcw className="w-5 h-5 text-accent" />
            </div>
            <div className="text-sm">
              <div className="font-bold text-white">Easy Returns</div>
              <div className="text-gray-400 text-xs">14-day guarantee</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Headphones className="w-5 h-5 text-accent" />
            </div>
            <div className="text-sm">
              <div className="font-bold text-white">24/7 Support</div>
              <div className="text-gray-400 text-xs">Always ready to help</div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-b border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-3">
              <h3 className="text-2xl font-bold">Join the Mercy Circle</h3>
              <p className="text-gray-400">
                Get exclusive access to new collections, special offers, and insider tips from our curators.
              </p>
            </div>
            <form onSubmit={handleNewsletterSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                required
              />
              <Button
                type="submit"
                disabled={loading}
                className="rounded-lg px-6 bg-accent hover:bg-accent/90"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center font-bold">
                M
              </div>
              <div className="leading-tight">
                <div className="font-bold text-white">MERCY HOME</div>
                <div className="text-[10px] tracking-widest text-accent font-black">
                  ESSENTIALS
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Curated premium home, office, and tech essentials for the modern lifestyle.
            </p>
            <div className="flex gap-3 pt-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-accent transition-colors flex items-center justify-center">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-pink-600 transition-colors flex items-center justify-center">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-blue-400 transition-colors flex items-center justify-center">
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h4 className="font-bold text-white">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/shop" className="hover:text-accent transition-colors">
                  All Collections
                </Link>
              </li>
              <li>
                <Link href="/shop?cat=kitchen" className="hover:text-accent transition-colors">
                  Kitchen Luxe
                </Link>
              </li>
              <li>
                <Link href="/shop?cat=office" className="hover:text-accent transition-colors">
                  Executive Office
                </Link>
              </li>
              <li>
                <Link href="/shop?cat=tech" className="hover:text-accent transition-colors">
                  Digital Innovation
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-accent transition-colors">
                  On Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-bold text-white">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition-colors">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-bold text-white">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition-colors">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-bold text-white">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+234 (0) 123 456 7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>hello@mercyhome.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Lagos, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8 space-y-6">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-6 text-xs text-gray-400">
              <div className="flex gap-4">
                <Link href="#" className="hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
                <Link href="#" className="hover:text-accent transition-colors">
                  Terms of Service
                </Link>
                <Link href="#" className="hover:text-accent transition-colors">
                  Cookie Policy
                </Link>
              </div>
              <div className="md:text-right">
                © 2024 Mercy Home Essentials. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
