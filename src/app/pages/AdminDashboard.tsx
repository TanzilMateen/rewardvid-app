import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  Clock, RefreshCw, User, Users, Shield, Edit2, Ban, Unlock, 
  ArrowLeftRight 
} from 'lucide-react';

// 🔥 Naya Backend URL
const API_BASE_URL = "https://reward-app-backend-seven.vercel.app";

interface WithdrawalRequest {
  id: number;
  name: string;
  email: string;
  amount: number;
  method: string;
  account_details: string;
  status: string;
}

interface UserData {
  id: number;
  name: string;
  email: string;
  balance: number;
  role: string;
  is_active?: number;
}

export function AdminDashboard() {
  const [requests, setRequests] = useState<WithdrawalRequest[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'withdrawals' | 'users'>('withdrawals');

  const fetchData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      // Fetch Withdrawals from Live Server
      const resW = await fetch(`${API_BASE_URL}/admin/withdrawals`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (resW.ok) setRequests(await resW.json());

      // Fetch Users from Live Server
      const resU = await fetch(`${API_BASE_URL}/admin/users`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (resU.ok) setUsers(await resU.json());
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleWithdrawal = async (id: number, status: 'Completed' | 'Rejected') => {
    if (!window.confirm(`Confirm ${status}?`)) return;
    try {
      const res = await fetch(`${API_BASE_URL}/admin/update-withdrawal`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${localStorage.getItem("token")}` 
        },
        body: JSON.stringify({ id, status })
      });
      if (res.ok) fetchData();
    } catch (err) { alert("Action failed"); }
  };

  const updateBalance = async (id: number, currentBalance: number) => {
    const newBalance = prompt(`Enter new balance (Current: Rs. ${currentBalance}):`, currentBalance.toString());
    if (newBalance === null || newBalance === "") return;

    try {
      const res = await fetch(`${API_BASE_URL}/admin/update-user-balance`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${localStorage.getItem("token")}` 
        },
        body: JSON.stringify({ id, balance: parseFloat(newBalance) })
      });
      if (res.ok) {
        alert("Balance Updated!");
        fetchData();
      }
    } catch (err) { alert("Failed to update balance"); }
  };

  const toggleUserStatus = async (id: number, currentStatus: number) => {
    const action = currentStatus === 1 ? 'BLOCK' : 'ACTIVATE';
    if (!window.confirm(`Are you sure you want to ${action} this user?`)) return;

    try {
      const res = await fetch(`${API_BASE_URL}/admin/toggle-user-status`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${localStorage.getItem("token")}` 
        },
        body: JSON.stringify({ id, is_active: currentStatus === 1 ? 0 : 1 })
      });
      if (res.ok) fetchData();
    } catch (err) { alert("Status update failed"); }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto bg-[#f8fafc] min-h-screen font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter text-slate-900 uppercase">
            Admin <span className="text-blue-600">Console</span>
          </h1>
          <p className="text-slate-500 font-bold text-sm italic">Full System Control</p>
        </div>
        
        <div className="flex gap-3 bg-white p-2 rounded-2xl shadow-sm border">
          <Button 
            onClick={() => setActiveTab('withdrawals')} 
            variant={activeTab === 'withdrawals' ? 'default' : 'ghost'}
            className={`rounded-xl font-black ${activeTab === 'withdrawals' ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
          >
            <ArrowLeftRight size={16} className="mr-2"/> Payouts
          </Button>
          <Button 
            onClick={() => setActiveTab('users')} 
            variant={activeTab === 'users' ? 'default' : 'ghost'}
            className={`rounded-xl font-black ${activeTab === 'users' ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
          >
            <Users size={16} className="mr-2"/> Users
          </Button>
          <Button onClick={fetchData} variant="outline" className="rounded-xl border-none">
            <RefreshCw size={18} className={loading ? "animate-spin text-blue-600" : "text-blue-600"} />
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
        <CardHeader className="bg-slate-900 p-8">
          <CardTitle className="text-xl font-black uppercase tracking-[0.2em] text-white flex items-center gap-3">
            {activeTab === 'withdrawals' ? <Clock className="text-blue-400" /> : <Shield className="text-blue-400" />}
            {activeTab === 'withdrawals' ? `Pending Requests (${requests.length})` : `Registered Users (${users.length})`}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Identify</th>
                  <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Financials</th>
                  <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Management</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {activeTab === 'withdrawals' ? (
                  requests.map((req) => (
                    <tr key={req.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="p-6">
                        <p className="font-black text-slate-800 text-sm">{req.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold">{req.email}</p>
                      </td>
                      <td className="p-6">
                        <p className="font-black text-blue-600 text-lg">Rs. {req.amount}</p>
                        <p className="text-[10px] text-slate-400">{req.method} | {req.account_details}</p>
                      </td>
                      <td className="p-6 flex gap-2 justify-center">
                        {req.status === 'Pending' ? (
                          <>
                            <Button onClick={() => handleWithdrawal(req.id, 'Completed')} size="sm" className="bg-emerald-500 hover:bg-emerald-600 rounded-xl font-black text-[10px]">APPROVE</Button>
                            <Button onClick={() => handleWithdrawal(req.id, 'Rejected')} size="sm" variant="destructive" className="rounded-xl font-black text-[10px]">REJECT</Button>
                          </>
                        ) : (
                          <Badge className={req.status === 'Completed' ? 'bg-emerald-100 text-emerald-600 border-none' : 'bg-red-100 text-red-600 border-none'}>{req.status}</Badge>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="p-6">
                        <p className="font-black text-slate-800 text-sm">{user.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold">{user.email}</p>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-2">
                          <p className="font-black text-emerald-600 text-lg">Rs. {user.balance}</p>
                          <Button onClick={() => updateBalance(user.id, user.balance)} variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-full text-blue-600 hover:bg-blue-100">
                            <Edit2 size={12} />
                          </Button>
                        </div>
                      </td>
                      <td className="p-6 text-center">
                        <Button 
                          onClick={() => toggleUserStatus(user.id, user.is_active ?? 1)}
                          variant={user.is_active === 0 ? "default" : "destructive"} 
                          size="sm" 
                          className={`rounded-xl font-black text-[10px] px-4 ${user.is_active === 0 ? 'bg-emerald-500 hover:bg-emerald-600' : ''}`}
                        >
                          {user.is_active === 0 ? <><Unlock size={12} className="mr-1"/> UNBLOCK</> : <><Ban size={12} className="mr-1"/> BLOCK</>}
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}