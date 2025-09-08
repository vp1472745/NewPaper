import dotenv from 'dotenv';
dotenv.config({ path: './.env' }); // Load environment variables from root .env

import mongoose from 'mongoose';
import Admin from '../models/adminModel.js';
import connectDB from '../config/db.js';

async function seedAdmin() {
    try {
        console.log('Loaded MONGO_URI:', process.env.MONGO_URI);

        await connectDB();

        const adminData = {
            username: 'admin',
            email: 'admin@example.com',
            password: 'admin123', // In production, always hash passwords!
            role: 'admin'
        };

        const existingAdmin = await Admin.findOne({ email: adminData.email });

        if (!existingAdmin) {
            await Admin.create(adminData);
            console.log('Admin user seeded successfully.');
        } else {
            console.log('Admin user already exists.');
        }

    } catch (err) {
        console.error('Error seeding admin:', err);
    } finally {
        await mongoose.disconnect();
        console.log('MongoDB disconnected.');
    }
}

seedAdmin();
