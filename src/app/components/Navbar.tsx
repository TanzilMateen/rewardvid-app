import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, ShieldCheck, Home, Coins, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // 📝 Navigation Links (Fixing Home & renaming Dashboard to Earn)
  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={16} /> },
    ...(token ? [
      { name: 'Earn', path: '/dashboard', icon: <Coins size={16} /> }, // Dashboard renamed to Earn
    ] : [
      { name: 'How It Works', path: '/#how-it-works', icon: <BookOpen size={16} /> },
    ]),
    { name: 'Rules', path: '/terms', icon: <ShieldCheck size={16} /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-11 h-11 bg-slate-900 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300 shadow-lg shadow-slate-200 group-hover:shadow-blue-200 group-hover:rotate-6">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-2xl font-black italic tracking-tighter text-slate-900 uppercase">
              RewardVid
            </span>
          </Link>

          {/* Desktop Navigation (Center) */}
          <div className="hidden md:flex items-center gap-1 bg-slate-100/50 p-1.5 rounded-2xl">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-200 ${
                  isActive(link.path) 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth & Admin Panel */}
          <div className="hidden md:flex items-center gap-4">
            {token && userRole === 'admin' && (
              <Link to="/admin-control">
                <Button variant="outline" className="border-rose-100 text-rose-600 hover:bg-rose-50 rounded-xl font-black text-xs uppercase px-4 h-11">
                  <ShieldCheck size={16} className="mr-2" /> Admin
                </Button>
              </Link>
            )}

            {token ? (
              <Button 
                onClick={handleLogout}
                variant="ghost" 
                className="text-slate-500 font-black text-xs uppercase hover:text-red-600 hover:bg-red-50 rounded-xl px-5 h-11 transition-all"
              >
                Logout <LogOut size={16} className="ml-2" />
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" className="text-slate-600 font-black text-xs uppercase px-5 h-11 hover:text-blue-600">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-7 h-11 font-black text-xs uppercase shadow-lg shadow-blue-100 transition-all active:scale-95">
                    Start Earning
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2.5 bg-slate-50 rounded-xl text-slate-900 shadow-sm" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-6 space-y-3 animate-in slide-in-from-top duration-300">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-base font-black uppercase tracking-tighter transition-all ${
                  isActive(link.path) ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-50 text-slate-600'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              {token ? (
                <Button onClick={handleLogout} className="w-full h-14 bg-red-50 text-red-600 hover:bg-red-100 rounded-2xl font-black uppercase text-sm tracking-widest">
                  Logout Session
                </Button>
              ) : (
                <div className="grid grid-cols-2 gap-3 px-1">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full h-14 rounded-2xl font-black uppercase text-xs border-slate-200">Login</Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)}>
                    <Button className="w-full h-14 bg-blue-600 text-white rounded-2xl font-black uppercase text-xs shadow-lg shadow-blue-100">Join</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}