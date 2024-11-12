import React, { useState, useEffect } from "react";
import { useUser } from "../services/context";
import { fetchIncomes, fetchExpenses } from "../services/api";

const useUserFinanceData = () => {
  const { user, budgetId } = useUser();
  const [actualIncomes, setActualIncomes] = useState([]);
  const [actualExpenses, setActualExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [expensesData, incomesData] = await Promise.all([
          fetchExpenses(user.id, budgetId),
          fetchIncomes(user.id, budgetId),
        ]);
        setActualExpenses(expensesData);
        setActualIncomes(incomesData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (user && budgetId) {
      fetchData();
    }
  }, [user.id, budgetId]);

  return {
    actualIncomes,
    setActualIncomes,
    actualExpenses,
    setActualExpenses,
    loading,
    error,
  };
};

export default useUserFinanceData;
