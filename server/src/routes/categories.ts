import express from "express";
import * as CategoriesController from "../controllers/categories";

const router = express.Router();

router.get("/", CategoriesController.getCategorires);

router.get("/:categoryId", CategoriesController.getCategory);

router.post("/", CategoriesController.createCategory);

router.patch("/:categoryId", CategoriesController.updateCategory);

router.delete("/:categoryId", CategoriesController.deleteCategory);

export default router;
