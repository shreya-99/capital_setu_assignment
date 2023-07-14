const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
