import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Chip,
} from '@mui/material';
import { Plus, MoreVertical, Copy, Edit, Trash2, Star } from 'lucide-react';
import { useTemplateStore, InvoiceTemplate } from '../store/templateStore';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export const Templates: React.FC = () => {
  const navigate = useNavigate();
  const { templates, loadTemplates, deleteTemplate, duplicateTemplate, setDefaultTemplate } = useTemplateStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<InvoiceTemplate | null>(null);

  useEffect(() => {
    loadTemplates();
  }, [loadTemplates]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, template: InvoiceTemplate) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedTemplate(template);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTemplate(null);
  };

  const handleEdit = () => {
    if (selectedTemplate) {
      navigate(`/sales/templates/edit/${selectedTemplate.id}`);
    }
    handleMenuClose();
  };

  const handleDuplicate = () => {
    if (selectedTemplate) {
      duplicateTemplate(selectedTemplate.id);
    }
    handleMenuClose();
  };

  const handleDelete = () => {
    if (selectedTemplate && window.confirm('Are you sure you want to delete this template?')) {
      deleteTemplate(selectedTemplate.id);
    }
    handleMenuClose();
  };

  const handleSetDefault = () => {
    if (selectedTemplate) {
      setDefaultTemplate(selectedTemplate.id);
    }
    handleMenuClose();
  };

  const handleNewTemplate = () => {
    navigate('/sales/templates/new');
  };

  const getFormTypeLabel = (type: string) => {
    switch (type) {
      case 'invoice':
        return 'Invoice';
      case 'quotation':
        return 'Quotation';
      case 'receipt':
        return 'Sales Receipt';
      default:
        return type;
    }
  };

  const getFormTypeColor = (type: string): "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" => {
    switch (type) {
      case 'invoice':
        return 'primary';
      case 'quotation':
        return 'info';
      case 'receipt':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
            Custom form styles
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your document templates
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Plus size={18} />}
          onClick={handleNewTemplate}
        >
          New template
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'grey.50' }}>
              <TableCell sx={{ fontWeight: 600 }}>NAME</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>FORM TYPE</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>LAST EDITED</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>STATUS</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {templates.map((template) => (
              <TableRow
                key={template.id}
                sx={{
                  '&:hover': {
                    backgroundColor: 'grey.50',
                    cursor: 'pointer',
                  },
                }}
                onClick={() => navigate(`/sales/templates/edit/${template.id}`)}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {template.isDefault && <Star size={16} fill="gold" color="gold" />}
                    <Typography variant="body2">{template.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getFormTypeLabel(template.type)}
                    size="small"
                    color={getFormTypeColor(template.type)}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {template.updatedAt ? format(new Date(template.updatedAt), 'MMM d, yyyy') : 'Never'}
                  </Typography>
                </TableCell>
                <TableCell>
                  {template.isDefault ? (
                    <Chip label="Default" size="small" color="success" variant="outlined" />
                  ) : (
                    <Chip label="Custom" size="small" variant="outlined" />
                  )}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, template)}
                  >
                    <MoreVertical size={18} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {templates.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                  <Typography variant="body1" color="text.secondary">
                    No templates yet. Create your first template to get started.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>
          <Edit size={16} style={{ marginRight: '8px' }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDuplicate}>
          <Copy size={16} style={{ marginRight: '8px' }} />
          Duplicate
        </MenuItem>
        {!selectedTemplate?.isDefault && (
          <MenuItem onClick={handleSetDefault}>
            <Star size={16} style={{ marginRight: '8px' }} />
            Set as Default
          </MenuItem>
        )}
        {!selectedTemplate?.isDefault && (
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <Trash2 size={16} style={{ marginRight: '8px' }} />
            Delete
          </MenuItem>
        )}
      </Menu>
    </Container>
  );
};
