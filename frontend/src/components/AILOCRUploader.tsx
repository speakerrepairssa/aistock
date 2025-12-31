import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Alert,
  LinearProgress,
  Chip,
} from '@mui/material';
import { Upload, Camera, Sparkles } from 'lucide-react';
import { 
  processInvoiceWithGemini, 
  validateImageFile, 
  fileToBase64,
  OCRLineItem,
  InvoiceMetadata 
} from '../services/geminiOcrService';

interface AILOCRUploaderProps {
  onImageSelect: (imageBase64: string) => void;
  onExtractedItems: (items: OCRLineItem[]) => void;
  onMetadataExtracted?: (metadata: InvoiceMetadata) => void;
  onError: (error: string) => void;
  onSuccess: (message: string) => void;
}

export const AILOCRUploader: React.FC<AILOCRUploaderProps> = ({
  onImageSelect,
  onExtractedItems,
  onMetadataExtracted,
  onError,
  onSuccess,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [confidence, setConfidence] = useState<number | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) {
        console.warn('⚠️ No file selected');
        return;
      }

      // Validate file
      const validation = validateImageFile(file);
      if (!validation.valid) {
        onError(`❌ ${validation.error}`);
        return;
      }

      console.log(`📁 Loading image: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`);
      setProgress(5);
      setStatusMessage('📸 Reading file...');

      // Convert to base64
      const imageBase64 = await fileToBase64(file);
      
      console.log('✅ Image loaded successfully');
      onImageSelect(imageBase64);
      onSuccess(`✅ Image loaded: ${file.name}`);

      // Start AI extraction
      await performAIExtraction(imageBase64);
      
    } catch (error) {
      console.error('❌ Error handling file upload:', error);
      onError('An error occurred while uploading the file.');
    }
  };

  const performAIExtraction = async (imageBase64: string) => {
    setIsProcessing(true);
    setProgress(0);
    setConfidence(null);

    try {
      const result = await processInvoiceWithGemini(
        imageBase64,
        (prog, msg) => {
          setProgress(prog);
          setStatusMessage(msg);
        }
      );

      if (!result.success) {
        throw new Error(result.error || 'AI extraction failed');
      }

      // Update confidence
      if (result.confidence) {
        setConfidence(result.confidence.overall);
      }

      // Pass extracted items
      if (result.items.length > 0) {
        onExtractedItems(result.items);
        
        // Pass metadata if callback provided
        if (result.metadata && onMetadataExtracted) {
          onMetadataExtracted(result.metadata);
        }

        const confidenceText = result.confidence 
          ? ` (Confidence: ${result.confidence.overall}%)`
          : '';
        
        onSuccess(
          `✅ Gemini extracted ${result.items.length} items${confidenceText}`
        );

        // Log issues if any
        if (result.issues && result.issues.length > 0) {
          console.warn('⚠️ Extraction issues:', result.issues);
        }

        // Log metadata
        if (result.metadata) {
          console.log('📋 Invoice metadata:', result.metadata);
        }
      } else {
        onError('⚠️ No line items found. Please check the invoice image.');
      }

    } catch (error) {
      console.error('❌ AI extraction failed:', error);
      const errorMsg = error instanceof Error ? error.message : String(error);
      onError(`AI extraction failed: ${errorMsg}`);
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  return (
    <Card 
      sx={{ 
        mb: 3, 
        border: '2px solid #667eea',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Sparkles size={24} />
          <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1 }}>
            🤖 AI Invoice Scanner
          </Typography>
          <Chip 
            label="Google Gemini" 
            size="small"
            sx={{ 
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              fontWeight: 600,
            }}
          />
        </Box>

        <Typography variant="body2" sx={{ mb: 2, opacity: 0.95 }}>
          AI-powered invoice analysis using Google Gemini Vision. Intelligent extraction with high accuracy.
        </Typography>

        {isProcessing && (
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {statusMessage}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {progress}%
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{ 
                height: 8,
                borderRadius: 4,
                backgroundColor: 'rgba(255,255,255,0.3)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: 'white',
                },
              }} 
            />
          </Box>
        )}

        {confidence !== null && !isProcessing && (
          <Alert 
            severity="success" 
            sx={{ mb: 2, backgroundColor: 'rgba(255,255,255,0.15)', color: 'white' }}
          >
            <strong>✅ Extraction complete!</strong> Confidence: {confidence}%
          </Alert>
        )}

        {!isProcessing && (
          <Alert 
            severity="info" 
            sx={{ 
              mb: 2, 
              backgroundColor: 'rgba(255,255,255,0.15)', 
              color: 'white',
              '& .MuiAlert-icon': { color: 'white' },
            }}
          >
            <strong>💡 Tips:</strong> Use clear photos with good lighting. Gemini can read handwriting, tables, and complex layouts.
          </Alert>
        )}

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            size="medium"
            startIcon={<Upload size={18} />}
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'image/*';
              input.onchange = (e) => handleFileUpload(e as any);
              input.click();
            }}
            disabled={isProcessing}
            sx={{ 
              backgroundColor: 'white',
              color: '#667eea',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.9)',
              },
              '&:disabled': {
                backgroundColor: 'rgba(255,255,255,0.3)',
                color: 'rgba(255,255,255,0.5)',
              },
            }}
          >
            Upload Invoice
          </Button>

          <Button
            variant="outlined"
            size="medium"
            startIcon={<Camera size={18} />}
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'image/*';
              input.capture = 'environment';
              input.onchange = (e) => handleFileUpload(e as any);
              input.click();
            }}
            disabled={isProcessing}
            sx={{ 
              borderColor: 'white',
              color: 'white',
              fontWeight: 600,
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'rgba(255,255,255,0.1)',
              },
              '&:disabled': {
                borderColor: 'rgba(255,255,255,0.3)',
                color: 'rgba(255,255,255,0.3)',
              },
            }}
          >
            Take Photo
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
