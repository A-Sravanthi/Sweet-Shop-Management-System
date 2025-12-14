import Sweet from '../models/Sweet.js';
import fs from 'fs';
import path from 'path';

// Add Sweet
export const addSweet = async (req, res) => {
  try {
    const { name, price, stock, category, description } = req.body;
    const image = req.file ? req.file.filename : null;

    const newSweet = new Sweet({ name, price, stock, category, description, image });
    await newSweet.save();

    res.status(201).json(newSweet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Sweet
export const updateSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: 'Sweet not found' });

    const { name, price, stock, category, description } = req.body;

    // Remove old image if a new one is uploaded
    if (req.file && sweet.image) {
      const oldImagePath = path.join('backend/images', sweet.image);
      if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
    }

    sweet.name = name;
    sweet.price = price;
    sweet.stock = stock;
    sweet.category = category;
    sweet.description = description;
    if (req.file) sweet.image = req.file.filename;

    await sweet.save();
    res.json(sweet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Sweet
export const deleteSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: 'Sweet not found' });

    // Delete image file
    if (sweet.image) {
      const imagePath = path.join('backend/images', sweet.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await sweet.deleteOne();
    res.json({ message: 'Sweet deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all sweets (admin)
export const getAllSweetsAdmin = async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.json(sweets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
