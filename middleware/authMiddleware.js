const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticateToken = (req, res, next) => {
    // Get the authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    // Check if the token exists
    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }
    try {
        const user = verifyToken(token);

        // Check user role
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.user = user;

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = {
    authenticateToken
};
