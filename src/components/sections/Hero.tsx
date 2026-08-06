import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { PrimaryButton, GhostButton } from "../UI";

export default function Hero() {
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const [textIn, setTextIn] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setCurtainsOpen(true), 300);
    const t2 = setTimeout(() => setTextIn(true), 1300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen min-h-[640px] w-full overflow-hidden bg-black flex items-center justify-center"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-stage.jpg"
          alt="CDE theatre stage with spotlight"
          className="h-full w-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      </div>

      {/* Curtain-pull entrance panels */}
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 w-1/2 curtain-gradient z-30 ${
          curtainsOpen ? "curtain-left" : ""
        }`}
        style={{ boxShadow: "inset -20px 0 40px rgba(0,0,0,0.5)" }}
      />
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 w-1/2 curtain-gradient z-30 ${
          curtainsOpen ? "curtain-right" : ""
        }`}
        style={{ boxShadow: "inset 20px 0 40px rgba(0,0,0,0.5)" }}
      />

      {/* Spotlight glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[70vh] w-[60vw] bg-[radial-gradient(ellipse_at_top,rgba(219,0,0,0.25),transparent_65%)] z-10" />

      <div
        className={`relative z-20 max-w-4xl px-6 text-center transition-all duration-1000 ${
          textIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="act-label text-xs md:text-sm font-semibold uppercase text-[#db0000] mb-5">
          USTP Cagayan de Oro Presents
        </p>
        <h1 className="font-display font-black text-white leading-[1.05] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-glow">
          Círculo de <span className="gold-shimmer">Entablado</span>
        </h1>
        <p className="mt-7 text-white/80 text-base md:text-xl max-w-2xl mx-auto font-light tracking-wide">
          Where Every Story Finds Its Stage — the official theatre organization
          of USTP Cagayan de Oro, igniting Filipino artistry one performance
          at a time.
        </p>
        <div className="mt-11 flex flex-col sm:flex-row items-center justify-center gap-4">
          <PrimaryButton href="#join">Join the Guild</PrimaryButton>
          <GhostButton href="#productions">Explore Productions</GhostButton>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/60 hover:text-[#db0000] transition-colors duration-300 animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={30} />
      </a>
    </section>
  );
}
