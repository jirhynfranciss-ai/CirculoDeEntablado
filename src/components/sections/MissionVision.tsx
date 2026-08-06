import { Reveal, ActLabel } from "../UI";
import { fallbackSiteSettings } from "../../data/fallbackContent";
import { Quote, Target, Eye } from "lucide-react";

export default function MissionVision() {
  return (
    <section
      id="mission"
      className="relative py-28 md:py-36 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #970000 0%, #5c0000 55%, #000000 100%)",
      }}
    >
      <div className="absolute inset-0 opacity-20 mix-blend-overlay">
        <img src="/images/velvet-texture.jpg" alt="" className="h-full w-full object-cover" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-10 text-center">
        <Reveal>
          <ActLabel>Act III — What Drives Us</ActLabel>
          <h2 className="font-display font-bold text-white text-4xl md:text-5xl mb-16">
            Mission &amp; Vision
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <Reveal delay={100}>
            <div className="relative h-full border border-white/20 bg-black/25 backdrop-blur-sm rounded-sm p-10">
              <Quote className="absolute -top-5 left-8 text-[#d4af37] bg-black rounded-full p-2" size={40} />
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af37] text-[#d4af37] mb-6">
                <Target size={22} />
              </span>
              <h3 className="font-display font-bold text-2xl text-white mb-4">
                Our Mission
              </h3>
              <p className="text-white/90 leading-relaxed">
                {fallbackSiteSettings.mission}
              </p>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <div className="relative h-full border border-white/20 bg-black/25 backdrop-blur-sm rounded-sm p-10">
              <Quote className="absolute -top-5 left-8 text-[#d4af37] bg-black rounded-full p-2" size={40} />
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af37] text-[#d4af37] mb-6">
                <Eye size={22} />
              </span>
              <h3 className="font-display font-bold text-2xl text-white mb-4">
                Our Vision
              </h3>
              <p className="text-white/90 leading-relaxed">
                {fallbackSiteSettings.vision}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
