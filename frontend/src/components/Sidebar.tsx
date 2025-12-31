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
  Fab,
  Button,
} from '@mui/material';
import {
  Home,
  Package,
  TrendingUp,
  Settings,
  BarChart3,
  ShoppingCart,
  Wrench,
  ChevronDown,
  FileText,
  Receipt,
  DollarSign,
  Users,
  Menu as MenuIcon,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NewSidebarButton } from './NewSidebarButton';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  onMenuClick?: () => void;
  drawerWidth: number;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

// Updated menu organization
const primaryMenuItems = [
  { label: 'Home', icon: Home, path: '/' },
];

const salesMenuItems = [
  { label: 'Sales', icon: ShoppingCart, path: '/sales', isParent: true },
  { label: 'Customers', icon: Users, path: '/customers', isChild: true },
  { label: 'Quotations', icon: FileText, path: '/sales', isChild: true },
  { label: 'Invoices', icon: Receipt, path: '/sales/invoices', isChild: true },
  { label: 'Sales Receipts', icon: DollarSign, path: '/sales/receipts', isChild: true },
  { label: 'Templates', icon: FileText, path: '/sales/templates', isChild: true },
];

const inventoryMenuItems = [
  { label: 'Inventory', icon: Package, path: '/products' },
  { label: 'Stock Updates', icon: TrendingUp, path: '/stock-updates' },
  { label: 'Barcode Printing', icon: FileText, path: '/barcode-printing' },
];

const repairsMenuItems = [
  { label: 'Repairs', icon: Wrench, path: '/repair' },
];

const analyticsMenuItems = [
  { label: 'Analytics', icon: BarChart3, path: '/reports' },
];

const bottomMenuItems = [
  { label: 'Settings', icon: Settings, path: '/settings' },
];

