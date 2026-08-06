import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase, isSupabaseConfigured, TABLES } from "../lib/supabase";
import {
  Users,
  Trophy,
  Clapperboard,
  CalendarClock,
  Images,
  PlaySquare,
  Quote,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

const cards = [
  { table: TABLES.officers, label: "Officers", icon: Users, to: "/admin/officers" },
  { table: TABLES.achievements, label: "Achievements", icon: Trophy, to: "/admin/achievements" },
  { table: TABLES.productions, label: "Productions", icon: Clapperboard, to: "/admin/productions" },
  { table: TABLES.events, label: "Events", icon: CalendarClock, to: "/admin/events" },
  { table: TABLES.gallery, label: "Gallery Items", icon: Images, to: "/admin/gallery" },
  { table: TABLES.media, label: "Media Items", icon: PlaySquare, to: "/admin/media" },
  { table: TABLES.testimonials, label: "Testimonials", icon: Quote, to: "/admin/testimonials" },
];

export default function DashboardHome() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    (async () => {
      const results = await Promise.all(
        cards.map(async (c) => {
          const { count } = await supabase
            .from(c.table)
            .select("*", { count: "exact", head: true });
          return [c.table, count ?? 0] as const;
        })
      );
      setCounts(Object.fromEntries(results));
    })();
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
        Dashboard Overview
      </h1>
      <p className="text-white/50 text-sm mb-8">
        Welcome back. Here's a snapshot of everything currently live on the
        public CDE site.
      </p>

      {!isSupabaseConfigured && (
        <div className="mb-8 flex items-start gap-3 rounded-sm border border-[#d4af37]/40 bg-[#d4af37]/10 px-5 py-4 text-sm text-[#d4af37]">
          <ShieldAlert size={20} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold mb-1">Supabase not connected</p>
            <p className="text-[#d4af37]/80">
              The public site is currently showing rich demo content. Connect
              your Supabase project via environment variables to manage real,
              persistent data from this dashboard.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-12">
        {cards.map((c) => (
          <Link
            key={c.table}
            to={c.to}
            className="group border border-white/10 hover:border-[#db0000]/60 bg-white/[0.02] rounded-sm p-6 transition-colors"
          >
            <c.icon size={22} className="text-[#db0000] mb-4" />
            <p className="font-display text-3xl font-bold text-white">
              {counts[c.table] ?? "—"}
            </p>
            <p className="text-xs uppercase tracking-widest text-white/50 mt-1">
              {c.label}
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs text-white/40 group-hover:text-[#db0000] transition-colors">
              Manage <ArrowRight size={12} />
            </span>
          </Link>
        ))}
      </div>

      <div className="border border-white/10 rounded-sm p-7 bg-white/[0.02]">
        <h2 className="font-display font-bold text-white text-lg mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/admin/productions" className="px-4 py-2 rounded-sm bg-[#db0000] hover:bg-[#970000] text-white text-sm font-semibold transition-colors">
            + Add Production
          </Link>
          <Link to="/admin/events" className="px-4 py-2 rounded-sm border border-white/20 hover:border-[#db0000] text-white text-sm font-semibold transition-colors">
            + Add Event
          </Link>
          <Link to="/admin/gallery" className="px-4 py-2 rounded-sm border border-white/20 hover:border-[#db0000] text-white text-sm font-semibold transition-colors">
            + Upload Gallery Photo
          </Link>
          <Link to="/admin/officers" className="px-4 py-2 rounded-sm border border-white/20 hover:border-[#db0000] text-white text-sm font-semibold transition-colors">
            + Add Officer
          </Link>
        </div>
      </div>
    </div>
  );
}
