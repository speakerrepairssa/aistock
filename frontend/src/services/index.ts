export { authService } from './authService';
export { productService, stockMovementService, dashboardService } from './productService';
export { storageService } from './storageService';
export { 
  processInvoiceWithGemini,
  validateImageFile,
  fileToBase64,
  matchProductsToOCRItems,
  type OCRLineItem,
  type InvoiceMetadata,
  type OCRResult
} from './geminiOcrService';
