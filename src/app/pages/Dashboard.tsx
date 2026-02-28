import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Wallet, PlayCircle, Users, ArrowUpRight, 
  History, AlertCircle, Copy, Check,
  Zap, Gift, TrendingUp, ShieldCheck, Loader2, ExternalLink, RefreshCcw,
  ShieldAlert, Lock, Unlock, Clock, CheckCircle2 
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger 
} from '../components/ui/dialog';
import { Input } from '../components/ui/input';

const API_BASE_URL = "https://reward-app-backend-seven.vercel.app";

// --- CONFIGURATION ---
const COOLDOWN_TIME = 10; // 10 seconds wait between ads

interface UserStats {
  balance: number;
  videoPoints: number;
  referralPoints: number;
  name: string;
  role: string;
  referrals: number;
  referralCode: string;
}

export function Dashboard() {
  const [copied, setCopied] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [withdrawData, setWithdrawData] = useState({ amount: '', method: 'EasyPaisa', details: '' });
  const [cooldown, setCooldown] = useState(0);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  const [stats, setStats] = useState<UserStats>({ 
    balance: 0, videoPoints: 0, referralPoints: 0,
    name: 'User', role: 'user', referrals: 0, referralCode: '' 
  });

  // 🔥 Smart Ads List (Different Platforms)
  const [tasks] = useState([
    { id: 1, title: "Quick Cash Ad", points: 20, type: 'Direct', platform: 'Adsterra', link: 'https://omg10.com/4/10659255' },
    { id: 2, title: "Premium Bonus Task", points: 50, type: 'Shortlink', platform: 'GPLinks', link: 'https://gplinks.co/XYZ' }, // Apna GPLink yahan dalein
    { id: 3, title: "Global Video Ad", points: 30, type: 'Direct', platform: 'Monetag', link: 'https://monetag-link.com' },
    { id: 4, title: "Mega Reward Link", points: 60, type: 'Shortlink', platform: 'GPLinks', link: 'https://gplinks.co/ABC' },
  ]);

  // --- API FETCH LOGIC ---
  const fetchUserStats = useCallback(async (silent = false) => {
    if (!silent) setIsSyncing(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await fetch(`${API_BASE_URL}/user-stats`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setStats({
          name: data.name || 'User',
          role: data.role || 'user',
          balance: Number(data.balance || 0),
          videoPoints: Number(data.videoPoints || 0),
          referralPoints: Number(data.referralPoints || 0),
          referrals: Number(data.referrals || 0),
          referralCode: data.referralCode || "" 
        });
      }
    } catch (err) { console.error("Fetch Error:", err); } 
    finally { setIsSyncing(false); }
  }, []);

  useEffect(() => { 
    fetchUserStats(); 
    const interval = setInterval(() => fetchUserStats(true), 15000); 
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
    return () => clearInterval(interval);
  }, [fetchUserStats, cooldown]);

  // --- TASK ACTIONS ---
  const handleTaskClick = (task: any) => {
    if (cooldown > 0) return;
    
    // Open Ad Link
    window.open(task.link, '_blank');
    
    // Start Cooldown for Anti-Ban
    setCooldown(COOLDOWN_TIME);
    
    // Mock Completion (Asli completion backend se monitor hogi ya timeout se)
    setTimeout(() => {
      setCompletedTasks(prev => [...prev, task.id]);
      // Note: Ideally, yahan backend API call honi chahiye points add karne ke liye
    }, 5000);
  };

  const handleWithdraw = async () => {
    const amt = Number(withdrawData.amount);
    if (amt < 500) return alert("❌ Min. Rs. 500 withdrawal limit.");
    setWithdrawLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/withdraw`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amt, method: withdrawData.method, accountDetails: withdrawData.details })
      });
      if (res.ok) { alert("✅ Withdrawal Request Sent!"); fetchUserStats(); } 
      else { alert("Error: " + (await res.json()).message); }
    } finally { setWithdrawLoading(false); }
  };

  const copyReferral = () => {
    navigator.clipboard.writeText(`${window.location.origin}/signup?ref=${stats.referralCode}`);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 pb-24">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* TOP BAR */}
        <div className="flex justify-between items-center bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2 italic uppercase">
              <Zap className="fill-blue-600 text-blue-600" /> {stats.name}
            </h1>
            <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-tighter">Level: Platinum Member</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => fetchUserStats()} className="rounded-full">
               <RefreshCcw className={`w-5 h-5 ${isSyncing ? 'animate-spin' : ''}`} />
            </Button>
            {stats.role === 'admin' && (
              <Link to="/admin-control">
                <Badge className="bg-red-500 text-white cursor-pointer hover:bg-red-600">ADMIN</Badge>
              </Link>
            )}
          </div>
        </div>

        {/* MAIN CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-slate-900 text-white rounded-[2.5rem] shadow-xl border-none p-2">
            <CardContent className="p-8">
              <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Main Balance</span>
              <h2 className="text-5xl font-black mt-2 tracking-tighter text-blue-400 font-mono">
                <span className="text-sm align-top">Rs.</span>{stats.balance.toFixed(0)}
              </h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full mt-8 bg-white text-slate-900 hover:bg-slate-100 rounded-2xl font-black h-14">WITHDRAW CASH</Button>
                </DialogTrigger>
                <DialogContent className="rounded-[2.5rem]">
                  <DialogHeader><DialogTitle className="font-black italic uppercase">Withdrawal</DialogTitle></DialogHeader>
                  <div className="space-y-4 pt-4">
                    <Input placeholder="Amount" type="number" value={withdrawData.amount} onChange={(e)=>setWithdrawData({...withdrawData, amount:e.target.value})} className="h-14 rounded-xl" />
                    <select className="w-full h-14 rounded-xl border px-4 font-bold bg-slate-50" value={withdrawData.method} onChange={(e)=>setWithdrawData({...withdrawData, method:e.target.value})}>
                      <option>EasyPaisa</option><option>JazzCash</option><option>SadaPay</option>
                    </select>
                    <Input placeholder="Account Details" value={withdrawData.details} onChange={(e)=>setWithdrawData({...withdrawData, details:e.target.value})} className="h-14 rounded-xl" />
                    <Button className="w-full bg-blue-600 h-14 rounded-2xl font-black" onClick={handleWithdraw} disabled={withdrawLoading}>SUBMIT</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* POINTS CARDS */}
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
              <div>
                <PlayCircle className="text-emerald-500 mb-2" />
                <p className="text-slate-400 text-[10px] font-black uppercase">Video Points</p>
                <h3 className="text-3xl font-black text-slate-800">{stats.videoPoints}</h3>
              </div>
              <Button onClick={() => alert("Points convert to cash automatically at 500 pts.")} variant="outline" className="mt-4 rounded-xl font-bold border-2">REDEEM</Button>
            </div>
            <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
              <div>
                <Users className="text-indigo-500 mb-2" />
                <p className="text-slate-400 text-[10px] font-black uppercase">Invite Bonus</p>
                <h3 className="text-3xl font-black text-slate-800">{stats.referralPoints}</h3>
              </div>
              <Button onClick={copyReferral} className="mt-4 rounded-xl font-bold bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border-none shadow-none">{copied ? "COPIED!" : "INVITE"}</Button>
            </div>
          </div>
        </div>

        {/* TASK SECTION */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-black uppercase italic flex items-center gap-2"><Clock className="text-orange-500" /> Daily Tasks</h2>
            {cooldown > 0 && <Badge className="bg-orange-100 text-orange-600 font-black animate-pulse">Wait {cooldown}s for next Ad</Badge>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tasks.map((task, index) => {
              const isLocked = index > 0 && !completedTasks.includes(tasks[index - 1].id);
              const isDone = completedTasks.includes(task.id);

              return (
                <div 
                  key={task.id}
                  onClick={() => !isLocked && !isDone && handleTaskClick(task)}
                  className={`group relative flex items-center justify-between p-6 rounded-[2rem] transition-all cursor-pointer border-2 
                    ${isDone ? 'bg-emerald-50 border-emerald-200' : isLocked ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-white shadow-sm hover:border-blue-400 hover:shadow-md'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isDone ? 'bg-emerald-500' : 'bg-slate-100 group-hover:bg-blue-500 transition-colors'}`}>
                      {isDone ? <CheckCircle2 className="text-white" /> : isLocked ? <Lock className="text-slate-400" /> : <PlayCircle className="text-slate-600 group-hover:text-white" />}
                    </div>
                    <div>
                      <h4 className={`font-black uppercase text-sm ${isDone ? 'text-emerald-700' : 'text-slate-800'}`}>{task.title}</h4>
                      <p className="text-[10px] font-bold text-slate-400">{task.platform} • {task.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-lg font-black ${isDone ? 'text-emerald-600' : 'text-blue-600'}`}>+{task.points}</span>
                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Points</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MEGA OFFERWALL (MYLEAD) */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
          <TrendingUp className="absolute right-[-20px] top-[-20px] w-48 h-48 opacity-10 group-hover:rotate-12 transition-transform duration-1000" />
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-black italic uppercase tracking-tighter">Mega Offerwall</h2>
              <p className="text-blue-100 font-medium text-sm mt-2">Download Apps, Play Games & Earn up to 5000 Points per task!</p>
            </div>
            <Button onClick={() => window.open("https://mylead.global/offerwall-link", "_blank")} className="bg-white text-blue-600 hover:bg-slate-100 h-16 px-10 rounded-2xl font-black text-lg shadow-2xl">
              OPEN WALL <ExternalLink className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
