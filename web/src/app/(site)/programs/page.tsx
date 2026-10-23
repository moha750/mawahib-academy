import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { goalkeeping, programs } from "@/content/academy";
import { Duo, PageHero } from "@/components/ui";
import { CtaBand } from "@/components/cards";
import { sessionsLabel } from "@/lib/format";

export const metadata: Metadata = { title: "البرامج والفئات العمرية" };

const SEASON_YEAR = 2026;

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "البرامج" }, { label: "البرامج والفئات العمرية" }]}
        title="برنامج لكل عمر، وهدف لكل فئة"
        lead="أربع فئات من 6 إلى 16 سنة، وبرنامج متخصص لحراس المرمى. تحدد تجربة الأداء الفئة والمستوى المناسبين."
      >
        <ul className="flex flex-wrap gap-2">
          {[...programs.map((p) => ({ id: p.slug, name: p.name })), { id: "goalkeeping", name: goalkeeping.name }].map((p) => (
            <li key={p.id}>
              <a href={`#${p.id}`} className="inline-flex rounded-[3px] border border-white/20 px-4 py-2 text-sm font-semibold text-white/85 hover:border-teal hover:text-teal">
                {p.name}
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      {programs.map((p, i) => (
        <section key={p.slug} id={p.slug} className={`sec ${i % 2 ? "bg-white" : ""}`}>
          <div className="wrap grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className={`lg:col-span-5 ${i % 2 ? "lg:order-2 lg:col-start-8" : ""}`}>
              <Duo src={p.image} alt={`لاعبون من فئة ${p.name}`} soft className="aspect-[4/3] rounded-[3px] lg:aspect-[4/5]" />
            </div>
            <div className={`lg:col-span-6 ${i % 2 ? "lg:order-1" : "lg:col-start-7"}`}>
              <p className="font-display text-lg font-semibold text-teal-dark">{p.ages}</p>
              <h2 className="t-h1 mt-1">{p.name}</h2>
              <p className="t-lead mt-5 text-petrol/75">{p.summary}</p>
              <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-[4px] bg-petrol/12">
                {[
                  ["الحصص", `${sessionsLabel(p.sessions)} أسبوعيًا`],
                  ["مدة الحصة", `${p.duration} دقيقة`],
                  ["الحصة التعليمية", "أسبوعيًا"],
                ].map(([k, v]) => (
                  <div key={k} className={`${i % 2 ? "bg-white" : "bg-paper"} p-4`}>
                    <dt className="text-sm text-petrol/60">{k}</dt>
                    <dd className="mt-1 font-display font-bold">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-8 font-display font-bold">ما يتعلمه اللاعب</p>
              <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {p.focus.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-petrol/80">
                    <Check className="mt-1.5 size-4 shrink-0 text-teal-dark" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href={`/register?program=${p.slug}`} className="btn btn-dark">سجّل في {p.name}</Link>
                <Link href="/schedule" className="btn btn-line">مواعيد الفئة</Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* حراسة المرمى */}
      <section id="goalkeeping" className="relative overflow-hidden bg-ink text-white">
        <div className="grid lg:grid-cols-2">
          <Duo src={goalkeeping.image} alt="حارس مرمى صغير يستعد لصد الكرة" className="aspect-[4/3] lg:aspect-auto lg:min-h-[640px]" />
          <div className="px-5 py-16 md:px-12 lg:py-24">
            <p className="font-display text-lg font-semibold text-teal">برنامج إضافي، {goalkeeping.ages}</p>
            <h2 className="t-h1 mt-1">{goalkeeping.name}</h2>
            <p className="t-lead mt-5 max-w-[46ch] text-white/75">{goalkeeping.summary}</p>
            <p className="mt-6 text-white/70">
              {sessionsLabel(goalkeeping.sessions)} أسبوعيًا، {goalkeeping.duration} دقيقة للحصة، إضافة إلى حصص الفئة.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {goalkeeping.focus.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-white/85">
                  <Check className="mt-1.5 size-4 shrink-0 text-teal" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/register?program=goalkeeping" className="btn btn-primary mt-10">سجّل في برنامج الحراس</Link>
          </div>
        </div>
      </section>

      {/* تحديد الفئة */}
      <section className="sec">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="t-h2">ما فئة ابني؟</h2>
            <p className="t-lead mt-4 text-petrol/70">
              تُحدَّد الفئة بسنة الميلاد لموسم {SEASON_YEAR}/{SEASON_YEAR + 1}. قد يُنقل اللاعب لفئة أعلى إذا رأى المدرب أن مستواه يسمح.
            </p>
          </div>
          <div className="overflow-x-auto lg:col-span-7 lg:col-start-6">
            <table className="w-full min-w-[480px] text-right">
              <thead>
                <tr className="border-b-2 border-petrol text-sm">
                  <th scope="col" className="py-3 font-display font-semibold">الفئة</th>
                  <th scope="col" className="py-3 font-display font-semibold">العمر</th>
                  <th scope="col" className="py-3 font-display font-semibold">مواليد</th>
                </tr>
              </thead>
              <tbody>
                {programs.map((p) => (
                  <tr key={p.slug} className="border-b border-petrol/12">
                    <th scope="row" className="py-4 font-display text-lg font-bold">{p.name}</th>
                    <td className="py-4 text-petrol/75">{p.ages}</td>
                    <td className="num py-4 font-semibold">
                      <span dir="ltr">{SEASON_YEAR - p.maxAge} – {SEASON_YEAR - p.minAge}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              <Link href="/fees" className="link-u">الرسوم والاشتراكات</Link>
              <Link href="/faq" className="link-u">الأسئلة الشائعة</Link>
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
