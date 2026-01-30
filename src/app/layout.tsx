import "@/app/globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import { MeshGradient } from "@/components/global/GradientMesh";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: "#E3E3ED",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://evict.bot"),
  title: "Evict",
  description:
    "The all-in-one solution for seamless server management — powerful, polished, and visually refined.",
  twitter: {
    site: "https://evict.bot/",
    card: "player",
  },
  openGraph: {
    url: "https://evict.bot/",
    type: "website",
    title: "evict",
    // siteName: "evict.bot",
    description:
      "The all-in-one solution for seamless server management — powerful, polished, and visually refined.",
    images: [
      {
        url: "https://r2.evict.bot/evict.jpeg",
        width: 500,
        height: 500,
        alt: "evict",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <meta property="theme-color" content="#E3E3ED" />
      </Head>
      <body
        className={`bg-evict-100 ${inter.className} font-inter leading-line37 tracking-tighterCustom1Point2 flex flex-col min-h-screen justify-between dark font-light`}
      >
        <MeshGradient />
        {children}
      </body>
    </html>
  );
}