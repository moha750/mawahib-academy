import type { Metadata } from "next";
import Link from "next/link";
import { coaches, type Coach } from "@/content/academy";
import { PageHero } from "@/components/ui";
import { CoachCard, CtaBand } from "@/components/cards";

export const metadata: Metadata = { title: "الجهاز الفني" };

const order: Coach["group"][] = ["الإدارة الفنية", "المدربون", "الإعداد والتخصص", "التعليم والتثقيف"];

export default function CoachesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "الأكاديمية" }, { label: "الجهاز الفني" }]}
        title="الناس الذين يقفون مع ابنك في الملعب"
        lead="مدربون برخص معتمدة من الاتحاد السعودي لكرة القدم، ومختصون في الإعداد البدني والتعليم والتغذية."
      />

      {order.map((g, i) => {
        const list = coaches.filter((c) => c.group === g);
        return (
          <section key={g} className={`py-16 md:py-20 ${i % 2 ? "bg-white" : ""}`}>
            <div className="wrap">
              <h2 className="t-h2">{g}</h2>
              <div className={`mt-10 grid gap-x-5 gap-y-12 ${g === "الإدارة الفنية" ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-2 lg:grid-cols-4"}`}>
                {list.map((c) => (
                  <CoachCard key={c.role} coach={c} compact={g !== "الإدارة الفنية"} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-ink text-white">
        <div className="wrap grid gap-6 py-16 md:grid-cols-12 md:items-center md:py-20">
          <div className="md:col-span-8">
            <h2 className="t-h2">تحمل رخصة تدريب وتريد العمل معنا؟</h2>
            <p className="t-lead mt-3 text-white/70">نرحّب بالمدربين والمختصين من أبناء الأحساء. أرسل سيرتك الذاتية ورخصك المعتمدة.</p>
          </div>
          <div className="md:col-span-4 md:text-left">
            <Link href="/contact?topic=careers" className="btn btn-primary">أرسل سيرتك الذاتية</Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
