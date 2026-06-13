import { useState, useCallback, useRef } from 'react';
import {
  Upload as UploadIcon,
  FileText,
  X,
  CloudUpload,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Briefcase,
} from 'lucide-react';

interface UploadedFile {
  file: File;
  id: string;
}

export default function UploadView() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── JD Form state ──────────────────────────
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [location, setLocation] = useState('');
  const [employmentType, setEmploymentType] = useState('full-time');

  // ── Drag & Drop handlers ───────────────────
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const addFiles = useCallback((newFiles: FileList | File[]) => {
    const pdfFiles = Array.from(newFiles).filter(
      (f) => f.type === 'application/pdf'
    );
    const mapped = pdfFiles.map((file) => ({
      file,
      id: `${file.name}-${Date.now()}-${Math.random()}`,
    }));
    setFiles((prev) => [...prev, ...mapped]);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length) {
        addFiles(e.dataTransfer.files);
      }
    },
    [addFiles]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) {
        addFiles(e.target.files);
      }
    },
    [addFiles]
  );

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const handleSubmit = async () => {
    if (files.length === 0 || !jobTitle || !description) return;

    setIsUploading(true);
    setUploadStatus('idle');

    // Simulate upload — will connect to backend later
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setUploadStatus('success');
      setFiles([]);
    } catch {
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl">
      {/* ── Page Header ─────────────────────────── */}
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Upload Resumes
        </h1>
        <p className="mt-1 text-surface-200/60 text-sm">
          Upload candidate resumes and define the target Job Description for AI
          processing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── Left: Drag & Drop Zone ────────────── */}
        <div className="space-y-5">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative rounded-2xl border-2 border-dashed p-10 text-center cursor-pointer transition-all duration-300 ${
              isDragging
                ? 'border-primary-400 bg-primary-500/10 shadow-lg shadow-primary-500/10 scale-[1.01]'
                : 'border-surface-700 bg-surface-900/50 hover:border-primary-500/40 hover:bg-primary-500/5'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              id="resume-upload"
            />

            <div
              className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center transition-all duration-300 ${
                isDragging
                  ? 'bg-primary-500/20 scale-110'
                  : 'bg-surface-800'
              }`}
            >
              <CloudUpload
                className={`w-8 h-8 transition-colors ${
                  isDragging ? 'text-primary-400' : 'text-surface-200/40'
                }`}
              />
            </div>

            <p className="mt-4 text-white font-semibold">
              Drag & drop PDF resumes here
            </p>
            <p className="mt-1 text-sm text-surface-200/50">
              or click to browse — up to 10 files, 10 MB each
            </p>

            {isDragging && (
              <div className="absolute inset-0 rounded-2xl bg-primary-500/5 pointer-events-none" />
            )}
          </div>

          {/* ── Uploaded Files List ─────────────── */}
          {files.length > 0 && (
            <div className="glass rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-semibold text-white">
                  {files.length} file{files.length > 1 ? 's' : ''} selected
                </h3>
                <button
                  onClick={() => setFiles([])}
                  className="text-xs text-danger-400 hover:text-danger-300 transition-colors font-medium"
                >
                  Clear all
                </button>
              </div>
              {files.map((item, i) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-all animate-slide-up"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="w-9 h-9 rounded-lg bg-danger-500/10 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-danger-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium truncate">
                      {item.file.name}
                    </p>
                    <p className="text-xs text-surface-200/40">
                      {formatFileSize(item.file.size)}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(item.id);
                    }}
                    className="w-7 h-7 rounded-lg hover:bg-danger-500/10 flex items-center justify-center transition-colors"
                  >
                    <X className="w-3.5 h-3.5 text-surface-200/40 hover:text-danger-400" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Right: Job Description Form ────────── */}
        <div className="glass rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center shadow-lg shadow-accent-500/20">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                Job Description
              </h2>
              <p className="text-xs text-surface-200/50">
                Define the target role for candidate matching
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="job-title" className="block text-xs font-medium text-surface-200/60 mb-1.5 uppercase tracking-wider">
                Job Title *
              </label>
              <input
                id="job-title"
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Senior Full-Stack Engineer"
                className="w-full px-4 py-2.5 rounded-xl bg-surface-900/80 border border-surface-700 text-white text-sm placeholder:text-surface-200/30 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="company" className="block text-xs font-medium text-surface-200/60 mb-1.5 uppercase tracking-wider">
                  Company
                </label>
                <input
                  id="company"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Acme Corp"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-900/80 border border-surface-700 text-white text-sm placeholder:text-surface-200/30 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 transition-all"
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-xs font-medium text-surface-200/60 mb-1.5 uppercase tracking-wider">
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Remote"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-900/80 border border-surface-700 text-white text-sm placeholder:text-surface-200/30 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="employment-type" className="block text-xs font-medium text-surface-200/60 mb-1.5 uppercase tracking-wider">
                Employment Type
              </label>
              <select
                id="employment-type"
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-900/80 border border-surface-700 text-white text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 transition-all appearance-none"
              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>

            <div>
              <label htmlFor="skills" className="block text-xs font-medium text-surface-200/60 mb-1.5 uppercase tracking-wider">
                Required Skills
              </label>
              <input
                id="skills"
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g. React, Node.js, TypeScript, MongoDB"
                className="w-full px-4 py-2.5 rounded-xl bg-surface-900/80 border border-surface-700 text-white text-sm placeholder:text-surface-200/30 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 transition-all"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-xs font-medium text-surface-200/60 mb-1.5 uppercase tracking-wider">
                Job Description *
              </label>
              <textarea
                id="description"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the role, responsibilities, and requirements..."
                className="w-full px-4 py-2.5 rounded-xl bg-surface-900/80 border border-surface-700 text-white text-sm placeholder:text-surface-200/30 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 transition-all resize-none"
              />
            </div>
          </div>

          {/* ── Submit Button ───────────────────── */}
          <button
            id="submit-upload"
            onClick={handleSubmit}
            disabled={files.length === 0 || !jobTitle || !description || isUploading}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-400 hover:to-primary-500 hover:shadow-lg hover:shadow-primary-500/25 active:scale-[0.98]"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <UploadIcon className="w-4 h-4" />
                Upload & Process Resumes
              </>
            )}
          </button>

          {/* Status Messages */}
          {uploadStatus === 'success' && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-accent-500/10 border border-accent-500/20 animate-slide-up">
              <CheckCircle2 className="w-4 h-4 text-accent-400 shrink-0" />
              <p className="text-sm text-accent-300">
                Resumes uploaded successfully! Processing with AI...
              </p>
            </div>
          )}
          {uploadStatus === 'error' && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-danger-500/10 border border-danger-500/20 animate-slide-up">
              <AlertCircle className="w-4 h-4 text-danger-400 shrink-0" />
              <p className="text-sm text-danger-300">
                Upload failed. Please try again.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
