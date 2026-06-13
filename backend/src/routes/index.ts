import { Router } from "express";
import jobRoutes from "./jobRoutes";
import candidateRoutes from "./candidateRoutes";
import interviewRoutes from "./interviewRoutes";

const router = Router();

// Health check (public)
router.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: "ok",
      timestamp: new Date().toISOString(),
    },
  });
});

// Mount feature routes
router.use("/jobs", jobRoutes);
router.use("/candidates", candidateRoutes);
router.use("/interviews", interviewRoutes);

export default router;
