import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  category: string;
  description: string;
  imageUrl: string;
  client?: string;
  location?: string;
  completionDate?: string;
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  client: { type: String },
  location: { type: String },
  completionDate: { type: String },
}, { timestamps: true });

export default mongoose.model<IProject>('Project', ProjectSchema);
