const express = require('express');
require('dotenv').config();

console.log(process.env.PORT); 

const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.static('public'));
app.use(cookieParser());
app.use(cors({credentials:true, origin: 'http://localhost:5173'}));
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL)
  .then((result) => app.listen(process.env.PORT,(req,res)=>{
    console.log('mongodb connected and started');
  }))
  .catch((err) => console.log(err));

// app.get('*', checkUser);



app.use('/api', authRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});