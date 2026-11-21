import React, { useState } from 'react';
import { INITIAL_SCRAP_TICKETS } from './data/mockTickets';
import type { ScrapTicket, UserRole } from './types';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { AuditModal } from './components/common/AuditModel';
import { LoginView } from './views/LoginView';
import { TicketsQueue } from './views/TicketsQueue';
import { TicketCreation } from './views/TicketCreation';
import { MISDashboard } from './routing/MISDasboard';
import { MasterDataView } from './metrics/MasterDataView';

export const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('Branch Incharge');
  const [activeUsername, setActiveUsername] = useState<string>('tirthankar.biswas@company.com');
  const [currentView, setCurrentView] = useState<string>('home');
  const [isMasterDropdownOpen, setIsMasterDropdownOpen] = useState<boolean>(true);
  const [selectedAuditTicket, setSelectedAuditTicket] = useState<ScrapTicket | null>(null);
  const [isSidebarHovered, setIsSidebarHovered] = useState<boolean>(false);

  const [appTheme, setAppTheme] = useState<'dark' | 'light'>('dark');
  const isDark = appTheme === 'dark';

  const [tickets, setTickets] = useState<ScrapTicket[]>(INITIAL_SCRAP_TICKETS);

  const handleSignOut = () => {
    setIsAuthenticated(false);
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

  if (!isAuthenticated) {
    return (
      <LoginView 
        appTheme={appTheme} 
        setAppTheme={setAppTheme} 
        onLogin={(userId) => { 
          setActiveUsername(userId); 
          setIsAuthenticated(true); 
        }} 
      />
    );
  }

  return (
    <div className={`flex h-screen font-sans antialiased overflow-hidden transition-colors duration-500 ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-950'
    }`}>
      <Sidebar 
        currentView={currentView}
        setCurrentView={setCurrentView}
        isSidebarHovered={isSidebarHovered}
        setIsSidebarHovered={setIsSidebarHovered}
        isMasterDropdownOpen={isMasterDropdownOpen}
        setIsMasterDropdownOpen={setIsMasterDropdownOpen}
        isDark={isDark}
        activeUsername={activeUsername}
        currentUserRole={currentUserRole}
        onSignOut={handleSignOut}
      />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header 
          appTheme={appTheme}
          setAppTheme={setAppTheme}
          currentUserRole={currentUserRole}
          setCurrentUserRole={setCurrentUserRole}
          currentView={currentView}
          onSignOut={handleSignOut}
        />

        {currentView === 'home' && (
          <TicketsQueue 
            tickets={tickets} 
            currentUserRole={currentUserRole} 
            isDark={isDark}
            onCreateClick={() => setCurrentView('create_ticket')}
            onApproveAction={handleBranchHeadApproval}
            onViewAudit={(t) => setSelectedAuditTicket(t)}
          />
        )}

        {currentView === 'mis_dashboard' && (
          <MISDashboard 
            tickets={tickets}
            currentUserRole={currentUserRole}
            isDark={isDark}
            onNavigateQueue={() => setCurrentView('home')}
            onExceptionDecision={handleExceptionApproval}
          />
        )}

        {currentView.startsWith('master_') && (
          <MasterDataView 
            currentView={currentView}
            isDark={isDark}
          />
        )}

        {currentView === 'create_ticket' && (
          <TicketCreation 
            isDark={isDark}
            activeUsername={activeUsername}
            ticketCount={tickets.length}
            onSaveTicket={(newTicket) => {
              setTickets([newTicket, ...tickets]);
              setCurrentView('home');
            }}
            onCancel={() => setCurrentView('home')}
          />
        )}
      </div>

      {selectedAuditTicket && (
        <AuditModal 
          ticket={selectedAuditTicket} 
          onClose={() => setSelectedAuditTicket(null)} 
          isDark={isDark} 
        />
      )}
    </div>
  );
};

export default App;