import mongoose, { Schema, Document } from "mongoose";

/**
 * Represents a job description posted by an HR user.
 */
export interface IJobDescription extends Document {
  title: string;
  company: string;
  department?: string;
  description: string;
  requirements: {
    skills: string[];
    minExperience: number;
    education: string;
    certifications: string[];
  };
  responsibilities: string[];
  location: string;
  employmentType: "full-time" | "part-time" | "contract" | "internship";
  salaryRange?: {
    min: number;
    max: number;
    currency: string;
  };
  status: "active" | "closed" | "draft";
  postedBy: string; // Clerk user ID
  createdAt: Date;
  updatedAt: Date;
}

const JobDescriptionSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    department: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
    },
    requirements: {
      skills: { type: [String], default: [] },
      minExperience: { type: Number, default: 0 },
      education: { type: String, default: "" },
      certifications: { type: [String], default: [] },
    },
    responsibilities: {
      type: [String],
      default: [],
    },
    location: {
      type: String,
      required: [true, "Job location is required"],
      trim: true,
    },
    employmentType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship"],
      default: "full-time",
    },
    salaryRange: {
      min: { type: Number },
      max: { type: Number },
      currency: { type: String, default: "USD" },
    },
    status: {
      type: String,
      enum: ["active", "closed", "draft"],
      default: "active",
    },
    postedBy: {
      type: String,
      required: [true, "Poster (Clerk user ID) is required"],
    },
  },
  {
    timestamps: true,
  }
);

JobDescriptionSchema.index({ status: 1, postedBy: 1 });

export default mongoose.model<IJobDescription>(
  "JobDescription",
  JobDescriptionSchema
);
