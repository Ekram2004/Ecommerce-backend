const express = require('express');
const {
  createProduct,
  getProduct,
  getProductById,
  updateProduct,
deleteProduct} = require("../controllers/productControllers");
const { auth, isAdmin } = require('../middleware/auth');

const router = express.Router();
//public
router.get("/", getProduct);
router.get('/:id', getProductById);

//Admin

router.post("/", auth, isAdmin, createProduct);
router.put('/:id', auth, isAdmin, updateProduct);
router.delete('/:id', auth, isAdmin, deleteProduct);

module.exports = router;