const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware.authenticateToken, productController.createProduct);
router.get('/', productController.readProducts);
router.put('/:id', authMiddleware.authenticateToken, productController.updateProduct);
router.delete('/:id', authMiddleware.authenticateToken, productController.deleteProduct);

module.exports = router;
