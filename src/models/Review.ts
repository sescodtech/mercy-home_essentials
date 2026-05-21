import { Types } from 'mongoose';

export interface Review {
  _id: string;
  productId: Types.ObjectId | string;
  userId: Types.ObjectId | string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
  helpful: number;
  unhelpful: number;
  createdAt: Date;
  updatedAt: Date;
}
