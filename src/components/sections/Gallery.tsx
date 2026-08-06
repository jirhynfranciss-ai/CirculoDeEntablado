import { useMemo, useState } from "react";
import { Reveal, SectionHeading, Chip } from "../UI";
import { useCollection } from "../../hooks/useCollection";
import { fallbackGallery } from "../../data/fallbackContent";
import type { GalleryItem } from "../../data/types";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "productions", label: "Productions" },
  { id: "events", label: "Events" },
  { id: "behind-the-scenes", label: "Behind the Scenes" },
];

export default function Gallery() {
  const { data: gallery } = useCollection<GalleryItem>("gallery", fallbackGallery);
  const [filter, setFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (filter === "all" ? gallery : gallery.filter((g) => g.category === filter)),
    [gallery, filter]
  );

  const openAt = (i: number) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);
  const next = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));
  const prev = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + filtered.length) % filtered.length
    );

  return (
    <section id="gallery" className="relative py-28 md:py-36 bg-black">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Act VIII — Captured Moments"
            title="Gallery"
            subtitle="Production photos, backstage candids, rehearsal shots, and award-night celebrations."
          />
        </Reveal>

        <Reveal delay={80}>
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {CATEGORIES.map((c) => (
              <Chip key={c.id} active={filter === c.id} onClick={() => setFilter(c.id)}>
                {c.label}
              </Chip>
            ))}
          </div>
        </Reveal>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {filtered.map((g, i) => (
            <Reveal key={g.id} delay={(i % 6) * 70} className="mb-5 break-inside-avoid">
              <button
                onClick={() => openAt(i)}
                className="group relative w-full overflow-hidden rounded-sm border border-white/10 hover:border-[#db0000]/60 block"
              >
                <img
                  src={g.image_url}
                  alt={g.caption}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                  <Expand
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    size={28}
                  />
                </div>
                <p className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-3 text-left text-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {g.caption}
                </p>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10"
          onClick={close}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-[#db0000] transition-colors"
            onClick={close}
            aria-label="Close"
          >
            <X size={32} />
          </button>
          <button
            className="absolute left-4 md:left-10 text-white/70 hover:text-[#db0000] transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={40} />
          </button>
          <button
            className="absolute right-4 md:right-10 text-white/70 hover:text-[#db0000] transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next image"
          >
            <ChevronRight size={40} />
          </button>
          <div
            className="max-w-4xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filtered[lightboxIndex].image_url}
              alt={filtered[lightboxIndex].caption}
              className="max-h-[75vh] object-contain rounded-sm border border-[#db0000]/40 spotlight-glow"
            />
            <p className="mt-5 text-white/70 text-sm text-center">
              {filtered[lightboxIndex].caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
