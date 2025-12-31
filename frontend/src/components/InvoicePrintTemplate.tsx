import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Divider } from '@mui/material';
import { Invoice } from '../types';

interface InvoicePrintTemplateProps {
  invoice: Invoice;
  companyInfo?: {
    name: string;
    address: string;
    phone: string;
    email: string;
    taxNumber?: string;
    logo?: string;
  };
}

export const InvoicePrintTemplate: React.FC<InvoicePrintTemplateProps> = ({ invoice, companyInfo }) => {
  const defaultCompany = {
    name: 'AiStock',
    address: '123 Business Street, City, Country',
    phone: '+27 123 456 789',
    email: 'info@aistock.com',
  };

  const company = companyInfo || defaultCompany;

  return (
    <Box
      sx={{
        display: 'none',
        '@media print': {
          display: 'block',
          padding: '20mm',
          width: '210mm',
          minHeight: '297mm',
          backgroundColor: 'white',
          color: 'black',
          fontSize: '10pt',
        },
      }}
      className="invoice-print-template"
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Box>
          {(company as any).logo && (
            <img src={(company as any).logo} alt={company.name} style={{ maxWidth: '150px', marginBottom: '10px' }} />
          )}
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976d2', mb: 1 }}>
            {company.name}
          </Typography>
          <Typography variant="body2">{company.address}</Typography>
          <Typography variant="body2">Phone: {company.phone}</Typography>
          <Typography variant="body2">Email: {company.email}</Typography>
          {(company as any).taxNumber && <Typography variant="body2">Tax No: {(company as any).taxNumber}</Typography>}
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: '#1976d2', mb: 2 }}>
            INVOICE
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            <strong>Invoice No:</strong> {invoice.invoiceNumber}
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            <strong>Date:</strong> {new Date(invoice.createdAt).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            <strong>Due Date:</strong> {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Status:</strong> {invoice.status.toUpperCase()}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Bill To Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          Bill To:
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          {invoice.customerName}
        </Typography>
        {/* Add more customer details if available */}
      </Box>

      {/* Items Table */}
      <Table sx={{ mb: 4, '& td, & th': { border: '1px solid #ddd', padding: '8px' } }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
            <TableCell sx={{ fontWeight: 600 }}>#</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Item Description</TableCell>
            <TableCell align="right" sx={{ fontWeight: 600 }}>Quantity</TableCell>
            <TableCell align="right" sx={{ fontWeight: 600 }}>Unit Price</TableCell>
            <TableCell align="right" sx={{ fontWeight: 600 }}>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoice.items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {item.productName}
                </Typography>
                {item.description && (
                  <Typography variant="caption" color="text.secondary">
                    {item.description}
                  </Typography>
                )}
              </TableCell>
              <TableCell align="right">{item.quantity}</TableCell>
              <TableCell align="right">R{item.price.toFixed(2)}</TableCell>
              <TableCell align="right">R{item.total.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Totals Section */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
        <Box sx={{ minWidth: '300px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">Subtotal:</Typography>
            <Typography variant="body2">R{invoice.subtotal.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">Tax (15%):</Typography>
            <Typography variant="body2">R{invoice.tax.toFixed(2)}</Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Total:
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              R{invoice.total.toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Notes Section */}
      {invoice.notes && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Notes:
          </Typography>
          <Typography variant="body2">{invoice.notes}</Typography>
        </Box>
      )}

      {/* Footer */}
      <Box sx={{ mt: 6, pt: 3, borderTop: '1px solid #ddd', textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Thank you for your business!
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Payment terms: {invoice.dueDate ? 'Due by ' + new Date(invoice.dueDate).toLocaleDateString() : 'Due on receipt'}
        </Typography>
      </Box>

      {/* Page Break for multiple pages */}
      <style>
        {`
          @media print {
            @page {
              size: A4;
              margin: 15mm;
            }
            .invoice-print-template {
              page-break-after: always;
            }
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
        `}
      </style>
    </Box>
  );
};
