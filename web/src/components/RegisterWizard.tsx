"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Check, CircleCheck } from "lucide-react";
import { programs } from "@/content/academy";
import { site } from "@/content/site";

const SEASON_YEAR = 2026;

const steps = ["بيانات اللاعب", "ولي الأمر", "البرنامج والموعد", "المراجعة والإرسال"];
const districts = ["الهفوف", "المبرز", "العيون", "الجفر", "العمران", "الطرف", "القرى الشرقية", "أخرى"];
const positions = ["حارس مرمى", "مدافع", "وسط", "مهاجم", "لم يحدد بعد"];
const feet = ["اليمنى", "اليسرى", "كلتاهما"];
const relations = ["الأب", "الأم", "الأخ", "أخرى"];
const trialDays = ["الأحد", "الثلاثاء", "الأربعاء"];

type Form = {
  playerName: string;
  birthDate: string;
  district: string;
  school: string;
  position: string;
  foot: string;
  experience: string;
  parentName: string;
  relation: string;
  phone: string;
  email: string;
  requestType: string;
  program: string;
  goalkeeping: boolean;
  trialDay: string;
  health: string;
  notes: string;
  consent: boolean;
};

const empty: Form = {
  playerName: "",
  birthDate: "",
  district: "",
  school: "",
  position: "",
  foot: "",
  experience: "",
  parentName: "",
  relation: "",
  phone: "",
  email: "",
  requestType: "تجربة أداء",
  program: "",
  goalkeeping: false,
  trialDay: "",
  health: "",
  notes: "",
  consent: false,
};

function ageFrom(date: string) {
  if (!date) return null;
  const y = Number(date.slice(0, 4));
  return Number.isFinite(y) ? SEASON_YEAR - y : null;
}

function Label({ htmlFor, children, optional }: { htmlFor?: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block font-display text-[0.95rem] font-semibold">
      {children}
      {optional && <span className="mr-1.5 text-sm font-normal text-petrol/50">(اختياري)</span>}
    </label>
  );
}

