import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Wallet, PlayCircle, Users, ArrowUpRight, 
  History, AlertCircle, Copy, Check,
  Zap, Gift, TrendingUp, ShieldCheck, Loader2, ExternalLink, RefreshCcw,
  ShieldAlert 
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger 
} from '../components/ui/dialog';
import { Input } from '../components/ui/input';

// 🔥 Naya Backend URL
const API_BASE_URL = "https://reward-app-backend-seven.vercel.app";

// --- TYPES ---
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
  
  const [stats, setStats] = useState<UserStats>({ 
    balance: 0, 
    videoPoints: 0, 
    referralPoints: 0,
    name: 'User',
    role: 'user', 
    referrals: 0,
    referralCode: '' 
  });

  const [videos] = useState([
    { id: 1, title: "Premium Gadget Showcase", points: 50, duration: "30s", thumb: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400" },
    { id: 2, title: "Global Travel Destinations", points: 80, duration: "45s", thumb: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400" },
    { id: 3, title: "Digital Marketing Trends", points: 100, duration: "60s", thumb: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400" },
    { id: 4, title: "Pro Gaming Gear 2026", points: 60, duration: "30s", thumb: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400" },
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
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => { 
    fetchUserStats(); 
    const interval = setInterval(() => fetchUserStats(true), 15000); 
    return () => clearInterval(interval);
  }, [fetchUserStats]);

  // --- ACTIONS ---
  const handleRedeem = async (type: 'video' | 'referral') => {
    const currentPoints = type === 'video' ? stats.videoPoints : stats.referralPoints;
    if (currentPoints < 100) return alert(`⚠️ Min. 100 points zaroori hain.`);
    
    try {
      const token = localStorage.getItem("token");
      // Backend par ye endpoints hone chahiye (Jo humne server.js mein banaye hain)
      const endpoint = type === 'video' ? '/redeem-video-points' : '/redeem-referral-points';
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }
      });
      if (res.ok) { 
        fetchUserStats(); 
        alert("✨ Points converted to Cash!"); 
      } else {
        const errorData = await res.json();
        alert(`Redeem failed: ${errorData.message}`);
      }
    } catch (e) { alert("Redeem failed."); }
  };

  const handleWithdraw = async () => {
    const amt = Number(withdrawData.amount);
    if (amt < 500) return alert("❌ Min. Rs. 500 withdrawal limit.");
    setWithdrawLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/withdraw`, {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${localStorage.getItem("token")}`, 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ 
          amount: amt, 
          method: withdrawData.method, 
          accountDetails: withdrawData.details 
        })
      });
      if (res.ok) { 
        alert("✅ Withdrawal Request Sent Successfully!"); 
        fetchUserStats(); 
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (err) { alert("Server connection error."); } finally { setWithdrawLoading(false); }
  };

  const copyReferral = () => {
    const link = `${window.location.origin}/signup?ref=${stats.referralCode}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] p-4 md:p-10 pb-24 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tight flex items-center gap-3 text-slate-900">
              <Zap className="text-blue-600 fill-blue-600 w-10 h-10" />
              Hi, {stats.name}!
            </h1>
            
            {stats.role === 'admin' && (
              <Link to="/admin-control">
                <Button className="mt-2 bg-red-600 hover:bg-red-700 text-white font-black italic rounded-xl px-6 py-2 shadow-lg animate-pulse flex items-center gap-2">
                  <ShieldAlert size={18} /> OPEN ADMIN PANEL
                </Button>
              </Link>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => fetchUserStats()} className="rounded-full bg-white shadow-sm hover:bg-slate-50">
               <RefreshCcw className={`w-5 h-5 text-slate-600 ${isSyncing ? 'animate-spin' : ''}`} />
            </Button>
            <Badge className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black shadow-xl border-none">
              <ShieldCheck className="w-4 h-4 text-emerald-400 mr-2" /> {stats.role.toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* FINANCIALS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-slate-900 text-white border-none rounded-[3.5rem] shadow-2xl relative overflow-hidden">
            <CardContent className="p-10 relative z-10">
              <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Available Balance</p>
              <h2 className="text-6xl font-black mt-2 tracking-tighter">
                <span className="text-blue-500 text-2xl font-bold">Rs.</span> {stats.balance.toFixed(2)}
              </h2>
              <div className="mt-12 flex gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-white text-slate-900 hover:bg-slate-100 rounded-2xl font-black px-10 h-16 text-lg shadow-lg">Withdraw</Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-[2.5rem] p-8">
                    <DialogHeader><DialogTitle className="text-2xl font-black italic uppercase tracking-tight">Request Payout</DialogTitle></DialogHeader>
                    <div className="space-y-4 pt-4">
                      <Input placeholder="Amount (Min 500)" type="number" value={withdrawData.amount} onChange={(e)=>setWithdrawData({...withdrawData, amount:e.target.value})} className="h-14 rounded-xl" />
                      <select className="w-full h-14 rounded-xl border border-slate-200 px-4 font-bold bg-slate-50" value={withdrawData.method} onChange={(e)=>setWithdrawData({...withdrawData, method:e.target.value})}>
                        <option>EasyPaisa</option><option>JazzCash</option><option>SadaPay</option>
                      </select>
                      <Input placeholder="Account Number & Name" value={withdrawData.details} onChange={(e)=>setWithdrawData({...withdrawData, details:e.target.value})} className="h-14 rounded-xl" />
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 h-16 rounded-2xl font-black text-white text-lg mt-4 shadow-xl" onClick={handleWithdraw} disabled={withdrawLoading}>
                        {withdrawLoading ? <Loader2 className="animate-spin" /> : "SUBMIT REQUEST"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[3.5rem] bg-white border-none shadow-xl hover:shadow-2xl transition-all duration-500 group">
            <CardContent className="p-10 flex flex-col justify-between h-full">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                  <PlayCircle className="text-emerald-600 w-10 h-10" />
                </div>
                <div>
                  <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Video Earnings</p>
                  <h3 className="text-5xl font-black text-slate-900 tracking-tighter">{stats.videoPoints}</h3>
                </div>
              </div>
              <Button onClick={() => handleRedeem('video')} className="w-full mt-10 bg-emerald-500 hover:bg-emerald-600 h-16 rounded-3xl font-black text-white shadow-lg shadow-emerald-100 flex items-center justify-between px-8">
                <span>REDEEM VIDEO PTS</span> <ArrowUpRight className="w-6 h-6" />
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-[3.5rem] bg-white border-none shadow-xl hover:shadow-2xl transition-all duration-500">
            <CardContent className="p-10 flex flex-col justify-between h-full">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center">
                  <Users className="text-indigo-600 w-10 h-10" />
                </div>
                <div>
                  <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Invite Bonus ({stats.referrals})</p>
                  <h3 className="text-5xl font-black text-slate-900 tracking-tighter">{stats.referralPoints}</h3>
                </div>
              </div>
              <div className="space-y-3 mt-10">
                <Button onClick={() => handleRedeem('referral')} className="w-full bg-indigo-600 hover:bg-indigo-700 h-14 rounded-2xl font-black text-white shadow-lg">REDEEM INVITE PTS</Button>
                <Button onClick={copyReferral} variant="outline" className={`w-full h-12 rounded-2xl border-2 font-black ${copied ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : ''}`}>
                  {copied ? "COPIED!" : "COPY INVITE LINK"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* TASKS */}
        <div className="space-y-8 pt-6">
          <h2 className="text-3xl font-black uppercase italic flex items-center gap-3 text-slate-800"><Gift className="text-blue-600 w-8 h-8" /> Daily Tasks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((v) => (
              <Card key={v.id} className="rounded-[2.5rem] overflow-hidden border-none shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-500 bg-white group">
                <div className="relative aspect-video">
                  <img src={v.thumb} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-[2px]">
                    <Link to={`/watch/${v.id}`}><Button className="bg-white text-slate-900 font-black rounded-2xl px-6 py-2">WATCH & EARN</Button></Link>
                  </div>
                  <Badge className="absolute top-4 left-4 bg-white/90 text-blue-600 border-none font-black shadow-lg">+{v.points} PTS</Badge>
                </div>
                <div className="p-6">
                  <h4 className="font-black text-slate-800 text-lg leading-tight line-clamp-1">{v.title}</h4>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}