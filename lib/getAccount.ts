export async function getAccount(address: string) {
  const url = process.env.NEXT_PUBLIC_API_URL
  const response = await fetch(`${url}/account/${address}/info`)
  return response.json()
}