import React, { useState } from 'react';
import { Search, Plus, Check, X } from 'lucide-react';
import type { ScrapTicket, UserRole } from '../types';

interface TicketsQueueProps {
  tickets: ScrapTicket[];
  currentUserRole: UserRole;
  isDark: boolean;
  onCreateClick: () => void;
  onApproveAction: (ticketId: string, action: 'APPROVE' | 'SEND_BACK') => void;
  onViewAudit: (ticket: ScrapTicket) => void;
}

export const TicketsQueue: React.FC<TicketsQueueProps> = ({
  tickets, currentUserRole, isDark, onCreateClick, onApproveAction, onViewAudit
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredTickets = tickets.filter(t => 
    t.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.material.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-6 max-w-7xl mx-auto w-full">
      <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6 rounded-2xl border shadow-sm ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300'
      }`}>
        <div>
          <h1 className={`text-xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>Active Scrap Disposal Queue</h1>
          <p className={`text-xs mt-0.5 font-bold ${isDark ? 'text-slate-400' : 'text-slate-800'}`}>Role View: <strong className={isDark ? 'text-amber-400' : 'text-slate-950'}>{currentUserRole}</strong></p>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search size={14} className="absolute left-3.5 top-3 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search ticket #, material..."
              className={`w-full text-xs rounded-xl pl-10 pr-4 py-2.5 border font-bold ${
                isDark ? 'bg-slate-950 border-slate-800 text-white placeholder:text-slate-600' : 'bg-slate-50 border-slate-300 text-slate-950 placeholder:text-slate-500 shadow-sm'
              }`}
            />
          </div>

          {currentUserRole === 'Branch Incharge' && (
            <button
              onClick={onCreateClick}
              className="flex items-center space-x-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-black shadow-md transition whitespace-nowrap cursor-pointer"
            >
              <Plus size={15} />
              <span>Create Scrap Ticket</span>
            </button>
          )}
        </div>
      </div>

      <div className={`rounded-2xl border shadow-sm overflow-hidden ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300'}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className={`border-b uppercase font-black text-[10px] tracking-wider whitespace-nowrap ${
                isDark ? 'bg-slate-950/60 border-slate-800 text-slate-400' : 'bg-slate-200 border-slate-300 text-slate-900'
              }`}>
                <th className="p-4">Ticket Number</th>
                <th className="p-4">Category & Material</th>
                <th className="p-4">Quantity & Hub Routing</th>
                <th className="p-4">Status</th>
                <th className="p-4">Branch Head Actions</th>
                <th className="p-4 text-right">Audit Logs</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-950 font-bold'}`}>
              {filteredTickets.map(ticket => (
                <tr 
                  key={ticket.id} 
                  className={`transition-colors ${
                    ticket.isHubFlag 
                      ? isDark ? 'bg-red-950/20 border-l-4 border-l-red-500' : 'bg-red-100/60 border-l-4 border-l-red-600'
                      : isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="p-4 font-mono font-black text-blue-700 dark:text-blue-400 whitespace-nowrap">{ticket.ticketNumber}</td>
                  <td className="p-4">
                    <div className={`font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>{ticket.category}</div>
                    <div className={`text-[11px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-800'}`}>{ticket.material}</div>
                  </td>

                  <td className="p-4 whitespace-nowrap">
                    <div className={`font-mono font-black ${ticket.isHubFlag ? 'text-red-600' : isDark ? 'text-white' : 'text-slate-950'}`}>
                      {ticket.quantity} {ticket.unit}
                    </div>
                    {ticket.isHubFlag ? (
                      <div className="mt-1 inline-flex items-center space-x-1 bg-red-500/20 text-red-700 dark:text-red-400 font-black text-[9px] px-2 py-0.5 rounded border border-red-500/40">
                        <span>HUB ROUTED (≤ 1 MT)</span>
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-700 dark:text-slate-400 font-semibold">Direct Plant Route</span>
                    )}
                  </td>

                  <td className="p-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border uppercase tracking-wider font-mono ${
                      isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-200 text-slate-950 border-slate-400 shadow-sm'
                    }`}>
                      {ticket.status.replace(/_/g, ' ')}
                    </span>
                  </td>

                  <td className="p-4 whitespace-nowrap">
                    {ticket.status === 'Submitted' ? (
                      currentUserRole === 'Branch Head' ? (
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => onApproveAction(ticket.id, 'APPROVE')} 
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-black flex items-center gap-1 shadow-sm cursor-pointer"
                          >
                            <Check size={13} /> Approve
                          </button>
                          <button 
                            onClick={() => onApproveAction(ticket.id, 'SEND_BACK')} 
                            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-black flex items-center gap-1 cursor-pointer"
                          >
                            <X size={13} /> Send Back
                          </button>
                        </div>
                      ) : (
                        <span className="text-amber-700 dark:text-amber-400 font-black italic text-[11px]">Pending Branch Head Review</span>
                      )
                    ) : (
                      <span className="text-emerald-700 dark:text-emerald-400 font-black text-[11px]">Approved / Progressing</span>
                    )}
                  </td>

                  <td className="p-4 text-right whitespace-nowrap">
                    <button onClick={() => onViewAudit(ticket)} className="text-amber-700 dark:text-amber-400 hover:underline font-black text-xs cursor-pointer">
                      View Logs ({ticket.auditLogs.length})
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};