import { Product } from '../types';
import * as XLSX from 'xlsx';

export interface ColumnMapping {
  [key: string]: string; // Maps source column to target field
}

const REQUIRED_FIELDS = ['name', 'sku', 'price', 'quantity'];

const EXPECTED_FIELDS = [
  'name',
  'sku',
  'price',
  'quantity',
  'category',
  'supplier',
  'supplier stock code',
  'reorder level',
  'description',
];

export const detectColumns = (headers: string[]): { headers: string[]; isValid: boolean; missingColumns: string[] } => {
  const normalizedHeaders = headers.map((h) => h?.toString().toLowerCase().trim() || '');
  const missingColumns = REQUIRED_FIELDS.filter((col) => !normalizedHeaders.includes(col));
  
  return {
    headers: normalizedHeaders,
    isValid: missingColumns.length === 0,
    missingColumns,
  };
};

export const getColumnSuggestions = (sourceHeaders: string[]): ColumnMapping => {
  const mapping: ColumnMapping = {};
  const sourceHeadersLower = sourceHeaders.map((h) => h.toLowerCase().trim());
  
  EXPECTED_FIELDS.forEach((field) => {
    // Try to find a matching source column
    const match = sourceHeadersLower.find((src) => {
      const srcLower = src.toLowerCase();
      const fieldLower = field.toLowerCase();
      return srcLower.includes(fieldLower) || fieldLower.includes(srcLower);
    });
    
    if (match) {
      mapping[sourceHeaders[sourceHeadersLower.indexOf(match)]] = field;
    }
  });
  
  return mapping;
};

export const exportProductsToCSV = (products: Product[]) => {
  // CSV headers
  const headers = ['Name', 'SKU', 'Price', 'Quantity', 'Category', 'Supplier', 'Supplier Stock Code', 'Reorder Level', 'Description'];
  
  // Convert products to CSV rows
  const rows = products.map((product) => [
    product.name,
    product.sku,
    product.price.toString(),
    product.quantity.toString(),
    product.category || '',
    product.supplier || '',
    product.supplierStockCode || '',
    product.reorderLevel?.toString() || '',
    product.description || '',
  ]);

  // Combine headers and rows
  const csvContent = [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell}"`).join(','))
    .join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `products-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const parseExcelFile = (file: File, columnMapping?: ColumnMapping): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const data = event.target?.result as ArrayBuffer;
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Get the first sheet
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        
        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[];
        
        if (jsonData.length < 2) {
          reject(new Error('Excel file is empty or has no data rows'));
          return;
        }

        // Parse header (first row)
        const sourceHeaders = (jsonData[0] as string[]).map((h) => h?.toString().trim() || '');
        
        const products = parseProductsFromData(jsonData, sourceHeaders, columnMapping);
        resolve(products);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsArrayBuffer(file);
  });
};

const parseProductsFromData = (jsonData: any[], sourceHeaders: string[], columnMapping?: ColumnMapping): Product[] => {
  // Normalize headers
  const headers = sourceHeaders.map((h) => h.toLowerCase().trim());
  
  // Validate required columns
  const requiredColumns = REQUIRED_FIELDS;
  
  // If no mapping provided, use exact match
  let fieldToSourceIndex: { [key: string]: number } = {};
  
  if (columnMapping) {
    // Build mapping from source column name to index, then to field name
    EXPECTED_FIELDS.forEach((field) => {
      // Find which source column maps to this field
      const sourceColumn = Object.entries(columnMapping).find(([_, targetField]) => targetField === field)?.[0];
      if (sourceColumn) {
        const index = sourceHeaders.indexOf(sourceColumn);
        if (index >= 0) {
          fieldToSourceIndex[field] = index;
        }
      }
    });
  } else {
    // Exact match mode
    EXPECTED_FIELDS.forEach((field) => {
      const index = headers.indexOf(field);
      if (index >= 0) {
        fieldToSourceIndex[field] = index;
      }
    });
  }
  
  const missingColumns = requiredColumns.filter((col) => !(col in fieldToSourceIndex));
  if (missingColumns.length > 0) {
    throw new Error(`Missing required columns: ${missingColumns.join(', ')}`);
  }

  // Parse data rows
  const products: Product[] = [];
  for (let i = 1; i < jsonData.length; i++) {
    const values = jsonData[i] as any[];
    
    if (!values || values.every((v) => !v)) continue; // Skip empty rows
    
    const getValue = (field: string): string => {
      const index = fieldToSourceIndex[field];
      return index !== undefined ? (values[index]?.toString().trim() || '') : '';
    };

    // Create product object
    const product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> = {
      name: getValue('name') || `Product ${i}`,
      sku: getValue('sku') || `SKU-${Date.now()}-${i}`,
      price: parseFloat(getValue('price')) || 0,
      quantity: parseInt(getValue('quantity')) || 0,
      category: getValue('category') || '',
      supplier: getValue('supplier') || '',
      supplierStockCode: getValue('supplier stock code') || '',
      reorderLevel: getValue('reorder level') ? parseInt(getValue('reorder level')) : 10,
      description: getValue('description') || '',
      imageUrl: '',
      costPrice: 0,
      location: '',
      status: 'active',
      tags: [],
    };

    // Validate
    if (!product.name || !product.sku) {
      throw new Error(`Row ${i + 1}: Name and SKU are required`);
    }
    if (isNaN(product.price) || product.price < 0) {
      throw new Error(`Row ${i + 1}: Price must be a valid positive number`);
    }
    if (isNaN(product.quantity) || product.quantity < 0) {
      throw new Error(`Row ${i + 1}: Quantity must be a valid non-negative number`);
    }

    products.push(product as Product);
  }

  if (products.length === 0) {
    throw new Error('No valid products found in file');
  }

  return products;
};

export const parseCSVFile = (file: File, columnMapping?: ColumnMapping): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const csv = event.target?.result as string;
        const lines = csv.split('\n').filter((line) => line.trim());
        
        if (lines.length < 2) {
          reject(new Error('CSV file is empty or has no data rows'));
          return;
        }

        // Parse header
        const sourceHeaders = parseCSVLine(lines[0]);
        
        // Parse data rows into array format (like jsonData from Excel)
        const jsonData: any[] = [sourceHeaders];
        for (let i = 1; i < lines.length; i++) {
          jsonData.push(parseCSVLine(lines[i]));
        }
        
        const products = parseProductsFromData(jsonData, sourceHeaders, columnMapping);
        resolve(products);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
};

// Helper function to parse CSV line (handles quoted values)
const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        // Escaped quote
        current += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      // End of field
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  // Add last field
  result.push(current);
  return result;
};
