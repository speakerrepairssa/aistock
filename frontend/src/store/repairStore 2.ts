import { create } from 'zustand';
import { RepairJob, QuotationItem } from '../types';
import { repairService } from '../services/repairService';

interface RepairStore {
  repairJobs: RepairJob[];
  loading: boolean;
  error: string | null;

  fetchRepairJobs: (userId: string) => Promise<void>;
  createRepairJob: (
    userId: string,
    jobNumber: string,
    clientName: string,
    itemDescription: string,
    technician?: string
  ) => Promise<string>;
  updateRepairJob: (id: string, data: Partial<RepairJob>) => Promise<void>;
  updateCustomField: (jobId: string, fieldKey: string, value: any) => Promise<void>;
  deleteRepairJob: (id: string) => Promise<void>;
  addProductToJob: (jobId: string, product: QuotationItem) => Promise<void>;
  removeProductFromJob: (jobId: string, productId: string) => Promise<void>;
  completeRepairJob: (jobId: string, userId: string, invoiceId: string) => Promise<void>;
}

export const useRepairStore = create<RepairStore>((set, get) => ({
  repairJobs: [],
  loading: false,
  error: null,

  fetchRepairJobs: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      const jobs = await repairService.getRepairJobsByUser(userId);
      set({ repairJobs: jobs, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  createRepairJob: async (
    userId: string,
    jobNumber: string,
    clientName: string,
    itemDescription: string,
    technician?: string
  ) => {
    try {
      const now = new Date();
      const jobId = await repairService.createRepairJob({
        jobNumber,
        clientName,
        itemDescription,
        products: [],
        subtotal: 0,
        tax: 0,
        total: 0,
        status: 'pending',
        technician,
        createdBy: userId,
        startDateTime: now,
      });

      // Add the new job to the state instead of refetching
      const newJob: RepairJob = {
        id: jobId,
        jobNumber,
        clientName,
        itemDescription,
        products: [],
        subtotal: 0,
        tax: 0,
        total: 0,
        status: 'pending',
        technician,
        createdBy: userId,
        createdAt: now,
        updatedAt: now,
        startDateTime: now,
      };
      set((state) => ({
        repairJobs: [newJob, ...state.repairJobs],
      }));
      return jobId;
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  updateRepairJob: async (id: string, data: Partial<RepairJob>) => {
    try {
      await repairService.updateRepairJob(id, data);
      set((state) => ({
        repairJobs: state.repairJobs.map((job) =>
          job.id === id ? { ...job, ...data } : job
        ),
      }));
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  updateCustomField: async (jobId: string, fieldKey: string, value: any) => {
    try {
      const job = get().repairJobs.find((j) => j.id === jobId);
      if (!job) throw new Error('Repair job not found');

      const updatedCustomFields = {
        ...(job.customFields || {}),
        [fieldKey]: value,
      };

      await repairService.updateRepairJob(jobId, {
        customFields: updatedCustomFields,
      });

      set((state) => ({
        repairJobs: state.repairJobs.map((job) =>
          job.id === jobId
            ? {
                ...job,
                customFields: updatedCustomFields,
              }
            : job
        ),
      }));
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  deleteRepairJob: async (id: string) => {
    try {
      await repairService.deleteRepairJob(id);
      set((state) => ({
        repairJobs: state.repairJobs.filter((job) => job.id !== id),
      }));
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  addProductToJob: async (jobId: string, product: QuotationItem) => {
    try {
      const job = get().repairJobs.find((j) => j.id === jobId);
      if (!job) throw new Error('Repair job not found');

      // Check if product already exists
      const existingProduct = job.products.find((p) => p.productId === product.productId);
      let updatedProducts: QuotationItem[];

      if (existingProduct) {
        // Update quantity if product already exists
        updatedProducts = job.products.map((p) =>
          p.productId === product.productId
            ? { ...p, quantity: p.quantity + product.quantity, total: (p.quantity + product.quantity) * p.price }
            : p
        );
      } else {
        updatedProducts = [...job.products, product];
      }

      const subtotal = updatedProducts.reduce((sum, p) => sum + p.total, 0);
      const tax = subtotal * 0.1;
      const total = subtotal + tax;

      await repairService.updateRepairJob(jobId, {
        products: updatedProducts,
        subtotal,
        tax,
        total,
      });

      set((state) => ({
        repairJobs: state.repairJobs.map((job) =>
          job.id === jobId
            ? {
                ...job,
                products: updatedProducts,
                subtotal,
                tax,
                total,
              }
            : job
        ),
      }));
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  removeProductFromJob: async (jobId: string, productId: string) => {
    try {
      const job = get().repairJobs.find((j) => j.id === jobId);
      if (!job) throw new Error('Repair job not found');

      const updatedProducts = job.products.filter((p) => p.productId !== productId);
      const subtotal = updatedProducts.reduce((sum, p) => sum + p.total, 0);
      const tax = subtotal * 0.1;
      const total = subtotal + tax;

      await repairService.updateRepairJob(jobId, {
        products: updatedProducts,
        subtotal,
        tax,
        total,
      });

      set((state) => ({
        repairJobs: state.repairJobs.map((job) =>
          job.id === jobId
            ? {
                ...job,
                products: updatedProducts,
                subtotal,
                tax,
                total,
              }
            : job
        ),
      }));
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  completeRepairJob: async (jobId: string, _userId: string, invoiceId: string) => {
    try {
      const now = new Date();
      // _userId parameter for consistency with other methods
      await repairService.updateRepairJob(jobId, {
        status: 'completed',
        completedDate: now,
        endDateTime: now,
        invoiceId,
      });

      set((state) => ({
        repairJobs: state.repairJobs.map((job) =>
          job.id === jobId
            ? {
                ...job,
                status: 'completed',
                completedDate: now,
                endDateTime: now,
                invoiceId,
              }
            : job
        ),
      }));
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },
}));
