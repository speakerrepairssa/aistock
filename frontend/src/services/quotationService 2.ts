import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Quotation } from '../types';

const QUOTATIONS_COLLECTION = 'quotations';

export const quotationService = {
  async createQuotation(quotationData: Omit<Quotation, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      const docRef = await addDoc(collection(db, QUOTATIONS_COLLECTION), {
        ...quotationData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating quotation:', error);
      throw error;
    }
  },

  async updateQuotation(id: string, quotationData: Partial<Quotation>) {
    try {
      const docRef = doc(db, QUOTATIONS_COLLECTION, id);
      await updateDoc(docRef, {
        ...quotationData,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error updating quotation:', error);
      throw error;
    }
  },

  async deleteQuotation(id: string) {
    try {
      const docRef = doc(db, QUOTATIONS_COLLECTION, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting quotation:', error);
      throw error;
    }
  },

  async getQuotationsByUser(userId: string): Promise<Quotation[]> {
    try {
      const q = query(
        collection(db, QUOTATIONS_COLLECTION),
        where('createdBy', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        bookedOutDate: doc.data().bookedOutDate?.toDate(),
        deliveredDate: doc.data().deliveredDate?.toDate(),
      })) as Quotation[];
    } catch (error) {
      console.error('Error fetching quotations:', error);
      throw error;
    }
  },

  async getQuotationsByStatus(userId: string, status: string): Promise<Quotation[]> {
    try {
      const q = query(
        collection(db, QUOTATIONS_COLLECTION),
        where('createdBy', '==', userId),
        where('status', '==', status),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        bookedOutDate: doc.data().bookedOutDate?.toDate(),
        deliveredDate: doc.data().deliveredDate?.toDate(),
      })) as Quotation[];
    } catch (error) {
      console.error('Error fetching quotations by status:', error);
      throw error;
    }
  },
};
