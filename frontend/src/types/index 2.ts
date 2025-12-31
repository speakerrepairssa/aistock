export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  category: string;
  price: number; // Regular retail price
  retailPrice?: number; // Retail dealer price
  bulkPrice?: number; // Bulk/wholesale price
  costPrice: number;
  quantity: number;
  reorderLevel: number;
  location: string; // Warehouse/Shelf/Bin location
  supplier?: string; // Supplier/Vendor name
  supplierStockCode?: string; // Supplier's product code (for OCR system)
  manufacturer?: string; // Manufacturer
  barcode?: string; // Product barcode
  expiryDate?: Date; // For perishables
  notes?: string; // Additional notes
  imageUrl?: string;
  status: 'active' | 'inactive';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface StockMovement {
  id: string;
  productId: string;
  type: 'in' | 'out' | 'adjustment' | 'ocr';
  quantity: number;
  previousQuantity: number;
  newQuantity: number;
  reason: string;
  imageUrl?: string;
  userId: string;
  timestamp: Date;
  notes?: string;
}

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Date;
}

export interface DashboardStats {
  totalProducts: number;
  lowStockCount: number;
  outOfStockCount: number;
  totalInventoryValue: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchFilters {
  searchTerm?: string;
  category?: string;
  status?: 'active' | 'inactive';
  stockStatus?: 'all' | 'low' | 'out';
}

export interface QuotationItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Quotation {
  id: string;
  quotationNumber: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  items: QuotationItem[];
  subtotal: number;
  tax: number;
  total: number;
  notes?: string;
  status: 'draft' | 'confirmed' | 'booked-out' | 'delivered' | 'cancelled';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  bookedOutDate?: Date;
  deliveredDate?: Date;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  items: QuotationItem[];
  subtotal: number;
  tax: number;
  total: number;
  amountPaid: number;
  balanceDue: number;
  notes?: string;
  status: 'draft' | 'sent' | 'viewed' | 'partial' | 'paid' | 'overdue' | 'cancelled';
  paymentStatus: 'unpaid' | 'partial' | 'paid';
  dueDate: Date;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  sentDate?: Date;
  paidDate?: Date;
  quotationId?: string; // If converted from quotation
}

export interface RepairJob {
  id: string;
  jobNumber: string;
  clientName: string;
  itemDescription: string;
  products: QuotationItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'pending' | 'in-progress' | 'put-aside' | 'completed' | 'cancelled';
  technician?: string; // Technician assigned to the job
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  startDateTime?: Date; // When work started on the job
  endDateTime?: Date; // When work was completed
  completedDate?: Date;
  invoiceId?: string; // Invoice generated when completed
  completedProducts?: QuotationItem[]; // Products that were deducted from stock on last completion
  clickupTasks?: { id: string; name: string; status?: string }[]; // Tasks imported from ClickUp
  customFields?: Record<string, any>; // Custom field values stored by field key
}
