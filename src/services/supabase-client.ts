import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
    throw new Error(
        "SUPABASE_URL and SUPABASE_KEY must be set in environment variables",
    );
} else {
    console.log("Supabase environment variables loaded successfully");
    const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_KEY,
    );
}
