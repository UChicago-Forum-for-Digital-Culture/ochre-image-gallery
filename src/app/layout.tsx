import { Toaster } from "@/components/ui/sonner";
import Providers from "@/providers";
import "@/styles/globals.css";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Figtree, Inter } from "next/font/google";
const TailwindIndicator = dynamic(
  () => import("@/components/dev/tailwind-indicator"),
  { ssr: false, loading: () => null },
);
export const metadata: Metadata = {
  title: {
    template: "%s - OCHRE Image Gallery",
    default: "OCHRE Image Gallery",
  },
  description: "OCHRE Image Gallery",
  manifest: "manifest.webmanifest",
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    {
      rel: "android-chrome-192x192",
      sizes: "192x192",
      url: "android-chrome-192x192.png",
    },
    {
      rel: "android-chrome-512x512",
      sizes: "512x512",
      url: "android-chrome-512x512.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "favicon-16x16.png",
    },
    {
      rel: "mask-icon",
      color: "#0d87d3",
      url: "safari-pinned-tab.svg",
    },
  ],
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`font-display ${inter.variable} ${figtree.variable}`}
      suppressHydrationWarning
    >
      <body className="h-[100dvh] w-[100dvw] overflow-x-hidden overflow-y-scroll">
        <Providers>
          {children}
          <Toaster />
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  );
}
