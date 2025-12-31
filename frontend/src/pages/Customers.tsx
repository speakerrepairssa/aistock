import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  IconButton,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
  Card,
  CardContent,
} from '@mui/material';
import {
  Search,
  Plus,
  MoreHorizontal,
  Users,

  Edit,
  Trash2,
  Eye,
  CreditCard,
} from 'lucide-react';
import { useAuth } from '../hooks';
import { useCustomerStore } from '../store/customerStore';
import { formatCurrencyWithCurrency } from '../utils/helpers';
import { useSettings } from '../store/settingsStore';
import { Customer } from '../types';
import { CustomerDialog } from '../components/CustomerDialog';
import { CreditNoteDialog } from '../components/CreditNoteDialog';
import { RecurringInvoiceDialog } from '../components/RecurringInvoiceDialog';

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
      id={`customer-tabpanel-${index}`}
      aria-labelledby={`customer-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export const Customers: React.FC = () => {
  console.log('🔥 Customers component is loading...');
  
  const { user } = useAuth();
  const { currency } = useSettings();
  const {
    customers,
    creditNotes,
    recurringInvoices,
    loading,
    error,
    fetchCustomers,
    fetchCreditNotes,
    fetchRecurringInvoices,
    deleteCustomer,
  } = useCustomerStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [openCustomerDialog, setOpenCustomerDialog] = useState(false);
  const [openCreditNoteDialog, setOpenCreditNoteDialog] = useState(false);
  const [openRecurringDialog, setOpenRecurringDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit' | 'view'>('create');

  useEffect(() => {
    console.log('Customers useEffect - User:', user);
    console.log('Customers useEffect - User UID:', user?.uid);
    if (user?.uid) {
      console.log('Fetching customers, credit notes, and recurring invoices for user:', user.uid);
      fetchCustomers(user.uid);
      fetchCreditNotes(user.uid);
      fetchRecurringInvoices(user.uid);
    }
  }, [user, fetchCustomers, fetchCreditNotes, fetchRecurringInvoices]);

  // Debug customers data
  useEffect(() => {
    console.log('Customers data updated:', customers);
    console.log('Customers length:', customers.length);
    console.log('Loading state:', loading);
    console.log('Error state:', error);
  }, [customers, loading, error]);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, customer: Customer) => {
    setAnchorEl(event.currentTarget);
    setSelectedCustomer(customer);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCustomer(null);
  };

  const handleDeleteCustomer = async () => {
    if (selectedCustomer && window.confirm(`Delete customer ${selectedCustomer.contactPerson}?`)) {
      try {
        await deleteCustomer(selectedCustomer.id);
        handleMenuClose();
      } catch (err) {
        console.error('Failed to delete customer:', err);
      }
    }
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = 
      customer.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.customerNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.companyName && customer.companyName.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const totalOutstanding = customers.reduce((sum, c) => sum + c.outstandingBalance, 0);

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'success' : 'default';
  };

  if (loading && customers.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Users size={32} />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Customer Management
            </Typography>
            <Typography color="textSecondary">
              Manage customers, credit notes, and recurring billing
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={() => {
            setSelectedCustomer(null);
            setDialogMode('create');
            setOpenCustomerDialog(true);
          }}
          sx={{ textTransform: 'none' }}
        >
          New Customer
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Stats Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 4 }}>
        <Card>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main' }}>
              {totalCustomers}
            </Typography>
            <Typography color="textSecondary">Total Customers</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: 'success.main' }}>
              {activeCustomers}
            </Typography>
            <Typography color="textSecondary">Active Customers</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: 'warning.main' }}>
              {formatCurrencyWithCurrency(totalOutstanding, currency)}
            </Typography>
            <Typography color="textSecondary">Outstanding Balance</Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
          <Tab label="All Customers" />
          <Tab label="Credit Notes" />
          <Tab label="Recurring Invoices" />
        </Tabs>
      </Box>

      {/* Customers Tab */}
      <TabPanel value={tabValue} index={0}>
        {/* Search and Filters */}
        <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} />
                </InputAdornment>
              ),
            }}
            sx={{ flexGrow: 1 }}
          />
          <TextField
            select
            label="Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            sx={{ minWidth: 120 }}
            SelectProps={{ native: true }}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </TextField>
        </Box>

        {/* Customers Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 600 }}>Customer #</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Name/Company</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Outstanding</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id} hover>
                  <TableCell sx={{ fontFamily: 'monospace' }}>
                    {customer.customerNumber}
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {customer.contactPerson}
                      </Typography>
                      {customer.companyName && (
                        <Typography variant="body2" color="textSecondary">
                          {customer.companyName}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body2"
                      color={customer.outstandingBalance > 0 ? 'error' : 'textSecondary'}
                      sx={{ fontWeight: customer.outstandingBalance > 0 ? 600 : 400 }}
                    >
                      {formatCurrencyWithCurrency(customer.outstandingBalance, currency)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={customer.status.toUpperCase()}
                      color={getStatusColor(customer.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuClick(e, customer)}
                    >
                      <MoreHorizontal size={16} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredCustomers.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography color="textSecondary">
              {searchTerm ? 'No customers found matching your search.' : 'No customers yet. Create one to get started.'}
            </Typography>
          </Box>
        )}
      </TabPanel>

      {/* Credit Notes Tab */}
      <TabPanel value={tabValue} index={1}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Credit Notes</Typography>
          <Button
            variant="contained"
            startIcon={<Plus size={20} />}
            onClick={() => setOpenCreditNoteDialog(true)}
            sx={{ textTransform: 'none' }}
          >
            New Credit Note
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 600 }}>Credit Note #</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Reason</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Amount</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Remaining</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {creditNotes.map((creditNote) => (
                <TableRow key={creditNote.id} hover>
                  <TableCell sx={{ fontFamily: 'monospace' }}>
                    {creditNote.creditNoteNumber}
                  </TableCell>
                  <TableCell>{creditNote.customerName}</TableCell>
                  <TableCell>
                    <Chip 
                      label={creditNote.reason.replace('-', ' ').toUpperCase()} 
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrencyWithCurrency(creditNote.total, currency)}
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      color={creditNote.remainingAmount > 0 ? 'success.main' : 'textSecondary'}
                      sx={{ fontWeight: creditNote.remainingAmount > 0 ? 600 : 400 }}
                    >
                      {formatCurrencyWithCurrency(creditNote.remainingAmount, currency)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={creditNote.status.toUpperCase()}
                      color={creditNote.status === 'applied' ? 'success' : creditNote.status === 'issued' ? 'warning' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(creditNote.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {creditNotes.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography color="textSecondary">No credit notes yet.</Typography>
          </Box>
        )}
      </TabPanel>

      {/* Recurring Invoices Tab */}
      <TabPanel value={tabValue} index={2}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Recurring Invoices</Typography>
          <Button
            variant="contained"
            startIcon={<Plus size={20} />}
            onClick={() => setOpenRecurringDialog(true)}
            sx={{ textTransform: 'none' }}
          >
            New Recurring Invoice
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 600 }}>Template Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Frequency</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Next Invoice</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>Generated</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recurringInvoices.map((recurring) => (
                <TableRow key={recurring.id} hover>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {recurring.templateName}
                    </Typography>
                  </TableCell>
                  <TableCell>{recurring.customerName}</TableCell>
                  <TableCell>
                    <Chip 
                      label={recurring.frequency.toUpperCase()} 
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrencyWithCurrency(recurring.total, currency)}
                  </TableCell>
                  <TableCell>
                    {new Date(recurring.nextInvoiceDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={recurring.status.toUpperCase()}
                      color={
                        recurring.status === 'active' ? 'success' :
                        recurring.status === 'paused' ? 'warning' : 
                        'default'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    {recurring.occurrencesGenerated}
                    {recurring.totalOccurrences && ` / ${recurring.totalOccurrences}`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {recurringInvoices.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography color="textSecondary">No recurring invoices yet.</Typography>
          </Box>
        )}
      </TabPanel>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => { 
          setDialogMode('view');
          setOpenCustomerDialog(true);
          handleMenuClose();
        }}>
          <Eye size={16} style={{ marginRight: 8 }} />
          View Details
        </MenuItem>
        <MenuItem onClick={() => { 
          setDialogMode('edit');
          setOpenCustomerDialog(true);
          handleMenuClose();
        }}>
          <Edit size={16} style={{ marginRight: 8 }} />
          Edit Customer
        </MenuItem>
        <MenuItem onClick={() => { 
          setOpenCreditNoteDialog(true);
          handleMenuClose();
        }}>
          <CreditCard size={16} style={{ marginRight: 8 }} />
          Create Credit Note
        </MenuItem>
        <MenuItem onClick={handleDeleteCustomer} sx={{ color: 'error.main' }}>
          <Trash2 size={16} style={{ marginRight: 8 }} />
          Delete Customer
        </MenuItem>
      </Menu>

      {/* Customer Dialog */}
      <CustomerDialog
        open={openCustomerDialog}
        onClose={() => {
          setOpenCustomerDialog(false);
          // Refresh customer list after dialog closes
          if (user?.uid) {
            fetchCustomers(user.uid);
          }
        }}
        customer={selectedCustomer}
        mode={dialogMode}
      />

      {/* Credit Note Dialog */}
      <CreditNoteDialog
        open={openCreditNoteDialog}
        onClose={() => setOpenCreditNoteDialog(false)}
        customer={selectedCustomer}
        mode="create"
      />

      {/* Recurring Invoice Dialog */}
      <RecurringInvoiceDialog
        open={openRecurringDialog}
        onClose={() => setOpenRecurringDialog(false)}
        customer={selectedCustomer}
        mode="create"
      />
    </Container>
  );
};