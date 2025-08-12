const express = require('express');
const { getCart, addToCart, updateCartItem, removeCartItem } = require('../controllers/cartControllers');
const { auth } = require('../middleware/auth');

const router = express.Router();


router.get('/', auth, getCart);
router.post('/', auth, addToCart);
router.put('/:itemId', auth, updateCartItem);
router.delete('/:itemId', auth, removeCartItem);

module.exports = router;
