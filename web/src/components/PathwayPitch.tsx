"use client";

import { useEffect, useRef, useState } from "react";
import { pathway } from "@/content/academy";

// مواضع المحطات على الملعب (من اليمين إلى اليسار، باتجاه القراءة)
const points = [
  { x: 1080, y: 236 },
  { x: 840, y: 150 },
  { x: 600, y: 300 },
  { x: 360, y: 160 },
  { x: 120, y: 236 },
];

const runPath =
  "M1170 236 C 1130 236, 1110 236, 1080 236 S 900 150, 840 150 S 660 300, 600 300 S 420 160, 360 160 S 170 236, 120 236 L 22 236";

export default function PathwayPitch({ detailed = false }: { detailed?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={drawn ? "is-drawn" : ""}>
      {/* الشاشات الكبيرة: ملعب أفقي */}
      <div className="hidden md:block">
        <div className="overflow-hidden rounded-[4px] bg-deep">
          <svg viewBox="0 0 1200 472" className="block h-auto w-full" role="img" aria-label="مسار اللاعب على الملعب من تجربة الأداء حتى الأندية">
            <defs>
              <mask id="run-reveal" maskUnits="userSpaceOnUse">
                <path d={runPath} stroke="white" strokeWidth="10" fill="none" className="run-mask" />
              </mask>
            </defs>
            {/* خطوط القص في العشب */}
            {Array.from({ length: 10 }).map((_, i) => (
              <rect key={i} x={i * 120} y="0" width="120" height="472" fill={i % 2 ? "rgb(255 255 255 / 0.025)" : "transparent"} />
            ))}
            <g className="text-white/25" strokeWidth="1.5">
              <rect x="16" y="16" width="1168" height="440" className="pitch-line" />
              <line x1="600" y1="16" x2="600" y2="456" className="pitch-line" />
              <circle cx="600" cy="236" r="74" className="pitch-line" />
              {/* منطقة الجزاء اليمنى (منطقتنا) */}
              <rect x="1012" y="110" width="172" height="252" className="pitch-line" />
              <rect x="1126" y="176" width="58" height="120" className="pitch-line" />
              <path d="M1012 196 A 62 62 0 0 0 1012 276" className="pitch-line" />
              {/* منطقة الجزاء اليسرى (الهدف) */}
              <rect x="16" y="110" width="172" height="252" className="pitch-line" />
              <rect x="16" y="176" width="58" height="120" className="pitch-line" />
              <path d="M188 196 A 62 62 0 0 1 188 276" className="pitch-line" />
            </g>
            {/* المرمى الهدف */}
            <rect x="4" y="206" width="12" height="60" fill="none" stroke="#40b3ae" strokeWidth="2" />

            <path d={runPath} fill="none" stroke="#40b3ae" strokeWidth="3" strokeLinecap="round" className="run-path" mask="url(#run-reveal)" />

            <g>
              {points.map((p, i) => (
                <g key={i} className="stage-dot">
                  <circle cx={p.x} cy={p.y} r="27" fill="#062830" stroke="#40b3ae" strokeWidth="2.5" />
                  <text x={p.x} y={p.y + 8} textAnchor="middle" fill="#fff" fontSize="24" fontWeight="700" style={{ fontFamily: "var(--font-display)" }}>
                    {i + 1}
                  </text>
                </g>
              ))}
            </g>
          </svg>
        </div>
        <ol className="mt-8 grid grid-cols-5 gap-6">
          {pathway.map((s) => (
            <li key={s.title} className="border-t border-white/15 pt-5">
              <p className="font-display text-xl font-bold">{s.title}</p>
              <p className="mt-1 text-sm font-semibold text-teal">{s.stage}</p>
              <p className="mt-3 text-[0.95rem] leading-7 text-white/70">{s.text}</p>
              {detailed && (
                <ul className="mt-4 space-y-1.5 text-sm text-white/60">
                  {s.details.map((d) => (
                    <li key={d} className="flex gap-2">
                      <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-teal" />
                      {d}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>

      {/* الجوال: مسار عمودي */}
      <ol className="relative md:hidden">
        <span aria-hidden="true" className="absolute bottom-6 right-[23px] top-6 border-r-2 border-dashed border-teal/60" />
        {pathway.map((s, i) => (
          <li key={s.title} className="relative flex gap-5 pb-9 last:pb-0">
            <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full border-2 border-teal bg-ink font-display text-lg font-bold">
              {i + 1}
            </span>
            <div className="pt-1">
              <p className="font-display text-xl font-bold">{s.title}</p>
              <p className="text-sm font-semibold text-teal">{s.stage}</p>
              <p className="mt-2 leading-7 text-white/70">{s.text}</p>
              {detailed && (
                <ul className="mt-3 space-y-1 text-sm text-white/60">
                  {s.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
