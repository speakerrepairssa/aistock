# AiStock - Complete Setup Guide

## Project Overview

AiStock is a modern, professional inventory management system built with:
- **Frontend**: React 18 + TypeScript + Material-UI
- **Backend**: Firebase (Firestore, Auth, Storage, Cloud Functions)
- **Database**: Firestore NoSQL
- **Storage**: Firebase Storage for product images
- **State Management**: Zustand
- **UI Framework**: Material-UI (MUI)

## Prerequisites

- Node.js 16+ and npm
- Firebase account (free tier available)
- Git
- Code editor (VS Code recommended)

## Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name (e.g., "aistock")
4. Accept the default settings
5. Click "Create project"

### 2. Enable Required Services

#### Authentication
1. In Firebase Console, go to Authentication
2. Click "Get started"
3. Enable "Email/Password" provider
4. Create a test user (e.g., demo@aistock.com / demo123)

#### Firestore Database
1. Go to Firestore Database
2. Click "Create database"
3. Select "Start in test mode" (for development)
4. Choose a location (closest to you)
5. Click "Enable"

#### Storage
1. Go to Storage
2. Click "Get started"
3. Accept the default bucket settings
4. Click "Done"

### 3. Get Firebase Config

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click the Web icon to add web app
4. Follow the setup, then copy the config object

### 4. Configure Environment Variables

Create `.env.local` in `/frontend` directory:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Installation

### 1. Clone/Navigate to Project

```bash
cd /Users/mobalife/Desktop/aistock
```

### 2. Install Dependencies

```bash
cd frontend
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The application will open at `http://localhost:5173`

### 4. Login with Demo Account

- Email: demo@aistock.com
- Password: demo123

## Project Structure

```
aistock/
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Header.tsx       # Top navigation bar
│   │   │   ├── Sidebar.tsx      # Navigation sidebar
│   │   │   └── StatsCards.tsx   # Dashboard statistics
│   │   ├── pages/               # Page components
│   │   │   ├── Dashboard.tsx    # Main dashboard
│   │   │   ├── Products.tsx     # Products list & management
│   │   │   ├── Login.tsx        # Authentication
│   │   │   └── OCRScanner.tsx   # OCR placeholder
│   │   ├── services/            # Firebase integration
│   │   │   ├── firebase.ts      # Firebase initialization
│   │   │   ├── authService.ts   # Authentication
│   │   │   ├── productService.ts# Product CRUD
│   │   │   └── storageService.ts# File uploads
│   │   ├── store/               # Zustand state management
│   │   │   ├── authStore.ts     # Auth state
│   │   │   └── productStore.ts  # Product state
│   │   ├── hooks/               # Custom React hooks
│   │   │   ├── useAuth.ts       # Authentication hook
│   │   │   └── useProducts.ts   # Products hook
│   │   ├── types/               # TypeScript types
│   │   │   └── index.ts         # Type definitions
│   │   ├── utils/               # Helper functions
│   │   │   └── helpers.ts       # Utility functions
│   │   ├── theme/               # Material-UI theme
│   │   │   └── index.ts         # Theme configuration
│   │   ├── App.tsx              # Main app component
│   │   ├── main.tsx             # React entry point
│   │   └── index.css            # Global styles
│   ├── public/                  # Static assets
│   ├── index.html               # HTML template
│   ├── vite.config.ts           # Vite configuration
│   ├── tsconfig.json            # TypeScript config
│   ├── package.json             # Dependencies
│   └── .env.example             # Environment variables template
├── docs/                        # Documentation
├── README.md                    # Main README
└── package.json                 # Root package.json
```

## Key Features

### Dashboard
- Real-time inventory statistics
- Low stock alerts
- Out of stock items count
- Total inventory value

### Products Management
- Search products by name, SKU, or category
- Update stock quantities with reason tracking
- View all product details
- Beautiful data grid interface

### Stock Updates
- Manual stock adjustments
- Reason tracking (purchase, sale, inventory count, damage, return)
- Audit trail of all movements
- User tracking for accountability

### Future Features
- OCR integration for photo-based stock updates
- Advanced reporting and analytics
- Multi-warehouse support
- Barcode scanning
- Mobile app
- Email notifications

