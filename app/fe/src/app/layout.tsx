import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AppProvider from "./provider";
import Script from "next/script";

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
  title: "My Dear Pass USFK | Handy USFK Holiday Schedule Calendar",
  description: "Handy USFK Holiday Schedule Calendar",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  manifest: "/manifest.json",
  icons: [{ url: "/logo/logo-icon.png", sizes: "512x512" }],
  openGraph: {
    type: "website",
    url: "https://dear-my-pass.vercel.app/",
    title: "My Dear Pass USFK",
    description: "Handy USFK Holiday Schedule Calendar",
    images: [{ url: `https://dear-my-pass.vercel.app/image/thumbnail.png` }],
    siteName: "My Dear Pass USFK",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nanumSquareNeo.className}`}>
      <head>
        <link rel="canonical" href="https://www.mysite.com/shop" />
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js
				?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());

		gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
		`,
          }}
        />
      </head>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
