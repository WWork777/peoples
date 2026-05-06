/** @type {import('next').NextConfig} */
const nextConfig = {
  // Статика (JS/CSS) теперь полетит через CDN
  // assetPrefix: "https://cdn.xn--b1adekn9bg8fe.xn--p1ai",
    assetPrefix: "",

  images: {
    loader: "custom",
    loaderFile: "./loader.js",
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.xn--b1adekn9bg8fe.xn--p1ai",
      },
    ],
  },
  // Твои остальные настройки (headers, redirects и т.д.) без изменений
};

export default nextConfig;
