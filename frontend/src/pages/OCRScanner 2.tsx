import React from 'react';
import { Container, Box, Typography } from '@mui/material';

export const OCRScanner: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          OCR Stock Scanner
        </Typography>
        <Typography color="textSecondary">
          Scan product images to update stock levels automatically (Coming Soon)
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          backgroundColor: '#f5f5f5',
          borderRadius: 2,
          border: '2px dashed #ddd',
        }}
      >
        <Typography color="textSecondary">
          OCR integration will be available in the next release
        </Typography>
      </Box>
    </Container>
  );
};
