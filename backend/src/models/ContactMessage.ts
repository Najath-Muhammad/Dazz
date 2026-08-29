import mongoose, { Schema, Document } from 'mongoose';

export interface IContactMessage extends Document {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  status: 'NEW' | 'READ' | 'IN PROGRESS' | 'RESOLVED';
  createdAt: Date;
  updatedAt: Date;
}

const ContactMessageSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
  company: { type: String, required: false },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['NEW', 'READ', 'IN PROGRESS', 'RESOLVED'], 
    default: 'NEW' 
  },
}, { timestamps: true });

export default mongoose.model<IContactMessage>('ContactMessage', ContactMessageSchema);
