import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, AppBar, Toolbar, Container, Grid, Paper } from '@mui/material';

function Home() {
  const [dynamicText, setDynamicText] = useState('');
  const fullText = 'Welcome to Sweet Shop Management System';
  const [index, setIndex] = useState(0);

  // Get user name from localStorage if logged in
  const userName = localStorage.getItem('userName') || '';

  // Dynamic typing effect for the welcome text
  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDynamicText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(to right, #fbc2eb, #a6c1ee)',
      }}
    >
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

      {/* Main content */}
      <Container
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          py: 6,
        }}
      >
        {/* Animated welcome text */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            color: '#fff',
            mb: 4,
            letterSpacing: 2,
            textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
          }}
        >
          {dynamicText}
          <span style={{ borderRight: '2px solid #fff', marginLeft: 2 }}></span>
        </Typography>

        {/* Buttons with hover animation */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 6, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/user-login"
            sx={{ px: 4, py: 1.5, fontWeight: 'bold', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.1)' } }}
          >
            User Login
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            component={Link}
            to="/admin-login"
            sx={{ px: 4, py: 1.5, fontWeight: 'bold', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.1)' } }}
          >
            Admin Login
          </Button>

          <Button
            variant="contained"
            color="success"
            component={Link}
            to="/user-signup"
            sx={{ px: 4, py: 1.5, fontWeight: 'bold', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.1)' } }}
          >
            User Signup
          </Button>
        </Box>

        {/* Sweet-themed images */}
        <Grid container spacing={3} justifyContent="center" sx={{ mb: 6 }}>
          <Grid item>
            <img src="/images/laddo.png" alt="Candy" style={{ width: 120 }} />
          </Grid>
          <Grid item>
            <img src="/images/sweet.png" alt="Ice Cream" style={{ width: 120 }} />
          </Grid>
             <Grid item>
            <img src="/images/mixed.png" alt="Ice Cream" style={{ width: 120 }} />
          </Grid>
        </Grid>

        {/* Contact Us Section */}
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.9)', maxWidth: 600 }}>
          <Typography variant="h5" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1">
            For inquiries or support, email us at: <a href="mailto:support@sweetshop.com">support@sweetshop.com</a>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default Home;
