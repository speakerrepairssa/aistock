import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
admin.initializeApp();
const db = admin.firestore();

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

async function migrateCollection(collectionName) {
  console.log(`\n--- Migrating ${collectionName} ---`);
  
  const oldCollectionRef = db.collection(`users/${OLD_USER_ID}/${collectionName}`);
  const newCollectionRef = db.collection(`users/${NEW_USER_ID}/${collectionName}`);
  
  console.log('Reading from:', `users/${OLD_USER_ID}/${collectionName}`);
  
  try {
    const snapshot = await oldCollectionRef.get();
    console.log(`Found ${snapshot.size} documents in ${collectionName}`);
    
    if (snapshot.size === 0) {
      console.log(`No documents found in ${collectionName}, skipping...`);
      return;
    }
    
    let migrated = 0;
    for (const doc of snapshot.docs) {
      try {
        const data = doc.data();
        const docId = doc.id;
        
        // Write to new location
        await newCollectionRef.doc(docId).set(data);
        
        console.log(`Migrated document ${docId}`);
        migrated++;
        
        // Optional: Delete from old location (uncomment if you want to remove old data)
        // await oldCollectionRef.doc(docId).delete();
        
      } catch (error) {
        console.error(`Failed to migrate document ${doc.id}:`, error);
      }
    }
    
    console.log(`Successfully migrated ${migrated}/${snapshot.size} documents from ${collectionName}`);
    
  } catch (error) {
    console.error(`Error accessing collection ${collectionName}:`, error);
  }
}

// Run the migration
migrateUserData()
  .then(() => {
    console.log('Script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });