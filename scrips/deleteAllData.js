const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function deleteCollection(collectionPath, batchSize = 100) {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, resolve).catch(reject);
  });
}

async function deleteQueryBatch(db, query, resolve) {
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    resolve();
    return;
  }

  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  process.nextTick(() => {
    deleteQueryBatch(db, query, resolve);
  });
}

async function deleteAllCollections() {
  console.log('🗑️  Starting to delete all Firestore data...\n');

  try {
    // Get all collections at root level
    const collections = await db.listCollections();
    
    console.log(`Found ${collections.length} root collections:`);
    collections.forEach(col => console.log(`  - ${col.id}`));
    console.log();

    // Delete each collection
    for (const collection of collections) {
      console.log(`Deleting collection: ${collection.id}...`);
      
      // If it's the users collection, also delete subcollections
      if (collection.id === 'users') {
        const usersSnapshot = await collection.listDocuments();
        for (const userDoc of usersSnapshot) {
          console.log(`  Deleting user: ${userDoc.id}`);
          
          // Delete all subcollections for this user
          const subcollections = await userDoc.listCollections();
          for (const subcol of subcollections) {
            console.log(`    Deleting subcollection: ${subcol.id}`);
            await deleteCollection(`users/${userDoc.id}/${subcol.id}`);
          }
          
          // Delete the user document itself
          await userDoc.delete();
        }
      } else {
        // Delete regular collection
        await deleteCollection(collection.id);
      }
      
      console.log(`✅ Deleted collection: ${collection.id}\n`);
    }

    console.log('✅ All Firestore data has been deleted!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error deleting data:', error);
    process.exit(1);
  }
}

// Run the deletion
deleteAllCollections();
