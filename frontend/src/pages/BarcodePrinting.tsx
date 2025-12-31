import React, { useState, useRef } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Printer, Search, Upload, FileText } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useSettings } from '../store/settingsStore';
import { formatCurrencyWithCurrency } from '../utils/helpers';
import Barcode from 'react-barcode';

interface LabelTemplate {
  name: string;
  labelsPerPage: number;
  labelWidth: number; // mm
  labelHeight: number; // mm
  columns: number;
  rows: number;
  marginTop: number; // mm
  marginLeft: number; // mm
  horizontalSpacing: number; // mm
  verticalSpacing: number; // mm
}

const predefinedTemplates: Record<string, LabelTemplate> = {
  '84up': {
    name: '84UP (46mm x 11.11mm)',
    labelsPerPage: 84,
    labelWidth: 46,
    labelHeight: 11.11,
    columns: 4,
    rows: 21,
    marginTop: 13.5,
    marginLeft: 8,
    horizontalSpacing: 2.5,
    verticalSpacing: 0,
  },
  '65up': {
    name: '65UP (38.1mm x 21.2mm)',
    labelsPerPage: 65,
    labelWidth: 38.1,
    labelHeight: 21.2,
    columns: 5,
    rows: 13,
    marginTop: 15.9,
    marginLeft: 13,
    horizontalSpacing: 2.5,
    verticalSpacing: 0,
  },
  '21up': {
    name: '21UP (63.5mm x 38.1mm)',
    labelsPerPage: 21,
    labelWidth: 63.5,
    labelHeight: 38.1,
    columns: 3,
    rows: 7,
    marginTop: 15.3,
    marginLeft: 7,
    horizontalSpacing: 2.5,
    verticalSpacing: 0,
  },
};

