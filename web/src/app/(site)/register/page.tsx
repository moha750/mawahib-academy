import type { Metadata } from "next";
import RegisterWizard from "@/components/RegisterWizard";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "طلب تسجيل وتجربة أداء" };

const after = [
  { title: "نراجع الطلب", text: "يراجع المشرف بيانات اللاعب ويحدد الفئة المناسبة." },
  { title: "نتواصل معك", text: "اتصال أو رسالة واتساب لتأكيد موعد تجربة الأداء." },
  { title: "تجربة الأداء", text: "حصة تقييم في الملعب، يحضرها ولي الأمر إن رغب." },
  { title: "بدء التدريب", text: "بعد القبول يصلك الجدول وموقع الملعب وتفاصيل الاشتراك." },
];

export default function RegisterPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "طلب تسجيل" }]}
        title="سجّل ابنك في أكاديمية مواهب"
        lead="أربع خطوات قصيرة. بعد الإرسال نتواصل معك لتحديد موعد تجربة الأداء."
      />
      <section className="sec">
        <div className="wrap">
          <RegisterWizard />
        </div>
      </section>
      <section className="bg-white py-16 md:py-20">
        <div className="wrap">
          <h2 className="t-h2">ماذا يحدث بعد الإرسال</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-4">
            {after.map((s, i) => (
              <li key={s.title} className="border-t border-petrol/15 pt-5">
                <span className="num text-sm font-bold text-teal-dark">{i + 1}</span>
                <p className="mt-1 font-display text-lg font-bold">{s.title}</p>
                <p className="mt-1.5 text-petrol/70">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
