'use client';

import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/button';
import { Rating } from '@/components/ui/Rating';
import { WishlistButton } from './WishlistButton';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useToast } from '@/hooks/useToast';
import Link from 'next/link';

interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  salePrice: number | null;
  image: string;
  rating: number;
  reviewsCount: number;
  description: string;
  stock: number;
}

interface ProductQuickViewProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export const ProductQuickView = ({
  isOpen,
  onClose,
  product,
}: ProductQuickViewProps) => {
  const { addItem } = useCartStore();
  const { success } = useToast();

  if (!product) return null;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      quantity: 1,
      image: product.image,
      slug: product.slug,
    });
    success(`${product.name} added to cart!`);
  };

  const inStock = product.stock > 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="flex items-center justify-center bg-gray-50 rounded-lg aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Details */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Title & Rating */}
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-3">
                {product.name}
              </h2>
              <Rating
                rating={product.rating}
                reviewsCount={product.reviewsCount}
              />
            </div>

            {/* Price */}
            <div>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black text-dark">
                  ₦{(product.salePrice || product.price).toLocaleString()}
                </span>
                {product.salePrice && (
                  <span className="text-lg text-gray-400 line-through">
                    ₦{product.price.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {product.description.substring(0, 150)}...
            </p>

            {/* Stock Status */}
            <div className="text-sm">
              {inStock ? (
                <span className="text-green-600 font-bold">✓ In Stock</span>
              ) : (
                <span className="text-red-600 font-bold">Out of Stock</span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handleAddToCart}
              disabled={!inStock}
              className="w-full py-3 px-4 rounded-lg bg-dark text-white font-bold hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              Add to Cart
            </button>
            <div className="flex gap-2">
              <Link href={`/product/${product.slug}`} className="flex-1">
                <Button className="w-full rounded-lg" variant="outline">
                  View Details
                </Button>
              </Link>
              <WishlistButton
                productId={product.id}
                productName={product.name}
                size="lg"
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
