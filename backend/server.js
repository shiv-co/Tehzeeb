// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import connectDB from './config/db.js';

// // --- THIS IS THE FIX ---
// // Import the file for its side-effect (runs the config)
// // This line MUST be here for Cloudinary to work.
// import './config/cloudinary.js';
// // ----------------------

// // Import Routes
// import userRoutes from './routes/userRoutes.js';
// import productRoutes from './routes/productRoutes.js';
// import uploadRoutes from './routes/uploadRoutes.js';

// // Import Middleware
// import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// dotenv.config();
// connectDB();

// const app = express();
// app.use(cors({
//     origin: ["http://localhost:3000", "https://tehzeeb.vercel.app/"],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));

// // Body parser middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

// // --- MOUNT ROUTES ---
// app.use('/api/users', userRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/upload', uploadRoutes);
// // -----------------------

// // --- ERROR MIDDLEWARE ---
// // These MUST be last
// app.use(notFound);
// app.use(errorHandler);
// // ------------------------

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
// hello


// export default app;







import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Cloudinary config
import './config/cloudinary.js';

// Routes
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

// Middleware
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();

const app = express();

// ✅ CORS Configuration (Fixed)
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://tehzeeb.vercel.app"  // 🔥 removed trailing slash
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
 allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/upload', uploadRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

export default app;
