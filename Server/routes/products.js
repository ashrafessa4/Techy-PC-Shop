const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const joi = require("joi");
const Product = require("../models/Product");

// Product Scehema
const productSchema = joi.object({
  name: joi.string().required().min(2),
  price: joi.number().required().min(2),
  category: joi.string().required().min(2),
  description: joi.string().required().min(6),
  image: joi.string().required(),
  inStock: joi.boolean().required(),
});

// * Add New Product (Admin Only)
router.post("/", auth, async (req, res) => {
  try {
    // Check if the the user is Admin
    if (!req.payload.isAdmin)
      return res.status(400).send("Only Admin can add Products..");

    // Validation for body
    const { error } = productSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);

    // Add Product to DB
    let product = new Product(req.body);
    await product.save();

    // Send the new product details
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

// * Get all Products in store
router.get("/", async (req, res) => {
  try {
    let products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send("Error in get Products");
  }
});

// * Update Product Details (Admin Only)
router.put("/:id", auth, async (req, res) => {
  try {
    // Check if the the user is Admin
    if (!req.payload.isAdmin)
      return res.status(400).send("Only Admin can add Products..");

    const { error } = productSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);

    // Edit Product
    let product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!product) return res.status(404).send("No Such Product");

    // Send the updated Product Details
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

// * Delete Product By Id (Admin Only)
router.delete("/:id", auth, async (req, res) => {
  try {
    // Check if the the user is Admin
    if (!req.payload.isAdmin)
      return res.status(400).send("Only Admin can add Products..");

    // Delete Product
    let product = await Product.findOneAndRemove({ _id: req.params.id });
    if (!product) return res.status(400).send("Product was not found!");
    res.status(200).send("Product Removed Successfully!");
  } catch (error) {
    res.status(400).send("Error in delete Product");
  }
});

// *Get Prodcut Details by Id
router.get("/:id", async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id });
    if (!product) return res.status(404).send("Theres no such product");
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send("Error in get Product...");
  }
});

module.exports = router;
