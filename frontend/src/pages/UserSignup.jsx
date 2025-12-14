import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Alert, AppBar, Toolbar } from '@mui/material';
import api from '../api/axios';

function UserSignup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Get user name from localStorage
  const userName = localStorage.getItem('userName') || '';

  const handleChange = e => {
    setErrorMessage('');
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/user-signup', form);
      navigate('/user-login');
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
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" component={Link} to="/user-signup">User Signup</Button>
            <Button color="inherit" component={Link} to="/user-login">User Login</Button>
            <Button color="inherit" component={Link} to="/admin-login">Admin Login</Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Signup Form */}
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
          User Signup
        </Typography>

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            margin="normal"
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            margin="normal"
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            margin="normal"
            onChange={handleChange}
            required
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
          >
            Signup
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default UserSignup;
