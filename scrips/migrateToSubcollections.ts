/**
 * Migration Script: Move data from root collections to user subcollections
 * 
 * This script migrates existing Firestore data from the old structure:
 *   - products (with userId field)
 *   - customers (with createdBy field)
 *   - invoices (with userId field)
 *   - quotations (with createdBy field)
 *   - repairJobs (with createdBy field)
 *   - creditNotes (with createdBy field)
 *   - recurringInvoices (with createdBy field)
 * 
 * To the new structure:
 *   - users/{userId}/products
 *   - users/{userId}/customers
 *   - users/{userId}/invoices
 *   - users/{userId}/quotations
 *   - users/{userId}/repairJobs
 *   - users/{userId}/creditNotes
 *   - users/{userId}/recurringInvoices
 * 
 * Run this script ONCE after deploying the new code and rules.
 * 
 * Usage: npx ts-node scripts/migrateToSubcollections.ts
 */

import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  setDoc,
  query,
  where
} from 'firebase/firestore';

// Firebase configuration - Replace with your actual config
const firebaseConfig = {
  apiKey: "AIzaSyDuCIbXbH4eEsP7QJOkKJG2GfISKKXGe6o",
  authDomain: "aistock-c4ea6.firebaseapp.com",
  projectId: "aistock-c4ea6",
  storageBucket: "aistock-c4ea6.firebasestorage.app",
  messagingSenderId: "513394662936",
  appId: "1:513394662936:web:85e69f4e59829b5f0e1f5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Migration statistics
const stats = {
  products: { total: 0, migrated: 0, errors: 0 },
  customers: { total: 0, migrated: 0, errors: 0 },
  invoices: { total: 0, migrated: 0, errors: 0 },
  quotations: { total: 0, migrated: 0, errors: 0 },
  repairJobs: { total: 0, migrated: 0, errors: 0 },
  creditNotes: { total: 0, migrated: 0, errors: 0 },
  recurringInvoices: { total: 0, migrated: 0, errors: 0 }
};

async function migrateCollection(
  sourceCollectionName: string,
  targetSubcollectionName: string,
  userIdFieldName: 'userId' | 'createdBy'
) {
  console.log(`\n🔄 Migrating ${sourceCollectionName}...`);
  
  try {
    const sourceRef = collection(db, sourceCollectionName);
    const snapshot = await getDocs(sourceRef);
    
    stats[sourceCollectionName as keyof typeof stats].total = snapshot.size;
    console.log(`   Found ${snapshot.size} documents`);

    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();
      const userId = data[userIdFieldName];
      
      if (!userId) {
        console.warn(`   ⚠️  Document ${docSnap.id} missing ${userIdFieldName} field, skipping`);
        stats[sourceCollectionName as keyof typeof stats].errors++;
        continue;
      }

      try {
        // Create document in new subcollection structure
        const targetRef = doc(db, 'users', userId, targetSubcollectionName, docSnap.id);
        await setDoc(targetRef, data);
        
        stats[sourceCollectionName as keyof typeof stats].migrated++;
        
        if (stats[sourceCollectionName as keyof typeof stats].migrated % 10 === 0) {
          console.log(`   ✓ Migrated ${stats[sourceCollectionName as keyof typeof stats].migrated}/${snapshot.size}`);
        }
      } catch (error) {
        console.error(`   ❌ Error migrating document ${docSnap.id}:`, error);
        stats[sourceCollectionName as keyof typeof stats].errors++;
      }
    }
    
    console.log(`   ✅ Completed: ${stats[sourceCollectionName as keyof typeof stats].migrated} migrated, ${stats[sourceCollectionName as keyof typeof stats].errors} errors`);
  } catch (error) {
    console.error(`   ❌ Error processing ${sourceCollectionName}:`, error);
  }
}

