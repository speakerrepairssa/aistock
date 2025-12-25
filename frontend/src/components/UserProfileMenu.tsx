import React from 'react';
import {
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import { LogOut } from 'lucide-react';
import { useAuth } from '../hooks';

export const UserProfileMenu: React.FC = () => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    handleMenuClose();
  };

  return (
    <Box>
      <Button
        onClick={handleMenuOpen}
        sx={{ 
          textTransform: 'none', 
          color: '#666666',
          minWidth: 'auto',
          p: 1,
          borderRadius: 2,
          '&:hover': {
            bgcolor: '#f5f5f5',
          }
        }}
      >
        <Avatar
          sx={{
            width: 32,
            height: 32,
            bgcolor: '#2563eb',
          }}
        >
          {user?.email?.charAt(0).toUpperCase()}
        </Avatar>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          '& .MuiPaper-root': {
            mt: 1,
            minWidth: 180,
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            borderRadius: 2,
          },
        }}
      >
        <MenuItem disabled sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
          {user?.displayName || user?.email}
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ fontSize: '0.875rem' }}>
          Profile Settings
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ fontSize: '0.875rem' }}>
          <LogOut size={18} style={{ marginRight: 8 }} />
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};