export const Sidebar: React.FC<SidebarProps> = ({ open, onClose, onMenuClick, drawerWidth, collapsed = false, onToggleCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedSection, setExpandedSection] = useState<string | null>('sales');

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Dark grey color palette
  const qbColors = {
    sidebar: '#2a2a2a',
    text: '#ffffff',
    textSecondary: '#cccccc',
    hover: '#3a3a3a',
    active: '#4a4a4a',
    divider: '#404040',
    sectionTitle: '#999999',
  };

  const MenuItem: React.FC<{
    item: any;
    isActive: boolean;
    isChild?: boolean;
    onClick: () => void;
  }> = ({ item, isActive, isChild = false, onClick }) => {
    const Icon = item.icon;
    return (
      <ListItem disablePadding>
        <ListItemButton
          onClick={onClick}
          sx={{
            mx: isChild ? 2 : 1,
            mb: 0.3,
            pl: isChild ? 4 : 2,
            borderRadius: 0.5,
            backgroundColor: isActive ? qbColors.active : 'transparent',
            color: qbColors.text,
            fontWeight: isActive ? 600 : 500,
            fontSize: isChild ? '0.75rem' : '0.8rem', // Reduced from 0.9rem/0.95rem
            '&:hover': {
              backgroundColor: isActive ? qbColors.active : qbColors.hover,
            },
            transition: 'all 0.2s ease',
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: isChild ? 32 : 40,
              color: isActive ? '#2563eb' : qbColors.textSecondary,
            }}
          >
            <Icon size={isChild ? 14 : 18} /> 
          </ListItemIcon>
          <ListItemText 
            primary={item.label}
            sx={{ 
              '& .MuiListItemText-primary': { fontSize: 'inherit' },
              display: collapsed ? 'none' : 'block'
            }}
          />
        </ListItemButton>
      </ListItem>
    );
  };

  const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
    <Typography
      variant="caption"
      sx={{
        px: 2,
        py: 1.5,
        color: qbColors.sectionTitle,
        fontSize: '0.65rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        display: collapsed ? 'none' : 'block',
      }}
    >
      {title}
    </Typography>
  );

  const sidebarContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: qbColors.sidebar }}>
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: `1px solid ${qbColors.divider}` }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: collapsed ? 'none' : 'block' }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700, 
                color: '#2563eb',
                fontSize: '0.95rem',
              }}
            >
              📦 AiStock
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: qbColors.textSecondary,
                fontSize: '0.65rem',
              }}
            >
              Speaker Repairs Sa
            </Typography>
          </Box>
          {onToggleCollapse && (
            <Button
              onClick={onToggleCollapse}
              sx={{
                minWidth: 'auto',
                p: 0.5,
                color: qbColors.textSecondary,
                '&:hover': {
                  color: qbColors.text,
                  backgroundColor: qbColors.hover,
                },
              }}
            >
              <ChevronDown 
                size={16} 
                style={{
                  transform: collapsed ? 'rotate(90deg)' : 'rotate(-90deg)',
                  transition: 'transform 0.3s ease',
                }}
              />
            </Button>
          )}
        </Box>
      </Box>

      {/* New Button */}
      <Box sx={{ p: 1, display: collapsed ? 'none' : 'block' }}>
        <NewSidebarButton />
      </Box>

      {/* Main Menu */}
      <List sx={{ flex: 1, py: 1, px: 0 }}>
        {/* Home */}
        <SectionTitle title="Home" />
        {primaryMenuItems.map((item) => (
          <MenuItem
            key={item.path}
            item={item}
            isActive={location.pathname === item.path}
            onClick={() => handleNavigation(item.path)}
          />
        ))}

        {/* Sales Section */}
        <Box sx={{ mt: 1, mb: 0.5 }}>
          <SectionTitle title="Sales" />
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => toggleSection('sales')}
              sx={{
                mx: 1,
                mb: 0.3,
                borderRadius: 0.5,
                backgroundColor: expandedSection === 'sales' ? qbColors.active : 'transparent',
                color: qbColors.text,
                fontWeight: 600,
                fontSize: '0.95rem',
                '&:hover': {
                  backgroundColor: expandedSection === 'sales' ? qbColors.active : qbColors.hover,
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: '#2563eb' }}>
                <ShoppingCart size={20} />
              </ListItemIcon>
              <ListItemText primary="Sales" sx={{ display: collapsed ? 'none' : 'block' }} />
              {!collapsed && (
                <ChevronDown
                  size={18}
                  style={{
                    transform: expandedSection === 'sales' ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    color: qbColors.textSecondary,
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>

          <Collapse in={expandedSection === 'sales' && !collapsed} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {salesMenuItems.filter(item => item.isChild).map((item) => (
                <MenuItem
                  key={item.path}
                  item={item}
                  isChild={true}
                  isActive={location.pathname === item.path}
                  onClick={() => handleNavigation(item.path)}
                />
              ))}
            </List>
          </Collapse>
        </Box>

        {/* Inventory Section */}
        <Box sx={{ mt: 1.5, mb: 0.5 }}>
          <SectionTitle title="Inventory" />
          {inventoryMenuItems.map((item) => (
            <MenuItem
              key={item.path}
              item={item}
              isActive={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
            />
          ))}
        </Box>

        {/* Repairs Section */}
        <Box sx={{ mt: 1.5, mb: 0.5 }}>
          <SectionTitle title="Repairs" />
          {repairsMenuItems.map((item) => (
            <MenuItem
              key={item.path}
              item={item}
              isActive={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
            />
          ))}
        </Box>

        {/* Analytics Section */}
        <Box sx={{ mt: 1.5, mb: 0.5 }}>
          <SectionTitle title="Analytics" />
          {analyticsMenuItems.map((item) => (
            <MenuItem
              key={item.path}
              item={item}
              isActive={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
            />
          ))}
        </Box>
      </List>

      <Divider sx={{ borderColor: qbColors.divider }} />

      {/* Bottom Menu */}
      <List sx={{ py: 1, px: 0 }}>
        {bottomMenuItems.map((item) => {
          const Icon = item.icon;
          return (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  mx: 1,
                  mb: 0.3,
                  borderRadius: 0.5,
                  color: qbColors.text,
                  fontSize: '0.9rem',
                  '&:hover': {
                    backgroundColor: qbColors.hover,
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: qbColors.textSecondary }}>
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
          position: 'fixed',
          left: 0,
          top: 0,
          width: collapsed ? '60px' : drawerWidth,
          height: '100vh',
          backgroundColor: '#2a2a2a',
          borderRight: `1px solid #404040`,
          overflow: 'auto',
          zIndex: 1200,
          transition: 'width 0.3s ease',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#2a2a2a',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#555555',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: '#777777',
            },
          },
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
            backgroundColor: '#2a2a2a',
          },
        }}
      >
        {sidebarContent}
      </Drawer>

      {/* Mobile Menu Button */}
      {onMenuClick && (
        <Fab
          onClick={onMenuClick}
          sx={{
            position: 'fixed',
            bottom: 16,
            left: 16,
            display: { xs: 'flex', sm: 'none' },
            bgcolor: '#2563eb',
            color: 'white',
            '&:hover': {
              bgcolor: '#1d4ed8',
            },
            zIndex: 1000,
          }}
        >
          <MenuIcon size={24} />
        </Fab>
      )}
    </>
  );
};
