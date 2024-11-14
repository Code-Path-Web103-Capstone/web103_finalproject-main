import { createSupabaseClient } from "../config/supabase.js";

const addIncomeActual = async (req, res) => {
  const { description, date_posted, amount, category, budget_id } = req.body;
  const supabase = createSupabaseClient();

  try {
    const { data, error } = await supabase
      .from('incomes_actual')
      .insert([{ description, date_posted, amount, category, budget_id }]);

    if (error) {
      console.error("Error inserting income:", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: "Income added successfully",
      data,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const addIncomesActualBulk = async (req, res) => {
  const incomes = req.body;
  const supabase = createSupabaseClient();

  try {
    const { data, error } = await supabase
      .from('incomes_actual')
      .insert(incomes);

    if (error) {
      console.error("Error inserting incomes:", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: "Incomes added successfully",
      data,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getIncomesActual = async (req, res) => {
  const { budget_id } = req.params;
  const supabase = createSupabaseClient();

  try {
    const { data, error } = await supabase
      .from('incomes_actual')
      .select('*')
      .eq('budget_id', budget_id);

    if (error) {
      console.error("Error fetching incomes:", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const updateIncomeActual = async (req, res) => {
  const { id, description, date_posted, amount, category, budget_id } = req.body;
  const supabase = createSupabaseClient();

  try {
    const { data, error } = await supabase
      .from('incomes_actual')
      .update({ description, date_posted, amount, category, budget_id })
      .eq('id', id)
      .eq('budget_id', budget_id);

    if (error) {
      console.error("Error updating income:", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
      message: "Income updated successfully",
      data,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteIncomeActual = async (req, res) => {
  const { id, budget_id } = req.body;
  const supabase = createSupabaseClient();

  try {
    const { data, error } = await supabase
      .from('incomes_actual')
      .delete()
      .eq('id', id)
      .eq('budget_id', budget_id);

    if (error) {
      console.error("Error deleting income:", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
      message: "Income deleted successfully",
      data,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const addIncomePredicted = async (req, res) => {
  const { description, date_posted, amount, category, budget_id } = req.body;
  const supabase = createSupabaseClient();

  try {
    const { data, error } = await supabase
      .from('incomes_predicted')
      .insert([{ description, date_posted, amount, category, budget_id }]);

    if (error) {
      console.error("Error inserting income:", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: "Income added successfully",
      data,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const addIncomesPredictedBulk = async (req, res) => {
  const incomes = req.body;
  const supabase = createSupabaseClient();

  try {
    const { data, error } = await supabase
      .from('incomes_predicted')
      .insert(incomes);

    if (error) {
      console.error("Error inserting predicted incomes:", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: "Predicted incomes added successfully",
      data,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getIncomesPredicted = async (req, res) => {
  const { budget_id } = req.params;
  const supabase = createSupabaseClient();

  try {
    const { data, error } = await supabase
      .from('incomes_predicted')
      .select('*')
      .eq('budget_id', budget_id);

    if (error) {
      console.error("Error fetching incomes:", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const updateIncomePredicted = async (req, res) => {
  const { id, description, date_posted, amount, category, budget_id } = req.body;
  const supabase = createSupabaseClient();

  try {
    const { data, error } = await supabase
      .from('incomes_predicted')
      .update({ description, date_posted, amount, category, budget_id })
      .eq('id', id)
      .eq('budget_id', budget_id);

    if (error) {
      console.error("Error updating income:", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
      message: "Income updated successfully",
      data,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteIncomePredicted = async (req, res) => {
  const { id, budget_id } = req.body;
  const supabase = createSupabaseClient();

  try {
    const { data, error } = await supabase
      .from('incomes_predicted')
      .delete()
      .eq('id', id)
      .eq('budget_id', budget_id);

    if (error) {
      console.error("Error deleting income:", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
      message: "Income deleted successfully",
      data,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const addIncomeRecurrent = async (req, res) => {
  const { description, date_posted, amount, category } = req.body;
  const supabase = createSupabaseClient();

  try {
    const { data, error } = await supabase
      .from('incomes_recurrent')
      .insert([{ description, date_posted, amount, category }]);

    if (error) {
      console.error("Error inserting income:", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: "Income added successfully",
      data,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getIncomesRecurrent = async (req, res) => {
  const supabase = createSupabaseClient();

  try {
    const { data, error } = await supabase
      .from('incomes_recurrent')
      .select('*')

    if (error) {
      console.error("Error fetching incomes:", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const updateIncomeRecurrent = async (req, res) => {
  const { id, description, date_posted, amount, category } = req.body;
  const supabase = createSupabaseClient();

  try {
    const { data, error } = await supabase
      .from('incomes_recurrent')
      .update({ description, date_posted, amount, category })
      .eq('id', id)

    if (error) {
      console.error("Error updating income:", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
      message: "Income updated successfully",
      data,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteIncomeRecurrent = async (req, res) => {
  const { id } = req.body;
  const supabase = createSupabaseClient();

  try {
    const { data, error } = await supabase
      .from('incomes_recurrent')
      .delete()
      .eq('id', id)

    if (error) {
      console.error("Error deleting income:", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
      message: "Income deleted successfully",
      data,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export default { addIncomeActual, addIncomesActualBulk, addIncomesPredictedBulk, getIncomesActual, updateIncomeActual, deleteIncomeActual, addIncomePredicted, getIncomesPredicted, updateIncomePredicted, deleteIncomePredicted, addIncomeRecurrent, getIncomesRecurrent, updateIncomeRecurrent, deleteIncomeRecurrent };