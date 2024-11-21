import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";


import { fetchActualExpenses, getBudgetsByUserId } from "../../services/api";
import { useUser } from "../../services/context";
import { twMerge } from "tailwind-merge";

const PRESET_CATEGORIES = [
  { value: "food_and_drink", label: "Food and Drink" },
  { value: "shopping", label: "Shopping" },
  { value: "transportation", label: "Transportation" },
  { value: "entertainment", label: "Entertainment" },
  { value: "travel", label: "Travel" },
  { value: "services", label: "Services" },
  { value: "health", label: "Health" },
];

const COLORS = {
  travel: "#23C436", // Green
  food_and_drink: "#F79249", // Orange
  services: "#A377FF", // Purple
  shopping: "#F4BA21", // Yellow
  transportation: "#3296FF", // Blue
  entertainment: "#EC72D8", // Pink
  health: "#FF5E5E", // Red
  other: "#CCCCCC", // Gray for uncategorized
};

const BreakdownByCategory = ({ className }) => {
  const { user } = useUser();
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        setError(null);

        const budgetsData = await getBudgetsByUserId(user.id);
        const activeBudgets = budgetsData.filter(
          (budget) => budget.keep_track === true
        );

        const categoryDataMap = {};

        for (const budget of activeBudgets) {
          const actualExpenses = await fetchActualExpenses(user.id, budget.id);

          actualExpenses.forEach((expense) => {
            const category =
              PRESET_CATEGORIES.find((cat) => cat.value === expense.category)
                ?.value || "other";

            if (!categoryDataMap[category]) {
              categoryDataMap[category] = 0;
            }

            categoryDataMap[category] += parseFloat(expense.amount || 0);
          });
        }

        const formattedCategoryData = Object.entries(categoryDataMap)
          .map(([key, value]) => ({
            category: key,
            label:
              PRESET_CATEGORIES.find((cat) => cat.value === key)?.label ||
              "Other",
            total: value,
            fill: COLORS[key] || COLORS.other,
          }))
          .sort((a, b) => b.total - a.total); // Sort by total, descending

        setCategoryData(formattedCategoryData);
      } catch (err) {
        console.error("Error fetching category data:", err);
        setError(err.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchCategoryData();
    }
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <p className="text-red-500" role="alert">
        {error}
      </p>
    );

  if (!categoryData || categoryData.length === 0) {
    return <p className="text-gray-500">No data available for the chart.</p>;
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded border border-gray-200 bg-white p-4 shadow-md">
          <p className="font-bold">{payload[0].payload.label}</p>
          <p className="text-gray-600">
            Total: ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={twMerge("w-full bg-white", className)}>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">Breakdown by Category</CardTitle>
        <CardDescription className="text-sm">
          Total Spent Per Category
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={categoryData}
              layout="vertical"
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <XAxis
                type="number"
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <YAxis
                dataKey="label"
                type="category"
                width={120}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="total" radius={[0, 4, 4, 0]}>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BreakdownByCategory;
