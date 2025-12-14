import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, CircularProgress, Alert, AppBar, Toolbar } from '@mui/material';
import api from '../api/axios';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Get user name from localStorage
  const userName = localStorage.getItem('userName') || '';

  const handleChange = (e) => {
    setErrorMessage('');
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await api.post('/admin-login', { email });

      localStorage.setItem('token', res.data.token);
      navigate('/admin-dashboard');
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(to right, #fbc2eb, #a6c1ee)' }}>
      {/* Header / Navigation */}
      <AppBar position="static" sx={{ backgroundColor: '#4b0082' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">
            {userName ? `Welcome, ${userName}` : 'Sweet Shop Management'}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Login Form */}
      <Box
        sx={{
          width: 400,
          margin: '100px auto',
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'rgba(255,255,255,0.9)',
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Admin Login
        </Typography>

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Admin Email"
            name="email"
            type="email"
            margin="normal"
            value={email}
            onChange={handleChange}
            required
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default AdminLogin;
