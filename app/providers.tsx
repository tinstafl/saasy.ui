"use client"

import { aws } from "@/config/amplify"
import { NextUIProvider } from "@nextui-org/react"
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
    <NextUIProvider navigate={ router.push }>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <ErrorProvider>
          <SessionProvider>
            { children }
          </SessionProvider>
        </ErrorProvider>
      </NextThemesProvider>
    </NextUIProvider>
  )
}
