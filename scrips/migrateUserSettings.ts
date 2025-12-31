/**
 * Migrate User Settings to New Structure
 * 
 * This script migrates userSettings from:
 *   userSettings/{userId} → users/{userId} (document)
 * 
 * Usage: npm run migrate-settings
 */

import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc,
  setDoc,
  deleteDoc
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

async function migrateUserSettings() {
  console.log('🔄 Migrating user settings...\n');
  
  try {
    const userSettingsRef = collection(db, 'userSettings');
    const snapshot = await getDocs(userSettingsRef);
    
    console.log(`   Found ${snapshot.size} user settings to migrate`);
    
    let migrated = 0;
    let errors = 0;
    
    for (const docSnap of snapshot.docs) {
      const userId = docSnap.id;
      const settingsData = docSnap.data();
      
      try {
        // Create/update users/{userId} document with settings
        const userDocRef = doc(db, 'users', userId);
        await setDoc(userDocRef, settingsData, { merge: true });
        
        migrated++;
        console.log(`   ✅ Migrated settings for user: ${userId}`);
        
      } catch (error) {
        console.error(`   ❌ Error migrating user ${userId}:`, error);
        errors++;
      }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 MIGRATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total users: ${snapshot.size}`);
    console.log(`Migrated: ${migrated}`);
    console.log(`Errors: ${errors}`);
    console.log('='.repeat(60));
    
    if (migrated > 0 && errors === 0) {
      console.log('\n✅ All user settings migrated successfully!');
      console.log('⚠️  Old userSettings collection still exists.');
      console.log('💡 You can delete it manually from Firebase Console after verification.\n');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrateUserSettings();
