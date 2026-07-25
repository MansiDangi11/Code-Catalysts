const SUPABASE_URL = "https://cbewfqiiqszwhxincyvr.supabase.co";

const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiZXdmcWlpcXN6d2h4aW5jeXZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4MTkyMjMsImV4cCI6MjEwMDM5NTIyM30.3Rzrm-LAzpHI6GqpuX0GkVE2RNWu4stjxL_dvDHzeTc";


const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);