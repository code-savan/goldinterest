import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart-context";
import { WishlistProvider } from "@/components/wishlist-context";
import { ToastProvider } from "@/components/toast";
import { AnnouncementBar } from "@/components/announcement-bar";
import { Header } from "@/components/header";
import { DeferredDrawers } from "@/components/deferred-drawers";
import { Footer } from "@/components/footer";
import { PageTransition } from "@/components/page-transition";
import { WhopLoader } from "@/components/whop-loader";
import { getSettings } from "@/lib/store";
import { headers } from "next/headers";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.goldinterestofficial.com";
const siteTitle = "Gold Interest | Wallpapers, Posters and Apparel";
const siteDescription =
  "Carefully made wallpapers, posters and apparel with free shipping on every order.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Gold Interest",
  },
  description: siteDescription,
  keywords: ["wallpapers", "posters", "apparel", "hoodies", "wall art", "Gold Interest"],
  authors: [{ name: "Gold Interest" }],
  creator: "Gold Interest",
  icons: {
    icon: [{ url: "/icon", type: "image/png", sizes: "32x32" }],
    apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    siteName: "Gold Interest",
    title: siteTitle,
    description: siteDescription,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Gold Interest" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const pathname = (await headers()).get("x-pathname") || "";
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return (
      <html lang="en" className={`${cormorant.variable} ${dmSans.variable} h-full antialiased`}>
        <body className="min-h-full bg-[#0E0E10]">{children}</body>
      </html>
    );
  }

  const settings = await getSettings();
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="min-h-full flex flex-col bg-[#FCFCF9]">
        <WhopLoader />
        <ToastProvider>
          <CartProvider>
            <WishlistProvider>
              <AnnouncementBar text={settings.announcement} />
              <Header />
              <DeferredDrawers />
              <main className="flex-1 pt-0">
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
