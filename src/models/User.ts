import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
  phone: String,
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model('User', userSchema);
