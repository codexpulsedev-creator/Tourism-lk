import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LankaExplore — One Island. Endless Experiences.",
  description:
    "Discover the pristine beaches, mist-shrouded mountain peaks, ancient UNESCO kingdoms, rich safari wildlife, and authentic culture of Sri Lanka.",
  keywords: [
    "Sri Lanka Tourism",
    "Discover Sri Lanka",
    "Ella",
    "Sigiriya",
    "Galle Fort",
    "Yala Safari",
    "Mirissa Whale Watching",
    "Ceylon Tea",
    "Sri Lanka Itineraries",
  ],
  authors: [{ name: "LankaExplore" }],
  openGraph: {
    title: "LankaExplore — One Island. Endless Experiences.",
    description:
      "Explore breathtaking landscapes, ancient heritage, vibrant culture, and unforgettable adventures across Sri Lanka.",
    url: "https://lankaexplore.com",
    siteName: "LankaExplore",
    images: [
      {
        url: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=1600&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Sri Lanka Nine Arch Bridge Highland Train",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LankaExplore — One Island. Endless Experiences.",
    description: "Discover the breathtaking beauty and rich culture of Sri Lanka.",
    images: ["https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=1600&auto=format&fit=crop"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-brandBg text-brandDark antialiased selection:bg-primary/20 selection:text-primary">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
