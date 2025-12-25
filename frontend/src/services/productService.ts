import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  QueryConstraint,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Product, StockMovement, DashboardStats } from '../types';

const PRODUCTS_COLLECTION = 'products';
const STOCK_MOVEMENTS_COLLECTION = 'stockMovements';

// ============ PRODUCT SERVICES ============

const cleanProductData = (data: any) => {
  const cleaned: any = {};
  Object.keys(data).forEach((key) => {
    const value = data[key];
    // Only include the field if it's not undefined and not null (except for explicit nulls)
    if (value !== undefined && value !== null) {
      cleaned[key] = value;
    }
  });
  return cleaned;
};

export const productService = {
  async addProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      const cleaned = cleanProductData(productData);
      const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
        ...cleaned,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  },

  async updateProduct(id: string, productData: Partial<Product>) {
    try {
      const cleaned = cleanProductData(productData);
      const docRef = doc(db, PRODUCTS_COLLECTION, id);
      await updateDoc(docRef, {
        ...cleaned,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  async deleteProduct(id: string) {
    try {
      const docRef = doc(db, PRODUCTS_COLLECTION, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  async getProductById(id: string): Promise<Product | null> {
    try {
      const docRef = doc(db, PRODUCTS_COLLECTION, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
          createdAt: docSnap.data().createdAt?.toDate() || new Date(),
          updatedAt: docSnap.data().updatedAt?.toDate() || new Date(),
        } as Product;
      }
      return null;
    } catch (error) {
      console.error('Error getting product:', error);
      throw error;
    }
  },

  async getAllProducts(pageSize: number = 50): Promise<Product[]> {
    try {
      const q = query(
        collection(db, PRODUCTS_COLLECTION),
        orderBy('createdAt', 'desc'),
        limit(pageSize)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || '',
          sku: data.sku || '',
          description: data.description || '',
          category: data.category || '',
          price: data.price || 0,
          costPrice: data.costPrice || 0,
          quantity: data.quantity || 0,
          reorderLevel: data.reorderLevel || 0,
          imageUrl: data.imageUrl,
          status: data.status || 'active',
          tags: data.tags || [],
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as Product;
      });
    } catch (error) {
      console.error('Error getting products:', error);
      throw error;
    }
  },

  async searchProducts(searchTerm: string, pageSize: number = 50): Promise<Product[]> {
    try {
      const constraints: QueryConstraint[] = [
        where('status', '==', 'active'),
        orderBy('name'),
        limit(pageSize),
      ];

      const q = query(collection(db, PRODUCTS_COLLECTION), ...constraints);
      const querySnapshot = await getDocs(q);

      // Client-side filtering for search term
      return querySnapshot.docs
        .map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || '',
            sku: data.sku || '',
            description: data.description || '',
            category: data.category || '',
            price: data.price || 0,
            costPrice: data.costPrice || 0,
            quantity: data.quantity || 0,
            reorderLevel: data.reorderLevel || 0,
            imageUrl: data.imageUrl,
            status: data.status || 'active',
            tags: data.tags || [],
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
          } as Product;
        })
        .filter(
          product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const q = query(
        collection(db, PRODUCTS_COLLECTION),
        where('category', '==', category),
        where('status', '==', 'active')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as Product[];
    } catch (error) {
      console.error('Error getting products by category:', error);
      throw error;
    }
  },

  async getLowStockProducts(reorderLevelOffset: number = 0): Promise<Product[]> {
    try {
      const q = query(
        collection(db, PRODUCTS_COLLECTION),
        where('status', '==', 'active')
      );
      const querySnapshot = await getDocs(q);

      // Client-side filtering for low stock
      return querySnapshot.docs
        .map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || '',
            sku: data.sku || '',
            description: data.description || '',
            category: data.category || '',
            price: data.price || 0,
            costPrice: data.costPrice || 0,
            quantity: data.quantity || 0,
            reorderLevel: data.reorderLevel || 0,
            imageUrl: data.imageUrl,
            status: data.status || 'active',
            tags: data.tags || [],
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
          } as Product;
        })
        .filter(product => product.quantity <= product.reorderLevel + reorderLevelOffset);
    } catch (error) {
      console.error('Error getting low stock products:', error);
      throw error;
    }
  },

  async updateProductQuantity(
    id: string,
    quantityChange: number,
    reason: string,
    userId: string,
    notes?: string
  ) {
    try {
      const product = await this.getProductById(id);
      if (!product) throw new Error('Product not found');

      const newQuantity = product.quantity + quantityChange;

      // Update product
      await this.updateProduct(id, { quantity: newQuantity });

      // Log stock movement
      await stockMovementService.logMovement({
        productId: id,
        type: 'adjustment',
        quantity: quantityChange,
        previousQuantity: product.quantity,
        newQuantity,
        reason,
        userId,
        notes,
      });

      return newQuantity;
    } catch (error) {
      console.error('Error updating product quantity:', error);
      throw error;
    }
  },
};

// ============ STOCK MOVEMENT SERVICES ============

export const stockMovementService = {
  async logMovement(movementData: Omit<StockMovement, 'id' | 'timestamp'>) {
    try {
      const docRef = await addDoc(collection(db, STOCK_MOVEMENTS_COLLECTION), {
        ...movementData,
        timestamp: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error logging stock movement:', error);
      throw error;
    }
  },

  async getMovementsByProduct(
    productId: string,
    limit_count: number = 50
  ): Promise<StockMovement[]> {
    try {
      const q = query(
        collection(db, STOCK_MOVEMENTS_COLLECTION),
        where('productId', '==', productId),
        orderBy('timestamp', 'desc'),
        limit(limit_count)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate() || new Date(),
      })) as StockMovement[];
    } catch (error) {
      console.error('Error getting movements:', error);
      throw error;
    }
  },

  async getAllMovements(limit_count: number = 100): Promise<StockMovement[]> {
    try {
      const q = query(
        collection(db, STOCK_MOVEMENTS_COLLECTION),
        orderBy('timestamp', 'desc'),
        limit(limit_count)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate() || new Date(),
      })) as StockMovement[];
    } catch (error) {
      console.error('Error getting all movements:', error);
      throw error;
    }
  },
};

// ============ DASHBOARD SERVICES ============

export const dashboardService = {
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      const products = await productService.getAllProducts(10000);
      const lowStockProducts = await productService.getLowStockProducts();

      const outOfStockCount = products.filter(p => p.quantity === 0).length;
      const totalInventoryValue = products.reduce(
        (sum, p) => sum + p.costPrice * p.quantity,
        0
      );

      return {
        totalProducts: products.length,
        lowStockCount: lowStockProducts.length,
        outOfStockCount,
        totalInventoryValue,
      };
    } catch (error) {
      console.error('Error getting dashboard stats:', error);
      throw error;
    }
  },
};
