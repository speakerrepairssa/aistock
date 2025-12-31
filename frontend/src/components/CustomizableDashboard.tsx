import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Button,
  CircularProgress,
  Alert,
  Box,
  Fab,
} from '@mui/material';
import { RefreshCw, Settings, Plus } from 'lucide-react';
import { useProducts } from '../hooks';
import { useSettings } from '../store/settingsStore';
import {
  StatsWidget,
  QuickActionsWidget,
  RecentActivityWidget,
  TasksWidget,
  AnalyticsWidget,
} from './DashboardWidgets';
import { CustomizationDialog } from './CustomizationDialog';

interface Widget {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  size: 'small' | 'medium' | 'large';
  component: React.ComponentType<any>;
}

const defaultWidgets: Widget[] = [
  {
    id: 'stats',
    title: 'Inventory Overview',
    description: 'Quick stats about your inventory',
    icon: <Settings size={20} />,
    enabled: true,
    size: 'large',
    component: StatsWidget,
  },
  {
    id: 'quickActions',
    title: 'Quick Actions',
    description: 'Shortcuts to common tasks',
    icon: <Plus size={20} />,
    enabled: true,
    size: 'medium',
    component: QuickActionsWidget,
  },
  {
    id: 'recentActivity',
    title: 'Recent Activity',
    description: 'Latest actions and updates',
    icon: <Settings size={20} />,
    enabled: true,
    size: 'medium',
    component: RecentActivityWidget,
  },
  {
    id: 'tasks',
    title: 'Tasks & Reminders',
    description: 'Your to-do list and reminders',
    icon: <Settings size={20} />,
    enabled: false,
    size: 'small',
    component: TasksWidget,
  },
  {
    id: 'analytics',
    title: 'Sales Analytics',
    description: 'Charts and insights',
    icon: <Settings size={20} />,
    enabled: false,
    size: 'medium',
    component: AnalyticsWidget,
  },
];

export const CustomizableDashboard: React.FC = () => {
  const { fetchStats, stats, loading, fetchProducts, error } = useProducts();
  const { currency } = useSettings();
  const [refreshing, setRefreshing] = useState(false);
  const [customizationOpen, setCustomizationOpen] = useState(false);
  const [widgets, setWidgets] = useState<Widget[]>(defaultWidgets);

  // Load widget configuration from localStorage
  useEffect(() => {
    const savedConfig = localStorage.getItem('dashboardWidgets');
    if (savedConfig) {
      try {
        const savedWidgets = JSON.parse(savedConfig);
        setWidgets(prevWidgets =>
          prevWidgets.map(widget => {
            const saved = savedWidgets.find((s: any) => s.id === widget.id);
            return saved ? { ...widget, enabled: saved.enabled } : widget;
          })
        );
      } catch (error) {
        console.error('Failed to load widget configuration:', error);
      }
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      console.log('Dashboard: Loading stats and products...');
      await Promise.all([fetchStats(), fetchProducts()]);
    };
    loadData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([fetchStats(), fetchProducts()]);
    } finally {
      setRefreshing(false);
    }
  };

  const handleToggleWidget = (widgetId: string) => {
    setWidgets(prev =>
      prev.map(widget =>
        widget.id === widgetId ? { ...widget, enabled: !widget.enabled } : widget
      )
    );
  };

  const handleRemoveWidget = (widgetId: string) => {
    setWidgets(prev =>
      prev.map(widget =>
        widget.id === widgetId ? { ...widget, enabled: false } : widget
      )
    );
    saveWidgetConfiguration(
      widgets.map(widget =>
        widget.id === widgetId ? { ...widget, enabled: false } : widget
      )
    );
  };

  const saveWidgetConfiguration = (widgetConfig: Widget[]) => {
    const configToSave = widgetConfig.map(({ id, enabled }) => ({ id, enabled }));
    localStorage.setItem('dashboardWidgets', JSON.stringify(configToSave));
  };

  const handleSaveCustomization = () => {
    saveWidgetConfiguration(widgets);
    setCustomizationOpen(false);
  };

  const enabledWidgets = widgets.filter(widget => widget.enabled);

  console.log('Dashboard render - stats:', stats, 'widgets:', enabledWidgets.length);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
            Dashboard
          </Typography>
          <Typography color="textSecondary">
            Customizable overview of your business
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Settings size={20} />}
            onClick={() => setCustomizationOpen(true)}
          >
            Customize
          </Button>
          <Button
            variant="contained"
            startIcon={refreshing ? <CircularProgress size={20} /> : <RefreshCw size={20} />}
            onClick={handleRefresh}
            disabled={refreshing}
          >
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </Box>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Widgets Grid */}
      {!loading && (
        <>
          {enabledWidgets.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Settings size={48} color="#6b7280" style={{ marginBottom: 16 }} />
              <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
                No widgets enabled
              </Typography>
              <Typography color="textSecondary" sx={{ mb: 3 }}>
                Customize your dashboard to add widgets and get started.
              </Typography>
              <Button
                variant="contained"
                startIcon={<Settings size={20} />}
                onClick={() => setCustomizationOpen(true)}
              >
                Customize Dashboard
              </Button>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {enabledWidgets.map((widget) => {
                const WidgetComponent = widget.component;
                const gridProps = getGridProps(widget.size);
                
                return (
                  <Grid item {...gridProps} key={widget.id}>
                    <WidgetComponent
                      stats={stats}
                      currency={currency}
                      onRemove={() => handleRemoveWidget(widget.id)}
                    />
                  </Grid>
                );
              })}
            </Grid>
          )}
        </>
      )}

      {/* Floating Add Button */}
      {enabledWidgets.length > 0 && (
        <Fab
          onClick={() => setCustomizationOpen(true)}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            bgcolor: '#2563eb',
            color: 'white',
            '&:hover': {
              bgcolor: '#1d4ed8',
            },
          }}
        >
          <Plus size={24} />
        </Fab>
      )}

      {/* Customization Dialog */}
      <CustomizationDialog
        open={customizationOpen}
        onClose={() => setCustomizationOpen(false)}
        widgets={widgets}
        onToggleWidget={handleToggleWidget}
        onSave={handleSaveCustomization}
      />
    </Container>
  );
};

// Helper function to get grid properties based on widget size
const getGridProps = (size: 'small' | 'medium' | 'large') => {
  switch (size) {
    case 'small':
      return { xs: 12, sm: 6, md: 4 };
    case 'medium':
      return { xs: 12, sm: 12, md: 6 };
    case 'large':
      return { xs: 12, sm: 12, md: 12 };
    default:
      return { xs: 12, sm: 12, md: 6 };
  }
};