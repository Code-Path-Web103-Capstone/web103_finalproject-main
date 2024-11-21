// For local DEV
// const API_URL = "http://localhost:3000";
// const API_PYTHON_URL = "http://localhost:8000";

// for Production

const API_URL = 'https://gobudget-production.up.railway.app'
const API_PYTHON_URL = "https://parser-production-c8da.up.railway.app";

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

export const updateUser = async (userId, updates) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/updateUser`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, ...updates }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to update user");
    }

    return data;
  } catch (error) {
    console.error("Update user error:", error);
    throw error;
  }
};

// BUDGET API
export const createBudget = async (userId, plan, budgetName, month, year) => {
  const budgetData = {
    user_id: userId,
    plan,
    budget_name: budgetName,
    month,
    year,
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

export const getBudgetsByUserId = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/api/budget/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // // Log the fetched budgets to inspect month and year
    // console.log(
    //   "Fetched Budgets:",
    //   data.map((budget) => ({
    //     id: budget.id,
    //     name: budget.budget_name,
    //     month: budget.month,
    //     year: budget.year,
    //     track: budget.keep_track,
    //   }))
    // );
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching budgets:", error);
    throw error; // Rethrow the error so it can be handled by the calling code
  }
};

export const fetchActualIncomes = async (userId, budgetId) => {
  const response = await fetch(
    `${API_URL}/api/income/actual/${userId}/${budgetId}`
  );
  if (!response.ok)
    throw new Error(`Error fetching incomes: ${response.status}`);
  return response.json();
};

export const fetchActualExpenses = async (userId, budgetId) => {
  const response = await fetch(
    `${API_URL}/api/expense/actual/${userId}/${budgetId}`
  );
  if (!response.ok)
    throw new Error(`Error fetching expenses: ${response.status}`);
  return response.json();
};

export const fetchExpectedIncomes = async (userId, budgetId) => {
  const response = await fetch(
    `${API_URL}/api/income/predicted/${userId}/${budgetId}`
  );
  if (!response.ok)
    throw new Error(`Error fetching expected incomes: ${response.status}`);
  return response.json();
};

export const fetchExpectedExpenses = async (userId, budgetId) => {
  const response = await fetch(
    `${API_URL}/api/expense/predicted/${userId}/${budgetId}`
  );
  if (!response.ok)
    throw new Error(`Error fetching expected expenses: ${response.status}`);
  return response.json();
};

export const processRow = async (row, type, status) => {
  const isUpdate = row.id && row.id !== "";
  const url = isUpdate
    ? `${API_URL}/api/${type}/${status}/update`
    : `${API_URL}/api/${type}/${status}/addbulk`;
  const method = isUpdate ? "PATCH" : "POST";
  const body = {
    ...row,
    id: isUpdate ? row.id : undefined, // Remove id for POST requests
  };
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `HTTP error! status: ${response.status}, response: ${errorText}`
    );
  }
  return response.json();
};

export const deleteRow = async (row, status) => {
  const url = `${API_URL}/api/${row.type}/${status}/delete`;
  const body = {
    id: row.id,
    budget_id: row.budget_id,
  };

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `HTTP error! status: ${response.status}, response: ${errorText}`
    );
  }
};

// GOOGLE AUTH API
export const parseOAuthFragment = () => {
  const hash = window.location.hash.substring(1); // Get the URL fragment after '#'
  const params = new URLSearchParams(hash);
  const accessToken = params.get("access_token");
  const refreshToken = params.get("refresh_token");

  return { accessToken, refreshToken };
};

// Function to handle the OAuth callback
export const handleOAuthCallback = async (accessToken, refreshToken) => {
  try {
    const response = await fetch(
      `${API_URL}/api/auth/oauth-callback`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken, refreshToken }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "OAuth callback failed");
    }
    return await response.json();
  } catch (error) {
    console.error("Error handling OAuth callback:", error);
    throw error;
  }
};

export const deleteIncomesActualBulk = async (ids, budgetId) => {
  const url = `${API_URL}/api/income/actual/deletebulk`;
  const body = {
    ids,
    budget_id: budgetId,
  };

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `HTTP error! status: ${response.status}, response: ${errorText}`
    );
  }

  return response.json();
};

export const deleteExpensesActualBulk = async (ids, budgetId) => {
  const url = `${API_URL}/api/expense/actual/deletebulk`;
  const body = {
    ids,
    budget_id: budgetId,
  };

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `HTTP error! status: ${response.status}, response: ${errorText}`
    );
  }

  return response.json();
};

export const deleteIncomesPredictedBulk = async (ids, budgetId) => {
  const url = `${API_URL}/api/income/predicted/deletebulk`;
  const body = {
    ids,
    budget_id: budgetId,
  };

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `HTTP error! status: ${response.status}, response: ${errorText}`
    );
  }

  return response.json();
};

export const deleteExpensesPredictedBulk = async (ids, budgetId) => {
  const url = `${API_URL}/api/expense/predicted/deletebulk`;
  const body = {
    ids,
    budget_id: budgetId,
  };

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `HTTP error! status: ${response.status}, response: ${errorText}`
    );
  }

  return response.json();
};

export const updateKeepTrack = async (budgetId, userId, keepTrack) => {
  const url = `${API_URL}/api/budget/keeptrack`;
  const body = {
    budget_id: budgetId,
    user_id: userId,
    keep_track: !!keepTrack,
  };
  console.log(body);

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `HTTP error! status: ${response.status}, response: ${errorText}`
    );
  }

  return response.json();
};

export const getBudgetById = async (budgetId) => {
  try {
    const response = await fetch(`${API_URL}/api/budget/budget/${budgetId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching budget:", error);
    throw error;
  }
};

