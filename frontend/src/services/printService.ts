import { Invoice, QuotationItem, Currency } from '../types';
import { formatCurrencyWithCurrency } from '../utils/helpers';

export interface PrintOptions {
  includeHeader?: boolean;
  includeFooter?: boolean;
  paperSize?: 'A4' | 'Letter' | 'A5';
  orientation?: 'portrait' | 'landscape';
  margins?: {
    top: string;
    right: string;
    bottom: string;
    left: string;
  };
}

class PrintService {
  /**
   * Generate printable HTML for invoice
   */
  generatePrintableHTML(invoice: Invoice, currency: Currency, options: PrintOptions = {}): string {
    const {
      includeHeader = true,
      includeFooter = true,
      paperSize = 'A4',
      orientation = 'portrait',
      margins = { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' }
    } = options;

    const itemsHTML = invoice.items
      .map((item: QuotationItem) => `
        <tr>
          <td class="item-name">${item.productName}</td>
          <td class="item-qty">${item.quantity}</td>
          <td class="item-price">${formatCurrencyWithCurrency(item.price, currency)}</td>
          <td class="item-total">${formatCurrencyWithCurrency(item.total, currency)}</td>
        </tr>
      `).join('');

    const dueDate = new Date(invoice.dueDate).toLocaleDateString();
    const invoiceDate = new Date(invoice.createdAt).toLocaleDateString();

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Invoice ${invoice.invoiceNumber}</title>
    <style>
        @media print {
            @page {
                size: ${paperSize} ${orientation};
                margin: ${margins.top} ${margins.right} ${margins.bottom} ${margins.left};
            }
            
            body {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
            }
            
            .no-print {
                display: none !important;
            }
            
            .page-break {
                page-break-before: always;
            }
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Arial, sans-serif;
            font-size: 12pt;
            line-height: 1.4;
            color: #333;
        }
        
        .invoice-container {
            max-width: 100%;
            margin: 0 auto;
            background: white;
        }
        
        .invoice-header {
            background: #667eea;
            color: white;
            padding: 20px;
            text-align: center;
            margin-bottom: 20px;
        }
        
        .invoice-title {
            font-size: 24pt;
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .invoice-number {
            font-size: 14pt;
            opacity: 0.9;
        }
        
        .invoice-details {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
            gap: 20px;
        }
        
        .bill-to, .invoice-info {
            flex: 1;
        }
        
        .section-title {
            font-size: 14pt;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 10px;
        }
        
        .customer-name {
            font-size: 13pt;
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .customer-info {
            color: #666;
            margin-bottom: 3px;
        }
        
        .invoice-info {
            text-align: right;
        }
        
        .info-row {
            margin-bottom: 5px;
        }
        
        .amount-due {
            font-size: 16pt;
            font-weight: bold;
            color: #e74c3c;
            margin-top: 15px;
            padding: 10px;
            border: 2px solid #e74c3c;
            border-radius: 5px;
        }
        
        .amount-due.paid {
            color: #27ae60;
            border-color: #27ae60;
        }
        
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        
        .items-table th {
            background-color: #f8f9fa;
            padding: 12px;
            text-align: left;
            border-bottom: 2px solid #667eea;
            color: #667eea;
            font-weight: bold;
        }
        
        .items-table th.text-center,
        .items-table td.item-qty {
            text-align: center;
        }
        
        .items-table th.text-right,
        .items-table td.item-price,
        .items-table td.item-total {
            text-align: right;
        }
        
        .items-table td {
            padding: 10px 12px;
            border-bottom: 1px solid #eee;
        }
        
        .items-table tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        
        .totals-section {
            margin-top: 30px;
            text-align: right;
        }
        
        .totals-table {
            margin-left: auto;
            min-width: 300px;
        }
        
        .totals-table td {
            padding: 8px 20px 8px 0;
        }
        
        .totals-table td:last-child {
            padding-right: 0;
            text-align: right;
            font-weight: bold;
        }
        
        .total-row {
            border-top: 2px solid #667eea;
        }
        
        .total-row td {
            padding: 15px 20px 15px 0;
            font-size: 14pt;
            font-weight: bold;
            color: #667eea;
        }
        
        .total-row td:last-child {
            padding-right: 0;
        }
        
        .payment-info {
            border-top: 1px solid #ddd;
            color: #27ae60;
        }
        
        .balance-due {
            color: #e74c3c;
        }
        
        .balance-due.paid {
            color: #27ae60;
        }
        
        .notes-section {
            margin-top: 30px;
            padding: 20px;
            background-color: #f8f9fa;
            border-left: 4px solid #667eea;
        }
        
        .notes-title {
            color: #667eea;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .footer-section {
            margin-top: 30px;
            text-align: center;
            padding: 20px;
            background-color: #f8f9fa;
            color: #666;
            font-size: 10pt;
        }
        
        .payment-status {
            margin-top: 20px;
            padding: 15px;
            border-radius: 5px;
            font-weight: bold;
            text-align: center;
        }
        
        .payment-status.unpaid {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            color: #856404;
        }
        
        .payment-status.paid {
            background-color: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
        }
        
        .print-controls {
            margin: 20px 0;
            text-align: center;
            gap: 10px;
        }
        
        .print-button {
            background: #667eea;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 12pt;
            margin: 0 10px;
        }
        
        .print-button:hover {
            background: #5a6fd8;
        }
        
        .print-button.secondary {
            background: #6c757d;
        }
        
        .print-button.secondary:hover {
            background: #5a6268;
        }
    </style>
</head>
<body>
    <div class="print-controls no-print">
        <button class="print-button" onclick="window.print()">🖨️ Print Invoice</button>
        <button class="print-button secondary" onclick="window.close()">✕ Close</button>
    </div>
    
    <div class="invoice-container">
        ${includeHeader ? `
        <div class="invoice-header">
            <div class="invoice-title">INVOICE</div>
            <div class="invoice-number">${invoice.invoiceNumber}</div>
        </div>
        ` : ''}
        
        <div class="invoice-details">
            <div class="bill-to">
                <div class="section-title">Bill To:</div>
                <div class="customer-name">${invoice.customerName}</div>
                ${invoice.customerEmail ? `<div class="customer-info">${invoice.customerEmail}</div>` : ''}
                ${invoice.customerPhone ? `<div class="customer-info">${invoice.customerPhone}</div>` : ''}
            </div>
            
            <div class="invoice-info">
                <div class="info-row"><strong>Invoice Date:</strong> ${invoiceDate}</div>
                <div class="info-row"><strong>Due Date:</strong> ${dueDate}</div>
                <div class="amount-due ${invoice.balanceDue <= 0 ? 'paid' : ''}">
                    Amount Due: ${formatCurrencyWithCurrency(invoice.balanceDue, currency)}
                </div>
            </div>
        </div>

        <table class="items-table">
            <thead>
                <tr>
                    <th>Item</th>
                    <th class="text-center">Qty</th>
                    <th class="text-right">Price</th>
                    <th class="text-right">Total</th>
                </tr>
            </thead>
            <tbody>
                ${itemsHTML}
            </tbody>
        </table>

        <div class="totals-section">
            <table class="totals-table">
                <tr>
                    <td>Subtotal:</td>
                    <td>${formatCurrencyWithCurrency(invoice.subtotal, currency)}</td>
                </tr>
                <tr>
                    <td>Tax:</td>
                    <td>${formatCurrencyWithCurrency(invoice.tax, currency)}</td>
                </tr>
                <tr class="total-row">
                    <td>TOTAL:</td>
                    <td>${formatCurrencyWithCurrency(invoice.total, currency)}</td>
                </tr>
                ${invoice.amountPaid > 0 ? `
                <tr class="payment-info">
                    <td>Amount Paid:</td>
                    <td>-${formatCurrencyWithCurrency(invoice.amountPaid, currency)}</td>
                </tr>
                <tr class="balance-due ${invoice.balanceDue <= 0 ? 'paid' : ''}">
                    <td>Balance Due:</td>
                    <td>${formatCurrencyWithCurrency(invoice.balanceDue, currency)}</td>
                </tr>
                ` : ''}
            </table>
        </div>

        ${invoice.notes ? `
        <div class="notes-section">
            <div class="notes-title">Notes:</div>
            <div>${invoice.notes}</div>
        </div>
        ` : ''}

        <div class="payment-status ${invoice.balanceDue > 0 ? 'unpaid' : 'paid'}">
            ${invoice.balanceDue > 0 ? 
                `⚠️ Payment due by ${dueDate}` : 
                '✅ This invoice has been paid in full'
            }
        </div>

        ${includeFooter ? `
        <div class="footer-section">
            Thank you for your business!<br>
            If you have any questions about this invoice, please contact us.
        </div>
        ` : ''}
    </div>
</body>
</html>`;
  }

  /**
   * Print invoice - opens print dialog
   */
  printInvoice(invoice: Invoice, currency: Currency, options: PrintOptions = {}): void {
    const printHTML = this.generatePrintableHTML(invoice, currency, options);
    
    // Create a new window for printing
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    
    if (printWindow) {
      printWindow.document.write(printHTML);
      printWindow.document.close();
      
      // Wait for content to load, then focus and print
      printWindow.onload = () => {
        printWindow.focus();
        setTimeout(() => {
          printWindow.print();
        }, 250);
      };
    } else {
      // Fallback: create a temporary element and print
      const printElement = document.createElement('div');
      printElement.innerHTML = printHTML;
      printElement.style.position = 'fixed';
      printElement.style.top = '-9999px';
      printElement.style.left = '-9999px';
      
      document.body.appendChild(printElement);
      
      setTimeout(() => {
        window.print();
        document.body.removeChild(printElement);
      }, 100);
    }
  }

  /**
   * Generate PDF-ready content (for future PDF generation)
   */
  generatePDFContent(invoice: Invoice, currency: Currency): string {
    return this.generatePrintableHTML(invoice, currency, {
      includeHeader: true,
      includeFooter: true,
      paperSize: 'A4',
      orientation: 'portrait'
    });
  }

  /**
   * Save invoice as HTML file for printing
   */
  saveAsHTML(invoice: Invoice, currency: Currency, options: PrintOptions = {}): void {
    const htmlContent = this.generatePrintableHTML(invoice, currency, options);
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `Invoice_${invoice.invoiceNumber}.html`;
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }

  /**
   * Get print-optimized styles
   */
  getPrintStyles(): string {
    return `
      @media print {
        @page {
          margin: 20mm;
          size: A4 portrait;
        }
        
        body {
          font-size: 12pt;
          line-height: 1.3;
        }
        
        .no-print {
          display: none !important;
        }
        
        .page-break {
          page-break-before: always;
        }
        
        .avoid-break {
          page-break-inside: avoid;
        }
      }
    `;
  }
}

export const printService = new PrintService();