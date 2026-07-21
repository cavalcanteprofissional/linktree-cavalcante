import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const hasSupabase = !!supabaseUrl && !!supabaseKey;

export function getSupabaseClient() {
  if (!hasSupabase) {
    throw new Error("Supabase not configured");
  }
  return createClient(supabaseUrl!, supabaseKey!);
}
