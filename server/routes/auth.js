import express from "express";
import AuthController from "../controllers/auth.js";

const router = express.Router();

// POST request to create a new user
router.post("/signup", AuthController.createUser);
router.post("/login", AuthController.loginUser);
router.get("/logingoogle", AuthController.SignInWithGoogle);
router.put("/updateUser", AuthController.updateUser);
router.post("/callback", AuthController.SignInWithGoogleCallback);

export default router;
