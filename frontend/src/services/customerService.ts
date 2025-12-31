import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Customer, CreditNote, RecurringInvoice, CustomerTransaction } from '../types';

class CustomerService {
  private customersCollection = 'customers';
  private creditNotesCollection = 'creditNotes';
  private recurringInvoicesCollection = 'recurringInvoices';
  private customerTransactionsCollection = 'customerTransactions';
  private countersCollection = 'counters';

  // Helper function to generate customer number
  private async generateCustomerNumber(): Promise<string> {
    const counterDoc = doc(db, this.countersCollection, 'customer');
    const counterSnapshot = await getDoc(counterDoc);
    
    let nextNumber = 1;
    if (counterSnapshot.exists()) {
      nextNumber = (counterSnapshot.data().value || 0) + 1;
    }
    
    await updateDoc(counterDoc, { value: nextNumber });
    return `CUST${nextNumber.toString().padStart(5, '0')}`;
  }

  // Helper function to generate credit note number
  private async generateCreditNoteNumber(): Promise<string> {
    const counterDoc = doc(db, this.countersCollection, 'creditNote');
    const counterSnapshot = await getDoc(counterDoc);
    
    let nextNumber = 1;
    if (counterSnapshot.exists()) {
      nextNumber = (counterSnapshot.data().value || 0) + 1;
    }
    
    await updateDoc(counterDoc, { value: nextNumber });
    return `CN${nextNumber.toString().padStart(5, '0')}`;
  }

  // Customer operations
  async getCustomers(userId: string): Promise<Customer[]> {
    try {
      // Try reading from user document field first
      const userDocRef = doc(db, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);
      
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const customersArray = userData.customers || [];
        
        if (customersArray.length > 0) {
          return customersArray.map((data: any) => ({
            id: data.id,
            ...data,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt || new Date()),
            updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(data.updatedAt || new Date()),
          })) as Customer[];
        }
      }
      
