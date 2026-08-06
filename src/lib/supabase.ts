// Supabase client configuration.
// The public site works fully with rich fallback/demo content even when Supabase
// is not configured, so the app never breaks during development or preview.
// To connect a real backend, set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
// as environment variables (see .env.example and supabase/schema.sql).
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as
  | string
  | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// When not configured, we still create a harmless dummy client pointed at a
// placeholder URL so importing this module never throws. All data hooks check
// `isSupabaseConfigured` before attempting a network call.
export const supabase: SupabaseClient = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "public-anon-key-placeholder"
);

export const TABLES = {
  officers: "officers",
  achievements: "achievements",
  productions: "productions",
  events: "events",
  gallery: "gallery",
  media: "media",
  testimonials: "testimonials",
  siteSettings: "site_settings",
} as const;
