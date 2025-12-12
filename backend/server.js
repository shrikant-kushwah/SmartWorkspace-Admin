require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDb = require('./config/db');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

(async () => {
  try {
    await connectDb();
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
})();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
