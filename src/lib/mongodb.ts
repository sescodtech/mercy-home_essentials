import mongoose from 'mongoose';

const MONG_URL = process.env.MONGODB_URI || '';

if (!MONG_URL) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = mongoose.connect(MONG_URL);
  (global as any).mongoose = cached;
}

export default cached;
