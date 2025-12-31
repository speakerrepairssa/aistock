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
  Switch,
  FormControlLabel,
} from '@mui/material';
import { X, Trash2 } from 'lucide-react';
import { RecurringInvoice, Customer, QuotationItem } from '../types';
import { useCustomerStore } from '../store/customerStore';
import { useProducts } from '../hooks';
import { useAuth } from '../hooks';
import { formatCurrencyWithCurrency } from '../utils/helpers';
import { useSettings } from '../store/settingsStore';

interface RecurringInvoiceDialogProps {
  open: boolean;
  onClose: () => void;
  customer?: Customer | null;
  recurringInvoice?: RecurringInvoice | null;
  mode: 'create' | 'edit' | 'view';
}

export const RecurringInvoiceDialog: React.FC<RecurringInvoiceDialogProps> = ({
  open,
  onClose,
  customer,
  recurringInvoice,
  mode,
}) => {
  const { user } = useAuth();
  const { currency } = useSettings();
  const { products } = useProducts();
  const { customers, createRecurringInvoice, updateRecurringInvoice, loading } = useCustomerStore();

  // Form state
  const [formData, setFormData] = useState({
    templateName: '',
    customerId: '',
    customerName: '',
    items: [] as QuotationItem[],
    frequency: 'monthly' as RecurringInvoice['frequency'],
    customFrequency: {
      interval: 1,
      unit: 'months' as 'days' | 'weeks' | 'months' | 'years',
    },
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    nextInvoiceDate: new Date().toISOString().split('T')[0],
    totalOccurrences: 0,
    status: 'active' as RecurringInvoice['status'],
    autoSend: false,
    notes: '',
  });

  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (recurringInvoice) {
      setFormData({
        templateName: recurringInvoice.templateName,
        customerId: recurringInvoice.customerId,
        customerName: recurringInvoice.customerName,
        items: recurringInvoice.items,
        frequency: recurringInvoice.frequency,
        customFrequency: recurringInvoice.customFrequency || { interval: 1, unit: 'months' },
        startDate: recurringInvoice.startDate.toISOString().split('T')[0],
        endDate: recurringInvoice.endDate ? recurringInvoice.endDate.toISOString().split('T')[0] : '',
        nextInvoiceDate: recurringInvoice.nextInvoiceDate.toISOString().split('T')[0],
        totalOccurrences: recurringInvoice.totalOccurrences || 0,
        status: recurringInvoice.status,
        autoSend: recurringInvoice.autoSend,
        notes: recurringInvoice.notes || '',
      });
    } else if (customer) {
      setFormData({
        templateName: `${customer.contactPerson} - Monthly Recurring`,
        customerId: customer.id,
        customerName: customer.contactPerson + (customer.companyName ? ` (${customer.companyName})` : ''),
        items: [],
        frequency: 'monthly',
        customFrequency: { interval: 1, unit: 'months' },
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        nextInvoiceDate: new Date().toISOString().split('T')[0],
        totalOccurrences: 0,
        status: 'active',
        autoSend: false,
        notes: '',
      });
    } else {
      const today = new Date().toISOString().split('T')[0];
      setFormData({
        templateName: '',
        customerId: '',
        customerName: '',
        items: [],
        frequency: 'monthly',
        customFrequency: { interval: 1, unit: 'months' },
        startDate: today,
        endDate: '',
        nextInvoiceDate: today,
        totalOccurrences: 0,
        status: 'active',
        autoSend: false,
        notes: '',
      });
    }
  }, [recurringInvoice, customer, open]);

  const handleCustomerChange = (customerId: string) => {
    const selectedCustomer = customers.find(c => c.id === customerId);
    if (selectedCustomer) {
      setFormData(prev => ({
        ...prev,
        customerId,
        customerName: selectedCustomer.contactPerson + (selectedCustomer.companyName ? ` (${selectedCustomer.companyName})` : ''),
        templateName: prev.templateName || `${selectedCustomer.contactPerson} - Monthly Recurring`,
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
    if (!formData.customerId || formData.items.length === 0 || !formData.templateName) {
      alert('Please fill in all required fields and add items');
      return;
    }

    try {
      const recurringInvoiceData = {
        ...formData,
        startDate: new Date(formData.startDate),
        endDate: formData.endDate ? new Date(formData.endDate) : undefined,
        nextInvoiceDate: new Date(formData.nextInvoiceDate),
        subtotal,
        tax,
        total,
        createdBy: user?.uid || '',
      };

      if (mode === 'create') {
        await createRecurringInvoice(recurringInvoiceData);
      } else if (mode === 'edit' && recurringInvoice) {
        await updateRecurringInvoice(recurringInvoice.id, recurringInvoiceData);
      }

      onClose();
    } catch (error) {
      console.error('Failed to save recurring invoice:', error);
      alert('Failed to save recurring invoice');
    }
  };

  const isViewMode = mode === 'view';

  const frequencyLabels = {
    weekly: 'Weekly',
    monthly: 'Monthly',
    quarterly: 'Quarterly',
    yearly: 'Yearly',
    custom: 'Custom',
  };

  const unitLabels = {
    days: 'Days',
    weeks: 'Weeks',
    months: 'Months',
    years: 'Years',
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {mode === 'create' ? 'New Recurring Invoice' : mode === 'edit' ? 'Edit Recurring Invoice' : 'Recurring Invoice Details'}
          <IconButton onClick={onClose} size="small">
            <X size={20} />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Basic Information */}
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>Basic Information</Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Template Name"
                value={formData.templateName}
                onChange={(e) => setFormData(prev => ({ ...prev, templateName: e.target.value }))}
                fullWidth
                required
                disabled={isViewMode}
              />

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
                  </CardContent>
                </Card>
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Frequency & Schedule */}
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>Schedule</Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControl fullWidth disabled={isViewMode}>
                <InputLabel>Frequency</InputLabel>
                <Select
                  value={formData.frequency}
                  onChange={(e) => setFormData(prev => ({ ...prev, frequency: e.target.value as any }))}
                >
                  {Object.entries(frequencyLabels).map(([value, label]) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {formData.frequency === 'custom' && (
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    label="Every"
                    type="number"
                    value={formData.customFrequency.interval}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      customFrequency: {
                        ...prev.customFrequency,
                        interval: parseInt(e.target.value) || 1,
                      },
                    }))}
                    sx={{ width: 100 }}
                    inputProps={{ min: 1 }}
                    disabled={isViewMode}
                  />
                  <FormControl sx={{ minWidth: 120 }} disabled={isViewMode}>
                    <InputLabel>Unit</InputLabel>
                    <Select
                      value={formData.customFrequency.unit}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        customFrequency: {
                          ...prev.customFrequency,
                          unit: e.target.value as any,
                        },
                      }))}
                    >
                      {Object.entries(unitLabels).map(([value, label]) => (
                        <MenuItem key={value} value={value}>
                          {label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              )}

              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="Start Date"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  disabled={isViewMode}
                />
                <TextField
                  label="End Date (Optional)"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  disabled={isViewMode}
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="Total Occurrences (Optional)"
                  type="number"
                  value={formData.totalOccurrences || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, totalOccurrences: parseInt(e.target.value) || 0 }))}
                  fullWidth
                  inputProps={{ min: 0 }}
                  disabled={isViewMode}
                  helperText="0 = unlimited"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.autoSend}
                      onChange={(e) => setFormData(prev => ({ ...prev, autoSend: e.target.checked }))}
                      disabled={isViewMode}
                    />
                  }
                  label="Auto Send"
                />
              </Box>
            </Box>
          </CardContent>
        </Card>

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
              <Typography sx={{ fontWeight: 700 }}>Recurring Total:</Typography>
              <Typography sx={{ fontWeight: 700, minWidth: 100, textAlign: 'right', fontSize: '1.1em', color: 'primary.main' }}>
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
          placeholder="Invoice description, terms, or other notes..."
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
            disabled={loading || !formData.customerId || !formData.templateName || formData.items.length === 0}
          >
            {mode === 'create' ? 'Create Template' : 'Update Template'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};