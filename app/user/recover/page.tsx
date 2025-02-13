"use client"

import AuthLayout from "@/components/layout/auth"
import { changePhone, numbersOnly } from "@/config/schema/phone"
import { sendUserAttributeVerificationCode } from "@aws-amplify/auth"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Input } from "@heroui/react"
import { CloseFilledIcon } from "@heroui/shared-icons"
import clsx from "clsx"
import React from "react"
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { useError } from "@/context/error"
import { schema } from "@/config/schema/auth/verify-phone"
import { fontHeader } from "@/config/fonts"

interface FormInput {
  phone: string,
  confirmationCode: string,
}

export default function RecoverAccount(): React.JSX.Element {
  const { error, triggerError } = useError()
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormInput>({
    defaultValues: {
      phone: "",
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
        <span>Your password must be valid before we can update it.</span>
      </div>
    })
  }

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {

    } catch (error: any) {
      console.debug(error)
      triggerError({
        show: true,
        message: <div>
          <span>Somethings broken over here.  Please give us a few minutes before trying again.</span>
        </div>
      })
    }
  }

  return (
    <AuthLayout>
      <form className={ clsx("flex flex-col gap-2 w-1/2 m-auto", error.show && "animate-shake animate-once") }
            onSubmit={ handleSubmit(onSubmit, onSubmitError) }>

        <Controller name="phone"
                    defaultValue=""
                    control={ control }
                    render={ ({ field }) =>
                      <Input isRequired
                             { ...field }
                             aria-label="Phone"
                             label="Phone"
                             variant="bordered"
                             autoComplete="tel"
                             placeholder="999-555-0000"
                             isInvalid={ errors.phone !== undefined }
                             color={ errors.phone !== undefined ? "danger" : "default" }
                             onChange={ (e) => changePhone(field.onChange, e) }
                             errorMessage="Please enter a valid phone number."
                             endContent={ field.value != "" &&
                               <Button isIconOnly
                                       className="bg-transparent"
                                       onPress={ () => field.onChange({ target: { value: "" } }) }>
                                 <CloseFilledIcon className="w-4 h-4 text-default-600"/>
                               </Button>
                             }/> }/>

        <Controller name="confirmationCode"
                    defaultValue=""
                    control={ control }
                    render={ ({ field }) =>
                      <Input isRequired
                             { ...field }
                             maxLength={ 6 }
                             aria-label="Phone Verification Code"
                             label="Phone Verification Code"
                             variant="bordered"
                             autoComplete="one-time-code"
                             isInvalid={ errors.confirmationCode !== undefined }
                             color={ errors.confirmationCode !== undefined ? "danger" : "default" }
                             onChange={ (e) => numbersOnly(field.onChange, e) }
                             errorMessage="Please enter a valid verification code."/> }/>

        <Button type="submit"
                aria-label="Confirm"
                isDisabled={ isSubmitting }
                variant="bordered"
                color="primary">
          <span className={ `text-base tracking-wider ${ fontHeader.className }` }>Confirm</span>
        </Button>

        <span onClick={ async () => {await sendUserAttributeVerificationCode({ userAttributeKey: "phone_number" })} }
              className="mx-auto cursor-pointer text-sm font-bold hover:text-primary">
          Resend Code
        </span>
      </form>
    </AuthLayout>
  )
}
