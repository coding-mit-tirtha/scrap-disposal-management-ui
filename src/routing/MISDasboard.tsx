import React from 'react';
import { PieChart, Activity, AlertTriangle, ClipboardList } from 'lucide-react';
import type { ScrapTicket, UserRole } from '../types';

interface MISDashboardProps {
  tickets: ScrapTicket[];
  currentUserRole: UserRole;
  isDark: boolean;
  onNavigateQueue: () => void;
  onExceptionDecision: (ticketId: string, decision: 'APPROVE_EXCEPTION' | 'REJECT_EXCEPTION') => void;
}

export const MISDashboard: React.FC<MISDashboardProps> = ({
  tickets, currentUserRole, isDark, onNavigateQueue, onExceptionDecision
}) => {
  const totalRevenue = tickets.reduce((acc, t) => acc + (t.biddingDetails?.h1Amount || 0), 0);
  const pendingApprovalsCount = tickets.filter(t => t.status === 'Submitted' || t.status === 'Exception_Pending').length;
  const closedTicketsCount = tickets.filter(t => t.status === 'Closed').length;

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-6 max-w-7xl mx-auto w-full">
      <div className={`flex justify-between items-center p-6 rounded-2xl border shadow-sm ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300'
      }`}>
        <div>
          <span className="bg-amber-500/20 text-amber-800 dark:text-amber-400 border border-amber-500/40 text-[10px] font-black px-2.5 py-1 rounded-full uppercase inline-block mb-1">
            Phase 4 Governance & Analytics
          </span>
          <h1 className={`text-xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>Executive MIS & Revenue Analytics Dashboard</h1>
          <p className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-800'}`}>Real-time financial monitoring, visual lifecycle tracking, and maker-checker exception governance.</p>
        </div>

        <button onClick={onNavigateQueue} className={`px-4 py-2 rounded-xl text-xs font-bold transition shadow-md cursor-pointer ${
          isDark ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-black' : 'bg-slate-900 text-white hover:bg-slate-800'
        }`}>
          View Active Tickets Queue →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className={`p-5 rounded-2xl border shadow-sm space-y-2 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300'}`}>
          <span className={`text-xs font-black uppercase tracking-wider block ${isDark ? 'text-slate-400' : 'text-slate-900'}`}>Total Realized Revenue</span>
          <div className="text-2xl font-black font-mono text-emerald-700 dark:text-emerald-400">₹{totalRevenue.toLocaleString()}</div>
          <span className="text-[11px] text-emerald-800 dark:text-emerald-400 font-bold">Aggregated across finalized H1 bids</span>
        </div>

        <div className={`p-5 rounded-2xl border shadow-sm space-y-2 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300'}`}>
          <span className={`text-xs font-black uppercase tracking-wider block ${isDark ? 'text-slate-400' : 'text-slate-900'}`}>Pending Governance</span>
          <div className="text-2xl font-black font-mono text-amber-700 dark:text-amber-400">{pendingApprovalsCount}</div>
          <span className="text-[11px] text-amber-800 dark:text-amber-400 font-bold">Tickets requiring approval sign-off</span>
        </div>

        <div className={`p-5 rounded-2xl border shadow-sm space-y-2 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300'}`}>
          <span className={`text-xs font-black uppercase tracking-wider block ${isDark ? 'text-slate-400' : 'text-slate-900'}`}>Completed Closures</span>
          <div className="text-2xl font-black font-mono text-blue-700 dark:text-blue-400">{closedTicketsCount}</div>
          <span className="text-[11px] text-blue-800 dark:text-blue-400 font-bold">Fully synced to ERP / SAP ledger</span>
        </div>

        <div className={`p-5 rounded-2xl border shadow-sm space-y-2 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300'}`}>
          <span className={`text-xs font-black uppercase tracking-wider block ${isDark ? 'text-slate-400' : 'text-slate-900'}`}>Fleet & Car Scrapping</span>
          <div className="text-2xl font-black font-mono text-indigo-700 dark:text-indigo-400">
            {tickets.filter(t => t.biddingDetails?.isCarScrap).length} Vehicles
          </div>
          <span className="text-[11px] text-indigo-800 dark:text-indigo-400 font-bold">RTO ELV Dismantling tracked</span>
        </div>
      </div>

      <div className={`p-6 rounded-2xl border shadow-sm space-y-4 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300'}`}>
        <h2 className={`text-sm font-black uppercase tracking-wider flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-950'}`}>
          <PieChart size={16} className="text-amber-600 dark:text-amber-500" /> Visual Lifecycle Tracking Tool (Pipeline Distribution)
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className={`p-3 border rounded-xl text-center ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'}`}>
            <span className={`text-[10px] uppercase font-black block ${isDark ? 'text-slate-400' : 'text-slate-900'}`}>Draft / Submitted</span>
            <span className={`text-lg font-black font-mono ${isDark ? 'text-white' : 'text-slate-950'}`}>{tickets.filter(t => t.status === 'Draft' || t.status === 'Submitted').length}</span>
          </div>
          <div className="p-3 bg-blue-500/10 border border-blue-500/40 rounded-xl text-center">
            <span className="text-[10px] text-blue-800 dark:text-blue-400 uppercase font-black block">Approvals & Bidding</span>
            <span className="text-lg font-black font-mono text-blue-800 dark:text-blue-400">{tickets.filter(t => t.status === 'Branch_Head_Approved' || t.status === 'Proforma_Generated').length}</span>
          </div>
          <div className="p-3 bg-amber-500/10 border border-amber-500/40 rounded-xl text-center">
            <span className="text-[10px] text-amber-800 dark:text-amber-400 uppercase font-black block">Execution & GatePass</span>
            <span className="text-lg font-black font-mono text-amber-800 dark:text-amber-400">{tickets.filter(t => t.status === 'Payment_Verified' || t.status === 'Gate_Pass_Issued').length}</span>
          </div>
          <div className="p-3 bg-purple-500/10 border border-purple-500/40 rounded-xl text-center">
            <span className="text-[10px] text-purple-800 dark:text-purple-400 uppercase font-black block">Exceptions</span>
            <span className="text-lg font-black font-mono text-purple-800 dark:text-purple-400">{tickets.filter(t => t.status === 'Exception_Pending').length}</span>
          </div>
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/40 rounded-xl text-center">
            <span className="text-[10px] text-emerald-800 dark:text-emerald-400 uppercase font-black block">Closed & Synced</span>
            <span className="text-lg font-black font-mono text-emerald-800 dark:text-emerald-400">{tickets.filter(t => t.status === 'Closed').length}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-6 rounded-2xl border shadow-sm space-y-4 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300'}`}>
          <h2 className={`text-sm font-black uppercase tracking-wider flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-950'}`}>
            <Activity size={16} className="text-emerald-600 dark:text-emerald-500" /> Real-Time Activity Monitor (Audit Stream)
          </h2>
          <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {tickets.flatMap(t => t.auditLogs.map(log => ({ ...log, ticketNumber: t.ticketNumber }))).slice(0, 6).map((activity, idx) => (
              <div key={idx} className={`flex items-start space-x-3 p-3 rounded-xl border text-xs ${
                isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'
              }`}>
                <div className="p-1.5 bg-amber-500/20 text-amber-800 dark:text-amber-400 rounded-lg"><ClipboardList size={12} /></div>
                <div className="flex-1">
                  <div className={`font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>{activity.action} ({activity.ticketNumber})</div>
                  <div className="text-[10px] text-slate-700 dark:text-slate-400 font-semibold">{activity.timestamp} • By {activity.user} ({activity.role})</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-6 rounded-2xl border shadow-sm space-y-4 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300'}`}>
          <h2 className={`text-sm font-black uppercase tracking-wider flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-950'}`}>
            <AlertTriangle size={16} className="text-amber-600 dark:text-amber-500" /> Maker-Checker Exception Approvals
          </h2>

          {tickets.filter(t => t.status === 'Exception_Pending').length === 0 ? (
            <div className={`text-xs text-slate-700 dark:text-slate-400 font-bold italic p-6 rounded-xl text-center ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>No pricing exceptions currently require executive sign-off.</div>
          ) : (
            tickets.filter(t => t.status === 'Exception_Pending').map(ticket => (
              <div key={ticket.id} className="p-4 bg-amber-500/10 border border-amber-500/40 rounded-xl space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-blue-700 dark:text-blue-400 text-xs">{ticket.ticketNumber}</span>
                  <span className="bg-amber-500/20 text-amber-900 dark:text-amber-300 text-[10px] font-black px-2 py-0.5 rounded uppercase">Exception Triggered</span>
                </div>
                <div className={`text-xs font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>{ticket.material}</div>
                <div className="text-[11px] text-amber-800 dark:text-amber-400 font-bold">
                  <strong>Reason:</strong> {ticket.biddingDetails?.exceptionReason}
                </div>

                {currentUserRole === 'Executive Director' ? (
                  <div className="flex space-x-2 pt-2">
                    <button onClick={() => onExceptionDecision(ticket.id, 'APPROVE_EXCEPTION')} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-sm cursor-pointer">
                      Approve Exception Override
                    </button>
                    <button onClick={() => onExceptionDecision(ticket.id, 'REJECT_EXCEPTION')} className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-bold cursor-pointer">
                      Reject
                    </button>
                  </div>
                ) : (
                  <span className="text-[11px] text-slate-700 dark:text-slate-400 font-bold italic block pt-1">Requires Executive Director Role</span>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};