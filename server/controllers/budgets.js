import supabase from "../config/supabase.js";

const addBudget = async (req, res) => {
  const { user_id, plan } = req.body;

  try {
    const { data, error } = await supabase
      .from('budgets')
      .insert([{ user_id, plan, create_at: new Date() }]);

    if (error) {
      console.error("Error inserting budget:", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: "Budget added successfully",
      data,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getBudgets = async (req, res) => {
  const { id: user_id } = req.params; // Access user_id from req.params

  console.log("Received user_id:", user_id); // Log the received user_id

  try {
    const { data, error } = await supabase
      .from('budgets')
      .select('*')
      .eq('user_id', user_id);

    if (error) {
      console.error("Error fetching budgets:", error);
      return res.status(400).json({ error: error.message });
    }

    console.log("Query result:", data); // Log the query result

    res.status(200).json(data);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const updateBudget = async (req, res) => {
  const { id } = req.params;
  const { user_id, plan } = req.body;

  try {
    const { data, error } = await supabase
      .from('budgets')
      .update({ user_id, plan })
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
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('budgets')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error deleting budget:", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
      message: "Budget deleted successfully",
      data,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export default { addBudget, getBudgets, updateBudget, deleteBudget };
