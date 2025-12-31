/**
 * Delete Old Test Data Script
 * 
 * This script deletes all documents from the old root collections.
 * Run this to clean up test data before starting fresh with the new structure.
 * 
 * Usage: npm run cleanup
 */

import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  deleteDoc,
  doc
} from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFdcyMD33FDWBOpwph5PS4b6vV0Ik-c2A",
  authDomain: "aistock-c4ea6.firebaseapp.com",
  projectId: "aistock-c4ea6",
  storageBucket: "aistock-c4ea6.firebasestorage.app",
  messagingSenderId: "1073148761394",
  appId: "1:1073148761394:web:af7e5971c7ab41f600b32b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const collectionsToDelete = [
  'products',
  'customers',
  'invoices',
  'quotations',
  'repairJobs',
  'creditNotes',
  'recurringInvoices',
  'stockMovements',
  'ocrTemplates'
];

async function deleteCollection(collectionName: string) {
  console.log(`\n🗑️  Deleting ${collectionName}...`);
  
  try {
    const collectionRef = collection(db, collectionName);
    const snapshot = await getDocs(collectionRef);
    
    console.log(`   Found ${snapshot.size} documents`);
    
    let deleted = 0;
    for (const docSnap of snapshot.docs) {
      await deleteDoc(doc(db, collectionName, docSnap.id));
      deleted++;
      
      if (deleted % 10 === 0) {
        console.log(`   Deleted ${deleted}/${snapshot.size}`);
      }
    }
    
    console.log(`   ✅ Deleted ${deleted} documents from ${collectionName}`);
  } catch (error) {
    console.error(`   ❌ Error deleting ${collectionName}:`, error);
  }
}

async function cleanup() {
  console.log('🧹 Starting cleanup of old test data...\n');
  console.log('⚠️  This will DELETE ALL DATA from old root collections.');
  console.log('⚠️  User subcollections will NOT be affected.\n');
  
  console.log('Starting in 3 seconds... (Press Ctrl+C to cancel)');
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  const startTime = Date.now();
  
  for (const collectionName of collectionsToDelete) {
    await deleteCollection(collectionName);
  }
  
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ CLEANUP COMPLETE!');
  console.log('='.repeat(60));
  console.log(`⏱️  Total time: ${duration} seconds`);
  console.log('\n✨ Your database is now clean and ready for fresh users!');
  console.log('🚀 When users register and add data, it will automatically');
  console.log('   be created in their own users/{userId} subcollections.\n');
  
  process.exit(0);
}

cleanup().catch((error) => {
  console.error('❌ Cleanup failed:', error);
  process.exit(1);
});
