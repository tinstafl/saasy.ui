import { aws, runWithAmplifyServerContext } from "@/config/amplify"
import { cookies } from "next/headers"
import { fetchAuthSession } from "aws-amplify/auth/server"
import { CognitoJwtVerifier } from "aws-jwt-verify"
import { fetchUserAttributes } from "@aws-amplify/auth/server"

interface Token {
  session: any;
  attributes: any;
  credentials?: {
    accessKeyId: string
    secretAccessKey: string
    sessionToken: string
  };
  valid: boolean;
}

const verifier = CognitoJwtVerifier.create({
  tokenUse: "access",
  userPoolId: aws().Auth.Cognito.userPoolId,
  clientId: aws().Auth.Cognito.userPoolClientId,
})

export const getToken = async (): Promise<Token> => {
  return runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: async (contextSpec) => {
      const session = await fetchAuthSession(contextSpec, { forceRefresh: true })
      const attributes = await fetchUserAttributes(contextSpec)

      return { session, attributes }
    }
  }).then(async ({ session, attributes }) => {
    try {
      await verifier.verify(session?.tokens?.accessToken?.toString() || "")
    } catch {
      console.log("error validating jwt")
      return { valid: false } as Token
    }

    return {
      session: session,
      attributes: { ...attributes },
      valid: true
    } as Token
  }).catch((e) => {
    console.log(e)
    return { valid: false } as Token
  })
}
