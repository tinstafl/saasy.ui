"use client"

import DefaultLayout from "@/components/layout/default"
import React, { useEffect, useState } from "react"
import { fontPrimary, fontSaasy } from "@/config/fonts"
import { celebrate } from "@/components/fireworks"

export default function Home(): React.JSX.Element {
  const [ mounted, setMounted ] = useState(false)

  useEffect(() => {
    celebrate()
    setMounted(true)
  }, [])

  return (
    <DefaultLayout>
      { mounted && <div className="w-full h-full flex justify-center">
        <h1 className={ `my-auto text-2xl text-secondary tracking-wide ${ fontSaasy.className }` }>
          build something <span className="underline">awesome</span>
        </h1>
      </div> }
    </DefaultLayout>
  )
}
