import {
  Users,
  FileText,
  Mic,
  TrendingUp,
  ArrowUpRight,
  Briefcase,
  Clock,
} from 'lucide-react';

const stats = [
  {
    label: 'Total Candidates',
    value: '0',
    change: '+0%',
    icon: Users,
    color: 'from-primary-500 to-primary-700',
    shadow: 'shadow-primary-500/20',
  },
  {
    label: 'Active Jobs',
    value: '0',
    change: '+0%',
    icon: Briefcase,
    color: 'from-accent-500 to-accent-600',
    shadow: 'shadow-accent-500/20',
  },
  {
    label: 'Resumes Parsed',
    value: '0',
    change: '+0%',
    icon: FileText,
    color: 'from-warning-400 to-warning-500',
    shadow: 'shadow-warning-400/20',
  },
  {
    label: 'Interviews Completed',
    value: '0',
    change: '+0%',
    icon: Mic,
    color: 'from-danger-400 to-danger-500',
    shadow: 'shadow-danger-400/20',
  },
];

const recentActivity = [
  { text: 'System initialized — ready for data ingestion.', time: 'Just now', icon: TrendingUp },
  { text: 'Configure your Clerk keys and MongoDB URI to begin.', time: 'Setup', icon: Clock },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* ── Page Header ─────────────────────────── */}
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Dashboard
        </h1>
        <p className="mt-1 text-surface-200/60 text-sm">
          Overview of your autonomous recruitment pipeline.
        </p>
      </div>

      {/* ── Stats Grid ──────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`glass rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${stat.shadow} animate-slide-up`}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-surface-200/50 uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {stat.value}
                </p>
              </div>
              <div
                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg ${stat.shadow}`}
              >
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5 text-accent-400" />
              <span className="text-xs text-accent-400 font-medium">
                {stat.change}
              </span>
              <span className="text-xs text-surface-200/40 ml-1">
                vs last week
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Content Grid ────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline Status */}
        <div className="lg:col-span-2 glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-5">
            Recruitment Pipeline
          </h2>
          <div className="flex items-center gap-3">
            {['Upload', 'Parse', 'Rank', 'Shortlist', 'Interview'].map(
              (step, i) => (
                <div key={step} className="flex items-center gap-3 flex-1">
                  <div
                    className={`flex flex-col items-center gap-2 flex-1 ${
                      i === 0 ? 'opacity-100' : 'opacity-40'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                        i === 0
                          ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                          : 'bg-surface-800 text-surface-200/50 border border-surface-700'
                      }`}
                    >
                      {i + 1}
                    </div>
                    <span className="text-xs text-surface-200/60 font-medium">
                      {step}
                    </span>
                  </div>
                  {i < 4 && (
                    <div className="w-full h-px bg-surface-700 mt-[-18px]" />
                  )}
                </div>
              )
            )}
          </div>
          <p className="mt-6 text-sm text-surface-200/40 text-center">
            Upload resumes and a Job Description to start the pipeline.
          </p>
        </div>

        {/* Recent Activity */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-5">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <item.icon className="w-4 h-4 text-primary-400" />
                </div>
                <div>
                  <p className="text-sm text-surface-200/80">{item.text}</p>
                  <p className="text-xs text-surface-200/40 mt-0.5">
                    {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
