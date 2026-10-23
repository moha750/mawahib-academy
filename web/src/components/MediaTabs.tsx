"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Images } from "lucide-react";
import { albums, gallery, news, videos } from "@/content/academy";
import { NewsCard, VideoCard } from "./cards";

const tabs = [
  { id: "news", label: "الأخبار" },
  { id: "photos", label: "الصور" },
  { id: "videos", label: "الفيديو" },
] as const;
type TabId = (typeof tabs)[number]["id"];

export default function MediaTabs() {
  const [tab, setTab] = useState<TabId>("news");

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("tab");
    if (t === "photos" || t === "videos" || t === "news") setTab(t);
  }, []);

  const select = (id: TabId) => {
    setTab(id);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", id);
    window.history.replaceState(null, "", url);
  };

  const [lead, ...rest] = news;

  return (
    <div>
      <div role="tablist" aria-label="أقسام المركز الإعلامي" className="flex gap-1 border-b border-petrol/12">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => select(t.id)}
            className={`-mb-px border-b-[3px] px-5 py-3.5 font-display text-lg font-semibold transition-colors ${
              tab === t.id ? "border-teal text-petrol" : "border-transparent text-petrol/50 hover:text-petrol"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="pt-12">
        {tab === "news" && (
          <div>
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <NewsCard item={lead} large />
              </div>
              <ul className="divide-y divide-petrol/12 lg:col-span-4">
                {rest.slice(0, 3).map((n) => (
                  <li key={n.slug} className="py-5 first:pt-0">
                    <NewsCard item={n} compact />
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-16 grid gap-x-6 gap-y-12 border-t border-petrol/12 pt-12 sm:grid-cols-2 lg:grid-cols-3">
              {news.map((n) => (
                <NewsCard key={n.slug} item={n} />
              ))}
            </div>
          </div>
        )}

        {tab === "photos" && (
          <div>
            <ul className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3">
              {albums.map((a) => (
                <li key={a.title}>
                  <div className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[3px] bg-mist">
                      <Image src={a.cover} alt="" fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                      <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-[3px] bg-ink/75 px-2.5 py-1 text-xs font-semibold text-white">
                        <Images className="size-3.5" aria-hidden="true" />
                        <span className="num">{a.count}</span> صورة
                      </span>
                    </div>
                    <p className="mt-3 font-display text-lg font-bold">{a.title}</p>
                  </div>
                </li>
              ))}
            </ul>
            <h3 className="t-h3 mt-16">أحدث الصور</h3>
            <div className="mt-6 columns-2 gap-3 md:columns-3 [&>*]:mb-3">
              {[...gallery, "/images/g-gk-dive.jpg", "/images/g-bw-duel.jpg", "/images/program-ashbal.jpg"].map((src) => (
                <div key={src} className="relative overflow-hidden rounded-[3px] bg-mist">
                  <Image src={src} alt="" width={800} height={600} sizes="(min-width: 768px) 33vw, 50vw" className="h-auto w-full" />
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "videos" && (
          <ul className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {videos.map((v) => (
              <li key={v.title}>
                <VideoCard {...v} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
