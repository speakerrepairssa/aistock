import { create } from 'zustand';
import { Product, DashboardStats } from '../types';
import { productService, dashboardService } from '../services';

interface ProductStore {
  products: Product[];
  loading: boolean;
  error: string | null;
  stats: DashboardStats | null;
  
  // Product actions
  fetchProducts: () => Promise<void>;
  searchProducts: (searchTerm: string) => Promise<void>;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateProductQuantity: (id: string, quantity: number, reason: string, userId: string) => Promise<void>;
  
  // Stats actions
  fetchStats: () => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,
  error: null,
  stats: {
    totalProducts: 0,
    lowStockCount: 0,
    outOfStockCount: 0,
    totalInventoryValue: 0,
  },

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const products = await productService.getAllProducts(10000);
      set({ products, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch products',
        loading: false,
      });
    }
  },

  searchProducts: async (searchTerm: string) => {
    set({ loading: true, error: null });
    try {
      const products = await productService.searchProducts(searchTerm);
      set({ products, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Search failed',
        loading: false,
      });
    }
  },

  addProduct: async (product) => {
    set({ loading: true, error: null });
    try {
      const id = await productService.addProduct(product);
      set((state) => ({
        products: [...state.products, { ...product, id, createdAt: new Date(), updatedAt: new Date() }],
        loading: false,
      }));
      return id;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to add product',
        loading: false,
      });
      throw error;
    }
  },

  updateProduct: async (id: string, product: Partial<Product>) => {
    set({ loading: true, error: null });
    try {
      await productService.updateProduct(id, product);
      set((state) => ({
        products: state.products.map((p) =>
          p.id === id ? { ...p, ...product } : p
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update product',
        loading: false,
      });
      throw error;
    }
  },

  deleteProduct: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await productService.deleteProduct(id);
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to delete product',
        loading: false,
      });
      throw error;
    }
  },

  updateProductQuantity: async (id: string, quantity: number, reason: string, userId: string) => {
    set({ loading: true, error: null });
    try {
      const newQuantity = await productService.updateProductQuantity(id, quantity, reason, userId);
      set((state) => ({
        products: state.products.map((p) =>
          p.id === id ? { ...p, quantity: newQuantity } : p
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update quantity',
        loading: false,
      });
      throw error;
    }
  },

  fetchStats: async () => {
    try {
      console.log('fetchStats called...');
      const stats = await dashboardService.getDashboardStats();
      console.log('Stats fetched:', stats);
      set({ stats });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  },
}));
