import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Alert,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { X, Plus, Copy, Trash2, Key, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface APIKey {
  id: string;
  name: string;
  apiKey: string;
  permissions: string[];
  active: boolean;
  createdAt: Date;
  lastUsed?: Date;
}

interface APIKeyManagementProps {
  open: boolean;
  onClose: () => void;
}

export const APIKeyManagement: React.FC<APIKeyManagementProps> = ({ open, onClose }) => {
  const { user } = useAuth();
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyPermissions, setNewKeyPermissions] = useState(['read', 'write']);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  const permissions = [
    { value: 'read', label: 'Read Data' },
    { value: 'write', label: 'Create/Update Data' },
    { value: 'delete', label: 'Delete Data' },
    { value: 'admin', label: 'Admin Access' }
  ];

  useEffect(() => {
    if (open && user) {
      fetchAPIKeys();
    }
  }, [open, user]);

  const fetchAPIKeys = async () => {
    // Mock data for now - in production, fetch from Firestore
    setApiKeys([
      {
        id: '1',
        name: 'Production API',
        apiKey: 'aisk_abc123def456ghi789',
        permissions: ['read', 'write'],
        active: true,
        createdAt: new Date(),
        lastUsed: new Date()
      }
    ]);
  };

  const generateAPIKey = async () => {
    if (!user || !newKeyName.trim()) return;

    setLoading(true);
    try {
      // In production, call the Firebase Function
      const response = await fetch('/api/auth/generate-api-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: user.uid,
          name: newKeyName,
          permissions: newKeyPermissions
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('API key generated:', result);
        await fetchAPIKeys(); // Refresh the list
        setShowCreateDialog(false);
        setNewKeyName('');
        setNewKeyPermissions(['read', 'write']);
      }
    } catch (error) {
      console.error('Error generating API key:', error);
    }
    setLoading(false);
  };

  const toggleKeyVisibility = (keyId: string) => {
    const newVisible = new Set(visibleKeys);
    if (newVisible.has(keyId)) {
      newVisible.delete(keyId);
    } else {
      newVisible.add(keyId);
    }
    setVisibleKeys(newVisible);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const maskApiKey = (key: string) => {
    return key.substring(0, 12) + '•'.repeat(key.length - 16) + key.substring(key.length - 4);
  };

  const deleteAPIKey = async (keyId: string) => {
    // In production, delete from Firestore and disable the key
    setApiKeys(prev => prev.filter(k => k.id !== keyId));
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Key size={24} color="#2563eb" />
              <Typography variant="h6">API Key Management</Typography>
            </Box>
            <IconButton onClick={onClose}>
              <X size={20} />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              API keys allow external applications to integrate with AiStock. Keep your keys secure and never expose them in client-side code.
            </Typography>
          </Alert>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Your API Keys</Typography>
            <Button
              variant="contained"
              startIcon={<Plus size={16} />}
              onClick={() => setShowCreateDialog(true)}
            >
              Create New Key
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>API Key</strong></TableCell>
                  <TableCell><strong>Permissions</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Last Used</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {apiKeys.map((apiKey) => (
                  <TableRow key={apiKey.id}>
                    <TableCell>{apiKey.name}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                          {visibleKeys.has(apiKey.id) ? apiKey.apiKey : maskApiKey(apiKey.apiKey)}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => toggleKeyVisibility(apiKey.id)}
                        >
                          {visibleKeys.has(apiKey.id) ? <EyeOff size={16} /> : <Eye size={16} />}
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => copyToClipboard(apiKey.apiKey)}
                        >
                          <Copy size={16} />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {apiKey.permissions.map(permission => (
                          <Chip
                            key={permission}
                            label={permission}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={apiKey.active ? 'Active' : 'Inactive'}
                        color={apiKey.active ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {apiKey.lastUsed ? apiKey.lastUsed.toLocaleDateString() : 'Never'}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => deleteAPIKey(apiKey.id)}
                      >
                        <Trash2 size={16} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {apiKeys.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body2" color="textSecondary">
                No API keys found. Create your first key to get started.
              </Typography>
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Create API Key Dialog */}
      <Dialog open={showCreateDialog} onClose={() => setShowCreateDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New API Key</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Key Name"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="e.g., Production API, Mobile App, etc."
              sx={{ mb: 3 }}
            />

            <Typography variant="subtitle2" gutterBottom>
              Permissions
            </Typography>
            {permissions.map(permission => (
              <FormControlLabel
                key={permission.value}
                control={
                  <Checkbox
                    checked={newKeyPermissions.includes(permission.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setNewKeyPermissions(prev => [...prev, permission.value]);
                      } else {
                        setNewKeyPermissions(prev => prev.filter(p => p !== permission.value));
                      }
                    }}
                  />
                }
                label={permission.label}
                sx={{ display: 'block' }}
              />
            ))}

            <Alert severity="warning" sx={{ mt: 2 }}>
              <Typography variant="body2">
                <strong>Important:</strong> Copy your API key immediately after creation. 
                You won't be able to see it again for security reasons.
              </Typography>
            </Alert>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCreateDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={generateAPIKey}
            disabled={!newKeyName.trim() || loading}
          >
            {loading ? 'Creating...' : 'Create API Key'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};