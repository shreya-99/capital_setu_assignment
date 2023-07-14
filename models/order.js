const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    order_code: String,
    order_date: Date,
    required_date: Date,
    shipped_date: Date,
    order_status: String
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
