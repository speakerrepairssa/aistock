import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db, auth } from './firebase';
import { Customer } from '../types';

export const simpleCustomerService = {
  async getAllCustomers(): Promise<Customer[]> {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error('User not authenticated');
      
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          customers: [],
          products: [],
          invoices: [],
          settings: {}
        });
        return [];
      }
      
      const data = userDoc.data();
      return data.customers || [];
    } catch (error) {
      console.error('Error getting customers:', error);
      throw error;
    }
  },

  async addCustomer(customerData: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error('User not authenticated');
      
      const userDocRef = doc(db, 'users', userId);
      const newCustomer = {
        ...customerData,
        id: `cust_${Date.now()}`,
        customerNumber: `CUST${String(Date.now()).slice(-5)}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      await updateDoc(userDocRef, {
        customers: arrayUnion(newCustomer)
      });
      
      return newCustomer.id;
    } catch (error) {
      console.error('Error adding customer:', error);
      throw error;
    }
  },

  async updateCustomer(id: string, customerData: Partial<Customer>): Promise<void> {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error('User not authenticated');
      
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) throw new Error('User document not found');
      
      const customers = userDoc.data().customers || [];
      const updatedCustomers = customers.map((c: Customer) => 
        c.id === id ? { ...c, ...customerData, updatedAt: new Date() } : c
      );
      
      await updateDoc(userDocRef, {
        customers: updatedCustomers
      });
    } catch (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
  },

  async deleteCustomer(id: string): Promise<void> {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error('User not authenticated');
      
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) throw new Error('User document not found');
      
      const customers = userDoc.data().customers || [];
      const updatedCustomers = customers.filter((c: Customer) => c.id !== id);
      
      await updateDoc(userDocRef, {
        customers: updatedCustomers
      });
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw error;
    }
  }
};
