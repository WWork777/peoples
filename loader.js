// loader.js
export default function yandexCloudLoader({ src }) {
  const cdnDomain = "https://cdn.xn--b1adekn9bg8fe.xn--p1ai"; // cdn.людивуюте.рф

  // Если ссылка локальная (начинается с /), добавляем домен CDN
  if (src.startsWith("/")) {
    return `${cdnDomain}${src}`;
  }

  // В остальных случаях отдаем как есть
  return src;
}
