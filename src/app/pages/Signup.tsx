import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, UserPlus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent } from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';
import { useState, useEffect } from 'react';

export function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // URL se referral code nikalna
  const rawRef = searchParams.get('ref');
  const referralFromUrl = (rawRef && rawRef !== "undefined" && rawRef !== "null") ? rawRef : '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    referred_by: referralFromUrl // Pehli bar yahan se uthayega
  });

  // 🔥 POWERFUL SYNC: Agar URL mein "ref" badle toh input khud update ho jaye
  useEffect(() => {
    if (referralFromUrl) {
      setFormData(prev => ({ ...prev, referred_by: referralFromUrl }));
    }
  }, [referralFromUrl]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Strict Cleanup: Backend ko bhejne se pehle khali string ko null karein
    const submissionData = {
        ...formData,
        referred_by: formData.referred_by.trim() === "" ? null : formData.referred_by.trim()
    };

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData)
      });

      const data = await response.json();
      
      if(response.ok) {
        alert("Account Created! 🚀 Balance: Rs. 0.00");
        navigate("/login"); 
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (error) {
      alert("Error: Backend is not running on port 5000.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md">
        
        {/* Logo Section */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-xl group-hover:bg-blue-600 transition-all group-hover:rotate-6">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-2xl font-black italic tracking-tighter text-slate-900 uppercase">RewardVid</span>
          </Link>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight italic uppercase leading-none">Join the Team</h1>
          <p className="text-slate-500 font-bold mt-2 italic">Earn rewards for every friend you invite</p>
        </div>

        <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2.5rem] overflow-hidden bg-white">
          <CardContent className="p-8">
            <form className="space-y-5" onSubmit={handleSignup}>
              
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="font-black text-xs uppercase tracking-widest text-slate-500 ml-1">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="name"
                    required
                    placeholder="Enter your name"
                    className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all font-bold"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="font-black text-xs uppercase tracking-widest text-slate-500 ml-1">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="email@example.com"
                    className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all font-bold"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" name="font-black text-xs uppercase tracking-widest text-slate-500 ml-1">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    className="pl-12 pr-12 h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all font-bold"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Referral Code Box (Yeh ab sahi se kaam karega) */}
              <div className="space-y-2">
                <Label htmlFor="referral" className="font-black text-xs uppercase tracking-widest text-slate-500 ml-1">Referral Code</Label>
                <div className="relative">
                  <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500" />
                  <Input
                    id="referral"
                    type="text"
                    placeholder="Automatic via link"
                    // Agar referral code hai toh background blue ho jaye
                    className={`pl-12 h-14 rounded-2xl border-slate-100 font-black tracking-widest uppercase transition-all ${formData.referred_by ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-inner' : 'bg-slate-50/50'}`}
                    value={formData.referred_by}
                    onChange={(e) => setFormData({...formData, referred_by: e.target.value.toUpperCase()})}
                  />
                </div>
                {formData.referred_by ? (
                  <p className="text-[10px] font-black text-blue-600 uppercase ml-1 animate-bounce">✨ Referral Code Applied</p>
                ) : (
                  <p className="text-[10px] font-bold text-slate-400 uppercase ml-1">No referral detected</p>
                )}
              </div>

              <div className="flex items-start gap-3 pt-2">
                <Checkbox id="terms" className="mt-1 rounded-md border-slate-300" required />
                <label htmlFor="terms" className="text-xs font-bold text-slate-500 cursor-pointer leading-tight">
                  Agree to <Link to="/terms" className="text-slate-900 underline">Terms & Privacy</Link>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 rounded-2xl font-black text-lg shadow-xl shadow-blue-200 transition-all active:scale-95"
              >
                Create My Account
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-50 text-center">
              <p className="text-slate-400 font-bold text-sm uppercase">
                Got an account?{' '}
                <Link to="/login" className="text-blue-600 font-black">Login Now</Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}