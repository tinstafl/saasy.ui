"use client"

import EnableTotp from "@/app/user/mfa/(components)/enable"
import AuthLayout from "@/components/layout/auth"
import { site } from "@/config/site"
import { useRouter } from "next/navigation"
import React from "react"

export default function MfaSetup(): React.JSX.Element {
  const router = useRouter()

  const onSubmit = () => {
    return router.push(site.page.auth.mfa.confirm)
  }

  return (
    <AuthLayout>
      <EnableTotp onSubmit={ onSubmit }/>
    </AuthLayout>
  )
}
