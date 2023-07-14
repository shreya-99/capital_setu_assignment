const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware.authenticateToken, orderController.createOrder);
router.get('/', orderController.readOrders);
router.put('/:id', authMiddleware.authenticateToken, orderController.updateOrder);

module.exports = router;
