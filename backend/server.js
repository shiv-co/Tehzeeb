
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import "./config/cloudinary.js";

// Routes
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

// Middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

// ✅ CORS FIX — put this BEFORE any routes or middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Vite local
      
      "https://www.tehzeebcreations.in", // frontend deployed site
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// app.js or server.js
app.use((req, res, next) => {
  if (req.url.match(/\.(js|css|png|jpg|jpeg|svg|gif)$/)) {
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  } else {
    res.setHeader("Cache-Control", "no-cache");
  }
  next();
});


// ✅ Handle OPTIONS requests (important for preflight)


// ✅ Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API is running successfully 🚀");
});

// ✅ Routes
app.use("/api/payment", paymentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);




// ✅ Error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`✅ Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);

export default app;
