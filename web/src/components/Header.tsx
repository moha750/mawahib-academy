"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogIn, Menu, X } from "lucide-react";
import { navGroups, navSingles, site } from "@/content/site";

export default function Header() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(null);
    setDrawer(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setDrawer(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
  }, [drawer]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const groupActive = (label: string) =>
    navGroups.find((g) => g.label === label)?.links.some((l) => isActive(l.href)) ?? false;

  const enter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(label);
  };
  const leave = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 160);
  };

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 text-white transition-[background-color,box-shadow] duration-300 ${
        solid || drawer ? "bg-ink/95 shadow-[0_1px_0_rgb(255_255_255/0.08)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="wrap flex h-[76px] items-center justify-between gap-6">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label={`${site.name}، الصفحة الرئيسية`}>
          <Image src="/brand/logo-192.webp" alt="" width={48} height={48} className="size-12 rounded-full" priority />
          <span className="font-display text-[1.05rem] font-bold leading-tight">
            <span className="block">مواهب الأحساء</span>
            <span className="block text-[0.72rem] font-medium text-white/60">أكاديمية كرة القدم</span>
          </span>
        </Link>

        <nav ref={navRef} aria-label="القائمة الرئيسية" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navGroups.map((g) => (
              <li key={g.label} className="relative" onMouseEnter={() => enter(g.label)} onMouseLeave={leave}>
                <button
                  type="button"
                  aria-expanded={open === g.label}
                  aria-controls={`menu-${g.label}`}
                  onClick={() => setOpen(open === g.label ? null : g.label)}
                  className={`flex items-center gap-1.5 rounded-[3px] px-3.5 py-2 font-display text-[0.95rem] font-medium transition-colors hover:text-teal ${
                    groupActive(g.label) ? "text-teal" : "text-white/90"
                  }`}
                >
                  {g.label}
                  <ChevronDown className={`size-4 transition-transform ${open === g.label ? "rotate-180" : ""}`} />
                </button>
                <div
                  id={`menu-${g.label}`}
                  className={`absolute right-0 top-full pt-3 transition-[opacity,transform] duration-200 ${
                    open === g.label ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
                  }`}
                >
                  <ul className="w-[300px] rounded-[4px] bg-white p-2 text-petrol shadow-[0_24px_60px_-20px_rgb(6_40_48/0.45)]">
                    {g.links.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          className={`block rounded-[3px] px-3.5 py-2.5 transition-colors hover:bg-paper ${
                            isActive(l.href) ? "bg-paper" : ""
                          }`}
                        >
                          <span className="block font-display text-[0.95rem] font-semibold">{l.label}</span>
                          {l.note && <span className="block text-[0.82rem] leading-6 text-petrol/60">{l.note}</span>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
            {navSingles.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`rounded-[3px] px-3.5 py-2 font-display text-[0.95rem] font-medium transition-colors hover:text-teal ${
                    isActive(l.href) ? "text-teal" : "text-white/90"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="hidden items-center gap-2 rounded-[3px] px-3 py-2 font-display text-[0.95rem] font-medium text-white/90 hover:text-teal sm:flex"
          >
            <LogIn className="size-[18px] -scale-x-100" aria-hidden="true" />
            دخول
          </Link>
          <Link href="/register" className="btn btn-primary hidden min-h-11 px-5 text-[0.95rem] sm:inline-flex">
            سجّل الآن
          </Link>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-[3px] text-white lg:hidden"
            aria-label={drawer ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={drawer}
            onClick={() => setDrawer(!drawer)}
          >
            {drawer ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

    </header>
      {/* قائمة الجوال */}
      <div
        className={`fixed inset-x-0 bottom-0 top-[76px] z-40 overflow-y-auto bg-ink text-white transition-opacity duration-200 lg:hidden ${
          drawer ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="wrap pb-10 pt-4">
          {navGroups.map((g) => (
            <details key={g.label} className="group border-b border-white/10" open={groupActive(g.label)}>
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-display text-lg font-semibold">
                {g.label}
                <ChevronDown className="size-5 text-white/60 transition-transform group-open:rotate-180" />
              </summary>
              <ul className="pb-4">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={`block py-2.5 pr-3 ${isActive(l.href) ? "text-teal" : "text-white/80"}`}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}
          {navSingles.map((l) => (
            <Link key={l.href} href={l.href} className="block border-b border-white/10 py-4 font-display text-lg font-semibold">
              {l.label}
            </Link>
          ))}
          <div className="mt-8 grid gap-3">
            <Link href="/register" className="btn btn-primary w-full">سجّل الآن</Link>
            <Link href="/login" className="btn btn-line-light w-full">دخول</Link>
          </div>
        </div>
      </div>
    </>
  );
}
