import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOURL)
        console.log("mongodb connected");
    } catch (error) {
        console.log("error connecting mongodb", error.message);
    }
};

export default connectDB;