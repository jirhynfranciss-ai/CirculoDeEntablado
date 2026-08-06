import { Reveal, SectionHeading } from "../UI";
import { fallbackSiteSettings } from "../../data/fallbackContent";
import { Sparkles, Users, Drama, Award } from "lucide-react";

const highlights = [
  {
    icon: Drama,
    title: "Artistic Growth",
    text: "Structured mentorship in acting, directing, playwriting, and technical craft.",
  },
  {
    icon: Users,
    title: "Leadership & Collaboration",
    text: "Every production is run by students — casting, crewing, and producing as one ensemble.",
  },
  {
    icon: Sparkles,
    title: "Cultural Appreciation",
    text: "Original Filipino works that celebrate Kagay-anon and national identity on stage.",
  },
  {
    icon: Award,
    title: "Competitive Excellence",
    text: "A decorated history of regional and inter-collegiate theatre honors.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-36 bg-black overflow-hidden">
      <div className="absolute inset-0 velvet-bg" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Act I — Who We Are"
            title="About Círculo de Entablado"
            subtitle="A student-led theatre guild devoted to promoting theatre arts, creativity, and cultural appreciation at USTP Cagayan de Oro."
          />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <Reveal delay={100} className="relative">
            <div className="relative rounded-sm overflow-hidden border border-white/10">
              <img
                src="/images/curtain-frame.jpg"
                alt="CDE stage curtains"
                className="w-full h-[420px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-[#970000]/40" />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden md:block bg-[#970000] border border-[#d4af37]/50 px-7 py-5 rounded-sm shadow-2xl">
              <p className="font-display text-3xl font-bold text-white">12+</p>
              <p className="text-[11px] uppercase tracking-widest text-white/80">
                Years of Theatre Excellence
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-white/75 leading-relaxed text-base md:text-lg">
              {fallbackSiteSettings.about}
            </p>
            <p className="mt-5 text-white/60 leading-relaxed text-sm md:text-base">
              From table reads to closing night, CDE members carry every
              production together — building sets, rehearsing lines, designing
              lights, and rewriting scenes until the story is ready to meet an
              audience. Membership is open to all USTP students, regardless of
              course or experience: all you need is the courage to walk on
              stage.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {highlights.map((h, i) => (
            <Reveal key={h.title} delay={i * 100}>
              <div className="theatre-card h-full border border-white/10 hover:border-[#db0000]/60 bg-white/[0.02] rounded-sm p-7 text-center">
                <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#db0000]/50 text-[#db0000]">
                  <h.icon size={24} />
                </span>
                <h3 className="font-display font-bold text-white text-lg mb-2">
                  {h.title}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed">{h.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
