import { ReactNode } from 'react'
import { MainNav } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MainNav />
      {children}
      <Footer />
    </>
  )
}
