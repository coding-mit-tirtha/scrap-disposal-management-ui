import React, { useState } from 'react';
import { 
  Building2, 
  Layers, 
  FileText, 
  Plus, 
  ArrowLeft, 
  Search, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Trash2,
  ShieldCheck,
  User,
  LogOut,
  BarChart3,
  Car,
  AlertTriangle,
  PieChart,
  LayoutDashboard,
  ClipboardList,
  Activity,
  Database,
  Users,
  MapPin,
  Briefcase,
  Sliders,
  Settings,
  ChevronRight,
  ChevronDown,
  FileCheck,
  Check,
  X,
  ArrowRight,
  Lock,
  PlusCircle,
  Globe,
  Server,
  Key,
  Sun,
  Moon
} from 'lucide-react';

// --- Type Definitions ---
export type TicketStatus = 
  | 'Draft' 
  | 'Submitted' 
  | 'Branch_Head_Approved' 
  | 'Send_Back' 
  | 'Valuation_Complete' 
  | 'Bidding_In_Progress' 
  | 'H1_Selected' 
  | 'LOA_Issued' 
  | 'Proforma_Generated'
  | 'Payment_Verified'
  | 'Gate_Pass_Issued'
  | 'Weighment_Completed'
  | 'SAP_Synced'
  | 'Exception_Pending'
  | 'Closed';

export type UserRole = 
  | 'Branch Incharge' 
  | 'Branch Head' 
  | 'Scrap Committee Member' 
  | 'Finance Officer' 
  | 'Logistics Admin' 
  | 'Procurement Admin'
  | 'Executive Director';

interface BiddingDetails {
  disposalMode: 'Forward Auction' | 'Spot Sale' | 'Rate Contract' | 'RTO Vehicle Dismantling';
  h1BidderName: string;
  h1BidderGST: string;
  h1Amount: number;
  reservePriceCE: number;
  loaNumber?: string;
  proformaNumber?: string;
  emdVerified?: boolean;
  paymentReference?: string;
  grossWeight?: number;
  tareWeight?: number;
  netWeight?: number;
  gatePassNumber?: string;
  sapSyncStatus?: boolean;
  isCarScrap?: boolean;
  chassisNumber?: string;
  isExceptionTriggered?: boolean;
  exceptionReason?: string;
}

interface ScrapTicket {
  id: string;
  ticketNumber: string;
  company: string;
  region: string;
  branch: string;
  department: string;
  category: string;
  subCategory: string;
  material: string;
  unit: 'MT' | 'Kgs' | 'Pieces' | 'Litres' | 'Vehicles';
  quantity: number;
  isHubFlag: boolean;
  status: TicketStatus;
  remarks: string;
  createdDate: string;
  createdBy: string;
  checklistUploaded: boolean;
  biddingDetails?: BiddingDetails;
  auditLogs: { timestamp: string; user: string; role: string; action: string }[];
}

// --- Master Data Definitions ---
const MASTER_COMPANIES = [
  { id: 'C01', code: 'ACC-SOL', name: 'Acceleron Solutions Ltd', status: 'Active', country: 'India', regNum: 'U72200WB2019PLC23112' },
  { id: 'C02', code: 'ACC-STL', name: 'Acceleron Steel Corp', status: 'Active', country: 'India', regNum: 'U27100WB2018PLC22981' }
];

const MASTER_REGIONS = [
  { id: 'R01', code: 'EZ-KOL', name: 'Eastern Region (Kolkata Hub)', head: 'Subrata Banerjee', operationalHubs: 3 },
  { id: 'R02', code: 'NZ-DEL', name: 'Northern Region (Delhi Hub)', head: 'Rajesh Malhotra', operationalHubs: 4 },
  { id: 'R03', code: 'WZ-MUM', name: 'Western Region (Mumbai Hub)', head: 'Amit Desai', operationalHubs: 5 }
];

const MASTER_BRANCHES = [
  { id: 'B01', code: 'SL-05', name: 'Salt Lake Sector V Plant', region: 'Eastern Region', holdsSpace: true, head: 'Anik Mukhopadhyay' },
  { id: 'B02', code: 'PS-01', name: 'Park Street Hub Office', region: 'Eastern Region', holdsSpace: false, head: 'Subrata Sen' },
  { id: 'B03', code: 'HW-02', name: 'Howrah Scrap Yard', region: 'Eastern Region', holdsSpace: true, head: 'Rajarshi Das' },
  { id: 'B04', code: 'DP-09', name: 'Durgapur Processing Plant', region: 'Eastern Region', holdsSpace: true, head: 'Kunal Chatterjee' }
];

