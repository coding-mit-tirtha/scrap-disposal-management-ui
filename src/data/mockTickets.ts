import type { ScrapTicket } from '../types';

export const INITIAL_SCRAP_TICKETS: ScrapTicket[] = [
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