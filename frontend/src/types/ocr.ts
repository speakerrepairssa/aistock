export interface InvoiceTemplate {
  id: string;
  name: string;
  supplierName: string;
  supplierIdentifiers: string[]; // Keywords to identify this supplier
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  
  // Template configuration
  config: {
    // Section boundaries
    itemsSectionStart: string[]; // Keywords that mark start of items
    itemsSectionEnd: string[]; // Keywords that mark end of items
    
    // Column mapping
    columns: {
      quantity: { position: number; keywords?: string[] };
      description: { position: number; keywords?: string[] };
      price: { position: number; keywords?: string[] };
      total: { position: number; keywords?: string[] };
      sku?: { position: number; keywords?: string[] };
    };
    
    // Line validation
    validation: {
      minColumns: number;
      requiresQuantity: boolean;
      requiresPrice: boolean;
      quantityRange?: { min: number; max: number };
      priceRange?: { min: number; max: number };
    };
    
    // Filters
    skipPatterns: string[]; // Regex patterns to skip
    cleanupPatterns: string[]; // Patterns to remove from description
  };
  
  // Sample data for testing
  sampleText?: string;
  sampleItems?: number;
}

export interface OCRResult {
  text: string;
  confidence: number;
  detectedTemplate?: InvoiceTemplate;
  templateConfidence?: number;
}
