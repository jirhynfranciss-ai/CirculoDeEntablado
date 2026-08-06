import { Reveal, SectionHeading } from "../UI";

const milestones = [
  {
    year: "2013",
    title: "Curtains Rise",
    text: "A handful of passionate USTP students founded Círculo de Entablado, staging their first one-act play in a borrowed classroom.",
  },
  {
    year: "2016",
    title: "First Grand Production",
    text: "CDE mounted its first full-length production in the university auditorium, drawing its first sold-out crowd.",
  },
  {
    year: "2019",
    title: "Regional Recognition",
    text: "The guild earned its first inter-collegiate theatre festival awards, cementing CDE among Mindanao's rising theatre companies.",
  },
  {
    year: "2021",
    title: "Theatre in the Time of Distance",
    text: "CDE adapted with digital table reads and short film-theatre hybrids, keeping the craft alive through the pandemic.",
  },
  {
    year: "2023",
    title: "A Decade of Storytelling",
    text: "Celebrating ten years, CDE swept top honors at the Mindanao Collegiate Drama Cup with Alamat: Mga Kwento ng Lupa.",
  },
  {
    year: "2024",
    title: "Best Full-Length Production",
    text: "Larawan ng Puso brought home CDE's most prestigious regional award to date.",
  },
  {
    year: "Today",
    title: "The Next Act",
    text: "With a new generation of performers and writers, CDE continues to expand its stage — onto bigger venues and bolder stories.",
  },
];

export default function Story() {
  return (
    <section id="story" className="relative py-28 md:py-36 bg-black">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Act II — Our Journey"
            title="Our Story & History"
            subtitle="From a single classroom rehearsal to award-winning regional productions — the evolution of CDE, told milestone by milestone."
          />
        </Reveal>

        <div className="relative">
          <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#970000] via-[#db0000]/60 to-transparent md:-translate-x-1/2" />

          <div className="space-y-14">
            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={i * 80}>
                <div
                  className={`relative flex flex-col md:flex-row items-start gap-6 md:gap-10 ${
                    i % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="absolute left-0 md:left-1/2 top-1 md:-translate-x-1/2 z-10">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#db0000] border-4 border-black spotlight-glow">
                      <span className="h-2 w-2 rounded-full bg-white" />
                    </span>
                  </div>

                  <div className="pl-12 md:pl-0 md:w-1/2" />
                  <div
                    className={`pl-12 md:pl-0 md:w-1/2 ${
                      i % 2 === 1 ? "md:pr-14 md:text-right" : "md:pl-14"
                    }`}
                  >
                    <div className="theatre-card inline-block w-full border border-white/10 bg-white/[0.03] rounded-sm p-6">
                      <span className="font-display text-2xl font-bold text-[#db0000]">
                        {m.year}
                      </span>
                      <h3 className="font-display font-bold text-white text-xl mt-1 mb-2">
                        {m.title}
                      </h3>
                      <p className="text-white/55 text-sm leading-relaxed">
                        {m.text}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
