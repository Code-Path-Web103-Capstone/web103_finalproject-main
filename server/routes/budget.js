import express from "express";
import BudgetController from "../controllers/budgets.js";

const router = express.Router();

// POST request to add a new budget
router.post("/add", BudgetController.addBudget);

// GET request to fetch all budgets from this user id
router.get("/:user_id", BudgetController.getBudgets);

// PUT request to update a budget
router.patch("/update", BudgetController.updateBudget);

// DELETE request to delete a budget
router.delete("/delete", BudgetController.deleteBudget);

// Update keep_track for a budget
router.patch("/keeptrack", BudgetController.updateKeepTrack);

// GET request to fetch a budget by id
router.get("/budget/:id", BudgetController.getBudgetById);

export default router;