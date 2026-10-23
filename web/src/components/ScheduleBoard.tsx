"use client";

import { useState } from "react";
import { days, sessions, slots, type Session } from "@/content/academy";

const groups = ["الكل", "البراعم", "الأشبال", "الناشئون", "الواعدون", "حراسة المرمى", "الحصة التعليمية"];

const slotIndex = (from: string) => (from === "4:30" ? 0 : from === "5:45" ? 1 : 2);

function Cell({ s, dim }: { s: Session; dim: boolean }) {
  const tone =
    s.kind === "تعليم" ? "bg-foam text-petrol" : s.kind === "حراسة" ? "bg-petrol text-white" : "bg-white text-petrol ring-1 ring-petrol/10";
  return (
    <div className={`rounded-[4px] p-3.5 transition-opacity ${tone} ${dim ? "opacity-25" : ""}`}>
      <p className="font-display font-bold">{s.group}</p>
      <p className="num mt-0.5 text-sm opacity-75" dir="ltr">
        {s.from} – {s.to} م
      </p>
    </div>
  );
}

export default function ScheduleBoard() {
  const [g, setG] = useState("الكل");
  const match = (s: Session) => g === "الكل" || s.group === g;

  return (
    <div>
      <div role="group" aria-label="تصفية حسب الفئة" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
        {groups.map((x) => (
          <button
            key={x}
            type="button"
            aria-pressed={g === x}
            onClick={() => setG(x)}
            className={`shrink-0 rounded-[3px] px-4 py-2 text-sm font-semibold transition-colors ${
              g === x ? "bg-petrol text-white" : "bg-white text-petrol ring-1 ring-petrol/15 hover:ring-petrol/40"
            }`}
          >
            {x}
          </button>
        ))}
      </div>

      {/* شبكة الأسبوع للشاشات الكبيرة */}
      <div className="mt-8 hidden overflow-hidden rounded-[6px] bg-mist/60 p-3 md:block">
        <table className="w-full table-fixed border-separate border-spacing-2">
          <caption className="sr-only">الجدول الأسبوعي للتدريب</caption>
          <thead>
            <tr>
              <th scope="col" className="w-28 text-right text-sm font-semibold text-petrol/60">الوقت</th>
              {days.map((d) => (
                <th key={d} scope="col" className="pb-1 text-right font-display text-lg font-bold">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slots.map((sl, i) => (
              <tr key={sl.from}>
                <th scope="row" className="num align-top pt-3 text-right text-sm font-semibold text-petrol/60">
                  <span dir="ltr">{sl.from} م</span>
                </th>
                {days.map((d) => {
                  const s = sessions.find((x) => x.day === d && slotIndex(x.from) === i);
                  return (
                    <td key={d} className="align-top">
                      {s ? <Cell s={s} dim={!match(s)} /> : <div className="h-full min-h-[76px] rounded-[4px] border border-dashed border-petrol/12" />}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* الجوال: قائمة حسب اليوم */}
      <div className="mt-8 space-y-6 md:hidden">
        {days.map((d) => {
          const list = sessions.filter((s) => s.day === d && match(s));
          if (!list.length) return null;
          return (
            <div key={d}>
              <p className="font-display text-lg font-bold">{d}</p>
              <div className="mt-3 grid gap-2">
                {list.map((s) => (
                  <Cell key={s.group + s.from} s={s} dim={false} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
