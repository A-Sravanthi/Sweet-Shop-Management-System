import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sweetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sweet' },
  quantity: Number,
  totalPrice: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', orderSchema);
