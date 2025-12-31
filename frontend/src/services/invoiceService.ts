import { db } from './firebase';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  Timestamp,
} from 'firebase/firestore';
import { Invoice } from '../types';

const INVOICES_COLLECTION = 'invoices';

export const invoiceService = {
  async createInvoice(
    data: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, INVOICES_COLLECTION), {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating invoice:', error);
      throw error;
    }
  },

  async updateInvoice(
    id: string,
    data: Partial<Invoice>
  ): Promise<void> {
    try {
      await updateDoc(doc(db, INVOICES_COLLECTION, id), {
        ...data,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error updating invoice:', error);
      throw error;
    }
  },

  async deleteInvoice(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, INVOICES_COLLECTION, id));
    } catch (error) {
      console.error('Error deleting invoice:', error);
      throw error;
    }
  },

  async getInvoicesByUser(userId: string): Promise<Invoice[]> {
    try {
      // Try reading from user document field first
      const userDocRef = doc(db, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);
      
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const invoicesArray = userData.invoices || [];
        
        if (invoicesArray.length > 0) {
          const invoices = invoicesArray.map((data: any) => ({
            id: data.id,
            ...data,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt || new Date()),
            updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(data.updatedAt || new Date()),
            dueDate: data.dueDate?.toDate ? data.dueDate.toDate() : new Date(data.dueDate || new Date()),
            sentDate: data.sentDate?.toDate ? data.sentDate.toDate() : (data.sentDate ? new Date(data.sentDate) : undefined),
            paidDate: data.paidDate?.toDate ? data.paidDate.toDate() : (data.paidDate ? new Date(data.paidDate) : undefined),
          })) as Invoice[];
          return invoices.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
      }
      
      // Fallback to subcollection
      const q = query(
        collection(db, `users/${userId}/invoices`)
      );
      const querySnapshot = await getDocs(q);
      const invoices = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        dueDate: doc.data().dueDate?.toDate() || new Date(),
        sentDate: doc.data().sentDate?.toDate(),
        paidDate: doc.data().paidDate?.toDate(),
      })) as Invoice[];
      return invoices.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (error) {
      console.error('Error fetching invoices:', error);
      throw error;
    }
  },

  async getInvoicesByStatus(
    userId: string,
    status: string
  ): Promise<Invoice[]> {
    try {
      const q = query(
        collection(db, INVOICES_COLLECTION),
        where('createdBy', '==', userId),
        where('status', '==', status)
      );
      const querySnapshot = await getDocs(q);
      const invoices = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        dueDate: doc.data().dueDate?.toDate() || new Date(),
        sentDate: doc.data().sentDate?.toDate(),
        paidDate: doc.data().paidDate?.toDate(),
      })) as Invoice[];
      // Sort by createdAt descending in JavaScript instead of relying on Firestore index
      return invoices.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (error) {
      console.error('Error fetching invoices by status:', error);
      throw error;
    }
  },
};
