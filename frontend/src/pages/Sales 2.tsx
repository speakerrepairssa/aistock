import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import { ShoppingCart, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../hooks';
import { useQuotationStore } from '../store/quotationStore';
import { useProducts } from '../hooks';
import { useSettings } from '../store/settingsStore';
import { formatCurrencyWithCurrency } from '../utils/helpers';
import { Quotation, QuotationItem } from '../types';

export const Sales: React.FC = () => {
  const { user } = useAuth();
  const { products } = useProducts();
  const { currency } = useSettings();
  const {
    quotations,
    loading,
    error,
    fetchQuotations,
    createQuotation,
    bookOutQuotation,
    deleteQuotation,
  } = useQuotationStore();

  const [openDialog, setOpenDialog] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState<QuotationItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [notes, setNotes] = useState('');
  const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);

  useEffect(() => {
    if (user?.uid) {
      fetchQuotations(user.uid);
    }
  }, [user]);

  const handleAddItem = () => {
    if (!selectedProduct || !quantity) return;

    const product = products.find((p) => p.id === selectedProduct);
    if (!product) return;

    const qty = parseInt(quantity);
    const total = product.price * qty;

    const newItem: QuotationItem = {
      productId: product.id,
      productName: product.name,
      quantity: qty,
      price: product.price,
      total,
    };

    setItems([...items, newItem]);
    setSelectedProduct('');
    setQuantity('1');
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleCreateQuotation = async () => {
    if (!customerName || items.length === 0) {
      alert('Please enter customer name and add items');
      return;
    }

    try {
      await createQuotation(user?.uid || '', customerName, items, notes);
      setOpenDialog(false);
      setCustomerName('');
      setItems([]);
      setNotes('');
      if (user?.uid) {
        await fetchQuotations(user.uid);
      }
    } catch (err) {
      alert('Failed to create quotation');
    }
  };

  const handleBookOut = async (quotation: Quotation) => {
    if (window.confirm('This will reduce stock quantities. Continue?')) {
      try {
        await bookOutQuotation(quotation.id, quotation);
        if (user?.uid) {
          await fetchQuotations(user.uid);
        }
      } catch (err) {
        alert('Failed to book out quotation');
      }
    }
  };

  const handleDeleteQuotation = async (id: string) => {
    if (window.confirm('Delete this quotation?')) {
      try {
        await deleteQuotation(id);
      } catch (err) {
        alert('Failed to delete quotation');
      }
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'default';
      case 'confirmed':
        return 'warning';
      case 'booked-out':
        return 'success';
      case 'delivered':
        return 'info';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading && quotations.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <ShoppingCart size={32} />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Sales Dashboard
            </Typography>
            <Typography color="textSecondary">
              Create quotations and manage bookings
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={() => setOpenDialog(true)}
          sx={{ textTransform: 'none' }}
        >
          New Quotation
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Quotations Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 600 }}>Quotation #</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Items</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Total Value</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quotations.map((quotation) => (
              <TableRow key={quotation.id}>
                <TableCell sx={{ fontFamily: 'monospace' }}>{quotation.quotationNumber}</TableCell>
                <TableCell>{quotation.customerName}</TableCell>
                <TableCell align="right">{quotation.items.length}</TableCell>
                <TableCell align="right">{formatCurrencyWithCurrency(quotation.total, currency)}</TableCell>
                <TableCell>
                  <Chip
                    label={quotation.status.replace('-', ' ').toUpperCase()}
                    color={getStatusColor(quotation.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{new Date(quotation.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        setSelectedQuotation(quotation);
                        setOpenViewDialog(true);
                      }}
                    >
                      View
                    </Button>
                    {quotation.status === 'draft' && (
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        onClick={() => handleBookOut(quotation)}
                      >
                        Book Out
                      </Button>
                    )}
                    {quotation.status === 'draft' && (
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        startIcon={<Trash2 size={16} />}
                        onClick={() => handleDeleteQuotation(quotation.id)}
                      >
                        Delete
                      </Button>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {quotations.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography color="textSecondary">No quotations yet. Create one to get started.</Typography>
        </Box>
      )}

      {/* Create Quotation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create New Quotation</DialogTitle>
        <DialogContent sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            fullWidth
            required
          />

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Add Items
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  select
                  label="Product"
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  fullWidth
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="">Select a product</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} - {formatCurrencyWithCurrency(p.price, currency)} (Stock: {p.quantity})
                    </option>
                  ))}
                </TextField>

                <TextField
                  label="Quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  sx={{ width: 120 }}
                  inputProps={{ min: 1 }}
                />

                <Button
                  variant="contained"
                  onClick={handleAddItem}
                  sx={{ textTransform: 'none' }}
                >
                  Add
                </Button>
              </Box>

              {/* Items Table */}
              {items.length > 0 && (
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Qty</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {items.map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{item.productName}</TableCell>
                          <TableCell align="right">{item.quantity}</TableCell>
                          <TableCell align="right">{formatCurrencyWithCurrency(item.price, currency)}</TableCell>
                          <TableCell align="right">{formatCurrencyWithCurrency(item.total, currency)}</TableCell>
                          <TableCell>
                            <Button
                              size="small"
                              color="error"
                              onClick={() => handleRemoveItem(idx)}
                            >
                              Remove
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}

              {/* Totals */}
              <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #e0e0e0' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 1 }}>
                  <Typography>Subtotal:</Typography>
                  <Typography sx={{ fontWeight: 600, minWidth: 100, textAlign: 'right' }}>
                    {formatCurrencyWithCurrency(subtotal, currency)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 2 }}>
                  <Typography>Tax (10%):</Typography>
                  <Typography sx={{ fontWeight: 600, minWidth: 100, textAlign: 'right' }}>
                    {formatCurrencyWithCurrency(tax, currency)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, p: 1, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                  <Typography sx={{ fontWeight: 700 }}>Total:</Typography>
                  <Typography sx={{ fontWeight: 700, minWidth: 100, textAlign: 'right', fontSize: '1.1em' }}>
                    {formatCurrencyWithCurrency(total, currency)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <TextField
            label="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            fullWidth
            multiline
            rows={3}
            placeholder="Any additional notes..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateQuotation} variant="contained">
            Create Quotation
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Quotation Dialog */}
      {selectedQuotation && (
        <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{selectedQuotation.quotationNumber}</DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <strong>Customer:</strong> {selectedQuotation.customerName}
              </Typography>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <strong>Status:</strong>{' '}
                <Chip
                  label={selectedQuotation.status.replace('-', ' ').toUpperCase()}
                  color={getStatusColor(selectedQuotation.status)}
                  size="small"
                />
              </Typography>
              <Typography variant="subtitle2">
                <strong>Created:</strong> {new Date(selectedQuotation.createdAt).toLocaleString()}
              </Typography>
            </Box>

            <Typography variant="h6" sx={{ mb: 1 }}>
              Items
            </Typography>

            <TableContainer component={Paper} sx={{ mb: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Qty</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedQuotation.items.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">{formatCurrencyWithCurrency(item.total, currency)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ pt: 2, borderTop: '1px solid #e0e0e0' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Subtotal:</Typography>
                <Typography>{formatCurrencyWithCurrency(selectedQuotation.subtotal, currency)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Tax:</Typography>
                <Typography>{formatCurrencyWithCurrency(selectedQuotation.tax, currency)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                <Typography sx={{ fontWeight: 700 }}>Total:</Typography>
                <Typography sx={{ fontWeight: 700 }}>{formatCurrencyWithCurrency(selectedQuotation.total, currency)}</Typography>
              </Box>
            </Box>

            {selectedQuotation.notes && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2">
                  <strong>Notes:</strong>
                </Typography>
                <Typography variant="body2">{selectedQuotation.notes}</Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenViewDialog(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};
