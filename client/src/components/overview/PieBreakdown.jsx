import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import {
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "../ui/Card";
import { fetchActualExpenses } from "../../services/api";
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
  const { user, budgetId } = useUser();
  const [expensesByCategory, setExpensesByCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

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
      } catch (err) {
        setError(err.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchData();
  }, [user, year, month]);

  const totalExpenses = expensesByCategory.reduce(
    (acc, curr) => acc + curr.value,
    0
  );

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];
      const percentage = ((value / totalExpenses) * 100).toFixed(1);
      return (
        <div className="rounded bg-white p-2 shadow-md">
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-gray-500">{percentage}% of total</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col rounded-lg bg-white">
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
              >
                {expensesByCategory.map((entry) => (
                  <Cell
                    key={entry.category}
                    fill={COLORS[entry.category] || COLORS["Uncategorized"]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
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
                    <p className="text-xs text-gray-500">
                      ${entry.value.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </div>
  );
};

export default PieBreakdown;
