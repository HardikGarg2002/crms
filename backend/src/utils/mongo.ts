import mongoose from "mongoose";

export async function connectMongoDb() {
    console.log("Connecting to MongoDB");   
    const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
    const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
    try {
      await mongoose.connect(MONGO_URI, {
        dbName: MONGO_DB_NAME,
        minPoolSize: 5,
        retryWrites: true,
      });
  
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }
  
export function isMongoDBConnected() {
	return mongoose.connection.readyState === 1;
};