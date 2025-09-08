import express from 'express';
import dotenv from 'dotenv';
import adminRoutes from './src/routes/adminRoute.js'; // Correct import for admin routes

dotenv.config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 5000; // Use PORT from .env or default to 5000

app.use(express.json()); // Middleware to parse JSON bodies

app.use("/admin", adminRoutes); // Use admin routes for the /admin endpoint

app.get('/', (req, res) => {
  res.send('Backend is running successfully!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
