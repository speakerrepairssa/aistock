import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Grid,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
} from '@mui/material';
import { Plus, Trash2, CheckCircle, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useRepairStore } from '../store/repairStore';
import { useProducts } from '../hooks/useProducts';
import { useInvoiceStore } from '../store/invoiceStore';
import { useSettings } from '../hooks/useSettings';
import { formatCurrencyWithCurrency } from '../utils/helpers';
import { RepairJob, QuotationItem } from '../types';
import { clickupService } from '../services/clickupService';

export const Repair: React.FC = () => {
  const { user } = useAuth();
  const { repairJobs, fetchRepairJobs, createRepairJob, deleteRepairJob, addProductToJob, removeProductFromJob, completeRepairJob, updateRepairJob } = useRepairStore();
  const { products, fetchProducts, updateProductQuantity } = useProducts();
  const { createInvoice } = useInvoiceStore();
  const { currency, technicians, addTechnician, removeTechnician, integrations, addIntegration, updateIntegration, removeIntegration, formFields, addFormField, updateFormField, removeFormField, resetFormFields } = useSettings();

  const [searchTerm, setSearchTerm] = useState('');
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openCompleteDialog, setOpenCompleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openSettingsPanel, setOpenSettingsPanel] = useState(false);
  const [newTechnicianName, setNewTechnicianName] = useState('');
  const [selectedJobForComplete, setSelectedJobForComplete] = useState<RepairJob | null>(null);
  const [selectedJobForEdit, setSelectedJobForEdit] = useState<RepairJob | null>(null);
  const [createError, setCreateError] = useState<string | null>(null);
  const [selectedClickupTasksForJob, setSelectedClickupTasksForJob] = useState<any[]>([]);

  const [formData, setFormData] = useState<Record<string, any>>({
    jobNumber: '',
    clientName: '',
    itemDescription: '',
    technician: '',
  });

  const [draggedProduct, setDraggedProduct] = useState<QuotationItem | null>(null);
  const [showProducts, setShowProducts] = useState(true);
  const [showRepairCards, setShowRepairCards] = useState(true);
  const [showCompletedJobs, setShowCompletedJobs] = useState(true);
  const [showPutAsideJobs, setShowPutAsideJobs] = useState(true);
  const [noTileWarning, setNoTileWarning] = useState(false);
  const [openClickUpDialog, setOpenClickUpDialog] = useState(false);
  const [clickupTeamId, setClickupTeamId] = useState('');
  const [clickupTasks, setClickupTasks] = useState<any[]>([]);
  const [selectedClickupTasks, setSelectedClickupTasks] = useState<string[]>([]);
  const [loadingClickupTasks, setLoadingClickupTasks] = useState(false);
  const [newIntegrationName, setNewIntegrationName] = useState('');
  const [newIntegrationKey, setNewIntegrationKey] = useState('');
  const [showIntegrationForm, setShowIntegrationForm] = useState(false);
  const [clickupTasksFilter, setClickupTasksFilter] = useState('');
  const [currentJobNumberForClickup, setCurrentJobNumberForClickup] = useState('');
  const [newIntegrationTeamId, setNewIntegrationTeamId] = useState('');
  const [availableClickupTeams, setAvailableClickupTeams] = useState<any[]>([]);
  const [loadingClickupTeams, setLoadingClickupTeams] = useState(false);
  const [clickupTeamError, setClickupTeamError] = useState<string | null>(null);
  const [showFormFieldEditor, setShowFormFieldEditor] = useState(false);
  const [editingField, setEditingField] = useState<any | null>(null);
  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [newFieldType, setNewFieldType] = useState<'text' | 'textarea' | 'select' | 'number'>('text');
  const [editingCustomField, setEditingCustomField] = useState<{ jobId: string; fieldKey: string } | null>(null);
  const [customFieldEditValue, setCustomFieldEditValue] = useState('');
  const [expandedJobs, setExpandedJobs] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (user?.uid) {
      fetchRepairJobs(user.uid);
      fetchProducts();
    }
  }, [user?.uid, fetchRepairJobs, fetchProducts]);

  // Auto-fetch ClickUp tasks when job number is entered in dialog
  useEffect(() => {
    if (openClickUpDialog && currentJobNumberForClickup && clickupTasks.length === 0) {
      const clickupIntegration = integrations?.find(i => i.name === 'ClickUp');
      if (clickupIntegration?.enabled && clickupIntegration?.teamId) {
        // Auto-fetch when job number is available
        setClickupTeamId(clickupIntegration.teamId);
        handleFetchClickupTasks(clickupIntegration.teamId);
      }
    }
  }, [openClickUpDialog, currentJobNumberForClickup, integrations]);

  const handleCreateJob = async () => {
    setCreateError(null);

    // Validate required fields based on configuration
    for (const field of formFields.filter(f => f.required)) {
      const value = (formData as any)[field.key];
      if (!value || (typeof value === 'string' && !value.trim())) {
        setCreateError(`${field.label} is required`);
        return;
      }
    }

    if (!user?.uid) {
      setCreateError('User not authenticated');
      return;
    }

    try {
      console.log('Creating repair job with:', { ...formData, userId: user.uid });
      
      // Create the repair job
      const jobId = await createRepairJob(user.uid, formData.jobNumber, formData.clientName, formData.itemDescription, formData.technician);
      
      // Initialize custom fields for the job
      const customFieldsData: Record<string, any> = {};
      formFields.forEach((field) => {
        // Skip default fields
        if (!['jobNumber', 'clientName', 'itemDescription', 'technician'].includes(field.key)) {
          customFieldsData[field.key] = formData[field.key] || '';
        }
      });

      // Add custom fields to the job
      if (Object.keys(customFieldsData).length > 0) {
        await updateRepairJob(jobId, {
          customFields: customFieldsData,
        } as any);
      }
      
      // If tasks were selected from ClickUp, add them to the job
      if (selectedClickupTasksForJob.length > 0) {
        await updateRepairJob(jobId, {
          clickupTasks: selectedClickupTasksForJob,
        } as any);
        
        // Clear selected tasks after adding
        setSelectedClickupTasksForJob([]);
      }
      
      setFormData({ jobNumber: '', clientName: '', itemDescription: '', technician: '' });
      setSelectedClickupTasks([]);
      setClickupTasks([]);
      setClickupTeamId('');
      setOpenCreateDialog(false);
      setOpenClickUpDialog(false);
      setCreateError(null);
      await fetchRepairJobs(user.uid);
    } catch (error: any) {
      console.error('Error creating repair job:', error);
      setCreateError(error.message || 'Failed to create repair job. Please try again.');
    }
  };

  const handleResubmitJob = async () => {
    if (!selectedJobForComplete || !user?.uid) return;

    try {
      // Change status back to pending so it appears in the repair cards
      await updateRepairJob(
        selectedJobForComplete.id,
        {
          status: 'pending',
          completedDate: null as any,
          endDateTime: null as any,
        }
      );

      // Scroll to repair jobs section and expand it
      setShowRepairCards(true);
      setTimeout(() => {
        const repairSection = document.querySelector('[data-repair-section]');
        if (repairSection) {
          repairSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);

      setOpenCompleteDialog(false);
      setSelectedJobForComplete(null);
      await fetchRepairJobs(user.uid);
    } catch (error) {
      console.error('Error resubmitting job:', error);
      alert('Failed to resubmit job for editing: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };
  const handleFetchClickupTasks = async (teamId?: string) => {
    const teamIdToUse = teamId || clickupTeamId;
    
    if (!teamIdToUse.trim()) {
      alert('Please configure your ClickUp Team ID in Settings > Integrations');
      return;
    }

    setLoadingClickupTasks(true);
    try {
      const tasks = await clickupService.getTeamTasks(teamIdToUse);
      setClickupTasks(tasks);
      
      // Auto-select tasks matching the current job number
      if (currentJobNumberForClickup) {
        const matchingTaskIds = tasks
          .filter(task => task.jobNumber === currentJobNumberForClickup)
          .map(task => task.id);
        setSelectedClickupTasks(matchingTaskIds);
      } else {
        setSelectedClickupTasks([]);
      }
    } catch (error) {
      console.error('Error fetching ClickUp tasks:', error);
      alert('Failed to fetch ClickUp tasks. Check your Team ID and API key configuration.');
    } finally {
      setLoadingClickupTasks(false);
    }
  };

  // Validate ClickUp API key and fetch available teams
  const handleValidateClickupApiKey = async (apiKey: string) => {
    setLoadingClickupTeams(true);
    setClickupTeamError(null);
    try {
      const teams = await clickupService.validateAndGetTeams(apiKey);
      setAvailableClickupTeams(teams);
      if (teams.length === 0) {
        setClickupTeamError('No teams found. Verify your API key has team access.');
      }
    } catch (error: any) {
      console.error('Error validating ClickUp API key:', error);
      setClickupTeamError(error.message || 'Failed to validate API key');
      setAvailableClickupTeams([]);
    } finally {
      setLoadingClickupTeams(false);
    }
  };

  const handleDragStart = (product: any) => {
    const item: QuotationItem = {
      productId: product.id,
      productName: product.name,
      quantity: 1,
      price: product.price,
      total: product.price,
    };
    setDraggedProduct(item);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    (e.currentTarget as HTMLDivElement).style.backgroundColor = '#f0f0f0';
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLDivElement).style.backgroundColor = 'white';
  };

  const handleDropOnJob = async (e: React.DragEvent<HTMLDivElement>, jobId: string) => {
    e.preventDefault();
    (e.currentTarget as HTMLDivElement).style.backgroundColor = 'white';

    if (draggedProduct) {
      try {
        await addProductToJob(jobId, draggedProduct);
        setDraggedProduct(null);
      } catch (error) {
        console.error('Error adding product to job:', error);
      }
    }
  };

  // Handle dropping a repair job into put-aside zone
  const handleDropJobIntoPutAside = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLDivElement).style.backgroundColor = 'white';

    const jobId = e.dataTransfer.getData('jobId');
    if (jobId) {
      try {
        await updateRepairJob(jobId, { status: 'put-aside' });
      } catch (error) {
        console.error('Error moving job to put-aside:', error);
      }
    }
  };

  // Handle dropping a put-aside job back to active repair
  const handleDropJobBackToRepair = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLDivElement).style.backgroundColor = 'white';

    const jobId = e.dataTransfer.getData('jobId');
    if (jobId) {
      try {
        await updateRepairJob(jobId, { status: 'pending' });
      } catch (error) {
        console.error('Error moving job back to repair:', error);
      }
    }
  };

  // Analyze selected ClickUp tasks and extract relevant info for job form
  const handleAddClickupTasks = () => {
    if (selectedClickupTasks.length === 0) return;

    // Find the selected tasks
    const selectedTasks = clickupTasks.filter(t => selectedClickupTasks.includes(t.id));
    
    // Extract information from tasks and map to form fields
    if (selectedTasks.length > 0) {
      const firstTask = selectedTasks[0];
      const newFormData = { ...formData };
      
      // Build field mapping: look for fields that match common patterns
      // Track which form fields have been filled by custom field matching
      const filledByCustomField = new Set<string>();
      
      formFields.forEach((field) => {
        const fieldLowerCase = field.label.toLowerCase();
        const fieldNormalized = fieldLowerCase.replace(/\s+/g, '');
        
        // First priority: try to match against ClickUp custom fields
        if (firstTask.custom_fields && firstTask.custom_fields.length > 0) {
          // Search for matching custom field by name similarity
          let matchedCustomField: any = null;
          
          // Try exact match first (after normalizing spaces and case)
          matchedCustomField = firstTask.custom_fields.find((cf: any) => {
            const cfNormalized = cf.name.toLowerCase().replace(/\s+/g, '');
            return cfNormalized === fieldNormalized;
          });
          
          // If no exact match, try close matching
          if (!matchedCustomField) {
            matchedCustomField = firstTask.custom_fields.find((cf: any) => {
              const cfLower = cf.name.toLowerCase();
              const cfNormalized = cfLower.replace(/\s+/g, '');
              // More strict matching: either exact after normalization or very similar
              return cfNormalized === fieldNormalized || 
                     (cfLower.includes(fieldLowerCase) && fieldLowerCase.length > 4) ||
                     (fieldLowerCase.includes(cfLower) && cfLower.length > 4);
            });
          }
          
          if (matchedCustomField && matchedCustomField.value) {
            // Found a matching custom field - use its value
            let value = matchedCustomField.value;
            
            // Handle different value types
            if (typeof value === 'object' && value !== null) {
              // If it's an object, try to extract meaningful data
              if ('text' in value) {
                value = (value as any).text;
              } else if ('name' in value) {
                value = (value as any).name;
              } else {
                value = JSON.stringify(value);
              }
            }
            
            // Convert to appropriate type based on field type
            if (field.type === 'number' && typeof value === 'string') {
              const numValue = parseFloat(value);
              newFormData[field.key as keyof typeof formData] = (!isNaN(numValue) ? numValue : value) as any;
            } else {
              newFormData[field.key as keyof typeof formData] = String(value).substring(0, 500) as any;
            }
            
            filledByCustomField.add(field.key);
            return; // Skip further processing for this field
          }
        }
        
        // If not filled by custom field, apply fallback logic based on field label patterns
        // But avoid overwriting fields that should come from custom fields
        
        if (fieldLowerCase.includes('description') || fieldLowerCase.includes('item') || fieldLowerCase.includes('issue')) {
          // Map to item description - only use actual description content, not task name
          let description = '';
          
          // Prefer the actual task description if it exists
          if (firstTask.description) {
            description = firstTask.description
              .replace(/job\s*#?\s*\d+/gi, '')
              .replace(/\d+\/\d+\s*/gi, '')
              .trim();
          }
          
          // Only use task name if no description exists
          if (!description) {
            description = firstTask.name
              .replace(/job\s*#?\s*\d+/gi, '')
              .replace(/\d+\/\d+\s*/gi, '')
              .trim();
          }
          
          // Limit length
          if (description.length > 500) {
            description = description.substring(0, 500) + '...';
          }
          
          newFormData[field.key as keyof typeof formData] = description as any;
        }
        
        // Only use task name for title/subject fields, avoid matching "name" too broadly
        if ((fieldLowerCase.includes('title') || fieldLowerCase.includes('subject')) && 
            !fieldLowerCase.includes('client') && !fieldLowerCase.includes('contact')) {
          // Extract clean task name (without job number)
          const taskName = firstTask.name
            .replace(/job\s*#?\s*\d+/gi, '')
            .replace(/\d+\/\d+\s*/gi, '')
            .trim();
          newFormData[field.key as keyof typeof formData] = taskName as any;
        }
      });

      // Auto-fill the repair job form with extracted info
      setFormData(newFormData);

      // Store the selected ClickUp tasks for the job
      // This will be added to the job when it's created
      setSelectedClickupTasksForJob(selectedTasks.map(t => ({
        id: t.id,
        name: t.name,
        status: t.status?.status,
      })));

      // Show success feedback
      const taskCount = selectedTasks.length;
      console.log(`Added ${taskCount} task${taskCount !== 1 ? 's' : ''} and populated form`);
    }

    // Close dialog and reset
    setOpenClickUpDialog(false);
    setClickupTasksFilter('');
  };

  const handleCompleteJob = async () => {
    if (!selectedJobForComplete || !user?.uid) return;

    try {
      // Create invoice from repair job
      const invoiceId = await createInvoice(
        user.uid,
        selectedJobForComplete.clientName,
        selectedJobForComplete.products,
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        `Repair Job: ${selectedJobForComplete.jobNumber}`,
        undefined
      );

      // Calculate stock adjustments based on previous completion
      const previouslyCompleted = selectedJobForComplete.completedProducts || [];
      
      // Products to add back (were in previous, not in current)
      const productsToRemove = previouslyCompleted.filter(
        (prev) => !selectedJobForComplete.products.some((curr) => curr.productId === prev.productId)
      );

      // Products to deduct (are in current, weren't in previous OR quantity increased)
      const productsToAdd = selectedJobForComplete.products.map((curr) => {
        const prev = previouslyCompleted.find((p) => p.productId === curr.productId);
        if (!prev) {
          // New product, deduct full quantity
          return curr;
        } else if (curr.quantity > prev.quantity) {
          // Quantity increased, deduct only the difference
          return { ...curr, quantity: curr.quantity - prev.quantity };
        }
        return null; // No change or decreased, will be handled below
      }).filter((p): p is QuotationItem => p !== null);

      // Products with decreased quantity (add the difference back)
      const productsToAddBack = previouslyCompleted.map((prev) => {
        const curr = selectedJobForComplete.products.find((p) => p.productId === prev.productId);
        if (curr && curr.quantity < prev.quantity) {
          // Quantity decreased, add the difference back
          return { ...prev, quantity: prev.quantity - curr.quantity };
        }
        return null;
      }).filter((p): p is QuotationItem => p !== null);

      // Mark job as complete
      await completeRepairJob(selectedJobForComplete.id, user.uid, invoiceId);

      // Update repair job with completed products snapshot
      await updateRepairJob(selectedJobForComplete.id, {
        completedProducts: selectedJobForComplete.products,
      });

      // Adjust stock: remove products that were in previous completion
      for (const product of productsToRemove) {
        try {
          await updateProductQuantity(
            product.productId,
            product.quantity, // Positive to add back
            'Repair Job Edit - Product Removed',
            user.uid
          );
        } catch (error) {
          console.error(`Error adding back stock for product ${product.productId}:`, error);
        }
      }

      // Deduct new/increased products
      for (const product of productsToAdd) {
        try {
          await updateProductQuantity(
            product.productId,
            -product.quantity, // Negative to deduct
            'Repair Job Completion',
            user.uid
          );
        } catch (error) {
          console.error(`Error deducting stock for product ${product.productId}:`, error);
        }
      }

      // Add back decreased quantities
      for (const product of productsToAddBack) {
        try {
          await updateProductQuantity(
            product.productId,
            product.quantity, // Positive to add back
            'Repair Job Edit - Quantity Decreased',
            user.uid
          );
        } catch (error) {
          console.error(`Error adding back stock for product ${product.productId}:`, error);
        }
      }

      setOpenCompleteDialog(false);
      setSelectedJobForComplete(null);
      await fetchRepairJobs(user.uid);
    } catch (error) {
      console.error('Error completing job:', error);
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingJobs = repairJobs.filter((j) => j.status === 'pending' || j.status === 'in-progress');
  const putAsideJobs = repairJobs.filter((j) => j.status === 'put-aside');
  const completedJobs = repairJobs.filter((j) => j.status === 'completed');

  const getJobsToDisplay = (): (RepairJob | null)[] => {
    // Show first 4 jobs (pending + in-progress)
    const toDisplay: (RepairJob | null)[] = [...pendingJobs];
    // Fill remaining slots with empty placeholders
    while (toDisplay.length < 4) {
      toDisplay.push(null);
    }
    return toDisplay.slice(0, 4);
  };

  const getPutAsideJobsToDisplay = (): (RepairJob | null)[] => {
    // Show first 4 put-aside jobs
    const toDisplay: (RepairJob | null)[] = [...putAsideJobs];
    // Fill remaining slots with empty placeholders
    while (toDisplay.length < 4) {
      toDisplay.push(null);
    }
    return toDisplay.slice(0, 4);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Repair Dashboard
          </Typography>
          <Typography color="textSecondary">
            Manage repair jobs and assign products
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => setOpenSettingsPanel(true)}
          >
            Settings
          </Button>
          <Button
            variant="contained"
            startIcon={<Plus size={20} />}
            onClick={() => setOpenCreateDialog(true)}
          >
            New Repair Job
          </Button>
        </Box>
      </Box>

      {/* 4 Repair Job Bubbles */}
      <Box data-repair-section sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        mb: 2,
        p: 2,
        borderRadius: 2,
        backgroundColor: !showRepairCards ? '#7c3aed' : '#f3e8ff',
        transition: 'backgroundColor 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: !showRepairCards ? '#6d28d9' : '#ede9fe',
        }
      }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: !showRepairCards ? 'white' : '#5b21b6' }}>
          Repair Jobs ({pendingJobs.length})
        </Typography>
        <IconButton
          size="small"
          onClick={() => setShowRepairCards(!showRepairCards)}
          sx={{ p: 0.5, color: !showRepairCards ? 'white' : '#5b21b6' }}
        >
          {showRepairCards ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </IconButton>
      </Box>
      {showRepairCards && <Grid container spacing={2} sx={{ mb: 4 }}>
        {getJobsToDisplay().map((job, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            {job ? (
              <Card
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.effectAllowed = 'move';
                  e.dataTransfer.setData('jobId', job.id);
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDropOnJob(e, job.id)}
                sx={{
                  minHeight: 300,
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'grab',
                  border: '2px solid #667eea',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.2)',
                    backgroundColor: '#f0f4ff',
                  },
                  '&:active': {
                    cursor: 'grabbing',
                  }
                }}
              >
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 0.5 }}>
                        Job #
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#667eea' }}>
                        {job.jobNumber}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Chip label={job.status === 'pending' ? 'in progress' : job.status} size="small" color={job.status === 'pending' ? 'default' : 'primary'} />
                      <IconButton
                        size="small"
                        onClick={() => {
                          setExpandedJobs(prev => {
                            const newSet = new Set(prev);
                            if (newSet.has(job.id)) {
                              newSet.delete(job.id);
                            } else {
                              newSet.add(job.id);
                            }
                            return newSet;
                          });
                        }}
                        sx={{ p: 0.5 }}
                      >
                        {expandedJobs.has(job.id) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </IconButton>
                    </Box>
                  </Box>

                  {/* Always show Client and Item */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 0.5 }}>
                      Client
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {job.clientName}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 0.5 }}>
                      Item
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, display: '-webkit-box', WebkitLineClamp: expandedJobs.has(job.id) ? 'unset' : 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {job.itemDescription}
                    </Typography>
                  </Box>

                  {expandedJobs.has(job.id) && (
                    <>

                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 0.5 }}>
                          Technician
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: job.technician ? '#667eea' : '#999' }}>
                          {job.technician || 'Unassigned'}
                        </Typography>
                      </Box>

                      <Box sx={{ mb: 2, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                        <Box>
                          <Typography variant="caption" color="textSecondary" sx={{ mb: 0.5, display: 'block' }}>
                            Started
                          </Typography>
                          <Typography variant="caption" sx={{ fontWeight: 600 }}>
                            {job.startDateTime ? new Date(job.startDateTime).toLocaleString() : 'Not started'}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="textSecondary" sx={{ mb: 0.5, display: 'block' }}>
                            Completed
                          </Typography>
                          <Typography variant="caption" sx={{ fontWeight: 600, color: job.endDateTime ? '#4caf50' : '#999' }}>
                            {job.endDateTime ? new Date(job.endDateTime).toLocaleString() : 'Pending'}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Products in Job */}
                      <Box sx={{ mb: 2, flex: 1 }}>
                        <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
                          Products ({job.products.length})
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          {job.products.map((product, idx) => (
                            <Box
                              key={idx}
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                p: 1,
                                backgroundColor: '#f5f5f5',
                                borderRadius: 1,
                                fontSize: '0.75rem',
                              }}
                            >
                              <Box sx={{ flex: 1 }}>
                                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                  {product.productName}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                  Qty: {product.quantity}
                                </Typography>
                              </Box>
                              <IconButton
                                size="small"
                                onClick={() => removeProductFromJob(job.id, product.productId)}
                                sx={{ color: 'error.main' }}
                              >
                                <X size={14} />
                              </IconButton>
                            </Box>
                          ))}
                        </Box>
                      </Box>

                      {/* ClickUp Tasks */}
                      {job.clickupTasks && job.clickupTasks.length > 0 && (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
                            Tasks ({job.clickupTasks.length})
                          </Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            {job.clickupTasks.map((task, idx) => (
                              <Box
                                key={idx}
                            sx={{
                              p: 0.75,
                              backgroundColor: '#f0f4ff',
                              borderRadius: 1,
                              fontSize: '0.7rem',
                              borderLeft: '3px solid #667eea',
                            }}
                          >
                            <Typography variant="caption" sx={{ fontWeight: 600 }}>
                              {task.name}
                            </Typography>
                            {task.status && (
                              <Typography
                                variant="caption"
                                sx={{
                                  display: 'block',
                                  color: '#667eea',
                                  fontWeight: 500,
                                  mt: 0.25,
                                }}
                              >
                                {task.status}
                              </Typography>
                            )}
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  )}

                  {/* Custom Fields */}
                  {formFields.map((field) => {
                    // Skip the default form fields from display on card
                    const isDefaultField = ['jobNumber', 'clientName', 'itemDescription', 'technician'].includes(field.key);
                    if (isDefaultField) return null;

                    const fieldValue = job.customFields?.[field.key] || '';
                    const isEditing = editingCustomField?.jobId === job.id && editingCustomField?.fieldKey === field.key;

                    const handleStartEdit = () => {
                      setEditingCustomField({ jobId: job.id, fieldKey: field.key });
                      setCustomFieldEditValue(String(fieldValue));
                    };

                    const handleSaveCustomField = async () => {
                      try {
                        await updateRepairJob(job.id, {
                          customFields: {
                            ...(job.customFields || {}),
                            [field.key]: customFieldEditValue,
                          },
                        });
                        setEditingCustomField(null);
                      } catch (error) {
                        console.error('Error saving custom field:', error);
                      }
                    };

                    return (
                      <Box key={field.key} sx={{ mb: 2 }}>
                        {isEditing ? (
                          <Box>
                            {field.type === 'textarea' ? (
                              <TextField
                                fullWidth
                                multiline
                                rows={field.rows || 2}
                                value={customFieldEditValue}
                                onChange={(e) => setCustomFieldEditValue(e.target.value)}
                                placeholder={field.placeholder}
                                size="small"
                                sx={{ mb: 1 }}
                              />
                            ) : (
                              <TextField
                                fullWidth
                                value={customFieldEditValue}
                                onChange={(e) => setCustomFieldEditValue(e.target.value)}
                                placeholder={field.placeholder}
                                type={field.type === 'number' ? 'number' : 'text'}
                                size="small"
                                sx={{ mb: 1 }}
                              />
                            )}
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Button
                                size="small"
                                variant="contained"
                                onClick={handleSaveCustomField}
                                sx={{ flexGrow: 1 }}
                              >
                                Save
                              </Button>
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={() => setEditingCustomField(null)}
                              >
                                Cancel
                              </Button>
                            </Box>
                          </Box>
                        ) : (
                          <Box onClick={handleStartEdit} sx={{ cursor: 'pointer', p: 1, borderRadius: 1, '&:hover': { backgroundColor: '#f5f5f5' } }}>
                            <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 0.5 }}>
                              {field.label}
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600, minHeight: '20px' }}>
                              {fieldValue || <em style={{ color: '#999' }}>Click to fill</em>}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    );
                  })}

                  {/* Totals */}
                  <Box sx={{ borderTop: '1px solid #ddd', pt: 1, mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="caption" color="textSecondary">
                        Subtotal:
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        {formatCurrencyWithCurrency(job.subtotal, currency)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="caption" color="textSecondary">
                        Tax (10%):
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        {formatCurrencyWithCurrency(job.tax, currency)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ fontWeight: 700 }}>
                        Total:
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main' }}>
                        {formatCurrencyWithCurrency(job.total, currency)}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Action Buttons */}
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      fullWidth
                      onClick={() => {
                        setSelectedJobForEdit(job);
                        setOpenEditDialog(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      fullWidth
                      startIcon={<CheckCircle size={16} />}
                      onClick={() => {
                        setSelectedJobForComplete(job);
                        setOpenCompleteDialog(true);
                      }}
                      disabled={job.products.length === 0}
                    >
                      Complete
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => deleteRepairJob(job.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </Box>
                    </>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDropJobBackToRepair}
                sx={{
                  minHeight: 300,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px dashed #ccc',
                  backgroundColor: '#fafafa',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#667eea',
                    backgroundColor: '#f0f4ff',
                  }
                }}
              >
                <Typography color="textSecondary" variant="body2">
                  Empty slot
                </Typography>
              </Card>
            )}
          </Grid>
        ))}
      </Grid>}

      {/* Put Aside Jobs Section */}
      <Box data-putaside-section sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        mb: 2,
        p: 2,
        borderRadius: 2,
        backgroundColor: !showPutAsideJobs ? '#db2777' : '#fce7f3',
        transition: 'backgroundColor 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: !showPutAsideJobs ? '#c2255c' : '#fbcfe8',
        }
      }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: !showPutAsideJobs ? 'white' : '#be185d' }}>
          Put Aside ({putAsideJobs.length})
        </Typography>
        <IconButton
          size="small"
          onClick={() => setShowPutAsideJobs(!showPutAsideJobs)}
          sx={{ p: 0.5, color: !showPutAsideJobs ? 'white' : '#be185d' }}
        >
          {showPutAsideJobs ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </IconButton>
      </Box>
      {showPutAsideJobs && <Grid container spacing={2} sx={{ mb: 4 }}>
        {getPutAsideJobsToDisplay().map((job, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            {job ? (
              <Card
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.effectAllowed = 'move';
                  e.dataTransfer.setData('jobId', job.id);
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDropJobBackToRepair}
                sx={{
                  minHeight: 300,
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'grab',
                  border: '2px solid #f472b6',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 8px 24px rgba(244, 114, 182, 0.2)',
                    backgroundColor: '#fff7fd',
                  },
                }}
              >
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 0.5 }}>
                        Job #
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#db2777' }}>
                        {job.jobNumber}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Chip label={job.status === 'pending' ? 'in progress' : job.status} size="small" color="error" />
                      <IconButton
                        size="small"
                        onClick={() => {
                          setExpandedJobs(prev => {
                            const newSet = new Set(prev);
                            if (newSet.has(job.id)) {
                              newSet.delete(job.id);
                            } else {
                              newSet.add(job.id);
                            }
                            return newSet;
                          });
                        }}
                        sx={{ p: 0.5 }}
                      >
                        {expandedJobs.has(job.id) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </IconButton>
                    </Box>
                  </Box>

                  {/* Always show Client and Item */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 0.5 }}>
                      Client
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {job.clientName}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 0.5 }}>
                      Item
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, display: '-webkit-box', WebkitLineClamp: expandedJobs.has(job.id) ? 'unset' : 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {job.itemDescription}
                    </Typography>
                  </Box>

                  {expandedJobs.has(job.id) && (
                    <>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 0.5 }}>
                          Technician
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: job.technician ? '#db2777' : '#999' }}>
                          {job.technician || 'Unassigned'}
                        </Typography>
                      </Box>

                      {/* Totals */}
                      <Box sx={{ borderTop: '1px solid #ddd', pt: 1, mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="caption" color="textSecondary">
                            Subtotal:
                          </Typography>
                          <Typography variant="caption" sx={{ fontWeight: 600 }}>
                            {formatCurrencyWithCurrency(job.subtotal, currency)}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="caption" color="textSecondary">
                            Tax (10%):
                          </Typography>
                          <Typography variant="caption" sx={{ fontWeight: 600 }}>
                            {formatCurrencyWithCurrency(job.tax, currency)}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="caption" sx={{ fontWeight: 700 }}>
                            Total:
                          </Typography>
                          <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main' }}>
                            {formatCurrencyWithCurrency(job.total, currency)}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Action Buttons */}
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          fullWidth
                          onClick={() => {
                            setSelectedJobForComplete(job);
                            setOpenCompleteDialog(true);
                          }}
                          disabled={job.products.length === 0}
                        >
                          Complete
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => deleteRepairJob(job.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </Box>
                    </>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDropJobIntoPutAside}
                sx={{
                  minHeight: 300,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px dashed #f472b6',
                  backgroundColor: '#fdf2f8',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#fce7f3',
                    borderColor: '#db2777',
                  }
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Typography color="textSecondary" variant="body2" sx={{ mb: 1 }}>
                    Drag repair job here
                  </Typography>
                  <Typography color="textSecondary" variant="caption">
                    to put aside
                  </Typography>
                </Box>
              </Card>
            )}
          </Grid>
        ))}
      </Grid>}

      {/* Product Search Bar */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search products by name or SKU..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
          sx={{ mb: 2 }}
        />

        {/* Product Grid - Draggable */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          mb: 2,
          p: 2,
          borderRadius: 2,
          backgroundColor: !showProducts ? '#06b6d4' : '#ecfdf5',
          transition: 'backgroundColor 0.3s ease',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: !showProducts ? '#0891b2' : '#f0fdfa',
          }
        }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: !showProducts ? 'white' : '#0d9488' }}>
            Available Products (Drag to repair jobs)
          </Typography>
          <IconButton
            size="small"
            onClick={() => setShowProducts(!showProducts)}
            sx={{ p: 0.5, color: !showProducts ? 'white' : '#0d9488' }}
          >
            {showProducts ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </IconButton>
        </Box>
        {showProducts && <Grid container spacing={2}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={3} lg={2} key={product.id}>
              <Card
                draggable={product.quantity > 0}
                onDragStart={() => handleDragStart(product)}
                sx={{
                  cursor: product.quantity > 0 ? 'grab' : 'not-allowed',
                  '&:active': {
                    cursor: product.quantity > 0 ? 'grabbing' : 'not-allowed',
                  },
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    boxShadow: product.quantity > 0 ? 3 : 0,
                    transform: product.quantity > 0 ? 'translateY(-4px)' : 'translateY(0)',
                  },
                  backgroundColor: product.quantity === 0 ? '#ffebee' : 'white',
                  opacity: product.quantity === 0 ? 0.6 : 1,
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }} noWrap>
                    {product.name}
                  </Typography>
                  <Typography variant="caption" color="textSecondary" sx={{ mb: 1, display: 'block' }}>
                    SKU: {product.sku}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, mb: 1, color: 'primary.main' }}>
                    {formatCurrencyWithCurrency(product.price, currency)}
                  </Typography>
                  <Chip
                    label={`Stock: ${product.quantity}`}
                    size="small"
                    color={product.quantity === 0 ? 'error' : 'success'}
                    variant="outlined"
                  />
                  {product.quantity === 0 && (
                    <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'error.main', fontWeight: 600 }}>
                      Out of Stock
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>}

        {showProducts && filteredProducts.length === 0 && (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography color="textSecondary">No products found</Typography>
          </Paper>
        )}
      </Box>

      {/* Completed Jobs Section */}
      {completedJobs.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            mb: 2,
            p: 2,
            borderRadius: 2,
            backgroundColor: !showCompletedJobs ? '#f59e0b' : '#fef3c7',
            transition: 'backgroundColor 0.3s ease',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: !showCompletedJobs ? '#d97706' : '#fef08a',
            }
          }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: !showCompletedJobs ? 'white' : '#92400e' }}>
              Completed Jobs ({completedJobs.length})
            </Typography>
            <IconButton
              size="small"
              onClick={() => setShowCompletedJobs(!showCompletedJobs)}
              sx={{ p: 0.5, color: !showCompletedJobs ? 'white' : '#92400e' }}
            >
              {showCompletedJobs ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </IconButton>
          </Box>
          {showCompletedJobs && <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Job #</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Client</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Item</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Total
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Completed</TableCell>
                  <TableCell sx={{ fontWeight: 600 }} align="center">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {completedJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell sx={{ fontWeight: 500 }}>{job.jobNumber}</TableCell>
                    <TableCell>{job.clientName}</TableCell>
                    <TableCell>{job.itemDescription}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>
                      {formatCurrencyWithCurrency(job.total, currency)}
                    </TableCell>
                    <TableCell>{job.completedDate ? new Date(job.completedDate).toLocaleDateString() : '-'}</TableCell>
                    <TableCell align="center">
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => {
                          // Check if there are available tiles to edit in
                          const availableSlots = 4 - pendingJobs.length;
                          if (availableSlots <= 0) {
                            setNoTileWarning(true);
                            return;
                          }
                          // If available, open edit dialog to move job back to repair section
                          setSelectedJobForComplete(job);
                          setOpenCompleteDialog(true);
                        }}
                      >
                        Edit & Resubmit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>}
        </Box>
      )}

      {/* Create Job Dialog */}
      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Repair Job</DialogTitle>
        <DialogContent sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {createError && (
              <Alert severity="error">{createError}</Alert>
            )}
            
            {/* Dynamically render form fields based on configuration */}
            {formFields.map((field) => {
              const value = (formData as any)[field.key] || '';
              
              if (field.type === 'select') {
                return (
                  <FormControl key={field.id} fullWidth size="small">
                    <InputLabel>{field.label}</InputLabel>
                    <Select
                      value={value}
                      label={field.label}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    >
                      <MenuItem value="">Unassigned</MenuItem>
                      {technicians.map((tech) => (
                        <MenuItem key={tech} value={tech}>
                          {tech}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                );
              }
              
              return (
                <TextField
                  key={field.id}
                  label={`${field.label}${field.required ? ' *' : ''}`}
                  value={value}
                  onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                  fullWidth
                  size="small"
                  multiline={field.multiline}
                  rows={field.rows}
                  placeholder={field.placeholder}
                  type={field.type === 'number' ? 'number' : 'text'}
                />
              );
            })}
            
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                // Only set if job number exists, otherwise user can enter it in the dialog
                if (formData.jobNumber.trim()) {
                  setCurrentJobNumberForClickup(formData.jobNumber);
                } else {
                  setCurrentJobNumberForClickup('');
                }
                setOpenClickUpDialog(true);
              }}
              sx={{ mt: 1 }}
            >
              + Import Tasks from ClickUp
            </Button>
            {selectedClickupTasksForJob.length > 0 && (
              <Box sx={{ p: 2, backgroundColor: '#e8f5e9', borderRadius: 1, border: '1px solid #4caf50' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#2e7d32' }}>
                  ✓ {selectedClickupTasksForJob.length} Task{selectedClickupTasksForJob.length !== 1 ? 's' : ''} Selected from ClickUp
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {selectedClickupTasksForJob.map((task) => (
                    <Chip
                      key={task.id}
                      label={task.name}
                      onDelete={() =>
                        setSelectedClickupTasksForJob(selectedClickupTasksForJob.filter((t) => t.id !== task.id))
                      }
                      size="small"
                      sx={{ backgroundColor: '#81c784', color: 'white' }}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpenCreateDialog(false);
            setCreateError(null);
          }}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleCreateJob}
            disabled={!formData.jobNumber || !formData.clientName || !formData.itemDescription}
          >
            Create Job
          </Button>
        </DialogActions>
      </Dialog>

      {/* Complete Job Dialog */}
      <Dialog open={openCompleteDialog} onClose={() => setOpenCompleteDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Complete Repair Job</DialogTitle>
        <DialogContent sx={{ py: 2 }}>
          {selectedJobForComplete && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="subtitle2" color="textSecondary">
                  Job Number
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {selectedJobForComplete.jobNumber}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="textSecondary">
                  Client
                </Typography>
                <Typography variant="body1">{selectedJobForComplete.clientName}</Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
                  Products
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Qty</TableCell>
                        <TableCell align="right">Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedJobForComplete.products.map((product, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{product.productName}</TableCell>
                          <TableCell align="right">{product.quantity}</TableCell>
                          <TableCell align="right">{formatCurrencyWithCurrency(product.total, currency)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>

              <Box sx={{ borderTop: '1px solid #ddd', pt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="textSecondary">
                    Subtotal:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {formatCurrencyWithCurrency(selectedJobForComplete.subtotal, currency)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="textSecondary">
                    Tax (10%):
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {formatCurrencyWithCurrency(selectedJobForComplete.tax, currency)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    Total:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {formatCurrencyWithCurrency(selectedJobForComplete.total, currency)}
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body2" color="warning.main" sx={{ fontStyle: 'italic' }}>
                ℹ️ Completing this job will create an invoice and reduce stock quantities for all products.
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCompleteDialog(false)}>Cancel</Button>
          {selectedJobForComplete?.status === 'completed' ? (
            <Button variant="contained" color="primary" onClick={handleResubmitJob}>
              Move to Edit Tile & Resubmit
            </Button>
          ) : (
            <Button variant="contained" color="success" onClick={handleCompleteJob}>
              Complete & Create Invoice
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Edit Job Dialog */}
      <Dialog open={openEditDialog} onClose={() => {
        setOpenEditDialog(false);
        setSelectedJobForEdit(null);
      }} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Repair Job</DialogTitle>
        <DialogContent sx={{ py: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {selectedJobForEdit && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
              <TextField
                label="Job Number"
                value={selectedJobForEdit.jobNumber}
                onChange={(e) => setSelectedJobForEdit({
                  ...selectedJobForEdit,
                  jobNumber: e.target.value
                })}
                fullWidth
                size="small"
                disabled
              />
              <TextField
                label="Client Name"
                value={selectedJobForEdit.clientName}
                onChange={(e) => setSelectedJobForEdit({
                  ...selectedJobForEdit,
                  clientName: e.target.value
                })}
                fullWidth
                size="small"
              />
              <TextField
                label="Item Description"
                value={selectedJobForEdit.itemDescription}
                onChange={(e) => setSelectedJobForEdit({
                  ...selectedJobForEdit,
                  itemDescription: e.target.value
                })}
                fullWidth
                multiline
                rows={3}
                size="small"
              />
              <FormControl fullWidth size="small">
                <InputLabel>Technician</InputLabel>
                <Select
                  value={selectedJobForEdit.technician || ''}
                  label="Technician"
                  onChange={(e) => setSelectedJobForEdit({
                    ...selectedJobForEdit,
                    technician: e.target.value
                  })}
                >
                  <MenuItem value="">Unassigned</MenuItem>
                  {technicians.map((tech) => (
                    <MenuItem key={tech} value={tech}>
                      {tech}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpenEditDialog(false);
            setSelectedJobForEdit(null);
          }}>Cancel</Button>
          <Button
            variant="contained"
            onClick={async () => {
              if (selectedJobForEdit && user?.uid) {
                try {
                  await updateRepairJob(selectedJobForEdit.id, {
                    clientName: selectedJobForEdit.clientName,
                    itemDescription: selectedJobForEdit.itemDescription,
                    technician: selectedJobForEdit.technician,
                  });
                  setOpenEditDialog(false);
                  setSelectedJobForEdit(null);
                  await fetchRepairJobs(user.uid);
                } catch (error) {
                  console.error('Error updating repair job:', error);
                }
              }
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Settings Panel Dialog */}
      <Dialog open={openSettingsPanel} onClose={() => setOpenSettingsPanel(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Repair Settings</DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Technicians Management */}
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Technicians
              </Typography>
              
              {/* Add Technician */}
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  placeholder="Technician name"
                  value={newTechnicianName}
                  onChange={(e) => setNewTechnicianName(e.target.value)}
                  size="small"
                  fullWidth
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && newTechnicianName.trim()) {
                      addTechnician(newTechnicianName.trim());
                      setNewTechnicianName('');
                    }
                  }}
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    if (newTechnicianName.trim()) {
                      addTechnician(newTechnicianName.trim());
                      setNewTechnicianName('');
                    }
                  }}
                  disabled={!newTechnicianName.trim()}
                >
                  Add
                </Button>
              </Box>

              {/* List of Technicians */}
              {technicians.length > 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {technicians.map((tech) => (
                    <Box
                      key={tech}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 1.5,
                        backgroundColor: '#f5f5f5',
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="body2">{tech}</Typography>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => removeTechnician(tech)}
                      >
                        Remove
                      </Button>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" color="textSecondary" sx={{ fontStyle: 'italic' }}>
                  No technicians added yet
                </Typography>
              )}
            </Box>

            {/* Form Fields Customization */}
            <Box sx={{ borderTop: '1px solid #ddd', pt: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Job Creation Form Fields
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button size="small" variant="outlined" onClick={() => resetFormFields()}>
                    Reset to Default
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => {
                      setShowFormFieldEditor(true);
                      setEditingField(null);
                      setNewFieldLabel('');
                      setNewFieldType('text');
                    }}
                  >
                    + Add Field
                  </Button>
                </Box>
              </Box>

              {/* Field Editor Form */}
              {showFormFieldEditor && (
                <Box sx={{ mb: 2, p: 2, backgroundColor: '#f9f9f9', borderRadius: 1, border: '1px solid #ddd' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <TextField
                      label="Field Label"
                      value={newFieldLabel}
                      onChange={(e) => setNewFieldLabel(e.target.value)}
                      size="small"
                      fullWidth
                      placeholder="e.g., ClickUp ID, Device Model"
                    />
                    <FormControl fullWidth size="small">
                      <InputLabel>Field Type</InputLabel>
                      <Select
                        value={newFieldType}
                        label="Field Type"
                        onChange={(e) => setNewFieldType(e.target.value as any)}
                      >
                        <MenuItem value="text">Text Input</MenuItem>
                        <MenuItem value="textarea">Text Area</MenuItem>
                        <MenuItem value="number">Number</MenuItem>
                        <MenuItem value="select">Dropdown (Technician List)</MenuItem>
                      </Select>
                    </FormControl>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                          if (newFieldLabel.trim()) {
                            if (editingField) {
                              updateFormField(editingField.id, {
                                label: newFieldLabel,
                                type: newFieldType,
                              });
                            } else {
                              addFormField({
                                id: '',
                                key: `custom_${Date.now()}`,
                                label: newFieldLabel,
                                type: newFieldType,
                                required: false,
                                multiline: newFieldType === 'textarea',
                                rows: newFieldType === 'textarea' ? 2 : undefined,
                              });
                            }
                            setShowFormFieldEditor(false);
                            setNewFieldLabel('');
                            setNewFieldType('text');
                          }
                        }}
                        fullWidth
                      >
                        {editingField ? 'Update Field' : 'Add Field'}
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          setShowFormFieldEditor(false);
                          setEditingField(null);
                          setNewFieldLabel('');
                          setNewFieldType('text');
                        }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </Box>
              )}

              {/* List of Form Fields */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {formFields.map((field) => (
                  <Box
                    key={field.id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 1.5,
                      backgroundColor: '#f5f5f5',
                      borderRadius: 1,
                      border: '1px solid #e0e0e0',
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {field.label}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {field.type} {field.required && '(Required)'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => {
                          setEditingField(field);
                          setNewFieldLabel(field.label);
                          setNewFieldType(field.type);
                          setShowFormFieldEditor(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        variant="outlined"
                        onClick={() => removeFormField(field.id)}
                        disabled={field.key === 'jobNumber' || field.key === 'clientName'}
                      >
                        Remove
                      </Button>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Integrations Management */}
            <Box sx={{ borderTop: '1px solid #ddd', pt: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Integrations
              </Typography>

              {/* Add Integration Form */}
              {showIntegrationForm ? (
                <Box sx={{ mb: 2, p: 2, backgroundColor: '#f9f9f9', borderRadius: 1, border: '1px solid #ddd' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Service</InputLabel>
                      <Select
                        value={newIntegrationName}
                        label="Service"
                        onChange={(e) => setNewIntegrationName(e.target.value)}
                      >
                        <MenuItem value="ClickUp">ClickUp</MenuItem>
                        <MenuItem value="Monday">Monday.com</MenuItem>
                        <MenuItem value="QuickBooks">QuickBooks</MenuItem>
                        <MenuItem value="Slack">Slack</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    </FormControl>

                    <TextField
                      label="API Key"
                      type="password"
                      value={newIntegrationKey}
                      onChange={(e) => {
                        setNewIntegrationKey(e.target.value);
                        if (newIntegrationName === 'ClickUp' && e.target.value.trim()) {
                          // Auto-validate when API key is entered for ClickUp
                          handleValidateClickupApiKey(e.target.value);
                        }
                      }}
                      size="small"
                      fullWidth
                      placeholder="Enter your API key"
                    />

                    {newIntegrationName === 'ClickUp' && newIntegrationKey && (
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        {loadingClickupTeams ? (
                          <Typography variant="body2" color="textSecondary">
                            🔍 Validating API key and fetching teams...
                          </Typography>
                        ) : clickupTeamError ? (
                          <Alert severity="error">{clickupTeamError}</Alert>
                        ) : availableClickupTeams.length > 0 ? (
                          <FormControl fullWidth size="small">
                            <InputLabel>Select Workspace/Team</InputLabel>
                            <Select
                              value={newIntegrationTeamId}
                              label="Select Workspace/Team"
                              onChange={(e) => setNewIntegrationTeamId(e.target.value)}
                            >
                              {availableClickupTeams.map((team) => (
                                <MenuItem key={team.id} value={team.id}>
                                  {team.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        ) : null}
                      </Box>
                    )}

                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                          const isClickup = newIntegrationName === 'ClickUp';
                          const hasTeamId = isClickup ? !!newIntegrationTeamId : true;
                          
                          if (newIntegrationName && newIntegrationKey && hasTeamId) {
                            addIntegration(newIntegrationName, newIntegrationKey, newIntegrationTeamId || undefined);
                            setNewIntegrationName('');
                            setNewIntegrationKey('');
                            setNewIntegrationTeamId('');
                            setAvailableClickupTeams([]);
                            setClickupTeamError(null);
                            setShowIntegrationForm(false);
                          }
                        }}
                        disabled={!newIntegrationName || !newIntegrationKey || (newIntegrationName === 'ClickUp' && !newIntegrationTeamId)}
                        fullWidth
                      >
                        Save Integration
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          setShowIntegrationForm(false);
                          setNewIntegrationName('');
                          setNewIntegrationKey('');
                          setNewIntegrationTeamId('');
                        }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => setShowIntegrationForm(true)}
                  sx={{ mb: 2 }}
                >
                  + Add Integration
                </Button>
              )}

              {/* List of Integrations */}
              {integrations.length > 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {integrations.map((integration) => (
                    <Box
                      key={integration.name}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 1.5,
                        backgroundColor: integration.enabled ? '#e8f5e9' : '#ffebee',
                        borderRadius: 1,
                        border: `1px solid ${integration.enabled ? '#4caf50' : '#f44336'}`,
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {integration.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary" sx={{ display: 'block' }}>
                          Status: {integration.enabled ? '✓ Enabled' : '✗ Disabled'}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Button
                          size="small"
                          variant={integration.enabled ? 'contained' : 'outlined'}
                          onClick={() =>
                            updateIntegration(integration.name, integration.apiKey, !integration.enabled)
                          }
                        >
                          {integration.enabled ? 'Disable' : 'Enable'}
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          onClick={() => removeIntegration(integration.name)}
                        >
                          Remove
                        </Button>
                      </Box>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" color="textSecondary" sx={{ fontStyle: 'italic' }}>
                  No integrations added yet
                </Typography>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSettingsPanel(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* ClickUp Tasks Selection Dialog */}
      <Dialog open={openClickUpDialog} onClose={() => setOpenClickUpDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Import Tasks from ClickUp</DialogTitle>
        <DialogContent sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {loadingClickupTasks ? (
              <Box sx={{ textAlign: 'center', py: 3 }}>
                <Typography variant="body2" color="textSecondary">
                  Fetching tasks for job #{currentJobNumberForClickup}...
                </Typography>
              </Box>
            ) : clickupTasks.length > 0 ? (
              <>
                {/* Job Number Filter */}
                <Box sx={{ mb: 2, p: 2, backgroundColor: '#f0f9ff', borderRadius: 1, border: '1px solid #0284c7' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Filter by Job Number (Optional)
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      label="Job Number"
                      value={currentJobNumberForClickup}
                      onChange={(e) => setCurrentJobNumberForClickup(e.target.value)}
                      fullWidth
                      size="small"
                      placeholder="e.g., 275466666"
                      helperText="Leave empty to see all tasks or enter a job number to auto-select matching tasks"
                    />
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        const clickupIntegration = integrations?.find(i => i.name === 'ClickUp');
                        if (clickupIntegration?.enabled && clickupIntegration?.teamId) {
                          setClickupTeamId(clickupIntegration.teamId);
                          handleFetchClickupTasks(clickupIntegration.teamId);
                        }
                      }}
                      disabled={loadingClickupTasks}
                      sx={{ whiteSpace: 'nowrap' }}
                    >
                      {loadingClickupTasks ? 'Loading...' : 'Load Tasks'}
                    </Button>
                  </Box>
                </Box>

                {/* Step 1: Select Tasks */}
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    All Tasks ({selectedClickupTasks.length} selected) {currentJobNumberForClickup && `- Job #${currentJobNumberForClickup}`}
                  </Typography>
                  <TextField
                    label="Search tasks..."
                    value={clickupTasksFilter}
                    onChange={(e) => setClickupTasksFilter(e.target.value)}
                    fullWidth
                    size="small"
                    placeholder="Filter by task name"
                    sx={{ mb: 1 }}
                  />
                </Box>

                <Paper sx={{ maxHeight: '350px', overflowY: 'auto', border: '1px solid #ddd', borderRadius: 1 }}>
                  {clickupTasks
                    .filter((task) =>
                      task.name.toLowerCase().includes(clickupTasksFilter.toLowerCase()) ||
                      task.jobNumber?.includes(clickupTasksFilter)
                    )
                    .length > 0 ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      {clickupTasks
                        .filter((task) =>
                          task.name.toLowerCase().includes(clickupTasksFilter.toLowerCase()) ||
                          task.jobNumber?.includes(clickupTasksFilter)
                        )
                        .map((task, idx) => {
                          const isMatchedJob = currentJobNumberForClickup ? task.jobNumber === currentJobNumberForClickup : false;
                          return (
                            <Box
                              key={task.id}
                              onClick={() => {
                                setSelectedClickupTasks(
                                  selectedClickupTasks.includes(task.id)
                                    ? selectedClickupTasks.filter((id) => id !== task.id)
                                    : [...selectedClickupTasks, task.id]
                                );
                              }}
                              sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                p: 1.5,
                                borderBottom: idx < clickupTasks.filter((t) =>
                                  t.name.toLowerCase().includes(clickupTasksFilter.toLowerCase()) ||
                                  t.jobNumber?.includes(clickupTasksFilter)
                                ).length - 1 ? '1px solid #eee' : 'none',
                                borderLeft: isMatchedJob ? '4px solid #10b981' : 'none',
                                cursor: 'pointer',
                                backgroundColor: selectedClickupTasks.includes(task.id) ? '#e3f2fd' : isMatchedJob ? '#f0fdf4' : 'white',
                                transition: 'all 0.2s',
                                '&:hover': {
                                  backgroundColor: selectedClickupTasks.includes(task.id) ? '#bbdefb' : isMatchedJob ? '#dcfce7' : '#f9f9f9',
                                },
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={selectedClickupTasks.includes(task.id)}
                                onChange={() => {}}
                                style={{ marginRight: '12px', marginTop: '2px', cursor: 'pointer' }}
                              />
                              <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                    {task.name}
                                  </Typography>
                                  {isMatchedJob && (
                                    <Chip
                                      label={`Job #${task.jobNumber}`}
                                      size="small"
                                      sx={{ height: '22px', backgroundColor: '#10b981', color: 'white', fontWeight: 600 }}
                                    />
                                  )}
                                </Box>
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                  {task.jobNumber && !isMatchedJob && (
                                    <Chip
                                      label={`Job #${task.jobNumber}`}
                                      size="small"
                                      variant="outlined"
                                      sx={{ height: '22px' }}
                                    />
                                  )}
                                  {task.status && (
                                    <Chip
                                      label={task.status.status}
                                      size="small"
                                      variant="outlined"
                                      sx={{ height: '22px' }}
                                    />
                                  )}
                                </Box>
                              </Box>
                            </Box>
                          );
                        })}
                    </Box>
                  ) : (
                    <Box sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="body2" color="textSecondary">
                        No tasks match your search
                      </Typography>
                    </Box>
                  )}
                </Paper>
              </>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Alert severity="warning">
                  ⚠️ ClickUp integration not configured. To import tasks:
                </Alert>
                <Box sx={{ p: 2, backgroundColor: '#f0f9ff', borderRadius: 1, border: '1px solid #0284c7' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Setup Steps:
                  </Typography>
                  <ol style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
                    <li>Go to Settings → Integrations</li>
                    <li>Click "Add Integration" and select ClickUp</li>
                    <li>Enter your ClickUp API Key</li>
                    <li>Select your Workspace/Team from the dropdown</li>
                    <li>Click Save and come back here</li>
                  </ol>
                </Box>
                <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center', fontStyle: 'italic' }}>
                  Or manually search and select tasks below without job number filtering
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpenClickUpDialog(false);
            setClickupTasksFilter('');
          }}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAddClickupTasks}
            disabled={selectedClickupTasks.length === 0}
          >
            Add {selectedClickupTasks.length > 0 ? `${selectedClickupTasks.length}` : ''} Task{selectedClickupTasks.length !== 1 ? 's' : ''}
          </Button>
        </DialogActions>
      </Dialog>

      {/* No Available Tile Warning Snackbar */}
      <Snackbar
        open={noTileWarning}
        autoHideDuration={5000}
        onClose={() => setNoTileWarning(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setNoTileWarning(false)} 
          severity="warning"
          sx={{ width: '100%', fontSize: '1rem', fontWeight: 500 }}
        >
          ⚠️ No available repair job tiles to edit in. All 4 tiles are occupied. Please complete or delete a job first.
        </Alert>
      </Snackbar>
    </Container>
  );
};
