import React from 'react';
import { User, LogOut, Sun, Moon } from 'lucide-react';
import type { UserRole } from '../../types';
import { MASTER_ROLES } from '../../data/masterData';

interface HeaderProps {
  appTheme: 'dark' | 'light';
  setAppTheme: (theme: 'dark' | 'light') => void;
  currentUserRole: UserRole;
  setCurrentUserRole: (role: UserRole) => void;
  currentView: string;
  onSignOut: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  appTheme,
  setAppTheme,
  currentUserRole,
  setCurrentUserRole,
  currentView,
  onSignOut
}) => {
  const isDark = appTheme === 'dark';

  return (
    <header className={`h-14 border-b flex items-center justify-between px-6 z-20 shadow-sm ${
      isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
    }`}>
      <div className="flex items-center space-x-2 text-xs text-slate-500 font-bold">
        <span className={`font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>GCPL Enterprise Scrap Management</span>
        <span>/</span>
        <span className="capitalize text-amber-600 dark:text-amber-400 font-black">{currentView.replace('_', ' ')}</span>
      </div>

      <div className="flex items-center space-x-4 text-xs">
        <button
          onClick={() => setAppTheme(isDark ? 'light' : 'dark')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition cursor-pointer ${
            isDark 
              ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700' 
              : 'bg-slate-200 border-slate-400 text-slate-950 hover:bg-slate-300 shadow-sm'
          }`}
        >
          {isDark ? <Sun size={13} className="text-amber-400" /> : <Moon size={13} className="text-slate-950" />}
          <span>{isDark ? 'Light' : 'Dark'}</span>
        </button>

        <div className={`flex items-center space-x-2 border px-3 py-1 rounded-xl ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300 shadow-sm'
        }`}>
          <User size={13} className="text-amber-600 dark:text-amber-500" />
          <span className="text-slate-700 font-bold">Role:</span>
          <select
            value={currentUserRole}
            onChange={(e) => setCurrentUserRole(e.target.value as UserRole)}
            className="bg-transparent font-black text-amber-700 dark:text-amber-400 focus:outline-none cursor-pointer"
          >
            {MASTER_ROLES.map(role => (
              <option key={role.id} value={role.role} className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-950'}>{role.role}</option>
            ))}
          </select>
        </div>

        <button 
          onClick={onSignOut} 
          className="flex items-center space-x-1 bg-red-500/10 hover:bg-red-500/20 text-red-700 dark:text-red-400 border border-red-500/30 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer"
        >
          <LogOut size={13} />
          <span>Sign Out</span>
        </button>
      </div>
    </header>
  );
};