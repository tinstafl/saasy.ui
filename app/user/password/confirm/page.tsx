"use client"

import AuthLayout from "@/components/layout/auth"
import { numbersOnly } from "@/config/schema/phone"
import { site } from "@/config/site"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Input, Tooltip } from "@heroui/react"
import { EyeFilledIcon, EyeSlashFilledIcon } from "@heroui/shared-icons"
import { confirmResetPassword } from "aws-amplify/auth"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { useError } from "@/context/error"
import { schema } from "@/config/schema/auth/confirm-reset-password"
import { fontHeader } from "@/config/fonts"

export interface FormInput {
  email: string,
  password: string,
  confirmPassword: string,
  confirmationCode: string
}

export default function ConfirmPasswordReset(): React.JSX.Element {
  const router = useRouter()

  const [ isPasswordVisible, setIsPasswordVisible ] = useState<boolean>(false)
  const [ isConfirmPasswordVisible, setIsConfirmPasswordVisible ] = useState<boolean>(false)

  const { error, triggerError } = useError()
  const { control, handleSubmit, formState: { isSubmitting, errors } } = useForm<FormInput>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
    },
    resolver: yupResolver(schema),
    shouldFocusError: false,
    mode: "onSubmit",
    reValidateMode: "onChange"
  })

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible)

  const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)

  const onSubmitError: SubmitErrorHandler<FormInput> = async (_) => {
    triggerError({
      show: true,
      message: <div>
        <span>This code might have expired or it is invalid.  Give it another shot.</span>
      </div>
    })
  }

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      const response = await confirmResetPassword({
        username: data.email,
        newPassword: data.password,
        confirmationCode: `${ data.confirmationCode }`
      })
      console.debug(response)

      return router.push(site.page._.product._)
    } catch (error: any) {
      console.debug(error)
      triggerError({
        show: true,
        message: <div>
          <span>Something is broken.  Give us a few minutes and try again.</span>
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
                   aria-label="New Password"
                   label="New Password"
                   variant="bordered"
                   autoComplete="current-password"
                   placeholder={ "(12-36 chars): 1 uppercase, 1 lowercase, 1 digit, 1 special char (!@#$%^&*(),.?\":{ }|<>)." }
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
          name="confirmPassword"
          control={ control }
          render={ ({ field }) =>
            <Input isRequired
                   { ...field }
                   isInvalid={ errors.confirmPassword !== undefined }
                   color={ errors.confirmPassword !== undefined ? "danger" : "default" }
                   errorMessage="Your passwords do not match."
                   type={ isConfirmPasswordVisible ? "text" : "password" }
                   aria-label="Confirm Password"
                   label="Confirm Password"
                   variant="bordered"
                   autoComplete="current-password"
                   placeholder={ "(12-36 chars): 1 uppercase, 1 lowercase, 1 digit, 1 special char (!@#$%^&*(),.?\":{ }|<>)." }
                   endContent={
                     <Button isIconOnly
                             aria-label="Toggle Confirm Password Visibility"
                             className="bg-transparent"
                             onPress={ toggleConfirmPasswordVisibility }>
                       { isConfirmPasswordVisible ? (
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
                   isInvalid={ errors.confirmationCode !== undefined }
                   color={ errors.confirmationCode !== undefined ? "danger" : "default" }
                   autoComplete="one-time-code"
                   aria-label="Code"
                   label="Code"
                   variant="bordered"
                   onChange={ (e) => numbersOnly(field.onChange, e) }
                   errorMessage="Please enter a valid password reset code."/> }/>

        <Button type="submit"
                aria-label="Confirm"
                isDisabled={ isSubmitting }
                variant="bordered"
                color="primary">
          <span className={ `text-base tracking-wider ${ fontHeader.className }` }>Confirm</span>
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
