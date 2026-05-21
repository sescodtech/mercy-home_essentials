import { Types } from 'mongoose';

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: Types.ObjectId | string;
  price: number;
  salePrice?: number | null;
  onSale: boolean;
  stock: number;
  images: {
    url: string;
    alt?: string;
    isPrimary: boolean;
  }[];
  rating: number;
  reviewsCount: number;
  variants: {
    name: string;
    value: string;
    priceAdjust: number;
  }[];
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  emoji?: string;
  image?: string;
}

export interface Order {
  _id: string;
  userId: Types.ObjectId | string;
  items: {
    productId: Types.ObjectId | string;
    quantity: number;
    priceAtPurchase: number;
  }[];
  totalAmount: number;
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED';
  deliveryStatus: 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  paymentMethod: 'PAYSTACK' | 'FLUTTERWAVE' | 'COD';
  transactionId?: string;
  reference?: string;
  shippingAddress: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  createdAt: Date;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  phone?: string;
}
