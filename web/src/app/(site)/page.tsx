import Image from "next/image";
import Link from "next/link";
import { Apple, Calculator, HeartPulse, Languages } from "lucide-react";
import {
  alumni,
  coaches,
  educationPillars,
  gallery,
  goalkeeping,
  img,
  news,
  partnerTiers,
  programs,
  starOfWeek,
  testimonials,
} from "@/content/academy";
import { CenterCircle, Duo, SectionHead, Tag } from "@/components/ui";
import { CoachCard, CtaBand, NewsCard, PlayerCard, TransferCard } from "@/components/cards";
import PathwayPitch from "@/components/PathwayPitch";
import { sessionsLabel } from "@/lib/format";

const pillarIcons = { english: Languages, math: Calculator, nutrition: Apple, health: HeartPulse } as const;

export default function HomePage() {
  const [lead, ...rest] = news;
  return (
    <>
      {/* ============ الواجهة ============ */}
      <section className="relative isolate flex min-h-[640px] flex-col overflow-hidden bg-ink text-white md:min-h-[min(100svh,920px)]">
        <Duo src={img.hero} alt="لاعب ناشئ يركض بالكرة في ملعب تحيط به النخيل" priority sizes="100vw" position="30% 18%" className="absolute! inset-0 -z-10" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-l from-ink via-ink/80 to-ink/5" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-ink to-transparent" />
        <CenterCircle className="pointer-events-none absolute -left-24 top-1/2 -z-10 hidden size-[720px] -translate-y-1/2 text-teal/35 lg:block" />

        <div className="wrap flex flex-1 flex-col justify-center pb-10 pt-32 md:pt-36">
          <div className="max-w-[720px]">
            <p className="mb-6 flex items-center gap-3 text-[0.95rem] text-white/75">
              <span aria-hidden="true" className="h-px w-10 bg-teal" />
              أكاديمية كرة قدم في الأحساء منذ 2020
            </p>
            <h1 className="t-hero">من ملاعب الأحساء إلى الأندية المحترفة</h1>
            <p className="t-lead mt-6 max-w-[50ch] text-white/80">
              لأبنائك من 6 إلى 16 سنة. مدربون معتمدون من الاتحاد السعودي، وتعليم مساند، ومسار واضح يرافق اللاعب من أول
              تمرين حتى أبواب الأندية.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/register" className="btn btn-primary">احجز تجربة أداء</Link>
              <Link href="/programs" className="btn btn-line-light">شاهد البرامج</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/12">
          <div className="wrap flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex flex-wrap items-center gap-3">
              <Tag tone="gold">رسميًا</Tag>
              <span className="font-display font-semibold">انتقال ثلاثة من مواهبنا إلى نادي الفيحاء</span>
            </p>
            <Link href="/media/alfayha-transfers" className="link-u text-sm text-white">اقرأ الخبر</Link>
          </div>
        </div>
      </section>

      {/* ============ عن الأكاديمية ============ */}
      <section className="sec">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <h2 className="t-h2">الأحساء تمنحنا مواهبها، ونحن نمنحها ما تحتاجه لتكبر</h2>
            <p className="t-lead mt-6 text-petrol/75">
              تدريب بمنهج واضح، ومتابعة فردية لكل لاعب، ودراسة لا تتأخر بسبب الكرة. هذا ما نعمل عليه منذ تأسيس
              الأكاديمية، وهذا ما أوصل لاعبينا إلى الأندية.
            </p>
            <Link href="/about" className="link-u mt-8 inline-block">قصتنا وقيمنا</Link>
          </div>
          <div className="lg:col-span-6">
            <Duo src={img.coachCare} alt="مدرب يساعد لاعبًا صغيرًا في الملعب" soft className="aspect-[5/4] w-full rounded-[3px]" position="70% 50%" />
          </div>
        </div>
        <div className="wrap mt-14">
          <ul className="grid gap-px overflow-hidden rounded-[4px] bg-petrol/12 md:grid-cols-3">
            {[
              ["من 6 إلى 16 سنة", "أربع فئات عمرية، لكل فئة أهدافها وحِملها التدريبي."],
              ["مدربون معتمدون", "برخص تدريب من الاتحاد السعودي لكرة القدم."],
              ["تعليم بجانب التدريب", "إنجليزي ورياضيات وتثقيف غذائي وصحي ضمن الاشتراك."],
            ].map(([t, d]) => (
              <li key={t} className="bg-paper p-6 md:p-8">
                <p className="font-display text-xl font-bold">{t}</p>
                <p className="mt-2 text-petrol/70">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ مسار تطوير اللاعب ============ */}
      <section className="sec bg-ink text-white">
        <div className="wrap">
          <SectionHead
            light
            title="خمس محطات من تجربة الأداء إلى النادي"
            lead="كل لاعب يعرف أين يقف، وما المطلوب منه للانتقال إلى المحطة التالية."
            action={{ href: "/pathway", label: "تفاصيل المسار" }}
          />
          <div className="mt-12">
            <PathwayPitch />
          </div>
        </div>
      </section>

      {/* ============ البرامج ============ */}
      <section className="sec">
        <div className="wrap">
          <SectionHead
            title="برنامج لكل عمر"
            lead="نقسّم اللاعبين حسب العمر والمستوى، ولكل فئة أهداف وحِمل تدريبي يناسبها."
            action={{ href: "/programs", label: "كل البرامج" }}
          />
          <ul className="mt-12 border-b border-petrol/12">
            {programs.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/programs#${p.slug}`}
                  className="grid items-center gap-4 border-t border-petrol/12 py-6 transition-colors hover:bg-white md:grid-cols-12 md:gap-6 md:px-4"
                >
                  <div className="md:col-span-3">
                    <p className="font-display text-2xl font-bold">{p.name}</p>
                    <p className="font-semibold text-teal-dark">{p.ages}</p>
                  </div>
                  <p className="text-petrol/75 md:col-span-5">{p.summary}</p>
                  <p className="text-sm text-petrol/70 md:col-span-2">
                    <span className="block font-display text-base font-semibold text-petrol">{sessionsLabel(p.sessions)} أسبوعيًا</span>
                    {p.duration} دقيقة للحصة
                  </p>
                  <Duo src={p.image} alt="" soft sizes="200px" className="hidden aspect-[4/3] rounded-[3px] md:col-span-2 md:block" />
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/programs#goalkeeping"
                className="grid items-center gap-4 border-t border-petrol/12 py-6 transition-colors hover:bg-white md:grid-cols-12 md:gap-6 md:px-4"
              >
                <div className="md:col-span-3">
                  <p className="font-display text-2xl font-bold">{goalkeeping.name}</p>
                  <p className="font-semibold text-teal-dark">{goalkeeping.ages}</p>
                </div>
                <p className="text-petrol/75 md:col-span-5">{goalkeeping.summary}</p>
                <p className="md:col-span-2"><Tag>برنامج إضافي</Tag></p>
                <Duo src={goalkeeping.image} alt="" soft sizes="200px" className="hidden aspect-[4/3] rounded-[3px] md:col-span-2 md:block" />
              </Link>
            </li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            <Link href="/schedule" className="link-u">الجدول الأسبوعي</Link>
            <Link href="/fees" className="link-u">الرسوم والاشتراكات</Link>
          </div>
        </div>
      </section>

      {/* ============ خريجونا ============ */}
      <section className="sec relative overflow-hidden bg-ink text-white">
        <CenterCircle className="pointer-events-none absolute -right-48 -top-48 size-[620px] text-teal/15" />
        <div className="wrap relative">
          <SectionHead
            light
            title="خريجونا في الأندية"
            lead="الهدف الذي نعمل له كل يوم: لاعب من الأكاديمية يرتدي قميص نادٍ محترف."
            action={{ href: "/alumni", label: "كل الخريجين" }}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {alumni.map((a) => (
              <TransferCard key={a.name} {...a} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ الجانب التعليمي ============ */}
      <section className="sec bg-foam">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <Duo src={img.eduWriting} alt="لاعب يذاكر في الحصة التعليمية" soft className="aspect-[4/5] w-full rounded-[3px]" position="62% 50%" />
          </div>
          <div className="lg:col-span-7">
            <h2 className="t-h2">الملعب وحده لا يكفي</h2>
            <p className="t-lead mt-4 max-w-[54ch] text-petrol/75">
              اللاعب الذي يفهم جسده ولغته ودراسته يتطور أسرع. لذلك يتعلم لاعبونا خارج الخطوط أيضًا، في حصة أسبوعية ضمن
              الاشتراك.
            </p>
            <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {educationPillars.map((p) => {
                const Icon = pillarIcons[p.key as keyof typeof pillarIcons];
                return (
                  <li key={p.key} className="border-t border-petrol/15 pt-5">
                    <Icon className="size-6 text-teal-dark" aria-hidden="true" />
                    <p className="mt-3 font-display text-lg font-bold">{p.title}</p>
                    <p className="mt-1.5 leading-7 text-petrol/70">{p.text}</p>
                  </li>
                );
              })}
            </ul>
            <Link href="/education" className="link-u mt-10 inline-block">عن الجانب التعليمي</Link>
          </div>
        </div>
      </section>

      {/* ============ نجم الأسبوع ============ */}
      <section className="sec">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <Tag tone="gold">{starOfWeek.week}</Tag>
            <h2 className="t-h2 mt-4">نجم الأسبوع</h2>
            <p className="t-lead mt-4 text-petrol/75">
              كل أسبوع نكرّم لاعبًا تميّز في التزامه وأدائه. يحصل على هدية الأسبوع، وتُنشر بطاقته هنا وعلى حساباتنا.
            </p>
            <blockquote className="mt-8 border-r-[3px] border-teal pr-5">
              <p className="font-display text-xl font-semibold leading-relaxed">«{starOfWeek.reason}»</p>
              <footer className="mt-2 text-sm text-petrol/60">مدرب فئة {starOfWeek.category}</footer>
            </blockquote>
            <Link href="/star-of-the-week" className="link-u mt-8 inline-block">نجوم الأسابيع السابقة</Link>
          </div>
          <div className="lg:col-span-6">
            <div className="relative grid place-items-center overflow-hidden rounded-[4px] bg-petrol px-6 py-12 md:py-16">
              <CenterCircle className="pointer-events-none absolute inset-0 m-auto size-[520px] text-teal/25" />
              <div className="relative w-full max-w-[340px]">
                <PlayerCard {...starOfWeek} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ الجهاز الفني ============ */}
      <section className="sec bg-white">
        <div className="wrap">
          <SectionHead
            title="الجهاز الفني"
            lead="مدربون برخص معتمدة، يعرفون كل لاعب باسمه وبنقاط قوته."
            action={{ href: "/coaches", label: "الجهاز الفني كاملًا" }}
          />
          <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {coaches.slice(0, 4).map((c) => (
              <CoachCard key={c.role} coach={{ ...c, bio: undefined }} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ المركز الإعلامي ============ */}
      <section className="sec">
        <div className="wrap">
          <SectionHead title="من المركز الإعلامي" action={{ href: "/media", label: "كل الأخبار" }} />
          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <NewsCard item={lead} large />
            </div>
            <ul className="divide-y divide-petrol/12 lg:col-span-5">
              {rest.slice(0, 3).map((n) => (
                <li key={n.slug} className="py-5 first:pt-0">
                  <NewsCard item={n} compact />
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-14 grid grid-cols-3 gap-2 md:grid-cols-6">
            {gallery.map((src) => (
              <Link key={src} href="/media?tab=photos" className="group relative aspect-square overflow-hidden rounded-[2px] bg-mist">
                <Image src={src} alt="" fill sizes="(min-width: 768px) 16vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ آراء أولياء الأمور ============ */}
      <section className="sec bg-foam">
        <div className="wrap">
          <SectionHead title="ماذا يقول أولياء الأمور" action={{ href: "/testimonials", label: "كل الآراء" }} />
          <ul className="no-scrollbar -mx-5 mt-12 flex snap-x gap-5 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
            {testimonials.slice(0, 3).map((t) => (
              <li key={t.quote} className="w-[82%] shrink-0 snap-start border-t-[3px] border-teal pt-6 md:w-auto">
                <p className="font-display text-xl font-medium leading-relaxed">«{t.quote}»</p>
                <p className="mt-5 text-sm text-petrol/60">{t.who}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ الشركاء ============ */}
      <section className="sec bg-white">
        <div className="wrap">
          <SectionHead
            title="شركاء النجاح"
            lead="نرحّب بالجهات التي تؤمن بمواهب الأحساء وتريد أن تكون جزءًا من رحلتها."
            action={{ href: "/partners", label: "كن شريكًا" }}
          />
          <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {partnerTiers.map((p) => (
              <li key={p.title} className="flex aspect-[4/3] flex-col justify-between rounded-[4px] border-[1.5px] border-dashed border-petrol/20 p-5 md:aspect-[3/2]">
                <p className="text-sm text-teal-dark">مساحة متاحة</p>
                <div>
                  <p className="font-display font-bold">{p.title}</p>
                  <p className="mt-1 hidden text-sm leading-6 text-petrol/60 md:block">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
