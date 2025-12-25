import React, { useState, useEffect } from 'react';
import {
  Container,
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
  Card,
  CardContent,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Plus,
  Delete,
  FileText,
  Upload,
  Save,
  Send,
  Printer,
  Copy,
  X,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks';
import { formatCurrencyWithCurrency } from '../utils/helpers';
import { useSettings } from '../store/settingsStore';
import { useCustomerStore } from '../store/customerStore';
import { useAuth } from '../hooks/useAuth';

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
  const navigate = useNavigate();
  const { user } = useAuth();
  const { products } = useProducts();
  const { currency } = useSettings();
  const { customers, createCustomer, fetchCustomers } = useCustomerStore();

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
  const [invoiceNo, setInvoiceNo] = useState(`INV-${Date.now()}`);
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
  const [messageOnStatement, setMessageOnStatement] = useState('');
  const [subtotal, setSubtotal] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [deposit, setDeposit] = useState(0);

  // Customer creation dialog
  const [showCustomerDialog, setShowCustomerDialog] = useState(false);
  const [newCustomerData, setNewCustomerData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'South Africa',
    },
    paymentTerms: 'net-30' as const,
    currency: 'ZAR',
    status: 'active' as const,
  });

  // Fetch customers on mount
  useEffect(() => {
    if (user?.uid) {
      fetchCustomers(user.uid);
    }
  }, [user?.uid, fetchCustomers]);

  // Calculate totals
  useEffect(() => {
    const newSubtotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
    setSubtotal(newSubtotal);
  }, [lineItems]);

  const discountAmount = (subtotal * discountPercent) / 100;
  const total = subtotal - discountAmount + shipping;
  const balanceDue = total - deposit;

  const handleLineItemChange = (id: string, field: keyof InvoiceLineItem, value: any) => {
    setLineItems(prev => prev.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Calculate amount when quantity or rate changes
        if (field === 'quantity' || field === 'rate') {
          updatedItem.amount = updatedItem.quantity * updatedItem.rate;
          updatedItem.vat = updatedItem.amount * 0.15; // 15% VAT
        }
        
        // Auto-fill product details when product is selected
        if (field === 'productService') {
          const product = products.find(p => p.name === value || p.sku === value);
          if (product) {
            updatedItem.sku = product.sku;
            updatedItem.description = product.description || product.name;
            updatedItem.rate = product.price;
            updatedItem.amount = updatedItem.quantity * product.price;
            updatedItem.vat = updatedItem.amount * 0.15;
          }
        }
        
        return updatedItem;
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

  const handleSave = () => {
    // Save invoice logic
    console.log('Saving invoice...', {
      customer,
      invoiceNo,
      total: balanceDue,
      lineItems,
    });
  };

  const handleSaveAndSend = () => {
    // Save and send invoice logic
    handleSave();
    console.log('Sending invoice...');
  };

  const handleCreateCustomer = async () => {
    try {
      await createCustomer({
        ...newCustomerData,
        tags: [],
        createdBy: user?.uid || '',
      });
      
      // Select the newly created customer
      const createdCustomer = customers[customers.length - 1];
      if (createdCustomer) {
        setCustomer(createdCustomer.id);
        setCustomerEmail(createdCustomer.email);
      }
      
      setShowCustomerDialog(false);
      setNewCustomerData({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        billingAddress: {
          street: '',
          city: '',
          state: '',
          postalCode: '',
          country: 'South Africa',
        },
        paymentTerms: 'net-30' as const,
        currency: 'ZAR',
        status: 'active' as const,
      });
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };

  const handleCustomerChange = (value: string) => {
    if (value === 'ADD_NEW') {
      setShowCustomerDialog(true);
    } else {
      setCustomer(value);
      const selectedCustomer = customers.find(c => c.id === value);
      if (selectedCustomer) {
        setCustomerEmail(selectedCustomer.email);
        setBillingAddress(`${selectedCustomer.billingAddress.street}\n${selectedCustomer.billingAddress.city}, ${selectedCustomer.billingAddress.state} ${selectedCustomer.billingAddress.postalCode}\n${selectedCustomer.billingAddress.country}`);
      }
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <FileText size={32} color="#2563eb" />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Invoice no.{invoiceNo}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<Copy size={18} />}>
            Copy
          </Button>
          <Button variant="outlined" startIcon={<Printer size={18} />}>
            Print or Preview
          </Button>
          <Button variant="outlined">
            Make recurring
          </Button>
          <Button variant="outlined">
            Customise
          </Button>
          <Button variant="outlined" onClick={() => navigate('/sales/invoices')}>
            Cancel
          </Button>
          <Button variant="contained" startIcon={<Save size={18} />} onClick={handleSave}>
            Save
          </Button>
          <Button 
            variant="contained" 
            color="success" 
            startIcon={<Send size={18} />}
            onClick={handleSaveAndSend}
          >
            Save and send
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 3 }}>
        {/* Customer and Invoice Details */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Left Column - Customer Info */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Customer</InputLabel>
                  <Select
                    value={customer}
                    label="Customer"
                    onChange={(e) => handleCustomerChange(e.target.value)}
                  >
                    <MenuItem value="">Select customer...</MenuItem>
                    <MenuItem value="ADD_NEW" sx={{ color: '#2563eb', fontWeight: 600 }}>
                      + Add New Customer
                    </MenuItem>
                    <Divider />
                    {customers.map((cust) => (
                      <MenuItem key={cust.id} value={cust.id}>
                        {cust.companyName || cust.contactPerson}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Customer email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  type="email"
                />
              </Grid>
            </Grid>
            
            <FormControlLabel
              control={<Checkbox checked={sendLater} onChange={(e) => setSendLater(e.target.checked)} />}
              label="Send later"
              sx={{ mt: 2 }}
            />

            {/* Addresses */}
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
                  Billing address
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                  placeholder="Enter billing address..."
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
                  Shipping to
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Enter shipping address..."
                />
              </Grid>
            </Grid>

            {/* Terms and Dates */}
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Terms</InputLabel>
                  <Select
                    value={terms}
                    label="Terms"
                    onChange={(e) => setTerms(e.target.value)}
                  >
                    <MenuItem value="Due on receipt">Due on receipt</MenuItem>
                    <MenuItem value="Net 15">Net 15</MenuItem>
                    <MenuItem value="Net 30">Net 30</MenuItem>
                    <MenuItem value="Net 60">Net 60</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Invoice date"
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Due date"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>

            {/* Shipping Details */}
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Ship via"
                  value={shipVia}
                  onChange={(e) => setShipVia(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Shipping date"
                  type="date"
                  value={shippingDate}
                  onChange={(e) => setShippingDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Tracking no."
                  value={trackingNo}
                  onChange={(e) => setTrackingNo(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Right Column - Balance and Invoice Details */}
          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 3, backgroundColor: '#f8fafc' }}>
              <CardContent>
                <Typography variant="h6" color="textSecondary" sx={{ mb: 1 }}>
                  BALANCE DUE
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, color: '#1f2937' }}>
                  {formatCurrencyWithCurrency(balanceDue, currency as any)}
                </Typography>
              </CardContent>
            </Card>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Invoice no."
                  value={invoiceNo}
                  onChange={(e) => setInvoiceNo(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Class</InputLabel>
                  <Select
                    value={invoiceClass}
                    label="Class"
                    onChange={(e) => setInvoiceClass(e.target.value)}
                  >
                    <MenuItem value="">Choose class</MenuItem>
                    <MenuItem value="retail">Retail</MenuItem>
                    <MenuItem value="wholesale">Wholesale</MenuItem>
                    <MenuItem value="service">Service</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Line Items Table */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Items and Services
            </Typography>
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Amount are</InputLabel>
              <Select defaultValue="exclusive" label="Amount are">
                <MenuItem value="exclusive">Exclusive of Tax</MenuItem>
                <MenuItem value="inclusive">Inclusive of Tax</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <TableContainer sx={{ border: '1px solid #e5e7eb' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f9fafb' }}>
                  <TableCell sx={{ fontWeight: 600, minWidth: 40 }}>#</TableCell>
                  <TableCell sx={{ fontWeight: 600, minWidth: 120 }}>SERVICE DATE</TableCell>
                  <TableCell sx={{ fontWeight: 600, minWidth: 200 }}>PRODUCT/SERVICE</TableCell>
                  <TableCell sx={{ fontWeight: 600, minWidth: 100 }}>SKU</TableCell>
                  <TableCell sx={{ fontWeight: 600, minWidth: 250 }}>DESCRIPTION</TableCell>
                  <TableCell sx={{ fontWeight: 600, minWidth: 80 }} align="center">QTY</TableCell>
                  <TableCell sx={{ fontWeight: 600, minWidth: 100 }} align="right">RATE</TableCell>
                  <TableCell sx={{ fontWeight: 600, minWidth: 120 }} align="right">AMOUNT</TableCell>
                  <TableCell sx={{ fontWeight: 600, minWidth: 100 }} align="right">VAT</TableCell>
                  <TableCell sx={{ minWidth: 50 }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lineItems.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        type="date"
                        value={item.serviceDate}
                        onChange={(e) => handleLineItemChange(item.id, 'serviceDate', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        sx={{ minWidth: 140 }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={item.productService}
                        onChange={(e) => handleLineItemChange(item.id, 'productService', e.target.value)}
                        placeholder="Type or click to select..."
                        sx={{ minWidth: 200 }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={item.sku}
                        onChange={(e) => handleLineItemChange(item.id, 'sku', e.target.value)}
                        sx={{ minWidth: 100 }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={item.description}
                        onChange={(e) => handleLineItemChange(item.id, 'description', e.target.value)}
                        multiline
                        rows={1}
                        sx={{ minWidth: 250 }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleLineItemChange(item.id, 'quantity', Number(e.target.value))}
                        sx={{ minWidth: 80 }}
                        inputProps={{ min: 0, step: 1 }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        size="small"
                        type="number"
                        value={item.rate}
                        onChange={(e) => handleLineItemChange(item.id, 'rate', Number(e.target.value))}
                        sx={{ minWidth: 100 }}
                        inputProps={{ min: 0, step: 0.01 }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" sx={{ fontWeight: 600, p: 1 }}>
                        {formatCurrencyWithCurrency(item.amount, currency as any)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" sx={{ p: 1 }}>
                        {formatCurrencyWithCurrency(item.vat, currency as any)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {lineItems.length > 1 && (
                        <IconButton
                          size="small"
                          onClick={() => removeLineItem(item.id)}
                          color="error"
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

          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<Plus size={16} />}
              onClick={addLineItem}
            >
              Add lines
            </Button>
            <Button variant="outlined">Clear all lines</Button>
            <Button variant="outlined">Add subtotal</Button>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Bottom Section */}
        <Grid container spacing={3}>
          {/* Left - Messages and Attachments */}
          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
                Message on invoice
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                value={messageOnInvoice}
                onChange={(e) => setMessageOnInvoice(e.target.value)}
                placeholder="It was great doing business with you."
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
                Message on statement
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                value={messageOnStatement}
                onChange={(e) => setMessageOnStatement(e.target.value)}
                placeholder="You can edit this message for customer statement view."
              />
            </Box>

            <Box>
              <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 2 }}>
                <Upload size={16} style={{ verticalAlign: 'middle', marginRight: 8 }} />
                Attachments (Maximum size: 25MB)
              </Typography>
              <Box
                sx={{
                  border: '2px dashed #cbd5e1',
                  borderRadius: 2,
                  p: 3,
                  textAlign: 'center',
                  backgroundColor: '#f8fafc',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#f1f5f9',
                  },
                }}
              >
                <Typography color="textSecondary">
                  Drag-Drop files here or click the icon
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Right - Totals */}
          <Grid item xs={12} md={4}>
            <Box sx={{ backgroundColor: '#f8fafc', p: 3, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Subtotal</Typography>
                <Typography sx={{ fontWeight: 600 }}>
                  {formatCurrencyWithCurrency(subtotal, currency as any)}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography>Discount percent</Typography>
                <TextField
                  size="small"
                  type="number"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Number(e.target.value))}
                  sx={{ width: 80 }}
                  inputProps={{ min: 0, max: 100 }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                />
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography>Shipping</Typography>
                <TextField
                  size="small"
                  type="number"
                  value={shipping}
                  onChange={(e) => setShipping(Number(e.target.value))}
                  sx={{ width: 120 }}
                  inputProps={{ min: 0, step: 0.01 }}
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography sx={{ fontWeight: 600 }}>Total</Typography>
                <Typography sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                  {formatCurrencyWithCurrency(total, currency as any)}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography>Deposit</Typography>
                <TextField
                  size="small"
                  type="number"
                  value={deposit}
                  onChange={(e) => setDeposit(Number(e.target.value))}
                  sx={{ width: 120 }}
                  inputProps={{ min: 0, step: 0.01 }}
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ fontWeight: 700, fontSize: '1.1rem' }}>Balance due</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: '1.2rem', color: '#1f2937' }}>
                  {formatCurrencyWithCurrency(balanceDue, currency as any)}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Customer Creation Dialog */}
      <Dialog 
        open={showCustomerDialog} 
        onClose={() => setShowCustomerDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Add New Customer</Typography>
            <IconButton onClick={() => setShowCustomerDialog(false)}>
              <X size={20} />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company Name"
                value={newCustomerData.companyName}
                onChange={(e) => setNewCustomerData(prev => ({ ...prev, companyName: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Person *"
                value={newCustomerData.contactPerson}
                onChange={(e) => setNewCustomerData(prev => ({ ...prev, contactPerson: e.target.value }))}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email *"
                type="email"
                value={newCustomerData.email}
                onChange={(e) => setNewCustomerData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                value={newCustomerData.phone}
                onChange={(e) => setNewCustomerData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                Billing Address
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street Address"
                value={newCustomerData.billingAddress.street}
                onChange={(e) => setNewCustomerData(prev => ({ 
                  ...prev, 
                  billingAddress: { ...prev.billingAddress, street: e.target.value }
                }))}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="City"
                value={newCustomerData.billingAddress.city}
                onChange={(e) => setNewCustomerData(prev => ({ 
                  ...prev, 
                  billingAddress: { ...prev.billingAddress, city: e.target.value }
                }))}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="State/Province"
                value={newCustomerData.billingAddress.state}
                onChange={(e) => setNewCustomerData(prev => ({ 
                  ...prev, 
                  billingAddress: { ...prev.billingAddress, state: e.target.value }
                }))}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Postal Code"
                value={newCustomerData.billingAddress.postalCode}
                onChange={(e) => setNewCustomerData(prev => ({ 
                  ...prev, 
                  billingAddress: { ...prev.billingAddress, postalCode: e.target.value }
                }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Payment Terms</InputLabel>
                <Select
                  value={newCustomerData.paymentTerms}
                  label="Payment Terms"
                  onChange={(e) => setNewCustomerData(prev => ({ 
                    ...prev, 
                    paymentTerms: e.target.value as any
                  }))}
                >
                  <MenuItem value="due-on-receipt">Due on Receipt</MenuItem>
                  <MenuItem value="net-15">Net 15</MenuItem>
                  <MenuItem value="net-30">Net 30</MenuItem>
                  <MenuItem value="net-45">Net 45</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Currency</InputLabel>
                <Select
                  value={newCustomerData.currency}
                  label="Currency"
                  onChange={(e) => setNewCustomerData(prev => ({ ...prev, currency: e.target.value }))}
                >
                  <MenuItem value="ZAR">ZAR - South African Rand</MenuItem>
                  <MenuItem value="USD">USD - US Dollar</MenuItem>
                  <MenuItem value="EUR">EUR - Euro</MenuItem>
                  <MenuItem value="GBP">GBP - British Pound</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setShowCustomerDialog(false)}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleCreateCustomer}
            disabled={!newCustomerData.contactPerson || !newCustomerData.email}
          >
            Create Customer
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};