import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AppProvider from "./provider";

const nanumSquareNeo = localFont({
  src: [
    {
      path: "../../public/fonts/NanumSquareNeoTTF-bRg.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/NanumSquareNeoTTF-cBd.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/ChosunCentennial_ttf.ttf",
      weight: "300",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "My Dear Pass | Handy USFK Holiday Calendar",
  description: "Handy USFK Holiday Calendar",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  manifest: "/manifest.json",
  icons: [{ url: "/images/logo-icon.png", sizes: "512x512" }],
  openGraph: {
    type: "website",
    url: "https://so-when-is-4day.vercel.app/",
    title: "So When is 4day",
    description: "Simple USFK Holiday Calendar",
    images: [{ url: `https://award-factory.vercel.app/images/thumbnail.png` }],
    siteName: "so-when-is-4day",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nanumSquareNeo.className}`}>
      <head></head>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
