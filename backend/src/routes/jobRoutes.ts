import { Router, Request, Response } from "express";
import { requireAuthentication } from "../middlewares/authMiddleware";

const router = Router();

/**
 * @route   POST /api/jobs
 * @desc    Create a new Job Description (protected)
 */
router.post("/", requireAuthentication, async (req: Request, res: Response) => {
  // TODO: Implement in Step 4
  res.status(501).json({ success: false, error: { message: "Not implemented yet" } });
});

/**
 * @route   GET /api/jobs
 * @desc    Get all Job Descriptions for the logged-in user (protected)
 */
router.get("/", requireAuthentication, async (req: Request, res: Response) => {
  // TODO: Implement in Step 4
  res.status(501).json({ success: false, error: { message: "Not implemented yet" } });
});

/**
 * @route   GET /api/jobs/:id
 * @desc    Get a single Job Description by ID (protected)
 */
router.get("/:id", requireAuthentication, async (req: Request, res: Response) => {
  // TODO: Implement in Step 4
  res.status(501).json({ success: false, error: { message: "Not implemented yet" } });
});

export default router;
