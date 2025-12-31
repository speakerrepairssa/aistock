const admin = require('firebase-admin');

// Initialize without service account - uses application default credentials
admin.initializeApp();

async function deleteAllUsers() {
  console.log('🗑️  Deleting all Firebase Authentication users...\n');

  try {
    let nextPageToken;
    let deletedCount = 0;

    do {
      // List users in batches
      const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);
      
      const uids = listUsersResult.users.map(user => user.uid);
      
      if (uids.length > 0) {
        console.log(`Deleting ${uids.length} users...`);
        
        // Delete users
        const result = await admin.auth().deleteUsers(uids);
        deletedCount += result.successCount;
        
        if (result.failureCount > 0) {
          console.log(`⚠️  Failed to delete ${result.failureCount} users`);
          result.errors.forEach(err => {
            console.log(`  Error: ${err.error.message} for user ${err.index}`);
          });
        }
      }
      
      nextPageToken = listUsersResult.pageToken;
    } while (nextPageToken);

    console.log(`\n✅ Deleted ${deletedCount} authentication users!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error deleting users:', error);
    process.exit(1);
  }
}

deleteAllUsers();
