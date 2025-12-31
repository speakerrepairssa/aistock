# AiStock Frontend

Modern React application for inventory management with Firebase backend.

## Features

- Beautiful Material-UI dashboard
- Real-time inventory updates
- Product search and filtering
- Stock level management
- OCR integration (coming soon)
- Responsive design

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env.local` with Firebase credentials:
   ```
   VITE_FIREBASE_API_KEY=your_key
   VITE_FIREBASE_AUTH_DOMAIN=your_domain
   VITE_FIREBASE_PROJECT_ID=your_project
   VITE_FIREBASE_STORAGE_BUCKET=your_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── services/       # Firebase services
├── store/          # Zustand stores
├── types/          # TypeScript types
├── hooks/          # Custom hooks
├── utils/          # Helper functions
├── theme/          # Material-UI theme
└── App.tsx         # Main app component
```

## Tech Stack

- React 18
- TypeScript
- Material-UI (MUI)
- Firebase
- Zustand (State management)
- React Router
- Vite
