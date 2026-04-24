import "./globals.css";

export const metadata = {
  title: "WebXResearch | AI-Powered Web Research Summarizer",
  description:
    "Summarize any webpage instantly with AI. Paste a URL and get comprehensive research summaries, key insights, and follow-up answers powered by Nvidia NIM.",
  keywords: [
    "web research",
    "AI summarizer",
    "webpage summary",
    "research tool",
    "Nvidia NIM",
    "kharajch",
    "WebXResearch",
  ],
  authors: [{ name: "kharajch", url: "https://github.com/kharajch" }],
  creator: "kharajch",
  publisher: "kharajch",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://kharajch-webxresearch.vercel.app"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "WebXResearch | AI-Powered Web Research Summarizer",
    description:
      "Get instant summaries and insights from any webpage using AI. Powered by Nvidia NIM (Llama 3.1).",
    url: "https://kharajch-webxresearch.vercel.app",
    siteName: "WebXResearch",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "WebXResearch Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WebXResearch | AI-Powered Web Research Summarizer",
    description:
      "Get instant summaries and insights from any webpage using AI. Powered by Nvidia NIM.",
    creator: "@kharajch",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