const MASTER_DEPARTMENTS = [
  { id: 'D01', code: 'MO-01', name: 'Manufacturing Operations', headCount: 140, budgetCode: 'BUD-2026-01' },
  { id: 'D02', code: 'IT-02', name: 'IT Infrastructure', headCount: 45, budgetCode: 'BUD-2026-02' },
  { id: 'D03', code: 'ME-03', name: 'Maintenance & Engineering', headCount: 80, budgetCode: 'BUD-2026-03' },
  { id: 'D04', code: 'FL-04', name: 'Fleet & Logistics', headCount: 30, budgetCode: 'BUD-2026-04' }
];

const MASTER_EMPLOYEES = [
  { id: 'E01', empId: 'EMP10024', name: 'Tirthankar Biswas', role: 'Branch Incharge', dept: 'Manufacturing Operations', email: 'tirthankar.biswas@company.com' },
  { id: 'E02', empId: 'EMP10025', name: 'Anik Mukhopadhyay', role: 'Branch Head', dept: 'Maintenance & Engineering', email: 'anik.m@company.com' },
  { id: 'E03', empId: 'EMP10026', name: 'Saurav Ray', role: 'Branch Incharge', dept: 'Fleet & Logistics', email: 'saurav.ray@company.com' },
  { id: 'E04', empId: 'EMP10027', name: 'Priya Sharma', role: 'Finance Officer', dept: 'Finance & Accounts', email: 'priya.sharma@company.com' }
];

const MASTER_ROLES = [
  { id: 'L01', role: 'Branch Incharge', level: 'L1', accessScope: 'Ticket Creation & Drafts' },
  { id: 'L02', role: 'Branch Head', level: 'L2', accessScope: 'Branch Approvals & Send Back' },
  { id: 'L03', role: 'Scrap Committee Member', level: 'L3', accessScope: 'CE Valuation & Auction Setup' },
  { id: 'L04', role: 'Finance Officer', level: 'L3', accessScope: 'EMD & Payment Verification' },
  { id: 'L05', role: 'Executive Director', level: 'L4', accessScope: 'Maker-Checker Exception Overrides' }
];

const MASTER_USER_ROLES = [
  { user: 'tirthankar.biswas@company.com', role: 'Branch Incharge', branchAssigned: 'Salt Lake & Park Street Hub', status: 'Active' },
  { user: 'anik.m@company.com', role: 'Branch Head', branchAssigned: 'Salt Lake Sector V Plant', status: 'Active' },
  { user: 'saurav.ray@company.com', role: 'Branch Incharge', branchAssigned: 'Durgapur Processing Plant', status: 'Active' }
];

const MASTER_CATEGORIES_DATA = [
  { category: 'Ferrous Scrap', subCategory: 'Heavy Melting Steel (HMS 1)', hsn: '720449', gst: '18%' },
  { category: 'Ferrous Scrap', subCategory: 'Light Melting Steel (LMS)', hsn: '720449', gst: '18%' },
  { category: 'Non-Ferrous Scrap', subCategory: 'Copper Wire Scrap', hsn: '740400', gst: '18%' },
  { category: 'E-Waste', subCategory: 'Obsolete Servers & Monitors', hsn: '854810', gst: '12%' },
  { category: 'Automotive & Fleet', subCategory: 'ELV Commercial Fleet', hsn: '870390', gst: '28%' }
];

const MASTER_MATERIALS = [
  { code: 'MAT-STL-01', description: 'Structural Steel Offcuts & Beams', category: 'Ferrous Scrap', uom: 'MT' },
  { code: 'MAT-IT-02', description: 'Defunct TFT Monitors & Rack Servers', category: 'E-Waste', uom: 'MT' },
  { code: 'MAT-VEH-03', description: 'Decommissioned Delivery Trucks (Chassis & Engine)', category: 'Automotive & Fleet', uom: 'Vehicles' },
  { code: 'MAT-CIR-04', description: 'Cracked Motor Housings (Cast Iron)', category: 'Ferrous Scrap', uom: 'MT' }
];

const MASTER_UOM = [
  { code: 'MT', name: 'Metric Tons', precision: '3 Decimals', standard: 'ISO-Metric' },
  { code: 'Kgs', name: 'Kilograms', precision: '2 Decimals', standard: 'ISO-Metric' },
  { code: 'Pieces', name: 'Pieces / Units', precision: '0 Decimals', standard: 'Discrete Count' },
  { code: 'Vehicles', name: 'Vehicles (ELV)', precision: '0 Decimals', standard: 'Asset Count' }
];

