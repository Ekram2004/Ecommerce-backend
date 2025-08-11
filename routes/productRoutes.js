const express = require('express');
const router = express.Router();
const { creatingProduct, updateProduct } = require('../controllers/productControllers');

router.post("/product", creatingProduct);
router.post("/product/:id", updateProduct);

module.exports = router;

