import React, { useEffect, useState } from "react"
import { site } from "@/config/site"
import { setUpTOTP, updateUserAttribute } from "@aws-amplify/auth"
import { Button } from "@heroui/react"
import Image from "next/image"
import QRCode from "qrcode"
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { useError } from "@/context/error"
import { fontHeader } from "@/config/fonts"

interface EnableTotpProps {
  onSubmit: SubmitHandler<any>
}

export default function EnableTotp({ onSubmit }: EnableTotpProps): React.JSX.Element {
  const [ qrCode, setQrCode ] = useState<string>()
  const [ sharedSecret, setSharedSecret ] = useState<string>()

  const { triggerError } = useError()

  const { handleSubmit, formState: { isSubmitting } } = useForm()

  useEffect(() => {
    setUpTOTP()
      .then(response => {
        QRCode.toDataURL(response.getSetupUri(site.name).href)
          .then(url => setQrCode(url))
        setSharedSecret(response.sharedSecret)
        updateUserAttribute({
          userAttribute: {
            attributeKey: "custom:mfa",
            value: JSON.stringify({ enabled: true, configured: false })
          }
        })
          .then(() => {
          })
          .catch((error: any) => console.log(error))
      }).catch((error: any) => console.log(error))
  }, [])

  const submitError: SubmitErrorHandler<any> = async (_) => {
    triggerError({
      show: true,
      message: <div>
        <span>Something unexpected happened. Try verifying your MFA code or starting over.</span>
      </div>
    })
  }

  return (
    qrCode && sharedSecret
      ? (
        <form className="flex flex-col m-5"
              onSubmit={ handleSubmit(onSubmit, submitError) }>
          <Image src={ qrCode } alt="qrcode" height="200" width="200" className="mx-auto mb-10"/>

          <div className="flex flex-col mb-5">
            <span className="mx-auto font-bold text-primary">Scan this QR Code to configure your authenticator app.</span>
            <span className="mx-auto mt-5 text-sm">{ sharedSecret }</span>
            <span className="mx-auto text-sm">Alternatively, you could copy/type this code.</span>
          </div>

          <Button type="submit"
                  aria-label="Verify"
                  isDisabled={ isSubmitting }
                  variant="bordered"
                  color="primary"
                  className="mx-auto mt-5 w-1/2">
            <span className={ `text-base tracking-wider ${ fontHeader.className }` }>Verify</span>
          </Button>
        </form>
      )
      : <div className="h-96 w-96">&nbsp;</div>
  )
}
