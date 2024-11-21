"use client";

import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  getBudgetsByUserId,
  fetchActualIncomes,
  fetchActualExpenses,
} from "../../services/api";
import { useUser } from "../../services/context";
import { twMerge } from "tailwind-merge";

const BreakdownByMonth = ({ className }) => {
  const { user } = useUser();
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        setLoading(true);
        setError(null);

        const budgetsData = await getBudgetsByUserId(user.id);
        console.log("Budgets Data:", budgetsData);

        const activeBudgets = budgetsData.filter(
          (budget) => budget.keep_track === true
        );
        console.log("Active Budgets:", activeBudgets);

        const monthlyDataMap = {};

        for (const budget of activeBudgets) {
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

          const monthKey = `${budget.month} ${budget.year}`;
          if (!monthlyDataMap[monthKey]) {
            monthlyDataMap[monthKey] = {
              month: monthKey,
              total: 0,
            };
          }

          monthlyDataMap[monthKey].total += totalIncome - totalExpense;
        }

        console.log("Monthly Data Map:", monthlyDataMap);

        const sortedMonthlyData = Object.values(monthlyDataMap).sort(
          (a, b) => new Date(`1 ${a.month}`) - new Date(`1 ${b.month}`)
        );

        console.log("Sorted Monthly Data:", sortedMonthlyData);

        setMonthlyData(sortedMonthlyData);
      } catch (err) {
        console.error("Error fetching monthly data:", err);
        setError(err.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchMonthlyData();
    }
  }, [user]);

  console.log("Monthly Data for Chart:", monthlyData);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <p className="text-red-500" role="alert">
        {error}
      </p>
    );

  if (!monthlyData || monthlyData.length === 0) {
    return <p className="text-gray-500">No data available for the chart.</p>;
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded border border-gray-200 bg-white p-4 shadow-md">
          <p className="font-bold">{label}</p>
          <p
            className={`text-${payload[0].value >= 0 ? "green-600" : "red-600"}`}
          >
            {payload[0].value >= 0 ? "Gain" : "Loss"}: $
            {Math.abs(payload[0].value).toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={twMerge("w-full bg-white", className)}>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">Breakdown by Month</CardTitle>
        <CardDescription className="text-sm">Monthly Gain/Loss</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%" minHeight={300}>
            <BarChart
              data={monthlyData}
              margin={{ left: 0, right: 10, top: 0, bottom: 100 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                tick={{
                  fontSize: 12,
                }}
                width={60}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                {monthlyData.map((entry) => (
                  <Cell
                    key={entry.month}
                    fill={entry.total >= 0 ? "#23C436" : "#FF5E5E"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BreakdownByMonth;
