import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { events } from "@/content/academy";
import { Duo, PageHero, Tag } from "@/components/ui";
import { CtaBand } from "@/components/cards";

export const metadata: Metadata = { title: "المعسكرات والفعاليات" };

export default function EventsPage() {
  const upcoming = events.filter((e) => e.status === "upcoming");
  const past = events.filter((e) => e.status === "past");
  return (
    <>
      <PageHero
        crumbs={[{ label: "البرامج" }, { label: "المعسكرات والفعاليات" }]}
        title="الإجازة لا توقف التطور"
        lead="معسكرات مكثفة في الإجازات، وأيام مفتوحة لأولياء الأمور، ومهرجانات تجمع أجيال الكرة في الأحساء."
      />

      <section className="sec">
        <div className="wrap">
          <h2 className="t-h2">القادمة</h2>
          <ul className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-3">
            {upcoming.map((e) => (
              <li key={e.title} className="flex flex-col">
                <Duo src={e.image} alt="" soft className="aspect-[4/3] rounded-[3px]" sizes="(min-width: 768px) 33vw, 100vw" />
                <div className="mt-5 flex items-center gap-3 text-sm text-petrol/65">
                  <Tag>{e.kind}</Tag>
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="size-4" aria-hidden="true" />
                    {e.when}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-xl font-bold">{e.title}</h3>
                <p className="mt-2 flex-1 text-petrol/70">{e.text}</p>
                <Link href={`/register?event=${encodeURIComponent(e.title)}`} className="link-u mt-5 self-start">
                  سجّل اهتمامك
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec bg-white">
        <div className="wrap">
          <h2 className="t-h2">فعاليات سابقة</h2>
          <ul className="mt-10 border-t border-petrol/12">
            {past.map((e) => (
              <li key={e.title} className="grid gap-5 border-b border-petrol/12 py-7 sm:grid-cols-[200px_1fr] sm:items-center sm:gap-8">
                <Duo src={e.image} alt="" soft className="aspect-[16/10] rounded-[3px]" sizes="200px" />
                <div>
                  <div className="flex items-center gap-3 text-sm text-petrol/60">
                    <Tag tone="dark">{e.kind}</Tag>
                    {e.when}
                  </div>
                  <h3 className="mt-2 font-display text-xl font-bold">{e.title}</h3>
                  <p className="mt-1 text-petrol/70">{e.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link href="/media" className="link-u mt-10 inline-block">صور الفعاليات في المركز الإعلامي</Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
