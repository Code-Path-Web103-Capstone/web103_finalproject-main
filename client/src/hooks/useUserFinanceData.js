import { useState, useEffect } from "react";
import { useUser } from "../services/context";
import { fetchActualIncomes, fetchActualExpenses, fetchExpectedIncomes, fetchExpectedExpenses } from "../services/api";

const useUserFinanceData = () => {
  const { user, budgetId } = useUser();
  const [actualIncomes, setActualIncomes] = useState([]);
  const [actualExpenses, setActualExpenses] = useState([]);
  const [expectedIncomes, setExpectedIncomes] = useState([]);
  const [expectedExpenses, setExpectedExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log("Fetching data for user:", user.id, "and budget:", budgetId); // Log the user id and budget id
        const [actualExpensesData, actualIncomesData, expectedIncomesData, expectedExpensesData] = await Promise.all([
          fetchActualExpenses(user.id, budgetId),
          fetchActualIncomes(user.id, budgetId),
          fetchExpectedIncomes(user.id, budgetId),
          fetchExpectedExpenses(user.id, budgetId),
        ]);
        setActualExpenses(actualExpensesData);
        setActualIncomes(actualIncomesData);
        setExpectedIncomes(expectedIncomesData);
        setExpectedExpenses(expectedExpensesData);
      } catch (err) {
        console.error("Error fetching data:", err); // Log any errors
        setError(err);
      } finally {
        setLoading(false);
      }

    };

    if (user && budgetId) {
      fetchData();
    }
  }, [user, budgetId]);

  return {
    actualIncomes,
    setActualIncomes,
    actualExpenses,
    setActualExpenses,
    expectedIncomes,
    setExpectedIncomes,
    expectedExpenses,
    setExpectedExpenses,
    loading,
    error,
  };
};

export default useUserFinanceData;