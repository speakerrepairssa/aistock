import React, { useState } from 'react';
import {
  Button,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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

export const NewSidebarButton: React.FC = () => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [isMainHovered, setIsMainHovered] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    setHoveredSection(null);
    setIsMainHovered(false);
  };

  const menuSections = [
    {
      id: 'sales',
      title: 'Sales',
      items: [
        { label: 'Invoice', icon: Receipt, path: '/sales/invoices/new' },
        { label: 'Quotation', icon: FileText, path: '/sales/new' },
        { label: 'Sales Receipt', icon: DollarSign, path: '/sales/receipts/new' },
        { label: 'Customer', icon: Users, path: '/customers/new' },
      ],
    },
    {
      id: 'inventory',
      title: 'Inventory',
      items: [
        { label: 'Product', icon: Package, path: '/products/new' },
        { label: 'Stock Update', icon: TrendingUp, path: '/products/stock' },
        { label: 'OCR Stock Scan', icon: Camera, path: '/ocr-scanner' },
      ],
    },
    {
      id: 'repairs',
      title: 'Repairs',
      items: [
        { label: 'Repair Job', icon: Wrench, path: '/repair/new' },
        { label: 'Quick Estimate', icon: Edit, path: '/repair/estimate' },
      ],
    },
  ];

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      {/* New Button */}
      <Button
        variant="contained"
        startIcon={<Plus size={18} />}
        onMouseEnter={() => setIsMainHovered(true)}
        onMouseLeave={() => {
          setTimeout(() => {
            if (!hoveredSection) {
              setIsMainHovered(false);
            }
          }, 150);
        }}
        sx={{
          bgcolor: '#2563eb',
          '&:hover': {
            bgcolor: '#1d4ed8',
          },
          borderRadius: 1,
          textTransform: 'none',
          fontWeight: 600,
          width: 'calc(100% - 16px)',
          height: 44,
          mb: 2,
          mx: 1,
          color: '#ffffff',
        }}
      >
        New
      </Button>

      {/* Cascading Menu */}
      {isMainHovered && (
        <Paper
          onMouseEnter={() => {
            setIsMainHovered(true);
            setHoveredSection(null);
          }}
          onMouseLeave={() => {
            setIsMainHovered(false);
            setHoveredSection(null);
          }}
          sx={{
            position: 'absolute',
            left: '100%',
            top: 0,
            ml: 1,
            minWidth: 220,
            maxHeight: 400,
            overflow: 'auto',
            zIndex: 1350, // Higher z-index for fixed sidebar
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            borderRadius: 2,
          }}
        >
          <List sx={{ py: 1 }}>
            {menuSections.map((section) => (
              <Box key={section.id} sx={{ position: 'relative' }}>
                <ListItem
                  disablePadding
                  onMouseEnter={() => setHoveredSection(section.id)}
                  onMouseLeave={() => {
                    setTimeout(() => {
                      if (hoveredSection === section.id) {
                        setHoveredSection(null);
                      }
                    }, 100);
                  }}
                >
                  <ListItemButton
                    sx={{
                      px: 2,
                      py: 1.5,
                      backgroundColor: hoveredSection === section.id ? '#f3f4f6' : 'transparent',
                      '&:hover': {
                        backgroundColor: '#f3f4f6',
                      },
                    }}
                  >
                    <ListItemText
                      primary={section.title}
                      primaryTypographyProps={{
                        fontWeight: 600,
                        fontSize: '0.9rem',
                      }}
                    />
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                      ▶
                    </Typography>
                  </ListItemButton>
                </ListItem>

                {/* Submenu */}
                {hoveredSection === section.id && (
                  <Paper
                    onMouseEnter={() => setHoveredSection(section.id)}
                    onMouseLeave={() => setHoveredSection(null)}
                    sx={{
                      position: 'absolute',
                      left: '100%',
                      top: 0,
                      ml: 0.5,
                      minWidth: 240,
                      zIndex: 1351, // Higher z-index for submenu
                      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                      borderRadius: 2,
                    }}
                  >
                    <List sx={{ py: 1 }}>
                      {section.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <ListItem key={item.path} disablePadding>
                            <ListItemButton
                              onClick={() => handleNavigation(item.path)}
                              sx={{
                                px: 2,
                                py: 1.5,
                                '&:hover': {
                                  backgroundColor: '#e3f2fd',
                                },
                              }}
                            >
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                <Icon size={18} color="#2563eb" />
                              </ListItemIcon>
                              <ListItemText
                                primary={item.label}
                                primaryTypographyProps={{
                                  fontSize: '0.9rem',
                                  fontWeight: 500,
                                }}
                              />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Paper>
                )}
              </Box>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};