import type { Metadata } from "next";
import Link from "next/link";
import { Handshake, Megaphone, Users } from "lucide-react";
import { partnerTiers } from "@/content/academy";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "الشركاء والرعاة" };

const reasons = [
  { icon: Users, title: "حضور بين الأسر", text: "أسر اللاعبين ومتابعو الأكاديمية في الأحساء، في الملعب وعلى المنصات طوال الموسم." },
  { icon: Megaphone, title: "محتوى مستمر", text: "بطولات وانتقالات ومهرجانات تحمل اسم الشريك طوال الموسم." },
  { icon: Handshake, title: "أثر في المجتمع", text: "دعم مباشر لمواهب المنطقة، ضمن مستهدفات تطوير الرياضة في رؤية 2030." },
];

export default function PartnersPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "الأكاديمية" }, { label: "الشركاء والرعاة" }]}
        title="شاركنا صناعة لاعب الأحساء القادم"
        lead="نبحث عن شركاء يؤمنون بالمواهب المحلية، ويريدون أن يكون اسمهم جزءًا من قصص لاعبينا."
      >
        <Link href="/contact?topic=partnership" className="btn btn-primary">اطلب ملف الشراكة</Link>
      </PageHero>

      <section className="sec">
        <div className="wrap">
          <h2 className="t-h2">لماذا مواهب الأحساء</h2>
          <ul className="mt-10 grid gap-10 md:grid-cols-3">
            {reasons.map((r) => (
              <li key={r.title} className="border-t border-petrol/15 pt-6">
                <r.icon className="size-6 text-teal-dark" aria-hidden="true" />
                <p className="mt-4 font-display text-xl font-bold">{r.title}</p>
                <p className="mt-2 text-petrol/70">{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec bg-white">
        <div className="wrap">
          <h2 className="t-h2">فئات الشراكة</h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {partnerTiers.map((p) => (
              <li key={p.title} className="flex flex-col justify-between gap-10 rounded-[6px] border-[1.5px] border-dashed border-petrol/20 p-7 md:min-h-[240px]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl font-bold">{p.title}</h3>
                    <p className="mt-2 max-w-[40ch] text-petrol/70">{p.text}</p>
                  </div>
                  <span className="shrink-0 rounded-[3px] bg-foam px-2.5 py-1 text-xs font-semibold text-teal-dark">مساحة متاحة</span>
                </div>
                <Link href={`/contact?topic=partnership&tier=${encodeURIComponent(p.title)}`} className="link-u self-start">
                  أبدِ اهتمامك
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
