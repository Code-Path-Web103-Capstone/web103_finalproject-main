const API_URL = "http://localhost:3000";

// AUTH API
export const signUpUser = async (username, email, password) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to sign up");
    }

    return data;
  } catch (error) {
    console.error("Sign up error:", error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      throw new Error(data.error || "Failed to log in");
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// BUDGET API
export const createBudget = async (userId, plan, budgetName) => {
  const budgetData = {
    user_id: userId,
    plan,
    budget_name: budgetName,
  };

  try {
    const response = await fetch(`${API_URL}/api/budget/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(budgetData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const newBudget = await response.json();
    return newBudget;
  } catch (error) {
    console.error("Error creating budget:", error);
    throw error;
  }
};
export const fetchIncomes = async (userId, budgetId) => {
  const response = await fetch(
    `${API_URL}/api/income/actual/${userId}/${budgetId}`
  );
  if (!response.ok)
    throw new Error(`Error fetching incomes: ${response.status}`);
  return response.json();
};
export const fetchExpenses = async (userId, budgetId) => {
  const response = await fetch(
    `${API_URL}/api/expense/actual/${userId}/${budgetId}`
  );
  if (!response.ok)
    throw new Error(`Error fetching expenses: ${response.status}`);
  return response.json();
};
