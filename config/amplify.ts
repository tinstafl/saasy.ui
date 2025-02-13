import { createServerRunner } from "@aws-amplify/adapter-nextjs"

export const API_NAME = 'default-id-saasy-api'
export const USER_POOL_ID = 'us-west-2_id'
export const USER_POOL_CLIENT_ID = 'id'
export const API_ID = 'id'
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
