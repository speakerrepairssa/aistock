import React from 'react';
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
} from '@mui/material';
import { Settings as SettingsIcon } from 'lucide-react';
import { useSettings, Currency, CURRENCY_NAMES, CURRENCY_SYMBOLS } from '../store/settingsStore';

export const Settings: React.FC = () => {
  const { currency, setCurrency } = useSettings();

  const currencies: Currency[] = ['USD', 'ZAR', 'EUR', 'GBP', 'INR', 'AED', 'SGD', 'AUD'];

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
                  onChange={(e) => setCurrency(e.target.value as Currency)}
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
                      onClick={() => setCurrency(curr)}
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
      </Grid>
    </Container>
  );
};
