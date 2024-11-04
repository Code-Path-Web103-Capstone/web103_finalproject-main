import supabase from "../config/supabase.js";

const createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.error("Supabase signup error:", error); // Log detailed error information
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: "User created successfully",
      data,
    });
  } catch (error) {
    console.error("Server error:", error); // Log server-related issues
    res.status(500).json({ error: "Server error" });
  }
};

export default { createUser };
