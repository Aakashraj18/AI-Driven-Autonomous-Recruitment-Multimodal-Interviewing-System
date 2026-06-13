import { useState } from 'react';
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Mic,
  Eye,
  Users,
  Trophy,
  BarChart3,
} from 'lucide-react';
import type { Candidate } from '../types';

// ── Mock data for demo — will be replaced by backend data later
const mockCandidates: Candidate[] = [
  {
    _id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1-555-0101',
    resumeUrl: '/uploads/sarah.pdf',
    rawText: '',
    parsedProfile: {
      skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
      experience: [
        { title: 'Senior Frontend Engineer', company: 'TechCorp', duration: '3 years', description: 'Led a team of 5 engineers.' },
      ],
      education: [
        { degree: 'B.S. Computer Science', institution: 'MIT', year: '2018' },
      ],
      certifications: ['AWS Solutions Architect'],
      summary: 'Experienced full-stack developer with a focus on React and cloud infrastructure.',
    },
    jobDescriptionId: 'jd1',
    similarityScore: 0.94,
    shortlisted: true,
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
  },
  {
    _id: '2',
    name: 'Marcus Chen',
    email: 'marcus.c@email.com',
    resumeUrl: '/uploads/marcus.pdf',
    rawText: '',
    parsedProfile: {
      skills: ['Python', 'Django', 'React', 'Docker', 'Kubernetes'],
      experience: [
        { title: 'Backend Developer', company: 'StartupXYZ', duration: '2 years', description: 'Built microservices architecture.' },
      ],
      education: [
        { degree: 'M.S. Software Engineering', institution: 'Stanford', year: '2020' },
      ],
      certifications: ['Google Cloud Professional'],
      summary: 'Backend-focused engineer with strong DevOps skills.',
    },
    jobDescriptionId: 'jd1',
    similarityScore: 0.87,
    shortlisted: true,
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
  },
  {
    _id: '3',
    name: 'Priya Patel',
    email: 'priya.p@email.com',
    resumeUrl: '/uploads/priya.pdf',
    rawText: '',
    parsedProfile: {
      skills: ['Vue.js', 'Java', 'Spring Boot', 'MySQL'],
      experience: [
        { title: 'Full-Stack Developer', company: 'FinTech Inc', duration: '4 years', description: 'Developed payment processing systems.' },
      ],
      education: [
        { degree: 'B.Tech Information Technology', institution: 'IIT Delhi', year: '2019' },
      ],
      certifications: [],
      summary: 'Full-stack engineer with fintech domain expertise.',
    },
    jobDescriptionId: 'jd1',
    similarityScore: 0.76,
    shortlisted: false,
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
  },
  {
    _id: '4',
    name: 'James O\'Connor',
    email: 'james.o@email.com',
    resumeUrl: '/uploads/james.pdf',
    rawText: '',
    parsedProfile: {
      skills: ['React', 'Next.js', 'TypeScript', 'MongoDB', 'GraphQL'],
      experience: [
        { title: 'Frontend Lead', company: 'AgencyPro', duration: '5 years', description: 'Led frontend architecture for 20+ projects.' },
      ],
      education: [
        { degree: 'B.S. Computer Science', institution: 'UC Berkeley', year: '2017' },
      ],
      certifications: ['Meta Frontend Developer'],
      summary: 'Frontend specialist with strong architecture and mentoring skills.',
    },
    jobDescriptionId: 'jd1',
    similarityScore: 0.91,
    shortlisted: true,
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
  },
];

type SortField = 'name' | 'similarityScore';
type SortDir = 'asc' | 'desc';

