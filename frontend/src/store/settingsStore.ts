import { create } from 'zustand';
import { settingsService, UserSettings } from '../services/settingsService';

export type Currency = 'USD' | 'ZAR' | 'EUR' | 'GBP' | 'INR' | 'AED' | 'SGD' | 'AUD';

export interface Integration {
  name: string;
  apiKey: string;
  enabled: boolean;
  teamId?: string; // For ClickUp team ID
}

export interface FormField {
  id: string;
  key: string; // Internal key (e.g., 'jobNumber')
  label: string; // Display label (e.g., 'Job Number' or 'ClickUp ID')
  placeholder?: string;
  required: boolean;
  type: 'text' | 'textarea' | 'select' | 'number'; // Field type
  multiline?: boolean; // For textarea
  rows?: number; // For textarea
}

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: '$',
  ZAR: 'R',
  EUR: '€',
  GBP: '£',
  INR: '₹',
  AED: 'د.إ',
  SGD: 'S$',
  AUD: 'A$',
};

export const CURRENCY_NAMES: Record<Currency, string> = {
  USD: 'US Dollar',
  ZAR: 'South African Rand',
  EUR: 'Euro',
  GBP: 'British Pound',
  INR: 'Indian Rupee',
  AED: 'UAE Dirham',
  SGD: 'Singapore Dollar',
  AUD: 'Australian Dollar',
};

// Default form fields
export const DEFAULT_FORM_FIELDS: FormField[] = [
  { id: '1', key: 'jobNumber', label: 'Job Number', required: true, type: 'text', placeholder: 'e.g., 275466666' },
  { id: '2', key: 'clientName', label: 'Client Name', required: true, type: 'text' },
  { id: '3', key: 'itemDescription', label: 'Item Description', required: true, type: 'textarea', multiline: true, rows: 3 },
  { id: '4', key: 'technician', label: 'Technician', required: false, type: 'select' },
];

interface SettingsStore {
  currency: Currency;
  technicians: string[];
  integrations: Integration[];
  formFields: FormField[];
  loading: boolean;
  error: string | null;
  isInitialized: boolean;

  // Firebase-backed actions
  initializeSettings: (userId: string) => Promise<void>;
  setCurrency: (userId: string, currency: Currency) => Promise<void>;
  
  // Technicians
  addTechnician: (userId: string, name: string) => Promise<void>;
  removeTechnician: (userId: string, name: string) => Promise<void>;
  updateTechnician: (userId: string, oldName: string, newName: string) => Promise<void>;
  
  // Integrations
  addIntegration: (userId: string, name: string, apiKey: string, teamId?: string) => Promise<void>;
  updateIntegration: (userId: string, name: string, apiKey: string, enabled: boolean, teamId?: string) => Promise<void>;
  removeIntegration: (userId: string, name: string) => Promise<void>;
  getIntegration: (name: string) => Integration | undefined;
  
  // Form fields
  addFormField: (userId: string, field: FormField) => Promise<void>;
  updateFormField: (userId: string, id: string, field: Partial<FormField>) => Promise<void>;
  removeFormField: (userId: string, id: string) => Promise<void>;
  resetFormFields: (userId: string) => Promise<void>;

  // Local state management
  updateLocalSettings: (settings: Partial<UserSettings>) => void;
}

