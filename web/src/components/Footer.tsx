import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Clock } from "lucide-react";
import { navGroups, site } from "@/content/site";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="wrap grid gap-12 py-16 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-4">
            <Image src="/brand/logo-192.webp" alt="شعار أكاديمية مواهب الأحساء" width={72} height={72} className="size-[72px] rounded-full" />
            <div>
              <p className="font-display text-xl font-bold">{site.name}</p>
              <p className="text-sm text-white/55">منذ {site.founded}</p>
              <p className="text-sm text-white/40" dir="ltr">{site.nameEn}</p>
            </div>
          </div>
          <p className="mt-6 max-w-sm text-white/65">
            نكتشف مواهب كرة القدم في الأحساء من سن 6 إلى 16 سنة، ونطوّرها بمنهج تدريبي وتعليمي، ونفتح لها الطريق إلى الأندية.
          </p>
          <ul className="mt-8 space-y-3 text-white/80">
            <li className="flex items-center gap-3">
              <Phone className="size-[18px] text-teal" aria-hidden="true" />
              <a href={site.phoneHref} className="num hover:text-teal" dir="ltr">{site.phone}</a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="size-[18px] text-teal" aria-hidden="true" />
              {site.city}، المنطقة الشرقية
            </li>
            <li className="flex items-center gap-3">
              <Clock className="size-[18px] text-teal" aria-hidden="true" />
              {site.hours}
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
          {navGroups.map((g) => (
            <div key={g.label}>
              <p className="font-display font-semibold text-teal">{g.label}</p>
              <ul className="mt-4 space-y-2.5 text-[0.95rem] text-white/70">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-white">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="font-display font-semibold text-teal">روابط</p>
            <ul className="mt-4 space-y-2.5 text-[0.95rem] text-white/70">
              <li><Link href="/media" className="hover:text-white">المركز الإعلامي</Link></li>
              <li><Link href="/register" className="hover:text-white">طلب تسجيل</Link></li>
              <li><Link href="/contact" className="hover:text-white">تواصل معنا</Link></li>
              <li><Link href="/login" className="hover:text-white">بوابة الأعضاء</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="wrap flex flex-col-reverse items-start justify-between gap-5 py-6 text-sm text-white/50 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {site.name}. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-2">
            <a href={site.whatsapp} target="_blank" rel="noreferrer" aria-label="واتساب" className="grid size-10 place-items-center rounded-full bg-white/5 text-white/80 hover:bg-teal hover:text-ink">
              <WhatsAppIcon />
            </a>
            <a href={site.social.tiktok} target="_blank" rel="noreferrer" aria-label="تيك توك" className="grid size-10 place-items-center rounded-full bg-white/5 text-white/80 hover:bg-teal hover:text-ink">
              <TikTokIcon />
            </a>
            <a href={site.social.instagram} target="_blank" rel="noreferrer" aria-label="إنستغرام" className="grid size-10 place-items-center rounded-full bg-white/5 text-white/80 hover:bg-teal hover:text-ink">
              <InstagramIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
