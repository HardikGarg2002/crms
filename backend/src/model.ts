import { Schema, model, Document } from 'mongoose';

export interface ICandidate extends Document {
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  status: CandidateStatus;
  resumeUrl?: string;
}

export enum CandidateStatus {
    PENDING = 'PENDING',
    REVIEWED = 'REVIEWED',
    HIRED = 'HIRED'
}

const CandidateSchema = new Schema<ICandidate>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  jobTitle: { type: String, required: true },
  status: { type: String, default: CandidateStatus.PENDING, enum: Object.values(CandidateStatus) },
  resumeUrl: { type: String }
});

export default model<ICandidate>('Candidate', CandidateSchema);