      // Fallback to subcollection if field is empty
      const q = query(
        collection(db, `users/${userId}/customers`),
        orderBy('createdAt', 'desc')
      );
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as Customer[];
    } catch (error) {
      console.error('Error getting customers:', error);
      return [];
    }
  }

  async createCustomer(customerData: Omit<Customer, 'id' | 'customerNumber' | 'createdAt' | 'updatedAt' | 'totalInvoiced' | 'totalPaid' | 'outstandingBalance'>): Promise<Customer> {
    const customerNumber = await this.generateCustomerNumber();
    const now = new Date();
    
    const customer: Omit<Customer, 'id'> = {
      ...customerData,
      customerNumber,
      totalInvoiced: 0,
      totalPaid: 0,
      outstandingBalance: 0,
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await addDoc(collection(db, this.customersCollection), {
      ...customer,
      createdAt: Timestamp.fromDate(customer.createdAt),
      updatedAt: Timestamp.fromDate(customer.updatedAt),
    });

    return {
      id: docRef.id,
      ...customer,
    };
  }

  async updateCustomer(id: string, updates: Partial<Customer>): Promise<Customer> {
    const customerRef = doc(db, this.customersCollection, id);
    const updateData = {
      ...updates,
      updatedAt: Timestamp.fromDate(new Date()),
    };

    await updateDoc(customerRef, updateData);

    const updatedDoc = await getDoc(customerRef);
    if (!updatedDoc.exists()) {
      throw new Error('Customer not found after update');
    }

    return {
      id: updatedDoc.id,
      ...updatedDoc.data(),
      createdAt: updatedDoc.data()!.createdAt.toDate(),
      updatedAt: updatedDoc.data()!.updatedAt.toDate(),
    } as Customer;
  }

  async deleteCustomer(id: string): Promise<void> {
    await deleteDoc(doc(db, this.customersCollection, id));
  }

  // Credit Note operations
  async getCreditNotes(userId: string): Promise<CreditNote[]> {
    const q = query(
      collection(db, this.creditNotesCollection),
      where('createdBy', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate(),
      issuedDate: doc.data().issuedDate?.toDate(),
    })) as CreditNote[];
  }

  async createCreditNote(creditNoteData: Omit<CreditNote, 'id' | 'creditNoteNumber' | 'createdAt' | 'updatedAt' | 'remainingAmount'>): Promise<CreditNote> {
    const creditNoteNumber = await this.generateCreditNoteNumber();
    const now = new Date();
    
    const creditNote: Omit<CreditNote, 'id'> = {
      ...creditNoteData,
      creditNoteNumber,
      remainingAmount: creditNoteData.total,
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await addDoc(collection(db, this.creditNotesCollection), {
      ...creditNote,
      createdAt: Timestamp.fromDate(creditNote.createdAt),
      updatedAt: Timestamp.fromDate(creditNote.updatedAt),
      issuedDate: creditNote.issuedDate ? Timestamp.fromDate(creditNote.issuedDate) : null,
    });

    return {
      id: docRef.id,
      ...creditNote,
    };
  }

  async updateCreditNote(id: string, updates: Partial<CreditNote>): Promise<CreditNote> {
    const creditNoteRef = doc(db, this.creditNotesCollection, id);
    const updateData = {
      ...updates,
      updatedAt: Timestamp.fromDate(new Date()),
    };

    if (updates.issuedDate) {
      (updateData as any).issuedDate = Timestamp.fromDate(updates.issuedDate);
    }

    await updateDoc(creditNoteRef, updateData);

    const updatedDoc = await getDoc(creditNoteRef);
    if (!updatedDoc.exists()) {
      throw new Error('Credit note not found after update');
    }

    return {
      id: updatedDoc.id,
      ...updatedDoc.data(),
      createdAt: updatedDoc.data()!.createdAt.toDate(),
      updatedAt: updatedDoc.data()!.updatedAt.toDate(),
      issuedDate: updatedDoc.data()!.issuedDate?.toDate(),
    } as CreditNote;
  }

  async applyCreditNoteToInvoice(creditNoteId: string, invoiceId: string, invoiceNumber: string, amount: number): Promise<CreditNote> {
    const creditNoteRef = doc(db, this.creditNotesCollection, creditNoteId);
    const creditNoteDoc = await getDoc(creditNoteRef);
    
    if (!creditNoteDoc.exists()) {
      throw new Error('Credit note not found');
    }

    const creditNote = creditNoteDoc.data() as CreditNote;
    const newRemainingAmount = creditNote.remainingAmount - amount;
    
    if (newRemainingAmount < 0) {
      throw new Error('Cannot apply more than the remaining credit amount');
    }

    const updatedAppliedInvoices = [
      ...creditNote.appliedToInvoices,
      { invoiceId, invoiceNumber, amountApplied: amount }
    ];

    await updateDoc(creditNoteRef, {
      appliedToInvoices: updatedAppliedInvoices,
      remainingAmount: newRemainingAmount,
      status: newRemainingAmount === 0 ? 'applied' : 'issued',
      updatedAt: Timestamp.fromDate(new Date()),
    });

    return this.getCreditNoteById(creditNoteId);
  }

  async deleteCreditNote(id: string): Promise<void> {
    await deleteDoc(doc(db, this.creditNotesCollection, id));
  }

  private async getCreditNoteById(id: string): Promise<CreditNote> {
    const docSnapshot = await getDoc(doc(db, this.creditNotesCollection, id));
    if (!docSnapshot.exists()) {
      throw new Error('Credit note not found');
    }
    
    return {
      id: docSnapshot.id,
      ...docSnapshot.data(),
      createdAt: docSnapshot.data()!.createdAt.toDate(),
      updatedAt: docSnapshot.data()!.updatedAt.toDate(),
      issuedDate: docSnapshot.data()!.issuedDate?.toDate(),
    } as CreditNote;
  }

  // Recurring Invoice operations
  async getRecurringInvoices(userId: string): Promise<RecurringInvoice[]> {
    const q = query(
      collection(db, this.recurringInvoicesCollection),
      where('createdBy', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      startDate: doc.data().startDate.toDate(),
      endDate: doc.data().endDate?.toDate(),
      nextInvoiceDate: doc.data().nextInvoiceDate.toDate(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate(),
      lastGeneratedDate: doc.data().lastGeneratedDate?.toDate(),
    })) as RecurringInvoice[];
  }

  async createRecurringInvoice(recurringInvoiceData: Omit<RecurringInvoice, 'id' | 'createdAt' | 'updatedAt' | 'occurrencesGenerated' | 'generatedInvoices' | 'lastGeneratedDate'>): Promise<RecurringInvoice> {
    const now = new Date();
    
    const recurringInvoice: Omit<RecurringInvoice, 'id'> = {
      ...recurringInvoiceData,
      occurrencesGenerated: 0,
      generatedInvoices: [],
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await addDoc(collection(db, this.recurringInvoicesCollection), {
      ...recurringInvoice,
      startDate: Timestamp.fromDate(recurringInvoice.startDate),
      endDate: recurringInvoice.endDate ? Timestamp.fromDate(recurringInvoice.endDate) : null,
      nextInvoiceDate: Timestamp.fromDate(recurringInvoice.nextInvoiceDate),
      createdAt: Timestamp.fromDate(recurringInvoice.createdAt),
      updatedAt: Timestamp.fromDate(recurringInvoice.updatedAt),
    });

    return {
      id: docRef.id,
      ...recurringInvoice,
    };
  }

  async updateRecurringInvoice(id: string, updates: Partial<RecurringInvoice>): Promise<RecurringInvoice> {
    const recurringInvoiceRef = doc(db, this.recurringInvoicesCollection, id);
    const updateData = {
      ...updates,
      updatedAt: Timestamp.fromDate(new Date()),
    };

    if (updates.startDate) {
      (updateData as any).startDate = Timestamp.fromDate(updates.startDate);
    }
    if (updates.endDate) {
      (updateData as any).endDate = Timestamp.fromDate(updates.endDate);
    }
    if (updates.nextInvoiceDate) {
      (updateData as any).nextInvoiceDate = Timestamp.fromDate(updates.nextInvoiceDate);
    }
    if (updates.lastGeneratedDate) {
      (updateData as any).lastGeneratedDate = Timestamp.fromDate(updates.lastGeneratedDate);
    }

    await updateDoc(recurringInvoiceRef, updateData);

    const updatedDoc = await getDoc(recurringInvoiceRef);
    if (!updatedDoc.exists()) {
      throw new Error('Recurring invoice not found after update');
    }

    return {
      id: updatedDoc.id,
      ...updatedDoc.data(),
      startDate: updatedDoc.data()!.startDate.toDate(),
      endDate: updatedDoc.data()!.endDate?.toDate(),
      nextInvoiceDate: updatedDoc.data()!.nextInvoiceDate.toDate(),
      createdAt: updatedDoc.data()!.createdAt.toDate(),
      updatedAt: updatedDoc.data()!.updatedAt.toDate(),
      lastGeneratedDate: updatedDoc.data()!.lastGeneratedDate?.toDate(),
    } as RecurringInvoice;
  }

  async deleteRecurringInvoice(id: string): Promise<void> {
    await deleteDoc(doc(db, this.recurringInvoicesCollection, id));
  }

  async generateInvoiceFromRecurring(recurringId: string): Promise<string> {
    // This would integrate with your existing invoice service
    // For now, returning a placeholder - you'd implement the actual invoice generation
    const invoiceId = `INV${Date.now()}`;
    
    // Calculate next invoice date based on frequency
    const recurringInvoice = await this.getRecurringInvoiceById(recurringId);
    const nextDate = this.calculateNextInvoiceDate(recurringInvoice);
    
    // Update the recurring invoice with next date
    await this.updateRecurringInvoice(recurringId, {
      nextInvoiceDate: nextDate,
    });
    
    return invoiceId;
  }

  private async getRecurringInvoiceById(id: string): Promise<RecurringInvoice> {
    const docSnapshot = await getDoc(doc(db, this.recurringInvoicesCollection, id));
    if (!docSnapshot.exists()) {
      throw new Error('Recurring invoice not found');
    }
    
    return {
      id: docSnapshot.id,
      ...docSnapshot.data(),
      startDate: docSnapshot.data()!.startDate.toDate(),
      endDate: docSnapshot.data()!.endDate?.toDate(),
      nextInvoiceDate: docSnapshot.data()!.nextInvoiceDate.toDate(),
      createdAt: docSnapshot.data()!.createdAt.toDate(),
      updatedAt: docSnapshot.data()!.updatedAt.toDate(),
      lastGeneratedDate: docSnapshot.data()!.lastGeneratedDate?.toDate(),
    } as RecurringInvoice;
  }

  private calculateNextInvoiceDate(recurringInvoice: RecurringInvoice): Date {
    const currentDate = new Date(recurringInvoice.nextInvoiceDate);
    
    switch (recurringInvoice.frequency) {
      case 'weekly':
        currentDate.setDate(currentDate.getDate() + 7);
        break;
      case 'monthly':
        currentDate.setMonth(currentDate.getMonth() + 1);
        break;
      case 'quarterly':
        currentDate.setMonth(currentDate.getMonth() + 3);
        break;
      case 'yearly':
        currentDate.setFullYear(currentDate.getFullYear() + 1);
        break;
      case 'custom':
        if (recurringInvoice.customFrequency) {
          const { interval, unit } = recurringInvoice.customFrequency;
          switch (unit) {
            case 'days':
              currentDate.setDate(currentDate.getDate() + interval);
              break;
            case 'weeks':
              currentDate.setDate(currentDate.getDate() + (interval * 7));
              break;
            case 'months':
              currentDate.setMonth(currentDate.getMonth() + interval);
              break;
            case 'years':
              currentDate.setFullYear(currentDate.getFullYear() + interval);
              break;
          }
        }
        break;
    }
    
    return currentDate;
  }

  // Customer Transaction operations
  async getCustomerTransactions(customerId: string): Promise<CustomerTransaction[]> {
    const q = query(
      collection(db, this.customerTransactionsCollection),
      where('customerId', '==', customerId),
      orderBy('date', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date.toDate(),
      createdAt: doc.data().createdAt.toDate(),
    })) as CustomerTransaction[];
  }

  async addCustomerTransaction(transactionData: Omit<CustomerTransaction, 'id' | 'createdAt'>): Promise<CustomerTransaction> {
    const now = new Date();
    
    const transaction: Omit<CustomerTransaction, 'id'> = {
      ...transactionData,
      createdAt: now,
    };

    const docRef = await addDoc(collection(db, this.customerTransactionsCollection), {
      ...transaction,
      date: Timestamp.fromDate(transaction.date),
      createdAt: Timestamp.fromDate(transaction.createdAt),
    });

    return {
      id: docRef.id,
      ...transaction,
    };
  }

  async getCustomerStatement(customerId: string, startDate: Date, endDate: Date): Promise<CustomerTransaction[]> {
    const q = query(
      collection(db, this.customerTransactionsCollection),
      where('customerId', '==', customerId),
      where('date', '>=', Timestamp.fromDate(startDate)),
      where('date', '<=', Timestamp.fromDate(endDate)),
      orderBy('date', 'asc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date.toDate(),
      createdAt: doc.data().createdAt.toDate(),
    })) as CustomerTransaction[];
  }
}

export const customerService = new CustomerService();