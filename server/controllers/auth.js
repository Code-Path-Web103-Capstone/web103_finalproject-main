import supabase from "../config/supabase.js";

// add username functionality
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

// add login by username or email
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
      message: "Login successful",
      data, // Contains the user session details
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export default { createUser, loginUser };
