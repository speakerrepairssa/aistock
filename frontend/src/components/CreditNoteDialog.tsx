import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Card,
  CardContent,
} from '@mui/material';
import { X, Trash2 } from 'lucide-react';
import { CreditNote, Customer, QuotationItem } from '../types';
import { useCustomerStore } from '../store/customerStore';
import { useProducts } from '../hooks';
import { useAuth } from '../hooks';
import { formatCurrencyWithCurrency } from '../utils/helpers';
import { useSettings } from '../store/settingsStore';

interface CreditNoteDialogProps {
  open: boolean;
  onClose: () => void;
  customer?: Customer | null;
  creditNote?: CreditNote | null;
  mode: 'create' | 'edit' | 'view';
}

export const CreditNoteDialog: React.FC<CreditNoteDialogProps> = ({
  open,
  onClose,
  customer,
  creditNote,
  mode,
}) => {
  const { user } = useAuth();
  const { currency } = useSettings();
  const { products } = useProducts();
  const { customers, createCreditNote, updateCreditNote, loading } = useCustomerStore();

  // Form state
  const [formData, setFormData] = useState({
    customerId: '',
    customerName: '',
    reason: 'defective-product' as CreditNote['reason'],
    items: [] as QuotationItem[],
    notes: '',
    status: 'draft' as CreditNote['status'],
  });

  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (creditNote) {
      setFormData({
        customerId: creditNote.customerId,
        customerName: creditNote.customerName,
        reason: creditNote.reason,
        items: creditNote.items,
        notes: creditNote.notes || '',
        status: creditNote.status,
      });
    } else if (customer) {
      setFormData({
        customerId: customer.id,
        customerName: customer.contactPerson + (customer.companyName ? ` (${customer.companyName})` : ''),
        reason: 'defective-product',
        items: [],
        notes: '',
        status: 'draft',
      });
    } else {
      setFormData({
        customerId: '',
        customerName: '',
        reason: 'defective-product',
        items: [],
        notes: '',
        status: 'draft',
      });
    }
  }, [creditNote, customer, open]);

  const handleCustomerChange = (customerId: string) => {
    const selectedCustomer = customers.find(c => c.id === customerId);
    if (selectedCustomer) {
      setFormData(prev => ({
        ...prev,
        customerId,
        customerName: selectedCustomer.contactPerson + (selectedCustomer.companyName ? ` (${selectedCustomer.companyName})` : ''),
      }));
    }
  };

  const handleAddItem = () => {
    if (!selectedProduct || !quantity || !price) return;

    const product = products.find((p) => p.id === selectedProduct);
    if (!product) return;

    const qty = parseInt(quantity);
    const itemPrice = parseFloat(price);
    const total = itemPrice * qty;

    const newItem: QuotationItem = {
      productId: product.id,
      productName: product.name,
      quantity: qty,
      price: itemPrice,
      total,
    };

    setFormData(prev => ({
      ...prev,
      items: [...prev.items, newItem],
    }));

    setSelectedProduct('');
    setQuantity('1');
    setPrice('');
  };

  const handleRemoveItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const subtotal = formData.items.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const handleSubmit = async () => {
    if (!formData.customerId || formData.items.length === 0) {
      alert('Please select a customer and add items');
      return;
    }

    try {
      const creditNoteData = {
        ...formData,
        subtotal,
        tax,
        total,
        appliedToInvoices: [],
        createdBy: user?.uid || '',
      };

      if (mode === 'create') {
        await createCreditNote(creditNoteData);
      } else if (mode === 'edit' && creditNote) {
        await updateCreditNote(creditNote.id, creditNoteData);
      }

      onClose();
    } catch (error) {
      console.error('Failed to save credit note:', error);
      alert('Failed to save credit note');
    }
  };

  const isViewMode = mode === 'view';

  const reasonLabels = {
    'defective-product': 'Defective Product',
    'pricing-error': 'Pricing Error',
    'returned-goods': 'Returned Goods',
    'goodwill': 'Goodwill Credit',
    'other': 'Other',
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {mode === 'create' ? 'New Credit Note' : mode === 'edit' ? 'Edit Credit Note' : 'Credit Note Details'}
          <IconButton onClick={onClose} size="small">
            <X size={20} />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Customer Selection */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          {!customer && (
            <FormControl fullWidth disabled={isViewMode}>
              <InputLabel>Customer</InputLabel>
              <Select
                value={formData.customerId}
                onChange={(e) => handleCustomerChange(e.target.value)}
              >
                {customers.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.contactPerson} {c.companyName && `(${c.companyName})`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          
          <FormControl fullWidth disabled={isViewMode}>
            <InputLabel>Reason</InputLabel>
            <Select
              value={formData.reason}
              onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value as any }))}
            >
              {Object.entries(reasonLabels).map(([value, label]) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {customer && (
          <Card sx={{ backgroundColor: '#f5f5f5' }}>
            <CardContent>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Customer:</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {customer.contactPerson}
              </Typography>
              {customer.companyName && (
                <Typography variant="body2" color="textSecondary">
                  {customer.companyName}
                </Typography>
              )}
              <Typography variant="body2" color="textSecondary">
                {customer.email}
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* Items Section */}
        {!isViewMode && (
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Add Items</Typography>

              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  select
                  label="Product"
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  fullWidth
                  SelectProps={{ native: true }}
                >
                  <option value="">Select a product</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} - {formatCurrencyWithCurrency(p.price, currency)}
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

                <TextField
                  label="Unit Price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  sx={{ width: 140 }}
                  inputProps={{ min: 0, step: 0.01 }}
                />

                <Button
                  variant="contained"
                  onClick={handleAddItem}
                  sx={{ textTransform: 'none' }}
                >
                  Add
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Items Table */}
        {formData.items.length > 0 && (
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Qty</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Total</TableCell>
                  {!isViewMode && <TableCell>Action</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {formData.items.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">
                      {formatCurrencyWithCurrency(item.price, currency)}
                    </TableCell>
                    <TableCell align="right">
                      {formatCurrencyWithCurrency(item.total, currency)}
                    </TableCell>
                    {!isViewMode && (
                      <TableCell>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleRemoveItem(idx)}
                        >
                          <Trash2 size={16} />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Totals */}
        {formData.items.length > 0 && (
          <Box sx={{ pt: 2, borderTop: '1px solid #e0e0e0' }}>
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
              <Typography sx={{ fontWeight: 700 }}>Total Credit:</Typography>
              <Typography sx={{ fontWeight: 700, minWidth: 100, textAlign: 'right', fontSize: '1.1em', color: 'success.main' }}>
                {formatCurrencyWithCurrency(total, currency)}
              </Typography>
            </Box>
          </Box>
        )}

        {/* Notes */}
        <TextField
          label="Notes"
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          fullWidth
          multiline
          rows={3}
          disabled={isViewMode}
          placeholder="Reason for credit note, additional details..."
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          {isViewMode ? 'Close' : 'Cancel'}
        </Button>
        {!isViewMode && (
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loading || !formData.customerId || formData.items.length === 0}
          >
            {mode === 'create' ? 'Create Credit Note' : 'Update Credit Note'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};