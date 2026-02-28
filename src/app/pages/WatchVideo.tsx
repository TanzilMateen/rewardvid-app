import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Play, ShieldCheck, Timer, Gift, Info, AlertTriangle, Loader2, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const API_BASE_URL = "https://reward-app-backend-seven.vercel.app";

export function WatchVideo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Dashboard se aane wala link aur points data
  const queryParams = new URLSearchParams(location.search);
  const adLink = queryParams.get('url') || "https://omg10.com/4/10659255"; 
  const rewardPoints = queryParams.get('pts') || "20";

  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); 
  const [isCompleted, setIsCompleted] = useState(false);
  const [isTabActive, setIsTabActive] = useState(true);
  const [isClaiming, setIsClaiming] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // --- Logic: Tab Visibility (Anti-Cheat) ---
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsTabActive(false);
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

  const startAdTask = () => {
    setIsPlaying(true);
    // User ko asli Ad link par bhejna (New Tab)
    window.open(adLink, '_blank');
  };

  const handleTaskCompletion = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsClaiming(true);
    
    try {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      const response = await fetch(`${API_BASE_URL}/add-video-points`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ 
            videoId: id,
            points: parseInt(rewardPoints) 
        })
      });
      
      if (response.ok) {
        setIsCompleted(true);
        new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3').play().catch(() => {});
      } else {
        alert("Verification Failed. Please don't close the ad tab too early.");
        setIsPlaying(false);
        setTimeLeft(30);
      }
    } catch (err) {
      alert("Connection Error!");
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-slate-500 hover:text-white transition-all font-black uppercase text-[10px] tracking-[0.2em]"
          >
            <ArrowLeft size={16} /> Exit Task
          </button>
          <Badge className="bg-blue-600/20 text-blue-400 border-none px-4 py-1 font-black italic">
            TASK ACTIVE: #{id}
          </Badge>
        </div>

        {/* Anti-Cheat Alert */}
        {!isTabActive && isPlaying && !isCompleted && (
          <div className="bg-orange-500/20 border border-orange-500/50 p-4 rounded-2xl flex items-center gap-3 animate-bounce">
            <AlertTriangle className="text-orange-500" />
            <p className="text-orange-500 text-[10px] font-black uppercase tracking-tighter">
              Timer Paused! You must stay on this page to earn {rewardPoints} points.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          <div className="lg:col-span-3 space-y-6">
            <Card className="relative aspect-video bg-slate-950 rounded-[3rem] overflow-hidden border-none shadow-2xl ring-1 ring-white/10">
              
              {!isPlaying && !isCompleted ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/60 backdrop-blur-3xl z-20 px-6 text-center">
                  <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(37,99,235,0.4)] animate-pulse mb-8">
                    <Play fill="white" size={48} className="ml-2 cursor-pointer" onClick={startAdTask} />
                  </div>
                  <h3 className="text-3xl font-black italic uppercase tracking-tighter">Unlock Your Reward</h3>
                  <p className="text-slate-400 font-bold mt-2 max-w-xs text-sm">
                    Click play to open the sponsor's link. Stay here for 30s to claim <span className="text-blue-400">{rewardPoints} PTS</span>.
                  </p>
                  <Button onClick={startAdTask} className="mt-8 bg-blue-600 hover:bg-blue-500 rounded-2xl px-12 h-14 font-black">START TASK</Button>
                </div>
              ) : isCompleted ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-emerald-600 z-30 animate-in fade-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
                    <Gift size={48} />
                  </div>
                  <h2 className="text-4xl font-black italic uppercase">+{rewardPoints} Points!</h2>
                  <p className="font-bold opacity-80">Added to your wallet successfully</p>
                  <Button onClick={() => navigate('/dashboard')} className="mt-8 bg-white text-emerald-700 rounded-2xl px-12 h-14 font-black">CONTINUE EARNING</Button>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-black relative">
                   <div className="absolute top-8 left-8 flex items-center gap-2">
                     <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                     <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">Live Verification</span>
                   </div>
                   <div className="relative z-10 text-center">
                      <div className="w-24 h-24 border-8 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
                      <p className="font-mono text-blue-500 text-xs font-black animate-pulse uppercase tracking-widest">
                        {isClaiming ? "Securing Points..." : "Watching Sponsor Ad..."}
                      </p>
                      <Button onClick={() => window.open(adLink, '_blank')} variant="ghost" className="mt-4 text-slate-500 text-[10px] font-black uppercase">
                        Link not opened? Click here <ExternalLink size={12} className="ml-1" />
                      </Button>
                   </div>
                </div>
              )}
            </Card>

            <div className="p-6 bg-white/5 rounded-[2.5rem] border border-white/5 flex items-center justify-between">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center">
                    <ShieldCheck className="text-blue-400" />
                 </div>
                 <div>
                    <h4 className="font-black text-sm uppercase tracking-tight">AI Fraud Protection</h4>
                    <p className="text-[10px] text-slate-500 font-bold">Your session is encrypted and verified.</p>
                 </div>
               </div>
               <Badge className="bg-emerald-500/10 text-emerald-400 border-none font-black uppercase text-[9px]">Verified Provider</Badge>
            </div>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-4">
            <Card className="bg-slate-900 border-none rounded-[3rem] p-8 ring-1 ring-white/10 text-center">
               <Timer className={`mx-auto mb-4 w-8 h-8 ${isPlaying && isTabActive ? 'text-blue-500 animate-spin' : 'text-slate-600'}`} />
               <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Countdown</h3>
               <div className={`text-7xl font-black mt-2 tracking-tighter ${timeLeft < 10 ? 'text-red-500' : 'text-white'}`}>
                 {timeLeft}s
               </div>
               <div className="w-full bg-white/5 h-1.5 rounded-full mt-8 overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 transition-all duration-1000 ease-linear shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                    style={{ width: `${(timeLeft / 30) * 100}%` }}
                  ></div>
               </div>
            </Card>

            <div className="bg-blue-600 rounded-[2.5rem] p-6 shadow-2xl">
               <h4 className="font-black text-[10px] uppercase tracking-widest opacity-70 italic">Expected Payout</h4>
               <div className="flex items-end gap-1 mt-1">
                 <span className="text-3xl font-black">{rewardPoints}</span>
                 <span className="text-sm font-black mb-1 opacity-70">PTS</span>
               </div>
               <p className="text-[10px] font-bold mt-4 leading-tight opacity-80">
                 Complete the task by staying on this page. Points are updated instantly.
               </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
