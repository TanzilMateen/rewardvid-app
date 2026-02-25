import { Link } from 'react-router-dom';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { ShieldCheck, AlertTriangle, Lock, ArrowLeft, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';

export function Terms() {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans pb-20">
      {/* 🚀 Dark Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-24 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 font-black uppercase text-xs tracking-[0.2em] transition-all">
            <ArrowLeft size={16} /> Back to Homepage
          </Link>
          <br />
          <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-1">OFFICIAL POLICY v2.0</Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 italic uppercase">
            Terms & <span className="text-blue-500">Policies</span>
          </h1>
          <p className="text-lg text-slate-400 font-bold max-w-2xl mx-auto">
            Everything you need to know about Rewards, Privacy, and our Zero-Tolerance Fraud Rules.
          </p>
          <p className="mt-6 text-[10px] opacity-40 font-black uppercase tracking-[0.3em]">Last updated: February 26, 2026</p>
        </div>
        
        {/* Abstract Background Decor */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 border border-white rounded-full" />
          <div className="absolute bottom-10 right-10 w-96 h-96 border border-blue-500 rounded-full" />
        </div>
      </section>

      <section className="py-12 px-4 -mt-16 relative z-20">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* 1. Terms of Service Card */}
          <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2.5rem] overflow-hidden bg-white">
            <CardContent className="p-10 md:p-14 prose prose-slate max-w-none">
              <div className="flex items-center gap-2 text-blue-600 mb-8 font-black uppercase tracking-widest text-xs border-b border-slate-50 pb-4">
                <ShieldCheck size={18} /> Section 1: Terms of Service
              </div>
              
              <h2 className="text-3xl font-black italic text-slate-900 uppercase tracking-tight">1. General Agreement</h2>
              <p className="text-slate-600 font-bold leading-relaxed">
                By creating an account on RewardVid, you enter into a legal agreement to follow our community guidelines. 
                Any attempt to manipulate system points, use automation scripts, or exploit bugs will result in an 
                <span className="text-red-600 underline ml-1">instant permanent ban</span>.
              </p>

              <h3 className="text-xl font-black italic text-slate-800 mt-8">2. Withdrawal Rules</h3>
              <ul className="space-y-3 text-slate-600 font-bold">
                <li>Withdrawal requests are audited manually by our admin team.</li>
                <li>Processing window is usually <strong className="text-slate-900">24 to 72 business hours</strong>.</li>
                <li>Ensure your EasyPaisa/JazzCash details are 100% correct; we are not responsible for transfers to wrong numbers.</li>
              </ul>
            </CardContent>
          </Card>

          {/* 2. Privacy Policy Card */}
          <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2.5rem] overflow-hidden bg-white">
            <CardContent className="p-10 md:p-14 prose prose-slate max-w-none">
              <div className="flex items-center gap-2 text-indigo-600 mb-8 font-black uppercase tracking-widest text-xs border-b border-slate-50 pb-4">
                <Lock size={18} /> Section 2: Privacy & Data
              </div>
              <h2 className="text-3xl font-black italic text-slate-900 uppercase tracking-tight">Your Data is Encrypted</h2>
              <p className="text-slate-600 font-bold leading-relaxed">
                We value your trust. We only collect essential data (Email, Name, Payment Number) required to process 
                your earnings. We <strong className="text-indigo-600">never sell</strong> your personal data to 
                third-party brokers.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <p className="text-xs font-black uppercase text-slate-400 mb-2">Security</p>
                  <p className="text-sm font-bold text-slate-700">Passwords are hashed using SHA-256 encryption. Not even admins can see your password.</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <p className="text-xs font-black uppercase text-slate-400 mb-2">Anti-Fraud</p>
                  <p className="text-sm font-bold text-slate-700">We log IP addresses to ensure the "One Account Per Person" rule is strictly followed.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3. Anti-Fraud Policy Card (Warning Style) */}
          <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-rose-50/50 border-2 border-rose-100 relative">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <AlertTriangle size={120} className="text-rose-600" />
            </div>
            <CardContent className="p-10 md:p-14 prose prose-slate max-w-none relative z-10">
              <div className="flex items-center gap-2 text-rose-600 mb-8 font-black uppercase tracking-widest text-xs border-b border-rose-100 pb-4">
                <AlertTriangle size={18} /> Section 3: Zero Tolerance Policy
              </div>
              <h2 className="text-3xl font-black italic text-rose-900 uppercase tracking-tight">Strict Prohibitions</h2>
              <p className="text-rose-800 font-bold">The following activities will trigger an automatic system ban:</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 text-rose-700 font-black italic uppercase text-sm">
                <li>Using VPN or Proxy</li>
                <li>Multiple Accounts/Devices</li>
                <li>Using Ad-Blockers</li>
                <li>Scripting/Bot Automation</li>
                <li>Virtual Machines (VMs)</li>
                <li>Click Farms</li>
              </ul>
              <div className="mt-8 p-4 bg-rose-500 text-white rounded-2xl text-center font-black text-xs uppercase tracking-widest">
                Our AI-detection system monitors traffic 24/7. Don't risk your balance!
              </div>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <div className="text-center py-12">
            <p className="text-slate-400 font-black uppercase text-xs tracking-widest mb-6">Need legal clarification?</p>
            <a href="mailto:support@rewardvid.com" className="group relative inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-blue-600 transition-all shadow-2xl shadow-slate-300 active:scale-95">
              <Mail size={20} className="group-hover:rotate-12 transition-transform" /> 
              CONTACT SUPPORT
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}