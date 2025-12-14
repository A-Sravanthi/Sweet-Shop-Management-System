import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Alert, AppBar, Toolbar } from '@mui/material';
import api from '../api/axios';

function UserLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Get user name from localStorage
  const userName = localStorage.getItem('userName') || '';

  const handleChange = (e) => {
    setErrorMessage('');
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/user-login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/user-dashboard');
    } catch (err) {
      if (err.response?.data?.errors) {
        const firstError = Object.values(err.response.data.errors).find(msg => msg);
        setErrorMessage(firstError || 'Something went wrong');
      } else if (err.response?.data?.message) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage('Something went wrong');
      }
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
          User Login
        </Typography>

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            margin="normal"
            value={form.email}
            onChange={handleChange}
            required
            error={!!errorMessage}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            margin="normal"
            value={form.password}
            onChange={handleChange}
            required
            error={!!errorMessage}
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default UserLogin;
