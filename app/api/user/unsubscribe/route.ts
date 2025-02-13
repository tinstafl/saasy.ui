import { getToken } from "@/authentication/token"
import { API_NAME, runWithAmplifyServerContext } from "@/config/amplify"
import { cookies } from "next/headers"
import { del } from "@aws-amplify/api-rest/server"

export const DELETE = async (_: Request) => {
  const { session, valid } = await getToken()

  if (!session || !valid)
    return new Response(
      JSON.stringify({ body: "unable to retrieve user authentication" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })

  return runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: async (contextSpec) => {
      try {
        const response = await del(contextSpec, {
          apiName: API_NAME,
          path: `/user/${ session?.userSub }/unsubscribe`,
          options: {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${ session?.tokens?.idToken?.toString() }`
            }
          }
        }).response

        console.debug("unsubscribe, ok", session?.userSub)

        return new Response(
          JSON.stringify({}), {
            status: response.statusCode,
            headers: { "Content-Type": "application/json" },
          })
      } catch (e: any) {
        console.error("unsubscribe, not ok", session?.userSub)

        return new Response(
          JSON.stringify({}), {
            status: e.response.statusCode,
            headers: { "Content-Type": "application/json" },
          })
      }
    }
  })
}
