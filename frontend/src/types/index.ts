/* ──────────────────────────────────────────────
   Shared TypeScript Definitions
   ────────────────────────────────────────────── */

export interface ParsedExperience {
  title: string;
  company: string;
  duration: string;
  description: string;
}

export interface ParsedEducation {
  degree: string;
  institution: string;
  year: string;
}

export interface ParsedProfile {
  skills: string[];
  experience: ParsedExperience[];
  education: ParsedEducation[];
  certifications: string[];
  summary: string;
}

export interface Candidate {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  resumeUrl: string;
  rawText: string;
  parsedProfile: ParsedProfile;
  jobDescriptionId: string;
  similarityScore?: number;
  shortlisted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface JobDescription {
  _id: string;
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
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
  salaryRange?: {
    min: number;
    max: number;
    currency: string;
  };
  status: 'active' | 'closed' | 'draft';
  postedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface RubricTopic {
  topic: string;
  questions: string[];
  maxScore: number;
}

export interface ConversationMessage {
  role: 'ai' | 'candidate';
  content: string;
  timestamp: Date;
}

export interface EvaluationResult {
  topic: string;
  score: number;
  maxScore: number;
  feedback: string;
}

export interface InterviewRecord {
  _id: string;
  candidateId: string;
  jobDescriptionId: string;
  rubric: RubricTopic[];
  conversation: ConversationMessage[];
  evaluation: EvaluationResult[];
  overallScore: number;
  maxPossibleScore: number;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  startedAt?: string;
  completedAt?: string;
  summary?: string;
}
