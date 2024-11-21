import React, { useState, useEffect } from "react";
import PageLayout from "../layouts/PageLayout";
import {
  getBudgetsByUserId,
  fetchActualIncomes,
  fetchActualExpenses,
} from "../services/api";
import { useUser } from "../services/context";
import BreakdownByMonth from "../components/dashboard/BreakdownByMonth";
import BreakdownByCategory from "../components/dashboard/BreakdownByCategory";

const Dashboard = () => {
  const { user } = useUser();
  const [budgets, setBudgets] = useState([]);
  const [totalSaved, setTotalSaved] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [YTDIncome, setYTDIncome] = useState(0);
  const [YTDExpenses, setYTDExpenses] = useState(0);

  useEffect(() => {
    const fetchAndCalculateSavings = async () => {
      try {
        setLoading(true);
        setError(null);

        const budgetsData = await getBudgetsByUserId(user.id);
        const activeBudgets = budgetsData.filter(
          (budget) => budget.keep_track === true
        );

        let ytdIncome = 0;
        let ytdExpenses = 0;

        const savings = await Promise.all(
          activeBudgets.map(async (budget) => {
            const [actualIncomes, actualExpenses] = await Promise.all([
              fetchActualIncomes(user.id, budget.id),
              fetchActualExpenses(user.id, budget.id),
            ]);

            const totalIncome = actualIncomes.reduce(
              (sum, income) => sum + parseFloat(income.amount || 0),
              0
            );
            const totalExpense = actualExpenses.reduce(
              (sum, expense) => sum + parseFloat(expense.amount || 0),
              0
            );

            ytdIncome += totalIncome;
            ytdExpenses += totalExpense;

            return totalIncome - totalExpense;
          })
        );

        const totalSavings = savings.reduce(
          (sum, budgetSavings) => sum + budgetSavings,
          0
        );

        setBudgets(activeBudgets);
        setTotalSaved(totalSavings);
        setYTDIncome(ytdIncome);
        setYTDExpenses(ytdExpenses);
      } catch (err) {
        setError(err.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchAndCalculateSavings();
    }
  }, [user]);

  function truncateUsername(username) {
    if (username.length <= 10) return username;
    const start = username.slice(0, 3);
    const end = username.slice(-4);
    return `${start}...${end}`;
  }

  return (
    <PageLayout>
      <div
        className="grid h-[80vh] w-full grow grid-cols-3 gap-4 border-2 border-red-500 px-20 py-10"
        style={{
          gridTemplateRows: "1fr 2fr", // Two rows with proportionate sizes
        }}
      >
        {/* Column 1: Welcome and Summary */}
        <div className="col-span-1 flex flex-col gap-4">
          {/* Welcome */}
          <div className="rounded-lg border-2 bg-white p-5">
            <p>
              Welcome,{" "}
              <span className="font-bold">
                {truncateUsername(user.username)}!
              </span>
            </p>
          </div>

          {/* Summary */}
          <div className="rounded-lg border-2 bg-white p-5">
            <h2 className="text-lg font-semibold text-gray-700">Summary</h2>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <>
                <div>
                  <h3 className="text-sm font-semibold text-gray-600">
                    Total Savings
                  </h3>
                  <p className="text-2xl font-bold text-green-600">
                    ${totalSaved.toFixed(2)}
                  </p>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-gray-600">
                    Total Income
                  </h3>
                  <p className="text-2xl font-bold text-blue-600">
                    ${YTDIncome.toFixed(2)}
                  </p>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-gray-600">
                    Total Expenses
                  </h3>
                  <p className="text-2xl font-bold text-red-600">
                    ${YTDExpenses.toFixed(2)}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Column 2: Active Budgets */}
        <div className="col-span-1 row-span-2 flex h-full flex-col gap-4">
          <div className="h-full rounded-lg border-2 bg-white p-5">
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

        {/* Column 3: Charts */}
        <div className="col-span-1 row-span-2 flex h-full flex-col gap-3">
          {/* Breakdown By Month */}
          <BreakdownByMonth className="h-1/2 rounded-lg border-2 bg-white" />

          {/* Breakdown By Category */}
          <BreakdownByCategory className="h-1/2 rounded-lg border-2 bg-white" />
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
