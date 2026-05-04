import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const { SUPABASE_URL, SUPABASE_KEY } = process.env;

if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error(
        "SUPABASE_URL and SUPABASE_KEY must be set in environment variables",
    );
} else {
    console.log("Supabase environment variables loaded successfully");
    const supabase = createClient(
        SUPABASE_URL,
        SUPABASE_KEY,
    );
}