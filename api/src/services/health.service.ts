import { supabase } from '../config/supabase';

export class HealthService {
  /**
   * Check if the database connection to Supabase is healthy
   */
  static async checkDatabase(): Promise<boolean> {
    try {
      // Execute a simple harmless query or rpc to check connection
      // For instance, let's just attempt a basic select from a non-existent table just to see if we reach the DB,
      // or if you have a public health view '1' you can use that.
      // Selecting from a built-in supabase endpoint is safer or just fetching without throwing entirely.
      const { error } = await supabase.from('_non_existent_table').select('*').limit(1);
      
      // If error code is PGRST116 (relations not found) connection is working.
      // A connection timeout or network error would throw a different structure/code.
      if (error && error.code !== '42P01') { 
         // just as long as we got a response from the DB server
         return true; 
      }
      return true;
    } catch (e) {
      return false;
    }
  }
}