async function migrateStockMovements() {
  console.log(`\n🔄 Migrating stockMovements...`);
  
  try {
    const sourceRef = collection(db, 'stockMovements');
    const snapshot = await getDocs(sourceRef);
    
    console.log(`   Found ${snapshot.size} stock movements`);
    let migrated = 0;
    let errors = 0;

    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();
      const userId = data.userId;
      
      if (!userId) {
        console.warn(`   ⚠️  Stock movement ${docSnap.id} missing userId field, skipping`);
        errors++;
        continue;
      }

      try {
        // Create document in new subcollection structure
        const targetRef = doc(db, 'users', userId, 'stockMovements', docSnap.id);
        await setDoc(targetRef, data);
        
        migrated++;
        
        if (migrated % 10 === 0) {
          console.log(`   ✓ Migrated ${migrated}/${snapshot.size}`);
        }
      } catch (error) {
        console.error(`   ❌ Error migrating stock movement ${docSnap.id}:`, error);
        errors++;
      }
    }
    
    console.log(`   ✅ Completed: ${migrated} migrated, ${errors} errors`);
  } catch (error) {
    console.error(`   ❌ Error processing stockMovements:`, error);
  }
}

async function migrateUserSettings() {
  console.log(`\n🔄 Migrating userSettings...`);
  
  try {
    const sourceRef = collection(db, 'userSettings');
    const snapshot = await getDocs(sourceRef);
    
    console.log(`   Found ${snapshot.size} user settings`);
    let migrated = 0;
    let errors = 0;

    for (const docSnap of snapshot.docs) {
      const userId = docSnap.id;
      const data = docSnap.data();

      try {
        // Move to users/{userId} document
        const targetRef = doc(db, 'users', userId);
        await setDoc(targetRef, { settings: data }, { merge: true });
        
        migrated++;
        console.log(`   ✓ Migrated settings for user ${userId}`);
      } catch (error) {
        console.error(`   ❌ Error migrating settings for user ${userId}:`, error);
        errors++;
      }
    }
    
    console.log(`   ✅ Completed: ${migrated} migrated, ${errors} errors`);
  } catch (error) {
    console.error(`   ❌ Error processing userSettings:`, error);
  }
}

async function runMigration() {
  console.log('🚀 Starting Firestore data migration to subcollections...\n');
  console.log('⚠️  This script will copy data from root collections to user subcollections.');
  console.log('⚠️  Original data will NOT be deleted automatically - you can do that manually after verification.\n');
  
  // Wait 5 seconds to allow user to cancel if needed
  console.log('Starting in 5 seconds... (Press Ctrl+C to cancel)');
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  const startTime = Date.now();
  
  // Migrate each collection
  await migrateCollection('products', 'products', 'userId');
  await migrateCollection('customers', 'customers', 'createdBy');
  await migrateCollection('invoices', 'invoices', 'userId');
  await migrateCollection('quotations', 'quotations', 'createdBy');
  await migrateCollection('repairJobs', 'repairJobs', 'createdBy');
  await migrateCollection('creditNotes', 'creditNotes', 'createdBy');
  await migrateCollection('recurringInvoices', 'recurringInvoices', 'createdBy');
  
  // Migrate stock movements
  await migrateStockMovements();
  
  // Migrate user settings
  await migrateUserSettings();
  
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  
  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 MIGRATION SUMMARY');
  console.log('='.repeat(60));
  
  Object.entries(stats).forEach(([collection, stat]) => {
    console.log(`${collection.padEnd(20)} | Total: ${stat.total} | Migrated: ${stat.migrated} | Errors: ${stat.errors}`);
  });
  
  console.log('='.repeat(60));
  console.log(`⏱️  Total time: ${duration} seconds`);
  console.log('\n✅ Migration completed!');
  console.log('\n⚠️  NEXT STEPS:');
  console.log('1. Verify the migrated data in Firebase Console');
  console.log('2. Test your application thoroughly');
  console.log('3. Once confirmed working, manually delete old root collections');
  console.log('   (Keep counters collection - it\'s still used)\n');
  
  process.exit(0);
}

// Run migration
runMigration().catch((error) => {
  console.error('❌ Migration failed:', error);
  process.exit(1);
});
