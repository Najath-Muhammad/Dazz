import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author?: string;
  publishedAt?: Date;
}

const BlogSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String, required: true },
  author: { type: String },
  publishedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model<IBlog>('Blog', BlogSchema);
