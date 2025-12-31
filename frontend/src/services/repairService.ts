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
      
      // Save to user's subcollection instead of root collection
      const docRef = await addDoc(
        collection(db, `users/${data.createdBy}/repairJobs`),
        jobData
      );
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
      // Get the userId from the data if available, otherwise we need to fetch it
      let userId = data.createdBy;
      
      if (!userId) {
        // Try to find the job in all possible locations to get the userId
        // First, try the root collection (legacy)
        const rootDocRef = doc(db, REPAIR_JOBS_COLLECTION, id);
        const rootDocSnap = await getDoc(rootDocRef);
        
        if (rootDocSnap.exists()) {
          userId = rootDocSnap.data().createdBy;
        }
      }
      
      if (!userId) {
        throw new Error('Cannot update repair job: user ID not found');
      }
      
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
      
      // Update in user's subcollection
      await updateDoc(doc(db, `users/${userId}/repairJobs`, id), updateData);
    } catch (error) {
      console.error('Error updating repair job:', error);
      throw error;
    }
  },

  async deleteRepairJob(id: string, userId: string): Promise<void> {
    try {
      // Delete from user's subcollection
      await deleteDoc(doc(db, `users/${userId}/repairJobs`, id));
    } catch (error) {
      console.error('Error deleting repair job:', error);
      throw error;
    }
  },

  async getRepairJobsByUser(userId: string): Promise<RepairJob[]> {
    try {
      // Try reading from user document field first
      const userDocRef = doc(db, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);
      
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const repairJobsArray = userData.repairJobs || [];
        
        if (repairJobsArray.length > 0) {
          return repairJobsArray.map((data: any) => ({
            id: data.id,
            ...data,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt || new Date()),
            updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(data.updatedAt || new Date()),
            startDateTime: data.startDateTime?.toDate ? data.startDateTime.toDate() : (data.startDateTime ? new Date(data.startDateTime) : undefined),
            endDateTime: data.endDateTime?.toDate ? data.endDateTime.toDate() : (data.endDateTime ? new Date(data.endDateTime) : undefined),
            completedDate: data.completedDate?.toDate ? data.completedDate.toDate() : (data.completedDate ? new Date(data.completedDate) : undefined),
          })) as RepairJob[];
        }
      }
      
      // Fallback to subcollection
      const q = query(
        collection(db, `users/${userId}/repairJobs`)
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
