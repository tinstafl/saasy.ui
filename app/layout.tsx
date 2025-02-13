import "@/styles/globals.css"
import { Providers } from "@/app/providers"
import { fontPrimary } from "@/config/fonts"
import { site } from "@/config/site"
import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s - ${ site.name }`,
  },
  description: site.description,
  icons: {
    icon: "/favicon.svg",
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html suppressHydrationWarning lang="en">
    <body className={ `h-screen min-h-screen bg-background font-sans antialiased ${ fontPrimary.className }` }>
    <Providers>
      { children }
    </Providers>
    </body>
    </html>
  )
}
