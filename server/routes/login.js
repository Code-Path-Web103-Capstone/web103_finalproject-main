import express from 'express';
import createClient from '../config/supabase.js';
import '../config/dotenv.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const supabase = createClient({ req, res });

  const { user, session, error } = await supabase.auth.signIn({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json({ user, session });
});

export default router;