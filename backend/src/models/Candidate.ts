import mongoose, { Schema, Document } from "mongoose";

/**
 * Represents a parsed and structured candidate profile.
 */
export interface ICandidate extends Document {
  name: string;
  email: string;
  phone?: string;
  resumeUrl: string;
  rawText: string;
  parsedProfile: {
    skills: string[];
    experience: {
      title: string;
      company: string;
      duration: string;
      description: string;
    }[];
    education: {
      degree: string;
      institution: string;
      year: string;
    }[];
    certifications: string[];
    summary: string;
  };
  jobDescriptionId: mongoose.Types.ObjectId;
  similarityScore?: number;
  shortlisted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CandidateSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Candidate name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    resumeUrl: {
      type: String,
      required: [true, "Resume file path is required"],
    },
    rawText: {
      type: String,
      required: [true, "Raw extracted text from resume is required"],
    },
    parsedProfile: {
      skills: { type: [String], default: [] },
      experience: [
        {
          title: { type: String, default: "" },
          company: { type: String, default: "" },
          duration: { type: String, default: "" },
          description: { type: String, default: "" },
        },
      ],
      education: [
        {
          degree: { type: String, default: "" },
          institution: { type: String, default: "" },
          year: { type: String, default: "" },
        },
      ],
      certifications: { type: [String], default: [] },
      summary: { type: String, default: "" },
    },
    jobDescriptionId: {
      type: Schema.Types.ObjectId,
      ref: "JobDescription",
      required: [true, "Associated Job Description ID is required"],
    },
    similarityScore: {
      type: Number,
      min: 0,
      max: 1,
      default: null,
    },
    shortlisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient querying by job and shortlist status
CandidateSchema.index({ jobDescriptionId: 1, shortlisted: 1 });
CandidateSchema.index({ email: 1, jobDescriptionId: 1 });

export default mongoose.model<ICandidate>("Candidate", CandidateSchema);
