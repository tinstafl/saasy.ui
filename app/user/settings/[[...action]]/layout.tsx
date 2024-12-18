import React from "react"
import DefaultLayout from "@/components/layout/default"
import { UserProvider } from "@/context/user"

export default function SettingsLayout({ children }: Readonly<{ children: React.JSX.Element; }>): React.ReactNode {
  return (
    <UserProvider>
      <DefaultLayout>
        { children }
      </DefaultLayout>
    </UserProvider>
  )
}
