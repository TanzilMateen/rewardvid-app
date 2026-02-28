import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Wallet, PlayCircle, Users, Zap, Gift, TrendingUp, 
  RefreshCcw, Lock, CheckCircle2, LayoutGrid, 
  ExternalLink, ChevronRight, AlertTriangle, Info, Clock, UserCheck
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';

const API_BASE_URL = "https://reward-app-backend-seven.vercel.app";
const COOLDOWN_TIME = 15;

export function Dashboard() {
  const [copied, setCopied] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [withdrawData, setWithdrawData] = useState({ amount: '', method: 'EasyPaisa', details: '' });
  const [stats, setStats] = useState({ 
    balance: 0, videoPoints: 0, referralPoints: 0, name: 'User', referrals: 0, activeReferrals: 0, referralCode: '' 
  });

  const videoAds = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `Premium Ad Slot #${i + 1}`,
    points: 20,
    server: i % 2 === 0 ? "Global Server A" : "Direct Server B",
    link: "https://omg10.com/4/10659255"
  }));

  const fetchUserStats = useCallback(async (silent = false) => {
    if (!silent) setIsSyncing(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/user-stats`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setStats(data);
    } catch (err) { console.error(err); } 
    finally { setIsSyncing(false); }
  }, []);

  useEffect(() => {
    fetchUserStats();
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [fetchUserStats, cooldown]);

  const handleWatchAd = (task: any) => {
    if (cooldown > 0) return;
    window.open(task.link, '_blank');
    setCooldown(COOLDOWN_TIME);
    setTimeout(() => {
      setCompletedTasks(prev => [...prev, task.id]);
      // Backend call for points should go here
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-white p-4 pb-28 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* HEADER */}
        <div className="flex items-center justify-between bg-slate-900/50 p-4 rounded-3xl border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center font-black text-xl italic">
              {stats.name[0]}
            </div>
            <div>
              <h1 className="font-black uppercase text-sm tracking-widest">{stats.name}</h1>
              <Badge variant="outline" className="text-[9px] border-blue-500/50 text-blue-400">VERIFIED USER</Badge>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => fetchUserStats()} className="rounded-2xl bg-white/5">
             <RefreshCcw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          </Button>
        </div>

        {/* BALANCE CARD */}
        <Card className="bg-gradient-to-br from-blue-700 to-indigo-900 border-none rounded-[2.5rem] shadow-2xl">
          <CardContent className="p-8">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-200 text-xs font-black uppercase tracking-widest opacity-80">Total Earnings</p>
                <h2 className="text-5xl font-black mt-2 tracking-tighter">
                  <span className="text-xl mr-1 opacity-60">Rs.</span>{stats.balance}
                </h2>
              </div>
              <Zap className="text-yellow-400 fill-yellow-400 w-12 h-12" />
            </div>
            
            <div className="grid grid-cols-2 gap-3 mt-8">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-white text-blue-900 hover:bg-blue-50 rounded-2xl h-14 font-black uppercase text-xs shadow-lg">
                    <Wallet className="mr-2 w-4 h-4" /> Withdraw
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-900 border-white/10 text-white rounded-[2rem]">
                   <DialogHeader><DialogTitle className="font-black italic uppercase">Withdraw Funds</DialogTitle></DialogHeader>
                   <div className="space-y-4 pt-4">
                      <Input placeholder="Amount" type="number" className="bg-white/5 border-white/10 h-14 rounded-xl" value={withdrawData.amount} onChange={(e)=>setWithdrawData({...withdrawData, amount: e.target.value})} />
                      <div className="grid grid-cols-2 gap-2">
                         <Button variant={withdrawData.method === 'EasyPaisa' ? 'default' : 'outline'} className="h-12 rounded-xl" onClick={() => setWithdrawData({...withdrawData, method: 'EasyPaisa'})}>EasyPaisa</Button>
                         <Button variant={withdrawData.method === 'JazzCash' ? 'default' : 'outline'} className="h-12 rounded-xl" onClick={() => setWithdrawData({...withdrawData, method: 'JazzCash'})}>JazzCash</Button>
                      </div>
                      <Input placeholder="Account Details" className="bg-white/5 border-white/10 h-14 rounded-xl" value={withdrawData.details} onChange={(e)=>setWithdrawData({...withdrawData, details: e.target.value})} />
                      <Button className="w-full bg-blue-600 h-14 rounded-2xl font-black mt-4">SUBMIT REQUEST</Button>
                   </div>
                </DialogContent>
              </Dialog>
              
              <Button onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/signup?ref=${stats.referralCode}`);
                setCopied(true); setTimeout(() => setCopied(false), 2000);
              }} className="bg-blue-400/10 hover:bg-blue-400/20 text-white border border-white/5 rounded-2xl h-14 font-black uppercase text-xs">
                {copied ? "COPIED!" : "Share Link"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* ACTIVE REFERRAL STATS SECTION */}
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900/50 border border-white/5 p-5 rounded-[2rem]">
                <div className="flex items-center gap-3 mb-2">
                    <Users className="text-blue-400 w-4 h-4" />
                    <span className="text-[10px] font-black uppercase text-slate-400">Total Joins</span>
                </div>
                <h4 className="text-2xl font-black">{stats.referrals}</h4>
            </div>
            <div className="bg-emerald-500/5 border border-emerald-500/10 p-5 rounded-[2rem]">
                <div className="flex items-center gap-3 mb-2">
                    <UserCheck className="text-emerald-400 w-4 h-4" />
                    <span className="text-[10px] font-black uppercase text-emerald-400">Active (Paid)</span>
                </div>
                <h4 className="text-2xl font-black text-emerald-400">{stats.activeReferrals || 0}</h4>
            </div>
        </div>

        {/* WORK AREA */}
        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="grid grid-cols-2 bg-slate-900 rounded-2xl h-14 p-1 mb-6 border border-white/5">
            <TabsTrigger value="videos" className="rounded-xl font-black text-[10px] uppercase data-[state=active]:bg-blue-600">
              <PlayCircle className="w-4 h-4 mr-2" /> Videos
            </TabsTrigger>
            <TabsTrigger value="offers" className="rounded-xl font-black text-[10px] uppercase data-[state=active]:bg-indigo-600">
              <LayoutGrid className="w-4 h-4 mr-2" /> Offerwall
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="space-y-3">
            <div className="flex justify-between items-center px-2">
              <h3 className="text-[10px] font-black uppercase text-slate-500">Ad Slots Available</h3>
              {cooldown > 0 && <Badge className="bg-orange-500 text-white border-none text-[9px]">Cooldown: {cooldown}s</Badge>}
            </div>
            <div className="grid grid-cols-1 gap-2">
              {videoAds.map((ad) => {
                const isDone = completedTasks.includes(ad.id);
                return (
                  <div key={ad.id} className={`flex items-center justify-between p-4 rounded-3xl border ${isDone ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-slate-900/40 border-white/5'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDone ? 'bg-emerald-500 text-white' : 'bg-blue-600/10 text-blue-400'}`}>
                        {isDone ? <CheckCircle2 size={18} /> : <PlayCircle size={18} />}
                      </div>
                      <div>
                        <h4 className="font-black text-xs uppercase">{ad.title}</h4>
                        <p className="text-[8px] font-bold text-slate-600">{ad.server}</p>
                      </div>
                    </div>
                    {isDone ? (
                      <span className="text-[10px] font-black text-emerald-500 mr-2">DONE</span>
                    ) : (
                      <Button disabled={cooldown > 0} onClick={() => handleWatchAd(ad)} className="bg-blue-600 h-8 px-5 rounded-lg font-black text-[10px] uppercase">Watch</Button>
                    )}
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="offers" className="space-y-4">
            {/* Offerwall remains similar but professionalized */}
            <div className="bg-indigo-600/10 border border-indigo-500/20 p-6 rounded-[2rem] flex flex-col md:flex-row gap-4 justify-between items-center">
                <div>
                   <h3 className="text-lg font-black italic uppercase tracking-tighter text-indigo-400">Global Rewards Wall</h3>
                   <p className="text-[10px] text-slate-500 font-bold">BIG POINTS FOR APP INSTALLS & SURVEYS</p>
                </div>
                <Button className="bg-indigo-600 w-full md:w-auto h-12 rounded-xl font-black px-8 uppercase text-xs">Explore Wall</Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* SECURITY INFO */}
        <div className="bg-slate-900/80 border border-white/5 p-6 rounded-[2.5rem] space-y-4">
            <div className="flex items-center gap-2 text-orange-500">
                <ShieldAlert size={18} />
                <h3 className="font-black uppercase text-xs italic">Anti-Cheat Policy</h3>
            </div>
            <ul className="space-y-2">
                <li className="flex gap-2 items-start text-[10px] text-slate-400">
                    <span className="text-orange-500 font-black">•</span>
                    <span>Referral bonus (Rs. 5) is only added when the referred person watches 20+ videos.</span>
                </li>
                <li className="flex gap-2 items-start text-[10px] text-slate-400">
                    <span className="text-orange-500 font-black">•</span>
                    <span>Self-referring (creating multiple accounts on one device) will lead to an <b>Immediate Ban</b>.</span>
                </li>
                <li className="flex gap-2 items-start text-[10px] text-slate-400">
                    <span className="text-orange-500 font-black">•</span>
                    <span>VPN/Proxy usage is strictly prohibited on our servers.</span>
                </li>
            </ul>
        </div>

      </div>
    </div>
  );
}
