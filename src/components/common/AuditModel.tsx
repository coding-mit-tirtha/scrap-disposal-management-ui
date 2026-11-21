import React from 'react';
import { ShieldCheck } from 'lucide-react';
import type { ScrapTicket } from '../../types';

interface AuditModalProps {
  ticket: ScrapTicket;
  onClose: () => void;
  isDark: boolean;
}

export const AuditModal: React.FC<AuditModalProps> = ({ ticket, onClose, isDark }) => {
  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border ${
        isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-950'
      }`}>
        <div className={`flex justify-between items-center px-6 py-4 border-b ${
          isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-200 border-slate-300'
        }`}>
          <h2 className="text-sm font-black flex items-center gap-2">
            <ShieldCheck size={16} className="text-amber-500" /> Audit Trail — {ticket.ticketNumber}
          </h2>
          <button onClick={onClose} className="text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-200 p-1 cursor-pointer font-black">✕</button>
        </div>
        <div className="p-6 space-y-3 text-xs">
          {ticket.auditLogs.map((log, idx) => (
            <div key={idx} className="flex items-start space-x-3 border-l-2 border-amber-500 pl-3 py-1">
              <div>
                <div className={`font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>{log.action}</div>
                <div className="text-[10px] text-slate-700 dark:text-slate-400 font-semibold">{log.timestamp} • {log.user} ({log.role})</div>
              </div>
            </div>
          ))}
        </div>
        <div className={`px-6 py-3 border-t text-right ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-200 border-slate-300'}`}>
          <button onClick={onClose} className="px-4 py-2 bg-slate-900 text-white font-black rounded-xl text-xs cursor-pointer">Close Logs</button>
        </div>
      </div>
    </div>
  );
};