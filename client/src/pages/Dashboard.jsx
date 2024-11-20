import React, { useState, useEffect } from "react";
import PageLayout from "../layouts/PageLayout";
import {
  getBudgetsByUserId,
  fetchActualIncomes,
  fetchActualExpenses,
} from "../services/api";
import { useUser } from "../services/context";

const Dashboard = () => {
  const { user } = useUser();
  const [budgets, setBudgets] = useState([]);
  const [totalSaved, setTotalSaved] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [YTDIncome, setYTDIncome] = useState(0);
  const [YTDExpenses, setYTDExpenses] = useState(0);

  useEffect(() => {
    // Fetch all active budgets and calculate total saved, YTD incomes, and YTD expenses
    const fetchAndCalculateSavings = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all budgets for the user
        const budgetsData = await getBudgetsByUserId(user.id);

        // Filter budgets that are active (keep_track is true)
        const activeBudgets = budgetsData.filter(
          (budget) => budget.keep_track === true
        );

        // Initialize YTD income and expense trackers
        let ytdIncome = 0;
        let ytdExpenses = 0;

        // Fetch incomes and expenses for each active budget
        const savings = await Promise.all(
          activeBudgets.map(async (budget) => {
            const [actualIncomes, actualExpenses] = await Promise.all([
              fetchActualIncomes(user.id, budget.id),
              fetchActualExpenses(user.id, budget.id),
            ]);

            // Calculate total income and expenses for the budget
            const totalIncome = actualIncomes.reduce(
              (sum, income) => sum + parseFloat(income.amount || 0),
              0
            );
            const totalExpense = actualExpenses.reduce(
              (sum, expense) => sum + parseFloat(expense.amount || 0),
              0
            );

            // Update YTD totals
            ytdIncome += totalIncome;
            ytdExpenses += totalExpense;

            // Return the savings for this budget
            return totalIncome - totalExpense;
          })
        );

        // Calculate the total saved across all active budgets
        const totalSavings = savings.reduce(
          (sum, budgetSavings) => sum + budgetSavings,
          0
        );

        // Update states
        setBudgets(activeBudgets);
        setTotalSaved(totalSavings);
        setYTDIncome(ytdIncome); // Set YTD income
        setYTDExpenses(ytdExpenses); // Set YTD expenses
      } catch (err) {
        setError(err.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    // Fetch data if the user is logged in
    if (user?.id) {
      fetchAndCalculateSavings();
    }
  }, [user]);

  return (
    <PageLayout>
      <div className="grid grid-cols-3 grid-rows-2 border-2 border-red-500 p-5">
        <div className="row-span-2 rounded-lg border-2 bg-white p-5">
          {/* Header */}
          <div className="flex items-center justify-start gap-3">
            <h1 className="text-2xl font-bold text-gray-800">Summary </h1>
            <span className="h-5 w-0.5 bg-gray-700"></span>
            <span className="text-xl lowercase text-gray-400">ytd</span>
          </div>

          {/* Loading or Error State */}
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              {/* Total Savings */}
              <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-700">
                  Total Savings
                </h2>
                <p className="text-4xl font-bold text-green-600">
                  ${totalSaved.toFixed(2)}
                </p>
              </div>

              {/* YTD Income */}
              <div className="mt-4 flex flex-col gap-2">
                <h2 className="text-lg font-semibold text-gray-700">
                  Total Income:
                </h2>
                <span className="text-xl font-bold text-blue-600">
                  ${YTDIncome.toFixed(2)}
                </span>
              </div>
              {/* and Expenses */}
              <div className="mt-4 flex flex-col gap-2">
                <h2 className="text-lg font-semibold text-gray-700">
                  Total Expenses:
                </h2>
                <span className="text-xl font-bold text-red-600">
                  ${YTDExpenses.toFixed(2)}
                </span>
              </div>
            </>
          )}
        </div>

        <div className="rounded-lg border-2 bg-white p-5">
          {" "}
          {/* Active Budgets */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-700">
              Active Budgets
            </h2>
            {budgets.length === 0 ? (
              <p className="text-gray-500">No active budgets found.</p>
            ) : (
              <ul className="mt-2 list-disc pl-5">
                {budgets.map((budget) => (
                  <li key={budget.id}>
                    <span className="font-semibold">{budget.budget_name}</span>:{" "}
                    {budget.year} - {budget.month}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
