import express from "express";
import AuthController from "../controllers/auth.js";

const router = express.Router();

// POST request to create a new user
router.post("/signup", AuthController.createUser);

export default router;
