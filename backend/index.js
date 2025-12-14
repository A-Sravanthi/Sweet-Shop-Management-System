// backend/index.js

const express = require('express');
const path = require('path');                // Added path module
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');  // Make sure this exists

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(cookieParser());

// Serve static files
app.use(express.static('public'));  // general static folder
app.use('/images', express.static(path.join(path.resolve(), 'images'))); // for sweet images

// Routes
app.use('/api', authRoutes);
app.use('/api/admin', adminRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

// Connect to MongoDB and start server
mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
      console.log('MongoDB connected');
    });
  })
  .catch(err => console.log(err));
