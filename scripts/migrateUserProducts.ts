import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc, query, where } from 'firebase/firestore';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBGz_qJK4PJ4P4P4P4P4P4P4P4P4P4P4P4",
  authDomain: "aistock-c4ea6.firebaseapp.com",
  projectId: "aistock-c4ea6",
  storageBucket: "aistock-c4ea6.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const OLD_USER_ID = 'K7mAXYdpQOP8RXc9OV3K)IOQKo1';  // From Firebase console
const NEW_USER_ID = 'K7mAXYdpgOP8RXc9OV3tKjIOOKo1'; // Current auth user

async function migrateUserData() {
  console.log('Starting data migration...');
  console.log('From user ID:', OLD_USER_ID);
  console.log('To user ID:', NEW_USER_ID);

  try {
    // Migrate products
    await migrateCollection('products');
    
    // Migrate other collections if they exist
    await migrateCollection('customers');
    await migrateCollection('invoices');
    await migrateCollection('quotations');
    await migrateCollection('creditNotes');
    await migrateCollection('repairJobs');
    await migrateCollection('recurringInvoices');
    await migrateCollection('stockMovements');
    
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

async function migrateCollection(collectionName: string) {
  console.log(`\n--- Migrating ${collectionName} ---`);
  
  const oldCollectionPath = `users/${OLD_USER_ID}/${collectionName}`;
  const newCollectionPath = `users/${NEW_USER_ID}/${collectionName}`;
  
  console.log('Reading from:', oldCollectionPath);
  
  try {
    const snapshot = await getDocs(collection(db, oldCollectionPath));
    console.log(`Found ${snapshot.size} documents in ${collectionName}`);
    
    if (snapshot.size === 0) {
      console.log(`No documents found in ${collectionName}, skipping...`);
      return;
    }
    
    let migrated = 0;
    for (const docSnapshot of snapshot.docs) {
      try {
        const data = docSnapshot.data();
        const docId = docSnapshot.id;
        
        // Write to new location
        const newDocRef = doc(db, newCollectionPath, docId);
        await setDoc(newDocRef, data);
        
        console.log(`Migrated document ${docId}`);
        migrated++;
        
        // Optional: Delete from old location (uncomment if you want to remove old data)
        // const oldDocRef = doc(db, oldCollectionPath, docId);
        // await deleteDoc(oldDocRef);
        
      } catch (error) {
        console.error(`Failed to migrate document ${docSnapshot.id}:`, error);
      }
    }
    
    console.log(`Successfully migrated ${migrated}/${snapshot.size} documents from ${collectionName}`);
    
  } catch (error) {
    console.error(`Error accessing collection ${collectionName}:`, error);
  }
}

// Run the migration
migrateUserData();