import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://yzuskrlsnlmeuptfsyee.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6dXNrcmxzbmxtZXVwdGZzeWVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzMjkwMjEsImV4cCI6MjA4MDkwNTAyMX0.Ufuaso1MKiHQtb2IX_E8SkABcb7Qig2Vr8CN8T8wqF4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);