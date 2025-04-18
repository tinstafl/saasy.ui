"use client"

import { fireworks } from "@/components/fireworks"
import AuthLayout from "@/components/layout/auth"
import { fontHeader, fontPrimary } from "@/config/fonts"
import { changePhone } from "@/config/schema/phone"
import { site } from "@/config/site"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Checkbox, Input, ModalBody, ModalContent, ModalHeader, Tooltip, useDisclosure } from "@heroui/react"
import { CloseFilledIcon, EyeFilledIcon, EyeSlashFilledIcon } from "@heroui/shared-icons"
import { signUp } from "aws-amplify/auth"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import React from "react"
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { useError } from "@/context/error"
import { schema } from "@/config/schema/auth/onboard"
import ModalWrapper from "@/app/(main)/product/(components)/modal"
import Terms from "@/app/user/onboard/(components)/terms"
import Privacy from "@/app/user/onboard/(components)/privacy"

interface FormInput {
  username: string,
  email: string,
  phone: string,
  password: string,
  confirmPassword: string,
  mfa: boolean,
  terms: boolean,
}

export default function CreateAccount(): React.JSX.Element {
  const router = useRouter()

  const { onOpen: onTermsOpen, onOpenChange: onTermsOpenChange, isOpen: isTermsOpen } = useDisclosure()
  const { onOpen: onPrivacyPolicyOpen, onOpenChange: onPrivacyPolicyOpenChange, isOpen: isPrivacyPolicyOpen } = useDisclosure()

  const [ isPasswordVisible, setIsPasswordVisible ] = React.useState(false)
  const [ isConfirmPasswordVisible, setIsConfirmPasswordVisible ] = React.useState(false)

  const { error, triggerError } = useError()
  const { control, handleSubmit, formState: { isSubmitting, errors } } = useForm<FormInput>({
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      mfa: true,
      terms: true,
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
        <span>Something might be off about your inputs here. Please correct them to create your account.</span>
      </div>
    })
  }

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const phone = data.phone !== "" ? `+1${ data.phone?.replace(/-/g, "") }` : ""
    const user = {
      username: data.email,
      password: data.password,
      options: {
        userAttributes: {
          phone_number: phone,
          preferred_username: data.username,
          "custom:mfa": JSON.stringify({ enabled: data.mfa, configured: false }),
          "custom:terms": `${ data.terms }`
        },
      }
    }

    try {
      const response = await signUp(user)
      console.debug(response)

      fireworks()
      return router.push(site.page.auth.onboard.confirm)
    } catch (error: any) {
      console.debug(error)
      triggerError({
        show: true,
        message: <div>
          <span>Something happened creating your account. Please try again in a few minutes.</span>
        </div>
      })
    }
  }

  return (
    <AuthLayout>
      <form className={ clsx("flex flex-col gap-2 w-1/2 m-auto", error.show && "animate-shake animate-once") }
            onSubmit={ handleSubmit(onSubmit, onSubmitError) }>

        <Controller
          name="username"
          control={ control }
          render={ ({ field }) =>
            <Input isRequired
                   { ...field }
                   isInvalid={ errors.username !== undefined }
                   color={ errors.username !== undefined ? "danger" : "default" }
                   errorMessage="Please enter a valid username."
                   aria-label="Username"
                   label="Username"
                   variant="bordered"
                   autoComplete="username"
                   placeholder="5 - 20 Characters"/> }/>

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
                   autoComplete="email"
                   placeholder="hello@example.com"/> }/>

        <Controller
          name="phone"
          control={ control }
          render={ ({ field }) =>
            <Input { ...field }
                   isInvalid={ errors.phone !== undefined }
                   color={ errors.phone !== undefined ? "danger" : "default" }
                   errorMessage="Please enter a valid phone number."
                   type="string"
                   aria-label="Phone"
                   label="Phone"
                   placeholder="999-555-0000"
                   variant="bordered"
                   autoComplete="tel"
                   onChange={ (e) => changePhone(field.onChange, e) }
                   endContent={ field.value != "" &&
                     <Button isIconOnly
                             aria-label="Clear Phone Number"
                             className="my-auto bg-transparent"
                             onPress={ () => field.onChange({ target: { value: "" } }) }>
                       <CloseFilledIcon className="w-4 h-4"/>
                     </Button>
                   }/> }/>

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
                   placeholder="12 - 36 Characters (lowercase, uppercase, digit, and symbol)"
                   endContent={
                     <Button isIconOnly
                             aria-label={ "Toggle Password Visibility" }
                             className="my-auto bg-transparent"
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
                   variant="bordered" autoComplete="current-password"
                   placeholder="12 - 36 Characters (lowercase, uppercase, digit, and symbol)"
                   onChange={ field.onChange }
                   value={ field.value }
                   endContent={
                     <Button isIconOnly
                             aria-label={ "Toggle Confirm Password Visibility" }
                             className="my-auto bg-transparent"
                             onPress={ toggleConfirmPasswordVisibility }>
                       { isConfirmPasswordVisible ? (
                         <EyeSlashFilledIcon className="w-4 h-4"/>
                       ) : (
                         <EyeFilledIcon className="w-4 h-4"/>
                       ) }
                     </Button>
                   }/> }/>

        <div className="flex flex-col items-center gap-2">
          <Controller
            name="mfa"
            control={ control }
            render={ ({ field }) =>
              <Checkbox defaultSelected={ field.value }
                        isInvalid={ errors.mfa !== undefined }
                        onChange={ field.onChange }
                        onBlur={ field.onBlur }
                        aria-label="Enable Multi-Factor Authentication"
                        className="animate-pulse animate-thrice"
                        color={ errors.mfa !== undefined ? "danger" : "primary" }>
                Enable Multi-Factor Authentication
              </Checkbox> }/>

          <Controller
            name="terms"
            control={ control }
            render={ ({ field }) =>
              <Checkbox defaultSelected={ field.value }
                        isInvalid={ errors.terms !== undefined }
                        onChange={ field.onChange }
                        aria-label="Agree to the Terms and Conditions"
                        onBlur={ field.onBlur }
                        color={ errors.terms !== undefined ? "danger" : "primary" }>
                <Button isIconOnly
                        size="sm"
                        onPress={ onTermsOpen }
                        aria-label="Terms and Conditions"
                        className="w-full h-fit px-1 my-auto inline-block bg-transparent">
                  <span className="text-sm">
                    Agree to the
                    <span className={ `hover:text-primary font-bold ${ fontPrimary.className }` }>
                      &nbsp;Terms and Conditions
                    </span>
                  </span>
                </Button>
              </Checkbox>
            }/>

          <Button isIconOnly
                  size="sm"
                  onPress={ onPrivacyPolicyOpen }
                  aria-label="Terms and Conditions"
                  className="w-full h-fit px-1 my-auto inline-block bg-transparent">
                    <span className={ `hover:text-primary text-sm font-bold ${ fontPrimary.className }` }>
                      Privacy Policy
                    </span>
          </Button>
        </div>

        <Button type="submit"
                aria-label="Create"
                isDisabled={ isSubmitting }
                variant="bordered"
                color="primary"
                className="mt-8">
          <span className={ `text-base tracking-wider ${ fontHeader.className }` }>Create</span>
        </Button>

        <div className="flex justify-center gap-10 mt-5">
          <Tooltip showArrow={ true }
                   placement="bottom"
                   delay={ 250 }
                   content="Resend Confirmation Code">
            <Button isIconOnly
                    aria-label="Resend Confirmation Code"
                    onPress={ () => router.push(site.page.auth.onboard.resendCode) }
                    className="bg-transparent">
              <svg xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 24 24"
                   className="w-8 h-8 fill-secondary hover:animate-pulse hover:animate-once">
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

      <ModalWrapper
        isOpen={ isTermsOpen }
        onOpenChange={ onTermsOpenChange }
        content={
          <ModalContent>
            <ModalHeader className="h-fit flex flex-col">
              <h2 className={ `text-lg text-secondary ${ fontHeader.className }` }>Terms and Conditions</h2>
            </ModalHeader>
            <ModalBody>
              <Terms/>
            </ModalBody>
          </ModalContent>
        }
      />

      <ModalWrapper
        isOpen={ isPrivacyPolicyOpen }
        onOpenChange={ onPrivacyPolicyOpenChange }
        content={
          <ModalContent>
            <ModalHeader className="h-fit flex flex-col">
              <h2 className={ `text-lg text-secondary ${ fontHeader.className }` }>Privacy Policy</h2>
            </ModalHeader>
            <ModalBody>
              <Privacy/>
            </ModalBody>
          </ModalContent>
        }
      />

    </AuthLayout>
  )
}
