"use client"

import { requiresMfa } from "@/app/user/mfa"
import AuthLayout from "@/components/layout/auth"
import { numbersOnly } from "@/config/schema/phone"
import { site } from "@/config/site"
import { fetchUserAttributes } from "@aws-amplify/auth"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Input, Tooltip } from "@heroui/react"
import { EyeFilledIcon, EyeSlashFilledIcon } from "@heroui/shared-icons"
import { confirmSignUp, signIn } from "aws-amplify/auth"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import React from "react"
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { useTheme } from "next-themes"
import { useError } from "@/context/error"
import { schema } from "@/config/schema/auth/confirm-onboard"
import { fontHeader } from "@/config/fonts"

interface FormInput {
  email: string,
  password: string,
  confirmationCode: string,
}

export default function ConfirmCode(): React.JSX.Element {
  const router = useRouter()

  const [ isPasswordVisible, setIsPasswordVisible ] = React.useState(false)

  const { theme } = useTheme()
  const { error, triggerError } = useError()
  const { control, handleSubmit, formState: { isSubmitting, errors } } = useForm<FormInput>({
    defaultValues: {
      email: "",
      password: "",
      confirmationCode: "",
    },
    resolver: yupResolver(schema),
    shouldFocusError: true,
    mode: "onSubmit",
    reValidateMode: "onChange"
  })

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible)

  const onSubmitError: SubmitErrorHandler<FormInput> = async (errors) => {
    triggerError({
      show: true,
      message: <div>
        <span>This confirmation code is broken or it might not be the right confirmation code! Give it another shot.</span>
      </div>
    })
  }

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      const confirmSignUpResponse = await confirmSignUp({
        username: data.email,
        confirmationCode: `${ data.confirmationCode }`,
        options: {
          clientMetadata: {
            theme: `${ theme }`
          }
        }
      })

      const signInResponse = await signIn({ username: data.email, password: data.password })

      const confirmedAndSignedIn =
        confirmSignUpResponse.isSignUpComplete
        && signInResponse.isSignedIn
        && confirmSignUpResponse.nextStep.signUpStep === "DONE"
        && signInResponse.nextStep.signInStep === "DONE"

      if (confirmedAndSignedIn) {
        const attributes = await fetchUserAttributes()
        if (await requiresMfa(attributes)) {
          return router.push(site.page.auth.mfa.setup)
        } else {
          return router.push(site.page._.home)
        }
      } else {
        return router.push(site.page.auth.login._)
      }
    } catch (error: any) {
      console.error(error)

      if (error.message.includes("Current status is CONFIRMED"))
        triggerError({
          show: true,
          message: <div>
            <span>Your email is already confirmed. We can&apos;t confirm you any farther.</span>
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
                   aria-label="Email"
                   label="Email"
                   variant="bordered"
                   autoComplete="username"/> }/>

        <Controller
          name="password"
          control={ control }
          render={ ({ field }) =>
            <Input isRequired
                   { ...field }
                   isInvalid={ errors.password !== undefined }
                   color={ errors.password !== undefined ? "danger" : "default" }
                   errorMessage="Please enter a valid password."
                   type={ isPasswordVisible ? "text" : "password" }
                   aria-label="Password"
                   label="Password"
                   variant="bordered"
                   autoComplete="current-password"
                   endContent={
                     <Button isIconOnly
                             aria-label="Toggle Password Visibility"
                             className="bg-transparent"
                             onPress={ togglePasswordVisibility }>
                       { isPasswordVisible ? (
                         <EyeSlashFilledIcon className="w-4 h-4"/>
                       ) : (
                         <EyeFilledIcon className="w-4 h-4"/>
                       ) }
                     </Button>
                   }/> }/>

        <Controller
          name="confirmationCode"
          control={ control }
          render={ ({ field }) =>
            <Input isRequired
                   { ...field }
                   maxLength={ 6 }
                   onChange={ (e) => numbersOnly(field.onChange, e) }
                   isInvalid={ errors.confirmationCode !== undefined }
                   color={ errors.confirmationCode !== undefined ? "danger" : "default" }
                   autoComplete="one-time-code"
                   aria-label="Confirmation Code"
                   label="Confirmation Code"
                   variant="bordered" errorMessage="Please enter a valid sign up code."/> }/>

        <Button type="submit"
                aria-label="Confirm Email Verification"
                isDisabled={ isSubmitting }
                variant="bordered"
                color="primary">
          <span className={ `text-base tracking-wider ${ fontHeader.className }` }>Confirm Email Verification</span>
        </Button>

        <div className="flex justify-center gap-10 mt-5">
          <Tooltip showArrow={ true }
                   placement="bottom"
                   delay={ 250 }
                   content="Resend Confirmation Code">
            <Button isIconOnly
                    aria-label="Resend Code"
                    className="bg-transparent"
                    onPress={ () => router.push(site.page.auth.onboard.resendCode) }>
              <svg xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 24 24"
                   className="w-8 h-8 fill-secondary hover:fill-secondary-400">
                <path d="M12 12V7l-7 5 7 5zm7-5-7 5 7 5z"/>
              </svg>
            </Button>
          </Tooltip>
          <Tooltip showArrow={ true }
                   placement="bottom"
                   delay={ 250 }
                   content="Login">
            <Button isIconOnly
                    aria-label="Login"
                    className="bg-transparent"
                    onPress={ () => router.push(site.page.auth.login._) }>
              <svg xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 24 24"
                   className="w-8 h-8 fill-secondary hover:fill-secondary-400">
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
