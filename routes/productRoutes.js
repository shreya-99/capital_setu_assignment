const express = require('express');
const router = express.Router();
const multer = require('multer');
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

// Multer configuration for file upload
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

const upload = multer({ storage, fileFilter });

// Create a new product (upload multiple images)
router.post('/', authMiddleware.authenticateToken, upload.array('images', 5), productController.createProduct);

router.get('/', productController.readProducts);
router.put('/:id', authMiddleware.authenticateToken, productController.updateProduct);
router.delete('/:id', authMiddleware.authenticateToken, productController.deleteProduct);

module.exports = router;