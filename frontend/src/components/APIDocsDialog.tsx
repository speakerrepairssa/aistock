import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Tabs,
  Tab,
  Chip,
  Paper,
  Alert,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { X, Copy, Code, Key, Webhook } from 'lucide-react';
import { ExpandMore } from '@mui/icons-material';
import { APIKeyManagement } from './APIKeyManagement';

interface APIDocsDialogProps {
  open: boolean;
  onClose: () => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  );
}

const CodeBlock: React.FC<{ children: string; language?: string }> = ({ children }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(children);
  };

  return (
    <Paper sx={{ position: 'relative', bgcolor: '#1e1e1e', color: '#fff', p: 2, my: 1, overflow: 'auto' }}>
      <IconButton
        size="small"
        onClick={handleCopy}
        sx={{ position: 'absolute', top: 8, right: 8, color: '#fff' }}
      >
        <Copy size={16} />
      </IconButton>
      <Typography component="pre" sx={{ fontSize: '0.875rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
        {children}
      </Typography>
    </Paper>
  );
};

export const APIDocsDialog: React.FC<APIDocsDialogProps> = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState(false);

  const baseUrl = 'https://us-central1-aistock-c4ea6.cloudfunctions.net/api';

  const endpoints = {
    invoices: [
      {
        method: 'POST',
        endpoint: '/invoices',
        description: 'Create a new invoice',
        body: {
          customerData: {
            name: "John Doe",
            email: "john@example.com",
            address: "123 Main St, City, Country"
          },
          items: [
            {
              description: "Product/Service",
              quantity: 1,
              rate: 100.00,
              taxRate: 0.15
            }
          ],
          dueDate: "2025-01-30",
          notes: "Payment terms and conditions"
        },
        response: {
          success: true,
          invoiceId: "INV-12345",
          invoiceNumber: "INV-000001",
          totalAmount: 115.00,
          downloadUrl: "https://...",
          emailSent: true
        }
      },
      {
        method: 'PUT',
        endpoint: '/invoices/:id',
        description: 'Update an existing invoice',
        body: {
          status: "paid",
          paymentDate: "2025-01-15",
          paymentMethod: "bank_transfer",
          notes: "Payment received"
        }
      },
      {
        method: 'POST',
        endpoint: '/invoices/deposit',
        description: 'Create a deposit invoice',
        body: {
          customerData: {
            name: "John Doe",
            email: "john@example.com"
          },
          depositAmount: 500.00,
          description: "50% deposit for project XYZ",
          dueDate: "2025-01-20"
        }
      }
    ],
    quotes: [
      {
        method: 'POST',
        endpoint: '/quotes',
        description: 'Create a new quote/estimate',
        body: {
          customerData: {
            name: "Jane Smith",
            email: "jane@example.com",
            company: "ABC Corp"
          },
          items: [
            {
              description: "Consultation Service",
              quantity: 10,
              rate: 150.00
            }
          ],
          validUntil: "2025-02-15",
          notes: "Quote valid for 30 days"
        }
      }
    ],
    customers: [
      {
        method: 'POST',
        endpoint: '/customers',
        description: 'Create a new customer',
        body: {
          name: "Customer Name",
          email: "customer@example.com",
          phone: "+1234567890",
          company: "Company Name",
          address: {
            street: "123 Business Ave",
            city: "Business City",
            state: "State",
            postalCode: "12345",
            country: "Country"
          },
          paymentTerms: "net-30",
          currency: "ZAR"
        }
      },
      {
        method: 'GET',
        endpoint: '/customers',
        description: 'List all customers',
        query: {
          limit: 50,
          offset: 0,
          status: "active"
        }
      }
    ],
    products: [
      {
        method: 'POST',
        endpoint: '/products',
        description: 'Create a new product',
        body: {
          name: "Product Name",
          sku: "PROD-001",
          description: "Product description",
          price: 99.99,
          category: "Electronics",
          stock: 100,
          images: ["https://..."]
        }
      },
      {
        method: 'PUT',
        endpoint: '/products/:id/stock',
        description: 'Update product stock',
        body: {
          quantity: 50,
          operation: "add", // or "subtract", "set"
          reason: "Stock adjustment",
          notes: "Manual adjustment"
        }
      }
    ],
    automation: [
      {
        method: 'POST',
        endpoint: '/webhooks/invoice-paid',
        description: 'Webhook for invoice payment notifications',
        body: {
          invoiceId: "INV-12345",
          amount: 115.00,
          currency: "ZAR",
          paymentMethod: "stripe",
          transactionId: "txn_123456"
        }
      },
      {
        method: 'POST',
        endpoint: '/ai/create-invoice',
        description: 'AI-powered invoice creation from text/email',
        body: {
          inputText: "Create invoice for John Doe for web development services, 10 hours at $100/hour, due in 30 days",
          extractCustomer: true,
          autoSend: false
        }
      }
    ]
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Code size={24} color="#2563eb" />
            <Typography variant="h6">AiStock API Documentation</Typography>
            <Chip label="v1.0" color="primary" size="small" />
          </Box>
          <IconButton onClick={onClose}>
            <X size={20} />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>Base URL:</strong> {baseUrl}
            <br />
            <strong>Authentication:</strong> Include your API key in the header: <code>Authorization: Bearer YOUR_API_KEY</code>
          </Typography>
        </Alert>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
            <Tab label="Invoices" icon={<Box>📄</Box>} />
            <Tab label="Quotes" icon={<Box>💰</Box>} />
            <Tab label="Customers" icon={<Box>👥</Box>} />
            <Tab label="Products" icon={<Box>📦</Box>} />
            <Tab label="AI & Automation" icon={<Box>🤖</Box>} />
            <Tab label="Authentication" icon={<Key size={16} />} />
          </Tabs>
        </Box>

        {/* Invoices Tab */}
        <TabPanel value={activeTab} index={0}>
          <Typography variant="h6" gutterBottom>Invoice Management</Typography>
          {endpoints.invoices.map((endpoint, index) => (
            <Accordion key={index} sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Chip label={endpoint.method} color={endpoint.method === 'POST' ? 'success' : 'warning'} size="small" />
                  <Typography variant="body1">{endpoint.endpoint}</Typography>
                  <Typography variant="body2" color="textSecondary">{endpoint.description}</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="subtitle2" gutterBottom>Request Body:</Typography>
                <CodeBlock>{JSON.stringify(endpoint.body, null, 2)}</CodeBlock>
                {endpoint.response && (
                  <>
                    <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>Response:</Typography>
                    <CodeBlock>{JSON.stringify(endpoint.response, null, 2)}</CodeBlock>
                  </>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </TabPanel>

        {/* Quotes Tab */}
        <TabPanel value={activeTab} index={1}>
          <Typography variant="h6" gutterBottom>Quote & Estimate Management</Typography>
          {endpoints.quotes.map((endpoint, index) => (
            <Accordion key={index} sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Chip label={endpoint.method} color="success" size="small" />
                  <Typography variant="body1">{endpoint.endpoint}</Typography>
                  <Typography variant="body2" color="textSecondary">{endpoint.description}</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <CodeBlock>{JSON.stringify(endpoint.body, null, 2)}</CodeBlock>
              </AccordionDetails>
            </Accordion>
          ))}
        </TabPanel>

        {/* Customers Tab */}
        <TabPanel value={activeTab} index={2}>
          <Typography variant="h6" gutterBottom>Customer Management</Typography>
          {endpoints.customers.map((endpoint, index) => (
            <Accordion key={index} sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Chip label={endpoint.method} color={endpoint.method === 'POST' ? 'success' : 'primary'} size="small" />
                  <Typography variant="body1">{endpoint.endpoint}</Typography>
                  <Typography variant="body2" color="textSecondary">{endpoint.description}</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <CodeBlock>{JSON.stringify(endpoint.body || endpoint.query, null, 2)}</CodeBlock>
              </AccordionDetails>
            </Accordion>
          ))}
        </TabPanel>

        {/* Products Tab */}
        <TabPanel value={activeTab} index={3}>
          <Typography variant="h6" gutterBottom>Product & Inventory Management</Typography>
          {endpoints.products.map((endpoint, index) => (
            <Accordion key={index} sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Chip label={endpoint.method} color={endpoint.method === 'POST' ? 'success' : 'warning'} size="small" />
                  <Typography variant="body1">{endpoint.endpoint}</Typography>
                  <Typography variant="body2" color="textSecondary">{endpoint.description}</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <CodeBlock>{JSON.stringify(endpoint.body, null, 2)}</CodeBlock>
              </AccordionDetails>
            </Accordion>
          ))}
        </TabPanel>

        {/* AI & Automation Tab */}
        <TabPanel value={activeTab} index={4}>
          <Typography variant="h6" gutterBottom>AI & Automation Features</Typography>
          <Alert severity="success" sx={{ mb: 2 }}>
            <Typography variant="body2">
              🤖 <strong>AI Native:</strong> Use natural language to create invoices, parse emails, and automate workflows.
            </Typography>
          </Alert>
          {endpoints.automation.map((endpoint, index) => (
            <Accordion key={index} sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Chip label={endpoint.method} color="success" size="small" />
                  <Typography variant="body1">{endpoint.endpoint}</Typography>
                  <Typography variant="body2" color="textSecondary">{endpoint.description}</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <CodeBlock>{JSON.stringify(endpoint.body, null, 2)}</CodeBlock>
              </AccordionDetails>
            </Accordion>
          ))}
        </TabPanel>

        {/* Authentication Tab */}
        <TabPanel value={activeTab} index={5}>
          <Typography variant="h6" gutterBottom>API Authentication</Typography>
          <Alert severity="warning" sx={{ mb: 2 }}>
            <Typography variant="body2">
              🔐 Generate your API key from Settings → API Keys. Keep it secure and never expose it in client-side code.
            </Typography>
          </Alert>
          
          <Typography variant="subtitle2" gutterBottom>cURL Example:</Typography>
          <CodeBlock language="bash">{`curl -X POST ${baseUrl}/invoices \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "customerData": {
      "name": "John Doe",
      "email": "john@example.com"
    },
    "items": [
      {
        "description": "Consulting Service",
        "quantity": 1,
        "rate": 100.00
      }
    ]
  }'`}</CodeBlock>

          <Typography variant="subtitle2" gutterBottom sx={{ mt: 3 }}>JavaScript Example:</Typography>
          <CodeBlock language="javascript">{`const response = await fetch('${baseUrl}/invoices', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    customerData: {
      name: 'John Doe',
      email: 'john@example.com'
    },
    items: [{
      description: 'Consulting Service',
      quantity: 1,
      rate: 100.00
    }]
  })
});

const result = await response.json();
console.log('Invoice created:', result);`}</CodeBlock>
        </TabPanel>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button 
          variant="contained" 
          startIcon={<Webhook size={16} />}
          onClick={() => setApiKeyDialogOpen(true)}
        >
          Generate API Key
        </Button>
      </DialogActions>

      {/* API Key Management Dialog */}
      <APIKeyManagement 
        open={apiKeyDialogOpen} 
        onClose={() => setApiKeyDialogOpen(false)} 
      />
    </Dialog>
  );
};