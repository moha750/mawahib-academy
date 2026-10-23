import type { Metadata, Viewport } from "next";
import { Alexandria, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  variable: "--font-alexandria",
  display: "swap",
});

const plex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "أكاديمية مواهب الأحساء لكرة القدم",
    template: "%s | أكاديمية مواهب الأحساء",
  },
  description:
    "أكاديمية كرة قدم في الأحساء للأعمار من 6 إلى 16 سنة. مدربون معتمدون من الاتحاد السعودي، وتعليم مساند، ومسار واضح من أول تمرين حتى الأندية.",
  // نسخة عرض: لا تُفهرس في محركات البحث. يُحذف هذا السطر عند الإطلاق الرسمي.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#062830",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${alexandria.variable} ${plex.variable}`}>
      <body>{children}</body>
    </html>
  );
}
