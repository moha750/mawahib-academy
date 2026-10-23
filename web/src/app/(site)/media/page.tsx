import type { Metadata } from "next";
import Link from "next/link";
import MediaTabs from "@/components/MediaTabs";
import { PageHero } from "@/components/ui";
import { site } from "@/content/site";
import { TikTokIcon, InstagramIcon } from "@/components/icons";

export const metadata: Metadata = { title: "المركز الإعلامي" };

export default function MediaPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "المركز الإعلامي" }]}
        title="المركز الإعلامي"
        lead="أخبار الأكاديمية وصورها ومقاطعها، من الحصص اليومية إلى الانتقالات والمهرجانات."
      >
        <div className="flex flex-wrap gap-3">
          <a href={site.social.tiktok} target="_blank" rel="noreferrer" className="btn btn-line-light min-h-11 px-4 text-sm">
            <TikTokIcon className="size-4" /> تيك توك
          </a>
          <a href={site.social.instagram} target="_blank" rel="noreferrer" className="btn btn-line-light min-h-11 px-4 text-sm">
            <InstagramIcon className="size-4" /> إنستغرام
          </a>
        </div>
      </PageHero>
      <section className="sec">
        <div className="wrap">
          <MediaTabs />
        </div>
      </section>
      <section className="bg-white">
        <div className="wrap grid gap-6 py-16 md:grid-cols-12 md:items-center">
          <div className="md:col-span-8">
            <h2 className="t-h2">للإعلاميين</h2>
            <p className="t-lead mt-3 text-petrol/70">لطلب صور عالية الدقة أو ترتيب مقابلة مع الجهاز الفني، تواصل مع المركز الإعلامي.</p>
          </div>
          <div className="md:col-span-4 md:text-left">
            <Link href="/contact?topic=media" className="btn btn-dark">تواصل مع المركز الإعلامي</Link>
          </div>
        </div>
      </section>
    </>
  );
}
