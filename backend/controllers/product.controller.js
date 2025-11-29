import mongoose from "mongoose";
import Product from '../models/product.model.js';

export const findProduct = async (req,res) => {
    try {
        const product = await Product.find({});
        res.status(200).json({success: true, data: product, message: "Products fethced!"});
    }
    catch(error) {
        console.error("Failed while getting errors:", error.message);
        res.status(501).json({success:false, message: "Server Error"});
    }
}

export const updateProduct = async (req, res) => {
    const {id} = req.params;

    const product = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({success: false, message: "Product not found"});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product);
        res.status(201).json({success: true, messsage: "Product Updated"});
    }
    catch(error) {
        console.error(`Error while updating product: ${error.message}`);
        res.status(500).json({success: false, message: "Server Error"});
    }
}

export const createProduct = async (req, res) => {
    const product = req.body;
    if(!product.name || !product.price || !product.image) {
        return  res.status(400).json({success:false, message: "Please provide all fields"});
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    }
    catch (error) {
        console.error(`Product creatation failed `, error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
};

export const getProductById = async (req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success:false, message:"Invalid product id"});
    }

    try {
        const product = await Product.findById(id);
        if(!product) {
            return res.status(404).json({success:false, data: product});
        }
    } catch (error) {
        console.error(`Error while fetching product: ${error.message}`);
        res.status(500).json({success: false, message: "Server Error"});
    }
}

export const deleteProduct = async (req,res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({success: false, message: "Invalid product id"});
    }
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true, message: "Product deleted"});
    }
    catch (error) {
        console.log(`Error in deleting products ${error.message}`);
        res.status(404).json({success: false, message: "Product not found"});
    }
}
