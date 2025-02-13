import { confirmMfaConfiguration, FormInput } from "@/app/user/mfa"
import ConfirmTotp from "@/app/user/mfa/(components)/confirm"
import EnableTotp from "@/app/user/mfa/(components)/enable"
import { updateMFAPreference, updateUserAttribute } from "@aws-amplify/auth"
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react"
import { fetchAuthSession } from "aws-amplify/auth"
import { JwtPayload } from "aws-jwt-verify/jwt-model"
import Link from "next/link"
import React, { useState } from "react"
import { SubmitHandler } from "react-hook-form"

interface EnableMfaProps {
  mfaEnabled: boolean,
  isOpen: boolean,
  hide: () => void,
  updateUser: () => void
}

export default function ToggleMfa({ mfaEnabled, isOpen, hide, updateUser }: EnableMfaProps): React.JSX.Element {
  const [ step, setStep ] = useState<number>(1)

  async function refresh() {
    updateUser()
    setStep(1)
    hide()
  }

  const disableMfaAttributes = () => {
    updateMFAPreference({
      sms: "DISABLED",
      totp: "DISABLED"
    }).then(() => {
      updateUserAttribute({
        userAttribute: {
          attributeKey: "custom:mfa",
          value: JSON.stringify({
            enabled: false,
            configured: false
          })
        }
      }).then(() => refresh())
    })
  }

  const disable = () => {
    return (
      <>
        <ModalHeader className="flex flex-col gap-1">MFA Setup</ModalHeader>
        <ModalBody>
          <h3 className="font-bold text-danger text-lg">Do you want to disable MFA for your account?</h3>
        </ModalBody>
        <ModalFooter>
          <Button color="primary"
                  variant="light"
                  aria-label="Nope"
                  onPress={ () => hide() }>
            Nope
          </Button>
          <Button color="danger"
                  variant="bordered"
                  aria-label="Disable MFA"
                  onPress={ () => disableMfaAttributes() }>
            Disable MFA
          </Button>
        </ModalFooter>
      </>
    )
  }

  const suggest = () => {
    return (
      <>
        <ModalHeader className="flex flex-col gap-1">MFA Setup</ModalHeader>
        <ModalBody>
          <h3 className="font-bold text-lg">Do you want to enable MFA for your account?</h3>
          <p>
            We use <Link className="text-secondary" href="https://en.wikipedia.org/wiki/Time-based_one-time_password" target="_blank">time-based one-time passwords</Link> to finish your login when MFA is enabled.
            Here are a few apps that can accomodate.
          </p>
          <ul>
            <li>
              <Link className="text-secondary" href="https://www.microsoft.com/en-us/account/authenticator" target="_blank">Microsoft Authenticator</Link>
            </li>
            <li>
              <Link className="text-secondary" href="https://apps.apple.com/us/app/google-authenticator/id388497605" target="_blank">Google Authenticator</Link>
            </li>
            <li>
              <Link className="text-secondary" href="https://authenticator.2stable.com/" target="_blank">2Stable Authenticator</Link>
            </li>
          </ul>
        </ModalBody>
        <ModalFooter>
          <Button color="danger"
                  variant="light"
                  aria-label="Nope"
                  onPress={ () => hide() }>
            Nope
          </Button>
          <Button color="primary"
                  variant="bordered"
                  aria-label="Enable MFA"
                  onPress={ () => setStep(2) }>
            Enable MFA
          </Button>
        </ModalFooter>
      </>
    )
  }

  const enable = () => {
    return (
      <>
        <ModalHeader className="flex flex-col gap-1">Setup Device</ModalHeader>
        <ModalBody>
          <EnableTotp onSubmit={ () => setStep(3) }/>
        </ModalBody>
      </>
    )
  }

  const validateMfa: SubmitHandler<FormInput> = async (data) => {
    const configured = await confirmMfaConfiguration(data)
    if (configured)
      await refresh()
  }

  const confirm = () => {
    return (
      <>
        <ModalHeader className="flex flex-col gap-2">Confirm Setup</ModalHeader>
        <ModalBody className="mb-5">
          <ConfirmTotp onSubmit={ validateMfa }/>
        </ModalBody>
      </>
    )
  }

  return (
    <Modal size="xl"
           backdrop="blur"
           onClose={ () => hide() }
           isOpen={ isOpen }>
      <ModalContent>
        <>
          { (mfaEnabled && step === 1) ? disable() : step === 1 && suggest() }
          { step === 2 && enable() }
          { step === 3 && confirm() }
        </>
      </ModalContent>
    </Modal>
  )
}
