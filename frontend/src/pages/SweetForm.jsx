import { useState, useEffect } from 'react';
import { Box, TextField, Button, Stack } from '@mui/material';
import api from '../api/axios';

function SweetForm({ fetchSweets, editingSweet, setEditingSweet }) {
  const [form, setForm] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    description: '',
    image: null,
  });

  useEffect(() => {
    if (editingSweet) {
      setForm(editingSweet);
    }
  }, [editingSweet]);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (files) setForm({ ...form, image: files[0] });
    else setForm({ ...form, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('price', form.price);
    formData.append('stock', form.stock);
    formData.append('category', form.category);
    formData.append('description', form.description);
    if (form.image) formData.append('image', form.image);

    try {
      if (editingSweet) {
        await api.put(`/admin/sweet/${editingSweet._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setEditingSweet(null);
      } else {
        await api.post('/admin/sweet', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      setForm({ name: '', price: '', stock: '', category: '', description: '', image: null });
      fetchSweets();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
        <TextField label="Name" name="name" value={form.name} onChange={handleChange} required fullWidth />
        <TextField label="Price" name="price" type="number" value={form.price} onChange={handleChange} required fullWidth />
        <TextField label="Stock" name="stock" type="number" value={form.stock} onChange={handleChange} required fullWidth />
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
        <TextField label="Category" name="category" value={form.category} onChange={handleChange} required fullWidth />
        <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth />
        <Button variant="contained" component="label">
          Upload Image
          <input type="file" name="image" accept="image/*" hidden onChange={handleChange} />
        </Button>
      </Stack>

      <Button type="submit" variant="contained">{editingSweet ? 'Update' : 'Add'} Sweet</Button>
    </Box>
  );
}

export default SweetForm;
