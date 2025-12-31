import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { useRepairStore } from '../store/repairStore';
import { useAuth } from '../hooks/useAuth';
import { useSettings } from '../store/settingsStore';
import { formatCurrencyWithCurrency } from '../utils/helpers';

export const Reports: React.FC = () => {
  const { user } = useAuth();
  const { repairJobs, fetchRepairJobs } = useRepairStore();
  const { currency } = useSettings();
  const [refreshing, setRefreshing] = useState(false);
  const [expandedReports, setExpandedReports] = useState<Set<string>>(new Set(['daily', 'technician', 'monthly']));

  useEffect(() => {
    if (user?.uid) {
      fetchRepairJobs(user.uid);
    }
  }, [user?.uid, fetchRepairJobs]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      if (user?.uid) {
        await fetchRepairJobs(user.uid);
      }
    } finally {
      setRefreshing(false);
    }
  };

  const toggleReport = (reportId: string) => {
    setExpandedReports(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reportId)) {
        newSet.delete(reportId);
      } else {
        newSet.add(reportId);
      }
      return newSet;
    });
  };

  // Get today's repairs
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrowStart = new Date(today);
  tomorrowStart.setDate(tomorrowStart.getDate() + 1);

  const dailyRepairs = repairJobs.filter(job => {
    const jobDate = new Date(job.createdAt);
    jobDate.setHours(0, 0, 0, 0);
    return jobDate.getTime() === today.getTime();
  });

  const dailyCompleted = dailyRepairs.filter(j => j.status === 'completed');
  const dailyRevenue = dailyRepairs.reduce((sum, j) => sum + j.total, 0);

  // Get repairs by technician
  const repairsByTechnician = repairJobs.reduce((acc, job) => {
    const tech = job.technician || 'Unassigned';
    if (!acc[tech]) {
      acc[tech] = {
        name: tech,
        total: 0,
        completed: 0,
        revenue: 0,
        pending: 0,
      };
    }
    acc[tech].total += 1;
    if (job.status === 'completed') acc[tech].completed += 1;
    else if (job.status === 'pending' || job.status === 'in-progress') acc[tech].pending += 1;
    acc[tech].revenue += job.total;
    return acc;
  }, {} as Record<string, any>);

  // Get repairs for this month
  const currentMonth = new Date();
  const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

  const monthlyRepairs = repairJobs.filter(job => {
    const jobDate = new Date(job.createdAt);
    return jobDate >= monthStart && jobDate <= monthEnd;
  });

  const monthlyCompleted = monthlyRepairs.filter(j => j.status === 'completed');
  const monthlyRevenue = monthlyRepairs.reduce((sum, j) => sum + j.total, 0);

  // Get repairs per technician for this month
  const monthlyByTechnician = monthlyRepairs.reduce((acc, job) => {
    const tech = job.technician || 'Unassigned';
    if (!acc[tech]) {
      acc[tech] = {
        name: tech,
        total: 0,
        completed: 0,
        revenue: 0,
      };
    }
    acc[tech].total += 1;
    if (job.status === 'completed') acc[tech].completed += 1;
    acc[tech].revenue += job.total;
    return acc;
  }, {} as Record<string, any>);

  const ReportSection = ({ title, reportId, children }: any) => (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: expandedReports.has(reportId) ? 2 : 0 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
          <IconButton
            size="small"
            onClick={() => toggleReport(reportId)}
          >
            {expandedReports.has(reportId) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </IconButton>
        </Box>
        {expandedReports.has(reportId) && children}
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
            Reports
          </Typography>
          <Typography color="textSecondary">
            Repair analytics and performance metrics
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={refreshing ? <CircularProgress size={20} /> : <RefreshCw size={20} />}
          onClick={handleRefresh}
          disabled={refreshing}
        >
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
      </Box>

      {/* Daily Repairs Report */}
      <ReportSection title={`Daily Repairs (${new Date().toLocaleDateString()})`} reportId="daily">
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: '#f0f4ff', border: '2px solid #667eea' }}>
              <CardContent>
                <Typography color="textSecondary" sx={{ mb: 1 }}>
                  Total Repairs
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#667eea' }}>
                  {dailyRepairs.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: '#f0fdf4', border: '2px solid #10b981' }}>
              <CardContent>
                <Typography color="textSecondary" sx={{ mb: 1 }}>
                  Completed
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#10b981' }}>
                  {dailyCompleted.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: '#fef3c7', border: '2px solid #f59e0b' }}>
              <CardContent>
                <Typography color="textSecondary" sx={{ mb: 1 }}>
                  Pending
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#f59e0b' }}>
                  {dailyRepairs.length - dailyCompleted.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: '#fef3c7', border: '2px solid #f59e0b' }}>
              <CardContent>
                <Typography color="textSecondary" sx={{ mb: 1 }}>
                  Revenue
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#f59e0b' }}>
                  {formatCurrencyWithCurrency(dailyRevenue, currency)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </ReportSection>

      {/* Repairs by Technician (All Time) */}
      <ReportSection title="Repairs by Technician (All Time)" reportId="technician">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f3f4f6' }}>
                <TableCell sx={{ fontWeight: 700 }}>Technician</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Total Jobs</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Completed</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Pending</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Revenue</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.values(repairsByTechnician).map((tech: any) => (
                <TableRow key={tech.name}>
                  <TableCell>{tech.name}</TableCell>
                  <TableCell align="right">{tech.total}</TableCell>
                  <TableCell align="right" sx={{ color: '#10b981', fontWeight: 600 }}>{tech.completed}</TableCell>
                  <TableCell align="right" sx={{ color: '#f59e0b', fontWeight: 600 }}>{tech.pending}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>{formatCurrencyWithCurrency(tech.revenue, currency)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ReportSection>

      {/* Monthly Repairs Report */}
      <ReportSection title={`Monthly Repairs (${monthStart.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })})`} reportId="monthly">
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: '#f0f4ff', border: '2px solid #667eea' }}>
              <CardContent>
                <Typography color="textSecondary" sx={{ mb: 1 }}>
                  Total Repairs
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#667eea' }}>
                  {monthlyRepairs.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: '#f0fdf4', border: '2px solid #10b981' }}>
              <CardContent>
                <Typography color="textSecondary" sx={{ mb: 1 }}>
                  Completed
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#10b981' }}>
                  {monthlyCompleted.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: '#fef3c7', border: '2px solid #f59e0b' }}>
              <CardContent>
                <Typography color="textSecondary" sx={{ mb: 1 }}>
                  Completion Rate
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#f59e0b' }}>
                  {monthlyRepairs.length > 0 ? Math.round((monthlyCompleted.length / monthlyRepairs.length) * 100) : 0}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: '#fef3c7', border: '2px solid #f59e0b' }}>
              <CardContent>
                <Typography color="textSecondary" sx={{ mb: 1 }}>
                  Revenue
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#f59e0b' }}>
                  {formatCurrencyWithCurrency(monthlyRevenue, currency)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </ReportSection>

      {/* Monthly Repairs by Technician */}
      <ReportSection title={`Repairs by Technician (${monthStart.toLocaleDateString('en-US', { month: 'long' })})`} reportId="monthlyTech">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f3f4f6' }}>
                <TableCell sx={{ fontWeight: 700 }}>Technician</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Total Jobs</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Completed</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Completion %</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Revenue</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.values(monthlyByTechnician).map((tech: any) => (
                <TableRow key={tech.name}>
                  <TableCell>{tech.name}</TableCell>
                  <TableCell align="right">{tech.total}</TableCell>
                  <TableCell align="right" sx={{ color: '#10b981', fontWeight: 600 }}>{tech.completed}</TableCell>
                  <TableCell align="right" sx={{ color: '#f59e0b', fontWeight: 600 }}>{tech.total > 0 ? Math.round((tech.completed / tech.total) * 100) : 0}%</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>{formatCurrencyWithCurrency(tech.revenue, currency)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ReportSection>
    </Container>
  );
};
