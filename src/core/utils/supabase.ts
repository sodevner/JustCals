
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, processLock } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = "https://peigpgicywmecmchsyww.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlaWdwZ2ljeXdtZWNtY2hzeXd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MTU0MzMsImV4cCI6MjA3NjA5MTQzM30.ZHA5CNjN3FCT230nPVVaF8EgBWlJxZGF8vCik5W3bQo";

export const supabase = createClient(
  supabaseUrl!,
  supabaseAnonKey!,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
      lock: processLock,
    },
  })
        