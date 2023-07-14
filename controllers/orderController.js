const Order = require('../models/order');

const createOrder = async (req, res) => {
    const { user_id, order_code, order_date, required_date, shipped_date, order_status } = req.body;

    try {
        // Create a new order
        const newOrder = new Order({ user_id, order_code, order_date, required_date, shipped_date, order_status });
        await newOrder.save();

        res.status(201).json({ message: 'Order created successfully' });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const readOrders = async (req, res) => {
    try {
        // Read orders
        const orders = await Order.find();

        res.json(orders);
    } catch (error) {
        console.error('Error reading orders:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateOrder = async (req, res) => {
    const orderId = req.params.id;
    const { user_id, order_code, order_date, required_date, shipped_date, order_status } = req.body;

    try {
        // Update the order details
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { user_id, order_code, order_date, required_date, shipped_date, order_status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(updatedOrder);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createOrder,
    readOrders,
    updateOrder
};
