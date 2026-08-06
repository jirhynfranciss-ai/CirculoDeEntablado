import { useEffect, useState } from "react";
import { Menu, X, Drama } from "lucide-react";
import { cn } from "../utils/cn";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Us" },
  { id: "story", label: "Our Story" },
  { id: "mission", label: "Mission & Vision" },
  { id: "achievements", label: "Achievements" },
  { id: "officers", label: "Officers" },
  { id: "productions", label: "Productions" },
  { id: "events", label: "Events" },
  { id: "gallery", label: "Gallery" },
  { id: "media", label: "Media" },
  { id: "testimonials", label: "Testimonials" },
  { id: "join", label: "Join Us" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      Boolean
    ) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-black/90 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
          : "bg-gradient-to-b from-black/70 to-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#home" className="flex items-center gap-3 shrink-0 group">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#db0000] text-[#db0000] group-hover:text-white group-hover:bg-[#db0000] transition-all duration-300">
              <Drama size={22} />
            </span>
            <span className="leading-tight">
              <span className="block font-display font-bold text-lg tracking-wide text-white">
                Círculo de Entablado
              </span>
              <span className="block text-[10px] uppercase tracking-[0.3em] text-[#db0000]">
                USTP · CDO
              </span>
            </span>
          </a>

          <nav className="hidden xl:flex items-center gap-7 mx-auto">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={cn(
                  "nav-link text-[13px] font-semibold uppercase tracking-wider text-white/80 hover:text-white transition-colors duration-300",
                  active === link.id && "active text-white"
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#join"
            className="hidden xl:inline-flex items-center rounded-sm border border-[#db0000] bg-[#db0000]/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#db0000] transition-all duration-300 shrink-0"
          >
            Audition Now
          </a>

          <button
            className="xl:hidden text-white p-2"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile slide-in menu */}
      <div
        className={cn(
          "fixed inset-0 z-[60] xl:hidden transition-opacity duration-500",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            "absolute right-0 top-0 h-full w-[82%] max-w-sm bg-[#0a0a0a] border-l border-[#970000]/50 velvet-bg shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col",
            open ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between px-6 h-20 border-b border-white/10">
            <span className="font-display font-bold text-white">CDE Menu</span>
            <button onClick={() => setOpen(false)} className="text-white p-2" aria-label="Close menu">
              <X size={26} />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-1">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: `${i * 30}ms` }}
                className="py-3 border-b border-white/5 text-white/85 hover:text-[#db0000] hover:pl-2 transition-all duration-300 font-medium uppercase tracking-wide text-sm"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="p-6">
            <a
              href="#join"
              onClick={() => setOpen(false)}
              className="block text-center rounded-sm bg-[#db0000] py-3 font-bold uppercase tracking-widest text-sm text-white"
            >
              Audition Now
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
