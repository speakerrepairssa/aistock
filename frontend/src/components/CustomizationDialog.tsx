import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Switch,
  FormControlLabel,
  Divider,
} from '@mui/material';
import {
  Settings,
} from 'lucide-react';

interface Widget {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  size: 'small' | 'medium' | 'large';
}

interface CustomizationDialogProps {
  open: boolean;
  onClose: () => void;
  widgets: Widget[];
  onToggleWidget: (widgetId: string) => void;
  onSave: () => void;
}

export const CustomizationDialog: React.FC<CustomizationDialogProps> = ({
  open,
  onClose,
  widgets,
  onToggleWidget,
  onSave,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Settings size={24} color="#2563eb" />
          <Typography variant="h6">Customize Dashboard</Typography>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Typography color="textSecondary" sx={{ mb: 3 }}>
          Choose which widgets to display on your dashboard. You can always change these settings later.
        </Typography>

        <Grid container spacing={2}>
          {widgets.map((widget) => (
            <Grid item xs={12} sm={6} key={widget.id}>
              <Card
                sx={{
                  border: widget.enabled ? '2px solid #2563eb' : '1px solid #e5e7eb',
                  backgroundColor: widget.enabled ? '#f0f9ff' : 'transparent',
                  transition: 'all 0.2s ease',
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                      <Box sx={{ color: widget.enabled ? '#2563eb' : '#6b7280' }}>
                        {widget.icon}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600 }}>
                          {widget.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
                          {widget.description}
                        </Typography>
                        <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                          Size: {widget.size}
                        </Typography>
                      </Box>
                    </Box>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={widget.enabled}
                          onChange={() => onToggleWidget(widget.id)}
                          color="primary"
                        />
                      }
                      label=""
                      sx={{ m: 0 }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="textSecondary">
            💡 Tip: You can also remove widgets individually by clicking the menu (⋮) on each widget
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave} variant="contained">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};