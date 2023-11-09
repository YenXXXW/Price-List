import { RequestHandler } from "express";
import { aseertIsDefined } from "../utils/aseertIsDefined";
import ProductModel from "../models/product";
import mongoose from "mongoose";
import createHttpError from "http-errors";

export const getProducts: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  const categoryId = req.params.categoryId;

  try {
    aseertIsDefined(authenticatedUserId);

    if (!categoryId) throw createHttpError(400, "CategoryId required");

    if (!mongoose.isValidObjectId(categoryId)) {
      throw createHttpError(400, "Invalid categoryId");
    }

    const products = await ProductModel.find({
      userId: authenticatedUserId,
      categoryId,
    }).exec();

    if (!products) {
      throw createHttpError(404, "Product not found");
    }
    res.status(200).json(products);
  } catch (error) {
    // error is passed to the next so that express forwards this to the error handler
    next(error);
  }
};

type CreateProductsBody = {
  categoryId: mongoose.Types.ObjectId;
  productName: string;
  price: string;
};

export const createProduct: RequestHandler<
  unknown,
  unknown,
  CreateProductsBody,
  unknown
> = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  const categoryId = req.body.categoryId;
  const productName = req.body.productName;
  const price = req.body.price;
  try {
    aseertIsDefined(authenticatedUserId);

    if (!categoryId) {
      throw createHttpError(400, "CategoryId required");
    }
    aseertIsDefined(authenticatedUserId);

    if (!mongoose.isValidObjectId(categoryId)) {
      throw createHttpError(400, "Invalid categoryId");
    }

    if (!productName) {
      throw createHttpError(400, "product name required");
    }

    if (!price) {
      throw createHttpError(400, "product price required");
    }

    const newProduct = await ProductModel.create({
      userId: authenticatedUserId,
      categoryId,
      productName,
      price,
    });

    res.status(200).json(newProduct);
  } catch (error) {
    // error is passed to the next so that express forwards this to the error handler
    next(error);
  }
};

type UpdateProductsBody = CreateProductsBody;

type UpdateProductsParams = {
  productId: string;
};

export const updateProduct: RequestHandler<
  UpdateProductsParams,
  unknown,
  UpdateProductsBody,
  unknown
> = async (req, res, next) => {
  const productId = req.params.productId;
  const newPrice = req.body.price;
  const newProductName = req.body.productName;
  const categoryId = req.body.categoryId;
  const authenticatedUserId = req.session.userId;

  try {
    aseertIsDefined(authenticatedUserId);
    if (!mongoose.isValidObjectId(productId)) {
      throw createHttpError(400, "Invalid productId");
    }

    if (!mongoose.isValidObjectId(categoryId)) {
      throw createHttpError(400, "Invalid categoryId");
    }
    if (!newProductName) {
      throw createHttpError(400, "product name required");
    }

    if (!newPrice) {
      throw createHttpError(400, "product price required");
    }

    const product = await ProductModel.findById(productId).exec();

    if (!product) {
      throw createHttpError(404, "Product not found");
    }

    if (!product.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, "You can't update the product");
    }

    product.productName = newProductName;
    product.price = newPrice;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  const productId = req.params.productId;
  try {
    aseertIsDefined(authenticatedUserId);
    if (!mongoose.isValidObjectId(productId)) {
      throw createHttpError("Invalid productId");
    }

    const product = await ProductModel.findById(productId);

    if (!product) {
      throw createHttpError(404, "Product not found");
    }

    if (!product.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, "You can't delete the product");
    }

    await product.deleteOne();
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
