import { Request } from "express";

/**
 * Extends Express Request with Clerk's auth context.
 */
export interface AuthenticatedRequest extends Request {
  auth?: {
    userId: string;
    sessionId: string;
  };
}

/**
 * Standard API response envelope.
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    stack?: string;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

/**
 * Structured profile extracted from a resume by the LLM.
 */
export interface ParsedResumeProfile {
  name: string;
  email: string;
  phone?: string;
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
}

/**
 * Rubric topic generated for an interview.
 */
export interface RubricTopic {
  topic: string;
  questions: string[];
  maxScore: number;
}
