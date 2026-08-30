import mongoose, { Schema, Document } from 'mongoose';

export interface IJobApplication extends Document {
  jobId?: mongoose.Types.ObjectId; // Optional: If empty, it's a General Application
  candidateName: string;
  email: string;
  phone: string;
  location: string;
  coverLetter?: string;
  linkedInProfile?: string;
  portfolioUrl?: string;
  resume: SafeAny; // Cloudinary Media object or URL string
  status: 'NEW' | 'REVIEWING' | 'SHORTLISTED' | 'REJECTED' | 'HIRED';
}

const JobApplicationSchema: Schema = new Schema({
  jobId: { type: Schema.Types.ObjectId, ref: 'Job' },
  candidateName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  coverLetter: { type: String },
  linkedInProfile: { type: String },
  portfolioUrl: { type: String },
  resume: { type: Schema.Types.Mixed, required: true },
  status: { type: String, enum: ['NEW', 'REVIEWING', 'SHORTLISTED', 'REJECTED', 'HIRED'], default: 'NEW' },
}, { timestamps: true });

export default mongoose.model<IJobApplication>('JobApplication', JobApplicationSchema);
