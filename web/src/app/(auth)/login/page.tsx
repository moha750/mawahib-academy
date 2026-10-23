import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import LoginForm from "@/components/LoginForm";
import { CenterCircle, Duo } from "@/components/ui";

export const metadata: Metadata = { title: "تسجيل الدخول" };

const portal = [
  { who: "ولي الأمر", what: "الحضور وتقارير الأداء والمدفوعات" },
  { who: "اللاعب", what: "الجدول وتقييمه ونجوم الأسبوع" },
  { who: "المدرب", what: "تحضير الحصص وتقييم اللاعبين" },
  { who: "الإدارة", what: "التسجيل والاشتراكات والإشراف" },
];

export default function LoginPage() {
  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      {/* النموذج */}
      <div className="flex flex-col px-5 py-8 md:px-12 lg:px-16">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/brand/logo-192.webp" alt="" width={44} height={44} className="size-11 rounded-full" />
            <span className="font-display font-bold">مواهب الأحساء</span>
          </Link>
          <Link href="/" className="flex items-center gap-1.5 text-sm font-semibold text-petrol/70 hover:text-petrol">
            <ArrowRight className="size-4" aria-hidden="true" />
            الموقع
          </Link>
        </div>
        <div className="mx-auto flex w-full max-w-[440px] flex-1 flex-col justify-center py-14">
          <h1 className="t-h1">مرحبًا بعودتك</h1>
          <p className="mt-3 text-petrol/70">ادخل إلى بوابة الأكاديمية لمتابعة اللاعب وجدوله وتقاريره.</p>
          <div className="mt-10">
            <LoginForm />
          </div>
        </div>
        <p className="text-center text-sm text-petrol/45">© {new Date().getFullYear()} أكاديمية مواهب الأحساء</p>
      </div>

      {/* الجانب البصري */}
      <div className="relative hidden overflow-hidden bg-ink text-white lg:block">
        <Duo src="/images/g-gk-catch.jpg" alt="" className="absolute! inset-0 opacity-60" sizes="50vw" position="40% 50%" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
        <CenterCircle className="pointer-events-none absolute -right-40 -top-40 size-[640px] text-teal/30" />
        <div className="relative flex h-full flex-col justify-end p-14">
          <p className="max-w-[18ch] font-display text-4xl font-bold leading-[1.35]">بوابة واحدة لكل من يرافق اللاعب</p>
          <ul className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[4px] bg-white/10">
            {portal.map((p) => (
              <li key={p.who} className="bg-ink/80 p-5 backdrop-blur-sm">
                <p className="font-display font-bold text-teal">{p.who}</p>
                <p className="mt-1 text-sm leading-6 text-white/70">{p.what}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
