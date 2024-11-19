import supabase from "../config/supabase.js";
const addBudget = async (req, res) => {
  const { user_id, plan, budget_name, keep_track, month, year } = req.body;

  try {
    const { data, error } = await supabase
      .from('budgets')
      .insert([{ user_id, plan, budget_name, keep_track, month, year, create_at: new Date() }])
      .select('id');

    if (error) {
      console.error("Error inserting budget:", error);
      return res.status(400).json({ error: error.message });
    }

    const budgetId = data[0].id;

    res.status(201).json({
      message: "Budget added successfully",
      user_id,
      id: budgetId,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getBudgets = async (req, res) => {
  const { user_id } = req.params;

  console.log("Received user_id:", user_id);

  try {
    const { data, error } = await supabase
      .from('budgets')
      .select('*')
      .eq('user_id', user_id);

    if (error) {
      console.error("Error fetching budgets:", error);
      return res.status(400).json({ error: error.message });
    }

    console.log("Query result:", data);

    res.status(200).json(data);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const updateBudget = async (req, res) => {
  const { id, user_id, plan, budget_name, keep_track, month, year } = req.body;

  try {
    const { data, error } = await supabase
      .from('budgets')
      .update({ user_id, plan, budget_name, keep_track, month, year })
      .eq('id', id);

    if (error) {
      console.error("Error updating budget:", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
      message: "Budget updated successfully",
      data,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteBudget = async (req, res) => {
  const { id } = req.body;

  try {
    // Delete related expenses in expenses_actual
    let { error } = await supabase
      .from('expenses_actual')
      .delete()
      .eq('budget_id', id);

    if (error && error.code !== 'PGRST116') {
      console.error("Error deleting related expenses_actual:", error);
      return res.status(400).json({ error: error.message });
    }

    // Delete related expenses in expenses_predicted
    ({ error } = await supabase
      .from('expenses_predicted')
      .delete()
      .eq('budget_id', id));

    if (error && error.code !== 'PGRST116') {
      console.error("Error deleting related expenses_predicted:", error);
      return res.status(400).json({ error: error.message });
    }

    // Delete related incomes in incomes_actual
    ({ error } = await supabase
      .from('incomes_actual')
      .delete()
      .eq('budget_id', id));

    if (error && error.code !== 'PGRST116') {
      console.error("Error deleting related incomes_actual:", error);
      return res.status(400).json({ error: error.message });
    }

    // Delete related incomes in incomes_predicted
    ({ error } = await supabase
      .from('incomes_predicted')
      .delete()
      .eq('budget_id', id));

    if (error && error.code !== 'PGRST116') {
      console.error("Error deleting related incomes_predicted:", error);
      return res.status(400).json({ error: error.message });
    }

    // Delete the budget
    const { data, error: deleteError } = await supabase
      .from('budgets')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error("Error deleting budget:", deleteError);
      return res.status(400).json({ error: deleteError.message });
    }

    res.status(200).json({
      message: "Budget and related expenses and incomes deleted successfully",
      data,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export default { addBudget, getBudgets, updateBudget, deleteBudget };