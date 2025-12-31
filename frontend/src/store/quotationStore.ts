import { create } from 'zustand';
import { quotationService } from '../services/quotationService';
import { productService } from '../services/productService';
import { Quotation, QuotationItem } from '../types';

interface QuotationStore {
  quotations: Quotation[];
  loading: boolean;
  error: string | null;
  fetchQuotations: (userId: string) => Promise<void>;
  fetchQuotationsByStatus: (userId: string, status: string) => Promise<void>;
  createQuotation: (userId: string, customerName: string, items: QuotationItem[], notes?: string) => Promise<string>;
  updateQuotation: (id: string, data: Partial<Quotation>) => Promise<void>;
  bookOutQuotation: (id: string, quotation: Quotation) => Promise<void>;
  deleteQuotation: (id: string) => Promise<void>;
}

export const useQuotationStore = create<QuotationStore>((set, get) => ({
  quotations: [],
  loading: false,
  error: null,

  fetchQuotations: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      const quotations = await quotationService.getQuotationsByUser(userId);
      set({ quotations, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchQuotationsByStatus: async (userId: string, status: string) => {
    set({ loading: true, error: null });
    try {
      const quotations = await quotationService.getQuotationsByStatus(userId, status);
      set({ quotations, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  createQuotation: async (userId: string, customerName: string, items: QuotationItem[], notes?: string) => {
    try {
      const quotationNumber = `QT-${Date.now()}`;
      const subtotal = items.reduce((sum, item) => sum + item.total, 0);
      const tax = subtotal * 0.1; // 10% tax
      const total = subtotal + tax;

      const quotationId = await quotationService.createQuotation({
        quotationNumber,
        customerName,
        items,
        subtotal,
        tax,
        total,
        notes,
        status: 'draft',
        createdBy: userId,
      });

      await get().fetchQuotations(userId);
      return quotationId;
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  updateQuotation: async (id: string, data: Partial<Quotation>) => {
    try {
      await quotationService.updateQuotation(id, data);
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  bookOutQuotation: async (id: string, quotation: Quotation) => {
    try {
      // Update stock for each item in the quotation
      for (const item of quotation.items) {
        const product = await productService.getProductById(item.productId);
        if (product) {
          const newQuantity = product.quantity - item.quantity;
          if (newQuantity < 0) {
            throw new Error(`Insufficient stock for ${item.productName}`);
          }
          await productService.updateProduct(item.productId, {
            quantity: newQuantity,
          });
        }
      }

      // Update quotation status
      await quotationService.updateQuotation(id, {
        status: 'booked-out',
        bookedOutDate: new Date(),
      });

      set((state) => ({
        quotations: state.quotations.map((q) =>
          q.id === id ? { ...q, status: 'booked-out', bookedOutDate: new Date() } : q
        ),
      }));
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  deleteQuotation: async (id: string) => {
    try {
      await quotationService.deleteQuotation(id);
      set((state) => ({
        quotations: state.quotations.filter((q) => q.id !== id),
      }));
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },
}));
