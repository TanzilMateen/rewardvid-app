import { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { 
  RefreshCw, Users, Shield, Ban, Unlock, 
  Wallet, Activity, Link2, Search,
  AlertTriangle, CheckCircle, Plus
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';

const API_BASE_URL = "https://reward-app-backend-seven.vercel.app";

interface WithdrawalRequest {
  id: number; name: string; email: string; amount: number;
  method: string; account_details: string; status: string; created_at: string;
}

interface UserData {
  id: number; name: string; email: string; balance: number;
  role: string; is_active?: number;
}

export function AdminDashboard() {
  const [requests, setRequests] = useState<WithdrawalRequest[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<'withdrawals' | 'users' | 'tasks'>('withdrawals');
  const [newAdLink, setNewAdLink] = useState("");

  const fetchData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const [resW, resU] = await Promise.all([
        fetch(`${API_BASE_URL}/admin/withdrawals`, { headers: { "Authorization": `Bearer ${token}` } }),
        fetch(`${API_BASE_URL}/admin/users`, { headers: { "Authorization": `Bearer ${token}` } })
      ]);
      
      if (resW.ok) setRequests(await resW.json());
      if (resU.ok) setUsers(await resU.json());
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // --- ACTIONS ---
  const handleWithdrawal = async (id: number, status: 'Completed' | 'Rejected') => {
    const reason = status === 'Rejected' ? prompt("Reason for rejection?") : "Payment Processed";
    if (status === 'Rejected' && !reason) return;

    try {
      const res = await fetch(`${API_BASE_URL}/admin/update-withdrawal`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify({ id, status, admin_note: reason })
      });
      if (res.ok) {
          alert(`Request ${status === 'Completed' ? 'Approved' : 'Rejected'} Successfully`);
          fetchData();
      }
    } catch (err) { alert("Action failed"); }
  };

  const toggleUserStatus = async (id: number, currentStatus: number) => {
    const action = currentStatus === 1 ? 'BLOCK' : 'ACTIVATE';
    if (!window.confirm(`Are you sure you want to ${action} this user?`)) return;

    try {
      const res = await fetch(`${API_BASE_URL}/admin/toggle-user-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify({ id, is_active: currentStatus === 1 ? 0 : 1 })
      });
      if (res.ok) fetchData();
    } catch (err) { alert("Status update failed"); }
  };

  const updateAdLink = async () => {
    if(!newAdLink) return alert("Please enter a URL");
    // Note: Backend pe /admin/update-settings endpoint hona chahiye
    alert("System Setting Updated: " + newAdLink);
    setNewAdLink("");
  };

  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto bg-[#f1f5f9] min-h-screen font-sans text-slate-900">
      
      {/* 📊 ANALYTICS OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-white border-none shadow-sm rounded-3xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400">Total Users</p>
              <h3 className="text-3xl font-black">{users.length}</h3>
            </div>
            <div className="p-3 bg-blue-50 rounded-2xl text-blue-600"><Users size={20}/></div>
          </div>
        </Card>
        <Card className="bg-white border-none shadow-sm rounded-3xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400">Pending</p>
              <h3 className="text-3xl font-black text-orange-500">{requests.filter(r => r.status === 'Pending').length}</h3>
            </div>
            <div className="p-3 bg-orange-50 rounded-2xl text-orange-600"><Wallet size={20}/></div>
          </div>
        </Card>
        <Card className="bg-white border-none shadow-sm rounded-3xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400">Disbursed</p>
              <h3 className="text-3xl font-black text-emerald-600">Rs. {requests.filter(r => r.status === 'Completed').reduce((acc, curr) => acc + curr.amount, 0)}</h3>
            </div>
            <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600"><CheckCircle size={20}/></div>
          </div>
        </Card>
        <Card className="bg-slate-900 border-none shadow-sm rounded-3xl p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400 text-slate-500">Security</p>
              <h3 className="text-lg font-black text-blue-400 flex items-center gap-2 mt-2">
                <Activity size={18} className="animate-pulse"/> LIVE
              </h3>
            </div>
            <Shield size={24} className="text-slate-700"/>
          </div>
        </Card>
      </div>

      {/* 🕹️ CONTROLS */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex gap-2 bg-white p-1.5 rounded-[1.5rem] shadow-sm border w-full md:w-auto">
          <Button onClick={() => setActiveTab('withdrawals')} variant={activeTab === 'withdrawals' ? 'default' : 'ghost'} className={`rounded-xl font-black flex-1 md:flex-none ${activeTab === 'withdrawals' ? 'bg-slate-900' : ''}`}>Payouts</Button>
          <Button onClick={() => setActiveTab('users')} variant={activeTab === 'users' ? 'default' : 'ghost'} className={`rounded-xl font-black flex-1 md:flex-none ${activeTab === 'users' ? 'bg-slate-900' : ''}`}>Users</Button>
          <Button onClick={() => setActiveTab('tasks')} variant={activeTab === 'tasks' ? 'default' : 'ghost'} className={`rounded-xl font-black flex-1 md:flex-none ${activeTab === 'tasks' ? 'bg-slate-900' : ''}`}>Ads/Settings</Button>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <Input 
            placeholder="Search database..." 
            className="pl-12 rounded-2xl border-none shadow-sm h-12 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900">
                <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Information</th>
                <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Financials</th>
                <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeTab === 'withdrawals' && requests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-6">
                    <p className="font-black text-slate-800">{req.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{req.email}</p>
                    <Badge className="mt-2 bg-slate-100 text-slate-600 border-none text-[8px] font-black">{new Date(req.created_at).toLocaleDateString()}</Badge>
                  </td>
                  <td className="p-6">
                    <p className="font-black text-slate-900 text-lg">Rs. {req.amount}</p>
                    <p className="text-[10px] font-bold text-blue-600 uppercase">{req.method} | {req.account_details}</p>
                  </td>
                  <td className="p-6 text-center">
                    {req.status === 'Pending' ? (
                      <div className="flex gap-2 justify-center">
                        <Button onClick={() => handleWithdrawal(req.id, 'Completed')} size="sm" className="bg-emerald-500 hover:bg-emerald-600 rounded-xl font-black text-[10px]">APPROVE</Button>
                        <Button onClick={() => handleWithdrawal(req.id, 'Rejected')} size="sm" variant="destructive" className="rounded-xl font-black text-[10px]">REJECT</Button>
                      </div>
                    ) : (
                      <Badge className={`font-black ${req.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>{req.status.toUpperCase()}</Badge>
                    )}
                  </td>
                </tr>
              ))}

              {activeTab === 'users' && filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black uppercase">{user.name[0]}</div>
                      <div>
                        <p className="font-black text-slate-800">{user.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <p className="font-black text-slate-900 text-lg">Rs. {user.balance}</p>
                      {user.balance > 2500 && <AlertTriangle className="text-orange-500 animate-bounce" size={16} />}
                    </div>
                    <p className="text-[9px] font-black text-slate-400 uppercase">Status: {user.is_active ? 'Active' : 'Blocked'}</p>
                  </td>
                  <td className="p-6 text-center">
                    <Button onClick={() => toggleUserStatus(user.id, user.is_active ?? 1)} variant={user.is_active === 0 ? "default" : "destructive"} size="sm" className="rounded-xl font-black text-[10px] min-w-[100px]">
                      {user.is_active === 0 ? <Unlock size={14} className="mr-1"/> : <Ban size={14} className="mr-1"/>}
                      {user.is_active === 0 ? "ACTIVATE" : "BLOCK USER"}
                    </Button>
                  </td>
                </tr>
              ))}

              {activeTab === 'tasks' && (
                <tr>
                  <td colSpan={3} className="p-16 text-center">
                    <div className="max-w-md mx-auto space-y-6">
                       <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-sm">
                          <Link2 size={32} />
                       </div>
                       <div>
                          <h3 className="font-black text-2xl italic uppercase tracking-tighter">Ad System Manager</h3>
                          <p className="text-sm text-slate-500 font-medium mt-2">Yahan se aap apne Direct Links aur Reward settings ko Control kar sakte hain.</p>
                       </div>
                       
                       <div className="space-y-3 bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                          <Input 
                            value={newAdLink} 
                            onChange={(e) => setNewAdLink(e.target.value)}
                            placeholder="Paste New Adsterra/Monetag Link..." 
                            className="rounded-xl border-slate-200 h-12 bg-white"
                          />
                          <Button onClick={updateAdLink} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 font-black uppercase text-xs tracking-widest">
                            <Plus size={16} className="mr-2" /> Update All Slots
                          </Button>
                       </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {loading && (
            <div className="p-20 flex flex-col items-center gap-4">
              <RefreshCw className="animate-spin text-blue-600" size={40} />
              <p className="font-black text-slate-400 uppercase tracking-widest text-[10px]">Updating Live Data...</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
