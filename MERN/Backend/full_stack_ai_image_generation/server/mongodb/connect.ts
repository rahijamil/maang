import mongoose from "mongoose";

const connectDB = (url: string | undefined) => {
    try {
        if (url) {
            mongoose.set("strictQuery", true);
            mongoose.connect(url);
            console.log("MongoDB Connected");
        } else {
            throw new Error("url is undefined");
        }
    } catch (error) {
        console.error(error);
    }
};

export default connectDB;
