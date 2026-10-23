import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="sr-only z-[60] rounded bg-teal px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:right-4 focus:top-4">
        تخطَّ إلى المحتوى
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
