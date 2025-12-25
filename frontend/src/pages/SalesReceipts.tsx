import React from 'react';
import { Container, Box, Card, CardContent, Typography, Button } from '@mui/material';
import { DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SalesReceipts: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Sales Receipts
        </Typography>
        <Button variant="contained" onClick={() => navigate('/sales')}>
          Back to Quotations
        </Button>
      </Box>

      <Card>
        <CardContent sx={{ textAlign: 'center', py: 6 }}>
          <DollarSign size={48} style={{ color: '#667eea', marginBottom: 16 }} />
          <Typography variant="h6" sx={{ mb: 2 }}>
            Sales Receipts Management
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Track sales receipts and payment confirmations for completed transactions.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This feature is coming soon!
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};
