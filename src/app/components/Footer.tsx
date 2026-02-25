import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Mission */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xl font-black italic tracking-tighter text-white">RewardVid</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Watch videos, earn points, and get real cash. Pakistan's most trusted reward platform.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Navigation</h3>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/dashboard" className="hover:text-blue-400 transition-colors">User Dashboard</Link></li>
              <li><Link to="/signup" className="hover:text-blue-400 transition-colors">Create Account</Link></li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Legal & Trust</h3>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link to="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/terms" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li className="flex items-center gap-2 text-emerald-400">
                <ShieldCheck size={16} /> 100% Secure Payouts
              </li>
            </ul>
          </div>

          {/* Social Presence */}
          <div>
            <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Follow Us</h3>
            <div className="flex gap-4 mb-6">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a key={index} href="#" className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <p className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-blue-500" />
              <span className="text-slate-400 font-medium">support@rewardvid.pk</span>
            </p>
          </div>
        </div>

        {/* Final Copyright */}
        <div className="pt-8 border-t border-slate-900 text-[12px] text-center text-slate-500 font-bold uppercase tracking-tighter">
          <p>© 2026 REWARDVID • BUILT FOR SUCCESS • ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </footer>
  );
}