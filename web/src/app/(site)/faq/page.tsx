import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { faqs } from "@/content/academy";
import { site } from "@/content/site";
import { PageHero } from "@/components/ui";
import { WhatsAppIcon } from "@/components/icons";

export const metadata: Metadata = { title: "الأسئلة الشائعة" };

export default function FaqPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "البرامج" }, { label: "الأسئلة الشائعة" }]}
        title="قبل أن تسجّل ابنك"
        lead="أكثر ما يسأل عنه أولياء الأمور. لم تجد سؤالك؟ راسلنا على واتساب."
      />
      <section className="sec">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <nav aria-label="فئات الأسئلة" className="lg:col-span-3">
            <ul className="flex flex-wrap gap-2 lg:sticky lg:top-28 lg:flex-col lg:gap-1">
              {faqs.map((g) => (
                <li key={g.group}>
                  <a href={`#${g.group}`} className="block rounded-[3px] px-3 py-2 font-display font-semibold text-petrol/70 hover:bg-white hover:text-petrol">
                    {g.group}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-14 lg:col-span-8 lg:col-start-5">
            {faqs.map((g) => (
              <div key={g.group} id={g.group}>
                <h2 className="t-h3">{g.group}</h2>
                <div className="mt-4 border-t border-petrol/12">
                  {g.items.map((f) => (
                    <details key={f.q} className="group border-b border-petrol/12">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-lg font-semibold [&::-webkit-details-marker]:hidden">
                        {f.q}
                        <Plus className="size-5 shrink-0 text-teal-dark transition-transform duration-200 group-open:rotate-45" aria-hidden="true" />
                      </summary>
                      <p className="max-w-[62ch] pb-6 text-[1.05rem] leading-8 text-petrol/75">{f.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex flex-col gap-4 rounded-[6px] bg-ink p-7 text-white sm:flex-row sm:items-center sm:justify-between">
              <p className="font-display text-xl font-bold">لديك سؤال آخر؟</p>
              <div className="flex flex-wrap gap-3">
                <a href={site.whatsapp} target="_blank" rel="noreferrer" className="btn btn-primary">
                  <WhatsAppIcon /> واتساب
                </a>
                <Link href="/contact" className="btn btn-line-light">نموذج التواصل</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
