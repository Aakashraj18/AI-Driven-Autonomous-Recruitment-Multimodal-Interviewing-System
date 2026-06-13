# 🤖 AI-Driven Autonomous Recruitment & Multimodal Interviewing System

An intelligent, full-stack recruitment platform that leverages **AI/LLM (Google Gemini)**, **RAG-based semantic shortlisting**, and **real-time multimodal interviews** to autonomously screen, rank, and interview candidates.

---

## ✨ Features

- **🔐 Clerk Authentication** — Secure session-based auth for HR dashboards and admin routes.
- **📄 Bulk Resume Ingestion** — Upload multiple PDF resumes; the system extracts text and uses Gemini to structure skills, experience, and education into a uniform JSON format.
- **🧠 Semantic Shortlisting (RAG)** — Converts candidate profiles and Job Descriptions into vector embeddings, indexes them in ChromaDB, and ranks candidates by cosine similarity.
- **🎯 Agentic Interview Generation** — LangChain agents cross-reference a candidate's tech stack with the JD to autonomously generate a bespoke interview rubric.
- **🎙️ Multimodal WebSocket Interviews** — Real-time bidirectional communication for AI-driven interviews with live evaluation and streamed verbal responses.
- **📊 Comprehensive Data Persistence** — MongoDB with well-structured Mongoose schemas for Jobs, Candidates, and Interview Records.

---

## 🏗️ Tech Stack

| Layer              | Technology                             |
| ------------------ | -------------------------------------- |
| **Runtime**        | Node.js + Express.js (TypeScript)      |
| **Database**       | MongoDB (Mongoose ODM)                 |
| **Authentication** | Clerk                                  |
| **AI / LLM**       | Google Gemini 1.5 Flash via LangChain  |
| **Vector DB**      | ChromaDB                               |
| **Real-Time**      | Socket.io                              |
| **File Handling**  | Multer + pdf-parse                     |

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── db.ts                # MongoDB connection logic
│   │   └── env.ts               # Centralized environment config
│   ├── controllers/             # Route handlers (to be added)
│   ├── middlewares/
│   │   ├── authMiddleware.ts    # Clerk session & route-level auth guards
│   │   ├── errorHandler.ts      # Global error handler + AppError class
│   │   └── uploadMiddleware.ts  # Multer config for PDF uploads
│   ├── models/
│   │   ├── Candidate.ts         # Candidate schema (parsed profile, scores)
│   │   ├── InterviewRecord.ts   # Interview schema (rubric, conversation, eval)
│   │   ├── JobDescription.ts    # Job Description schema
│   │   └── index.ts             # Barrel export
│   ├── routes/
│   │   ├── candidateRoutes.ts   # Candidate CRUD + upload endpoints
│   │   ├── interviewRoutes.ts   # Interview rubric & record endpoints
│   │   ├── jobRoutes.ts         # Job Description CRUD endpoints
│   │   └── index.ts             # Root API router + health check
│   ├── services/
│   │   ├── embeddingService.ts  # ChromaDB integration & vector search
│   │   ├── interviewAgent.ts    # LangChain agent for interview orchestration
│   │   └── resumeParser.ts      # PDF extraction + LLM structuring
│   ├── sockets/
│   │   └── interviewSocket.ts   # Socket.io real-time interview handler
│   ├── types/
│   │   └── index.ts             # Custom TypeScript type definitions
│   └── index.ts                 # Main Express + Socket.io server entry point
├── .env.example                 # Environment variable template
├── .gitignore
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ and **npm**
- **MongoDB** (local or Atlas)
- **ChromaDB** (local via Docker or pip)
- **Clerk Account** (for API keys)
- **Google AI Studio** (for Gemini API key)

### 1. Clone the repository

```bash
git clone https://github.com/Aakashraj18/AI-Driven-Autonomous-Recruitment-Multimodal-Interviewing-System.git
cd AI-Driven-Autonomous-Recruitment-Multimodal-Interviewing-System
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
# Edit .env with your actual keys (MongoDB URI, Clerk keys, Gemini API key, etc.)
```

### 4. Start the development server

```bash
npm run dev
```

The server will start on `http://localhost:5000`. You can verify it's running by hitting:

```
GET http://localhost:5000/api/health
```

---

## 📝 API Endpoints

| Method | Endpoint                            | Auth     | Description                         |
| ------ | ----------------------------------- | -------- | ----------------------------------- |
| GET    | `/api/health`                       | Public   | Server health check                 |
| POST   | `/api/jobs`                         | Required | Create a Job Description            |
| GET    | `/api/jobs`                         | Required | List all Job Descriptions           |
| GET    | `/api/jobs/:id`                     | Required | Get a single Job Description        |
| POST   | `/api/candidates/upload`            | Required | Bulk upload resumes (PDF)           |
| GET    | `/api/candidates/job/:jobId`        | Required | List candidates for a job           |
| GET    | `/api/candidates/:id`               | Required | Get a single candidate              |
| POST   | `/api/interviews/generate-rubric`   | Required | Generate interview rubric           |
| GET    | `/api/interviews/:id`               | Required | Get an interview record             |
| GET    | `/api/interviews/candidate/:candidateId` | Required | List interviews for a candidate |

---

## 🔌 WebSocket Events

| Event              | Direction       | Description                          |
| ------------------ | --------------- | ------------------------------------ |
| `interview:start`  | Client → Server | Begin an interview session           |
| `interview:answer` | Client → Server | Send transcribed candidate answer    |
| `interview:evaluate` | Server → Client | Stream evaluation and next question |
| `interview:end`    | Bidirectional   | End the interview session            |

---

## 🛠️ Build Progress

- [x] **Step 1**: Project Initialization & Core Configuration
- [ ] **Step 2**: Database Schemas *(completed as part of Step 1)*
- [ ] **Step 3**: Server Setup & Authentication *(completed as part of Step 1)*
- [ ] **Step 4**: Data Ingestion Pipeline (PDF Uploads & LLM Parsing)
- [ ] **Step 5**: Semantic Shortlisting (RAG Framework)
- [ ] **Step 6**: Agentic Interview Orchestration & WebSocket Interface
- [ ] **Step 7**: Frontend Development

---

## 📄 License

ISC
