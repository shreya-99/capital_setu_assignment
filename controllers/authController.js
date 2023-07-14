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
    try {
        const { mobileNumber, password } = req.body;

        // Find the user by mobile number
        const user = await User.findOne({ mobileNumber });

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the password matches
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = generateToken(user);
        res.json({ token, role: user.role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    signUp,
    login
};
