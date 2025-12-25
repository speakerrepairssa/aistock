import React, { useState } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
} from '@mui/material';
import {
  Plus,
  FileText,
  Receipt,
  Users,
  Package,
  Wrench,
  DollarSign,
  Edit,
  Camera,
  TrendingUp,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const NewButton: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    handleClose();
  };

  const menuSections = [
    {
      title: 'Sales',
      items: [
        { label: 'Invoice', icon: Receipt, path: '/sales/invoices/new', description: 'Create a new invoice' },
        { label: 'Quotation', icon: FileText, path: '/sales/new', description: 'Create a new quote' },
        { label: 'Sales Receipt', icon: DollarSign, path: '/sales/receipts/new', description: 'Record a sale' },
        { label: 'Customer', icon: Users, path: '/customers/new', description: 'Add a new customer' },
      ],
    },
    {
      title: 'Inventory',
      items: [
        { label: 'Product', icon: Package, path: '/products/new', description: 'Add a new product' },
        { label: 'Stock Update', icon: TrendingUp, path: '/products/stock', description: 'Update stock levels' },
        { label: 'OCR Stock Scan', icon: Camera, path: '/ocr-scanner', description: 'Scan invoice for stock' },
      ],
    },
    {
      title: 'Repairs',
      items: [
        { label: 'Repair Job', icon: Wrench, path: '/repair/new', description: 'Create a repair job' },
        { label: 'Quick Estimate', icon: Edit, path: '/repair/estimate', description: 'Quick repair quote' },
      ],
    },
  ];

  const MenuSection: React.FC<{ title: string; items: any[] }> = ({ title, items }) => (
    <Box>
      <Typography
        variant="caption"
        sx={{
          px: 2,
          py: 1,
          color: 'text.secondary',
          fontWeight: 600,
          textTransform: 'uppercase',
          fontSize: '0.7rem',
          letterSpacing: 0.5,
          display: 'block',
        }}
      >
        {title}
      </Typography>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <MenuItem
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            sx={{
              px: 2,
              py: 1.5,
              '&:hover': {
                bgcolor: 'primary.50',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Icon size={18} color="#2563eb" />
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              secondary={item.description}
              primaryTypographyProps={{
                fontSize: '0.9rem',
                fontWeight: 500,
              }}
              secondaryTypographyProps={{
                fontSize: '0.75rem',
                color: 'text.secondary',
              }}
            />
          </MenuItem>
        );
      })}
    </Box>
  );

  return (
    <>
      <Button
        variant="contained"
        startIcon={<Plus size={18} />}
        onClick={handleClick}
        sx={{
          bgcolor: '#2563eb',
          '&:hover': {
            bgcolor: '#1d4ed8',
          },
          borderRadius: 1,
          textTransform: 'none',
          fontWeight: 600,
          px: 3,
          height: 40,
        }}
      >
        New
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        sx={{
          '& .MuiPaper-root': {
            mt: 1,
            minWidth: 280,
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            borderRadius: 2,
          },
        }}
      >
        {menuSections.map((section, index) => (
          <Box key={section.title}>
            <MenuSection title={section.title} items={section.items} />
            {index < menuSections.length - 1 && <Divider sx={{ my: 1 }} />}
          </Box>
        ))}
      </Menu>
    </>
  );
};