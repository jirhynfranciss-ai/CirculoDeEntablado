// Rich, production-quality demo content used whenever Supabase is not
// configured (or while live data is loading). This guarantees the public
// site always renders a complete, polished experience.
import type {
  Achievement,
  EventItem,
  GalleryItem,
  MediaItem,
  Officer,
  Production,
  Testimonial,
} from "./types";

const img = (path: string) => path;

export const fallbackOfficers: Officer[] = [
  {
    id: "o1",
    name: "Rafael Ibarra Domingo",
    position: "President",
    photo_url: "https://images.pexels.com/photos/27544052/pexels-photo-27544052.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=650",
    description:
      "Leads CDE's artistic direction and organizational vision, representing the guild across USTP and inter-collegiate theatre festivals.",
    social_links: { facebook: "#", instagram: "#" },
    display_order: 1,
    created_at: "2024-06-01",
  },
  {
    id: "o2",
    name: "Maria Clara Santos",
    position: "Vice President – Internal",
    photo_url: "https://images.pexels.com/photos/12414845/pexels-photo-12414845.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=650",
    description:
      "Oversees member welfare, training programs, and internal rehearsals, ensuring every performer grows under CDE's mentorship system.",
    social_links: { facebook: "#", instagram: "#" },
    display_order: 2,
    created_at: "2024-06-01",
  },
  {
    id: "o3",
    name: "Diego Emmanuel Cruz",
    position: "Vice President – External",
    photo_url: "https://images.pexels.com/photos/7752805/pexels-photo-7752805.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=650",
    description:
      "Builds partnerships with fellow theatre organizations, cultural offices, and sponsors to expand CDE's reach beyond the campus.",
    social_links: { facebook: "#", instagram: "#" },
    display_order: 3,
    created_at: "2024-06-01",
  },
  {
    id: "o4",
    name: "Isabela Fuentes Reyes",
    position: "Artistic Director",
    photo_url: "https://images.pexels.com/photos/8199174/pexels-photo-8199174.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=650",
    description:
      "Shapes the creative direction of every CDE production, from script selection to staging, lighting design, and blocking.",
    social_links: { facebook: "#", instagram: "#" },
    display_order: 4,
    created_at: "2024-06-01",
  },
  {
    id: "o5",
    name: "Antonio Villanueva",
    position: "Production Manager",
    photo_url: "https://images.pexels.com/photos/38740728/pexels-photo-38740728.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=650",
    description:
      "Manages logistics, budgets, venues, and technical crews so every curtain rises exactly on cue.",
    social_links: { facebook: "#", instagram: "#" },
    display_order: 5,
    created_at: "2024-06-01",
  },
  {
    id: "o6",
    name: "Bianca Mercedes Uy",
    position: "Secretary General",
    photo_url: "https://images.pexels.com/photos/6682476/pexels-photo-6682476.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=650",
    description:
      "Keeps the guild's records, minutes, and communications organized across every department and production season.",
    social_links: { facebook: "#", instagram: "#" },
    display_order: 6,
    created_at: "2024-06-01",
  },
  {
    id: "o7",
    name: "Gabriel Santiago Reyes",
    position: "Public Relations Officer",
    photo_url: "https://images.pexels.com/photos/33801225/pexels-photo-33801225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=650",
    description:
      "Curates CDE's public voice — from social media storytelling to press coverage and audience engagement.",
    social_links: { facebook: "#", instagram: "#" },
    display_order: 7,
    created_at: "2024-06-01",
  },
];

export const fallbackAchievements: Achievement[] = [
  {
    id: "a1",
    title: "Best Full-Length Production",
    description:
      "Awarded at the Regional Intercollegiate Theatre Festival for CDE's original Filipino stage adaptation.",
    date_achieved: "2024-11-15",
    image_url: img("/images/velvet-texture.jpg"),
    category: "Competition",
    display_order: 1,
    created_at: "2024-11-15",
  },
  {
    id: "a2",
    title: "Outstanding Theatre Organization",
    description:
      "Recognized by the USTP Office of Student Affairs for exceptional contribution to campus arts and culture.",
    date_achieved: "2024-03-20",
    image_url: img("/images/velvet-texture.jpg"),
    category: "Recognition",
    display_order: 2,
    created_at: "2024-03-20",
  },
  {
    id: "a3",
    title: "Best Direction & Best Ensemble",
    description:
      "Double honors at the Mindanao Collegiate Drama Cup for staging and cohesive ensemble performance.",
    date_achieved: "2023-09-08",
    image_url: img("/images/velvet-texture.jpg"),
    category: "Competition",
    display_order: 3,
    created_at: "2023-09-08",
  },
  {
    id: "a4",
    title: "Cultural Excellence Award",
    description:
      "Conferred by the City of Cagayan de Oro for CDE's community outreach theatre workshops in local public schools.",
    date_achieved: "2023-05-02",
    image_url: img("/images/velvet-texture.jpg"),
    category: "Community",
    display_order: 4,
    created_at: "2023-05-02",
  },
  {
    id: "a5",
    title: "Best Original Script",
    description:
      "First place, playwriting division, for a student-written play exploring Kagay-anon folklore and identity.",
    date_achieved: "2022-10-27",
    image_url: img("/images/velvet-texture.jpg"),
    category: "Competition",
    display_order: 5,
    created_at: "2022-10-27",
  },
  {
    id: "a6",
    title: "Loyalty & Legacy Citation",
    description:
      "Presented on CDE's founding anniversary honoring a decade of unbroken theatrical excellence at USTP.",
    date_achieved: "2022-02-14",
    image_url: img("/images/velvet-texture.jpg"),
    category: "Milestone",
    display_order: 6,
    created_at: "2022-02-14",
  },
];

