import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';
import { db } from './firebase';

export interface UserSettings {
  currency: string;
  integrations: {
    clickup?: {
      apiKey: string;
      teamId: string;
      enabled: boolean;
    };
    cloudinary?: {
      apiKey: string;
      cloudName: string;
      uploadPreset: string;
      enabled: boolean;
    };
  };
  technicians: string[];
  formFields: any[];
  notifications: {
    lowStock: boolean;
    outOfStock: boolean;
    repairReminders: boolean;
  };
  preferences: {
    theme: 'light' | 'dark';
    language: string;
    timezone: string;
  };
}

class SettingsService {
  private settingsCollection = 'users'; // Changed from 'userSettings' to 'users'

  async getUserSettings(userId: string): Promise<UserSettings | null> {
    try {
      console.log('Fetching settings for user:', userId);
      const settingsDoc = await getDoc(doc(db, this.settingsCollection, userId));
      console.log('Settings doc exists:', settingsDoc.exists());
      
      if (settingsDoc.exists()) {
        const data = settingsDoc.data();
        console.log('Settings data:', data);
        console.log('Integrations:', data.integrations);
        
        // Extract only settings-related fields from the user document
        const settings: UserSettings = {
          currency: data.currency || data.settings?.currency || 'ZAR',
          integrations: data.integrations || data.settings?.integrations || {},
          technicians: data.technicians || data.settings?.technicians || [],
          formFields: data.formFields || data.settings?.formFields || [],
          notifications: data.notifications || data.settings?.notifications || {
            lowStock: true,
            outOfStock: true,
            repairReminders: true,
          },
          preferences: data.preferences || data.settings?.preferences || {
            theme: 'light',
            language: 'en',
            timezone: 'Africa/Johannesburg',
          },
        };
        
        console.log('Parsed settings:', settings);
        return settings;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching user settings:', error);
      throw error;
    }
  }

  async createDefaultSettings(userId: string): Promise<UserSettings> {
    const defaultSettings: UserSettings = {
      currency: 'ZAR',
      integrations: {},
      technicians: [],
      formFields: [],
      notifications: {
        lowStock: true,
        outOfStock: true,
        repairReminders: true,
      },
      preferences: {
        theme: 'light',
        language: 'en',
        timezone: 'Africa/Johannesburg',
      },
    };

    try {
      await setDoc(doc(db, this.settingsCollection, userId), defaultSettings);
      return defaultSettings;
    } catch (error) {
      console.error('Error creating default settings:', error);
      throw error;
    }
  }

  async updateUserSettings(userId: string, settings: Partial<UserSettings>): Promise<void> {
    try {
      await updateDoc(doc(db, this.settingsCollection, userId), settings);
    } catch (error) {
      console.error('Error updating user settings:', error);
      throw error;
    }
  }

  async updateCurrency(userId: string, currency: string): Promise<void> {
    try {
      await updateDoc(doc(db, this.settingsCollection, userId), { currency });
    } catch (error) {
      console.error('Error updating currency:', error);
      throw error;
    }
  }

  async updateIntegration(
    userId: string, 
    integrationName: string, 
    integrationData: any
  ): Promise<void> {
    try {
      await updateDoc(doc(db, this.settingsCollection, userId), {
        [`integrations.${integrationName}`]: integrationData,
      });
    } catch (error) {
      console.error('Error updating integration:', error);
      throw error;
    }
  }

  async updateTechnicians(userId: string, technicians: string[]): Promise<void> {
    try {
      await updateDoc(doc(db, this.settingsCollection, userId), { technicians });
    } catch (error) {
      console.error('Error updating technicians:', error);
      throw error;
    }
  }

  // Real-time settings subscription
  subscribeToSettings(userId: string, callback: (settings: UserSettings | null) => void) {
    const unsubscribe = onSnapshot(
      doc(db, this.settingsCollection, userId),
      (doc) => {
        if (doc.exists()) {
          callback(doc.data() as UserSettings);
        } else {
          callback(null);
        }
      },
      (error) => {
        console.error('Error in settings subscription:', error);
        callback(null);
      }
    );

    return unsubscribe;
  }
}

export const settingsService = new SettingsService();