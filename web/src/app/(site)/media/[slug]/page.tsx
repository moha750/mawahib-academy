import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { news } from "@/content/academy";
import { Duo, Tag } from "@/components/ui";
import { NewsCard } from "@/components/cards";
import { WhatsAppIcon } from "@/components/icons";

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);
  return { title: item?.title ?? "خبر", description: item?.excerpt };
}

export default async function NewsArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);
  if (!item) notFound();
  const others = news.filter((n) => n.slug !== slug).slice(0, 3);
  const share = `https://wa.me/?text=${encodeURIComponent(item.title)}`;

  return (
    <>
      <section className="bg-ink text-white">
        <div className="wrap pb-14 pt-32 md:pb-16 md:pt-40">
          <nav aria-label="مسار التصفح" className="mb-6 text-sm text-white/60">
            <Link href="/" className="hover:text-teal">الرئيسية</Link>
            <span aria-hidden="true" className="mx-2 text-white/30">/</span>
            <Link href="/media" className="hover:text-teal">المركز الإعلامي</Link>
          </nav>
          <div className="flex items-center gap-3 text-sm text-white/60">
            <Tag tone="light">{item.category}</Tag>
            {item.date}
          </div>
          <h1 className="t-h1 mt-4 max-w-[22ch]">{item.title}</h1>
          <p className="t-lead mt-5 max-w-[56ch] text-white/75">{item.excerpt}</p>
        </div>
      </section>

      <article className="pb-20">
        <div className="wrap">
          <Duo src={item.image} alt="" soft priority className="-mt-px aspect-[16/8] rounded-b-[3px]" sizes="100vw" />
          <div className="mx-auto mt-12 max-w-[68ch]">
            <div className="space-y-6 text-[1.125rem] leading-[2.05] text-petrol/85">
              {item.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-petrol/12 pt-6">
              <Link href="/media" className="link-u">كل الأخبار</Link>
              <a href={share} target="_blank" rel="noreferrer" className="btn btn-line min-h-11 px-4 text-sm">
                <WhatsAppIcon className="size-4" />
                شارك الخبر
              </a>
            </div>
          </div>
        </div>
      </article>

      <section className="sec bg-white">
        <div className="wrap">
          <h2 className="t-h2">أخبار أخرى</h2>
          <div className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-3">
            {others.map((n) => (
              <NewsCard key={n.slug} item={n} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
