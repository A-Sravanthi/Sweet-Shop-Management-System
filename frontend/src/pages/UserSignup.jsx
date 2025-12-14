import { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

function UserSignup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

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
      // SHOW EXACT BACKEND MESSAGE
      setErrorMessage(
        err.response?.data?.message || 'Something went wrong'
      );
    }
  };

  return (
    <Box
      sx={{
        width: 400,
        margin: '100px auto',
        padding: 4,
        boxShadow: 3,
        borderRadius: 2
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
  );
}

export default UserSignup;
