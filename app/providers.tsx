"use client"

import { aws } from "@/config/amplify"
import { HeroUIProvider } from "@heroui/react"
import { Amplify } from "aws-amplify"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"
import { ErrorProvider } from "@/context/error"
import { SessionProvider } from "@/context/session";

export function Providers({ children }: { children: React.ReactNode }): React.ReactElement {
  const router = useRouter()

  useEffect(() => {
    Amplify.configure(aws(), { ssr: true })
  }, [])

  return (
    <HeroUIProvider navigate={ router.push }>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <ErrorProvider>
          <SessionProvider>
            { children }
          </SessionProvider>
        </ErrorProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  )
}
