import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CenterCircle } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="relative grid min-h-[80svh] place-items-center overflow-hidden bg-ink px-5 text-center text-white">
        <CenterCircle className="pointer-events-none absolute inset-0 m-auto size-[620px] text-teal/20" />
        <div className="relative pt-20">
          <p className="num text-7xl font-bold text-teal">404</p>
          <h1 className="t-h2 mt-4">الكرة خرجت خارج الملعب</h1>
          <p className="mt-3 text-white/70">الصفحة التي تبحث عنها غير موجودة أو نُقلت.</p>
          <Link href="/" className="btn btn-primary mt-8">العودة للرئيسية</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
