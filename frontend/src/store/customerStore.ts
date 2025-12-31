import { create } from 'zustand';
import { Customer, CreditNote, RecurringInvoice, CustomerTransaction } from '../types';
import { customerService } from '../services/customerService';

interface CustomerState {
  customers: Customer[];
  creditNotes: CreditNote[];
  recurringInvoices: RecurringInvoice[];
  customerTransactions: CustomerTransaction[];
  loading: boolean;
  error: string | null;

  // Customer actions
  fetchCustomers: (userId: string) => Promise<void>;
  createCustomer: (customer: Omit<Customer, 'id' | 'customerNumber' | 'createdAt' | 'updatedAt' | 'totalInvoiced' | 'totalPaid' | 'outstandingBalance'>) => Promise<void>;
  updateCustomer: (id: string, updates: Partial<Customer>) => Promise<void>;
  deleteCustomer: (id: string) => Promise<void>;
  getCustomerById: (id: string) => Customer | undefined;

  // Credit Note actions
  fetchCreditNotes: (userId: string) => Promise<void>;
  createCreditNote: (creditNote: Omit<CreditNote, 'id' | 'creditNoteNumber' | 'createdAt' | 'updatedAt' | 'remainingAmount'>) => Promise<void>;
  updateCreditNote: (id: string, updates: Partial<CreditNote>) => Promise<void>;
  applyCreditNoteToInvoice: (creditNoteId: string, invoiceId: string, invoiceNumber: string, amount: number) => Promise<void>;
  deleteCreditNote: (id: string) => Promise<void>;

  // Recurring Invoice actions
  fetchRecurringInvoices: (userId: string) => Promise<void>;
  createRecurringInvoice: (recurringInvoice: Omit<RecurringInvoice, 'id' | 'createdAt' | 'updatedAt' | 'occurrencesGenerated' | 'generatedInvoices' | 'lastGeneratedDate'>) => Promise<void>;
  updateRecurringInvoice: (id: string, updates: Partial<RecurringInvoice>) => Promise<void>;
  deleteRecurringInvoice: (id: string) => Promise<void>;
  pauseRecurringInvoice: (id: string) => Promise<void>;
  resumeRecurringInvoice: (id: string) => Promise<void>;
  generateInvoiceFromRecurring: (recurringId: string) => Promise<string>; // Returns generated invoice ID

  // Customer Transaction actions
  fetchCustomerTransactions: (customerId: string) => Promise<void>;
  addCustomerTransaction: (transaction: Omit<CustomerTransaction, 'id' | 'createdAt'>) => Promise<void>;

  // Utility actions
  updateCustomerBalance: (customerId: string, amount: number, type: 'add' | 'subtract') => Promise<void>;
  getCustomerStatement: (customerId: string, startDate: Date, endDate: Date) => Promise<CustomerTransaction[]>;
}

