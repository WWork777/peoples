const isProd = process.env.NODE_ENV === "production";
export const CDN_URL = isProd ? "https://cdn.xn--b1adekn9bg8fe.xn--p1ai" : "";
