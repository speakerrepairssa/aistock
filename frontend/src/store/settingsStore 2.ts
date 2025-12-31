import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  setCurrency: (currency: Currency) => void;
  addTechnician: (name: string) => void;
  removeTechnician: (name: string) => void;
  updateTechnician: (oldName: string, newName: string) => void;
  addIntegration: (name: string, apiKey: string, teamId?: string) => void;
  updateIntegration: (name: string, apiKey: string, enabled: boolean, teamId?: string) => void;
  removeIntegration: (name: string) => void;
  getIntegration: (name: string) => Integration | undefined;
  addFormField: (field: FormField) => void;
  updateFormField: (id: string, field: Partial<FormField>) => void;
  removeFormField: (id: string) => void;
  resetFormFields: () => void;
}

export const useSettings = create<SettingsStore>()(
  persist(
    (set, get) => ({
      currency: 'USD',
      technicians: [],
      integrations: [],
      formFields: DEFAULT_FORM_FIELDS,
      setCurrency: (currency: Currency) => set({ currency }),
      addTechnician: (name: string) => 
        set((state) => ({
          technicians: Array.from(new Set([...state.technicians, name])),
        })),
      removeTechnician: (name: string) =>
        set((state) => ({
          technicians: state.technicians.filter((t) => t !== name),
        })),
      updateTechnician: (oldName: string, newName: string) =>
        set((state) => ({
          technicians: state.technicians.map((t) => (t === oldName ? newName : t)),
        })),
      addIntegration: (name: string, apiKey: string, teamId?: string) =>
        set((state) => {
          // Remove if exists, then add new one
          const filtered = state.integrations.filter((i) => i.name !== name);
          const newIntegration: Integration = { name, apiKey, enabled: true };
          if (teamId) newIntegration.teamId = teamId;
          return {
            integrations: [...filtered, newIntegration],
          };
        }),
      updateIntegration: (name: string, apiKey: string, enabled: boolean, teamId?: string) =>
        set((state) => ({
          integrations: state.integrations.map((i) =>
            i.name === name 
              ? { ...i, apiKey, enabled, ...(teamId && { teamId }) }
              : i
          ),
        })),
      removeIntegration: (name: string) =>
        set((state) => ({
          integrations: state.integrations.filter((i) => i.name !== name),
        })),
      getIntegration: (name: string) => {
        const integration = get().integrations.find((i) => i.name === name);
        return integration?.enabled ? integration : undefined;
      },
      addFormField: (field: FormField) =>
        set((state) => ({
          formFields: [...state.formFields, { ...field, id: Date.now().toString() }],
        })),
      updateFormField: (id: string, updates: Partial<FormField>) =>
        set((state) => ({
          formFields: state.formFields.map((f) => (f.id === id ? { ...f, ...updates } : f)),
        })),
      removeFormField: (id: string) =>
        set((state) => ({
          formFields: state.formFields.filter((f) => f.id !== id),
        })),
      resetFormFields: () =>
        set({ formFields: DEFAULT_FORM_FIELDS }),
    }),
    {
      name: 'aistock-settings',
    }
  )
);
