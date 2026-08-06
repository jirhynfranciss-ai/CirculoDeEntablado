import { Drama, Mail, MapPin } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "./BrandIcons";
import { fallbackSiteSettings } from "../data/fallbackContent";

const quickLinks = [
  { id: "about", label: "About Us" },
  { id: "productions", label: "Productions" },
  { id: "events", label: "Events & Workshops" },
  { id: "gallery", label: "Gallery" },
  { id: "join", label: "Join Us" },
  { id: "contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-[#970000]/40 bg-black pt-16 pb-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#db0000] to-transparent" />
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#db0000] text-[#db0000]">
              <Drama size={20} />
            </span>
            <span className="font-display font-bold text-white text-lg">
              Círculo de Entablado
            </span>
          </div>
          <p className="text-sm leading-relaxed text-white/50">
            The official theatre organization of the University of Science and
            Technology of Southern Philippines – Cagayan de Oro. Where every
            story finds its stage.
          </p>
        </div>

        <div>
          <h4 className="font-display text-white font-bold mb-4 tracking-wide">
            Quick Links
          </h4>
          <ul className="space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className="text-sm text-white/50 hover:text-[#db0000] transition-colors duration-300"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-white font-bold mb-4 tracking-wide">
            Contact
          </h4>
          <ul className="space-y-3 text-sm text-white/50">
            <li className="flex items-start gap-2">
              <Mail size={16} className="mt-0.5 text-[#db0000] shrink-0" />
              <span>{fallbackSiteSettings.contactEmail}</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 text-[#db0000] shrink-0" />
              <span>{fallbackSiteSettings.contactAddress}</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-white font-bold mb-4 tracking-wide">
            Follow the Show
          </h4>
          <div className="flex gap-3">
            <a
              href={fallbackSiteSettings.facebookUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 hover:bg-[#db0000] hover:border-[#db0000] hover:text-white transition-all duration-300"
            >
              <FacebookIcon size={18} />
            </a>
            <a
              href={fallbackSiteSettings.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 hover:bg-[#db0000] hover:border-[#db0000] hover:text-white transition-all duration-300"
            >
              <InstagramIcon size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-xs text-white/35 text-center md:text-left">
          © {new Date().getFullYear()} Círculo de Entablado — USTP Cagayan de Oro. All rights reserved.
        </p>
        <p className="text-[11px] text-white/20 tracking-wide">
          Curtain up. Lights on. Story begins.
        </p>
      </div>
    </footer>
  );
}
