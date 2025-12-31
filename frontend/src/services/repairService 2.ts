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
  deleteField,
} from 'firebase/firestore';
import { RepairJob } from '../types';

const REPAIR_JOBS_COLLECTION = 'repairJobs';

export const repairService = {
  async createRepairJob(
    data: Omit<RepairJob, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<string> {
    try {
      const jobData: any = {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };
      
      // Convert startDateTime to Timestamp if it exists
      if (data.startDateTime) {
        jobData.startDateTime = Timestamp.fromDate(new Date(data.startDateTime));
      }
      
      const docRef = await addDoc(collection(db, REPAIR_JOBS_COLLECTION), jobData);
      return docRef.id;
    } catch (error) {
      console.error('Error creating repair job:', error);
      throw error;
    }
  },

  async updateRepairJob(
    id: string,
    data: Partial<RepairJob>
  ): Promise<void> {
    try {
      const updateData: any = {
        updatedAt: Timestamp.now(),
      };
      
      // Process each field in data
      Object.keys(data).forEach((key) => {
        const value = (data as any)[key];
        
        // Handle date fields
        if (key === 'startDateTime' && value) {
          updateData.startDateTime = Timestamp.fromDate(new Date(value));
        } else if (key === 'endDateTime') {
          if (value) {
            updateData.endDateTime = Timestamp.fromDate(new Date(value));
          } else {
            // Delete the field if value is null or undefined
            updateData.endDateTime = deleteField();
          }
        } else if (key === 'completedDate') {
          if (value) {
            updateData.completedDate = Timestamp.fromDate(new Date(value));
          } else {
            // Delete the field if value is null or undefined
            updateData.completedDate = deleteField();
          }
        } else if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
          updateData[key] = value;
        }
      });
      
      await updateDoc(doc(db, REPAIR_JOBS_COLLECTION, id), updateData);
    } catch (error) {
      console.error('Error updating repair job:', error);
      throw error;
    }
  },

  async deleteRepairJob(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, REPAIR_JOBS_COLLECTION, id));
    } catch (error) {
      console.error('Error deleting repair job:', error);
      throw error;
    }
  },

  async getRepairJobsByUser(userId: string): Promise<RepairJob[]> {
    try {
      const q = query(
        collection(db, REPAIR_JOBS_COLLECTION),
        where('createdBy', '==', userId)
      );
      const querySnapshot = await getDocs(q);
      const jobs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        completedDate: doc.data().completedDate?.toDate(),
        startDateTime: doc.data().startDateTime?.toDate(),
        endDateTime: doc.data().endDateTime?.toDate(),
      })) as RepairJob[];
      // Sort by createdAt descending in JavaScript instead of relying on Firestore index
      return jobs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (error) {
      console.error('Error fetching repair jobs:', error);
      throw error;
    }
  },

  async getRepairJobsByStatus(
    userId: string,
    status: string
  ): Promise<RepairJob[]> {
    try {
      const q = query(
        collection(db, REPAIR_JOBS_COLLECTION),
        where('createdBy', '==', userId),
        where('status', '==', status)
      );
      const querySnapshot = await getDocs(q);
      const jobs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        completedDate: doc.data().completedDate?.toDate(),
        startDateTime: doc.data().startDateTime?.toDate(),
        endDateTime: doc.data().endDateTime?.toDate(),
      })) as RepairJob[];
      // Sort by createdAt descending in JavaScript instead of relying on Firestore index
      return jobs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (error) {
      console.error('Error fetching repair jobs by status:', error);
      throw error;
    }
  },
};
