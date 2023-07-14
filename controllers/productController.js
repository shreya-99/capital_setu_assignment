const Product = require('../models/product');

const createProduct = async (req, res) => {
    // Create a new product
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const readProducts = async (req, res) => {
    try {
        const { name, page } = req.query;
        const limit = page > 1 ? 12 : 10;
        const skip = (page - 1) * limit;

        let query = Product.find();

        // Apply search filter
        if (name) {
            query = query.regex('name', new RegExp(name, 'i'));
        }

        // Apply pagination
        query = query.skip(skip).limit(limit);

        // Execute the query and retrieve products
        const products = await query.exec();

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createProduct,
    readProducts,
    updateProduct,
    deleteProduct
};
