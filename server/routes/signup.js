/* 

******************************************************************
*   DEPRECATED:                                                  *
*   This file is no longer in use. The signup route is           *
*   now handled by the auth.js route (missing validation)        *
******************************************************************

import express from 'express';
import createClient from '../config/supabase.js';
import '../config/dotenv.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  let { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ error: 'Email, password, and username are required' });
  }

  const supabase = createClient();
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      });
    res.status(200).json({data});
  } catch (error) {
    res.status(400).json({error: error.message});
  }

});

export default router;

*/