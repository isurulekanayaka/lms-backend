const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/course'); // Import the course routes
const moduleRoutes = require('./routes/module'); // Import the course routes
const studentRoutes = require('./routes/student'); // Import the course routes

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Use the routes
app.use('/api/auth', authRoutes); // Auth routes
app.use('/api/courses', courseRoutes); // Course routes
app.use('/api/modules', moduleRoutes); // Course routes
app.use('/api/student', studentRoutes); // Course routes

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
