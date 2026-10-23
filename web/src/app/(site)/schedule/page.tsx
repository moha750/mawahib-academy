import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, MapPin, Sun } from "lucide-react";
import ScheduleBoard from "@/components/ScheduleBoard";
import { PageHero } from "@/components/ui";
import { CtaBand } from "@/components/cards";

export const metadata: Metadata = { title: "الجدول الأسبوعي" };

export default function SchedulePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "البرامج" }, { label: "الجدول الأسبوعي" }]}
        title="مواعيد التدريب لكل فئة"
        lead="التدريبات مسائية من الأحد إلى الخميس، بعد انتهاء اليوم الدراسي. اختر فئة ابنك لعرض مواعيدها فقط."
      />
      <section className="sec">
        <div className="wrap">
          <ScheduleBoard />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-[4px] bg-petrol/12 md:grid-cols-3">
            <li className="bg-paper p-6">
              <CalendarDays className="size-6 text-teal-dark" aria-hidden="true" />
              <p className="mt-3 font-display font-bold">الموسم التدريبي</p>
              <p className="mt-1 text-petrol/70">من بداية العام الدراسي حتى نهايته، مع معسكرات في الإجازات.</p>
            </li>
            <li className="bg-paper p-6">
              <Sun className="size-6 text-teal-dark" aria-hidden="true" />
              <p className="mt-3 font-display font-bold">مواعيد الصيف ورمضان</p>
              <p className="mt-1 text-petrol/70">تتأخر المواعيد في الصيف ورمضان مراعاةً للحرارة والصيام، ويُبلَّغ بها أولياء الأمور مسبقًا.</p>
            </li>
            <li className="bg-paper p-6">
              <MapPin className="size-6 text-teal-dark" aria-hidden="true" />
              <p className="mt-3 font-display font-bold">مكان التدريب</p>
              <p className="mt-1 text-petrol/70">في الأحساء، ويُرسَل موقع الملعب لولي الأمر عند قبول التسجيل.</p>
            </li>
          </ul>
          <p className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            <Link href="/programs" className="link-u">البرامج والفئات</Link>
            <Link href="/fees" className="link-u">الرسوم والاشتراكات</Link>
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
