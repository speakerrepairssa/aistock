import React from 'react';
import { Grid, Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import { TrendingUp, AlertCircle, Package, DollarSign } from 'lucide-react';
import { useProducts } from '../hooks';
import { formatCurrency, formatNumber } from '../utils';

export const StatsCards: React.FC = () => {
  const { stats } = useProducts();

  if (!stats) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  const statItems = [
    {
      title: 'Total Products',
      value: formatNumber(stats.totalProducts),
      icon: Package,
      color: 'primary',
      backgroundColor: '#E3F2FD',
    },
    {
      title: 'Low Stock Items',
      value: formatNumber(stats.lowStockCount),
      icon: AlertCircle,
      color: 'warning',
      backgroundColor: '#FFF3E0',
    },
    {
      title: 'Out of Stock',
      value: formatNumber(stats.outOfStockCount),
      icon: TrendingUp,
      color: 'error',
      backgroundColor: '#FFEBEE',
    },
    {
      title: 'Inventory Value',
      value: formatCurrency(stats.totalInventoryValue),
      icon: DollarSign,
      color: 'success',
      backgroundColor: '#E8F5E9',
    },
  ];

  return (
    <Grid container spacing={2}>
      {statItems.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                backgroundColor: stat.backgroundColor,
                border: `1px solid ${stat.backgroundColor}`,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="textSecondary" gutterBottom variant="subtitle2">
                      {stat.title}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      p: 1.5,
                      backgroundColor: 'white',
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={24} style={{ color: `var(--${stat.color})` }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
