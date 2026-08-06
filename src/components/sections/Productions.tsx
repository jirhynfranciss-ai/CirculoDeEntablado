import { useMemo, useState } from "react";
import { Reveal, SectionHeading, Chip } from "../UI";
import { useCollection } from "../../hooks/useCollection";
import { fallbackProductions } from "../../data/fallbackContent";
import type { Production } from "../../data/types";
import { CalendarDays, MapPin, Users } from "lucide-react";

export default function Productions() {
  const { data: productions } = useCollection<Production>(
    "productions",
    fallbackProductions
  );
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  const filtered = useMemo(
    () => productions.filter((p) => p.status === tab),
    [productions, tab]
  );

  return (
    <section id="productions" className="relative py-28 md:py-36 bg-black">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Act VI — On Stage"
            title="Productions & Performances"
            subtitle="From premiere runs to award-winning revivals — explore the shows that define CDE's artistic journey."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="flex justify-center gap-4 mb-14">
            <Chip active={tab === "upcoming"} onClick={() => setTab("upcoming")}>
              Upcoming Shows
            </Chip>
            <Chip active={tab === "past"} onClick={() => setTab("past")}>
              Past Productions
            </Chip>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 100}>
              <div className="theatre-card group relative h-full border border-white/10 hover:border-[#db0000]/60 bg-white/[0.02] rounded-sm overflow-hidden flex flex-col">
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={p.poster_url}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <span
                    className={`absolute top-4 left-4 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm ${
                      p.status === "upcoming"
                        ? "bg-[#db0000] text-white"
                        : "bg-[#d4af37] text-black"
                    }`}
                  >
                    {p.status === "upcoming" ? "Upcoming" : "Past Production"}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-xl text-white mb-2">
                    {p.title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed mb-5 flex-1">
                    {p.description}
                  </p>
                  <div className="space-y-2 text-xs text-white/45">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={14} className="text-[#db0000]" />
                      {new Date(p.production_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    {p.venue && (
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-[#db0000]" />
                        {p.venue}
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-[#db0000]" />
                      {p.cast_info}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-white/40">
              No productions to display yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
