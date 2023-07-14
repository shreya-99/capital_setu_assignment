const Product = require('../models/product');
const multer = require('multer');

// Configure Multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Only JPG or PNG images are allowed'), false);
    }
};

const upload = multer({ storage, fileFilter }).array('images', 5);

const createProduct = async (req, res) => {
    try {
        const { name, size, color, price, quantity } = req.body;

        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: 'Error uploading files' });
            } else if (err) {
                return res.status(500).json({ message: 'Internal server error' });
            }

            // Validate file size and type
            const { files } = req;
            if (!files || files.length === 0) {
                return res.status(400).json({ message: 'Please upload at least one image' });
            }

            const images = files.map(file => file.filename);

            // Create a new product
            const product = new Product({
                name,
                size,
                color,
                price,
                quantity,
                images
            });

            await product.save();

            res.status(201).json(product);
        });
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