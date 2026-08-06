import { Reveal, SectionHeading } from "../UI";
import { useCollection } from "../../hooks/useCollection";
import { fallbackOfficers } from "../../data/fallbackContent";
import type { Officer } from "../../data/types";
import { FacebookIcon, InstagramIcon } from "../BrandIcons";

export default function Officers() {
  const { data: officers } = useCollection<Officer>("officers", fallbackOfficers);

  return (
    <section id="officers" className="relative py-28 md:py-36 bg-black velvet-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Act V — The Ensemble Leads"
            title="Officers & Leadership Team"
            subtitle="The dedicated students steering CDE's artistic vision, productions, and operations this season."
          />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {officers.map((o, i) => (
            <Reveal key={o.id} delay={(i % 4) * 100}>
              <div className="group theatre-card text-center border border-white/10 hover:border-[#db0000]/50 rounded-sm p-7 bg-white/[0.02] h-full flex flex-col items-center">
                <div className="relative mb-5">
                  <div className="absolute inset-0 rounded-full border-2 border-[#d4af37]/40 scale-110 group-hover:scale-125 transition-transform duration-500" />
                  <img
                    src={o.photo_url}
                    alt={o.name}
                    loading="lazy"
                    className="relative h-32 w-32 rounded-full object-cover border-2 border-[#db0000] shadow-[0_0_25px_rgba(219,0,0,0.35)]"
                  />
                </div>
                <h3 className="font-display font-bold text-white text-lg">
                  {o.name}
                </h3>
                <p className="text-xs uppercase tracking-widest text-[#db0000] font-semibold mt-1 mb-4">
                  {o.position}
                </p>
                <p className="text-white/50 text-sm leading-relaxed mb-5">
                  {o.description}
                </p>
                <div className="mt-auto flex gap-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  {o.social_links?.facebook && (
                    <a
                      href={o.social_links.facebook}
                      className="text-white/60 hover:text-[#db0000]"
                      aria-label={`${o.name} on Facebook`}
                    >
                      <FacebookIcon size={18} />
                    </a>
                  )}
                  {o.social_links?.instagram && (
                    <a
                      href={o.social_links.instagram}
                      className="text-white/60 hover:text-[#db0000]"
                      aria-label={`${o.name} on Instagram`}
                    >
                      <InstagramIcon size={18} />
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
