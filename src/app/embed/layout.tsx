import { Metadata } from "next";
import { MainNav } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Evict • Embed Builder",
  description:
    "Create custom Discord embeds with Evict's powerful embed scripting system.",
};

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainNav />
      {children}
      <Footer />
    </>
  );
}