export const fallbackProductions: Production[] = [
  {
    id: "p1",
    title: "Ang Huling El Bimbo: Isang Sarswela",
    description:
      "A contemporary sarswela reimagining Filipino youth culture through movement, music, and memory.",
    poster_url: "https://images.pexels.com/photos/20898292/pexels-photo-20898292.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
    production_date: "2025-11-08",
    venue: "USTP CDO Grand Cultural Hall",
    status: "upcoming",
    cast_info: "Ensemble cast of 24 performers led by the CDE Repertory Company",
    display_order: 1,
    created_at: "2025-06-01",
  },
  {
    id: "p2",
    title: "Noli Me Tángere: Sa Ngalan ng Bayan",
    description:
      "An original stage adaptation exploring Rizal's timeless critique of society through modern theatrical staging.",
    poster_url: "https://images.pexels.com/photos/6899790/pexels-photo-6899790.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
    production_date: "2026-02-14",
    venue: "USTP Little Theatre",
    status: "upcoming",
    cast_info: "Featuring CDE's senior batch and guest alumni performers",
    display_order: 2,
    created_at: "2025-09-01",
  },
  {
    id: "p3",
    title: "Larawan ng Puso",
    description:
      "CDE's award-winning original production exploring family, sacrifice, and homecoming — the piece that won Best Full-Length Production.",
    poster_url: "https://images.pexels.com/photos/10601679/pexels-photo-10601679.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
    production_date: "2024-11-15",
    venue: "USTP CDO Grand Cultural Hall",
    status: "past",
    cast_info: "Lead: I. Fuentes-Reyes, R. Domingo · Directed by the CDE Artistic Council",
    display_order: 3,
    created_at: "2024-11-15",
  },
  {
    id: "p4",
    title: "Sa Bawat Sulyap",
    description:
      "A devised movement-theatre piece exploring the quiet stories of Kagay-anon working youth.",
    poster_url: "https://images.pexels.com/photos/6896221/pexels-photo-6896221.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
    production_date: "2024-03-20",
    venue: "USTP Little Theatre",
    status: "past",
    cast_info: "Devised and performed by the CDE Junior Ensemble",
    display_order: 4,
    created_at: "2024-03-20",
  },
  {
    id: "p5",
    title: "Alamat: Mga Kwento ng Lupa",
    description:
      "A folkloric anthology production weaving Mindanaoan legends into a single theatrical tapestry.",
    poster_url: "https://images.pexels.com/photos/6896188/pexels-photo-6896188.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
    production_date: "2023-09-08",
    venue: "USTP CDO Grand Cultural Hall",
    status: "past",
    cast_info: "Ensemble cast of 30 · Best Direction & Best Ensemble, MinCDC 2023",
    display_order: 5,
    created_at: "2023-09-08",
  },
];

