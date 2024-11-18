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
        // Sort budgets by `create_at` in descending order (most recent first)
        const sortedBudgets = data.sort(
          (a, b) => new Date(b.create_at) - new Date(a.create_at)
        );
        setBudgets(sortedBudgets);
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
