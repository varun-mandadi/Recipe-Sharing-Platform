const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const recipeRoutes = require('./routes/recipeRoutes');
const authRoutes = require('./routes/authRoutes');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Enable Cross-Origin Resource Sharing and JSON parsing
app.use(cors());
app.use(express.json());

// Route middleware
app.use('/api/recipes', recipeRoutes);
app.use('/api/auth', authRoutes);

// Connect to MongoDB and start the server
const startServer = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_ENDPOINT}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`
    );

    console.log('MongoDB connected successfully');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is up and running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
  }
};

startServer();
