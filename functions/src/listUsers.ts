import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Use the existing admin instance if already initialized, otherwise initialize
let db: admin.firestore.Firestore;
try {
  db = admin.firestore();
} catch (error) {
  admin.initializeApp();
  db = admin.firestore();
}

export const listUsers = functions.https.onRequest(async (req, res) => {
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
      const subcollectionData: {[key: string]: number | string} = {};
      
      for (const subCol of subcollections) {
        try {
          const subSnapshot = await db.collection(`users/${userId}/${subCol}`).limit(1).get();
          subcollectionData[subCol] = subSnapshot.size;
          if (subSnapshot.size > 0) {
            console.log(`  ${subCol}: ${subSnapshot.size} documents`);
          }
        } catch (error) {
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

  } catch (error) {
    console.error('Failed to list users:', error);
    res.status(500).json({
      success: false,
      error: (error as Error).message
    });
  }
});