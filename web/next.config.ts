import type { NextConfig } from "next";

// للنشر الثابت (GitHub Pages): STATIC_EXPORT=1 و BASE_PATH=/اسم-المستودع
const isExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: isExport ? "export" : undefined,
  trailingSlash: isExport,
  basePath: basePath || undefined,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: isExport ? { loader: "custom", loaderFile: "./src/lib/image-loader.ts" } : undefined,
};

export default nextConfig;
