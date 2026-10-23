// بيانات الأكاديمية العامة وروابط التنقل.
// كل ما يحتاج تأكيدًا من الأكاديمية موضّح في docs/content-checklist.md

export const site = {
  name: "أكاديمية مواهب الأحساء",
  shortName: "مواهب",
  nameEn: "Al-Ahsa Talent Academy",
  founded: 2020,
  city: "الأحساء",
  phone: "055 388 4171",
  phoneHref: "tel:+966553884171",
  whatsapp: "https://wa.me/966553884171",
  email: "info@alhasatalents.sa", // مقترح، يُعتمد بعد حجز النطاق
  social: {
    tiktok: "https://www.tiktok.com/@alhasatalents",
    instagram: "https://www.instagram.com/alhasatalents", // يُؤكَّد اسم الحساب
  },
  hours: "من الأحد إلى الخميس، 4:00 م حتى 9:00 م",
};

export type NavLink = { href: string; label: string; note?: string };
export type NavGroup = { label: string; links: NavLink[] };

export const navGroups: NavGroup[] = [
  {
    label: "الأكاديمية",
    links: [
      { href: "/about", label: "من نحن", note: "قصتنا ورؤيتنا وقيمنا" },
      { href: "/pathway", label: "مسار تطوير اللاعب", note: "خمس محطات حتى الأندية" },
      { href: "/coaches", label: "الجهاز الفني", note: "المدربون والمختصون" },
      { href: "/education", label: "الجانب التعليمي", note: "إنجليزي ورياضيات وتغذية" },
      { href: "/partners", label: "الشركاء والرعاة", note: "شركاء النجاح" },
    ],
  },
  {
    label: "البرامج",
    links: [
      { href: "/programs", label: "البرامج والفئات العمرية", note: "من 6 إلى 16 سنة" },
      { href: "/schedule", label: "الجدول الأسبوعي", note: "مواعيد كل فئة" },
      { href: "/fees", label: "الرسوم والاشتراكات", note: "الباقات والخصومات" },
      { href: "/events", label: "المعسكرات والفعاليات", note: "القادمة والسابقة" },
      { href: "/faq", label: "الأسئلة الشائعة", note: "قبل التسجيل" },
    ],
  },
  {
    label: "الإنجازات",
    links: [
      { href: "/alumni", label: "خريجونا", note: "لاعبون في الأندية" },
      { href: "/tournaments", label: "البطولات والمشاركات", note: "النتائج والمباريات" },
      { href: "/star-of-the-week", label: "نجم الأسبوع", note: "تكريم أسبوعي" },
      { href: "/testimonials", label: "آراء أولياء الأمور", note: "تجارب الأسر" },
    ],
  },
];

export const navSingles: NavLink[] = [
  { href: "/media", label: "المركز الإعلامي" },
  { href: "/contact", label: "تواصل معنا" },
];
