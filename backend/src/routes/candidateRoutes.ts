import { Router, Request, Response } from "express";
import { requireAuthentication } from "../middlewares/authMiddleware";
import upload from "../middlewares/uploadMiddleware";

const router = Router();

/**
 * @route   POST /api/candidates/upload
 * @desc    Upload bulk PDF resumes for a given Job Description (protected)
 */
router.post(
  "/upload",
  requireAuthentication,
  upload.array("resumes", 10),
  async (req: Request, res: Response) => {
    // TODO: Implement in Step 4
    res.status(501).json({ success: false, error: { message: "Not implemented yet" } });
  }
);

/**
 * @route   GET /api/candidates/job/:jobId
 * @desc    Get all candidates for a specific Job Description (protected)
 */
router.get(
  "/job/:jobId",
  requireAuthentication,
  async (req: Request, res: Response) => {
    // TODO: Implement in Step 4
    res.status(501).json({ success: false, error: { message: "Not implemented yet" } });
  }
);

/**
 * @route   GET /api/candidates/:id
 * @desc    Get a single candidate by ID (protected)
 */
router.get(
  "/:id",
  requireAuthentication,
  async (req: Request, res: Response) => {
    // TODO: Implement in Step 4
    res.status(501).json({ success: false, error: { message: "Not implemented yet" } });
  }
);

export default router;
