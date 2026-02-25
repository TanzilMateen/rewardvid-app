import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { ShieldCheck, AlertTriangle, Lock } from 'lucide-react';

export function Terms() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">Official Policy</Badge>
          <h1 className="text-5xl font-black tracking-tighter mb-4 italic">TERMS & POLICIES</h1>
          <p className="text-lg text-slate-300 font-medium">Everything you need to know about Rewards, Privacy, and Rules.</p>
          <p className="mt-2 text-sm opacity-50 font-bold">Last updated: February 23, 2026</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* 1. Main Terms Card */}
          <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
            <CardContent className="p-10 prose prose-slate max-w-none">
              <div className="flex items-center gap-2 text-blue-600 mb-6 font-black uppercase tracking-widest text-sm">
                <ShieldCheck size={20} /> Section 1: Terms of Service
              </div>
              
              <h2 className="text-2xl font-black italic">1. General Agreement</h2>
              <p>By using RewardVid, you agree to follow our rules. If you use bots, scripts, or any cheating methods, your account will be <strong>banned instantly</strong> and balance will be forfeited.</p>

              <h2 className="text-2xl font-black italic">2. Withdrawals</h2>
              <ul>
                <li>Minimum withdrawal depends on your account level.</li>
                <li>Payments are processed manually to ensure no fraud has occurred.</li>
                <li>Processing takes 24 to 72 hours.</li>
              </ul>
            </CardContent>
          </Card>

          {/* 2. Privacy Policy Card (Merged) */}
          <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-white">
            <CardContent className="p-10 prose prose-slate max-w-none">
              <div className="flex items-center gap-2 text-indigo-600 mb-6 font-black uppercase tracking-widest text-sm">
                <Lock size={20} /> Section 2: Privacy Policy
              </div>
              <h2 className="text-2xl font-black italic">Your Data is Safe</h2>
              <p>We only collect your Email and Name to process payments and keep your account secure. We <strong>never</strong> sell your data to 3rd party companies. Your password is encrypted and even we cannot see it.</p>
              <ul>
                <li><strong>Cookies:</strong> We use cookies only to keep you logged in.</li>
                <li><strong>Logs:</strong> We track IP addresses to prevent multiple account fraud.</li>
              </ul>
            </CardContent>
          </Card>

          {/* 3. Anti-Fraud Policy Card (Merged) */}
          <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-rose-50 border-l-8 border-rose-500">
            <CardContent className="p-10 prose prose-slate max-w-none">
              <div className="flex items-center gap-2 text-rose-600 mb-6 font-black uppercase tracking-widest text-sm">
                <AlertTriangle size={20} /> Section 3: Zero Tolerance Fraud Policy
              </div>
              <h2 className="text-2xl font-black italic text-rose-900">Strict Prohibitions</h2>
              <p className="text-rose-800">To maintain a fair ecosystem for advertisers, the following will result in an immediate permanent ban:</p>
              <ul className="text-rose-800 font-bold">
                <li>Using VPN or Proxy to hide your location.</li>
                <li>Creating more than 1 account per person/device.</li>
                <li>Using Ad-Blockers while watching videos.</li>
                <li>Automating video watching with scripts.</li>
              </ul>
              <p className="text-rose-700 italic text-sm">Our system automatically detects these activities. Don't risk your earnings!</p>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <div className="text-center py-8">
            <p className="text-slate-500 font-bold mb-4">Any questions? We are here to help.</p>
            <a href="mailto:support@rewardvid.com" className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-slate-800 transition-all inline-block">
              CONTACT LEGAL TEAM
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}