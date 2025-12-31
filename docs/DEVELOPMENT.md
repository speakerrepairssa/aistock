# Development Guide

## Getting Started with Development

### Setting Up Your Development Environment

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure Firebase**
   - Create `.env.local` with Firebase credentials
   - See [SETUP.md](./SETUP.md) for detailed Firebase configuration

3. **Start Development Server**
   ```bash
   npm run dev
   ```

## Code Organization

### Components Directory
- **Header.tsx**: Top navigation component
- **Sidebar.tsx**: Navigation drawer
- **StatsCards.tsx**: Dashboard statistics display
- More components can be added as needed

### Pages Directory
- **Dashboard.tsx**: Main dashboard page
- **Products.tsx**: Products list and management
- **Login.tsx**: Authentication page
- **OCRScanner.tsx**: OCR integration placeholder

### Services Directory
- **firebase.ts**: Firebase initialization and configuration
- **authService.ts**: Firebase authentication functions
- **productService.ts**: Firestore product CRUD operations
- **storageService.ts**: Firebase Storage file management

### Store Directory (Zustand)
- **authStore.ts**: Authentication state management
- **productStore.ts**: Product state management

### Types Directory
- **index.ts**: TypeScript interfaces and types

### Utils Directory
- **helpers.ts**: Helper functions and utilities

## Common Development Tasks

### Adding a New Page

1. Create new component in `src/pages/`:
```typescript
// src/pages/NewPage.tsx
import React from 'react';
import { Container, Box, Typography } from '@mui/material';

export const NewPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4">New Page</Typography>
    </Container>
  );
};
```

2. Export from `src/pages/index.ts`:
```typescript
export { NewPage } from './NewPage';
```

3. Add route in `src/App.tsx`:
```typescript
<Route path="/new-page" element={<NewPage />} />
```

4. Add menu item in `src/components/Sidebar.tsx`:
```typescript
{ label: 'New Page', icon: IconName, path: '/new-page' }
```

### Adding a New Component

1. Create component in `src/components/`:
```typescript
interface MyComponentProps {
  // Define props
}

export const MyComponent: React.FC<MyComponentProps> = (props) => {
  return (
    // JSX
  );
};
```

2. Export from `src/components/index.ts`

3. Use in pages:
```typescript
import { MyComponent } from '../components';
```

### Working with Firebase

#### Reading Products
```typescript
import { useProducts } from '../hooks';

function MyComponent() {
  const { products, loading, fetchProducts } = useProducts();
  
  useEffect(() => {
    fetchProducts();
  }, []);
  
  return (
    // Render products
  );
}
```

#### Updating Product Quantity
```typescript
const { updateProductQuantity } = useProducts();
const { user } = useAuth();

const handleUpdate = async () => {
  await updateProductQuantity(
    productId,
    quantityChange,
    reason,
    user.uid
  );
};
```

#### Uploading Images
```typescript
import { storageService } from '../services';

const handleUpload = async (file: File) => {
  const url = await storageService.uploadProductImage(file, productId);
  // Use the URL
};
```

## Writing Tests (Future)

Tests should follow this structure:
```typescript
import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  test('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

## Code Style Guidelines

### TypeScript
- Always define types/interfaces
- Use `React.FC<Props>` for components
- Avoid `any` type

### Naming Conventions
- Components: PascalCase (`MyComponent.tsx`)
- Functions/Variables: camelCase (`myFunction`, `myVariable`)
- Constants: UPPER_SNAKE_CASE (`CONSTANT_VALUE`)
- Files: 
  - Components: PascalCase
  - Services/Utils: camelCase

### Component Structure
```typescript
interface Props {
  // Props
}

export const Component: React.FC<Props> = ({ prop1, prop2 }) => {
  // Hooks
  const [state, setState] = useState();
  
  // Effects
  useEffect(() => {
    // Logic
  }, []);
  
  // Event handlers
  const handleClick = () => {};
  
  // Render
  return (
    // JSX
  );
};
```

### Material-UI Usage
```typescript
import { Box, Typography, Button } from '@mui/material';

// Use sx prop for styling
<Box sx={{ 
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  p: 2,
}}>
  <Typography variant="h6">Title</Typography>
  <Button variant="contained">Action</Button>
</Box>
```

## Performance Considerations

1. **Code Splitting**: Use React.lazy for route-based splitting
2. **Image Optimization**: Upload appropriately sized images
3. **Firebase Queries**: Limit results with pagination
4. **State Management**: Use Zustand selectors to prevent unnecessary re-renders

## Common Issues & Solutions

### Hot Module Replacement (HMR) Not Working
- Ensure Vite config is correct
- Check console for errors
- Restart dev server

### Firebase Connection Failing
- Verify environment variables
- Check Firebase project is active
- Ensure correct security rules

### TypeScript Errors
- Run `npm run type-check`
- Clear cache: `rm -rf node_modules/.vite`
- Restart IDE

## Git Workflow

1. Create feature branch: `git checkout -b feature/feature-name`
2. Make changes and commit: `git commit -m "Add feature"`
3. Push branch: `git push origin feature/feature-name`
4. Create pull request

## Useful Commands

```bash
# Check for type errors
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Clean install
rm -rf node_modules package-lock.json && npm install
```

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Material-UI Documentation](https://mui.com/material-ui/getting-started/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Vite Documentation](https://vitejs.dev)

## Next Steps

1. Set up your development environment
2. Create a Firebase project
3. Configure environment variables
4. Start the development server
5. Begin building features!
