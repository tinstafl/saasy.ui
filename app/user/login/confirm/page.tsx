"use client"

import AuthLayout from "@/components/layout/auth"
import { numbersOnly } from "@/config/schema/phone"
import { site } from "@/config/site"
import { confirmSignIn } from "@aws-amplify/auth"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Input } from "@heroui/react"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import React from "react"
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { useError } from "@/context/error"
import { schema } from "@/config/schema/auth/confirm-mfa-setup"
import { fontHeader } from "@/config/fonts"

interface FormInput {
  confirmationCode: string,
}

export default function ConfirmMfa(): React.JSX.Element {
  const router = useRouter()

  const { error, triggerError } = useError()
  const { control, handleSubmit, formState: { isSubmitting, errors } } = useForm<FormInput>({
    defaultValues: {
      confirmationCode: "",
    },
    resolver: yupResolver(schema),
    shouldFocusError: false,
    mode: "onSubmit",
    reValidateMode: "onChange"
  })

  const onSubmitError: SubmitErrorHandler<FormInput> = async (_) => {
    triggerError({
      show: true,
      message: <div>
        <span>This might not be the right input.  Try the six digit number we sent via email.</span>
      </div>
    })
  }

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      const response = await confirmSignIn({ challengeResponse: `${ data.confirmationCode }` })
      console.debug(response)

      return router.push(site.page._.product._)
    } catch (error: any) {
      console.error(error)
      triggerError({
        show: true,
        message: <div>
          <span>Something happened we were not able to prevent 🤨.  Please try again in a bit.</span>
        </div>
      })
    }
  }

  return (
    <AuthLayout>
      <form className={ clsx("flex flex-col gap-2 w-1/2 m-auto", error.show && "animate-shake animate-once") }
            onSubmit={ handleSubmit(onSubmit, onSubmitError) }>

        <Controller
          name="confirmationCode"
          defaultValue=""
          control={ control }
          render={ ({ field }) =>
            <Input isRequired
                   { ...field }
                   isInvalid={ errors.confirmationCode !== undefined }
                   color={ errors.confirmationCode !== undefined ? "danger" : "default" }
                   errorMessage="please enter a valid confirmation code"
                   ara-label="Code"
                   label="Code"
                   variant="bordered"
                   maxLength={ 6 }
                   onChange={ (e) => numbersOnly(field.onChange, e) }
                   autoComplete="one-time-code"/> }/>

        <Button type="submit"
                aria-label="Confirm MFA"
                isDisabled={ isSubmitting }
                variant="bordered"
                color="primary">
          <span className={ `text-base tracking-wider ${ fontHeader.className }` }>Confirm MFA</span>
        </Button>
      </form>
    </AuthLayout>
  )
}
