import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  IconButton,
} from '@mui/material';
import { TrendingUp, AlertCircle, Package, DollarSign, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { useProducts } from '../hooks';
import { formatCurrencyWithCurrency } from '../utils/helpers';
import { useSettings } from '../store/settingsStore';

export const Dashboard: React.FC = () => {
  const { fetchStats, stats, loading, products, fetchProducts, error } = useProducts();
  const { currency } = useSettings();
  const [refreshing, setRefreshing] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(true);
  const [showLowStock, setShowLowStock] = useState(true);
  const [showOutOfStock, setShowOutOfStock] = useState(true);

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

  const lowStockProducts = products.filter(
    (p) => p.quantity > 0 && p.quantity <= p.reorderLevel
  );

  const outOfStockProducts = products.filter((p) => p.quantity === 0);

  console.log('Dashboard render - stats:', stats, 'products:', products.length);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
            Dashboard
          </Typography>
          <Typography color="textSecondary">
            Real-time inventory overview and analytics
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={refreshing ? <CircularProgress size={20} /> : <RefreshCw size={20} />}
          onClick={handleRefresh}
          disabled={refreshing}
        >
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
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

      {/* Stats Cards */}
      {!loading && stats && (
        <>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* Total Products */}
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography color="rgba(255, 255, 255, 0.7)" variant="subtitle2" sx={{ mb: 1 }}>
                        Total Products
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {stats.totalProducts}
                      </Typography>
                    </Box>
                    <Package size={32} style={{ opacity: 0.7 }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Low Stock */}
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography color="rgba(255, 255, 255, 0.7)" variant="subtitle2" sx={{ mb: 1 }}>
                        Low Stock
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {stats.lowStockCount}
                      </Typography>
                    </Box>
                    <AlertCircle size={32} style={{ opacity: 0.7 }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Out of Stock */}
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', color: 'white' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography color="rgba(255, 255, 255, 0.7)" variant="subtitle2" sx={{ mb: 1 }}>
                        Out of Stock
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {stats.outOfStockCount}
                      </Typography>
                    </Box>
                    <TrendingUp size={32} style={{ opacity: 0.7 }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Inventory Value */}
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography color="rgba(255, 255, 255, 0.7)" variant="subtitle2" sx={{ mb: 1 }}>
                        Inventory Value
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {formatCurrencyWithCurrency(stats.totalInventoryValue, currency)}
                      </Typography>
                    </Box>
                    <DollarSign size={32} style={{ opacity: 0.7 }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Products Table */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            mb: 2,
            p: 2,
            borderRadius: 2,
            backgroundColor: !showAllProducts ? '#7c3aed' : '#f3e8ff',
            transition: 'backgroundColor 0.3s ease',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: !showAllProducts ? '#6d28d9' : '#ede9fe',
            }
          }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: !showAllProducts ? 'white' : '#5b21b6' }}>
              All Products ({products.length})
            </Typography>
            <IconButton
              size="small"
              onClick={() => setShowAllProducts(!showAllProducts)}
              sx={{ p: 0.5, color: !showAllProducts ? 'white' : '#5b21b6' }}
            >
              {showAllProducts ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </IconButton>
          </Box>
          {showAllProducts && <Paper sx={{ p: 2, mb: 3 }}>
            {products.length === 0 ? (
              <Typography color="textSecondary" sx={{ textAlign: 'center', py: 3 }}>
                No products yet. Go to Products page to add some.
              </Typography>
            ) : (
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>SKU</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Quantity</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Price</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Total Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.slice(0, 10).map((p) => (
                      <TableRow key={p.id} hover>
                        <TableCell>{p.name}</TableCell>
                        <TableCell>{p.sku}</TableCell>
                        <TableCell align="right">{p.quantity}</TableCell>
                        <TableCell align="right">{formatCurrencyWithCurrency(p.price, currency)}</TableCell>
                        <TableCell align="right">{formatCurrencyWithCurrency(p.costPrice * p.quantity, currency)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>}

          {/* Low Stock Products */}
          {lowStockProducts.length > 0 && (
            <>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                mb: 2,
                p: 2,
                borderRadius: 2,
                backgroundColor: !showLowStock ? '#ec4899' : '#fce7f3',
                transition: 'backgroundColor 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: !showLowStock ? '#db2777' : '#fbcfe8',
                }
              }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: !showLowStock ? 'white' : '#831843' }}>
                  ⚠️ Low Stock Items ({lowStockProducts.length})
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setShowLowStock(!showLowStock)}
                  sx={{ p: 0.5, color: !showLowStock ? 'white' : '#831843' }}
                >
                  {showLowStock ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </IconButton>
              </Box>
              {showLowStock && <Paper sx={{ p: 2, mb: 3, backgroundColor: '#fff3e0' }}>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#ffe0b2' }}>
                      <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>SKU</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Current</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Reorder Level</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {lowStockProducts.map((p) => (
                      <TableRow key={p.id} hover>
                        <TableCell>{p.name}</TableCell>
                        <TableCell>{p.sku}</TableCell>
                        <TableCell align="right">{p.quantity}</TableCell>
                        <TableCell align="right">{p.reorderLevel}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              </Paper>}
            </>
          )}

          {/* Out of Stock Products */}
          {outOfStockProducts.length > 0 && (
            <>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                mb: 2,
                p: 2,
                borderRadius: 2,
                backgroundColor: !showOutOfStock ? '#f59e0b' : '#fef3c7',
                transition: 'backgroundColor 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: !showOutOfStock ? '#d97706' : '#fef08a',
                }
              }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: !showOutOfStock ? 'white' : '#92400e' }}>
                  🔴 Out of Stock Items ({outOfStockProducts.length})
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setShowOutOfStock(!showOutOfStock)}
                  sx={{ p: 0.5, color: !showOutOfStock ? 'white' : '#92400e' }}
                >
                  {showOutOfStock ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </IconButton>
              </Box>
              {showOutOfStock && <Paper sx={{ p: 2, backgroundColor: '#ffebee' }}>
              {products.length === 0 ? (
                <Typography color="textSecondary" sx={{ textAlign: 'center', py: 3 }}>
                  No out of stock items.
                </Typography>
              ) : (
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#ffcdd2' }}>
                      <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>SKU</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Reorder Level</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {outOfStockProducts.map((p) => (
                      <TableRow key={p.id} hover>
                        <TableCell>{p.name}</TableCell>
                        <TableCell>{p.sku}</TableCell>
                        <TableCell>{p.category}</TableCell>
                        <TableCell align="right">{p.reorderLevel}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              )}
              </Paper>}
            </>
          )}
        </>
      )}
    </Container>
  );
};
