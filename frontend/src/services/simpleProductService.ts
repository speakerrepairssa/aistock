import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db, auth } from './firebase';
import { Product } from '../types';

// Clean data to remove undefined values (Firebase doesn't accept undefined)
const cleanData = (obj: any): any => {
  const cleaned: any = {};
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    if (value !== undefined) {
      cleaned[key] = value === null ? null : value;
    }
  });
  return cleaned;
};

// Simple structure: everything stored in /users/{userId} document as arrays
export const simpleProductService = {
  async getAllProducts(): Promise<Product[]> {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error('User not authenticated');
      
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        // Initialize empty user document
        await setDoc(userDocRef, {
          products: [],
          customers: [],
          invoices: [],
          settings: {}
        });
        return [];
      }
      
      const data = userDoc.data();
      return data.products || [];
    } catch (error) {
      console.error('Error getting products:', error);
      throw error;
    }
  },

  async addProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error('User not authenticated');
      
      const userDocRef = doc(db, 'users', userId);
      
      // Ensure user document exists
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          products: [],
          customers: [],
          invoices: [],
          settings: {}
        });
      }
      
      const newProduct = cleanData({
        ...productData,
        id: `prod_${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      // Add product to array
      await updateDoc(userDocRef, {
        products: arrayUnion(newProduct)
      });
      
      return newProduct.id;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  },

  async updateProduct(id: string, productData: Partial<Product>): Promise<void> {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error('User not authenticated');
      
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) throw new Error('User document not found');
      
      const products = userDoc.data().products || [];
      const cleanedData = cleanData(productData);
      const updatedProducts = products.map((p: Product) => 
        p.id === id ? { ...p, ...cleanedData, updatedAt: new Date() } : p
      );
      
      await updateDoc(userDocRef, {
        products: updatedProducts
      });
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  async deleteProduct(id: string): Promise<void> {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error('User not authenticated');
      
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) throw new Error('User document not found');
      
      const products = userDoc.data().products || [];
      const updatedProducts = products.filter((p: Product) => p.id !== id);
      
      await updateDoc(userDocRef, {
        products: updatedProducts
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  async updateProductQuantity(id: string, quantity: number, reason: string): Promise<void> {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error('User not authenticated');
      
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) throw new Error('User document not found');
      
      const products = userDoc.data().products || [];
      const updatedProducts = products.map((p: Product) => {
        if (p.id === id) {
          return {
            ...p,
            quantity,
            updatedAt: new Date()
          };
        }
        return p;
      });
      
      // Also log the stock movement
      const stockMovement = {
        id: `mov_${Date.now()}`,
        productId: id,
        quantity,
        reason,
        createdAt: new Date()
      };
      
      await updateDoc(userDocRef, {
        products: updatedProducts,
        stockMovements: arrayUnion(stockMovement)
      });
    } catch (error) {
      console.error('Error updating product quantity:', error);
      throw error;
    }
  },

  async searchProducts(searchTerm: string): Promise<Product[]> {
    try {
      const allProducts = await this.getAllProducts();
      const term = searchTerm.toLowerCase();
      
      return allProducts.filter((product: Product) =>
        product.name.toLowerCase().includes(term) ||
        product.sku.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
      );
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }
};
