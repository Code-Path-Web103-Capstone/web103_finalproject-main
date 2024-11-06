import express from "express";
import BudgetController from "../controllers/budgets.js";

const router = express.Router();

// POST request to add a new budget
router.post("/add", BudgetController.addBudget);

// GET request to fetch all budgets from this user id
router.get("/", BudgetController.getBudgets);

// PUT request to update a budget
router.patch("/update", BudgetController.updateBudget);

// DELETE request to delete a budget
router.delete("/delete", BudgetController.deleteBudget);

export default router;