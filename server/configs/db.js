import mongoose from "mongoose";

const connectDB = async () => {

    try {

        mongoose.connection.on("connected", () => {
            console.log("Database connected successfully");
        });

        let mongodbURI = process.env.MONGODB_URI;

        const projectName = "resume-builder";

        if (!mongodbURI) {
            throw new Error("MONGODB_URI is not set");
        }

        // Remove trailing slash if present
        if (mongodbURI.endsWith("/")) {
            mongodbURI = mongodbURI.slice(0, -1);
        }

        // Connect Database
        await mongoose.connect(`${mongodbURI}/${projectName}`);

    } catch (error) {

        console.log("Error connecting to database:", error.message);

    }
};

export default connectDB;