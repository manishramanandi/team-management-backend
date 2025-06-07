const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
const body = [];

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('mongodb connected successfully'))
.catch((error) => console.log('mongodb connection error:', error));

app.get('/', (req, res) => {
  res.json({
    message: 'Team management API is running!',
    status: 'success',
    message: body,
  });
});

app.use('/api/auth', require('./routes/auth'));


// Error handling mid

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'something went wrong',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// if undefined routes

app.use('*', (req, res) => {
  res.status(404).json({message: 'Route not found'});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
})

























