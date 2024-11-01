import '../config/dotenv.js';
import { createClient } from '@supabase/supabase-js';

const createServerClient = (context) => {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
};

export default createServerClient;