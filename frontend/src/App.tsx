import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider } from 'notistack';
import { theme } from './themes';
import { Sidebar, UserProfileMenu } from './components';
import { Dashboard, Products, Login, Register, OCRScanner, Settings, Sales, Repair, SalesInvoices, SalesReceipts, Reports, Customers, NewInvoice, BarcodePrinting } from './pages';
import { useAuth } from './hooks';
import { useSettings } from './store/settingsStore';

const DRAWER_WIDTH = 224;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const effectiveWidth = sidebarCollapsed ? 60 : DRAWER_WIDTH;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onMenuClick={() => setSidebarOpen(true)}
        drawerWidth={DRAWER_WIDTH}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#ffffff',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          ml: { xs: 0, sm: `${effectiveWidth}px` }, // Add left margin for fixed sidebar on desktop
          transition: 'margin-left 0.3s ease',
        }}
      >
        {/* Top bar with user profile */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2,
            pb: 0,
          }}
        >
          <UserProfileMenu />
        </Box>
        
        {/* Main content */}
        <Box sx={{ flex: 1, p: 3, pt: 1 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

function App() {
  const { user, loading } = useAuth();
  const { initializeSettings, isInitialized } = useSettings();
  const [appReady, setAppReady] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  console.log('App render - user:', user, 'loading:', loading, 'appReady:', appReady);

  // Clean up old localStorage ClickUp data to prevent confusion
  useEffect(() => {
    try {
      const settingsJson = localStorage.getItem('aistock-settings');
      if (settingsJson) {
        const settings = JSON.parse(settingsJson);
        // Remove ClickUp integration from localStorage if it exists
        if (settings.state?.integrations) {
          const filteredIntegrations = settings.state.integrations.filter(
            (i: any) => i.name?.toLowerCase() !== 'clickup'
          );
          if (filteredIntegrations.length !== settings.state.integrations.length) {
            settings.state.integrations = filteredIntegrations;
            localStorage.setItem('aistock-settings', JSON.stringify(settings));
            console.log('[App] Cleaned up old ClickUp data from localStorage');
          }
        }
      }
    } catch (e) {
      console.error('[App] Error cleaning localStorage:', e);
    }
  }, []);

  // Initialize settings when user logs in
  useEffect(() => {
    if (user?.uid && !isInitialized) {
      initializeSettings(user.uid);
    }
  }, [user, isInitialized, initializeSettings]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppReady(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!appReady || loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
          }}
        >
          <CircularProgress />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <Router>
          {user ? (
            <MainLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/ocr-scanner" element={<OCRScanner />} />
                <Route path="/stock-updates" element={<OCRScanner />} />
                <Route path="/barcode-printing" element={<BarcodePrinting />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/sales/invoices" element={<SalesInvoices />} />
                <Route path="/sales/invoices/new" element={<NewInvoice />} />
                <Route path="/sales/receipts" element={<SalesReceipts />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/repair" element={<Repair />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/help" element={<Dashboard />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </MainLayout>
          ) : (
            <Routes>
              <Route
                path="/"
                element={
                  showRegister ? (
                    <Register onSwitchToLogin={() => setShowRegister(false)} />
                  ) : (
                    <Login onSwitchToRegister={() => setShowRegister(true)} />
                  )
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          )}
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
