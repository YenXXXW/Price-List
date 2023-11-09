import { RequestHandler } from "express";
import CategoryModel from "../models/category";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { aseertIsDefined } from "../utils/aseertIsDefined";

export const getCategorires: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  try {
    aseertIsDefined(authenticatedUserId);
    const categories = await CategoryModel.find({
      userId: authenticatedUserId,
    }).exec();
    res.status(200).json(categories);
  } catch (error) {
    // error is passed to the next so that express forwards this to the error handler
    next(error);
  }
};

export const getCategory: RequestHandler = async (req, res, next) => {
  const categoryId = req.params.categoryId;
  const authenticatedUserId = req.session.userId;

  try {
    aseertIsDefined(authenticatedUserId);
    if (!mongoose.isValidObjectId(categoryId)) {
      throw createHttpError(400, "Invalid categoryId");
    }
    const category = await CategoryModel.findById(categoryId).exec();

    if (!category) {
      throw createHttpError(404, "Category not found");
    }

    if (!category.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, "You cannot access this note");
    }
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

type CreateCategoryBody = {
  // name is required but it is set optional because we can't know if the user send a request without a name for the category
  name?: string;
};

export const createCategory: RequestHandler<
  unknown,
  unknown,
  CreateCategoryBody,
  unknown
> = async (req, res, next) => {
  const name = req.body.name;
  const authenticatedUserId = req.session.userId;

  try {
    aseertIsDefined(authenticatedUserId);
    if (!name) throw createHttpError(400, "Need a name for the Category");
    const newCategory = await CategoryModel.create({
      userId: authenticatedUserId,
      name: name,
    });

    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

type UpdateCategoryBody = {
  // name is required but it is set optional because we can't know if the user send a request without a name for the category
  name?: string;
};

type UpdateCategoyParams = {
  //Don't need to be optional beacause without the categoryId it won't even reach the updateCategory Url
  categoryId: string;
};

export const updateCategory: RequestHandler<
  UpdateCategoyParams,
  unknown,
  UpdateCategoryBody,
  unknown
> = async (req, res, next) => {
  const categoryId = req.params.categoryId;
  const authenticatedUserId = req.session.userId;

  const newName = req.body.name;

  try {
    aseertIsDefined(authenticatedUserId);
    if (!mongoose.isValidObjectId(categoryId)) {
      throw createHttpError(400, "Invalid category category");
    }

    if (!newName)
      throw createHttpError(400, "Need a name to Update the Category");

    const category = await CategoryModel.findById(categoryId).exec();
    if (!category) {
      throw createHttpError(404, "Category not found");
    }
    if (!category.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, "You cannot update this  category");
    }

    category.name = newName;

    const updatedCategory = await category.save();
    res.status(200).json(updatedCategory);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory: RequestHandler = async (req, res, next) => {
  const categoryId = req.params.categoryId;
  const authenticatedUserId = req.session.userId;
  try {
    aseertIsDefined(authenticatedUserId);
    if (!mongoose.isValidObjectId(categoryId)) {
      throw createHttpError(400, "Invalid categoryId");
    }
    const category = await CategoryModel.findById(categoryId).exec();
    if (!category) {
      throw createHttpError(404, "Category not found");
    }
    if (!category.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, "You cannot delete this  category");
    }
    await category.deleteOne();
    res.status(204).json({ message: "Note successfully deleted" });
  } catch (error) {
    next(error);
  }
};
