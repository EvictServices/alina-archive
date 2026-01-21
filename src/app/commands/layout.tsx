import { Metadata } from "next";
import { MainNav } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Evict • Commands",
  description: "View Evict's full list of commands and their descriptions.",
};

export default function CommandsLayout({
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