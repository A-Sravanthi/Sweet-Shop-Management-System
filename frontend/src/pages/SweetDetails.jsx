import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, TextField, Button, Alert, Card, CardMedia, CardContent } from '@mui/material';
import api from '../api/axios';

function SweetDetails() {
  const { id } = useParams();
  const [sweet, setSweet] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSweet = async () => {
      try {
        const res = await api.get(`/user/sweet/${id}`);
        setSweet(res.data);
      } catch (err) {
        console.error('Error fetching sweet details:', err);
      }
    };
    fetchSweet();
  }, [id]);

  const handleOrder = async () => {
    try {
      const userId = localStorage.getItem('userId'); // make sure userId is saved on login
      await api.post('/user/order', { userId, sweetId: id, quantity });
      setMessage('Order placed successfully!');
      setSweet(prev => ({ ...prev, stock: prev.stock - quantity }));
      setQuantity(1);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to place order');
    }
  };

  if (!sweet) return <Typography sx={{ p: 4 }}>Loading...</Typography>;

  return (
    <Card sx={{ maxWidth: 600, margin: '40px auto', p: 2, boxShadow: 4 }}>
      {sweet.image && (
        <CardMedia
          component="img"
          height="300"
          image={`http://localhost:5000/images/${sweet.image}`}
          alt={sweet.name}
        />
      )}
      <CardContent>
        <Typography variant="h4" gutterBottom>{sweet.name}</Typography>
        <Typography variant="body1"><b>Price:</b> ₹{sweet.price}</Typography>
        <Typography variant="body1"><b>Stock:</b> {sweet.stock}</Typography>
        <Typography variant="body1"><b>Category:</b> {sweet.category}</Typography>
        <Typography variant="body1"><b>Description:</b> {sweet.description}</Typography>

        {message && <Alert severity="success" sx={{ my: 2 }}>{message}</Alert>}

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, gap: 2 }}>
          <TextField
            type="number"
            label="Quantity"
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            inputProps={{ min: 1, max: sweet.stock }}
            sx={{ width: 100 }}
          />
          <Button
            variant="contained"
            onClick={handleOrder}
            disabled={quantity > sweet.stock || sweet.stock === 0}
          >
            Place Order
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default SweetDetails;