## Database Schema

### Products Collection
```
products/ {
  {productId}: {
    name: string
    sku: string
    description: string
    category: string
    price: number
    costPrice: number
    quantity: number
    reorderLevel: number
    imageUrl: string (optional)
    status: "active" | "inactive"
    tags: string[]
    createdAt: timestamp
    updatedAt: timestamp
  }
}
```

### Stock Movements Collection
```
stockMovements/ {
  {movementId}: {
    productId: string
    type: "in" | "out" | "adjustment" | "ocr"
    quantity: number
    previousQuantity: number
    newQuantity: number
    reason: string
    imageUrl: string (optional)
    userId: string
    timestamp: timestamp
    notes: string (optional)
  }
}
```

## Available Commands

### Development
```bash
npm run dev
```
Starts Vite development server with hot module replacement.

### Build
```bash
npm run build
```
Builds the production bundle with TypeScript compilation and minification.

### Preview
```bash
npm run preview
```
Previews the production build locally.

### Type Check
```bash
npm run type-check
```
Runs TypeScript compiler without emitting files to check for type errors.

## API Services

### Authentication Service
```typescript
authService.login(email, password)
authService.register(email, password)
authService.logout()
authService.onAuthStateChanged(callback)
authService.getCurrentUser()
```

### Product Service
```typescript
productService.addProduct(productData)
productService.updateProduct(id, productData)
productService.deleteProduct(id)
productService.getProductById(id)
productService.getAllProducts(pageSize)
productService.searchProducts(searchTerm)
productService.getProductsByCategory(category)
productService.getLowStockProducts()
productService.updateProductQuantity(id, quantity, reason, userId)
```

### Stock Movement Service
```typescript
stockMovementService.logMovement(movementData)
stockMovementService.getMovementsByProduct(productId)
stockMovementService.getAllMovements(limit)
```

### Storage Service
```typescript
storageService.uploadProductImage(file, productId)
storageService.uploadOCRImage(file, productId)
storageService.deleteImage(imageUrl)
```

### Dashboard Service
```typescript
dashboardService.getDashboardStats()
```

## State Management with Zustand

### Auth Store
```typescript
const { user, loading, error, login, register, logout } = useAuthStore()
```

### Product Store
```typescript
const {
  products,
  loading,
  error,
  stats,
  fetchProducts,
  searchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  updateProductQuantity,
  fetchStats,
} = useProductStore()
```

## Hooks

### useAuth
```typescript
const { user, loading, error, login, register, logout } = useAuth()
```

### useProducts
```typescript
const {
  products,
  loading,
  error,
  stats,
  fetchProducts,
  // ... other methods
} = useProducts()
```

## Styling

The application uses Material-UI v5 with a custom theme. The theme includes:
- Primary color: Blue (#1e88e5)
- Secondary color: Orange (#ff6f00)
- Success color: Green (#43a047)
- Warning color: Orange (#ffa726)
- Error color: Red (#ef5350)

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Add Firebase environment variables
4. Deploy

### Firebase Hosting
```bash
npm run build
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Netlify
1. Connect GitHub repo
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables
5. Deploy

## Troubleshooting

### Firebase Connection Issues
- Verify all environment variables are correctly set
- Check Firebase project is active and services are enabled
- Ensure Firebase authentication credentials are valid

### Build Errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Clear Vite cache: `rm -rf .vite`

### TypeScript Errors
- Run `npm run type-check` to see all errors
- Ensure all imports are correct
- Check that types are properly defined

## Next Steps

1. **Configure Firebase**: Follow the Firebase Setup section
2. **Set Environment Variables**: Create `.env.local` file
3. **Start Development**: Run `npm run dev`
4. **Add Products**: Use the UI to add inventory items
5. **Test Features**: Try stock updates and search

## Support & Contribution

For issues or contributions, please:
1. Create an issue describing the problem
2. Fork the repository
3. Create a feature branch
4. Submit a pull request

## License

MIT License - Feel free to use for commercial projects

## Contact

For support or questions, contact the development team.

---

**Happy Inventory Management! 📦**
