// models/AdminEmail.js
const mongoose = require('mongoose');

const adminEmailSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('AdminEmail', adminEmailSchema);