export const updateBudget = async (budgetId, updates) => {
  try {
    const response = await fetch(`${API_URL}/api/budget/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ budgetId, ...updates }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, response: ${errorText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating budget:", error);
    throw error;
  }
};

// api.js
export const handleGoogleLogin = async () => {
  try {
    const response = await fetch(`${API_URL}/api/auth/logingoogle`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (response.ok) {
      window.location.href = data.url; // Redirect to the OAuth provider's URL
    } else {
      throw new Error(data.error || "Login failed");
    }
  } catch (err) {
    throw new Error(err.message || "Login failed");
  }
};

export const handleGoogleCallback = async (login, navigate) => {
  const hash = window.location.hash.substring(1); // Get the URL fragment after #
  const params = new URLSearchParams(hash);
  const accessToken = params.get("access_token");
  const refreshToken = params.get("refresh_token");

  if (accessToken && refreshToken) {
    // Send tokens to backend
    const response = await fetch(`${API_URL}/api/auth/callback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessToken, refreshToken }),
    });

    const data = await response.json();
    console.log("Server response:", data);

    if (response.ok) {
      const userData = data.userData;
      login(userData); // Call the login function with userData
      navigate("/"); // Redirect to the home page
    }

    // Clear the hash from the URL
    window.history.replaceState(null, null, window.location.pathname);
  }
};

