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
exports.listUsers = void 0;
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
exports.listUsers = functions.https.onRequest(async (req, res) => {
    // Set CORS headers
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
    }
    try {
        console.log('Listing all users and their collections...');
        const usersRef = db.collection('users');
        const snapshot = await usersRef.get();
        const users = [];
        for (const userDoc of snapshot.docs) {
            const userId = userDoc.id;
            const userData = userDoc.data();
            console.log(`Found user: ${userId}`);
            // Check subcollections for this user
            const subcollections = ['products', 'customers', 'invoices'];
            const subcollectionData = {};
            for (const subCol of subcollections) {
                try {
                    const subSnapshot = await db.collection(`users/${userId}/${subCol}`).limit(1).get();
                    subcollectionData[subCol] = subSnapshot.size;
                    if (subSnapshot.size > 0) {
                        console.log(`  ${subCol}: ${subSnapshot.size} documents`);
                    }
                }
                catch (error) {
                    console.log(`  ${subCol}: error accessing`);
                    subcollectionData[subCol] = 'error';
                }
            }
            users.push({
                userId: userId,
                userData: userData,
                subcollections: subcollectionData
            });
        }
        res.status(200).json({
            success: true,
            totalUsers: users.length,
            users: users
        });
    }
    catch (error) {
        console.error('Failed to list users:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});
//# sourceMappingURL=listUsers.js.map