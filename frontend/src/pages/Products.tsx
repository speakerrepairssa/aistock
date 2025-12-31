import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import {
  Container,
  Box,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Avatar,
  Snackbar,
} from '@mui/material';
import { Search, Plus, Upload, Download, Barcode } from 'lucide-react';
import { LinearProgress } from '@mui/material';
import { useProducts } from '../hooks';
import { useAuth } from '../hooks';
import { Product } from '../types';
import { getStockStatus } from '../utils';
import { formatCurrencyWithCurrency } from '../utils/helpers';
import { useSettings } from '../store/settingsStore';
import { cloudinaryService } from '../services/cloudinaryService';
import { exportProductsToCSV, parseCSVFile, parseExcelFile, detectColumns, getColumnSuggestions, ColumnMapping } from '../utils/csvHelper';

export const Products: React.FC = () => {
  const { products, loading, error, fetchProducts, addProduct, updateProduct, updateProductQuantity, generateBarcodesForAll } = useProducts();
  const { user, loading: authLoading } = useAuth();
  const { currency } = useSettings();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openImportDialog, setOpenImportDialog] = useState(false);
  const [openMappingDialog, setOpenMappingDialog] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [sourceHeaders, setSourceHeaders] = useState<string[]>([]);
  const [columnMapping, setColumnMapping] = useState<ColumnMapping>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [reason, setReason] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [importLoading, setImportLoading] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);
  const [importProgress, setImportProgress] = useState(0);
  const [importTotal, setImportTotal] = useState(0);
  const [generatingBarcodes, setGeneratingBarcodes] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info'>('success');
  const [editFormData, setEditFormData] = useState({
    name: '',
    sku: '',
    description: '',
    category: '',
    price: 0,
    retailPrice: 0,
    bulkPrice: 0,
    costPrice: 0,
    reorderLevel: 10,
    location: '',
    supplier: '',
    supplierStockCode: '',
    manufacturer: '',
    barcode: '',
    notes: '',
    imageUrl: '',
  });
  const [addFormData, setAddFormData] = useState({
    name: '',
    sku: '',
    description: '',
    category: '',
    price: 0,
    retailPrice: 0,
    bulkPrice: 0,
    costPrice: 0,
    quantity: 0,
    reorderLevel: 10,
    location: '',
    supplier: '',
    supplierStockCode: '',
    manufacturer: '',
    barcode: '',
    notes: '',
    imageUrl: '',
  });

  useEffect(() => {
    console.log('Products page mounted, user:', user);
    console.log('Auth loading:', authLoading);
    
    if (!authLoading && user) {
      console.log('Fetching products for user:', user.uid);
      fetchProducts();
    } else if (!authLoading && !user) {
      console.log('No user authenticated');
    }
  }, [user, authLoading]);

  useEffect(() => {
    console.log('Products updated:', products.length, products);
    console.log('Loading:', loading);
    console.log('Error:', error);
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(
          (p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, products]);

  const handleOpenEditDialog = (product: Product) => {
    setSelectedProduct(product);
    setEditFormData({
      name: product.name,
      sku: product.sku,
      description: product.description,
      category: product.category,
      price: product.price,
      retailPrice: product.retailPrice || 0,
      bulkPrice: product.bulkPrice || 0,
      costPrice: product.costPrice,
      reorderLevel: product.reorderLevel,
      location: product.location,
      supplier: product.supplier || '',
      supplierStockCode: product.supplierStockCode || '',
      manufacturer: product.manufacturer || '',
      barcode: product.barcode || '',
      notes: product.notes || '',
      imageUrl: product.imageUrl || '',
    });
    setImageFile(null);
    setImagePreview(product.imageUrl || '');
    setOpenEditDialog(true);
  };

  const handleEditProduct = async () => {
    if (!selectedProduct) return;
    if (!editFormData.name || !editFormData.sku || !editFormData.location) {
      alert('Please fill in product name, SKU, and location');
      return;
    }
    try {
      setUploading(true);
      let imageUrl = editFormData.imageUrl;

      // Upload new image if selected
      if (imageFile) {
        imageUrl = await cloudinaryService.uploadProductImage(imageFile, selectedProduct.id);
      }

      await updateProduct(selectedProduct.id, {
        name: editFormData.name,
        sku: editFormData.sku,
        description: editFormData.description,
        category: editFormData.category,
        price: editFormData.price,
        retailPrice: editFormData.retailPrice > 0 ? editFormData.retailPrice : undefined,
        bulkPrice: editFormData.bulkPrice > 0 ? editFormData.bulkPrice : undefined,
        costPrice: editFormData.costPrice,
        reorderLevel: editFormData.reorderLevel,
        location: editFormData.location,
        supplier: editFormData.supplier || undefined,
        supplierStockCode: editFormData.supplierStockCode || undefined,
        manufacturer: editFormData.manufacturer || undefined,
        barcode: editFormData.barcode || undefined,
        notes: editFormData.notes || undefined,
        imageUrl: imageUrl || undefined,
      });
      setOpenEditDialog(false);
      setImageFile(null);
      setImagePreview('');
      setSelectedProduct(null);
      await fetchProducts();
    } catch (err) {
      console.error('Error updating product:', err);
      alert('Failed to update product');
    } finally {
      setUploading(false);
    }
  };

  const compressImage = async (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Resize if image is too large
          const maxWidth = 1200;
          const maxHeight = 1200;
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedFile = new File([blob], file.name, {
                  type: 'image/jpeg',
                  lastModified: Date.now(),
                });
                resolve(compressedFile);
              } else {
                resolve(file);
              }
            },
            'image/jpeg',
            0.8
          );
        };
      };
    });
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setUploading(true);
        const compressedFile = await compressImage(file);
        setImageFile(compressedFile);

        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
          setUploading(false);
        };
        reader.readAsDataURL(compressedFile);
      } catch (err) {
        console.error('Error compressing image:', err);
        setUploading(false);
        alert('Failed to process image');
      }
    }
  };

  const handleAddProduct = async () => {
    if (!addFormData.name || !addFormData.sku || !addFormData.location) {
      alert('Please fill in product name, SKU, and location');
      return;
    }
    try {
      setUploading(true);
      let imageUrl = '';

      // Upload image if selected
      if (imageFile) {
        const tempId = Date.now().toString();
        imageUrl = await cloudinaryService.uploadProductImage(imageFile, tempId);
      }

      await addProduct({
        name: addFormData.name,
        sku: addFormData.sku,
        description: addFormData.description,
        category: addFormData.category,
        price: addFormData.price,
        retailPrice: addFormData.retailPrice > 0 ? addFormData.retailPrice : undefined,
        bulkPrice: addFormData.bulkPrice > 0 ? addFormData.bulkPrice : undefined,
        costPrice: addFormData.costPrice,
        quantity: addFormData.quantity,
        reorderLevel: addFormData.reorderLevel,
        location: addFormData.location,
        supplier: addFormData.supplier || undefined,
        supplierStockCode: addFormData.supplierStockCode || undefined,
        manufacturer: addFormData.manufacturer || undefined,
        barcode: addFormData.barcode || undefined,
        notes: addFormData.notes || undefined,
        imageUrl: imageUrl || undefined,
        status: 'active',
        tags: [],
      });
      setOpenAddDialog(false);
      setImageFile(null);
      setImagePreview('');
      setAddFormData({
        name: '',
        sku: '',
        description: '',
        category: '',
        price: 0,
        retailPrice: 0,
        bulkPrice: 0,
        costPrice: 0,
        quantity: 0,
        reorderLevel: 10,
        location: '',
        supplier: '',
        supplierStockCode: '',
        manufacturer: '',
        barcode: '',
        notes: '',
        imageUrl: '',
      });
      await fetchProducts();
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Failed to add product');
    } finally {
      setUploading(false);
    }
  };

  const handleGenerateBarcodes = async () => {
    const productsWithoutBarcodes = products.filter(p => !p.barcode);
    if (productsWithoutBarcodes.length === 0) {
      setSnackbarMessage('All products already have barcodes!');
      setSnackbarSeverity('info');
      setSnackbarOpen(true);
      return;
    }

    if (!confirm(`Generate barcodes for ${productsWithoutBarcodes.length} products?`)) {
      return;
    }

    try {
      setGeneratingBarcodes(true);
      const updated = await generateBarcodesForAll();
      setSnackbarMessage(`Successfully generated barcodes for ${updated} products!`);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      await fetchProducts(); // Refresh the product list
    } catch (err) {
      console.error('Error generating barcodes:', err);
      setSnackbarMessage('Failed to generate barcodes');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setGeneratingBarcodes(false);
    }
  };

  const handleUpdateQuantity = async () => {
    if (!selectedProduct) return;
    try {
      await updateProductQuantity(
        selectedProduct.id,
        selectedProduct.quantity + quantity,
        reason,
        user?.uid || ''
      );
      setOpenUpdateDialog(false);
      setSelectedProduct(null);
      setQuantity(0);
      setReason('');
      await fetchProducts();
    } catch (err) {
      console.error('Error updating quantity:', err);
      alert('Failed to update quantity');
    }
  };

  const handleImportCSV = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // Detect columns from file
      const fileType = file.type;
      const fileName = file.name.toLowerCase();
      
      let headers: string[] = [];
      
      if (fileType === 'text/csv' || fileName.endsWith('.csv')) {
        // Read CSV
        const text = await file.text();
        const lines = text.split('\n').filter((line) => line.trim());
        if (lines.length > 0) {
          headers = lines[0].split(',').map((h) => h.trim().replace(/^"/, '').replace(/"$/, ''));
        }
      } else if (
        fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        fileType === 'application/vnd.ms-excel' ||
        fileName.endsWith('.xlsx') ||
        fileName.endsWith('.xls')
      ) {
        // For Excel, we need to read with XLSX
        const arrayBuffer = await file.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[];
        if (jsonData.length > 0) {
          headers = (jsonData[0] as string[]).map((h) => h?.toString().trim() || '');
        }
      } else {
        throw new Error('Unsupported file format. Please use CSV or Excel (.xls, .xlsx) files.');
      }

      if (headers.length === 0) {
        setImportError('No headers found in file');
        return;
      }

      // Check if columns are valid
      const { isValid } = detectColumns(headers);
      
      if (!isValid) {
        // Show mapping dialog
        setSourceHeaders(headers);
        setImportFile(file);
        const suggestions = getColumnSuggestions(headers);
        setColumnMapping(suggestions);
        setOpenImportDialog(false);
        setOpenMappingDialog(true);
      } else {
        // Columns match, proceed with import
        setImportFile(file);
        setSourceHeaders(headers);
        setColumnMapping({});
        await performImport(file, {});
      }
    } catch (error) {
      setImportError(error instanceof Error ? error.message : 'Failed to detect columns');
    }
  };

  const performImport = async (file: File, mapping: ColumnMapping) => {
    if (!user?.uid) return;

    setImportLoading(true);
    setImportError(null);
    setImportSuccess(null);

    try {
      let parsedProducts: Product[];
      
      const fileType = file.type;
      const fileName = file.name.toLowerCase();
      
      if (fileType === 'text/csv' || fileName.endsWith('.csv')) {
        parsedProducts = await parseCSVFile(file, Object.keys(mapping).length > 0 ? mapping : undefined);
      } else if (
        fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        fileType === 'application/vnd.ms-excel' ||
        fileName.endsWith('.xlsx') ||
        fileName.endsWith('.xls')
      ) {
        parsedProducts = await parseExcelFile(file, Object.keys(mapping).length > 0 ? mapping : undefined);
      } else {
        throw new Error('Unsupported file format');
      }
      
      let successCount = 0;
      let errorCount = 0;
      setImportTotal(parsedProducts.length);
      setImportProgress(0);

      // Add each product with progress tracking
      for (let i = 0; i < parsedProducts.length; i++) {
        const product = parsedProducts[i];
        try {
          await addProduct(product);
          successCount++;
        } catch (error) {
          errorCount++;
          console.error(`Error adding product ${product.name}:`, error);
        }
        // Update progress
        setImportProgress(i + 1);
      }

      // Refresh products
      await fetchProducts();

      const message = `Successfully imported ${successCount} products${errorCount > 0 ? `. ${errorCount} failed.` : '.'}`;
      setImportSuccess(message);
      setOpenImportDialog(false);
      setOpenMappingDialog(false);
      setImportFile(null);
      setSourceHeaders([]);
      setColumnMapping({});
      setImportProgress(0);
      setImportTotal(0);
    } catch (error) {
      setImportError(error instanceof Error ? error.message : 'Failed to import file');
      setImportProgress(0);
      setImportTotal(0);
    } finally {
      setImportLoading(false);
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
            Products
          </Typography>
          <Typography color="textSecondary">
            Manage your inventory items
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<Plus size={20} />}
            sx={{ textTransform: 'none' }}
            onClick={() => setOpenAddDialog(true)}
          >
            Add Product
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<Barcode size={20} />}
            sx={{ textTransform: 'none' }}
            onClick={handleGenerateBarcodes}
            disabled={generatingBarcodes || products.filter(p => !p.barcode).length === 0}
          >
            {generatingBarcodes ? 'Generating...' : `Generate Barcodes (${products.filter(p => !p.barcode).length})`}
          </Button>
          <Button
            variant="outlined"
            startIcon={<Download size={20} />}
            sx={{ textTransform: 'none' }}
            onClick={() => exportProductsToCSV(products)}
            disabled={products.length === 0}
          >
            Export CSV
          </Button>
          <Button
            variant="outlined"
            startIcon={<Upload size={20} />}
            sx={{ textTransform: 'none' }}
            onClick={() => setOpenImportDialog(true)}
          >
            Import CSV
          </Button>
        </Box>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Paper sx={{ mb: 3, p: 2 }}>
        <TextField
          fullWidth
          placeholder="Search by product name, SKU, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <Search size={20} style={{ marginRight: 12, color: '#999' }} />,
          }}
        />
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#fafafa' }}>
              <TableCell sx={{ fontWeight: 600 }}>Image</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>SKU</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Product Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Price</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Quantity</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Reorder Level</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => {
              const status = getStockStatus(product.quantity, product.reorderLevel);
              let chipColor: 'success' | 'warning' | 'error' | 'default' = 'success';
              if (status === 'low-stock') chipColor = 'warning';
              else if (status === 'out-of-stock') chipColor = 'error';

              const displayStatus = status === 'low-stock' ? 'Low Stock' : status === 'out-of-stock' ? 'Out of Stock' : 'In Stock';

              return (
                <TableRow key={product.id} hover>                  <TableCell>
                    {product.imageUrl ? (
                      <Avatar src={product.imageUrl} sx={{ width: 40, height: 40 }} />
                    ) : (
                      <Avatar sx={{ width: 40, height: 40, backgroundColor: '#e0e0e0', color: '#999' }}>No Img</Avatar>
                    )}
                  </TableCell>                  <TableCell sx={{ fontFamily: 'monospace', fontWeight: 500 }}>{product.sku}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell align="right">{formatCurrencyWithCurrency(product.price, currency)}</TableCell>
                  <TableCell align="right">{product.quantity}</TableCell>
                  <TableCell align="right">{product.reorderLevel}</TableCell>
                  <TableCell>
                    <Chip label={displayStatus} color={chipColor} size="small" />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleOpenEditDialog(product)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => {
                          setSelectedProduct(product);
                          setOpenUpdateDialog(true);
                        }}
                      >
                        Stock
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredProducts.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography color="textSecondary">No products found</Typography>
        </Box>
      )}

      {/* Add Product Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Product Name"
            value={addFormData.name}
            onChange={(e) => setAddFormData({ ...addFormData, name: e.target.value })}
            fullWidth
            required
          />
          <TextField
            label="SKU"
            value={addFormData.sku}
            onChange={(e) => setAddFormData({ ...addFormData, sku: e.target.value })}
            fullWidth
            required
          />
          <TextField
            label="Description"
            value={addFormData.description}
            onChange={(e) => setAddFormData({ ...addFormData, description: e.target.value })}
            fullWidth
            multiline
            rows={2}
          />
          <TextField
            label="Category"
            value={addFormData.category}
            onChange={(e) => setAddFormData({ ...addFormData, category: e.target.value })}
            fullWidth
          />
          <TextField
            label="Price (Regular/Standard)"
            type="number"
            value={addFormData.price}
            onChange={(e) => setAddFormData({ ...addFormData, price: parseFloat(e.target.value) || 0 })}
            fullWidth
            required
            inputProps={{ step: '0.01' }}
          />
          <TextField
            label="Retail Dealer Price"
            type="number"
            value={addFormData.retailPrice}
            onChange={(e) => setAddFormData({ ...addFormData, retailPrice: parseFloat(e.target.value) || 0 })}
            fullWidth
            placeholder="Optional retail/dealer pricing"
            inputProps={{ step: '0.01' }}
          />
          <TextField
            label="Bulk Price"
            type="number"
            value={addFormData.bulkPrice}
            onChange={(e) => setAddFormData({ ...addFormData, bulkPrice: parseFloat(e.target.value) || 0 })}
            fullWidth
            placeholder="Optional wholesale/bulk pricing"
            inputProps={{ step: '0.01' }}
          />
          <TextField
            label="Cost Price"
            type="number"
            value={addFormData.costPrice}
            onChange={(e) => setAddFormData({ ...addFormData, costPrice: parseFloat(e.target.value) || 0 })}
            fullWidth
            inputProps={{ step: '0.01' }}
          />
          <TextField
            label="Initial Quantity"
            type="number"
            value={addFormData.quantity}
            onChange={(e) => setAddFormData({ ...addFormData, quantity: parseInt(e.target.value) || 0 })}
            fullWidth
          />
          <TextField
            label="Reorder Level"
            type="number"
            value={addFormData.reorderLevel}
            onChange={(e) => setAddFormData({ ...addFormData, reorderLevel: parseInt(e.target.value) || 10 })}
            fullWidth
          />
          <TextField
            label="Location"
            value={addFormData.location}
            onChange={(e) => setAddFormData({ ...addFormData, location: e.target.value })}
            fullWidth
            required
            placeholder="e.g., Warehouse A, Shelf 3, Bin 5"
          />
          <TextField
            label="Supplier"
            value={addFormData.supplier}
            onChange={(e) => setAddFormData({ ...addFormData, supplier: e.target.value })}
            fullWidth
            placeholder="Optional supplier name"
          />
          <TextField
            label="Supplier Stock Code"
            value={addFormData.supplierStockCode}
            onChange={(e) => setAddFormData({ ...addFormData, supplierStockCode: e.target.value })}
            fullWidth
            placeholder="Optional supplier product code (for OCR)"
          />
          <TextField
            label="Manufacturer"
            value={addFormData.manufacturer}
            onChange={(e) => setAddFormData({ ...addFormData, manufacturer: e.target.value })}
            fullWidth
            placeholder="Optional manufacturer name"
          />
          <TextField
            label="Barcode"
            value={addFormData.barcode}
            onChange={(e) => setAddFormData({ ...addFormData, barcode: e.target.value })}
            fullWidth
            placeholder="Optional product barcode"
          />
          <TextField
            label="Notes"
            value={addFormData.notes}
            onChange={(e) => setAddFormData({ ...addFormData, notes: e.target.value })}
            fullWidth
            multiline
            rows={2}
            placeholder="Additional notes about the product"
          />
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Product Image
            </Typography>
            {imagePreview && (
              <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                <Avatar
                  src={imagePreview}
                  sx={{ width: 120, height: 120 }}
                />
              </Box>
            )}
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="image-input"
              type="file"
              onChange={handleImageSelect}
            />
            <label htmlFor="image-input">
              <Button
                variant="outlined"
                component="span"
                startIcon={<Upload size={18} />}
                fullWidth
                disabled={uploading}
              >
                {uploading ? 'Processing Image...' : imageFile ? 'Change Image' : 'Upload Product Image'}
              </Button>
            </label>
            {imageFile && (
              <Box sx={{ mt: 1 }}>
                <Typography variant="caption" sx={{ display: 'block', color: '#666' }}>
                  {imageFile.name} ({(imageFile.size / 1024).toFixed(1)} KB)
                </Typography>
                <Typography variant="caption" sx={{ display: 'block', color: '#4caf50', fontWeight: 500 }}>
                  ✓ Ready to upload
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpenAddDialog(false);
            setImageFile(null);
            setImagePreview('');
          }}>Cancel</Button>
          <Button onClick={handleAddProduct} variant="contained" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Add Product'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Product Name"
            value={editFormData.name}
            onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
            fullWidth
            required
          />
          <TextField
            label="SKU"
            value={editFormData.sku}
            onChange={(e) => setEditFormData({ ...editFormData, sku: e.target.value })}
            fullWidth
            required
          />
          <TextField
            label="Description"
            value={editFormData.description}
            onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
            fullWidth
            multiline
            rows={2}
          />
          <TextField
            label="Category"
            value={editFormData.category}
            onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
            fullWidth
          />
          <TextField
            label="Price (Regular/Standard)"
            type="number"
            value={editFormData.price}
            onChange={(e) => setEditFormData({ ...editFormData, price: parseFloat(e.target.value) || 0 })}
            fullWidth
            required
            inputProps={{ step: '0.01' }}
          />
          <TextField
            label="Retail Dealer Price"
            type="number"
            value={editFormData.retailPrice}
            onChange={(e) => setEditFormData({ ...editFormData, retailPrice: parseFloat(e.target.value) || 0 })}
            fullWidth
            placeholder="Optional retail/dealer pricing"
            inputProps={{ step: '0.01' }}
          />
          <TextField
            label="Bulk Price"
            type="number"
            value={editFormData.bulkPrice}
            onChange={(e) => setEditFormData({ ...editFormData, bulkPrice: parseFloat(e.target.value) || 0 })}
            fullWidth
            placeholder="Optional wholesale/bulk pricing"
            inputProps={{ step: '0.01' }}
          />
          <TextField
            label="Cost Price"
            type="number"
            value={editFormData.costPrice}
            onChange={(e) => setEditFormData({ ...editFormData, costPrice: parseFloat(e.target.value) || 0 })}
            fullWidth
            inputProps={{ step: '0.01' }}
          />
          <TextField
            label="Reorder Level"
            type="number"
            value={editFormData.reorderLevel}
            onChange={(e) => setEditFormData({ ...editFormData, reorderLevel: parseInt(e.target.value) || 10 })}
            fullWidth
          />
          <TextField
            label="Location"
            value={editFormData.location}
            onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
            fullWidth
            required
            placeholder="e.g., Warehouse A, Shelf 3, Bin 5"
          />
          <TextField
            label="Supplier"
            value={editFormData.supplier}
            onChange={(e) => setEditFormData({ ...editFormData, supplier: e.target.value })}
            fullWidth
            placeholder="Optional supplier name"
          />
          <TextField
            label="Supplier Stock Code"
            value={editFormData.supplierStockCode}
            onChange={(e) => setEditFormData({ ...editFormData, supplierStockCode: e.target.value })}
            fullWidth
            placeholder="Optional supplier product code (for OCR)"
          />
          <TextField
            label="Manufacturer"
            value={editFormData.manufacturer}
            onChange={(e) => setEditFormData({ ...editFormData, manufacturer: e.target.value })}
            fullWidth
            placeholder="Optional manufacturer name"
          />
          <TextField
            label="Barcode"
            value={editFormData.barcode}
            onChange={(e) => setEditFormData({ ...editFormData, barcode: e.target.value })}
            fullWidth
            placeholder="Optional product barcode"
          />
          <TextField
            label="Notes"
            value={editFormData.notes}
            onChange={(e) => setEditFormData({ ...editFormData, notes: e.target.value })}
            fullWidth
            multiline
            rows={2}
            placeholder="Additional notes about the product"
          />
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Product Image
            </Typography>
            {imagePreview && (
              <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                <Avatar
                  src={imagePreview}
                  sx={{ width: 120, height: 120 }}
                />
              </Box>
            )}
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="edit-image-input"
              type="file"
              onChange={handleImageSelect}
            />
            <label htmlFor="edit-image-input">
              <Button
                variant="outlined"
                component="span"
                startIcon={<Upload size={18} />}
                fullWidth
                disabled={uploading}
              >
                {uploading ? 'Processing Image...' : imageFile ? 'Change Image' : 'Upload Product Image'}
              </Button>
            </label>
            {imageFile && (
              <Box sx={{ mt: 1 }}>
                <Typography variant="caption" sx={{ display: 'block', color: '#666' }}>
                  {imageFile.name} ({(imageFile.size / 1024).toFixed(1)} KB)
                </Typography>
                <Typography variant="caption" sx={{ display: 'block', color: '#4caf50', fontWeight: 500 }}>
                  ✓ Ready to upload
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpenEditDialog(false);
            setImageFile(null);
            setImagePreview('');
            setSelectedProduct(null);
          }}>Cancel</Button>
          <Button onClick={handleEditProduct} variant="contained" disabled={uploading}>
            {uploading ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Quantity Dialog */}
      <Dialog open={openUpdateDialog} onClose={() => setOpenUpdateDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Update Stock Quantity</DialogTitle>
        <DialogContent sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {selectedProduct && (
            <>
              <Box>
                <strong>{selectedProduct.name}</strong>
                <Typography variant="caption" sx={{ display: 'block', color: '#666' }}>
                  Current: {selectedProduct.quantity} | Reorder Level: {selectedProduct.reorderLevel}
                </Typography>
              </Box>
              <TextField
                type="number"
                label="Quantity Change"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                helperText="Positive for stock in, negative for stock out"
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel>Reason</InputLabel>
                <Select
                  value={reason}
                  label="Reason"
                  onChange={(e) => setReason(e.target.value)}
                >
                  <MenuItem value="purchase">Purchase</MenuItem>
                  <MenuItem value="sale">Sale</MenuItem>
                  <MenuItem value="inventory_count">Inventory Count</MenuItem>
                  <MenuItem value="damage">Damage/Loss</MenuItem>
                  <MenuItem value="return">Return</MenuItem>
                  <MenuItem value="adjustment">Adjustment</MenuItem>
                </Select>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUpdateDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdateQuantity} variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Import CSV Dialog */}
      <Dialog open={openImportDialog} onClose={() => {
        setOpenImportDialog(false);
        setImportError(null);
        setImportSuccess(null);
      }} maxWidth="sm" fullWidth>
        <DialogTitle>Import Products from CSV</DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Upload a CSV or Excel file (.csv, .xls, .xlsx) with the following columns: Name, SKU, Price, Quantity, Category, Supplier, Supplier Stock Code, Reorder Level, Description
          </Typography>

          {importError && (
            <Alert severity="error" sx={{ mb: 2 }}>{importError}</Alert>
          )}

          {importSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>{importSuccess}</Alert>
          )}

          <Box sx={{ 
            border: '2px dashed #667eea', 
            borderRadius: 2, 
            p: 3, 
            textAlign: 'center',
            cursor: 'pointer',
            backgroundColor: '#f9f9f9',
            '&:hover': {
              backgroundColor: '#f0f0f0',
            }
          }}>
            <input
              type="file"
              accept=".csv,.xls,.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
              onChange={handleImportCSV}
              disabled={importLoading}
              style={{ display: 'none' }}
              id="csv-input"
            />
            <label htmlFor="csv-input" style={{ cursor: 'pointer', display: 'block' }}>
              <Upload size={32} style={{ marginBottom: 8, color: '#667eea' }} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Click to select CSV or Excel file
              </Typography>
              <Typography variant="caption" color="textSecondary">
                or drag and drop
              </Typography>
            </label>
          </Box>

          <Typography variant="caption" color="textSecondary" sx={{ mt: 2, display: 'block' }}>
            📥 <strong>Example CSV format:</strong><br/>
            Name,SKU,Price,Quantity,Category,Supplier,Supplier Stock Code,Reorder Level,Description<br/>
            "Product 1","SKU001",29.99,100,"Electronics","Supplier A","SUP-001",20,"Description here"
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpenImportDialog(false);
            setImportError(null);
            setImportSuccess(null);
          }} disabled={importLoading}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Column Mapping Dialog */}
      <Dialog open={openMappingDialog} onClose={() => {
        setOpenMappingDialog(false);
        setImportFile(null);
        setSourceHeaders([]);
        setColumnMapping({});
        setImportError(null);
      }} maxWidth="sm" fullWidth>
        <DialogTitle>Map Spreadsheet Columns</DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          {importError && (
            <Alert severity="error" sx={{ mb: 2 }}>{importError}</Alert>
          )}

          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            Select which spreadsheet column contains each required field:
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {['name', 'sku', 'price', 'quantity'].map((field) => (
              <Box key={field}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, textTransform: 'capitalize' }}>
                  {field === 'sku' ? 'SKU' : field.charAt(0).toUpperCase() + field.slice(1)} *
                </Typography>
                <Select
                  value={Object.entries(columnMapping).find(([_, v]) => v === field)?.[0] || ''}
                  onChange={(e) => {
                    const newMapping = { ...columnMapping };
                    // Remove old mapping for this field
                    Object.entries(newMapping).forEach(([k, v]) => {
                      if (v === field) delete newMapping[k];
                    });
                    // Add new mapping
                    if (e.target.value) {
                      newMapping[e.target.value] = field;
                    }
                    setColumnMapping(newMapping);
                  }}
                  fullWidth
                  size="small"
                >
                  <MenuItem value="">-- Select Column --</MenuItem>
                  {sourceHeaders.map((header) => (
                    <MenuItem key={header} value={header}>
                      {header}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            ))}

            <Box sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Optional Fields
              </Typography>
              <Typography variant="caption" color="textSecondary" sx={{ display: 'block' }}>
                You can also map: Category, Supplier, Supplier Stock Code, Reorder Level, Description
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpenMappingDialog(false);
            setImportFile(null);
            setSourceHeaders([]);
            setColumnMapping({});
          }}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={async () => {
              try {
                // Validate all required fields are mapped
                const requiredFields = ['name', 'sku', 'price', 'quantity'];
                const mappedFields = Object.values(columnMapping);
                const allMapped = requiredFields.every(f => mappedFields.includes(f));
                
                if (!allMapped) {
                  const missing = requiredFields.filter(f => !mappedFields.includes(f));
                  setImportError(`Please map all required fields: ${missing.join(', ')}`);
                  return;
                }
                
                if (!importFile) {
                  setImportError('No file selected');
                  return;
                }
                
                await performImport(importFile, columnMapping);
              } catch (error) {
                setImportError(error instanceof Error ? error.message : 'Import failed');
                console.error('Import error:', error);
              }
            }}
          >
            Import
          </Button>
        </DialogActions>
      </Dialog>

      {/* Import Progress Dialog */}
      <Dialog open={importLoading && importTotal > 0} onClose={() => {}} disableEscapeKeyDown maxWidth="sm" fullWidth>
        <DialogTitle>Importing Products</DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
            <Box sx={{ width: '100%' }}>
              <LinearProgress 
                variant="determinate" 
                value={(importProgress / importTotal) * 100}
                sx={{ height: 10, borderRadius: 4 }}
              />
            </Box>
            
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {Math.round((importProgress / importTotal) * 100)}%
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};
