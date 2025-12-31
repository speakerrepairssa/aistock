import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider } from 'notistack';
import { theme } from './theme';
import { Header, Sidebar } from './components';
import { Dashboard, Products, Login, Register, OCRScanner, Settings, Sales, Repair, SalesInvoices, SalesReceipts, Reports } from './pages';
import { useAuth } from './hooks';

const DRAWER_WIDTH = 280;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          drawerWidth={DRAWER_WIDTH}
        />
        <Box
          sx={{
            flex: 1,
            backgroundColor: '#f5f5f5',
            overflow: 'auto',
            p: 2,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

function App() {
  const { user, loading } = useAuth();
  const [appReady, setAppReady] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  console.log('App render - user:', user, 'loading:', loading, 'appReady:', appReady);

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
                <Route path="/reports" element={<Reports />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/sales/invoices" element={<SalesInvoices />} />
                <Route path="/sales/receipts" element={<SalesReceipts />} />
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
