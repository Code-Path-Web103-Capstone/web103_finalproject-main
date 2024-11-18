import bcrypt from "bcrypt";
import supabase from "../config/supabase.js";
import { v4 as uuidv4 } from 'uuid';

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

const updateUser = async (req, res) => {
  const { userId, email, password, username } = req.body;

  try {
    // Check if the email or username is already taken by another user
    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .or(`email.eq.${email},username.eq.${username}`)
      .neq("id", userId) // Exclude current user's ID
      .single();

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email or username is already taken." });
    }

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error checking existing user:", fetchError);
      return res.status(500).json({ error: "Error checking existing user" });
    }

    const updates = {};
    if (email) updates.email = email;
    if (username) updates.username = username;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.password = hashedPassword;
    }

    // Update user in the database
    const { data: updatedUser, error: updateError } = await supabase
      .from("users")
      .update(updates)
      .eq("id", userId)
      .select("*")
      .single();

    if (updateError) {
      console.error("Error updating user:", updateError);
      return res.status(400).json({ error: updateError.message });
    }

    res.status(200).json({
      message: "User updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Google OAuth Sign-In with callback URL
async function SignInWithGoogle(req, res) {

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
      options: {
    redirectTo: 'http://localhost:5173/login',
  }
  }
  )
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

async function SignInWithGoogleCallback(req, res) {
  try {
    const { accessToken } = req.body;

    if (!accessToken) {
      return res.status(400).json({ error: 'Token not provided' });
    }

    // Use the access token to get the authenticated user's data
    const { data: user, error } = await supabase.auth.getUser(accessToken);

    if (error) {
      console.error("Error fetching user data:", error);
      return res.status(400).json({ error: error.message });
    }

    if (!user || !user.user || !user.user.id) {
      return res.status(400).json({ error: 'User ID not found' });
    }

    // Fetch additional user data from the database
    const { data: userResult, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.user.id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error fetching user data from database:", fetchError);
      return res.status(400).json({ error: fetchError.message });
    }

    // Check if the user is new
    const isNewUser = !userResult;

    if (isNewUser) {
      // Generate random and unique values for password and username
      const randomPassword = uuidv4();
      const randomUsername = uuidv4();

      // Insert the new user into the users table
      const { data: newUser, error: insertError } = await supabase
        .from("users")
        .insert([
          { id: user.user.id, email: user.user.email, username: randomUsername, password: randomPassword },
        ]);

      if (insertError) {
        console.error("Error inserting new user into users table:", insertError);
        return res.status(400).json({ error: insertError.message });
      }

      return res.status(201).json({
        message: "User created successfully",
        authData: user.user,
        userData: newUser,
      });
    }

    // Respond with the unified structure for existing users
    res.status(200).json({
      message: "Login successful",
      authData: user.user,
      userData: userResult,
    });
  } catch (error) {
    console.error("Server error during Google sign-in:", error);
    res.status(500).json({ error: "Server error" });
  }
}



export default {
  createUser,
  loginUser,
  updateUser,
  SignInWithGoogle,
  SignInWithGoogleCallback
};
