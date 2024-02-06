export async function getChainStatus() {
  const url = process.env.NEXT_PUBLIC_API_URL
  const response = await fetch(`${url}/chain/status`)
  return response.json()
}