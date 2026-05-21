import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true },
    priceAtPurchase: { type: Number, required: true },
  }],
  totalAmount: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ['PENDING', 'PAID', 'FAILED'],
    default: 'PENDING'
  },
  deliveryStatus: {
    type: String,
    enum: ['PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
    default: 'PROCESSING'
  },
  paymentMethod: {
    type: String,
    enum: ['PAYSTACK', 'FLUTTERWAVE', 'COD'],
    required: true
  },
  transactionId: { type: String, unique: true },
  reference: { type: String, unique: true },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
