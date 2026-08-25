import mongoose, { Schema, Document } from 'mongoose';

export interface IPage extends Document {
  slug: string;
  title: string;
  content: any; // Can be a structured JSON object or HTML
}

const PageSchema: Schema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: Schema.Types.Mixed, required: true },
}, { timestamps: true });

export default mongoose.model<IPage>('Page', PageSchema);
