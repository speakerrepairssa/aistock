const admin = require('firebase-admin');
const readline = require('readline');

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

const db = admin.firestore();

function generateBarcode() {
  // Generate CODE128 compatible barcode (alphanumeric)
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${timestamp}${random}`;
}

async function generateBarcodesForAllProducts() {
  try {
    console.log('Starting barcode generation for all products...\n');

    // Get all users
    const usersSnapshot = await db.collection('users').get();
    console.log(`Found ${usersSnapshot.size} users\n`);

    let totalProducts = 0;
    let updatedProducts = 0;
    let alreadyHadBarcodes = 0;

    for (const userDoc of usersSnapshot.docs) {
      const userId = userDoc.id;
      console.log(`Processing user: ${userId}`);

      // Get all products for this user
      const productsSnapshot = await db
        .collection('users')
        .doc(userId)
        .collection('products')
        .get();

      console.log(`  Found ${productsSnapshot.size} products`);
      totalProducts += productsSnapshot.size;

      for (const productDoc of productsSnapshot.docs) {
        const product = productDoc.data();
        
        // Only generate barcode if product doesn't have one
        if (!product.barcode) {
          const barcode = generateBarcode();
          await db
            .collection('users')
            .doc(userId)
            .collection('products')
            .doc(productDoc.id)
            .update({
              barcode: barcode,
              updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            });
          
          console.log(`    ✓ Generated barcode for: ${product.name} (${product.sku}) -> ${barcode}`);
          updatedProducts++;
        } else {
          console.log(`    - Already has barcode: ${product.name} (${product.barcode})`);
          alreadyHadBarcodes++;
        }
      }

      console.log('');
    }

    console.log('\n=== Summary ===');
    console.log(`Total products found: ${totalProducts}`);
    console.log(`Products updated with new barcodes: ${updatedProducts}`);
    console.log(`Products that already had barcodes: ${alreadyHadBarcodes}`);
    console.log('\n✅ Barcode generation complete!');

  } catch (error) {
    console.error('Error generating barcodes:', error);
    throw error;
  }
}

// Confirmation prompt
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('\n⚠️  This will generate barcodes for ALL products without barcodes.\nContinue? (yes/no): ', (answer) => {
  if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
    generateBarcodesForAllProducts()
      .then(() => {
        console.log('\nDone! Refresh your browser to see the barcodes.');
        rl.close();
        process.exit(0);
      })
      .catch((error) => {
        console.error('Migration failed:', error);
        rl.close();
        process.exit(1);
      });
  } else {
    console.log('Migration cancelled.');
    rl.close();
    process.exit(0);
  }
});
