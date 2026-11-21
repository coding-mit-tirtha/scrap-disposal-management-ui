import React from 'react';
import { Search, PlusCircle } from 'lucide-react';
import { 
  MASTER_COMPANIES, MASTER_REGIONS, MASTER_BRANCHES, MASTER_DEPARTMENTS, 
  MASTER_EMPLOYEES, MASTER_ROLES, MASTER_USER_ROLES, MASTER_CATEGORIES_DATA, 
  MASTER_MATERIALS, MASTER_UOM, MASTER_DOC_SERIES 
} from '../data/masterData';

interface MasterDataViewProps {
  currentView: string;
  isDark: boolean;
}

export const MasterDataView: React.FC<MasterDataViewProps> = ({ currentView, isDark }) => {
  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-6 max-w-7xl mx-auto w-full">
      <div className={`p-6 rounded-2xl border shadow-sm flex justify-between items-center ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300'
      }`}>
        <div className="space-y-1">
          <span className="bg-amber-500/20 text-amber-800 dark:text-amber-400 border border-amber-500/40 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
            2026 Enterprise Master Console
          </span>
          <h1 className={`text-xl font-black tracking-tight capitalize ${isDark ? 'text-white' : 'text-slate-950'}`}>
            {currentView.replace('master_', '').replace('_', ' ')} Master Management
          </h1>
          <p className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-800'}`}>Real-time data grid with auto-synced enterprise records.</p>
        </div>

        <div className="flex items-center space-x-3">
          <button onClick={() => alert('Opening new record creation modal.')} className="flex items-center space-x-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-black shadow-sm transition cursor-pointer">
            <PlusCircle size={14} />
            <span>Add New Record</span>
          </button>
        </div>
      </div>

      <div className={`rounded-2xl border shadow-sm overflow-hidden text-xs ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300'
      }`}>
        <div className={`p-4 border-b flex justify-between items-center ${
          isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-200 border-slate-300'
        }`}>
          <div className="relative w-72">
            <Search size={14} className="absolute left-3.5 top-3 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search master records..." 
              className={`w-full border rounded-xl pl-10 pr-4 py-2 text-xs font-bold focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 ${
                isDark ? 'bg-slate-900 border-slate-700 text-white placeholder:text-slate-600' : 'bg-white border-slate-400 text-slate-950 placeholder:text-slate-500 shadow-sm'
              }`}
            />
          </div>
          <div className="text-slate-800 dark:text-slate-400 font-bold text-[11px] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Auto-updated live ledger</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          {currentView === 'master_company' && (
            <table className="w-full text-left border-collapse">
              <thead className={`border-b uppercase font-black text-[10px] ${isDark ? 'bg-slate-950/40 text-slate-400 border-slate-800' : 'bg-slate-200 text-slate-900 border-slate-300'}`}>
                <tr><th className="p-4">ID</th><th className="p-4">Company Code</th><th className="p-4">Company Name</th><th className="p-4">Registration No.</th><th className="p-4">Status</th><th className="p-4 text-right">Actions</th></tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-950 font-bold'}`}>
                {MASTER_COMPANIES.map((c, i) => (
                  <tr key={i} className={isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'}>
                    <td className="p-4 font-mono font-black text-slate-600 dark:text-slate-400">{c.id}</td>
                    <td className="p-4 font-mono font-black text-amber-700 dark:text-amber-400">{c.code}</td>
                    <td className={`p-4 font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>{c.name}</td>
                    <td className="p-4 font-mono text-slate-700 dark:text-slate-400 font-semibold">{c.regNum}</td>
                    <td className="p-4"><span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/10 text-emerald-800 dark:text-emerald-400">{c.status}</span></td>
                    <td className="p-4 text-right"><button className="text-amber-700 dark:text-amber-400 hover:underline font-black cursor-pointer">Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {currentView === 'master_region' && (
            <table className="w-full text-left border-collapse">
              <thead className={`border-b uppercase font-black text-[10px] ${isDark ? 'bg-slate-950/40 text-slate-400 border-slate-800' : 'bg-slate-200 text-slate-900 border-slate-300'}`}>
                <tr><th className="p-4">ID</th><th className="p-4">Region Code</th><th className="p-4">Region & Hub Name</th><th className="p-4">Regional Head</th><th className="p-4">Operational Hubs</th><th className="p-4 text-right">Actions</th></tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-950 font-bold'}`}>
                {MASTER_REGIONS.map((r, i) => (
                  <tr key={i} className={isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'}>
                    <td className="p-4 font-mono font-black text-slate-600 dark:text-slate-400">{r.id}</td>
                    <td className="p-4 font-mono font-black text-amber-700 dark:text-amber-400">{r.code}</td>
                    <td className={`p-4 font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>{r.name}</td>
                    <td className="p-4">{r.head}</td>
                    <td className="p-4 font-mono">{r.operationalHubs} Hubs</td>
                    <td className="p-4 text-right"><button className="text-amber-700 dark:text-amber-400 hover:underline font-black cursor-pointer">Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {currentView === 'master_branch' && (
            <table className="w-full text-left border-collapse">
              <thead className={`border-b uppercase font-black text-[10px] ${isDark ? 'bg-slate-950/40 text-slate-400 border-slate-800' : 'bg-slate-200 text-slate-900 border-slate-300'}`}>
                <tr><th className="p-4">ID</th><th className="p-4">Plant Code</th><th className="p-4">Plant / Branch Name</th><th className="p-4">Region</th><th className="p-4">Storage Space</th><th className="p-4">Branch Head</th><th className="p-4 text-right">Actions</th></tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-950 font-bold'}`}>
                {MASTER_BRANCHES.map((b, i) => (
                  <tr key={i} className={isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'}>
                    <td className="p-4 font-mono font-black text-slate-600 dark:text-slate-400">{b.id}</td>
                    <td className="p-4 font-mono font-black text-amber-700 dark:text-amber-400">{b.code}</td>
                    <td className={`p-4 font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>{b.name}</td>
                    <td className="p-4">{b.region}</td>
                    <td className="p-4">
                      {b.holdsSpace ? (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/10 text-blue-800 dark:text-blue-400 font-black">Available</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-red-500/10 text-red-800 dark:text-red-400 font-black">No Space (Hub Flag)</span>
                      )}
                    </td>
                    <td className="p-4 text-blue-700 dark:text-blue-400 font-black">{b.head}</td>
                    <td className="p-4 text-right"><button className="text-amber-700 dark:text-amber-400 hover:underline font-black cursor-pointer">Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {currentView === 'master_department' && (
            <table className="w-full text-left border-collapse">
              <thead className={`border-b uppercase font-black text-[10px] ${isDark ? 'bg-slate-950/40 text-slate-400 border-slate-800' : 'bg-slate-200 text-slate-900 border-slate-300'}`}>
                <tr><th className="p-4">ID</th><th className="p-4">Dept Code</th><th className="p-4">Department Name</th><th className="p-4">Headcount</th><th className="p-4">Budget Code</th><th className="p-4 text-right">Actions</th></tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-950 font-bold'}`}>
                {MASTER_DEPARTMENTS.map((d, i) => (
                  <tr key={i} className={isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'}>
                    <td className="p-4 font-mono font-black text-slate-600 dark:text-slate-400">{d.id}</td>
                    <td className="p-4 font-mono font-black text-amber-700 dark:text-amber-400">{d.code}</td>
                    <td className={`p-4 font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>{d.name}</td>
                    <td className="p-4 font-mono">{d.headCount} Employees</td>
                    <td className="p-4 font-mono text-slate-700 dark:text-slate-400 font-semibold">{d.budgetCode}</td>
                    <td className="p-4 text-right"><button className="text-amber-700 dark:text-amber-400 hover:underline font-black cursor-pointer">Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {currentView === 'master_employee' && (
            <table className="w-full text-left border-collapse">
              <thead className={`border-b uppercase font-black text-[10px] ${isDark ? 'bg-slate-950/40 text-slate-400 border-slate-800' : 'bg-slate-200 text-slate-900 border-slate-300'}`}>
                <tr><th className="p-4">ID</th><th className="p-4">Employee ID</th><th className="p-4">Full Name</th><th className="p-4">Role Designation</th><th className="p-4">Department</th><th className="p-4 text-right">Actions</th></tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-950 font-bold'}`}>
                {MASTER_EMPLOYEES.map((e, i) => (
                  <tr key={i} className={isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'}>
                    <td className="p-4 font-mono font-black text-slate-600 dark:text-slate-400">{e.id}</td>
                    <td className="p-4 font-mono font-black text-amber-700 dark:text-amber-400">{e.empId}</td>
                    <td className={`p-4 font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>{e.name}</td>
                    <td className="p-4 font-black text-blue-700 dark:text-blue-400">{e.role}</td>
                    <td className="p-4">{e.dept}</td>
                    <td className="p-4 text-right"><button className="text-amber-700 dark:text-amber-400 hover:underline font-black cursor-pointer">Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {currentView === 'master_role' && (
            <table className="w-full text-left border-collapse">
              <thead className={`border-b uppercase font-black text-[10px] ${isDark ? 'bg-slate-950/40 text-slate-400 border-slate-800' : 'bg-slate-200 text-slate-900 border-slate-300'}`}>
                <tr><th className="p-4">ID</th><th className="p-4">Role Name</th><th className="p-4">Hierarchy Level</th><th className="p-4">Access Scope & Permissions</th><th className="p-4 text-right">Actions</th></tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-950 font-bold'}`}>
                {MASTER_ROLES.map((l, i) => (
                  <tr key={i} className={isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'}>
                    <td className="p-4 font-mono font-black text-slate-600 dark:text-slate-400">{l.id}</td>
                    <td className={`p-4 font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>{l.role}</td>
                    <td className="p-4"><span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-black">{l.level}</span></td>
                    <td className="p-4 text-slate-700 dark:text-slate-400 font-semibold">{l.accessScope}</td>
                    <td className="p-4 text-right"><button className="text-amber-700 dark:text-amber-400 hover:underline font-black cursor-pointer">Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {currentView === 'master_user_role' && (
            <table className="w-full text-left border-collapse">
              <thead className={`border-b uppercase font-black text-[10px] ${isDark ? 'bg-slate-950/40 text-slate-400 border-slate-800' : 'bg-slate-200 text-slate-900 border-slate-300'}`}>
                <tr><th className="p-4">User Email</th><th className="p-4">Assigned Role</th><th className="p-4">Authorized Plant / Branch</th><th className="p-4">Mapping Status</th><th className="p-4 text-right">Actions</th></tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-950 font-bold'}`}>
                {MASTER_USER_ROLES.map((m, i) => (
                  <tr key={i} className={isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'}>
                    <td className="p-4 font-mono font-black text-amber-700 dark:text-amber-400">{m.user}</td>
                    <td className={`p-4 font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>{m.role}</td>
                    <td className="p-4">{m.branchAssigned}</td>
                    <td className="p-4"><span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/10 text-emerald-800 dark:text-emerald-400">{m.status}</span></td>
                    <td className="p-4 text-right"><button className="text-amber-700 dark:text-amber-400 hover:underline font-black cursor-pointer">Modify Map</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {currentView === 'master_category' && (
            <table className="w-full text-left border-collapse">
              <thead className={`border-b uppercase font-black text-[10px] ${isDark ? 'bg-slate-950/40 text-slate-400 border-slate-800' : 'bg-slate-200 text-slate-900 border-slate-300'}`}>
                <tr><th className="p-4">Scrap Category</th><th className="p-4">Sub-Category Item</th><th className="p-4">HSN Code</th><th className="p-4">Applicable GST</th><th className="p-4 text-right">Actions</th></tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-950 font-bold'}`}>
                {MASTER_CATEGORIES_DATA.map((cat, i) => (
                  <tr key={i} className={isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'}>
                    <td className="p-4 font-black text-amber-700 dark:text-amber-400">{cat.category}</td>
                    <td className={`p-4 font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>{cat.subCategory}</td>
                    <td className="p-4 font-mono text-slate-700 dark:text-slate-400 font-semibold">{cat.hsn}</td>
                    <td className="p-4 font-mono font-black text-emerald-700 dark:text-emerald-400">{cat.gst}</td>
                    <td className="p-4 text-right"><button className="text-amber-700 dark:text-amber-400 hover:underline font-black cursor-pointer">Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {currentView === 'master_material' && (
            <table className="w-full text-left border-collapse">
              <thead className={`border-b uppercase font-black text-[10px] ${isDark ? 'bg-slate-950/40 text-slate-400 border-slate-800' : 'bg-slate-200 text-slate-900 border-slate-300'}`}>
                <tr><th className="p-4">Material Code</th><th className="p-4">Material Description</th><th className="p-4">Category</th><th className="p-4">Standard UoM</th><th className="p-4 text-right">Actions</th></tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-950 font-bold'}`}>
                {MASTER_MATERIALS.map((mat, i) => (
                  <tr key={i} className={isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'}>
                    <td className="p-4 font-mono font-black text-amber-700 dark:text-amber-400">{mat.code}</td>
                    <td className={`p-4 font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>{mat.description}</td>
                    <td className="p-4">{mat.category}</td>
                    <td className="p-4 font-mono">{mat.uom}</td>
                    <td className="p-4 text-right"><button className="text-amber-700 dark:text-amber-400 hover:underline font-black cursor-pointer">Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {currentView === 'master_uom' && (
            <table className="w-full text-left border-collapse">
              <thead className={`border-b uppercase font-black text-[10px] ${isDark ? 'bg-slate-950/40 text-slate-400 border-slate-800' : 'bg-slate-200 text-slate-900 border-slate-300'}`}>
                <tr><th className="p-4">UoM Code</th><th className="p-4">Unit Description</th><th className="p-4">Precision Standard</th><th className="p-4">Measurement System</th><th className="p-4 text-right">Actions</th></tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-950 font-bold'}`}>
                {MASTER_UOM.map((uom, i) => (
                  <tr key={i} className={isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'}>
                    <td className="p-4 font-mono font-black text-amber-700 dark:text-amber-400">{uom.code}</td>
                    <td className={`p-4 font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>{uom.name}</td>
                    <td className="p-4">{uom.precision}</td>
                    <td className="p-4">{uom.standard}</td>
                    <td className="p-4 text-right"><button className="text-amber-700 dark:text-amber-400 hover:underline font-black cursor-pointer">Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {currentView === 'master_doc_series' && (
            <table className="w-full text-left border-collapse">
              <thead className={`border-b uppercase font-black text-[10px] ${isDark ? 'bg-slate-950/40 text-slate-400 border-slate-800' : 'bg-slate-200 text-slate-900 border-slate-300'}`}>
                <tr><th className="p-4">Document Type</th><th className="p-4">Series Prefix Format</th><th className="p-4">Current Sequence</th><th className="p-4">Status</th><th className="p-4 text-right">Actions</th></tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-950 font-bold'}`}>
                {MASTER_DOC_SERIES.map((doc, i) => (
                  <tr key={i} className={isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'}>
                    <td className={`p-4 font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>{doc.docType}</td>
                    <td className="p-4 font-mono text-amber-700 dark:text-amber-400 font-bold">{doc.prefixFormat}</td>
                    <td className="p-4 font-mono font-black">{doc.seq}</td>
                    <td className="p-4"><span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/10 text-emerald-800 dark:text-emerald-400">{doc.status}</span></td>
                    <td className="p-4 text-right"><button className="text-amber-700 dark:text-amber-400 hover:underline font-black cursor-pointer">Configure</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};