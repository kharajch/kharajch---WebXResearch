export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://kharajch-webxresearch.vercel.app/sitemap.xml',
  }
}
