import mongoose from 'mongoose';

const connectDB = async () => {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
        throw new Error('MONGO_URI is not defined.');
    }

    try {
        // Mongoose 7+ does not require useNewUrlParser or useUnifiedTopology
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected.');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;
