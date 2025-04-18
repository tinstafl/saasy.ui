import { requiresMfa } from "@/app/user/mfa"
import { aws, runWithAmplifyServerContext } from "@/config/amplify"
import { site } from "@/config/site"
import { fetchUserAttributes } from "@aws-amplify/auth/server"
import { AmplifyServer } from "@aws-amplify/core/internals/adapter-core"
import { fetchAuthSession } from "aws-amplify/auth/server"
import { CognitoJwtVerifier } from "aws-jwt-verify"
import { NextRequest, NextResponse } from "next/server"

export interface AuthenticationResponse {
  authenticated: boolean,
  pathname: string
}

const verifier = CognitoJwtVerifier.create({
  tokenUse: "access",
  userPoolId: aws().Auth.Cognito.userPoolId,
  clientId: aws().Auth.Cognito.userPoolClientId,
})

export const authenticated = async (request: NextRequest, response: NextResponse): Promise<AuthenticationResponse> =>
  await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec: AmplifyServer.ContextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec, { forceRefresh: true })
        const valid = verifier.verify(session?.tokens?.accessToken?.toString() || "")
        if (!valid)
          return { authenticated: false, pathname: site.page.auth.login._ }

        const attributes = await fetchUserAttributes(contextSpec)
        const mfaRequired = await requiresMfa(attributes)
        if (mfaRequired) {
          console.debug("requires mfa setup", attributes)
          return { authenticated: false, pathname: site.page.auth.mfa.setup }
        }

        return { authenticated: true, pathname: response.url }
      } catch (error) {
        console.error(error)
        return { authenticated: false, pathname: site.page.auth.login._ }
      }
    }
  })
