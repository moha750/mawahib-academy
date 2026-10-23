import type { Metadata } from "next";
import Link from "next/link";
import { img, milestones, values } from "@/content/academy";
import { Duo, PageHero } from "@/components/ui";
import { CtaBand } from "@/components/cards";

export const metadata: Metadata = { title: "من نحن" };

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "الأكاديمية" }, { label: "من نحن" }]}
        title="أكاديمية بدأت من الأحساء، ولأجل مواهبها"
        lead="تأسست أكاديمية مواهب الأحساء عام 2020 لتكون أول محطة منظمة في طريق اللاعب الموهوب، من سن 6 إلى 16 سنة."
        image={img.coachCare}
        imageAlt="مدرب يساعد لاعبًا صغيرًا في الملعب"
        imagePosition="70% 50%"
      />

      {/* القصة */}
      <section className="sec">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <h2 className="t-h2 lg:col-span-4">قصتنا</h2>
          <div className="space-y-6 text-[1.075rem] leading-9 text-petrol/80 lg:col-span-7 lg:col-start-6">
            <p>
              الأحساء من أكثر مناطق المملكة تقديمًا لنجوم كرة القدم، لكن الموهبة فيها كانت تحتاج مكانًا يكتشفها مبكرًا
              ويتعهدها بمنهج واضح. من هنا بدأت أكاديمية مواهب الأحساء.
            </p>
            <p>
              استقطبنا مدربين حاصلين على رخص تدريب معتمدة من الاتحاد السعودي لكرة القدم، وأضفنا إلى التدريب جانبًا
              تعليميًا وتثقيفيًا: معلمين للغة الإنجليزية والرياضيات، وتوعية غذائية وصحية تناسب أعمار اللاعبين.
            </p>
            <p>
              اليوم يرى أولياء الأمور نتيجة هذا العمل في لاعبين انتقلوا إلى الأندية، وفي أطفال صاروا أكثر انضباطًا وثقة.
            </p>
          </div>
        </div>
      </section>

      {/* الرؤية والرسالة */}
      <section className="bg-ink text-white">
        <div className="wrap grid md:grid-cols-2">
          <div className="border-white/10 py-16 md:border-l md:py-24 md:pl-12">
            <p className="font-display text-sm font-semibold text-teal">رؤيتنا</p>
            <p className="mt-4 font-display text-[1.65rem] font-bold leading-[1.6] md:text-3xl md:leading-[1.6]">
              أن تبقى الأحساء منبعًا ثابتًا لمواهب الكرة السعودية، وأن نكون أول محطة في طريقها.
            </p>
          </div>
          <div className="border-t border-white/10 py-16 md:border-t-0 md:py-24 md:pr-12">
            <p className="font-display text-sm font-semibold text-teal">رسالتنا</p>
            <p className="mt-4 font-display text-[1.65rem] font-bold leading-[1.6] md:text-3xl md:leading-[1.6]">
              نكتشف الموهبة مبكرًا، ونطوّرها بمنهج تدريبي وتعليمي متكامل، ونفتح لها الطريق إلى الأندية.
            </p>
          </div>
        </div>
      </section>

      {/* القيم */}
      <section className="sec">
        <div className="wrap">
          <h2 className="t-h2">ما نربّي عليه لاعبينا</h2>
          <dl className="mt-12 border-t border-petrol/12">
            {values.map((v) => (
              <div key={v.title} className="grid gap-2 border-b border-petrol/12 py-7 md:grid-cols-12 md:gap-8">
                <dt className="font-display text-2xl font-bold md:col-span-4">{v.title}</dt>
                <dd className="text-[1.075rem] text-petrol/75 md:col-span-8">{v.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* المحطات */}
      <section className="sec bg-white">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="t-h2">أبرز المحطات</h2>
            <p className="t-lead mt-4 text-petrol/70">من التأسيس حتى أول انتقالات لاعبينا إلى الأندية.</p>
            <Duo src={img.huddleKids} alt="لاعبون صغار في حلقة قبل المباراة" soft className="mt-10 hidden aspect-[4/5] rounded-[3px] lg:block" />
          </div>
          <ol className="relative lg:col-span-7 lg:col-start-6">
            <span aria-hidden="true" className="absolute bottom-3 right-[7px] top-3 w-px bg-petrol/15" />
            {milestones.map((m) => (
              <li key={m.title} className="relative pb-12 pr-10 last:pb-0">
                <span aria-hidden="true" className="absolute right-0 top-2 size-[15px] rounded-full border-[3px] border-paper bg-teal ring-1 ring-teal" />
                {m.year && <p className="num text-sm font-bold text-teal-dark">{m.year}</p>}
                <h3 className="mt-1 font-display text-xl font-bold">{m.title}</h3>
                <p className="mt-2 text-petrol/70">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="wrap mt-16 flex flex-wrap gap-x-8 gap-y-3">
          <Link href="/pathway" className="link-u">مسار تطوير اللاعب</Link>
          <Link href="/coaches" className="link-u">الجهاز الفني</Link>
          <Link href="/alumni" className="link-u">خريجونا</Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
