"use client"

import AuthLayout from "@/components/layout/auth"
import { schema } from "@/config/schema/auth/login"
import { site } from "@/config/site"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Input, Tooltip } from "@heroui/react"
import { EyeFilledIcon, EyeSlashFilledIcon } from "@heroui/shared-icons"
import { signIn } from "aws-amplify/auth"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import React from "react"
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { useTheme } from "next-themes"
import { useError } from "@/context/error"
import { fontHeader } from "@/config/fonts"

interface FormInput {
  email: string,
  password: string,
}

export default function Login(): React.JSX.Element {
  const router = useRouter()

  const [ isVisible, setIsVisible ] = React.useState(false)

  const { theme } = useTheme()
  const { error, triggerError } = useError()
  const { control, handleSubmit, formState: { isSubmitting, errors } } = useForm<FormInput>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
    shouldFocusError: false,
    mode: "onSubmit",
    reValidateMode: "onChange"
  })

  const toggleVisibility = () => setIsVisible(!isVisible)

  const onSubmitError: SubmitErrorHandler<FormInput> = async (_) => {
    triggerError({
      show: true,
      message: <div>
        <span>Something&apos;s not right here.  Try logging in again or resetting your password.</span>
      </div>
    })
  }

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      const response = await signIn({
        username: data.email,
        password: data.password,
        options: {
          clientMetadata: {
            theme: `${ theme }`
          }
        }
      })

      console.debug(response)
      if (response.nextStep.signInStep === "CONTINUE_SIGN_IN_WITH_TOTP_SETUP")
        return router.push(site.page.auth.mfa.setup)
      else if (response.nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_TOTP_CODE")
        return router.push(site.page.auth.login.confirm)
      else
        return router.push(site.page._.product._)
    } catch (error: any) {
      console.error(error)

      triggerError({
        show: true,
        message: <>Something went wrong during login. If you believe this is a system error, please email &nbsp;
          <code>support@saasy.ui</code>&nbsp; with the details. Otherwise, feel free to try again!</>
      })
    }
  }

  return (
    <AuthLayout>
      <form className={ clsx("flex flex-col gap-2 w-1/2 m-auto", error.show && "animate-shake animate-once") }
            onSubmit={ handleSubmit(onSubmit, onSubmitError) }>

        <Controller
          name="email"
          defaultValue=""
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

        <Controller
          name="password"
          defaultValue=""
          control={ control }
          render={ ({ field }) =>
            <Input isRequired
                   { ...field }
                   isInvalid={ errors.password !== undefined }
                   color={ errors.password !== undefined ? "danger" : "default" }
                   errorMessage="Please enter a valid password."
                   autoComplete="current-password"
                   type={ isVisible ? "text" : "password" }
                   aria-label="Password"
                   label="Password"
                   variant="bordered"
                   endContent={
                     <Button isIconOnly
                             aria-label="Toggle Password Visibility"
                             className="my-auto bg-transparent"
                             onPress={ toggleVisibility }>
                       { isVisible ? (
                         <EyeSlashFilledIcon className="w-4 h-4"/>
                       ) : (
                         <EyeFilledIcon className="w-4 h-4"/>
                       ) }
                     </Button> }/> }/>

        <Button type="submit"
                aria-label="Login"
                isDisabled={ isSubmitting }
                variant="bordered"
                color="primary">
          <span className={ `text-base tracking-wider ${ fontHeader.className }` }>Login</span>
        </Button>

        <div className="flex justify-center gap-10 mt-5">
          <Tooltip showArrow={ true }
                   placement="bottom"
                   delay={ 250 }
                   content="Reset Password">
            <Button isIconOnly
                    aria-label="Reset Password"
                    onPress={ () => router.push(site.page.auth.password.reset) }
                    className="bg-transparent">
              <svg xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 24 24"
                   className="w-8 h-8 fill-secondary hover:animate-spinner-linear-spin hover:animate-iteration-once">
                <path d="M19.89 10.105a8.696 8.696 0 0 0-.789-1.456l-1.658 1.119a6.606 6.606 0 0 1 .987 2.345 6.659 6.659 0 0 1 0 2.648 6.495 6.495 0 0 1-.384 1.231 6.404 6.404 0 0 1-.603 1.112 6.654 6.654 0 0 1-1.776 1.775 6.606 6.606 0 0 1-2.343.987 6.734 6.734 0 0 1-2.646 0 6.55 6.55 0 0 1-3.317-1.788 6.605 6.605 0 0 1-1.408-2.088 6.613 6.613 0 0 1-.382-1.23 6.627 6.627 0 0 1 .382-3.877A6.551 6.551 0 0 1 7.36 8.797 6.628 6.628 0 0 1 9.446 7.39c.395-.167.81-.296 1.23-.382.107-.022.216-.032.324-.049V10l5-4-5-4v2.938a8.805 8.805 0 0 0-.725.111 8.512 8.512 0 0 0-3.063 1.29A8.566 8.566 0 0 0 4.11 16.77a8.535 8.535 0 0 0 1.835 2.724 8.614 8.614 0 0 0 2.721 1.833 8.55 8.55 0 0 0 5.061.499 8.576 8.576 0 0 0 6.162-5.056c.22-.52.389-1.061.5-1.608a8.643 8.643 0 0 0 0-3.45 8.684 8.684 0 0 0-.499-1.607z"/>
              </svg>
            </Button>
          </Tooltip>

          <Tooltip showArrow={ true }
                   placement="bottom"
                   delay={ 250 }
                   content="Create Accont">
            <Button isIconOnly
                    aria-label="Create Account"
                    onPress={ () => router.push(site.page.auth.onboard._) }
                    className="bg-transparent">
              <svg xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 24 24"
                   className="w-8 h-8 fill-secondary hover:animate-pulse hover:animate-once">
                <path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3zM4 8a3.91 3.91 0 0 0 4 4 3.91 3.91 0 0 0 4-4 3.91 3.91 0 0 0-4-4 3.91 3.91 0 0 0-4 4zm6 0a1.91 1.91 0 0 1-2 2 1.91 1.91 0 0 1-2-2 1.91 1.91 0 0 1 2-2 1.91 1.91 0 0 1 2 2zM4 18a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1h2v-1a5 5 0 0 0-5-5H7a5 5 0 0 0-5 5v1h2z"/>
              </svg>
            </Button>
          </Tooltip>
        </div>
      </form>
    </AuthLayout>
  )
}
