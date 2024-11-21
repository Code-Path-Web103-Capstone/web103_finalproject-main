import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url"; // Add this line
import authRouter from "./routes/auth.js";
import budgetRouter from "./routes/budget.js";
import expenseRouter from "./routes/expenses.js";
import incomeRouter from "./routes/incomes.js";
import parserRouter from "./routes/parser.js";
import uploadRouter from "./routes/upload.js";

dotenv.config();

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// app.use(express.static(path.join(__dirname, 'dist')));
//
// // Catch-all route to serve the React app
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });
//
// // CORS configuration
// const corsOptions = {
//   origin: 'https://client-production-b286.up.railway.app',
//   optionsSuccessStatus: 200,
// };

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/budget", budgetRouter);
app.use("/api/expense", expenseRouter);
app.use("/api/income", incomeRouter);
app.use("/api/parser", parserRouter);
app.use("/api/upload", uploadRouter);
app.use("/", (req, res) => {
    res.send("gobudget API");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});