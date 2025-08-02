import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  metadataBase: new URL("https://githeat.vercel.app"),
  title: "GitHeat - GitHub Contribution Art Generator",
  description:
    "Transform your name or text into beautiful GitHub-style contribution art. Create readable dot-matrix patterns that look like GitHub contribution graphs.",
  keywords:
    "GitHub, contribution graph, heatmap, visualization, developer tools, text art, dot matrix",
  authors: [{ name: "Vatsal Bhakodia" }],
  creator: "Vatsal Bhakodia",
  openGraph: {
    title: "GitHeat - GitHub Contribution Art Generator",
    description:
      "Transform your name or text into beautiful GitHub-style contribution art. Create readable dot-matrix patterns that look like GitHub contribution graphs.",
    type: "website",
    url: "https://githeat.vercel.app",
    siteName: "GitHeat",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GitHeat - GitHub Contribution Art Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GitHeat - GitHub Contribution Art Generator",
    description:
      "Transform your name or text into beautiful GitHub-style contribution art. Create readable dot-matrix patterns that look like GitHub contribution graphs.",
    creator: "@VatsalBhakodia",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        {children}
        <Toaster position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}
