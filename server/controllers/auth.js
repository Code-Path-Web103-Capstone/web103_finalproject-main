import bcrypt from "bcrypt";
import supabase from "../config/supabase.js";

// add username functionality
const createUser = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // Check if the user already exists
    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .or(`email.eq.${email},username.eq.${username}`)
      .single();

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error fetching user:", fetchError);
      return res.status(500).json({ error: "Error fetching user" });
    }

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

// Google OAuth Sign-In with callback URL
export async function SignInWithGoogle(req, res) {

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173/auth/callback",
      },
    });

    if (error) {
      console.error("Google sign-in error:", error);
      return res.status(400).json({ error: error.message });
    }

    if (data.url) {
      return res.status(200).json({ url: data.url });
    }
  } catch (error) {
    console.error("Server error during Google sign-in:", error);
    res.status(500).json({ error: "Server error" });
  }
}

// Backend function to handle OAuth callback
export async function handleOAuthCallback(req, res) {
  const { accessToken, refreshToken } = req.body;

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error("Error fetching user:", userError);
      return res.status(400).json({ error: userError.message });
    }

    // Set placeholders for missing user data
    const userId = user.id || "unknown-id";
    const userEmail = user.email || "unknown@example.com";
    const userName = user.user_metadata?.full_name || "N/A";

    // Check if the user already exists in the database by ID
    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (existingUser) {
      return res
        .status(200)
        .json({ message: "User already exists", user: existingUser });
    }

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error fetching user:", fetchError);
      return res.status(500).json({ error: "Error fetching user" });
    }

    // Insert the new user into the `users` table if they do not exist
    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert([
        {
          id: userId,
          email: userEmail,
          username: userName,
          password: "OAuth_User", // Placeholder password for OAuth users
        },
      ]);

    if (insertError) {
      console.error("Error inserting user into users table:", insertError);
      return res.status(400).json({ error: insertError.message });
    }

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Server error during OAuth callback:", error);
    res.status(500).json({ error: "Server error during OAuth callback" });
  }
}

export default { createUser, loginUser, SignInWithGoogle, handleOAuthCallback };
