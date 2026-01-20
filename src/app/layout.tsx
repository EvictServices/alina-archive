import type { Metadata } from "next";
import "./globals.css";
import { GradientBackground } from "@/components/gradient-background";
import { MainNav } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "evict",
  description: "The all-in-one solution for seamless server management — powerful, polished, and visually refined.",
  icons: {
    icon: "/evict/evict.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" style={{ position: "relative", backgroundColor: "#000" }}>
        <GradientBackground />
        <MainNav />
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}