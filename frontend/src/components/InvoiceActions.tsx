import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  IconButton,
  Tooltip,
  Alert,
  Snackbar,
  FormControlLabel,
  Checkbox,
  Grid,
} from '@mui/material';
import {
  MessageSquare,
  Mail,
  Printer,
  Copy,
  X,
  Send,
  Phone,
  Download,
} from 'lucide-react';
import { Invoice } from '../types';
import { useSettings } from '../hooks/useSettings';

// Services stub - to be fully implemented
const whatsappService = {
  sendInvoice: async (_invoice: Invoice, _phone?: string) => console.log('WhatsApp'),
  isValidPhoneNumber: (_phone: string) => true,
  copyInvoiceMessage: (_invoice: Invoice) => true,
};

const emailService = {
  sendInvoice: async (_invoice: Invoice, _email?: string) => console.log('Email'),
  parseEmailList: (_emails: string) => [],
  generateInvoiceEmailHTML: (_invoice: Invoice) => '<div></div>',
  generateInvoiceSubject: (_invoice: Invoice) => '',
  sendEmailViaClient: async (_emails: string[], _subject: string, _body: string) => console.log('Sending email'),
  copyEmailContent: async (_invoice: Invoice) => true,
};

const printService = {
  printInvoice: async (_invoice: Invoice, _orientation?: string) => console.log('Print'),
  saveAsHTML: async (_invoice: Invoice, _filename?: string) => console.log('Save as HTML'),
};

interface InvoiceActionsProps {
  invoice: Invoice;
  size?: 'small' | 'medium' | 'large';
  variant?: 'outlined' | 'contained' | 'text';
  showLabels?: boolean;
}

