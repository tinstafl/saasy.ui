"use client"

import "@/config/presentation-input.css"
import React, { useEffect } from "react"
import DefaultLayout from "@/components/layout/default"
import { UserProvider } from "@/context/user"

export default function BetaLayout({ children }: { children: React.ReactNode }) {
  const [ mounted, setMounted ] = React.useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <UserProvider>
      <DefaultLayout>
        <div className="h-[90%] min-h-[90%] w-full">
          <div className="h-full animate-fade-up animate-duration-300">
            { mounted && children }
          </div>
        </div>
      </DefaultLayout>
    </UserProvider>
  )
}
