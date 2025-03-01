
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sxrglcrltmmuwhrnzpjo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4cmdsY3JsdG1tdXdocm56cGpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4MjQ5ODcsImV4cCI6MjA1NjQwMDk4N30.YpN5sMyG_Qt50cUKdDJjW6bl4MVXopecos7onFQhxTE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
