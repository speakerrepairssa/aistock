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
  MenuItem,
  Grid,
  CircularProgress,
} from '@mui/material';
import { Plus, Eye, Trash2, DollarSign } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useInvoiceStore } from '../store/invoiceStore';
import { useProducts } from '../hooks/useProducts';
import { useSettings } from '../hooks/useSettings';
import { formatCurrencyWithCurrency } from '../utils/helpers';
import { QuotationItem, Invoice } from '../types';

export const SalesInvoices: React.FC = () => {
  const { user } = useAuth();
  const { fetchInvoices, invoices, loading, createInvoice, deleteInvoice, recordPayment } =
    useInvoiceStore();
  const { products, fetchProducts, updateProductQuantity } = useProducts();
  const { currency } = useSettings();

  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');

  const [formData, setFormData] = useState({
    customerName: '',
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: '',
  });

  const [items, setItems] = useState<QuotationItem[]>([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState('1');

  useEffect(() => {
    if (user?.uid) {
      fetchInvoices(user.uid);
      fetchProducts();
    }
  }, [user?.uid, fetchInvoices, fetchProducts]);

  const handleAddItem = () => {
    if (!selectedProductId || !selectedQuantity) return;

    const product = products.find((p) => p.id === selectedProductId);
    if (!product) return;

    const quantity = parseFloat(selectedQuantity);

    // Validation: Check if product has stock
    if (product.quantity <= 0) {
      alert('Cannot add out-of-stock products to invoices');
      return;
    }

    // Validation: Check if quantity requested is available
    if (quantity > product.quantity) {
      alert(`Only ${product.quantity} units available in stock`);
      return;
    }

    // Validation: Check if quantity is positive
    if (quantity <= 0) {
      alert('Quantity must be greater than 0');
      return;
    }

    const item: QuotationItem = {
      productId: product.id,
      productName: product.name,
      quantity,
      price: product.price,
      total: quantity * product.price,
    };

    setItems([...items, item]);
    setSelectedProductId('');
    setSelectedQuantity('1');
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleCreateInvoice = async () => {
    if (!formData.customerName || items.length === 0 || !user?.uid) return;

    try {
      await createInvoice(
        user.uid,
        formData.customerName,
        items,
        new Date(formData.dueDate),
        formData.notes
      );

      // Deduct stock from inventory for each item
      for (const item of items) {
        try {
          await updateProductQuantity(
            item.productId,
            -item.quantity, // Negative quantity to deduct
            'Invoice Created',
            user.uid
          );
        } catch (error) {
          console.error(`Error deducting stock for product ${item.productId}:`, error);
        }
      }

      setFormData({
        customerName: '',
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        notes: '',
      });
      setItems([]);
      setOpenCreateDialog(false);
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setOpenViewDialog(true);
  };

  const handleRecordPayment = async () => {
    if (!selectedInvoice || !paymentAmount) return;

    const amount = parseFloat(paymentAmount);
    if (amount <= 0) return;

    try {
      await recordPayment(selectedInvoice.id, amount);
      setPaymentAmount('');
      setOpenPaymentDialog(false);
      if (user?.uid) {
        await fetchInvoices(user.uid);
      }
    } catch (error) {
      console.error('Error recording payment:', error);
    }
  };

  const handleDeleteInvoice = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      try {
        await deleteInvoice(id);
      } catch (error) {
        console.error('Error deleting invoice:', error);
      }
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const totalOutstanding = invoices
    .filter((inv) => inv.paymentStatus !== 'paid')
    .reduce((sum, inv) => sum + inv.balanceDue, 0);
  const totalPaid = invoices
    .filter((inv) => inv.paymentStatus === 'paid')
    .reduce((sum, inv) => sum + inv.total, 0);
  const paidCount = invoices.filter((inv) => inv.paymentStatus === 'paid').length;
  const unpaidCount = invoices.filter((inv) => inv.paymentStatus === 'unpaid').length;

  const getStatusColor = (status: string) => {
    const colors: Record<string, 'default' | 'primary' | 'warning' | 'success' | 'error'> = {
      draft: 'default',
      sent: 'primary',
      viewed: 'primary',
      partial: 'warning',
      paid: 'success',
      overdue: 'error',
      cancelled: 'error',
    };
    return colors[status] || 'default';
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            All Invoices
          </Typography>
          <Typography color="textSecondary">Manage and track your invoices</Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={() => setOpenCreateDialog(true)}
        >
          New Invoice
        </Button>
      </Box>

      {/* Payment Summary */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <CardContent>
              <Typography color="rgba(255, 255, 255, 0.7)" variant="subtitle2" sx={{ mb: 1 }}>
                Total Outstanding
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {formatCurrencyWithCurrency(totalOutstanding, currency)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
            <CardContent>
              <Typography color="rgba(255, 255, 255, 0.7)" variant="subtitle2" sx={{ mb: 1 }}>
                Unpaid Invoices
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {unpaidCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
            <CardContent>
              <Typography color="rgba(255, 255, 255, 0.7)" variant="subtitle2" sx={{ mb: 1 }}>
                Total Paid
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {formatCurrencyWithCurrency(totalPaid, currency)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: 'white' }}>
            <CardContent>
              <Typography color="rgba(255, 255, 255, 0.7)" variant="subtitle2" sx={{ mb: 1 }}>
                Paid Invoices
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {paidCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Invoices Table */}
      <Paper>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        ) : invoices.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <DollarSign size={48} style={{ color: '#ccc', marginBottom: 16 }} />
            <Typography color="textSecondary" variant="body1">
              No invoices yet. Create your first invoice to get started.
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Invoice #</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Due Date</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Amount
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Balance Due
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id} hover>
                    <TableCell sx={{ fontWeight: 500 }}>{invoice.invoiceNumber}</TableCell>
                    <TableCell>{invoice.customerName}</TableCell>
                    <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                    <TableCell align="right">
                      {formatCurrencyWithCurrency(invoice.total, currency)}
                    </TableCell>
                    <TableCell align="right">
                      {formatCurrencyWithCurrency(invoice.balanceDue, currency)}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={invoice.paymentStatus}
                        color={getStatusColor(invoice.paymentStatus)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        <Button
                          size="small"
                          variant="text"
                          startIcon={<Eye size={16} />}
                          onClick={() => handleViewInvoice(invoice)}
                        >
                          View
                        </Button>
                        {invoice.paymentStatus !== 'paid' && (
                          <Button
                            size="small"
                            variant="text"
                            color="success"
                            startIcon={<DollarSign size={16} />}
                            onClick={() => {
                              setSelectedInvoice(invoice);
                              setOpenPaymentDialog(true);
                            }}
                          >
                            Pay
                          </Button>
                        )}
                        {invoice.status === 'draft' && (
                          <Button
                            size="small"
                            variant="text"
                            color="error"
                            startIcon={<Trash2 size={16} />}
                            onClick={() => handleDeleteInvoice(invoice.id)}
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
        )}
      </Paper>

      {/* Create Invoice Dialog */}
      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Invoice</DialogTitle>
        <DialogContent sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Customer Name *"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              fullWidth
              size="small"
            />

            <TextField
              label="Due Date *"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
            />

            <Box sx={{ border: '1px solid #ddd', borderRadius: 1, p: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                Add Items
              </Typography>

              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  select
                  label="Product"
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  size="small"
                  sx={{ flex: 1 }}
                >
                  {products.map((product) => (
                    <MenuItem key={product.id} value={product.id}>
                      {product.name} (Stock: {product.quantity})
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  label="Qty"
                  type="number"
                  value={selectedQuantity}
                  onChange={(e) => setSelectedQuantity(e.target.value)}
                  size="small"
                  sx={{ width: 80 }}
                  inputProps={{ min: 1, step: 1 }}
                />

                <Button 
                  variant="outlined" 
                  onClick={handleAddItem} 
                  size="small"
                  disabled={!selectedProductId || !selectedQuantity || products.find((p) => p.id === selectedProductId)?.quantity === 0}
                >
                  Add
                </Button>
              </Box>

              {items.length > 0 && (
                <>
                  <TableContainer sx={{ mb: 2 }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                          <TableCell>Product</TableCell>
                          <TableCell align="right">Qty</TableCell>
                          <TableCell align="right">Price</TableCell>
                          <TableCell align="right">Total</TableCell>
                          <TableCell />
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {items.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell sx={{ fontSize: '0.875rem' }}>{item.productName}</TableCell>
                            <TableCell align="right" sx={{ fontSize: '0.875rem' }}>
                              {item.quantity}
                            </TableCell>
                            <TableCell align="right" sx={{ fontSize: '0.875rem' }}>
                              {formatCurrencyWithCurrency(item.price, currency)}
                            </TableCell>
                            <TableCell align="right" sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
                              {formatCurrencyWithCurrency(item.total, currency)}
                            </TableCell>
                            <TableCell align="right">
                              <Button
                                size="small"
                                color="error"
                                onClick={() => handleRemoveItem(index)}
                              >
                                ×
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-end', pt: 1 }}>
                    <Typography sx={{ fontSize: '0.875rem' }}>
                      Subtotal: {formatCurrencyWithCurrency(subtotal, currency)}
                    </Typography>
                    <Typography sx={{ fontSize: '0.875rem' }}>
                      Tax (10%): {formatCurrencyWithCurrency(tax, currency)}
                    </Typography>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: 'primary.main' }}>
                      Total: {formatCurrencyWithCurrency(total, currency)}
                    </Typography>
                  </Box>
                </>
              )}
            </Box>

            <TextField
              label="Notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              fullWidth
              multiline
              rows={2}
              size="small"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleCreateInvoice}
            disabled={!formData.customerName || items.length === 0}
          >
            Create Invoice
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Invoice Dialog */}
      <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Invoice Details</DialogTitle>
        <DialogContent sx={{ py: 2 }}>
          {selectedInvoice && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    Invoice Number
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {selectedInvoice.invoiceNumber}
                  </Typography>
                </Box>
                <Chip
                  label={selectedInvoice.paymentStatus}
                  color={getStatusColor(selectedInvoice.paymentStatus)}
                />
              </Box>

              <Box>
                <Typography variant="subtitle2" color="textSecondary">
                  Customer
                </Typography>
                <Typography variant="body1">{selectedInvoice.customerName}</Typography>
                {selectedInvoice.customerEmail && (
                  <Typography variant="caption">{selectedInvoice.customerEmail}</Typography>
                )}
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    Date
                  </Typography>
                  <Typography variant="body2">{formatDate(selectedInvoice.createdAt)}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    Due Date
                  </Typography>
                  <Typography variant="body2">{formatDate(selectedInvoice.dueDate)}</Typography>
                </Box>
              </Box>

              <TableContainer sx={{ my: 2 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableCell>Product</TableCell>
                      <TableCell align="right">Qty</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedInvoice.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ fontSize: '0.875rem' }}>{item.productName}</TableCell>
                        <TableCell align="right" sx={{ fontSize: '0.875rem' }}>
                          {item.quantity}
                        </TableCell>
                        <TableCell align="right" sx={{ fontSize: '0.875rem' }}>
                          {formatCurrencyWithCurrency(item.price, currency)}
                        </TableCell>
                        <TableCell align="right" sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
                          {formatCurrencyWithCurrency(item.total, currency)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-end' }}>
                <Typography sx={{ fontSize: '0.875rem' }}>
                  Subtotal: {formatCurrencyWithCurrency(selectedInvoice.subtotal, currency)}
                </Typography>
                <Typography sx={{ fontSize: '0.875rem' }}>
                  Tax: {formatCurrencyWithCurrency(selectedInvoice.tax, currency)}
                </Typography>
                <Typography sx={{ fontSize: '1rem', fontWeight: 700 }}>
                  Total: {formatCurrencyWithCurrency(selectedInvoice.total, currency)}
                </Typography>
                <Typography sx={{ fontSize: '0.875rem', color: 'success.main' }}>
                  Paid: {formatCurrencyWithCurrency(selectedInvoice.amountPaid, currency)}
                </Typography>
                <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: 'error.main' }}>
                  Balance Due: {formatCurrencyWithCurrency(selectedInvoice.balanceDue, currency)}
                </Typography>
              </Box>

              {selectedInvoice.notes && (
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    Notes
                  </Typography>
                  <Typography variant="body2">{selectedInvoice.notes}</Typography>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenViewDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog open={openPaymentDialog} onClose={() => setOpenPaymentDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Record Payment</DialogTitle>
        <DialogContent sx={{ py: 2 }}>
          {selectedInvoice && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="subtitle2" color="textSecondary">
                  Invoice
                </Typography>
                <Typography variant="body1">{selectedInvoice.invoiceNumber}</Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="textSecondary">
                  Balance Due
                </Typography>
                <Typography variant="h6" sx={{ color: 'error.main', fontWeight: 700 }}>
                  {formatCurrencyWithCurrency(selectedInvoice.balanceDue, currency)}
                </Typography>
              </Box>

              <TextField
                label="Payment Amount *"
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                fullWidth
                inputProps={{ min: 0, step: 0.01 }}
                size="small"
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPaymentDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleRecordPayment} disabled={!paymentAmount}>
            Record Payment
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
