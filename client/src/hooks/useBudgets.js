import { useState, useEffect } from "react";
import { getBudgetsByUserId } from "../services/api";

const useBudgets = (userId) => {
  const [budgets, setBudgets] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const data = await getBudgetsByUserId(userId);
        setBudgets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchBudgets();
  }, [userId]);

  return { budgets, error, loading };
};

export default useBudgets;