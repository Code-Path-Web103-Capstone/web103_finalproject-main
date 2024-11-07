import supabase from "../config/supabase.js";
import bcrypt from "bcrypt";

// add username functionality
const createUser = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // Sign up the user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      console.error("Supabase signup error:", authError);
      return res.status(400).json({ error: authError.message });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the users table
    const { data: userData, error: userError } = await supabase
      .from("users")
      .insert([
        { id: authData.user.id, email, username, password: hashedPassword },
      ]);

    if (userError) {
      console.error("Error inserting user into users table:", userError);
      return res.status(400).json({ error: userError.message });
    }

    res.status(201).json({
      message: "User created successfully",
      authData,
      userData,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // Determine the identifier (email or username) for finding the user
    const identifier = username ? { username } : { email };

    // Fetch user by email or username
    const { data: userResult, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq(username ? "username" : "email", username || email)
      .single();

    if (fetchError || !userResult) {
      return res.status(400).json({ error: "User not found" });
    }

    // Authenticate with Supabase using the user's email
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email: userResult.email,
        password,
      });

    if (authError) {
      return res.status(400).json({ error: authError.message });
    }

    // Respond with the unified structure
    res.status(200).json({
      message: "Login successful",
      authData,
      userData: userResult, // Return the user data as part of the response
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export default { createUser, loginUser };
