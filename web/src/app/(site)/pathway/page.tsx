import type { Metadata } from "next";
import Link from "next/link";
import PathwayPitch from "@/components/PathwayPitch";
import { PageHero } from "@/components/ui";
import { CtaBand } from "@/components/cards";

export const metadata: Metadata = { title: "مسار تطوير اللاعب" };

const axes = [
  { title: "الجانب الفني", text: "التحكم بالكرة، التمرير، التسديد، والمهارات الخاصة بالمركز.", score: 78 },
  { title: "الجانب التكتيكي", text: "التمركز، قراءة اللعب، واتخاذ القرار مع الكرة وبدونها.", score: 71 },
  { title: "الجانب البدني", text: "السرعة والرشاقة والتحمل، بما يناسب مرحلة النمو.", score: 83 },
  { title: "الجانب السلوكي", text: "الانضباط، والتعامل مع الزملاء، والتعامل مع الخسارة والضغط.", score: 92 },
];

export default function PathwayPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "الأكاديمية" }, { label: "مسار تطوير اللاعب" }]}
        title="خمس محطات، وهدف واحد"
        lead="لا ينتقل اللاعب من محطة إلى أخرى بالعمر وحده. ينتقل حين يحقق متطلبات محطته، ويعرف هو وأسرته ما المطلوب منه."
      />

      <section className="sec bg-ink pt-4 text-white md:pt-6">
        <div className="wrap">
          <PathwayPitch detailed />
        </div>
      </section>

      <section className="sec">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="t-h2">كيف نقيّم اللاعب</h2>
            <p className="t-lead mt-4 text-petrol/75">
              كل ثلاثة أشهر يكتب مدرب الفئة تقريرًا من أربعة محاور، ويناقشه مع ولي الأمر في اليوم المفتوح.
            </p>
            <dl className="mt-10 space-y-6">
              {axes.map((a) => (
                <div key={a.title} className="border-t border-petrol/12 pt-5">
                  <dt className="font-display text-lg font-bold">{a.title}</dt>
                  <dd className="mt-1 text-petrol/70">{a.text}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* نموذج تقرير الأداء */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="rounded-[6px] bg-white p-6 shadow-[0_30px_70px_-40px_rgb(6_40_48/0.45)] ring-1 ring-petrol/8 md:p-8">
              <div className="flex items-start justify-between gap-4 border-b border-petrol/10 pb-5">
                <div>
                  <p className="text-sm text-petrol/55">تقرير الأداء الفصلي</p>
                  <p className="mt-1 font-display text-xl font-bold">اسم اللاعب</p>
                  <p className="text-sm text-petrol/65">فئة الناشئين، محطة التطوير</p>
                </div>
                <span className="rounded-[3px] bg-foam px-2.5 py-1 text-xs font-semibold text-teal-dark">نموذج</span>
              </div>
              <ul className="mt-6 space-y-5">
                {axes.map((a) => (
                  <li key={a.title}>
                    <div className="flex items-baseline justify-between text-sm">
                      <span className="font-semibold">{a.title}</span>
                      <span className="num font-bold">{a.score}</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-mist" role="presentation">
                      <div className="h-full rounded-full bg-teal" style={{ width: `${a.score}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-7 rounded-[4px] bg-paper p-4">
                <p className="text-sm font-semibold">ملاحظة المدرب</p>
                <p className="mt-1 text-[0.95rem] leading-7 text-petrol/75">
                  تحسّن واضح في الاستلام تحت الضغط. الخطوة القادمة: اتخاذ القرار أسرع في الثلث الأخير.
                </p>
              </div>
              <p className="mt-5 text-sm text-petrol/55">ستصل هذه التقارير لولي الأمر عبر بوابة الأكاديمية.</p>
            </div>
          </div>
        </div>
        <div className="wrap mt-16 flex flex-wrap gap-x-8 gap-y-3">
          <Link href="/programs" className="link-u">البرامج والفئات العمرية</Link>
          <Link href="/alumni" className="link-u">خريجونا</Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
