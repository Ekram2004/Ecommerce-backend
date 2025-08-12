const express = require('express');
const { createOrder, getMyOrders, getAllOrders } = require('../controllers/orderControllers');
const { auth, isAdmin } = require("../middleware/auth");
const router = express.Router();

router.post('/', auth, createOrder);
router.get("/myorders", auth, getMyOrders);
router.get('/', auth, isAdmin, getAllOrders);

module.exports = router;

