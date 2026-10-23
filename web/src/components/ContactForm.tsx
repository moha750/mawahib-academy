"use client";

import { useEffect, useState } from "react";
import { CircleCheck } from "lucide-react";

const topics: Record<string, string> = {
  general: "استفسار عام",
  register: "التسجيل والبرامج",
  partnership: "الشراكات والرعاية",
  media: "المركز الإعلامي",
  careers: "العمل في الأكاديمية",
  scouting: "الأندية والكشافون",
  feedback: "رأي واقتراح",
};

export default function ContactForm() {
  const [topic, setTopic] = useState("general");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [err, setErr] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const t = q.get("topic");
    if (t && topics[t]) setTopic(t);
    const tier = q.get("tier");
    if (tier) setMessage(`نرغب في معرفة تفاصيل فئة: ${tier}`);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const x: Record<string, string> = {};
    if (name.trim().length < 3) x.name = "اكتب اسمك.";
    if (!/^05\d{8}$/.test(phone.replace(/\s/g, ""))) x.phone = "رقم الجوال يبدأ بـ 05 ويتكون من 10 أرقام.";
    if (message.trim().length < 10) x.message = "اكتب رسالتك في سطر على الأقل.";
    setErr(x);
    if (!Object.keys(x).length) setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-[6px] bg-white p-8 text-center ring-1 ring-petrol/8 md:p-12">
        <CircleCheck className="mx-auto size-12 text-teal-dark" aria-hidden="true" />
        <p className="t-h3 mt-5">وصلت رسالتك</p>
        <p className="mt-2 text-petrol/70">نرد عليك خلال أوقات العمل على الرقم الذي أرسلته.</p>
        <p className="mt-6 text-sm text-petrol/50">نسخة عرض: لا تُرسل الرسائل في هذه المرحلة.</p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={submit} className="grid gap-6 rounded-[6px] bg-white p-6 ring-1 ring-petrol/8 md:grid-cols-2 md:p-9">
      <div className="md:col-span-2">
        <label htmlFor="topic" className="mb-2 block font-display text-[0.95rem] font-semibold">الموضوع</label>
        <select id="topic" className="field" value={topic} onChange={(e) => setTopic(e.target.value)}>
          {Object.entries(topics).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="cname" className="mb-2 block font-display text-[0.95rem] font-semibold">الاسم</label>
        <input id="cname" className="field" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        {err.name && <p className="mt-1.5 text-sm text-[#b42318]">{err.name}</p>}
      </div>
      <div>
        <label htmlFor="cphone" className="mb-2 block font-display text-[0.95rem] font-semibold">رقم الجوال</label>
        <input id="cphone" type="tel" inputMode="numeric" dir="ltr" className="field text-right" placeholder="05XXXXXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
        {err.phone && <p className="mt-1.5 text-sm text-[#b42318]">{err.phone}</p>}
      </div>
      <div className="md:col-span-2">
        <label htmlFor="cmsg" className="mb-2 block font-display text-[0.95rem] font-semibold">الرسالة</label>
        <textarea id="cmsg" rows={5} className="field" value={message} onChange={(e) => setMessage(e.target.value)} />
        {err.message && <p className="mt-1.5 text-sm text-[#b42318]">{err.message}</p>}
      </div>
      <div className="md:col-span-2">
        <button type="submit" className="btn btn-dark">أرسل الرسالة</button>
      </div>
    </form>
  );
}
