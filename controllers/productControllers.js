const Product = require('../models/Product');
const { validationResult } = require('express-validator');
const Category = require('../models/Category');

exports.creatingProduct = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: 'Validation error', errors:errors.array() });
        }
        const { title, description, price, imageUrl, category, inventory } = req.body;
        // const userId = req.user.id;

        // const existingCategory = await Category.findById(category);
        // if(!existingCategory)return res
        //   .status(400)
        //   .json({ success: false, message: "Invalid category" });


        if (!price || !title) return res.status(400).json({ success: false, message: 'price and tilte are required' });
        const product = new Product({
            user: req.user.id,
            title,
            description,
            price,
            imageUrl,
            category,
            inventory
        });

        await product.save();
        res.status(201).json({ success: true, message: 'product added successful' });
    }
    catch (err) {
        console.error('adding product error', err);
        res.status(500).json({ success: false, message: 'adding product failed', error: err.message });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate({ id: req.user.id }, req.body, { next: true });
        if (!product) return (401).json({ success: false, message: 'Product not found' });
        res.status({
            success: true, message: 'product updated successfully', product: {
                title: product.tilte,
                category: product.title
                
            }
        });
    } catch (err) {
        console.error('updating product error', err.message);
        res.status(500).json({ success: false, message: 'updating product failed', error: err.message });
    }
}