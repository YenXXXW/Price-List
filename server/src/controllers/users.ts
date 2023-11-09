import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";

export const getAuthenticatedUsers: RequestHandler = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.session.userId)
      .select("+email")
      .exec();

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

type SignUpbody = {
  username: string;
  email: string;
  password: string;
};

export const SignUp: RequestHandler<
  unknown,
  unknown,
  SignUpbody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const rawpassword = req.body.password;
  try {
    if (!username || !email || !rawpassword) {
      throw createHttpError(400, "Parameters missing ");
    }

    //The schema already enforces the unique username but check duplicate
    // username and email to have better control over status code and error message
    const existingUsername = await UserModel.findOne({
      username: username,
    }).exec();

    if (existingUsername) throw createHttpError(409, "Username already taken");

    const existingEmail = await UserModel.findOne({ email: email }).exec();

    if (existingEmail)
      throw createHttpError(
        409,
        "A user with this emial address already exists"
      );

    const hashedPassword = await bcrypt.hash(rawpassword, 10);

    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    req.session.userId = newUser._id;

    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};

type LoginBody = {
  username?: string;
  password?: string;
};

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    if (!username || !password)
      throw createHttpError(400, "Parameters missing");

    const user = await UserModel.findOne({ username: username })
      .select("+password +email")
      .exec();

    if (!user) throw createHttpError(401, "Invalid Credentials");

    const passwordMatch = bcrypt.compare(password, user.password);
    if (!passwordMatch) throw createHttpError(401, "Invalid Credentials");

    req.session.userId = user._id;
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = async (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.status(200).json({ message: "Logout successfully" });
    }
  });
};
