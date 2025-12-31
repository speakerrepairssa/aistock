export type Currency = 'USD' | 'ZAR' | 'EUR' | 'GBP' | 'INR' | 'AED' | 'SGD' | 'AUD';

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
  ccEmails?: string; // CC/BCC emails
  bccEmails?: string;
  
  // Billing & Shipping Information
  billingAddress?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  shippingAddress?: {
    name?: string;
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  
  // Dates and Terms
  invoiceDate: Date;
  dueDate: Date;
  terms: 'due-on-receipt' | 'net-15' | 'net-30' | 'net-60' | 'custom';
  customTerms?: string;
  
  // Shipping Information
  shipVia?: string;
  shippingDate?: Date;
  trackingNumber?: string;
  purchaseOrder?: string;
  
  // Items with enhanced details
  items: EnhancedQuotationItem[];
  
  // Financial Details
  subtotal: number;
  discountPercent?: number;
  discountAmount?: number;
  shippingCost?: number;
  tax: number;
  vatRate?: number;
  total: number;
  deposit?: number;
  amountPaid: number;
  balanceDue: number;
  
  // Messages
  messageOnInvoice?: string;
  messageOnStatement?: string;
  notes?: string;
  
  // Status and Metadata
  status: 'draft' | 'sent' | 'viewed' | 'partial' | 'paid' | 'overdue' | 'cancelled';
  paymentStatus: 'unpaid' | 'partial' | 'paid';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  sentDate?: Date;
  paidDate?: Date;
  quotationId?: string; // If converted from quotation
  class?: string; // Invoice classification
}

export interface EnhancedQuotationItem extends QuotationItem {
  serviceDate?: Date;
  sku?: string;
  description?: string;
  vatRate?: number;
  vatAmount?: number;
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

export interface Customer {
  id: string;
  customerNumber: string; // Unique customer number like Zoho
  companyName?: string;
  contactPerson: string;
  email: string;
  phone: string;
  mobile?: string;
  website?: string;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  taxNumber?: string; // VAT/Tax ID
  paymentTerms: 'net-15' | 'net-30' | 'net-45' | 'due-on-receipt' | 'custom';
  customPaymentTerms?: string;
  creditLimit?: number;
  currency: string;
  notes?: string;
  tags: string[];
  status: 'active' | 'inactive';
  totalInvoiced: number;
  totalPaid: number;
  outstandingBalance: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreditNote {
  id: string;
  creditNoteNumber: string;
  customerId: string;
  customerName: string;
  reason: 'defective-product' | 'pricing-error' | 'returned-goods' | 'goodwill' | 'other';
  items: QuotationItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'issued' | 'applied';
  appliedToInvoices: {
    invoiceId: string;
    invoiceNumber: string;
    amountApplied: number;
  }[];
  remainingAmount: number;
  notes?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  issuedDate?: Date;
}

export interface RecurringInvoice {
  id: string;
  templateName: string;
  customerId: string;
  customerName: string;
  items: QuotationItem[];
  subtotal: number;
  tax: number;
  total: number;
  frequency: 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'custom';
  customFrequency?: {
    interval: number; // e.g., 2 for every 2 months
    unit: 'days' | 'weeks' | 'months' | 'years';
  };
  startDate: Date;
  endDate?: Date; // Optional end date
  nextInvoiceDate: Date;
  totalOccurrences?: number; // Optional limit on number of invoices
  occurrencesGenerated: number;
  status: 'active' | 'paused' | 'stopped' | 'completed';
  autoSend: boolean;
  generatedInvoices: string[]; // Array of invoice IDs generated from this template
  notes?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  lastGeneratedDate?: Date;
}

export interface CustomerTransaction {
  id: string;
  customerId: string;
  type: 'invoice' | 'payment' | 'credit-note' | 'adjustment';
  referenceNumber: string; // Invoice number, payment ref, etc.
  amount: number;
  description: string;
  date: Date;
  createdAt: Date;
}
