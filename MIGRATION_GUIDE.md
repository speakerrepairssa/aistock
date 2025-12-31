# Firestore Restructure Migration Guide

## Overview

The Firestore database has been restructured from a flat multi-tenant architecture to a hierarchical subcollection structure. This change provides:

- ✅ **Perfect data isolation** - Each user's data is completely separated
- ✅ **Simpler security rules** - No complex filtering logic needed
- ✅ **Better performance** - No need to filter by userId/createdBy on every query
- ✅ **Cleaner architecture** - Natural hierarchical data organization

## Old Structure

```
Root Collections:
├── products (filtered by userId)
├── customers (filtered by createdBy)
├── invoices (filtered by userId)
├── quotations (filtered by createdBy)
├── repairJobs (filtered by createdBy)
├── creditNotes (filtered by createdBy)
├── recurringInvoices (filtered by createdBy)
├── stockMovements (filtered by userId/productId)
└── userSettings/{userId}
```

## New Structure

```
users/{userId}
├── products/{productId}
├── customers/{customerId}
├── invoices/{invoiceId}
├── quotations/{quotationId}
├── repairJobs/{jobId}
├── creditNotes/{noteId}
├── recurringInvoices/{invoiceId}
├── stockMovements/{movementId}
└── ocrTemplates/{templateId}

counters/ (shared, remains at root)
```

## Migration Steps

### 1. Code Updates (✅ COMPLETED)

All service files have been updated:
- ✅ `productService.ts` - Uses `users/{userId}/products`
- ✅ `customerService.ts` - Uses `users/{userId}/customers`
- ✅ `invoiceService.ts` - Uses `users/{userId}/invoices`
- ✅ `quotationService.ts` - Uses `users/{userId}/quotations`
- ✅ `repairService.ts` - Uses `users/{userId}/repairJobs`
- ✅ `settingsService.ts` - Uses `users/{userId}` document

### 2. Security Rules (✅ DEPLOYED)

New Firestore rules deployed with simple pattern:
```
match /users/{userId} {
  allow read, write: if request.auth.uid == userId;
  
  match /{document=**} {
    allow read, write: if request.auth.uid == userId;
  }
}
```

### 3. Data Migration (⚠️ PENDING)

Run the migration script to copy existing data to the new structure:

```bash
cd /Users/mobalife/Desktop/aistock
npx ts-node scripts/migrateToSubcollections.ts
```

The script will:
1. Copy all documents from old collections to user subcollections
2. Preserve all document IDs and data
3. Show progress and statistics
4. NOT delete old data (you can verify first)

### 4. Verification (⚠️ TODO)

After running the migration:
1. Open Firebase Console: https://console.firebase.google.com/project/aistock-c4ea6/firestore
2. Check `users/{your-userId}` subcollections
3. Verify all your data is present
4. Test the application thoroughly:
   - Products page - Add/edit/delete products
   - Customers page - Add/edit/delete customers
   - Sales/Invoices - Create new invoices
   - Quotations - Create quotes
   - Repair Jobs - Create repair jobs
   - Settings - Update settings

### 5. Cleanup (⚠️ TODO - After verification)

Once everything is working:
1. Manually delete old root collections in Firebase Console:
   - `products`
   - `customers`
   - `invoices`
   - `quotations`
   - `repairJobs`
   - `creditNotes`
   - `recurringInvoices`
   - `stockMovements`
   - `userSettings`

2. **DO NOT DELETE**: Keep `counters` collection (still used for ID generation)

## Rollback Plan

If issues occur:
1. The old data is still in root collections
2. Can revert Firestore rules: `firebase deploy --only firestore:rules` (using old rules)
3. Revert code changes via git: `git checkout HEAD~10 -- frontend/src/services/`

## Testing Checklist

- [ ] Products load correctly
- [ ] Can add new products
- [ ] Can edit products
- [ ] Can delete products
- [ ] Customers load correctly
- [ ] Can add new customers
- [ ] Can create invoices
- [ ] Can create quotations
- [ ] Can create repair jobs
- [ ] Settings persist correctly
- [ ] ClickUp integration works
- [ ] OCR functionality works
- [ ] Reports generate correctly

## Benefits Achieved

1. **Security**: Each user can ONLY access their own data
2. **Performance**: No filtering overhead on queries
3. **Scalability**: Better query performance as data grows
4. **Maintainability**: Clearer code with helper functions
5. **Correctness**: No risk of accessing other users' data

## Support

If you encounter any issues:
1. Check browser console for errors
2. Check Firebase Console for data presence
3. Verify auth.currentUser is set
4. Check Firestore rules are deployed

## Technical Details

### Helper Functions Pattern

Each service now uses helper functions:
```typescript
const getUserProductsCollection = (userId: string) => 
  collection(db, 'users', userId, 'products');

const userId = auth.currentUser?.uid;
if (!userId) throw new Error('User not authenticated');

const productsRef = getUserProductsCollection(userId);
```

### Authentication Checks

Every service method now verifies authentication:
```typescript
const userId = auth.currentUser?.uid;
if (!userId) {
  throw new Error('User not authenticated');
}
```

### No More Field Filtering

Old approach:
```typescript
query(collection(db, 'products'), where('userId', '==', userId))
```

New approach:
```typescript
const productsRef = collection(db, 'users', userId, 'products');
// No where clause needed - security enforced by path
```

---

**Migration Status**: Code ready, rules deployed, awaiting data migration run ✅

