import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

export const initializeDummyData = async (userId: string) => {
  try {
    console.log('Initializing dummy data for user:', userId);

    const dummyProducts = [
      {
        id: 'demo-product-1',
        name: 'Sample iPhone 12 Screen',
        sku: 'IP12-SCR-001',
        description: 'High-quality replacement screen for iPhone 12 (Demo)',
        category: 'Phone Parts',
        price: 150,
        cost: 75,
        stock: 10,
        minStock: 5,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      },
      {
        id: 'demo-product-2',
        name: 'Sample Samsung S21 Battery',
        sku: 'SAM-BAT-002',
        description: 'OEM replacement battery for Samsung S21 (Demo)',
        category: 'Phone Parts',
        price: 80,
        cost: 40,
        stock: 15,
        minStock: 8,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      },
      {
        id: 'demo-product-3',
        name: 'Sample Speaker JBL Flip 5',
        sku: 'JBL-F5-003',
        description: 'Bluetooth speaker repair kit (Demo)',
        category: 'Speaker Parts',
        price: 200,
        cost: 100,
        stock: 5,
        minStock: 2,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      },
    ];

    const dummyCustomers = [
      {
        id: 'demo-customer-1',
        customerNumber: 'CUST00001',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+27 11 123 4567',
        address: '123 Main Street, Johannesburg',
        totalInvoiced: 0,
        totalPaid: 0,
        outstandingBalance: 0,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      },
      {
        id: 'demo-customer-2',
        customerNumber: 'CUST00002',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '+27 21 987 6543',
        address: '456 Oak Avenue, Cape Town',
        totalInvoiced: 0,
        totalPaid: 0,
        outstandingBalance: 0,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      },
    ];

    const dummyInvoices = [
      {
        id: 'demo-invoice-1',
        invoiceNumber: 'INV-00001',
        customerId: 'demo-customer-1',
        customerName: 'John Doe',
        items: [
          {
            productId: 'demo-product-1',
            name: 'Sample iPhone 12 Screen',
            quantity: 1,
            price: 150,
            total: 150,
          },
        ],
        subtotal: 150,
        tax: 22.5,
        total: 172.5,
        status: 'draft',
        dueDate: Timestamp.now(),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      },
    ];

    const dummyQuotations = [
      {
        id: 'demo-quotation-1',
        quotationNumber: 'QUO-00001',
        customerId: 'demo-customer-2',
        customerName: 'Jane Smith',
        items: [
          {
            productId: 'demo-product-3',
            name: 'Sample Speaker JBL Flip 5',
            quantity: 1,
            price: 200,
            total: 200,
          },
        ],
        subtotal: 200,
        tax: 30,
        total: 230,
        status: 'draft',
        validUntil: Timestamp.now(),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      },
    ];

    const dummyRepairJobs = [
      {
        id: 'demo-repair-1',
        jobNumber: 'REP-00001',
        customerId: 'demo-customer-1',
        customerName: 'John Doe',
        deviceType: 'iPhone 12',
        issueDescription: 'Cracked screen replacement (Demo)',
        status: 'pending',
        priority: 'medium',
        estimatedCost: 150,
        actualCost: 0,
        assignedTechnician: 'Demo Technician',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      },
    ];

    // Initialize user document with all dummy data
    const userDocRef = doc(db, 'users', userId);
    await setDoc(userDocRef, {
      products: dummyProducts,
      customers: dummyCustomers,
      invoices: dummyInvoices,
      quotations: dummyQuotations,
      repairJobs: dummyRepairJobs,
      currency: 'ZAR',
      integrations: {},
      technicians: ['Demo Technician'],
      formFields: {
        invoice: ['invoiceNumber', 'date', 'dueDate', 'customer', 'items', 'notes'],
        quotation: ['quotationNumber', 'date', 'validUntil', 'customer', 'items', 'notes'],
        repair: ['jobNumber', 'date', 'customer', 'deviceType', 'issue', 'technician'],
      },
      notifications: {
        invoiceReminders: true,
        lowStock: true,
        outOfStock: true,
        repairReminders: true,
      },
      preferences: {
        theme: 'light',
        language: 'en',
        timezone: 'Africa/Johannesburg',
      },
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    console.log('Dummy data initialized successfully for user:', userId);
    return true;
  } catch (error) {
    console.error('Error initializing dummy data:', error);
    throw error;
  }
};
