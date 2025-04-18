import { getToken } from "@/authentication/token"

export const dynamic = "force-dynamic"

export async function GET() {
  const { valid } = await getToken()
  return new Response(
    JSON.stringify({ status: 200, body: valid }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
}
