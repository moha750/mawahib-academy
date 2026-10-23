import type { Metadata } from "next";
import Link from "next/link";
import { alumni } from "@/content/academy";
import { PageHero } from "@/components/ui";
import { CtaBand, TransferCard } from "@/components/cards";

export const metadata: Metadata = { title: "خريجونا" };

const steps = [
  { title: "تقييم مستمر", text: "يُتابَع اللاعب في كل حصة، ويُكتب له تقرير كل ثلاثة أشهر." },
  { title: "ملف اللاعب", text: "مقاطع من مبارياته، وإحصاءاته، وتقارير مدربيه في ملف واحد." },
  { title: "التواصل مع الأندية", text: "نعرض الملف على الأندية والكشافين، ونرتب لتجارب الأداء لديهم." },
  { title: "المتابعة بعد الانتقال", text: "تبقى الأكاديمية على تواصل مع اللاعب وأسرته في محطته الجديدة." },
];

export default function AlumniPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "الإنجازات" }, { label: "خريجونا" }]}
        title="من الأكاديمية إلى قمصان الأندية"
        lead="كل انتقال هنا بدأ بتجربة أداء في الأحساء. هؤلاء لاعبونا الذين وصلوا إلى الأندية."
      />

      <section className="sec bg-ink pt-6 text-white md:pt-8">
        <div className="wrap">
          <div className="grid gap-5 md:grid-cols-3">
            {alumni.map((a) => (
              <TransferCard key={a.name} {...a} />
            ))}
          </div>
          <p className="mt-10 max-w-[60ch] text-white/60">
            تُضاف الانتقالات الجديدة هنا فور اكتمال إجراءاتها، مع صور اللاعبين بعد موافقة أسرهم.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="t-h2 max-w-2xl">كيف يصل لاعبونا إلى الأندية</h2>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-[4px] bg-petrol/12 md:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="bg-paper p-6 md:p-7">
                <span className="num grid size-10 place-items-center rounded-full bg-petrol text-sm font-bold text-white">{i + 1}</span>
                <p className="mt-5 font-display text-lg font-bold">{s.title}</p>
                <p className="mt-2 text-petrol/70">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white">
        <div className="wrap grid gap-6 py-16 md:grid-cols-12 md:items-center md:py-20">
          <div className="md:col-span-8">
            <h2 className="t-h2">للأندية والكشافين</h2>
            <p className="t-lead mt-3 text-petrol/70">
              تبحث عن لاعب في مركز معين أو فئة عمرية محددة؟ اطلب ملفات لاعبينا وسنرسلها لك.
            </p>
          </div>
          <div className="md:col-span-4 md:text-left">
            <Link href="/contact?topic=scouting" className="btn btn-dark">اطلب ملفات اللاعبين</Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
