import mongoose from 'mongoose';

const sweetSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number,
  category: String,
  description: String,
  imageUrl: String
});

export default mongoose.model('Sweet', sweetSchema);
