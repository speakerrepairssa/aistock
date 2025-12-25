# Gemini OCR Quick Start Guide

## What's New?

Your OCR invoice scanner now uses **Google Gemini Vision AI** for automatic, intelligent invoice processing!

## Key Features

✨ **Automatic Extraction** - Upload and extract in one step  
🎯 **High Accuracy** - AI understands context and layout  
📊 **Invoice Metadata** - Automatically detects supplier, date, totals  
🔄 **Smart Matching** - Auto-matches products by name/SKU  
💯 **Confidence Scores** - Know how reliable each extraction is  

## How to Use

### Step 1: Upload Invoice
Click "Upload Invoice" or "Take Photo" on the OCR Scanner page

### Step 2: Wait for Magic ✨
Gemini automatically:
- Reads all text from the invoice
- Extracts line items (qty, description, price)
- Finds invoice metadata (number, date, supplier)
- Matches products with your inventory
- Calculates confidence scores

### Step 3: Review & Apply
- Check matched items (green chips)
- Fix unmatched items (yellow chips)
- Adjust quantities or prices if needed
- Click "Apply Updates" to save

## Tips for Best Results

📸 **Good Image Quality**
- Clear, well-lit photos
- All text visible
- No blurry or cut-off sections

📋 **Product Matching**
- Keep SKU/Stock Codes updated
- Use consistent product names
- Add supplier codes when possible

## Troubleshooting

**No items extracted?**
- Check image quality
- Ensure invoice has clear line items
- Try a different photo angle

**Low confidence scores?**
- Retake photo with better lighting
- Ensure text is clear and readable
- Check for wrinkles or shadows

**Wrong product matches?**
- Manually select correct product
- Update product SKU/codes for future use
- Names should match supplier descriptions

## Under the Hood

**Technology Stack:**
- Google Gemini 1.5 Flash Vision
- Firebase Cloud Functions
- Vertex AI API
- Intelligent fuzzy matching

**Processing Time:**
- Typical: 5-15 seconds
- Large invoices: up to 30 seconds
- Maximum: 9 minutes (timeout)

## Support

Having issues? Check:
1. Internet connection
2. Firebase authentication
3. Image file size (<10MB)
4. Cloud Function logs (if admin)

---

**Happy Scanning! 🚀**