const MASTER_DOC_SERIES = [
  { docType: 'Inspection Checklist PDF', prefixFormat: 'CHK/KOL/2026/', seq: '0042', status: 'Active' },
  { docType: 'CE Valuation Report', prefixFormat: 'CEV/KOL/2026/', seq: '0019', status: 'Active' },
  { docType: 'Letter of Award (LOA)', prefixFormat: 'LOA/KOL/2026/', seq: '0088', status: 'Active' },
  { docType: 'Gate Pass Document', prefixFormat: 'GPS/KOL/2026/', seq: '0210', status: 'Active' }
];

const INITIAL_SCRAP_TICKETS: ScrapTicket[] = [
  {
    id: '1',
    ticketNumber: 'SCRP/KOL/2026/001',
    company: 'Acceleron Solutions Ltd',
    region: 'Eastern Region (Kolkata Hub)',
    branch: 'Salt Lake Sector V Plant',
    department: 'Manufacturing Operations',
    category: 'Ferrous Scrap',
    subCategory: 'Heavy Melting Steel (HMS 1)',
    material: 'Structural Steel Offcuts & Beams',
    unit: 'MT',
    quantity: 12.5,
    isHubFlag: false,
    status: 'Submitted',
    remarks: 'Accumulated during Q3 line retrofitting.',
    createdDate: '2026-11-01 10:30',
    createdBy: 'Tirthankar Biswas (Branch Incharge)',
    checklistUploaded: true,
    auditLogs: [
      { timestamp: '2026-11-01 10:15', user: 'Tirthankar Biswas', role: 'Branch Incharge', action: 'Created Draft Ticket with Checklist PDF' },
      { timestamp: '2026-11-01 10:30', user: 'Tirthankar Biswas', role: 'Branch Incharge', action: 'Submitted Ticket to Branch Head' }
    ]
  },
  {
    id: '2',
    ticketNumber: 'SCRP/KOL/2026/002',
    company: 'Acceleron Solutions Ltd',
    region: 'Eastern Region (Kolkata Hub)',
    branch: 'Park Street Hub Office',
    department: 'IT Infrastructure',
    category: 'E-Waste',
    subCategory: 'Obsolete Servers & Monitors',
    material: 'Defunct TFT Monitors & Rack Servers',
    unit: 'MT',
    quantity: 0.6,
    isHubFlag: true,
    status: 'Submitted',
    remarks: 'Server room cleanup phase 1.',
    createdDate: '2026-11-02 08:15',
    createdBy: 'Tirthankar Biswas (Branch Incharge)',
    checklistUploaded: true,
    auditLogs: [
      { timestamp: '2026-11-02 08:15', user: 'Tirthankar Biswas', role: 'Branch Incharge', action: 'Created Draft Ticket (Hub Flag Triggered)' }
    ]
  },
  {
    id: '3',
    ticketNumber: 'SCRP/KOL/2026/003',
    company: 'Acceleron Steel Corp',
    region: 'Eastern Region (Kolkata Hub)',
    branch: 'Durgapur Processing Plant',
    department: 'Fleet & Logistics',
    category: 'Automotive & Fleet',
    subCategory: 'ELV Commercial Fleet',
    material: 'Decommissioned Delivery Trucks (Chassis & Engine)',
    unit: 'Vehicles',
    quantity: 2,
    isHubFlag: false,
    status: 'Exception_Pending',
    remarks: 'End-of-Life Vehicle (ELV) scrapper dismantling required under RTO norms.',
    createdDate: '2026-11-03 09:30',
    createdBy: 'Saurav Ray (Branch Incharge)',
    checklistUploaded: true,
    biddingDetails: {
      disposalMode: 'RTO Vehicle Dismantling',
      h1BidderName: 'National Auto Recyclers Ltd',
      h1BidderGST: '19AAACN8841G1Z2',
      h1Amount: 320000,
      reservePriceCE: 400000,
      isCarScrap: true,
      chassisNumber: 'MA3ER41S80092144',
      isExceptionTriggered: true,
      exceptionReason: 'H1 Bid is >15% below CE Valuation for Car Scrapping'
    },
    auditLogs: [
      { timestamp: '2026-11-03 09:30', user: 'Saurav Ray', role: 'Branch Incharge', action: 'Created Car Scrapping Ticket with RTO Checklist' }
    ]
  },
  {
    id: '4',
    ticketNumber: 'SCRP/KOL/2026/004',
    company: 'Acceleron Steel Corp',
    region: 'Eastern Region (Kolkata Hub)',
    branch: 'Durgapur Processing Plant',
    department: 'Warehouse & Logistics',
    category: 'Ferrous Scrap',
    subCategory: 'Cast Iron Scrap',
    material: 'Cracked Motor Housings',
    unit: 'MT',
    quantity: 18.0,
    isHubFlag: false,
    status: 'Closed',
    remarks: 'Dispatched to winning bidder.',
    createdDate: '2026-10-28 09:00',
    createdBy: 'Priya Sharma (Branch Incharge)',
    checklistUploaded: true,
    biddingDetails: {
      disposalMode: 'Forward Auction',
      h1BidderName: 'Eastern Scrap Processors Pvt Ltd',
      h1BidderGST: '19AAACE1234F1Z5',
      h1Amount: 648000,
      reservePriceCE: 600000,
      loaNumber: 'LOA/KOL/2026/8842',
      proformaNumber: 'PRF/KOL/2026/9910',
      emdVerified: true,
      sapSyncStatus: true
    },
    auditLogs: [
      { timestamp: '2026-10-28 09:00', user: 'Priya Sharma', role: 'Branch Incharge', action: 'Submitted Ticket' }
    ]
  }
];

