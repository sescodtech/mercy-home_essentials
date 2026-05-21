import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  description: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  price: { type: Number, required: true },
  salePrice: Number,
  onSale: { type: Boolean, default: false },
  stock: { type: Number, default: 0 },
  images: [{
    url: { type: String, required: true },
    alt: String,
    isPrimary: { type: Boolean, default: false },
  }],
  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  variants: [{
    name: String,
    value: String,
    priceAdjust: { type: Number, default: 0 },
  }],
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
