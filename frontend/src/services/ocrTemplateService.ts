import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { InvoiceTemplate } from '../types/ocr';

const TEMPLATES_COLLECTION = 'ocrTemplates';

export const ocrTemplateService = {
  async createTemplate(_userId: string, template: Omit<InvoiceTemplate, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      const docRef = await addDoc(collection(db, TEMPLATES_COLLECTION), {
        ...template,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating OCR template:', error);
      throw error;
    }
  },

  async updateTemplate(id: string, updates: Partial<InvoiceTemplate>) {
    try {
      const docRef = doc(db, TEMPLATES_COLLECTION, id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error updating OCR template:', error);
      throw error;
    }
  },

  async deleteTemplate(id: string) {
    try {
      const docRef = doc(db, TEMPLATES_COLLECTION, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting OCR template:', error);
      throw error;
    }
  },

  async getTemplates(userId: string): Promise<InvoiceTemplate[]> {
    try {
      const q = query(
        collection(db, TEMPLATES_COLLECTION),
        where('createdBy', '==', userId)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as InvoiceTemplate[];
    } catch (error) {
      console.error('Error getting OCR templates:', error);
      throw error;
    }
  },

  detectTemplate(text: string, templates: InvoiceTemplate[]): { template: InvoiceTemplate | null; confidence: number } {
    let bestMatch: InvoiceTemplate | null = null;
    let bestScore = 0;

    for (const template of templates) {
      let score = 0;
      const lowerText = text.toLowerCase();

      // Check for supplier identifiers
      for (const identifier of template.supplierIdentifiers) {
        if (lowerText.includes(identifier.toLowerCase())) {
          score += 30;
        }
      }

      // Check for section markers
      for (const marker of template.config.itemsSectionStart) {
        if (lowerText.includes(marker.toLowerCase())) {
          score += 20;
        }
      }

      for (const marker of template.config.itemsSectionEnd) {
        if (lowerText.includes(marker.toLowerCase())) {
          score += 10;
        }
      }

      // Check column headers
      const columnKeywords = [
        ...(template.config.columns.quantity.keywords || []),
        ...(template.config.columns.description.keywords || []),
        ...(template.config.columns.price.keywords || []),
        ...(template.config.columns.total.keywords || []),
      ];

      for (const keyword of columnKeywords) {
        if (lowerText.includes(keyword.toLowerCase())) {
          score += 5;
        }
      }

      if (score > bestScore) {
        bestScore = score;
        bestMatch = template;
      }
    }

    return {
      template: bestMatch,
      confidence: Math.min(bestScore / 100, 1),
    };
  },
};
