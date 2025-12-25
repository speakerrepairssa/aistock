import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';
import { LogOut, Menu as MenuIcon } from 'lucide-react';
import { useAuth } from '../hooks';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
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
    <AppBar position="sticky" sx={{ zIndex: 1201 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon size={24} />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
          AiStock
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            onClick={handleMenuOpen}
            sx={{ textTransform: 'none', color: 'white' }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: 'secondary.main',
                mr: 1,
              }}
            >
              {user?.email?.charAt(0).toUpperCase()}
            </Avatar>
            <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
              {user?.email}
            </Typography>
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem disabled>{user?.displayName || user?.email}</MenuItem>
            <MenuItem onClick={handleMenuClose}>Profile Settings</MenuItem>
            <MenuItem onClick={handleLogout}>
              <LogOut size={18} style={{ marginRight: 8 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
