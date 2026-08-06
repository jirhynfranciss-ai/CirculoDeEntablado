import { Reveal, SectionHeading, PrimaryButton, GhostButton } from "../UI";
import { CheckCircle2, FileText, Mic2, Users2 } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "1. Submit Application",
    text: "Fill out the CDE membership form with your basic info and area of interest (acting, tech, writing, or production).",
  },
  {
    icon: Mic2,
    title: "2. Attend Auditions",
    text: "Perform a cold read, monologue, or technical demo during our open call — no prior experience required.",
  },
  {
    icon: Users2,
    title: "3. Join Workshops",
    text: "Selected members undergo foundational workshops in voice, movement, and theatre craft.",
  },
  {
    icon: CheckCircle2,
    title: "4. Take the Stage",
    text: "Officially join the guild's roster and begin rehearsing for your first CDE production.",
  },
];

const benefits = [
  "Hands-on mentorship from senior members and alumni",
  "Priority casting consideration for major productions",
  "Certificates and recognition for festival participation",
  "A lifelong creative family and professional network",
];

export default function JoinUs() {
  return (
    <section id="join" className="relative py-28 md:py-36 bg-black overflow-hidden">
      <div className="absolute inset-0 velvet-bg" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Act XI — Your Cue"
            title="Join Us / Auditions"
            subtitle="No experience necessary — only curiosity, discipline, and a love for storytelling. Here's how to become part of CDE."
          />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 100}>
              <div className="theatre-card h-full border border-white/10 hover:border-[#db0000]/50 bg-white/[0.02] rounded-sm p-7 text-center">
                <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#db0000]/60 text-[#db0000]">
                  <s.icon size={22} />
                </span>
                <h3 className="font-display font-bold text-white mb-2">
                  {s.title}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center border border-[#d4af37]/30 rounded-sm p-8 md:p-12 bg-gradient-to-br from-[#970000]/25 to-transparent">
            <div>
              <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-5">
                Why Join Círculo de Entablado?
              </h3>
              <ul className="space-y-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-white/75 text-sm md:text-base">
                    <CheckCircle2 size={18} className="text-[#d4af37] mt-0.5 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center lg:text-left">
              <p className="text-white/60 mb-6 leading-relaxed">
                Auditions for Batch 2026 are officially open. Download the
                application form, fill it out, and bring it (or submit
                digitally) on audition day. Walk-ins are welcome, but
                pre-registration is strongly encouraged.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <PrimaryButton href="#contact">Apply Now</PrimaryButton>
                <GhostButton href="#events">See Audition Schedule</GhostButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
