
import { MainNav } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function LegalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MainNav />
      {children}
      <Footer />
    </>
  );
}