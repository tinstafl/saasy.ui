import { FormInput } from "@/app/user/mfa"
import { numbersOnly } from "@/config/schema/phone"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Input } from "@heroui/react"
import clsx from "clsx"
import React from "react"
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { useError } from "@/context/error"
import { schema } from "@/config/schema/auth/confirm-mfa"
import { fontHeader } from "@/config/fonts"

interface ConfirmTotpProps {
  onSubmit: SubmitHandler<FormInput>
}

export default function ConfirmTotp({ onSubmit }: ConfirmTotpProps): React.JSX.Element {
  const { error, triggerError } = useError()

  const { control, handleSubmit, formState: { isSubmitting, errors } } = useForm<FormInput>({
    defaultValues: {
      email: "",
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
        <span>This code is not going to work. Please try the one we sent.</span>
      </div>
    })
  }

  return (
    <>
      <form className={ clsx("flex flex-col gap-2 w-3/4 m-auto", error.show && "animate-shake animate-once") }
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
                   aria-label="Code"
                   label="Code"
                   variant="bordered"
                   errorMessage="Please enter a valid MFA code."/> }/>

        <Button type="submit"
                aria-label="Confirm MFA"
                isDisabled={ isSubmitting }
                variant="bordered"
                color="primary">

          <span className={ `text-base tracking-wider ${ fontHeader.className }` }>Confirm MFA</span>
        </Button>
      </form>
    </>
  )
}
