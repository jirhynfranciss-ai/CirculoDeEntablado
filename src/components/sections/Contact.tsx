import { useState, type FormEvent } from "react";
import { Reveal, SectionHeading, PrimaryButton } from "../UI";
import { fallbackSiteSettings } from "../../data/fallbackContent";
import { FacebookIcon, InstagramIcon } from "../BrandIcons";
import { Mail, MapPin, Send, CheckCircle2 } from "lucide-react";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialState: FormState = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Please enter a valid email.";
    if (!form.subject.trim()) next.subject = "Please enter a subject.";
    if (!form.message.trim() || form.message.trim().length < 10)
      next.message = "Message should be at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // In production this posts to a Supabase `messages` table or serverless
    // function that emails the CDE officers. For this demo build we simply
    // confirm receipt to the user.
    setSubmitted(true);
    setForm(initialState);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="relative py-28 md:py-36 bg-black">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Final Act — Reach Us"
            title="Contact Círculo de Entablado"
            subtitle="Questions about auditions, bookings, or collaborations? Send us a message — the curtain is always open."
          />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <Reveal delay={100} className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="border border-white/10 rounded-sm p-7 md:p-9 bg-white/[0.02] space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                    Name
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-black/40 border border-white/15 focus:border-[#db0000] outline-none rounded-sm px-4 py-3 text-sm text-white transition-colors"
                    placeholder="Juan Dela Cruz"
                  />
                  {errors.name && (
                    <p className="text-[#db0000] text-xs mt-1.5">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                    Email
                  </label>
                  <input
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-black/40 border border-white/15 focus:border-[#db0000] outline-none rounded-sm px-4 py-3 text-sm text-white transition-colors"
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="text-[#db0000] text-xs mt-1.5">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                  Subject
                </label>
                <input
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full bg-black/40 border border-white/15 focus:border-[#db0000] outline-none rounded-sm px-4 py-3 text-sm text-white transition-colors"
                  placeholder="Audition inquiry, collaboration, booking..."
                />
                {errors.subject && (
                  <p className="text-[#db0000] text-xs mt-1.5">{errors.subject}</p>
                )}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  className="w-full bg-black/40 border border-white/15 focus:border-[#db0000] outline-none rounded-sm px-4 py-3 text-sm text-white transition-colors resize-none"
                  placeholder="Tell us more..."
                />
                {errors.message && (
                  <p className="text-[#db0000] text-xs mt-1.5">{errors.message}</p>
                )}
              </div>

              <PrimaryButton type="submit" className="w-full sm:w-auto">
                <Send size={16} /> Send Message
              </PrimaryButton>

              {submitted && (
                <p className="flex items-center gap-2 text-sm text-[#d4af37] pt-2">
                  <CheckCircle2 size={18} /> Thank you! Your message has been sent to CDE.
                </p>
              )}
            </form>
          </Reveal>

          <Reveal delay={200} className="lg:col-span-2 space-y-6">
            <div className="border border-white/10 rounded-sm p-7 bg-white/[0.02] space-y-5">
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-[#db0000] mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50">Email</p>
                  <p className="text-white text-sm">{fallbackSiteSettings.contactEmail}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#db0000] mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50">
                    Location
                  </p>
                  <p className="text-white text-sm">{fallbackSiteSettings.contactAddress}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={fallbackSiteSettings.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 hover:bg-[#db0000] hover:border-[#db0000] hover:text-white transition-all duration-300"
                  aria-label="CDE on Facebook"
                >
                  <FacebookIcon size={18} />
                </a>
                <a
                  href={fallbackSiteSettings.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 hover:bg-[#db0000] hover:border-[#db0000] hover:text-white transition-all duration-300"
                  aria-label="CDE on Instagram"
                >
                  <InstagramIcon size={18} />
                </a>
              </div>
            </div>

            <div className="border border-white/10 rounded-sm overflow-hidden h-56">
              <iframe
                title="USTP Cagayan de Oro Map"
                src="https://www.google.com/maps?q=USTP+Cagayan+de+Oro&output=embed"
                className="h-full w-full grayscale-[40%] contrast-125"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
