import type { Metadata } from "next";
import Link from "next/link";
import { Apple, Calculator, Droplets, HeartPulse, Languages, Moon, Utensils } from "lucide-react";
import { educationPillars, img } from "@/content/academy";
import { PageHero } from "@/components/ui";
import { CtaBand } from "@/components/cards";

export const metadata: Metadata = { title: "الجانب التعليمي" };

const icons = { english: Languages, math: Calculator, nutrition: Apple, health: HeartPulse } as const;

const topics: Record<string, string[]> = {
  english: ["مصطلحات الملعب والتعليمات", "التعريف بالنفس في المعسكرات", "قراءة خطة المباراة بالإنجليزية"],
  math: ["متابعة الواجبات لمن يحتاج", "تقوية في أساسيات الرياضيات", "تنظيم الوقت بين الدراسة والتدريب"],
  nutrition: ["وجبة ما قبل التمرين وبعده", "السوائل في الأجواء الحارة", "بدائل صحية للوجبات السريعة"],
  health: ["الإحماء والتهدئة الصحيحة", "النوم وأثره على الأداء", "متى يتوقف اللاعب ويخبر المدرب"],
};

const tips = [
  { icon: Moon, title: "النوم أولًا", text: "تسع ساعات على الأقل لمن هم دون 12 سنة، وثمان لمن هم أكبر." },
  { icon: Droplets, title: "الماء قبل العطش", text: "قارورة كاملة قبل التمرين بساعة، والشرب على فترات أثناءه." },
  { icon: Utensils, title: "وجبة قبل ساعتين", text: "نشويات خفيفة وبروتين، وتجنّب المقليات قبل التمرين." },
];

export default function EducationPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "الأكاديمية" }, { label: "الجانب التعليمي" }]}
        title="لاعب يفهم جسده ولغته ودراسته"
        lead="حصة تعليمية أسبوعية ضمن الاشتراك، يقدمها معلمون ومختصون، لأن المسيرة الرياضية تحتاج أكثر من المهارة."
        image={img.eduWriting}
        imageAlt="لاعب يكتب في الحصة التعليمية"
        imagePosition="62% 50%"
      />

      <section className="sec">
        <div className="wrap">
          {educationPillars.map((p) => {
            const Icon = icons[p.key as keyof typeof icons];
            return (
              <article key={p.key} className="grid gap-6 border-t border-petrol/12 py-10 md:grid-cols-12 md:gap-8 md:py-12">
                <div className="md:col-span-4">
                  <Icon className="size-7 text-teal-dark" aria-hidden="true" />
                  <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl">{p.title}</h2>
                </div>
                <p className="text-[1.075rem] text-petrol/75 md:col-span-4">{p.text}</p>
                <ul className="space-y-2 md:col-span-4">
                  {topics[p.key].map((t) => (
                    <li key={t} className="rounded-[3px] bg-white px-4 py-3 text-[0.95rem] ring-1 ring-petrol/8">{t}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="sec bg-ink text-white">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="t-h2">نصائح لولي الأمر</h2>
            <p className="t-lead mt-4 text-white/70">ما يحدث في البيت يكمل ما يحدث في الملعب.</p>
          </div>
          <ul className="grid gap-8 sm:grid-cols-3 lg:col-span-8">
            {tips.map((t) => (
              <li key={t.title} className="border-t border-white/15 pt-6">
                <t.icon className="size-6 text-teal" aria-hidden="true" />
                <p className="mt-4 font-display text-lg font-bold">{t.title}</p>
                <p className="mt-2 leading-7 text-white/70">{t.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16">
        <div className="wrap flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="t-lead max-w-[56ch] text-petrol/80">
            الحصة التعليمية كل اثنين من 5:45 إلى 6:45 مساءً، ومفتوحة لكل لاعبي الأكاديمية.
          </p>
          <Link href="/schedule" className="link-u shrink-0">الجدول الأسبوعي</Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
