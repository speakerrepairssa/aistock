import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Tabs,
  Tab,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Divider,
  Chip,
  IconButton,
} from '@mui/material';
import { X, Plus } from 'lucide-react';
import { Customer } from '../types';
import { useCustomerStore } from '../store/customerStore';
import { useAuth } from '../hooks';

interface CustomerDialogProps {
  open: boolean;
  onClose: () => void;
  customer?: Customer | null;
  mode: 'create' | 'edit' | 'view';
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`customer-dialog-tabpanel-${index}`}
      aria-labelledby={`customer-dialog-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

export const CustomerDialog: React.FC<CustomerDialogProps> = ({
  open,
  onClose,
  customer,
  mode,
}) => {
  const { user } = useAuth();
  const { createCustomer, updateCustomer, loading } = useCustomerStore();
  const [activeTab, setActiveTab] = useState(0);
  const [newTag, setNewTag] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    mobile: '',
    website: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
    shippingAddress: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
    taxNumber: '',
    paymentTerms: 'net-30' as Customer['paymentTerms'],
    customPaymentTerms: '',
    creditLimit: 0,
    currency: 'ZAR',
    notes: '',
    tags: [] as string[],
    status: 'active' as Customer['status'],
  });

  const [sameAsBilling, setSameAsBilling] = useState(true);

  useEffect(() => {
    if (customer) {
      setFormData({
        companyName: customer.companyName || '',
        contactPerson: customer.contactPerson,
        email: customer.email,
        phone: customer.phone,
        mobile: customer.mobile || '',
        website: customer.website || '',
        billingAddress: customer.billingAddress,
        shippingAddress: customer.shippingAddress || customer.billingAddress,
        taxNumber: customer.taxNumber || '',
        paymentTerms: customer.paymentTerms,
        customPaymentTerms: customer.customPaymentTerms || '',
        creditLimit: customer.creditLimit || 0,
        currency: customer.currency,
        notes: customer.notes || '',
        tags: customer.tags,
        status: customer.status,
      });
      setSameAsBilling(!customer.shippingAddress || JSON.stringify(customer.shippingAddress) === JSON.stringify(customer.billingAddress));
    } else {
      // Reset form for new customer
      setFormData({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        mobile: '',
        website: '',
        billingAddress: {
          street: '',
          city: '',
          state: '',
          postalCode: '',
          country: '',
        },
        shippingAddress: {
          street: '',
          city: '',
          state: '',
          postalCode: '',
          country: '',
        },
        taxNumber: '',
        paymentTerms: 'net-30',
        customPaymentTerms: '',
        creditLimit: 0,
        currency: 'ZAR',
        notes: '',
        tags: [],
        status: 'active',
      });
      setSameAsBilling(true);
      setActiveTab(0);
    }
  }, [customer, open]);

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev] as any,
          [child]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleBillingAddressChange = (field: string, value: string) => {
    handleInputChange(`billingAddress.${field}`, value);
    
    if (sameAsBilling) {
      handleInputChange(`shippingAddress.${field}`, value);
    }
  };

  const handleSameAsBillingChange = (checked: boolean) => {
    setSameAsBilling(checked);
    if (checked) {
      setFormData(prev => ({
        ...prev,
        shippingAddress: { ...prev.billingAddress },
      }));
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async () => {
    if (!user?.uid) {
      console.error('User not authenticated');
      return;
    }

    // Only validate company name is required
    if (!formData.companyName.trim()) {
      alert('Company/Account name is required');
      return;
    }

    try {
      const customerData: any = {
        ...formData,
        createdBy: user.uid,
      };

      // Handle shipping address properly - don't set undefined
      if (!sameAsBilling) {
        customerData.shippingAddress = formData.shippingAddress;
      }
      // If sameAsBilling is true, we simply don't include shippingAddress field

      if (mode === 'create') {
        await createCustomer(customerData);
        console.log('Customer created successfully');
      } else if (mode === 'edit' && customer) {
        await updateCustomer(customer.id, customerData);
        console.log('Customer updated successfully');
      }

      onClose();
    } catch (error) {
      console.error('Failed to save customer:', error);
      alert(`Failed to save customer: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const isViewMode = mode === 'view';

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {mode === 'create' ? 'New Customer' : mode === 'edit' ? 'Edit Customer' : 'Customer Details'}
          <IconButton onClick={onClose} size="small">
            <X size={20} />
          </IconButton>
        </Box>
      </DialogTitle>

      <Tabs 
        value={activeTab} 
        onChange={(_, newValue) => setActiveTab(newValue)}
        sx={{ borderBottom: 1, borderColor: 'divider', px: 3 }}
      >
        <Tab label="Contact Info" sx={{ textTransform: 'none' }} />
        <Tab label="Addresses" sx={{ textTransform: 'none' }} />
        <Tab label="Business Details" sx={{ textTransform: 'none' }} />
        <Tab label="Notes & Tags" sx={{ textTransform: 'none' }} />
      </Tabs>

      <DialogContent sx={{ minHeight: 400 }}>
        {/* Contact Info Tab */}
        <TabPanel value={activeTab} index={0}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Company Name"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              fullWidth
              required
              disabled={isViewMode}
            />
            
            <TextField
              label="Contact Person"
              value={formData.contactPerson}
              onChange={(e) => handleInputChange('contactPerson', e.target.value)}
              fullWidth
              disabled={isViewMode}
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                fullWidth
                disabled={isViewMode}
              />
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  disabled={isViewMode}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                fullWidth
                disabled={isViewMode}
              />
              <TextField
                label="Mobile"
                value={formData.mobile}
                onChange={(e) => handleInputChange('mobile', e.target.value)}
                fullWidth
                disabled={isViewMode}
              />
            </Box>

            <TextField
              label="Website"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              fullWidth
              disabled={isViewMode}
              placeholder="https://example.com"
            />
          </Box>
        </TabPanel>

        {/* Addresses Tab */}
        <TabPanel value={activeTab} index={1}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h6">Billing Address</Typography>
            
            <TextField
              label="Street Address"
              value={formData.billingAddress.street}
              onChange={(e) => handleBillingAddressChange('street', e.target.value)}
              fullWidth
              multiline
              rows={2}
              disabled={isViewMode}
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="City"
                value={formData.billingAddress.city}
                onChange={(e) => handleBillingAddressChange('city', e.target.value)}
                fullWidth
                disabled={isViewMode}
              />
              <TextField
                label="State/Province"
                value={formData.billingAddress.state}
                onChange={(e) => handleBillingAddressChange('state', e.target.value)}
                fullWidth
                disabled={isViewMode}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Postal Code"
                value={formData.billingAddress.postalCode}
                onChange={(e) => handleBillingAddressChange('postalCode', e.target.value)}
                disabled={isViewMode}
              />
              <TextField
                label="Country"
                value={formData.billingAddress.country}
                onChange={(e) => handleBillingAddressChange('country', e.target.value)}
                fullWidth
                disabled={isViewMode}
              />
            </Box>

            <Divider />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Shipping Address</Typography>
              {!isViewMode && (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={sameAsBilling}
                      onChange={(e) => handleSameAsBillingChange(e.target.checked)}
                    />
                  }
                  label="Same as billing"
                />
              )}
            </Box>

            {!sameAsBilling && (
              <>
                <TextField
                  label="Street Address"
                  value={formData.shippingAddress.street}
                  onChange={(e) => handleInputChange('shippingAddress.street', e.target.value)}
                  fullWidth
                  multiline
                  rows={2}
                  disabled={isViewMode}
                />

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    label="City"
                    value={formData.shippingAddress.city}
                    onChange={(e) => handleInputChange('shippingAddress.city', e.target.value)}
                    fullWidth
                    disabled={isViewMode}
                  />
                  <TextField
                    label="State/Province"
                    value={formData.shippingAddress.state}
                    onChange={(e) => handleInputChange('shippingAddress.state', e.target.value)}
                    fullWidth
                    disabled={isViewMode}
                  />
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    label="Postal Code"
                    value={formData.shippingAddress.postalCode}
                    onChange={(e) => handleInputChange('shippingAddress.postalCode', e.target.value)}
                    disabled={isViewMode}
                  />
                  <TextField
                    label="Country"
                    value={formData.shippingAddress.country}
                    onChange={(e) => handleInputChange('shippingAddress.country', e.target.value)}
                    fullWidth
                    disabled={isViewMode}
                  />
                </Box>
              </>
            )}
          </Box>
        </TabPanel>

        {/* Business Details Tab */}
        <TabPanel value={activeTab} index={2}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Tax Number"
                value={formData.taxNumber}
                onChange={(e) => handleInputChange('taxNumber', e.target.value)}
                fullWidth
                disabled={isViewMode}
                placeholder="VAT/Tax ID"
              />
              <FormControl fullWidth>
                <InputLabel>Currency</InputLabel>
                <Select
                  value={formData.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  disabled={isViewMode}
                >
                  <MenuItem value="ZAR">ZAR (South African Rand)</MenuItem>
                  <MenuItem value="USD">USD (US Dollar)</MenuItem>
                  <MenuItem value="EUR">EUR (Euro)</MenuItem>
                  <MenuItem value="GBP">GBP (British Pound)</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Payment Terms</InputLabel>
                <Select
                  value={formData.paymentTerms}
                  onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
                  disabled={isViewMode}
                >
                  <MenuItem value="due-on-receipt">Due on Receipt</MenuItem>
                  <MenuItem value="net-15">Net 15 Days</MenuItem>
                  <MenuItem value="net-30">Net 30 Days</MenuItem>
                  <MenuItem value="net-45">Net 45 Days</MenuItem>
                  <MenuItem value="custom">Custom</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Credit Limit"
                type="number"
                value={formData.creditLimit}
                onChange={(e) => handleInputChange('creditLimit', parseFloat(e.target.value) || 0)}
                fullWidth
                disabled={isViewMode}
                InputProps={{
                  startAdornment: formData.currency + ' ',
                }}
              />
            </Box>

            {formData.paymentTerms === 'custom' && (
              <TextField
                label="Custom Payment Terms"
                value={formData.customPaymentTerms}
                onChange={(e) => handleInputChange('customPaymentTerms', e.target.value)}
                fullWidth
                disabled={isViewMode}
                placeholder="e.g., 2/10 net 30"
              />
            )}
          </Box>
        </TabPanel>

        {/* Notes & Tags Tab */}
        <TabPanel value={activeTab} index={3}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              fullWidth
              multiline
              rows={4}
              disabled={isViewMode}
              placeholder="Any additional notes about this customer..."
            />

            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>Tags</Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {formData.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    onDelete={isViewMode ? undefined : () => handleRemoveTag(tag)}
                    size="small"
                  />
                ))}
              </Box>

              {!isViewMode && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    label="Add Tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    size="small"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  />
                  <IconButton onClick={handleAddTag} size="small">
                    <Plus size={16} />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Box>
        </TabPanel>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          {isViewMode ? 'Close' : 'Cancel'}
        </Button>
        {!isViewMode && (
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={loading || !formData.companyName.trim()}
          >
            {mode === 'create' ? 'Create Customer' : 'Update Customer'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};