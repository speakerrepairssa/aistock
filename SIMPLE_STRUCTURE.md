# Simplified Firestore Structure - Complete

## Date: December 27, 2025

## New Simple Structure

All user data is now stored directly in a single document at `/users/{userId}` with arrays for different data types.

### Firestore Document Structure

```
/users/{userId}
{
  products: [
    {
      id: "prod_1234567890",
      name: "Product Name",
      sku: "SKU123",
      price: 100,
      quantity: 50,
      // ...other product fields
      createdAt: Date,
      updatedAt: Date
    }
  ],
  customers: [
    {
      id: "cust_1234567890",
      customerNumber: "CUST00001",
      contactPerson: "John Doe",
      email: "john@example.com",
      // ...other customer fields
      createdAt: Date,
      updatedAt: Date
    }
  ],
  invoices: [
    {
      id: "inv_1234567890",
      invoiceNumber: "INV123456",
      customerName: "John Doe",
      total: 1000,
      // ...other invoice fields
      createdAt: Date,
      updatedAt: Date
    }
  ],
  stockMovements: [
    {
      id: "mov_1234567890",
      productId: "prod_123",
      quantity: 10,
      reason: "Stock Update",
      createdAt: Date
    }
  ],
  settings: {
    currency: "ZAR",
    companyName: "My Company",
    // ...other settings
  }
}

/counters/
  {counterId}: { value: number }
```

## Benefits of This Structure

1. **Simpler** - Everything in one place per user
2. **Faster reads** - Single document read gets all data
3. **No complex queries** - Just get/update the user document
4. **Easier to understand** - No subcollections to navigate
5. **Better for small to medium datasets** - Perfect for most businesses

## Files Updated

### New Service Files (Simplified)
- `simpleProductService.ts` - Products stored as array in user doc
- `simpleCustomerService.ts` - Customers stored as array in user doc
- `simpleInvoiceService.ts` - Invoices stored as array in user doc

### Updated Files
- `firestore.rules` - Simplified to just allow read/write on `/users/{userId}`
- `services/index.ts` - Now exports simple services
- `store/productStore.ts` - Uses simple product service
- Fixed all pages that call `updateProductQuantity`

## Firestore Rules (Simplified)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Simple user document structure
    match /users/{userId} {
      allow read, write: if isAuthenticated() && request.auth.uid == userId;
    }
    
    // Global counters
    match /counters/{counterId} {
      allow read, write: if isAuthenticated();
    }
  }
}
```

## How It Works

### Adding Data
- Get the user document
- Add to the appropriate array using `arrayUnion()`
- Data is automatically merged

### Reading Data
- Get the user document once
- Access the array you need (products, customers, etc.)
- Filter/search in memory (fast for small datasets)

### Updating Data
- Get the user document
- Map through the array
- Update the matching item
- Write back the entire array

### Deleting Data
- Get the user document
- Filter out the item to delete
- Write back the filtered array

## Limitations

- **Document size limit**: 1MB per document
- **Array size**: Recommended max 1000-2000 items per array
- **Not suitable for**: Very large datasets (10,000+ products)

For most businesses, this simple structure is perfect and much easier to work with!

## Testing

After deploying, test:
1. Login to your app
2. Add/edit/delete products
3. Add/edit/delete customers
4. Create invoices
5. Check Firebase console - you should see everything under `/users/{userId}`

## Deployment Status

✅ **Firestore Rules**: Deployed
✅ **Frontend Build**: Successful  
✅ **Hosting**: Deployed to https://aistock-c4ea6.web.app

## Next Steps

1. **Hard refresh your browser** (Cmd+Shift+R on Mac)
2. Login and test
3. All data will be stored in your user document
4. No more permission errors!
