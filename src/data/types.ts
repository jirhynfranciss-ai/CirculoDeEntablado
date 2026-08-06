// Shared TypeScript types mirroring the Supabase schema (see supabase/schema.sql).
// Keeping these centralized lets both the public site and the admin dashboard
// share strict typing across every CRUD table.

export interface Officer {
  id: string;
  name: string;
  position: string;
  photo_url: string;
  description: string;
  social_links: { facebook?: string; instagram?: string; email?: string } | null;
  display_order: number;
  created_at: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date_achieved: string;
  image_url: string;
  category: string;
  display_order: number;
  created_at: string;
}

export type ProductionStatus = "past" | "upcoming";

export interface Production {
  id: string;
  title: string;
  description: string;
  poster_url: string;
  production_date: string;
  venue?: string;
  status: ProductionStatus;
  cast_info: string;
  display_order: number;
  created_at: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  event_date: string;
  event_time?: string;
  location: string;
  registration_link: string;
  image_url: string;
  display_order: number;
  created_at: string;
}

export interface GalleryItem {
  id: string;
  image_url: string;
  caption: string;
  category: "productions" | "events" | "behind-the-scenes" | string;
  date_uploaded: string;
  display_order: number;
}

export type MediaType = "video" | "article";

export interface MediaItem {
  id: string;
  media_type: MediaType;
  title: string;
  url: string;
  thumbnail_url: string;
  description: string;
  date_added: string;
}

export interface Testimonial {
  id: string;
  member_name: string;
  member_role: string;
  testimonial_text: string;
  photo_url: string;
  display_order: number;
  created_at: string;
}

export interface SiteSetting {
  id: string;
  section_name: string;
  content_html: string;
  updated_at: string;
}