export default function CandidatesView() {
  const [search, setSearch] = useState('');
  const [filterShortlisted, setFilterShortlisted] = useState<boolean | null>(null);
  const [sortField, setSortField] = useState<SortField>('similarityScore');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const candidates = mockCandidates;

  // ── Filter + Sort ────────────────────────────
  const filtered = candidates
    .filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.parsedProfile.skills.some((s) =>
          s.toLowerCase().includes(search.toLowerCase())
        );
      const matchesFilter =
        filterShortlisted === null || c.shortlisted === filterShortlisted;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      const aVal = sortField === 'name' ? a.name : (a.similarityScore ?? 0);
      const bVal = sortField === 'name' ? b.name : (b.similarityScore ?? 0);
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortDir === 'asc'
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.9) return 'text-accent-400';
    if (score >= 0.8) return 'text-primary-400';
    if (score >= 0.7) return 'text-warning-400';
    return 'text-danger-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 0.9) return 'bg-accent-500/15';
    if (score >= 0.8) return 'bg-primary-500/15';
    if (score >= 0.7) return 'bg-warning-500/15';
    return 'bg-danger-500/15';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ── Page Header ─────────────────────────── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Candidates
          </h1>
          <p className="mt-1 text-surface-200/60 text-sm">
            View ranked candidates based on semantic similarity to the Job Description.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent-500/10 border border-accent-500/20">
            <Trophy className="w-3.5 h-3.5 text-accent-400" />
            <span className="text-xs font-semibold text-accent-300">
              {candidates.filter((c) => c.shortlisted).length} Shortlisted
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary-500/10 border border-primary-500/20">
            <Users className="w-3.5 h-3.5 text-primary-400" />
            <span className="text-xs font-semibold text-primary-300">
              {candidates.length} Total
            </span>
          </div>
        </div>
      </div>

      {/* ── Search & Filter Bar ─────────────────── */}
      <div className="glass rounded-2xl p-4 flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[240px] relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-200/40" />
          <input
            id="candidate-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or skill..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-900/80 border border-surface-700 text-white text-sm placeholder:text-surface-200/30 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-surface-200/40" />
          {[
            { label: 'All', value: null },
            { label: 'Shortlisted', value: true },
            { label: 'Not Shortlisted', value: false },
          ].map((opt) => (
            <button
              key={String(opt.value)}
              onClick={() => setFilterShortlisted(opt.value as boolean | null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filterShortlisted === opt.value
                  ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                  : 'text-surface-200/50 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Candidates Table ────────────────────── */}
      <div className="glass rounded-2xl overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3.5 border-b border-surface-700/50 bg-white/[0.02]">
          <button
            onClick={() => toggleSort('name')}
            className="col-span-3 flex items-center gap-1 text-xs font-semibold text-surface-200/60 uppercase tracking-wider hover:text-white transition-colors"
          >
            Candidate
            {sortField === 'name' &&
              (sortDir === 'asc' ? (
                <ChevronUp className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              ))}
          </button>
          <div className="col-span-3 text-xs font-semibold text-surface-200/60 uppercase tracking-wider">
            Skills
          </div>
          <div className="col-span-2 text-xs font-semibold text-surface-200/60 uppercase tracking-wider">
            Experience
          </div>
          <button
            onClick={() => toggleSort('similarityScore')}
            className="col-span-2 flex items-center gap-1 text-xs font-semibold text-surface-200/60 uppercase tracking-wider hover:text-white transition-colors"
          >
            <BarChart3 className="w-3 h-3" />
            Match Score
            {sortField === 'similarityScore' &&
              (sortDir === 'asc' ? (
                <ChevronUp className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              ))}
          </button>
          <div className="col-span-2 text-xs font-semibold text-surface-200/60 uppercase tracking-wider text-right">
            Actions
          </div>
        </div>

        {/* Table Rows */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <Users className="w-12 h-12 mx-auto text-surface-200/20 mb-3" />
            <p className="text-surface-200/40 text-sm">No candidates found.</p>
          </div>
        ) : (
          filtered.map((candidate, i) => (
            <div key={candidate._id}>
              <div
                className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-surface-700/30 hover:bg-white/[0.02] transition-all animate-slide-up cursor-pointer"
                style={{ animationDelay: `${i * 40}ms` }}
                onClick={() =>
                  setExpandedId((prev) =>
                    prev === candidate._id ? null : candidate._id
                  )
                }
              >
                {/* Name */}
                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {candidate.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {candidate.name}
                    </p>
                    <p className="text-xs text-surface-200/40">
                      {candidate.email}
                    </p>
                  </div>
                  {candidate.shortlisted && (
                    <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-accent-500/15 text-accent-400 tracking-wider">
                      Shortlisted
                    </span>
                  )}
                </div>

                {/* Skills */}
                <div className="col-span-3 flex flex-wrap gap-1.5">
                  {candidate.parsedProfile.skills.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md bg-primary-500/10 text-primary-300 text-[11px] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {candidate.parsedProfile.skills.length > 4 && (
                    <span className="px-2 py-0.5 rounded-md bg-surface-800 text-surface-200/40 text-[11px] font-medium">
                      +{candidate.parsedProfile.skills.length - 4}
                    </span>
                  )}
                </div>

                {/* Experience */}
                <div className="col-span-2">
                  <p className="text-sm text-white">
                    {candidate.parsedProfile.experience[0]?.title || '—'}
                  </p>
                  <p className="text-xs text-surface-200/40">
                    {candidate.parsedProfile.experience[0]?.duration || ''}
                  </p>
                </div>

                {/* Score */}
                <div className="col-span-2">
                  {candidate.similarityScore != null ? (
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 rounded-full bg-surface-800 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            candidate.similarityScore >= 0.9
                              ? 'bg-accent-500'
                              : candidate.similarityScore >= 0.8
                              ? 'bg-primary-500'
                              : candidate.similarityScore >= 0.7
                              ? 'bg-warning-500'
                              : 'bg-danger-500'
                          }`}
                          style={{
                            width: `${candidate.similarityScore * 100}%`,
                          }}
                        />
                      </div>
                      <span
                        className={`text-sm font-bold tabular-nums ${getScoreColor(
                          candidate.similarityScore
                        )}`}
                      >
                        {(candidate.similarityScore * 100).toFixed(0)}%
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-surface-200/30">Pending</span>
                  )}
                </div>

                {/* Actions */}
                <div className="col-span-2 flex items-center gap-2 justify-end">
                  <button
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-surface-200/60 hover:text-white hover:bg-white/5 transition-all border border-surface-700/50 hover:border-surface-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedId((prev) =>
                        prev === candidate._id ? null : candidate._id
                      );
                    }}
                  >
                    <Eye className="w-3 h-3" />
                    View
                  </button>
                  {candidate.shortlisted && (
                    <button
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-400 hover:to-primary-500 shadow-sm shadow-primary-500/20 transition-all active:scale-95"
                      onClick={(e) => {
                        e.stopPropagation();
                        // TODO: navigate to interview
                      }}
                    >
                      <Mic className="w-3 h-3" />
                      Interview
                    </button>
                  )}
                </div>
              </div>

              {/* ── Expanded Detail Row ────────── */}
              {expandedId === candidate._id && (
                <div className="px-6 py-5 bg-white/[0.02] border-b border-surface-700/30 animate-slide-up">
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <h4 className="text-xs font-semibold text-surface-200/50 uppercase tracking-wider mb-2">
                        Summary
                      </h4>
                      <p className="text-sm text-surface-200/70 leading-relaxed">
                        {candidate.parsedProfile.summary}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-surface-200/50 uppercase tracking-wider mb-2">
                        Education
                      </h4>
                      {candidate.parsedProfile.education.map((edu, idx) => (
                        <div key={idx} className="mb-2">
                          <p className="text-sm text-white font-medium">
                            {edu.degree}
                          </p>
                          <p className="text-xs text-surface-200/40">
                            {edu.institution} · {edu.year}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-surface-200/50 uppercase tracking-wider mb-2">
                        All Skills
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {candidate.parsedProfile.skills.map((skill) => (
                          <span
                            key={skill}
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium ${getScoreBg(
                              candidate.similarityScore ?? 0
                            )} ${getScoreColor(candidate.similarityScore ?? 0)}`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      {candidate.parsedProfile.certifications.length > 0 && (
                        <div className="mt-3">
                          <h4 className="text-xs font-semibold text-surface-200/50 uppercase tracking-wider mb-1.5">
                            Certifications
                          </h4>
                          {candidate.parsedProfile.certifications.map((cert) => (
                            <span
                              key={cert}
                              className="inline-block mr-2 mb-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-warning-500/10 text-warning-400"
                            >
                              {cert}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
