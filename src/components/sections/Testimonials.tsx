import { useEffect, useState } from "react";
import { Reveal, SectionHeading } from "../UI";
import { useCollection } from "../../hooks/useCollection";
import { fallbackTestimonials } from "../../data/fallbackContent";
import type { Testimonial } from "../../data/types";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonials() {
  const { data: testimonials } = useCollection<Testimonial>(
    "testimonials",
    fallbackTestimonials
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      6000
    );
    return () => clearInterval(t);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;
  const current = testimonials[index];

  return (
    <section id="testimonials" className="relative py-28 md:py-36 bg-black">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Act X — Voices from the Stage"
            title="Testimonials & Member Spotlights"
            subtitle="Stories from members, alumni, mentors, and audiences whose lives CDE has touched."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="relative border border-[#d4af37]/30 rounded-sm bg-white/[0.03] px-8 py-14 md:px-16 md:py-16 text-center">
            <Quote className="mx-auto mb-6 text-[#d4af37]" size={40} />
            <p
              key={current.id}
              className="reveal font-display text-xl md:text-2xl text-white leading-relaxed italic mb-8"
            >
              “{current.testimonial_text}”
            </p>
            <img
              src={current.photo_url}
              alt={current.member_name}
              className="mx-auto h-16 w-16 rounded-full object-cover border-2 border-[#db0000] mb-3"
            />
            <p className="font-display font-bold text-white">
              {current.member_name}
            </p>
            <p className="text-xs uppercase tracking-widest text-[#db0000] font-semibold mt-1">
              {current.member_role}
            </p>

            <button
              onClick={() =>
                setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
              }
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-[#db0000] transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-[#db0000] transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </Reveal>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-8 bg-[#db0000]" : "w-2 bg-white/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
