import { API_NAME, runWithAmplifyServerContext } from "@/config/amplify"
import { cookies } from "next/headers"
import { get, post, put, del } from "@aws-amplify/api-rest/server"
import { getToken } from "@/authentication/token"
import { NextRequest } from "next/server"

export const dynamic = "force-dynamic"

export const POST = async (request: NextRequest) => {
  const { session, valid } = await getToken()

  if (!session || !valid)
    return new Response(
      JSON.stringify({ body: "unable to retrieve user authentication" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })

  const body = await request.json()

  return runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: async (contextSpec) => {
      try {
        const response = await post(contextSpec, {
          apiName: API_NAME,
          path: `/user/${ session?.userSub }`,
          options: {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${ session?.tokens?.idToken?.toString() }`
            },
            body: {
              username: body.user.username,
              settings: body.user.settings,
              phone: body.user?.phone || "",
            }
          }
        }).response

        console.debug("post user, ok", request, response)

        return new Response(
          JSON.stringify({ body: await response.body.json() }), {
            status: response.statusCode,
            headers: { "Content-Type": "application/json" },
          })
      } catch (e: any) {
        console.error("post user, not ok", request)

        return new Response(
          JSON.stringify({ body: e.response.body }), {
            status: e.response.statusCode,
            headers: { "Content-Type": "application/json" },
          })
      }
    }
  })
}

export const GET = async () => {
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
        const response = await get(contextSpec, {
          apiName: API_NAME,
          path: `/user/${ session?.userSub }`,
          options: {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${ session?.tokens?.idToken?.toString() }`
            },
          }
        }).response

        console.debug("get user, ok", session?.userSub, response)

        return new Response(
          JSON.stringify({ body: await response.body.json() }), {
            status: response.statusCode,
            headers: { "Content-Type": "application/json" },
          })
      } catch (e: any) {
        console.error("get user, not ok", session?.userSub)

        return new Response(
          JSON.stringify({ body: e.response.body }), {
            status: e.response.statusCode,
            headers: { "Content-Type": "application/json" },
          })
      }
    }
  })
}

export const PUT = async (request: NextRequest) => {
  const { session, valid } = await getToken()

  if (!session || !valid)
    return new Response(
      JSON.stringify({ body: "unable to retrieve user authentication" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })

  const body = await request.json()

  return runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: async (contextSpec) => {
      try {
        const response = await put(contextSpec, {
          apiName: API_NAME,
          path: `/user/${ session?.userSub }`,
          options: {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${ session?.tokens?.idToken?.toString() }`
            },
            body: {
              username: body.user.username,
              settings: body.user.settings,
              phone: body.user?.phone || "",
            }
          }
        }).response

        console.debug("put user, ok", request, response)

        return new Response(
          JSON.stringify({ body: await response.body.json() }), {
            status: response.statusCode,
            headers: { "Content-Type": "application/json" },
          })
      } catch (e: any) {
        console.error("put user, not ok", request)

        return new Response(
          JSON.stringify({ body: e.response.body }), {
            status: e.response.statusCode,
            headers: { "Content-Type": "application/json" },
          })
      }
    }
  })
}
