// import modules
import mongoose from "mongoose";
import { environment } from "./environment.js";

// MongoDB connection

// Connect to MongoDB using Mongoose
const connectDB = async () => {
    try {
        await mongoose.connect(environment.MONGOURI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exit the process if the connection fails
    }
};

export default connectDB; // Export the connection function