export default function robots() {
  const baseUrl = "https://kharajch-webxresearch.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/_/backend/", "/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
