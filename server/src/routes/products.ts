import express from "express";
import * as ProductController from "../controllers/products";

const router = express.Router();

router.get("/:categoryId", ProductController.getProducts);

router.post("/", ProductController.createProduct);

router.patch("/:productId", ProductController.updateProduct);

router.delete("/:productId", ProductController.deleteProduct);

export default router;
