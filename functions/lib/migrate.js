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
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateUserData = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
// Use the existing admin instance if already initialized, otherwise initialize
let db;
try {
    db = admin.firestore();
}
catch (error) {
    admin.initializeApp();
    db = admin.firestore();
}
exports.migrateUserData = functions.https.onRequest(async (req, res) => {
    // Set CORS headers
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
    }
    const OLD_USER_ID = 'K7mAXYdpgOP8RXc9OV3K)IOQKo1'; // From Firebase console
    const NEW_USER_ID = 'K7mAXYdpgOP8RXc9OV3tKjIOOKo1'; // Current auth user
    const ALTERNATE_USER_ID = 'KrmAXYdpgOP8RXc9OV3tKjIOOKo1'; // Another possible ID from screenshot
    console.log('Checking user IDs:');
    console.log('NEW_USER_ID:', NEW_USER_ID);
    console.log('OLD_USER_ID:', OLD_USER_ID);
    console.log('ALTERNATE_USER_ID:', ALTERNATE_USER_ID);
    try {
        console.log('Starting data migration...');
        console.log('From user ID:', OLD_USER_ID);
        console.log('To user ID:', NEW_USER_ID);
        const results = [];
        // List of collections to migrate
        const collections = [
            'products',
            'customers',
            'invoices',
            'quotations',
            'creditNotes',
            'repairJobs',
            'recurringInvoices',
            'stockMovements'
        ];
        // Check both possible source user IDs
        const sourceUserIds = [OLD_USER_ID, ALTERNATE_USER_ID];
        for (const sourceUserId of sourceUserIds) {
            console.log(`\n=== Checking source user ID: ${sourceUserId} ===`);
            for (const collectionName of collections) {
                console.log(`\n--- Checking ${collectionName} for user ${sourceUserId} ---`);
                const oldCollectionRef = db.collection(`users/${sourceUserId}/${collectionName}`);
                try {
                    const snapshot = await oldCollectionRef.limit(1).get();
                    console.log(`Found ${snapshot.size} documents in ${collectionName} for user ${sourceUserId}`);
                    if (snapshot.size > 0) {
                        console.log(`Found data in ${collectionName} for user ${sourceUserId}! Proceeding with migration...`);
                        // Get all documents
                        const allSnapshot = await oldCollectionRef.get();
                        console.log(`Total documents to migrate: ${allSnapshot.size}`);
                        const newCollectionRef = db.collection(`users/${NEW_USER_ID}/${collectionName}`);
                        let migrated = 0;
                        const batch = db.batch();
                        for (const doc of allSnapshot.docs) {
                            const data = doc.data();
                            const docId = doc.id;
                            // Add to batch for new location
                            const newDocRef = newCollectionRef.doc(docId);
                            batch.set(newDocRef, data);
                            migrated++;
                        }
                        // Execute batch
                        await batch.commit();
                        console.log(`Successfully migrated ${migrated}/${allSnapshot.size} documents from ${collectionName}`);
                        results.push({
                            collection: collectionName,
                            status: 'success',
                            sourceUserId: sourceUserId,
                            migrated: migrated,
                            total: allSnapshot.size
                        });
                        // Break out of source user loop since we found data
                        break;
                    }
                }
                catch (error) {
                    console.error(`Error accessing collection ${collectionName} for user ${sourceUserId}:`, error);
                }
            }
        }
        // Add any collections that weren't migrated as skipped
        for (const collectionName of collections) {
            const found = results.find(r => r.collection === collectionName);
            if (!found) {
                results.push({
                    collection: collectionName,
                    status: 'skipped',
                    reason: 'no documents found in any source user ID',
                    migrated: 0,
                    total: 0
                });
            }
        }
        console.log('Migration completed!');
        res.status(200).json({
            success: true,
            message: 'Migration completed',
            results: results
        });
    }
    catch (error) {
        console.error('Migration failed:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});
//# sourceMappingURL=migrate.js.map