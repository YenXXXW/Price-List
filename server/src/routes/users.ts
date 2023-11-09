import express from "express";
import * as UserCOntrollers from "../controllers/users";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

router.get("/", requiresAuth, UserCOntrollers.getAuthenticatedUsers);

router.post("/signup", UserCOntrollers.SignUp);

router.post("/login", UserCOntrollers.login);

router.post("/logout", UserCOntrollers.logout);

export default router;
