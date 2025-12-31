import { Invoice, QuotationItem, Currency } from '../types';
import { formatCurrencyWithCurrency } from '../utils/helpers';

export interface WhatsAppMessage {
  message: string;
  phone?: string;
}

class WhatsAppService {
  /**
   * Format invoice data into WhatsApp message
   */
  formatInvoiceMessage(invoice: Invoice, currency: Currency): string {
    const itemsList = invoice.items
      .map((item: QuotationItem, index: number) => 
        `${index + 1}. ${item.productName} - Qty: ${item.quantity} × ${formatCurrencyWithCurrency(item.price, currency)} = ${formatCurrencyWithCurrency(item.total, currency)}`
      )
      .join('\n');

    const dueDate = new Date(invoice.dueDate).toLocaleDateString();
    
    return `🧾 *INVOICE* - ${invoice.invoiceNumber}

👤 *Customer:* ${invoice.customerName}
📅 *Date:* ${new Date(invoice.createdAt).toLocaleDateString()}
📅 *Due Date:* ${dueDate}

📦 *Items:*
${itemsList}

💰 *Summary:*
Subtotal: ${formatCurrencyWithCurrency(invoice.subtotal, currency)}
Tax: ${formatCurrencyWithCurrency(invoice.tax, currency)}
*TOTAL: ${formatCurrencyWithCurrency(invoice.total, currency)}*

${invoice.balanceDue > 0 ? `💸 *Amount Due: ${formatCurrencyWithCurrency(invoice.balanceDue, currency)}*` : '✅ *PAID IN FULL*'}

${invoice.notes ? `📝 *Notes:* ${invoice.notes}` : ''}

Thank you for your business! 🙏`;
  }

  /**
   * Send invoice via WhatsApp Web
   * Opens WhatsApp Web with pre-filled message
   */
  sendInvoice(invoice: Invoice, currency: Currency, phoneNumber?: string): void {
    const message = this.formatInvoiceMessage(invoice, currency);
    const encodedMessage = encodeURIComponent(message);
    
    let whatsappUrl = '';
    
    if (phoneNumber && phoneNumber.trim()) {
      // Clean phone number (remove spaces, dashes, etc.)
      const cleanPhone = phoneNumber.replace(/\D/g, '');
      whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
    } else {
      // Open WhatsApp Web without specific contact
      whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    }
    
    window.open(whatsappUrl, '_blank');
  }

  /**
   * Copy invoice message to clipboard
   */
  async copyInvoiceMessage(invoice: Invoice, currency: Currency): Promise<boolean> {
    try {
      const message = this.formatInvoiceMessage(invoice, currency);
      await navigator.clipboard.writeText(message);
      return true;
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      return false;
    }
  }

  /**
   * Validate phone number format
   */
  isValidPhoneNumber(phone: string): boolean {
    if (!phone || !phone.trim()) return false;
    
    // Remove all non-digits
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Should be between 10-15 digits (international phone number standards)
    return cleanPhone.length >= 10 && cleanPhone.length <= 15;
  }

  /**
   * Format phone number for display
   */
  formatPhoneNumber(phone: string): string {
    if (!phone) return '';
    
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (cleanPhone.length === 10) {
      // US format: (123) 456-7890
      return `(${cleanPhone.slice(0, 3)}) ${cleanPhone.slice(3, 6)}-${cleanPhone.slice(6)}`;
    } else if (cleanPhone.length === 11 && cleanPhone.startsWith('1')) {
      // US with country code: +1 (123) 456-7890
      return `+1 (${cleanPhone.slice(1, 4)}) ${cleanPhone.slice(4, 7)}-${cleanPhone.slice(7)}`;
    }
    
    // International format: +XX XXX XXX XXXX
    return `+${cleanPhone}`;
  }
}

export const whatsappService = new WhatsAppService();