export const fallbackEvents: EventItem[] = [
  {
    id: "e1",
    title: "Open Auditions: Batch 2026",
    description:
      "Cold reading, movement, and improvisation auditions for CDE's incoming performer batch. All USTP students welcome.",
    event_date: "2026-01-20",
    event_time: "1:00 PM – 6:00 PM",
    location: "USTP Little Theatre, CDO Campus",
    registration_link: "#join",
    image_url: "https://images.pexels.com/photos/6896333/pexels-photo-6896333.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1000",
    display_order: 1,
    created_at: "2025-12-01",
  },
  {
    id: "e2",
    title: "Voice & Stage Presence Workshop",
    description:
      "A hands-on masterclass on projection, diction, and commanding stage presence, led by CDE alumni performers.",
    event_date: "2026-01-30",
    event_time: "9:00 AM – 12:00 NN",
    location: "USTP Performing Arts Room",
    registration_link: "#join",
    image_url: "https://images.pexels.com/photos/6896222/pexels-photo-6896222.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1000",
    display_order: 2,
    created_at: "2025-12-01",
  },
  {
    id: "e3",
    title: "Community Theatre Outreach: CDO Public Schools",
    description:
      "CDE members bring short interactive plays and theatre-games to local elementary schools around Cagayan de Oro.",
    event_date: "2026-02-07",
    event_time: "8:00 AM – 3:00 PM",
    location: "Various CDO Public Schools",
    registration_link: "#join",
    image_url: "https://images.pexels.com/photos/6877442/pexels-photo-6877442.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1000",
    display_order: 3,
    created_at: "2025-12-05",
  },
  {
    id: "e4",
    title: "Backstage & Technical Theatre Bootcamp",
    description:
      "A crash course on lighting, sound design, set construction, and stage management for aspiring crew members.",
    event_date: "2026-02-21",
    event_time: "1:00 PM – 5:00 PM",
    location: "USTP Little Theatre",
    registration_link: "#join",
    image_url: "https://images.pexels.com/photos/6877431/pexels-photo-6877431.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1000",
    display_order: 4,
    created_at: "2025-12-10",
  },
];

export const fallbackGallery: GalleryItem[] = [
  { id: "g1", image_url: "https://images.pexels.com/photos/20898292/pexels-photo-20898292.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1000", caption: "Larawan ng Puso — closing night", category: "productions", date_uploaded: "2024-11-16", display_order: 1 },
  { id: "g2", image_url: "https://images.pexels.com/photos/6899928/pexels-photo-6899928.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1000", caption: "Behind the curtain before opening act", category: "behind-the-scenes", date_uploaded: "2024-11-14", display_order: 2 },
  { id: "g3", image_url: "https://images.pexels.com/photos/10601679/pexels-photo-10601679.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1000", caption: "A pivotal scene from Sa Bawat Sulyap", category: "productions", date_uploaded: "2024-03-21", display_order: 3 },
  { id: "g4", image_url: "https://images.pexels.com/photos/6896221/pexels-photo-6896221.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1000", caption: "Director's notes during dress rehearsal", category: "behind-the-scenes", date_uploaded: "2024-03-10", display_order: 4 },
  { id: "g5", image_url: "https://images.pexels.com/photos/6899790/pexels-photo-6899790.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1000", caption: "Alamat — the legend duet", category: "productions", date_uploaded: "2023-09-09", display_order: 5 },
  { id: "g6", image_url: "https://images.pexels.com/photos/6896188/pexels-photo-6896188.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1000", caption: "Script read-through, week one", category: "behind-the-scenes", date_uploaded: "2023-08-02", display_order: 6 },
  { id: "g7", image_url: "https://images.pexels.com/photos/6896333/pexels-photo-6896333.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1000", caption: "Movement workshop with alumni mentors", category: "events", date_uploaded: "2024-06-15", display_order: 7 },
  { id: "g8", image_url: "https://images.pexels.com/photos/6896222/pexels-photo-6896222.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1000", caption: "Blocking rehearsal for the new season", category: "behind-the-scenes", date_uploaded: "2025-01-18", display_order: 8 },
  { id: "g9", image_url: "https://images.pexels.com/photos/6877442/pexels-photo-6877442.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1000", caption: "Final touches in the dressing room", category: "behind-the-scenes", date_uploaded: "2024-11-15", display_order: 9 },
  { id: "g10", image_url: "https://images.pexels.com/photos/6877431/pexels-photo-6877431.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1000", caption: "Line memorization before curtain call", category: "behind-the-scenes", date_uploaded: "2024-11-15", display_order: 10 },
  { id: "g11", image_url: "https://images.pexels.com/photos/6896221/pexels-photo-6896221.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1000", caption: "Community outreach theatre games", category: "events", date_uploaded: "2024-02-08", display_order: 11 },
  { id: "g12", image_url: "https://images.pexels.com/photos/20898292/pexels-photo-20898292.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1000", caption: "Awards night recognition", category: "events", date_uploaded: "2024-03-20", display_order: 12 },
];

