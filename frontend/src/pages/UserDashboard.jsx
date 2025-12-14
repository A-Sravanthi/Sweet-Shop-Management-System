import { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import api from '../api/axios';

function UserDashboard() {
  const [sweets, setSweets] = useState([]);

  useEffect(() => {
    const fetchSweets = async () => {
      const res = await api.get('/user/sweets');
      setSweets(res.data);
    };
    fetchSweets();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Available Sweets</Typography>
      <Grid container spacing={2}>
        {sweets.map(s => (
          <Grid item key={s._id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">{s.name}</Typography>
                <Typography>Price: ₹{s.price}</Typography>
                <Typography>Stock: {s.stock}</Typography>
                <Typography>Category: {s.category}</Typography>
                <Button component={Link} to={`/sweet/${s._id}`} sx={{ mt: 1 }}>View</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default UserDashboard;
