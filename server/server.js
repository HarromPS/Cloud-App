// app imports
import express from 'express';
import connectToMongoDB from './middleware/connectDB.js';
import cors from 'cors';
import dotenv from 'dotenv';
import api_routes from "./api_routes/cloudinaryRoutes.js";

const PORT = 4001;
const app = express();

// Load environment variables from .env file
dotenv.config();

// Check if dotenv is configured correctly
// console.log('Environment Variables:', process.env.CLOUDINARY_CLOUD_NAME);

// connecting a database
connectToMongoDB();

// app usages
app.use(cors());
app.use(express.json());
app.use("/media",api_routes);


// get request 
app.get("/",(request,response)=>{
    response.send("Hello");
});

// app listening 
app.listen(PORT,()=>{
    console.log(`Success: http://localhost:${PORT}`);
})