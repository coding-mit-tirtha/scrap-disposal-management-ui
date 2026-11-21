import React from 'react';
import { Building2, ClipboardList, BarChart3, Database, LogOut, ChevronDown, ChevronRight } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  isSidebarHovered: boolean;
  setIsSidebarHovered: (hovered: boolean) => void;
  isMasterDropdownOpen: boolean;
  setIsMasterDropdownOpen: (open: boolean) => void;
  isDark: boolean;
  activeUsername: string;
  currentUserRole: string;
  onSignOut: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  setCurrentView,
  isSidebarHovered,
  setIsSidebarHovered,
  isMasterDropdownOpen,
  setIsMasterDropdownOpen,
  isDark,
  activeUsername,
  currentUserRole,
  onSignOut
}) => {
  return (
    <aside 
      onMouseEnter={() => setIsSidebarHovered(true)}
      onMouseLeave={() => setIsSidebarHovered(false)}
      className={`border-r flex flex-col justify-between transition-all duration-300 z-30 shadow-sm ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      } ${isSidebarHovered ? 'w-64' : 'w-16'}`}
    >
      <div>
        <div className={`h-14 border-b flex items-center px-4 overflow-hidden ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div onClick={() => setCurrentView('home')} className="flex items-center space-x-3 cursor-pointer">
            <div className="p-2 bg-amber-500 text-slate-950 rounded-lg font-black flex-shrink-0 shadow-md">
              <Building2 size={16} />
            </div>
            {isSidebarHovered && (
              <span className={`font-black text-xs tracking-wider whitespace-nowrap ${isDark ? 'text-white' : 'text-slate-950'}`}>
                GCPL SDM PORTAL
              </span>
            )}
          </div>
        </div>

        <nav className="p-2 space-y-1 text-xs">
          <button
            onClick={() => setCurrentView('home')}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-colors whitespace-nowrap ${
              currentView === 'home' 
                ? 'bg-amber-500/20 text-amber-700 dark:text-amber-400 font-black border border-amber-500/30' 
                : isDark ? 'text-slate-400 hover:bg-slate-800 font-semibold' : 'text-slate-900 hover:bg-slate-100 font-bold'
            }`}
          >
            <ClipboardList size={18} className="flex-shrink-0" />
            {isSidebarHovered && <span>Active Scrap Queue</span>}
          </button>

          <button
            onClick={() => setCurrentView('mis_dashboard')}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-colors whitespace-nowrap ${
              currentView === 'mis_dashboard' 
                ? 'bg-amber-500/20 text-amber-700 dark:text-amber-400 font-black border border-amber-500/30' 
                : isDark ? 'text-slate-400 hover:bg-slate-800 font-semibold' : 'text-slate-900 hover:bg-slate-100 font-bold'
            }`}
          >
            <BarChart3 size={18} className="flex-shrink-0" />
            {isSidebarHovered && <span>Executive MIS & Dashboard</span>}
          </button>

          <div>
            <button
              onClick={() => setIsMasterDropdownOpen(!isMasterDropdownOpen)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors whitespace-nowrap ${
                isDark ? 'text-slate-400 hover:bg-slate-800 font-semibold' : 'text-slate-900 hover:bg-slate-100 font-bold'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Database size={18} className="flex-shrink-0" />
                {isSidebarHovered && <span>Master Data (11 Screens)</span>}
              </div>
              {isSidebarHovered && (isMasterDropdownOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />)}
            </button>

            {isSidebarHovered && isMasterDropdownOpen && (
              <div className={`pl-6 pr-2 py-1 space-y-1 text-[11px] border-l-2 border-amber-500 ml-4 my-1 ${
                isDark ? 'text-slate-400 font-semibold' : 'text-slate-900 font-bold'
              }`}>
                <div onClick={() => setCurrentView('master_company')} className={`cursor-pointer py-1 px-2 rounded ${currentView === 'master_company' ? 'font-black text-amber-700 dark:text-amber-400 bg-amber-500/10' : isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-200'}`}>1. Company Master</div>
                <div onClick={() => setCurrentView('master_region')} className={`cursor-pointer py-1 px-2 rounded ${currentView === 'master_region' ? 'font-black text-amber-700 dark:text-amber-400 bg-amber-500/10' : isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-200'}`}>2. Region / Zone</div>
                <div onClick={() => setCurrentView('master_branch')} className={`cursor-pointer py-1 px-2 rounded ${currentView === 'master_branch' ? 'font-black text-amber-700 dark:text-amber-400 bg-amber-500/10' : isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-200'}`}>3. Branch / Plant</div>
                <div onClick={() => setCurrentView('master_department')} className={`cursor-pointer py-1 px-2 rounded ${currentView === 'master_department' ? 'font-black text-amber-700 dark:text-amber-400 bg-amber-500/10' : isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-200'}`}>4. Department Master</div>
                <div onClick={() => setCurrentView('master_employee')} className={`cursor-pointer py-1 px-2 rounded ${currentView === 'master_employee' ? 'font-black text-amber-700 dark:text-amber-400 bg-amber-500/10' : isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-200'}`}>5. Employee Directory</div>
                <div onClick={() => setCurrentView('master_role')} className={`cursor-pointer py-1 px-2 rounded ${currentView === 'master_role' ? 'font-black text-amber-700 dark:text-amber-400 bg-amber-500/10' : isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-200'}`}>6. Role Master</div>
                <div onClick={() => setCurrentView('master_user_role')} className={`cursor-pointer py-1 px-2 rounded ${currentView === 'master_user_role' ? 'font-black text-amber-700 dark:text-amber-400 bg-amber-500/10' : isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-200'}`}>7. User-Role-Branch Map</div>
                <div onClick={() => setCurrentView('master_category')} className={`cursor-pointer py-1 px-2 rounded ${currentView === 'master_category' ? 'font-black text-amber-700 dark:text-amber-400 bg-amber-500/10' : isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-200'}`}>8. Scrap Category & Sub</div>
                <div onClick={() => setCurrentView('master_material')} className={`cursor-pointer py-1 px-2 rounded ${currentView === 'master_material' ? 'font-black text-amber-700 dark:text-amber-400 bg-amber-500/10' : isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-200'}`}>9. Material Master</div>
                <div onClick={() => setCurrentView('master_uom')} className={`cursor-pointer py-1 px-2 rounded ${currentView === 'master_uom' ? 'font-black text-amber-700 dark:text-amber-400 bg-amber-500/10' : isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-200'}`}>10. Unit of Measure</div>
                <div onClick={() => setCurrentView('master_doc_series')} className={`cursor-pointer py-1 px-2 rounded ${currentView === 'master_doc_series' ? 'font-black text-amber-700 dark:text-amber-400 bg-amber-500/10' : isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-200'}`}>11. Doc & Ticket Series</div>
              </div>
            )}
          </div>
        </nav>
      </div>

      <div className={`p-3 border-t ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        {isSidebarHovered ? (
          <div className="flex items-center justify-between text-xs">
            <div className="truncate">
              <div className={`font-black truncate ${isDark ? 'text-white' : 'text-slate-950'}`}>{activeUsername.split('@')[0]}</div>
              <div className="text-[10px] text-slate-500 font-bold">{currentUserRole}</div>
            </div>
            <button onClick={onSignOut} className="p-1.5 text-slate-400 hover:text-red-500 cursor-pointer" title="Sign Out">
              <LogOut size={14} />
            </button>
          </div>
        ) : (
          <button onClick={onSignOut} className="w-full flex justify-center text-slate-400 hover:text-red-500 cursor-pointer" title="Sign Out">
            <LogOut size={16} />
          </button>
        )}
      </div>
    </aside>
  );
};