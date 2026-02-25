import { Link, useNavigate } from 'react-router-dom';
import { 
  PlayCircle, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  Zap, 
  DollarSign,
  User
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

export function Home() {
  const navigate = useNavigate();
  
  // 🔐 Auth & User State
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName"); 

  // 🧠 Smart Button Logic
  const handleActionClick = () => {
    if (token) {
      navigate('/dashboard'); // Go to Dashboard if logged in
    } else {
      navigate('/login'); // Go to Login if guest
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 🚀 Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center space-y-8">
            
            {/* ✨ Welcome Name Display (If Logged In) */}
            {token && userName ? (
              <div className="inline-flex items-center gap-3 bg-blue-50 text-blue-700 px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest border border-blue-100 animate-in fade-in zoom-in duration-500">
                <User size={18} /> Welcome back, {userName}
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 bg-slate-50 text-slate-700 px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest animate-bounce">
                <Zap size={16} className="text-blue-600" /> Best Rewards Platform 2026
              </div>
            )}
            
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none italic">
              WATCH VIDEOS.<br />
              <span className="text-blue-600">EARN REWARDS.</span>
            </h1>
            
            <p className="max-w-2xl text-slate-500 font-bold text-lg md:text-xl">
              Turn your free time into earnings. Watch premium sponsored content and withdraw directly to your preferred payment method.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              {/* ⚡ Smart Button */}
              <Button 
                onClick={handleActionClick}
                className="h-16 px-10 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-lg w-full sm:w-auto shadow-2xl shadow-slate-300 transition-all active:scale-95"
              >
                {token ? "Open Dashboard" : "Start Earning Now"} <ArrowRight className="ml-2" />
              </Button>

              <Link to="/terms">
                <Button variant="outline" className="h-16 px-10 border-2 border-slate-200 rounded-2xl font-black text-lg w-full sm:w-auto">
                  How it Works?
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-50" />
          <div className="absolute bottom-0 right-0 w-[30%] h-[30%] bg-emerald-50 rounded-full blur-[100px] opacity-60" />
        </div>
      </section>

      {/* 📊 Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <PlayCircle className="text-blue-600" size={32} />, 
                title: "Simple Tasks", 
                desc: "Choose from a variety of videos and earn points instantly after watching." 
              },
              { 
                icon: <DollarSign className="text-emerald-600" size={32} />, 
                title: "Fast Withdrawals", 
                desc: "Reach the minimum threshold and get paid within 24-48 business hours." 
              },
              { 
                icon: <ShieldCheck className="text-purple-600" size={32} />, 
                title: "Verified System", 
                desc: "A secure, transparent, and automated platform built for trust." 
              }
            ].map((feature, i) => (
              <Card key={i} className="border-none rounded-[2.5rem] bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-0 space-y-4">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 italic">{feature.title}</h3>
                  <p className="text-slate-500 font-bold text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 📣 Final CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="bg-blue-600 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-200">
             <div className="relative z-10 space-y-8">
               <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase">Don't Waste Your Time!</h2>
               <p className="text-xl font-bold opacity-90 max-w-xl mx-auto">
                 Create your free account today and start earning from your very first video.
               </p>
               <Button 
                onClick={handleActionClick}
                className="h-16 px-12 bg-white text-blue-600 hover:bg-slate-100 rounded-2xl font-black text-xl shadow-xl transition-transform active:scale-95"
               >
                 {token ? "Return to Dashboard" : "Join Now - It's Free"}
               </Button>
             </div>
             <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mt-32" />
             <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full -mr-32 -mb-32" />
          </div>
        </div>
      </section>
    </div>
  );
}