import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hcaevdnfemmesbojgvim.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjYWV2ZG5mZW1tZXNib2pndmltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4NjA2NzksImV4cCI6MjA4NjQzNjY3OX0.4Bf630J1TlCBxlO6Qad3qck4z7PXYQg2yNUO38pY9Do';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