function Err({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1.5 text-sm text-[#b42318]">{msg}</p>;
}

function Choice({
  name,
  options,
  value,
  onChange,
  cols = "sm:grid-cols-3",
}: {
  name: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  cols?: string;
}) {
  return (
    <div role="radiogroup" aria-label={name} className={`grid grid-cols-2 gap-2 ${cols}`}>
      {options.map((o) => {
        const on = value === o;
        return (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(o)}
            className={`flex min-h-[52px] items-center justify-between gap-2 rounded-[4px] px-4 text-right text-[0.95rem] font-semibold transition-colors ${
              on ? "bg-petrol text-white" : "bg-white ring-[1.5px] ring-petrol/15 hover:ring-petrol/35"
            }`}
          >
            {o}
            {on && <Check className="size-4 text-teal" aria-hidden="true" />}
          </button>
        );
      })}
    </div>
  );
}

export default function RegisterWizard() {
  const [step, setStep] = useState(0);
  const [f, setF] = useState<Form>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [done, setDone] = useState<string | null>(null);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const p = q.get("program");
    if (p === "goalkeeping") setF((x) => ({ ...x, goalkeeping: true }));
    else if (p && programs.some((x) => x.slug === p)) setF((x) => ({ ...x, program: p }));
    const ev = q.get("event");
    if (ev) setF((x) => ({ ...x, notes: `أرغب في التسجيل في: ${ev}` }));
    const plan = q.get("plan");
    if (plan) setF((x) => ({ ...x, requestType: "تسجيل مباشر", notes: `الباقة المفضلة: ${plan}` }));
  }, []);

  const age = ageFrom(f.birthDate);
  const suggested = useMemo(() => (age === null ? null : programs.find((p) => age >= p.minAge && age <= p.maxAge) ?? null), [age]);

  useEffect(() => {
    if (suggested && !f.program) setF((x) => ({ ...x, program: suggested.slug }));
      }, [suggested]);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => {
    setF((x) => ({ ...x, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = (s: number) => {
    const e: Partial<Record<keyof Form, string>> = {};
    if (s === 0) {
      if (f.playerName.trim().split(/\s+/).length < 2) e.playerName = "اكتب اسم اللاعب الثلاثي أو الثنائي على الأقل.";
      if (!f.birthDate) e.birthDate = "حدد تاريخ ميلاد اللاعب.";
      else if (age !== null && (age < 6 || age > 16)) e.birthDate = "تستقبل الأكاديمية الأعمار من 6 إلى 16 سنة.";
      if (!f.district) e.district = "اختر الحي أو المدينة.";
      if (!f.position) e.position = "اختر مركزًا، أو «لم يحدد بعد».";
    }
    if (s === 1) {
      if (f.parentName.trim().length < 3) e.parentName = "اكتب اسم ولي الأمر.";
      if (!f.relation) e.relation = "حدد صلة القرابة.";
      if (!/^05\d{8}$/.test(f.phone.replace(/\s/g, ""))) e.phone = "رقم الجوال يبدأ بـ 05 ويتكون من 10 أرقام.";
      if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) e.email = "تحقق من صيغة البريد الإلكتروني.";
    }
    if (s === 2) {
      if (!f.program) e.program = "اختر الفئة.";
      if (f.requestType === "تجربة أداء" && !f.trialDay) e.trialDay = "اختر يومًا لتجربة الأداء.";
    }
    if (s === 3) {
      if (!f.consent) e.consent = "يلزم الموافقة على الشروط لإرسال الطلب.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate(step)) return;
    if (step < steps.length - 1) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setDone(`MW-${SEASON_YEAR}-${String(Math.floor(1000 + Math.random() * 8999))}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const programName = programs.find((p) => p.slug === f.program)?.name ?? "";

  if (done) {
    return (
      <div className="mx-auto max-w-2xl rounded-[6px] bg-white p-8 text-center shadow-[0_30px_70px_-40px_rgb(6_40_48/0.45)] ring-1 ring-petrol/8 md:p-12">
        <CircleCheck className="mx-auto size-14 text-teal-dark" aria-hidden="true" />
        <h2 className="t-h2 mt-6">وصل طلبك</h2>
        <p className="t-lead mt-4 text-petrol/75">
          سنتواصل مع {f.parentName || "ولي الأمر"} على الرقم <span dir="ltr" className="num">{f.phone}</span> لتأكيد موعد
          {f.requestType === "تجربة أداء" ? " تجربة الأداء" : " بدء التدريب"}.
        </p>
        <p className="mt-8 inline-flex items-center gap-3 rounded-[4px] bg-paper px-5 py-3">
          <span className="text-sm text-petrol/60">رقم الطلب</span>
          <span className="num text-lg font-bold" dir="ltr">{done}</span>
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-dark">العودة للرئيسية</Link>
          <a href={site.whatsapp} target="_blank" rel="noreferrer" className="btn btn-line">تواصل عبر واتساب</a>
        </div>
        <p className="mt-8 text-sm text-petrol/50">نسخة عرض: لا تُحفظ البيانات في هذه المرحلة.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      {/* مؤشر الخطوات */}
      <aside className="lg:col-span-3">
        <ol className="flex gap-2 lg:sticky lg:top-28 lg:flex-col lg:gap-0">
          {steps.map((s, i) => {
            const state = i < step ? "done" : i === step ? "current" : "todo";
            return (
              <li key={s} className="flex flex-1 items-center gap-3 lg:relative lg:pb-8 lg:last:pb-0">
                {i < steps.length - 1 && (
                  <span aria-hidden="true" className={`absolute right-[15px] top-9 hidden h-[calc(100%-2.5rem)] w-px lg:block ${i < step ? "bg-teal" : "bg-petrol/15"}`} />
                )}
                <span
                  className={`num grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold ${
                    state === "done" ? "bg-teal text-ink" : state === "current" ? "bg-petrol text-white" : "bg-white text-petrol/50 ring-1 ring-petrol/15"
                  }`}
                  aria-current={state === "current" ? "step" : undefined}
                >
                  {state === "done" ? <Check className="size-4" aria-hidden="true" /> : i + 1}
                </span>
                <span className={`hidden font-display font-semibold lg:inline ${state === "todo" ? "text-petrol/45" : ""}`}>{s}</span>
              </li>
            );
          })}
        </ol>
      </aside>

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          next();
        }}
        className="rounded-[6px] bg-white p-6 shadow-[0_30px_70px_-40px_rgb(6_40_48/0.35)] ring-1 ring-petrol/8 md:p-10 lg:col-span-9"
      >
        <h2 className="t-h3">{steps[step]}</h2>

        {step === 0 && (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label htmlFor="playerName">اسم اللاعب</Label>
              <input id="playerName" className="field" value={f.playerName} onChange={(e) => set("playerName", e.target.value)} placeholder="مثال: عبدالله محمد الأحمد" autoComplete="off" />
              <Err msg={errors.playerName} />
            </div>
            <div>
              <Label htmlFor="birthDate">تاريخ الميلاد</Label>
              <input id="birthDate" type="date" className="field" value={f.birthDate} onChange={(e) => set("birthDate", e.target.value)} max={`${SEASON_YEAR - 5}-12-31`} />
              <Err msg={errors.birthDate} />
              {suggested && !errors.birthDate && (
                <p className="mt-1.5 text-sm text-teal-dark">الفئة المقترحة: {suggested.name} ({suggested.ages})</p>
              )}
            </div>
            <div>
              <Label htmlFor="district">الحي أو المدينة</Label>
              <select id="district" className="field" value={f.district} onChange={(e) => set("district", e.target.value)}>
                <option value="">اختر</option>
                {districts.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
              <Err msg={errors.district} />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="school" optional>المدرسة</Label>
              <input id="school" className="field" value={f.school} onChange={(e) => set("school", e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <Label>المركز المفضل</Label>
              <Choice name="المركز المفضل" options={positions} value={f.position} onChange={(v) => set("position", v)} cols="sm:grid-cols-5" />
              <Err msg={errors.position} />
            </div>
            <div>
              <Label optional>القدم المفضلة</Label>
              <Choice name="القدم المفضلة" options={feet} value={f.foot} onChange={(v) => set("foot", v)} />
            </div>
            <div>
              <Label optional>لعب في فريق أو أكاديمية من قبل؟</Label>
              <Choice name="الخبرة السابقة" options={["نعم", "لا"]} value={f.experience} onChange={(v) => set("experience", v)} cols="grid-cols-2" />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <Label htmlFor="parentName">اسم ولي الأمر</Label>
              <input id="parentName" className="field" value={f.parentName} onChange={(e) => set("parentName", e.target.value)} autoComplete="name" />
              <Err msg={errors.parentName} />
            </div>
            <div>
              <Label>صلة القرابة</Label>
              <Choice name="صلة القرابة" options={relations} value={f.relation} onChange={(v) => set("relation", v)} cols="sm:grid-cols-4" />
              <Err msg={errors.relation} />
            </div>
            <div>
              <Label htmlFor="phone">رقم الجوال</Label>
              <input id="phone" type="tel" inputMode="numeric" dir="ltr" className="field text-right" value={f.phone} onChange={(e) => set("phone", e.target.value)} placeholder="05XXXXXXXX" autoComplete="tel" />
              <Err msg={errors.phone} />
              {!errors.phone && <p className="mt-1.5 text-sm text-petrol/55">نتواصل معك عليه، ويفضّل أن يكون عليه واتساب.</p>}
            </div>
            <div>
              <Label htmlFor="email" optional>البريد الإلكتروني</Label>
              <input id="email" type="email" dir="ltr" className="field text-right" value={f.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
              <Err msg={errors.email} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="mt-8 grid gap-7">
            <div>
              <Label>نوع الطلب</Label>
              <Choice name="نوع الطلب" options={["تجربة أداء", "تسجيل مباشر"]} value={f.requestType} onChange={(v) => set("requestType", v)} cols="grid-cols-2" />
              <p className="mt-2 text-sm text-petrol/55">تجربة الأداء تحدد المستوى قبل التسجيل، وننصح بها لكل لاعب جديد.</p>
            </div>
            <div>
              <Label>الفئة</Label>
              <div role="radiogroup" aria-label="الفئة" className="grid gap-2 sm:grid-cols-2">
                {programs.map((p) => {
                  const on = f.program === p.slug;
                  return (
                    <button
                      key={p.slug}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => set("program", p.slug)}
                      className={`flex items-center justify-between rounded-[4px] px-4 py-3 text-right transition-colors ${
                        on ? "bg-petrol text-white" : "bg-white ring-[1.5px] ring-petrol/15 hover:ring-petrol/35"
                      }`}
                    >
                      <span>
                        <span className="block font-display font-bold">{p.name}</span>
                        <span className={`text-sm ${on ? "text-white/70" : "text-petrol/60"}`}>{p.ages}</span>
                      </span>
                      {suggested?.slug === p.slug && (
                        <span className={`rounded-[3px] px-2 py-0.5 text-xs font-semibold ${on ? "bg-teal text-ink" : "bg-foam text-teal-dark"}`}>مقترحة لعمره</span>
                      )}
                    </button>
                  );
                })}
              </div>
              <Err msg={errors.program} />
            </div>
            <label className="flex cursor-pointer items-start gap-3 rounded-[4px] bg-paper p-4">
              <input type="checkbox" className="mt-1.5 size-4 accent-[#1b7571]" checked={f.goalkeeping} onChange={(e) => set("goalkeeping", e.target.checked)} />
              <span>
                <span className="block font-display font-semibold">أضف برنامج حراسة المرمى</span>
                <span className="text-sm text-petrol/60">حصتان إضافيتان أسبوعيًا مع مدرب الحراس.</span>
              </span>
            </label>
            {f.requestType === "تجربة أداء" && (
              <div>
                <Label>اليوم المفضل لتجربة الأداء</Label>
                <Choice name="يوم تجربة الأداء" options={trialDays} value={f.trialDay} onChange={(v) => set("trialDay", v)} />
                <Err msg={errors.trialDay} />
              </div>
            )}
            <div>
              <Label htmlFor="health" optional>حالة صحية يجب أن يعرفها المدرب</Label>
              <textarea id="health" rows={3} className="field" value={f.health} onChange={(e) => set("health", e.target.value)} placeholder="مثل الربو أو حساسية أو إصابة سابقة" />
            </div>
            <div>
              <Label htmlFor="notes" optional>ملاحظات</Label>
              <textarea id="notes" rows={2} className="field" value={f.notes} onChange={(e) => set("notes", e.target.value)} />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="mt-8">
            <dl className="grid gap-px overflow-hidden rounded-[4px] bg-petrol/10 sm:grid-cols-2">
              {[
                ["اللاعب", f.playerName],
                ["العمر في الموسم", age !== null ? `${age} سنة` : ""],
                ["الحي", f.district],
                ["المركز", f.position],
                ["ولي الأمر", `${f.parentName}${f.relation ? `، ${f.relation}` : ""}`],
                ["الجوال", f.phone],
                ["الطلب", f.requestType + (f.trialDay ? `، يوم ${f.trialDay}` : "")],
                ["الفئة", programName + (f.goalkeeping ? " + حراسة المرمى" : "")],
              ].map(([k, v]) => (
                <div key={k} className="bg-paper p-4">
                  <dt className="text-sm text-petrol/55">{k}</dt>
                  <dd className="mt-0.5 font-display font-semibold">{v || "—"}</dd>
                </div>
              ))}
            </dl>
            <label className="mt-8 flex cursor-pointer items-start gap-3">
              <input type="checkbox" className="mt-1.5 size-4 accent-[#1b7571]" checked={f.consent} onChange={(e) => set("consent", e.target.checked)} />
              <span className="text-[0.95rem] text-petrol/80">
                أقر بصحة البيانات، وأوافق على شروط التسجيل وعلى تصوير اللاعب في الحصص والمباريات لأغراض التقييم والنشر في
                حسابات الأكاديمية.
              </span>
            </label>
            <Err msg={errors.consent} />
          </div>
        )}

        <div className="mt-10 flex items-center justify-between gap-3 border-t border-petrol/10 pt-6">
          {step > 0 ? (
            <button type="button" onClick={() => setStep(step - 1)} className="btn btn-line">
              السابق
            </button>
          ) : (
            <span />
          )}
          <button type="submit" className="btn btn-dark">
            {step === steps.length - 1 ? "أرسل الطلب" : "التالي"}
          </button>
        </div>
      </form>
    </div>
  );
}
