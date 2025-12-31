import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  Collapse,
} from '@mui/material';
import {
  Home,
  Package,
  TrendingUp,
  Settings,
  HelpCircle,
  BarChart3,
  Camera,
  ShoppingCart,
  Wrench,
  ChevronDown,
  FileText,
  Receipt,
  DollarSign,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  drawerWidth: number;
}

const menuItems = [
  { label: 'Dashboard', icon: Home, path: '/' },
  { label: 'Products', icon: Package, path: '/products' },
  { label: 'Stock Updates', icon: TrendingUp, path: '/stock-updates' },
  { label: 'OCR Scanner', icon: Camera, path: '/ocr-scanner' },
  { label: 'Reports', icon: BarChart3, path: '/reports' },
];

const salesSubItems = [
  { label: 'Quotations', icon: FileText, path: '/sales' },
  { label: 'Invoices', icon: Receipt, path: '/sales/invoices' },
  { label: 'Sales Receipts', icon: DollarSign, path: '/sales/receipts' },
];

const bottomMenuItems = [
  { label: 'Settings', icon: Settings, path: '/settings' },
  { label: 'Help', icon: HelpCircle, path: '/help' },
];

export const Sidebar: React.FC<SidebarProps> = ({ open, onClose, drawerWidth }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [salesOpen, setSalesOpen] = useState(false);

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleSalesClick = () => {
    setSalesOpen(!salesOpen);
  };

  const sidebarContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
          📦 AiStock
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Inventory Management
        </Typography>
      </Box>

      <Divider />

      {/* Main Menu */}
      <List sx={{ flex: 1, py: 2 }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  mx: 1,
                  mb: 0.5,
                  borderRadius: 1,
                  backgroundColor: isActive ? 'primary.light' : 'transparent',
                  color: isActive ? 'primary.main' : 'text.primary',
                  fontWeight: isActive ? 600 : 400,
                  '&:hover': {
                    backgroundColor: isActive ? 'primary.light' : 'action.hover',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: isActive ? 'primary.main' : 'inherit',
                  }}
                >
                  <Icon size={20} />
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}

        {/* Sales Expandable Menu */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleSalesClick}
            sx={{
              mx: 1,
              mb: 0.5,
              borderRadius: 1,
              backgroundColor: salesOpen || location.pathname.startsWith('/sales') ? 'primary.light' : 'transparent',
              color: salesOpen || location.pathname.startsWith('/sales') ? 'primary.main' : 'text.primary',
              fontWeight: salesOpen || location.pathname.startsWith('/sales') ? 600 : 400,
              '&:hover': {
                backgroundColor: location.pathname.startsWith('/sales') ? 'primary.light' : 'action.hover',
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 40,
                color: salesOpen || location.pathname.startsWith('/sales') ? 'primary.main' : 'inherit',
              }}
            >
              <ShoppingCart size={20} />
            </ListItemIcon>
            <ListItemText primary="Sales" />
            <ChevronDown
              size={18}
              style={{
                transform: salesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
              }}
            />
          </ListItemButton>
        </ListItem>

        {/* Sales Sub-items */}
        <Collapse in={salesOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {salesSubItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <ListItem key={item.path} disablePadding>
                  <ListItemButton
                    onClick={() => handleNavigation(item.path)}
                    sx={{
                      ml: 4,
                      mr: 1,
                      mb: 0.3,
                      borderRadius: 1,
                      backgroundColor: isActive ? 'primary.light' : 'transparent',
                      color: isActive ? 'primary.main' : 'text.primary',
                      fontSize: '0.9rem',
                      fontWeight: isActive ? 600 : 400,
                      '&:hover': {
                        backgroundColor: isActive ? 'primary.light' : 'action.hover',
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 35,
                        color: isActive ? 'primary.main' : 'inherit',
                      }}
                    >
                      <Icon size={18} />
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Collapse>

        {/* Repair Dashboard */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleNavigation('/repair')}
            sx={{
              mx: 1,
              mb: 0.5,
              borderRadius: 1,
              backgroundColor: location.pathname === '/repair' ? 'primary.light' : 'transparent',
              color: location.pathname === '/repair' ? 'primary.main' : 'text.primary',
              fontWeight: location.pathname === '/repair' ? 600 : 400,
              '&:hover': {
                backgroundColor: location.pathname === '/repair' ? 'primary.light' : 'action.hover',
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 40,
                color: location.pathname === '/repair' ? 'primary.main' : 'inherit',
              }}
            >
              <Wrench size={20} />
            </ListItemIcon>
            <ListItemText primary="Repair Dashboard" />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />

      {/* Bottom Menu */}
      <List sx={{ py: 1 }}>
        {bottomMenuItems.map((item) => {
          const Icon = item.icon;

          return (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  mx: 1,
                  borderRadius: 1,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Icon size={20} />
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <Box
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          backgroundColor: 'background.paper',
          borderRight: 1,
          borderColor: 'divider',
          height: 'calc(100vh - 64px)',
          overflow: 'auto',
        }}
      >
        {sidebarContent}
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            mt: 8,
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
};
