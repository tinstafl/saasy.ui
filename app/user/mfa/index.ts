import { FetchUserAttributesOutput, updateMFAPreference, updateUserAttribute, verifyTOTPSetup } from "@aws-amplify/auth"

export interface FormInput {
  email: string,
  confirmationCode: string,
}

export interface MfaConf {
  enabled: boolean
  configured: boolean
}

export const requiresMfa = async (attributes: FetchUserAttributesOutput) => {
  try {
    const mfa = JSON.parse(attributes["custom:mfa"] || "") as MfaConf
    return mfa.enabled && !mfa.configured
  } catch (error: any) {
    console.error(error)
    return false
  }
}

export const confirmMfaConfiguration = async (input: FormInput) => {
  try {
    await verifyTOTPSetup({ code: `${ input.confirmationCode }`, options: { email: input.email } })
    await updateMFAPreference({ totp: "PREFERRED" })
    await updateUserAttribute({
      userAttribute: {
        attributeKey: "custom:mfa", value: JSON.stringify({ enabled: true, configured: true })
      }
    })

    return true
  } catch (error: any) {
    console.error(error)
    return false
  }
}
