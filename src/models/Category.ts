import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  emoji: String,
  image: String, // Cloudinary URL
}, { timestamps: true });

export const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
