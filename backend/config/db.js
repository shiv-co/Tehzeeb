import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Mongoose.connect returns a promise, so we await it
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    // If successful, log the host
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If it fails, log the error and exit the process
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;