import { createClient, type SupabaseClient } from '@supabase/supabase-js';

function required(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name}. Add it to .env.local and to the Vercel project before building.`);
  }
  return value;
}

/** Cached content reads. The anon key cannot write. */
export function supabaseAnon() {
  return createClient(required('SUPABASE_URL'), required('SUPABASE_ANON_KEY'), {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => fetch(input, { ...init, next: { revalidate: 60 } }),
    },
  });
}

/** Seed script and form inserts. Never import this from a client component. */
export function supabaseAdmin(): SupabaseClient {
  return createClient(required('SUPABASE_URL'), required('SUPABASE_SERVICE_ROLE_KEY'), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
