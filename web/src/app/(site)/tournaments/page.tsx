import type { Metadata } from "next";
import { competitions, fixtures, img } from "@/content/academy";
import { PageHero } from "@/components/ui";
import { CtaBand, FixtureRow } from "@/components/cards";

export const metadata: Metadata = { title: "البطولات والمشاركات" };

const US = "مواهب الأحساء";

export default function TournamentsPage() {
  const upcoming = fixtures.filter((f) => f.status === "upcoming");
  const played = fixtures.filter((f) => f.status === "played" && f.score);

  const record = played.reduce(
    (r, f) => {
      const [h, a] = f.score!;
      const ours = f.home === US ? h : a;
      const theirs = f.home === US ? a : h;
      if (ours > theirs) r.w++;
      else if (ours === theirs) r.d++;
      else r.l++;
      r.gf += ours;
      r.ga += theirs;
      return r;
    },
    { w: 0, d: 0, l: 0, gf: 0, ga: 0 }
  );

  return (
    <>
      <PageHero
        crumbs={[{ label: "الإنجازات" }, { label: "البطولات والمشاركات" }]}
        title="نتعلم في التمرين، ونُختبر في المباراة"
        lead="يشارك لاعبونا في الدوريات الإقليمية والدورات الودية، لأن الاحتكاك جزء من التطوير."
        image={img.trophy}
        imageAlt="كأس بطولة على عشب الملعب"
        imagePosition="50% 60%"
      />

      <section className="sec">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="t-h2">المباريات القادمة</h2>
            <ul className="mt-6 border-t border-petrol/12">
              {upcoming.map((f) => (
                <FixtureRow key={f.date + f.home} f={f} />
              ))}
            </ul>

            <h2 className="t-h2 mt-16">آخر النتائج</h2>
            <ul className="mt-6 border-t border-petrol/12">
              {played.map((f) => (
                <FixtureRow key={f.date + f.home} f={f} />
              ))}
            </ul>
          </div>

          <aside className="lg:col-span-4">
            <div className="rounded-[6px] bg-ink p-7 text-white lg:sticky lg:top-28">
              <p className="font-display font-semibold text-teal">سجل المباريات المعروضة</p>
              <dl className="mt-6 grid grid-cols-3 gap-4 text-center">
                {[
                  ["فوز", record.w],
                  ["تعادل", record.d],
                  ["خسارة", record.l],
                ].map(([k, v]) => (
                  <div key={k as string} className="flex flex-col-reverse rounded-[4px] bg-white/5 py-4">
                    <dt className="mt-1 text-sm text-white/60">{k}</dt>
                    <dd className="num text-4xl font-bold">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-sm text-white/70">
                <span>الأهداف</span>
                <span className="num text-base font-bold text-white" dir="ltr">
                  {record.gf} : {record.ga}
                </span>
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="sec bg-white">
        <div className="wrap">
          <h2 className="t-h2">مشاركات الموسم</h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[560px] text-right">
              <thead>
                <tr className="border-b-2 border-petrol text-sm">
                  <th scope="col" className="py-3 font-display font-semibold">البطولة</th>
                  <th scope="col" className="py-3 font-display font-semibold">الفئات</th>
                  <th scope="col" className="py-3 font-display font-semibold">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {competitions.map((c) => (
                  <tr key={c.name} className="border-b border-petrol/12">
                    <th scope="row" className="py-5 font-display text-lg font-bold">{c.name}</th>
                    <td className="py-5 text-petrol/75">{c.categories}</td>
                    <td className="py-5 font-semibold text-teal-dark">{c.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
