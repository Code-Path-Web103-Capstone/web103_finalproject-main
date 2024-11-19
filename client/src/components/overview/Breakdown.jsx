import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import PageLayout from "../../layouts/PageLayout";
import {
  getBudgetsByUserId,
  fetchActualIncomes,
  fetchActualExpenses,
  fetchExpectedIncomes,
  fetchExpectedExpenses,
} from "../../services/api";
import { useUser } from "../../services/context";

// Register Chart.js modules
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Breakdown = () => {
  const { year, month } = useParams();
  const { user } = useUser();

  const [budgets, setBudgets] = useState([]);
  const [incomesActual, setIncomesActual] = useState([]);
  const [expensesActual, setExpensesActual] = useState([]);
  const [incomesPredicted, setIncomesPredicted] = useState([]);
  const [expensesPredicted, setExpensesPredicted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch budgets
        const budgetsData = await getBudgetsByUserId(user.id);
        const filteredBudgets = budgetsData.filter(
          (budget) =>
            budget.year === parseInt(year, 10) &&
            budget.month.toLowerCase() === month.toLowerCase()
        );

        setBudgets(filteredBudgets);

        if (filteredBudgets.length > 0) {
          const budgetId = filteredBudgets[0].id;

          // Fetch incomes and expenses
          const [
            actualIncomes,
            actualExpenses,
            predictedIncomes,
            predictedExpenses,
          ] = await Promise.all([
            fetchActualIncomes(user.id, budgetId),
            fetchActualExpenses(user.id, budgetId),
            fetchExpectedIncomes(user.id, budgetId),
            fetchExpectedExpenses(user.id, budgetId),
          ]);

          setIncomesActual(actualIncomes);
          setExpensesActual(actualExpenses);
          setIncomesPredicted(predictedIncomes);
          setExpensesPredicted(predictedExpenses);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchData();
    }
  }, [user, year, month]);

  // Prepare chart data
  const incomeExpenseData = {
    labels: [
      "Actual Income",
      "Predicted Income",
      "Actual Expense",
      "Predicted Expense",
    ],
    datasets: [
      {
        label: "Amount ($)",
        data: [
          incomesActual.reduce((sum, item) => sum + item.amount, 0),
          incomesPredicted.reduce((sum, item) => sum + item.amount, 0),
          expensesActual.reduce((sum, item) => sum + item.amount, 0),
          expensesPredicted.reduce((sum, item) => sum + item.amount, 0),
        ],
        backgroundColor: ["#4CAF50", "#2196F3", "#FF5722", "#FFC107"],
        borderWidth: 1,
      },
    ],
  };

  const categoryData = {
    labels: Array.from(
      new Set([
        ...expensesActual.map((item) => item.category),
        ...expensesPredicted.map((item) => item.category),
      ])
    ),
    datasets: [
      {
        label: "Category Distribution",
        data: Array.from(
          new Set([
            ...expensesActual.map((item) => item.category),
            ...expensesPredicted.map((item) => item.category),
          ])
        ).map(
          (category) =>
            expensesActual
              .filter((item) => item.category === category)
              .reduce((sum, item) => sum + item.amount, 0) +
            expensesPredicted
              .filter((item) => item.category === category)
              .reduce((sum, item) => sum + item.amount, 0)
        ),
        backgroundColor: [
          "#FF5722",
          "#FFC107",
          "#2196F3",
          "#4CAF50",
          "#9C27B0",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <PageLayout>
      <div className="mx-auto max-w-3xl p-6">
        <h1 className="mb-6 text-center text-2xl font-semibold text-gray-700">
          Breakdown for {month.charAt(0).toUpperCase() + month.slice(1)} {year}
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : budgets.length === 0 ? (
          <p className="text-center text-gray-500">No budgets found.</p>
        ) : (
          <div className="space-y-6">
            {/* Budget Information */}
            {budgets.map((budget) => (
              <div
                key={budget.id}
                className="rounded-lg border border-gray-300 bg-white p-4 shadow"
              >
                <h2 className="text-lg font-semibold text-gray-700">
                  {budget.budget_name}
                </h2>
                <p className="text-sm text-gray-500">
                  Plan: {budget.plan || "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                  Keep Track: {budget.keep_track ? "Yes" : "No"}
                </p>
              </div>
            ))}

            {/* Income vs Expense Chart */}
            <div className="rounded-lg bg-white p-4 shadow">
              <h3 className="text-lg font-semibold text-gray-700">
                Income vs Expense
              </h3>
              <Bar data={incomeExpenseData} />
            </div>

            {/* Expense Category Distribution */}
            <div className="rounded-lg bg-white p-4 shadow">
              <h3 className="text-lg font-semibold text-gray-700">
                Expense Category Distribution
              </h3>
              <Pie data={categoryData} />
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Breakdown;
