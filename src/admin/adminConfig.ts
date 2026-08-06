// Field configuration driving the generic ManageCollection CRUD screen.
// Each entry maps directly to a Supabase table described in supabase/schema.sql.
export type FieldType = "text" | "textarea" | "date" | "datetime" | "image" | "select" | "number" | "url";

export interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  options?: string[];
  required?: boolean;
  placeholder?: string;
}

export interface CollectionConfig {
  table: string;
  title: string;
  description: string;
  orderBy: string;
  fields: FieldConfig[];
  titleField: string;
  imageField?: string;
}

export const officersConfig: CollectionConfig = {
  table: "officers",
  title: "Manage Officers",
  description: "Add, edit, reorder, or remove leadership team profiles.",
  orderBy: "display_order",
  titleField: "name",
  imageField: "photo_url",
  fields: [
    { key: "name", label: "Full Name", type: "text", required: true },
    { key: "position", label: "Position / Role", type: "text", required: true },
    { key: "photo_url", label: "Photo URL", type: "image" },
    { key: "description", label: "Bio / Responsibilities", type: "textarea" },
    { key: "display_order", label: "Display Order", type: "number" },
  ],
};

export const achievementsConfig: CollectionConfig = {
  table: "achievements",
  title: "Manage Achievements",
  description: "Add, edit, or remove awards, trophies, and recognitions.",
  orderBy: "display_order",
  titleField: "title",
  imageField: "image_url",
  fields: [
    { key: "title", label: "Achievement Title", type: "text", required: true },
    {
      key: "category",
      label: "Category",
      type: "select",
      options: ["Competition", "Recognition", "Community", "Milestone"],
    },
    { key: "date_achieved", label: "Date Achieved", type: "date" },
    { key: "image_url", label: "Image URL", type: "image" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "display_order", label: "Display Order", type: "number" },
  ],
};

export const productionsConfig: CollectionConfig = {
  table: "productions",
  title: "Manage Productions",
  description: "Add, edit, or remove past and upcoming shows.",
  orderBy: "display_order",
  titleField: "title",
  imageField: "poster_url",
  fields: [
    { key: "title", label: "Show Title", type: "text", required: true },
    { key: "status", label: "Status", type: "select", options: ["upcoming", "past"] },
    { key: "production_date", label: "Date", type: "date" },
    { key: "venue", label: "Venue", type: "text" },
    { key: "poster_url", label: "Poster URL", type: "image" },
    { key: "cast_info", label: "Cast / Credits", type: "text" },
    { key: "description", label: "Synopsis", type: "textarea" },
    { key: "display_order", label: "Display Order", type: "number" },
  ],
};

export const eventsConfig: CollectionConfig = {
  table: "events",
  title: "Manage Events & Workshops",
  description: "Add, edit, or remove auditions, workshops, and outreach programs.",
  orderBy: "display_order",
  titleField: "title",
  imageField: "image_url",
  fields: [
    { key: "title", label: "Event Title", type: "text", required: true },
    { key: "event_date", label: "Date", type: "date" },
    { key: "event_time", label: "Time", type: "text", placeholder: "e.g. 1:00 PM – 5:00 PM" },
    { key: "location", label: "Location", type: "text" },
    { key: "registration_link", label: "Registration Link", type: "url" },
    { key: "image_url", label: "Image URL", type: "image" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "display_order", label: "Display Order", type: "number" },
  ],
};

export const galleryConfig: CollectionConfig = {
  table: "gallery",
  title: "Manage Gallery",
  description: "Upload, categorize, and caption gallery images.",
  orderBy: "display_order",
  titleField: "caption",
  imageField: "image_url",
  fields: [
    { key: "image_url", label: "Image URL", type: "image", required: true },
    { key: "caption", label: "Caption", type: "text" },
    {
      key: "category",
      label: "Category",
      type: "select",
      options: ["productions", "events", "behind-the-scenes"],
    },
    { key: "date_uploaded", label: "Date Uploaded", type: "date" },
    { key: "display_order", label: "Display Order", type: "number" },
  ],
};

export const mediaConfig: CollectionConfig = {
  table: "media",
  title: "Manage Media",
  description: "Add or remove videos and press/article links.",
  orderBy: "date_added",
  titleField: "title",
  imageField: "thumbnail_url",
  fields: [
    { key: "title", label: "Title", type: "text", required: true },
    { key: "media_type", label: "Type", type: "select", options: ["video", "article"] },
    { key: "url", label: "URL (embed link or article URL)", type: "url" },
    { key: "thumbnail_url", label: "Thumbnail URL", type: "image" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "date_added", label: "Date Added", type: "date" },
  ],
};

export const testimonialsConfig: CollectionConfig = {
  table: "testimonials",
  title: "Manage Testimonials",
  description: "Add, edit, or remove member spotlights and testimonials.",
  orderBy: "display_order",
  titleField: "member_name",
  imageField: "photo_url",
  fields: [
    { key: "member_name", label: "Member Name", type: "text", required: true },
    { key: "member_role", label: "Role / Batch", type: "text" },
    { key: "photo_url", label: "Photo URL", type: "image" },
    { key: "testimonial_text", label: "Testimonial", type: "textarea" },
    { key: "display_order", label: "Display Order", type: "number" },
  ],
};
