import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Chip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
  Grid,
  Snackbar,
} from '@mui/material';
import {
  Trash2,
  CheckCircle,
  Eye,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { useSettings } from '../hooks/useSettings';
import { formatCurrencyWithCurrency } from '../utils/helpers';
import { AILOCRUploader } from '../components/AILOCRUploader';
import { OCRLineItem, InvoiceMetadata, matchProductsToOCRItems } from '../services/geminiOcrService';

export const OCRScanner: React.FC = () => {
  const { user } = useAuth();
  const { products, fetchProducts, updateProduct, updateProductQuantity } = useProducts();
  const { currency } = useSettings();

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [extractedItems, setExtractedItems] = useState<OCRLineItem[]>([]);
  const [invoiceMetadata, setInvoiceMetadata] = useState<InvoiceMetadata | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [viewImageDialog, setViewImageDialog] = useState(false);

  // Load products on mount
  React.useEffect(() => {
    if (user?.uid) {
      fetchProducts();
    }
  }, [user?.uid]);

  // Handle image selection
  const handleImageSelect = (imageBase64: string) => {
    setUploadedImage(imageBase64);
    setExtractedItems([]);
    setInvoiceMetadata(null);
  };

  // Handle extracted items from AI
  const handleExtractedItems = (items: OCRLineItem[]) => {
    console.log(`📦 Received ${items.length} items from Gemini`);
    
    // Auto-match with existing products
    const matchedItems = matchProductsToOCRItems(items, products);
    
    setExtractedItems(matchedItems);
    
    // Log matching stats
    const matched = matchedItems.filter(i => i.status === 'matched').length;
    const unmatched = matchedItems.filter(i => i.status === 'unmatched').length;
    console.log(`✅ Matched: ${matched}, ⚠️ Unmatched: ${unmatched}`);
  };

  // Handle extracted metadata
  const handleMetadataExtracted = (metadata: InvoiceMetadata) => {
    console.log('📋 Invoice metadata received:', metadata);
    setInvoiceMetadata(metadata);
  };



  // Update item match
  const updateItemMatch = (itemId: string, productId: string | null) => {
    setExtractedItems(items =>
      items.map(item => {
        if (item.id === itemId) {
          if (productId) {
            const product = products.find(p => p.id === productId);
            return {
              ...item,
              matchedProductId: productId,
              matchedProductName: product?.name || '',
              status: 'matched',
            };
          } else {
            return {
              ...item,
              matchedProductId: undefined,
              matchedProductName: undefined,
              status: 'unmatched',
            };
          }
        }
        return item;
      })
    );
  };

  // Update item field
  const updateItemField = (itemId: string, field: keyof OCRLineItem, value: any) => {
    setExtractedItems(items =>
      items.map(item => (item.id === itemId ? { ...item, [field]: value } : item))
    );
  };

  // Remove item
  const removeItem = (itemId: string) => {
    setExtractedItems(items => items.filter(item => item.id !== itemId));
  };

  // Confirm and apply updates
  const confirmAndApplyUpdates = async () => {
    if (!user?.uid) return;

    setIsProcessing(true);
    let successCount = 0;
    let errorCount = 0;

    try {
      for (const item of extractedItems) {
        if (item.status !== 'matched' || !item.matchedProductId) {
          continue;
        }

        try {
          // Update quantity if requested
          if (item.updateQuantity) {
            await updateProductQuantity(
              item.matchedProductId,
              item.quantity,
              'OCR Stock Update',
              user.uid
            );
          }

          // Update price if requested
          if (item.updatePrice) {
            await updateProduct(item.matchedProductId, {
              costPrice: item.price,
            });
          }

          successCount++;
        } catch (error) {
          console.error(`Failed to update product ${item.matchedProductName}:`, error);
          errorCount++;
        }
      }

      // Refresh products
      await fetchProducts();

      setSuccessMessage(
        `Successfully updated ${successCount} product${successCount !== 1 ? 's' : ''}` +
        (errorCount > 0 ? `. ${errorCount} failed.` : '')
      );
      
      // Reset state
      setExtractedItems([]);
      setUploadedImage(null);
      setShowConfirmDialog(false);
      
    } catch (error) {
      console.error('Error applying updates:', error);
      setErrorMessage('Failed to apply updates. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Reset scanner state
  const resetScanner = () => {
    setUploadedImage(null);
    setExtractedItems([]);
    setInvoiceMetadata(null);
    setIsProcessing(false);
  };

  const matchedCount = extractedItems.filter(i => i.status === 'matched').length;
  const unmatchedCount = extractedItems.filter(i => i.status === 'unmatched').length;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              🤖 AI Invoice Scanner
            </Typography>
            <Chip 
              icon={<Sparkles size={16} />}
              label="Powered by Gemini" 
              color="primary"
              sx={{ fontWeight: 600 }}
            />
          </Box>
          <Typography color="textSecondary">
            Upload supplier invoices to automatically extract and update stock levels with Google Gemini AI
          </Typography>
        </Box>
      </Box>

      {/* Info Card */}
      {!uploadedImage && extractedItems.length === 0 && (
        <Card sx={{ mb: 3, backgroundColor: '#f0f4ff', border: '1px solid #667eea' }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, color: '#667eea', fontWeight: 600 }}>
              How it works:
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: '#667eea',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    1
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Upload Invoice
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Take a clear photo or upload an image of your supplier invoice
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: '#667eea',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    2
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Review Matches
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      OCR extracts line items and auto-matches with your products
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: '#667eea',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    3
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Update Stock
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Confirm matches and apply quantity/price updates in bulk
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography variant="body2">
                <strong>Tip:</strong> For best results, ensure your product SKUs or Supplier Stock Codes match those on the invoice.
                The system will automatically match products based on SKU, supplier codes, or product names.
              </Typography>
            </Alert>
          </CardContent>
        </Card>
      )}

      {/* Gemini AI Upload Section */}
      {!uploadedImage && (
        <AILOCRUploader
          onImageSelect={handleImageSelect}
          onExtractedItems={handleExtractedItems}
          onMetadataExtracted={handleMetadataExtracted}
          onError={(error) => setErrorMessage(error)}
          onSuccess={(message) => setSuccessMessage(message)}
        />
      )}

      {/* Image Preview */}
      {uploadedImage && extractedItems.length === 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Sparkles size={20} color="#667eea" />
                <Typography variant="h6">Invoice Image</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  size="small"
                  startIcon={<Eye size={16} />}
                  onClick={() => setViewImageDialog(true)}
                >
                  View Full Size
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Trash2 size={16} />}
                  onClick={resetScanner}
                >
                  Clear
                </Button>
              </Box>
            </Box>
            <Box
              component="img"
              src={uploadedImage}
              sx={{ width: '100%', maxHeight: 400, objectFit: 'contain', borderRadius: 2 }}
              alt="Uploaded invoice"
            />
            <Alert severity="info" sx={{ mt: 2 }}>
              Gemini is processing your invoice. Extracted items will appear below...
            </Alert>
          </CardContent>
        </Card>
      )}

      {/* Invoice Metadata Card */}
      {invoiceMetadata && extractedItems.length > 0 && (
        <Card sx={{ mb: 3, backgroundColor: '#f8f9ff' }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Sparkles size={20} color="#667eea" />
              Invoice Details
            </Typography>
            <Grid container spacing={2}>
              {invoiceMetadata.supplierName && (
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="caption" color="textSecondary">Supplier</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {invoiceMetadata.supplierName}
                  </Typography>
                </Grid>
              )}
              {invoiceMetadata.invoiceNumber && (
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="caption" color="textSecondary">Invoice #</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {invoiceMetadata.invoiceNumber}
                  </Typography>
                </Grid>
              )}
              {invoiceMetadata.invoiceDate && (
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="caption" color="textSecondary">Date</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {invoiceMetadata.invoiceDate}
                  </Typography>
                </Grid>
              )}
              {invoiceMetadata.total && (
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="caption" color="textSecondary">Total</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {formatCurrencyWithCurrency(invoiceMetadata.total, (invoiceMetadata.currency as any) || currency)}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Extracted Items Table */}
      {extractedItems.length > 0 && (
        <>
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Chip
                icon={<CheckCircle size={16} />}
                label={`${matchedCount} Matched`}
                color="success"
                variant="outlined"
              />
              <Chip
                icon={<AlertTriangle size={16} />}
                label={`${unmatchedCount} Unmatched`}
                color="warning"
                variant="outlined"
              />
            </Box>
            <Button
              variant="contained"
              color="success"
              onClick={() => setShowConfirmDialog(true)}
              disabled={matchedCount === 0}
            >
              Apply Updates ({matchedCount})
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f3f4f6' }}>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>OCR Product Name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Match Product</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>Quantity</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>Cost Price</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>Total</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700 }}>Update</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {extractedItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Chip
                        label={item.status}
                        size="small"
                        color={
                          item.status === 'matched' ? 'success' :
                          item.status === 'unmatched' ? 'warning' : 'default'
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {item.productName}
                      </Typography>
                      {item.matchScore && (
                        <Typography variant="caption" color="textSecondary">
                          Match: {Math.round(item.matchScore * 100)}%
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell sx={{ minWidth: 200 }}>
                      <Autocomplete
                        size="small"
                        options={products}
                        getOptionLabel={(option) => `${option.name} (${option.sku})`}
                        value={products.find(p => p.id === item.matchedProductId) || null}
                        onChange={(_, newValue) => updateItemMatch(item.id, newValue?.id || null)}
                        renderInput={(params) => (
                          <TextField {...params} placeholder="Select product" />
                        )}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        size="small"
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItemField(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                        sx={{ width: 80 }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        size="small"
                        type="number"
                        value={item.price}
                        onChange={(e) => updateItemField(item.id, 'price', parseFloat(e.target.value) || 0)}
                        sx={{ width: 100 }}
                        InputProps={{
                          startAdornment: currency,
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {formatCurrencyWithCurrency(item.total, currency)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <input
                            type="checkbox"
                            checked={item.updateQuantity}
                            onChange={(e) => updateItemField(item.id, 'updateQuantity', e.target.checked)}
                          />
                          <Typography variant="caption">Qty</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <input
                            type="checkbox"
                            checked={item.updatePrice}
                            onChange={(e) => updateItemField(item.id, 'updatePrice', e.target.checked)}
                          />
                          <Typography variant="caption">Price</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 size={16} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Confirm Dialog */}
      <Dialog open={showConfirmDialog} onClose={() => setShowConfirmDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Confirm Stock Updates</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            You are about to update {matchedCount} product(s). This action will modify stock quantities and/or prices.
          </Alert>
          
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            Summary of Changes:
          </Typography>
          
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Changes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {extractedItems
                  .filter(item => item.status === 'matched')
                  .map(item => (
                    <TableRow key={item.id}>
                      <TableCell>{item.matchedProductName}</TableCell>
                      <TableCell>
                        {item.updateQuantity && `Add ${item.quantity} units`}
                        {item.updateQuantity && item.updatePrice && ', '}
                        {item.updatePrice && `Update price to ${formatCurrencyWithCurrency(item.price, currency)}`}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="success"
            onClick={confirmAndApplyUpdates}
            disabled={isProcessing}
          >
            {isProcessing ? 'Updating...' : 'Confirm & Apply'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Image Dialog */}
      <Dialog open={viewImageDialog} onClose={() => setViewImageDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle>Invoice Image</DialogTitle>
        <DialogContent>
          {uploadedImage && (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <img
                src={uploadedImage}
                alt="Invoice"
                style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain' }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewImageDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Success/Error Messages */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setSuccessMessage('')} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setErrorMessage('')} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};
