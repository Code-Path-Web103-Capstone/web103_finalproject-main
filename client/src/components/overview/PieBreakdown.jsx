import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import { fetchActualExpenses, getBudgetsByUserId } from "../../services/api";
import { useUser } from "../../services/context";

const COLORS = {
  travel: "#23C436", // Green
  food_and_drink: "#F79249", // Orange
  services: "#A377FF", // Purple
  shopping: "#F4BA21", // Yellow
  transportation: "#3296FF", // Blue
  entertainment: "#EC72D8", // Pink
  health: "#FF5E5E", // Red
  Uncategorized: "#CCCCCC", // Gray for uncategorized
};

const CATEGORY_NAMES = {
  travel: "Travel",
  food_and_drink: "Food & Drinks",
  services: "Services",
  shopping: "Shopping",
  transportation: "Transportation",
  entertainment: "Entertainment",
  health: "Health",
  Uncategorized: "Uncategorized",
};

const PieBreakdown = () => {
  const { year, month } = useParams();
  const { user } = useUser();

  const [expensesByCategory, setExpensesByCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const budgetsData = await getBudgetsByUserId(user.id);
        const filteredBudgets = budgetsData.filter(
          (budget) =>
            budget.year === parseInt(year, 10) &&
            budget.month.toLowerCase() === month.toLowerCase() &&
            budget.keep_track === true
        );

        if (filteredBudgets.length > 0) {
          const budgetId = filteredBudgets[0].id;
          const actualExpenses = await fetchActualExpenses(user.id, budgetId);

          const categoryData = actualExpenses.reduce((acc, expense) => {
            const category = expense.category || "Uncategorized";
            if (!acc[category]) acc[category] = 0;
            acc[category] += expense.amount;
            return acc;
          }, {});

          const chartData = Object.keys(categoryData).map((category) => ({
            category,
            displayName: CATEGORY_NAMES[category] || category,
            value: categoryData[category],
          }));

          setExpensesByCategory(chartData);
        } else {
          setExpensesByCategory([]);
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

  const totalExpenses = expensesByCategory.reduce(
    (acc, curr) => acc + curr.value,
    0
  );

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Expense Breakdown by Category</CardTitle>
        <CardDescription>
          {month.charAt(0).toUpperCase() + month.slice(1)} {year}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <PieChart width={300} height={300}>
              <Pie
                data={expensesByCategory}
                dataKey="value"
                nameKey="displayName"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={140}
                activeIndex={-1} // Prevent active styling
                activeShape={() => null} // Disable active shape styling
              >
                {expensesByCategory.map((entry) => (
                  <Cell
                    key={entry.category}
                    fill={COLORS[entry.category] || COLORS["Uncategorized"]}
                  />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const { displayName, value } = payload[0].payload;
                    const percentage = ((value / totalExpenses) * 100).toFixed(
                      2
                    );
                    return (
                      <div className="rounded-lg bg-white p-3 shadow-md dark:bg-neutral-900">
                        <p className="font-medium">{displayName}</p>
                        <p className="text-muted-foreground text-sm">
                          ${value.toLocaleString()} ({percentage}%)
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
            <div className="grid grid-cols-2 gap-4 py-10 sm:grid-cols-3">
              {expensesByCategory.map((entry) => (
                <div
                  key={entry.category}
                  className="flex items-center space-x-3"
                >
                  <div
                    className="h-5 w-5 rounded-full"
                    style={{
                      backgroundColor:
                        COLORS[entry.category] || COLORS["Uncategorized"],
                    }}
                  />
                  <div>
                    <p className="text-sm font-medium">{entry.displayName}</p>
                    <p className="text-muted-foreground text-xs">
                      ${entry.value.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PieBreakdown;
