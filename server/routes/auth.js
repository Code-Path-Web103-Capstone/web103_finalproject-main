import express from "express";
import AuthController from "../controllers/auth.js";

const router = express.Router();

// POST request to create a new user
router.post("/signup", AuthController.createUser);
router.post("/login", AuthController.loginUser);
router.get("/logingoogle", AuthController.SignInWithGoogle);
router.post("/oauth-callback", AuthController.handleOAuthCallback);
router.put("/updateUser", AuthController.updateUser);

export default router;
