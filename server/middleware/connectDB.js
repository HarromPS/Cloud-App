import mongoose from "mongoose";

const  path = 'mongodb+srv://Harry:harry@mongocloud.hvhwirl.mongodb.net/?retryWrites=true&w=majority&appName=MongoCloud' ;

const options={
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}
const connectToMongoDB = async ()=>{
    try{
        mongoose.set("strictQuery",false);
        mongoose.connect(path,options);
        console.log("MongoDB connected successfully");
    }catch(err){
        console.log(err);
    }
}

export default connectToMongoDB;