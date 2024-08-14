import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import tvlRoutes from './routes/tvl.js';
// Load environment variables
dotenv.config();

// Express app
const app = express();

// Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use(express.json());

// Use the TVL route
app.use('/api', tvlRoutes);

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    // Listen for requests only after the DB connection is established
    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB & listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.error('Error connecting to DB:', error));
