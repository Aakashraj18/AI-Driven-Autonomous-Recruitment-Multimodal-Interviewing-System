import mongoose, { Schema, Document } from "mongoose";

/**
 * Represents a single interview session between AI and a candidate.
 */
export interface IInterviewRecord extends Document {
  candidateId: mongoose.Types.ObjectId;
  jobDescriptionId: mongoose.Types.ObjectId;
  rubric: {
    topic: string;
    questions: string[];
    maxScore: number;
  }[];
  conversation: {
    role: "ai" | "candidate";
    content: string;
    timestamp: Date;
  }[];
  evaluation: {
    topic: string;
    score: number;
    maxScore: number;
    feedback: string;
  }[];
  overallScore: number;
  maxPossibleScore: number;
  status: "scheduled" | "in-progress" | "completed" | "cancelled";
  startedAt?: Date;
  completedAt?: Date;
  summary?: string;
  createdAt: Date;
  updatedAt: Date;
}

const InterviewRecordSchema: Schema = new Schema(
  {
    candidateId: {
      type: Schema.Types.ObjectId,
      ref: "Candidate",
      required: [true, "Candidate ID is required"],
    },
    jobDescriptionId: {
      type: Schema.Types.ObjectId,
      ref: "JobDescription",
      required: [true, "Job Description ID is required"],
    },
    rubric: [
      {
        topic: { type: String, required: true },
        questions: { type: [String], default: [] },
        maxScore: { type: Number, required: true },
      },
    ],
    conversation: [
      {
        role: {
          type: String,
          enum: ["ai", "candidate"],
          required: true,
        },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    evaluation: [
      {
        topic: { type: String, required: true },
        score: { type: Number, required: true, min: 0 },
        maxScore: { type: Number, required: true },
        feedback: { type: String, default: "" },
      },
    ],
    overallScore: {
      type: Number,
      default: 0,
      min: 0,
    },
    maxPossibleScore: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["scheduled", "in-progress", "completed", "cancelled"],
      default: "scheduled",
    },
    startedAt: { type: Date },
    completedAt: { type: Date },
    summary: { type: String },
  },
  {
    timestamps: true,
  }
);

InterviewRecordSchema.index({ candidateId: 1, jobDescriptionId: 1 });
InterviewRecordSchema.index({ status: 1 });

export default mongoose.model<IInterviewRecord>(
  "InterviewRecord",
  InterviewRecordSchema
);
