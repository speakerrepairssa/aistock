import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db, auth } from './firebase';
import { Invoice } from '../types';

export const simpleInvoiceService = {
  async getAllInvoices(): Promise<Invoice[]> {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error('User not authenticated');
      
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          invoices: [],
          customers: [],
          products: [],
          settings: {}
        });
        return [];
      }
      
      const data = userDoc.data();
      return data.invoices || [];
    } catch (error) {
      console.error('Error getting invoices:', error);
      throw error;
    }
  },

  async createInvoice(invoiceData: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error('User not authenticated');
      
      const userDocRef = doc(db, 'users', userId);
      const newInvoice = {
        ...invoiceData,
        id: `inv_${Date.now()}`,
        invoiceNumber: `INV${String(Date.now()).slice(-6)}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      await updateDoc(userDocRef, {
        invoices: arrayUnion(newInvoice)
      });
      
      return newInvoice.id;
    } catch (error) {
      console.error('Error creating invoice:', error);
      throw error;
    }
  },

  async updateInvoice(id: string, invoiceData: Partial<Invoice>): Promise<void> {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error('User not authenticated');
      
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) throw new Error('User document not found');
      
      const invoices = userDoc.data().invoices || [];
      const updatedInvoices = invoices.map((inv: Invoice) => 
        inv.id === id ? { ...inv, ...invoiceData, updatedAt: new Date() } : inv
      );
      
      await updateDoc(userDocRef, {
        invoices: updatedInvoices
      });
    } catch (error) {
      console.error('Error updating invoice:', error);
      throw error;
    }
  },

  async deleteInvoice(id: string): Promise<void> {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error('User not authenticated');
      
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) throw new Error('User document not found');
      
      const invoices = userDoc.data().invoices || [];
      const updatedInvoices = invoices.filter((inv: Invoice) => inv.id !== id);
      
      await updateDoc(userDocRef, {
        invoices: updatedInvoices
      });
    } catch (error) {
      console.error('Error deleting invoice:', error);
      throw error;
    }
  }
};
