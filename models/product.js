const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    size: String,
    image: String,
    colour: String,
    price: Number,
    quantity: Number
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
