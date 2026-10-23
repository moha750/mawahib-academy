import type { Metadata } from "next";
import { Clock, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { PageHero } from "@/components/ui";
import { site } from "@/content/site";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/icons";

export const metadata: Metadata = { title: "تواصل معنا" };

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "تواصل معنا" }]}
        title="نحن على بعد رسالة"
        lead="أسرع طريقة للتواصل هي واتساب. ولأي موضوع آخر، اكتب لنا عبر النموذج."
      >
        <a href={site.whatsapp} target="_blank" rel="noreferrer" className="btn btn-primary">
          <WhatsAppIcon /> راسلنا على واتساب
        </a>
      </PageHero>

      <section className="sec">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="t-h3 mb-6">أرسل رسالة</h2>
            <ContactForm />
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <h2 className="t-h3 mb-6">بيانات التواصل</h2>
            <ul className="divide-y divide-petrol/12 border-y border-petrol/12">
              <li className="flex gap-4 py-5">
                <Phone className="mt-1 size-5 shrink-0 text-teal-dark" aria-hidden="true" />
                <div>
                  <p className="text-sm text-petrol/60">الجوال وواتساب</p>
                  <a href={site.phoneHref} dir="ltr" className="num text-lg font-bold hover:text-teal-dark">{site.phone}</a>
                </div>
              </li>
              <li className="flex gap-4 py-5">
                <MapPin className="mt-1 size-5 shrink-0 text-teal-dark" aria-hidden="true" />
                <div>
                  <p className="text-sm text-petrol/60">الموقع</p>
                  <p className="font-display font-semibold">{site.city}، المنطقة الشرقية</p>
                </div>
              </li>
              <li className="flex gap-4 py-5">
                <Clock className="mt-1 size-5 shrink-0 text-teal-dark" aria-hidden="true" />
                <div>
                  <p className="text-sm text-petrol/60">أوقات العمل</p>
                  <p className="font-display font-semibold">{site.hours}</p>
                </div>
              </li>
            </ul>
            <div className="mt-6 flex gap-2">
              <a href={site.social.tiktok} target="_blank" rel="noreferrer" aria-label="تيك توك" className="grid size-11 place-items-center rounded-full bg-white ring-1 ring-petrol/12 hover:bg-petrol hover:text-white">
                <TikTokIcon />
              </a>
              <a href={site.social.instagram} target="_blank" rel="noreferrer" aria-label="إنستغرام" className="grid size-11 place-items-center rounded-full bg-white ring-1 ring-petrol/12 hover:bg-petrol hover:text-white">
                <InstagramIcon />
              </a>
            </div>
            <div className="mt-8 overflow-hidden rounded-[4px] ring-1 ring-petrol/10">
              <iframe
                title="موقع الأحساء على الخريطة"
                src="https://www.google.com/maps?q=%D8%A7%D9%84%D8%A3%D8%AD%D8%B3%D8%A7%D8%A1&z=11&output=embed"
                className="block aspect-[4/3] w-full grayscale-[0.6]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
