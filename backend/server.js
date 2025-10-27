import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// --- THIS IS THE FIX ---
// Import the file for its side-effect (runs the config)
// This line MUST be here for Cloudinary to work.
import './config/cloudinary.js';
// ----------------------

// Import Routes
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

// Import Middleware
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors({
   origin: [
      "https://tehzeeb.vercel.app/", // ✅ your frontend domain
      "http://localhost:5173" // ✅ for local development (Vite) or 3000 for CRA
    ],
    credentials: true,
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('API is running...');
});

// --- MOUNT ROUTES ---
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/upload', uploadRoutes);
// -----------------------

// --- ERROR MIDDLEWARE ---
// These MUST be last
app.use(notFound);
app.use(errorHandler);
// ------------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



export default app;