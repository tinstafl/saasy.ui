"use client"

import "@/config/presentation-input.css"
import { changePhone, formatPhone } from "@/config/schema/phone"
import { site } from "@/config/site"
import { updateUserAttributes } from "@aws-amplify/auth"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Card, Input, Pagination } from "@heroui/react"
import { CloseFilledIcon } from "@heroui/shared-icons"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { useError } from "@/context/error"
import { schema } from "@/config/schema/settings"
import { SubscriptionType, User } from "@/config/types/user"
import { fontPrimary, fontSaasy } from "@/config/fonts"
import { useUserState } from "@/context/user"
import { CardFooter, CardHeader } from "@heroui/card"

interface FormInput {
  username: string,
  email: string,
  phone?: string,
  website?: string,
}

export default function Settings({ user, edit }: { user: User, edit: boolean }): React.JSX.Element {
  const router = useRouter()

  const { putUser, setUser } = useUserState()
  const { error, triggerError } = useError()

  const subscriptionPage = (): number => {
    if (user.settings.subscription === SubscriptionType.FREE)
      return 1
    if (user.settings.subscription === SubscriptionType.STARTUP)
      return 2
    if (user.settings.subscription === SubscriptionType.ENTERPRISE)
      return 3
    else return 1
  }

  const [ page, setPage ] = useState(subscriptionPage())

  const { control, handleSubmit, formState: { errors } } = useForm<FormInput>({
    defaultValues: {
      email: user?.email || "",
      username: user?.username || "",
      phone: formatPhone(user?.phone || "")
    },
    resolver: yupResolver(schema),
    shouldFocusError: false,
    mode: "onSubmit",
    reValidateMode: "onChange"
  })

  const pagination = (
    <Pagination
      loop
      total={ 3 }
      initialPage={ page }
      className="max-w-sm"
      onChange={ page => setPage(page) }
      classNames={ {
        item: "bg-transparent",
        cursor: "bg-transparent text-default-foreground border-1 border-secondary-400",
      } }
      radius="none"
      variant="faded"
    />
  )

  const subscription = (): SubscriptionType => {
    if (page === 1)
      return SubscriptionType.FREE
    if (page === 2)
      return SubscriptionType.STARTUP
    if (page === 3)
      return SubscriptionType.ENTERPRISE
    else return SubscriptionType.FREE
  }

  const onSubmitError: SubmitErrorHandler<FormInput> = async (errors) => {
    triggerError({ show: true, message: <></> })
  }

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const phone = data.phone !== "" ? `+1${ data.phone?.replace(/-/g, "") }` : ""

    await updateUserAttributes({
      userAttributes: {
        preferred_username: data.username,
        phone_number: phone
      }
    })

    putUser({
      ...user,
      username: data.username,
      phone: data.phone || "",
      settings: {
        ...user.settings,
        subscription: subscription()
      }
    }).then(u => {
      setUser(u || {} as User)
      router.push(site.page.user.settings.view)
    })
  }

  return (
    <div className="w-full animate-appearance-in">
      <form className={ clsx("flex flex-col gap-5 w-full m-auto", error.show && "animate-shake animate-once") }
            onSubmit={ handleSubmit(onSubmit, onSubmitError) }>

        <div className="grid grid-cols-3 gap-5 mt-20">
          <div className="col-span-1 space-y-5">
            <div className="flex flex-col">
              <Controller name="email"
                          control={ control }
                          render={ ({ field }) =>
                            <Input { ...field }
                                   size="md"
                                   readOnly={ true }
                                   isInvalid={ errors.email !== undefined }
                                   errorMessage="Please enter a valid email"
                                   aria-label="Email"
                                   label="Email"
                                   variant="bordered"
                                   color="success"
                                   className=""
                                   autoComplete="email"/> }/>

              <Controller name="username"
                          control={ control }
                          render={ ({ field }) =>
                            <Input { ...field }
                                   size="md"
                                   readOnly={ !edit }
                                   isInvalid={ errors.username !== undefined }
                                   color={ errors.username !== undefined ? "danger" : "default" }
                                   errorMessage="Please enter a valid username."
                                   variant="bordered"
                                   aria-label="Username"
                                   label="Username"
                                   autoComplete="username"/> }/>

              { (user?.phone || edit) &&
                <div className="flex flex-col">
                  <Controller
                    name="phone"
                    control={ control }
                    render={ ({ field }) =>
                      <Input { ...field }
                             size="md"
                             readOnly={ !edit }
                             isInvalid={ errors.phone !== undefined }
                             color={ errors.phone !== undefined ? "danger" : "default" }
                             errorMessage="Please enter a valid phone number."
                             type="string"
                             aria-label="Phone"
                             label="Phone"
                             variant="bordered"
                             autoComplete="tel"
                             onChange={ (e) => changePhone(field.onChange, e) }
                             endContent={ field.value != "" && edit &&
                               <Button isIconOnly
                                       className="my-auto bg-transparent"
                                       onPress={ () => field.onChange({ target: { value: "" } }) }>
                                 <CloseFilledIcon className="w-4 h-4 text-default-600"/>
                               </Button>
                             }/> }/>
                </div> }
            </div>
          </div>

          <div className="col-span-2 space-y-5">
            { page == 1 &&
              <Card
                className="w-full h-72 flex flex-col shadow-xl shadow-primary justify-between bg-transparent animate-flip-down animate-duration-1000">
                <CardHeader className="h-fit w-full">
                  <h4 className={ `text-xl text-fuchsia-400 text-end m-2 ${ fontPrimary.className }` }>Free</h4>
                </CardHeader>
                <CardFooter className="h-fit w-full justify-end">
                  { edit && pagination }
                </CardFooter>
              </Card> }

            { page == 2 &&
              <Card
                className="w-full h-72 flex flex-col shadow-xl shadow-primary justify-between bg-transparent animate-flip-down animate-duration-1000">
                <CardHeader className="h-fit w-full">
                  <h4 className={ `text-xl text-fuchsia-400 text-end m-2 ${ fontPrimary.className }` }>Startup</h4>
                </CardHeader>
                <CardFooter className="h-fit w-full justify-end">
                  { edit && pagination }
                </CardFooter>
              </Card> }

            { page == 3 &&
              <Card
                className="w-full h-72 flex flex-col shadow-xl shadow-primary justify-between bg-transparent animate-flip-down animate-duration-1000">
                <CardHeader className="h-fit w-full">
                  <h4 className={ `text-xl text-fuchsia-400 text-end m-2 ${ fontPrimary.className }` }>Enterprise</h4>
                </CardHeader>
                <CardFooter className="h-fit w-full justify-end">
                  { edit && pagination }
                </CardFooter>
              </Card> }
          </div>
        </div>

        <div className={ clsx("flex justify-end gap-5 pt-12", !edit && "hidden") }>
          <Button aria-label="Cancel"
                  variant="bordered"
                  color="danger"
                  onPress={ () => router.push(site.page.user.settings.view) }>
            Cancel
          </Button>
          <Button type="submit"
                  aria-label="Save"
                  variant="bordered"
                  color="success">
            Save
          </Button>
        </div>
      </form>
    </div>
  )
}
