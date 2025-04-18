"use client"

import ConfirmTotp from "@/app/user/mfa/(components)/confirm"
import { confirmMfaConfiguration } from "@/app/user/mfa"
import AuthLayout from "@/components/layout/auth"
import { site } from "@/config/site"
import { useRouter } from "next/navigation"
import React from "react"
import { SubmitHandler } from "react-hook-form"

interface FormInput {
  email: string,
  confirmationCode: string,
}

export default function MfaConfirm(): React.JSX.Element {
  const router = useRouter()

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const configured = await confirmMfaConfiguration(data)
    if (configured)
      router.push(site.page._.home)
  }

  return (
    <AuthLayout>
      <ConfirmTotp onSubmit={ onSubmit }/>
    </AuthLayout>
  )
}
