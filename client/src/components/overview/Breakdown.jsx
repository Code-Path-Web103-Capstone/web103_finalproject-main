import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "../ui/Card";
import { BarChart, Bar, CartesianGrid, XAxis, Tooltip } from "recharts";
import {
  getBudgetsByUserId,
  fetchActualIncomes,
  fetchActualExpenses,
  fetchExpectedIncomes,
  fetchExpectedExpenses,
} from "../../services/api";
import { useUser } from "../../services/context";
// import { div } from "three/examples/jsm/nodes/Nodes.js";

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
  const [activeChart, setActiveChart] = useState("actual");

  useEffect(() => {
    // Fetch data for the selected year and month finances
    const fetchData = async () => {
      try {
        setLoading(true);
        // Get all budgets for the user
        const budgetsData = await getBudgetsByUserId(user.id);
        // Filter budgets by year and month match and if keep track is true
        const filteredBudgets = budgetsData.filter(
          (budget) =>
            budget.year === parseInt(year, 10) &&
            budget.month.toLowerCase() === month.toLowerCase() &&
            budget.keep_track === true
        );
        // Sets budget for the month and year user selected
        setBudgets(filteredBudgets);
        console.log(budgets);

        // If there is a budget for the month and year selected
        if (filteredBudgets.length > 0) {
          // Get the budget ID
          const budgetId = filteredBudgets[0].id;
          // Fetch actual and predicted incomes and expenses
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

          // Set the fetched data to the state
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
    // Fetch data if user is logged in
    if (user?.id) {
      fetchData();
    }
  }, [user, year, month]);

  const chartData = [
    {
      name: "Actual Income",
      value: incomesActual.reduce((sum, item) => sum + item.amount, 0),
      fill: "#23C436",
    },
    {
      name: "Actual Expense",
      value: expensesActual.reduce((sum, item) => sum + item.amount, 0),
      fill: "#FF5E5E",
    },
    {
      name: "Predicted Income",
      value: incomesPredicted.reduce((sum, item) => sum + item.amount, 0),
      fill: "#23C436",
    },
    {
      name: "Predicted Expense",
      value: expensesPredicted.reduce((sum, item) => sum + item.amount, 0),
      fill: "#FF5E5E",
    },
  ];

  const totalData = {
    actual: chartData[0].value - chartData[1].value,
    predicted: chartData[2].value - chartData[3].value,
  };
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload; // Access name from payload object
      return (
        <div className="rounded bg-white p-2 shadow-md">
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-gray-700">${value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-w-max rounded-lg border-2 bg-white">
      {/* Loading Error and Good Response */}
      {loading ? (
        <div className="flex w-[800px] items-stretch border-b border-gray-500 sm:flex-row">
          <p className="text-center text-gray-500">Loading...</p>{" "}
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <Card className="flex flex-col items-center justify-center">
          <CardHeader className="flex w-[800px] items-stretch border-b border-gray-500 sm:flex-row">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5">
              <CardTitle>
                {activeChart === "actual" ? "Actual Data" : "Predicted Data"}
              </CardTitle>
              <CardDescription>
                {activeChart === "actual"
                  ? "Showing total actual (income and expenses)"
                  : "Showing total predicted (income and expenses)"}
              </CardDescription>
            </div>
            <div className="flex">
              {["actual", "predicted"].map((key) => (
                <button
                  key={key}
                  data-active={activeChart === key}
                  className={`relative z-30 flex flex-1 flex-col justify-center gap-1 px-6 py-4 text-left sm:px-8 sm:py-6 ${
                    activeChart === key ? "bg-gray-100" : ""
                  }`}
                  onClick={() => setActiveChart(key)}
                >
                  <span className="text-muted-foreground text-xs">
                    {key === "actual" ? "Actual" : "Predicted"}
                  </span>
                  <span className="text-lg font-bold leading-none sm:text-3xl">
                    ${totalData[key].toLocaleString()}
                  </span>
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent className="px-2 sm:p-6">
            <BarChart
              width={600}
              height={300}
              data={chartData.filter((data) =>
                activeChart === "actual"
                  ? ["Actual Income", "Actual Expense"].includes(data.name)
                  : ["Predicted Income", "Predicted Expense"].includes(
                      data.name
                    )
              )}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" />
            </BarChart>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Breakdown;
