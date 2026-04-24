export default function sitemap() {
  const baseUrl = "https://kharajch-webxresearch.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}
