import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlayCircle, ScrollText, UserCircle } from 'lucide-react';

export function MobileBottomNav() {
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: 'Home', path: '/dashboard' },
    { icon: PlayCircle, label: 'Watch', path: '/watch/1' }, // Default video pe bhej raha hai
    { icon: ScrollText, label: 'Rules', path: '/terms' },
    { icon: UserCircle, label: 'Profile', path: '/dashboard' },
  ];

  const isActive = (path: string) => {
    // Exact match ya phir path starts with (like /watch/1 matches /watch)
    if (path === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(path.split('/')[1]);
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 z-50 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const Active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
                Active
                  ? 'text-blue-600'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div className={`p-1 rounded-xl transition-all ${Active ? 'bg-blue-50' : ''}`}>
                <item.icon size={Active ? 24 : 22} strokeWidth={Active ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-tighter ${Active ? 'opacity-100' : 'opacity-70'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}