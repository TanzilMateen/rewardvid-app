import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent } from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';
import { useState } from 'react';

// 🔥 Naya Backend URL
const API_BASE_URL = "https://reward-app-backend-seven.vercel.app";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok && data.token) {
        // 💾 Store essential user info
        localStorage.setItem("token", data.token); 
        localStorage.setItem("userName", data.user.name); 
        localStorage.setItem("userRole", data.user.role); 
        
        alert("Login Successful! Welcome back.");
        navigate("/"); 
      } else {
        alert(data.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      alert("Network Error: Could not connect to the server. Please check your internet.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-2xl font-black italic tracking-tighter text-slate-900">RewardVid</span>
          </Link>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight italic">WELCOME BACK</h1>
          <p className="text-slate-500 font-bold">Sign in to manage your earnings</p>
        </div>

        <Card className="border-none shadow-2xl rounded-[2rem] overflow-hidden bg-white">
          <CardContent className="p-8">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div className="space-y-2">
                <Label htmlFor="email" className="font-bold text-slate-700">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    className="pl-10 h-12 rounded-xl border-slate-200 focus:ring-blue-500"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" name="font-bold text-slate-700">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    className="pl-10 pr-10 h-12 rounded-xl border-slate-200"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" className="rounded-md border-slate-300" />
                  <label htmlFor="remember" className="text-sm font-bold text-slate-600 cursor-pointer">Remember me</label>
                </div>
                <Link to="/terms" className="text-sm font-bold text-blue-600 hover:underline">Trouble signing in?</Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 rounded-xl font-black text-lg shadow-xl shadow-slate-200 transition-all active:scale-95"
              >
                {isLoading ? <Loader2 className="animate-spin mr-2" /> : "Sign In"}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <p className="text-slate-500 font-bold text-sm">
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-600 hover:underline">
                  Create an account for free
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}