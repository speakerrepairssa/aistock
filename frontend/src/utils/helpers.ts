import { useSettings, CURRENCY_SYMBOLS } from '../store/settingsStore';

export { CURRENCY_SYMBOLS };

export const formatCurrency = (value: number): string => {
  // Get currency from settings - we need to use a hook pattern
  // For now, we'll create a version that works with the settings
  const { currency } = useSettings();
  
  const symbol = CURRENCY_SYMBOLS[currency];
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
  
  return `${symbol} ${formatted}`;
};

export const formatCurrencyWithCurrency = (value: number, currency: 'USD' | 'ZAR' | 'EUR' | 'GBP' | 'INR' | 'AED' | 'SGD' | 'AUD'): string => {
  const symbol = CURRENCY_SYMBOLS[currency];
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
  
  return `${symbol} ${formatted}`;
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value);
};

export const getStockStatus = (
  quantity: number,
  reorderLevel: number
): 'in-stock' | 'low-stock' | 'out-of-stock' => {
  if (quantity === 0) return 'out-of-stock';
  if (quantity <= reorderLevel) return 'low-stock';
  return 'in-stock';
};

export const getStockStatusColor = (status: 'in-stock' | 'low-stock' | 'out-of-stock') => {
  switch (status) {
    case 'in-stock':
      return '#43a047';
    case 'low-stock':
      return '#ffa726';
    case 'out-of-stock':
      return '#ef5350';
    default:
      return '#9e9e9e';
  }
};

export const truncateText = (text: string, maxLength: number = 50): string => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

export const generateSKU = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${timestamp}-${random}`;
};

export const generateBarcode = (type: 'EAN13' | 'CODE128' = 'CODE128'): string => {
  if (type === 'EAN13') {
    // Generate EAN-13 barcode (12 digits + 1 check digit)
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    const partial = timestamp + random;
    
    // Calculate EAN-13 check digit
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      const digit = parseInt(partial[i]);
      sum += (i % 2 === 0) ? digit : digit * 3;
    }
    const checkDigit = (10 - (sum % 10)) % 10;
    
    return partial + checkDigit;
  } else {
    // Generate CODE128 compatible barcode (alphanumeric)
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${timestamp}${random}`;
  }
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
