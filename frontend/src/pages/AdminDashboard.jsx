import { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import SweetForm from './SweetForm';
import api from '../api/axios';

function AdminDashboard() {
  const [sweets, setSweets] = useState([]);
  const [editingSweet, setEditingSweet] = useState(null);

  const fetchSweets = async () => {
    const res = await api.get('/admin/sweets');
    setSweets(res.data);
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const handleEdit = sweet => setEditingSweet(sweet);

  const handleDelete = async id => {
    await api.delete(`/admin/sweet/${id}`);
    fetchSweets();
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      
      <SweetForm fetchSweets={fetchSweets} editingSweet={editingSweet} setEditingSweet={setEditingSweet} />

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>All Sweets</Typography>
      <Grid container spacing={3}>
        {sweets.map(s => (
          <Grid item xs={12} sm={6} md={4} key={s._id}>
            <Card sx={{ maxWidth: 345, boxShadow: 4 }}>
              {s.image && <CardMedia component="img" height="200" image={`/images/${s.image}`} alt={s.name} />}
              <CardContent>
                <Typography gutterBottom variant="h6">{s.name}</Typography>
                <Typography>Price: ₹{s.price}</Typography>
                <Typography>Stock: {s.stock}</Typography>
                <Typography>Category: {s.category}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleEdit(s)}>Edit</Button>
                <Button size="small" color="error" onClick={() => handleDelete(s._id)}>Delete</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default AdminDashboard;
