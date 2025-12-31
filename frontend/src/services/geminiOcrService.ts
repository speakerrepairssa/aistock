/**
 * Gemini OCR Service
 * Handles invoice OCR processing using Google Gemini Vision API
 */

import { httpsCallable } from 'firebase/functions';
import { functions } from './firebase';

export interface OCRLineItem {
  id: string;
  rawText: string;
  productName: string;
  description: string;
  quantity: number;
  unitPrice: number;
  price: number;
  total: number;
  sku?: string;
  partNumber?: string;
  matchedProductId?: string;
  matchedProductName?: string;
  matchScore?: number;
  status: 'pending' | 'matched' | 'unmatched' | 'confirmed';
  updatePrice: boolean;
  updateQuantity: boolean;
}

export interface InvoiceMetadata {
  invoiceNumber?: string;
  invoiceDate?: string;
  supplierName?: string;
  supplierCode?: string;
  currency?: string;
  subtotal?: number;
  tax?: number;
  total?: number;
}

export interface OCRResult {
  success: boolean;
  items: OCRLineItem[];
  metadata?: InvoiceMetadata;
  confidence?: {
    overall: number;
    itemExtraction: number;
    metadataExtraction: number;
  };
  issues?: string[];
  error?: string;
}

/**
 * Process invoice image with Gemini Vision API
 */
export async function processInvoiceWithGemini(
  imageBase64: string,
  onProgress?: (progress: number, message: string) => void
): Promise<OCRResult> {
  try {
    onProgress?.(10, '🤖 Preparing image for Gemini...');

    // Remove data URI prefix if present
    let base64Data = imageBase64;
    if (imageBase64.includes(',')) {
      base64Data = imageBase64.split(',')[1];
    }

    onProgress?.(20, '📤 Sending to Google Gemini Vision API...');

    // Call Firebase Cloud Function
    const processInvoiceOCR = httpsCallable(functions, 'processInvoiceOCR');
    const response = await processInvoiceOCR({ imageBase64: base64Data });

    onProgress?.(60, '📊 Processing Gemini response...');

    const data = response.data as any;

    if (!data.success) {
      throw new Error(data.error || 'Gemini extraction failed');
    }

    onProgress?.(80, '✅ Formatting extracted data...');

    // Transform response to OCRLineItem format
    const items: OCRLineItem[] = (data.items || []).map((item: any, index: number) => {
      const id = `gemini-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`;
      const description = item.description || '';
      
      return {
        id,
        rawText: `${item.quantity || 1} x ${description} @ ${item.unitPrice || 0} = ${item.lineTotal || 0}`,
        productName: description,
        description: description,
        quantity: item.quantity || 1,
        unitPrice: item.unitPrice || 0,
        price: item.unitPrice || 0,
        total: item.lineTotal || (item.quantity || 1) * (item.unitPrice || 0),
        sku: item.sku,
        partNumber: item.partNumber,
        status: 'pending',
        updatePrice: true,
        updateQuantity: true,
      };
    });

    onProgress?.(100, `✅ Extracted ${items.length} items`);

    return {
      success: true,
      items,
      metadata: data.metadata,
      confidence: data.confidence,
      issues: data.issues,
    };
  } catch (error) {
    console.error('❌ Gemini OCR error:', error);
    const errorMsg = error instanceof Error ? error.message : String(error);
    
    return {
      success: false,
      items: [],
      error: errorMsg,
    };
  }
}

/**
 * Validate image before processing
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  if (!file.type.startsWith('image/')) {
    return {
      valid: false,
      error: 'Please select an image file (JPG, PNG, WebP, etc.)',
    };
  }

  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File size must be less than 10MB',
    };
  }

  // Check image dimensions (if needed)
  // This would require loading the image first
  
  return { valid: true };
}

/**
 * Convert file to base64
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const result = e.target?.result as string;
      resolve(result);
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsDataURL(file);
  });
}

/**
 * Auto-match extracted items with existing products
 * Uses multi-factor matching: SKU (best), Part#, name similarity
 */
export function matchProductsToOCRItems(
  ocrItems: OCRLineItem[],
  products: any[]
): OCRLineItem[] {
  return ocrItems.map(item => {
    let bestMatch = null;
    let bestScore = 0;

    // Priority 1: Try SKU match (most accurate)
    if (item.sku) {
      const skuMatch = products.find(p => 
        p.sku && p.sku.toLowerCase() === item.sku!.toLowerCase()
      );
      if (skuMatch) {
        return {
          ...item,
          matchedProductId: skuMatch.id,
          matchedProductName: skuMatch.name,
          matchScore: 1.0, // Perfect match
          status: 'matched' as const,
        };
      }
    }

    // Priority 2: Try Part Number match
    if (item.partNumber) {
      const partMatch = products.find(p => 
        p.partNumber && p.partNumber.toLowerCase() === item.partNumber!.toLowerCase()
      );
      if (partMatch) {
        return {
          ...item,
          matchedProductId: partMatch.id,
          matchedProductName: partMatch.name,
          matchScore: 0.95, // Very high match
          status: 'matched' as const,
        };
      }
    }

    // Priority 3: Try exact name match
    const exactMatch = products.find(p => 
      p.name.toLowerCase() === item.productName.toLowerCase()
    );
    if (exactMatch) {
      return {
        ...item,
        matchedProductId: exactMatch.id,
        matchedProductName: exactMatch.name,
        matchScore: 0.95,
        status: 'matched' as const,
      };
    }

    // Priority 4: Fuzzy matching on product name
    const fuzzyMatches = products.map(p => {
      const nameSimilarity = calculateSimilarity(
        item.productName.toLowerCase(),
        p.name.toLowerCase()
      );
      
      // Bonus score if SKU or Part# contains extracted text
      let bonusScore = 0;
      if (item.sku && p.sku && p.sku.includes(item.sku)) bonusScore = 0.15;
      if (item.partNumber && p.partNumber && p.partNumber.includes(item.partNumber)) bonusScore = 0.15;
      
      const finalScore = Math.min(1.0, nameSimilarity + bonusScore);
      
      return { product: p, score: finalScore };
    })
    .filter(m => m.score > 0.65) // Require high confidence
    .sort((a, b) => b.score - a.score);

    if (fuzzyMatches.length > 0) {
      bestMatch = fuzzyMatches[0].product;
      bestScore = fuzzyMatches[0].score;
      
      return {
        ...item,
        matchedProductId: bestMatch.id,
        matchedProductName: bestMatch.name,
        matchScore: bestScore,
        status: bestScore > 0.85 ? 'matched' : 'pending',
      };
    }

    // No match found
    return {
      ...item,
      status: 'unmatched' as const,
    };
  });
}

/**
 * Calculate string similarity (Levenshtein distance based)
 */
function calculateSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const distance = levenshteinDistance(longer, shorter);
  return (longer.length - distance) / longer.length;
}

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}
