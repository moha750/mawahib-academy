"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Eye, EyeOff, Info } from "lucide-react";

const roles = [
  { id: "parent", label: "ولي أمر", idLabel: "رقم الجوال", hint: "05XXXXXXXX" },
  { id: "player", label: "لاعب", idLabel: "رقم اللاعب", hint: "MW-0000" },
  { id: "coach", label: "مدرب", idLabel: "رقم الجوال", hint: "05XXXXXXXX" },
  { id: "admin", label: "الإدارة", idLabel: "البريد الإلكتروني", hint: "name@alhasatalents.sa" },
] as const;

export default function LoginForm() {
  const [role, setRole] = useState<(typeof roles)[number]["id"]>("parent");
  const [mode, setMode] = useState<"password" | "otp">("password");
  const [otpSent, setOtpSent] = useState(false);
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [code, setCode] = useState(["", "", "", ""]);
  const [msg, setMsg] = useState<{ tone: "err" | "info"; text: string } | null>(null);
  const codeRefs = useRef<(HTMLInputElement | null)[]>([]);

  const r = roles.find((x) => x.id === role)!;
  const canOtp = role === "parent" || role === "coach";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id.trim()) return setMsg({ tone: "err", text: `اكتب ${r.idLabel}.` });
    if (mode === "password") {
      if (pw.length < 6) return setMsg({ tone: "err", text: "كلمة المرور 6 أحرف على الأقل." });
      return setMsg({ tone: "info", text: "نسخة عرض: بوابة الأعضاء ستُربط بالنظام في المرحلة القادمة." });
    }
    if (!otpSent) {
      setOtpSent(true);
      setMsg(null);
      setTimeout(() => codeRefs.current[0]?.focus(), 50);
      return;
    }
    if (code.join("").length < 4) return setMsg({ tone: "err", text: "اكتب الرمز المكون من 4 أرقام." });
    setMsg({ tone: "info", text: "نسخة عرض: بوابة الأعضاء ستُربط بالنظام في المرحلة القادمة." });
  };

  const setDigit = (i: number, v: string) => {
    const d = v.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[i] = d;
    setCode(next);
    if (d && i < 3) codeRefs.current[i + 1]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="نوع الحساب" className="grid grid-cols-4 gap-1 rounded-[6px] bg-mist p-1">
        {roles.map((x) => (
          <button
            key={x.id}
            type="button"
            role="tab"
            aria-selected={role === x.id}
            onClick={() => {
              setRole(x.id);
              setMsg(null);
              setOtpSent(false);
              if (x.id === "player" || x.id === "admin") setMode("password");
            }}
            className={`rounded-[4px] py-2.5 text-[0.9rem] font-semibold transition-colors ${
              role === x.id ? "bg-white text-petrol shadow-sm" : "text-petrol/60 hover:text-petrol"
            }`}
          >
            {x.label}
          </button>
        ))}
      </div>

      <form noValidate onSubmit={submit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="login-id" className="mb-2 block font-display text-[0.95rem] font-semibold">{r.idLabel}</label>
          <input
            id="login-id"
            dir="ltr"
            className="field text-right"
            placeholder={r.hint}
            value={id}
            onChange={(e) => setId(e.target.value)}
            inputMode={r.idLabel === "رقم الجوال" ? "numeric" : undefined}
            autoComplete="username"
          />
        </div>

        {mode === "password" && (
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="login-pw" className="font-display text-[0.95rem] font-semibold">كلمة المرور</label>
              <button type="button" className="text-sm font-semibold text-teal-dark hover:underline" onClick={() => setMsg({ tone: "info", text: "سيصلك رابط استعادة كلمة المرور على جوالك المسجل." })}>
                نسيت كلمة المرور؟
              </button>
            </div>
            <div className="relative">
              <input
                id="login-pw"
                type={show ? "text" : "password"}
                dir="ltr"
                className="field pl-12 text-right"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                aria-label={show ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                className="absolute left-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-[3px] text-petrol/55 hover:text-petrol"
              >
                {show ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>
          </div>
        )}

        {mode === "otp" && otpSent && (
          <div>
            <p className="mb-2 font-display text-[0.95rem] font-semibold">رمز التحقق</p>
            <div className="flex gap-3" dir="ltr">
              {code.map((c, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    codeRefs.current[i] = el;
                  }}
                  aria-label={`الرقم ${i + 1} من رمز التحقق`}
                  inputMode="numeric"
                  maxLength={1}
                  className="field num h-14 w-14 text-center text-xl font-bold"
                  value={c}
                  onChange={(e) => setDigit(i, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !code[i] && i > 0) codeRefs.current[i - 1]?.focus();
                  }}
                />
              ))}
            </div>
            <p className="mt-2 text-sm text-petrol/55">أرسلنا الرمز إلى {id || "جوالك"} برسالة نصية.</p>
          </div>
        )}

        {mode === "password" && (
          <label className="flex cursor-pointer items-center gap-2.5 text-[0.95rem] text-petrol/80">
            <input type="checkbox" className="size-4 accent-[#1b7571]" />
            تذكرني على هذا الجهاز
          </label>
        )}

        {msg && (
          <p
            role={msg.tone === "err" ? "alert" : "status"}
            className={`flex items-start gap-2.5 rounded-[4px] px-4 py-3 text-[0.95rem] ${
              msg.tone === "err" ? "bg-[#fef3f2] text-[#b42318]" : "bg-foam text-petrol"
            }`}
          >
            <Info className="mt-1 size-4 shrink-0" aria-hidden="true" />
            {msg.text}
          </p>
        )}

        <button type="submit" className="btn btn-dark w-full">
          {mode === "otp" ? (otpSent ? "تأكيد الرمز" : "أرسل رمز التحقق") : "دخول"}
        </button>

        {canOtp && (
          <button
            type="button"
            onClick={() => {
              setMode(mode === "password" ? "otp" : "password");
              setOtpSent(false);
              setMsg(null);
            }}
            className="btn btn-line w-full"
          >
            {mode === "password" ? "الدخول برمز تحقق على الجوال" : "الدخول بكلمة المرور"}
          </button>
        )}
      </form>

      <p className="mt-8 text-center text-[0.95rem] text-petrol/70">
        ليس لديك حساب؟{" "}
        <Link href="/register" className="font-semibold text-teal-dark hover:underline">سجّل ابنك أولًا</Link>
      </p>
    </div>
  );
}
