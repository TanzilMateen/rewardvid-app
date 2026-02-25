import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, ShieldCheck, Timer, Gift, Info, AlertTriangle, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

// 🔥 Naya Backend URL
const API_BASE_URL = "https://reward-app-backend-seven.vercel.app";

export function WatchVideo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); 
  const [isCompleted, setIsCompleted] = useState(false);
  const [isTabActive, setIsTabActive] = useState(true);
  const [isClaiming, setIsClaiming] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // --- Logic: Tab Visibility Detection ---
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsTabActive(false);
        setIsPlaying(false); 
      } else {
        setIsTabActive(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // --- Logic: Timer Control ---
  useEffect(() => {
    if (isPlaying && timeLeft > 0 && isTabActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    if (timeLeft === 0 && !isCompleted) {
      handleTaskCompletion();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, timeLeft, isTabActive]);

  const handleTaskCompletion = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsClaiming(true);
    
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Session expired. Please login again.");
        return navigate("/login");
      }

      const response = await fetch(`${API_BASE_URL}/add-video-points`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ videoId: id })
      });
      
      if (response.ok) {
        setIsCompleted(true);
        // Success Sound
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3');
        audio.play().catch(() => console.log("Audio play blocked"));
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Reward failed. Try again.");
        setIsPlaying(false);
        setTimeLeft(30); // Reset timer on failure
      }
    } catch (err) {
      console.error("Reward error:", err);
      alert("Connection lost. Please check your internet.");
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Navigation & Status */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-all font-black uppercase text-xs tracking-widest"
          >
            <ArrowLeft size={18} /> Back to Dashboard
          </button>
          <Badge variant="outline" className="border-blue-500/30 text-blue-400 px-3 py-1 rounded-lg font-black italic">
            ACTIVE SESSION #V-{id || 'TASK'}
          </Badge>
        </div>

        {!isTabActive && !isCompleted && isPlaying && (
          <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-2xl flex items-center gap-3 animate-pulse">
            <AlertTriangle className="text-red-500" />
            <p className="text-red-500 text-xs font-black uppercase tracking-tighter">
              Warning: Timer paused! Stay on this tab to earn points.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          <div className="lg:col-span-3 space-y-4">
            <Card className="relative aspect-video bg-black rounded-[2.5rem] overflow-hidden border-none shadow-[0_0_50px_rgba(37,99,235,0.1)] ring-1 ring-white/10">
              {!isPlaying && !isCompleted ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/40 backdrop-blur-xl z-20">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-600 rounded-full blur-2xl opacity-40 animate-pulse"></div>
                    <Button 
                      onClick={() => setIsPlaying(true)}
                      className="relative w-24 h-24 rounded-full bg-blue-600 hover:bg-blue-500 shadow-2xl transition-transform hover:scale-110 active:scale-95"
                    >
                      <Play fill="white" size={40} className="ml-1" />
                    </Button>
                  </div>
                  <h3 className="mt-8 text-2xl font-black italic tracking-tighter uppercase text-white">Ready for your reward?</h3>
                  <p className="text-slate-400 font-bold mt-2">Watch 30 seconds to earn points</p>
                </div>
              ) : isCompleted ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-emerald-600 z-30 animate-in fade-in zoom-in duration-500 text-center px-4">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
                    <Gift size={48} className="text-white" />
                  </div>
                  <h2 className="text-4xl font-black italic tracking-tighter uppercase">Task Success!</h2>
                  <p className="text-xl font-bold opacity-90 mt-2">Points Credited to your Account</p>
                  <Button 
                    onClick={() => navigate('/dashboard')}
                    className="mt-10 bg-white text-emerald-700 hover:bg-slate-100 rounded-2xl font-black px-10 h-14 text-lg shadow-xl transition-all active:scale-95"
                  >
                    Back to Dashboard
                  </Button>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 relative">
                    <img 
                        src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop" 
                        className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale"
                        alt="Video Background"
                    />
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="relative w-20 h-20">
                           <div className="absolute inset-0 border-4 border-blue-600/20 rounded-full"></div>
                           <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <p className="mt-6 font-mono text-blue-500 tracking-[0.3em] text-xs font-black animate-pulse uppercase">
                           {isClaiming ? "Verifying Completion..." : "Streaming Content..."}
                        </p>
                    </div>
                </div>
              )}
            </Card>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-white/5 rounded-3xl border border-white/5">
              <div>
                <h2 className="text-2xl font-black italic uppercase tracking-tighter">Premium Reward Video</h2>
                <div className="flex items-center gap-2 mt-1">
                  <ShieldCheck size={14} className="text-blue-400" />
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Secured by AI Verification</span>
                </div>
              </div>
              <Badge className="bg-blue-600/10 text-blue-400 border-blue-500/20 font-black px-4 py-2 text-sm rounded-xl">
                EARN REWARDS
              </Badge>
            </div>
          </div>

          {/* 🛠️ Sidebar Controls */}
          <div className="space-y-4">
            <Card className="bg-slate-900/50 border-white/5 rounded-[2.5rem] p-8 text-white relative overflow-hidden ring-1 ring-white/5">
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex items-center gap-3 mb-6">
                  <Timer className={`${isPlaying && isTabActive ? 'animate-spin text-blue-500' : 'text-slate-500'} w-5 h-5`} />
                  <h3 className="font-black italic text-sm tracking-widest uppercase text-slate-400">Time Left</h3>
                </div>
                <div className={`text-7xl font-black tracking-tighter transition-colors duration-300 ${timeLeft < 10 ? 'text-red-500' : 'text-white'}`}>
                  {timeLeft}<span className="text-2xl ml-1 text-slate-500">s</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full mt-8 overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 transition-all duration-1000 ease-linear"
                    style={{ width: `${(timeLeft / 30) * 100}%` }}
                  ></div>
                </div>
                <p className="text-[9px] text-center mt-6 text-slate-500 font-black uppercase tracking-widest leading-relaxed">
                  Avoid switching tabs to <br />prevent timer pause
                </p>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-6 text-white shadow-2xl border-none">
              <div className="flex gap-4">
                <div className="p-2 bg-white/10 rounded-xl h-fit">
                  <Info className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-black text-xs uppercase tracking-wider">Smart System</h4>
                  <p className="text-[11px] font-bold opacity-80 mt-2 leading-relaxed">
                    Once the timer hits 0, points are auto-credited. Our system prevents multi-tab cheating.
                  </p>
                </div>
              </div>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}