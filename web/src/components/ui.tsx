import Image from "next/image";
import Link from "next/link";

/* صورة ثنائية اللون بهوية الأكاديمية */
export function Duo({
  src,
  alt,
  className = "",
  soft = false,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  position = "center",
}: {
  src: string;
  alt: string;
  className?: string;
  soft?: boolean;
  priority?: boolean;
  sizes?: string;
  position?: string;
}) {
  return (
    <div className={`${soft ? "duo-soft" : "duo"} ${className}`}>
      <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" style={{ objectPosition: position }} />
    </div>
  );
}

/* خطوط منتصف الملعب: دائرة المنتصف وخط المنتصف */
export function CenterCircle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 600" aria-hidden="true" className={className}>
      <line x1="300" y1="0" x2="300" y2="600" className="pitch-line" strokeWidth="1.5" />
      <circle cx="300" cy="300" r="170" className="pitch-line" strokeWidth="1.5" />
      <circle cx="300" cy="300" r="5" fill="currentColor" />
    </svg>
  );
}

type Crumb = { href?: string; label: string };

export function PageHero({
  crumbs,
  title,
  lead,
  image,
  imageAlt = "",
  imagePosition,
  children,
}: {
  crumbs: Crumb[];
  title: string;
  lead?: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <CenterCircle className="pointer-events-none absolute -left-40 top-1/2 size-[560px] -translate-y-1/2 text-teal/20 md:-left-24" />
      <div className="wrap relative grid gap-10 pb-14 pt-32 md:pb-20 md:pt-40 lg:grid-cols-12 lg:items-end">
        <div className={image ? "lg:col-span-7" : "lg:col-span-9"}>
          <nav aria-label="مسار التصفح" className="mb-6 text-sm text-white/60">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-teal">الرئيسية</Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-2">
                  <span aria-hidden="true" className="text-white/30">/</span>
                  {c.href ? (
                    <Link href={c.href} className="hover:text-teal">{c.label}</Link>
                  ) : (
                    <span aria-current="page" className="text-white/90">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <h1 className="t-h1">{title}</h1>
          {lead && <p className="t-lead mt-5 max-w-[46ch] text-white/75">{lead}</p>}
          {children && <div className="mt-8">{children}</div>}
        </div>
        {image && (
          <div className="lg:col-span-5">
            <Duo src={image} alt={imageAlt} priority className="aspect-[4/3] w-full rounded-[3px]" position={imagePosition} sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
        )}
      </div>
    </section>
  );
}

export function SectionHead({
  title,
  lead,
  action,
  light = false,
  className = "",
}: {
  title: string;
  lead?: string;
  action?: { href: string; label: string };
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${className}`}>
      <div className="max-w-2xl">
        <h2 className="t-h2">{title}</h2>
        {lead && <p className={`t-lead mt-4 ${light ? "text-white/70" : "text-petrol/70"}`}>{lead}</p>}
      </div>
      {action && (
        <Link href={action.href} className={`link-u shrink-0 ${light ? "text-white" : "text-petrol"}`}>
          {action.label}
        </Link>
      )}
    </div>
  );
}

/* شارة صغيرة */
export function Tag({ children, tone = "teal" }: { children: React.ReactNode; tone?: "teal" | "light" | "gold" | "dark" }) {
  const tones = {
    teal: "bg-teal/15 text-teal-dark",
    light: "bg-white/10 text-white/85",
    gold: "bg-gold text-ink",
    dark: "bg-petrol text-white",
  };
  return (
    <span className={`inline-flex items-center rounded-[3px] px-2.5 py-1 text-[0.8rem] font-semibold leading-none ${tones[tone]}`}>
      {children}
    </span>
  );
}
