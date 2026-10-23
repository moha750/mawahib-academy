// محمّل صور للنشر الثابت: يضيف مسار الموقع الأساسي، والصور تُخدم كما هي.
export default function imageLoader({ src, width }: { src: string; width: number }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${src}?w=${width}`;
}