export const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('Branch Incharge');
  const [activeUsername, setActiveUsername] = useState<string>('tirthankar.biswas@company.com');
  const [currentView, setCurrentView] = useState<string>('home');
  const [isMasterDropdownOpen, setIsMasterDropdownOpen] = useState<boolean>(true);
  const [selectedAuditTicket, setSelectedAuditTicket] = useState<ScrapTicket | null>(null);
  const [isSidebarHovered, setIsSidebarHovered] = useState<boolean>(false);

  // GLOBAL PORTAL THEME STATE: 'dark' | 'light'
  const [appTheme, setAppTheme] = useState<'dark' | 'light'>('dark');
  const isDark = appTheme === 'dark';

  // LOGIN CARD CLICK-DARKEN STATE
  const [isLoginCardClicked, setIsLoginCardClicked] = useState<boolean>(false);

  const [loginUserId, setLoginUserId] = useState('tirthankar.biswas@company.com');
  const [loginPassword, setLoginPassword] = useState('SecurePass2026!');
  const [searchTerm, setSearchTerm] = useState('');
  const [tickets, setTickets] = useState<ScrapTicket[]>(INITIAL_SCRAP_TICKETS);

  // Form State
  const [company, setCompany] = useState(MASTER_COMPANIES[0].name);
  const [region, setRegion] = useState(MASTER_REGIONS[0].name);
  const [branch, setBranch] = useState(MASTER_BRANCHES[1].name);
  const [department, setDepartment] = useState(MASTER_DEPARTMENTS[0].name);
  const [category, setCategory] = useState('Ferrous Scrap');
  const [subCategory, setSubCategory] = useState('Heavy Melting Steel (HMS 1)');
  const [material, setMaterial] = useState('');
  const [unit, setUnit] = useState<'MT' | 'Kgs' | 'Pieces' | 'Vehicles'>('MT');
  const [quantity, setQuantity] = useState<number>(0.5);

  const selectedBranchObj = MASTER_BRANCHES.find(b => b.name === branch);
  const isHubNeed = quantity <= 1.0 && unit === 'MT' && (selectedBranchObj ? !selectedBranchObj.holdsSpace : false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginUserId.trim() && loginPassword.trim()) {
      setActiveUsername(loginUserId);
      setIsAuthenticated(true);
    } else {
      alert('Please enter valid credentials.');
    }
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setLoginUserId('');
    setLoginPassword('');
    setCurrentView('home');
  };

  const handleBranchHeadApproval = (ticketId: string, action: 'APPROVE' | 'SEND_BACK') => {
    const timestampStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        const nextStatus = action === 'APPROVE' ? 'Branch_Head_Approved' : 'Send_Back';
        const logMsg = action === 'APPROVE' ? 'Branch Head approved ticket.' : 'Branch Head sent back ticket for correction.';
        return {
          ...t,
          status: nextStatus,
          auditLogs: [...t.auditLogs, { timestamp: timestampStr, user: activeUsername, role: 'Branch Head', action: logMsg }]
        };
      }
      return t;
    }));
  };

  const handleExceptionApproval = (ticketId: string, decision: 'APPROVE_EXCEPTION' | 'REJECT_EXCEPTION') => {
    const timestampStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        const newStatus = decision === 'APPROVE_EXCEPTION' ? 'Branch_Head_Approved' : 'Send_Back';
        const actionMsg = decision === 'APPROVE_EXCEPTION' 
          ? 'Executive Director approved pricing exception override.' 
          : 'Executive Director rejected exception.';
        return {
          ...t,
          status: newStatus,
          auditLogs: [...t.auditLogs, { timestamp: timestampStr, user: activeUsername, role: 'Executive Director', action: actionMsg }]
        };
      }
      return t;
    }));
  };

  const handleSaveTicket = (targetStatus: 'Draft' | 'Submitted') => {
    if (!material.trim()) {
      alert('Material description is required.');
      return;
    }

    const newTicketNum = `SCRP/KOL/2026/00${tickets.length + 1}`;
    const timestampStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const newTicket: ScrapTicket = {
      id: String(Date.now()),
      ticketNumber: newTicketNum,
      company,
      region,
      branch,
      department,
      category,
      subCategory,
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

    setTickets([newTicket, ...tickets]);
    setCurrentView('home');
    setMaterial('');
  };

  const totalRevenue = tickets.reduce((acc, t) => acc + (t.biddingDetails?.h1Amount || 0), 0);
  const pendingApprovalsCount = tickets.filter(t => t.status === 'Submitted' || t.status === 'Exception_Pending').length;
  const closedTicketsCount = tickets.filter(t => t.status === 'Closed').length;

  const filteredTickets = tickets.filter(t => 
    t.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.material.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // =========================================================================
  // LOGIN VIEW: DESIGN APPROACH 1 (DARK MODE = WHITE TEXT/DARK BG, LIGHT MODE = DEEP BLACK FONT/LIGHT SOFT TONAL BG)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full relative flex items-center justify-between p-6 lg:p-16 font-sans antialiased overflow-hidden">
        
        {/* Full Screen Background Image with Controlled Tonal Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2000&q=80" 
            alt="Industrial Background" 
            className={`w-full h-full object-cover scale-105 transition-all duration-500 ${
              isDark ? 'filter brightness-75' : 'filter brightness-90 contrast-110 saturate-[0.85]'
            }`}
          />
          {/* Light Mode soft neutral tone backdrop overlay */}
          <div className={`absolute inset-0 transition-all duration-500 ${
            isDark ? 'bg-slate-950/80 backdrop-blur-[2px]' : 'bg-slate-200/50 backdrop-blur-[2px]'
          }`} />
        </div>

        {/* TOP THEME TOGGLE CONTROL */}
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

        {/* LEFT PROMINENT MODULE WITH DYNAMIC FONT COLORS (WHITE FOR DARK MODE, DEEP BLACK/CHARCOAL FOR LIGHT MODE) */}
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

        {/* 3D FLOATING RIGHT LOGIN MODULE (FROSTED GLASS WITH PURE BLACK FONT IN LIGHT MODE) */}
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

            <form onSubmit={handleLogin} onClick={(e) => e.stopPropagation()} className="space-y-4 text-xs">
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
  }

  // =========================================================================
  // AUTHENTICATED PORTAL VIEWS WITH GLOBAL LIGHT / DARK THEME
  // =========================================================================
  return (
    <div className={`flex h-screen font-sans antialiased overflow-hidden transition-colors duration-500 ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-950'
    }`}>
      
      {/* HOVER EXPANDABLE SIDEBAR */}
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

            {/* 11 MASTER SCREENS DROPDOWN */}
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
              <button onClick={handleSignOut} className="p-1.5 text-slate-400 hover:text-red-500 cursor-pointer" title="Sign Out">
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <button onClick={handleSignOut} className="w-full flex justify-center text-slate-400 hover:text-red-500 cursor-pointer" title="Sign Out">
              <LogOut size={16} />
            </button>
          )}
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* GLOBAL HEADER WITH DYNAMIC MODE SWITCHER */}
        <header className={`h-14 border-b flex items-center justify-between px-6 z-20 shadow-sm ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center space-x-2 text-xs text-slate-500 font-bold">
            <span className={`font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>GCPL Enterprise Scrap Management</span>
            <span>/</span>
            <span className="capitalize text-amber-600 dark:text-amber-400 font-black">{currentView.replace('_', ' ')}</span>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            {/* GLOBAL LIGHT/DARK TOGGLE BUTTON */}
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
              onClick={handleSignOut} 
              className="flex items-center space-x-1 bg-red-500/10 hover:bg-red-500/20 text-red-700 dark:text-red-400 border border-red-500/30 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              <LogOut size={13} />
              <span>Sign Out</span>
            </button>
          </div>
        </header>

        {/* EXECUTIVE MIS DASHBOARD */}
        {currentView === 'mis_dashboard' && (
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

              <button onClick={() => setCurrentView('home')} className={`px-4 py-2 rounded-xl text-xs font-bold transition shadow-md cursor-pointer ${
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
                          <button onClick={() => handleExceptionApproval(ticket.id, 'APPROVE_EXCEPTION')} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-sm cursor-pointer">
                            Approve Exception Override
                          </button>
                          <button onClick={() => handleExceptionApproval(ticket.id, 'REJECT_EXCEPTION')} className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-bold cursor-pointer">
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
        )}

        {/* ACTIVE QUEUE VIEW */}
        {currentView === 'home' && (
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
                    onClick={() => setCurrentView('create_ticket')}
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
                                  onClick={() => handleBranchHeadApproval(ticket.id, 'APPROVE')} 
                                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-black flex items-center gap-1 shadow-sm cursor-pointer"
                                >
                                  <Check size={13} /> Approve
                                </button>
                                <button 
                                  onClick={() => handleBranchHeadApproval(ticket.id, 'SEND_BACK')} 
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
                          <button onClick={() => setSelectedAuditTicket(ticket)} className="text-amber-700 dark:text-amber-400 hover:underline font-black text-xs cursor-pointer">
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
        )}

        {/* 11 MASTER DATA ADMIN SCREENS */}
        {currentView.startsWith('master_') && (
          <div className="flex-1 overflow-y-auto p-8 space-y-6 max-w-7xl mx-auto w-full">
            <div className={`p-6 rounded-2xl border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
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
        )}

        {/* TICKET CREATION VIEW */}
        {currentView === 'create_ticket' && (
          <div className="flex-1 overflow-y-auto p-8 max-w-4xl mx-auto w-full space-y-6">
            <div className={`flex items-center justify-between p-4 rounded-2xl border shadow-sm ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300'
            }`}>
              <button onClick={() => setCurrentView('home')} className="flex items-center space-x-2 text-slate-700 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 text-xs font-black cursor-pointer">
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
                <button type="button" onClick={() => setCurrentView('home')} className={`px-5 py-2 rounded-xl font-black cursor-pointer ${
                  isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-900'
                }`}>Cancel</button>
                <div className="flex space-x-2">
                  <button type="button" onClick={() => handleSaveTicket('Draft')} className={`px-5 py-2 border rounded-xl font-black cursor-pointer ${
                    isDark ? 'border-slate-700 text-slate-300' : 'border-slate-400 text-slate-950 bg-white shadow-sm'
                  }`}>Save Draft</button>
                  <button type="button" onClick={() => handleSaveTicket('Submitted')} className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-black cursor-pointer shadow-md">Submit Ticket</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* AUDIT MODAL */}
      {selectedAuditTicket && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border ${
            isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-950'
          }`}>
            <div className={`flex justify-between items-center px-6 py-4 border-b ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-200 border-slate-300'
            }`}>
              <h2 className="text-sm font-black flex items-center gap-2">
                <ShieldCheck size={16} className="text-amber-500" /> Audit Trail — {selectedAuditTicket.ticketNumber}
              </h2>
              <button onClick={() => setSelectedAuditTicket(null)} className="text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-200 p-1 cursor-pointer font-black">✕</button>
            </div>
            <div className="p-6 space-y-3 text-xs">
              {selectedAuditTicket.auditLogs.map((log, idx) => (
                <div key={idx} className="flex items-start space-x-3 border-l-2 border-amber-500 pl-3 py-1">
                  <div>
                    <div className={`font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>{log.action}</div>
                    <div className="text-[10px] text-slate-700 dark:text-slate-400 font-semibold">{log.timestamp} • {log.user} ({log.role})</div>
                  </div>
                </div>
              ))}
            </div>
            <div className={`px-6 py-3 border-t text-right ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-200 border-slate-300'}`}>
              <button onClick={() => setSelectedAuditTicket(null)} className="px-4 py-2 bg-slate-900 text-white font-black rounded-xl text-xs cursor-pointer">Close Logs</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;x