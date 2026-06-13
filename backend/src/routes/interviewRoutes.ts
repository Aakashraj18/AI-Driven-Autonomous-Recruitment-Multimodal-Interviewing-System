import { Router, Request, Response } from "express";
import { requireAuthentication } from "../middlewares/authMiddleware";

const router = Router();

/**
 * @route   POST /api/interviews/generate-rubric
 * @desc    Generate an interview rubric for a shortlisted candidate (protected)
 */
router.post(
  "/generate-rubric",
  requireAuthentication,
  async (req: Request, res: Response) => {
    // TODO: Implement in Step 6
    res.status(501).json({ success: false, error: { message: "Not implemented yet" } });
  }
);

/**
 * @route   GET /api/interviews/:id
 * @desc    Get a specific interview record (protected)
 */
router.get(
  "/:id",
  requireAuthentication,
  async (req: Request, res: Response) => {
    // TODO: Implement in Step 6
    res.status(501).json({ success: false, error: { message: "Not implemented yet" } });
  }
);

/**
 * @route   GET /api/interviews/candidate/:candidateId
 * @desc    Get all interviews for a candidate (protected)
 */
router.get(
  "/candidate/:candidateId",
  requireAuthentication,
  async (req: Request, res: Response) => {
    // TODO: Implement in Step 6
    res.status(501).json({ success: false, error: { message: "Not implemented yet" } });
  }
);

export default router;
