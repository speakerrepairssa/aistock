import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { GoogleGenerativeAI } from '@google/generative-ai';

admin.initializeApp();

interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  sku?: string;
  partNumber?: string;
}

interface InvoiceMetadata {
  invoiceNumber?: string;
  invoiceDate?: string;
  supplierName?: string;
  supplierCode?: string;
  currency?: string;
  subtotal?: number;
  tax?: number;
  total?: number;
}

interface ExtractionResult {
  metadata: InvoiceMetadata;
  lineItems: InvoiceLineItem[];
  confidence: {
    overall: number;
    itemExtraction: number;
    metadataExtraction: number;
  };
  issues: string[];
}

/**
 * Process invoice image with Google Gemini API
 * Uses Google Generative AI SDK for reliable REST-based API calls
 * Optimized for maximum extraction accuracy in stock management
 */
export const processInvoiceOCR = functions
  .runWith({ 
    timeoutSeconds: 540, // 9 minute timeout
    memory: '512MB' 
  })
  .https.onCall(async (data, context) => {
    try {
      // Verify user is authenticated
      if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
      }

      const { imageBase64 } = data;

      if (!imageBase64) {
        throw new functions.https.HttpsError('invalid-argument', 'Image data is required');
      }

      console.log('🔍 Processing invoice with Gemini AI...');
      console.log(`📊 Image size: ${(imageBase64.length / 1024).toFixed(2)} KB`);

      // Get API key from Firebase config
      const apiKey = functions.config().googleai?.key;
      
      if (!apiKey) {
        console.error('❌ GOOGLE_API_KEY not configured in Firebase');
        throw new functions.https.HttpsError(
          'invalid-argument',
          'Google AI API Key not configured. Set it using: firebase functions:config:set googleai.key="YOUR_API_KEY"'
        );
      }

      // Initialize Gemini API
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      console.log('📸 Sending image to Gemini 1.5 Flash for analysis...');

      // ACCURACY-FOCUSED extraction prompt for stock management
      const extractionPrompt = `ROLE: You are an expert invoice/receipt data extraction specialist with 20+ years of experience in warehouse inventory management and financial auditing.

TASK: Extract ALL line items and metadata from this invoice/receipt with MAXIMUM ACCURACY. This data will be used for stock inventory management - errors will cause inventory discrepancies.

CRITICAL RULES (MUST FOLLOW):
1. Return ONLY valid JSON - NO markdown, NO code blocks, NO explanations, ONLY JSON
2. Extract EVERY single product/item line visible on the invoice
3. SKIP: Header rows, subtotals, taxes, totals, shipping fees - ONLY line items
4. For multi-line descriptions: Combine into ONE complete description string
5. For ambiguous quantities: Use context clues (e.g., "box of 12" = qty 12)
6. For missing prices: Mark as null, NOT zero
7. Double-check all numeric values for accuracy
8. Look for SKU, Product Code, Part Number in EVERY line
9. Detect and normalize currency type from symbols (R=ZAR, $=USD, €=EUR, £=GBP, etc)

ACCURACY CONFIDENCE SCORING:
- 100: Perfect extraction, all values verified
- 90-99: Very good, minor formatting issues
- 80-89: Good, some values unclear but best interpretation
- 70-79: Acceptable, some fields missing or ambiguous
- Below 70: Flag for manual review

JSON OUTPUT STRUCTURE (ONLY THIS FORMAT):
{
  "metadata": {
    "invoiceNumber": "Extract exactly as written or null",
    "invoiceDate": "YYYY-MM-DD format or null",
    "supplierName": "Full company name or null",
    "supplierCode": "Supplier code/ID or null",
    "currency": "ZAR|USD|EUR|GBP or null",
    "subtotal": number or null,
    "tax": number or null,
    "total": number or null
  },
  "lineItems": [
    {
      "description": "COMPLETE product name/description - include all details",
      "quantity": number (must be > 0),
      "unitPrice": number or null,
      "lineTotal": number or null,
      "sku": "Product SKU/code or null",
      "partNumber": "Part number or null"
    }
  ],
  "confidence": {
    "overall": 0-100,
    "itemExtraction": 0-100,
    "metadataExtraction": 0-100
  },
  "issues": ["List any OCR problems, ambiguities, or suspected OCR errors"]
}

VALIDATION RULES (APPLY THESE):
- lineTotal should equal quantity × unitPrice (flag if it doesn't match)
- quantity must be >= 1
- If any value seems wrong, flag it in "issues"
- If invoice is damaged/hard to read, lower confidence scores
- If text is cut off, make your best interpretation and flag in issues

RETURN IMMEDIATELY: Just the JSON object, nothing else.`;

      console.log('📸 Sending image to Gemini 1.5 Flash for analysis...');

      // Call Gemini API with image and extraction prompt
      const response = await model.generateContent([
        {
          inlineData: {
            data: imageBase64,
            mimeType: 'image/jpeg',
          },
        },
        extractionPrompt,
      ]);

      const responseText = response.response.text();

      console.log('✅ Gemini response received');
      console.log('📄 Response length:', responseText.length);

      // Parse JSON response with multiple fallback strategies
      let extractedData: ExtractionResult;
      try {
        // Remove markdown code blocks if present
        let cleanedResponse = responseText
          .replace(/```json\n?/g, '')
          .replace(/```\n?/g, '')
          .trim();

        // Try to extract JSON object
        const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          console.error('❌ No JSON found in response:', responseText.substring(0, 500));
          throw new Error('No JSON found in Gemini response');
        }

        extractedData = JSON.parse(jsonMatch[0]) as ExtractionResult;
        console.log('✅ Successfully parsed JSON');
      } catch (parseError) {
        console.error('❌ Failed to parse Gemini response');
        console.error('Response preview:', responseText.substring(0, 500));
        throw new functions.https.HttpsError(
          'invalid-argument',
          `Failed to parse invoice data: ${parseError instanceof Error ? parseError.message : String(parseError)}`
        );
      }

      // Validate and normalize extracted data
      if (!extractedData.lineItems || !Array.isArray(extractedData.lineItems)) {
        console.warn('⚠️ No line items found in response');
        extractedData.lineItems = [];
      }

      if (!extractedData.metadata) {
        extractedData.metadata = {};
      }

      if (!extractedData.confidence) {
        extractedData.confidence = {
          overall: 50,
          itemExtraction: 50,
          metadataExtraction: 50,
        };
      }

      // Normalize line items
      extractedData.lineItems = extractedData.lineItems.map(item => ({
        description: item.description || 'Unknown Item',
        quantity: item.quantity || 1,
        unitPrice: item.unitPrice || 0,
        lineTotal: item.lineTotal || (item.quantity || 1) * (item.unitPrice || 0),
        sku: item.sku || undefined,
        partNumber: item.partNumber || undefined,
      }));

      console.log(`✅ Successfully extracted ${extractedData.lineItems.length} line items`);
      console.log('📊 Confidence:', extractedData.confidence);

      return {
        success: true,
        itemCount: extractedData.lineItems.length,
        items: extractedData.lineItems,
        metadata: extractedData.metadata,
        confidence: extractedData.confidence,
        issues: extractedData.issues || [],
      };
    } catch (error) {
      console.error('❌ Error in processInvoiceOCR:', error);

      if (error instanceof functions.https.HttpsError) {
        throw error;
      }

      throw new functions.https.HttpsError(
        'internal',
        `Invoice processing failed: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  });
