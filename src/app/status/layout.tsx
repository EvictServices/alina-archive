import { Metadata } from "next";
import { MainNav } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Evict • Status",
  description: "View the current status of the bot.",
};

export default function StatusLayout({
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