export const handleGoogleSignUp = async (login, navigate, setError) => {
  const hash = window.location.hash.substring(1); // Get the URL fragment after #
  const params = new URLSearchParams(hash);
  const accessToken = params.get("access_token");
  const refreshToken = params.get("refresh_token");

  if (accessToken && refreshToken) {
    // Send tokens to backend
    const response = await fetch(`${API_URL}/api/auth/callback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessToken, refreshToken }),
    });

    const data = await response.json();
    console.log("Server response:", data);

    if (response.ok) {
      const userData = data.userData;
      login(userData); // Call the login function with userData
      navigate("/"); // Redirect to the home page
    } else {
      setError(data.error || "Sign up failed");
    }

    // Clear the hash from the URL
    window.history.replaceState(null, null, window.location.pathname);
  }
};

// api.js
export const handleParse = async (setMessage, setActualIncomes, setActualExpenses, budgetId) => {
  try {
    const response = await fetch(`${API_PYTHON_URL}/parserjson`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ option: 'td_bank' }),
    });

    const contentType = response.headers.get('content-type');
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = { error: 'Server returned non-JSON response' };
    }

    if (response.ok) {
      setMessage('Parser executed successfully');
      console.log(data); // Log the result

      const { incomes, expenses } = data.data;

      if (incomes && incomes.length > 0) {
        const newIncomes = incomes.map((income) => ({
          description: income.description,
          date_posted: new Date(income.date).toISOString(),
          amount: income.amount,
          category: 'gift',
          budget_id: budgetId,
        }));

        console.log('New Incomes:', newIncomes);

        const incomeResponse = await fetch(`${API_URL}/api/income/actual/addbulk`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newIncomes),
        });

        if (incomeResponse.ok) {
          setActualIncomes((prevIncomes) => [...prevIncomes, ...newIncomes]);
          setMessage('Added to actual incomes');
        } else {
          setMessage('Failed to add incomes to the database');
        }
      } else {
        setMessage('No incomes found in the provided data');
      }

      if (expenses && expenses.length > 0) {
        const newExpenses = expenses.map((expense) => ({
          description: expense.description,
          date_posted: new Date(expense.date).toISOString(),
          amount: expense.amount,
          category: 'expense',
          budget_id: budgetId,
        }));

        const expenseResponse = await fetch(`${API_URL}/api/expense/actual/addbulk`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newExpenses),
        });

        if (expenseResponse.ok) {
          setActualExpenses((prevExpenses) => [...prevExpenses, ...newExpenses]);
          setMessage('Added to actual expenses');
        } else {
          setMessage('Failed to add expenses to the database');
        }
      } else {
        setMessage('No expenses found in the provided data');
      }

      // Reload the page
      window.location.reload();
    } else {
      setMessage(data.error || 'Error executing parser');
    }
  } catch (err) {
    setMessage(err.message || 'Error executing parser');
  }
};

// Parser.js
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);  // Ensure the key is 'file' to match FastAPI

  const response = await fetch(`${API_PYTHON_URL}/upload/add`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Error uploading file");
  }

  return response.json();
};

export const executeParser = async () => {
  const response = await fetch(`${API_PYTHON_URL}/execute-parser`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error executing parser");
  }

  return response.json();
};

export const executeTDParser = async () => {
  const response = await fetch(`${API_PYTHON_URL}/execute-parser-tdtest`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error executing TD parser");
  }

  return response.json();
};

export const parseJSON = async (selectedOption) => {
  const response = await fetch(`${API_PYTHON_URL}/parserjson`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ option: selectedOption }),
  });

  const contentType = response.headers.get("content-type");
  let data;
  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = { error: "Server returned non-JSON response" };
  }

  if (!response.ok) {
    throw new Error(data.error || "Error executing parser");
  }

  return data;
};

// export const parseJSON = async (selectedOption) => {
//   const response = await fetch(`${API_URL}/api/parser/parserjson`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ option: selectedOption }),
//   });
//
//   const contentType = response.headers.get("content-type");
//   let data;
//   if (contentType && contentType.includes("application/json")) {
//     data = await response.json();
//   } else {
//     data = { error: "Server returned non-JSON response" };
//   }
//
//   if (!response.ok) {
//     throw new Error(data.error || "Error executing parser");
//   }
//
//   return data;
// };

export const addBulkIncomes = async (newIncomes) => {
  const response = await fetch(`${API_URL}/api/income/actual/addbulk`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newIncomes),
  });

  if (!response.ok) {
    throw new Error("Failed to add incomes to the database");
  }

  return response.json();
};

export const addBulkExpenses = async (newExpenses) => {
  const response = await fetch(`${API_URL}/api/expense/actual/addbulk`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newExpenses),
  });

  if (!response.ok) {
    throw new Error("Failed to add expenses to the database");
  }

  return response.json();
};

export const deleteDataFolder = async () => {
  const response = await fetch(`${API_PYTHON_URL}/deletedatafolder`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete data folder");
  }

  return response.json();
};