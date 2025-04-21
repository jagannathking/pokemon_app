import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()


const database = async() => {
  try {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI environment variable not set.");
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
} catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    throw error; 
}
}

export default database;