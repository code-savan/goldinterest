import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart-context";
import { WishlistProvider } from "@/components/wishlist-context";
import { ToastProvider } from "@/components/toast";
import { AnnouncementBar } from "@/components/announcement-bar";
import { Header } from "@/components/header";
import { CartDrawer } from "@/components/cart-drawer";
import { WishlistDrawer } from "@/components/wishlist-drawer";
import { Footer } from "@/components/footer";
import { PageTransition } from "@/components/page-transition";
import { getSettings } from "@/lib/store";
import { headers } from "next/headers";
import Script from "next/script";

const WHOP_PIXEL = `!function(w,d,s,u,n,a,b){if(w[n])return;a=w[n]={q:[],t:+new Date,s:[],o:u,track:function(){a.q.push([+new Date].concat([].slice.call(arguments)))},setScope:function(){a.s=[].slice.call(arguments).filter(function(x){return typeof x==="string"});a.q.push([+new Date,"setScope"].concat(a.s))},scope:function(){var c=[].slice.call(arguments);return{track:function(){a.q.push([+new Date].concat([].slice.call(arguments)).concat([{__scope:c}]))}}}};b=d.createElement(s);b.async=1;b.src=u+"/s.js";d.getElementsByTagName(s)[0].parentNode.insertBefore(b,d.getElementsByTagName(s)[0])}(window,document,"script","https://t.whop.tw","whop");whop.setScope("biz_FKFNrDl1t7K3Cn");whop.track("page");`;

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600"],
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
      <html lang="en" className={`${cormorant.variable} ${playfair.variable} ${dmSans.variable} h-full antialiased`}>
        <body className="min-h-full bg-[#0E0E10]">{children}</body>
      </html>
    );
  }

  const settings = await getSettings();
  return (
    <html lang="en" className={`${cormorant.variable} ${playfair.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FCFCF9]">
        <Script id="whop-pixel" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: WHOP_PIXEL }} />
        <ToastProvider>
          <CartProvider>
            <WishlistProvider>
              <AnnouncementBar text={settings.announcement} />
              <Header />
              <CartDrawer />
              <WishlistDrawer />
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
