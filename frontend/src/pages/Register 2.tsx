import React, { useState } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
  Link,
} from '@mui/material';
import { validateEmail } from '../utils';
import { useAuth } from '../hooks';

interface RegisterProps {
  onSwitchToLogin: () => void;
}

export const Register: React.FC<RegisterProps> = ({ onSwitchToLogin }) => {
  const { register, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setSuccessMessage('');

    // Validation
    if (!email || !password || !confirmPassword) {
      setFormError('Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      setFormError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    try {
      await register(email, password);
      setSuccessMessage('Account created successfully! You can now log in.');
      setTimeout(() => {
        onSwitchToLogin();
      }, 1500);
    } catch (err) {
      // Error is handled by the store
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ textAlign: 'center', mb: 1, fontWeight: 600 }}>
            Create Account
          </Typography>
          <Typography
            color="textSecondary"
            sx={{ textAlign: 'center', mb: 3 }}
          >
            Join AiStock Today
          </Typography>

          {(error || formError) && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error || formError}
            </Alert>
          )}

          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              disabled={loading}
              placeholder="your@email.com"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              disabled={loading}
              placeholder="At least 6 characters"
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              margin="normal"
              disabled={loading}
              placeholder="Confirm your password"
            />
            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Create Account'}
            </Button>
          </form>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2">
              Already have an account?{' '}
              <Link
                onClick={onSwitchToLogin}
                sx={{ cursor: 'pointer', color: 'primary.main', fontWeight: 500 }}
              >
                Log in here
              </Link>
            </Typography>
          </Box>

          <Typography variant="caption" sx={{ textAlign: 'center', display: 'block', mt: 3, color: 'textSecondary' }}>
            By signing up, you agree to our Terms of Service
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