export const fallbackMedia: MediaItem[] = [
  {
    id: "m1",
    media_type: "video",
    title: "Larawan ng Puso — Official Trailer",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail_url: "https://images.pexels.com/photos/20898292/pexels-photo-20898292.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=900",
    description: "The official teaser trailer for CDE's award-winning 2024 production.",
    date_added: "2024-10-20",
  },
  {
    id: "m2",
    media_type: "video",
    title: "Behind the Curtain: A CDE Documentary Short",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail_url: "https://images.pexels.com/photos/6899928/pexels-photo-6899928.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=900",
    description: "A short documentary following CDE members through a full production cycle.",
    date_added: "2024-05-11",
  },
  {
    id: "m3",
    media_type: "video",
    title: "CDE Highlights Reel 2024",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail_url: "https://images.pexels.com/photos/6896188/pexels-photo-6896188.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=900",
    description: "A cinematic recap of every CDE milestone throughout the year.",
    date_added: "2024-12-30",
  },
  {
    id: "m4",
    media_type: "article",
    title: "USTP Guild Brings Home Regional Theatre Honors",
    url: "#",
    thumbnail_url: "https://images.pexels.com/photos/10601679/pexels-photo-10601679.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=900",
    description: "Feature coverage on CDE's Best Full-Length Production win, USTP Bulletin.",
    date_added: "2024-11-20",
  },
  {
    id: "m5",
    media_type: "article",
    title: "Keeping Filipino Theatre Alive on Campus",
    url: "#",
    thumbnail_url: "https://images.pexels.com/photos/6896221/pexels-photo-6896221.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=900",
    description: "A feature on CDE's mission and community impact, CDO Culture Desk.",
    date_added: "2024-04-02",
  },
  {
    id: "m6",
    media_type: "article",
    title: "Student Thespians Take the Regional Stage",
    url: "#",
    thumbnail_url: "https://images.pexels.com/photos/6899790/pexels-photo-6899790.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=900",
    description: "Press mention of CDE's participation in the Mindanao Collegiate Drama Cup.",
    date_added: "2023-09-15",
  },
];

export const fallbackTestimonials: Testimonial[] = [
  {
    id: "t1",
    member_name: "Cristina Marasigan",
    member_role: "Alumna, Batch 2021 · Now a Theatre Educator",
    testimonial_text:
      "CDE didn't just teach me how to act — it taught me discipline, empathy, and how to lead an ensemble. Every rehearsal felt like home.",
    photo_url: "https://images.pexels.com/photos/8199174/pexels-photo-8199174.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=650",
    display_order: 1,
    created_at: "2024-01-01",
  },
  {
    id: "t2",
    member_name: "Julian Mendoza",
    member_role: "Current Member · Technical Director",
    testimonial_text:
      "I joined for the lights and sound, but I stayed for the family. CDE gave me a craft, a stage, and lifelong collaborators.",
    photo_url: "https://images.pexels.com/photos/27544052/pexels-photo-27544052.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=650",
    display_order: 2,
    created_at: "2024-01-01",
  },
  {
    id: "t3",
    member_name: "Dr. Estefania Roldan",
    member_role: "Faculty Adviser, USTP College of Arts and Sciences",
    testimonial_text:
      "Circulo de Entablado consistently represents the very best of student artistry — bold storytelling with impeccable discipline.",
    photo_url: "https://images.pexels.com/photos/38740728/pexels-photo-38740728.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=650",
    display_order: 3,
    created_at: "2024-01-01",
  },
  {
    id: "t4",
    member_name: "Patricia Amoranto",
    member_role: "Audience Member & CDO Cultural Advocate",
    testimonial_text:
      "Every CDE show feels like a professional production. The passion these students bring to the stage is simply unmatched.",
    photo_url: "https://images.pexels.com/photos/6682476/pexels-photo-6682476.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=650",
    display_order: 4,
    created_at: "2024-01-01",
  },
];

export const fallbackSiteSettings = {
  mission:
    "To cultivate a nurturing space where USTP students discover, refine, and celebrate the art of theatre — building confident storytellers, disciplined artists, and compassionate leaders through the collaborative craft of live performance.",
  vision:
    "To be Northern Mindanao's foremost collegiate theatre organization — a guild whose productions inspire cultural pride, artistic excellence, and a lifelong love for the stage among generations of Kagay-anon students.",
  about:
    "Circulo de Entablado (CDE) is the official theatre organization of the University of Science and Technology of Southern Philippines – Cagayan de Oro. For over a decade, CDE has been the creative home for students passionate about acting, directing, playwriting, and technical theatre craft. Through full-length productions, one-act showcases, workshops, and community outreach, CDE transforms curious students into confident performers and collaborative artists. Every season, our members rehearse late into the evening, build sets by hand, and rewrite scripts until every line breathes — because we believe theatre is not just performed, it is lived.",
  contactEmail: "circulodeentablado.ustp@gmail.com",
  contactAddress: "USTP Cagayan de Oro, Claro M. Recto Avenue, Lapasan, 9000 Cagayan de Oro City, Philippines",
  facebookUrl: "https://www.facebook.com/CirculodeEntabladoOfficial",
  instagramUrl: "https://instagram.com",
};
