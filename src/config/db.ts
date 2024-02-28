import { createClient } from "@supabase/supabase-js";
import { configVar } from "./configVar";

const supabaseUrl = configVar.SUPABASE_URL;
const supabaseKey = configVar.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL or API Key is not provided");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
