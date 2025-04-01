import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Error supa Url or supa Key");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
