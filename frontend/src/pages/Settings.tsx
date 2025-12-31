import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Grid,
  Alert,
  CircularProgress,
  Button,
} from '@mui/material';
import { Settings as SettingsIcon, Key } from 'lucide-react';
import { useSettings, Currency, CURRENCY_NAMES, CURRENCY_SYMBOLS } from '../store/settingsStore';
import { useAuth } from '../hooks';
import { APIKeyManagement } from '../components';

export const Settings: React.FC = () => {
  const { user } = useAuth();
  const { currency, loading, error, isInitialized, setCurrency, initializeSettings } = useSettings();
  const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState(false);

  // Initialize settings when component mounts and user is available
  useEffect(() => {
    if (user?.uid && !isInitialized) {
      initializeSettings(user.uid);
    }
  }, [user, isInitialized, initializeSettings]);

  const currencies: Currency[] = ['USD', 'ZAR', 'EUR', 'GBP', 'INR', 'AED', 'SGD', 'AUD'];

  const handleCurrencyChange = async (newCurrency: Currency) => {
    if (user?.uid) {
      await setCurrency(user.uid, newCurrency);
    }
  };

  if (loading && !isInitialized) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }} color="textSecondary">
          Loading settings...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <SettingsIcon size={32} />
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Settings
          </Typography>
          <Typography color="textSecondary">
            Customize your inventory management experience
          </Typography>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Error loading settings: {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Currency Settings */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Currency Settings
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                Select the currency used for all prices and valuations in your inventory system.
              </Typography>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Currency</InputLabel>
                <Select
                  value={currency}
                  label="Currency"
                  onChange={(e) => handleCurrencyChange(e.target.value as Currency)}
                  disabled={loading}
                >
                  {currencies.map((curr) => (
                    <MenuItem key={curr} value={curr}>
                      {CURRENCY_NAMES[curr]} ({CURRENCY_SYMBOLS[curr]})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Paper
                sx={{
                  p: 2,
                  backgroundColor: '#f5f5f5',
                  border: '1px solid #e0e0e0',
                }}
              >
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  Current Selection:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {CURRENCY_SYMBOLS[currency]}
                  </Typography>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {CURRENCY_NAMES[currency]}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Code: {currency}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </CardContent>
          </Card>
        </Grid>

        {/* Preview */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Price Preview
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                Example of how prices will be displayed throughout the app.
              </Typography>

              <Box sx={{ space: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box
                  sx={{
                    p: 2,
                    backgroundColor: '#f9f9f9',
                    border: '1px solid #e0e0e0',
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="caption" color="textSecondary">
                    Regular Price
                  </Typography>
                  <Typography variant="h6">
                    {CURRENCY_SYMBOLS[currency]} 999.99
                  </Typography>
                </Box>

                <Box
                  sx={{
                    p: 2,
                    backgroundColor: '#f9f9f9',
                    border: '1px solid #e0e0e0',
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="caption" color="textSecondary">
                    Inventory Value
                  </Typography>
                  <Typography variant="h6">
                    {CURRENCY_SYMBOLS[currency]} 45,250.75
                  </Typography>
                </Box>

                <Box
                  sx={{
                    p: 2,
                    backgroundColor: '#f9f9f9',
                    border: '1px solid #e0e0e0',
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="caption" color="textSecondary">
                    Bulk Price
                  </Typography>
                  <Typography variant="h6">
                    {CURRENCY_SYMBOLS[currency]} 749.99
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Info */}
        <Grid item xs={12}>
          <Alert severity="info">
            <Typography variant="body2">
              <strong>Note:</strong> Currency settings are saved locally and apply across all pages in your inventory system. Changing the currency will update all price displays immediately, but will not convert the actual values stored in your database.
            </Typography>
          </Alert>
        </Grid>

        {/* Supported Currencies */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Supported Currencies
              </Typography>
              <Grid container spacing={2}>
                {currencies.map((curr) => (
                  <Grid item xs={12} sm={6} md={4} key={curr}>
                    <Box
                      onClick={() => setCurrency(user!.uid, curr)}
                      sx={{
                        p: 2,
                        border: curr === currency ? '2px solid #667eea' : '1px solid #e0e0e0',
                        borderRadius: 1,
                        backgroundColor: curr === currency ? '#f0f4ff' : 'transparent',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          borderColor: '#667eea',
                          backgroundColor: '#f0f4ff',
                        },
                      }}
                    >
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {CURRENCY_NAMES[curr]}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {curr} ({CURRENCY_SYMBOLS[curr]})
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* API Integration */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  API Integration
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<Key size={16} />}
                  onClick={() => setApiKeyDialogOpen(true)}
                >
                  Manage API Keys
                </Button>
              </Box>
              
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Generate API keys to integrate AiStock with external applications, automation tools, and AI systems.
              </Typography>

              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  🤖 <strong>AI Native:</strong> AiStock includes built-in AI automation endpoints for creating invoices from natural language, 
                  processing emails, and automating workflows.
                </Typography>
              </Alert>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                      📄
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      Invoice API
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Create, update, and manage invoices programmatically
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                      👥
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      Customer API
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Sync customer data with CRM systems
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                      📦
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      Inventory API
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Real-time stock updates and management
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                      🤖
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      AI Automation
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Natural language invoice creation and processing
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* API Key Management Dialog */}
      <APIKeyManagement 
        open={apiKeyDialogOpen} 
        onClose={() => setApiKeyDialogOpen(false)} 
      />
    </Container>
  );
};
