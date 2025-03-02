import mongoose from "mongoose";
import logger from "../utils/logger.js";

const connectDB = async() =>{

    try {
        const connectionInstance =await mongoose.connect(process.env.MONGODB_URI);
        logger.info("Database connected");
        console.log('database connected successfully...')
    } catch (error) {
        logger.error(error);
        console.log('error connecting database')
        throw new Error(error)
    }
} 
export default connectDB