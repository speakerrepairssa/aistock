import { db } from './firebase';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
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
      const q = query(
        collection(db, INVOICES_COLLECTION),
        where('createdBy', '==', userId)
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
