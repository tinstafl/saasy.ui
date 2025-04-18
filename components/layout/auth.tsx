import "@/config/presentation-input.css"
import { Footer } from "@/components/footer"
import { Theme } from "@/components/theme"
import React, { useEffect, useState } from "react"
import { Link, Navbar, NavbarContent, NavbarItem } from "@heroui/react"
import { site } from "@/config/site"
import { fontSaasy } from "@/config/fonts"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const [ mounted, setMounted ] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex flex-col h-[100lvh]">
      <Navbar>
        { mounted && <NavbarContent justify="end" className="animate-appearance-in animate-duration-300">
          <NavbarItem>
            <Theme/>
          </NavbarItem>
        </NavbarContent> }
      </Navbar>

      <div className="my-auto">
        <div className="w-full flex justify-center">
          <Link href={ site.page._.home } className={ `text-6xl text-fuchsia-400 ${ fontSaasy.className }` }>
            saasy.ui
          </Link>
        </div>

        <main className="m-auto max-w-7xl mt-20 px-6">
          { children }
        </main>
      </div>

      <Footer/>
    </div>
  )
}
