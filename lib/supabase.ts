import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

// Client is created lazily so missing env vars don't crash the build
let _client: ReturnType<typeof createClient> | null = null;

function getClient() {
  if (!_client) _client = createClient(supabaseUrl, supabaseKey);
  return _client;
}

export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
  get(_, prop) {
    return getClient()[prop as keyof ReturnType<typeof createClient>];
  },
});
