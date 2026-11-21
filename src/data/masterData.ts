// --- Master Data Definitions ---
export const MASTER_COMPANIES = [
  { id: 'C01', code: 'ACC-SOL', name: 'Acceleron Solutions Ltd', status: 'Active', country: 'India', regNum: 'U72200WB2019PLC23112' },
  { id: 'C02', code: 'ACC-STL', name: 'Acceleron Steel Corp', status: 'Active', country: 'India', regNum: 'U27100WB2018PLC22981' }
];

export const MASTER_REGIONS = [
  { id: 'R01', code: 'EZ-KOL', name: 'Eastern Region (Kolkata Hub)', head: 'Subrata Banerjee', operationalHubs: 3 },
  { id: 'R02', code: 'NZ-DEL', name: 'Northern Region (Delhi Hub)', head: 'Rajesh Malhotra', operationalHubs: 4 },
  { id: 'R03', code: 'WZ-MUM', name: 'Western Region (Mumbai Hub)', head: 'Amit Desai', operationalHubs: 5 }
];

export const MASTER_BRANCHES = [
  { id: 'B01', code: 'SL-05', name: 'Salt Lake Sector V Plant', region: 'Eastern Region', holdsSpace: true, head: 'Anik Mukhopadhyay' },
  { id: 'B02', code: 'PS-01', name: 'Park Street Hub Office', region: 'Eastern Region', holdsSpace: false, head: 'Subrata Sen' },
  { id: 'B03', code: 'HW-02', name: 'Howrah Scrap Yard', region: 'Eastern Region', holdsSpace: true, head: 'Rajarshi Das' },
  { id: 'B04', code: 'DP-09', name: 'Durgapur Processing Plant', region: 'Eastern Region', holdsSpace: true, head: 'Kunal Chatterjee' }
];

export const MASTER_DEPARTMENTS = [
  { id: 'D01', code: 'MO-01', name: 'Manufacturing Operations', headCount: 140, budgetCode: 'BUD-2026-01' },
  { id: 'D02', code: 'IT-02', name: 'IT Infrastructure', headCount: 45, budgetCode: 'BUD-2026-02' },
  { id: 'D03', code: 'ME-03', name: 'Maintenance & Engineering', headCount: 80, budgetCode: 'BUD-2026-03' },
  { id: 'D04', code: 'FL-04', name: 'Fleet & Logistics', headCount: 30, budgetCode: 'BUD-2026-04' }
];

export const MASTER_EMPLOYEES = [
  { id: 'E01', empId: 'EMP10024', name: 'Tirthankar Biswas', role: 'Branch Incharge', dept: 'Manufacturing Operations', email: 'tirthankar.biswas@company.com' },
  { id: 'E02', empId: 'EMP10025', name: 'Anik Mukhopadhyay', role: 'Branch Head', dept: 'Maintenance & Engineering', email: 'anik.m@company.com' },
  { id: 'E03', empId: 'EMP10026', name: 'Saurav Ray', role: 'Branch Incharge', dept: 'Fleet & Logistics', email: 'saurav.ray@company.com' },
  { id: 'E04', empId: 'EMP10027', name: 'Priya Sharma', role: 'Finance Officer', dept: 'Finance & Accounts', email: 'priya.sharma@company.com' }
];

export const MASTER_ROLES = [
  { id: 'L01', role: 'Branch Incharge', level: 'L1', accessScope: 'Ticket Creation & Drafts' },
  { id: 'L02', role: 'Branch Head', level: 'L2', accessScope: 'Branch Approvals & Send Back' },
  { id: 'L03', role: 'Scrap Committee Member', level: 'L3', accessScope: 'CE Valuation & Auction Setup' },
  { id: 'L04', role: 'Finance Officer', level: 'L3', accessScope: 'EMD & Payment Verification' },
  { id: 'L05', role: 'Executive Director', level: 'L4', accessScope: 'Maker-Checker Exception Overrides' }
];

export const MASTER_USER_ROLES = [
  { user: 'tirthankar.biswas@company.com', role: 'Branch Incharge', branchAssigned: 'Salt Lake & Park Street Hub', status: 'Active' },
  { user: 'anik.m@company.com', role: 'Branch Head', branchAssigned: 'Salt Lake Sector V Plant', status: 'Active' },
  { user: 'saurav.ray@company.com', role: 'Branch Incharge', branchAssigned: 'Durgapur Processing Plant', status: 'Active' }
];

export const MASTER_CATEGORIES_DATA = [
  { category: 'Ferrous Scrap', subCategory: 'Heavy Melting Steel (HMS 1)', hsn: '720449', gst: '18%' },
  { category: 'Ferrous Scrap', subCategory: 'Light Melting Steel (LMS)', hsn: '720449', gst: '18%' },
  { category: 'Non-Ferrous Scrap', subCategory: 'Copper Wire Scrap', hsn: '740400', gst: '18%' },
  { category: 'E-Waste', subCategory: 'Obsolete Servers & Monitors', hsn: '854810', gst: '12%' },
  { category: 'Automotive & Fleet', subCategory: 'ELV Commercial Fleet', hsn: '870390', gst: '28%' }
];

export const MASTER_MATERIALS = [
  { code: 'MAT-STL-01', description: 'Structural Steel Offcuts & Beams', category: 'Ferrous Scrap', uom: 'MT' },
  { code: 'MAT-IT-02', description: 'Defunct TFT Monitors & Rack Servers', category: 'E-Waste', uom: 'MT' },
  { code: 'MAT-VEH-03', description: 'Decommissioned Delivery Trucks (Chassis & Engine)', category: 'Automotive & Fleet', uom: 'Vehicles' },
  { code: 'MAT-CIR-04', description: 'Cracked Motor Housings (Cast Iron)', category: 'Ferrous Scrap', uom: 'MT' }
];

export const MASTER_UOM = [
  { code: 'MT', name: 'Metric Tons', precision: '3 Decimals', standard: 'ISO-Metric' },
  { code: 'Kgs', name: 'Kilograms', precision: '2 Decimals', standard: 'ISO-Metric' },
  { code: 'Pieces', name: 'Pieces / Units', precision: '0 Decimals', standard: 'Discrete Count' },
  { code: 'Vehicles', name: 'Vehicles (ELV)', precision: '0 Decimals', standard: 'Asset Count' }
];
export const MASTER_DOC_SERIES = [
  { docType: 'Inspection Checklist PDF', prefixFormat: 'CHK/KOL/2026/', seq: '0042', status: 'Active' },
  { docType: 'CE Valuation Report', prefixFormat: 'CEV/KOL/2026/', seq: '0019', status: 'Active' },
  { docType: 'Letter of Award (LOA)', prefixFormat: 'LOA/KOL/2026/', seq: '0088', status: 'Active' },
  { docType: 'Gate Pass Document', prefixFormat: 'GPS/KOL/2026/', seq: '0210', status: 'Active' }
];