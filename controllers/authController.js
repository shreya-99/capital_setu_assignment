const User = require('../models/user');

const signUp = async (req, res) => {
    const { mobile } = req.body;

    try {
        // Check if user with the given mobile number already exists
        const existingUser = await User.findOne({ mobile });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists with this mobile number' });
        }

        // Create a new user
        const newUser = new User({ mobile });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const login = async (req, res) => {
    const { mobile } = req.body;

    try {
        // Check if user with the given mobile number exists
        const existingUser = await User.findOne({ mobile });
        if (!existingUser) {
            return res.status(401).json({ message: 'Invalid mobile number' });
        }

        // Generate and return JWT token
        const token = generateToken(existingUser);

        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    signUp,
    login
};
