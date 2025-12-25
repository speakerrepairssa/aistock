import React from 'react';
import {
  Grid,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Divider,
} from '@mui/material';
import {
  Package,
  AlertCircle,
  TrendingUp,
  DollarSign,
  FileText,
  Receipt,
  Users,
  Wrench,
  Camera,
  BarChart3,
  Plus,
  Clock,
} from 'lucide-react';
import { DashboardWidget } from './DashboardWidget';
import { formatCurrencyWithCurrency } from '../utils/helpers';

// Stats Widget
interface StatsWidgetProps {
  stats: any;
  currency: string;
  onRemove?: () => void;
  customizable?: boolean;
  isEditing?: boolean;
}

export const StatsWidget: React.FC<StatsWidgetProps> = ({ stats, currency, onRemove, customizable, isEditing }) => (
  <DashboardWidget title="Inventory Overview" onRemove={onRemove} customizable={customizable} isEditing={isEditing}>
    <Grid container spacing={2}>
      <Grid item xs={6} sm={3}>
        <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <Package size={24} style={{ marginBottom: 8 }} />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>{stats?.totalProducts || 0}</Typography>
          <Typography variant="caption">Total Products</Typography>
        </Box>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
          <AlertCircle size={24} style={{ marginBottom: 8 }} />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>{stats?.lowStockCount || 0}</Typography>
          <Typography variant="caption">Low Stock</Typography>
        </Box>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', color: 'white' }}>
          <TrendingUp size={24} style={{ marginBottom: 8 }} />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>{stats?.outOfStockCount || 0}</Typography>
          <Typography variant="caption">Out of Stock</Typography>
        </Box>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
          <DollarSign size={24} style={{ marginBottom: 8 }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {formatCurrencyWithCurrency(stats?.totalInventoryValue || 0, currency as any)}
          </Typography>
          <Typography variant="caption">Inventory Value</Typography>
        </Box>
      </Grid>
    </Grid>
  </DashboardWidget>
);

// Quick Actions Widget
interface QuickActionsWidgetProps {
  onRemove?: () => void;
  customizable?: boolean;
  isEditing?: boolean;
}

export const QuickActionsWidget: React.FC<QuickActionsWidgetProps> = ({ onRemove, customizable, isEditing }) => (
  <DashboardWidget title="Quick Actions" onRemove={onRemove} customizable={customizable} isEditing={isEditing}>
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<Receipt size={18} />}
          sx={{ py: 2, borderRadius: 2 }}
        >
          New Invoice
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<FileText size={18} />}
          sx={{ py: 2, borderRadius: 2 }}
        >
          New Quote
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<Package size={18} />}
          sx={{ py: 2, borderRadius: 2 }}
        >
          Add Product
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<Users size={18} />}
          sx={{ py: 2, borderRadius: 2 }}
        >
          Add Customer
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<Wrench size={18} />}
          sx={{ py: 2, borderRadius: 2 }}
        >
          New Repair
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<Camera size={18} />}
          sx={{ py: 2, borderRadius: 2 }}
        >
          OCR Scanner
        </Button>
      </Grid>
    </Grid>
  </DashboardWidget>
);

// Recent Activity Widget
interface RecentActivityWidgetProps {
  onRemove?: () => void;
  customizable?: boolean;
  isEditing?: boolean;
}

export const RecentActivityWidget: React.FC<RecentActivityWidgetProps> = ({ onRemove, customizable, isEditing }) => (
  <DashboardWidget title="Recent Activity" onRemove={onRemove} customizable={customizable} isEditing={isEditing}>
    <List dense>
      <ListItem>
        <ListItemIcon>
          <Package size={20} color="#2563eb" />
        </ListItemIcon>
        <ListItemText
          primary="Added new product: Speaker Wire"
          secondary="2 minutes ago"
        />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemIcon>
          <Receipt size={20} color="#059669" />
        </ListItemIcon>
        <ListItemText
          primary="Invoice #1234 created"
          secondary="15 minutes ago"
        />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemIcon>
          <AlertCircle size={20} color="#dc2626" />
        </ListItemIcon>
        <ListItemText
          primary="Low stock alert: Speaker Drivers"
          secondary="1 hour ago"
        />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemIcon>
          <Wrench size={20} color="#7c3aed" />
        </ListItemIcon>
        <ListItemText
          primary="Repair job completed"
          secondary="3 hours ago"
        />
      </ListItem>
    </List>
  </DashboardWidget>
);

// Tasks Widget
interface TasksWidgetProps {
  onRemove?: () => void;
  customizable?: boolean;
  isEditing?: boolean;
}

export const TasksWidget: React.FC<TasksWidgetProps> = ({ onRemove, customizable, isEditing }) => (
  <DashboardWidget title="Tasks & Reminders" onRemove={onRemove} customizable={customizable} isEditing={isEditing}>
    <List dense>
      <ListItem>
        <ListItemIcon>
          <Clock size={18} color="#dc2626" />
        </ListItemIcon>
        <ListItemText
          primary="Order more stock"
          secondary="Due today"
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <Clock size={18} color="#f59e0b" />
        </ListItemIcon>
        <ListItemText
          primary="Follow up with customer"
          secondary="Due tomorrow"
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <Plus size={18} color="#6b7280" />
        </ListItemIcon>
        <ListItemText primary="Add new task..." />
      </ListItem>
    </List>
  </DashboardWidget>
);

// Analytics Widget
interface AnalyticsWidgetProps {
  onRemove?: () => void;
  customizable?: boolean;
  isEditing?: boolean;
}

export const AnalyticsWidget: React.FC<AnalyticsWidgetProps> = ({ onRemove, customizable, isEditing }) => (
  <DashboardWidget title="Sales Analytics" onRemove={onRemove} customizable={customizable} isEditing={isEditing}>
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <BarChart3 size={48} color="#6b7280" style={{ marginBottom: 16 }} />
      <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
        Sales Analytics
      </Typography>
      <Typography color="textSecondary">
        Connect your sales data to see analytics
      </Typography>
    </Box>
  </DashboardWidget>
);