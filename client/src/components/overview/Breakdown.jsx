import React, { useState, useEffect } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/Chart";
import { useParams } from "react-router-dom";
import {
  getBudgetsByUserId,
  fetchActualIncomes,
  fetchActualExpenses,
  fetchExpectedIncomes,
  fetchExpectedExpenses,
} from "../../services/api";
import { useUser } from "../../services/context";

const Breakdown = () => {
  const { year, month } = useParams();
  const { user } = useUser();

  const [chartData, setChartData] = useState([]);
  const [activeChart, setActiveChart] = useState("actual");
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

          // Format data for the chart
          setChartData([
            {
              name: "Actual Income",
              value: actualIncomes.reduce((sum, item) => sum + item.amount, 0),
              fill: "var(--color-income)", // Reference theme color
            },
            {
              name: "Actual Expense",
              value: actualExpenses.reduce((sum, item) => sum + item.amount, 0),
              fill: "var(--color-expense)", // Reference theme color
            },
            {
              name: "Predicted Income",
              value: predictedIncomes.reduce(
                (sum, item) => sum + item.amount,
                0
              ),
              fill: "var(--color-income)", // Reference theme color
            },
            {
              name: "Predicted Expense",
              value: predictedExpenses.reduce(
                (sum, item) => sum + item.amount,
                0
              ),
              fill: "var(--color-expense)", // Reference theme color
            },
          ]);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const total = {
    actual: chartData[0]?.value - chartData[1]?.value || 0,
    predicted: chartData[2]?.value - chartData[3]?.value || 0,
  };

  // Define the chartConfig with income and expense colors
  const chartConfig = {
    income: {
      label: "Income",
      color: "#23C436", // Green for income
    },
    expense: {
      label: "Expense",
      color: "#FF5E5E", // Red for expense
    },
  };

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bar Chart - Breakdown</CardTitle>
          <CardDescription>
            Showing{" "}
            {activeChart === "actual" ? "Actual Data" : "Predicted Data"} for{" "}
            {month}, {year}
          </CardDescription>
        </div>
        <div className="flex">
          {["actual", "predicted"].map((key) => (
            <button
              key={key}
              data-active={activeChart === key}
              className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              onClick={() => setActiveChart(key)}
            >
              <span className="text-muted-foreground text-xs">
                {key === "actual" ? "Actual Data" : "Predicted Data"}
              </span>
              <span className="text-lg font-bold leading-none sm:text-3xl">
                ${total[key].toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            data={chartData.filter((d) =>
              activeChart === "actual"
                ? ["Actual Income", "Actual Expense"].includes(d.name)
                : ["Predicted Income", "Predicted Expense"].includes(d.name)
            )}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="name" />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="name"
                  valueKey="value"
                  labelFormatter={(label) => label}
                />
              }
            />
            <Bar dataKey="value" fill={(data) => data.payload.fill} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default Breakdown;
