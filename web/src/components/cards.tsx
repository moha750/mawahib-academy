import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Play } from "lucide-react";
import type { Coach, Fixture, NewsItem } from "@/content/academy";
import { site } from "@/content/site";
import { WhatsAppIcon } from "./icons";
import { Tag } from "./ui";

/* بطاقة انتقال بأسلوب إعلانات الانتقالات الرسمية */
export function TransferCard({ name, club, clubShort }: { name: string; club: string; clubShort: string }) {
  return (
    <article className="relative overflow-hidden rounded-[4px] border border-white/10 bg-deep p-6 text-white md:p-7">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-teal" />
      <Tag tone="light">انتقال رسمي</Tag>
      <div className="mt-8 flex items-center justify-between gap-3" aria-hidden="true">
        <Image src="/brand/logo-192.webp" alt="" width={64} height={64} className="size-16 rounded-full" />
        <span className="relative h-px flex-1 bg-gradient-to-l from-teal/0 via-teal to-teal">
          <ArrowLeft className="absolute -left-1 top-1/2 size-5 -translate-y-1/2 text-teal" />
        </span>
        <span className="grid size-16 place-items-center rounded-full border-2 border-white/25 bg-white/5 font-display text-sm font-bold">
          {clubShort}
        </span>
      </div>
      <h3 className="mt-8 font-display text-2xl font-bold leading-snug">{name}</h3>
      <dl className="mt-4 grid grid-cols-2 gap-4 border-t border-white/10 pt-4 text-sm">
        <div>
          <dt className="text-white/45">من</dt>
          <dd className="mt-1 font-semibold">أكاديمية مواهب الأحساء</dd>
        </div>
        <div>
          <dt className="text-white/45">إلى</dt>
          <dd className="mt-1 font-semibold text-teal">{club}</dd>
        </div>
      </dl>
    </article>
  );
}

