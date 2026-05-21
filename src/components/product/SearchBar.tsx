'use client';

import { Search, X, TrendingUp } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SearchSuggestion {
  id: string;
  name: string;
  category: string;
  image?: string;
}

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  suggestions?: SearchSuggestion[];
}

export const SearchBar = ({
  onSearch,
  placeholder = 'Search products...',
  suggestions = [],
}: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<SearchSuggestion[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = suggestions.filter((s) =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered.slice(0, 5));
      setIsOpen(true);
    } else {
      setFilteredSuggestions([]);
    }
  }, [query, suggestions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchQuery: string = query) => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setQuery('');
      setIsOpen(false);
    }
  };

  const TRENDING = [
    'Premium office chairs',
    'Smart home gadgets',
    'Kitchen essentials',
    'Gaming equipment',
  ];

  return (
    <div ref={ref} className="relative w-full max-w-md">
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
          onFocus={() => query && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-sm"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg border border-gray-200 shadow-lg z-50 overflow-hidden"
          >
            {filteredSuggestions.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {filteredSuggestions.map((suggestion) => (
                  <Link
                    key={suggestion.id}
                    href={`/product/${suggestion.id}`}
                    className="px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-3 group"
                  >
                    {suggestion.image && (
                      <img
                        src={suggestion.image}
                        alt={suggestion.name}
                        className="w-10 h-10 rounded object-cover"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate group-hover:text-accent">
                        {suggestion.name}
                      </p>
                      <p className="text-xs text-gray-500">{suggestion.category}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : query ? (
              <div className="px-4 py-8 text-center">
                <p className="text-sm text-gray-500 mb-4">No products found</p>
                <button
                  onClick={() => handleSearch()}
                  className="text-xs font-bold text-accent hover:underline"
                >
                  Search for "{query}"
                </button>
              </div>
            ) : (
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-600 uppercase tracking-widest">
                  <TrendingUp className="w-3 h-3" />
                  Trending
                </div>
                {TRENDING.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleSearch(term)}
                    className="block w-full text-left px-3 py-2 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
