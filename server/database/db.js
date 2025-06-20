import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected!!");
    }catch(error) {
        console.log("Error occured", error);
    }
}

export default connectDB;