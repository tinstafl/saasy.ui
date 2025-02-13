"use client"

import Menu from "@/app/user/menu"
import { fontSaasy, fontPrimary } from "@/config/fonts"
import { site } from "@/config/site"
import { Button, Link, Navbar, NavbarContent, NavbarItem } from "@heroui/react"
import React, { useEffect, useState } from "react"
import { Theme } from "../theme"
import { usePathname } from "next/navigation"
import { useSessionState } from "@/context/session"

export const DefaultNavigation = () => {
  const pathname = usePathname()

  const { getSession } = useSessionState()

  const [ authenticated, setAuthenticated ] = useState<boolean>(false)
  const [ mounted, setMounted ] = useState<boolean>(false)
  const [ menu, setMenu ] = useState(<></>)

  useEffect(() => {
    setMounted(true)

    getSession()
      .then(authenticated => {
        setAuthenticated(authenticated)

        if (authenticated)
          setMenu(<Menu/>)
        else setMenu(
          <Link aria-label="login"
                href={ site.page.auth.login._ }
                className="animate-fade-right animate-duration-700 animate-delay-1000">
            <Button isIconOnly
                    className="bg-transparent">
              <svg xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 24 24"
                   className="w-8 h-8 fill-default-foreground/60 hover:fill-primary hover:animate-jump hover:animate-thrice">
                <path d="M17 8V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2H9V7c0-1.654 1.346-3 3-3s3 1.346 3 3v1h2zm1 4 .002 8H6v-8h12z"/>
              </svg>
            </Button>
          </Link>)
      })
  }, [ authenticated, mounted, getSession ])

  return (
    <Navbar>
      { mounted && <NavbarContent className="animate-jump-in animate-duration-300" justify="start">
        <Link aria-label="home" href={ site.page._.home } className={ `text-4xl text-fuchsia-400 ${ fontSaasy.className }` }>
          saasy
        </Link>
      </NavbarContent> }

      { mounted && <NavbarContent className="animate-jump-in animate-duration-300" justify="center">
        <NavbarItem isActive={ pathname.includes(site.page._.product._) }>
          <Link aria-label="product"
                color={ pathname.includes(site.page._.product._) ? "secondary" : "foreground" }
                className={ `text-large ${ fontPrimary.className }` }
                href={ site.page._.product._ }>
            Product
          </Link>
        </NavbarItem>
      </NavbarContent> }

      { mounted && <NavbarContent className="animate-jump-in animate-duration-300" justify="end">
        <div className="flex gap-2">
          <NavbarItem className="flex">
            { menu }
          </NavbarItem>
          <NavbarItem className="flex">
            <Theme/>
          </NavbarItem>
        </div>
      </NavbarContent> }
    </Navbar>
  )
}