export const useSettings = create<SettingsStore>((set, get) => ({
  currency: 'ZAR',
  technicians: [],
  integrations: [],
  formFields: DEFAULT_FORM_FIELDS,
  loading: false,
  error: null,
  isInitialized: false,

  // Initialize settings from Firebase
  initializeSettings: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      let userSettings = await settingsService.getUserSettings(userId);
      
      // If no settings exist, create default ones
      if (!userSettings) {
        userSettings = await settingsService.createDefaultSettings(userId);
      }

      // Convert Firebase settings to store format - dynamically load ALL integrations
      const integrations: Integration[] = [];
      if (userSettings.integrations && typeof userSettings.integrations === 'object') {
        Object.entries(userSettings.integrations).forEach(([key, value]: [string, any]) => {
          if (value && typeof value === 'object' && value.apiKey) {
            // Capitalize first letter for display name
            const displayName = key.charAt(0).toUpperCase() + key.slice(1);
            integrations.push({
              name: displayName,
              apiKey: value.apiKey || '',
              enabled: value.enabled !== undefined ? value.enabled : true,
              teamId: value.teamId,
            });
          }
        });
      }

      set({
        currency: userSettings.currency as Currency,
        technicians: userSettings.technicians,
        integrations,
        formFields: userSettings.formFields.length > 0 ? userSettings.formFields : DEFAULT_FORM_FIELDS,
        loading: false,
        isInitialized: true,
      });

      // Set up real-time subscription
      settingsService.subscribeToSettings(userId, (settings) => {
        if (settings) {
          get().updateLocalSettings(settings);
        }
      });

    } catch (error) {
      set({ 
        error: (error as Error).message, 
        loading: false,
        isInitialized: true,
      });
    }
  },

  // Update local state when Firebase data changes
  updateLocalSettings: (settings: Partial<UserSettings>) => {
    const updates: any = {};
    
    if (settings.currency) updates.currency = settings.currency as Currency;
    if (settings.technicians) updates.technicians = settings.technicians;
    if (settings.formFields) {
      updates.formFields = settings.formFields.length > 0 ? settings.formFields : DEFAULT_FORM_FIELDS;
    }
    
    // Convert integrations - dynamically load ALL integrations
    if (settings.integrations && typeof settings.integrations === 'object') {
      const integrations: Integration[] = [];
      Object.entries(settings.integrations).forEach(([key, value]: [string, any]) => {
        if (value && typeof value === 'object' && value.apiKey) {
          // Capitalize first letter for display name
          const displayName = key.charAt(0).toUpperCase() + key.slice(1);
          integrations.push({
            name: displayName,
            apiKey: value.apiKey || '',
            enabled: value.enabled !== undefined ? value.enabled : true,
            teamId: value.teamId,
          });
        }
      });
      updates.integrations = integrations;
    }

    set(updates);
  },

  // Firebase-backed currency update
  setCurrency: async (userId: string, currency: Currency) => {
    set({ loading: true, error: null });
    try {
      await settingsService.updateCurrency(userId, currency);
      // Local state will be updated via the subscription
      set({ loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  // Technician management
  addTechnician: async (userId: string, name: string) => {
    const state = get();
    const updatedTechnicians = Array.from(new Set([...state.technicians, name]));
    try {
      await settingsService.updateTechnicians(userId, updatedTechnicians);
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  removeTechnician: async (userId: string, name: string) => {
    const state = get();
    const updatedTechnicians = state.technicians.filter((t) => t !== name);
    try {
      await settingsService.updateTechnicians(userId, updatedTechnicians);
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  updateTechnician: async (userId: string, oldName: string, newName: string) => {
    const state = get();
    const updatedTechnicians = state.technicians.map((t) => (t === oldName ? newName : t));
    try {
      await settingsService.updateTechnicians(userId, updatedTechnicians);
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  // Integration management
  addIntegration: async (userId: string, name: string, apiKey: string, teamId?: string) => {
    try {
      const integrationData: any = { apiKey, enabled: true };
      if (teamId) integrationData.teamId = teamId;
      
      await settingsService.updateIntegration(userId, name.toLowerCase(), integrationData);
      
      // Immediately fetch and update local state
      const updatedSettings = await settingsService.getUserSettings(userId);
      if (updatedSettings) {
        get().updateLocalSettings(updatedSettings);
      }
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  updateIntegration: async (userId: string, name: string, apiKey: string, enabled: boolean, teamId?: string) => {
    try {
      const integrationData: any = { apiKey, enabled };
      if (teamId) integrationData.teamId = teamId;
      
      await settingsService.updateIntegration(userId, name.toLowerCase(), integrationData);
      
      // Immediately fetch and update local state
      const updatedSettings = await settingsService.getUserSettings(userId);
      if (updatedSettings) {
        get().updateLocalSettings(updatedSettings);
      }
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  removeIntegration: async (userId: string, name: string) => {
    try {
      await settingsService.updateIntegration(userId, name.toLowerCase(), null);
      
      // Immediately fetch and update local state
      const updatedSettings = await settingsService.getUserSettings(userId);
      if (updatedSettings) {
        get().updateLocalSettings(updatedSettings);
      }
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  getIntegration: (name: string) => {
    const integration = get().integrations.find((i) => i.name === name);
    return integration?.enabled ? integration : undefined;
  },

  // Form field management
  addFormField: async (userId: string, field: FormField) => {
    const state = get();
    const newField = { ...field, id: Date.now().toString() };
    const updatedFields = [...state.formFields, newField];
    try {
      await settingsService.updateUserSettings(userId, { formFields: updatedFields });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  updateFormField: async (userId: string, id: string, updates: Partial<FormField>) => {
    const state = get();
    const updatedFields = state.formFields.map((f) => (f.id === id ? { ...f, ...updates } : f));
    try {
      await settingsService.updateUserSettings(userId, { formFields: updatedFields });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  removeFormField: async (userId: string, id: string) => {
    const state = get();
    const updatedFields = state.formFields.filter((f) => f.id !== id);
    try {
      await settingsService.updateUserSettings(userId, { formFields: updatedFields });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  resetFormFields: async (userId: string) => {
    try {
      await settingsService.updateUserSettings(userId, { formFields: DEFAULT_FORM_FIELDS });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
}));
