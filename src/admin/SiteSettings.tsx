import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { fallbackSiteSettings } from "../data/fallbackContent";
import { Save, ShieldAlert, CheckCircle2 } from "lucide-react";

const SECTIONS: { key: keyof typeof fallbackSiteSettings; label: string; multiline?: boolean }[] = [
  { key: "about", label: "About Us Copy", multiline: true },
  { key: "mission", label: "Mission Statement", multiline: true },
  { key: "vision", label: "Vision Statement", multiline: true },
  { key: "contactEmail", label: "Contact Email" },
  { key: "contactAddress", label: "Contact Address" },
  { key: "facebookUrl", label: "Facebook URL" },
  { key: "instagramUrl", label: "Instagram URL" },
];

export default function SiteSettings() {
  const [values, setValues] = useState({ ...fallbackSiteSettings });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    (async () => {
      const { data } = await supabase.from("site_settings").select("*");
      if (data) {
        const next = { ...fallbackSiteSettings };
        data.forEach((row: any) => {
          if (row.section_name in next) {
            (next as any)[row.section_name] = row.content_html;
          }
        });
        setValues(next);
      }
    })();
  }, []);

  const handleSave = async () => {
    if (!isSupabaseConfigured) {
      alert("Connect Supabase to persist site settings.");
      return;
    }
    setSaving(true);
    await Promise.all(
      Object.entries(values).map(([section_name, content_html]) =>
        supabase.from("site_settings").upsert(
          { section_name, content_html, updated_at: new Date().toISOString() },
          { onConflict: "section_name" }
        )
      )
    );
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <h1 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
        Site Settings
      </h1>
      <p className="text-white/50 text-sm mb-8">
        Update the copy shown across the About, Mission & Vision, and Contact sections.
      </p>

      {!isSupabaseConfigured && (
        <div className="mb-6 flex items-start gap-3 rounded-sm border border-[#d4af37]/40 bg-[#d4af37]/10 px-5 py-4 text-sm text-[#d4af37]">
          <ShieldAlert size={18} className="mt-0.5 shrink-0" />
          Connect Supabase to persist changes made here to the live site.
        </div>
      )}

      <div className="border border-white/10 rounded-sm p-7 bg-white/[0.02] space-y-6">
        {SECTIONS.map((s) => (
          <div key={s.key}>
            <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
              {s.label}
            </label>
            {s.multiline ? (
              <textarea
                rows={4}
                value={values[s.key]}
                onChange={(e) => setValues({ ...values, [s.key]: e.target.value })}
                className="w-full bg-black/40 border border-white/15 focus:border-[#db0000] outline-none rounded-sm px-4 py-3 text-sm text-white resize-none"
              />
            ) : (
              <input
                type="text"
                value={values[s.key]}
                onChange={(e) => setValues({ ...values, [s.key]: e.target.value })}
                className="w-full bg-black/40 border border-white/15 focus:border-[#db0000] outline-none rounded-sm px-4 py-3 text-sm text-white"
              />
            )}
          </div>
        ))}

        <div className="flex items-center gap-4 pt-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-sm bg-[#db0000] hover:bg-[#970000] transition-colors px-6 py-3 text-sm font-bold uppercase tracking-widest text-white disabled:opacity-60"
          >
            <Save size={16} /> {saving ? "Saving..." : "Save Changes"}
          </button>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-emerald-400">
              <CheckCircle2 size={16} /> Saved
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
