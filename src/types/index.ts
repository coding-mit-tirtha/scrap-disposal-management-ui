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

export interface BiddingDetails {
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

export interface ScrapTicket {
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