import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";
import { cn } from "../utils/cn";

/** Fades and slides content in once it scrolls into view — used everywhere
 * on the public site for the cinematic "reveal" effect. */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn(className, visible && "reveal")}
      style={visible ? { animationDelay: `${delay}ms` } : { opacity: 0 }}
    >
      {children}
    </Tag>
  );
}

export function ActLabel({ children }: { children: ReactNode }) {
  return (
    <span className="act-label inline-block text-xs md:text-sm font-semibold uppercase text-[#db0000] mb-3">
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  light,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={cn("mb-14 max-w-3xl", center ? "mx-auto text-center" : "")}>
      {eyebrow && <ActLabel>{eyebrow}</ActLabel>}
      <h2
        className={cn(
          "font-display font-bold leading-tight text-4xl md:text-5xl",
          light ? "text-white" : "text-white"
        )}
      >
        {title}
      </h2>
      <div className={cn("divider-gold w-24 h-px mt-6", center && "mx-auto")} />
      {subtitle && (
        <p className="mt-6 text-graphite text-base md:text-lg leading-relaxed" style={{ color: "#a3a3a3" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function PrimaryButton({
  children,
  onClick,
  href,
  type = "button",
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
  className?: string;
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-sm px-8 py-3.5 font-body font-semibold uppercase tracking-widest text-sm text-white",
    "bg-[#db0000] hover:bg-[#970000] transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(219,0,0,0.55)]",
    "border border-[#db0000] hover:border-[#ffffff]/40",
    className
  );
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
  href,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-sm px-8 py-3.5 font-body font-semibold uppercase tracking-widest text-sm text-white",
    "border border-white/30 hover:border-[#db0000] hover:text-[#db0000] transition-all duration-300",
    className
  );
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

export function Chip({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-5 py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider border transition-all duration-300 whitespace-nowrap",
        active
          ? "bg-[#db0000] border-[#db0000] text-white spotlight-glow"
          : "border-white/20 text-white/70 hover:border-[#db0000] hover:text-white"
      )}
    >
      {children}
    </button>
  );
}
