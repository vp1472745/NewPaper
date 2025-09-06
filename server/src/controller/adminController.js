import Admin from '../models/adminModel.js';
import bcrypt from 'bcrypt'; // Ensure bcrypt is installed
// import jwt from 'jsonwebtoken'; // Uncomment if using JWT

export const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log('Admin login attempt:', email); // Log login attempt
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            console.log('Admin not found:', email); // Log not found
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            console.log('Password mismatch for:', email); // Log password mismatch
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        console.log('Admin login successful:', email); // Log success
        // If using JWT:
        // const token = jwt.sign({ id: admin._id, role: admin.role }, 'your_jwt_secret');
        // return res.json({ token });

        // Without JWT:
        return res.json({ message: 'Login successful', admin: { id: admin._id, username: admin.username, email: admin.email } });
    } catch (err) {
        console.error('Login error:', err); // Log error
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};