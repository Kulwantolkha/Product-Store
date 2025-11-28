import express from 'express';
import Product from '../models/product.model.js';
import mongoose from 'mongoose';
import {findProduct} from '../controllers/product.controller.js';
import {updateProduct} from '../controllers/product.controller.js';
import {createProduct} from '../controllers/product.controller.js';
import {deleteProduct} from '../controllers/product.controller.js';

const router = express.Router();


router.get("/", findProduct);
router.put("/:id", updateProduct);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);


export default router;