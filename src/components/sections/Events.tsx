import { Reveal, SectionHeading, PrimaryButton } from "../UI";
import { useCollection } from "../../hooks/useCollection";
import { fallbackEvents } from "../../data/fallbackContent";
import type { EventItem } from "../../data/types";
import { CalendarDays, Clock, MapPin } from "lucide-react";

export default function Events() {
  const { data: events } = useCollection<EventItem>("events", fallbackEvents);

  return (
    <section id="events" className="relative py-28 md:py-36 bg-black velvet-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Act VII — Get Involved"
            title="Events & Workshops"
            subtitle="Auditions, masterclasses, rehearsals, and community outreach — stay on cue with everything happening at CDE."
          />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {events.map((e, i) => (
            <Reveal key={e.id} delay={(i % 2) * 120}>
              <div className="theatre-card group flex flex-col sm:flex-row gap-0 sm:gap-6 border border-white/10 hover:border-[#db0000]/50 bg-white/[0.02] rounded-sm overflow-hidden h-full">
                <div className="sm:w-2/5 h-52 sm:h-auto overflow-hidden">
                  <img
                    src={e.image_url}
                    alt={e.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="flex-1 p-6 flex flex-col">
                  <h3 className="font-display font-bold text-lg text-white mb-3">
                    {e.title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed mb-4 flex-1">
                    {e.description}
                  </p>
                  <div className="space-y-1.5 text-xs text-white/50 mb-5">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={14} className="text-[#db0000]" />
                      {new Date(e.event_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    {e.event_time && (
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-[#db0000]" />
                        {e.event_time}
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-[#db0000]" />
                      {e.location}
                    </div>
                  </div>
                  <PrimaryButton href={e.registration_link} className="self-start !px-6 !py-2.5 text-xs">
                    Register / RSVP
                  </PrimaryButton>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
