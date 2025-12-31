# 🚀 AiStock - Quick Start Guide

## For Existing Firebase Project (Updated Dec 2024)

### Quick Setup on New Machine

```bash
# 1. Clone repository
git clone https://github.com/speakerrepairssa/aistock.git
cd aistock

# 2. Install dependencies
cd frontend
npm install
cd ..

# 3. Login to Firebase (uses existing .firebaserc)
firebase login
firebase use

# 4. Configure environment
cp frontend/.env.example frontend/.env.local
# Edit .env.local with Firebase credentials

# 5. Run development server
cd frontend
npm run dev
```

App opens at **http://localhost:5173**

### Deploy to Firebase Hosting

```bash
# From project root
cd frontend
npm run build
cd ..
firebase deploy --only hosting
```

Live at: **https://aistock-c4ea6.web.app**

---

## 🆕 New Features (Latest)

- ✨ **Repair Reports Page**: Complete analytics with:
  - Daily repairs statistics
  - Repairs by technician (all-time)
  - Monthly repair reports
  - Technician performance metrics
- ✨ **ClickUp Integration**: Import tasks with smart auto-fill
- ✨ **Custom Job Fields**: Configurable repair job form
- ✨ **Drag & Drop Jobs**: Put-aside feature for long-running jobs
- ✨ **Real-time Sync**: Firebase Firestore backend

---

## 📁 Complete Feature List

✅ **Dashboard**
  - Real-time inventory statistics
  - Low stock alerts
  - Out of stock tracking
  - Product value tracking

✅ **Product Management**
  - Full CRUD operations
  - Category management
  - Stock level tracking
  - Image uploads
  - Reorder level alerts

✅ **Sales Module**
  - Create invoices with auto-numbering
  - Generate receipts
  - Create quotations
  - Track payment status
  - Payment due dates

✅ **Repair Management**
  - Job creation and tracking
  - Technician assignment
  - Custom form fields
  - ClickUp task import
  - Job status management
  - Put-aside organization

✅ **Repair Reports** ⭐ NEW
  - Daily repair statistics
  - Repair breakdown by technician
  - Monthly repair analytics
  - Completion rate tracking
  - Revenue tracking

✅ **Integrations**
  - ClickUp API integration
  - Custom field mapping
  - Framework for future integrations (Monday.com, QuickBooks)

✅ **Stock Management**
  - Manual stock adjustments
  - Audit trail tracking
  - OCR scanner (placeholder)
  - Bulk operations

✅ **Settings**
  - Integration configuration
  - Custom form field management
  - User preferences
  - Currency settings

---

## 🎯 Key Improvements Over Original

1. **Complete Project Files** - All config files in Git for easy deployment
2. **Comprehensive Documentation** - Full setup and deployment guides
3. **New Repair Module** - Complete job management system
4. **Analytics & Reports** - Business intelligence with repair reports
5. **Integration Framework** - Ready for Monday.com, QuickBooks, etc.
6. **Custom Fields** - Dynamic form configuration
7. **Drag & Drop UI** - Better job organization

---

## 📋 Project Structure

```
aistock/
├── frontend/                      # React TypeScript app
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx      # Inventory overview
│   │   │   ├── Products.tsx       # Product management
│   │   │   ├── Repair.tsx         # Repair job management
│   │   │   ├── Reports.tsx        # Analytics & reports ⭐
│   │   │   ├── Sales.tsx          # Invoice/receipt creation
│   │   │   ├── Settings.tsx       # Configuration
│   │   │   └── OCRScanner.tsx     # Stock updates
│   │   ├── components/            # Reusable components
│   │   ├── services/              # Firebase & API services
│   │   ├── store/                 # Zustand state management
│   │   └── types/                 # TypeScript interfaces
│   ├── package.json
│   └── vite.config.ts
├── firebase.json                  # Firebase config
├── .firebaserc                    # Project ID reference
├── README.md                      # Complete documentation
├── QUICKSTART.md                  # This file
└── package.json                   # Root package config
```

---

## 🔧 Environment Variables

Required in `frontend/.env.local`:

```bash
# Firebase
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=aistock-c4ea6.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=aistock-c4ea6
VITE_FIREBASE_STORAGE_BUCKET=aistock-c4ea6.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Cloudinary (for image uploads)
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

---

## 🚀 Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build

# Firebase Deployment
firebase deploy         # Deploy everything
firebase deploy --only hosting  # Frontend only
firebase status         # Check project status
firebase logout         # Logout from CLI
```

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Module not found | `rm -rf node_modules && npm install` |
| Firebase auth error | Verify `.env.local` credentials |
| Port 5173 in use | `npm run dev -- --port 3000` |
| Build fails | `npm run build -- --debug` |
| Old credentials | Update `.env.local` and restart dev server |

---

## 📊 Database Collections

- **products** - Product inventory
- **repairJobs** - Repair job management
- **invoices** - Sales invoices
- **quotations** - Customer quotations
- **settings** - User preferences & integrations

---

## ✨ Features in Development

- 🔄 Monday.com integration
- 🔄 QuickBooks integration
- 🔄 SMS notifications
- 🔄 Mobile app (React Native)
- 🔄 Advanced analytics
- 🔄 Inventory forecasting

---

## 🎓 Learning Resources

- **Firebase Docs**: https://firebase.google.com/docs
- **React Docs**: https://react.dev
- **Material-UI**: https://mui.com
- **Zustand**: https://github.com/pmndrs/zustand

---

## 📞 Support & Updates

- Full documentation: See **README.md**
- Development guide: See **docs/** folder
- GitHub repository: https://github.com/speakerrepairssa/aistock

---

## 🎉 Ready to Go!

```bash
# Get started in 3 steps:
git clone https://github.com/speakerrepairssa/aistock.git && cd aistock
cd frontend && npm install && npm run dev
# Edit .env.local with your Firebase credentials
```

**Live application**: https://aistock-c4ea6.web.app

---

**Last updated**: December 24, 2024  
**Version**: 1.0.0 with Repair Reports
