const Order = require('../models/Order');
const Cart = require('../models/Cart');

exports.createOrder = async (req, res) => {
    try {
        const { shippingAddress, paymentMethod } = req.body;

        const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Your cart is empty' });
        }

        const itemsPrice = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
        const shippingPrice = itemsPrice > 100 ? 0 : 10;
        const totalPrice = itemPrice + shippingPrice;

        const order = new Order({
            user: req.user._id,
            orderItems: cart.items.map(item => ({
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price
            })),
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice
        });

        const saveOrder = await order.save();

        cart.items = [];
        await cart.save();

        res.status(201).json(saveOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('orderItems.product');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'name email');
        re.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};