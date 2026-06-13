import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Upload,
  Users,
  Mic,
  Sparkles,
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/upload', icon: Upload, label: 'Upload Resumes' },
  { to: '/candidates', icon: Users, label: 'Candidates' },
  { to: '/interview', icon: Mic, label: 'Interview Room' },
];

export default function Layout() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* ── Sidebar ─────────────────────────────── */}
      <aside className="glass flex flex-col w-72 shrink-0 border-r border-primary-500/10">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-primary-500/10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/25">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white">
              AI Recruit
            </h1>
            <p className="text-[11px] text-surface-200/60 font-medium tracking-wide uppercase">
              Autonomous Hiring
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-500/15 text-primary-300 shadow-sm shadow-primary-500/10'
                    : 'text-surface-200/70 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <Icon
                className="w-[18px] h-[18px] shrink-0 transition-transform duration-200 group-hover:scale-110"
              />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-primary-500/10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
            <span className="text-xs text-surface-200/50">System Online</span>
          </div>
        </div>
      </aside>

      {/* ── Main Content ────────────────────────── */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
