"use client"

import AuthLayout from "@/components/layout/auth"
import { site } from "@/config/site"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Input, Tooltip } from "@heroui/react"
import { resetPassword, signOut } from "aws-amplify/auth"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import React from "react"
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { useError } from "@/context/error"
import { schema } from "@/config/schema/auth/reset-password-request"
import { fontHeader } from "@/config/fonts"

interface FormInput {
  email: string,
}

export default function SignUp(): React.JSX.Element {
  const router = useRouter()

  const { error, triggerError } = useError()
  const { control, handleSubmit, formState: { isSubmitting, errors } } = useForm<FormInput>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
    shouldFocusError: false,
    mode: "onSubmit",
    reValidateMode: "onChange"
  })

  const onSubmitError: SubmitErrorHandler<FormInput> = async (errors) => {
    triggerError({
      show: true,
      message: <div>
        <span>We can only reset your old password to a valid password.</span>
      </div>
    })
  }

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      const response = await resetPassword({ username: data.email })
      console.debug(response)

      await signOut()
      return router.push(site.page.auth.password.confirm)
    } catch (error: any) {
      console.debug(error)
      triggerError({
        show: true,
        message: <div>
          <span>Something happened resetting your password. We don&apos;t think it worked but you should probably double-check.</span>
        </div>
      })
    }
  }

  return (
    <AuthLayout>
      <form className={ clsx("flex flex-col gap-2 w-1/2 m-auto", error.show && "animate-shake animate-once") }
            onSubmit={ handleSubmit(onSubmit, onSubmitError) }>

        <Controller
          name="email"
          control={ control }
          render={ ({ field }) =>
            <Input isRequired
                   { ...field }
                   isInvalid={ errors.email !== undefined }
                   color={ errors.email !== undefined ? "danger" : "default" }
                   errorMessage="Please enter a valid email."
                   type="email"
                   aria-label="Email"
                   label="Email"
                   variant="bordered"
                   autoComplete="email"/> }/>

        <Button type="submit"
                aria-label="Send Code"
                isDisabled={ isSubmitting }
                variant="bordered"
                color="primary">
          <span className={ `text-base tracking-wider ${ fontHeader.className }` }>Send Code</span>
        </Button>

        <div className="flex justify-center gap-10 mt-5">
          <Tooltip showArrow={ true }
                   placement="bottom"
                   delay={ 250 }
                   content="Login">
            <Button isIconOnly
                    aria-label="Login"
                    onPress={ () => router.push(site.page.auth.login._) }
                    className="bg-transparent">
              <svg xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 24 24"
                   className="w-8 h-8 fill-secondary hover:animate-pulse hover:animate-once">
                <path d="m13 16 5-4-5-4v3H4v2h9z"/>
                <path d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"/>
              </svg>
            </Button>
          </Tooltip>
        </div>
      </form>
    </AuthLayout>
  )
}
