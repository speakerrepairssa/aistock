import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';
import { Upload, Camera } from 'lucide-react';
import Tesseract from 'tesseract.js';

interface OCRLineItem {
  id: string;
  rawText: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
  status: 'pending' | 'matched' | 'unmatched' | 'confirmed';
  updatePrice: boolean;
  updateQuantity: boolean;
}

interface StandardOCRUploaderProps {
  onImageSelect: (imageBase64: string) => void;
  onExtractedItems: (items: OCRLineItem[]) => void;
  onError: (error: string) => void;
  onSuccess: (message: string) => void;
}

export const StandardOCRUploader: React.FC<StandardOCRUploaderProps> = ({
  onImageSelect,
  onExtractedItems,
  onError,
  onSuccess,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [extractedText, setExtractedText] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) {
        console.warn('⚠️ No file selected');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        onError('❌ Please select an image file (JPG, PNG, etc.)');
        return;
      }

      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        onError('❌ File size must be less than 10MB');
        return;
      }

      console.log(`📁 Loading image: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`);

      const reader = new FileReader();
      reader.onload = async (e) => {
        const result = e.target?.result as string;
        console.log('✅ Image loaded, starting OCR extraction...');
        onImageSelect(result);
        onSuccess(`✅ Image loaded: ${file.name}`);
        
        // Start OCR extraction
        await performOCRExtraction(result);
      };
      reader.onerror = (error) => {
        console.error('❌ FileReader error:', error);
        onError('Failed to read file. Please try again.');
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('❌ Error handling file upload:', error);
      onError('An error occurred while uploading the file.');
    }
  };

  const performOCRExtraction = async (imageBase64: string) => {
    try {
      setIsProcessing(true);
      setProgress(0);
      setStatusMessage('🔍 Analyzing invoice with Tesseract OCR...');

      // Convert base64 to image URL
      const imageUrl = imageBase64;

      console.log('📸 Starting Tesseract OCR extraction...');
      setProgress(10);

      const worker = await Tesseract.createWorker();
      
      const { data } = await worker.recognize(imageUrl);
      const text = data.text;

      setProgress(60);
      setStatusMessage('📝 Processing extracted text...');

      console.log('✅ OCR complete, parsing invoice...');
      setExtractedText(text);

      // Parse invoice text
      const items = parseInvoiceText(text);

      setProgress(100);
      setStatusMessage(`✅ Extracted ${items.length} line items`);

      // Return extracted items
      if (items.length > 0) {
        onExtractedItems(items);
        onSuccess(`✅ Successfully extracted ${items.length} items from invoice`);
      } else {
        onError('⚠️ No line items found. Please check the invoice image.');
      }

      await worker.terminate();
    } catch (error) {
      console.error('❌ OCR extraction failed:', error);
      onError(`OCR extraction failed: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const parseInvoiceText = (text: string): OCRLineItem[] => {
    const lines = text
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const items: OCRLineItem[] = [];
    let tableStarted = false;
    let tableEnded = false;

    // Find table boundaries
    let startIndex = 0;
    let endIndex = lines.length;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].toLowerCase();
      
      // Look for table header
      if (!tableStarted && (
        (line.includes('qty') && line.includes('description')) ||
        (line.includes('quantity') && line.includes('item')) ||
        line.includes('part number') && line.includes('qty')
      )) {
        startIndex = i + 1;
        tableStarted = true;
        console.log(`✓ Table header found at line ${i}`);
      }

      // Look for table end
      if (tableStarted && !tableEnded && (
        line.includes('subtotal') ||
        line.includes('total') ||
        line.includes('vat') ||
        line.includes('grand total')
      )) {
        endIndex = i;
        tableEnded = true;
        console.log(`✓ Table end found at line ${i}`);
        break;
      }
    }

    // If no table boundaries found, process all middle lines
    if (!tableStarted) {
      startIndex = Math.floor(lines.length * 0.2);
      endIndex = Math.floor(lines.length * 0.8);
    }

    const tableLines = lines.slice(startIndex, endIndex);
    
    console.log(`Processing ${tableLines.length} table lines`);

    tableLines.forEach((line, index) => {
      if (line.length < 5) return;

      const lowerLine = line.toLowerCase();
      
      // Skip headers and footer lines
      if (
        lowerLine.includes('item') ||
        lowerLine.includes('qty') ||
        lowerLine.includes('unit') ||
        lowerLine.includes('total') ||
        lowerLine.includes('check out') ||
        lowerLine.includes('delivery') ||
        lowerLine.includes('payment terms')
      ) {
        return;
      }

      // Extract numbers from line
      const numberMatches = line.match(/[\d,\.]+/g) || [];
      const numbers = numberMatches
        .map((n) => parseFloat(n.replace(/,/g, '')))
        .filter((n) => !isNaN(n) && n > 0);

      // Need at least 3 numbers: qty, unit price, total
      if (numbers.length >= 3) {
        try {
          const quantity = numbers[0];
          const unitPrice = numbers[1];
          const lineTotal = numbers[numbers.length - 1];

          // Extract description (remove numbers and special chars)
          let description = line
            .replace(/[\d,\.]+/g, ' ')
            .replace(/[R$€£¥]/g, '')
            .replace(/\s+/g, ' ')
            .trim();

          if (description.length > 3 && quantity > 0 && unitPrice > 0) {
            items.push({
              id: `ocr-${Date.now()}-${index}-${Math.random()}`,
              rawText: line,
              productName: description,
              quantity,
              price: unitPrice,
              total: lineTotal,
              status: 'pending',
              updatePrice: true,
              updateQuantity: true,
            });

            console.log(`✓ Item: ${description} | Qty: ${quantity} | Price: ${unitPrice}`);
          }
        } catch (e) {
          console.error('Error parsing line:', e);
        }
      }
    });

    console.log(`✅ Parsed ${items.length} items`);
    return items;
  };

  return (
    <Card sx={{ mb: 3, border: '2px solid #667eea', backgroundColor: '#f9f9ff' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#667eea' }}>
            📄 Standard OCR Uploader
          </Typography>
          <Typography variant="caption" sx={{ backgroundColor: '#e8e8ff', px: 1.5, py: 0.5, borderRadius: 1 }}>
            Tesseract.js
          </Typography>
        </Box>

        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          Client-side invoice processing using Tesseract OCR. Fast, private, no server calls.
        </Typography>

        {isProcessing && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {statusMessage}
            </Typography>
            <LinearProgress variant="determinate" value={progress} sx={{ mb: 1 }} />
            <Typography variant="caption" color="textSecondary">
              {progress}%
            </Typography>
          </Box>
        )}

        {extractedText && (
          <Card sx={{ mb: 2, backgroundColor: '#f0f0f0' }}>
            <CardContent>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                📝 Extracted Text Preview:
              </Typography>
              <Box
                sx={{
                  maxHeight: 150,
                  overflow: 'auto',
                  backgroundColor: '#fff',
                  p: 1,
                  borderRadius: 1,
                  fontSize: '0.75rem',
                  fontFamily: 'monospace',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {extractedText.substring(0, 500)}
                {extractedText.length > 500 && '...'}
              </Box>
            </CardContent>
          </Card>
        )}

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            size="small"
            startIcon={<Upload size={16} />}
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'image/*';
              input.onchange = (e) => handleFileUpload(e as any);
              input.click();
            }}
            disabled={isProcessing}
            sx={{ fontSize: '0.85rem' }}
          >
            Upload Image
          </Button>

          <Button
            variant="outlined"
            size="small"
            startIcon={<Camera size={16} />}
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'image/*';
              input.capture = 'environment';
              input.onchange = (e) => handleFileUpload(e as any);
              input.click();
            }}
            disabled={isProcessing}
            sx={{ fontSize: '0.85rem' }}
          >
            Take Photo
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
