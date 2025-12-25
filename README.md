# AiStock - Inventory Management System

A modern, AI-powered inventory management system with Firebase backend, designed for businesses managing 5,000-10,000+ stock items.

## Features

- **Inventory Dashboard**: Real-time overview of stock levels, low stock alerts, and out-of-stock items
- **Product Management**: Add, edit, and manage products with SKU, images, pricing, and stock levels
- **Search & Filter**: Fast search and advanced filtering across thousands of items
- **Stock Updates**: Manual stock adjustments and future OCR integration for photo-based updates
- **Product Images**: Upload and manage product images via Firebase Storage
- **Real-time Sync**: Live updates across the application using Firestore
- **Responsive UI**: Beautiful, user-friendly interface built with Material-UI

## Tech Stack

- **Frontend**: React 18, TypeScript, Material-UI, Vite
- **Backend**: Firebase (Firestore, Authentication, Storage, Cloud Functions)
- **Database**: Firestore (NoSQL)
- **Auth**: Firebase Authentication
- **File Storage**: Firebase Storage
- **Future**: OCR Integration for stock updates

## Project Structure

```
aistock/
├── frontend/                 # React TypeScript application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # Firebase services
│   │   ├── types/           # TypeScript types
│   │   ├── theme/           # Material-UI theme
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Utility functions
│   │   └── App.tsx
│   ├── public/
│   └── package.json
├── docs/                     # Documentation
├── .github/                  # GitHub configuration
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Firebase project account
- Firebase CLI installed (`npm install -g firebase-tools`)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/speakerrepairssa/aistock.git
   cd aistock
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env.local
   
   # Edit .env.local with your Firebase credentials
   nano .env.local
   ```

   Required environment variables:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

### Building for Production

```bash
# Build the frontend
npm run build

# This generates optimized files in the dist/ directory
```

### Deploying to Firebase Hosting

1. **Login to Firebase**
   ```bash
   firebase login
   ```

2. **Select your Firebase project** (or use existing .firebaserc)
   ```bash
   firebase use --add
   ```

3. **Deploy to Firebase Hosting**
   ```bash
   # From the project root
   firebase deploy --only hosting
   ```

   Your app will be live at: `https://aistock-c4ea6.web.app`

## Features

### Core Features

- ✅ **Dashboard**: Real-time inventory overview with statistics
- ✅ **Product Management**: Full CRUD operations for products
- ✅ **Stock Management**: Track inventory levels with low-stock alerts
- ✅ **Sales Module**: Create invoices, receipts, and quotations
- ✅ **Repair Management**: Track repair jobs with technician assignment
- ✅ **Repair Reports**: Daily, monthly, and technician-based analytics
- ✅ **ClickUp Integration**: Import tasks and auto-fill repair forms
- ✅ **Custom Fields**: Configure job form fields dynamically
- ✅ **Drag & Drop**: Organize jobs with put-aside functionality
- ✅ **OCR Scanner**: Bulk stock updates via image scanning
- ✅ **Settings Panel**: Integrations, form customization, and preferences
- ✅ **Real-time Sync**: Firebase Firestore for live data updates

### Recent Additions (Latest)

- 🆕 **Repair Reports Page**: Complete analytics dashboard with:
  - Daily repairs statistics
  - Repairs by technician (all-time)
  - Monthly repair reports with completion rates
  - Technician performance by month
  - Collapsible report sections for easy navigation

## Available Scripts

From the `frontend` directory:

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint the code
npm run lint
```

From the project root:

```bash
# Deploy to Firebase
firebase deploy --only hosting

# Deploy functions (if applicable)
firebase deploy --only functions
```
- Git

### Installation

1. Clone the repository:
```bash
git clone <repo-url>
cd aistock
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Set up Firebase configuration:
   - Create a `.env.local` file in the `frontend` directory
   - Add your Firebase project credentials

4. Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:5173`

## Firebase Setup

1. Create a Firebase project at [https://firebase.google.com/](https://firebase.google.com/)
2. Enable the following services:
   - Firestore Database
   - Firebase Authentication (Email/Password)
   - Firebase Storage
   - Cloud Functions (optional, for advanced features)

3. Add your credentials to `.env.local`:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Database Schema

### Products Collection
```
products/
├── {productId}
│   ├── name: string
│   ├── sku: string
│   ├── description: string
│   ├── category: string
│   ├── price: number
│   ├── costPrice: number
│   ├── quantity: number
│   ├── reorderLevel: number
│   ├── imageUrl: string
│   ├── status: "active" | "inactive"
│   ├── createdAt: timestamp
│   ├── updatedAt: timestamp
│   └── tags: array
```

### Repair Jobs Collection
```
repairJobs/
├── {jobId}
│   ├── jobNumber: string
│   ├── clientName: string
│   ├── itemDescription: string
│   ├── technician: string
│   ├── status: "pending" | "in-progress" | "put-aside" | "completed" | "cancelled"
│   ├── products: array (QuotationItem[])
│   ├── customFields: record (custom field values)
│   ├── subtotal: number
│   ├── tax: number
│   ├── total: number
│   ├── createdAt: timestamp
│   ├── updatedAt: timestamp
│   ├── startDateTime: timestamp
│   ├── endDateTime: timestamp
│   └── clickupTasks: array
```

### Settings Collection
```
settings/
├── {userId}
│   ├── integrations
│   │   ├── clickup
│   │   │   ├── apiKey: string
│   │   │   ├── enabled: boolean
│   │   │   └── teamId: string
│   │   └── [future integrations]
│   └── customFormFields
│       ├── jobFields: array
│       │   ├── id: string
│       │   ├── key: string
│       │   ├── label: string
│       │   ├── placeholder: string
│       │   ├── required: boolean
│       │   ├── type: string
│       │   ├── multiline: boolean
│       │   └── rows: number
```

## API Integration

### ClickUp Integration
The app integrates with ClickUp API v2 for task management:
- Import tasks directly into repair job forms
- Auto-fill job fields based on task custom fields
- Automatic field mapping with configurable form fields

To set up ClickUp integration:
1. Go to Settings → Integrations
2. Generate a personal access token from ClickUp
3. Paste the API key in the app
4. Select your workspace and team
5. Configure field mapping in job form settings

## Usage Guide

### Dashboard
- View real-time inventory statistics
- Monitor repair job status
- Track sales and invoices
- Access quick links to main features

### Repair Management
1. **Create Job**: Click "New Repair Job" to start a repair
2. **Import from ClickUp**: Paste ClickUp task ID for auto-fill
3. **Assign Technician**: Select technician for the job
4. **Organize**: Drag jobs to "Put Aside" for jobs taking too long
5. **Complete**: Mark job as completed and generate invoice
6. **Report**: View analytics in Reports → Repairs section

### Product Management
- Add/edit products with pricing and images
- Track stock levels across categories
- Set reorder levels for automatic alerts
- Manage product lifecycle (active/inactive)

### Sales Module
- Create invoices with automatic invoice numbers
- Generate receipts for quick sales
- Create quotations for customer proposals
- Track payment status and due dates

## Troubleshooting

### Build Issues
```bash
# Clear node_modules and reinstall
rm -rf frontend/node_modules
npm install

# Clear vite cache
rm -rf frontend/.vite
npm run build
```

### Firebase Connection Issues
- Verify Firebase project credentials in `.env.local`
- Check Firestore rules allow read/write access
- Ensure Firebase project has Firestore enabled
- Check Firebase Auth has Email/Password enabled

### Deployment Issues
```bash
# Check Firebase project
firebase status

# Debug deployment
firebase deploy --debug

# View hosting logs
firebase hosting:channel:list
```

## Environment Variables Reference

Required variables in `.env.local`:

```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=               # Firebase API Key
VITE_FIREBASE_AUTH_DOMAIN=           # Firebase Auth Domain
VITE_FIREBASE_PROJECT_ID=            # Firebase Project ID
VITE_FIREBASE_STORAGE_BUCKET=        # Firebase Storage Bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=   # Firebase Messaging Sender ID
VITE_FIREBASE_APP_ID=                # Firebase App ID

# Cloudinary Configuration (for image uploads)
VITE_CLOUDINARY_CLOUD_NAME=          # Cloudinary Cloud Name
```

## Performance Optimization

The app uses several optimization techniques:
- Code splitting with dynamic imports
- Image optimization with Cloudinary
- Firestore query optimization
- Lazy loading of components
- Material-UI theme optimization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Monday.com integration
- QuickBooks integration
- Advanced reporting and analytics
- Multi-location support
- Mobile app (React Native)
- SMS notifications for job status
- Automated invoicing triggers
- Inventory forecasting
- Customer portal

## License

This project is proprietary software for Speaker Repair SA.

## Support

For support and feature requests, contact the development team.
