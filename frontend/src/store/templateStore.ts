import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TemplateField {
  id: string;
  label: string;
  value: string;
  editable: boolean;
}

export interface InvoiceTemplate {
  id: string;
  name: string;
  type: 'invoice' | 'quotation' | 'receipt';
  isDefault: boolean;
  company: {
    name: string;
    address: string;
    phone: string;
    email: string;
    taxNumber: string;
    logo: string;
  };
  colors: {
    primary: string;
    secondary: string;
    text: string;
  };
  layout: {
    showLogo: boolean;
    showTaxNumber: boolean;
    showNotes: boolean;
    notesText: string;
    footerText: string;
  };
  fields: {
    showSKU: boolean;
    showDescription: boolean;
    showDiscount: boolean;
    showTax: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

interface TemplateState {
  templates: InvoiceTemplate[];
  activeTemplate: InvoiceTemplate | null;
  loading: boolean;
  
  // Actions
  getTemplates: () => InvoiceTemplate[];
  getTemplateByType: (type: 'invoice' | 'quotation' | 'receipt') => InvoiceTemplate | undefined;
  getDefaultTemplate: (type: 'invoice' | 'quotation' | 'receipt') => InvoiceTemplate;
  setActiveTemplate: (templateId: string) => void;
  createTemplate: (template: Omit<InvoiceTemplate, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTemplate: (id: string, updates: Partial<InvoiceTemplate>) => void;
  deleteTemplate: (id: string) => void;
  duplicateTemplate: (id: string) => void;
  setDefaultTemplate: (id: string) => void;
  loadTemplates: () => void;
  resetToDefault: (type: 'invoice' | 'quotation' | 'receipt') => void;
}

const defaultInvoiceTemplate: InvoiceTemplate = {
  id: 'default-invoice',
  name: 'Default Invoice Template',
  type: 'invoice',
  isDefault: true,
  company: {
    name: 'AiStock',
    address: '123 Business Street\nCity, Province\nPostal Code',
    phone: '+27 123 456 789',
    email: 'info@aistock.com',
    taxNumber: 'TAX123456789',
    logo: '',
  },
  colors: {
    primary: '#1976d2',
    secondary: '#424242',
    text: '#000000',
  },
  layout: {
    showLogo: true,
    showTaxNumber: true,
    showNotes: true,
    notesText: 'Thank you for your business!',
    footerText: 'Payment is due within 30 days. Please make checks payable to AiStock.',
  },
  fields: {
    showSKU: true,
    showDescription: true,
    showDiscount: true,
    showTax: true,
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};

const defaultQuotationTemplate: InvoiceTemplate = {
  ...defaultInvoiceTemplate,
  id: 'default-quotation',
  name: 'Default Quotation Template',
  type: 'quotation',
  layout: {
    ...defaultInvoiceTemplate.layout,
    notesText: 'This quotation is valid for 30 days.',
    footerText: 'We look forward to doing business with you.',
  },
};

const defaultReceiptTemplate: InvoiceTemplate = {
  ...defaultInvoiceTemplate,
  id: 'default-receipt',
  name: 'Default Receipt Template',
  type: 'receipt',
  layout: {
    ...defaultInvoiceTemplate.layout,
    notesText: 'Thank you for your payment!',
    footerText: 'Please keep this receipt for your records.',
  },
};

export const useTemplateStore = create<TemplateState>()(
  persist(
    (set, get) => ({
      templates: [defaultInvoiceTemplate, defaultQuotationTemplate, defaultReceiptTemplate],
      activeTemplate: null,
      loading: false,

      getTemplates: () => get().templates,

      getTemplateByType: (type) => {
        const templates = get().templates.filter(t => t.type === type);
        return templates.find(t => t.isDefault) || templates[0];
      },

      getDefaultTemplate: (type) => {
        const template = get().getTemplateByType(type);
        if (template) return template;
        
        // Return hardcoded default if none exists
        switch (type) {
          case 'invoice':
            return defaultInvoiceTemplate;
          case 'quotation':
            return defaultQuotationTemplate;
          case 'receipt':
            return defaultReceiptTemplate;
          default:
            return defaultInvoiceTemplate;
        }
      },

      setActiveTemplate: (templateId) => {
        const template = get().templates.find(t => t.id === templateId);
        set({ activeTemplate: template || null });
      },

      createTemplate: (templateData) => {
        const newTemplate: InvoiceTemplate = {
          ...templateData,
          id: `template-${Date.now()}`,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set(state => ({
          templates: [...state.templates, newTemplate],
        }));
      },

      updateTemplate: (id, updates) => {
        set(state => ({
          templates: state.templates.map(template =>
            template.id === id
              ? { ...template, ...updates, updatedAt: new Date() }
              : template
          ),
        }));
      },

      deleteTemplate: (id) => {
        set(state => ({
          templates: state.templates.filter(t => t.id !== id),
        }));
      },

      duplicateTemplate: (id) => {
        const template = get().templates.find(t => t.id === id);
        if (template) {
          const newTemplate: InvoiceTemplate = {
            ...template,
            id: `template-${Date.now()}`,
            name: `${template.name} (Copy)`,
            isDefault: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          set(state => ({
            templates: [...state.templates, newTemplate],
          }));
        }
      },

      setDefaultTemplate: (id) => {
        const template = get().templates.find(t => t.id === id);
        if (template) {
          set(state => ({
            templates: state.templates.map(t =>
              t.type === template.type
                ? { ...t, isDefault: t.id === id }
                : t
            ),
          }));
        }
      },

      loadTemplates: () => {
        // Templates are already loaded from persisted storage
        // This is just a placeholder for future API integration
        set({ loading: false });
      },

      resetToDefault: (type) => {
        const defaultTemplate = type === 'invoice' 
          ? defaultInvoiceTemplate 
          : type === 'quotation' 
          ? defaultQuotationTemplate 
          : defaultReceiptTemplate;
        
        set(state => ({
          templates: state.templates.map(t =>
            t.type === type && t.isDefault
              ? { ...defaultTemplate, updatedAt: new Date() }
              : t
          ),
        }));
      },
    }),
    {
      name: 'template-storage',
    }
  )
);
