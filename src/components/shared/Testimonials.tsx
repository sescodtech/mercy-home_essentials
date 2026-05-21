'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Sarah Jenkins',
    role: 'Interior Designer',
    text: 'The quality of the office essentials is beyond my expectations. The aesthetic fits perfectly with my modern minimalist workspace.',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1494790108377-be9c2953bb3H?auto=format&fit=crop&w=100&q=80'
  },
  {
    name: 'Michael Chen',
    role: 'Tech Entrepreneur',
    text: 'Fast delivery and premium packaging. You can tell that every product is curated with care. Highly recommended for any professional.',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1472099645785-565885845305?auto=format&fit=crop&w=100&q=80'
  },
  {
    name: 'Amara Okafor',
    role: 'Home Chef',
    text: 'The kitchen gadgets have completely changed how I organize my space. Elegant and functional. A true luxury experience.',
    rating: 4,
    img: 'https://images.unsplash.com/photo-1534528741748-1l8c8-a9000?auto=format&fit=crop&w=100&q=80'
  },
];

export const Testimonials = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="text-center mb-16">
          <p className="text-[11px] font-bold uppercase tracking-widest text-accent mb-3">Customer Love</p>
          <h2 className="font-display text-4xl font-black">What Our Clients Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative"
            >
              <div className="flex gap-1 text-yellow-500 mb-4">
                {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-gray-600 italic mb-6 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="font-bold text-sm">{t.name}</div>
                  <div className="text-gray-400 text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