export const useCustomerStore = create<CustomerState>((set, get) => ({
  customers: [],
  creditNotes: [],
  recurringInvoices: [],
  customerTransactions: [],
  loading: false,
  error: null,

  // Customer actions
  fetchCustomers: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      const customers = await customerService.getCustomers(userId);
      set({ customers, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  createCustomer: async (customerData) => {
    set({ loading: true, error: null });
    try {
      const customer = await customerService.createCustomer(customerData);
      set((state) => ({
        customers: [...state.customers, customer],
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  updateCustomer: async (id: string, updates: Partial<Customer>) => {
    set({ loading: true, error: null });
    try {
      const updatedCustomer = await customerService.updateCustomer(id, updates);
      set((state) => ({
        customers: state.customers.map((customer) =>
          customer.id === id ? updatedCustomer : customer
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  deleteCustomer: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await customerService.deleteCustomer(id);
      set((state) => ({
        customers: state.customers.filter((customer) => customer.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  getCustomerById: (id: string) => {
    return get().customers.find((customer) => customer.id === id);
  },

  // Credit Note actions
  fetchCreditNotes: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      const creditNotes = await customerService.getCreditNotes(userId);
      set({ creditNotes, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  createCreditNote: async (creditNoteData) => {
    set({ loading: true, error: null });
    try {
      const creditNote = await customerService.createCreditNote(creditNoteData);
      set((state) => ({
        creditNotes: [...state.creditNotes, creditNote],
        loading: false,
      }));
      
      // Update customer balance
      await get().updateCustomerBalance(creditNote.customerId, creditNote.total, 'add');
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  updateCreditNote: async (id: string, updates: Partial<CreditNote>) => {
    set({ loading: true, error: null });
    try {
      const updatedCreditNote = await customerService.updateCreditNote(id, updates);
      set((state) => ({
        creditNotes: state.creditNotes.map((creditNote) =>
          creditNote.id === id ? updatedCreditNote : creditNote
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  applyCreditNoteToInvoice: async (creditNoteId: string, invoiceId: string, invoiceNumber: string, amount: number) => {
    set({ loading: true, error: null });
    try {
      const updatedCreditNote = await customerService.applyCreditNoteToInvoice(creditNoteId, invoiceId, invoiceNumber, amount);
      set((state) => ({
        creditNotes: state.creditNotes.map((creditNote) =>
          creditNote.id === creditNoteId ? updatedCreditNote : creditNote
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  deleteCreditNote: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await customerService.deleteCreditNote(id);
      set((state) => ({
        creditNotes: state.creditNotes.filter((creditNote) => creditNote.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  // Recurring Invoice actions
  fetchRecurringInvoices: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      const recurringInvoices = await customerService.getRecurringInvoices(userId);
      set({ recurringInvoices, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  createRecurringInvoice: async (recurringInvoiceData) => {
    set({ loading: true, error: null });
    try {
      const recurringInvoice = await customerService.createRecurringInvoice(recurringInvoiceData);
      set((state) => ({
        recurringInvoices: [...state.recurringInvoices, recurringInvoice],
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  updateRecurringInvoice: async (id: string, updates: Partial<RecurringInvoice>) => {
    set({ loading: true, error: null });
    try {
      const updatedRecurringInvoice = await customerService.updateRecurringInvoice(id, updates);
      set((state) => ({
        recurringInvoices: state.recurringInvoices.map((recurringInvoice) =>
          recurringInvoice.id === id ? updatedRecurringInvoice : recurringInvoice
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  deleteRecurringInvoice: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await customerService.deleteRecurringInvoice(id);
      set((state) => ({
        recurringInvoices: state.recurringInvoices.filter((recurringInvoice) => recurringInvoice.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  pauseRecurringInvoice: async (id: string) => {
    await get().updateRecurringInvoice(id, { status: 'paused' });
  },

  resumeRecurringInvoice: async (id: string) => {
    await get().updateRecurringInvoice(id, { status: 'active' });
  },

  generateInvoiceFromRecurring: async (recurringId: string) => {
    set({ loading: true, error: null });
    try {
      const invoiceId = await customerService.generateInvoiceFromRecurring(recurringId);
      
      // Update the recurring invoice to increment occurrences and update next date
      const recurringInvoice = get().recurringInvoices.find(r => r.id === recurringId);
      if (recurringInvoice) {
        await get().updateRecurringInvoice(recurringId, {
          occurrencesGenerated: recurringInvoice.occurrencesGenerated + 1,
          generatedInvoices: [...recurringInvoice.generatedInvoices, invoiceId],
          lastGeneratedDate: new Date(),
        });
      }
      
      set({ loading: false });
      return invoiceId;
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      throw error;
    }
  },

  // Customer Transaction actions
  fetchCustomerTransactions: async (customerId: string) => {
    set({ loading: true, error: null });
    try {
      const transactions = await customerService.getCustomerTransactions(customerId);
      set({ customerTransactions: transactions, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  addCustomerTransaction: async (transactionData) => {
    set({ loading: true, error: null });
    try {
      const transaction = await customerService.addCustomerTransaction(transactionData);
      set((state) => ({
        customerTransactions: [...state.customerTransactions, transaction],
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  // Utility actions
  updateCustomerBalance: async (customerId: string, amount: number, type: 'add' | 'subtract') => {
    try {
      const customer = get().getCustomerById(customerId);
      if (customer) {
        const newBalance = type === 'add' 
          ? customer.outstandingBalance + amount
          : customer.outstandingBalance - amount;
        
        await get().updateCustomer(customerId, { 
          outstandingBalance: newBalance 
        });
      }
    } catch (error) {
      console.error('Failed to update customer balance:', error);
    }
  },

  getCustomerStatement: async (customerId: string, startDate: Date, endDate: Date) => {
    try {
      return await customerService.getCustomerStatement(customerId, startDate, endDate);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
}));