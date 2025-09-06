import express from 'express';
import Admin from "../src/routes/adminRoute.js"

const app = express();
const PORT = 5000;

app.use(express.json()); // Add this line to parse JSON bodies

app.use("/admin", Admin); // Use slash for route prefix
app.get('/', (req, res) => {
  res.send('Backend is running successfully!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
