
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fuznhtapnzlkgzlghvgp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1em5odGFwbnpsa2d6bGdodmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1NzkyNjEsImV4cCI6MjAyMzE1NTI2MX0.0FX10LBpc6jqgFgInjL8uKfSOYgyJEQfgNRMjrDp-P0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
