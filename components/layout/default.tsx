import React from "react"
import { DefaultNavigation } from "@/components/navigation/default"
import { Footer } from "@/components/footer"
import { SessionProvider } from "@/context/session"

export default function DefaultLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="h-screen min-h-screen flex flex-col">
      <DefaultNavigation/>

      <main className="h-[80%] min-h-[80%] container mx-auto max-w-7xl pt-12 px-6 flex-grow">
        { children }
      </main>

      <Footer/>
    </div>
  )
}
