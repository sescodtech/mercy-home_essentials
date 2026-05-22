'use client';

import { Checkbox } from '@/components/ui/Checkbox';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/button';
import { useCallback } from 'react';

export interface FilterState {
  priceMin: number;
  priceMax: number;
  categories: string[];
  rating: number;
  sortBy: string;
}

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

const CATEGORIES = [
  { id: 'kitchen', label: 'Kitchen Luxe' },
  { id: 'office', label: 'Executive Office' },
  { id: 'tech', label: 'Digital Innovation' },
  { id: 'security', label: 'Secure Living' },
  { id: 'wellness', label: 'Home Wellness' },
  { id: 'gaming', label: 'Gaming Suite' },
];

const RATINGS = [
  { value: 5, label: '5 stars' },
  { value: 4, label: '4+ stars' },
  { value: 3, label: '3+ stars' },
  { value: 2, label: '2+ stars' },
];

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

export const ProductFilters = ({
  filters,
  onFilterChange,
  onClearFilters,
}: ProductFiltersProps) => {
  const handleCategoryChange = useCallback(
    (categoryId: string) => {
      const newCategories = filters.categories.includes(categoryId)
        ? filters.categories.filter((c) => c !== categoryId)
        : [...filters.categories, categoryId];
      onFilterChange({ ...filters, categories: newCategories });
    },
    [filters, onFilterChange]
  );

  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    onFilterChange({
      ...filters,
      [type === 'min' ? 'priceMin' : 'priceMax']: value,
    });
  };

  return (
    <div className="space-y-8">
      {/* Sort Options */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-widest text-dark">
          Sort By
        </h3>
        <Select
          value={filters.sortBy}
          onChange={(e) =>
            onFilterChange({ ...filters, sortBy: e.target.value })
          }
          options={SORT_OPTIONS}
        />
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-dark">
          Price Range
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={filters.priceMin}
              onChange={(e) => handlePriceChange('min', parseInt(e.target.value))}
              placeholder="Min"
              className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
            <span className="text-gray-400">—</span>
            <input
              type="number"
              value={filters.priceMax}
              onChange={(e) => handlePriceChange('max', parseInt(e.target.value))}
              placeholder="Max"
              className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>
          <input
            type="range"
            min="0"
            max="100000"
            value={filters.priceMax}
            onChange={(e) => handlePriceChange('max', parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-widest text-dark">
          Categories
        </h3>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <Checkbox
              key={cat.id}
              label={cat.label}
              checked={filters.categories.includes(cat.id)}
              onChange={() => handleCategoryChange(cat.id)}
            />
          ))}
        </div>
      </div>

      {/* Ratings */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-widest text-dark">
          Min Rating
        </h3>
        <div className="space-y-2">
          <Checkbox
            label="Any"
            checked={filters.rating === 0}
            onChange={() => onFilterChange({ ...filters, rating: 0 })}
          />
          {RATINGS.map((rating) => (
            <Checkbox
              key={rating.value}
              label={rating.label}
              checked={filters.rating === rating.value}
              onChange={() => onFilterChange({ ...filters, rating: rating.value })}
            />
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-4 border-t border-gray-200">
        <Button className="w-full rounded-lg" size="md">
          Apply Filters
        </Button>
        <Button
          variant="outline"
          className="w-full rounded-lg"
          size="md"
          onClick={onClearFilters}
        >
          Clear All
        </Button>
      </div>
    </div>
  );
};
