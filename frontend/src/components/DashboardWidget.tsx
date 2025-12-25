import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { MoreVertical, X, Settings } from 'lucide-react';

interface DashboardWidgetProps {
  title: string;
  children: React.ReactNode;
  onRemove?: () => void;
  onSettings?: () => void;
  customizable?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  isEditing?: boolean;
}

export const DashboardWidget: React.FC<DashboardWidgetProps> = ({
  title,
  children,
  onRemove,
  onSettings,
  customizable = true,
  size = 'medium',
  color,
  isEditing = false,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getSizeProps = () => {
    switch (size) {
      case 'small':
        return { minHeight: 200, xs: 12, sm: 6, md: 4 };
      case 'medium':
        return { minHeight: 300, xs: 12, sm: 12, md: 6 };
      case 'large':
        return { minHeight: 400, xs: 12, sm: 12, md: 12 };
      default:
        return { minHeight: 300, xs: 12, sm: 12, md: 6 };
    }
  };

  const sizeProps = getSizeProps();

  return (
    <Card
      sx={{
        height: '100%',
        minHeight: sizeProps.minHeight,
        position: 'relative',
        background: color || '#ffffff',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: customizable ? '0 8px 25px rgba(0,0,0,0.15)' : undefined,
        },
      }}
    >
      {customizable && !isEditing && (
        <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
          <IconButton size="small" onClick={handleMenuOpen}>
            <MoreVertical size={16} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {onSettings && (
              <MenuItem onClick={() => { onSettings(); handleMenuClose(); }}>
                <Settings size={16} style={{ marginRight: 8 }} />
                Settings
              </MenuItem>
            )}
            {onRemove && (
              <MenuItem onClick={() => { onRemove(); handleMenuClose(); }}>
                <X size={16} style={{ marginRight: 8 }} />
                Remove
              </MenuItem>
            )}
          </Menu>
        </Box>
      )}
      
      <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          {title}
        </Typography>
        <Box sx={{ flex: 1 }}>
          {children}
        </Box>
      </CardContent>
    </Card>
  );
};