export const BarcodePrinting: React.FC = () => {
  const { products } = useProducts();
  const { currency } = useSettings();
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [productQuantities, setProductQuantities] = useState<Record<string, number>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [includePrice, setIncludePrice] = useState(true);
  const [includeName, setIncludeName] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('84up');
  const [templateImage, setTemplateImage] = useState<string | null>(null);
  const printRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.barcode && product.barcode.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = new Set(filteredProducts.map((p) => p.id));
      setSelectedProducts(newSelected);
      const newQuantities: Record<string, number> = {};
      filteredProducts.forEach((p) => {
        newQuantities[p.id] = 1;
      });
      setProductQuantities(newQuantities);
    } else {
      setSelectedProducts(new Set());
      setProductQuantities({});
    }
  };

  const handleSelectProduct = (productId: string) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
      const newQuantities = { ...productQuantities };
      delete newQuantities[productId];
      setProductQuantities(newQuantities);
    } else {
      newSelected.add(productId);
      setProductQuantities({ ...productQuantities, [productId]: 1 });
    }
    setSelectedProducts(newSelected);
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    setProductQuantities({
      ...productQuantities,
      [productId]: Math.max(1, quantity),
    });
  };

  const handleTemplateUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTemplateImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrint = () => {
    const template = predefinedTemplates[selectedTemplate];
    const printWindow = window.open('', '_blank');
    if (printWindow && printRef.current) {
      const content = printRef.current.innerHTML;
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Barcodes</title>
            <style>
              @media print {
                @page {
                  margin: 0;
                  size: A4;
                }
                body {
                  margin: 0;
                  padding: 0;
                }
              }
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
              }
              .label-page {
                width: 210mm;
                height: 297mm;
                position: relative;
                page-break-after: always;
                ${templateImage ? `background: url('${templateImage}') no-repeat center; background-size: 210mm 297mm;` : ''}
              }
              .label-grid {
                display: grid;
                grid-template-columns: repeat(${template.columns}, ${template.labelWidth}mm);
                grid-template-rows: repeat(${template.rows}, ${template.labelHeight}mm);
                gap: ${template.verticalSpacing}mm ${template.horizontalSpacing}mm;
                padding-top: ${template.marginTop}mm;
                padding-left: ${template.marginLeft}mm;
              }
              .barcode-label {
                width: ${template.labelWidth}mm;
                height: ${template.labelHeight}mm;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
                overflow: hidden;
                box-sizing: border-box;
              }
              .barcode-label h4 {
                margin: 0 0 1mm 0;
                font-size: 6pt;
                font-weight: 600;
                line-height: 1;
                max-height: 8mm;
                overflow: hidden;
              }
              .barcode-label p {
                margin: 1mm 0 0 0;
                font-size: 5pt;
                line-height: 1;
              }
              .barcode-label svg {
                max-width: 100%;
                max-height: ${template.labelHeight - 6}mm;
              }
            </style>
          </head>
          <body>
            ${content}
          </body>
        </html>
      `);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  const selectedProductsList = products.filter((p) => selectedProducts.has(p.id));
  const totalLabels = Object.values(productQuantities).reduce((sum, qty) => sum + qty, 0);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Barcode Printing
        </Typography>
        <Typography color="textSecondary">
          Select products and print barcode labels on A4 sheets
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
              <TextField
                fullWidth
                placeholder="Search products by name, SKU, or barcode..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <Search size={20} style={{ marginRight: 8, color: '#999' }} />,
                }}
                size="small"
              />
            </Box>

            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox
                  checked={selectedProducts.size === filteredProducts.length && filteredProducts.length > 0}
                  indeterminate={selectedProducts.size > 0 && selectedProducts.size < filteredProducts.length}
                  onChange={handleSelectAll}
                />
                <Typography variant="body2">
                  Select All ({selectedProducts.size} selected)
                </Typography>
              </Box>
              <Typography variant="body2" color="textSecondary">
                {filteredProducts.length} products
              </Typography>
            </Box>

            <TableContainer sx={{ maxHeight: 500 }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox" sx={{ width: 50 }}>Select</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>SKU</TableCell>
                    <TableCell>Barcode</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Stock</TableCell>
                    <TableCell align="center" sx={{ width: 100 }}>Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id} hover sx={{ cursor: 'pointer' }}>
                      <TableCell padding="checkbox" onClick={() => handleSelectProduct(product.id)}>
                        <Checkbox checked={selectedProducts.has(product.id)} />
                      </TableCell>
                      <TableCell onClick={() => handleSelectProduct(product.id)}>{product.name}</TableCell>
                      <TableCell onClick={() => handleSelectProduct(product.id)} sx={{ fontFamily: 'monospace' }}>{product.sku}</TableCell>
                      <TableCell onClick={() => handleSelectProduct(product.id)} sx={{ fontFamily: 'monospace', fontSize: '0.85em' }}>
                        {product.barcode || '-'}
                      </TableCell>
                      <TableCell onClick={() => handleSelectProduct(product.id)} align="right">
                        {formatCurrencyWithCurrency(product.price, currency)}
                      </TableCell>
                      <TableCell onClick={() => handleSelectProduct(product.id)} align="right">{product.quantity}</TableCell>
                      <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                        <TextField
                          type="number"
                          size="small"
                          value={productQuantities[product.id] || 1}
                          onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 1)}
                          disabled={!selectedProducts.has(product.id)}
                          inputProps={{ min: 1, max: 999, style: { textAlign: 'center' } }}
                          sx={{ width: 70 }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Print Settings
            </Typography>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Label Template</InputLabel>
              <Select
                value={selectedTemplate}
                label="Label Template"
                onChange={(e) => setSelectedTemplate(e.target.value)}
              >
                {Object.entries(predefinedTemplates).map(([key, template]) => (
                  <MenuItem key={key} value={key}>
                    {template.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ mb: 2 }}>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.docx,.psd,.indd"
                style={{ display: 'none' }}
                onChange={handleTemplateUpload}
              />
              <Button
                variant="outlined"
                fullWidth
                startIcon={templateImage ? <FileText size={20} /> : <Upload size={20} />}
                onClick={() => fileInputRef.current?.click()}
                sx={{ mb: 1 }}
              >
                {templateImage ? 'Template Uploaded' : 'Upload Template'}
              </Button>
              {templateImage && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" color="success.main">
                    Template will be used as background
                  </Typography>
                  <Button size="small" color="error" onClick={() => setTemplateImage(null)}>
                    Remove
                  </Button>
                </Box>
              )}
              <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 1 }}>
                Upload an image, DOCX, PSD, or INDD file of your label sheet template
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Checkbox checked={includeName} onChange={(e) => setIncludeName(e.target.checked)} />
                <Typography variant="body2">Include Product Name</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox checked={includePrice} onChange={(e) => setIncludePrice(e.target.checked)} />
                <Typography variant="body2">Include Price</Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              fullWidth
              size="large"
              startIcon={<Printer size={20} />}
              onClick={handlePrint}
              disabled={selectedProducts.size === 0}
            >
              Print {totalLabels} Label{totalLabels !== 1 ? 's' : ''}
            </Button>
          </Paper>

          {selectedProductsList.length > 0 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Preview
              </Typography>
              <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
                {selectedProductsList.slice(0, 3).map((product) => (
                  <Card key={product.id} sx={{ mb: 2, border: '1px solid #ddd' }}>
                    <CardContent sx={{ textAlign: 'center', p: 2, '&:last-child': { pb: 2 } }}>
                      {includeName && (
                        <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 1 }}>
                          {product.name}
                        </Typography>
                      )}
                      {product.barcode ? (
                        <Barcode
                          value={product.barcode}
                          width={0.8}
                          height={25}
                          fontSize={10}
                          displayValue={true}
                        />
                      ) : (
                        <Typography variant="caption" color="error">
                          No barcode
                        </Typography>
                      )}
                      {includePrice && (
                        <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
                          {formatCurrencyWithCurrency(product.price, currency)}
                        </Typography>
                      )}
                      {productQuantities[product.id] > 1 && (
                        <Typography variant="caption" color="primary" sx={{ display: 'block', mt: 1 }}>
                          Quantity: {productQuantities[product.id]}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                ))}
                {selectedProductsList.length > 3 && (
                  <Typography variant="caption" color="textSecondary" sx={{ textAlign: 'center', display: 'block' }}>
                    +{selectedProductsList.length - 3} more products
                  </Typography>
                )}
              </Box>
            </Paper>
          )}
        </Grid>
      </Grid>

      <Box sx={{ display: 'none' }}>
        <div ref={printRef}>
          {(() => {
            const template = predefinedTemplates[selectedTemplate];
            const allLabels: JSX.Element[] = [];
            
            selectedProductsList.forEach((product) => {
              const quantity = productQuantities[product.id] || 1;
              for (let i = 0; i < quantity; i++) {
                allLabels.push(
                  <div key={`${product.id}-${i}`} className="barcode-label">
                    {includeName && <h4>{product.name}</h4>}
                    {product.barcode ? (
                      <Barcode
                        value={product.barcode}
                        width={0.8}
                        height={20}
                        fontSize={8}
                        displayValue={true}
                      />
                    ) : (
                      <p>No barcode</p>
                    )}
                    {includePrice && <p>{formatCurrencyWithCurrency(product.price, currency)}</p>}
                  </div>
                );
              }
            });

            const pages: JSX.Element[] = [];
            for (let i = 0; i < allLabels.length; i += template.labelsPerPage) {
              const pageLabels = allLabels.slice(i, i + template.labelsPerPage);
              while (pageLabels.length < template.labelsPerPage) {
                pageLabels.push(<div key={`empty-${i}-${pageLabels.length}`} className="barcode-label"></div>);
              }
              
              pages.push(
                <div key={`page-${i}`} className="label-page">
                  <div className="label-grid">
                    {pageLabels}
                  </div>
                </div>
              );
            }

            return pages;
          })()}
        </div>
      </Box>
    </Container>
  );
};

export default BarcodePrinting;
