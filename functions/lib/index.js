"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processInvoiceOCR = exports.listUsers = exports.migrateUserData = exports.api = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
const generative_ai_1 = require("@google/generative-ai");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
// Initialize Firebase Admin
if (!admin.apps.length) {
    admin.initializeApp();
}
const db = admin.firestore();
const app = (0, express_1.default)();
// Enable CORS for all routes
app.use((0, cors_1.default)({ origin: true }));
app.use(express_1.default.json());
// Middleware for API key authentication
const authenticateApiKey = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Missing or invalid API key' });
    }
    const apiKey = authHeader.substring(7);
    try {
        // Verify API key against database
        const apiKeyDoc = await db.collection('apiKeys').doc(apiKey).get();
        if (!apiKeyDoc.exists) {
            return res.status(401).json({ error: 'Invalid API key' });
        }
        const keyData = apiKeyDoc.data();
        if (!(keyData === null || keyData === void 0 ? void 0 : keyData.active)) {
            return res.status(401).json({ error: 'API key is inactive' });
        }
        req.userId = keyData.userId;
        req.apiKeyData = keyData;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: 'API key validation failed' });
    }
};
// Helper function to generate invoice number
const generateInvoiceNumber = async (userId) => {
    const counterRef = db.collection('counters').doc(`invoice_${userId}`);
    return await db.runTransaction(async (transaction) => {
        var _a;
        const counterDoc = await transaction.get(counterRef);
        let nextNumber = 1;
        if (counterDoc.exists) {
            nextNumber = (((_a = counterDoc.data()) === null || _a === void 0 ? void 0 : _a.value) || 0) + 1;
        }
        transaction.set(counterRef, { value: nextNumber }, { merge: true });
        return `INV-${nextNumber.toString().padStart(6, '0')}`;
    });
};
// AI-powered text parsing for invoice creation
const parseInvoiceFromText = async (text) => {
    try {
        const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const prompt = `
    Parse the following text and extract invoice information in JSON format:
    
    Text: "${text}"
    
    Extract and return JSON with this structure:
    {
      "customer": {
        "name": "",
        "email": "",
        "company": "",
        "address": ""
      },
      "items": [
        {
          "description": "",
          "quantity": 0,
          "rate": 0
        }
      ],
      "dueDate": "",
      "notes": "",
      "currency": "ZAR"
    }
    
    Only return valid JSON, no other text.
    `;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const jsonText = response.text();
        return JSON.parse(jsonText);
    }
    catch (error) {
        console.error('AI parsing error:', error);
        throw new Error('Failed to parse invoice data from text');
    }
};
// INVOICE ENDPOINTS
// Create Invoice
app.post('/invoices', authenticateApiKey, async (req, res) => {
    try {
        const { customerData, items, dueDate, notes } = req.body;
        const userId = req.userId;
        // Generate invoice number
        const invoiceNumber = await generateInvoiceNumber(userId);
        // Calculate totals
        let subtotal = 0;
        const processedItems = items.map((item) => {
            const amount = item.quantity * item.rate;
            const vat = amount * (item.taxRate || 0.15);
            subtotal += amount;
            return {
                ...item,
                amount,
                vat
            };
        });
        const vatAmount = subtotal * 0.15;
        const total = subtotal + vatAmount;
        // Create invoice document
        const invoiceData = {
            invoiceNumber,
            customerId: customerData.id || null,
            customerData,
            items: processedItems,
            subtotal,
            vatAmount,
            total,
            dueDate: new Date(dueDate),
            notes: notes || '',
            status: 'draft',
            createdBy: userId,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        };
        const docRef = await db.collection('invoices').add(invoiceData);
        // If customer doesn't exist, create them
        if (!customerData.id && customerData.email) {
            const customerRef = await db.collection('customers').add({
                ...customerData,
                createdBy: userId,
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            });
            // Update invoice with customer reference
            await docRef.update({ customerId: customerRef.id });
        }
        res.json({
            success: true,
            invoiceId: docRef.id,
            invoiceNumber,
            totalAmount: total,
            status: 'created'
        });
    }
    catch (error) {
        console.error('Create invoice error:', error);
        res.status(500).json({ error: 'Failed to create invoice' });
    }
});
// Update Invoice
app.put('/invoices/:id', authenticateApiKey, async (req, res) => {
    var _a;
    try {
        const { id } = req.params;
        const updates = req.body;
        const userId = req.userId;
        // Verify ownership
        const invoiceRef = db.collection('invoices').doc(id);
        const invoice = await invoiceRef.get();
        if (!invoice.exists || ((_a = invoice.data()) === null || _a === void 0 ? void 0 : _a.createdBy) !== userId) {
            return res.status(404).json({ error: 'Invoice not found' });
        }
        await invoiceRef.update({
            ...updates,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        return res.json({ success: true, message: 'Invoice updated successfully' });
    }
    catch (error) {
        console.error('Update invoice error:', error);
        return res.status(500).json({ error: 'Failed to update invoice' });
    }
});
// Create Deposit Invoice
app.post('/invoices/deposit', authenticateApiKey, async (req, res) => {
    try {
        const { customerData, depositAmount, description, dueDate } = req.body;
        const userId = req.userId;
        const invoiceNumber = await generateInvoiceNumber(userId);
        const vatAmount = depositAmount * 0.15;
        const total = depositAmount + vatAmount;
        const invoiceData = {
            invoiceNumber,
            customerId: customerData.id || null,
            customerData,
            items: [{
                    description: description || 'Deposit Payment',
                    quantity: 1,
                    rate: depositAmount,
                    amount: depositAmount,
                    vat: vatAmount
                }],
            subtotal: depositAmount,
            vatAmount,
            total,
            dueDate: new Date(dueDate),
            isDeposit: true,
            status: 'draft',
            createdBy: userId,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        };
        const docRef = await db.collection('invoices').add(invoiceData);
        res.json({
            success: true,
            invoiceId: docRef.id,
            invoiceNumber,
            totalAmount: total,
            type: 'deposit'
        });
    }
    catch (error) {
        console.error('Create deposit invoice error:', error);
        res.status(500).json({ error: 'Failed to create deposit invoice' });
    }
});
// QUOTE ENDPOINTS
// Create Quote
app.post('/quotes', authenticateApiKey, async (req, res) => {
    try {
        const { customerData, items, validUntil, notes } = req.body;
        const userId = req.userId;
        // Generate quote number
        const counterRef = db.collection('counters').doc(`quote_${userId}`);
        const quoteNumber = await db.runTransaction(async (transaction) => {
            var _a;
            const counterDoc = await transaction.get(counterRef);
            let nextNumber = 1;
            if (counterDoc.exists) {
                nextNumber = (((_a = counterDoc.data()) === null || _a === void 0 ? void 0 : _a.value) || 0) + 1;
            }
            transaction.set(counterRef, { value: nextNumber }, { merge: true });
            return `QUO-${nextNumber.toString().padStart(6, '0')}`;
        });
        let subtotal = 0;
        const processedItems = items.map((item) => {
            const amount = item.quantity * item.rate;
            subtotal += amount;
            return { ...item, amount };
        });
        const vatAmount = subtotal * 0.15;
        const total = subtotal + vatAmount;
        const quoteData = {
            quoteNumber,
            customerId: customerData.id || null,
            customerData,
            items: processedItems,
            subtotal,
            vatAmount,
            total,
            validUntil: new Date(validUntil),
            notes: notes || '',
            status: 'draft',
            createdBy: userId,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        };
        const docRef = await db.collection('quotes').add(quoteData);
        res.json({
            success: true,
            quoteId: docRef.id,
            quoteNumber,
            totalAmount: total
        });
    }
    catch (error) {
        console.error('Create quote error:', error);
        res.status(500).json({ error: 'Failed to create quote' });
    }
});
// CUSTOMER ENDPOINTS
// Create Customer
app.post('/customers', authenticateApiKey, async (req, res) => {
    try {
        const customerData = req.body;
        const userId = req.userId;
        // Generate customer number
        const counterRef = db.collection('counters').doc(`customer_${userId}`);
        const customerNumber = await db.runTransaction(async (transaction) => {
            var _a;
            const counterDoc = await transaction.get(counterRef);
            let nextNumber = 1;
            if (counterDoc.exists) {
                nextNumber = (((_a = counterDoc.data()) === null || _a === void 0 ? void 0 : _a.value) || 0) + 1;
            }
            transaction.set(counterRef, { value: nextNumber }, { merge: true });
            return `CUST${nextNumber.toString().padStart(5, '0')}`;
        });
        const docRef = await db.collection('customers').add({
            ...customerData,
            customerNumber,
            totalInvoiced: 0,
            totalPaid: 0,
            outstandingBalance: 0,
            status: customerData.status || 'active',
            createdBy: userId,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        res.json({
            success: true,
            customerId: docRef.id,
            customerNumber
        });
    }
    catch (error) {
        console.error('Create customer error:', error);
        res.status(500).json({ error: 'Failed to create customer' });
    }
});
// Get Customers
app.get('/customers', authenticateApiKey, async (req, res) => {
    try {
        const userId = req.userId;
        const { limit = 50, offset = 0, status } = req.query;
        let query = db.collection('customers')
            .where('createdBy', '==', userId)
            .orderBy('createdAt', 'desc')
            .limit(Number(limit))
            .offset(Number(offset));
        if (status) {
            query = query.where('status', '==', status);
        }
        const snapshot = await query.get();
        const customers = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        res.json({
            success: true,
            customers,
            total: snapshot.size
        });
    }
    catch (error) {
        console.error('Get customers error:', error);
        res.status(500).json({ error: 'Failed to get customers' });
    }
});
// PRODUCT ENDPOINTS
// Create Product
app.post('/products', authenticateApiKey, async (req, res) => {
    try {
        const productData = req.body;
        const userId = req.userId;
        const docRef = await db.collection('products').add({
            ...productData,
            createdBy: userId,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        res.json({
            success: true,
            productId: docRef.id,
            message: 'Product created successfully'
        });
    }
    catch (error) {
        console.error('Create product error:', error);
        res.status(500).json({ error: 'Failed to create product' });
    }
});
// Update Product Stock
app.put('/products/:id/stock', authenticateApiKey, async (req, res) => {
    var _a, _b;
    try {
        const { id } = req.params;
        const { quantity, operation, reason, notes } = req.body;
        const userId = req.userId;
        const productRef = db.collection('products').doc(id);
        const product = await productRef.get();
        if (!product.exists || ((_a = product.data()) === null || _a === void 0 ? void 0 : _a.createdBy) !== userId) {
            return res.status(404).json({ error: 'Product not found' });
        }
        const currentStock = ((_b = product.data()) === null || _b === void 0 ? void 0 : _b.stock) || 0;
        let newStock = currentStock;
        switch (operation) {
            case 'add':
                newStock = currentStock + quantity;
                break;
            case 'subtract':
                newStock = Math.max(0, currentStock - quantity);
                break;
            case 'set':
                newStock = quantity;
                break;
            default:
                return res.status(400).json({ error: 'Invalid operation' });
        }
        await productRef.update({
            stock: newStock,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        // Log stock movement
        await db.collection('stockMovements').add({
            productId: id,
            operation,
            quantity,
            previousStock: currentStock,
            newStock,
            reason,
            notes,
            createdBy: userId,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
        return res.json({
            success: true,
            previousStock: currentStock,
            newStock,
            message: 'Stock updated successfully'
        });
    }
    catch (error) {
        console.error('Update stock error:', error);
        return res.status(500).json({ error: 'Failed to update stock' });
    }
});
// AI AUTOMATION ENDPOINTS
// AI Invoice Creation
app.post('/ai/create-invoice', authenticateApiKey, async (req, res) => {
    try {
        const { inputText } = req.body;
        const userId = req.userId;
        // Parse the input text using AI
        const parsedData = await parseInvoiceFromText(inputText);
        // Generate invoice number
        const invoiceNumber = await generateInvoiceNumber(userId);
        let subtotal = 0;
        const processedItems = parsedData.items.map((item) => {
            const amount = item.quantity * item.rate;
            const vat = amount * 0.15;
            subtotal += amount;
            return { ...item, amount, vat };
        });
        const vatAmount = subtotal * 0.15;
        const total = subtotal + vatAmount;
        const finalInvoiceData = {
            invoiceNumber,
            customerId: null,
            customerData: parsedData.customer,
            items: processedItems,
            subtotal,
            vatAmount,
            total,
            dueDate: new Date(parsedData.dueDate),
            notes: parsedData.notes || '',
            status: 'draft',
            aiGenerated: true,
            originalText: inputText,
            createdBy: userId,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        };
        const docRef = await db.collection('invoices').add(finalInvoiceData);
        res.json({
            success: true,
            invoiceId: docRef.id,
            invoiceNumber,
            totalAmount: total,
            aiParsed: true,
            parsedData
        });
    }
    catch (error) {
        console.error('AI invoice creation error:', error);
        res.status(500).json({ error: 'Failed to create AI invoice' });
    }
});
// Webhook handler for payment notifications
app.post('/webhooks/invoice-paid', authenticateApiKey, async (req, res) => {
    try {
        const { invoiceId, amount, paymentMethod, transactionId } = req.body;
        const invoiceRef = db.collection('invoices').doc(invoiceId);
        const invoice = await invoiceRef.get();
        if (!invoice.exists) {
            return res.status(404).json({ error: 'Invoice not found' });
        }
        await invoiceRef.update({
            status: 'paid',
            paymentDate: admin.firestore.FieldValue.serverTimestamp(),
            paymentAmount: amount,
            paymentMethod,
            transactionId,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        // Update customer balance if customer exists
        const invoiceData = invoice.data();
        if (invoiceData === null || invoiceData === void 0 ? void 0 : invoiceData.customerId) {
            const customerRef = db.collection('customers').doc(invoiceData.customerId);
            await customerRef.update({
                totalPaid: admin.firestore.FieldValue.increment(amount),
                outstandingBalance: admin.firestore.FieldValue.increment(-amount)
            });
        }
        return res.json({ success: true, message: 'Payment processed successfully' });
    }
    catch (error) {
        console.error('Webhook error:', error);
        return res.status(500).json({ error: 'Failed to process webhook' });
    }
});
// API KEY MANAGEMENT
// Generate API Key
app.post('/auth/generate-api-key', async (req, res) => {
    try {
        const { userId, name, permissions = ['read', 'write'] } = req.body;
        // Generate secure API key
        const apiKey = 'aisk_' + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
        await db.collection('apiKeys').doc(apiKey).set({
            userId,
            name: name || 'Default API Key',
            permissions,
            active: true,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            lastUsed: null
        });
        res.json({
            success: true,
            apiKey,
            message: 'API key generated successfully'
        });
    }
    catch (error) {
        console.error('Generate API key error:', error);
        res.status(500).json({ error: 'Failed to generate API key' });
    }
});
// Export the API
exports.api = functions.https.onRequest(app);
// Migration function
var migrate_1 = require("./migrate");
Object.defineProperty(exports, "migrateUserData", { enumerable: true, get: function () { return migrate_1.migrateUserData; } });
var listUsers_1 = require("./listUsers");
Object.defineProperty(exports, "listUsers", { enumerable: true, get: function () { return listUsers_1.listUsers; } });
// Keep the existing OCR function
exports.processInvoiceOCR = functions.https.onCall(async (data, context) => {
    // Existing OCR function code...
    return { success: true, message: 'OCR processing not implemented in this version' };
});
//# sourceMappingURL=index.js.map