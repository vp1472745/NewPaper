import mongoose from 'mongoose';
import Admin from '../models/adminModel.js'; // ".js" lagana zaruri hai ES modules me

async function seedAdmin() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect('mongodb://localhost:27017/newspaper', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000 // Increase timeout to 30s
        });
        console.log('Connected to MongoDB.');

        const adminData = {
            username: 'admin',
            email: 'admin@example.com',
            password: 'admin123', // Production me hamesha hash karo!
            role: 'admin'
        };

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email: adminData.email });
        if (!existingAdmin) {
            await Admin.create(adminData);
            console.log('Admin user seeded.');
        } else {
            console.log('Admin user already exists.');
        }

    } catch (err) {
        console.error('Error seeding admin:', err);
        if (err.name === 'MongooseServerSelectionError') {
            console.error('Could not connect to MongoDB. Is the server running?');
        }
    } finally {
        await mongoose.disconnect();
    }
}

mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
    if (err.name === 'MongooseServerSelectionError') {
        console.error('Could not connect to MongoDB. Is the server running?');
    }
});

seedAdmin();
