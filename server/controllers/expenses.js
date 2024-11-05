import supabase from "../config/supabase.js";

const addExpenseActual = async (req, res) => {
  const { description, date_posted, amount, category, budget_id } = req.body;

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

const getExpensesActual = async (req, res) => {
  const { id: budget_id } = req.params; // Access budget_id from req.params

  console.log("Received budget_id:", budget_id); // Log the received budget_id

  try {
    const { data, error } = await supabase
      .from('expenses_actual')
      .select('*')
      .eq('budget_id', budget_id);

    if (error) {
      console.error("Error fetching expenses:", error);
      return res.status(400).json({ error: error.message });
    }

    console.log("Query result:", data); // Log the query result

    res.status(200).json(data);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const updateExpenseActual = async (req, res) => {
  const { id } = req.params;
  const { description, date_posted, amount, category, budget_id } = req.body;

  try {
    const { data, error } = await supabase
      .from('expenses_actual')
      .update({ description, date_posted, amount, category, budget_id })
      .eq('id', id);

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
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('expenses_actual')
      .delete()
      .eq('id', id);

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

export default { addExpenseActual, getExpensesActual, updateExpenseActual, deleteExpenseActual };