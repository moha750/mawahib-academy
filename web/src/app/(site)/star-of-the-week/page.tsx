import type { Metadata } from "next";
import Link from "next/link";
import { Gift } from "lucide-react";
import { starArchive, starOfWeek } from "@/content/academy";
import { CenterCircle, Tag } from "@/components/ui";
import { CtaBand, PlayerCard } from "@/components/cards";

export const metadata: Metadata = { title: "نجم الأسبوع" };

const criteria = [
  { title: "الحضور والالتزام", text: "لم يغب عن حصص الأسبوع، ووصل في موعده." },
  { title: "التطور", text: "تحسّن ملحوظ في مهارة يعمل عليها مع مدربه." },
  { title: "الروح الرياضية", text: "سلوكه مع زملائه والخصم والحكم." },
  { title: "خدمة الفريق", text: "ساعد زملاءه، وقدّم الفريق على نفسه." },
];

export default function StarPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <CenterCircle className="pointer-events-none absolute -left-32 top-1/2 size-[640px] -translate-y-1/2 text-teal/20" />
        <div className="wrap relative grid gap-12 pb-16 pt-32 md:pb-24 md:pt-40 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <nav aria-label="مسار التصفح" className="mb-6 text-sm text-white/60">
              <Link href="/" className="hover:text-teal">الرئيسية</Link>
              <span aria-hidden="true" className="mx-2 text-white/30">/</span>
              الإنجازات
              <span aria-hidden="true" className="mx-2 text-white/30">/</span>
              <span aria-current="page" className="text-white/90">نجم الأسبوع</span>
            </nav>
            <Tag tone="gold">{starOfWeek.week}</Tag>
            <h1 className="t-h1 mt-4">نجم الأسبوع: {starOfWeek.name}</h1>
            <p className="t-lead mt-5 max-w-[46ch] text-white/75">
              {starOfWeek.position} في فئة {starOfWeek.category}. {starOfWeek.reason}
            </p>
            <p className="mt-8 flex items-start gap-3 text-white/70">
              <Gift className="mt-1 size-5 shrink-0 text-gold" aria-hidden="true" />
              يحصل نجم الأسبوع على هدية الأسبوع، وتُنشر بطاقته على حسابات الأكاديمية.
            </p>
          </div>
          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <PlayerCard {...starOfWeek} />
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="t-h2">كيف نختار النجم</h2>
            <p className="t-lead mt-4 text-petrol/70">يرشّح مدربو الفئات لاعبًا من كل فئة، ويختار الجهاز الفني نجم الأسبوع في اجتماعه الأسبوعي.</p>
          </div>
          <dl className="grid gap-px overflow-hidden rounded-[4px] bg-petrol/12 sm:grid-cols-2 lg:col-span-8">
            {criteria.map((c) => (
              <div key={c.title} className="bg-paper p-6">
                <dt className="font-display text-lg font-bold">{c.title}</dt>
                <dd className="mt-1 text-petrol/70">{c.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="sec bg-white">
        <div className="wrap">
          <h2 className="t-h2">نجوم الأسابيع السابقة</h2>
          <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {starArchive.map((s) => (
              <li key={s.week}>
                <PlayerCard {...s} size="sm" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
