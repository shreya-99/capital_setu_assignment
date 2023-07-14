const Product = require('../models/product');

const createProduct = async (req, res) => {
    const { name, size, image, colour, price, quantity } = req.body;

    try {
        // Create a new product
        const newProduct = new Product({ name, size, image, colour, price, quantity });
        await newProduct.save();

        res.status(201).json({ message: 'Product created successfully' });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const readProducts = async (req, res) => {
    try {
        // Read products
        const products = await Product.find();

        res.json(products);
    } catch (error) {
        console.error('Error reading products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const { name, size, image, colour, price, quantity } = req.body;

    try {
        // Update the product details
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { name, size, image, colour, price, quantity },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        // Delete the product
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createProduct,
    readProducts,
    updateProduct,
    deleteProduct
};
