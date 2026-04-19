import express from "express"
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import { createProduct, getSellerProducts, getAllProducts, getProductDetails } from "../controllers/product.controller.js";
import multer from "multer"
import { createProductValidator } from "../validator/product.validator.js";

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
})
const router = express.Router();


/**
 * @route POST /api/products
 * @description Create a new product
 * @access Private (Seller only)
 */
router.post("/", authenticateSeller, upload.array("images", 7), createProductValidator, createProduct)

/**
 * @route GET /api/products/seller
 * @description Get all products of the authenticated seller
 * @access Private (Seller only)
 */
router.get("/seller", authenticateSeller, getSellerProducts)


/**
 * @route GET /api/products
 * @description Get all products
 * @access public
 */
router.get("/", getAllProducts)
export default router

/**
 * @router GET /api/products/detail/:id
 * @description get product details by ID
 * @access public
 */
router.get("/detail/:id", getProductDetails)