import React, { useState } from 'react';
import { Building2, ShieldCheck, User, Lock, ArrowRight, Server, BarChart3, Sun, Moon } from 'lucide-react';

interface LoginViewProps {
  appTheme: 'dark' | 'light';
  setAppTheme: (theme: 'dark' | 'light') => void;
  onLogin: (userId: string) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ appTheme, setAppTheme, onLogin }) => {
  const isDark = appTheme === 'dark';
  const [loginUserId, setLoginUserId] = useState('tirthankar.biswas@company.com');
  const [loginPassword, setLoginPassword] = useState('SecurePass2026!');
  const [isLoginCardClicked, setIsLoginCardClicked] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginUserId.trim() && loginPassword.trim()) {
      onLogin(loginUserId);
    } else {
      alert('Please enter valid credentials.');
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-between p-6 lg:p-16 font-sans antialiased overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2000&q=80" 
          alt="Industrial Background" 
          className={`w-full h-full object-cover scale-105 transition-all duration-500 ${
            isDark ? 'filter brightness-75' : 'filter brightness-90 contrast-110 saturate-[0.85]'
          }`}
        />
        <div className={`absolute inset-0 transition-all duration-500 ${
          isDark ? 'bg-slate-950/80 backdrop-blur-[2px]' : 'bg-slate-200/50 backdrop-blur-[2px]'
        }`} />
      </div>

      <div className="absolute top-6 right-8 z-50 flex items-center space-x-2">
        <button
          onClick={() => setAppTheme(appTheme === 'dark' ? 'light' : 'dark')}
          className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-full border text-xs font-bold transition shadow-xl cursor-pointer ${
            isDark 
              ? 'bg-slate-900/80 border-slate-700 text-amber-400 hover:bg-slate-800' 
              : 'bg-white/90 border-slate-300 text-slate-900 hover:bg-white shadow-lg backdrop-blur-md'
          }`}
        >
          {appTheme === 'dark' ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} className="text-slate-900" />}
          <span>{appTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>

      <div className={`relative z-10 hidden lg:flex flex-col justify-between w-6/12 max-w-2xl py-8 space-y-8 ${
        isDark ? 'text-white' : 'text-slate-950'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-3 rounded-2xl shadow-xl text-slate-950 font-black">
            <Building2 size={26} />
          </div>
          <div>
            <span className={`font-black tracking-wider text-base block ${isDark ? 'text-white' : 'text-slate-950'} drop-shadow-sm`}>GCPL ENTERPRISE PORTAL</span>
            <span className={`text-xs ${isDark ? 'text-amber-400' : 'text-amber-700 font-extrabold'} font-mono tracking-widest uppercase`}>Global Scrap Asset Recovery & Ticketing</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-bold border backdrop-blur-md shadow-lg ${
            isDark ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' : 'bg-amber-500/20 border-amber-500/50 text-amber-900 bg-white/70'
          }`}>
            <ShieldCheck size={15} />
            <span>ISO 27001 • Enterprise Certified Gateway</span>
          </div>
          
          <h1 className={`text-4xl lg:text-5xl font-black tracking-tight leading-tight ${isDark ? 'text-white' : 'text-slate-950'} drop-shadow-sm`}>
            Scrap Disposal & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Ticketing Lifecycle</span> Management
          </h1>
          
          <p className={`text-sm leading-relaxed font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'} drop-shadow-sm`}>
            Unified enterprise governance platform enabling automated plant hub-routing, multi-tier maker-checker approvals, real-time CE valuations, and secure SAP financial synchronization for all departmental scrap assets.
          </p>

          <div className="grid grid-cols-3 gap-3.5 pt-2">
            <div className={`p-4 rounded-2xl shadow-xl border backdrop-blur-md ${
              isDark ? 'bg-slate-900/70 border-slate-700/80 text-white' : 'bg-white/85 border-slate-300 text-slate-950 shadow-slate-300/60'
            }`}>
              <div className={`font-black text-xs mb-1 flex items-center gap-1.5 ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                <Server size={14} /> 11 Masters
              </div>
              <p className={`text-[10px] font-semibold ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>Reactive data grids & maps.</p>
            </div>
            <div className={`p-4 rounded-2xl shadow-xl border backdrop-blur-md ${
              isDark ? 'bg-slate-900/70 border-slate-700/80 text-white' : 'bg-white/85 border-slate-300 text-slate-950 shadow-slate-300/60'
            }`}>
              <div className={`font-black text-xs mb-1 flex items-center gap-1.5 ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                <ShieldCheck size={14} /> Hub Mandate
              </div>
              <p className={`text-[10px] font-semibold ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>Automatic ≤1MT routing.</p>
            </div>
            <div className={`p-4 rounded-2xl shadow-xl border backdrop-blur-md ${
              isDark ? 'bg-slate-900/70 border-slate-700/80 text-white' : 'bg-white/85 border-slate-300 text-slate-950 shadow-slate-300/60'
            }`}>
              <div className={`font-black text-xs mb-1 flex items-center gap-1.5 ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                <BarChart3 size={14} /> MIS Analytics
              </div>
              <p className={`text-[10px] font-semibold ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>Real-time revenue tracking.</p>
            </div>
          </div>
        </div>

        <div className={`text-xs pt-4 border-t flex items-center justify-between font-bold ${
          isDark ? 'text-slate-300 border-slate-700/60' : 'text-slate-900 border-slate-400/60'
        }`}>
          <span>GCPL Secure Infrastructure • Ticketing Portal 2026</span>
          <span>Confidential System</span>
        </div>
      </div>

      <div className="relative z-10 w-full lg:w-5/12 flex items-center justify-center p-4 lg:p-8">
        <div 
          onClick={() => setIsLoginCardClicked(true)}
          onAnimationEnd={() => setIsLoginCardClicked(false)}
          className={`w-full max-w-md p-8 lg:p-10 rounded-3xl space-y-6 relative border transition-all duration-300 cursor-pointer backdrop-blur-xl ${
            isLoginCardClicked 
              ? isDark
                ? 'bg-slate-950 border-amber-500/80 shadow-[0_30px_70px_-10px_rgba(0,0,0,0.95),0_0_50px_rgba(245,158,11,0.25)] scale-[1.02]'
                : 'bg-white/95 border-amber-600 shadow-[0_30px_70px_-10px_rgba(0,0,0,0.25),0_0_40px_rgba(217,119,6,0.25)] scale-[1.02]'
              : isDark
                ? 'bg-slate-900/95 border-slate-700 text-slate-100 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(245,158,11,0.15)] hover:scale-[1.01]'
                : 'bg-white/90 border-slate-300 text-slate-950 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.2),0_0_30px_rgba(0,0,0,0.06)] hover:scale-[1.01]'
          }`}
          style={{ perspective: '1200px', transformStyle: 'preserve-3d', transform: 'rotateX(1.5deg) rotateY(-2deg)' }}
        >
          <div className="space-y-2 text-center">
            <div className="inline-flex p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl shadow-xl text-slate-950 font-black mb-1">
              <Building2 size={24} />
            </div>
            <h2 className={`text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>Authorized Portal Login</h2>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-900 font-bold'}`}>Enter your enterprise credentials to access GCPL SDM.</p>
          </div>

          <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className="space-y-4 text-xs">
            <div>
              <label className={`block font-black mb-1.5 uppercase tracking-wide text-[10px] ${
                isDark ? 'text-slate-300' : 'text-slate-950'
              }`}>
                Employee ID / Email
              </label>
              <div className="relative">
                <User size={16} className={`absolute left-3.5 top-3.5 ${isDark ? 'text-slate-400' : 'text-slate-800'}`} />
                <input 
                  type="text" 
                  required
                  value={loginUserId}
                  onChange={(e) => setLoginUserId(e.target.value)}
                  placeholder="Enter corporate ID..." 
                  className={`w-full rounded-xl pl-10 pr-4 py-3 text-xs font-bold focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition border ${
                    isDark 
                      ? 'bg-slate-950 border-slate-700 text-white placeholder:text-slate-600' 
                      : 'bg-slate-50 border-slate-300 text-slate-950 placeholder:text-slate-500 shadow-sm'
                  }`}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className={`block font-black uppercase tracking-wide text-[10px] ${
                  isDark ? 'text-slate-300' : 'text-slate-950'
                }`}>
                  Password
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Contact IT Helpdesk to reset password.'); }} className="text-amber-600 dark:text-amber-400 hover:underline font-black text-[11px]">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <Lock size={16} className={`absolute left-3.5 top-3.5 ${isDark ? 'text-slate-400' : 'text-slate-800'}`} />
                <input 
                  type="password" 
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••" 
                  className={`w-full rounded-xl pl-10 pr-4 py-3 text-xs font-bold focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition border ${
                    isDark 
                      ? 'bg-slate-950 border-slate-700 text-white placeholder:text-slate-600' 
                      : 'bg-slate-50 border-slate-300 text-slate-950 placeholder:text-slate-500 shadow-sm'
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-1">
              <input type="checkbox" id="remember" className={`rounded w-4 h-4 text-amber-500 focus:ring-amber-500 ${
                isDark ? 'border-slate-700 bg-slate-950' : 'border-slate-400 bg-slate-50'
              }`} />
              <label htmlFor="remember" className={`select-none font-bold ${isDark ? 'text-slate-400' : 'text-slate-950'}`}>Remember device</label>
            </div>

            <div className="pt-3">
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black py-3.5 px-4 rounded-xl text-xs transition shadow-xl shadow-amber-500/25 flex items-center justify-center space-x-2 cursor-pointer uppercase tracking-wider"
              >
                <span>Authenticate Login</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </form>

          <div className={`border-t pt-4 text-center ${isDark ? 'border-slate-800' : 'border-slate-300'}`}>
            <span className={`text-[11px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-950'}`}>
              Enterprise Support: <span className="font-black text-amber-700 dark:text-amber-400">it.helpdesk@gcpl.internal</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};