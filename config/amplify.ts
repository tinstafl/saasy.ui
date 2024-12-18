import { createServerRunner } from "@aws-amplify/adapter-nextjs"

export const API_NAME = 'default-s5g3du4b4f4gz6u-saasy-api'
export const USER_POOL_ID = 'us-west-2_AhdkyDD8t'
export const USER_POOL_CLIENT_ID = '616eu050tupjcrf71pk9c7r69d'
export const API_ID = 'sawzy86esj'
export const REGION = 'us-west-2'
export const STAGE = 'v1'
export const SERVICE = 'execute-api'

export const aws = () => {
  return {
    Auth: {
      Cognito: {
        userPoolId: USER_POOL_ID,
        userPoolClientId: USER_POOL_CLIENT_ID,
      },
    },
    API: {
      REST: {
        [API_NAME]: {
          region: REGION,
          service: SERVICE,
          endpoint: `https://${API_ID}.execute-api.${REGION}.amazonaws.com/${STAGE}`,
        }
      }
    }
  }
}

export const { runWithAmplifyServerContext } = createServerRunner({ config: aws() })