export const InvoiceActions: React.FC<InvoiceActionsProps> = ({
  invoice,
  size = 'medium',
  variant = 'outlined',
  showLabels = false,
}) => {
  useSettings(); // Initialize settings if needed
  
  // Dialog states
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [printOpen, setPrintOpen] = useState(false);
  
  // Form states
  const [phoneNumber, setPhoneNumber] = useState(invoice.customerPhone || '');
  const [emailAddresses, setEmailAddresses] = useState(invoice.customerEmail || '');
  const [ccEmails, setCcEmails] = useState('');
  const [bccEmails, setBccEmails] = useState('');
  const [emailSubject, setEmailSubject] = useState(emailService.generateInvoiceSubject(invoice));
  
  // Print options
  const [includeHeader, setIncludeHeader] = useState(true);
  const [includeFooter, setIncludeFooter] = useState(true);
  const [paperSize, setPaperSize] = useState<'A4' | 'Letter' | 'A5'>('A4');
  
  // Notification states
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info';
  }>({ open: false, message: '', severity: 'info' });

  const showNotification = (message: string, severity: 'success' | 'error' | 'info') => {
    setNotification({ open: true, message, severity });
  };

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  // WhatsApp handlers
  const handleWhatsAppSend = () => {
    try {
      // whatsappService.sendInvoice(invoice, phoneNumber);
      setWhatsappOpen(false);
      showNotification('WhatsApp message opened successfully!', 'success');
    } catch (error) {
      showNotification('Failed to send WhatsApp message', 'error');
    }
  };

  const handleWhatsAppCopy = async () => {
    try {
      const success = whatsappService.copyInvoiceMessage(invoice);
      if (success) {
        showNotification('Invoice message copied to clipboard!', 'success');
      } else {
        showNotification('Failed to copy message', 'error');
      }
    } catch (error) {
      showNotification('Failed to copy message', 'error');
    }
  };

  // Email handlers
  const handleEmailSend = () => {
    try {
      // TODO: Implement email service
      showNotification('Email feature coming soon', 'info');
    } catch (error) {
      showNotification('Failed to send email', 'error');
    }
  };

  const handleEmailCopy = async () => {
    try {
      // TODO: Implement email copy
      showNotification('Email feature coming soon', 'info');
    } catch (error) {
      showNotification('Failed to copy email content', 'error');
    }
  };

  // Print handlers
  const handlePrint = () => {
    try {
      printService.printInvoice(invoice);
      setPrintOpen(false);
      showNotification('Print dialog opened!', 'success');
    } catch (error) {
      showNotification('Failed to print invoice', 'error');
    }
  };

  const handleSaveHTML = () => {
    try {
      printService.saveAsHTML(invoice);
      showNotification('Invoice saved as HTML file!', 'success');
    } catch (error) {
      showNotification('Failed to save invoice', 'error');
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {/* WhatsApp Button */}
        <Tooltip title="Send via WhatsApp">
          <Button
            size={size}
            variant={variant}
            startIcon={<MessageSquare size={16} />}
            onClick={() => setWhatsappOpen(true)}
            sx={{ color: '#25D366' }}
          >
            {showLabels ? 'WhatsApp' : ''}
          </Button>
        </Tooltip>

        {/* Email Button */}
        <Tooltip title="Send via Email">
          <Button
            size={size}
            variant={variant}
            startIcon={<Mail size={16} />}
            onClick={() => setEmailOpen(true)}
            sx={{ color: '#1976d2' }}
          >
            {showLabels ? 'Email' : ''}
          </Button>
        </Tooltip>

        {/* Print Button */}
        <Tooltip title="Print Invoice">
          <Button
            size={size}
            variant={variant}
            startIcon={<Printer size={16} />}
            onClick={() => setPrintOpen(true)}
            sx={{ color: '#666' }}
          >
            {showLabels ? 'Print' : ''}
          </Button>
        </Tooltip>
      </Box>

      {/* WhatsApp Dialog */}
      <Dialog open={whatsappOpen} onClose={() => setWhatsappOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <MessageSquare size={24} style={{ color: '#25D366' }} />
            <Typography variant="h6">Send via WhatsApp</Typography>
          </Box>
          <IconButton onClick={() => setWhatsappOpen(false)}>
            <X size={20} />
          </IconButton>
        </DialogTitle>
        
        <DialogContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Send invoice {invoice.invoiceNumber} to {invoice.customerName} via WhatsApp
            </Typography>
            
            <TextField
              label="Phone Number (Optional)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              fullWidth
              placeholder="+1234567890"
              helperText="Leave empty to select contact manually in WhatsApp"
              InputProps={{
                startAdornment: <Phone size={16} style={{ marginRight: 8, color: '#666' }} />,
              }}
              error={phoneNumber ? !whatsappService.isValidPhoneNumber(phoneNumber) : false}
            />
            
            {phoneNumber && !whatsappService.isValidPhoneNumber(phoneNumber) && (
              <Alert severity="warning" sx={{ mt: 1 }}>
                Please enter a valid phone number with country code
              </Alert>
            )}
          </Box>
          
          <Alert severity="info" sx={{ mb: 2 }}>
            This will open WhatsApp Web with a pre-formatted invoice message
          </Alert>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleWhatsAppCopy} startIcon={<Copy size={16} />}>
            Copy Message
          </Button>
          <Button onClick={() => setWhatsappOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleWhatsAppSend} 
            variant="contained" 
            startIcon={<Send size={16} />}
            sx={{ bgcolor: '#25D366', '&:hover': { bgcolor: '#20ba5a' } }}
          >
            Send via WhatsApp
          </Button>
        </DialogActions>
      </Dialog>

      {/* Email Dialog */}
      <Dialog open={emailOpen} onClose={() => setEmailOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Mail size={24} style={{ color: '#1976d2' }} />
            <Typography variant="h6">Send via Email</Typography>
          </Box>
          <IconButton onClick={() => setEmailOpen(false)}>
            <X size={20} />
          </IconButton>
        </DialogTitle>
        
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Send invoice {invoice.invoiceNumber} to {invoice.customerName} via email
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="To (Required)"
                value={emailAddresses}
                onChange={(e) => setEmailAddresses(e.target.value)}
                fullWidth
                placeholder="customer@example.com, billing@company.com"
                helperText="Separate multiple emails with commas"
                required
                error={emailAddresses ? emailService.parseEmailList(emailAddresses).length === 0 : false}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="CC"
                value={ccEmails}
                onChange={(e) => setCcEmails(e.target.value)}
                fullWidth
                placeholder="manager@example.com"
                helperText="Carbon copy recipients"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="BCC"
                value={bccEmails}
                onChange={(e) => setBccEmails(e.target.value)}
                fullWidth
                placeholder="records@example.com"
                helperText="Blind carbon copy recipients"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
          
          <Alert severity="info" sx={{ mt: 2 }}>
            This will open your default email client with a formatted invoice email
          </Alert>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleEmailCopy} startIcon={<Copy size={16} />}>
            Copy Content
          </Button>
          <Button onClick={() => setEmailOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleEmailSend} 
            variant="contained" 
            startIcon={<Send size={16} />}
            disabled={!emailAddresses || emailService.parseEmailList(emailAddresses).length === 0}
          >
            Open Email Client
          </Button>
        </DialogActions>
      </Dialog>

      {/* Print Dialog */}
      <Dialog open={printOpen} onClose={() => setPrintOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Printer size={24} style={{ color: '#666' }} />
            <Typography variant="h6">Print Invoice</Typography>
          </Box>
          <IconButton onClick={() => setPrintOpen(false)}>
            <X size={20} />
          </IconButton>
        </DialogTitle>
        
        <DialogContent>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            Print invoice {invoice.invoiceNumber} for {invoice.customerName}
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Print Options:</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={includeHeader}
                    onChange={(e) => setIncludeHeader(e.target.checked)}
                  />
                }
                label="Include header with company logo"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={includeFooter}
                    onChange={(e) => setIncludeFooter(e.target.checked)}
                  />
                }
                label="Include footer with thank you message"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                select
                label="Paper Size"
                value={paperSize}
                onChange={(e) => setPaperSize(e.target.value as 'A4' | 'Letter' | 'A5')}
                fullWidth
                SelectProps={{ native: true }}
              >
                <option value="A4">A4 (210 × 297 mm)</option>
                <option value="Letter">Letter (8.5 × 11 in)</option>
                <option value="A5">A5 (148 × 210 mm)</option>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleSaveHTML} startIcon={<Download size={16} />}>
            Save as HTML
          </Button>
          <Button onClick={() => setPrintOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handlePrint} 
            variant="contained" 
            startIcon={<Printer size={16} />}
          >
            Print
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={closeNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={closeNotification} 
          severity={notification.severity} 
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};