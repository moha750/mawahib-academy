import type { Metadata } from "next";
import Link from "next/link";
import { Check, Info } from "lucide-react";
import { addOns, plans } from "@/content/academy";
import { PageHero } from "@/components/ui";
import { CtaBand } from "@/components/cards";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = { title: "الرسوم والاشتراكات" };

const policies = [
  { title: "طرق الدفع", text: "تحويل بنكي أو مدى أو Apple Pay عبر بوابة الأكاديمية." },
  { title: "تجميد الاشتراك", text: "يمكن تجميد الاشتراك مرة واحدة في الموسم بسبب سفر أو إصابة موثقة." },
  { title: "الاسترداد", text: "يُسترد المبلغ كاملًا إذا أُلغي الاشتراك قبل أول حصة." },
];

export default function FeesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "البرامج" }, { label: "الرسوم والاشتراكات" }]}
        title="اشتراك واضح، بلا رسوم مخفية"
        lead="كل الباقات تشمل حصص الفئة كاملة والحصة التعليمية الأسبوعية وتقارير الأداء."
      />

      <section className="sec">
        <div className="wrap">
          <p className="flex items-start gap-3 rounded-[4px] bg-gold/15 px-5 py-4 text-[0.95rem] text-petrol">
            <Info className="mt-1 size-5 shrink-0 text-[#8a6410]" aria-hidden="true" />
            الأسعار المعروضة توضيحية لحين اعتمادها من إدارة الأكاديمية.
          </p>

          <ul className="mt-10 grid gap-5 lg:grid-cols-3">
            {plans.map((p) => (
              <li
                key={p.name}
                className={`relative flex flex-col rounded-[6px] p-7 md:p-8 ${
                  p.featured ? "bg-ink text-white" : "bg-white ring-1 ring-petrol/10"
                }`}
              >
                {p.featured && (
                  <span className="absolute left-6 top-7 rounded-[3px] bg-teal px-2.5 py-1 text-xs font-bold text-ink">الأكثر اختيارًا</span>
                )}
                <h2 className="font-display text-xl font-bold">{p.name}</h2>
                <p className={`mt-1 text-sm ${p.featured ? "text-white/60" : "text-petrol/60"}`}>{p.note}</p>
                <p className="mt-8 flex items-baseline gap-2">
                  <span className="num text-5xl font-bold">{formatPrice(p.price)}</span>
                  <span className={p.featured ? "text-white/70" : "text-petrol/70"}>ر.س {p.period}</span>
                </p>
                <ul className={`mt-8 flex-1 space-y-3 border-t pt-6 ${p.featured ? "border-white/10" : "border-petrol/10"}`}>
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className={`mt-1.5 size-4 shrink-0 ${p.featured ? "text-teal" : "text-teal-dark"}`} aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={`/register?plan=${encodeURIComponent(p.name)}`} className={`btn mt-8 w-full ${p.featured ? "btn-primary" : "btn-dark"}`}>
                  اختر {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec bg-white">
        <div className="wrap grid gap-14 lg:grid-cols-2">
          <div>
            <h2 className="t-h2">إضافات وخصومات</h2>
            <dl className="mt-8 border-t border-petrol/12">
              {addOns.map((a) => (
                <div key={a.name} className="flex items-center justify-between gap-6 border-b border-petrol/12 py-5">
                  <dt className="font-display font-semibold">{a.name}</dt>
                  <dd className="num shrink-0 font-bold text-teal-dark">{a.price}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className="t-h2">سياسات الاشتراك</h2>
            <dl className="mt-8 border-t border-petrol/12">
              {policies.map((p) => (
                <div key={p.title} className="border-b border-petrol/12 py-5">
                  <dt className="font-display font-semibold">{p.title}</dt>
                  <dd className="mt-1 text-petrol/70">{p.text}</dd>
                </div>
              ))}
            </dl>
            <Link href="/faq" className="link-u mt-8 inline-block">الأسئلة الشائعة</Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
