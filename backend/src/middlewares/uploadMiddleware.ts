import multer from "multer";
import path from "path";
import { AppError } from "./errorHandler";

/**
 * Multer configuration for handling bulk PDF resume uploads.
 * - Storage: disk-based under `uploads/` directory.
 * - File filter: only allows PDF files.
 * - Limits: max 10 files at a time, each up to 10 MB.
 */
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "uploads/");
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (
  _req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new AppError("Only PDF files are allowed", 400) as any, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB per file
    files: 10, // Max 10 files per request
  },
});

export default upload;
