import React, { useState } from 'react';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import type { ScrapTicket } from '../types';
import { MASTER_COMPANIES, MASTER_REGIONS, MASTER_BRANCHES } from '../data/masterData';

interface TicketCreationProps {
  isDark: boolean;
  activeUsername: string;
  ticketCount: number;
  onSaveTicket: (newTicket: ScrapTicket) => void;
  onCancel: () => void;
}

export const TicketCreation: React.FC<TicketCreationProps> = ({
  isDark, activeUsername, ticketCount, onSaveTicket, onCancel
}) => {
  const [company, setCompany] = useState(MASTER_COMPANIES[0].name);
  const [region, setRegion] = useState(MASTER_REGIONS[0].name);
  const [branch, setBranch] = useState(MASTER_BRANCHES[1].name);
  const [material, setMaterial] = useState('');
  const [unit, setUnit] = useState<'MT' | 'Kgs' | 'Pieces' | 'Vehicles'>('MT');
  const [quantity, setQuantity] = useState<number>(0.5);

  const selectedBranchObj = MASTER_BRANCHES.find(b => b.name === branch);
  const isHubNeed = quantity <= 1.0 && unit === 'MT' && (selectedBranchObj ? !selectedBranchObj.holdsSpace : false);

  const handleSave = (targetStatus: 'Draft' | 'Submitted') => {
    if (!material.trim()) {
      alert('Material description is required.');
      return;
    }

    const newTicketNum = `SCRP/KOL/2026/00${ticketCount + 1}`;
    const timestampStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const newTicket: ScrapTicket = {
      id: String(Date.now()),
      ticketNumber: newTicketNum,
      company,
      region,
      branch,
      department: 'Manufacturing Operations',
      category: 'Ferrous Scrap',
      subCategory: 'Heavy Melting Steel (HMS 1)',
      material,
      unit,
      quantity,
      isHubFlag: isHubNeed,
      status: targetStatus,
      remarks: 'Raised via portal.',
      createdDate: timestampStr,
      createdBy: `${activeUsername.split('@')[0]} (Branch Incharge)`,
      checklistUploaded: true,
      auditLogs: [{ timestamp: timestampStr, user: activeUsername, role: 'Branch Incharge', action: targetStatus === 'Draft' ? 'Created Draft Ticket' : 'Submitted Ticket' }]
    };

    onSaveTicket(newTicket);
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 max-w-4xl mx-auto w-full space-y-6">
      <div className={`flex items-center justify-between p-4 rounded-2xl border shadow-sm ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300'
      }`}>
        <button onClick={onCancel} className="flex items-center space-x-2 text-slate-700 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 text-xs font-black cursor-pointer">
          <ArrowLeft size={16} /> <span>Back to Queue</span>
        </button>
        <span className="text-xs text-slate-700 dark:text-slate-400 font-bold">Phase 1 Creation Screen</span>
      </div>

      <div className={`p-8 rounded-2xl border shadow-sm space-y-6 text-xs ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300'
      }`}>
        <h2 className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>Raise New Scrap Ticket</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-black mb-1 text-slate-900 dark:text-slate-300">Company Master *</label>
            <select value={company} onChange={(e) => setCompany(e.target.value)} className={`w-full px-3.5 py-2.5 border rounded-xl font-bold ${
              isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-400 text-slate-950 shadow-sm'
            }`}>
              {MASTER_COMPANIES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block font-black mb-1 text-slate-900 dark:text-slate-300">Region / Zone *</label>
            <select value={region} onChange={(e) => setRegion(e.target.value)} className={`w-full px-3.5 py-2.5 border rounded-xl font-bold ${
              isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-400 text-slate-950 shadow-sm'
            }`}>
              {MASTER_REGIONS.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block font-black mb-1 text-slate-900 dark:text-slate-300">Branch / Plant *</label>
            <select value={branch} onChange={(e) => setBranch(e.target.value)} className={`w-full px-3.5 py-2.5 border rounded-xl font-bold ${
              isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-400 text-slate-950 shadow-sm'
            }`}>
              {MASTER_BRANCHES.map(b => (
                <option key={b.id} value={b.name}>{b.name} {!b.holdsSpace ? '(No Storage)' : ''}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block font-black mb-1 text-slate-900 dark:text-slate-300">Material Description *</label>
          <input 
            type="text" 
            value={material} 
            onChange={(e) => setMaterial(e.target.value)}
            placeholder="Enter detailed scrap description..."
            className={`w-full px-3.5 py-2.5 border rounded-xl font-bold ${
              isDark ? 'bg-slate-950 border-slate-800 text-white placeholder:text-slate-600' : 'bg-slate-50 border-slate-400 text-slate-950 placeholder:text-slate-500 shadow-sm'
            }`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-black mb-1 text-slate-900 dark:text-slate-300">Estimated Quantity *</label>
            <input 
              type="number" 
              step="0.1" 
              value={quantity} 
              onChange={(e) => setQuantity(parseFloat(e.target.value) || 0)} 
              className={`w-full px-3.5 py-2.5 border rounded-xl font-mono font-black ${
                isHubNeed ? 'border-red-600 bg-red-500/10 text-red-700 dark:text-red-400' : isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-400 text-slate-950 shadow-sm'
              }`}
            />
          </div>
          <div>
            <label className="block font-black mb-1 text-slate-900 dark:text-slate-300">Unit of Measure (UoM) *</label>
            <select value={unit} onChange={(e) => setUnit(e.target.value as any)} className={`w-full px-3.5 py-2.5 border rounded-xl font-bold ${
              isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-400 text-slate-950 shadow-sm'
            }`}>
              <option value="MT">MT (Metric Tons)</option>
              <option value="Kgs">Kgs</option>
              <option value="Pieces">Pieces</option>
              <option value="Vehicles">Vehicles</option>
            </select>
          </div>
        </div>

        {isHubNeed && (
          <div className="p-4 bg-red-500/10 border border-red-500/40 rounded-xl text-red-800 dark:text-red-400 space-y-1">
            <div className="flex items-center space-x-2 font-black text-xs uppercase">
              <AlertTriangle size={15} />
              <span>Hub Routing Mandate (Quantity ≤ 1.0 MT & No Storage Space)</span>
            </div>
            <p className="text-xs font-bold">This ticket will automatically route to Central Hub for consolidation.</p>
          </div>
        )}

        <div className={`flex justify-between items-center pt-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-300'}`}>
          <button type="button" onClick={onCancel} className={`px-5 py-2 rounded-xl font-black cursor-pointer ${
            isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-900'
          }`}>Cancel</button>
          <div className="flex space-x-2">
            <button type="button" onClick={() => handleSave('Draft')} className={`px-5 py-2 border rounded-xl font-black cursor-pointer ${
              isDark ? 'border-slate-700 text-slate-300' : 'border-slate-400 text-slate-950 bg-white shadow-sm'
            }`}>Save Draft</button>
            <button type="button" onClick={() => handleSave('Submitted')} className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-black cursor-pointer shadow-md">Submit Ticket</button>
          </div>
        </div>
      </div>
    </div>
  );
};