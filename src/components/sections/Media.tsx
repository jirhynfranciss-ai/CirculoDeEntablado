import { useState } from "react";
import { Reveal, SectionHeading } from "../UI";
import { useCollection } from "../../hooks/useCollection";
import { fallbackMedia } from "../../data/fallbackContent";
import type { MediaItem } from "../../data/types";
import { Play, Newspaper, X } from "lucide-react";

export default function Media() {
  const { data: media } = useCollection<MediaItem>("media", fallbackMedia);
  const [playing, setPlaying] = useState<MediaItem | null>(null);

  const videos = media.filter((m) => m.media_type === "video");
  const articles = media.filter((m) => m.media_type === "article");

  return (
    <section id="media" className="relative py-28 md:py-36 bg-black velvet-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Act IX — In the Spotlight"
            title="Media & Press"
            subtitle="Performance videos, promotional materials, and press coverage documenting CDE's artistic milestones."
          />
        </Reveal>

        <Reveal delay={80}>
          <h3 className="font-display font-bold text-white text-xl mb-6">Videos</h3>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mb-20">
          {videos.map((v, i) => (
            <Reveal key={v.id} delay={(i % 3) * 100}>
              <button
                onClick={() => setPlaying(v)}
                className="theatre-card group relative block w-full text-left border border-white/10 hover:border-[#db0000]/60 rounded-sm overflow-hidden"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={v.thumbnail_url}
                    alt={v.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#db0000]/90 text-white group-hover:scale-110 transition-transform duration-300 spotlight-glow">
                      <Play size={22} fill="white" />
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="font-display font-bold text-white text-base mb-1">
                    {v.title}
                  </h4>
                  <p className="text-white/50 text-xs leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80}>
          <h3 className="font-display font-bold text-white text-xl mb-6">
            Press Coverage
          </h3>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {articles.map((a, i) => (
            <Reveal key={a.id} delay={(i % 3) * 100}>
              <a
                href={a.url}
                target="_blank"
                rel="noreferrer"
                className="theatre-card group flex gap-4 border border-white/10 hover:border-[#db0000]/60 rounded-sm p-5 bg-white/[0.02] h-full"
              >
                <img
                  src={a.thumbnail_url}
                  alt={a.title}
                  loading="lazy"
                  className="h-20 w-20 object-cover rounded-sm shrink-0"
                />
                <div>
                  <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#db0000] font-semibold mb-1.5">
                    <Newspaper size={12} /> Press
                  </span>
                  <h4 className="font-display font-bold text-white text-sm leading-snug mb-1">
                    {a.title}
                  </h4>
                  <p className="text-white/45 text-xs leading-relaxed line-clamp-2">
                    {a.description}
                  </p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>

      {playing && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10"
          onClick={() => setPlaying(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-[#db0000]"
            onClick={() => setPlaying(null)}
            aria-label="Close video"
          >
            <X size={32} />
          </button>
          <div
            className="w-full max-w-4xl aspect-video border border-[#db0000]/40 spotlight-glow"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={playing.url}
              title={playing.title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
