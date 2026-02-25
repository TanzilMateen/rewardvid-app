import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent } from '../components/ui/card';

// 🔥 Naya Backend URL
const API_BASE_URL = "https://reward-app-backend-seven.vercel.app";

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setIsSent(true);
      } else {
        const data = await response.json();
        setError(data.message || 'User with this email does not exist.');
      }
    } catch (err) {
      setError('Connection error. Please check your internet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:rotate-6 transition-transform">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-2xl font-black italic tracking-tighter text-slate-900 uppercase">
              RewardVid
            </span>
          </Link>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight italic uppercase leading-none">Reset Password</h1>
          <p className="text-slate-500 font-bold mt-2 italic">
            {isSent ? "Check your inbox for instructions" : "Enter your email for a reset link"}
          </p>
        </div>

        <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2.5rem] overflow-hidden bg-white">
          <CardContent className="p-8">
            {!isSent ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-black text-xs uppercase tracking-widest text-slate-500 ml-1">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all font-bold"
                    />
                  </div>
                  {error && <p className="text-red-500 text-[10px] font-black uppercase ml-1">{error}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 rounded-2xl font-black text-lg shadow-xl shadow-blue-200 transition-all active:scale-95"
                >
                  {loading ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...</>
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>
              </form>
            ) : (
              <div className="text-center py-4 animate-in zoom-in duration-300">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-xl font-black text-slate-900 uppercase italic">Email Sent!</h3>
                <p className="text-slate-500 font-bold mt-2 mb-6 text-sm">
                  We've sent a instructions to <br />
                  <span className="font-black text-blue-600">{email}</span>
                </p>
                <Button 
                  onClick={() => setIsSent(false)} 
                  variant="outline" 
                  className="w-full h-12 rounded-xl font-bold border-slate-200"
                >
                  Didn't get it? Try again
                </Button>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-slate-50">
              <Link to="/login">
                <Button type="button" variant="ghost" className="w-full text-slate-400 font-black uppercase text-xs tracking-widest hover:text-blue-600" size="lg">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}