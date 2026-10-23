// صيغ عربية صحيحة للأعداد مع المعدود
export function sessionsLabel(n: number) {
  if (n === 1) return "حصة واحدة";
  if (n === 2) return "حصتان";
  if (n >= 3 && n <= 10) return `${n} حصص`;
  return `${n} حصة`;
}

export function formatPrice(n: number) {
  return n.toLocaleString("en-US");
}
