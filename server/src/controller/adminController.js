import Admin from '../models/adminModel.js';
import bcrypt from 'bcrypt'; // Ensure bcrypt is installed
import jwt from 'jsonwebtoken';

export const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        // Generate JWT token
        const token = jwt.sign(
            { id: admin._id, role: admin.role },
            process.env.JWT_SECRET || 'default_secret',
            { expiresIn: '1h' }
        );
        return res.json({
            message: 'Login successful',
            token,
            admin: { id: admin._id, username: admin.username, email: admin.email }
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};