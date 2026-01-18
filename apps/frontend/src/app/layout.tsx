import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BlogApp - Share Your Stories & Ideas",
  description: "A modern blogging platform where you can share your thoughts, stories, and ideas. Create, edit, and discover blog posts across technology, art, science, cinema, design, and food.",
  keywords: ["blog", "blogging platform", "stories", "articles", "sharing"],
  authors: [{ name: "AxelSparta" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://blog-app-frontend-umber.vercel.app",
    title: "BlogApp - Share Your Stories & Ideas",
    description: "A modern blogging platform where you can share your thoughts, stories, and ideas. Create, edit, and discover blog posts.",
    siteName: "BlogApp",
    images: [
      {
        url: "/image.png",
        width: 1200,
        height: 630,
        alt: "BlogHub Logo",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BlogHub - Share Your Stories & Ideas",
    description: "A modern blogging platform where you can share your thoughts, stories, and ideas.",
    images: ["/image.png"],
  },
  icons: {
    icon: "/logo-blog.png",
    apple: "/logo-blog.png",
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
            <Navbar />
            {children}
            <Footer />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

