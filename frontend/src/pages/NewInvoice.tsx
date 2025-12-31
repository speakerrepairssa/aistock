import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Divider,
  IconButton,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import {
  Plus,
  Delete,
  Save,
  Send,
  Printer,
  Copy,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCustomerStore } from '../store/customerStore';
import { useAuth } from '../hooks/useAuth';
import { useInvoiceStore } from '../store/invoiceStore';

interface InvoiceLineItem {
  id: string;
  serviceDate: string;
  productService: string;
  sku: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
  vat: number;
}

export const NewInvoice: React.FC = () => {
  console.log('🔥 NewInvoice component is loading...');
  const navigate = useNavigate();
  const { user } = useAuth();
  const { customers, fetchCustomers } = useCustomerStore();
  const { createInvoice, loading: invoiceLoading } = useInvoiceStore();

  // Invoice header state
  const [customer, setCustomer] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [sendLater, setSendLater] = useState(false);
  const [billingAddress, setBillingAddress] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [terms, setTerms] = useState('Due on receipt');
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState('');
  const [shipVia, setShipVia] = useState('');
  const [shippingDate, setShippingDate] = useState('');
  const [trackingNo, setTrackingNo] = useState('');
  const [invoiceNo] = useState(`INV-${Date.now()}`);
  const [invoiceClass, setInvoiceClass] = useState('');

  // Line items state
  const [lineItems, setLineItems] = useState<InvoiceLineItem[]>([
    {
      id: '1',
      serviceDate: '',
      productService: '',
      sku: '',
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0,
      vat: 0,
    },
  ]);

  // Messages and totals
  const [messageOnInvoice, setMessageOnInvoice] = useState('');
  const [subtotal, setSubtotal] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [deposit, setDeposit] = useState(0);

  // Calculated values
  const discount = (subtotal * discountPercent) / 100;
  const total = subtotal - discount + shipping;
  const balanceDue = total - deposit;

  useEffect(() => {
    console.log('User:', user);
    console.log('User UID:', user?.uid);
    if (user?.uid) {
      console.log('Fetching customers for user:', user.uid);
      fetchCustomers(user.uid);
    }
  }, [user, fetchCustomers]);

  // Calculate totals
  useEffect(() => {
    const newSubtotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
    setSubtotal(newSubtotal);
  }, [lineItems]);

  // Debug customers
  useEffect(() => {
    console.log('Customers updated:', customers);
    console.log('Customers length:', customers.length);
  }, [customers]);

  const updateLineItem = (id: string, field: keyof InvoiceLineItem, value: any) => {
    setLineItems(prev => prev.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        // Recalculate amount and VAT
        if (field === 'quantity' || field === 'rate') {
          updated.amount = updated.quantity * updated.rate;
          updated.vat = updated.amount * 0.15; // 15% VAT
        }
        return updated;
      }
      return item;
    }));
  };

  const addLineItem = () => {
    const newItem: InvoiceLineItem = {
      id: Date.now().toString(),
      serviceDate: '',
      productService: '',
      sku: '',
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0,
      vat: 0,
    };
    setLineItems(prev => [...prev, newItem]);
  };

  const removeLineItem = (id: string) => {
    setLineItems(prev => prev.filter(item => item.id !== id));
  };

  const handleSave = async () => {
    if (!user?.uid) {
      alert('You must be logged in to save invoices');
      return;
    }

    if (!customer) {
      alert('Please select a customer');
      return;
    }

    if (lineItems.length === 0 || lineItems.every(item => !item.productService)) {
      alert('Please add at least one item');
      return;
    }

    try {
      const selectedCustomer = customers.find(c => c.id === customer);
      const invoiceItems = lineItems
        .filter(item => item.productService)
        .map(item => ({
          productId: item.sku || '',
          productName: item.productService,
          quantity: item.quantity,
          price: item.rate,
          total: item.amount,
        }));

      await createInvoice(
        user.uid,
        selectedCustomer?.companyName || selectedCustomer?.contactPerson || 'Unknown Customer',
        invoiceItems,
        new Date(dueDate || invoiceDate),
        messageOnInvoice
      );

      alert('Invoice saved successfully!');
      navigate('/sales/invoices');
    } catch (error) {
      console.error('Error saving invoice:', error);
      alert('Failed to save invoice. Please try again.');
    }
  };

  const handleSaveAndSend = async () => {
    await handleSave();
    console.log('Invoice saved, sending would happen here...');
  };

  const handlePrintPreview = () => {
    window.print();
  };

  const handleCustomerChange = (value: string) => {
    if (value === 'ADD_NEW') {
      // TODO: Open customer dialog
      console.log('Add new customer');
    } else {
      setCustomer(value);
      const selectedCustomer = customers.find(c => c.id === value);
      if (selectedCustomer) {
        setCustomerEmail(selectedCustomer.email);
        setBillingAddress(`${selectedCustomer.billingAddress.street}
${selectedCustomer.billingAddress.city}, ${selectedCustomer.billingAddress.state} ${selectedCustomer.billingAddress.postalCode}
${selectedCustomer.billingAddress.country}`);
      }
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f9f9f9', p: 3 }}>
      <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: '#1976d2' }}>
            Invoice no.{invoiceNo}
          </Typography>
        </Box>

        {/* Main Content */}
        <Grid container spacing={4}>
          {/* Main Form Area */}
          <Grid item xs={12} md={8}>
            {/* Top Row - Customer Info */}
            <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Customer</InputLabel>
                  <Select
                    value={customer}
                    onChange={(e) => handleCustomerChange(e.target.value)}
                    label="Customer"
                  >
                    <MenuItem value="">Select Customer</MenuItem>
                    {customers.map((cust) => (
                      <MenuItem key={cust.id} value={cust.id}>
                        {cust.companyName || cust.contactPerson}
                      </MenuItem>
                    ))}
                    <MenuItem value="ADD_NEW">
                      <Box sx={{ display: 'flex', alignItems: 'center', color: '#1976d2' }}>
                        <Plus size={16} style={{ marginRight: 8 }} />
                        Add new customer
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  size="small"
                  label="Customer email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  size="small"
                  label="Cc/Bcc"
                />
              </Grid>
            </Grid>

            <FormControlLabel
              control={
                <Checkbox
                  checked={sendLater}
                  onChange={(e) => setSendLater(e.target.checked)}
                  size="small"
                />
              }
              label="Send later"
              sx={{ mb: 3 }}
            />

            {/* Address and Terms Section */}
            <Grid container spacing={4}>
              {/* Left Side - Addresses */}
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                    Billing address
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    size="small"
                    value={billingAddress}
                    onChange={(e) => setBillingAddress(e.target.value)}
                    placeholder="Enter billing address"
                  />
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                    Shipping to
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    size="small"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="Enter shipping address"
                  />
                </Box>
              </Grid>

              {/* Right Side - Terms and Dates */}
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Terms</InputLabel>
                      <Select
                        value={terms}
                        onChange={(e) => setTerms(e.target.value)}
                        label="Terms"
                      >
                        <MenuItem value="Due on receipt">Due on receipt</MenuItem>
                        <MenuItem value="Net 15">Net 15</MenuItem>
                        <MenuItem value="Net 30">Net 30</MenuItem>
                        <MenuItem value="Net 45">Net 45</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Invoice date"
                      type="date"
                      value={invoiceDate}
                      onChange={(e) => setInvoiceDate(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Due date"
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Ship via"
                      value={shipVia}
                      onChange={(e) => setShipVia(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Shipping date"
                      type="date"
                      value={shippingDate}
                      onChange={(e) => setShippingDate(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Tracking no."
                      value={trackingNo}
                      onChange={(e) => setTrackingNo(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Right Sidebar */}
          <Grid item xs={12} md={4}>
            {/* Invoice Details */}
            <Box sx={{ mb: 3, p: 2, bgcolor: 'white', borderRadius: 1, border: '1px solid #e0e0e0' }}>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                  BALANCE DUE
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#d32f2f' }}>
                  R{balanceDue.toFixed(2)}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Invoice no.
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {invoiceNo}
                </Typography>
              </Box>

              <FormControl fullWidth size="small">
                <InputLabel>Class</InputLabel>
                <Select
                  value={invoiceClass}
                  onChange={(e) => setInvoiceClass(e.target.value)}
                  label="Class"
                >
                  <MenuItem value="">Choose class</MenuItem>
                  <MenuItem value="service">Service</MenuItem>
                  <MenuItem value="product">Product</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>

        {/* Line Items Section */}
        <Box sx={{ mt: 4, bgcolor: 'white', border: '1px solid #e0e0e0', borderRadius: 1 }}>
          <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Items and Services
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Amount are
              </Typography>
              <FormControl size="small">
                <Select value="exclusive" sx={{ minWidth: 150 }}>
                  <MenuItem value="exclusive">Exclusive of Tax</MenuItem>
                  <MenuItem value="inclusive">Inclusive of Tax</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          <TableContainer>
            <Table size="small">
              <TableHead sx={{ bgcolor: '#f8f9fa' }}>
                <TableRow>
                  <TableCell width="5%">#</TableCell>
                  <TableCell width="12%">SERVICE DATE</TableCell>
                  <TableCell width="15%">PRODUCT/SERVICE</TableCell>
                  <TableCell width="10%">SKU</TableCell>
                  <TableCell width="25%">DESCRIPTION</TableCell>
                  <TableCell width="8%" align="center">QTY</TableCell>
                  <TableCell width="10%" align="right">RATE</TableCell>
                  <TableCell width="10%" align="right">AMOUNT</TableCell>
                  <TableCell width="8%" align="right">VAT</TableCell>
                  <TableCell width="5%"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lineItems.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <TextField
                        type="date"
                        size="small"
                        value={item.serviceDate}
                        onChange={(e) => updateLineItem(item.id, 'serviceDate', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        sx={{ width: '100%' }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        placeholder="sale"
                        value={item.productService}
                        onChange={(e) => updateLineItem(item.id, 'productService', e.target.value)}
                        sx={{ width: '100%' }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={item.sku}
                        onChange={(e) => updateLineItem(item.id, 'sku', e.target.value)}
                        sx={{ width: '100%' }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={item.description}
                        onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                        sx={{ width: '100%' }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateLineItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                        sx={{ width: '100%' }}
                        inputProps={{ min: 0, step: 1 }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        type="number"
                        value={item.rate}
                        onChange={(e) => updateLineItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                        sx={{ width: '100%' }}
                        inputProps={{ min: 0, step: 0.01 }}
                        InputProps={{ startAdornment: 'R' }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">
                        R{item.amount.toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">
                        R{item.vat.toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {lineItems.length > 1 && (
                        <IconButton
                          size="small"
                          onClick={() => removeLineItem(item.id)}
                          sx={{ color: '#d32f2f' }}
                        >
                          <Delete size={16} />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0' }}>
            <Button
              startIcon={<Plus size={16} />}
              onClick={addLineItem}
              sx={{ mr: 2 }}
            >
              Add lines
            </Button>
            <Button variant="outlined" size="small">
              Clear all lines
            </Button>
            <Button variant="outlined" size="small" sx={{ ml: 1 }}>
              Add subtotal
            </Button>
          </Box>
        </Box>

        {/* Bottom Section */}
        <Grid container spacing={4} sx={{ mt: 3 }}>
          {/* Left Side - Messages */}
          <Grid item xs={12} md={8}>
            <Box sx={{ bgcolor: 'white', p: 3, border: '1px solid #e0e0e0', borderRadius: 1 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  Message on invoice
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  placeholder="Thanks for your business."
                  value={messageOnInvoice}
                  onChange={(e) => setMessageOnInvoice(e.target.value)}
                  size="small"
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  Message on statement
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  placeholder="Thanks for your business."
                  size="small"
                />
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  🔗 Attachments <span style={{ color: '#666', fontWeight: 400 }}>Maximum size: 25MB</span>
                </Typography>
                <Box
                  sx={{
                    border: '2px dashed #ccc',
                    borderRadius: 1,
                    p: 3,
                    textAlign: 'center',
                    bgcolor: '#fafafa'
                  }}
                >
                  <Typography color="text.secondary">
                    Drag/Drop files here or click this area.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          
          {/* Right Side - Totals */}
          <Grid item xs={12} md={4}>
            <Box sx={{ bgcolor: 'white', p: 3, border: '1px solid #e0e0e0', borderRadius: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Summary
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Subtotal</Typography>
                <Typography variant="body2">R{subtotal.toFixed(2)}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2">Discount %</Typography>
                <TextField
                  size="small"
                  type="number"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(parseFloat(e.target.value) || 0)}
                  sx={{ width: '80px' }}
                  inputProps={{ min: 0, max: 100, step: 0.1 }}
                  InputProps={{ endAdornment: '%' }}
                />
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Discount Amount</Typography>
                <Typography variant="body2">R{discount.toFixed(2)}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2">Shipping</Typography>
                <TextField
                  size="small"
                  type="number"
                  value={shipping}
                  onChange={(e) => setShipping(parseFloat(e.target.value) || 0)}
                  sx={{ width: '80px' }}
                  inputProps={{ min: 0, step: 0.01 }}
                  InputProps={{ startAdornment: 'R' }}
                />
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, fontWeight: 600 }}>
                <Typography sx={{ fontWeight: 600 }}>Total</Typography>
                <Typography sx={{ fontWeight: 600 }}>R{total.toFixed(2)}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2">Deposit</Typography>
                <TextField
                  size="small"
                  type="number"
                  value={deposit}
                  onChange={(e) => setDeposit(parseFloat(e.target.value) || 0)}
                  sx={{ width: '80px' }}
                  inputProps={{ min: 0, step: 0.01 }}
                  InputProps={{ startAdornment: 'R' }}
                />
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 600 }}>
                <Typography sx={{ fontWeight: 600, color: '#d32f2f' }}>Balance due</Typography>
                <Typography sx={{ fontWeight: 600, color: '#d32f2f' }}>R{balanceDue.toFixed(2)}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Paper sx={{ mt: 2, p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
            <Button 
              variant="outlined" 
              startIcon={<Copy size={16} />}
              size="small"
            >
              Copy
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<Printer size={16} />} 
              onClick={handlePrintPreview}
              size="small"
            >
              Print or Preview
            </Button>
            <Button 
              variant="outlined"
              size="small"
            >
              Make recurring
            </Button>
            <Button 
              variant="outlined"
              size="small"
            >
              Customise
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => navigate('/sales/invoices')}
              size="small"
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              startIcon={<Save size={16} />} 
              onClick={handleSave}
              disabled={invoiceLoading}
              size="small"
            >
              {invoiceLoading ? 'Saving...' : 'Save'}
            </Button>
            <Button 
              variant="contained" 
              color="success" 
              startIcon={<Send size={16} />}
              onClick={handleSaveAndSend}
              disabled={invoiceLoading}
              size="small"
            >
              {invoiceLoading ? 'Saving...' : 'Save and send'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};