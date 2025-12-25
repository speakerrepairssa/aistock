import { create } from 'zustand';
import { Invoice, QuotationItem } from '../types';
import { invoiceService } from '../services/invoiceService';

interface InvoiceStore {
  invoices: Invoice[];
  loading: boolean;
  error: string | null;

  fetchInvoices: (userId: string) => Promise<void>;
  fetchInvoicesByStatus: (userId: string, status: string) => Promise<void>;
  createInvoice: (
    userId: string,
    customerName: string,
    items: QuotationItem[],
    dueDate: Date,
    notes?: string,
    quotationId?: string
  ) => Promise<string>;
  updateInvoice: (id: string, data: Partial<Invoice>) => Promise<void>;
  deleteInvoice: (id: string) => Promise<void>;
  recordPayment: (id: string, amountPaid: number) => Promise<void>;
}

export const useInvoiceStore = create<InvoiceStore>((set, get) => ({
  invoices: [],
  loading: false,
  error: null,

  fetchInvoices: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      const invoices = await invoiceService.getInvoicesByUser(userId);
      set({ invoices, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  fetchInvoicesByStatus: async (userId: string, status: string) => {
    set({ loading: true, error: null });
    try {
      const invoices = await invoiceService.getInvoicesByStatus(userId, status);
      set({ invoices, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  createInvoice: async (
    userId: string,
    customerName: string,
    items: QuotationItem[],
    dueDate: Date,
    notes?: string,
    quotationId?: string
  ) => {
    try {
      const subtotal = items.reduce((sum, item) => sum + item.total, 0);
      const tax = subtotal * 0.1;
      const total = subtotal + tax;

      const invoiceNumber = `INV-${Date.now()}`;

      const invoiceData: any = {
        invoiceNumber,
        customerName,
        items,
        subtotal,
        tax,
        total,
        amountPaid: 0,
        balanceDue: total,
        notes,
        status: 'draft',
        paymentStatus: 'unpaid',
        dueDate,
        createdBy: userId,
      };

      // Only include quotationId if it's provided
      if (quotationId) {
        invoiceData.quotationId = quotationId;
      }

      const invoiceId = await invoiceService.createInvoice(invoiceData);

      // Add the new invoice to the state instead of refetching
      const newInvoice: Invoice = {
        id: invoiceId,
        invoiceNumber,
        customerName,
        items,
        subtotal,
        tax,
        total,
        amountPaid: 0,
        balanceDue: total,
        notes,
        status: 'draft',
        paymentStatus: 'unpaid',
        dueDate,
        invoiceDate: new Date(),
        terms: 'net-30',
        createdBy: userId,
        quotationId: quotationId || undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      set((state) => ({
        invoices: [newInvoice, ...state.invoices],
      }));
      return invoiceId;
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  updateInvoice: async (id: string, data: Partial<Invoice>) => {
    try {
      await invoiceService.updateInvoice(id, data);
      set((state) => ({
        invoices: state.invoices.map((inv) =>
          inv.id === id ? { ...inv, ...data } : inv
        ),
      }));
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  deleteInvoice: async (id: string) => {
    try {
      await invoiceService.deleteInvoice(id);
      set((state) => ({
        invoices: state.invoices.filter((inv) => inv.id !== id),
      }));
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  recordPayment: async (id: string, amountPaid: number) => {
    try {
      const invoice = get().invoices.find((inv) => inv.id === id);
      if (!invoice) throw new Error('Invoice not found');

      const newTotalPaid = invoice.amountPaid + amountPaid;
      const newBalanceDue = invoice.total - newTotalPaid;
      const paymentStatus = newBalanceDue <= 0 ? 'paid' : 'partial';
      const status = newBalanceDue <= 0 ? 'paid' : 'partial';

      await invoiceService.updateInvoice(id, {
        amountPaid: newTotalPaid,
        balanceDue: Math.max(0, newBalanceDue),
        paymentStatus,
        status,
        paidDate: newBalanceDue <= 0 ? new Date() : undefined,
      });

      set((state) => ({
        invoices: state.invoices.map((inv) =>
          inv.id === id
            ? {
                ...inv,
                amountPaid: newTotalPaid,
                balanceDue: Math.max(0, newBalanceDue),
                paymentStatus,
                status,
              }
            : inv
        ),
      }));
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },
}));
