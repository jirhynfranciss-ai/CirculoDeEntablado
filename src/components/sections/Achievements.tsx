import { Reveal, SectionHeading } from "../UI";
import { useCollection } from "../../hooks/useCollection";
import { fallbackAchievements } from "../../data/fallbackContent";
import type { Achievement } from "../../data/types";
import { Trophy } from "lucide-react";

export default function Achievements() {
  const { data: achievements } = useCollection<Achievement>(
    "achievements",
    fallbackAchievements
  );

  return (
    <section id="achievements" className="relative py-28 md:py-36 bg-black">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Act IV — Recognition"
            title="Achievements & Awards"
            subtitle="A decorated legacy of trophies, citations, and critical recognition earned across regional and inter-collegiate theatre festivals."
          />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {achievements.map((a, i) => (
            <Reveal key={a.id} delay={(i % 3) * 100}>
              <div className="theatre-card h-full relative border border-[#d4af37]/30 bg-gradient-to-b from-white/[0.04] to-transparent rounded-sm p-8 overflow-hidden">
                <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-[#d4af37]/10 blur-2xl" />
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#970000]/20 border border-[#d4af37] text-[#d4af37] mb-6">
                  <Trophy size={24} />
                </span>
                <p className="text-xs uppercase tracking-widest text-[#db0000] font-semibold mb-2">
                  {a.category} ·{" "}
                  {new Date(a.date_achieved).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })}
                </p>
                <h3 className="font-display font-bold text-xl text-white mb-3">
                  {a.title}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed">
                  {a.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
