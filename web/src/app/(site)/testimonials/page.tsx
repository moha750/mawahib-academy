import type { Metadata } from "next";
import Link from "next/link";
import { testimonials } from "@/content/academy";
import { PageHero } from "@/components/ui";
import { CtaBand } from "@/components/cards";

export const metadata: Metadata = { title: "آراء أولياء الأمور" };

export default function TestimonialsPage() {
  const [first, ...rest] = testimonials;
  return (
    <>
      <PageHero
        crumbs={[{ label: "الإنجازات" }, { label: "آراء أولياء الأمور" }]}
        title="ما تقوله الأسر"
        lead="أولياء الأمور هم أقرب من يرى أثر الأكاديمية على أبنائهم، داخل الملعب وخارجه."
      />

      <section className="sec">
        <div className="wrap">
          <figure className="max-w-4xl">
            <blockquote className="font-display text-[1.75rem] font-semibold leading-[1.65] md:text-[2.4rem]">
              «{first.quote}»
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 text-petrol/65">
              <span aria-hidden="true" className="h-px w-10 bg-teal" />
              {first.who}
            </figcaption>
          </figure>

          <ul className="mt-20 grid gap-x-10 gap-y-14 md:grid-cols-2">
            {rest.map((t) => (
              <li key={t.quote} className="border-t-[3px] border-teal pt-6">
                <blockquote className="font-display text-xl font-medium leading-relaxed">«{t.quote}»</blockquote>
                <p className="mt-4 text-sm text-petrol/60">{t.who}</p>
              </li>
            ))}
          </ul>
          <p className="mt-16 text-sm text-petrol/50">الآراء المعروضة نماذج توضيحية، وتُستبدل بآراء أولياء الأمور بعد موافقتهم.</p>
        </div>
      </section>

      <section className="bg-white">
        <div className="wrap grid gap-6 py-16 md:grid-cols-12 md:items-center">
          <div className="md:col-span-8">
            <h2 className="t-h2">ابنك معنا؟ شاركنا تجربتك</h2>
            <p className="t-lead mt-3 text-petrol/70">رأيك يساعدنا على التطوير، ويساعد أسرًا أخرى على اتخاذ القرار.</p>
          </div>
          <div className="md:col-span-4 md:text-left">
            <Link href="/contact?topic=feedback" className="btn btn-dark">أرسل رأيك</Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
