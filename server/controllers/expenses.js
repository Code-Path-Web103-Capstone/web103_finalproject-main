import { createSupabaseClient } from "../config/supabase.js";

const addExpenseActual = async (req, res) => {
  const { description, date_posted, amount, category, budget_id } = req.body;
  const supabase = createSupabaseClient();

  try {
    const { data, error } = await supabase
      .from('expenses_actual')
      .insert([{ description, date_posted, amount, category, budget_id }]);

    if (error) {
      console.error("Error inserting expense:", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: "Expense added successfully",
      data,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const addExpensesActualBulk = async (req, res) => {
  const expenses = req.body;
  const supabase = createSupabaseClient();

  try {
    const { data, error } = await supabase
      .from('expenses_actual')
      .insert(expenses);

    if (error) {
      console.error("Error inserting expenses:", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: "Expenses added successfully",
      data,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};


const getExpensesActual = async (req, res) => {
  const { budget_id } = req.params;
  const supabase = createSupabaseClient();

  try {
    const { data, error } = await supabase
      .from('expenses_actual')
      .select('*')
      .eq('budget_id', budget_id);

    if (error) {
      console.error("Error fetching expenses:", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const updateExpenseActual = async (req, res) => {
  const { id, description, date_posted, amount, category, budget_id } = req.body;
  const supabase = createSupabaseClient();

  try {
    const { data, error } = await supabase
      .from('expenses_actual')
      .update({ description, date_posted, amount, category, budget_id })
      .eq('id', id)
      .eq('budget_id', budget_id);

    if (error) {
      console.error("Error updating expense:", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
      message: "Expense updated successfully",
      data,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteExpenseActual = async (req, res) => {
  const { id, budget_id } = req.body;
  const supabase = createSupabaseClient();

  try {
    const { data, error } = await supabase
      .from('expenses_actual')
      .delete()
      .eq('id', id)
      .eq('budget_id', budget_id);

    if (error) {
      console.error("Error deleting expense:", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
      message: "Expense deleted successfully",
      data,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const addExpensePredicted = async (req, res) => {
  const { description, date_posted, amount, category, budget_id } = req.body;
  const supabase = createSupabaseClient();

  try {
    const { data, error } = await supabase
      .from('expenses_predicted')
      .insert([{ description, date_posted, amount, category, budget_id }]);

    if (error) {
      console.error("Error inserting expense:", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: "Expense added successfully",
      data,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const addExpensesPredictedBulk = async (req, res) => {
  const expenses = req.body;
  const supabase = createSupabaseClient();

  try {
    const { data, error } = await supabase
      .from('expenses_predicted')
      .insert(expenses);

    if (error) {
      console.error("Error inserting predicted expenses:", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: "Predicted expenses added successfully",
      data,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getExpensesPredicted = async (req, res) => {
  const { budget_id } = req.params;
  const supabase = createSupabaseClient();

  try {
    const { data, error } = await supabase
      .from('expenses_predicted')
      .select('*')
      .eq('budget_id', budget_id);

    if (error) {
      console.error("Error fetching expenses:", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const updateExpensePredicted = async (req, res) => {
  const { id, description, date_posted, amount, category, budget_id } = req.body;
  const supabase = createSupabaseClient();

  try {
    const { data, error } = await supabase
      .from('expenses_predicted')
      .update({ description, date_posted, amount, category, budget_id })
      .eq('id', id)
      .eq('budget_id', budget_id);

    if (error) {
      console.error("Error updating expense:", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
      message: "Expense updated successfully",
      data,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteExpensePredicted = async (req, res) => {
  const { id, budget_id } = req.body;
  const supabase = createSupabaseClient();

  try {
    const { data, error } = await supabase
      .from('expenses_predicted')
      .delete()
      .eq('id', id)
      .eq('budget_id', budget_id);

    if (error) {
      console.error("Error deleting expense:", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
      message: "Expense deleted successfully",
      data,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const addExpenseRecurrent = async (req, res) => {
  const { description, date_posted, amount, category } = req.body;
  const supabase = createSupabaseClient();

  try {
    const { data, error } = await supabase
      .from('expenses_recurrent')
      .insert([{ description, date_posted, amount, category }]);

    if (error) {
      console.error("Error inserting expense:", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: "Expense added successfully",
      data,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getExpensesRecurrent = async (req, res) => {
  const supabase = createSupabaseClient();

  try {
    const { data, error } = await supabase
      .from('expenses_recurrent')
      .select('*')

    if (error) {
      console.error("Error fetching expenses:", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const updateExpenseRecurrent = async (req, res) => {
  const { id, description, date_posted, amount, category } = req.body;
  const supabase = createSupabaseClient();

  try {
    const { data, error } = await supabase
      .from('expenses_recurrent')
      .update({ description, date_posted, amount, category })
      .eq('id', id)

    if (error) {
      console.error("Error updating expense:", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
      message: "Expense updated successfully",
      data,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteExpenseRecurrent = async (req, res) => {
  const { id } = req.body;
  const supabase = createSupabaseClient();

  try {
    const { data, error } = await supabase
      .from('expenses_recurrent')
      .delete()
      .eq('id', id)

    if (error) {
      console.error("Error deleting expense:", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
      message: "Expense deleted successfully",
      data,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export default { addExpensesActualBulk, addExpenseRecurrent, addExpensesPredictedBulk, getExpensesRecurrent, updateExpenseRecurrent, deleteExpenseRecurrent, addExpenseActual, getExpensesActual, updateExpenseActual, deleteExpenseActual, addExpensePredicted, getExpensesPredicted, updateExpensePredicted, deleteExpensePredicted };