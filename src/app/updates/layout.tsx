import { ReactNode } from 'react'
import { MainNav } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function UpdatesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MainNav />
      {children}
      <Footer />
    </>
  )
}