/* بطاقة اللاعب لنجم الأسبوع */
export function PlayerCard({
  name,
  category,
  position,
  rating,
  image,
  stats,
  week,
  size = "lg",
}: {
  name: string;
  category: string;
  position: string;
  rating: number;
  image?: string;
  stats?: { label: string; value: number }[];
  week: string;
  size?: "lg" | "sm";
}) {
  const lg = size === "lg";
  return (
    <article
      className={`relative overflow-hidden rounded-[10px] bg-gradient-to-b from-petrol to-ink text-white shadow-[0_30px_60px_-30px_rgb(6_40_48/0.7)] ${
        lg ? "w-full max-w-[340px]" : "w-full"
      }`}
    >
      <div className={`relative ${lg ? "h-[250px]" : "h-[150px]"}`}>
        {image ? (
          <div className="duo absolute inset-0">
            <Image src={image} alt="" fill sizes="340px" className="object-cover" style={{ objectPosition: "50% 30%" }} />
          </div>
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-deep">
            <Image src="/brand/logo-192.webp" alt="" width={56} height={56} className="size-14 rounded-full opacity-30 grayscale" />
          </div>
        )}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
        <div className="absolute right-5 top-4 text-center">
          <p className={`num font-bold leading-none ${lg ? "text-5xl" : "text-3xl"}`}>{rating}</p>
          <p className="mt-1 text-xs font-semibold text-teal">{position}</p>
        </div>
        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center gap-1.5 rounded-[3px] bg-gold px-2 py-1 text-[0.72rem] font-bold text-ink">
            {week}
          </span>
        </div>
      </div>
      <div className={lg ? "px-6 pb-6" : "px-4 pb-4"}>
        <h3 className={`font-display font-bold ${lg ? "text-3xl" : "text-xl"}`}>{name}</h3>
        <p className="text-sm text-white/60">فئة {category}</p>
        {stats && (
          <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5 border-t border-white/10 pt-4">
            {stats.map((s) => (
              <div key={s.label} className="flex items-baseline justify-between gap-2 text-sm">
                <dt className="text-white/65">{s.label}</dt>
                <dd className="num font-bold">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </article>
  );
}

/* بطاقة عضو الجهاز الفني (الصورة تُضاف لاحقًا) */
export function CoachCard({ coach, compact = false }: { coach: Coach; compact?: boolean }) {
  return (
    <article>
      <div className={`relative overflow-hidden rounded-[3px] bg-petrol ${compact ? "aspect-square" : "aspect-[4/5]"}`}>
        <svg viewBox="0 0 200 250" aria-hidden="true" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full text-teal/25">
          <circle cx="100" cy="250" r="70" className="pitch-line" strokeWidth="1.5" />
          <rect x="45" y="-1" width="110" height="52" className="pitch-line" strokeWidth="1.5" />
          <rect x="75" y="-1" width="50" height="20" className="pitch-line" strokeWidth="1.5" />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <Image src="/brand/logo-192.webp" alt="" width={84} height={84} className="size-[84px] rounded-full opacity-90" />
        </div>
        <span className="absolute inset-x-4 bottom-4 text-center text-xs text-white/45">تُضاف صورة المدرب</span>
      </div>
      <div className="mt-4">
        <h3 className="font-display text-lg font-bold leading-snug">{coach.name ?? coach.role}</h3>
        {coach.name && <p className="text-[0.95rem] text-petrol/70">{coach.role}</p>}
        <p className="mt-2"><Tag>{coach.credential}</Tag></p>
        {coach.bio && <p className="mt-3 text-[0.95rem] leading-7 text-petrol/70">{coach.bio}</p>}
      </div>
    </article>
  );
}

/* بطاقة خبر */
export function NewsCard({ item, large = false, compact = false }: { item: NewsItem; large?: boolean; compact?: boolean }) {
  if (compact) {
    return (
      <article className="group">
        <Link href={`/media/${item.slug}`} className="grid grid-cols-[1fr_120px] items-start gap-5 sm:grid-cols-[1fr_160px]">
          <div>
            <div className="flex items-center gap-3 text-sm">
              <Tag>{item.category}</Tag>
              {item.date && <span className="text-petrol/55">{item.date}</span>}
            </div>
            <h3 className="mt-2.5 font-display text-lg font-bold leading-snug group-hover:text-teal-dark">{item.title}</h3>
          </div>
          <div className="duo-soft relative aspect-[4/3] rounded-[3px]">
            <Image src={item.image} alt="" fill sizes="160px" className="object-cover" />
          </div>
        </Link>
      </article>
    );
  }
  return (
    <article className="group">
      <Link href={`/media/${item.slug}`} className="block">
        <div className={`duo-soft relative rounded-[3px] ${large ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
          <Image
            src={item.image}
            alt=""
            fill
            sizes={large ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 30vw, 100vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div className="mt-4 flex items-center gap-3 text-sm">
          <Tag>{item.category}</Tag>
          {item.date && <span className="text-petrol/55">{item.date}</span>}
        </div>
        <h3 className={`mt-3 font-display font-bold leading-snug group-hover:text-teal-dark ${large ? "text-2xl md:text-[1.75rem]" : "text-xl"}`}>
          {item.title}
        </h3>
        <p className="mt-2 leading-7 text-petrol/70">{item.excerpt}</p>
      </Link>
    </article>
  );
}

/* صف مباراة */
export function FixtureRow({ f }: { f: Fixture }) {
  const played = f.status === "played" && f.score;
  return (
    <li className="grid items-center gap-4 border-b border-petrol/10 py-5 md:grid-cols-12">
      <div className="md:col-span-3">
        <p className="font-display font-semibold">{f.date}</p>
        <p className="text-sm text-petrol/60">{f.competition}</p>
      </div>
      <div className="flex items-center justify-between gap-3 md:col-span-6">
        <p className={`flex-1 font-display font-bold ${f.home === "مواهب الأحساء" ? "text-petrol" : "text-petrol/70"}`}>{f.home}</p>
        <div className={`num grid min-w-[96px] place-items-center rounded-[3px] px-3 py-2 text-lg font-bold ${played ? "bg-petrol text-white" : "bg-mist text-petrol/60"}`}>
          {played ? (
            <span dir="ltr">{f.score![1]} – {f.score![0]}</span>
          ) : (
            <span className="text-sm">لم تُلعب</span>
          )}
        </div>
        <p className={`flex-1 text-left font-display font-bold ${f.away === "مواهب الأحساء" ? "text-petrol" : "text-petrol/70"}`}>{f.away}</p>
      </div>
      <div className="flex items-center gap-3 text-sm text-petrol/60 md:col-span-3 md:justify-end">
        <Tag tone={played ? "dark" : "teal"}>{f.category}</Tag>
        <span>{f.venue}</span>
      </div>
    </li>
  );
}

/* بطاقة فيديو */
export function VideoCard({ title, length, cover }: { title: string; length: string; cover: string }) {
  return (
    <a href={site.social.tiktok} target="_blank" rel="noreferrer" className="group block">
      <div className="relative aspect-[9/12] overflow-hidden rounded-[3px] bg-ink">
        <Image src={cover} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-[1.03]" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
        <span className="absolute right-4 top-4 grid size-12 place-items-center rounded-full bg-teal text-ink">
          <Play className="size-5 -scale-x-100 fill-current" aria-hidden="true" />
        </span>
        <span className="num absolute left-4 top-5 rounded-[3px] bg-ink/70 px-2 py-0.5 text-xs text-white">{length}</span>
        <p className="absolute inset-x-4 bottom-4 font-display text-lg font-bold leading-snug text-white">{title}</p>
      </div>
    </a>
  );
}

/* شريط الدعوة للتسجيل */
export function CtaBand() {
  return (
    <section className="bg-teal text-ink">
      <div className="wrap grid gap-8 py-16 md:py-20 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <h2 className="t-h2">الموهبة تحتاج من يراها</h2>
          <p className="t-lead mt-4 max-w-[52ch] text-ink/75">
            احجز تجربة أداء لابنك، وسنتواصل معك لتحديد الموعد والفئة المناسبة.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
          <Link href="/register" className="btn btn-dark">احجز تجربة أداء</Link>
          <a href={site.whatsapp} target="_blank" rel="noreferrer" className="btn border-[1.5px] border-ink/30 text-ink hover:border-ink">
            <WhatsAppIcon className="size-5" />
            تواصل عبر واتساب
          </a>
        </div>
      </div>
    </section>
  );
}
