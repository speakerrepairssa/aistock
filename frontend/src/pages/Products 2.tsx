import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  TextField,
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
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Search, Plus } from 'lucide-react';
import { useProducts } from '../hooks';
import { useAuth } from '../hooks';
import { Product } from '../types';
import { formatCurrency, getStockStatus, getStockStatusColor } from '../utils';

export const Products: React.FC = () => {
  const { products, loading, error, fetchProducts, updateProductQuantity } = useProducts();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [reason, setReason] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(
          (p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, products]);

  const handleUpdateQuantity = async () => {
    if (!selectedProduct || !user) return;

    try {
      await updateProductQuantity(selectedProduct.id, quantity, reason, user.uid);
      setOpenDialog(false);
      setSelectedProduct(null);
      setQuantity(0);
      setReason('');
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '2rem', fontWeight: 600 }}>Products</h1>
          <p style={{ margin: 0, color: '#666' }}>Manage your inventory items</p>
        </Box>
        <Button variant="contained" startIcon={<Plus size={20} />} sx={{ textTransform: 'none' }}>
          Add Product
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Paper sx={{ mb: 3, p: 2 }}>
        <TextField
          fullWidth
          placeholder="Search by product name, SKU, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <Search size={20} style={{ marginRight: 12, color: '#999' }} />,
          }}
        />
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#fafafa' }}>
              <TableCell sx={{ fontWeight: 600 }}>SKU</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Product Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Price</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Quantity</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Reorder Level</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => {
              const status = getStockStatus(product.quantity, product.reorderLevel);
              const statusColor = getStockStatusColor(status);

              return (
                <TableRow key={product.id} hover>
                  <TableCell sx={{ fontFamily: 'monospace', fontWeight: 500 }}>{product.sku}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell align="right">{formatCurrency(product.price)}</TableCell>
                  <TableCell align="right">{product.quantity}</TableCell>
                  <TableCell align="right">{product.reorderLevel}</TableCell>
                  <TableCell>
                    <Chip
                      label={status.replace('-', ' ')}
                      size="small"
                      sx={{
                        backgroundColor: statusColor,
                        color: 'white',
                        textTransform: 'capitalize',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      onClick={() => {
                        setSelectedProduct(product);
                        setOpenDialog(true);
                      }}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredProducts.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <p style={{ color: '#999' }}>No products found</p>
        </Box>
      )}

      {/* Update Quantity Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Update Stock Quantity</DialogTitle>
        <DialogContent sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {selectedProduct && (
            <>
              <Box>
                <strong>{selectedProduct.name}</strong>
                <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '0.875rem' }}>
                  Current: {selectedProduct.quantity} | Reorder Level: {selectedProduct.reorderLevel}
                </p>
              </Box>
              <TextField
                type="number"
                label="Quantity Change"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                helperText="Positive for stock in, negative for stock out"
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel>Reason</InputLabel>
                <Select
                  value={reason}
                  label="Reason"
                  onChange={(e) => setReason(e.target.value)}
                >
                  <MenuItem value="purchase">Purchase</MenuItem>
                  <MenuItem value="sale">Sale</MenuItem>
                  <MenuItem value="inventory_count">Inventory Count</MenuItem>
                  <MenuItem value="damage">Damage/Loss</MenuItem>
                  <MenuItem value="return">Return</MenuItem>
                  <MenuItem value="adjustment">Adjustment</MenuItem>
                </Select>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdateQuantity} variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
