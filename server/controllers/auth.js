import supabase from "../config/supabase.js";
import bcrypt from "bcrypt";
import GoogleStrategy from "passport-google-oidc";
import { createServerClient } from '@supabase/ssr';

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

    if (fetchError && fetchError.code !== 'PGRST116') {
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

async function authCallback(req, res) {
  const hash = req.url.split('#')[1];
  const params = new URLSearchParams(hash);
  const accessToken = params.get('access_token');
  const refreshToken = params.get('refresh_token');

  if (accessToken && refreshToken) {
    const supabase = createServerClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );

    // Set the access token
    supabase.auth.setAuth(accessToken);

    // Fetch the session and user data
    const { data: session, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
      return res.status(400).json({ error: sessionError.message });
    }

    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError) {
      return res.status(400).json({ error: userError.message });
    }

    // Respond with the unified structure
    res.status(200).json({
      message: "Login successful",
      authData: session,
      userData: user,
    });

    // Redirect to the specified URL after successful login
    return res.redirect('http://localhost:5173/');
  } else {
    return res.redirect(303, 'http://localhost:5173/');
  }
}


async function SignInWithGoogle(req, res) {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: 'http://localhost:3000/api/auth/callback',
      },
    });

    if (error) {
      console.error("Google sign-in error:", error);
      return res.status(400).json({ error: error.message });
    }

    if (data.url) {
      // Set CORS headers
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

      // Return the OAuth provider's URL
      return res.status(200).json({ url: data.url });
    }
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
}


export default { createUser, loginUser, SignInWithGoogle, authCallback };
