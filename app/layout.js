import "./globals.css";

export const metadata = {
  title: "kharajch---WebXResearch | AI-Powered Web Research Summarizer",
  description:
    "Summarize any webpage instantly with AI. Paste a URL and get comprehensive research summaries, key insights, and follow-up answers powered by Ollama.",
  keywords: [
    "web research",
    "AI summarizer",
    "webpage summary",
    "research tool",
    "Ollama",
    "kharajch",
    "WebXResearch",
  ],
  authors: [{ name: "kharajch" }],
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "kharajch---WebXResearch",
    description:
      "AI-powered web research summarizer. Get instant summaries and insights from any webpage.",
    type: "website",
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
