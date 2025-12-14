import Sweet from '../models/Sweet.js';
import Order from '../models/Order.js';

// Get all sweets for user
export const getAllSweets = async (req, res) => {
    console.log("comming here");
  try {
    const sweets = await Sweet.find();
    res.json(sweets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single sweet details
export const getSweetById = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: 'Sweet not found' });
    res.json(sweet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Place order
export const placeOrder = async (req, res) => {
  try {
    const { userId, sweetId, quantity } = req.body;
    const sweet = await Sweet.findById(sweetId);
    if (!sweet) return res.status(404).json({ message: 'Sweet not found' });
    if (sweet.stock < quantity) return res.status(400).json({ message: 'Not enough stock' });

    const totalPrice = sweet.price * quantity;
    const order = new Order({ userId, sweetId, quantity, totalPrice });
    await order.save();

    // Decrease stock
    sweet.stock -= quantity;
    await sweet.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
