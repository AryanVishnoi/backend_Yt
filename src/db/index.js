import mongoose from "mongoose"
import {
    DB_NAME
} from "../constants.js";
import express from "express";

import dotenv from 'dotenv';
dotenv.config({
    path: 'public/Temp/.env'
});



const connectDB = async () => {
    try {
        console.log("MongoDB URL:", process.env.MONGODB_URL);

        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`\n MongoDB connected !! DB host : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDb connection error ", error)
        process.exit(1);
    }
}

export default connectDB;