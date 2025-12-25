import { Invoice, QuotationItem, Currency } from '../types';
import { formatCurrencyWithCurrency } from '../utils/helpers';

export interface EmailOptions {
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  html: string;
}

class EmailService {
  /**
   * Generate HTML email template for invoice
   */
  generateInvoiceEmailHTML(invoice: Invoice, currency: Currency): string {
    const itemsHTML = invoice.items
      .map((item: QuotationItem) => `
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px; text-align: left;">${item.productName}</td>
          <td style="padding: 12px; text-align: center;">${item.quantity}</td>
          <td style="padding: 12px; text-align: right;">${formatCurrencyWithCurrency(item.price, currency)}</td>
          <td style="padding: 12px; text-align: right; font-weight: bold;">${formatCurrencyWithCurrency(item.total, currency)}</td>
        </tr>
      `).join('');

    const dueDate = new Date(invoice.dueDate).toLocaleDateString();
    const invoiceDate = new Date(invoice.createdAt).toLocaleDateString();

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice ${invoice.invoiceNumber}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 28px;">INVOICE</h1>
        <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">${invoice.invoiceNumber}</p>
    </div>
    
    <div style="background: white; padding: 30px; border: 1px solid #ddd; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
            <div>
                <h2 style="margin: 0 0 15px 0; color: #667eea;">Bill To:</h2>
                <p style="margin: 0; font-size: 16px; font-weight: bold;">${invoice.customerName}</p>
                ${invoice.customerEmail ? `<p style="margin: 5px 0 0 0; color: #666;">${invoice.customerEmail}</p>` : ''}
                ${invoice.customerPhone ? `<p style="margin: 5px 0 0 0; color: #666;">${invoice.customerPhone}</p>` : ''}
            </div>
            <div style="text-align: right;">
                <p style="margin: 0; color: #666;"><strong>Invoice Date:</strong> ${invoiceDate}</p>
                <p style="margin: 5px 0 0 0; color: #666;"><strong>Due Date:</strong> ${dueDate}</p>
                <p style="margin: 15px 0 0 0; font-size: 18px;">
                    <strong>Amount Due: 
                        <span style="color: ${invoice.balanceDue > 0 ? '#e74c3c' : '#27ae60'};">
                            ${formatCurrencyWithCurrency(invoice.balanceDue, currency)}
                        </span>
                    </strong>
                </p>
            </div>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
                <tr style="background-color: #f8f9fa;">
                    <th style="padding: 15px; text-align: left; border-bottom: 2px solid #667eea; color: #667eea;">Item</th>
                    <th style="padding: 15px; text-align: center; border-bottom: 2px solid #667eea; color: #667eea;">Qty</th>
                    <th style="padding: 15px; text-align: right; border-bottom: 2px solid #667eea; color: #667eea;">Price</th>
                    <th style="padding: 15px; text-align: right; border-bottom: 2px solid #667eea; color: #667eea;">Total</th>
                </tr>
            </thead>
            <tbody>
                ${itemsHTML}
            </tbody>
        </table>

        <div style="margin-top: 30px; text-align: right;">
            <table style="margin-left: auto; min-width: 300px;">
                <tr>
                    <td style="padding: 8px 20px 8px 0; text-align: right; color: #666;">Subtotal:</td>
                    <td style="padding: 8px 0; text-align: right; font-weight: bold;">${formatCurrencyWithCurrency(invoice.subtotal, currency)}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 20px 8px 0; text-align: right; color: #666;">Tax:</td>
                    <td style="padding: 8px 0; text-align: right; font-weight: bold;">${formatCurrencyWithCurrency(invoice.tax, currency)}</td>
                </tr>
                <tr style="border-top: 2px solid #667eea;">
                    <td style="padding: 15px 20px 15px 0; text-align: right; font-size: 18px; font-weight: bold; color: #667eea;">TOTAL:</td>
                    <td style="padding: 15px 0; text-align: right; font-size: 18px; font-weight: bold; color: #667eea;">${formatCurrencyWithCurrency(invoice.total, currency)}</td>
                </tr>
                ${invoice.amountPaid > 0 ? `
                <tr>
                    <td style="padding: 8px 20px 8px 0; text-align: right; color: #27ae60;">Amount Paid:</td>
                    <td style="padding: 8px 0; text-align: right; font-weight: bold; color: #27ae60;">-${formatCurrencyWithCurrency(invoice.amountPaid, currency)}</td>
                </tr>
                <tr style="border-top: 1px solid #ddd;">
                    <td style="padding: 15px 20px 15px 0; text-align: right; font-size: 16px; font-weight: bold; color: ${invoice.balanceDue > 0 ? '#e74c3c' : '#27ae60'};">Balance Due:</td>
                    <td style="padding: 15px 0; text-align: right; font-size: 16px; font-weight: bold; color: ${invoice.balanceDue > 0 ? '#e74c3c' : '#27ae60'};">${formatCurrencyWithCurrency(invoice.balanceDue, currency)}</td>
                </tr>
                ` : ''}
            </table>
        </div>

        ${invoice.notes ? `
        <div style="margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 8px; border-left: 4px solid #667eea;">
            <h3 style="margin: 0 0 10px 0; color: #667eea;">Notes:</h3>
            <p style="margin: 0; color: #666; line-height: 1.6;">${invoice.notes}</p>
        </div>
        ` : ''}

        <div style="margin-top: 30px; text-align: center; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
                Thank you for your business! If you have any questions about this invoice, please contact us.
            </p>
            <div style="margin-top: 15px;">
                ${invoice.balanceDue > 0 ? `
                <p style="margin: 0; padding: 10px; background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 4px; color: #856404; font-weight: bold;">
                    ⚠️ Payment due by ${dueDate}
                </p>
                ` : `
                <p style="margin: 0; padding: 10px; background-color: #d4edda; border: 1px solid #c3e6cb; border-radius: 4px; color: #155724; font-weight: bold;">
                    ✅ This invoice has been paid in full
                </p>
                `}
            </div>
        </div>
    </div>
</body>
</html>`;
  }

  /**
   * Generate email subject for invoice
   */
  generateInvoiceSubject(invoice: Invoice): string {
    const status = invoice.balanceDue > 0 ? 'Payment Due' : 'Paid Invoice';
    return `Invoice ${invoice.invoiceNumber} - ${status} - ${invoice.customerName}`;
  }

  /**
   * Send email using mailto (opens default email client)
   */
  sendEmailViaClient(emailOptions: EmailOptions): void {
    const { to, cc, bcc, subject, html } = emailOptions;
    
    // Convert HTML to plain text for mailto (basic conversion)
    const plainText = html
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n')
      .replace(/<\/div>/gi, '\n')
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .trim();

    let mailtoUrl = `mailto:${to.join(',')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(plainText)}`;
    
    if (cc && cc.length > 0) {
      mailtoUrl += `&cc=${encodeURIComponent(cc.join(','))}`;
    }
    
    if (bcc && bcc.length > 0) {
      mailtoUrl += `&bcc=${encodeURIComponent(bcc.join(','))}`;
    }

    window.location.href = mailtoUrl;
  }

  /**
   * Copy email content to clipboard
   */
  async copyEmailContent(invoice: Invoice, currency: Currency): Promise<boolean> {
    try {
      const subject = this.generateInvoiceSubject(invoice);
      const html = this.generateInvoiceEmailHTML(invoice, currency);
      
      // Convert HTML to plain text for copying
      const plainText = html
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/p>/gi, '\n')
        .replace(/<\/div>/gi, '\n')
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .trim();

      const emailContent = `Subject: ${subject}\n\n${plainText}`;
      
      await navigator.clipboard.writeText(emailContent);
      return true;
    } catch (error) {
      console.error('Failed to copy email content:', error);
      return false;
    }
  }

  /**
   * Validate email address
   */
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }

  /**
   * Parse multiple email addresses from string
   */
  parseEmailList(emailString: string): string[] {
    if (!emailString || !emailString.trim()) return [];
    
    return emailString
      .split(/[,;]/)
      .map(email => email.trim())
      .filter(email => email && this.isValidEmail(email));
  }
}

export const emailService = new EmailService();